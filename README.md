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

## Deploying

Two independent targets:

| Target | Command | URL | Use for |
| :--- | :--- | :--- | :--- |
| GitHub Pages | `git push` | https://oliverd25.github.io/swift-secured-badge/ | The shareable link. Always up. |
| Home server | `./deploy.sh` | https://swiftsecure.serveousercontent.com/ | Previewing uncommitted work. |

`git push` triggers `.github/workflows/deploy.yml`, which builds with
`SITE`/`BASE_PATH` set so links resolve under the `/swift-secured-badge/`
sub-path Pages serves from. Local builds and `./deploy.sh` leave those unset
and build at the root — see `src/lib/url.ts`.

The home-server preview depends on a serveo tunnel that does not survive a
reboot. `./tunnel-status.sh --restart` brings it back.

## Before launch

- **Domain**: `public/robots.txt` still hardcodes the placeholder `swiftsecure.example` sitemap URL, and `astro.config.mjs` falls back to it when `SITE` is unset — point both at the real domain once there is one.
- **Apply form**: `/apply/` currently swaps in a client-side success message on submit only — wire it up to real submission handling (API route, email, or CRM). See the `TODO` in `src/pages/apply/index.astro`.
- **Verify lookup**: `/verify/` uses the same client-side demo matching as the design prototype (IDs ending in "42" or `CS-2026-0042`) — replace with a real API call to the certification database. See `src/pages/verify/index.astro`.
- **Casino directory**: `casinos.ts` is a static in-memory list — replace with a real data source when there's one.
- **Flag images**: the language switcher hotlinks flags from `flagcdn.com` — confirm that's acceptable for production or self-host them.
- **OG image**: no `og:image` is set yet — add one for richer social link previews.
