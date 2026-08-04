import type { APIRoute } from "astro";

/**
 * robots.txt, built per deployment rather than served as a static file.
 *
 * It used to live in public/ and say "Allow: /" on every deployment, including
 * the Cloudflare preview branches that exist precisely so unfinished work can
 * be looked at. The meta noindex in Layout.astro already covers those, but a
 * crawler that fetches robots.txt first should be told before it spends a
 * request finding out — and the two layers fail independently.
 *
 * CF_PAGES_BRANCH is set by Cloudflare on every build and by nothing else, so a
 * local build or the GitHub Pages workflow still produces the production file.
 */
const PRODUCTION_BRANCH = "main";

export const GET: APIRoute = ({ site }) => {
  const branch = process.env.CF_PAGES_BRANCH;
  const isPreview = Boolean(branch) && branch !== PRODUCTION_BRANCH;

  const body = isPreview
    ? [
        `# Preview deployment of branch "${branch}". Not the live site.`,
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
