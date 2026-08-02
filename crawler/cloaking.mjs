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
import { writeFileSync, readFileSync } from "node:fs";
import { readTrustSignals } from "./trust-signals.mjs";
import { loadProxyPool, describePool } from "./proxy-pool.mjs";

const RESEARCH = new URL("../research/", import.meta.url);

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

// Proxy traffic is metered and every region multiplies the bill, so the two
// inputs that decide the cost are explicit rather than implied.
const fromFile = flag("from");
const domains = fromFile
  ? readFileSync(fromFile, "utf8").trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  : args.filter((a) => !a.startsWith("--"));

if (!domains.length) {
  console.error("usage: node cloaking.mjs <domain>... | --from=list.txt  [--regions=de,ca]");
  process.exit(1);
}

const wanted = flag("regions")?.split(",").map((s) => s.trim());
let pool = loadProxyPool();
if (wanted) {
  pool = pool.filter((p) => wanted.includes(p.region));
  const missing = wanted.filter((w) => !pool.some((p) => p.region === w));
  if (missing.length) {
    console.error(`No proxy configured for: ${missing.join(", ")}`);
    process.exit(1);
  }
}
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

  let verdict =
    reachable.length < 2
      ? "inconclusive"
      : claimSets.length > 1
        ? "DIFFERENT LICENCE CLAIM"
        : providerCounts.length > 1
          ? "content varies"
          : "consistent";

  /**
   * Confirm a suspected difference before reporting it.
   *
   * The regulator seal is a lazily loaded widget and one sample per region
   * cannot tell a real regional difference from a slow iframe. Measured on
   * fatbets: Germany showed no seal in 5 of 5 runs, but Canada showed it in
   * only 3 of 5 — so a single-sample comparison would have called that
   * cloaking on the strength of a coin flip.
   *
   * Re-samples only the suspicious cases, because tripling every fetch would
   * triple the proxy bill for sites that already agree.
   */
  if (verdict === "DIFFERENT LICENCE CLAIM") {
    const SAMPLES = 3;
    const rate = {};
    for (const p of reachable) {
      let seen = 0;
      for (let i = 0; i < SAMPLES; i++) {
        const proxy = pool.find((x) => x.region === p.region);
        const r = await readTrustSignals(browser, domain, { proxy, region: p.region });
        if (r.signals?.regulator) seen++;
      }
      rate[p.region] = seen;
    }
    const solidYes = Object.entries(rate).filter(([, n]) => n >= 2).map(([r]) => r);
    const solidNo = Object.entries(rate).filter(([, n]) => n === 0).map(([r]) => r);
    // A difference counts only when one region reliably shows the claim and
    // another reliably does not. Anything in between is our own noise.
    verdict = solidYes.length && solidNo.length
      ? `DIFFERENT LICENCE CLAIM (confirmed: shown in ${solidYes.join(",")}, absent in ${solidNo.join(",")})`
      : "unstable signal — not a difference we can stand behind";
    for (const p of perRegion) if (rate[p.region] !== undefined) p.claimRate = `${rate[p.region]}/${SAMPLES}`;
  }

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

// Same guard as the other sweeps: a narrow run must not overwrite a broad one.
// A partial file that looks like the full result is how an expensive dataset
// gets silently replaced by a smoke test.
const OUT = domains.length < 50 ? "cloaking-report.partial.json" : "cloaking-report.json";
if (OUT.includes("partial")) console.log(`Small run (${domains.length} sites) -> ${OUT}; the full report is untouched.`);
writeFileSync(new URL(OUT, RESEARCH), JSON.stringify(report, null, 1), "utf8");

// startsWith, not equality: the confirmed verdict carries a suffix naming the
// regions, and an exact match silently counted every confirmed finding as zero.
const differing = report.filter((r) => r.verdict.startsWith("DIFFERENT LICENCE CLAIM"));
const varying = report.filter((r) => r.verdict === "content varies");
const unstable = report.filter((r) => r.verdict.startsWith("unstable"));
const geo = report.filter((r) => r.blockedIn.length && r.blockedIn.length < pool.length);

console.log(`=== ${report.length} sites compared across ${pool.length} regions ===`);
console.log(`  different licence claim by region : ${differing.length}${differing.length ? "  <- the finding that matters" : ""}`);
console.log(`  content varies by region          : ${varying.length}  (usually localisation, not a problem)`);
console.log(`  suspected but unstable            : ${unstable.length}  (our own noise, reported as nothing)`);
for (const r of differing) console.log(`      ${r.domain}: ${r.verdict}`);
console.log(`  open in some countries, not others: ${geo.length}  (normal — licences are territorial)`);
console.log(`  wrote research/cloaking-report.json`);
