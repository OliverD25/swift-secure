"""Fill each directory entry's lastScanned date from a real crawler run.

Every one of the 223 entries in src/data/casinos.ts carried `lastScanned: "—"`,
while the directory page told visitors those casinos were "checked automatically
by our crawler". For 208 of them that was not true — they had never been
crawled. A dash in that field is not a neutral placeholder; next to that
sentence it is a claim we had not earned.

This reads research/directory-scan.json and writes the real date, or leaves the
dash where the site genuinely could not read the page. Blocked is not the same
as unchecked, so a refused site gets the date too — we did look, and the entry
should say when.

Usage: python research/scripts/19-update-directory-scan-dates.py [YYYY-MM-DD]
"""
import json
import pathlib
import re
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parents[2]
SCAN = ROOT / "research" / "directory-scan.json"
DATA = ROOT / "src" / "data" / "casinos.ts"

RUN_DATE = sys.argv[1] if len(sys.argv) > 1 else date.today().isoformat()


def main() -> None:
    if not SCAN.exists():
        raise SystemExit(f"no scan at {SCAN}\nRun: node crawler/audit-probe.mjs "
                         "--from=research/directory-targets.txt --out=directory-scan.json")

    scan = {r["domain"].lower(): r for r in json.loads(SCAN.read_text(encoding="utf8"))}
    src = DATA.read_text(encoding="utf8")

    # Entries are objects in one array; the domain and its lastScanned always sit
    # in the same object, so walk object by object rather than by line. A global
    # regex over the file would happily pair one casino's domain with the next
    # casino's date.
    filled = missing = 0

    def fix(block: str) -> str:
        nonlocal filled, missing
        m = re.search(r'domain: "([^"]+)"', block)
        if not m:
            return block
        rec = scan.get(m.group(1).lower())
        if not rec:
            missing += 1
            return block
        filled += 1
        return re.sub(r'lastScanned: "[^"]*"', f'lastScanned: "{RUN_DATE}"', block)

    out, pos = [], 0
    for m in re.finditer(r"\n  \{\n.*?\n  \},", src, re.S):
        out.append(src[pos:m.start()])
        out.append(fix(m.group(0)))
        pos = m.end()
    out.append(src[pos:])
    result = "".join(out)

    DATA.write_text(result, encoding="utf8")
    readable = sum(1 for r in scan.values() if r.get("ok"))
    print(f"scan holds {len(scan)} domains, {readable} readable")
    print(f"dated {filled} directory entries; {missing} left as '—' (not in the scan)")


if __name__ == "__main__":
    main()
