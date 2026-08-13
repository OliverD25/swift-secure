---
name: site-copy
description: Change, add or translate any text shown on the Swift Secured website — headings, button labels, nav items, FAQ entries, page titles, meta descriptions. Use whenever the user asks to reword something, fix a typo on a page, rename a menu item, add a section of copy, add or update a language, or asks where a string on the site comes from. Also use before editing any .astro file that appears to contain a sentence, because visible text never belongs there. Not for the operator reports in research/reports/ — those are generated, follow different editorial rules, and are covered by AGENTS.md.
---

# Site copy — where the words live

**No visible text is written in a page.** Every string on the site comes from
one file per language under `src/i18n/locales/`.

```
src/i18n/
  types.ts            the Translation contract
  index.ts            loader + per-key English fallback
  locales/
    en.ts             source of truth, ~450 lines
    de.ts ru.ts ...    18 more
```

`en.ts` has 16 sections: `nav`, `footer`, `stickyCta`, `seal`, `common`,
`home`, `process`, `pricing`, `methodology`, `directory`, `casinos`, `verify`,
`apply`, `about`, `faqPage`, `badge`.

Pages hold structure only:

```astro
const t = useTranslations(locale);
<h1 class="text-h2 mb-4">{t.about.h1}</h1>
```

## Finding the key behind a string

Given text the user can see on the page, search English first:

```bash
grep -rn "the visible text" src/i18n/locales/en.ts
```

If that misses, the string may be interpolated or split. Then search the page:

```bash
grep -rn "text" "src/pages/[...locale]/"  src/components/ src/layouts/
```

A hit inside an `.astro` file that is a real sentence is a **bug** — move it into
`en.ts` and reference it as `t.section.key`.

## Changing copy

1. Edit the key in `en.ts`
2. Optionally edit the same key in other locales
3. `npm run build`

**Editing `en.ts` alone is a complete, safe change.** It reaches all 19
languages at once.

## English is the floor

`index.ts` merges each locale over English **per key, at every depth**. A
translated string wins; an untranslated one renders in English; nothing ever
renders blank.

This is why new copy does not need 19 files. Before the fallback existed, a key
present only in `en.ts` rendered as an empty heading, so copy either did not
ship or shipped as 18 machine translations nobody had read.

**Do not remove a key from `en.ts` while other locales still reference it**, and
do not add a key to a locale that is absent from `en.ts` — English defines the
shape.

## The typing contract

| File | Type | Meaning |
| :--- | :--- | :--- |
| `en.ts` | `Translation` | Must be complete. TypeScript rejects a gap. |
| the other 18 | `PartialTranslation` | May omit any key. |

Run `npx astro check` after touching `types.ts` or adding a section.

## Trap: arrays are taken whole

Arrays are **not** merged item by item. A locale that translates three of four
pricing plans renders *its three*, not three translated plus one in English.

That is deliberate: merging by index would resurrect entries a translator
dropped on purpose. So when adding an item to an array in `en.ts`, any locale
that already overrides that array needs the item added too, or that language
silently loses it.

## Two editorial rules, both broken before

From the header comment in `en.ts`:

1. **The site addresses operators first and players as well** (decided
   13 August 2026; it used to say players only). The header leads with "For
   casinos" for that reason. This is about who the copy is aimed at — it does
   **not** move the free technical report onto the site. That report is how a
   sales conversation opens and must still appear nowhere in public copy.
2. **Every number is counted from a file in this repository.** Nothing is
   estimated, rounded up, or carried from a previous draft. If copy states a
   figure, verify it against the data before changing or repeating it.

Public site = operators and players, same pages. `research/reports/` = the
private report for one operator. Different documents, different rules — see
AGENTS.md for the report rules.

## Copy is not a changelog of the tooling

Rule 2 is about **numbers**. It is not a licence to audit the rest of the copy
against `crawler/` and quietly narrow whatever no tool automates yet.

What the site says the service does, and what a script currently runs, are two
layers on purpose — see *Two layers* in AGENTS.md. A check that a person carries
out by hand is still a check the service performs, and the copy may say so.

So: when you are told to write a claim, write that claim. Raise a concern in one
sentence if you have one, then write it as instructed. Rewriting the task into
the more cautious version is the single failure this section exists to stop, and
it has cost real time more than once.

## Adding a language

Three places, all required:

1. `src/data/languages.ts` — a row with `locale`, `htmlLang`, `code`, `name`
   (endonym, in its own script), `iso` (flagcdn country code), `dir`
2. `src/i18n/locales/<code>.ts` — `const xx: PartialTranslation = { ... }`
3. `astro.config.mjs` — add the code to the `locales` array (~line 51)

`dir: "rtl"` is supported; `ar` is the current example. English is served at the
root with no prefix; every other locale gets `/<code>/`.

## What is not copy

`src/data/` holds data, not text:

- `casinos.ts` — directory listing (names, licences, scan dates)
- `languages.ts` — the locale table

## Verifying

```bash
npm run build && npx astro check
```

The build emits 4,428 pages and takes ~2 minutes. To confirm a visual change,
render it — this server is headless:

```bash
node scripts/shot.mjs http://127.0.0.1:4321/ .screenshots/check.png
```

Then read the PNG. Do not claim a copy change looks right without looking.
