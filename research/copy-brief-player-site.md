# Brief: player-facing copy for swiftsecured.com

Written 7 August 2026. Self-contained on purpose — it can be pasted into any
model or handed to a copywriter without the rest of this repository.

---

## 1. The product

Swift Secured is an independent verification service for online casinos. It
issues a badge that a casino displays, linking to a dated public record on our
site stating exactly what was checked and when.

Two audiences, and they must never be given the same copy:

| Audience | Where | What they want |
| :--- | :--- | :--- |
| **Players** | The public website | To not get robbed |
| **Casino operators** | Cold outreach, free technical reports | A reason to talk to us |

**This brief covers the player-facing website only.** Nothing about how we
approach operators, what we charge, or the free technical audit belongs in it.

## 2. The job of this copy

Make a player, in the seconds before depositing, understand that:

1. Things they assume are verified are not verified.
2. Those things are checkable.
3. We check them and publish the result with a date.

Fear is the correct register. Players are afraid of two things: **rigged or
substituted games**, and **not being paid**. The copy should reach that fear
directly.

## 3. Hard constraints — read before writing a word

This is a **verification service**. The entire product is being believed. A
single claim that does not survive scrutiny destroys more value than any
headline creates. There is also legal exposure: misleading commercial practices
rules in the EU and UK apply to consumer-facing claims, and this copy targets
consumers deciding where to put money.

### Things that are TRUE and may be claimed

- We scanned **1,311** casino sites and recorded what we found.
- Of **130** sites tested from two countries, **7** show a gambling licence to a
  visitor in one country and hide it from a visitor in another. Confirmed, with
  domains: jokertipp.com, greatslots.com, betphoenix.ag, mondcasino.com,
  casinostars.io, maltcasino.com, pinbahis.com.
- Of **1,222** readable sites, **193** have requests that fail on page load,
  often payment-method icons on deposit pages.
- We look a casino's published licence number up in the register of the
  regulator that issued it, and publish the answer with the date it was read.
- A game's provider logo is an image on a page. It proves nothing and costs
  nothing to display.
- Where a game is actually served from is visible from outside and cannot be
  faked.

### Things that are FALSE and must NOT be claimed

- ❌ **"We check whether casinos substitute fake games."** We have never once
  done this. The tool exists but has never completed a single check. We tested
  45 casinos: **0** let a visitor open a game without an account.
- ❌ **"We test whether games are fair."** Impossible from outside. Needs an
  accredited laboratory and millions of recorded spins.
- ❌ **"We check payouts / withdrawals / whether a casino pays."** We have no
  capability whatsoever. There is no path to it from outside.
- ❌ Any count, percentage or claim not listed in the TRUE section above.

### The distinction that makes this workable

Describing a **risk** is not the same as claiming a **finding**.

> "The provider's logo on a game tile is an image. It costs nothing to display."

True, publishable today, and frightening. It claims nothing about us.

> "We check whether the games are real."

False today. Do not write it.

Copy may describe how substitution works, why it matters, and what a player
cannot see. It may not say we have detected it.

### Non-payment, handled honestly

We cannot check payouts. But a licence is the name of the body that can force a
casino to pay — so licence evidence reaches the payment fear legitimately:

> "A licence is not decoration. It is the name of the body that can make them
> pay you. Seven of the sites we tested show that name to one country and hide
> it from another."

Never imply we test withdrawals. An explicit "we do not test withdrawals,
nobody outside a casino can" line is a feature, not a weakness.

## 4. Voice

**Confident and institutional.** This is an audit firm describing its work, not
a sceptic listing caveats. Formal, technical, unhedged.

- **Short sentences.** One idea each.
- **Concrete over abstract.** "Seven sites" beats "many operators".
- **Technical vocabulary is wanted** — audit, register, routing, verification,
  documented, jurisdiction. It signals competence and it is what this reader
  expects from an auditor.
- **No hedging and no apologising.** Do not open on what we cannot do.
- **Never say a casino is safe.** The site has never said it and must not start.
- Cold and factual outperforms excited. The subject is frightening on its own.

### Where the limitations go

Earlier versions of this site led with what we do **not** check, on the front
page. That has changed. **Limitations belong on `/methodology/`, not on the home
page.** The home page states what the audit covers. A reader who wants the
boundaries follows a link and finds them in full.

This is a change of emphasis, not of substance. Nothing is deleted or denied,
and the methodology page stays exactly as blunt as it has always been.

### Register: one rejected, one accepted

Both are formal and technical. Only one can be defended.

**Rejected:**

> Our service performs a comprehensive technical audit of online casinos,
> validating the originality of the game code and the absence of third-party
> manipulation of the software. We verify the routing of game sessions and the
> conformity of presented content to providers' registration standards,
> guaranteeing that the real state of the gaming environment is recorded.

Register is right. Every substantive claim is false: we have never inspected
game code, cannot detect software manipulation, have never completed a session-
routing check, and have no relationship with any provider or access to their
standards. "Guaranteeing" makes it worse.

**Accepted:**

> Our service performs a comprehensive technical audit of online casinos. We
> match the licence number against the register of the regulator that issued it,
> record the technical condition of payment and game pages, and document
> discrepancies in how licence information is presented across jurisdictions.
> Every result is published with the date the check was carried out.

Identical tone and authority. Every clause traces to a file: regulator
registers, 193 sites with failing requests, 7 of 130 with a licence that changes
by country.

### What has NOT changed

Section 3 still governs. Confidence is about how a true claim is delivered, not
about which claims may be made. A confident sentence about a check we have never
run is still a false sentence — and that is the one thing that can end this
business rather than merely embarrass it.

## 5. What to produce — in three languages

Deliver every slot below in **English, Russian and Ukrainian**. Plain text per
slot, per language.

**Write each language natively. Do not translate the English literally.** Fear
does not survive word-for-word translation: a line that lands hard in English
turns polite in Russian and stilted in Ukrainian. The *facts* must be identical
across all three — same numbers, same seven domains, same claims, same things
refused. Only the phrasing changes.

| Slot | Guidance |
| :--- | :--- |
| `h1` | Under 60 characters. Current: "Before you deposit, find out who can shut the casino down." |
| `sub` | 2–3 sentences. What we check, that it is dated, that we never call a casino safe. |
| `description` | Meta description, under 160 characters. |
| Section: the licence check | Heading + 2–3 short paragraphs. Use the 7-of-130 finding. |
| Section: what a logo is worth | Heading + 2–3 short paragraphs. Risk framing only — no claim we check it. |
| Section: what the audit covers | Heading + 2–3 short paragraphs. Stated as scope, in the register of section 4. |
| CTA | Button label plus one supporting sentence. |

## 6. How the three languages reach the site

Three written by hand, seventeen by fallback.

| Language | Where it goes | State today |
| :--- | :--- | :--- |
| **English** | `src/i18n/locales/en.ts` — the source every other language falls back to | Exists. Must stay complete. |
| **Russian** | `src/i18n/locales/ru.ts` — overrides English key by key | Exists, but overrides almost nothing: only `home.title`, `home.howEyebrow`, `methodology.eyebrow`. **Everything else a Russian visitor reads today is English.** |
| **Ukrainian** | Does not exist | Must be created in three places: a row in `src/data/languages.ts`, a new `src/i18n/locales/uk.ts`, and `'uk'` added to the `locales` array in `astro.config.mjs`. |

**The other 17 languages** — ar, da, de, es, fr, fr-ca, hi, it, ja, ko, nl, pl,
pt, pt-br, sv, tr, zh — take English automatically, key by key. So the English
version still has to be translation-safe:

- **No idioms, no wordplay, no puns.** They do not survive translation.
- **No culture-specific references.**
- Arabic is right-to-left; avoid copy whose meaning depends on visual order.
- Keep sentences short enough to survive 30% expansion in German.

Russian and Ukrainian are exempt from that constraint, because they are written
by hand rather than derived. They can hit harder than the English.

## 7. Rejected already

- *"Логотип провайдера на плитці гри — це просто картинка..."* — accurate but
  flat. Explains a mechanism instead of landing a blow, and ends by admitting no
  casino carries the badge, which kills the momentum.
- Anything opening on withdrawal was judged too risky: it puts payment front and
  centre while we cannot check payment, and readers hear a promise regardless of
  the disclaimer.
- The "originality of the game code / absence of third-party manipulation /
  providers' registration standards" paragraph — see section 4. The register was
  right and has been adopted. The claims were not, and were replaced.

## 8. Acceptance criteria

1. Every factual claim traces to section 3's TRUE list.
2. Nothing implies we check games, fairness or payouts.
3. A hostile reader — a competitor, a regulator, a journalist — cannot find a
   sentence we could not defend with a file.
4. It is frightening.
5. It reads like an audit firm, not a warning label. No caveat opens a section
   on the home page.

Criteria 4 and 5 without criteria 1–3 are worthless. So are 1–3 without 4 and 5.
