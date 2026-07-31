"""Check which register domains are actually live, and read their real brand name.

The register lists domains a licence *covers*, not domains anyone built. Plenty
are parked, redirected, or never launched. Emailing those wastes the only thing
that is genuinely scarce here: first-contact attempts and sender reputation.
"""
import csv, pathlib, re, socket, ssl, sys, html
import concurrent.futures as cf
import urllib.request, urllib.error

ROOT = pathlib.Path("E:/codespace/_claude_code/swift-secured-badge")
SRC = ROOT / "research" / "prospects.csv"
DEST = ROOT / "research" / "prospects-live.csv"

LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 900

rows = list(csv.DictReader(SRC.open(encoding="utf8")))
rows = [r for r in rows if r["already_listed"] == "no"][:LIMIT]
print(f"checking {len(rows)} newest un-listed domains...")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PARKED = re.compile(
    r"domain (is )?(for sale|parking)|buy this domain|sedo|godaddy|namecheap parking"
    r"|website coming soon|under construction|default web page|apache2 ubuntu",
    re.I)


def check(row):
    d = row["domain"]
    out = dict(row)
    out.update(live="no", http="", title="", reason="")
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
            if m:
                out["title"] = html.unescape(re.sub(r"\s+", " ", m.group(1))).strip()[:90]
            if PARKED.search(body) or PARKED.search(out["title"]):
                out["reason"] = "parked / placeholder"
                return out
            if len(body.strip()) < 400:
                out["reason"] = "near-empty response"
                return out
            out["live"] = "yes"
            return out
        except urllib.error.HTTPError as e:
            out["http"] = str(e.code)
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

# The page title is what the operator calls themselves; the domain stem is what
# a regex guessed. Prefer the former for anything a human will read.
for r in live:
    t = r["title"]
    if t:
        cleaned = re.split(r"\s*[|\-–—:·]\s*", t)[0].strip()
        if 2 < len(cleaned) < 40:
            r["brand"] = cleaned

with DEST.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(live[0].keys()))
    w.writeheader()
    w.writerows(live)

dead = [r for r in results if r["live"] != "yes"]
from collections import Counter
print(f"\nlive: {len(live)}   dead/parked: {len(dead)}")
print("why not live:", Counter(r["reason"] for r in dead).most_common(6))
print(f"wrote -> {DEST}")
