/**
 * Re-measure the seal market with the validated detector.
 *
 * Supersedes the host-only pass in market-scan.mjs, which missed every badge an
 * operator self-hosts — the normal way to deploy one. Validated before running:
 * it recovers the iframe seals the old method found (regression) and finds
 * self-hosted ones it did not.
 *
 * Usage: node seal-census.mjs [limit] [concurrency]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { readTrustSignals } from "./trust-signals.mjs";
import { loadProxyPool, pickProxy, describePool } from "./proxy-pool.mjs";

// Resolve against this file, not the shell's working directory: the scripts are
// run from the repo root as often as from crawler/, and a relative path that
// depends on where you happened to be standing fails on the other machine.
const RESEARCH = new URL("../research/", import.meta.url);


const lines = readFileSync(new URL("prospects-live.csv", RESEARCH), "utf8").trim().split(/\r?\n/);
const di = lines[0].split(",").indexOf("domain");
const domains = lines.slice(1).map((l) => l.split(",")[di]).filter((d) => d && d.includes("."));

const LIMIT = Number(process.argv[2] ?? domains.length);
const CONC = Number(process.argv[3] ?? 8);
const targets = domains.slice(0, LIMIT);
const pool = loadProxyPool();
console.log(describePool(pool));
console.log(`seal census over ${targets.length} sites, concurrency ${CONC}`);

const browser = await chromium.launch({ headless: true });
const results = [];
const queue = [...targets];
let done = 0;

await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const d = queue.shift();
      const proxy = pickProxy(pool, done);
      const r = await readTrustSignals(browser, d, {
        proxy,
        // Match the browser's declared locale to where the IP claims to be;
        // a UK locale on a Turkish exit node is a giveaway.
        region: proxy?.region,
      });
      results.push(r);
      if (++done % 40 === 0)
        console.log(`  ${done}/${targets.length}  paid so far: ${results.filter((x) => x.paidVendors?.length).length}`);
    }
  }),
);
await browser.close();

writeFileSync(new URL("seal-census.json", RESEARCH), JSON.stringify(results, null, 1), "utf8");

const ok = results.filter((r) => r.ok);
const blocked = results.filter((r) => r.blocked);
// Neither read nor blocked: a crash, a timeout, or — most likely on the first
// run after buying proxies — a proxy that is not working. Counted explicitly,
// because a site that vanishes from both buckets looks like a smaller market
// rather than a broken configuration.
const errored = results.filter((r) => !r.ok && !r.blocked);
const paid = ok.filter((r) => r.paidVendors?.length);
const has = (r, c) => (r.signals?.[c] ?? 0) > 0;

// Percentages are of sites we could actually read. Dividing by everything we
// attempted would quietly fold blocked sites into "has no trust signal", which
// is a claim we have no evidence for.
const pct = (n) => `${((n / ok.length) * 100).toFixed(1)}%`;
console.log(`\n=== seal census: ${ok.length} read, ${blocked.length} blocked, ${errored.length} errored, of ${results.length} attempted ===`);
if (errored.length > results.length / 4) {
  // Most likely cause on a first run: proxies configured but not working. A
  // site that lands in neither bucket would otherwise just shrink the market.
  console.log(`  !! ${errored.length} sites failed outright — check the proxy configuration before trusting anything below.`);
  console.log(`     first error: ${(errored.find((r) => r.error)?.error ?? "none recorded").slice(0, 90)}`);
}
if (!ok.length) {
  console.log(`  Nothing could be read, so there are no percentages to report.`);
  process.exit(1);
}
console.log(`  paying a commercial seal vendor : ${paid.length}  (${pct(paid.length)})`);
console.log(`  regulator licence seal          : ${ok.filter((r) => has(r, "regulator")).length}  (${pct(ok.filter((r) => has(r, "regulator")).length)})`);
console.log(`  responsible-gambling logos      : ${ok.filter((r) => has(r, "responsible")).length}  (${pct(ok.filter((r) => has(r, "responsible")).length)})`);
console.log(`  review-platform badge           : ${ok.filter((r) => has(r, "review")).length}  (${pct(ok.filter((r) => has(r, "review")).length)})`);
console.log(`  lists game providers on site    : ${ok.filter((r) => has(r, "provider")).length}  (${pct(ok.filter((r) => has(r, "provider")).length)})`);
console.log(`  no trust signal of any kind     : ${ok.filter((r) => !Object.keys(r.signals ?? {}).length).length}`);

const byVendor = new Map();
for (const r of paid) for (const v of r.paidVendors) byVendor.set(v, (byVendor.get(v) ?? 0) + 1);
console.log(`\n--- paid vendors by reach ---`);
for (const [v, n] of [...byVendor.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`  ${String(n).padStart(3)}  ${v}`);

console.log(`\n--- the paying list ---`);
for (const r of paid.sort((a, b) => a.domain.localeCompare(b.domain)))
  console.log(`  ${r.domain.padEnd(28)} ${r.paidVendors.join(", ")}`);
