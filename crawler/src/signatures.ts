import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const db = JSON.parse(readFileSync(join(here, "../data/signatures.json"), "utf8"));

export type Origin = "provider" | "aggregator" | "self" | "neutral" | "ignore" | "unknown";

export interface Classified {
  host: string;
  origin: Origin;
  /** Provider or aggregator name when we recognise it. */
  label?: string;
}

const providers: Record<string, string[]> = db.providers;
const aggregators: Record<string, string[]> = db.aggregators;
const neutralCdns: string[] = db.neutralCdns;
const ignore: string[] = db.ignore;

/** eTLD+1-ish. Not a public-suffix-list implementation, but enough to stop
 *  `cdn.pragmaticplay.net` and `pragmaticplay.net` counting as different. */
export function registrableDomain(host: string): string {
  const parts = host.toLowerCase().replace(/:\d+$/, "").split(".");
  if (parts.length <= 2) return parts.join(".");
  const twoLevelTlds = ["co.uk", "com.br", "co.za", "com.au", "co.nz"];
  const lastTwo = parts.slice(-2).join(".");
  return twoLevelTlds.includes(lastTwo) ? parts.slice(-3).join(".") : lastTwo;
}

const matches = (host: string, domain: string) => host === domain || host.endsWith("." + domain);

/**
 * Decide where a request came from, relative to the casino being scanned.
 *
 * `self` is the interesting one: a game whose code and API sit on the
 * operator's own domain means the operator controls the maths. That is the
 * whole point of the check.
 */
export function classify(url: string, casinoDomain: string): Classified {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return { host: url, origin: "unknown" };
  }

  for (const d of ignore) if (matches(host, d)) return { host, origin: "ignore" };

  for (const [name, domains] of Object.entries(providers))
    for (const d of domains) if (matches(host, d)) return { host, origin: "provider", label: name };

  for (const [name, domains] of Object.entries(aggregators))
    for (const d of domains) if (matches(host, d)) return { host, origin: "aggregator", label: name };

  // Self must be tested after provider/aggregator: an operator can legitimately
  // CNAME a provider onto its own subdomain, and the provider match wins.
  const casinoRoot = registrableDomain(casinoDomain);
  if (registrableDomain(host) === casinoRoot) return { host, origin: "self" };

  for (const d of neutralCdns) if (matches(host, d)) return { host, origin: "neutral" };

  return { host, origin: "unknown" };
}

export const knownProviderNames = () => Object.keys(providers);
export const knownAggregatorNames = () => Object.keys(aggregators);
