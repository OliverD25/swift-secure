"""Build ranked outreach drafts. Writes files only — sends nothing.

Joins three sources so each draft can say something true and specific about the
recipient: the seal census (what they already display), the live prospect list
(contact address, licence), and the operator grouping (their other brands).

Tiers are ordered by how little has to be argued:

  A  already pay a certification vendor — proven they buy this category
  B  display the regulator seal but pay nobody — proven they display badges,
     which is the behaviour the offer needs, and there is no incumbent to
     displace
  C  no trust signal at all — hardest, argue the category from scratch
"""
import csv, json, pathlib, re
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / "research"

census = {c["domain"]: c for c in json.loads((R / "seal-census.json").read_text(encoding="utf8")) if c.get("ok")}
live = {r["domain"]: r for r in csv.DictReader((R / "prospects-live.csv").open(encoding="utf8"))}
ops = list(csv.DictReader((R / "prospects-by-operator.csv").open(encoding="utf8")))

# Affiliate addresses beat support desks for this pitch: a partner programme
# exists to be contacted, and the affiliate manager owns a badge-and-link deal.
# A support queue does not know what to do with one.
aff_path = R / "affiliate-contacts.json"
affiliate = {}
if aff_path.exists():
    for a in json.loads(aff_path.read_text(encoding="utf8")):
        if a.get("affiliateEmail"):
            affiliate[a["domain"]] = a

brands_by_op = {}
for o in ops:
    brands_by_op[o["operator"]] = o["all_domains"].split()

CERT = {"gamecheck", "gaminglabs", "licenseseal", "gli", "dlagglobal", "quinel", "bmmtest", "ecogra", "itechlabs"}

def tier(c):
    v = set(c.get("paidVendors") or [])
    if v & CERT:
        return "A"
    if (c.get("signals") or {}).get("regulator"):
        return "B"
    return "C"

def clean_brand(name, domain):
    """Page titles are SEO real estate, not names.

    Raw titles arrive as "Matadorbet | Matadorbet Giris 2026 | Bonus" and worse.
    Addressing an operator by their own keyword-stuffed title is more obviously
    automated than using no name at all, so the title is trimmed back to the
    first plausible name and falls back to the domain stem.
    """
    if not name:
        name = domain
    n = re.split(r"\s*[|\-–—:·»<>]\s*", name)[0]
    n = re.sub(r"[^\w\s'&.]+", " ", n, flags=re.UNICODE)          # emoji, arrows
    n = re.sub(r"\b(giris|giriş|login|bonus|resmi|guncel|güncel|20\d\d)\b", " ", n, flags=re.I)
    # Descriptive tails: Turkish listings in particular append what the site is
    # to what it is called, and "Zbahis Bahis ve Casino Sitesi" is not a name.
    n = re.sub(r"\s*\b(bahis ve casino sitesi|casino sitesi|bahis sitesi|online casino|casino"
               r"|bahis|slots?|betting|official (site|website)|resmi site|website)\b.*$", "", n, flags=re.I)
    n = re.sub(r"^\s*(welcome to|the best)\b\s*", "", n, flags=re.I)
    n = re.sub(r"\s{2,}", " ", n).strip(" .-")
    # Stripping a separator can leave the name doubled: "Matadorbet ⚡ Matadorbet
    # Giris" collapses to "Matadorbet Matadorbet".
    n = re.sub(r"\b(\w[\w'&.]*)(\s+\1\b)+", r"\1", n, flags=re.I)
    # A brand does not open with "Online" or "Bookmaker" — a title that does is
    # describing the site, not naming it. "Online bookmaker in Egypt" is worse
    # to greet someone with than their own domain.
    if re.match(r"^(online|bookmaker|sports?book|betting|best|top|new|the|leading|premier|"
                r"licen[cs]ed|trusted|official)\b", n, re.I):
        n = ""
    if len(n) < 2 or len(n) > 34:
        n = domain.split(".")[0].replace("-", " ").title()
    return n


rows = []
for domain, c in census.items():
    l = live.get(domain)
    if not l:
        continue
    sig = c.get("signals") or {}
    op = l.get("operator", "")
    siblings = [b for b in brands_by_op.get(op, []) if b != domain]
    providers = c.get("providerNames") or []
    aff = affiliate.get(domain)
    email = (aff or {}).get("affiliateEmail") or l.get("contact_email", "")
    rows.append({
        "tier": tier(c),
        "domain": domain,
        "brand": clean_brand(l.get("brand"), domain),
        "email": email,
        "email_source": "affiliate page" if aff else ("contact page" if l.get("contact_email") else ""),
        "affiliate_url": (aff or {}).get("affiliateUrl", ""),
        "affiliate_platform": (aff or {}).get("platform", ""),
        "operator": op,
        "licence": l.get("licence", ""),
        "expiry": l.get("expiry", ""),
        "vendors": ", ".join(sorted(set(c.get("paidVendors") or []))),
        "cert_vendors": sorted(set(c.get("paidVendors") or []) & CERT),
        "providers": providers,
        "provider_count": len(providers),
        "regulator_seal": "yes" if sig.get("regulator") else "no",
        # Siblings are addressed by name, not by bare domain — a message that
        # lists raw hostnames back at an operator reads as scraped output.
        "siblings": [(clean_brand(live.get(b, {}).get("brand"), b), b) for b in siblings],
    })

# Contactable first — a draft with nowhere to send it is a research note.
rows.sort(key=lambda r: (r["tier"], r["email"] == "", -len(r["siblings"])))

with (R / "outreach-list.csv").open("w", newline="", encoding="utf8") as f:
    cols = ["tier", "domain", "brand", "email", "email_source", "affiliate_url",
            "affiliate_platform", "operator", "licence", "expiry",
            "vendors", "regulator_seal", "provider_count"]
    w = csv.DictWriter(f, fieldnames=cols + ["sibling_brands", "status", "contacted_on"])
    w.writeheader()
    for r in rows:
        w.writerow({**{k: r[k] for k in cols},
                    "sibling_brands": " ".join(b for _, b in r["siblings"][:12]),
                    "status": "DRAFT ONLY — NOT SENT", "contacted_on": ""})


def draft(r):
    """One message, personalised only with facts we actually measured."""
    name = r["brand"]
    lines = [f"To: {r['email'] or '(no published address — find via /affiliates or LinkedIn)'}"]
    sib = r["siblings"]

    if sib:
        shown = ", ".join(b for b, _ in sib[:3])
        subj = f"Verification pages for {name} and your other brands"
        opener = (f"I noticed {r['operator']} runs {len(sib) + 1} brands, including {name}, "
                  f"{shown}. We've indexed them.")
    else:
        subj = f"{name} — verification page we built for you"
        opener = f"We index newly licensed casinos and build a public page for each. Here's {name}'s."

    if r["tier"] == "A":
        # Name at most two vendors. Reciting five reads like a scan report, and
        # the sentence has to stay grammatical whichever way it lands.
        v = r["cert_vendors"][:2]
        vtxt = v[0] if len(v) == 1 else f"{v[0]} and {v[1]}"
        hook = (f"You already run {'a ' if len(v) == 1 else ''}{vtxt} badge{'' if len(v) == 1 else 's'}, "
                f"so you clearly value the signal. Ours works differently: it links to a dated "
                f"public page stating exactly what was checked and what was not, and it gets "
                f"re-checked rather than sitting static.")
    elif r["tier"] == "B":
        hook = ("You display your regulator's licence seal, which tells a player you are licensed "
                "but not that anyone independently confirmed it. We check the licence against the "
                "regulator's own register and publish the result with a date.")
    else:
        hook = ("Right now the site carries no independent trust signal at all. Players search "
                f"\"{name} legit\" before depositing, and there is nothing for them to find.")

    proof = f"We confirmed licence {r['licence']} against the Anjouan register" if r["licence"] else \
            "We check the licence against the regulator's own register, not the site footer"
    if r["expiry"]:
        proof += f" (valid to {r['expiry']})"

    if r["provider_count"] >= 3:
        named = ", ".join(r["providers"][:3])
        proof += (f". We also recorded the {r['provider_count']} game studios you list on-site "
                  f"({named} among them)")

    body = f"""Subject: {subj}

Hi,

{opener}

{hook}

{proof}.

We're just starting, so the first operators get this free — no fee, no contract.
You get the badge and a public verification page; all we ask is that the badge
links back to us. Remove it any time.

Worth a look?

[your name]
"""
    return "\n".join(lines) + "\n\n" + body


out = ["# Outreach drafts — NOT SENT",
       "",
       "Generated from measured data. **Nothing here has been sent to anyone.**",
       "Review, edit and send manually. Every claim is checked against "
       "`seal-census.json` and the Anjouan register — do not add claims that are not.",
       ""]

counts = defaultdict(int)
for r in rows:
    counts[r["tier"]] += 1

out += ["## Tiers", "",
        "| Tier | Meaning | Count | With address |", "| :-- | :-- | --: | --: |"]
for t, desc in [("A", "already pay a certification vendor"),
                ("B", "display regulator seal, pay nobody"),
                ("C", "no trust signal at all")]:
    have = sum(1 for r in rows if r["tier"] == t and r["email"])
    out.append(f"| {t} | {desc} | {counts[t]} | {have} |")
out.append("")

for t in ("A", "B", "C"):
    picked = [r for r in rows if r["tier"] == t and r["email"]][:12]
    if not picked:
        continue
    out += [f"## Tier {t} — drafts ({len(picked)} with a published address)", ""]
    for r in picked:
        out += [f"### {r['brand']} ({r['domain']})", "", "```", draft(r).strip(), "```", ""]

(R / "outreach-drafts.md").write_text("\n".join(out), encoding="utf8")

print(f"rows: {len(rows)}")
for t in "ABC":
    print(f"  tier {t}: {counts[t]:3}  with address: {sum(1 for r in rows if r['tier']==t and r['email'])}")
print("wrote research/outreach-list.csv and research/outreach-drafts.md  (NOTHING SENT)")
