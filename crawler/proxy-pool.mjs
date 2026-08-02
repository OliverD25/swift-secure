/**
 * Proxy pool for the .mjs sweeps.
 *
 * src/proxies.ts already does this for the TypeScript crawler, but the sweeps
 * run under plain node and were launching direct regardless of what PROXIES
 * was set to — so buying proxies would have changed nothing until this existed.
 *
 * Same configuration as the TS side, deliberately:
 *
 *   PROXIES="http://user:pass@gate.provider.com:7000?country=de,
 *            http://user:pass@gate.provider.com:7000?country=tr"
 *   PROXY_FILE=/path/to/proxies.txt   (one URL per line, # comments allowed)
 *
 * Put credentials in a file, not on the command line: a shell history and a
 * process list are both readable, and `ps` shows every argument.
 */
import { readFileSync, existsSync } from "node:fs";

function parseOne(raw) {
  const t = raw.trim();
  if (!t || t.startsWith("#")) return null;
  try {
    const u = new URL(t);
    return {
      // Playwright wants credentials separate from the server URL.
      server: `${u.protocol}//${u.host}`,
      username: u.username ? decodeURIComponent(u.username) : undefined,
      password: u.password ? decodeURIComponent(u.password) : undefined,
      region: u.searchParams.get("country") ?? u.searchParams.get("region") ?? u.searchParams.get("cc") ?? "unspecified",
    };
  } catch {
    console.warn(`  ! ignoring unparseable proxy entry: ${t.slice(0, 30)}…`);
    return null;
  }
}

export function loadProxyPool() {
  const out = [];
  const file = process.env.PROXY_FILE;
  if (file && existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const p = parseOne(line);
      if (p) out.push(p);
    }
  }
  for (const part of (process.env.PROXIES ?? "").split(/[\n,]/)) {
    const p = parseOne(part);
    if (p) out.push(p);
  }
  return out;
}

/**
 * Rotate by index so consecutive sites do not share an exit node. Using one
 * node for a whole sweep is what gets a pool burned, and it is also exactly the
 * pattern a cloaking operator would learn to whitelist.
 */
export function pickProxy(pool, i) {
  return pool.length ? pool[i % pool.length] : undefined;
}

/** One line so every sweep reports the same thing about its own honesty. */
export function describePool(pool) {
  if (!pool.length) {
    return "No proxies configured — scanning direct from this host. Blocked sites will be reported as blocked, and nothing here is geo-verified.";
  }
  const regions = [...new Set(pool.map((p) => p.region))];
  return `Proxy pool: ${pool.length} entries across ${regions.length} region(s): ${regions.join(", ")}`;
}
