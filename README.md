# Certified & Secure (Swift Secure)

Marketing + utility site for the Swift Secure casino trust-seal certification service. Built with **Astro** (static output) and **Tailwind CSS v4**.

## Stack

- **Astro** — static site generation, zero client JS by default
- **Tailwind CSS v4** — CSS-first theme config (`src/styles/global.css`), oklch design tokens
- **@fontsource-variable/inter** — self-hosted variable Inter font (no external Google Fonts request)
- **@astrojs/sitemap** — auto-generated sitemap for SEO

## Project structure

```text
src/
  components/     Header, Footer, LanguageSwitcher, Seal, CasinoCard, PlanCard, ...
  data/           content.ts, casinos.ts, languages.ts — all copy/data in one place
  layouts/        Layout.astro — SEO meta, header/footer shell
  pages/          one folder per route (index.astro = /, how-it-works/, pricing/, ...)
  styles/         global.css — Tailwind + design tokens
```

Interactive bits (language switcher, FAQ accordion, casino search, verify lookup, apply form) are plain vanilla `<script>` tags scoped per component/page — no JS framework.

## Commands

| Command             | Action                                      |
| :------------------- | :------------------------------------------- |
| `npm install`         | Install dependencies                         |
| `npm run dev`          | Start local dev server at `localhost:4321`   |
| `npm run build`        | Build the production site to `./dist/`       |
| `npm run preview`      | Preview the production build locally         |
| `npx astro check`      | Type-check `.astro` files                    |

## Before launch

- **Domain**: `astro.config.mjs` `site:` and `public/robots.txt` use a placeholder domain (`swiftsecure.example`) — update both to the real domain.
- **Apply form**: `/apply/` currently swaps in a client-side success message on submit only — wire it up to real submission handling (API route, email, or CRM). See the `TODO` in `src/pages/apply/index.astro`.
- **Verify lookup**: `/verify/` uses the same client-side demo matching as the design prototype (IDs ending in "42" or `CS-2026-0042`) — replace with a real API call to the certification database. See `src/pages/verify/index.astro`.
- **Casino directory**: `casinos.ts` is a static in-memory list — replace with a real data source when there's one.
- **Flag images**: the language switcher hotlinks flags from `flagcdn.com` — confirm that's acceptable for production or self-host them.
- **OG image**: no `og:image` is set yet — add one for richer social link previews.
