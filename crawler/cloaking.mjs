/**
 * Does this casino show the same thing to everyone?
 *
 * Fetches one site from every proxy region and compares what comes back. This
 * is the check the badge exists to make, and it is the only one competitors
 * cannot copy from a static image: a seal that says "verified" without saying
 * *where* it was verified from is worth very little on a site that behaves
 * differently per country.
 *
 * Most differences are innocent and must be reported as such. Localisation,
 * currency, and refusing a market the licence does not cover are all normal and
 * legal. The finding worth raising is a site claiming a **different regulator
 * or licence number** depending on who is asking, because only one of those
 * claims can be true.
 *
 * Usage: node cloaking.mjs <domain> [more...]   (PROXY_FILE / PROXIES required)
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { readTrustSignals } from "./trust-signals.mjs";
import { loadProxyPool, describePool } from "./proxy-pool.mjs";

const RESEARCH = new URL("../research/", import.meta.url);

const domains = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!domains.length) {
  console.error("usage: node cloaking.mjs <domain> [more...]");
  process.exit(1);
}

const pool = loadProxyPool();
if (pool.length < 2) {
  console.error("Cloaking needs at least two regions to compare. Configure PROXY_FILE.");
  process.exit(1);
}
console.log(describePool(pool));
console.log(`comparing ${domains.length} sites across ${pool.length} regions\n`);

const browser = await chromium.launch({ headless: true });
const report = [];

for (const domain of domains) {
  const perRegion = [];
  for (const proxy of pool) {
    const r = await readTrustSignals(browser, domain, { proxy, region: proxy.region });
    perRegion.push({
      region: proxy.region,
      blocked: !!r.blocked,
      error: r.error || "",
      // Which regulators the page names is the claim that must not vary.
      regulators: (r.samples?.regulator ?? []).join(" | ").slice(0, 160),
      hasRegulatorClaim: !!(r.signals?.regulator),
      providers: (r.providerNames ?? []).length,
      vendors: r.paidVendors ?? [],
    });
  }

  const reachable = perRegion.filter((p) => !p.blocked && !p.error);
  const blockedIn = perRegion.filter((p) => p.blocked).map((p) => p.region);

  // Compare only regions we could actually read. A region that refused us tells
  // us nothing about what it would have been shown.
  const claimSets = [...new Set(reachable.map((p) => p.regulators))];
  const providerCounts = [...new Set(reachable.map((p) => p.providers))];

  const verdict =
    reachable.length < 2
      ? "inconclusive"
      : claimSets.length > 1
        ? "DIFFERENT LICENCE CLAIM"
        : providerCounts.length > 1
          ? "content varies"
          : "consistent";

  report.push({ domain, verdict, blockedIn, perRegion });

  console.log(`${domain}`);
  console.log(`  verdict: ${verdict}${blockedIn.length ? `   (blocked in: ${blockedIn.join(", ")})` : ""}`);
  for (const p of perRegion) {
    const state = p.blocked ? "blocked" : p.error ? "error" : "read";
    console.log(`    ${p.region}  ${state.padEnd(8)} regulator-claim=${p.hasRegulatorClaim ? "yes" : "no "} providers=${String(p.providers).padStart(2)} ${p.regulators.slice(0, 70)}`);
  }
  console.log();
}

await browser.close();
writeFileSync(new URL("cloaking-report.json", RESEARCH), JSON.stringify(report, null, 1), "utf8");

const differing = report.filter((r) => r.verdict === "DIFFERENT LICENCE CLAIM");
const varying = report.filter((r) => r.verdict === "content varies");
const geo = report.filter((r) => r.blockedIn.length && r.blockedIn.length < pool.length);

console.log(`=== ${report.length} sites compared across ${pool.length} regions ===`);
console.log(`  different licence claim by region : ${differing.length}${differing.length ? "  <- the finding that matters" : ""}`);
console.log(`  content varies by region          : ${varying.length}  (usually localisation, not a problem)`);
console.log(`  open in some countries, not others: ${geo.length}  (normal — licences are territorial)`);
console.log(`  wrote research/cloaking-report.json`);
