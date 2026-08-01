import { writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { scanCasino } from "./scan.ts";
import { loadAnjouanRegister } from "./checks/licence.ts";
import { readFooterLicence } from "./checks/footer.ts";
import { verifyCuracaoLicence } from "./checks/curacao.ts";
import { classify } from "./signatures.ts";
import { loadProxies } from "./proxies.ts";

const [, , command, ...args] = process.argv;

function usage(): never {
  console.log(`
Swift Secure verification crawler

  npm run scan -- <domain> [more domains...]   Full check: games + licence
  npm run licence -- <domain> [...]            Licence register lookup only (fast, no proxy needed)
  npm run learn -- <domain>                    Dump unclassified hosts, to grow the signature DB
  npm run footer -- <domain> [...]             Read what the site itself claims about its licence
  npm run curacao -- <OGL/.../...> [domain]    Verify a Curacao licence, and that it covers that domain

Environment:
  PROXIES     comma/newline separated proxy URLs, e.g.
              http://user:pass@gate.example.com:7000?country=de
  PROXY_FILE  path to a file with one proxy URL per line

Without proxies the crawler still runs, but from one datacentre IP: results are
marked proxied:false and must not be published as geo-verified.
`);
  process.exit(1);
}

async function cmdScan(domains: string[]) {
  if (domains.length === 0) usage();
  const pool = loadProxies();
  console.log(pool.length ? `Proxy pool: ${pool.length} entries` : "No proxies configured — running direct (see note in each report).");
  mkdirSync("reports", { recursive: true });

  for (const domain of domains) {
    process.stdout.write(`\nScanning ${domain} ... `);
    try {
      const report = await scanCasino(domain, { regions: 3, maxGames: 5 });
      const path = `reports/${domain.replace(/[^a-z0-9.-]/gi, "_")}.json`;
      writeFileSync(path, JSON.stringify(report, null, 2), "utf8");
      console.log(report.verdict.toUpperCase());
      console.log(`  ${report.summary}`);
      if (report.licence.found) {
        const r = report.licence.record!;
        console.log(`  Licence: ${r.number} (${r.status}) — ${r.company}, expires ${r.expiry}`);
      } else if (report.licence.checked) {
        console.log(`  Licence: not in ${report.licence.registry}`);
      }
      console.log(`  -> ${path}`);
    } catch (err) {
      console.log("ERROR");
      console.log(`  ${(err as Error).message.split("\n")[0]}`);
    }
  }
}

async function cmdLicence(domains: string[]) {
  if (domains.length === 0) usage();
  const browser = await chromium.launch({ headless: true });
  try {
    const records = await loadAnjouanRegister(browser);
    console.log(`Anjouan register: ${records.length} records\n`);
    // trim() must run BEFORE stripping www.: the register stores domains as a
    // comma-separated string, so split() yields " www.example.com" with a leading
    // space and the ^www\. anchor would never match. Getting this order wrong
    // silently reports licensed operators as unlicensed.
    const norm = (d: string) => d.trim().toLowerCase().replace(/^www\./, "");
    const index = new Map<string, (typeof records)[number]>();
    for (const r of records) for (const d of String(r.domains || "").split(",")) if (norm(d)) index.set(norm(d), r);

    for (const domain of domains) {
      const r = index.get(norm(domain));
      if (r) {
        console.log(`${domain}\n  ${r.number}  ${r.status}  ${r.type}`);
        console.log(`  ${r.company}`);
        console.log(`  issued ${r.issued}  expires ${r.expiry}\n`);
      } else {
        console.log(`${domain}\n  not in the Anjouan register (may be licensed elsewhere)\n`);
      }
    }
  } finally {
    await browser.close();
  }
}

/**
 * Point this at a casino you already trust. Everything it prints as `unknown`
 * is either a provider missing from the signature DB or noise — reviewing that
 * list is how the database grows from evidence instead of guesswork.
 */
async function cmdLearn(domains: string[]) {
  if (domains.length === 0) usage();
  const domain = domains[0]!;
  const browser = await chromium.launch({ headless: true });
  const seen = new Map<string, number>();
  try {
    const ctx = await browser.newContext({ locale: "en-GB" });
    await ctx.route("**/*", (r) => {
      const t = r.request().resourceType();
      return t === "image" || t === "font" || t === "media" ? r.abort() : r.continue();
    });
    const page = await ctx.newPage();
    page.on("request", (r) => {
      const k = classify(r.url(), domain);
      if (k.origin === "unknown") seen.set(k.host, (seen.get(k.host) ?? 0) + 1);
    });
    await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(8000);
    await ctx.close();
  } finally {
    await browser.close();
  }
  const sorted = [...seen.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`\nUnclassified hosts on ${domain} (candidates for signatures.json):\n`);
  for (const [host, n] of sorted) console.log(`  ${String(n).padStart(4)}  ${host}`);
  if (sorted.length === 0) console.log("  (none — everything matched a known signature)");
}

/** Records what a site claims about its own licence, so the claim can then be
 *  checked against a register. A footer is not evidence — it is the assertion
 *  we are going to test. */
async function cmdFooter(domains: string[]) {
  if (domains.length === 0) usage();
  const browser = await chromium.launch({ headless: true });
  try {
    for (const domain of domains) {
      const r = await readFooterLicence(browser, domain);
      console.log(`
${domain}`);
      if (!r.reachable) { console.log(`  unreachable: ${r.blockedReason}`); continue; }
      console.log(`  regulators mentioned: ${r.regulators.length ? r.regulators.join(", ") : "none found"}`);
      console.log(`  licence numbers:      ${r.numbers.length ? r.numbers.join(", ") : "none found"}`);
      if (r.sealLinks.length) console.log(`  seal/validator links: ${r.sealLinks.join(", ")}`);
      if (r.excerpt) console.log(`  context: ${r.excerpt.slice(0, 220)}`);
    }
  } finally {
    await browser.close();
  }
}


async function cmdCuracao(args: string[]) {
  const [number, domain] = args;
  if (!number) usage();
  const browser = await chromium.launch({ headless: true });
  try {
    const r = await verifyCuracaoLicence(browser, number, domain);
    console.log(`
${number}${domain ? ` @ ${domain}` : ""}`);
    if (r.found) {
      console.log(`  ${r.type} licence — ${r.company} (company no. ${r.companyNumber}), licensed since ${r.licensedSince}`);
      console.log(`  Certificate authorises: ${r.certifiedDomain}`);
      // The domain line is the finding worth shouting about; a genuine number on
      // a site it does not cover is the fraud this check exists to catch.
      if (r.domainMatches === false) console.log(`  *** DOMAIN MISMATCH ***`);
    }
    console.log(`  ${r.note}`);
    if (r.sourceUrl) console.log(`  source: ${r.sourceUrl}`);
  } finally {
    await browser.close();
  }
}

switch (command) {
  case "scan": await cmdScan(args); break;
  case "footer": await cmdFooter(args); break;
  case "curacao": await cmdCuracao(args); break;
  case "licence": await cmdLicence(args); break;
  case "learn": await cmdLearn(args); break;
  default: usage();
}
