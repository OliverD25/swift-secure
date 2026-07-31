"""Check the generated drafts before a human sends any of them.

The drafts are assembled from measured data, so the failure mode is not bad
prose — it is a claim that quietly stops matching the evidence. These assertions
exist to catch that, and to catch broken personalisation, which reads as a
mail-merge and destroys the one thing the message has going for it.
"""
import csv, json, pathlib, re, sys

R = pathlib.Path("E:/codespace/_claude_code/swift-secured-badge/research")
drafts = (R / "outreach-drafts.md").read_text(encoding="utf8")
rows = list(csv.DictReader((R / "outreach-list.csv").open(encoding="utf8")))
census = {c["domain"]: c for c in json.loads((R / "seal-census.json").read_text(encoding="utf8")) if c.get("ok")}
live = {r["domain"]: r for r in csv.DictReader((R / "prospects-live.csv").open(encoding="utf8"))}

fails, checks = [], 0


def check(cond, msg):
    global checks
    checks += 1
    if not cond:
        fails.append(msg)


# --- claims we must never make -------------------------------------------
BANNED = [
    (r"\btest withdrawal\b", "promises a test withdrawal we do not perform"),
    (r"\bwe verified your (games|providers)\b", "claims provider verification, which does not work"),
    (r"\bcertified\b(?!.*not)", "uses 'certified' about a casino we have not checked"),
    (r"\bguarantee", "guarantees something"),
    (r"\bthousands of (players|operators)", "invents scale"),
    (r"\bour aggregator\b", "promises traffic we do not have"),
]
for pat, why in BANNED:
    check(not re.search(pat, drafts, re.I), f"BANNED CLAIM: {why}")

# --- the offer must stay the offer ---------------------------------------
check(drafts.count("no fee, no contract") >= 1, "the free offer is missing from the drafts")
check("NOT SENT" in drafts, "drafts are not marked as unsent")
check(all(r["status"].startswith("DRAFT ONLY") for r in rows), "a row is not marked draft-only")

# --- personalisation must be true ----------------------------------------
blocks = re.findall(r"### (.+?) \((.+?)\)\n\n```\n(.*?)\n```", drafts, re.S)
check(len(blocks) > 0, "no draft blocks were generated")

SEO_JUNK = re.compile(r"[\U0001F300-\U0001FAFF←-⯿]|\b20\d\d\b|giri[sş]|\blogin\b|g[uü]ncel", re.I)

for brand, domain, body in blocks:
    # Addressing an operator by their keyword-stuffed page title is more
    # obviously automated than using no name at all.
    check(not SEO_JUNK.search(brand), f"{domain}: brand name still carries SEO junk: {brand!r}")
    check(len(brand) <= 34, f"{domain}: brand name too long to be a name: {brand!r}")
    check(re.search(r"\b(\w+)\s+\1\b", brand, re.I) is None,
          f"{domain}: brand name has a doubled word: {brand!r}")
    check(not re.search(r"\b(casino sitesi|bahis sitesi|online casino|official website"
                        r"|bookmaker|welcome to)\b", brand, re.I),
          f"{domain}: brand name is a description, not a name: {brand!r}")
    check(".com" not in body.split("Subject:")[1].split("\n\n")[0],
          f"{domain}: raw domain used in the subject line instead of a brand name")

    c = census.get(domain)
    check(c is not None, f"{domain}: draft for a site not in the census")
    if not c:
        continue
    sig = c.get("signals") or {}
    vendors = set(c.get("paidVendors") or [])

    # A tier-A draft names their vendor; naming one they do not use is worse
    # than not personalising at all.
    named = re.search(r"already run (?:a )?([a-z0-9]+(?: and [a-z0-9]+)?) badges?,", body)
    if named:
        for v in named.group(1).split(" and "):
            check(v in vendors, f"{domain}: draft names vendor '{v}' the site does not use")
        check(" a  " not in body and "badge s" not in body, f"{domain}: broken grammar in vendor sentence")

    if "display your regulator's licence seal" in body:
        check(bool(sig.get("regulator")), f"{domain}: claims a regulator seal the census did not find")

    if "no independent trust signal at all" in body:
        check(not vendors and not sig.get("regulator"),
              f"{domain}: says 'no trust signal' but census found one")

    # The count must be distinct studios, not DOM matches. An earlier draft
    # claimed "409 game providers" — a number no casino has, and the kind of
    # thing a recipient spots instantly.
    m = re.search(r"recorded the (\d+) game studios", body)
    if m:
        n = int(m.group(1))
        distinct = len(c.get("providerNames") or [])
        check(n == distinct, f"{domain}: studio count {n} != distinct {distinct}")
        check(n <= 60, f"{domain}: implausible studio count {n} — looks like match counting")
        for named_p in re.findall(r"\(([^)]+) among them\)", body):
            for p in named_p.split(", "):
                check(p in (c.get("providerNames") or []),
                      f"{domain}: names studio '{p}' not found on the site")

    check("game providers you list" not in body, f"{domain}: stale wording from the match-counting version")

    m = re.search(r"licence (\S+) against the Anjouan register", body)
    if m:
        check(m.group(1) == live.get(domain, {}).get("licence", ""),
              f"{domain}: licence number in draft does not match source data")

    # Broken merge fields read as spam.
    check("{" not in body and "[your name]" in body, f"{domain}: unfilled placeholder or missing signature")
    check("None" not in body and "undefined" not in body, f"{domain}: leaked a null value")
    check("and your other brands" not in body or "runs" in body,
          f"{domain}: mentions other brands without naming the operator")

# --- sibling brands must belong to the same operator ---------------------
for r in rows:
    if not r["sibling_brands"]:
        continue
    op = r["operator"]
    for sib in r["sibling_brands"].split():
        check(live.get(sib, {}).get("operator") == op,
              f"{r['domain']}: sibling {sib} belongs to a different operator")

# --- addresses ------------------------------------------------------------
for r in rows:
    if r["email"]:
        check(re.fullmatch(r"[^@\s]+@[^@\s]+\.[a-z]{2,}", r["email"], re.I) is not None,
              f"{r['domain']}: malformed address {r['email']}")

print(f"{checks} checks run")
if fails:
    print(f"\n{len(fails)} FAILED:")
    for f in fails[:25]:
        print("  -", f)
    sys.exit(1)
print("all passed — drafts are consistent with the measured data")
