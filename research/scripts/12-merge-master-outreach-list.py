"""Merge all three prospect sources into one master outreach list.

Three pools exist because they were built at different times with different
tools, and each has grown its own schema. Working outreach from three files
means checking three places before writing to anyone and three places to mark
someone contacted — the exact condition that produces duplicate or missed
contact. This script is the one place that changes when a fourth source shows
up; the output is the one file to actually work from.

Anjouan is the only pool with harvested contact emails and a trust-signal tier
(A/B/C). Curacao and CryptoLists have real, licence- or redirect-confirmed
domains but no contact-harvest pass has been run on them yet — that is future
work, and running it should update THIS file in place rather than spawn a
fourth CSV.

Two safety rules enforced here, both from standing project policy:
  - A row already covered by an earlier pool is not added again — each
    source's own already_in_pool column, computed at resolve time, is trusted.
  - A Curacao brand on a REVOKED licence is flagged DO NOT EMAIL rather than
    silently included or silently dropped. Per AGENTS.md, a revoked licence a
    casino still displays is a public-verification-page finding, never an
    operator email — the operator already knows their own licence status.
"""
import csv, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / "research"

COLS = ["source", "tier", "domain", "brand", "email", "email_source",
        "operator", "licence", "licence_status", "expiry", "confidence",
        "flag", "status", "contacted_on"]

rows = []

# --- Anjouan: complete data, carried through unchanged -------------------
for r in csv.DictReader((R / "outreach-list.csv").open(encoding="utf8")):
    rows.append({
        "source": "anjouan", "tier": r["tier"], "domain": r["domain"], "brand": r["brand"],
        "email": r["email"], "email_source": r["email_source"], "operator": r["operator"],
        "licence": r["licence"], "licence_status": "", "expiry": r["expiry"],
        "confidence": "licence-matched", "flag": "",
        "status": r["status"], "contacted_on": r["contacted_on"],
    })

# --- Curacao: licence-confirmed domain, no contact harvest yet -----------
curacao_added = curacao_revoked = 0
for r in csv.DictReader((R / "curacao-prospects-live.csv").open(encoding="utf8")):
    if r["already_in_pool"] != "no":
        continue
    revoked = r["licence_status"] == "revoked"
    rows.append({
        "source": "curacao", "tier": "", "domain": r["domain"],
        "brand": r["brand_name"] or r["brand_stem"], "email": "", "email_source": "",
        "operator": r["operator"], "licence": r["licence"], "licence_status": r["licence_status"],
        "expiry": r["expires"], "confidence": "licence-matched",
        "flag": "DO NOT EMAIL — revoked licence, public page only (see AGENTS.md)" if revoked else "",
        "status": "not contacted", "contacted_on": "",
    })
    curacao_added += 1
    curacao_revoked += revoked

# --- CryptoLists: redirect-resolved, confidence-scored, no contact yet ---
cl_added = cl_low = 0
for r in csv.DictReader((R / "cryptolists-prospects.csv").open(encoding="utf8")):
    if r["already_in_pool"] != "no":
        continue
    low = r["confidence"] == "low"
    rows.append({
        "source": "cryptolists", "tier": "", "domain": r["domain"], "brand": r["brand"],
        "email": "", "email_source": "", "operator": "", "licence": "", "licence_status": "",
        "expiry": "", "confidence": r["confidence"],
        "flag": "verify this is really the casino before contacting — redirect confidence is low"
                if low else "",
        "status": "not contacted", "contacted_on": "",
    })
    cl_added += 1
    cl_low += low

# Dedupe by domain. Two distinct causes surfaced on the first merge: several
# CryptoLists casino names resolve through the same shared landing-page host
# (landingstool.eu served three different "casinos"), and one Curacao operator
# — KE International Limited N.V. — appears twice for keint.co, apparently
# covered by two separate licences. Neither is a reason to write to the same
# domain twice. Keep the most useful row per domain: has an email > is not
# flagged > is not low-confidence.
def quality(r):
    return (r["email"] == "", bool(r["flag"]), r["confidence"] == "low")

best_by_domain = {}
for r in rows:
    cur = best_by_domain.get(r["domain"])
    if cur is None or quality(r) < quality(cur):
        best_by_domain[r["domain"]] = r
dupes_removed = len(rows) - len(best_by_domain)
rows = list(best_by_domain.values())

# Contactable-today rows first, then by source so each pool stays grouped —
# working through this by hand means finishing one pool's manual steps
# (contact harvesting, domain verification) before starting the next.
order = {"anjouan": 0, "curacao": 1, "cryptolists": 2}
rows.sort(key=lambda r: (r["email"] == "", order[r["source"]], r["flag"] != ""))

dest = R / "master-outreach-list.csv"
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=COLS)
    w.writeheader()
    w.writerows(rows)

with_email = sum(1 for r in rows if r["email"])
flagged = sum(1 for r in rows if r["flag"])
print(f"=== master-outreach-list.csv: {len(rows)} rows ({dupes_removed} cross-source duplicate domains merged) ===")
print(f"  anjouan     : {sum(1 for r in rows if r['source']=='anjouan')}  "
      f"(carried through unchanged, {sum(1 for r in rows if r['source']=='anjouan' and r['email'])} with email)")
print(f"  curacao     : {curacao_added}  ({curacao_revoked} flagged DO NOT EMAIL — revoked licence)")
print(f"  cryptolists : {cl_added}  ({cl_low} flagged — low-confidence domain, verify first)")
print()
print(f"  ready to contact today (has email, no flag) : "
      f"{sum(1 for r in rows if r['email'] and not r['flag'])}")
print(f"  flagged, needs a human before contacting     : {flagged}")
print(f"  no email yet — needs a contact-harvest pass  : {len(rows) - with_email}")
print(f"wrote {dest}")
