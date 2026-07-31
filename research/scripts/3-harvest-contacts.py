"""Find a reachable address for each live prospect.

A list of domains is not an outreach list. Without a route to a human, every row
needs manual work before it is worth anything, and 500 rows of manual work is
the same as no list at all.

Only publicly published business contact addresses are collected — the ones an
operator puts on a contact or support page precisely so people can write to
them. Affiliate and partnership addresses rank above generic support because
this pitch is a partnership, and support desks bin partnership mail.
"""
import csv, pathlib, re, ssl, sys, socket, html
import concurrent.futures as cf
import urllib.request, urllib.error
from collections import Counter

ROOT = pathlib.Path("E:/codespace/_claude_code/swift-secured-badge")
SRC = ROOT / "research" / "prospects-live.csv"
DEST = ROOT / "research" / "prospects-live.csv"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}")

# Ordered by how likely the recipient is to own this decision.
PREFERRED = ["affiliate", "partner", "marketing", "b2b", "business", "media",
             "press", "commercial", "info", "hello", "contact", "support", "help"]

JUNK = re.compile(r"\.(png|jpe?g|gif|svg|webp|css|js|woff2?)$|sentry|wixpress"
                  r"|example\.|@2x|placeholder|yourdomain|domain\.com", re.I)

PATHS = ["/contact", "/contact-us", "/contacts", "/support", "/about-us", "/"]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA,
                                               "Accept-Language": "en-GB,en;q=0.9"})
    with urllib.request.urlopen(req, timeout=12, context=ctx) as r:
        return r.read(150_000).decode("utf8", "ignore")


def score(addr, domain):
    local = addr.split("@")[0].lower()
    host = addr.split("@")[-1].lower()
    s = 0
    for i, p in enumerate(PREFERRED):
        if local.startswith(p):
            s += (len(PREFERRED) - i) * 10
            break
    # An address on the operator's own domain is far more likely to be real
    # than a gmail scraped out of a third-party widget.
    if host.endswith(domain) or domain.endswith(host):
        s += 60
    return s


def harvest(row):
    d = row["domain"]
    out = dict(row)
    out["contact_email"] = ""
    out["contact_source"] = ""
    found = {}
    for path in PATHS:
        url = f"https://{d}{path}"
        try:
            body = fetch(url)
        except Exception:
            continue
        for m in EMAIL.findall(body):
            a = html.unescape(m).strip(".,;:'\"()<>").lower()
            if JUNK.search(a) or len(a) > 70:
                continue
            found.setdefault(a, path)
        if found:
            break
    if found:
        best = max(found, key=lambda a: score(a, d))
        out["contact_email"] = best
        out["contact_source"] = f"https://{d}{found[best]}"
        others = [a for a in found if a != best][:3]
        out["notes"] = ("also: " + ", ".join(others)) if others else ""
    return out


rows = list(csv.DictReader(SRC.open(encoding="utf8")))
print(f"harvesting contacts for {len(rows)} live prospects...")

results = []
with cf.ThreadPoolExecutor(max_workers=20) as ex:
    for i, r in enumerate(ex.map(harvest, rows), 1):
        results.append(r)
        if i % 100 == 0:
            print(f"  {i}/{len(rows)}  with email: {sum(1 for x in results if x['contact_email'])}")

# Contactable rows first: that is the order anyone actually works the list in.
results.sort(key=lambda r: (r["contact_email"] == "", r["issued"]), reverse=False)
results.sort(key=lambda r: (r["contact_email"] == "",))

with DEST.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(results[0].keys()))
    w.writeheader()
    w.writerows(results)

withmail = [r for r in results if r["contact_email"]]
print(f"\nwith a contact address: {len(withmail)} / {len(results)}")
print("top mailbox types:", Counter(r["contact_email"].split("@")[0].split(".")[0]
                                    for r in withmail).most_common(8))
print(f"wrote -> {DEST}")
