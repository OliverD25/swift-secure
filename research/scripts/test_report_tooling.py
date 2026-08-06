"""Tests for the two scripts that decide what an operator is told.

These guard three things that fail SILENTLY, which is why they are worth
testing at all. A broken signature still produces 21 files. A broken freshness
check still produces 21 files. A broken .partial guard still exits 0 — it just
destroys a sweep on the way.

  1. sender.json handling. Missing, malformed, half-filled, and overridden.
  2. The freshness check. It must read the date from INSIDE the JSON. It used
     to read the file's mtime, and git does not preserve mtime — a fresh clone
     stamps every file with the checkout time, so month-old measurements read
     as minutes old on the machine that did not produce them. Two tests below
     exist purely to stop that regression: one pins mtime far in the past with
     a fresh generatedOn, the other does the reverse.
  3. The .partial guard in 15-verify-wave.py. A limited run must not overwrite
     the canonical files. This is not hypothetical here: a 3-site smoke test
     once destroyed a 489-site sweep, which is why the guard exists.

Runs the real scripts as subprocesses against fixtures in a temp directory, so
nothing here can write over the real letters.

Usage: python research/scripts/test_report_tooling.py
"""
import hashlib
import json
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile
from datetime import date, timedelta

ROOT = pathlib.Path(__file__).resolve().parents[2]
GENERATE = ROOT / "research" / "scripts" / "18-generate-reports.py"
VERIFY = ROOT / "research" / "scripts" / "15-verify-wave.py"
REAL_VERIFIED = ROOT / "research" / "wave-verification.json"
REAL_WAVE_MD = ROOT / "research" / "outreach-wave-verified.md"

checks = 0
failures = []


def check(label: str, condition: bool, detail: str = "") -> None:
    global checks
    checks += 1
    if not condition:
        failures.append(f"{label}\n      {detail}" if detail else label)


def sha(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run_generate(tmp: pathlib.Path, *extra: str, verified: pathlib.Path = None,
                 sender_file: pathlib.Path = None):
    """Run the generator against fixtures. Never touches research/reports/."""
    outdir = tmp / f"out{len(list(tmp.iterdir()))}"
    outdir.mkdir()
    cmd = [sys.executable, str(GENERATE), "--outdir", str(outdir),
           "--verified", str(verified or REAL_VERIFIED)]
    if sender_file is not None:
        cmd += ["--sender-file", str(sender_file)]
    cmd += list(extra)
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    return proc, outdir


def any_report(outdir: pathlib.Path) -> str:
    files = sorted(outdir.glob("*.md"))
    return files[0].read_text(encoding="utf8") if files else ""


def verified_fixture(tmp: pathlib.Path, name: str, generated_on, drop_meta=False) -> pathlib.Path:
    """A copy of the real verification data with a chosen generatedOn."""
    raw = json.loads(REAL_VERIFIED.read_text(encoding="utf8"))
    domains = raw.get("domains", raw)
    body = domains if drop_meta else {"generatedOn": str(generated_on), "domains": domains}
    path = tmp / name
    path.write_text(json.dumps(body), encoding="utf8")
    return path


def test_sender_config(tmp: pathlib.Path) -> None:
    missing = tmp / "does-not-exist.json"
    proc, out = run_generate(tmp, sender_file=missing)
    text = any_report(out)
    check("missing sender.json still generates reports", proc.returncode == 0, proc.stderr[:300])
    check("missing sender.json leaves [YOUR NAME]", "[YOUR NAME]" in text)
    check("missing sender.json leaves [REPLY ADDRESS]", "[REPLY ADDRESS]" in text)
    check("missing sender.json warns loudly", "PLACEHOLDERS STILL IN EVERY FILE" in proc.stdout)

    bad = tmp / "bad.json"
    bad.write_text('{"sender": "Dmytro",}', encoding="utf8")  # trailing comma
    proc, _ = run_generate(tmp, sender_file=bad)
    check("malformed sender.json fails hard", proc.returncode != 0,
          f"exit={proc.returncode}")
    check("malformed sender.json says why",
          "not valid JSON" in (proc.stdout + proc.stderr),
          (proc.stdout + proc.stderr)[:300])

    half = tmp / "half.json"
    half.write_text('{"sender": "Dmytro"}', encoding="utf8")
    proc, out = run_generate(tmp, sender_file=half)
    text = any_report(out)
    check("sender without reply uses the sender", "Dmytro" in text)
    check("sender without reply keeps the reply placeholder", "[REPLY ADDRESS]" in text)
    check("sender without reply still warns", "PLACEHOLDERS STILL IN EVERY FILE" in proc.stdout)

    full = tmp / "full.json"
    full.write_text('{"sender": "Full Name", "reply": "a@b.com"}', encoding="utf8")
    proc, out = run_generate(tmp, sender_file=full)
    text = any_report(out)
    check("complete sender.json is used", "Full Name" in text and "a@b.com" in text)
    check("complete sender.json suppresses the warning",
          "PLACEHOLDERS STILL IN EVERY FILE" not in proc.stdout)

    proc, out = run_generate(tmp, "--sender", "CLI Wins", "--reply", "cli@x.com",
                             sender_file=full)
    text = any_report(out)
    check("--sender overrides the file", "CLI Wins" in text and "Full Name" not in text)
    check("--reply overrides the file", "cli@x.com" in text and "a@b.com" not in text)


def test_freshness(tmp: pathlib.Path) -> None:
    today = verified_fixture(tmp, "fresh.json", date.today())
    proc, _ = run_generate(tmp, verified=today)
    check("same-day data produces no stale warning",
          "verification data is" not in proc.stdout, proc.stdout[-300:])

    old = verified_fixture(tmp, "old.json", date.today() - timedelta(days=5))
    proc, _ = run_generate(tmp, verified=old)
    check("5-day-old data warns", "verification data is 5 day(s) old" in proc.stdout,
          proc.stdout[-300:])

    # The regression pair. mtime and content disagree; content must win.
    stale_mtime = verified_fixture(tmp, "fresh-old-mtime.json", date.today())
    ancient = (date.today() - timedelta(days=400))
    os.utime(stale_mtime, (1, 1))  # epoch mtime, as a git clone never would
    proc, _ = run_generate(tmp, verified=stale_mtime)
    check("fresh data with an ancient mtime does NOT warn",
          "verification data is" not in proc.stdout,
          f"mtime is 1970 but generatedOn is today; got: {proc.stdout[-300:]}")

    fresh_mtime = verified_fixture(tmp, "old-fresh-mtime.json", date.today() - timedelta(days=30))
    os.utime(fresh_mtime, None)  # touch to now, as a fresh git clone would
    proc, _ = run_generate(tmp, verified=fresh_mtime)
    check("old data with a brand-new mtime DOES warn",
          "verification data is 30 day(s) old" in proc.stdout,
          f"this is the git-clone case; got: {proc.stdout[-300:]}")

    flat = verified_fixture(tmp, "flat.json", None, drop_meta=True)
    proc, _ = run_generate(tmp, verified=flat)
    check("old flat format is rejected", proc.returncode != 0, f"exit={proc.returncode}")
    check("old flat format explains the fix",
          "generatedOn" in (proc.stdout + proc.stderr),
          (proc.stdout + proc.stderr)[:300])

    absent = tmp / "nope.json"
    proc, _ = run_generate(tmp, verified=absent)
    check("missing verification data is refused", proc.returncode != 0)
    check("missing verification data names 15-verify-wave.py",
          "15-verify-wave.py" in (proc.stdout + proc.stderr))


def test_partial_guard() -> None:
    """A limited run must not touch the canonical files.

    This runs the real verifier against one live site, because the guard is
    about what gets written to disk and a mock would test nothing. The
    canonical files are checksummed and restored if this fails, so a broken
    guard cannot destroy them the way it once did.
    """
    if not (REAL_VERIFIED.exists() and REAL_WAVE_MD.exists()):
        check("canonical files present for the .partial test", False,
              "expected wave-verification.json and outreach-wave-verified.md")
        return

    before = {p: sha(p) for p in (REAL_VERIFIED, REAL_WAVE_MD)}
    backup = pathlib.Path(tempfile.mkdtemp())
    for p in before:
        shutil.copy2(p, backup / p.name)

    partials = [ROOT / "research" / "wave-verification.partial.json",
                ROOT / "research" / "outreach-wave-verified.partial.md"]
    for p in partials:
        p.unlink(missing_ok=True)

    proc = subprocess.run([sys.executable, str(VERIFY), "1"],
                          capture_output=True, text=True, timeout=300)

    damaged = [p for p, h in before.items() if sha(p) != h]
    if damaged:
        for p in before:
            shutil.copy2(backup / p.name, p)
    check("a limited run leaves the canonical files untouched", not damaged,
          f"OVERWROTE {[p.name for p in damaged]} — restored from backup")

    check("a limited run writes the .partial files",
          all(p.exists() for p in partials),
          f"missing: {[p.name for p in partials if not p.exists()]}")
    check("a limited run says it was limited", "LIMITED RUN" in proc.stdout,
          proc.stdout[-200:])

    if (ROOT / "research" / "wave-verification.partial.json").exists():
        body = json.loads((ROOT / "research" / "wave-verification.partial.json").read_text())
        check("the .partial JSON carries generatedOn too", "generatedOn" in body)

    for p in partials:
        p.unlink(missing_ok=True)
    shutil.rmtree(backup, ignore_errors=True)


def main() -> None:
    with tempfile.TemporaryDirectory() as td:
        tmp = pathlib.Path(td)
        test_sender_config(tmp)
        test_freshness(tmp)
    test_partial_guard()

    print(f"{checks} checks run")
    if failures:
        print(f"\n{len(failures)} FAILED:")
        for f in failures:
            print(f"  - {f}")
        raise SystemExit(1)
    print("all passed — signature, freshness and the .partial guard hold")


if __name__ == "__main__":
    main()
