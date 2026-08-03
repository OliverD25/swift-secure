"""Match AFFCatalog programme brand rosters onto our own casino domains.

Produces two things the outreach list is currently blocked on:

  1. A contact address for domains that have none. 81 domains that produce a
     verified finding have nowhere to send it.
  2. An operator grouping. Our `operator` column comes from licence registers
     and is often blank, but the dedup rule that stops this reading as a
     mail-merge depends on knowing that six domains are one company. A
     programme's brand roster states that directly.

MATCHING IS THE DANGEROUS PART, so it is deliberately strict.

This project has already paid for the loose version: hand-tracing 10 CryptoLists
affiliate redirects found 6 of 10 landing on an affiliate network rather than
the casino, and the salvage was 169 rows flagged "verify this is really the
casino" — rows that are still excluded from every ranking today.

The trap here is different but has the same shape. Brand names are short, and
short strings match things they should not. "Leon" is inside "napoleon", "Twin"
is inside "twins" and "twinkle", "Crown Slots" and "Infinity" are ordinary
words. So containment is only allowed for long names, and never decides a
match on its own.

Three tiers, and only the top two are usable without a human:

  exact   normalised brand == normalised domain stem            joocasino == joocasino
  strong  equal after stripping a trailing casino/bet/slots     rollxo == rollxo(.co)
          word from either side, and >= 5 characters remain
  weak    containment, >= 6 characters, corroborated by the      needs review
          programme licence matching the domain's licence

Usage: python research/scripts/16-affcatalog-match.py
"""
import csv
import json
import pathlib
import re
from collections import Counter, defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
CATALOG = ROOT / "research" / "affcatalog-programs.json"
MASTER = ROOT / "research" / "master-outreach-list.csv"
PRIORITY = ROOT / "research" / "outreach-priority.csv"
OUT = ROOT / "research" / "affcatalog-matches.csv"
OUT_UNBLOCK = ROOT / "research" / "affcatalog-unblocked.md"

# Words that carry no identity. "Casino" matching "Casino" is not a match.
FILLER = re.compile(r"(casino|bet|bets|betting|slots?|games?|gaming|partners?|"
                    r"affiliates?|club|play|win|online|official)$")
# Brands too generic to trust even at exact length. Every one of these is an
# ordinary English word that appears inside unrelated domains.
GENERIC = {"infinity", "crown", "spirit", "retro", "leon", "twin",
           "slott", "jet", "vault", "lucky", "rich", "royal", "gold", "star",
           "king", "queen", "ace", "joker", "diamond", "empire", "legend",
           # These survive de-stemming and then match anything sharing a theme.
           # "crypto-games.io" and "cryptoslots" both reduce to "crypto", clear
           # the six-character bar, and produce a confident wrong match.
           "crypto", "bit", "coin", "mega", "super", "turbo", "grand", "vegas",
           "spin", "fortune", "jackpot", "wild", "power", "prime", "elite"}


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def destem(s: str) -> str:
    """Strip one trailing filler word. 'joocasino' -> 'joo'."""
    prev = None
    while prev != s:
        prev = s
        s = FILLER.sub("", s)
    return s


# Second-level suffixes that are not the registrable name. Without these,
# 8bet.co.sz reduces to "co" and matches nothing useful.
SLD = {"co", "com", "net", "org", "gov", "edu", "ac"}


def domain_stem(domain: str) -> str:
    """The registrable label, not the first one.

    Taking parts[0] read billy.bfplay.link as the brand "billy" and matched it
    to BillyBets, when the actual site is bfplay.link. A subdomain label is
    whatever the operator felt like typing and must not decide a match.
    """
    parts = [p for p in (domain or "").lower().split(".") if p]
    if len(parts) >= 3 and parts[-2] in SLD:
        return norm(parts[-3])
    if len(parts) >= 2:
        return norm(parts[-2])
    return norm(parts[0]) if parts else ""


def classify(brand: str, domain: str, prog_licence: str, row_licence: str) -> str:
    b, d = norm(brand), domain_stem(domain)
    if not b or not d or len(b) < 3:
        return ""
    if b == d:
        return "exact"
    # Six characters, not five. Stripping a filler word off a domain INVENTS a
    # brand as easily as it recovers one, and the difference is length.
    # "goldexcasino" -> "goldex" (6) recovers the real brand Goldex. But
    # "asinoplay" -> "asino" (5) and "boostwin" -> "boost" (5) both produced a
    # confident match to a programme that has nothing to do with those sites.
    # Five characters is not enough signal to survive having a word removed.
    bb, dd = destem(b), destem(d)
    if bb and dd and bb == dd and len(bb) >= 6 and bb not in GENERIC:
        return "strong"
    # Containment only for long names, and only with licence corroboration.
    if len(b) >= 6 and b not in GENERIC and (b in d or d in b):
        pl, rl = (prog_licence or "").lower(), (row_licence or "").lower()
        corroborated = bool(rl) and any(j in pl for j in re.findall(r"[a-z]{4,}", rl))
        return "weak-corroborated" if corroborated else "weak"
    return ""


def main() -> None:
    if not CATALOG.exists():
        raise SystemExit(f"not found: {CATALOG}\nRun crawler/affcatalog-scrape.mjs first.")

    progs = [p for p in json.loads(CATALOG.read_text(encoding="utf8")) if p.get("ok")]
    master = list(csv.DictReader(MASTER.open(encoding="utf8")))
    rows_by_domain = {r["domain"].strip().lower(): r for r in master if r["domain"].strip()}

    # Index our domains by stem and by de-stemmed stem so a brand is compared
    # against a small candidate set rather than 1497 strings.
    by_stem = defaultdict(list)
    for d in rows_by_domain:
        by_stem[domain_stem(d)].append(d)
        by_stem[destem(domain_stem(d))].append(d)

    matches = []
    for p in progs:
        plic = p.get("fields", {}).get("License", "")
        for brand in p.get("brands", []):
            b = norm(brand)
            cands = set(by_stem.get(b, [])) | set(by_stem.get(destem(b), []))
            # Containment needs a wider net, but only for names long enough to
            # be worth the scan.
            if len(b) >= 6 and b not in GENERIC:
                cands |= {d for d in rows_by_domain if b in domain_stem(d) or domain_stem(d) in b}
            for d in cands:
                row = rows_by_domain[d]
                tier = classify(brand, d, plic, row.get("licence", ""))
                if not tier:
                    continue
                matches.append({
                    "domain": d, "brand": brand, "tier": tier,
                    "programme": p.get("name", ""), "prog_url": p.get("url", ""),
                    "prog_email": p.get("email", ""), "prog_telegram": p.get("telegram", ""),
                    "prog_software": p.get("fields", {}).get("Software", ""),
                    "prog_licence": plic,
                    "our_email": (row.get("email") or "").strip(),
                    "our_operator": (row.get("operator") or "").strip(),
                    "our_licence": (row.get("licence") or "").strip(),
                })

    # One row per domain: keep the best tier, preferring a programme that
    # actually has an address — a perfect match with no email helps nobody.
    order = {"exact": 0, "strong": 1, "weak-corroborated": 2, "weak": 3}
    best = {}
    for m in matches:
        k = m["domain"]
        cur = best.get(k)
        key = (order[m["tier"]], 0 if m["prog_email"] else 1)
        if not cur or key < (order[cur["tier"]], 0 if cur["prog_email"] else 1):
            best[k] = m
    final = sorted(best.values(), key=lambda m: (order[m["tier"]], m["domain"]))

    with OUT.open("w", encoding="utf8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(final[0].keys()) if final else ["domain"])
        w.writeheader()
        w.writerows(final)

    # --- what this actually unblocks --------------------------------------
    ranked = []
    if PRIORITY.exists():
        ranked = list(csv.DictReader(PRIORITY.open(encoding="utf8")))
    need = {r["domain"] for r in ranked if not (r.get("email") or "").strip()}
    unblocked = [m for m in final if m["domain"] in need and m["prog_email"]
                 and m["tier"] in ("exact", "strong")]
    score = {r["domain"]: int(r["score"]) for r in ranked}
    unblocked.sort(key=lambda m: -score.get(m["domain"], 0))

    lines = ["# Addresses AFFCatalog unblocks", "",
             f"{len(unblocked)} ranked domains that had no address now have one, at exact or",
             "strong match confidence only. Weak matches are in the CSV and are NOT here.", "",
             "**Check the pairing before sending.** The address belongs to the affiliate",
             "programme, so one email reaches the whole brand roster — which is correct, and",
             "also means these must be deduped by programme, not by domain.", ""]
    by_prog = defaultdict(list)
    for m in unblocked:
        by_prog[m["programme"]].append(m)
    for prog, ms in sorted(by_prog.items(), key=lambda kv: -max(score.get(m["domain"], 0) for m in kv[1])):
        lines.append(f"## {prog} — {ms[0]['prog_email']}")
        if ms[0]["prog_telegram"]:
            lines.append(f"telegram: {ms[0]['prog_telegram']}")
        lines.append(f"software: {ms[0]['prog_software'] or '—'} | licence: {ms[0]['prog_licence'] or '—'}")
        lines.append("")
        for m in ms:
            lines.append(f"- **{m['domain']}** (score {score.get(m['domain'], 0)}) matched brand \"{m['brand']}\" — {m['tier']}")
        lines.append("")
    OUT_UNBLOCK.write_text("\n".join(lines), encoding="utf8")

    tiers = Counter(m["tier"] for m in final)
    print(f"=== {len(progs)} programmes, {sum(len(p.get('brands', [])) for p in progs)} brand names ===")
    print(f"{len(final)} of our domains matched a brand:")
    for t in ("exact", "strong", "weak-corroborated", "weak"):
        if tiers[t]:
            print(f"  {tiers[t]:>4}  {t}")
    have = sum(1 for m in final if m["prog_email"])
    print(f"\n{have} of those come with a programme address")
    print(f"{len(unblocked)} RANKED domains with a finding and no address are unblocked")
    newops = sum(1 for m in final if not m["our_operator"])
    print(f"{newops} matched domains had a blank operator field — now grouped by programme")
    print(f"\nwrote {OUT.name} and {OUT_UNBLOCK.name}")


if __name__ == "__main__":
    main()
