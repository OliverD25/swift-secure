import json, re, pathlib, subprocess, sys, csv
from collections import Counter

ROOT = pathlib.Path("E:/codespace/_claude_code/swift-secured-badge")

dump = ROOT / "crawler" / "_dump.mjs"
dump.write_text('''import { chromium } from "playwright";
import { loadAnjouanRegister } from "./src/checks/licence.ts";
const b = await chromium.launch({ headless: true });
const r = await loadAnjouanRegister(b); await b.close();
console.log(JSON.stringify(r));
''', encoding="utf8")
res = subprocess.run(["node", "--experimental-strip-types", "_dump.mjs"],
                     cwd=ROOT / "crawler", capture_output=True, text=True, encoding="utf8")
dump.unlink()
if res.returncode != 0:
    print(res.stderr[-1500:]); sys.exit(1)
records = json.loads(res.stdout.strip().splitlines()[-1])
print(f"register records: {len(records)}")

print("types:  ", Counter(str(r.get('type','')).lower() for r in records).most_common(6))
print("status: ", Counter(str(r.get('status','')).lower() for r in records).most_common(6))

src = (ROOT / "src/data/casinos.ts").read_text(encoding="utf8")
in_directory = {d.lower() for d in re.findall(r'domain: "([^"]+)"', src)}

def norm(d):
    return d.strip().lower().removeprefix("www.")

rows = {}
for r in records:
    if str(r.get("type", "")).lower() != "b2c":
        continue
    if str(r.get("status", "")).lower() != "valid":
        continue
    for raw in str(r.get("domains") or "").split(","):
        d = norm(raw)
        if not d or "." not in d or " " in d:
            continue
        prev = rows.get(d)
        if prev and str(prev.get("issued") or "") >= str(r.get("issued") or ""):
            continue
        rows[d] = r

print(f"unique live B2C domains: {len(rows)}")

def brand(d):
    stem = re.sub(r"[-_]+", " ", d.split(".")[0])
    return " ".join(w.capitalize() for w in stem.split())

out = []
for d, r in rows.items():
    out.append({
        "brand": brand(d),
        "domain": d,
        "site": f"https://{d}",
        "operator": r.get("company") or "",
        "licence": r.get("number") or "",
        "issued": (r.get("issued") or "")[:10],
        "expiry": (r.get("expiry") or "")[:10],
        "already_listed": "yes" if d in in_directory else "no",
        # Where to look for a human. Filled by hand or by the crawler later.
        "contact_url_guess": f"https://{d}/contact",
        "contact_email": "",
        "status": "not contacted",
        "contacted_on": "",
        "notes": "",
    })

# Newest licences first: a brand that launched weeks ago has no trust signals
# yet, no incumbent seal to displace, and a live need to look legitimate.
out.sort(key=lambda r: r["issued"], reverse=True)

dest = ROOT / "research" / "prospects.csv"
dest.parent.mkdir(exist_ok=True)
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
    w.writeheader()
    w.writerows(out)

print(f"wrote {len(out)} prospects -> {dest}")
print(f"  already in directory: {sum(1 for r in out if r['already_listed']=='yes')}")
print(f"  fresh outreach targets: {sum(1 for r in out if r['already_listed']=='no')}")
print("  issued range:", out[-1]["issued"], "->", out[0]["issued"])
