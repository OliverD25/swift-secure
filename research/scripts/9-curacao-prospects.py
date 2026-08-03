"""Turn the expanded Curaçao licences into a prospect list.

The certificates yield 4,177 domains, but that is not 4,177 casinos. Operators
in blocked markets rotate through numbered mirrors — `marsbahis` alone accounts
for 484 domains of one brand — so counting domains would overstate the market by
roughly half and produce an outreach list that mails the same casino hundreds of
times.

Domains are therefore collapsed to a brand stem, keeping the cleanest domain as
the one to contact and recording how many mirrors sit behind it. A large mirror
count is itself worth knowing: it means the operator is fighting ISP blocking,
which says something about their market.
"""
import csv, json, pathlib, re
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / "research"

expanded = json.loads((R / "curacao-expanded.json").read_text(encoding="utf8"))

# Re-read status and dates from the register rather than trusting what the
# expander carried through. That step parsed the CSV by splitting on commas,
# and the date fields contain commas ("February 28, 2026"), so every column
# after the first date was shifted — every licence came back "under assessment".
register = {}
for r in csv.DictReader((R / "curacao-register.csv").open(encoding="utf8")):
    register[r["licence"]] = r

existing = set()
live_path = R / "prospects-live.csv"
if live_path.exists():
    existing = {r["domain"].lower() for r in csv.DictReader(live_path.open(encoding="utf8"))}


def stem(domain: str) -> str:
    """Brand identity with mirror numbering removed."""
    label = domain.rsplit(".", 1)[0].split(".")[-1]
    return re.sub(r"[-_]+", "", re.sub(r"\d+", "", label)) or domain


def cleanliness(domain: str) -> tuple:
    """Prefer the domain a human would recognise: no digits, shortest, .com."""
    label = domain.rsplit(".", 1)[0]
    tld = domain.rsplit(".", 1)[-1]
    return (bool(re.search(r"\d", label)), len(domain), tld != "com")


groups = defaultdict(list)
meta = {}
for rec in expanded:
    if not rec.get("found"):
        continue
    for d in rec["domains"]:
        key = (rec["licence"], stem(d))
        groups[key].append(d.lower())
        meta[key] = rec

rows = []
for (licence, brand), domains in groups.items():
    rec = meta[(licence, brand)]
    reg = register.get(licence, {})
    domains = sorted(set(domains), key=cleanliness)
    primary = domains[0]
    rows.append({
        "domain": primary,
        "brand_stem": brand,
        "mirrors": len(domains) - 1,
        "operator": reg.get("company") or rec.get("certCompany", ""),
        "licence": licence,
        "jurisdiction": "Curacao",
        "licence_status": reg.get("status", "unknown"),
        "expires": reg.get("expires", ""),
        "already_in_pool": "yes" if primary in existing else "no",
        "all_domains": " ".join(domains[:8]),
    })

# Biggest portfolios first: one conversation covering many brands is worth more
# than one covering a single site.
by_operator = defaultdict(int)
for r in rows:
    by_operator[r["operator"]] += 1
rows.sort(key=lambda r: (-by_operator[r["operator"]], r["operator"], -r["mirrors"]))

dest = R / "curacao-prospects.csv"
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) + ["status", "contacted_on"])
    w.writeheader()
    for r in rows:
        w.writerow({**r, "status": "not contacted", "contacted_on": ""})

active = [r for r in rows if r["licence_status"] == "active"]
revoked = [r for r in rows if r["licence_status"] == "revoked"]
new = [r for r in rows if r["already_in_pool"] == "no"]

print(f"brands: {len(rows)}   operators: {len(by_operator)}")
print(f"  licence active            : {len(active)}")
print(f"  licence under assessment  : {len(rows) - len(active) - len(revoked)}")
print(f"  licence REVOKED           : {len(revoked)}")
print(f"  not already in our pool   : {len(new)}")
print(f"  brands with mirrors       : {sum(1 for r in rows if r['mirrors'])}")
print(f"wrote {dest}")

print("\n--- operators with the most brands ---")
for op, n in sorted(by_operator.items(), key=lambda x: -x[1])[:8]:
    print(f"  {n:>3}  {op[:44]}")

if revoked:
    print("\n--- brands on a REVOKED licence (public page only, never the report) ---")
    for r in revoked[:10]:
        print(f"  {r['domain'][:32]:34} {r['operator'][:30]}")
