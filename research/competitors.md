# Who else sells this, and for how much

Researched 1 August 2026, starting from the badges actually found on operator
sites in the census. Read this before any pricing conversation — until now we
had no idea what this category charges.

## The short version

Two findings that change the plan, one of them uncomfortable.

1. **The market price for a casino trust seal is €250/month.** Our €200 tier was
   a reasonable guess and is priced slightly under the incumbent.
2. **The licence check we built is already given away free by a live
   competitor**, across more regulators than we cover.

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

### Check2Play — same product, same method

*"We verify directly with game providers like Evolution Gaming and Pragmatic
Play to confirm legitimate partnerships."* Also badge-based, also aimed at
operators. Confirms game-authenticity certification is an established category
with more than one seller, not a gap.

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

**Where the actual gap is.** Gamecheck states it does not assess licensing.
CasinoLicensing.org assesses licensing but serves players, free, with no badge
for the operator to display. So nobody is selling an operator **a badge backed
by licence verification with a dated public page behind it**. That is a narrow
gap, but it is real, and it is exactly what we already built.

**Pricing.** €250/month is the anchor. Free for the founding cohort still makes
sense, and there is now a defensible number to move to afterwards rather than a
guess.

**The honest risk.** Our check is cheap to replicate and already free somewhere
else. What is not cheap to replicate is a reputation for saying what we did not
check. That was already the plan; this research makes it the whole plan rather
than one differentiator among several.

## Sources

- [Gamecheck SEAL](https://gamecheck.com/seal) — pricing and scope
- [Gamecheck: the SEAL has arrived](https://gamecheck.com/articles/online-casino-technology-and-innovations/the-gamecheck-seal-has-arrived)
- [Check2Play SEAL](https://check2play.com/seal)
- [CasinoLicensing.org](https://www.casinolicensing.org/)
- [licenseseal.online](https://licenseseal.online) — the Anjouan authority itself
- [DLAG](https://dlagglobal.com/) — Tobique licensing agent
