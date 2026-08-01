"""Group the live prospects by the company that owns them.

491 brands are run by 259 companies. Working the brand list means mailing one
operator up to 27 times, which reads as spam and burns the only first contact
available. Pitched once at operator level, a single yes from a large group
delivers every one of its brands.
"""
import csv, pathlib, re
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
rows = list(csv.DictReader((ROOT / "research/prospects-live.csv").open(encoding="utf8")))

groups = defaultdict(list)
for r in rows:
    groups[(r["operator"] or "unknown").strip()].append(r)

# A registration number where a company name should be. Costa Rica corporate
# IDs look like this and carry no gaming oversight — flag rather than drop,
# because they are still real operators worth contacting.
NUMERIC_NAME = re.compile(r"^\d[\d-]*\s*(SRL|S\.R\.L\.?|SA|LLC)?$", re.I)

out = []
for op, brands in groups.items():
    brands.sort(key=lambda r: r["issued"], reverse=True)
    emails = [b["contact_email"] for b in brands if b["contact_email"]]
    out.append({
        "operator": op,
        "brands": len(brands),
        "contact_email": emails[0] if emails else "",
        "reachable": "yes" if emails else "no",
        "flagship_brand": brands[0]["brand"],
        "flagship_site": brands[0]["site"],
        "newest_licence": brands[0]["issued"],
        "name_is_reg_number": "yes" if NUMERIC_NAME.match(op) else "no",
        "all_domains": " ".join(b["domain"] for b in brands[:30]),
        "status": "not contacted",
        "contacted_on": "",
        "notes": "",
    })

# Biggest groups first: same effort per email, far more badges per yes.
out.sort(key=lambda r: (-r["brands"], r["reachable"] == "no"))

dest = ROOT / "research" / "prospects-by-operator.csv"
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
    w.writeheader()
    w.writerows(out)

multi = [r for r in out if r["brands"] > 1]
print(f"operators: {len(out)}   multi-brand: {len(multi)}   reachable now: {sum(1 for r in out if r['reachable']=='yes')}")
print(f"brands covered by the top 10 operators: {sum(r['brands'] for r in out[:10])}")
print(f"wrote -> {dest}\n")
print(f"{'brands':>6}  {'email?':6}  operator")
for r in out[:12]:
    print(f"{r['brands']:>6}  {r['reachable']:6}  {r['operator'][:52]}")
