"""Merge both new contact sources into master-outreach-list.csv, in place.

Two harvests finished and neither is usable until it lands in the master list:

  research/affiliate-contacts-bulk.json   1179 casino sites read directly
  research/affcatalog-matches.csv         AFFCatalog programme pages

Updates the master file rather than writing a fourth CSV. A list that lives in
four places is a list nobody trusts.

PRECEDENCE, best first. The pitch is a free technical audit and a free badge,
which is a partnership conversation, and support queues bin partnership mail:

  1. the site's own affiliate page address       affiliates@thecasino.com
  2. the AFFCatalog programme address            reaches the affiliate manager
  3. the site's general contact address          support@ — a queue, but a human

Only exact and strong catalogue matches are used. Weak matches are excluded
here exactly as they are excluded from the ranking: this project has already
spent 169 rows on a loose match rule and will not spend more.

Also fills the operator column from the programme name where it is blank. That
column is what stops the outreach reading as a mail-merge — the dedup rule needs
to know six domains are one company — and licence registers leave it empty far
too often.

Quality gates applied before any address is written, matching 14-priority-list.py:
hostile mailboxes, placeholders, and addresses on another company's domain.

Usage: python research/scripts/17-merge-new-contacts.py [--dry-run]
"""
import csv
import json
import pathlib
import re
import sys
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
MASTER = ROOT / "research" / "master-outreach-list.csv"
HARVEST = ROOT / "research" / "affiliate-contacts-bulk.json"
CATALOG = ROOT / "research" / "affcatalog-matches.csv"

DRY = "--dry-run" in sys.argv

HOSTILE = re.compile(r"^(legal|abuse|privacy|complaints?|dpo|compliance|security|payments?)", re.I)
PLACEHOLDER = re.compile(r"^(john_doe|jane_doe|example|your|you|name|email|user|test|noreply|"
                         r"no-reply|donotreply|cola|admin|webmaster|postmaster)$", re.I)
SLD = {"co", "com", "net", "org", "gov", "edu", "ac"}


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def registrable(domain: str) -> str:
    parts = [p for p in (domain or "").lower().split(".") if p]
    if len(parts) >= 3 and parts[-2] in SLD:
        return norm(parts[-3])
    return norm(parts[-2]) if len(parts) >= 2 else norm(parts[0] if parts else "")


def usable(email: str, domain: str, allow_foreign: bool) -> str:
    """Empty string if fine, otherwise the reason to reject."""
    e = (email or "").strip().lower()
    if not e or "@" not in e or " " in e:
        return "not an address"
    local, _, host = e.partition("@")
    if HOSTILE.match(local):
        return "hostile mailbox"
    if PLACEHOLDER.match(local):
        return "placeholder"
    if host.endswith("affcatalog.com"):
        return "the catalogue's own address"
    # A programme legitimately runs many brands from one inbox, so a foreign
    # mail domain is expected there and disqualifying for a site's own scrape.
    if not allow_foreign:
        h, d = registrable(host), registrable(domain)
        if h and d and h not in d and d not in h:
            return f"address on another company's domain ({host})"
    return ""


def main() -> None:
    rows = list(csv.DictReader(MASTER.open(encoding="utf8")))
    fields = list(rows[0].keys())
    by_domain = {r["domain"].strip().lower(): r for r in rows if r["domain"].strip()}

    # --- source 1 and 3: the site's own pages
    site = {}
    if HARVEST.exists():
        for r in json.loads(HARVEST.read_text(encoding="utf8")):
            site[(r.get("domain") or "").strip().lower()] = r

    # --- source 2: AFFCatalog, exact and strong only
    cat = {}
    if CATALOG.exists():
        for r in csv.DictReader(CATALOG.open(encoding="utf8")):
            if r.get("tier") in ("exact", "strong") and r.get("prog_email"):
                cat[r["domain"].strip().lower()] = r

    filled = Counter()
    rejected = Counter()
    ops_filled = 0

    for domain, row in by_domain.items():
        # Operator grouping is worth filling even when the address is not.
        cm = cat.get(domain)
        if cm and not (row.get("operator") or "").strip() and cm.get("programme"):
            row["operator"] = cm["programme"]
            ops_filled += 1

        if (row.get("email") or "").strip():
            continue

        s = site.get(domain, {})
        candidates = [
            (s.get("affiliateEmail"), "site-affiliate-page", False),
            (cm.get("prog_email") if cm else "", f"affcatalog:{cm['programme']}" if cm else "", True),
            (s.get("contactEmail"), "site-contact-page", False),
        ]
        for addr, src, allow_foreign in candidates:
            if not addr:
                continue
            why = usable(addr, domain, allow_foreign)
            if why:
                rejected[why] += 1
                continue
            row["email"] = addr.strip().lower()
            row["email_source"] = src
            filled[src.split(":")[0]] += 1
            break

    have = sum(1 for r in rows if (r.get("email") or "").strip())
    print(f"=== {len(rows)} rows in master-outreach-list.csv ===")
    print(f"addresses before : {have - sum(filled.values())}")
    print(f"addresses now    : {have}")
    print()
    for src, n in filled.most_common():
        print(f"  +{n:>4}  {src}")
    if rejected:
        print("\nrejected:")
        for why, n in rejected.most_common():
            print(f"  {n:>5}  {why}")
    print(f"\noperator column filled from a programme name: {ops_filled}")

    if DRY:
        print("\n--dry-run: master-outreach-list.csv NOT written")
        return
    with MASTER.open("w", encoding="utf8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    print(f"\nwrote {MASTER.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
