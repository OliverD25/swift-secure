/**
 * Read every trust signal a casino displays, including self-hosted ones.
 *
 * The network sweep only saw third-party hosts, so a seal image saved to the
 * operator's own server was invisible — which is how most badges are actually
 * deployed. This reads the rendered DOM instead: image sources, alt text,
 * classes, and the links wrapped around them, same-origin included.
 *
 * Footers are walls of logos, so a single "is there a seal" regex would match
 * payment cards and provider logos too. Everything is therefore classified,
 * which also recovers something the traffic analysis could not reach: the
 * provider logos a casino *claims*, whatever its CDN actually serves.
 *
 * Usage: node trust-signals.mjs <domain> [more...]     (add --json to dump)
 */
import { chromium } from "playwright";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Ordered: first match wins, so the specific categories must precede the loose
// ones. "licence" would otherwise swallow half of "certification".
// Short tokens carry \b on BOTH sides. Without it "interac" matches inside
// "EGTInteractive" and files a game studio as a payment method — which it did.
export const CATEGORIES = [
  ["certification", /ecogra|itech ?labs|itechlabs|gaming ?labs|\bgli\b|bmm ?test|quinel|trisigma|\btst\b|rng ?(certified|tested|audit)|certified ?fair|provably ?fair|\bdlag|licenseseal|gamecheck|verified ?by|\baudited\b/i],
  ["regulator", /anjouan|cura[cç]ao|antillephone|gaming ?curacao|\bcgcb\b|certcga|kahnawake|malta ?gaming|\bmga\b|tobique|isle ?of ?man|\bukgc\b|gambling ?commission|licen[cs]e ?(no|number)|licensed ?by/i],
  ["responsible", /gamble ?aware|begambleaware|gamcare|gamstop|gordon ?moody|responsible ?gambl|\b18\+|\b21\+|gamblers ?anonymous|gamban|self ?exclusion/i],
  ["review", /trustpilot|askgamblers|casino ?guru|sitejabber|\blcb\b|thepogg/i],
  ["provider", /pragmatic|evolution ?gaming|netent|play'?n ?go|playngo|microgaming|quickspin|yggdrasil|red ?tiger|nolimit|hacksaw|push ?gaming|relax ?gaming|betsoft|habanero|endorphina|booongo|amatic|novomatic|wazdan|elk ?studios|thunderkick|bgaming|spinomenal|playson|3 ?oaks|gamzix|mancala|pariplay|tom ?horn|onlyplay|evoplay|belatra|platipus|kalamba|swintt|fugaso|betgames|ezugi|vivo ?gaming|authentic ?gaming|\begt\b|egt ?interactive/i],
  ["payment", /\bvisa\b|mastercard|maestro|skrill|neteller|paysafe|\bjeton\b|mifinity|\binterac\b|trustly|zimpler|revolut|apple ?pay|google ?pay|bitcoin|ethereum|\busdt\b|tether|litecoin|dogecoin|\btron\b|binance/i],
  ["security", /\bssl\b|norton|mcafee|digicert|sectigo|comodo|\bdmca\b|cloudflare ?protect/i],
];

// The commercial question is narrower than "has a trust signal". A regulator
// seal ships free with the licence, responsible-gambling logos are compliance,
// and "Provably Fair" is a self-claim. Only these are a badge somebody sold
// them — the product we would actually be competing with.
const PAID_VENDOR =
  /dlagglobal|licenseseal|gamecheck|ecogra|itech ?labs|itechlabs|gaming ?labs|\bgli\b|bmm ?test|quinel|trisigma|askgamblers|trustpilot|sitejabber|casino ?guru/i;

function classify(text) {
  if (!text) return null;
  for (const [name, re] of CATEGORIES) if (re.test(text)) return name;
  return null;
}

function paidVendor(text) {
  const m = text?.match(PAID_VENDOR);
  return m ? m[0].toLowerCase().replace(/\s+/g, "") : null;
}

// Counting category matches answers "how much provider markup is on this page",
// which is not a fact about the casino — one operator produced 409. What is
// worth stating is how many *distinct studios* they list, so the names are
// captured individually.
const PROVIDER_NAMES = [
  ["Pragmatic Play", /pragmatic/i], ["Evolution", /evolution ?gaming|\bevolution\b/i],
  ["NetEnt", /netent/i], ["Play'n GO", /play'?n ?go|playngo/i], ["Microgaming", /microgaming/i],
  ["Quickspin", /quickspin/i], ["Yggdrasil", /yggdrasil/i], ["Red Tiger", /red ?tiger/i],
  ["Nolimit City", /nolimit/i], ["Hacksaw", /hacksaw/i], ["Push Gaming", /push ?gaming/i],
  ["Relax Gaming", /relax ?gaming/i], ["Betsoft", /betsoft/i], ["Habanero", /habanero/i],
  ["Endorphina", /endorphina/i], ["Booongo", /booongo/i], ["Amatic", /amatic/i],
  ["Novomatic", /novomatic/i], ["Wazdan", /wazdan/i], ["ELK Studios", /elk ?studios/i],
  ["Thunderkick", /thunderkick/i], ["BGaming", /bgaming/i], ["Spinomenal", /spinomenal/i],
  ["Playson", /playson/i], ["3 Oaks", /3 ?oaks/i], ["Gamzix", /gamzix/i],
  ["Mancala", /mancala/i], ["Pariplay", /pariplay/i], ["Tom Horn", /tom ?horn/i],
  ["OnlyPlay", /onlyplay/i], ["Evoplay", /evoplay/i], ["Belatra", /belatra/i],
  ["Platipus", /platipus/i], ["Kalamba", /kalamba/i], ["Swintt", /swintt/i],
  ["Fugaso", /fugaso/i], ["BetGames", /betgames/i], ["Ezugi", /ezugi/i],
  ["Vivo Gaming", /vivo ?gaming/i], ["Authentic Gaming", /authentic ?gaming/i],
  ["EGT", /\begt\b|egt ?interactive|egt ?digital/i],
];

function providerNames(text) {
  const hits = [];
  for (const [name, re] of PROVIDER_NAMES) if (re.test(text)) hits.push(name);
  return hits;
}

// Seal vendors that render inside an iframe leave nothing in the parent DOM.
// spinsamurai loads dlagglobal this way, and a DOM-only pass reported it as
// having no trust signals at all — so the network layer stays in play.
const VENDOR_HOST =
  /dlagglobal|licenseseal|gamecheck\.cloud|ecogra|itechlabs|gaminglabs|bmm-?testlabs|quinel|trisigma|askgamblers|trustpilot|gamcare|gambleaware|cert\.cga\.cw|certcga|cgcb\.info|anjouangaming|antillephone|gaming-?curacao/i;

/**
 * Browser identity that matches itself.
 *
 * Most refusals here are bot detection rather than geography, and the cheapest
 * tell is a context that contradicts itself: a UK locale on a German IP, a UTC
 * clock, no `Accept-Language`, and `navigator.webdriver` set true. Passing a
 * region makes the locale, timezone and headers agree with the exit IP.
 */
const REGIONS = {
  uk: { locale: "en-GB", timezoneId: "Europe/London", lang: "en-GB,en;q=0.9" },
  de: { locale: "de-DE", timezoneId: "Europe/Berlin", lang: "de-DE,de;q=0.9,en;q=0.8" },
  ca: { locale: "en-CA", timezoneId: "America/Toronto", lang: "en-CA,en;q=0.9" },
  tr: { locale: "tr-TR", timezoneId: "Europe/Istanbul", lang: "tr-TR,tr;q=0.9,en;q=0.8" },
};

export async function readTrustSignals(browser, domain, opts = {}) {
  const region = REGIONS[opts.region] ?? REGIONS.uk;
  const out = { domain, ok: false, blocked: false, error: "", signals: {}, samples: {}, vendorHosts: [], paidVendors: [], providerNames: [], region: opts.region ?? "uk" };
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: region.locale,
    timezoneId: region.timezoneId,
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { "Accept-Language": region.lang },
  });
  // Playwright leaves navigator.webdriver true and no plugins array, both of
  // which are checked by the off-the-shelf detection these sites deploy.
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    Object.defineProperty(navigator, "plugins", { get: () => [1, 2, 3, 4, 5] });
    // eslint-disable-next-line no-undef
    window.chrome = window.chrome ?? { runtime: {} };
  });
  const page = await ctx.newPage();
  const vendorHosts = new Set();
  const noteUrl = (u) => {
    try {
      const h = new URL(u).hostname.replace(/^www\./, "");
      if (VENDOR_HOST.test(h)) vendorHosts.add(h);
    } catch {}
  };
  page.on("request", (r) => noteUrl(r.url()));
  page.on("framenavigated", (f) => noteUrl(f.url()));
  // Images must load as DOM nodes, but their bytes are irrelevant — the signal
  // is in the src string and the alt text.
  await ctx.route("**/*", (r) => {
    const t = r.request().resourceType();
    return t === "font" || t === "media" ? r.abort() : r.continue();
  });
  try {
    const response = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const status = response?.status() ?? 0;
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});

    // Seal widgets are iframes below the fold and load last, so settle before
    // reading. Capped, because a site that polls forever would stall the sweep.
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(2500);

    // A blocked page must not be reported as a page with no trust signals.
    // spinsamurai serves the homelab a "Forbidden page" and the badge sometimes
    // races through before the block lands — that produced results alternating
    // between "has a seal" and "has nothing" on the same site. Counting a block
    // as an absence is the same error as reading "not in the register" as "not
    // licensed": we did not look, so we know nothing.
    // Judge by HTTP status and the page title only. Matching loose words against
    // body text flagged LevelUp, WG Casino and Lucky Spy as blocked when they had
    // loaded perfectly well — a live casino page mentions "blocked" or "403"
    // somewhere often enough. False blocks are not harmless: they leave the
    // denominator, which inflates every percentage computed from it.
    const pageTitle = (await page.title().catch(() => "")).trim();
    const bodyText = await page.evaluate(() => document.body?.innerText ?? "").catch(() => "");
    const titleBlocked =
      /forbidden|access denied|^403|\b403\b|attention required|just a moment|checking your browser|cloudflare access|temporary auth|not available in your (country|region)/i.test(
        pageTitle,
      );
    if (status >= 400 || titleBlocked) {
      out.blocked = true;
      out.error = `HTTP ${status || "?"} — ${pageTitle.slice(0, 60) || "no title"}`;
      return out;
    }
    // Nothing rendered at all: not a block, but nothing to read either.
    if (bodyText.trim().length < 120) {
      out.blocked = true;
      out.error = `page rendered empty (HTTP ${status})`;
      return out;
    }

    const raw = await page.evaluate(() => {
      const items = [];
      for (const el of Array.from(document.querySelectorAll("img,svg use,a,[class*='seal' i],[class*='badge' i],[class*='licen' i]")).slice(0, 1200)) {
        const parts = [];
        for (const attr of ["src", "alt", "title", "href", "class", "data-src", "aria-label", "xlink:href"]) {
          const v = el.getAttribute?.(attr);
          if (v) parts.push(v);
        }
        // Only short text: a whole footer paragraph would match everything.
        const t = (el.textContent || "").trim();
        if (t && t.length < 60) parts.push(t);
        if (parts.length) items.push(parts.join(" | ").slice(0, 300));
      }
      return items;
    });

    const found = {};
    const samples = {};
    const vendors = new Set();
    const providers = new Set();
    for (const item of raw) {
      const v = paidVendor(item);
      if (v) vendors.add(v);
      for (const p of providerNames(item)) providers.add(p);
      const cat = classify(item);
      if (!cat) continue;
      found[cat] = (found[cat] ?? 0) + 1;
      (samples[cat] ??= []).push(item.slice(0, 90));
    }
    for (const h of vendorHosts) {
      const v = paidVendor(h);
      if (v) vendors.add(v);
    }
    out.paidVendors = [...vendors];
    out.providerNames = [...providers].sort();
    // Merge the network finding in: an iframe seal counts even though the DOM
    // pass cannot see it.
    out.vendorHosts = [...vendorHosts];
    for (const h of vendorHosts) {
      const cat = classify(h) ?? "certification";
      found[cat] = (found[cat] ?? 0) + 1;
      (samples[cat] ??= []).push(`[iframe/network] ${h}`);
    }

    for (const k of Object.keys(samples)) samples[k] = [...new Set(samples[k])].slice(0, 4);
    out.ok = true;
    out.signals = found;
    out.samples = samples;
  } catch (err) {
    out.error = String(err.message).split("\n")[0].slice(0, 80);
  } finally {
    await ctx.close().catch(() => {});
  }
  return out;
}

// CLI
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}` || process.argv[1]?.endsWith("trust-signals.mjs")) {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const domains = args.filter((a) => !a.startsWith("--"));
  const browser = await chromium.launch({ headless: true });
  const all = [];
  for (const d of domains) {
    const r = await readTrustSignals(browser, d);
    all.push(r);
    if (asJson) continue;
    console.log(`\n=== ${d} ${r.ok ? "" : "FAILED " + r.error}`);
    if (!r.ok) continue;
    for (const [k, v] of Object.entries(r.signals).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${k.padEnd(14)} x${String(v).padStart(3)}   ${(r.samples[k] ?? []).slice(0, 2).join("  ::  ")}`);
    }
    if (!Object.keys(r.signals).length) console.log("  (no trust signals detected)");
  }
  if (asJson) console.log(JSON.stringify(all, null, 1));
  await browser.close();
}
