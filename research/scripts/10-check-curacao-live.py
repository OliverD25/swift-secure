"""Check which Curacao brand domains are actually live.

Same reasoning as script 2 for the Anjouan pool: a licence certificate names a
domain the operator is *approved* to run, not one they necessarily built.
Parked, dead and placeholder domains waste the one scarce resource outreach
has — first-contact attempts.

Reuses the parked-page heuristics from script 2 rather than importing it,
because the input schema differs (curacao-prospects.csv has operator/licence/
mirrors columns that prospects.csv does not) and it is 2,187 rows rather than
900, so this is a separate pass rather than a shared function worth abstracting
before there is a second real caller.
"""
import csv, pathlib, re, socket, ssl, sys, html
import concurrent.futures as cf
import urllib.request, urllib.error
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "research" / "curacao-prospects.csv"
DEST = ROOT / "research" / "curacao-prospects-live.csv"

LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else None

rows = list(csv.DictReader(SRC.open(encoding="utf8")))
if LIMIT:
    rows = rows[:LIMIT]
print(f"checking {len(rows)} Curacao brand domains...")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PARKED = re.compile(
    r"domain (is )?(for sale|parking)|buy this domain|sedo|godaddy|namecheap parking"
    r"|website coming soon|under construction|default web page|apache2 ubuntu",
    re.I)

# Casino-specific block signals seen already in this project — same wording the
# seal-census detector treats as "blocked, not absent".
BLOCKED = re.compile(
    r"forbidden|access denied|^403|attention required|just a moment|checking your browser"
    r"|cloudflare access|temporary auth|not available in your (country|region)",
    re.I)


# Status codes that mean "this requester was refused", not "nothing is here".
# 451 is the one that mattered: a spot-check via a German residential proxy
# showed all three sample domains returning 451 to this machine's Ukrainian
# IP were live sites elsewhere — one redirects to a working mirror, one hits a
# Cloudflare bot-challenge. Counting 451 as dead would have discarded a real
# geo-block, not a dead domain, exactly as the earlier seal-census bug did.
BLOCKED_STATUS = {401, 403, 429, 451}


def check(row):
    d = row["domain"]
    out = dict(row)
    out.update(live="no", http="", title="", reason="", brand_name="")
    try:
        socket.setdefaulttimeout(8)
        socket.gethostbyname(d)
    except Exception:
        out["reason"] = "DNS does not resolve"
        return out
    for scheme in ("https", "http"):
        try:
            req = urllib.request.Request(f"{scheme}://{d}/",
                                         headers={"User-Agent": UA,
                                                  "Accept-Language": "en-GB,en;q=0.9"})
            with urllib.request.urlopen(req, timeout=12, context=ctx) as resp:
                out["http"] = str(resp.status)
                body = resp.read(60_000).decode("utf8", "ignore")
            m = re.search(r"<title[^>]*>(.*?)</title>", body, re.S | re.I)
            title = ""
            if m:
                title = html.unescape(re.sub(r"\s+", " ", m.group(1))).strip()[:90]
                out["title"] = title
            if PARKED.search(body) or PARKED.search(title):
                out["reason"] = "parked / placeholder"
                return out
            if BLOCKED.search(title) or BLOCKED.search(body[:2000]):
                out["reason"] = "blocked (not evidence of dead — unmeasured)"
                return out
            if len(body.strip()) < 400:
                out["reason"] = "near-empty response"
                return out
            out["live"] = "yes"
            if title:
                cleaned = re.split(r"\s*[|\-–—:·]\s*", title)[0].strip()
                if 2 < len(cleaned) < 40:
                    out["brand_name"] = cleaned
            return out
        except urllib.error.HTTPError as e:
            out["http"] = str(e.code)
            if e.code in BLOCKED_STATUS:
                out["reason"] = f"blocked (HTTP {e.code}, not evidence of dead — unmeasured)"
                return out
            out["reason"] = f"HTTP {e.code}"
        except Exception as e:
            out["reason"] = type(e).__name__
    return out


results = []
with cf.ThreadPoolExecutor(max_workers=24) as ex:
    for i, r in enumerate(ex.map(check, rows), 1):
        results.append(r)
        if i % 100 == 0:
            print(f"  {i}/{len(rows)}  live so far: {sum(1 for x in results if x['live']=='yes')}")

live = [r for r in results if r["live"] == "yes"]
if live:
    with DEST.open("w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=list(live[0].keys()))
        w.writeheader()
        w.writerows(live)

dead = [r for r in results if r["live"] != "yes"]
blocked = [r for r in dead if r["reason"].startswith("blocked")]
print(f"\nlive: {len(live)}   dead/parked: {len(dead) - len(blocked)}   blocked (unmeasured): {len(blocked)}")
print("why not live:", Counter(r["reason"] for r in dead).most_common(6))
if live:
    print(f"wrote -> {DEST}")
