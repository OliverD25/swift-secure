// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// SITE/BASE are set by the GitHub Pages workflow, which serves the site from
// /<repo>/ rather than the domain root. Left unset (local dev, home-server
// preview) the site builds at the root as before.
const site = process.env.SITE ?? 'https://swiftsecured.com';
const base = process.env.BASE_PATH ?? undefined;

// Mirrors the `noindex` rule in casinos/[slug].astro — a casino page is
// submitted only when its licence was confirmed against a register, and only
// in the default locale. Read straight from the data file rather than keeping a
// second copy of the slug list, so an entry that gains a verified licence
// starts appearing without anyone remembering to edit this config.
const casinoSource = readFileSync(new URL('./src/data/casinos.ts', import.meta.url), 'utf8');
// Split into per-entry blocks first. A lazy match across the whole file walks
// straight past an entry that omits the field and picks up the *next* one's
// value, which silently marks unverified casinos as verified.
//
// \r?\n, not \n: the working tree is CRLF on Windows. Node's readFileSync
// returns the bytes as they are, so an \n-only pattern matches nothing at all
// and every casino is silently treated as verified — the filter then does
// nothing and the failure is invisible until you read the sitemap.
const unverifiedSlugs = casinoSource
  .split(/\r?\n  \{\r?\n/)
  .slice(1)
  .map((block) => ({
    slug: block.match(/slug: "([^"]+)"/)?.[1],
    verified: /licenceVerified: "/.test(block),
  }))
  .filter((e) => e.slug && !e.verified)
  .map((e) => e.slug);

const localePrefixes = /^\/(ar|da|de|es|fr|fr-ca|it|nl|pl|pt|pt-br|sv|tr|hi|ko|zh|ja|ru)\//;

/** @param {string} page */
const isUnindexedCasinoPage = (page) => {
  const path = new URL(page).pathname.replace(/^\/[^/]+\//, (m) =>
    localePrefixes.test(m) ? '/' : m,
  );
  if (!path.includes('/casinos/') || path.endsWith('/casinos/')) return false;
  // Any non-default locale copy of a casino entry.
  if (localePrefixes.test(new URL(page).pathname)) return true;
  return unverifiedSlugs.some((slug) => path.includes(`/casinos/${slug}/`));
};

// https://astro.build/config
const locales = [
  'en', 'ar', 'da', 'de', 'es', 'fr', 'fr-ca', 'it', 'nl',
  'pl', 'pt', 'pt-br', 'sv', 'tr', 'hi', 'ko', 'zh', 'ja', 'ru',
];

export default defineConfig({
  site,
  base,
  i18n: {
    defaultLocale: 'en',
    locales,
    // English lives at the root; every other locale gets a /<code>/ prefix.
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Internal design-option picker; it is noindexed and unlinked, so listing
      // it in the sitemap would only invite crawlers to a page we then refuse.
      // Unchecked directory entries are noindexed for the same reason — see the
      // `noindex` prop in Layout.astro — and submitting a page we ask not to be
      // indexed is a contradiction search engines report as an error.
      filter: (page) => !page.includes('/settings') && !isUnindexedCasinoPage(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
