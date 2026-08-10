import type { APIRoute } from "astro";
import { buildStamp } from "../lib/buildStamp";

/**
 * The commit this deployment was built from.
 *
 *   curl -s https://swiftsecured.com/version.json
 *
 * `scripts/check-deployed.py` compares it to origin/main and says in one line
 * whether the live site is current. Before this existed, a failed build was
 * invisible: Cloudflare keeps serving the last good deployment, so the site
 * looks healthy in every way except being old.
 *
 * The Cache-Control header set here does NOT survive. This is a static build,
 * so Astro writes the body to dist/version.json and the Response headers are
 * discarded. The rule that actually keeps this file fresh lives in
 * public/_headers, and a cached answer here would be worse than no answer at
 * all — it would confirm a deploy that never happened.
 */
export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildStamp, null, 2) + "\n", {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
