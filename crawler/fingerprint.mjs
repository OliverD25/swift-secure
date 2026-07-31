/**
 * Platform fingerprinting from the homepage alone.
 *
 * The game-launch approach assumed we could open a game. On SPA casinos we
 * cannot: tiles are divs with click handlers, and most games need an account.
 * But a casino's homepage already loads its platform's infrastructure, so the
 * B2B relationship is visible without opening anything.
 *
 * A host appearing across many *independent* operators is shared infrastructure
 * — a platform, aggregator, or seal vendor. A host appearing once is that
 * operator's own stack. Cross-site frequency is the whole signal.
 *
 * Usage: node fingerprint.mjs <domain> [more...]
 */
import { chromium } from "playwright";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Analytics and ad tech are on every site on the internet and say nothing
// about who supplies the games.
const NOISE =
  /google|doubleclick|facebook|fbcdn|hotjar|onesignal|intercom|cloudflareinsights|sentry\.io|customer\.io|gstatic|jquery|bootstrapcdn|cookiebot|usercentrics|zendesk|livechat|tawk|crisp|gist\.build|clarity\.ms|yandex|tiktok|snapchat|bing|criteo|mymetricpath|twitter|linkedin/i;

const domains = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
const perSite = new Map();

for (const domain of domains) {
  const hosts = new Set();
  const ctx = await browser.newContext({ userAgent: UA, locale: "en-GB", ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  page.on("request", (r) => {
    try {
      hosts.add(new URL(r.url()).hostname.replace(/^www\./, ""));
    } catch {}
  });
  try {
    await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(5000);
    // Scroll: game grids and footers are lazy-loaded on almost every casino.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});
    await page.waitForTimeout(3000);
    const finalRoot = new URL(page.url()).hostname.replace(/^www\./, "").split(".").slice(-2).join(".");
    const third = [...hosts].filter((h) => !h.endsWith(finalRoot) && !NOISE.test(h) && h.includes("."));
    perSite.set(domain, third);
    console.log(`  ${domain.padEnd(28)} ${String(third.length).padStart(3)} candidate hosts`);
  } catch (err) {
    console.log(`  ${domain.padEnd(28)} FAILED ${String(err.message).split("\n")[0].slice(0, 50)}`);
    perSite.set(domain, []);
  } finally {
    await ctx.close().catch(() => {});
  }
}
await browser.close();

// Count how many distinct operators each host appears on.
const freq = new Map();
for (const [site, hosts] of perSite)
  for (const h of new Set(hosts)) {
    if (!freq.has(h)) freq.set(h, new Set());
    freq.get(h).add(site);
  }

const shared = [...freq.entries()]
  .map(([h, sites]) => ({ host: h, n: sites.size, sites: [...sites] }))
  .filter((r) => r.n > 1)
  .sort((a, b) => b.n - a.n);

const scanned = [...perSite.values()].filter((v) => v.length).length;
console.log(`\n=== shared infrastructure (${scanned}/${domains.length} sites returned data) ===`);
if (!shared.length) console.log("  none — no host appeared on more than one operator");
for (const r of shared) console.log(`  ${String(r.n).padStart(2)} sites  ${r.host.padEnd(42)} ${r.sites.slice(0, 4).join(", ")}`);
