# Casino technical audit — methodology

**This is the one canonical document for how the technical audit works.** It is
a living reference: when a check changes, gets fixed, or gets retired, this
file is what changes, in place — not a new dated file next to it. The dated
research files (`what-we-can-check.md`, `what-the-scan-can-prove.md`,
`what-else-is-measurable.md`, `competitors.md`) are the investigation history —
useful for *why* a decision was made and *when*, but they are logs, not the
reference. If something here ever contradicts one of them, this file wins;
update the log file's heading to point here rather than editing old numbers in
place.

Last reviewed: 3 August 2026.

---

## 1. What this is for

Two outputs, two different rules, one filter that decides which a finding goes
to. The filter is defined in [`AGENTS.md`](../AGENTS.md) under "The report must
be useful to the casino, not to us" — read it before adding a new check, not
after.

| Output | Rule |
| :--- | :--- |
| **The free report we send the operator** | Only findings that pass all four questions: would they thank us, can they act on it, do they plausibly not know, does it cost them money/players/licence risk. |
| **The public verification page** | May carry true findings that fail the email test — an operator's own deliberate choices, things they already know. Independent verification that only publishes flattering facts is worth nothing. |

A finding that fails both is dropped, not softened. A finding that passes the
public-page bar but not the email bar (cloaking, a misrepresented seal, a
revoked licence still displayed) **never goes in the operator's email** — see
§4 and §6.

## 1a. Product names — how the checks are called in anything an operator sees

Chosen 4 August 2026. These are the ONLY names used in emails, reports and the
public site. Internal names (audit-probe, mobile-timing, brokenReal) never
appear in operator-facing text — an operator should meet one consistent name
per check everywhere.

The umbrella name for the whole deliverable is the **Casino Health Report**,
backed by the **Verified-at-Send** guarantee: every finding is re-checked
against the live site on the day the email goes out, and anything that no
longer reproduces is removed (`research/scripts/15-verify-wave.py`).

| Product name | What it is | Internal check |
| :--- | :--- | :--- |
| **Revenue Leak Scan** | Requests that fail on the homepage — payment icons, game modules, own APIs | §5, `brokenReal` in `audit-probe.mjs` |
| **Dead Weight Finder** | The single largest file the homepage loads, named with its URL and size | §5, `heaviestAssets` in `audit-probe.mjs` |
| **Time-to-Play Test** | Seconds until the Register button is usable on a throttled mobile connection | `mobile-timing.mjs` |
| **Licence Match** | The licence number on the site checked against the regulator's own register | §2, `curacao.ts` / `licence.ts` |

Why these four names: the first two sell lost money, the third lost players,
the fourth trust — and none of them sounds like an accusation, which is the
same bar every finding itself has to clear (§1).

Runner-up names, kept so the next naming discussion does not start from zero:
Silent Failure Scan, Blind Spot Audit, Deposit Path Check; Page Bloat X-Ray,
Speed Tax Audit; 3G Reality Check, Player Patience Test, First Tap Benchmark;
Regulator Cross-Check, Proof of Licence.

## 2. Licence verification

The core check. Two jurisdictions, two different mechanisms, because the two
regulators publish differently.

### Anjouan — `crawler/src/checks/licence.ts`

Pulls the full public register (1,475 records at last count) and matches by
domain. The register is embedded JSON inside a page, extracted by
bracket-walking rather than parsed as a table.

`norm(domain)` strips `www.` **after** trimming whitespace, not before — the
register stores domains as a comma-separated string, so a naive split leaves a
leading space on every entry but the first, and stripping `www.` before
trimming means the anchor never matches. This was a real bug (false negatives
on vivaspin/spinzen) fixed early in the project; the ordering is load-bearing,
not stylistic.

### Curaçao — `crawler/src/checks/curacao.ts`

Curaçao does not publish a machine-readable register — it publishes a **25-page
PDF** (`research/scripts/8-curacao-register.py` reads it; the PDF-parsing
lesson is in §7). What makes per-casino verification possible without holding
the whole PDF is that the licence number contains its own lookup key:

```
OGL/2024/887/0618  ->  https://cert.cga.cw/token?id=618
```

The certificate this resolves to is **stronger than a register lookup** would
be, because it names the domain(s) the seal may be displayed on:

- **B2B certificates** name one corporate site (`certifiedDomain`).
- **B2C certificates** list every domain the licence covers
  (`approvedDomains[]`) — an operator's whole brand portfolio, stated by the
  regulator. `volna.casino` resolved to 4 domains under one licence;
  `OnlineGaming Soft B.V.` resolved to 538 (see §7 on mirror domains before
  treating a domain count as a brand count).

So the check answers a sharper question than "does this licence exist" — it
answers **"does this licence belong to the site showing it."** A real licence
number displayed on a domain the certificate does not cover is the specific
fraud this catches, and it is why the check exists as certificate-lookup rather
than register-lookup.

### What absence means, in both jurisdictions

Not found is reported as **unconfirmed**, never as **unlicensed**. Registers
lag, Curaçao tokens can expire and need reissuing, domains move. Absence of a
record is absence of evidence, not evidence of absence — this wording is
enforced in both check modules' `note` field, not left to whoever writes the
report.

## 3. Trust-signal / seal detection — `crawler/trust-signals.mjs`

Reads the rendered page (not raw HTML — self-hosted badges and JS-rendered
footers require a real DOM) for seven categories:

```
certification | regulator | responsible | review | provider | payment | security
```

matched in that order, because the general categories (`payment`, `security`)
would otherwise swallow the specific ones.

**Why category, not "has a badge."** A footer is a wall of logos — payment
methods, providers, licences, responsible-gambling marks — and a single "seal
present" regex would count all of them as the same thing. Only `certification`
matches a **paid vendor** (`gamecheck`, `gaminglabs`, `gli`, `bmm`, `quinel`,
plus `dlagglobal`/`licenseseal` — see the correction below). `regulator` is
free with the licence. `review` (AskGamblers, Trustpilot, Casino Guru) is
mostly free listings and must not be counted as a competitor's paying
customer.

**Correction on record:** `licenseseal.online` and `dlagglobal` were originally
classified as certification vendors and inflated the "who pays" figure by
roughly 2×. Visiting the vendors directly showed `licenseseal.online` is the
Anjouan regulator's own site, and `dlagglobal` is Tobique's licensing agent —
both ship free with the licence. The corrected market figure is **4.8% pay for
lab certification, 68% display a free regulator seal** (see
`what-the-scan-can-prove.md` for the full correction history — the number moved
four times before this one held).

### Self-hosted badges and the iframe/network fallback

A DOM-only pass misses two things: a badge saved to the operator's own server
(no third-party request, invisible to a hostname-only scan — this is why the
*first* seal census undercounted by roughly half), and a seal vendor's widget
that loads in an **iframe**, which never touches the parent DOM at all. The
second case is handled by watching `request` and `framenavigated` events for
known vendor hosts (`VENDOR_HOST` regex) and merging that into the category
tally.

### Block detection

Judged on **HTTP status and page title only**, never on body text. An earlier
version matched loose words in body text and flagged live, working sites
(LevelUp, WG Casino, Lucky Spy) as blocked because a casino page mentions "403"
or "blocked" somewhere often enough on its own. `status >= 400` or a
title matching `forbidden|403|cloudflare access|temporary auth|attention
required|just a moment` marks the site **blocked**, distinct from **no trust
signal found** — see §7, this distinction is load-bearing everywhere in this
project, not just here.

Some sites return **HTTP 200 with a title of "403 | sitename"** — the status
code alone is not sufficient either; both signals are checked.

## 4. Cloaking detection — `crawler/cloaking.mjs`

The check that no competitor publishes, and the reason residential proxies
were worth buying. Fetches the same casino through a residential exit in each
configured region and compares what each is shown.

**What counts as a finding, and what does not.** Localisation, currency
differences, and being unreachable from some regions (licences are
territorial, and refusal is normal) are all reported as non-findings. The
thing worth flagging is a site naming a **different regulator or licence
number** by region, because only one of those claims can be true.

### Confirm before reporting — the single most important rule in this file

A suspected difference is **re-sampled 3 times per region** before it counts.
A verdict is only `DIFFERENT LICENCE CLAIM (confirmed: ...)` when one region
shows the claim in ≥2 of 3 samples and another shows it in 0 of 3; anything
between is reported as `unstable signal — not a difference we can stand behind`
and discarded.

This exists because it was tested and failed without it. A seal widget is
often lazily loaded, so single-sample comparison measured on 60 sites found
**6 suspected differences that were not real** — three sites (`kush.casino`,
`afrislots.net`, `gamwiz.com`) showed the seal in **both** compared regions at
3-of-3 once sampled properly. Single-sample comparison's false-positive rate
across the two batches run this session was **50–67%**. Publishing those would
have meant accusing operators of hiding their licence on the strength of a slow
iframe — the exact failure this project cannot afford, since the whole product
is that our word means something.

Confirmed findings across 130 sites checked: **7 (5.4%)** — `jokertipp.com`,
`greatslots.com`, `mondcasino.com`, `casinostars.io`, `maltcasino.com`,
`pinbahis.com` show the Anjouan verifier to Canadian visitors and not German
ones; `betphoenix.ag` runs the **opposite** direction (shown to Germany, not
Canada) — the reversal is on record specifically so nobody assumes a single
tidy "hides from strict markets" story explains all seven.

**Routing:** cloaking findings never go in the operator email (§1). They exist
for the public verification page only.

## 5. Site health audit — `crawler/audit-probe.mjs`

Everything else worth checking on a homepage, grouped by why an operator would
care rather than by what is technically convenient:

| Group | What | Status |
| :--- | :--- | :--- |
| **money** | request count, transfer weight, third-party host count | reliable — network-measured |
| **legal** | trackers firing before any consent interaction; whether a consent UI was found at all | **rank-only until measured from an EU IP — see below** |
| **craft** | broken requests, security headers, mixed content | reliable, **but only after refusals are removed — see below** |
| ~~console errors~~ | ~~JS exceptions on load~~ | **dropped from scoring — duplicates the broken-request count** |
| ~~compliance~~ | ~~terms/privacy links, age notice, self-exclusion, deposit limits~~ | **withdrawn — see below** |

### A refused request is not a broken request

This is the page-level rule — 401/403/429/451 means *refused*, not *absent* —
applied where it was missing: to individual requests inside a page that loaded
fine.

Found on 3 August 2026 during the 1311-domain sweep. Sorting by broken-request
count put `betewin.com` (22) and `betim.com` (20) at the top, both failing on
their own API subdomains. Every one returns a 552-byte page:

```
<html><head><title>403 Forbidden</title></head>
<body><center><h1>403 Forbidden</h1></center>
<hr><center>openresty</center></body></html>
```

An API that means *"you are not logged in"* answers in JSON with an error code.
A bare nginx HTML 403 means the request never reached the application. That is
an edge or WAF refusal aimed at our crawler, and the site works for a real
visitor. In one 148-failure sample, **60 (40%) were refusals of this kind**.
`challenges.cloudflare.com` appearing as a "failure" is the same mistake in its
most obvious form: Turnstile was interrogating us.

`audit-probe.mjs` now separates them. **Only `brokenReal` may be quoted**;
`brokenRefused` is kept as context and never reported. Genuine failures are also
split into `brokenOwnHost` and `brokenThirdParty`, because
`abcfortunazone.com`'s 60 real 404s are all on `agstatic.com` — its white-label
platform's CDN. Worth telling the operator, but the fix belongs to their vendor
and the wording has to say so.

### Console errors are not a separate finding

Their most common samples across the sweep are `Failed to load resource: the
server responded with a status of 404` and the 403 equivalent — the same
failures `brokenReal` already counts, arriving a second time through a different
channel. Scoring both counts one problem twice. The remainder are third-party ad
and analytics scripts throwing inside code the operator did not write, plus
`ERR_NAME_NOT_RESOLVED`, which can be our own DNS. Still collected as supporting
context, never scored.

### The consent finding is rank-only until we measure from an EU IP

It used to be reported with the wording *"measured from a German browser
context"*. **That was false.** `audit-probe.mjs` sets `locale: de-DE`,
`timezoneId: Europe/Berlin` and a German `Accept-Language`, which made the claim
look supported. But the request leaves a Ukrainian IP — checked directly,
`46.63.32.72`, Khmelnytskyi — and **sites gate cookie banners on IP
geolocation, not on `Accept-Language`**.

So a casino that showed us no banner may be behaving exactly as designed. We
were not an EU visitor, and Ukraine is not in the EU. The claim would have been
wrong on the first point an operator's own lawyer checks, across 219 of 458
readable sites.

The measurement still ranks — the trackers really did fire — but it may not be
written in an email. To make it reportable, configure the proxy pool and repeat
the measurement from an EU exit.

Even then the old constraint stands: *"N tracking hosts received a request
before any consent interaction, measured from `<country>` on `<date>`"* is
defensible. **"You are breaking GDPR" is not** — Google Consent Mode can send
cookieless pings that are not violations, and this project is not qualified to
render a legal opinion.

### Withdrawn: text-matched compliance checks

Terms/privacy/AML/bonus-link presence and responsible-gambling markers
(self-exclusion, deposit limits, age notice, help-org mentions) were tried and
**removed after producing false numbers on the full sweep**: an initial sample
suggested 97% of sites had no deposit-limit link and 44% had no terms link.
Both were artefacts of the method, not the market:

1. **Wrong vocabulary.** English/German only; `fixbet.com`'s Turkish "Kurallar"
   was invisible to the check.
2. **Wrong rendering stage.** Two sites render their footer entirely in JS;
   reading raw HTML found nothing where a real DOM read would have.
3. **Wrong page.** Deposit limits and self-exclusion normally live in account
   settings, not the homepage — checking the homepage for them answers a
   question nobody asked.

`bizbet.mobi` was flagged as having no terms link while its raw HTML contained
"terms", "Terms", "conditions" and "Rules" simultaneously — the check missed
all four. **Do not resurrect this category without fixing all three causes at
once** (multilingual vocabulary, rendered-DOM read, following links to the
actual page) — fixing one and shipping is how the false numbers happened the
first time.

### Dropped on the "would they care" test, not attempted

Security headers (68% missing — true, but casinos do not treat this as urgent
and we would be one more voice saying so) and `alt`-text hygiene (common, but
nobody acts on it from a stranger) are measured and available in the raw
`audit-report.json` output, but excluded from every report by the four-question
filter in §1, not because the measurement is unreliable.

### What the full sweep found (367 readable sites, 3 August 2026)

| | Sites | Share |
| :--- | ---: | ---: |
| Trackers fired, no consent gate | 149 | 41% |
| Over 300 requests on the homepage | 54 | 15% |
| Five or more failed requests | 33 | 9% |
| **At least one reliable, report-worthy finding** | **181** | **49%** |

Half of readable casinos have something worth sending; the other half get a
report that honestly says so (§1, "never pad a report").

## 6. What we do not and cannot check

**Game-provider verification — tested and confirmed impossible from network
traffic, not merely unattempted.** Clicked through game tiles on four live
casinos the way a player does; provider hosts found: zero, on every site.
Operators proxy game content through unbranded CDNs and their own mirror
domains (`spinsamurai.com` served games from `contentdeliverynetwork.cc`,
`caposino.com` from its own `caposino1.com` mirror). This is a ceiling of the
method, not a signature-database gap — the provider's identity is simply not
present in the traffic. Competitors who verify this (Gamecheck, Check2Play) do
it by contacting the providers directly — a commercial relationship, not a
technical one — which is not something this project has.

**RNG fairness / RTP** — requires being the regulator or an accredited lab.

**Anything behind a login** — no accounts, no deposits: no payout testing, no
withdrawal timing, no bonus-term enforcement.

**Roughly a fifth of the market, from any single vantage point.** 95 of 489
sites in the original census refused the homelab outright; residential proxies
recovered only about a quarter of those (see §7). A blocked site is reported as
*unmeasured*, never folded into "no signal."

**A scan is a snapshot.** Every finding carries the date it was observed.
Nothing is presented as a continuing guarantee.

## 7. Standing engineering rules

Rules that were each learned by getting them wrong once. Read before touching
any check in this file.

**Blocked ≠ dead, everywhere — including one request inside a loaded page.** A
site returning 401/403/429/451 was refused, not proven absent. This mistake
happened independently in the seal census (a block counted as "no trust signal,"
inflating the no-signal bucket to 84% before the fix), the Curaçao liveness
check (0 of 20 domains reported live on the first pass — all were geo-blocking
Ukraine, confirmed live from a German proxy), the audit probe, and then a fourth
time at a level nobody had thought to check: **a page can return 200 while its
own API calls are refused**, and those refusals were being counted as the
casino's broken requests (see §5). The fix is the same shape every time: a
separate `blocked`/`unmeasured` bucket, percentages computed only over what was
actually read.

**Prefer a measurement whose error can only point one way, and say which way.**
Before reporting a number, ask whether the method can *overstate* it. Page
weight sums `content-length` headers and counts a response without one as zero,
so it is a floor — "at least 24.8MB" cannot be an overclaim, and an operator who
checks finds more, not less. Broken-request counts under concurrency can come in
low if a page did not settle inside the 6-second wait, again safe. By contrast
"no signup button found" and "no consent banner" are claims of *absence*, which
overstate the moment our detector misses something — and both did, repeatedly.
Findings that can only understate are emailable; findings that can overstate are
rank-only until the overstating path is closed.

Measured, not argued. Re-running the three heaviest sites while summing actual
response bodies instead of headers:

| Site | Reported "at least" | Actual bodies | Responses with no `content-length` |
| :--- | ---: | ---: | ---: |
| `21bets.com` | 24.8 MB | **35.3 MB** | 55 |
| `apuesterapido.com` | 25.0 MB | **42.1 MB** | 152 |
| `10sports.io` | 13.5 MB | **22.4 MB** | 141 |

Real pages are 1.4–1.7× heavier than we report. The hedge is doing its job. The
sweep keeps using `content-length` because reading every body costs time and
memory across 1311 domains, and a floor is the right thing to send anyway.

**Assumptions about the harness are measurements too.** The claim "concurrency 6
distorts our request counts" sounded obviously true and would have justified a
much slower sweep. Tested instead: `fastpari-afro.com` measured 866 requests in
the sweep and 866 alone, `betfal.com` 836 and 833 — within 0.4%. The claim was
false. Test the harness the same way the sites are tested.

**Which host you scan from is part of the result, not noise.** The homelab and
the workstation are refused by different sites; from Ukraine, three sample
Curaçao domains all returned HTTP 451 and were all live from Germany. Any
"X% of the market is Y" claim should say which vantage point produced it.

**A redirect landing somewhere is not the same as landing on the casino.**
Manually tracing 10 CryptoLists affiliate redirects found 6 of 10 resolved to
an affiliate network's own domain — `go.charmaffiliates.com`,
`7starpartners.com`, a shared landing-page host serving a different `/<slug>/`
subpath per campaign. `crawler/cryptolists-scrape.mjs` +
`research/scripts/11-cryptolists-resolve.py` now score confidence: the
resolved domain must resemble the slug being followed (stem containment,
digit/hyphen-normalised) **and** land on the site root, **and** not match a
known affiliate-domain shape (`.partners` TLD, `affiliate`, `go.<subdomain>`,
`landingstool`). A brand-name substring match alone is not sufficient —
`betpanda-io` resolved to `betpanda.partners`, which passes the substring test
but is an affiliate portal.

**Merge accumulating reports; never let a smaller run overwrite a bigger one.**
The first guard against this used a size threshold (runs under 50 sites wrote
to a `.partial.json`), and it failed the first time it mattered — two cloaking
batches of 60 and 70 sites both counted as "full," so the second silently
erased the first. Recovered only because the first was committed. The report
files now merge by key (domain / licence number) rather than replace — a
re-check updates that one entry and leaves the rest alone, at any run size.

**Verify a specific claim before writing it into a report someone will read.**
The `winup.io` report originally said payment icons returned 404. Checking
directly with `curl` before sending showed the truth was worse and different:
the URLs returned `content-type: text/html` and the full homepage instead of an
SVG — a routing bug, not a missing-file 404. A report that said "404" would
have been factually wrong in a way the recipient could check in ten seconds.

**Parked/dead detection needs a `blocked` carve-out or every geo-blocked market
looks empty.** `research/scripts/2-check-live.py` (Anjouan) and
`research/scripts/10-check-curacao-live.py` (Curaçao) share this pattern:
DNS-fail and `PARKED` text match mean genuinely dead; 401/403/429/451 mean
`blocked (not evidence of dead — unmeasured)`.

**A PDF register is still a register.** Curaçao's licence list is a 25-page PDF
(`research/scripts/8-curacao-register.py`), and an earlier pass concluded no
downloadable register existed at all — wrong, just harder to read than a JSON
API. `pypdf` extracts text page-by-page; rows are recovered by splitting on the
licence-number pattern rather than on newlines, because long company names wrap
across lines. The first date-parsing attempt required two well-formed dates per
row and silently dropped 29 of them — the PDF contains typos
(`"May19, 2026"`, `"September 26 ,2025"`) and **revoked licences carry a
sentence where the expiry date belongs.** Revocations are the rows most worth
having (a casino still displaying a revoked licence is a real finding — public
page only, per §1), so the parser reads the row tail loosely and classifies
status (`active` / `assessment in progress` / `revoked` / `suspended`) from
keywords rather than requiring the date fields to be clean.

**Mirror domains inflate a domain count into a false brand count.** Curaçao
certificates and CryptoLists both surface many domains that are the same
operator dodging ISP blocks (`marsbahis` alone spans 484 domains). Both
pipelines collapse to a digit/hyphen-stripped brand stem before counting —
4,177 raw Curaçao domains are 2,187 real brands; the mirror count itself is
kept as a signal (a brand fighting heavy blocking says something about its
market) rather than discarded.

**One master file, not one file per source.** Three prospect pools (Anjouan,
Curaçao, CryptoLists) each grew their own CSV schema built at a different time.
`research/scripts/12-merge-master-outreach-list.py` merges them into
`research/master-outreach-list.csv`, deduplicated by domain — cross-source
duplicates are real, not hypothetical: three different CryptoLists casino
names resolved through the same shared landing-page host, and one Curaçao
operator's domain appeared under two separate licences. A contact-harvest pass
against the newer pools should update this file, not create a fourth.

## 7a. Auditing a single casino — the one command

When a new casino turns up and you want it audited against this document:

```bash
cd crawler && npm run audit -- <domain>
```

`crawler/audit.mjs` runs the checks this methodology considers trustworthy —
licence verification, trust signals, site health, mobile time-to-register — and
routes every finding into one of three buckets, per §1:

- **SEND TO OPERATOR** — passed all four AGENTS.md questions
- **PUBLIC PAGE ONLY** — true but unwelcome, never emailed
- **context** — for our own understanding

It writes `research/audits/<domain>.json` and prints the routed summary. When a
site has nothing worth reporting it says exactly that rather than padding.

**Cloaking and payment-routing are deliberately not part of it.** Both need two
or more proxy regions at three samples each, so they cost real metered traffic
and are a deliberate decision rather than a default. `audit.mjs` prints the
exact commands when a proxy pool is configured.

> **`npm run scan` is deprecated and must not be used to judge a casino.** Its
> core is the game-provider check that §6 records as impossible; it still
> prints clean/suspicious verdicts about game origins, and those verdicts are
> not defensible. It survives only because its licence lookup predates the
> newer tooling.

## 8. Tooling map

| Stage | Tool | Output |
| :--- | :--- | :--- |
| **Audit one casino (start here)** | `crawler/audit.mjs` | `research/audits/<domain>.json` |
| Mobile time-to-register | `crawler/mobile-timing.mjs` | `research/mobile-timing-report.json` |
| Payment routing by region | `crawler/payment-routing-check.mjs` | `research/payment-routing-report.json` |
| Anjouan register pull | `crawler/src/checks/licence.ts` | used live, not persisted separately |
| Curaçao register (PDF) | `research/scripts/8-curacao-register.py` | `research/curacao-register.csv` |
| Curaçao licence → domains | `crawler/curacao-expand.mjs` | `research/curacao-expanded.json` |
| Curaçao → prospect brands | `research/scripts/9-curacao-prospects.py` | `research/curacao-prospects.csv` |
| Curaçao liveness | `research/scripts/10-check-curacao-live.py` | `research/curacao-prospects-live.csv` |
| CryptoLists listing | `crawler/cryptolists-scrape.mjs` | `research/cryptolists-listing.json` |
| CryptoLists redirect resolve | `research/scripts/11-cryptolists-resolve.py` | `research/cryptolists-prospects.csv` |
| Trust-signal / seal census | `crawler/trust-signals.mjs`, `crawler/seal-census.mjs` | `research/seal-census.json` |
| Cloaking check | `crawler/cloaking.mjs` | `research/cloaking-report.json` |
| Site health audit | `crawler/audit-probe.mjs` | `research/audit-report.json` |
| Platform fingerprinting | `research/scripts/6-platform-map.py` | `research/platform-map.csv` |
| Affiliate contact harvest | `crawler/affiliate-contacts.mjs` | `research/affiliate-contacts.json` |
| Proxy pool config | `crawler/proxy-pool.mjs` | reads `PROXY_FILE` / `PROXIES` env |
| Merged outreach list | `research/scripts/12-merge-master-outreach-list.py` | `research/master-outreach-list.csv` |
| Single-casino audit summary | `research/scripts/13-audit-batch-summary.py` | prints, reads `research/audits/*.json` |
| Bulk Phase-A sweep | `crawler/audit-probe.mjs --from=<list> --out=<file>` | `research/audit-sweep-battlefield.json` |
| Outreach priority ranking | `research/scripts/14-priority-list.py` | `research/outreach-priority.csv` + `-verify.md` |

## 8a. Ranking casinos for outreach

Two phases, because they have different constraints.

**Phase A** is everything `audit-probe.mjs` measures. It is parallel-safe —
verified, not assumed (§7) — so it runs over the whole candidate list at
concurrency 6.

```bash
node crawler/audit-probe.mjs --from=research/audit-targets.txt --conc=6 --resume --out=audit-sweep-battlefield.json
```

**Phase B** is `mobile-timing.mjs`. It measures milliseconds, so it must not run
concurrently with anything, and it is only worth spending on candidates that
already rank.

Then rank:

```bash
python research/scripts/14-priority-list.py 40
```

This writes two files on purpose. `outreach-priority.csv` is the full ranked
list. `outreach-priority-verify.md` is the top slice **written to be checked by
hand before anything is sent** — every finding carries the exact failing URL, a
`curl` line that reproduces it, and the dev-tools path to see it in a browser.
A finding that does not reproduce means the tool is wrong and the row comes off
the list.

Two gates the ranking enforces:

- **One domain per operator.** A Curaçao B2C licence covers a whole brand
  roster, so the same company legitimately appears under many domains.
  Contacting ten of its brands separately reads as a mail-merge, which is the
  one thing this outreach cannot look like.
- **A casino reaches the first wave only if it has an *emailable* finding.**
  Consent ranks but cannot be quoted (§5), so a site whose only finding is
  consent would produce an email with nothing in it. `AGENTS.md` is explicit
  that padding destroys the reason for sending a report at all.

## 9. Changelog

- **3 August 2026** — document created, consolidating rules previously scattered
  across script docstrings, `AGENTS.md`, and the dated research files.
- **3 August 2026, later** — first bulk run over 1311 candidate domains. It
  found three defects that 14 hand-picked domains had not: refused requests
  counted as the casino's breakage (§5, 40% of failures in one sample), console
  errors double-counting those same failures, and a consent finding that claimed
  a German vantage point while measuring from a Ukrainian IP. Added §8a and the
  two error-direction rules in §7.
- **4 August 2026** — §1a added: fixed product names for the four checks
  (Revenue Leak Scan, Dead Weight Finder, Time-to-Play Test, Licence Match)
  under the Casino Health Report umbrella with the Verified-at-Send guarantee.
