import type { APIRoute } from "astro";
import { deployBranch, isUnindexedDeploy } from "../lib/deploy";

/**
 * robots.txt, built per deployment rather than served as a static file.
 *
 * It used to live in public/ and say "Allow: /" on every deployment, including
 * the Cloudflare preview branches that exist precisely so unfinished work can
 * be looked at. The meta noindex in Layout.astro already covers those, but a
 * crawler that fetches robots.txt first should be told before it spends a
 * request finding out — and the two layers fail independently.
 *
 * Which branch we are on is decided in one place, src/lib/deploy.ts, because
 * this file and Layout.astro have to agree and a copied condition is exactly
 * the thing that drifts.
 */
export const GET: APIRoute = ({ site }) => {
  // Astro's `site` is the origin only; the sub-path lives in BASE_URL and is
  // set on GitHub Pages, which serves from /<repo>/. Joining the filename to
  // the origin alone produced oliverd25.github.io/sitemap-index.xml — a 404,
  // and the one line in robots.txt whose whole job is to be fetched.
  const rawBase = import.meta.env.BASE_URL;
  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  const sitemap = new URL(`${base}sitemap-index.xml`, site ?? "https://swiftsecured.com").href;

  const body = isUnindexedDeploy
    ? [
        deployBranch
          ? `# Preview deployment of branch "${deployBranch}". Not the live site.`
          : "# Mirror of the live site, kept as a fallback. Not the live site.",
        "# The live site is https://swiftsecured.com",
        "User-agent: *",
        "Disallow: /",
        "",
      ]
    : [
        "User-agent: *",
        "Allow: /",
        "",
        "# Internal design-option picker, not content.",
        "Disallow: /settings/",
        "",
        `Sitemap: ${sitemap}`,
        "",
      ];

  return new Response(body.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
