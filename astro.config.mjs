// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE/BASE are set by the GitHub Pages workflow, which serves the site from
// /<repo>/ rather than the domain root. Left unset (local dev, home-server
// preview) the site builds at the root as before.
const site = process.env.SITE ?? 'https://swiftsecure.example';
const base = process.env.BASE_PATH ?? undefined;

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
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
