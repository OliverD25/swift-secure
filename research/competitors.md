# Who else sells this, and for how much

Researched 1 August 2026, starting from the badges actually found on operator
sites in the census. Read this before any pricing conversation — until now we
had no idea what this category charges.

## The short version

Three findings, and the last one is the one that hurts.

1. **The market price for a casino trust seal is €250/month — confirmed for one
   vendor, self-reported for a second.** Gamecheck checked out on every test
   applied: named founder corroborated by an outside CEO's interview, an ISO
   27001 certificate from BSI Group with a matching registered address, trade
   press, Wayback Machine history. A second vendor, Check2Play, claims the same
   price but could not be independently verified to exist as a real operating
   company beyond its own site — see below. Our €200 tier is priced just under
   the confirmed one.
2. **The licence check we built is already given away free by a live
   competitor**, across more regulators than we cover.
3. **On paper, at least one competitor already sells everything we planned to
   sell.** Licence verification, a badge, a public report — plus provider
   confirmation, which we cannot do at all. Corrected 3 August; the first
   version of this document said nobody occupied that position, and that was
   wrong regardless of which vendor's claims turn out to be real.

## The players

### Gamecheck — the incumbent, €250/month

Found on 9 sites. Sells the **Gamecheck SEAL**, and publishes its price:
*"Starting from €250/month"*.

What it certifies: that *"a selection of games on the casino has been tested
with no fake games found"*, based on **direct confirmation from multiple game
providers**. Process is three months of clean checks before the seal is issued,
then monthly rechecks, with a QR code verifiable only through their own app.

**They explicitly do not assess licensing.** That is stated on their own
material, and it is the single most useful fact in this document.

Note what their method implies: verifying games requires *provider
relationships*, not traffic analysis. This independently confirms what we found
the hard way — game-provider verification is not reachable from the network, and
Gamecheck solved it commercially rather than technically. We cannot copy this
without partnerships we do not have.

### Check2Play — the closest competitor on paper, but unverified independently

**$250/month**, published on their pricing page. Free unlimited lookups for
players, one paid plan for operators.

> **Ownership checked separately, 3 August — treat this vendor's claims as
> self-reported.** Legal entity is a Seychelles shell (Trust Validator LTD), no
> named founder or team, zero trade-press coverage, and the domain has never
> been archived by the Wayback Machine at any point. Gamecheck, by contrast, has
> a named founder, industry coverage, and a publicised partnership with Casino
> Guru. See `check2play-ownership.md` for the full check. This does not mean
> Check2Play is illegitimate — it means their pricing and scope are *their own
> claims about themselves*, not corroborated market data the way Gamecheck's
> are.

Their own description of what an operator gets:

> *"Comprehensive Audit — Our team conducts thorough checks: **license
> verification**, game provider confirmation, security analysis, payment method
> review, and terms & conditions audit."*

> *"Provider Confirmation — We contact game providers directly to confirm the
> casino has legitimate partnerships and authorized access to their game
> content."*

Read that list against ours. Licence verification: they do it. A badge and a
public verification report: they do it. Provider confirmation: they do it and we
have proven we cannot. Payment and terms review: they do it, we do not.

**The first version of this document described a gap that does not exist.** It
said Gamecheck checks games but not licences, CasinoLicensing checks licences
but sells operators nothing, and therefore nobody sold an operator a badge
backed by licence verification. Check2Play does exactly that, and has for some
time. The error came from reading their seal page for the provider claim and not
reading the sentence next to it.

### CasinoLicensing.org — does our check, free

This is the uncomfortable one. It verifies any casino's licence against official
regulator databases — **UKGC, MGA, Curaçao, Anjouan, Gibraltar, GGL, Estonia,
Isle of Man** — returns results in seconds, claims *"trusted by 10,000+ players"*,
and is **free with no signup**.

That is the core of what we built, across eight regulators where we cover one.
It is player-facing rather than operator-facing, and it has a login and a "Get
Started", so some paid tier presumably exists.

**The licence-verification check is not a differentiator.** It is table stakes,
and someone is already giving it away.

### The established testing labs

GLI, Gaming Laboratories, BMM Testlabs, Quinel, eCOGRA, iTech Labs. Enterprise
RNG and fairness certification, long-established, expensive, aimed at operators
who need it for regulatory approval. Different market from ours.

## Two of our own numbers were wrong

Both were classification errors, found by actually visiting the vendors:

- **`licenseseal.online` is not a vendor at all.** It is the Anjouan Gaming
  regulatory authority's own site. A badge pointing there is the regulator's
  licence seal, which ships with the licence.
- **`dlagglobal` is a licensing agent**, the appointed direct licensee for
  Tobique — not a certification seller. Same story: its seal comes with the
  licence.

Six and three sites respectively were counted as paying customers of a
competitor when they were displaying a licence seal they already had.

### Corrected counts, 374 sites read

| What they display | Sites | % |
| :--- | ---: | ---: |
| **Paid lab certification** (gamecheck, gaminglabs, gli, quinel, bmm) | **18** | 4.8% |
| Licence seal from an agent/regulator (free with the licence) | 7 | 1.9% |
| Review-platform badge (largely free listings) | 17 | 4.5% |

The headline number has now moved four times — 2.5%, 5.7%, 9.9%, 4.8% — and
only the last is on a sound footing, because it is the first one where we
checked what each vendor actually sells rather than inferring from a hostname.
**4.8% is the number to use.** Roughly one operator in twenty pays for a quality
certification.

## What this means for us

**Where we cannot go.** Game verification needs provider relationships. Gamecheck
and Check2Play both have them and we have none, and it cannot be substituted
with network analysis — we tested that and it does not work.

**There is no product gap, on the evidence available.** Everything we can build,
Check2Play's own site claims to already sell, plus two things on top of it we
cannot do. Their claims are unverified independently, so this should be read as
"almost certainly no gap" rather than certainty — but Gamecheck alone is enough
to retire any pitch built on "nobody does this."

**What is left is narrower and has to be said plainly.** Three things are ours:

- **Cloaking detection.** Neither competitor publishes anything about checking a
  site from multiple countries. It is the one check we run that they do not, and
  it is measurable, dated and hard to fake.
- **Published limits.** Both competitors describe what they check. Neither
  publishes what they do not. For an entrant with no reputation, being the only
  one to state the boundary is the only credible position available.
- **Free.** Not a differentiator so much as the price of entry against two
  established vendors at $250/month.

**The honest risk, restated a second time.** It is worse again. Gamecheck's
results are embedded directly into Casino Guru's own review pages — checked
3 August, see `gamecheck-ownership.md` — which is a real distribution
advantage, not just an independently-credible competitor. Formal ownership is
not confirmed, but for competitive purposes the effect is the same either way:
Gamecheck's verification reaches players through one of the largest casino
review platforms in the industry. The risk is not that our check is cheap to
replicate, and not only that it has already been replicated and sold — it is
that the incumbent already has the distribution we do not.

That is survivable — the market is large, most operators have heard of neither
us nor Gamecheck by name, and 4.8% paying means the category is under-sold
rather than saturated. But it
has to be planned for honestly rather than around.

## Sources

- [Gamecheck SEAL](https://gamecheck.com/seal) — pricing and scope
- [Gamecheck: the SEAL has arrived](https://gamecheck.com/articles/online-casino-technology-and-innovations/the-gamecheck-seal-has-arrived)
- `gamecheck-ownership.md` — independent verification: ISO 27001/BSI, named founder, Wayback history
- [Check2Play SEAL](https://check2play.com/seal) — scope of their audit
- [Check2Play pricing](https://check2play.com/pricing) — $250/month, free for players
- `check2play-ownership.md` — why these claims are marked self-reported rather than confirmed
- [CasinoLicensing.org](https://www.casinolicensing.org/)
- [licenseseal.online](https://licenseseal.online) — the Anjouan authority itself
- [DLAG](https://dlagglobal.com/) — Tobique licensing agent
