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
export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/badge/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
