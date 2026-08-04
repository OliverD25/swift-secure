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
 * True on any Cloudflare deployment that is not the production branch.
 *
 * Every preview gets its own public URL — that is the point of it — and a
 * public URL is a crawlable one. Left alone, a staging branch puts a second
 * copy of all 4,428 pages into the index, competing with production for the
 * same text. For a site whose entire pitch is that it can be trusted, having
 * two of itself in the search results is the wrong first impression.
 */
export const isPreviewDeploy = Boolean(deployBranch) && deployBranch !== PRODUCTION_BRANCH;
