import type { APIRoute } from "astro";
import { deployBranch, isPreviewDeploy } from "../lib/deploy";

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
  const body = isPreviewDeploy
    ? [
        `# Preview deployment of branch "${deployBranch}". Not the live site.`,
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
        `Sitemap: ${new URL("sitemap-index.xml", site ?? "https://swiftsecured.com").href}`,
        "",
      ];

  return new Response(body.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
