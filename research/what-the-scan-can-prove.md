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

The sweep answered a question we had been guessing at: **how many casinos
actually pay for a trust seal?**

| | Sites | % |
| :--- | ---: | ---: |
| Paying a **commercial** seal vendor | **12** | 2.5% |
| Displaying the regulator's free seal | 60 | 13% |
| No third-party trust signal at all | 394 | 84% |

**Twelve out of 470 pay.** The commercial seal market in this segment is close
to nonexistent, and no amount of product work changes that.

The number next to it is the one that matters, though: **60 operators display a
seal they got for free.** They are willing to put a third-party badge on their
site — they are not willing to pay for one. The behaviour we need already
exists; only the payment does not.

That makes the free founding-cohort offer the right model on the evidence, not
just a launch tactic. It also means **badge subscriptions cannot be the revenue
line here.** Money has to come from platforms, or from a segment with compliance
budgets (MGA/UKGC), while this segment supplies backlinks, directory content and
reference cases.

The twelve who already pay are the warmest list we have, and they cluster: five
sit on `licenseseal.online` and are all Turkish-facing brands, almost certainly
one group. Twelve names is realistically four conversations.

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
