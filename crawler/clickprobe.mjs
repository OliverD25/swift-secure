/**
 * The decisive test: click a game tile the way a player does, and see whether
 * any provider host appears.
 *
 * Link-scraping fails on SPA casinos because tiles are divs with click
 * handlers. This clicks whatever looks like a game tile and watches what the
 * page loads afterwards — including inside iframes, which is where a game
 * engine normally lives.
 *
 * Usage: node clickprobe.mjs <domain> [more...]
 */
import { chromium } from "playwright";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const KNOWN_PROVIDER =
  /pragmatic|evolution|netent|playngo|play-?n-?go|microgaming|quickspin|yggdrasil|redtiger|nolimit|hacksaw|push-?gaming|relax-?gaming|betsoft|habanero|endorphina|booongo|amatic|novomatic|wazdan|elk-?studios|thunderkick|bgaming|spinomenal|playson|3oaks|gamzix|mancala|softswiss|slotegrator|hub88|everymatrix|pariplay|groove|salsa|tomhorn|onlyplay|turbogames|smartsoft|evoplay/i;

const domains = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });

for (const domain of domains) {
  const hosts = new Map();
  const ctx = await browser.newContext({ userAgent: UA, locale: "en-GB", ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const note = (u) => {
    try {
      const h = new URL(u).hostname.replace(/^www\./, "");
      hosts.set(h, (hosts.get(h) ?? 0) + 1);
    } catch {}
  };
  page.on("request", (r) => note(r.url()));
  // A game engine usually lives in an iframe on a different origin, so frame
  // navigations are the signal that matters most here.
  page.on("frameattached", (f) => note(f.url()));
  page.on("framenavigated", (f) => note(f.url()));

  let clicked = 0;
  let landed = "";
  try {
    await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2)).catch(() => {});
    await page.waitForTimeout(2500);

    // Try the conventional game-listing routes first; a grid there is far more
    // likely to be real games than anything on a marketing homepage.
    for (const path of ["/games", "/slots", "/casino", "/game", ""]) {
      try {
        await page.goto(`https://${domain}${path}`, { waitUntil: "domcontentloaded", timeout: 20000 });
        await page.waitForTimeout(3500);
        await page.evaluate(() => window.scrollTo(0, 1200)).catch(() => {});
        await page.waitForTimeout(2000);
        const n = await page.evaluate(() => {
          const sel = '[class*="game" i],[class*="slot" i],[data-game],[class*="tile" i],[class*="card" i]';
          return document.querySelectorAll(sel).length;
        });
        if (n > 8) { landed = path || "/"; break; }
      } catch {}
    }

    for (let i = 0; i < 4; i++) {
      try {
        const el = page.locator('[class*="game" i],[class*="slot" i],[data-game],[class*="tile" i]').nth(i);
        if (!(await el.count())) break;
        await el.click({ timeout: 6000, force: true });
        clicked++;
        await page.waitForTimeout(5000);
      } catch {}
    }
  } catch (err) {
    console.log(`\n=== ${domain}  FAILED ${String(err.message).split("\n")[0].slice(0, 70)}`);
    await ctx.close().catch(() => {});
    continue;
  }

  const root = domain.split(".").slice(-2).join(".");
  const third = [...hosts.entries()].filter(([h]) => h && !h.endsWith(root)).sort((a, b) => b[1] - a[1]);
  const providers = third.filter(([h]) => KNOWN_PROVIDER.test(h));

  console.log(`\n=== ${domain}   grid at "${landed || "not found"}"   tiles clicked: ${clicked}`);
  console.log(`    PROVIDER HOSTS: ${providers.length ? providers.map(([h, n]) => `${h}(${n})`).join(", ") : "NONE"}`);
  console.log(`    other third-party: ${third.length - providers.length}`);
  for (const [h, n] of third.filter(([h]) => !KNOWN_PROVIDER.test(h)).slice(0, 8))
    console.log(`      ${String(n).padStart(4)}  ${h}`);
  await ctx.close().catch(() => {});
}

await browser.close();
