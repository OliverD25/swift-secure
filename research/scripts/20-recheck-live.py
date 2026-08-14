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

# Defaults to prospects-live.csv, but any list with a `domain` column works:
#
#   python research/scripts/20-recheck-live.py --source research/master-outreach-list.csv
#
# That matters because the master outreach list is the file mail is actually
# sent from, and 380 of the domains behind its addresses had never been tested
# for liveness at all. Checking the wrong file is how a list looks verified
# while the addresses that will really be used are unverified.
_src_arg = None
if "--source" in sys.argv:
    _src_arg = sys.argv[sys.argv.index("--source") + 1]
SRC = (ROOT / _src_arg) if _src_arg else (ROOT / "research" / "prospects-live.csv")

# Today's date, so each sweep lands in its own file and an old result is never
# silently replaced. Override with --date YYYY-MM-DD to re-run a previous
# sweep's filename deliberately. This was hardcoded at first, which meant the
# second day's sweep would have been labelled with the first day's date.
STAMP = (sys.argv[sys.argv.index("--date") + 1] if "--date" in sys.argv
         else __import__("datetime").date.today().isoformat())

_nums = [a for a in sys.argv[1:] if a.isdigit()]
LIMIT = int(_nums[0]) if _nums else 0
DEST = ROOT / "research" / (
    f"{SRC.stem}-recheck-{STAMP}{'.partial' if LIMIT else ''}.csv")

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
    if not rows or "domain" not in rows[0]:
        print(f"{SRC.name} has no `domain` column — nothing to test")
        return 1

    # One request per domain, not per row. The master outreach list holds 1,497
    # rows over far fewer sites, because one operator runs several brands.
    # Testing per row would hit the same host repeatedly for no extra
    # information, and look like an attack while doing it.
    seen, deduped = set(), []
    for r in rows:
        d = (r.get("domain") or "").strip().lower()
        if not d or d in seen:
            continue
        seen.add(d)
        deduped.append(r)
    if len(deduped) != len(rows):
        print(f"{len(rows)} rows cover {len(deduped)} distinct domains — testing each once")
    rows = deduped

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
    # The address column is named differently in the two lists that matter:
    # prospects-live.csv calls it contact_email, master-outreach-list.csv calls
    # it email. Reporting zero dead-with-an-address because the column was
    # spelled differently would be a false all-clear on the one number that
    # decides whether the send is safe.
    email_col = next((c for c in ("contact_email", "email") if c in results[0]), None)
    gone_with_email = [r for r in gone if email_col and (r.get(email_col) or "").strip()]

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
    print(f"{SRC.name} was NOT modified.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
