"""Is the live site built from the commit we think it is?

    python3 scripts/check-deployed.py                     # swiftsecured.com vs origin/main
    python3 scripts/check-deployed.py --url https://staging.swiftsecured.com --ref origin/staging

Reads /version.json, which every build writes with the commit it came from, and
compares it to a git ref. Exit code 0 when the site is current, 1 when it is not.

WHY THIS EXISTS. Cloudflare keeps serving the previous deployment when a build
fails, so a broken build looks exactly like a healthy site — same pages, same
200s, just old. On 10 August 2026 five builds failed in a row and the live site
served three-day-old copy the whole time. Nobody could tell, because the commits
in between changed nothing visible, so "the page looks right" was true of both
the new build and the one it had failed to replace.
"""
import argparse
import json
import subprocess
import sys
import urllib.error
import urllib.request


def git(*args: str) -> str | None:
    try:
        return subprocess.run(("git", *args), capture_output=True, text=True,
                              check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None


def fetch_version(base: str) -> dict | None:
    url = base.rstrip("/") + "/version.json"
    req = urllib.request.Request(url, headers={"Cache-Control": "no-cache"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read().decode("utf8"))
    except urllib.error.HTTPError as e:
        print(f"  {url} returned HTTP {e.code}")
        if e.code == 404:
            print("  That build predates /version.json. Push once more and it will appear.")
        return None
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as e:
        print(f"  could not read {url}: {e}")
        return None


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--url", default="https://swiftsecured.com")
    p.add_argument("--ref", default="origin/main")
    p.add_argument("--no-fetch", action="store_true",
                   help="skip `git fetch`; compare against the refs already on disk")
    a = p.parse_args()

    if not a.no_fetch:
        git("fetch", "origin", "--quiet")

    expected = git("rev-parse", a.ref)
    if not expected:
        print(f"cannot resolve {a.ref} — is this a git repository with a remote?")
        return 1

    live = fetch_version(a.url)
    if live is None:
        print(f"\nUNKNOWN — {a.url} did not tell us its commit.")
        return 1

    got = str(live.get("commit", "unknown"))
    print(f"  live   {got[:12]}  branch={live.get('branch')}  built {live.get('builtAt')}")
    print(f"  {a.ref:<6} {expected[:12]}")

    if got == expected:
        print(f"\nCURRENT — {a.url} is built from {a.ref}.")
        return 0

    if got == "unknown" or len(got) != 40:
        print(f"\nUNKNOWN — the site reports commit {got!r}, which is not a commit id.")
        return 1

    behind = git("rev-list", "--count", f"{got}..{expected}")
    ahead = git("rev-list", "--count", f"{expected}..{got}")
    if behind is None or ahead is None:
        print(f"\nBEHIND — the live commit is not in this clone's history. "
              f"Run `git fetch origin` and try again.")
        return 1

    print(f"\nBEHIND — {a.url} is {behind} commit(s) older than {a.ref}.")
    if ahead != "0":
        print(f"  It also carries {ahead} commit(s) that {a.ref} does not.")
    missing = git("log", "--oneline", f"{got}..{expected}")
    if missing:
        print("\n  Not yet live:")
        for line in missing.splitlines()[:10]:
            print(f"    {line}")
    print("\n  A failed build is the usual cause. Check the build history in the "
          "Cloudflare dashboard.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
