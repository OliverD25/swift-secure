/**
 * Module 2 (revised) — does a casino show the same payment methods to every
 * country, with the same confirm-before-report discipline as cloaking.mjs.
 *
 * The original proposal for this module was "load from Tier-1/Tier-2
 * countries, flag payment methods that fail to render" — a single fetch per
 * region, reported as a leak. Built and evaluated that way once already this
 * session, for a different signal (licence claims), and it produced 6
 * suspected differences on 60 sites of which only 2 survived re-sampling — a
 * 67% false-positive rate from a widget that had not finished loading yet.
 * There is no reason payment widgets would be more reliable than seal widgets,
 * so this reuses cloaking.mjs's exact re-sampling protocol rather than
 * trusting a single load.
 *
 * A second, separate reason this is more conservative than cloaking.mjs: a
 * missing payment method is very often *correct* behaviour — PIX has no
 * reason to render for a non-Brazilian IP, and hiding a method the operator
 * cannot actually process for that market is the responsible choice, not a
 * bug. Licence-claim differences have essentially one honest explanation
 * (territorial licensing) or one dishonest one (concealment); payment-method
 * differences have many mundane ones this check cannot distinguish from a
 * genuine bug without a real checkout flow, which requires an account this
 * project does not create. So a confirmed difference here is reported as a
 * dated measurement requiring human judgement — it never auto-qualifies for
 * the operator email the way a broken-request finding does. See
 * research/methodology.md §1 for the report-routing rule this follows.
 *
 * Usage: node payment-routing-check.mjs <domain>... [--regions=de,ca]
 *        PROXY_FILE=proxies.txt required — this has nothing to compare without
 *        at least two regions.
 */
import { chromium } from "playwright";
import { writeFileSync, readFileSync } from "node:fs";
import { loadProxyPool, describePool } from "./proxy-pool.mjs";

const RESEARCH = new URL("../research/", import.meta.url);
const SAMPLES = 3; // matches cloaking.mjs — the number that turned 6 false leads into 2 real ones

// Named individually, the same way trust-signals.mjs names game studios rather
// than counting a generic "payment" match — "PIX did not render for Brazil" is
// a sentence a human can act on; "a payment method changed" is not.
const PAYMENT_METHODS = [
  ["PIX", /\bpix\b/i], ["Boleto", /\bboleto\b/i],
  ["UPI", /\bupi\b/i], ["Paytm", /\bpaytm\b/i],
  ["Interac", /\binterac\b/i],
  ["iDEAL", /\bideal\b/i], ["BLIK", /\bblik\b/i], ["Przelewy24", /przelewy ?24|\bp24\b/i],
  ["Konbini", /\bkonbini\b/i], ["JCB", /\bjcb\b/i],
  ["Visa", /\bvisa\b/i], ["Mastercard", /mastercard/i], ["Maestro", /\bmaestro\b/i],
  ["Skrill", /\bskrill\b/i], ["Neteller", /\bneteller\b/i], ["Paysafecard", /paysafe ?card/i],
  ["MiFinity", /\bmifinity\b/i], ["Trustly", /\btrustly\b/i], ["Zimpler", /\bzimpler\b/i],
  ["Apple Pay", /apple ?pay/i], ["Google Pay", /google ?pay/i],
  ["Bitcoin", /\bbitcoin\b|\bbtc\b/i], ["Ethereum", /\bethereum\b|\beth\b/i],
  ["USDT", /\busdt\b|tether/i], ["Litecoin", /\blitecoin\b|\bltc\b/i],
];

function detect(text) {
  const found = new Set();
  for (const [name, re] of PAYMENT_METHODS) if (re.test(text)) found.add(name);
  return found;
}

// Discovered testing against winup.io: it fires 55 payment-icon requests on
// the homepage (agstatic.com/paysystems/.../aninda2_papara.svg,
// .../aninda2_banka.svg — the same icons whose 404 the site health audit
// already found) but the visible-text and <img alt/src> checks found zero of
// them. They render as CSS background-images, not <img> tags, so DOM-only
// detection has a real, demonstrated blind spot — not a hypothetical one.
// Network request URLs still carry the payment method's name and were the
// only place this signal was actually visible. Filenames are each platform's
// own internal naming, so this is still heuristic, not exhaustive — a
// provider named only in a sprite-sheet class name with no URL trace would
// still be missed.
function detectFromUrls(urls) {
  const found = new Set();
  const joined = urls.join(" ");
  for (const [name, re] of PAYMENT_METHODS) if (re.test(joined)) found.add(name);
  return found;
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const REGION_LOCALE = {
  uk: "en-GB", gb: "en-GB", de: "de-DE", ca: "en-CA", tr: "tr-TR",
};

async function sampleOnce(browser, domain, proxy) {
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: REGION_LOCALE[proxy?.region] ?? "en-GB",
    ignoreHTTPSErrors: true,
    ...(proxy ? { proxy } : {}),
  });
  await ctx.route("**/*", (r) => {
    const t = r.request().resourceType();
    return t === "image" || t === "font" || t === "media" ? r.abort() : r.continue();
  });
  const page = await ctx.newPage();
  page.on("dialog", (d) => d.dismiss().catch(() => {}));
  const requestUrls = [];
  page.on("request", (r) => requestUrls.push(r.url()));
  try {
    const resp = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (!resp || resp.status() >= 400) return { blocked: true, methods: new Set() };
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});
    await page.waitForTimeout(2500);
    const text = await page.evaluate(() => document.body?.innerText ?? "").catch(() => "");
    if (text.trim().length < 200) return { blocked: true, methods: new Set() };
    // Union of both: text/img catches methods spelled out in words or alt
    // text, request-URL catches the CSS-background-image case that text
    // detection alone would miss entirely (see detectFromUrls above).
    const fromText = detect(text);
    const fromUrls = detectFromUrls(requestUrls);
    return { blocked: false, methods: new Set([...fromText, ...fromUrls]) };
  } catch {
    return { blocked: true, methods: new Set() };
  } finally {
    await ctx.close().catch(() => {});
  }
}

async function checkDomain(browser, domain, pool) {
  const perRegion = {};
  for (const proxy of pool) {
    const rates = {};
    let blockedCount = 0;
    for (let i = 0; i < SAMPLES; i++) {
      const { blocked, methods } = await sampleOnce(browser, domain, proxy);
      if (blocked) { blockedCount++; continue; }
      for (const m of methods) rates[m] = (rates[m] ?? 0) + 1;
    }
    perRegion[proxy.region] = { rates, blockedCount, sampled: SAMPLES - blockedCount };
  }

  // Confirmed present: >=2 of 3 successful samples. Confirmed absent: 0 of 3,
  // and only among regions we could actually read — a region that blocked us
  // every time tells us nothing about what it would have shown.
  const readableRegions = Object.entries(perRegion).filter(([, v]) => v.sampled >= 2);
  const allMethods = new Set(readableRegions.flatMap(([, v]) => Object.keys(v.rates)));
  const findings = [];
  for (const method of allMethods) {
    const present = readableRegions.filter(([, v]) => (v.rates[method] ?? 0) >= 2).map(([r]) => r);
    const absent = readableRegions.filter(([, v]) => (v.rates[method] ?? 0) === 0).map(([r]) => r);
    if (present.length && absent.length) {
      findings.push({ method, shownIn: present, notShownIn: absent });
    }
  }

  return {
    domain,
    perRegion,
    findings,
    // Never auto-eligible for the operator email — see file header.
    flag: findings.length
      ? "PAYMENT METHOD VARIES BY REGION — needs human judgement before use. " +
        "Often correct (a rail genuinely unavailable in that market); only " +
        "worth raising with the operator if a human confirms it looks unintentional."
      : "",
  };
}

const argv = process.argv.slice(2);
const flag = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const domains = argv.filter((a) => !a.startsWith("--"));

if (!domains.length) {
  console.error("usage: node payment-routing-check.mjs <domain>... [--regions=de,ca]");
  process.exit(1);
}

const wanted = flag("regions")?.split(",").map((s) => s.trim());
let pool = loadProxyPool();
if (wanted) pool = pool.filter((p) => wanted.includes(p.region));
if (pool.length < 2) {
  console.error("Need at least two proxy regions to compare. Configure PROXY_FILE.");
  process.exit(1);
}
console.log(describePool(pool));
console.log(`${SAMPLES} samples per region — this domain will cost ${domains.length * pool.length * SAMPLES} page loads\n`);

const browser = await chromium.launch({ headless: true });
const results = [];
for (const domain of domains) {
  const r = await checkDomain(browser, domain, pool);
  results.push(r);
  console.log(`${domain}`);
  for (const [region, v] of Object.entries(r.perRegion)) {
    console.log(`  ${region}  sampled ${v.sampled}/${SAMPLES}  methods seen: ${Object.keys(v.rates).length ? Object.entries(v.rates).map(([m, n]) => `${m}(${n}/3)`).join(", ") : "none"}`);
  }
  if (r.findings.length) {
    console.log(`  FLAGGED (needs human review):`);
    for (const f of r.findings) console.log(`    ${f.method}: shown in ${f.shownIn.join(",")}, not shown in ${f.notShownIn.join(",")}`);
  } else {
    console.log(`  no confirmed regional difference`);
  }
  console.log();
}
await browser.close();

const OUT = new URL("payment-routing-report.json", RESEARCH);
let prev = [];
try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* first run */ }
const merged = new Map(prev.map((r) => [r.domain, r]));
for (const r of results) merged.set(r.domain, r);
writeFileSync(OUT, JSON.stringify([...merged.values()], null, 1), "utf8");
console.log(`wrote research/payment-routing-report.json`);
