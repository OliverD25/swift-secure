/**
 * Proxy pool.
 *
 * Scam operators can serve genuine games to a checker coming from a "clean"
 * Tier-1 IP and swapped ones to real players in LATAM or CIS. Checking from a
 * single datacentre IP therefore proves very little, and the first public
 * rebuttal of a report would take the whole unit's credibility with it.
 *
 * Separately and more immediately: casinos block datacentre IPs outright. In
 * testing, of 23 target domains, several served a "use a VPN" interstitial, a
 * 403, or an empty page to a plain request. Without residential exit nodes the
 * crawler cannot read a licence footer, let alone launch a game.
 *
 * Configure with a PROXIES env var — one entry per line or comma-separated:
 *
 *   PROXIES="http://user:pass@gate.provider.com:7000?country=de,
 *            http://user:pass@gate.provider.com:7000?country=br"
 *
 * Or point PROXY_FILE at a file with one URL per line. With neither set the
 * crawler runs direct and every report is marked `proxied: false`, which is
 * honest but must not be sold as a geo-verified result.
 */
import { readFileSync, existsSync } from "node:fs";

export interface ProxyEntry {
  server: string;
  username?: string;
  password?: string;
  /** Free-text tag used only for reporting which regions a scan covered. */
  region: string;
}

function parseOne(raw: string): ProxyEntry | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  try {
    const u = new URL(trimmed);
    const region =
      u.searchParams.get("country") ??
      u.searchParams.get("region") ??
      u.searchParams.get("cc") ??
      "unspecified";
    // Playwright wants credentials separate from the server URL.
    const server = `${u.protocol}//${u.host}`;
    return {
      server,
      username: u.username ? decodeURIComponent(u.username) : undefined,
      password: u.password ? decodeURIComponent(u.password) : undefined,
      region,
    };
  } catch {
    console.warn(`  ! ignoring unparseable proxy entry: ${trimmed.slice(0, 40)}`);
    return null;
  }
}

export function loadProxies(): ProxyEntry[] {
  const out: ProxyEntry[] = [];
  const file = process.env.PROXY_FILE;
  if (file && existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const p = parseOne(line);
      if (p) out.push(p);
    }
  }
  const inline = process.env.PROXIES;
  if (inline) {
    for (const part of inline.split(/[\n,]/)) {
      const p = parseOne(part);
      if (p) out.push(p);
    }
  }
  return out;
}

/**
 * Pick which proxies to use for one casino. Returns [] when none are
 * configured, and the caller records that the scan was unproxied.
 *
 * Rotating across regions per casino is the point — the same exit node every
 * time is exactly what a cloaking operator would learn to whitelist.
 */
export function selectForScan(pool: ProxyEntry[], count: number): ProxyEntry[] {
  if (pool.length === 0) return [];
  const byRegion = new Map<string, ProxyEntry[]>();
  for (const p of pool) {
    const list = byRegion.get(p.region) ?? [];
    list.push(p);
    byRegion.set(p.region, list);
  }
  // Prefer breadth of regions over depth within one.
  const regions = [...byRegion.keys()];
  const picked: ProxyEntry[] = [];
  for (let i = 0; picked.length < Math.min(count, pool.length); i++) {
    const region = regions[i % regions.length]!;
    const candidates = byRegion.get(region)!;
    const entry = candidates[Math.floor(i / regions.length) % candidates.length]!;
    if (!picked.includes(entry)) picked.push(entry);
    if (i > pool.length * 2) break;
  }
  return picked;
}
