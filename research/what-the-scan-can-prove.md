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

> **Corrected twice.** Each fix to the method raised the number, which is worth
> knowing before trusting the current one.
>
> 1. **Hostname only — 2.5%.** Detected seals by third-party host, so any badge
>    an operator self-hosts (the normal deployment) was invisible.
> 2. **Reading the DOM — 5.7%.** Caught self-hosted badges, but a site that
>    blocked us returned "no signals" and was counted as a casino displaying
>    nothing.
> 3. **Excluding blocked pages — 9.9%.** 95 of 489 sites refuse this host
>    outright. They are now reported as unmeasured rather than as absences.
>
> The direction is consistent: every correction found more badges. **95 sites
> remain unmeasured**, so the true figure is likelier above 9.9% than below it.

Measured from the homelab, 374 sites read, 95 blocked, of 489 attempted.
Percentages are of sites actually read.

| | Current | Was (DOM) | Was (host) |
| :--- | ---: | ---: | ---: |
| Paying for **certification** (lab or seal vendor) | **37 (9.9%)** | 27 (5.7%) | 12 (2.5%) |
| Carrying a review-platform badge (often free) | 17 (4.5%) | 16 (3.4%) | — |
| Displaying the regulator's licence seal | **254 (67.9%)** | 263 (56%) | 60 (13%) |
| Responsible-gambling logos | 144 (38.5%) | 144 (31%) | — |
| **Listing their game providers on-site** | **198 (52.9%)** | 197 (42%) | — |
| No trust signal of any kind | **53** | 145 | 394 |
| Blocked, therefore unknown | **95** | counted as "no signal" | counted as "no signal" |

**Which host you scan from changes the block count**, not the market. The
homelab and the workstation are refused by different sites, so the blocked set
is a property of our network position. Residential proxies would recover most
of it.

Three things follow, and none of them is what the first pass suggested.

**Displaying a badge is normal, not rare.** 68% show the regulator's seal and
only 14% of readable sites show nothing at all. The behaviour the offer depends
on is already routine — we are asking operators to do something they visibly
already do.

**Paying is a real market, not a rounding error.** At 9.9% of readable sites,
roughly one operator in ten already buys this category. Across the 3,549 domains
in the Anjouan register alone that implies a few hundred businesses with a
demonstrated willingness to pay for exactly what we sell. **The earlier
conclusion that badge subscriptions cannot be a revenue line was an artefact of
a broken measurement, and should not be repeated.** It remains a minority of the
market, which is an argument about sizing, not about viability.

**42% list their game providers on their own site.** This partly recovers what
the traffic analysis could not do. We cannot see which provider serves a game
from the network, but nearly half of operators *publish the claim* — and a
published claim is something that can be recorded, dated, and checked.

Vendor concentration among the payers: `askgamblers` (11), `gamecheck` (9),
`trustpilot` (9), `casinoguru` (8), `gaminglabs` (6), `licenseseal` (6),
`gli` (4). Certification labs and review platforms are different products —
`gamecheck` and `licenseseal` skew heavily Turkish-facing, while the review
badges are largely free listings and should not be read as paid certification.

Several names collapse into single groups: narnia*/narnium* are one operator, as
are most of the `licenseseal` set. The payer list is fewer conversations than it
is rows, which is an advantage rather than a problem — see the operator-level
list in `outreach-channels.md`.

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

## Platform map, and a fraud check that came back clean

`platform-map.csv`, built from hosts the market scan already captured — no extra
crawling. 67 of 470 sites (14%) resolve to a named platform:

| Brands | Confidence | Platform |
| ---: | :--- | :--- |
| 35 | named | BetConstruct |
| 13 | inferred | Slotegrator |
| 8 | inferred | A8R launcher |
| 5 | inferred | s7s |
| 4 | named | SoftSwiss |

*Named* means the host says so outright (`cmsbetconstruct.com`); *inferred*
means the signature is consistent but the brand is not in the hostname
(`traincdn.com` for Slotegrator). The distinction is worth keeping — one is a
fact and the other is a reading, and a sales call will find the difference.

**One platform deal reaches a client base that would take months to approach
one brand at a time.** BetConstruct alone is 35 of our indexed brands, which is
a materially better opening than a cold pitch.

### Shared seal IDs — checked, nothing wrong

Anjouan seals load from a per-certificate UUID host, and six sites shared one
ID. If a single seal ID appeared across *unrelated* operators, that would be an
operator displaying somebody else's certificate — exactly the fraud this product
should catch.

Checked all ten shared IDs. **Every one belongs to a single operator** —
partybet.ai/.bot/.casino/.fun/.social/.win are one company, and so on down the
list. No misuse found.

Recording the negative deliberately: the check now exists and is defined, so a
future scan that *does* find a seal shared across operators is immediately
meaningful rather than a curiosity someone has to re-derive. It also gives an
operator-clustering signal that is independent of the register's own company
field, which is a useful cross-check on data we otherwise take on trust.
