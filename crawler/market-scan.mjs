/**
 * Market scan across the live prospect list.
 *
 * Records every third-party host each casino loads, then classifies the ones
 * we care about commercially:
 *
 *   seal      — a trust/certification widget they already pay for
 *   platform  — shared infrastructure that links operators to each other
 *   unbranded — throwaway CDN domains carrying game content
 *
 * Cross-site frequency is what makes this work: a host on one site is that
 * operator's stack, a host on twenty is an industry supplier.
 *
 * Usage: node market-scan.mjs [limit] [concurrency]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

// Resolve against this file, not the shell's working directory: the scripts are
// run from the repo root as often as from crawler/, and a relative path that
// depends on where you happened to be standing fails on the other machine.
const RESEARCH = new URL("../research/", import.meta.url);


const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const SEAL =
  /dlagglobal|ecogra|itechlabs|gaminglabs|gli-?tech|bmm-?testlabs|quinel|trisigma|gamcare|gambleaware|responsiblegambling|askgamblers|trustpilot|sitejabber|dmca|mga\.org\.mt|cert\.cga\.cw|gaming-?curacao|anjouangaming|antillephone|validator|verify-?seal|seals?\./i;

const UNBRANDED =
  /^[a-z0-9]{6,}\.(dev|xyz|top|cc|site|online|services|click|shop)$|contentdeliverynetwork|cdn[0-9]+\./i;

const NOISE =
  /google|doubleclick|facebook|fbcdn|hotjar|onesignal|intercom|cloudflareinsights|sentry\.io|customer\.io|gstatic|jsdelivr|jquery|bootstrapcdn|cookiebot|usercentrics|zendesk|livechatinc|tawk|crisp|gist\.build|clarity\.ms|yandex|tiktok|snapchat|bing|criteo|twitter|linkedin|contentsquare|talk-me|cloudflare\.com|unpkg|fontawesome|typekit|recaptcha/i;

const rows = readFileSync(new URL("prospects-live.csv", RESEARCH), "utf8").trim().split(/\r?\n/);
const head = rows[0].split(",");
const di = head.indexOf("domain");
const oi = head.indexOf("operator");
const all = rows.slice(1).map((l) => {
  // Values may be quoted; a simple split is enough for the two columns used.
  const p = l.split(",");
  return { domain: p[di], operator: p[oi] ?? "" };
}).filter((r) => r.domain && r.domain.includes("."));

const LIMIT = Number(process.argv[2] ?? all.length);
const CONC = Number(process.argv[3] ?? 8);
const targets = all.slice(0, LIMIT);
console.log(`scanning ${targets.length} sites, concurrency ${CONC}`);

const browser = await chromium.launch({ headless: true });
const results = [];
let done = 0;

async function scan(rec) {
  const hosts = new Set();
  const ctx = await browser.newContext({ userAgent: UA, locale: "en-GB", ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  // Images and fonts are most of the bytes and none of the signal.
  await ctx.route("**/*", (r) => {
    const t = r.request().resourceType();
    return t === "image" || t === "font" || t === "media" ? r.abort() : r.continue();
  });
  page.on("request", (r) => {
    try { hosts.add(new URL(r.url()).hostname.replace(/^www\./, "")); } catch {}
  });
  const out = { ...rec, ok: false, seals: [], unbranded: [], third: [] };
  try {
    await page.goto(`https://${rec.domain}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(4500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});
    await page.waitForTimeout(3000);
    const root = new URL(page.url()).hostname.replace(/^www\./, "").split(".").slice(-2).join(".");
    const third = [...hosts].filter((h) => h && !h.endsWith(root) && !h.endsWith(rec.domain));
    out.ok = true;
    out.seals = third.filter((h) => SEAL.test(h));
    out.unbranded = third.filter((h) => UNBRANDED.test(h) && !NOISE.test(h));
    out.third = third.filter((h) => !NOISE.test(h));
  } catch {}
  await ctx.close().catch(() => {});
  done++;
  if (done % 25 === 0) console.log(`  ${done}/${targets.length}  ok=${results.filter((r) => r.ok).length}`);
  return out;
}

const queue = [...targets];
await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const rec = queue.shift();
      results.push(await scan(rec));
    }
  }),
);
await browser.close();


// A limited run must never overwrite the full dataset. Both are written by the
// same line of code to the same fixed path, so a three-site smoke test used to
// silently destroy a 489-site sweep that took hours — which is exactly what
// happened. Partial runs now write beside the canonical file instead.
const isPartial = targets.length < all.length;
const OUT_NAME = isPartial ? "market-scan.partial.json" : "market-scan.json";
if (isPartial) console.log(`Partial run (${targets.length} of ${ all.length }) -> ${OUT_NAME}; the full ${"market-scan"}.json is left alone.`);

writeFileSync(new URL(OUT_NAME, RESEARCH), JSON.stringify(results, null, 1), "utf8");

const ok = results.filter((r) => r.ok);
const freq = new Map();
for (const r of ok)
  for (const h of new Set(r.third)) {
    if (!freq.has(h)) freq.set(h, new Set());
    freq.get(h).add(r.domain);
  }
const shared = [...freq.entries()].map(([h, s]) => ({ host: h, n: s.size })).filter((x) => x.n >= 3).sort((a, b) => b.n - a.n);

const withSeal = ok.filter((r) => r.seals.length);
console.log(`\n=== scanned ok: ${ok.length}/${results.length} ===`);
console.log(`already running a seal/trust widget: ${withSeal.length}`);
console.log(`serving via unbranded CDN: ${ok.filter((r) => r.unbranded.length).length}`);
console.log(`no third-party trust signal at all: ${ok.filter((r) => !r.seals.length).length}`);

console.log(`\n--- seal vendors by reach ---`);
const sealFreq = new Map();
for (const r of withSeal)
  for (const h of new Set(r.seals)) {
    const key = h.split(".").slice(-2).join(".");
    sealFreq.set(key, (sealFreq.get(key) ?? 0) + 1);
  }
for (const [h, n] of [...sealFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15))
  console.log(`  ${String(n).padStart(3)} sites  ${h}`);

console.log(`\n--- shared infrastructure (3+ operators) ---`);
for (const s of shared.slice(0, 25)) console.log(`  ${String(s.n).padStart(3)} sites  ${s.host}`);
