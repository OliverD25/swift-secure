/**
 * Turn the Curaçao register into a prospect list.
 *
 * The register gives companies and licence numbers. The certificate endpoint
 * turns each number into the list of domains that licence covers — so one row
 * becomes an operator's whole brand roster, stated by the regulator rather than
 * guessed by us.
 *
 * This is better provenance than the Anjouan pool. There we inferred operator
 * groupings from shared infrastructure; here the regulator publishes them.
 *
 * Politeness: this is a government endpoint, so concurrency stays low and each
 * worker pauses between requests. There is no hurry.
 *
 * Usage: node curacao-expand.mjs [limit] [concurrency]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { verifyCuracaoLicence } from "./src/checks/curacao.ts";

const RESEARCH = new URL("../research/", import.meta.url);

const csv = readFileSync(new URL("curacao-register.csv", RESEARCH), "utf8").trim().split(/\r?\n/);
const head = csv[0].split(",");
const col = (n) => head.indexOf(n);
const rows = csv.slice(1).map((l) => {
  const p = l.split(",");
  return {
    licence: p[col("licence")],
    company: p[col("company")],
    type: p[col("type")],
    status: p[col("status")],
    expires: p[col("expires")],
  };
});

// B2B licences cover a supplier's own corporate site, not a casino a player
// visits, so they are no use as prospects.
const b2c = rows.filter((r) => r.type?.includes("B2C"));
const LIMIT = Number(process.argv[2] ?? b2c.length);
const CONC = Number(process.argv[3] ?? 4);
const targets = b2c.slice(0, LIMIT);

console.log(`expanding ${targets.length} B2C licences, concurrency ${CONC}`);

const browser = await chromium.launch({ headless: true });
const results = [];
const queue = [...targets];
let done = 0;

await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const rec = queue.shift();
      try {
        const cert = await verifyCuracaoLicence(browser, rec.licence);
        results.push({ ...rec, found: cert.found, domains: cert.approvedDomains ?? [], certCompany: cert.company ?? "" });
      } catch (err) {
        results.push({ ...rec, found: false, domains: [], error: String(err.message).slice(0, 70) });
      }
      if (++done % 25 === 0) {
        const dm = results.reduce((a, r) => a + r.domains.length, 0);
        console.log(`  ${done}/${targets.length}  certificates found ${results.filter((r) => r.found).length}, domains ${dm}`);
      }
      await new Promise((r) => setTimeout(r, 400));
    }
  }),
);
await browser.close();

// Merge rather than replace, so a partial run never destroys a full one.
const OUT = new URL("curacao-expanded.json", RESEARCH);
let prev = [];
try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* first run */ }
const merged = new Map(prev.map((r) => [r.licence, r]));
for (const r of results) merged.set(r.licence, r);
const all = [...merged.values()];
writeFileSync(OUT, JSON.stringify(all, null, 1), "utf8");

const withCert = all.filter((r) => r.found);
const domains = new Set(all.flatMap((r) => r.domains));
const multi = withCert.filter((r) => r.domains.length > 1);

console.log(`\n=== ${all.length} licences, ${withCert.length} certificates readable ===`);
console.log(`  distinct domains          : ${domains.size}`);
console.log(`  licences covering >1 brand: ${multi.length}`);
console.log(`  largest portfolio         : ${Math.max(0, ...withCert.map((r) => r.domains.length))} domains`);
console.log(`  wrote research/curacao-expanded.json`);

console.log(`\n--- biggest operators ---`);
for (const r of [...withCert].sort((a, b) => b.domains.length - a.domains.length).slice(0, 10))
  console.log(`  ${String(r.domains.length).padStart(3)}  ${(r.company || r.certCompany).slice(0, 34).padEnd(36)} ${r.domains.slice(0, 3).join(", ")}`);
