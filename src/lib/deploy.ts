/**
 * Which branch this build came from, and therefore whether it is the live site.
 *
 * Cloudflare names this variable after the product, and the product changed
 * under us. The first attempt at hosting was Cloudflare Pages, which sets
 * CF_PAGES_BRANCH. What actually got created was a Workers Builds project,
 * which sets WORKERS_CI_BRANCH and never sets the Pages one — so the preview
 * guard read a variable that was always undefined, decided every build was
 * production, and would have let a staging branch into the search index. It
 * failed open and silently, which is the only way this kind of guard ever
 * fails. Both names are read so that neither product breaks it again.
 *
 * A build with neither variable set — local, or the GitHub Pages workflow — has
 * no branch and is treated as production. That is correct for both.
 *
 * Read from process.env, not import.meta.env: this runs in Node at build time,
 * and only PUBLIC_-prefixed variables reach import.meta.env.
 */
const PRODUCTION_BRANCH = "main";

export const deployBranch = process.env.WORKERS_CI_BRANCH ?? process.env.CF_PAGES_BRANCH;

/**
 * True on any deployment that is not the one public copy of the site.
 *
 * Two kinds qualify, and both were live at once on 2026-08-04:
 *
 * 1. A Cloudflare branch preview. Every one gets its own public URL — that is
 *    the point of it — and a public URL is a crawlable one.
 * 2. A deployment target we keep for our own convenience rather than for
 *    visitors. The GitHub Pages workflow still runs on every push to main and
 *    publishes a second complete copy at oliverd25.github.io/swift-secure/.
 *    Measured: it served `Allow: /` and a canonical pointing at itself, so it
 *    was not merely a duplicate — it was the copy claiming to be the original,
 *    while Cloudflare's canonical pointed at a domain that does not yet
 *    resolve. Left alone, the address we do not want customers to see is the
 *    one search engines would have kept.
 *
 * Case 2 cannot be detected from the environment, because a mirror looks
 * exactly like production from inside the build. It has to be declared, which
 * is what NOINDEX_DEPLOY is for.
 *
 * For a site whose entire pitch is that it can be trusted, having two of itself
 * in the search results is the wrong first impression.
 */
export const isUnindexedDeploy =
  process.env.NOINDEX_DEPLOY === "1" || (Boolean(deployBranch) && deployBranch !== PRODUCTION_BRANCH);
