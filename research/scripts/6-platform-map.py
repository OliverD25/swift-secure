"""Work out which platform each casino runs on.

A white-label platform launches dozens of brands, so one platform deal reaches
a client base it would take months to approach one at a time. This is the
partnership channel, and it needs a map before it needs a pitch.

Built from hosts already captured by the market scan — no new crawling. A host
appearing across many independent operators is shared infrastructure; a host on
one site is that operator's own stack, and cross-site frequency is the only
thing separating the two.
"""
import json, pathlib, re, csv
from collections import defaultdict, Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / "research"

scan = json.loads((R / "market-scan.json").read_text(encoding="utf8"))
live = {r["domain"]: r for r in csv.DictReader((R / "prospects-live.csv").open(encoding="utf8"))}

# Named where the host says so outright; inferred where the signature is
# consistent but the brand is not in the hostname. The distinction matters —
# one is a fact, the other is a reading, and a sales call will expose the
# difference.
NAMED = [
    ("BetConstruct", r"betconstruct|bcapps|cmsbetconstruct", "named"),
    ("SoftSwiss", r"softswiss|sswiss", "named"),
    ("EveryMatrix", r"everymatrix", "named"),
    ("Digitain", r"digitain", "named"),
    ("Pronet Gaming", r"pronetgaming", "named"),
    ("Altenar", r"altenar", "named"),
    ("Slotegrator", r"traincdn|slotegrator", "inferred"),
    ("A8R / launcher", r"a8r\.games", "inferred"),
    ("EBetLab", r"ebetlab", "inferred"),
    ("s7s platform", r"s7s\.ai", "inferred"),
]

per_site = {}
host_sites = defaultdict(set)
for r in scan:
    if not r.get("ok"):
        continue
    hosts = set(r.get("third") or [])
    per_site[r["domain"]] = hosts
    for h in hosts:
        host_sites[h].add(r["domain"])

rows = []
for domain, hosts in per_site.items():
    hit = None
    for name, pat, confidence in NAMED:
        matched = [h for h in hosts if re.search(pat, h, re.I)]
        if matched:
            hit = (name, confidence, matched[0])
            break
    rows.append({
        "domain": domain,
        "brand": (live.get(domain) or {}).get("brand", ""),
        "operator": (live.get(domain) or {}).get("operator", ""),
        "platform": hit[0] if hit else "",
        "confidence": hit[1] if hit else "",
        "evidence_host": hit[2] if hit else "",
    })

rows.sort(key=lambda r: (r["platform"] == "", r["platform"], r["domain"]))
dest = R / "platform-map.csv"
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

known = [r for r in rows if r["platform"]]
by_plat = Counter(r["platform"] for r in known)
print(f"sites analysed: {len(rows)}   platform identified: {len(known)}  ({len(known)/len(rows)*100:.0f}%)")
print(f"wrote -> {dest}\n")
print(f"{'brands':>6}  {'confidence':<9}  platform")
for p, n in by_plat.most_common():
    conf = next(r["confidence"] for r in known if r["platform"] == p)
    print(f"{n:>6}  {conf:<9}  {p}")

# Unidentified shared hosts are the next platforms to name — anything on many
# independent operators is infrastructure somebody sells.
print(f"\n--- unnamed hosts on 5+ operators (candidates to identify) ---")
named_pat = "|".join(p for _, p, _ in NAMED)
noise = re.compile(r"google|facebook|cloudflare|jsdelivr|zdassets|onesignal|hotjar|"
                   r"contentsquare|livechat|telegram|ipify|ipapi|cloudfront|doubleclick|"
                   r"pushengage|amazonaws|akamai|jquery|gstatic|" + named_pat, re.I)
cands = [(h, len(s)) for h, s in host_sites.items() if len(s) >= 5 and not noise.search(h)]
for h, n in sorted(cands, key=lambda x: -x[1])[:15]:
    print(f"  {n:>3} sites  {h}")
