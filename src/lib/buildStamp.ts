import { execSync } from "node:child_process";
import { deployBranch } from "./deploy";

/**
 * Which commit this build came from, published so a deploy can be proved.
 *
 * Three times on 10 August 2026 a deploy could not be verified at all. The
 * commits in question changed no visible text — a refactor, a pinned
 * dependency, a documentation edit — so "the page still looks right" was true
 * of the new build and of the three-day-old one it had failed to replace.
 * Meanwhile five Cloudflare builds failed in a row and nothing said so; the
 * site simply went on serving what it already had.
 *
 * A build that names its own commit removes the whole class of problem. It
 * turns "did the deploy happen?" into one request, and it works even when the
 * change produces no visible difference at all — which is exactly when the
 * question is hardest and matters most.
 *
 * The chain is env-var first, git second. Cloudflare and GitHub both name the
 * commit in the environment, but they do not agree on the variable, and the
 * name has moved once already (Pages -> Workers Builds) with the silent-failure
 * that caused. Both builders also clone the repository, so `git rev-parse` is
 * the fallback that cannot be renamed out from under us.
 */
function fromGit(): string | undefined {
  try {
    const out = execSync("git rev-parse HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
    }).trim();
    return /^[0-9a-f]{40}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
}

const commit =
  process.env.WORKERS_CI_COMMIT_SHA ??
  process.env.CF_PAGES_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  fromGit() ??
  "unknown";

/** Evaluated once per build, not once per page. */
export const buildStamp = {
  commit,
  short: commit.slice(0, 7),
  branch: deployBranch ?? "local",
  builtAt: new Date().toISOString(),
} as const;
