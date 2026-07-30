# Where to find casinos to pitch — Swift Secure outreach

Compiled 30 July 2026. Goal: land the first 10 paying badge clients.

Read the "Reality check" at the bottom before planning your week. The short
version: this is a numbers game with a low reply rate, so the constraint is how
many *qualified, personalised* first touches you can send per day — not how
clever the pitch is.

---

## Start here — first five actions

Do these in order. They are ranked by yield per hour, not by how interesting
they are.

| # | Action | Why first | Time |
|---|---|---|---|
| 1 | Pull the **Curaçao GCB public register** and filter for licences issued in the last 9 months | Newly licensed = pre-launch or just-launched = nobody has pitched them yet. This is the only source that is exhaustive rather than editorial. | 2h |
| 2 | Scrape **CryptoLists / newcasinos.com new-launch trackers** weekly | Day-level launch dates and bare domains. Already proved usable — the 23 casinos now in the directory came mostly from here. | 1h setup |
| 3 | Find the **affiliate manager, not the CEO** — check each casino's `/affiliates` or `/partners` page, then their programme listing on AffPapa | Affiliate managers own link/badge deals and reply. Founders do not. | ongoing |
| 4 | Join **AffPapa + SiGMA Telegram/LinkedIn groups** and lurk for launch announcements | New brands announce themselves here before review sites index them. | 1h |
| 5 | Run **publicwww / BuiltWith** searches for platform script signatures | Finds every site running SoftSwiss/Slotegrator — including ones no review site has listed. This is the highest-leverage technical trick on this list. | 3h |

---

## 1. Licence registries — the exhaustive source

Best signal-to-noise for *brand new* operators, because a licence is issued
before the site has any reviews, backlinks or search presence.

| Registry | URL | What you get | Scrapeable |
|---|---|---|---|
| Curaçao GCB | `gaminglicences.curacao-gaming.cw` | Licensee name, licence no., status, domains | Yes — HTML table |
| Malta (MGA) | `mga.org.mt/support/online-gaming-licence-register/` | Company, licence class, URLs, status | Yes, paginated |
| Anjouan (ALSI) | `anjouangaming.org` licence lookup | Licence no. verification, operator name | Partly — lookup by number |
| Kahnawake (KGC) | `gamingcommission.ca/licensees` | Permit holder, brands | Yes |
| Tobique (TGC) | `tobiquegaming.com` | Licensee list | Small list, manual |
| Isle of Man | `gamblingsupervision.im` licence register | Licensee, brands | Yes |

**How to use it:** Curaçao's new GCB regime means a lot of operators re-licensed
or newly licensed in 2024–2026. Sort by issue date, take anything in the last 9
months, resolve the domain, check the site is live. That is your pipeline.

**Caveat:** registry domains change and some registers are JS-rendered. Verify
each URL before building a scraper against it — treat the table above as a
starting point, not gospel.

---

## 2. New-casino trackers

Editorial, so less complete than registries, but they give launch dates and
often the platform.

| Source | URL | Notes |
|---|---|---|
| CryptoLists new casinos | `cryptolists.com` | Day-level launch dates. Crypto-first brands. **Worked well — this fed most of the current directory.** |
| newcasinos.com | `newcasinos.com` | Large volume, monthly grouping |
| AskGamblers new casinos | `askgamblers.com/new-online-casinos` | Rich data (owner, established, licence) but **403s automated fetching** |
| Casino.guru new casinos | `casino.guru/new-online-casinos` | Best data quality on the market. **403s automated fetching** |
| LCB new casinos | `latestcasinobonuses.com` | Also carries a warnings/blacklist worth cross-checking |
| Casinomeister | `casinomeister.com` | Smaller, but strong on operator-group links |
| TheProgressiveGambler (POGG) | `thepogg.com` | Good on disputes and group ownership |

**Important operational note:** Casino.guru and AskGamblers both return HTTP 403
to scripted requests. That blocked the research for this directory and is why
`jurisdiction` is "Not published" on 12 of 23 entries. To unblock, drive a real
browser (Playwright with a normal user-agent and a residential proxy) rather
than a plain HTTP fetch — you need Playwright for the verification crawler
anyway, so build that first and reuse it.

---

## 3. Platform-provider signatures — the leverage play

A white-label platform launches dozens of casinos. Two uses:

**(a) Find every site on a platform.** Search page source across the web for
provider-specific script paths and domains:

- `publicwww.com` — search HTML source at scale (paid, ~$50/mo for useful tiers)
- `builtwith.com` — technology lookup + lists by technology (paid)
- `wappalyzer.com` — per-site lookup, has an API

Signatures worth searching: SoftSwiss game-launch domains, `slotegrator`,
`everymatrix`, `hub88`, aggregator CDN hostnames. One good query returns a list
no review site has.

**(b) Partner with the platform itself.** One deal = access to their whole
client base. This is your 3.4 partnership leg and the real path past 10 clients.

| Platform | Approach |
|---|---|
| SoftSwiss | Largest white-label base. BD team via their site + SiGMA presence |
| Slotegrator | Turnkey packages aimed at exactly your target (small new operators) |
| EveryMatrix | Bigger clients, longer cycle |
| BetConstruct / Digitain | Strong in CIS/Turkey — matches your language coverage |
| White Hat Gaming | Established brands, harder |

Pitch to them is not "buy a badge" — it is *"add our verification to your launch
package, take 20–30% recurring."* Zero cost to them, new revenue line, and it
makes their turnkey product more saleable.

---

## 4. Affiliate networks and programme directories

Affiliate managers are the right contact: they already do link-exchange deals,
they have budget authority for small recurring spend, and they answer messages.

| Resource | URL | What you get |
|---|---|---|
| AffPapa | `affpapa.com` | iGaming affiliate directory + operator index. Strong LATAM/EU coverage |
| GPWA | `gpwa.org` | Long-running affiliate forum. Operator reps post directly |
| AffiliateFix | `affiliatefix.com` | Broader affiliate forum, iGaming section |
| Affilka (SoftSwiss) | `affilka.com` | Programmes running on SoftSwiss — maps to platform targeting above |
| Income Access (Paysafe) | `incomeaccess.com` | Established programmes |
| PartnerMatrix | `partnermatrix.com` | BetConstruct-adjacent programmes |
| AffiliateGuardDog | `affiliateguarddog.com` | Programme reputation — useful for *screening out* bad operators |

**Tactic:** most casinos publish `/affiliates` or `/partners`. That page almost
always has a named manager and a direct email. Go there before hunting on
LinkedIn.

---

## 5. Communities where operators actually talk

- **Telegram** is where iGaming BD happens. Search for affiliate and operator
  groups tied to SiGMA, AffPapa and the big affiliate conferences. Lurk first,
  post value second, pitch third.
- **GPWA forum** — post genuine analysis of a fake-games detection. Expert
  status converts to inbound.
- **LinkedIn** — the reliable one. Search titles: `Head of Affiliates`,
  `Affiliate Manager`, `Head of Brand`, `Casino Manager`, `Head of Compliance`,
  filtered to companies in Gaming/Gambling. Connection request + short note
  beats cold email for reply rate.
- **Apollo / Lusha / RocketReach** for email enrichment once you have names.

---

## 6. Conferences — tickets and meetings only, no stand

Per your own strategy: go for the meeting list, not the booth.

| Event | Typical timing | Why |
|---|---|---|
| SiGMA Europe (Malta) | November | Densest concentration of new operators + platforms |
| SBC Summit | September (Lisbon) | Operator/BD heavy |
| iGB Live (Amsterdam) | July | Affiliate + operator mix |
| Affiliate World Dubai | Q1 | Affiliate-side, good for the CPA leg |
| ICE | Q1 | Large, more vendor-focused |

Book meetings **three weeks ahead** via LinkedIn. A conference with 15 booked
meetings is worth it; walking the floor is not.

---

## What to say

The hook is your own strategy's best idea: **lead with something you already
did for them.** Never open with "buy our badge."

### Email — cold, to an affiliate manager

> **Subject:** {Casino} — trust page we built for you
>
> Hi {Name},
>
> We run Swift Secure, a verification service for new casinos. We index new
> launches and build a public page for each one — here's {Casino}'s:
> {link to /casinos/{slug}/}
>
> Right now it just shows public info: your licence, launch date, domain. If you
> want, we'll run the full check for free — games loading from real providers,
> licence matched against the register, test withdrawal — and if it passes you
> can display the badge and the page becomes a verified record.
>
> Players search "{Casino} legit" and "{Casino} withdrawal" before depositing.
> Right now they find nothing. We'd rather they found something accurate.
>
> Worth 15 minutes?
>
> {Your name}

### Telegram / LinkedIn — short form

> Hi {Name} — we index new casino launches and built a public page for
> {Casino}: {link}. Happy to run our full verification free and let you use the
> badge if it passes. Players google "{Casino} legit" before depositing and
> currently find nothing — this fixes that. Interested?

### Follow-up (5–7 days later, once only)

> Hi {Name} — following up on the {Casino} verification page: {link}. If it's
> not a fit, no problem, just let me know and I'll stop. If the timing is wrong
> but the idea isn't, tell me when to come back.

**Why this works:** the page exists before you make contact, so you are not
asking for something — you are showing something. It also creates mild urgency
because the page is public whether or not they engage.

**Do not** claim you have verified them when you have not. Every page currently
says "Listed — no check has been run." Keep it that way until the crawler runs.

---

## Reality check

Numbers to plan against, from general B2B cold-outreach benchmarks — treat as
order-of-magnitude, not gospel, and measure your own from week one:

- **Cold email reply rate:** low single-digit percent is normal. Personalised
  with a real artefact attached does better, but assume ~5%.
- **To land 10 clients** at a 5% reply rate and maybe 1-in-4 replies becoming a
  paying customer, you need roughly **800 quality first touches**. At 40/day
  that is a month of consistent sending.
- **Decision maker:** affiliate manager or head of brand. At small new operators
  it is often the founder, who is also the most likely to reply.
- **Sales cycle:** short for €200/mo — days to a couple of weeks. It is a small
  enough number that it does not need committee approval, which is a real
  advantage of the Basic tier price point.
- **Biggest objection you will hit:** "why should anyone trust *your* badge?"
  Your answer is the methodology page — specifically the section listing what
  you do *not* check. That candour is the differentiator; lead with it.

### Sequencing advice

Do not try all channels at once. Weeks 1–2: registries + trackers + direct
affiliate-page email, and measure. Only add LinkedIn and Telegram once you know
your email reply rate. Only approach platforms (the 20–30% recurring deal) once
you have 2–3 live clients to point at — that conversation goes much better with
proof than with a pitch.

---

## Honest gaps in this document

- URLs were compiled from working knowledge and partial verification. **Check
  each one before building tooling against it** — registry URLs in particular
  change.
- Reply-rate figures are general B2B benchmarks, not iGaming-specific measured
  data. Instrument your own sending from day one.
- The research pass that produced the directory was cut short by a search
  budget limit, so `jurisdiction` is missing on 12 of 23 entries and no licence
  number is independently confirmed against a regulator register. Fill those
  from the registries in section 1 before using any of it commercially.
