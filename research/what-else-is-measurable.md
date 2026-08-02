# What else a casino's own page gives up

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

## 2. Responsible-gambling markers missing — 3 of 13 show none

Checked for age notice, self-exclusion, deposit limits, and a help organisation.

- 3 sites (betibet, wgcasino, caposino) show **none of the four**
- Most show one or two
- Very few show all four

Most licences require these. A missing self-exclusion route is a licence
condition problem, not a style choice — and unlike the tracker finding, this one
is unambiguous.

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
