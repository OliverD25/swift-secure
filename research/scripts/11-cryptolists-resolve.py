"""Resolve CryptoLists affiliate redirects into real casino domains.

Step 2 of the CryptoLists pipeline. Step 1 (crawler/cryptolists-scrape.mjs)
collected 767 "/goto/<slug>" affiliate links from the JS-rendered listing.
Those are not casino domains — following one is what reveals the domain, and
the redirect itself is a plain HTTP 301, so this needs no browser.

Reuses the blocked-vs-dead distinction from script 10 (Curacao): a site that
returns 401/403/429/451 is not evidence of a dead domain, it is evidence we
were refused. Counting a refusal as a death is the mistake that produced the
"0 live" false result on the first Curacao pass this session.
"""
import csv, html, json, pathlib, re, socket, ssl, sys
import concurrent.futures as cf
import urllib.request, urllib.error
from urllib.parse import urlsplit
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / "research"

listing = json.loads((R / "cryptolists-listing.json").read_text(encoding="utf8"))
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else None
if LIMIT:
    listing = listing[:LIMIT]
print(f"resolving {len(listing)} CryptoLists redirects...")

# Domains already covered by the other two pools. A CryptoLists hit on one of
# these is not a new prospect, and duplicate outreach to an already-known
# casino is exactly the kind of thing this project has flagged as wasteful.
existing = set()
for fname, col in [("prospects-live.csv", "domain"), ("curacao-prospects-live.csv", "domain")]:
    p = R / fname
    if p.exists():
        existing |= {r[col].lower() for r in csv.DictReader(p.open(encoding="utf8"))}

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PARKED = re.compile(
    r"domain (is )?(for sale|parking)|buy this domain|sedo|godaddy|namecheap parking"
    r"|website coming soon|under construction|default web page|apache2 ubuntu",
    re.I)
BLOCKED = re.compile(
    r"forbidden|access denied|^403|attention required|just a moment|checking your browser"
    r"|cloudflare access|temporary auth|not available in your (country|region)",
    re.I)
BLOCKED_STATUS = {401, 403, 429, 451}


def clean_brand(raw_name: str, fallback_slug: str) -> str:
    if raw_name and 2 < len(raw_name) < 40:
        return raw_name
    return fallback_slug.replace("-", " ").title()


def norm_stem(s: str) -> str:
    """Strip digits and separators so 'spin-mama' and 'spinmama99' compare
    the same way. Mirrors the mirror-domain heuristic already used for the
    Curacao pool, applied here to a different problem."""
    return re.sub(r"[\d_-]+", "", s.lower())


def looks_like_the_casino(slug: str, domain: str, path: str) -> bool:
    """The redirect target is trusted only if it plausibly IS the casino.

    A manual trace of 10 sample redirects found 6 of 10 landing on an
    affiliate network's own domain — go.charmaffiliates.com, a
    7starpartners.com tracking portal, a shared landing-page host
    (landingstool.eu/<slug>/index.html) — never the casino itself. Following
    a redirect and keeping whatever domain it ends on is not good enough for
    this source; the domain has to resemble the brand being followed.
    """
    stem = norm_stem(slug)
    dom_stem = norm_stem(domain.split(".")[0])
    brand_match = len(stem) >= 4 and (stem in dom_stem or dom_stem in stem)
    root_path = path in ("", "/")
    return brand_match and root_path


def resolve(rec):
    slug = rec["slug"]
    out = {
        "slug": slug,
        "cryptolists_name": rec.get("name", ""),
        "brand": clean_brand(rec.get("name", ""), slug),
        "is_new": "yes" if rec.get("isNew") else "no",
        "vpn_friendly": "yes" if rec.get("vpnFriendly") else "no",
        "no_kyc": "yes" if rec.get("noKyc") else "no",
        "cryptolists_rating": rec.get("rating", ""),
        "domain": "",
        "confidence": "low",
        "live": "no",
        "already_in_pool": "no",
        "title": "",
        "reason": "",
    }
    goto = f"https://www.cryptolists.com/goto/{slug}"
    try:
        socket.setdefaulttimeout(10)
        req = urllib.request.Request(goto, headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            final_url = resp.geturl()
            # A naive split("/") cannot tell "luckycoin.com/?ap=scaleo" (root,
            # just a query string) from "landingstool.eu/sagaspins/index.html"
            # (a real subpath) — both have content after the third slash. The
            # first version of this check used split("/") and called every
            # root-path redirect "low confidence" because of it, including the
            # exact-match cases (luckycoin -> luckycoin.com) it exists to catch.
            parsed = urlsplit(final_url)
            domain = re.sub(r"^www\.", "", parsed.netloc).lower()
            path = parsed.path or "/"
            out["domain"] = domain
            out["confidence"] = "high" if looks_like_the_casino(slug, domain, path) else "low"
            if domain in existing:
                out["already_in_pool"] = "yes"
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
        return out
    except urllib.error.HTTPError as e:
        out["reason"] = (f"blocked (HTTP {e.code}, not evidence of dead — unmeasured)"
                         if e.code in BLOCKED_STATUS else f"HTTP {e.code}")
        # The redirect target is known even on an HTTP error response.
        try:
            out["domain"] = re.sub(r"^www\.", "", e.geturl().split("/")[2]).lower()
        except Exception:
            pass
        return out
    except Exception as e:
        out["reason"] = type(e).__name__
        return out


results = []
with cf.ThreadPoolExecutor(max_workers=16) as ex:
    for i, r in enumerate(ex.map(resolve, listing), 1):
        results.append(r)
        if i % 100 == 0:
            print(f"  {i}/{len(listing)}  live so far: {sum(1 for x in results if x['live']=='yes')}")

live = [r for r in results if r["live"] == "yes"]
dest = R / "cryptolists-prospects.csv"
if live:
    with dest.open("w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=list(live[0].keys()))
        w.writeheader()
        w.writerows(live)

dead = [r for r in results if r["live"] != "yes"]
blocked = [r for r in dead if r["reason"].startswith("blocked")]
new_only = [r for r in live if r["already_in_pool"] == "no"]
high_conf = [r for r in live if r["confidence"] == "high"]

print(f"\nlive: {len(live)}   dead/parked: {len(dead) - len(blocked)}   blocked (unmeasured): {len(blocked)}")
print(f"already in Anjouan/Curacao pools: {len(live) - len(new_only)}")
print(f"genuinely NEW live prospects: {len(new_only)}")
print(f"  high confidence (domain matches the brand) : {len(high_conf)}")
print(f"  low confidence (redirect may be an affiliate")
print(f"    network domain, not the casino itself)   : {len(live) - len(high_conf)}")
print("why not live:", Counter(r["reason"] for r in dead).most_common(6))
if live:
    print(f"wrote -> {dest}")
