/**
 * Module 4 — mobile time-to-register.
 *
 * Measures, from a mobile viewport on a throttled connection, how long it
 * takes before a Register/Deposit/Join call-to-action is visible and
 * clickable. Of the four audit modules an outside agent proposed, this is the
 * one that adds a genuinely new, safe capability — it asserts nothing about
 * anyone's honesty, so it passes the four-question filter in AGENTS.md
 * cleanly: an operator would thank us for a real number, can act on it
 * (compress an image, defer a script), almost certainly has not measured this
 * on a throttled connection themselves, and it costs them mobile conversions
 * directly if left alone.
 *
 * Deliberately does NOT click the CTA once found. Actually clicking Register
 * on a live casino risks creating a real account, tripping fraud detection, or
 * firing paid-acquisition tracking events tied to a real ad spend budget —
 * this measures readiness, not completion.
 *
 * Deliberately does NOT block images/fonts the way every other script in this
 * project does. Everywhere else, resource-blocking saves proxy bandwidth
 * without changing the finding (a seal is a seal whether or not its own image
 * loads). Here the image weight IS the finding — blocking it would produce a
 * meaningless, artificially fast number.
 *
 * Network is throttled to a named, reported profile so the result reflects an
 * actual mobile connection rather than this machine's own fast link, and so
 * the report can state exactly what conditions produced the number — the same
 * defensibility rule as every other measurement in this project.
 *
 * Usage: node mobile-timing.mjs <domain> [more...]
 *        node mobile-timing.mjs --sweep [--limit=N] [--conc=N]
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const RESEARCH = new URL("../research/", import.meta.url);

// DevTools' own named presets, so "Fast 3G" means the same thing here as it
// does to anyone checking this in Chrome directly.
const THROTTLE = {
  name: "Fast 3G",
  downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
  uploadThroughput: (750 * 1024) / 8, // 750 Kbps
  latency: 150, // ms
};

const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

// Interactive elements only (a, button, input[submit], role=button) — matching
// plain text anywhere on the page would catch a footer T&C link mentioning
// "deposit limits" and call it a call-to-action.
const CTA_TEXT =
  /register|sign ?up|join now|create account|get started|play now|deposit|claim bonus/i;

async function measure(browser, domain) {
  const out = {
    domain,
    ok: false,
    error: "",
    throttle: THROTTLE.name,
    domContentLoadedMs: null,
    loadEventMs: null,
    loadTimedOut: false,
    ctaVisibleMs: null,
    ctaText: "",
    ctaFound: false,
    requestCount: 0,
    transferKB: 0,
  };

  const ctx = await browser.newContext({
    userAgent: MOBILE_UA,
    viewport: { width: 390, height: 844 }, // iPhone 12/13 mini class — a common real device size
    isMobile: true,
    hasTouch: true,
    locale: "en-GB",
  });
  const page = await ctx.newPage();
  page.on("dialog", (d) => d.dismiss().catch(() => {}));

  let bytes = 0;
  let requests = 0;
  page.on("request", () => requests++);
  page.on("response", (r) => {
    const len = Number(r.headers()["content-length"] ?? 0);
    bytes += len;
  });

  try {
    // CDP throttling has to be attached before navigation starts, or the
    // first-load numbers — the ones that matter most for a bounce-rate
    // argument — are not throttled at all.
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: THROTTLE.downloadThroughput,
      uploadThroughput: THROTTLE.uploadThroughput,
      latency: THROTTLE.latency,
    });

    const t0 = Date.now();
    const navPromise = page.goto(`https://${domain}`, { waitUntil: "commit", timeout: 45000 });

    // Poll for the CTA becoming visible rather than checking once at the end —
    // a single end-of-load check would answer "is it visible now", not "how
    // long did the player actually wait", which is the number that matters.
    let ctaSeenAt = null;
    let ctaLabel = "";
    const pollUntil = Date.now() + 20000;
    while (Date.now() < pollUntil && ctaSeenAt === null) {
      const found = await page
        .evaluate((pattern) => {
          const re = new RegExp(pattern, "i");
          for (const el of document.querySelectorAll("a,button,input[type=submit],[role=button]")) {
            const label = (el.innerText || el.value || el.getAttribute("aria-label") || "").trim();
            if (!label || !re.test(label)) continue;
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            const visible =
              rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
            if (visible) return label.slice(0, 40);
          }
          return null;
        }, CTA_TEXT.source)
        .catch(() => null);
      if (found) {
        ctaSeenAt = Date.now();
        ctaLabel = found;
        break;
      }
      await page.waitForTimeout(200);
    }

    await navPromise.catch(() => {});

    // The CTA poll loop above can exit within a second on a fast site, well
    // before the browser's own 'load' event has fired — reading performance
    // timing immediately afterward caught loadEventEnd still at 0 on every
    // single test site, including a 692ms-to-CTA site that plainly did finish
    // loading soon after. A bounded explicit wait fixes that case.
    //
    // winup.io took this further: 'load' genuinely does not fire within 10s on
    // Fast 3G — confirmed separately with a 40s timeout, it actually fires at
    // ~29s, almost certainly the same 38 broken payment-icon requests found by
    // the site health audit, each downloading a full ~87KB homepage instead of
    // a small SVG. 10s is kept as the bound rather than raised to chase that
    // case, because it is charged per site across a whole sweep — the timeout
    // itself becomes the finding, reported as such below rather than as a bare
    // "n/a" that would read as missing data instead of "too slow to finish".
    const loaded = await page.waitForLoadState("load", { timeout: 10000 }).then(() => true).catch(() => false);
    out.loadTimedOut = !loaded;
    const domTime = await page
      .evaluate(() => performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart)
      .catch(() => null);
    const loadTime = await page
      .evaluate(() => performance.timing.loadEventEnd - performance.timing.navigationStart)
      .catch(() => null);

    out.ok = true;
    out.domContentLoadedMs = domTime && domTime > 0 ? domTime : Date.now() - t0;
    out.loadEventMs = loadTime && loadTime > 0 ? loadTime : null;
    out.ctaFound = ctaSeenAt !== null;
    out.ctaVisibleMs = ctaSeenAt ? ctaSeenAt - t0 : null;
    out.ctaText = ctaLabel;
    out.requestCount = requests;
    out.transferKB = Math.round(bytes / 1024);
  } catch (err) {
    out.error = String(err.message).split("\n")[0].slice(0, 100);
  } finally {
    await ctx.close().catch(() => {});
  }
  return out;
}

const argv = process.argv.slice(2);
const flag = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const has = (n) => argv.includes(`--${n}`);

if (has("sweep")) {
  const census = JSON.parse(readFileSync(new URL("seal-census.json", RESEARCH), "utf8"));
  let list = census.filter((r) => r.ok).map((r) => r.domain);
  const LIMIT = Number(flag("limit") ?? list.length);
  const CONC = Number(flag("conc") ?? 4); // lower than other sweeps — each run is slower (throttled + polling)
  list = list.slice(0, LIMIT);
  console.log(`measuring ${list.length} sites on a mobile viewport, ${THROTTLE.name} throttle, concurrency ${CONC}`);

  const browser = await chromium.launch({ headless: true });
  const results = [];
  const queue = [...list];
  let done = 0;
  await Promise.all(
    Array.from({ length: CONC }, async () => {
      while (queue.length) {
        const d = queue.shift();
        results.push(await measure(browser, d));
        if (++done % 20 === 0) console.log(`  ${done}/${list.length}`);
      }
    }),
  );
  await browser.close();

  const OUT = new URL("mobile-timing-report.json", RESEARCH);
  let prev = [];
  try { prev = JSON.parse(readFileSync(OUT, "utf8")); } catch { /* first run */ }
  const merged = new Map(prev.map((r) => [r.domain, r]));
  for (const r of results) merged.set(r.domain, r);
  const all = [...merged.values()];
  writeFileSync(OUT, JSON.stringify(all, null, 1), "utf8");

  const ok = results.filter((r) => r.ok);
  const found = ok.filter((r) => r.ctaFound);
  const times = found.map((r) => r.ctaVisibleMs).sort((a, b) => a - b);
  const median = times.length ? times[Math.floor(times.length / 2)] : null;
  const slow = ok.filter((r) => !r.ctaFound || r.ctaVisibleMs > 8000);

  console.log(`\n=== ${ok.length} of ${results.length} measured (report now holds ${all.length} sites) ===`);
  console.log(`  CTA found and timed        : ${found.length}`);
  console.log(`  median time to CTA visible : ${median ? median + "ms" : "n/a"}`);
  console.log(`  no CTA found in 20s, or over 8s to appear : ${slow.length}`);
  console.log(`wrote research/mobile-timing-report.json`);
} else {
  const domains = argv.filter((a) => !a.startsWith("--"));
  if (!domains.length) {
    console.error("usage: node mobile-timing.mjs <domain>... | --sweep [--limit=N] [--conc=N]");
    process.exit(1);
  }
  const browser = await chromium.launch({ headless: true });
  for (const d of domains) {
    const r = await measure(browser, d);
    console.log(`\n${d}  (${THROTTLE.name} throttle, mobile viewport)`);
    if (!r.ok) {
      console.log(`  FAILED: ${r.error}`);
      continue;
    }
    console.log(`  DOMContentLoaded : ${r.domContentLoadedMs}ms`);
    console.log(`  load event       : ${r.loadEventMs !== null ? r.loadEventMs + "ms" : r.loadTimedOut ? "did not finish within 10s (Fast 3G)" : "n/a"}`);
    console.log(`  CTA visible at   : ${r.ctaFound ? r.ctaVisibleMs + "ms (\"" + r.ctaText + "\")" : "NOT FOUND in 20s"}`);
    console.log(`  requests / KB    : ${r.requestCount} / ${r.transferKB}`);
  }
  await browser.close();
}
