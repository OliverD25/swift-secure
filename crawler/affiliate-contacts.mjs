/**
 * Find a reachable human via the affiliate programme.
 *
 * The earlier harvest read /contact and /support and found an address on 13% of
 * sites, which left most drafts with nowhere to go. Affiliate pages are a
 * different animal: a partner programme exists in order to be contacted, so it
 * publishes a real address far more often than a support desk does — and the
 * affiliate manager is the person who actually owns a badge-and-link deal.
 *
 * Also records which affiliate *platform* a brand runs on. Programmes on
 * Affilka, Income Access, MyAffiliates and the rest are reachable through the
 * platform even when the casino publishes nothing itself.
 *
 * Usage: node affiliate-contacts.mjs [limit] [concurrency]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { loadProxyPool, pickProxy, describePool } from "./proxy-pool.mjs";

const RESEARCH = new URL("../research/", import.meta.url);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Ordered by how likely the path is to be the real programme page.
const PATHS = [
  "/affiliates", "/affiliate", "/partners", "/partner", "/affiliate-program",
  "/affiliates/", "/partnership", "/affiliate-programme", "/ru/affiliates", "/tr/affiliates",
];

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}/g;

// Whoever runs the programme can be contacted through the platform even when
// the casino itself publishes nothing.
const PLATFORMS = [
  ["Affilka", /affilka/i], ["Income Access", /incomeaccess|ib\.metricsdirect/i],
  ["MyAffiliates", /myaffiliates/i], ["NetRefer", /netrefer/i],
  ["PartnerMatrix", /partnermatrix/i], ["Smartico", /smartico/i],
  ["Cellxpert", /cellxpert/i], ["PostAffiliatePro", /postaffiliatepro/i],
  ["Trackier", /trackier/i], ["Voluum", /voluum/i], ["Scaleo", /scaleo/i],
  ["Affise", /affise/i], ["HasOffers", /hasoffers|tune\.com/i],
];

const JUNK =
  /\.(png|jpe?g|gif|svg|webp|css|js|woff2?)$|sentry|wixpress|example\.|@2x|placeholder|yourdomain|domain\.com|@sentry|\.min\./i;

// A partnerships address outranks a support desk: this pitch is a partnership,
// and support queues bin partnership mail.
const RANK = ["affiliate", "partner", "affiliates", "partners", "marketing", "b2b",
  "business", "media", "commercial", "press", "info", "hello", "contact", "support"];

function score(addr, domain) {
  const local = addr.split("@")[0].toLowerCase();
  const host = addr.split("@")[1].toLowerCase();
  let s = 0;
  const i = RANK.findIndex((p) => local.startsWith(p));
  if (i >= 0) s += (RANK.length - i) * 10;
  if (host.endsWith(domain) || domain.endsWith(host)) s += 60;
  return s;
}

const rows = readFileSync(new URL("prospects-live.csv", RESEARCH), "utf8").trim().split(/\r?\n/);
const di = rows[0].split(",").indexOf("domain");
const ei = rows[0].split(",").indexOf("contact_email");
const all = rows.slice(1).map((l) => {
  const p = l.split(",");
  return { domain: p[di], existing: p[ei] ?? "" };
}).filter((r) => r.domain && r.domain.includes("."));

const LIMIT = Number(process.argv[2] ?? all.length);
const CONC = Number(process.argv[3] ?? 8);
// prospects-live.csv sorts contactable rows first, so a plain head() sample is
// entirely sites that already have an address and reports a yield of zero new
// ones. ONLY_MISSING restricts the run to the rows this is meant to fix.
const candidatePool = process.env.ONLY_MISSING ? all.filter((r) => !r.existing) : all;
const targets = candidatePool.slice(0, LIMIT);
const proxyPool = loadProxyPool();
console.log(describePool(proxyPool));
console.log(`affiliate hunt over ${targets.length} sites, concurrency ${CONC}`);

const browser = await chromium.launch({ headless: true });
const results = [];
const queue = [...targets];
let done = 0;

async function hunt(rec) {
  const d = rec.domain;
  const out = { ...rec, affiliateEmail: "", affiliateUrl: "", platform: "", others: [] };
  const proxy = pickProxy(proxyPool, done);
  const ctx = await browser.newContext({
    userAgent: UA, locale: "en-GB", ignoreHTTPSErrors: true,
    extraHTTPHeaders: { "Accept-Language": "en-GB,en;q=0.9" },
    ...(proxy ? { proxy } : {}),
  });
  await ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => undefined }));
  await ctx.route("**/*", (r) => {
    const t = r.request().resourceType();
    return t === "image" || t === "font" || t === "media" ? r.abort() : r.continue();
  });
  const page = await ctx.newPage();
  // Some affiliate pages fire an age-gate alert(). Left unhandled it wedges the
  // page and throws a protocol error that kills the whole worker, not just the
  // one site — a single bad page took out a chunk of the sweep.
  page.on("dialog", (d) => d.dismiss().catch(() => {}));
  const found = new Map();
  const platforms = new Set();

  // An affiliate subdomain is as common as a path, and often the only route.
  const candidates = [...PATHS.map((p) => `https://${d}${p}`),
    `https://affiliates.${d}`, `https://partners.${d}`];

  for (const url of candidates) {
    try {
      const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      if (!resp || resp.status() >= 400) continue;
      await page.waitForTimeout(2500);
      const html = await page.content();
      const text = await page.evaluate(() => document.body?.innerText ?? "").catch(() => "");
      if (text.trim().length < 120) continue;
      // A soft 404 renders the homepage; require the page to talk about it.
      if (!/affiliat|partner|revenue ?share|commission/i.test(text)) continue;

      for (const [name, re] of PLATFORMS) if (re.test(html)) platforms.add(name);
      for (const m of html.match(EMAIL) ?? []) {
        const a = m.toLowerCase().replace(/^mailto:/, "").replace(/[.,;:'")<>]+$/, "");
        if (JUNK.test(a) || a.length > 70) continue;
        if (!found.has(a)) found.set(a, url);
      }
      if (found.size) { out.affiliateUrl = url; break; }
      if (!out.affiliateUrl) out.affiliateUrl = url;
    } catch {}
  }

  if (found.size) {
    const best = [...found.keys()].sort((a, b) => score(b, d) - score(a, d))[0];
    out.affiliateEmail = best;
    out.others = [...found.keys()].filter((a) => a !== best).slice(0, 3);
  }
  out.platform = [...platforms].join(", ");
  await ctx.close().catch(() => {});
  if (++done % 40 === 0) {
    const got = results.filter((r) => r.affiliateEmail).length;
    console.log(`  ${done}/${targets.length}  affiliate addresses: ${got}`);
  }
  return out;
}

await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const rec = queue.shift();
      // One unlucky site must not end its worker and silently shrink coverage.
      try {
        results.push(await hunt(rec));
      } catch (err) {
        results.push({ ...rec, affiliateEmail: "", affiliateUrl: "", platform: "", others: [],
          error: String(err.message).split("\n")[0].slice(0, 80) });
      }
    }
  }),
);
await browser.close();


// A limited run must never overwrite the full dataset. Both are written by the
// same line of code to the same fixed path, so a three-site smoke test used to
// silently destroy a 489-site sweep that took hours — which is exactly what
// happened. Partial runs now write beside the canonical file instead.
const isPartial = targets.length < all.length || Boolean(process.env.ONLY_MISSING);
const OUT_NAME = isPartial ? "affiliate-contacts.partial.json" : "affiliate-contacts.json";
if (isPartial) console.log(`Partial run (${targets.length} of ${ all.length }) -> ${OUT_NAME}; the full ${"affiliate-contacts"}.json is left alone.`);

writeFileSync(new URL(OUT_NAME, RESEARCH), JSON.stringify(results, null, 1), "utf8");

const withAff = results.filter((r) => r.affiliateEmail);
const newly = withAff.filter((r) => !r.existing);
const pages = results.filter((r) => r.affiliateUrl);
console.log(`\n=== affiliate hunt ===`);
console.log(`  sites with an affiliate/partner page : ${pages.length}`);
console.log(`  affiliate address found              : ${withAff.length}`);
console.log(`  of those, NEW (had no address before): ${newly.length}`);
console.log(`  had an address already               : ${results.filter((r) => r.existing).length}`);

const plat = new Map();
for (const r of results) for (const p of r.platform.split(", ").filter(Boolean)) plat.set(p, (plat.get(p) ?? 0) + 1);
if (plat.size) {
  console.log(`\n--- affiliate platforms ---`);
  for (const [p, n] of [...plat.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${p}`);
}
