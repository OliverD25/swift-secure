"""Parse the Curaçao Gaming Authority licence registry PDF.

The registry is published as a PDF, not a database, which is why an earlier pass
concluded Curaçao had no downloadable register at all. It does — it is just
awkward to read.

Each row gives a licence number, the company, whether the licence is B2C or B2B,
and its dates. The licence number is the key to the certificate endpoint
(`cert.cga.cw/token?id=<last group>`), and a B2C certificate lists every domain
the licence covers. So this file is the entry point to the operator's whole
brand roster, stated by the regulator rather than inferred by us.

Usage:
  python research/scripts/8-curacao-register.py <path-to.pdf>
"""
import csv, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]

try:
    from pypdf import PdfReader
except ImportError:
    sys.exit("pypdf is required:  python -m pip install pypdf")

src = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
if not src or not src.exists():
    sys.exit("usage: 8-curacao-register.py <registry.pdf>")

reader = PdfReader(str(src))
text = "\n".join(p.extract_text() or "" for p in reader.pages)

# Rows wrap across lines when a company name is long, so the text is flattened
# and split on the licence number instead of on newlines.
LICENCE = re.compile(r"(OGL/\d{4}/\d+/\d+)", re.I)
flat = re.sub(r"\s+", " ", text)
parts = LICENCE.split(flat)

# Stop at the company registration number and read the rest loosely. Requiring
# two well-formed dates dropped 29 rows: the source PDF contains typos like
# "May19, 2026" and "September 26 ,2025", and revoked licences carry a sentence
# where the expiry date should be. Revocations are the rows most worth having —
# a casino still displaying a revoked licence number is a real finding.
HEAD = re.compile(
    r"^\s*(?P<company>.+?)\s+"
    r"(?P<type>B2C & B2B|B2B & B2C|B2C|B2B)\s+"
    r"(?P<reg>\d{4,7})\s+"
    r"(?P<rest>.*)$",
    re.I | re.S,
)
# Tolerates a missing space before the year and a stray space before the comma.
DATE = re.compile(r"([A-Z][a-z]+)\s*(\d{1,2})\s*,?\s*(\d{4})")

rows, unparsed = [], 0
for i in range(1, len(parts), 2):
    number = parts[i].upper()
    m = HEAD.match(parts[i + 1] if i + 1 < len(parts) else "")
    if not m:
        unparsed += 1
        continue
    company = re.sub(r"^\d+\.\s*", "", m.group("company")).strip()
    rest = m.group("rest")
    # Trim the next row's leading index so it cannot be read as this row's data.
    rest = re.split(r"\s+\d{1,4}\.\s*$", rest)[0]
    dates = DATE.findall(rest)

    if re.search(r"\brevoked\b", rest, re.I):
        status = "revoked"
    elif re.search(r"assessment in progress", rest, re.I):
        status = "assessment in progress"
    elif re.search(r"\bsuspended\b", rest, re.I):
        status = "suspended"
    else:
        status = "active"

    fmt = lambda t: f"{t[0]} {int(t[1])}, {t[2]}"
    rows.append({
        "licence": number,
        "token": str(int(number.rsplit("/", 1)[1])),
        "company": company,
        "type": m.group("type").upper().replace(" & ", "&"),
        "company_reg": m.group("reg"),
        "issued": fmt(dates[0]) if dates else "",
        # On a revoked row the second date is the revocation, not an expiry.
        "expires": fmt(dates[1]) if len(dates) > 1 and status != "revoked" else "",
        "revoked_on": fmt(dates[1]) if len(dates) > 1 and status == "revoked" else "",
        "status": status,
    })

# The same company can hold several licences; the same licence never repeats.
seen, deduped = set(), []
for r in rows:
    if r["licence"] in seen:
        continue
    seen.add(r["licence"])
    deduped.append(r)

dest = ROOT / "research" / "curacao-register.csv"
with dest.open("w", newline="", encoding="utf8") as f:
    w = csv.DictWriter(f, fieldnames=list(deduped[0].keys()))
    w.writeheader()
    w.writerows(deduped)

from collections import Counter
b2c = [r for r in deduped if "B2C" in r["type"]]
status = Counter(r["status"] for r in deduped)
print(f"pages {len(reader.pages)} | licences parsed {len(deduped)} | rows not parsed {unparsed}")
print(f"  B2C (operator licences) : {len(b2c)}")
print(f"  B2B                     : {len(deduped) - len(b2c)}")
print(f"  distinct companies      : {len({r['company'] for r in deduped})}")
print(f"  by status               : {dict(status)}")
print(f"wrote {dest}")
print("\nsample:")
for r in deduped[:5]:
    print(f"  {r['licence']:22} token {r['token']:>5}  {r['type']:4} {r['company'][:38]}")
