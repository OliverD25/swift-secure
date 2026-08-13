"""Re-test the domains already in prospects-live.csv, without rebuilding it.

    python research/scripts/20-recheck-live.py [limit]

WHY THIS IS NOT 2-check-live.py. That script builds the list: it reads
prospects.csv, keeps whatever answers, and writes prospects-live.csv. Running it
again before a send would do two damaging things.

  1. It rebuilds from the register list, so every column added afterwards is
     gone. As of 13 August 2026 that is 66 contact emails, 66 contact sources
     and 19 notes, none of which exist anywhere else.
  2. It overwrites the file in place. A run with a small limit for testing
     replaces a full sweep - which is exactly what destroyed a 489-site result
     on 2 August 2026.

This script answers the question actually being asked before an outreach wave:
"are the 491 addresses on my list still live?" It reads prospects-live.csv,
re-tests each domain, and writes a SEPARATE dated file. It never writes
prospects-live.csv. Deciding what to do with a domain that has gone dark is a
judgement call, and it stays with the person doing the sending.

The liveness logic is deliberately identical to 2-check-live.py, so a
disagreement between the two runs means the site changed, not that the test did.
"""
import csv
import html
import pathlib
import re
import socket
import ssl
import sys
import urllib.error
import urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "research" / "prospects-live.csv"

# Passed on the command line rather than read from a clock: a dated filename has
# to be reproducible when this is re-run, and a machine date makes yesterday's
# output impossible to overwrite deliberately.
STAMP = "2026-08-13"

LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 0
DEST = ROOT / "research" / (
    f"prospects-live-recheck-{STAMP}.partial.csv" if LIMIT
    else f"prospects-live-recheck-{STAMP}.csv")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PARKED = re.compile(
    r"domain (is )?(for sale|parking)|buy this domain|sedo|godaddy|namecheap parking"
    r"|website coming soon|under construction|default web page|apache2 ubuntu",
    re.I)


def check(row: dict) -> dict:
    d = row["domain"]
    out = dict(row)
    out.update(recheck_live="no", recheck_http="", recheck_title="",
               recheck_reason="", recheck_date=STAMP)
    try:
        socket.setdefaulttimeout(8)
        socket.gethostbyname(d)
    except Exception:
        out["recheck_reason"] = "DNS does not resolve"
        return out
    for scheme in ("https", "http"):
        try:
            req = urllib.request.Request(
                f"{scheme}://{d}/",
                headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})
            with urllib.request.urlopen(req, timeout=12, context=ctx) as resp:
                out["recheck_http"] = str(resp.status)
                body = resp.read(60_000).decode("utf8", "ignore")
            m = re.search(r"<title[^>]*>(.*?)</title>", body, re.S | re.I)
            if m:
                out["recheck_title"] = html.unescape(
                    re.sub(r"\s+", " ", m.group(1))).strip()[:90]
            if PARKED.search(body) or PARKED.search(out["recheck_title"]):
                out["recheck_reason"] = "parked / placeholder"
                return out
            if len(body.strip()) < 400:
                out["recheck_reason"] = "near-empty response"
                return out
            out["recheck_live"] = "yes"
            return out
        except urllib.error.HTTPError as e:
            out["recheck_http"] = str(e.code)
            out["recheck_reason"] = f"HTTP {e.code}"
        except Exception as e:
            out["recheck_reason"] = type(e).__name__
    return out


def main() -> int:
    if not SRC.exists():
        print(f"no {SRC} to re-check")
        return 1
    rows = list(csv.DictReader(SRC.open(encoding="utf8")))
    if LIMIT:
        rows = rows[:LIMIT]
        print(f"LIMITED RUN: {len(rows)} rows -> {DEST.name} "
              f"(the full file is untouched)")
    print(f"re-testing {len(rows)} domains from {SRC.name}...")

    results = []
    with ThreadPoolExecutor(max_workers=24) as ex:
        for i, r in enumerate(ex.map(check, rows), 1):
            results.append(r)
            if i % 100 == 0:
                ok = sum(1 for x in results if x["recheck_live"] == "yes")
                print(f"  {i}/{len(rows)}  still live: {ok}")

    # A 403, 429 or 503 almost never means the casino is gone. It means a bot
    # filter answered instead of the site, and these 491 all passed the same
    # test on 31 July. Folding them in with genuinely dead domains would quietly
    # delete live prospects from an outreach list, which is the opposite of what
    # this script is for. They are separated so the reader decides.
    BLOCKED_CODES = {"403", "429", "503"}
    for r in results:
        if r["recheck_live"] == "yes":
            r["recheck_verdict"] = "live"
        elif r["recheck_http"] in BLOCKED_CODES:
            r["recheck_verdict"] = "blocked"
        else:
            r["recheck_verdict"] = "gone"

    fields = list(rows[0].keys()) + ["recheck_verdict", "recheck_live", "recheck_http",
                                     "recheck_title", "recheck_reason", "recheck_date"]
    fields = list(dict.fromkeys(fields))
    with DEST.open("w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(results)

    live = [r for r in results if r["recheck_verdict"] == "live"]
    blocked = [r for r in results if r["recheck_verdict"] == "blocked"]
    gone = [r for r in results if r["recheck_verdict"] == "gone"]
    gone_with_email = [r for r in gone if (r.get("contact_email") or "").strip()]

    print(f"\nstill live : {len(live)} of {len(results)}")
    print(f"blocked    : {len(blocked)}  (bot protection answering us, not a dead site -")
    print(f"             these are almost certainly fine to contact)")
    if blocked:
        print("  how:", Counter(r["recheck_reason"] for r in blocked).most_common(6))
    print(f"gone       : {len(gone)}")
    if gone:
        print("  why:", Counter(r["recheck_reason"] for r in gone).most_common(8))
    print(f"\nof the {len(gone)} gone, {len(gone_with_email)} have a harvested contact "
          f"email - those are the ones that would be emailed into a void")
    print(f"\nwrote -> {DEST}")
    print("prospects-live.csv was NOT modified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
