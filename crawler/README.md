# Verification crawler

Checks two things about a casino:

1. **Do its games load from real provider or aggregator infrastructure?** A game
   served from the operator's own servers means the operator controls the maths.
2. **Does its licence exist in the regulator's register?**

Both feed the verification page for that casino. Neither is a judgement about
whether the operator is honest — see `/methodology/` on the site for the line
we hold.

## Status: licence check works, games check needs proxies

| Check | State |
|---|---|
| Anjouan licence register | **Working.** 1,446 records, matched by domain |
| Game origin classification | **Working**, verified against known cases |
| Game origin *in practice* | **Blocked** — casinos refuse datacentre IPs |
| Curaçao / Tobique / Kahnawake licences | Not implemented |

Run it today and you get real licence verification. The games check returns
`inconclusive` on most targets until residential proxies exist, and it says so
rather than guessing.

## Quick start

```bash
cd crawler
npm install
npx playwright install chromium

npm run licence -- moemoecasino.com kings.game    # works now, no proxies
npm run scan -- moemoecasino.com                  # full check
npm run learn -- somecasino.com                   # grow the signature DB
```

## Proxies

Casinos block datacentre IPs. Of 23 target domains tested, the common responses
were a "use your VPN" interstitial, HTTP 403, or an empty page. Without
residential exits the crawler cannot read a licence footer, let alone launch a
game.

There is also the reason the strategy doc gives: an operator can serve genuine
games to a checker on a clean Tier-1 IP and swapped ones to real players in
LATAM or CIS. Checking from one datacentre IP would make the report trivially
rebuttable, and the report is what the whole unit rests on.

```bash
export PROXIES="http://user:pass@gate.provider.com:7000?country=de,
                http://user:pass@gate.provider.com:7000?country=br,
                http://user:pass@gate.provider.com:7000?country=ru"

npm run scan -- somecasino.com
```

Or put one URL per line in a file and set `PROXY_FILE`. The `country`/`region`
query parameter is only used to label which regions a scan covered.

The crawler runs three regions per casino by default and flags
`regionMismatch: true` when they disagree — that disagreement *is* the
cloaking detection.

### Bandwidth

Images, fonts and media are blocked; only request URLs matter. A scan costs
roughly 5–10 MB instead of tens of MB.

At 100 casinos re-checked weekly that is about **4 GB/month**. At mid-market
residential rates (~$3–5/GB) the pool costs roughly **$15–20/month** — small
enough that it should not gate the build.

## The signature database

`data/signatures.json` is the moat. Anyone can copy the badge artwork in an
afternoon; nobody can copy this without doing the same work.

**The aggregator list is the part that matters.** Most legal casinos take games
through SoftSwiss, Slotegrator, Hub88 or EveryMatrix rather than integrating
each provider directly. Omit those and the crawler reports half the legal
market as fake — one operator checks the report, publishes the rebuttal, and
the product is over.

Grow it from evidence, not assumption:

```bash
npm run learn -- a-casino-you-trust.com
```

Everything printed as `unknown` is either a missing provider or noise. Add the
real ones to `signatures.json`.

The domains currently in there were compiled from public knowledge of the
iGaming stack and have **not** all been confirmed against live traffic. Treat
the file as a starting point.

## How a verdict is reached

| Observation | Verdict |
|---|---|
| Provider or aggregator recognised | `clean` |
| Only the operator's own hosts, nothing recognised | `suspicious` |
| Regions disagreed | `suspicious` (cloaking signature) |
| Site unreachable / blocked / no game opened | `inconclusive` |
| Traffic matched nothing known | `inconclusive` (likely a DB gap) |

`suspicious` is explicitly *needs a human look*, not an accusation — the same
observation is produced by a provider missing from the signature DB. Nothing
here should go on a public page without a person reading it first.

## Wiring into the site

Reports land in `reports/<domain>.json`. To publish, copy the confirmed fields
into `src/data/casinos.ts` and move the entry's `status` from `listed` to
`scanned`. That status change is a claim that a scan actually happened — do not
make it on the strength of an `inconclusive` run.

## Not implemented

- **Curaçao (CGA)** — no public domain search. Certificates are reachable only
  through the seal on the operator's own site (`cert.cga.cw/<id>`), so it is a
  per-site scrape gated behind the same blocking as the games check. Wire it in
  once proxies exist: read the footer seal href, follow it, parse the page.
- **Tobique, Kahnawake, MGA** — registers exist but are not wired up.
- **Catalogue comparison** (does the casino list games the provider never
  released) — needs per-provider catalogue data first.
- **Silver/Gold checks** — test deposits and withdrawals, bonus T&C audit.
  These are partly manual by design.
