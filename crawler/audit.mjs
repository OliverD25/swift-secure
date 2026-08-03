/**
 * The single entry point for auditing one casino.
 *
 *   node audit.mjs <domain>
 *
 * This exists so that auditing a newly found casino is one command that
 * follows research/methodology.md, rather than remembering which of a dozen
 * scripts to run in which order and which of them are still trustworthy.
 *
 * WHY THIS REPLACES `npm run scan` (src/scan.ts):
 * That orchestrator's core is checkGames() — the "verify game iframes route to
 * real provider servers" check. This session proved that check cannot work:
 * clicking through game tiles on four live casinos found zero provider hosts,
 * because operators proxy game content through unbranded CDNs and their own
 * mirror domains. src/scan.ts still emits clean/suspicious verdicts about game
 * origins, which are not defensible. It is left in place for its licence
 * lookup but should not be used to judge a casino.
 *
 * WHAT THIS RUNS, and why each earns its place (methodology.md §2, §3, §5):
 *   - licence verification (Anjouan register / Curacao certificate)
 *   - trust-signal + seal detection, with block-vs-absent distinction
 *   - site health: broken requests, weight, trackers-before-consent
 *   - mobile time-to-register on a throttled connection
 *
 * WHAT THIS DELIBERATELY DOES NOT RUN:
 *   - game-provider verification — proven impossible from network traffic
 *   - cloaking (cloaking.mjs) and payment routing (payment-routing-check.mjs)
 *     — both need >=2 proxy regions and 3 samples each, so they cost real
 *     metered traffic and belong in a deliberate run, not a default one. Both
 *     are pointed at in the output when proxies are configured.
 *
 * Every finding is tagged for where it may be used, per methodology.md §1:
 *   report  — passes all four AGENTS.md questions, may go in the operator email
 *   public  — true but unwelcome; public verification page only
 *   context — neither, kept for our own understanding
 */
import { chromium } from "playwright";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { readTrustSignals } from "./trust-signals.mjs";
import { audit as siteHealth } from "./audit-probe.mjs";
import { loadProxyPool, describePool } from "./proxy-pool.mjs";

const RESEARCH = new URL("../research/", import.meta.url);

const domain = process.argv[2]?.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
if (!domain || !domain.includes(".")) {
  console.error("usage: node audit.mjs <domain>\n  e.g. node audit.mjs winup.io");
  process.exit(1);
}

const findings = [];
const add = (use, area, text) => findings.push({ use, area, text });

console.log(`\n=== Technical audit: ${domain} ===`);
console.log(`Run ${new Date().toISOString().slice(0, 10)}, per research/methodology.md\n`);

const pool = loadProxyPool();
console.log(describePool(pool) + "\n");

const browser = await chromium.launch({ headless: true });

// ---------------------------------------------------------------- licence
// Reads what the site itself claims, then checks that claim. A Curacao licence
// number is self-verifying (it contains its own certificate lookup key), which
// is why the number is worth extracting from the page rather than only
// matching the domain against a register.
let licence = { checked: false };
try {
  const { readFooterLicence } = await import("./src/checks/footer.ts");
  const footer = await readFooterLicence(browser, domain);
  licence = { checked: true, claimed: footer };

  if (footer.blockedReason) {
    add("context", "licence", `Site not readable for the licence check (${footer.blockedReason}) — unmeasured, not a finding.`);
  } else {
    const oglNumbers = (footer.numbers ?? []).filter((n) => /^OGL\//i.test(n));
    if (oglNumbers.length) {
      const { verifyCuracaoLicence } = await import("./src/checks/curacao.ts");
      const cert = await verifyCuracaoLicence(browser, oglNumbers[0], domain);
      licence.curacao = cert;
      if (cert.found && cert.domainMatches === false) {
        // The one licence finding that is genuinely serious — a real number
        // displayed on a domain its certificate does not cover.
        add("public", "licence", `Curacao certificate ${oglNumbers[0]} is genuine but does NOT cover ${domain}. ${cert.note}`);
      } else if (cert.found && cert.domainMatches) {
        add("report", "licence", `Curacao licence ${oglNumbers[0]} confirmed against the regulator's certificate, including the approved-domain list.`);
      } else if (!cert.found) {
        add("context", "licence", `No certificate published under ${oglNumbers[0]}. Unconfirmed, NOT evidence of being unlicensed — tokens expire and need reissuing.`);
      }
    } else if (footer.regulators?.length) {
      add("context", "licence", `Claims: ${footer.regulators.join(", ")}${footer.numbers?.length ? ` (${footer.numbers.join(", ")})` : " — no licence number published"}. Not a Curacao LOK number, so no certificate lookup is possible.`);
    } else {
      add("context", "licence", "No regulator or licence number found on the page.");
    }
  }
} catch (err) {
  add("context", "licence", `Licence check failed to run: ${String(err.message).slice(0, 80)}`);
}

// ----------------------------------------------------------- trust signals
let signals = null;
try {
  signals = await readTrustSignals(browser, domain);
  if (signals.blocked) {
    add("context", "seals", `Blocked from this host (${signals.error}) — unmeasured, not "has no trust signals".`);
  } else if (signals.ok) {
    const s = signals.signals ?? {};
    const paid = signals.paidVendors ?? [];
    if (paid.length) {
      add("context", "seals", `Already displays: ${paid.join(", ")}. (Commercial context for us — never mentioned to the operator, who put it there deliberately.)`);
    }
    if (s.regulator) add("context", "seals", "Displays a regulator licence seal.");
    if ((signals.providerNames ?? []).length) {
      add("context", "seals", `Names ${signals.providerNames.length} game studios on-site. We record the claim and its date; we cannot verify it.`);
    }
  }
} catch (err) {
  add("context", "seals", `Trust-signal check failed: ${String(err.message).slice(0, 80)}`);
}

// ------------------------------------------------------------- site health
let health = null;
try {
  health = await siteHealth(browser, domain);
  if (!health.ok) {
    add("context", "health", `Site health check could not read the page: ${health.error}`);
  } else {
    // Broken requests — the strongest report finding we have. Unknown to them,
    // costs money, fixable.
    if (health.brokenRequests >= 5) {
      add("report", "health", `${health.brokenRequests} requests fail on the homepage. Examples: ${(health.brokenSample ?? []).slice(0, 3).join(" | ")}`);
    } else if (health.brokenRequests > 0) {
      add("report", "health", `${health.brokenRequests} failed request(s): ${(health.brokenSample ?? []).join(" | ")}`);
    }

    if (health.requestCount > 300) {
      add("report", "health", `${health.requestCount} requests and ${health.transferKB}KB to load the homepage — well above the ~167-request median across sites we have measured.`);
    }

    // Consent: report-eligible ONLY as a measurement. Never as a legal claim —
    // Consent Mode can send cookieless pings that are not violations.
    const trackers = health.trackersBeforeConsent ?? [];
    if (trackers.length && !health.hasConsentUI) {
      add("report", "consent", `${trackers.length} tracking host(s) received a request before any consent interaction, measured from a German browser context: ${trackers.slice(0, 5).join(", ")}. This is a measurement, not a legal opinion.`);
    }

    if (!health.securityHeaders?.["strict-transport-security"]) {
      add("context", "health", "No HSTS header. Excluded from reports by the AGENTS.md filter — operators do not act on this from a stranger.");
    }
  }
} catch (err) {
  add("context", "health", `Site health check failed: ${String(err.message).slice(0, 80)}`);
}

await browser.close();

// --------------------------------------------------------- mobile timing
// Separate browser launch: this one needs a mobile viewport and CDP network
// throttling, and must NOT block images the way every other check does —
// image weight is the finding here, so sharing a context would corrupt it.
let mobile = null;
try {
  const { execFileSync } = await import("node:child_process");
  const out = execFileSync(process.execPath, ["mobile-timing.mjs", domain], {
    cwd: new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
    encoding: "utf8",
    timeout: 120000,
  });
  const ctaMatch = out.match(/CTA visible at\s*:\s*(\d+)ms/);
  const loadTimeout = /did not finish within/.test(out);
  mobile = { raw: out.trim(), ctaMs: ctaMatch ? Number(ctaMatch[1]) : null, loadTimedOut: loadTimeout };

  // "NOT FOUND in 20s" is the worst outcome this check can produce, and the
  // first version handled only the numeric cases — so a site where the
  // Register button never appeared at all produced no mobile finding whatever,
  // silently dropping the strongest result of the module. zlot.com hit exactly
  // this. Phrased as an observation rather than a verdict, because a CTA can
  // legitimately sit behind a cookie wall or an age gate we did not dismiss.
  const ctaMissing = /NOT FOUND in 20s/.test(mobile.raw ?? "");
  if (ctaMissing) {
    add("report", "mobile", "On a Fast 3G mobile connection no Register/Sign-up button became visible within 20 seconds. Worth checking whether a mobile visitor can find one at all — some layouts place it behind a menu we did not open.");
  } else if (mobile.ctaMs !== null && mobile.ctaMs > 8000) {
    add("report", "mobile", `On a Fast 3G mobile connection the Register/Sign-up button does not appear for ${(mobile.ctaMs / 1000).toFixed(1)}s.`);
  } else if (mobile.ctaMs !== null) {
    add("context", "mobile", `Register button visible after ${(mobile.ctaMs / 1000).toFixed(1)}s on Fast 3G — healthy.`);
  }
  if (loadTimeout) {
    add("report", "mobile", "The page does not finish loading within 10s on a Fast 3G mobile connection.");
  }
} catch (err) {
  add("context", "mobile", `Mobile timing check did not run: ${String(err.message).split("\n")[0].slice(0, 80)}`);
}

// ------------------------------------------------------------------ output
const report = { domain, ranAt: new Date().toISOString(), findings, raw: { licence, signals, health, mobile } };
mkdirSync(new URL("audits/", RESEARCH), { recursive: true });
const dest = new URL(`audits/${domain}.json`, RESEARCH);
writeFileSync(dest, JSON.stringify(report, null, 1), "utf8");

const byUse = (u) => findings.filter((f) => f.use === u);
const label = { report: "SEND TO OPERATOR", public: "PUBLIC PAGE ONLY — never email", context: "context — our understanding only" };

for (const use of ["report", "public", "context"]) {
  const list = byUse(use);
  if (!list.length) continue;
  console.log(`\n--- ${label[use]} ---`);
  for (const f of list) console.log(`  [${f.area}] ${f.text}`);
}

if (!byUse("report").length) {
  console.log(`\n--- SEND TO OPERATOR ---`);
  console.log("  Nothing found worth reporting. Per methodology.md, this gets a report that says exactly that — never padded with weak findings.");
}

if (pool.length >= 2) {
  console.log(`\nProxies configured. Two further checks are available but cost metered traffic, so they are not run by default:`);
  console.log(`  node cloaking.mjs ${domain} --regions=de,ca`);
  console.log(`  node payment-routing-check.mjs ${domain} --regions=de,ca`);
} else {
  console.log(`\nNo proxies configured — cloaking and payment-routing checks were skipped. Nothing here is geo-verified.`);
}
console.log(`\nwrote research/audits/${domain}.json`);
