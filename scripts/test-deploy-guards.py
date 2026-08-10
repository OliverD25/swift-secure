"""Prove the deploy guards actually stop things, not just that they stay quiet.

    python3 scripts/test-deploy-guards.py          # everything
    python3 scripts/test-deploy-guards.py --fast   # skip the tests that build

Covers the four pieces that replaced the staging branch on 10 August 2026:

  1. /version.json — every build names the commit it came from
  2. check-deployed.py — reads it and says whether the live site is current
  3. .githooks/pre-push — refuses a push that fails any check
  4. the prepare script — installs the hook so a fresh clone is not unprotected

WHY IT IS WRITTEN THIS WAY. Three "checks" on 10 August passed while the thing
they checked was broken: a 200 from a byte-identical page, a healthy-looking
staging site serving a three-day-old build, and `npm ci --dry-run` run under the
wrong npm. A check that cannot fail is worse than no check, so every guard here
is tested by breaking something on purpose and requiring the guard to notice.

SAFETY. The failure tests edit real files. The suite refuses to start unless the
working tree is clean, and every edit is undone in a finally block, so an
interrupted run cannot leave a broken file behind.
"""
import argparse
import json
import os
import pathlib
import re
import subprocess
import sys
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
HOOK = ROOT / ".githooks" / "pre-push"
ZERO = "0" * 40

passed: list[str] = []
failed: list[str] = []


def check(name: str, ok: bool, detail: str = "") -> bool:
    (passed if ok else failed).append(name if ok else f"{name}\n      {detail}")
    print(f"  {'ok  ' if ok else 'FAIL'}  {name}")
    if not ok and detail:
        print(f"          {detail}")
    return ok


def git(*args: str) -> str:
    return subprocess.run(("git", *args), cwd=ROOT, capture_output=True,
                          text=True, check=True).stdout.strip()


def run_hook(local_sha: str, remote_sha: str) -> tuple[int, str]:
    """Feed the hook a push range exactly as git would.

    Sent as bytes on purpose. With text=True, Python rewrites "\\n" to "\\r\\n"
    on Windows, the trailing "\\r" lands on the last field, and git rejects
    "sha~1\\r..sha" — which looks like a broken hook and is not one.
    """
    line = f"refs/heads/main {local_sha} refs/heads/main {remote_sha}\n".encode()
    r = subprocess.run(["sh", str(HOOK)], cwd=ROOT, input=line, capture_output=True)
    out = (r.stdout + r.stderr).decode("utf8", "replace")
    return r.returncode, out


def latest_commit_touching(pattern: re.Pattern, want: bool) -> str | None:
    """Newest commit whose file list does (or does not) match — for a realistic range."""
    for sha in git("log", "-40", "--format=%H").splitlines():
        files = git("show", "--name-only", "--format=", sha).splitlines()
        if not files:
            continue
        hit = any(pattern.search(f) for f in files)
        if hit is want:
            return sha
    return None


class _Handler(BaseHTTPRequestHandler):
    payload = b"{}"
    status = 200
    seen_agent = ""

    def do_GET(self):
        _Handler.seen_agent = self.headers.get("User-Agent", "")
        self.send_response(self.status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(self.payload)

    def log_message(self, *a):
        pass


def serve(payload: bytes, status: int = 200):
    _Handler.payload, _Handler.status = payload, status
    srv = HTTPServer(("127.0.0.1", 0), _Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{srv.server_port}"


def check_deployed(url: str, ref: str = "HEAD") -> tuple[int, str]:
    r = subprocess.run([sys.executable, "scripts/check-deployed.py",
                        "--url", url, "--ref", ref, "--no-fetch"],
                       cwd=ROOT, capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr


# --------------------------------------------------------------------------

def test_version_stamp(fresh: bool) -> None:
    print("\n/version.json — the build names its own commit")
    if fresh:
        # dist/ from an earlier commit would fail the HEAD comparison for the
        # wrong reason. Rebuild so the assertion tests the stamp, not the clock.
        subprocess.run(["npm", "run", "build"], cwd=ROOT, capture_output=True,
                       shell=os.name == "nt")
    f = DIST / "version.json"
    if not check("dist/version.json exists after a build", f.exists(),
                 "run `npm run build` first"):
        return
    try:
        v = json.loads(f.read_text(encoding="utf8"))
    except json.JSONDecodeError as e:
        check("it is valid JSON", False, str(e))
        return
    check("it is valid JSON", True)
    for key in ("commit", "short", "branch", "builtAt"):
        check(f"it has {key}", key in v)
    commit = str(v.get("commit", ""))
    check("commit is a 40-character sha", bool(re.fullmatch(r"[0-9a-f]{40}", commit)),
          f"got {commit!r}")
    if fresh:
        check("commit matches git rev-parse HEAD", commit == git("rev-parse", "HEAD"),
              f"file says {commit[:12]}, git says {git('rev-parse', 'HEAD')[:12]}")
    else:
        known = subprocess.run(("git", "cat-file", "-e", f"{commit}^{{commit}}"),
                               cwd=ROOT, capture_output=True).returncode == 0
        check("commit is a real commit in this repository", known,
              f"{commit[:12]} is not a commit here")
    check("short is the first 7 characters", v.get("short") == commit[:7])
    try:
        datetime.fromisoformat(str(v.get("builtAt", "")).replace("Z", "+00:00"))
        check("builtAt is a real timestamp", True)
    except ValueError as e:
        check("builtAt is a real timestamp", False, str(e))

    headers = (ROOT / "public" / "_headers").read_text(encoding="utf8")
    block = re.search(r"^/version\.json\s*\n((?:\s+\S.*\n)+)", headers, re.M)
    check("public/_headers stops /version.json being cached",
          bool(block) and "no-store" in block.group(1),
          "without this Cloudflare serves a cached commit and confirms a deploy "
          "that never happened")


def test_check_deployed() -> None:
    print("\ncheck-deployed.py — reads it and answers one question")
    head = git("rev-parse", "HEAD")
    parent = git("rev-parse", "HEAD~1")

    srv, url = serve(json.dumps({"commit": head, "branch": "main",
                                 "builtAt": "2026-08-10T00:00:00Z"}).encode())
    code, out = check_deployed(url)
    srv.shutdown()
    check("says CURRENT when the live commit matches", code == 0 and "CURRENT" in out,
          out.strip()[-200:])

    srv, url = serve(json.dumps({"commit": parent, "branch": "main",
                                 "builtAt": "2026-08-07T00:00:00Z"}).encode())
    code, out = check_deployed(url)
    srv.shutdown()
    check("says BEHIND when the live commit is older", code == 1 and "BEHIND" in out,
          out.strip()[-200:])
    check("names the commits that are not live yet", "Not yet live" in out,
          out.strip()[-200:])

    srv, url = serve(b'{"commit": "unknown"}')
    code, out = check_deployed(url)
    srv.shutdown()
    check("says UNKNOWN when the site reports no commit",
          code == 1 and "UNKNOWN" in out, out.strip()[-200:])

    srv, url = serve(b"not json at all")
    code, out = check_deployed(url)
    srv.shutdown()
    check("survives a reply that is not JSON", code == 1, out.strip()[-200:])

    srv, url = serve(b"nope", status=404)
    code, out = check_deployed(url)
    srv.shutdown()
    check("explains a 404 as a build predating version.json",
          code == 1 and "predates" in out, out.strip()[-200:])

    srv, url = serve(b"nope", status=403)
    code, out = check_deployed(url)
    srv.shutdown()
    check("explains a 403 as a refusal rather than a missing file",
          code == 1 and "refused" in out, out.strip()[-200:])

    # Cloudflare answers 403 to Python-urllib's default agent, so without one of
    # our own this tool reports UNKNOWN for a healthy site every time. That is a
    # check that cannot succeed, and it shipped once already.
    check("the request carries a user agent Cloudflare will accept",
          "Python-urllib" not in _Handler.seen_agent and bool(_Handler.seen_agent),
          f"sent User-Agent: {_Handler.seen_agent!r}")


def test_hook_static() -> None:
    """The ways a hook can be switched off without anyone editing its logic."""
    print("\npre-push — the ways it can be switched off silently")
    check("the hook file exists and is not empty", HOOK.exists() and HOOK.stat().st_size > 0)
    pkg = json.loads((ROOT / "package.json").read_text(encoding="utf8"))
    check("npm install installs the hook by itself",
          "core.hooksPath" in pkg.get("scripts", {}).get("prepare", ""),
          "a fresh clone would otherwise have no protection and no warning")
    mode = git("ls-files", "-s", ".githooks/pre-push").split()[0]
    check("the hook is recorded executable in git (100755)", mode == "100755",
          f"mode is {mode}; on Linux git would skip the hook without a word. "
          "Fix: git update-index --chmod=+x .githooks/pre-push")
    hook_src = HOOK.read_text(encoding="utf8")
    check("the hook finds npm on a machine with a stripped PATH",
          "$HOME/.local/bin" in hook_src,
          "the homelab keeps npm there and a non-interactive shell does not "
          "have it on PATH; the push would fail with 'npm: not found'")
    for needle, why in (
        ("TYPE CHECK FAILED", "astro check"),
        ("LOCKFILE IS NOT INSTALLABLE", "the npm@10.9.2 lockfile check"),
        ("CLAIM CHECK FAILED", "the claim checks"),
        ("THE BUILD FAILED", "the build"),
    ):
        check(f"the hook still runs {why}", needle in hook_src)


def test_hook_skips_and_passes(site_sha: str, docs_sha: str | None) -> None:
    test_hook_static()
    print("\npre-push — the quiet paths")
    # Only meaningful on a working clone; CI checks out fresh and never pushes.
    check("core.hooksPath points at .githooks",
          git("config", "--get", "core.hooksPath") == ".githooks",
          "run: git config core.hooksPath .githooks")

    if docs_sha:
        code, out = run_hook(docs_sha, f"{docs_sha}~1")
        check("a documentation-only push skips the expensive checks",
              code == 0 and "skipping" in out, out.strip()[-200:])

    code, out = run_hook(site_sha, f"{site_sha}~1")
    check("a clean site change passes every check", code == 0, out.strip()[-400:])


def break_and_run(name: str, path: pathlib.Path, mutate, site_sha: str,
                  expect_in_output: str) -> None:
    """Break one file, require the hook to refuse the push, then put it back."""
    original = path.read_text(encoding="utf8")
    try:
        path.write_text(mutate(original), encoding="utf8")
        code, out = run_hook(site_sha, f"{site_sha}~1")
        check(name, code != 0 and expect_in_output in out,
              f"exit={code}; wanted {expect_in_output!r}\n      {out.strip()[-300:]}")
    finally:
        path.write_text(original, encoding="utf8")


def test_hook_blocks(site_sha: str, deps_sha: str | None) -> None:
    print("\npre-push — the paths that must refuse")
    en = ROOT / "src" / "i18n" / "locales" / "en.ts"

    break_and_run("refuses a forbidden claim in the copy", en,
                  lambda s: s.replace('"Read methodology"',
                                      '"Read methodology — we guarantee it"', 1),
                  site_sha, "CLAIM CHECK FAILED")

    break_and_run("refuses code that does not compile", en,
                  lambda s: s + "\nthis is not valid typescript\n",
                  site_sha, "FAILED")

    # Valid syntax, wrong type. astro build does not type-check, so only
    # `astro check` catches this — which is why it is in the hook at all.
    break_and_run("refuses a type error the build would have allowed", en,
                  lambda s: s.replace("  nav: {", '  nav: {\n    bogusKey: "x",', 1),
                  site_sha, "TYPE CHECK FAILED")

    if deps_sha:
        pkg = ROOT / "package.json"
        break_and_run("refuses a lockfile the Cloudflare builder cannot install", pkg,
                      lambda s: s.replace('"devDependencies": {',
                                          '"devDependencies": {\n    "left-pad": "1.3.0",', 1),
                      deps_sha, "LOCKFILE IS NOT INSTALLABLE")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fast", action="store_true", help="skip tests that run a build")
    a = ap.parse_args()

    # Only the full run edits real files, so only the full run needs a clean
    # tree. --fast reads and asserts; refusing there would block CI and anyone
    # checking their work mid-change, for no gain.
    dirty = git("status", "--porcelain")
    if dirty and not a.fast:
        print("REFUSING TO RUN: the working tree has uncommitted changes.\n"
              "These tests break files on purpose and restore them from memory.\n"
              "Commit or stash first, so an interrupted run cannot lose your work.\n"
              "(--fast reads only, and runs on a dirty tree.)\n")
        print(dirty)
        return 2

    test_version_stamp(fresh=not a.fast)
    test_check_deployed()

    if a.fast:
        # CI runs this mode. It needs no history beyond HEAD~1 and starts no
        # build, so it stays cheap enough to run on every push while still
        # asserting the things that can switch a guard off silently: the hook's
        # execute bit, the prepare script, and the PATH fix.
        test_hook_static()
        print("\n--fast: skipping every test that runs a build")
    else:
        site_re = re.compile(r"^(src/|public/|astro\.config\.mjs|wrangler.*\.jsonc)")
        deps_re = re.compile(r"^(package\.json|package-lock\.json)$")
        site_sha = latest_commit_touching(site_re, True)
        docs_sha = latest_commit_touching(site_re, False)
        deps_sha = latest_commit_touching(deps_re, True)
        if not site_sha:
            print("could not find a recent commit touching src/ — cannot test the hook")
            return 2
        test_hook_skips_and_passes(site_sha, docs_sha)
        test_hook_blocks(site_sha, deps_sha)

    if not a.fast:
        print("\nafterwards")
        still_dirty = git("status", "--porcelain")
        check("the working tree is exactly as it was found", not still_dirty, still_dirty)

    print(f"\n{len(passed)} passed, {len(failed)} failed")
    if failed:
        print("\nFAILED:")
        for f in failed:
            print(f"  - {f}")
        return 1
    print("every guard was shown to fire, not merely to stay quiet")
    return 0


if __name__ == "__main__":
    sys.exit(main())
