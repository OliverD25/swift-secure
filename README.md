# Swift Secured

Marketing + utility site for the Swift Secured casino trust-seal certification service. Built with **Astro** (static output) and **Tailwind CSS v4**.

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
| GitHub Pages | `git push` | https://oliverd25.github.io/swift-secured/ | The shareable link. Always up. |
| Home server | `./deploy.sh` | https://swiftsecure.serveousercontent.com/ | Previewing uncommitted work. |

Run `./publish.sh` instead of `./deploy.sh` when the session is already **on**
the home server (phone-driven work). Same target, but it builds in place rather
than copying 4,400 files across the network, so it does not need this PC awake.

## Working on the homelab

The full toolchain runs on `rde@192.168.88.166` at `~/projects/swift-secured` —
Node 22, Python 3.12, Playwright with Chromium already installed. Everything
below works there unchanged; paths resolve from each script's own location
rather than a drive letter, so nothing needs editing per machine.

```bash
npm run build && npx astro check          # site
python3 research/scripts/test_drafts.py   # 1,275 assertions on the outreach drafts
python3 research/scripts/test_directory_seo.py   # indexing + consent, reads dist/
python3 research/scripts/test_report_tooling.py  # signature, freshness, .partial guard
node scripts/test-apply-form.mjs          # apply form in a real browser, own dev server
python3 scripts/test-site-claims.py       # what the built site claims, all locales
node crawler/seal-census.mjs              # ~15 min, rewrites research/seal-census.json
./publish.sh                              # build and swap into the live docroot
```

**The operator reports are a two-step build, and the order is enforced.**
`15-verify-wave.py` re-requests every finding and writes both a human-readable
`outreach-wave-verified.md` and a machine-readable `wave-verification.json`.
`18-generate-reports.py` refuses to run without the JSON, because it may only
print a "check this yourself" curl line for a URL curl was proved to reproduce.
Passing a row limit to the verifier writes `.partial` files and leaves the real
ones alone.

```bash
python3 research/scripts/15-verify-wave.py   # ~4 min over the wave, hits live sites
python3 research/scripts/18-generate-reports.py
```

Who signs the letters comes from `research/sender.json`; `--sender` and
`--reply` still override it for a one-off run. **Run both on the day you send.**
Each letter prints the generation date and states every line was re-checked
"on the day this was sent" — the generator warns when the measurements are
older than that claim, reading the date from inside `wave-verification.json`
rather than the file's mtime, which a `git clone` resets.

`--outdir`, `--verified` and `--sender-file` exist so `test_report_tooling.py`
can run against fixtures without writing over the real letters.

**Scan results depend on which machine you run them from.** 95 of 489 sites
refuse the homelab outright, and the workstation is refused by a different set.
Numbers move between hosts because our network position moved, not because the
market did — so don't compare a homelab census against a workstation one and
read the difference as a trend.

Long sweeps need detaching properly, or they die with the SSH session:

```bash
setsid nohup node crawler/seal-census.mjs > research/seal-census.log 2>&1 < /dev/null &
```

`git push` triggers `.github/workflows/deploy.yml`, which builds with
`SITE`/`BASE_PATH` set so links resolve under the `/swift-secured/`
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

- ~~**Domain**~~: done. `swiftsecured.com` is live and served by the Cloudflare Worker, not by GitHub Pages, so there is no `CNAME` file and nothing to set under **Settings → Pages**. `astro.config.mjs` falls back to the domain and `src/pages/robots.txt.ts` builds the sitemap URL from the same value — the static `public/robots.txt` this list used to name no longer exists, so the two cannot drift apart.
- ~~**Mail hosting**~~: done 6 August 2026. `dmytro@swiftsecured.com` is a real mailbox on **Zoho Mail Lite, EU data centre**, and sending and receiving are both verified. MX is `mx/mx2/mx3.zoho.eu` (10/20/50), SPF is `v=spf1 include:zohomail.eu ~all`, and DKIM signs with selector `zmail`. A test to Gmail landed in the inbox with `SPF: PASS` and `DKIM: PASS`, both aligned to the domain. The free tier was not usable: it is webmail-only and, more decisively, **not offered in the EU data centre at all**.

  **Mail Lite does have IMAP and SMTP.** An earlier version of this line said it did not. That was wrong and was never checked — it came from reading the free plan's "IMAP/POP/Active Sync not included" and assuming it applied one tier up. Zoho's IMAP and POP help pages exclude only the *Free* plan, and `smtppro.zoho.eu:587` answers with `250-AUTH LOGIN PLAIN` from here. Use `smtppro.zoho.eu` / `imappro.zoho.eu` (paid-tier hosts, not `smtp.zoho.eu`). Port 465 is filtered on this network; 587 with STARTTLS works. IMAP may still need enabling per user under **Settings → Mail Accounts → IMAP Access** — that is an account toggle, not a plan limit.

  Having SMTP does not change how the wave should be sent. Twenty-one personalised letters still go out by hand, because the reason was never a missing protocol — it is that hand-sent mail from a real mailbox lands in inboxes and bulk-relayed cold mail does not.
- ~~**DMARC**~~: done 6 August 2026. `_dmarc` TXT is `v=DMARC1; p=none; rua=mailto:dmytro@swiftsecured.com`, and Gmail now reports `DMARC: PASS (p=NONE sp=NONE dis=NONE)` alongside SPF and DKIM. It deliberately stays at `p=none`, which monitors without blocking. Tighten to `quarantine` and later `reject` only after weeks of `rua` reports show mail passing consistently — a strict policy published before the setup is proven rejects our own outreach. Nobody has yet confirmed the `rua` aggregate reports actually arrive; they are XML and land at the address above.
- ~~**Apply form — contact address**~~: done 6 August 2026. `PUBLIC_CONTACT_EMAIL` is set on the production Worker and live on all 19 apply pages, so an operator always has a route that works. Variables live in the **Cloudflare dashboard → the `swift-secure` Worker → Settings → Variables and Secrets**, under the build configuration — see the table in `.cloudflare-deploy.md`. **The GitHub Actions repository variables are not the same thing and will not fix production**: since the move to Cloudflare, `.github/workflows/deploy.yml` builds only the noindexed Pages mirror. `.env` is gitignored, so it does not travel with the repo — copy `.env.example` on any new machine.
- **Apply form — the form itself still cannot submit.** `PUBLIC_FORM_ENDPOINT` is unset, so `/apply/` shows the fallback address and the operator has to open their own mail client. The code is ready for either service and the choice is a variable, not a code change: **Formspree** identifies the form from the endpoint URL and wants `PUBLIC_FORM_KEY` left empty; **Web3Forms** posts everyone to one shared endpoint and needs `PUBLIC_FORM_KEY` set, which the form appends as `access_key`. Set the values in `.env` first, run `node scripts/test-apply-form.mjs`, then add them to both Workers. The form never reports a success it did not get — a non-2xx keeps the form on screen with the typed values intact, which is covered by 21 browser checks in that test.
- ~~**Verify lookup**~~: done 4 August 2026. `/verify/` now matches exactly against seals built from `src/data/casinos.ts` at build time. No badge has been issued, so every lookup returns not-found and the copy says why. A casino gains a `sealId` when its badge goes live and the page answers with no further change.
- **Casino directory**: `casinos.ts` is a static in-memory list — replace with a real data source when there's one.
- **Flag images**: the language switcher hotlinks flags from `flagcdn.com` — confirm that's acceptable for production or self-host them.
- **OG image**: no `og:image` is set yet — add one for richer social link previews.
