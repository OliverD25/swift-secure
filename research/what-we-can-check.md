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

## 2. Cloaking — does the site tell every country the same story

**New, working, and the only capability no competitor offers.**

Fetches the same casino through residential exits in different countries and
compares what each is shown. Localisation and currency differences are reported
as normal. The finding raised is a site naming a **different regulator or licence
number** depending on who is asking, because only one of those claims can be true.

Measured on 60 sites: two confirmed (`jokertipp.com`, `greatslots.com` — Anjouan
licence verifier shown to Canadian visitors 3 of 3 samples, to German visitors 0
of 3).

Every suspected difference is re-sampled three times per region before it counts.
That guard exists because single-sample comparison had a **67% false-positive
rate** in testing.

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
