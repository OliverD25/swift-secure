# What Swift Secure can actually check

State as of 3 August 2026. Every line here is something that has been run
against live casinos and produced a result, or is explicitly marked as not
working. This is the honest inventory the methodology page should be built
from — including the section at the bottom, which is the part competitors do
not publish.

## 1. Licence verified against the regulator's own register

**The core check, and the one thing that is unambiguously working.**

| Jurisdiction | Method | Status |
| :--- | :--- | :--- |
| Anjouan | Full register pulled (1,475 records), matched by domain | Working — 11 of 23 confirmed on first run |
| Curaçao | Register PDF (624 licences) + per-licence certificate | Working, and stronger (see below) |

The Curaçao pipeline also became our largest prospect source: 560 of 561 B2C
certificates read, naming 4,177 domains that collapse to **2,187 distinct brands
across 524 operators** once mirror domains are folded together. 1,104 sit on an
active licence, 66 on a revoked one. Operator groupings there come from the
regulator rather than being inferred from shared infrastructure, which makes
them the best-sourced prospects we hold.

Curaçao is worth understanding because it does more than confirm existence. The
register itself is a 25-page PDF — an earlier pass concluded there was no
downloadable register, which was wrong — and it gives 624 licences. The
licence number then contains the key to the certificate — `OGL/2024/887/0618` resolves
to `cert.cga.cw/token?id=618` — and **the certificate names the domain the seal
may be displayed on**. So the check answers a sharper question than "does this
licence exist": it answers "does this licence belong to the site showing it".

That catches an operator publishing somebody else's number, which a register
lookup alone would pass.

**Already caught in the wild:** an operator publishing a Costa Rican *company
registration number* as if it were a gaming licence. Costa Rica issues no gaming
licences at all.

**What a miss means:** not in the register is reported as *unconfirmed*, never as
*unlicensed*. Registers lag, tokens expire, and domains move. Absence of a record
is absence of evidence.

**Jurisdiction is stated as a fact, not a verdict — but the fact is now more
useful.** AskGamblers' own new-casino guide names the tier explicitly: *"the
United Kingdom Gambling Commission and the Malta Gaming Authority are highly
trusted... new casinos with these licences usually provide better protection
than operators licensed in Anjouan or Curaçao."* That is an industry-recognised
statement, not our opinion, and it is the kind of one-line context a report can
carry without editorialising — "Anjouan: an offshore jurisdiction with lighter
regulatory oversight than UKGC or MGA" is a fact, not an accusation. Worth adding
to how a licence line reads in a report, not just what it says.

## 2. Cloaking — does the site tell every country the same story

**New, working, and the only capability no competitor offers.**

Fetches the same casino through residential exits in different countries and
compares what each is shown. Localisation and currency differences are reported
as normal. The finding raised is a site naming a **different regulator or licence
number** depending on who is asking, because only one of those claims can be true.

Measured on 130 sites (two batches): **7 confirmed (5.4%)**. Six show the
Anjouan licence verifier to Canadian visitors and hide it from German ones;
one, `betphoenix.ag`, runs the opposite way — shown to Germany, hidden from
Canada. That reversal matters: it broke the tidy first-pass story of "hiding
from strictly regulated markets," and any explanation that only fits six of
seven is not the explanation.

Every suspected difference is re-sampled three times per region before it counts.
That guard exists because single-sample comparison had a **~50% false-positive
rate** across the two batches (14 candidates, 7 survived).

**We do not conclude why a site differs, only that it does.** Three explanations
fit a confirmed case and the check cannot separate them: the seal vendor's own
widget may geo-restrict on its own, the operator may be deliberately (and
legitimately) suppressing a claim the licence does not cover in that market, or
it is what it looks like. AskGamblers' own new-casino guide corroborates the
first possibility outright — *"the casinos displayed on this page are tailored
to your location... licensing rules vary by region"* — a leading review site
openly geo-tailors its own listings for licensing reasons. That is exactly why
this finding never goes in the operator email: a real difference is still
ambiguous, and only the public verification page states an ambiguous, dated
fact without turning it into an accusation.

**Why this matters commercially:** a static badge image cannot state where it was
verified from. Ours can — "shown to visitors from Canada, not from Germany,
checked 3 August 2026" is a dated fact.

## 3. What trust signals a site already displays

Reads the rendered page for badges, including ones the operator self-hosts, and
sorts them by what they actually are:

- **paid lab certification** (gamecheck, GLI, Gaming Labs, BMM, Quinel)
- **licence seal** that ships free with the licence
- **review-platform badge** (AskGamblers, Trustpilot — usually free listings)
- **responsible-gambling logos**

The distinction matters: 4.8% of readable sites pay for certification, but 68%
display a regulator seal. Conflating those two produced a market estimate that
was wrong by a factor of two.

**External corroboration of scope, not a new capability.** AskGamblers tells
players to check exactly three things before depositing without an account: a
clickable licence badge showing status and issue date, the company behind the
casino cross-checked against official registries, and independent testing seals
(eCOGRA, GLI, iTech Labs). That is our licence verification, our operator/company
extraction from the Curaçao certificates, and this trust-signal detector —
stated independently by an established authority as the accessible due-diligence
baseline, not something we invented to justify our own scope.

## 4. Which game studios a site claims

53% of readable sites publish their studio list. We record **the claim**, with a
date, and count distinct studios rather than markup mentions.

## 5. Which platform runs the site

BetConstruct, Slotegrator and others are identifiable from shared infrastructure
hosts. 67 of 470 sites mapped. Commercially this is a partnership lead, not a
badge input.

## 6. Geographic availability

Which countries can reach the site at all. Territorial refusal is normal and
legal; it is recorded, not flagged.

---

## What we cannot check, and will not claim

This section is the differentiator. Every competitor asserts they check
everything; being explicit about the limits is the only credible position
available to a new entrant.

**We cannot verify that games come from the studios a site names.** Tested
directly: casinos proxy game content through unbranded CDNs and their own mirror
domains, so the provider's identity is not present in the network traffic at all.
Zero provider hosts found across every site tested. This is a ceiling of the
method, not a gap in a database.

Gamecheck and Check2Play do this check by confirming directly with the providers
— a commercial relationship, not a technical one. We have no such relationships
and should not imply otherwise.

**We cannot assess RNG fairness or RTP.** That requires the game server, which
requires being the regulator or an accredited lab.

**We cannot check anything behind a login.** No accounts, no deposits, so no
payout testing, no withdrawal timing, no bonus-term enforcement.

**We cannot see roughly a fifth of the market.** 95 of 489 sites refuse our
scanners outright, and residential proxies recover only about a quarter of those.
Those sites are reported as unmeasured.

**A single scan is a snapshot.** Sites change. Every finding carries the date it
was observed and nothing is presented as a continuing guarantee.
