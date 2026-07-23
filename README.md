# Swift Secure

Marketing + utility site for the Swift Secure casino trust-seal certification service. Built with **Astro** (static output) and **Tailwind CSS v4**.

## Stack

- **Astro** — static site generation, zero client JS by default
- **Tailwind CSS v4** — CSS-first theme config (`src/styles/global.css`), oklch design tokens
- **@fontsource-variable/inter** — self-hosted variable Inter font (no external Google Fonts request)
- **@astrojs/sitemap** — auto-generated sitemap for SEO

## Project structure

```text
src/
  components/       Header, Footer, LanguageSwitcher, Seal, CasinoCard, PlanCard, ...
  data/             casinos.ts, languages.ts — locale table incl. RTL flags
  i18n/
    types.ts        the Translation contract every locale must satisfy
    index.ts        useTranslations(), localePath(), localeStaticPaths()
    locales/        en.ts is the source of truth; 18 siblings mirror it
  layouts/          Layout.astro — SEO meta, hreflang, header/footer shell
  lib/url.ts        withBase() — prefixes internal links for GitHub Pages
  pages/[...locale]/  one file per route; the rest param is empty for English
  styles/           global.css — Tailwind + design tokens
```

**Copy lives in `src/i18n/locales/`, not in the pages.** All 19 files satisfy the same
`Translation` interface, so a missing key is a type error rather than `undefined`
rendered into a page nobody on the team can proofread.

**Routing**: English is served at the root and every other locale takes a `/<code>/`
prefix — hence `[...locale]` (rest, can be empty) rather than `[locale]`. Adding a
language means adding a row to `src/data/languages.ts`, a file in `locales/`, and an
entry in the `astro.config.mjs` locales array.

Interactive bits (language switcher, FAQ accordion, casino search, verify lookup, apply
form) are plain vanilla `<script>` tags scoped per component/page — no JS framework.

## Commands

| Command             | Action                                      |
| :------------------- | :------------------------------------------- |
| `npm install`         | Install dependencies                         |
| `npm run dev`          | Start local dev server at `localhost:4321`   |
| `npm run build`        | Build the production site to `./dist/`       |
| `npm run preview`      | Preview the production build locally         |
| `npx astro check`      | Type-check `.astro` files                    |

## Deploying

Two independent targets:

| Target | Command | URL | Use for |
| :--- | :--- | :--- | :--- |
| GitHub Pages | `git push` | https://oliverd25.github.io/swift-secure/ | The shareable link. Always up. |
| Home server | `./deploy.sh` | https://swiftsecure.serveousercontent.com/ | Previewing uncommitted work. |

`git push` triggers `.github/workflows/deploy.yml`, which builds with
`SITE`/`BASE_PATH` set so links resolve under the `/swift-secure/`
sub-path Pages serves from. Local builds and `./deploy.sh` leave those unset
and build at the root — see `src/lib/url.ts`.

The home-server preview depends on a serveo tunnel that does not survive a
reboot. `./tunnel-status.sh --restart` brings it back.

**The two targets can silently disagree.** `./deploy.sh` publishes the working
directory; `git push` publishes committed code. Deploy uncommitted work and forget
to commit, and the preview shows something the public link doesn't, with nothing on
screen to say so. `git status` before sending anyone a link.

This deploy setup is generalised in the global `static-site-deploy` skill, which
covers the base-path, CI and indexing traps in more depth.

## Before launch

- **Domain**: `public/robots.txt` still hardcodes the placeholder `swiftsecure.example` sitemap URL, and `astro.config.mjs` falls back to it when `SITE` is unset — point both at the real domain once there is one.
- **Apply form**: `/apply/` currently swaps in a client-side success message on submit only — wire it up to real submission handling (API route, email, or CRM). See the `TODO` in `src/pages/[...locale]/apply.astro`.
- **Verify lookup**: `/verify/` uses the same client-side demo matching as the design prototype (IDs ending in "42" or `CS-2026-0042`) — replace with a real API call to the certification database. See `src/pages/[...locale]/verify.astro`.
- **Casino directory**: `casinos.ts` is a static in-memory list — replace with a real data source when there's one.
- **Flag images**: the language switcher hotlinks flags from `flagcdn.com` — confirm that's acceptable for production or self-host them.
- **OG image**: no `og:image` is set yet — add one for richer social link previews.
