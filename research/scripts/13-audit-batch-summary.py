"""Summarise a batch of single-casino audits into one table.

Reads every research/audits/<domain>.json and reports what each casino would
actually receive, so a batch can be reviewed without re-reading a long log.

Deliberately reports the report/public/context split rather than a single
finding count: a domain with three context notes and nothing report-eligible
gets an empty report, and conflating the two is how a report ends up padded —
the specific failure AGENTS.md warns against.
"""
import json, pathlib
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
AUDITS = ROOT / "research" / "audits"

files = sorted(AUDITS.glob("*.json"))
if not files:
    raise SystemExit(f"no audits found in {AUDITS}")

rows = []
for f in files:
    d = json.loads(f.read_text(encoding="utf8"))
    findings = d.get("findings", [])
    by_use = Counter(x["use"] for x in findings)
    report_items = [x for x in findings if x["use"] == "report"]
    rows.append({
        "domain": d["domain"],
        "report": by_use.get("report", 0),
        "public": by_use.get("public", 0),
        "context": by_use.get("context", 0),
        "areas": sorted({x["area"] for x in report_items}),
        "items": report_items,
    })

rows.sort(key=lambda r: (-r["report"], r["domain"]))

print(f"=== {len(rows)} casinos audited ===\n")
print(f"{'domain':<26} {'report':>6} {'public':>6} {'context':>7}   report areas")
print("-" * 78)
for r in rows:
    print(f"{r['domain']:<26} {r['report']:>6} {r['public']:>6} {r['context']:>7}   {', '.join(r['areas']) or '—'}")

sendable = [r for r in rows if r["report"]]
print(f"\n{len(sendable)} of {len(rows)} have something worth sending "
      f"({len(rows) - len(sendable)} get an honest 'nothing found' report).")

area_freq = Counter(a for r in rows for a in r["areas"])
if area_freq:
    print("\nreport findings by area:")
    for area, n in area_freq.most_common():
        print(f"  {area:<10} {n} casino(s)")

public_items = [(r["domain"], x) for r in rows for x in r["items"] if False]  # report items only above
publics = []
for f in files:
    d = json.loads(f.read_text(encoding="utf8"))
    for x in d.get("findings", []):
        if x["use"] == "public":
            publics.append((d["domain"], x["text"]))
if publics:
    print(f"\n--- PUBLIC PAGE ONLY (never emailed) ---")
    for dom, text in publics:
        print(f"  {dom}: {text[:110]}")

print("\n--- what each sendable casino would actually be told ---")
for r in sendable:
    print(f"\n{r['domain']}")
    for x in r["items"]:
        print(f"  [{x['area']}] {x['text'][:150]}")
