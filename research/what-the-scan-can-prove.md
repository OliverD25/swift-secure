# What the scan can and cannot prove

Measured 31 July 2026 against live casinos. Written down because the headline
result is **negative**, and a negative result that is not recorded gets
rediscovered the expensive way — in a sales call.

## The claim that failed

> "We verify that games load from the providers the site declares."

**Not deliverable.** Tested on four reachable casinos, clicking game tiles the
way a player does. Provider hosts found: **zero**. Not on any site.

What carries the game content instead:

| Site | Host serving games | Requests |
| :--- | :--- | ---: |
| spinsamurai.com | `contentdeliverynetwork.cc` | 882 |
| levabet.com | `vendor-provider.fra1.cdn.digitaloceanspaces.com` | 325 |
| caposino.com | `caposino1.com` (own mirror domain) | 1,233 |

No `pragmatic`, no `evolution`, no `softswiss` — anywhere. Operators proxy game
content through unbranded CDNs and their own mirrors, so the provider's identity
is simply not present in the network layer.

**This is a ceiling of the approach, not a bug.** No amount of signature-database
work fixes it, because the information is not in the traffic. Two secondary
obstacles compound it: game tiles on SPA casinos are `div`s with click handlers
(link-scraping finds nothing), and most games need an account.

Anything promising provider verification must be removed from outreach material.
Promising a check we cannot perform is the one failure this business does not
survive — the entire product is that our word means something.

## What does work

- **Licence against the regulator's register.** Proven: 11 of 23 confirmed, and
  it caught an operator publishing a Costa Rican company registration number as
  a gaming licence. This is the product.
- **Detecting a competitor's seal.** `seals.dlagglobal.com` appears on live
  sites — it identifies operators *already paying* for a trust badge.
- **Page weight and request count.** 1,233 requests to a single host is a real,
  quantified performance finding, and it is measured for free as a side effect.
- **Unbranded content domains.** Defensible phrasing: "game content is served
  from a domain with no verifiable identity" — an observation, not an accusation.
- **Tracker load.** Facebook, Hotjar, Contentsquare and OneSignal on one site is
  a GDPR exposure worth naming for EU-facing operators.
- **Shared infrastructure.** Hosts recurring across operators reveal platform
  groupings and therefore which brands share an owner.

## Market size — measured, 470 sites

> **Corrected 31 July 2026.** The first pass reported 2.5% paying and 84% with
> no trust signal. Both were wrong. It detected seals by third-party *hostname*,
> so any badge an operator self-hosts — the normal deployment — was invisible.
> Re-measured with a detector validated against known cases first. Numbers below
> are the corrected ones; the originals are kept in the table so the size of the
> error stays visible.

| | Corrected | First pass | |
| :--- | ---: | ---: | :--- |
| Paying for **certification** (lab or seal vendor) | **27 (5.7%)** | 12 (2.5%) | ×2.3 |
| Carrying a review-platform badge (often free) | 16 (3.4%) | — | |
| Displaying the regulator's licence seal | **263 (56%)** | 60 (13%) | ×4.4 |
| Responsible-gambling logos | 144 (31%) | — | |
| **Listing their game providers on-site** | **197 (42%)** | — | |
| No trust signal of any kind | 145 (31%) | 394 (84%) | ⅓ |

Three things follow, and they are not what the first pass suggested.

**Displaying a badge is normal, not rare.** 56% show the regulator's seal and
only 31% show nothing at all. The behaviour the offer depends on is already
routine — we are asking for something operators visibly already do.

**Paying is a real but minority market.** 5.7% is not the near-zero the first
pass implied, but it is still a minority, so a badge subscription remains a hard
primary revenue line in this segment. The free founding cohort stays right; the
reasoning is now "most don't pay" rather than "nobody pays".

**42% list their game providers on their own site.** This partly recovers what
the traffic analysis could not do. We cannot see which provider serves a game
from the network, but nearly half of operators *publish the claim* — and a
published claim is something that can be recorded, dated, and checked.

Vendor concentration among the 27 payers: `gamecheck` (9), `licenseseal` (6),
`gaminglabs` (6), `gli` (4), `dlagglobal` (3). Both leaders skew heavily
Turkish-facing, and several names cluster into single groups — narnia*/narnium*
are one operator, as are most of the licenseseal set. Twenty-seven names is
realistically closer to a dozen conversations.

Full per-site output: `research/seal-census.json`, regenerate with
`node crawler/seal-census.mjs`.

## Platforms are detectable even though providers are not

The same sweep found what the game-launch approach was reaching for, one layer
up. Individual game providers are invisible, but the **platform** is not:

| Signature | Sites | Reading |
| :--- | ---: | :--- |
| `bc-status.betconstruct.workers.dev`, `cmsbetconstruct.com`, `geoapi2.bcapps.org` | ~26 | **BetConstruct** — named explicitly in the hosts |
| `v3.traincdn.com` | 13 | Slotegrator, by signature |
| `cdn.launcher.a8r.games` | 8 | Aggregator launcher |

This is commercially useful in a way provider-level checking never was. It maps
which platform serves which operators, which is the opening for the partnership
channel: approaching BetConstruct with "we have already mapped and indexed 26 of
your operators" is a materially different conversation from a cold pitch.

## Why this is better than what it replaced

Provider verification was a claim only a specialist could evaluate. Speed, geo
availability and licence status are **universally revenue-linked**, so no market
knowledge is required to know they matter — which matters, because we don't have
that knowledge yet.

It also inverts the offer. Instead of "install our badge", it becomes "here is a
free technical audit of your casino; the badge is just a public page showing the
result, if you want to display it." The badge stops being the thing being sold.

## Reproduce

```bash
cd crawler
node clickprobe.mjs <domain>      # click tiles, list provider hosts
node fingerprint.mjs <domain...>  # shared infrastructure across operators
node market-scan.mjs              # full sweep of research/prospects-live.csv
```

## Still unmeasured

- Everything was run from one home IP. The ~30% of sites returning 403/451 are
  geo-blocking, not offline, and are excluded from every number above.
- Whether a logged-in session would expose provider hosts. Plausible, but it
  requires real accounts and deposits, which is a different kind of undertaking.
