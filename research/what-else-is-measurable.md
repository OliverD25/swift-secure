# What else a casino's own page gives up

> **Read the full-sweep section at the bottom first.** This first half is the
> original 14-site sample, kept for the record. The sweep over 374 sites
> **overturned section 2 entirely** — the responsible-gambling and legal-page
> figures here are measurement artefacts, not findings, and must not be quoted.
> Sections 1, 3 and 4 held up.

Measured 3 August 2026 on 14 live casinos, loaded from a German browser context
with nothing clicked. The question behind this: what could make Swift Secure a
report an operator wants, rather than a request to display a free badge?

Ranked by how often a real finding appears and how much the operator is likely
to care.

## 1. Trackers firing before any consent — 8 of 13 readable sites

The most common finding by a distance, and the only one with regulatory teeth.

| | Sites |
| :--- | ---: |
| No consent gate found at all | 11 of 13 |
| At least one tracker fired anyway | **8 of 13** |
| Worst case | fatbets.com — **14 trackers**, including doubleclick |

Nothing was clicked during these loads, so every request happened before the
visitor agreed to anything. Hosts seen: Google Tag Manager, Google Analytics,
Microsoft Clarity, Contentsquare, Yandex Metrica, DoubleClick.

**State the measurement, never the legal conclusion.** "Fourteen tracking hosts
received a request before any consent interaction, measured from Germany on 3
August" is a fact we can defend. "You are violating GDPR" is a legal opinion we
are not qualified to give, and Google Consent Mode can send cookieless pings
that are not violations at all. The operator's lawyer can decide; our job is to
show them something they probably did not know.

Why operators plausibly do not know: marketing adds a tag manager, nobody
re-checks what fires before the banner, and the banner is often missing entirely
on sites built for non-EU markets that later took EU traffic.

## 2. Responsible-gambling markers missing — 3 of 13 show none  [WITHDRAWN]

Checked for age notice, self-exclusion, deposit limits, and a help organisation.

- 3 sites (betibet, wgcasino, caposino) show **none of the four**
- Most show one or two
- Very few show all four

**Withdrawn.** The full sweep showed this was measuring English-and-German text
on the homepage, which is the wrong place and the wrong vocabulary. See "What
had to be thrown away" below.

## 3. Page weight — the spread is enormous

| Site | Requests | Declared transfer |
| :--- | ---: | ---: |
| betfal.com | **831** | 7.1 MB |
| gamwiz.com | 300 | 6.8 MB |
| caposino.com | 276 | 0.9 MB |
| fatbets.com | 280 | 4.4 MB |
| ganamega.net | 76 | 0.5 MB |
| betibet.com | 22 | 1.6 MB |

831 requests for a homepage is not a stylistic disagreement. On mobile, in a
market where players arrive from ads, that is money. This needs no market
knowledge to argue and no legal framing.

## 4. Things that are simply broken — rare, but the best finding when present

Only 3 of 14 had any failed request. But one of them was worth the whole sweep:

**fatbets.com returns HTTP 404 for three game modules** —
`/_proxied/games/blackjack/remoteEntry.js`, and the same for `plinko` and
`mines`. Verified independently with curl, not just in the browser. Three games
do not load.

That is a revenue leak the operator may genuinely be unaware of, it is specific,
and it is fixable. It is also the single best reason to write to someone.

Prevalence is low, so this cannot be the product — but every sweep that finds
one produces an unignorable first contact.

## 5. Weak signals, recorded so nobody re-investigates them

- **SEO hygiene** — most sites already have canonical tags, sane titles and meta
  descriptions. Images missing `alt` are common (7–25 per page) but no operator
  will act on that from a stranger.
- **Security headers** — usually absent, but casinos do not treat this as urgent
  and we would be one more voice saying so.
- **Mixed content** — zero cases across 14 sites. Dead end.

## What this means for the product

**The report is the product. The badge is the receipt.**

The offer stops being "display our badge" and becomes "here is a free technical
audit of your casino; if you want to show the result publicly, the badge links
to a dated page that says what was and was not checked."

That inversion matters because a free audit is easy to accept and costs the
recipient nothing to read, whereas a badge request asks for something before
giving anything.

Three of the four sections above are measurable on almost any site, need no
market knowledge to defend, and are things an operator plausibly does not know.
That is a materially different conversation from asking for a link.

**Honest limits.** Prevalence is from 14 sites, which is enough to see a pattern
and not enough to quote a percentage at anyone. The tracker finding needs
careful wording to stay a measurement rather than a legal claim. And a report
full of findings nobody acts on is worse than no report — the ranking above
exists so the weak sections get dropped rather than padded.

Reproduce: `node crawler/audit-probe.mjs <domain> [more...]`

---

# Full sweep: 374 sites, 3 August 2026

Ran across every site the census could read. **367 readable.** The fourteen-site
sample above pointed the right way on some signals and badly wrong on others.

## What survives — measured from the network, not from text

These read HTTP status codes, request logs and response headers. They do not
depend on what language the site is in or whether its footer renders in JS.

| Finding | Sites | Share |
| :--- | ---: | ---: |
| **Trackers fired with no consent gate** | **149** | **41%** |
| Any failed request on the homepage | 105 | 29% |
| Over 300 requests to load one page | 54 | 15% |
| Five or more failed requests | 33 | 9% |
| No HSTS header | 250 | 68% |
| **At least one of the above** | **181** | **49%** |

Median trackers where present: 3. Worst: 15. Page weight median 167 requests
and 3.5 MB; the heaviest site loads 807 requests and 67 MB.

**Half of all readable casinos have at least one defensible finding.** That is
the number the product rests on.

### The worst breakage found

| Site | Failed requests | Sample |
| :--- | ---: | :--- |
| tomcasino.net | 100 | `404 /_next/image` |
| cosmoracasinos.com | 46 | missing fonts, 403 on assets |
| funbet888.me / funbet.me / robobet.com | 39 each | `403 /gstatic/wlc/icons/.../crashgame.svg` |
| winup.io | 38 | `404 /paysystems/.../aninda2_banka.svg` |
| bettogames.com | 32 | `404 /paysystems/.../help2pay_online_banking.svg` |
| slotin.com | 26 | `403 /platform-telegram-bot__api/...` |

The three funbet/robobet sites fail identically, so that is one platform bug
affecting an operator group rather than three separate problems — which is
useful, because it is one conversation.

Payment-icon 404s on winup and bettogames mean the deposit page renders with
missing method logos. Small, visible, and directly in the path to a deposit.

## What had to be thrown away, and why

The first sample suggested large compliance gaps: 97% missing deposit limits,
88% missing self-exclusion, 44% with no terms link. **Those numbers are wrong,
and they are wrong because of how they were measured.**

Spot-checking sites reported as having no terms link:

- `bizbet.mobi` — the raw HTML contains "terms", "Terms", "conditions" and
  "Rules". The check missed all of them.
- `fixbet.com` — Turkish "Kurallar". The pattern only covered English and German.
- `matadorbet.com`, `zbahis.com` — footer rendered entirely in JavaScript.

Three failure modes at once: link-only matching, English-and-German-only
vocabulary, and no allowance for JS footers. The responsible-gambling markers
share all three, plus a fourth — deposit limits and self-exclusion normally live
in account settings, not the homepage, so checking the homepage for them asks
the wrong question entirely.

**Every text-matched signal is discarded**: terms, privacy, AML and bonus links,
age notice, self-exclusion, deposit limits, help organisations.

This is the same mistake as the seal census and the cloaking run, in a third
costume: a plausible number produced by a method that was never checked against
reality. The distinction that holds is simple — **what the protocol tells us is
reliable, what we infer from page text is not**, and multilingual sites make the
second one much worse than it looks.

## What this means

The offer becomes a free technical report with three defensible sections —
consent handling, breakage, page weight — and a badge as its receipt. Half of
all prospects get at least one real finding, which is enough for the report to
be worth sending rather than padded.

Adding compliance checks would roughly double the findings, but only with real
work: multilingual vocabulary, rendered-DOM inspection, and following links to
the pages where these things actually live. Worth doing, not worth claiming yet.
