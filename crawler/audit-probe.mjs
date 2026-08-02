/**
 * Exploratory probe: what else is measurable from a casino's own page?
 *
 * Deliberately over-collects. The point is to find out which signals actually
 * produce findings on real sites, so the ones that turn out to be empty or
 * unreliable can be dropped before anything is promised to an operator.
 *
 * Grouped by why an operator would care:
 *   money  — performance, because slow pages lose deposits
 *   legal  — consent handling and where player data goes before opt-in
 *   licence— responsible-gambling obligations most licences require
 *   craft  — SEO and hygiene, cheap to check and easy to act on
 *
 * Usage: node audit-probe.mjs <domain> [more...]
 */
import { chromium } from "playwright";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// Trackers that set identifiers. Firing these before consent is the specific
// thing EU regulators fine, so they are counted separately from ordinary
// third-party hosts.
const TRACKER =
  /google-analytics|googletagmanager|doubleclick|facebook\.net|facebook\.com\/tr|fbevents|hotjar|clarity\.ms|yandex|tiktok|snapchat|criteo|taboola|outbrain|mixpanel|amplitude|segment|contentsquare|mouseflow|fullstory|smartlook|luckyorange/i;

const CONSENT_UI =
  /cookiebot|usercentrics|onetrust|cookieyes|termly|iubenda|quantcast|didomi|klaro|cookie-?consent|cookie-?banner|gdpr/i;

export async function audit(browser, domain) {
  const out = { domain, ok: false, error: "" };
  const ctx = await browser.newContext({
    userAgent: UA,
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { "Accept-Language": "de-DE,de;q=0.9,en;q=0.8" },
  });
  await ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => undefined }));

  const page = await ctx.newPage();
  page.on("dialog", (d) => d.dismiss().catch(() => {}));

  const requests = [];
  const consoleErrors = [];
  const failed = [];
  let bytes = 0;

  page.on("request", (r) => {
    try {
      requests.push({ url: r.url(), host: new URL(r.url()).hostname, type: r.resourceType(), t: Date.now() });
    } catch {}
  });
  page.on("response", async (r) => {
    try {
      const len = Number(r.headers()["content-length"] ?? 0);
      bytes += len;
      // Keep the whole URL, query included. Storing only the pathname made
      // findings unreproducible: /_next/image without its ?url= parameters is a
      // legitimate 400, so an operator handed that path would rightly dismiss
      // it. A finding we cannot hand over verbatim is not a finding.
      if (r.status() >= 400) failed.push({ status: r.status(), url: r.url(), type: r.resourceType() });
    } catch {}
  });
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 100)); });
  page.on("pageerror", (e) => consoleErrors.push(String(e.message).slice(0, 100)));

  const t0 = Date.now();
  try {
    const resp = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 35000 });
    out.status = resp?.status() ?? 0;
    out.securityHeaders = {};
    const h = resp?.headers() ?? {};
    for (const k of ["strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy"])
      out.securityHeaders[k] = !!h[k];

    out.domContentLoaded = Date.now() - t0;
    await page.waitForTimeout(6000);
    out.settled = Date.now() - t0;

    const title = (await page.title().catch(() => "")).trim();
    if (out.status >= 400 || /forbidden|403|access denied|just a moment/i.test(title)) {
      out.error = `blocked (${out.status} ${title.slice(0, 40)})`;
      await ctx.close().catch(() => {});
      return out;
    }

    // --- money: weight and chattiness -----------------------------------
    out.requestCount = requests.length;
    out.transferKB = Math.round(bytes / 1024);
    out.thirdPartyHosts = [...new Set(requests.map((r) => r.host).filter((hst) => {
      const root = domain.split(".").slice(-2).join(".");
      return hst && !hst.endsWith(root);
    }))].length;

    // --- legal: did trackers fire before any consent was given? ---------
    // Nothing was clicked, so any tracker request here happened without the
    // visitor agreeing to anything.
    const trackersBefore = [...new Set(requests.filter((r) => TRACKER.test(r.url)).map((r) => r.host))];
    out.trackersBeforeConsent = trackersBefore;
    out.hasConsentUI = await page.evaluate((src) => {
      const re = new RegExp(src, "i");
      if (re.test(document.documentElement.outerHTML.slice(0, 200000))) return true;
      return [...document.querySelectorAll("div,section,aside")].some((e) => {
        const t = (e.textContent || "").slice(0, 200);
        return /cookie/i.test(t) && /(accept|agree|allow|zustimmen|akzeptieren)/i.test(t);
      });
    }, CONSENT_UI.source).catch(() => false);

    // --- licence: responsible-gambling obligations ----------------------
    const rg = await page.evaluate(() => {
      const text = document.body?.innerText ?? "";
      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href") + " " + a.textContent).join(" ");
      const blob = text + " " + links;
      return {
        ageNotice: /\b18\+|\b21\+|18 years|volljährig/i.test(blob),
        selfExclusion: /self[- ]exclusion|selbstausschluss|self[- ]exclude/i.test(blob),
        depositLimit: /deposit limit|einzahlungslimit|limit your deposit/i.test(blob),
        helpOrg: /gamcare|begambleaware|gamblers anonymous|gambling therapy|spielsucht|bzga/i.test(blob),
        rgPage: /responsible[- ]gam|verantwortungsvoll/i.test(blob),
      };
    }).catch(() => ({}));
    out.responsibleGambling = rg;

    // --- licence: are terms reachable at all? ---------------------------
    out.legalPages = await page.evaluate(() => {
      const has = (re) => [...document.querySelectorAll("a[href]")].some((a) => re.test(a.getAttribute("href") + " " + a.textContent));
      return {
        terms: has(/terms|agb|conditions/i),
        privacy: has(/privacy|datenschutz/i),
        aml: has(/\baml\b|anti-money|know your customer|\bkyc\b/i),
        bonusTerms: has(/bonus (terms|rules|conditions)/i),
      };
    }).catch(() => ({}));

    // --- craft: SEO basics ----------------------------------------------
    out.seo = await page.evaluate(() => ({
      title: (document.title || "").length,
      metaDescription: document.querySelector('meta[name="description"]')?.content?.length ?? 0,
      h1Count: document.querySelectorAll("h1").length,
      canonical: !!document.querySelector('link[rel="canonical"]'),
      hreflang: document.querySelectorAll("link[hreflang]").length,
      structuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
      ogImage: !!document.querySelector('meta[property="og:image"]'),
      imagesNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.getAttribute("alt")).length,
    })).catch(() => ({}));

    // --- craft: things that are simply broken ---------------------------
    out.brokenRequests = failed.length;
    out.brokenSample = failed.slice(0, 6);
    // Group by the failing directory so "38 broken payment icons" reads as one
    // fixable problem rather than 38 unrelated errors.
    const groups = {};
    for (const f of failed) {
      try {
        const dir = new URL(f.url).pathname.split("/").slice(0, -1).join("/") || "/";
        groups[dir] = (groups[dir] ?? 0) + 1;
      } catch {}
    }
    out.brokenGroups = Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 4);
    out.consoleErrors = consoleErrors.length;
    out.consoleSample = consoleErrors.slice(0, 2);
    out.mixedContent = requests.filter((r) => r.url.startsWith("http://")).length;

    // --- mobile ----------------------------------------------------------
    out.hasViewportMeta = await page.evaluate(() => !!document.querySelector('meta[name="viewport"]')).catch(() => false);

    out.ok = true;
  } catch (err) {
    out.error = String(err.message).split("\n")[0].slice(0, 80);
  } finally {
    await ctx.close().catch(() => {});
  }
  return out;
}

const argv = process.argv.slice(2);
const flag = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
// A bare --sweep carries no "=", so the flag reader above cannot see it and the
// script exited silently with status 0 — worse than an error, because it looks
// like a successful run that found nothing.
const has = (n) => argv.includes(`--${n}`);
const RESEARCH = new URL("../research/", import.meta.url);

// Sweep mode: read the domain list from the census, run concurrently, write
// JSON. Runs over a direct connection on purpose — these sites are already
// known to be readable without a proxy, so the sweep costs nothing.
if (has("sweep") || flag("from")) {
  const { readFileSync, writeFileSync } = await import("node:fs");
  let list;
  if (flag("from")) {
    list = readFileSync(flag("from"), "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } else {
    const census = JSON.parse(readFileSync(new URL("seal-census.json", RESEARCH), "utf8"));
    list = census.filter((r) => r.ok).map((r) => r.domain);
  }
  const LIMIT = Number(flag("limit") ?? list.length);
  const CONC = Number(flag("conc") ?? 6);
  list = list.slice(0, LIMIT);
  console.log(`auditing ${list.length} sites, concurrency ${CONC}, direct connection`);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  const queue = [...list];
  let done = 0;
  await Promise.all(
    Array.from({ length: CONC }, async () => {
      while (queue.length) {
        const d = queue.shift();
        try {
          results.push(await audit(browser, d));
        } catch (err) {
          results.push({ domain: d, ok: false, error: String(err.message).slice(0, 80) });
        }
        if (++done % 25 === 0) console.log(`  ${done}/${list.length}  readable: ${results.filter((r) => r.ok).length}`);
      }
    }),
  );
  await browser.close();

  // Merge by domain rather than replace — the same lesson the cloaking report
  // had to learn the hard way when one run silently erased another.
  const OUT = new URL("audit-report.json", RESEARCH);
  let prev = [];
  try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* first run */ }
  const merged = new Map(prev.map((r) => [r.domain, r]));
  for (const r of results) merged.set(r.domain, r);
  const all = [...merged.values()];
  writeFileSync(OUT, JSON.stringify(all, null, 1), "utf8");
  console.log(`\nwrote research/audit-report.json — ${all.length} sites (${results.length} this run)`);
  process.exit(0);
}

const domains = argv.filter((a) => !a.startsWith("--"));
if (domains.length) {
  const browser = await chromium.launch({ headless: true });
  const all = [];
  for (const d of domains) {
    const r = await audit(browser, d);
    all.push(r);
    if (!r.ok) { console.log(`\n=== ${d}: ${r.error}`); continue; }
    console.log(`\n=== ${d}`);
    console.log(`  MONEY   ${r.requestCount} requests, ${r.transferKB}KB declared, ${r.thirdPartyHosts} third-party hosts, DOM ${r.domContentLoaded}ms, settled ${r.settled}ms`);
    console.log(`  LEGAL   consent UI: ${r.hasConsentUI ? "yes" : "NO"} | trackers fired before consent: ${r.trackersBeforeConsent.length}${r.trackersBeforeConsent.length ? " -> " + r.trackersBeforeConsent.slice(0, 4).join(", ") : ""}`);
    console.log(`  LICENCE rg: ${Object.entries(r.responsibleGambling).filter(([, v]) => v).map(([k]) => k).join(", ") || "NONE FOUND"}`);
    console.log(`          legal pages: ${Object.entries(r.legalPages).filter(([, v]) => v).map(([k]) => k).join(", ") || "NONE FOUND"}`);
    console.log(`  SEO     title ${r.seo.title}ch, desc ${r.seo.metaDescription}ch, h1 x${r.seo.h1Count}, canonical ${r.seo.canonical}, hreflang ${r.seo.hreflang}, schema ${r.seo.structuredData}, img-no-alt ${r.seo.imagesNoAlt}`);
    console.log(`  BROKEN  ${r.brokenRequests} failed requests, ${r.consoleErrors} console errors, ${r.mixedContent} insecure`);
    console.log(`  SEC     ${Object.entries(r.securityHeaders).filter(([, v]) => v).map(([k]) => k.replace(/^(x-|strict-)/, "")).join(", ") || "none set"}`);
    if (r.brokenSample.length) console.log(`          e.g. ${r.brokenSample.join(" | ")}`);
  }
  await browser.close();
  console.log("\n" + JSON.stringify(all).length + " bytes of raw data collected");
}
