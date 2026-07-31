/**
 * Raw traffic probe — answers one question: when we open what looks like a
 * game, do requests to a real provider ever appear at all?
 *
 * Deliberately dumps every third-party host with no classification, because
 * the point is to find out what is *there*, not to grade it. The signature
 * database can only be judged against a sample of real traffic.
 *
 * Usage: node probe.mjs domain [domain...]
 */
import { chromium } from "playwright";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Words that appear on a tile that opens a game, in the languages these sites
// actually ship. "demo" matters most — it is the only route in without an
// account.
const GAME_HINT =
  /\b(demo|play|slot|game|casino|spin|launch|try|fun)\b|\/games?\/|\/slots?\/|\/play\//i;

const domains = process.argv.slice(2);
if (!domains.length) {
  console.error("usage: node probe.mjs <domain> [more...]");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });

for (const domain of domains) {
  const hosts = new Map();
  const ctx = await browser.newContext({ userAgent: UA, locale: "en-GB", ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  page.on("request", (r) => {
    try {
      const h = new URL(r.url()).hostname.replace(/^www\./, "");
      hosts.set(h, (hosts.get(h) ?? 0) + 1);
    } catch {}
  });

  const line = { domain, status: "", tiles: 0, opened: 0, thirdParty: 0, note: "" };
  try {
    const resp = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 35000 });
    line.status = String(resp?.status() ?? 0);
    await page.waitForTimeout(4000);

    // The domain after redirects is the real identity of the site; comparing
    // against the requested domain is what mislabelled luckycoin's own host.
    const finalHost = new URL(page.url()).hostname.replace(/^www\./, "");

    const tiles = await page.evaluate((src) => {
      const re = new RegExp(src, "i");
      const out = [];
      for (const a of Array.from(document.querySelectorAll("a[href]")).slice(0, 500)) {
        const href = a.getAttribute("href") || "";
        const label = (a.textContent || "").trim().slice(0, 40);
        if (re.test(href) || re.test(label)) out.push({ href, label });
      }
      for (const f of Array.from(document.querySelectorAll("iframe[src]")))
        out.push({ href: f.getAttribute("src"), label: "iframe" });
      return out.slice(0, 25);
    }, GAME_HINT.source);
    line.tiles = tiles.length;

    for (const t of tiles.slice(0, 6)) {
      try {
        const url = new URL(t.href, page.url()).toString();
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
        await page.waitForTimeout(4500);
        line.opened++;
      } catch {}
    }

    const root = finalHost.split(".").slice(-2).join(".");
    const third = [...hosts.entries()]
      .filter(([h]) => !h.endsWith(root))
      .sort((a, b) => b[1] - a[1]);
    line.thirdParty = third.length;

    console.log(
      `\n=== ${domain}  HTTP ${line.status}  final=${finalHost}  tiles=${line.tiles} opened=${line.opened}`,
    );
    console.log(`    third-party hosts: ${third.length}`);
    for (const [h, n] of third.slice(0, 18)) console.log(`      ${String(n).padStart(4)}  ${h}`);
    if (!third.length) console.log("      (none — everything served from the operator's own domain)");
  } catch (err) {
    console.log(`\n=== ${domain}  FAILED: ${String(err.message).split("\n")[0].slice(0, 90)}`);
  } finally {
    await ctx.close().catch(() => {});
  }
}

await browser.close();
