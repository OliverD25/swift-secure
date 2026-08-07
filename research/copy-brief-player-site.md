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

- **Short sentences.** One idea each.
- **Concrete over abstract.** "Seven sites" beats "many operators".
- **No hedging, no marketing adjectives.** No "leading", "trusted", "premium".
- **Never say a casino is safe.** The site has never said it and must not start.
- **Candour is the differentiator.** Publishing what we do *not* check is the
  main answer to "why should I trust your badge?" It should be prominent, not
  buried.
- Cold and factual outperforms excited. The subject is frightening on its own.

## 5. What to produce

English is the source language. Deliver plain text per slot.

| Slot | Guidance |
| :--- | :--- |
| `h1` | Under 60 characters. Current: "Before you deposit, find out who can shut the casino down." |
| `sub` | 2–3 sentences. What we check, that it is dated, that we never call a casino safe. |
| `description` | Meta description, under 160 characters. |
| Section: the licence check | Heading + 2–3 short paragraphs. Use the 7-of-130 finding. |
| Section: what a logo is worth | Heading + 2–3 short paragraphs. Risk framing only — no claim we check it. |
| Section: what we do not check | Heading + 2–3 short paragraphs. Games, fairness, withdrawals. |
| CTA | Button label plus one supporting sentence. |

## 6. Translation constraint

The English copy is machine-fed into 18 other languages: ar, da, de, es, fr,
fr-ca, hi, it, ja, ko, nl, pl, pt, pt-br, ru, sv, tr, zh.

- **No idioms, no wordplay, no puns.** They do not survive translation.
- **No culture-specific references.**
- Arabic is right-to-left; avoid copy whose meaning depends on visual order.
- Keep sentences short enough to survive 30% expansion in German.

## 7. Rejected already

- *"Логотип провайдера на плитці гри — це просто картинка..."* — accurate but
  flat. Explains a mechanism instead of landing a blow, and ends by admitting no
  casino carries the badge, which kills the momentum.
- Anything opening on withdrawal was judged too risky: it puts payment front and
  centre while we cannot check payment, and readers hear a promise regardless of
  the disclaimer.

## 8. Acceptance criteria

1. Every factual claim traces to section 3's TRUE list.
2. Nothing implies we check games, fairness or payouts.
3. A hostile reader — a competitor, a regulator, a journalist — cannot find a
   sentence we could not defend with a file.
4. It is frightening.

Criterion 4 without criteria 1–3 is worthless. So is 1–3 without 4.
