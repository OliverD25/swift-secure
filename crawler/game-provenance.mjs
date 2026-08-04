/**
 * Game provenance probe — who actually serves the game.
 *
 * The market scan reads homepages, and homepages do not load games. Across 489
 * sites it found five provider hostnames in total, all of them aggregators.
 * That was a measurement of crawl depth, not of the casinos: a slot only loads
 * once someone opens it, inside an iframe, from a host the homepage never
 * touches.
 *
 * So this walks one step further — homepage, game tile, demo mode — and records
 * two things the homepage cannot show:
 *
 *   the frame tree     casino -> aggregator -> provider is an ordinary supply
 *                      chain. A tree that never leaves the casino's own domain
 *                      means the casino is serving the game itself.
 *   the request hosts   attributed to the frame that asked, so a provider host
 *                      loaded by an ad script does not get mistaken for the
 *                      game.
 *
 * WebSocket URLs are collected separately because modern slot clients settle
 * spins over a socket, and that socket's host is the one actually deciding
 * outcomes.
 *
 * This proves provenance, never fairness. "Served by the provider it claims"
 * is checkable from outside. "The spins are fair" is not, and must never be
 * inferred from a green result here.
 *
 * Usage: node game-provenance.mjs <domain> [domain...]
 * Writes to crawler/reports/game-provenance-probe.json — a scratch file, not a
 * research sweep, and deliberately not under research/.
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const REPORTS = new URL("./reports/", import.meta.url);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** Hosts that belong to a game supplier rather than to the casino. */
const PROVIDER =
  /pragmaticplay|netent|evolution|egcvi|playngo|play-?n-?go|redtiger|red-?tiger|hacksaw|nolimitcity|no-?limit-?city|pushgaming|push-?gaming|relaxgaming|relax-?gaming|microgaming|gamesglobal|games-?global|yggdrasil|betsoft|spinomenal|quickspin|thunderkick|elk-?studios|booongo|habanero|wazdan|playson|endorphina|amatic|isoftbet|gameart|bgaming|belatra|3oaks|mancala|onlyplay|turbogames|smartsoft|evoplay|kagaming|caleta|fugaso|tomhorn|apollo-?games|swintt|goldenrace|betgames|ezugi|vivogaming|vivo-?gaming|absolutelive|atmosfera|tvbet|lucky-?streak|luckystreak|authenticgaming|authentic-?gaming|pgsoft|pg-?soft|jili|fachai|cq9/i;

/** Platforms that legitimately resell many providers' games. */
const AGGREGATOR =
  /softswiss|everymatrix|slotegrator|relax-?solutions|silverbullet|pariplay|iforium|hub88|onetouch|groove|gamehub|sportradar|betconstruct|digitain|salsatech|tomhorngaming|nuxgame|slotsmarket|gamingcorps|whitehat|swintt|blueocean|gamzix/i;

const host = (u) => {
  try {
    return new URL(u).host;
  } catch {
    return null;
  }
};

const classify = (h) =>
  !h ? "unknown" : PROVIDER.test(h) ? "provider" : AGGREGATOR.test(h) ? "aggregator" : "other";

/**
 * Consent and age walls sit in front of every page on these sites.
 *
 * Cookie banners get the narrowest answer available — reject, or
 * necessary-only — never "accept all". Age gates get confirmed, because there
 * is no page at all behind them and the person running this is an adult; every
 * one that fires is recorded so the report says which sites needed it.
 */
async function clearGates(page, log) {
  const decline = [
    "button:has-text('Reject all')",
    "button:has-text('Reject')",
    "button:has-text('Decline')",
    "button:has-text('Only necessary')",
    "button:has-text('Necessary only')",
    "button:has-text('Essential only')",
    "#onetrust-reject-all-handler",
  ];
  const age = [
    "button:has-text('I am over 18')",
    "button:has-text('Over 18')",
    "button:has-text('18+')",
    "button:has-text('Yes, I am')",
    "button:has-text('Confirm')",
    "button:has-text('Enter')",
  ];
  for (const [kind, sels] of [
    ["cookies-declined", decline],
    ["age-confirmed", age],
  ]) {
    for (const sel of sels) {
      try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 800 })) {
          await el.click({ timeout: 2500 });
          log.push(kind + ": " + sel);
          await page.waitForTimeout(600);
          break;
        }
      } catch {
        /* selector absent or detached — try the next */
      }
    }
  }
}

/**
 * Follow the first thing that looks like a slot, then ask for demo mode.
 *
 * Lobbies are single-page apps. A game tile is almost never an <a href> — it is
 * a <div> with a click handler, so href-based selectors match nothing. A
 * synthetic MouseEvent does not work either; these routers ignore untrusted
 * events. Playwright's click is a real one, which is the whole reason the probe
 * runs here rather than in an injected script.
 */
async function openAGame(page, log) {
  const tile = [
    "a[href*='/game/']",
    "a[href*='/play/']",
    "[data-game-id]",
    "[class*='grid-item']",
    "[class*='game-card']",
    "[class*='gameCard']",
    "[class*='game-tile']",
    "[class*='gameItem']",
    "[class*='game-item']",
  ];
  for (const sel of tile) {
    try {
      const el = page.locator(sel).first();
      if (!(await el.isVisible({ timeout: 1200 }))) continue;
      await el.click({ timeout: 8000 });
      log.push("clicked tile: " + sel);
      await page.waitForLoadState("domcontentloaded", { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(4000);
      break;
    } catch {
      /* not this one */
    }
  }

  // A login wall here is itself the finding: the platform has no demo mode, so
  // provenance on it can only be checked from inside a real account.
  for (const sel of [
    "text=/sign in|log in|увійти|войти|giriş/i",
    "[class*='login']",
    "[class*='auth-modal']",
  ]) {
    try {
      if (await page.locator(sel).first().isVisible({ timeout: 700 })) {
        log.push("login prompt visible: " + sel);
        break;
      }
    } catch {
      /* absent */
    }
  }

  const demo = [
    "button:has-text('Demo')",
    "a:has-text('Demo')",
    "button:has-text('Play for fun')",
    "a:has-text('Play for fun')",
    "button:has-text('Free play')",
    "button:has-text('Fun mode')",
    "button:has-text('Демо')",
    "a:has-text('Демо')",
  ];
  let demoFound = false;
  for (const sel of demo) {
    try {
      const el = page.locator(sel).first();
      if (!(await el.isVisible({ timeout: 1200 }))) continue;
      await el.click({ timeout: 6000 });
      log.push("clicked demo: " + sel);
      demoFound = true;
      await page.waitForTimeout(4000);
      break;
    } catch {
      /* not this one */
    }
  }
  if (!demoFound) log.push("no demo control found");
}

/**
 * `target` is a bare domain, or a full URL. The URL form matters: several
 * platforms file games under the provider they claim — /games/pragmatic-play —
 * which hands us the claim to test, so the probe should be able to start there
 * instead of guessing its way through the lobby.
 */
async function probe(browser, target) {
  const domain = target.replace(/^https?:\/\//, "").split("/")[0];
  const startUrl = /^https?:\/\//.test(target) ? target : "https://" + target;
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: "en-GB",
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();

  // Attribute every request to the frame that made it. A provider host pulled
  // in by an analytics tag is not evidence about the game.
  const requests = new Map(); // host -> Set(frame url)
  const sockets = [];
  page.on("request", (r) => {
    const h = host(r.url());
    if (!h) return;
    let f = null;
    try {
      f = r.frame()?.url() ?? null;
    } catch {
      /* frame already detached */
    }
    if (!requests.has(h)) requests.set(h, new Set());
    requests.get(h).add(f);
  });
  page.on("websocket", (ws) => sockets.push(ws.url()));

  const log = [];
  const out = { domain, startUrl, ok: false, log, frames: [], hosts: [], sockets: [], error: null };

  try {
    await page.goto(startUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    await clearGates(page, log);
    await openAGame(page, log);
    // Slot clients are heavy and load their assets late.
    await page.waitForTimeout(12000);

    out.frames = page.frames().map((f) => {
      const h = host(f.url());
      return {
        host: h,
        depth: (function depth(fr, n = 0) {
          const p = fr.parentFrame();
          return p ? depth(p, n + 1) : n;
        })(f),
        kind: classify(h),
      };
    });
    out.hosts = [...requests.entries()]
      .map(([h, frames]) => ({ host: h, kind: classify(h), frames: [...frames].filter(Boolean).length }))
      .sort((a, b) => a.host.localeCompare(b.host));
    out.sockets = sockets.map((u) => ({ url: u.split("?")[0], host: host(u), kind: classify(host(u)) }));
    out.finalUrl = page.url();
    out.ok = true;
  } catch (e) {
    out.error = String(e).split("\n")[0].slice(0, 200);
  } finally {
    await ctx.close().catch(() => {});
  }
  return out;
}

const domains = process.argv.slice(2);
if (!domains.length) {
  console.error("usage: node game-provenance.mjs <domain> [domain...]");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const d of domains) {
  process.stderr.write("probing " + d + " ... ");
  const r = await probe(browser, d);
  results.push(r);
  const prov = r.hosts.filter((h) => h.kind === "provider").length;
  const agg = r.hosts.filter((h) => h.kind === "aggregator").length;
  process.stderr.write(
    (r.ok ? "ok" : "FAILED " + r.error) + "  frames=" + r.frames.length + " provider=" + prov + " aggregator=" + agg + "\n",
  );
}
await browser.close();

mkdirSync(REPORTS, { recursive: true });
const path = new URL("game-provenance-probe.json", REPORTS);
writeFileSync(path, JSON.stringify(results, null, 1));
console.log("\nwritten: " + path.pathname);
