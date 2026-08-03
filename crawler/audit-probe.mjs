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
      // resourceType() lives on Request, not Response. Calling it here threw on
      // every single 4xx, and the empty catch below swallowed it — so
      // brokenRequests read 0 on a site with 38 real failures, and the whole
      // strongest category of report finding was silently invisible. Read it
      // from the originating request instead, and tolerate that being absent.
      if (r.status() >= 400) {
        failed.push({ status: r.status(), url: r.url(), type: r.request()?.resourceType() ?? "" });
      }
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
    // Split refusals out of breakage before counting anything.
    //
    // This project already treats 401/403/429/451 on a PAGE as "refused, not
    // absent". The same rule was never applied to individual requests, and that
    // was wrong in a way that reached the ranking. Checking the 403s on
    // api.betewin.com and api.betim.com by hand returned a bare openresty HTML
    // error page, 552 bytes. An API that meant "you are not logged in" answers
    // in JSON; an nginx HTML 403 means the request never reached the
    // application at all. That is an edge/WAF refusal aimed at our crawler, and
    // the site is fine for a real visitor. In one 148-failure sample, 60 (40%)
    // were refusals of this kind.
    //
    // Bot-check hosts are excluded for the same reason but are even clearer:
    // challenges.cloudflare.com failing means Turnstile was interrogating US.
    const REFUSED_STATUS = new Set([401, 403, 429, 451]);
    const BOT_CHECK_HOST = /challenges\.cloudflare\.com|hcaptcha\.com|recaptcha\.net|google\.com\/recaptcha|perimeterx|datadome|arkoselabs/i;
    const isRefusal = (f) => REFUSED_STATUS.has(f.status) || BOT_CHECK_HOST.test(f.url);

    const root = domain.split(".").slice(-2).join(".");
    const hostOf = (u) => { try { return new URL(u).hostname; } catch { return ""; } };

    const real = failed.filter((f) => !isRefusal(f));
    const refused = failed.filter(isRefusal);

    // brokenRequests keeps its old meaning (every response >= 400) so earlier
    // sweeps stay comparable. brokenReal is the number a report may quote.
    out.brokenRequests = failed.length;
    out.brokenReal = real.length;
    out.brokenRefused = refused.length;
    out.brokenOwnHost = real.filter((f) => hostOf(f.url).endsWith(root)).length;
    out.brokenThirdParty = real.length - out.brokenOwnHost;
    out.brokenByStatus = Object.fromEntries(
      Object.entries(real.reduce((a, f) => ((a[f.status] = (a[f.status] ?? 0) + 1), a), {})),
    );
    // Full list of genuine failures, capped. The 6-item sample was enough to
    // print but not enough to classify a site — an accurate own-host vs
    // third-party split cannot be recomputed from six of sixty.
    out.brokenReal20 = real.slice(0, 20).map((f) => `${f.status} ${f.url}`);
    // Formatted to a string here rather than left as objects: this value is
    // consumed by audit.mjs and by the report writer, both of which join it
    // into human-readable text — an object array renders as [object Object]
    // and silently destroys the one detail that makes the finding actionable.
    // Sample from genuine failures first. The old version sampled from every
    // response >= 400, so on a site whose first six failures were all WAF
    // refusals the printed example was something we caused, handed over as
    // though it were their bug.
    out.brokenSample = (real.length ? real : failed).slice(0, 6).map((f) => `${f.status} ${f.url}`);
    // Group by the failing directory so "38 broken payment icons" reads as one
    // fixable problem rather than 38 unrelated errors.
    const groups = {};
    for (const f of real) {
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

// Only act as a CLI when run directly. audit.mjs imports audit() from here and
// passes a domain as its own argv, which this file used to read as "single
// domain mode" and act on — so importing the module silently launched a second
// full scan and printed its own report before the caller's.
const RUN_DIRECTLY = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop());

const argv = RUN_DIRECTLY ? process.argv.slice(2) : [];
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

  const OUT_URL = new URL(flag("out") ?? "audit-report.json", RESEARCH);

  // Read the existing file ONCE, up front, so the checkpoint writer below can
  // merge into it without re-reading on every flush.
  let existing = [];
  try { existing = JSON.parse(readFileSync(OUT_URL, "utf8")); } catch { /* first run */ }

  // --resume skips domains the output file already holds, so a sweep killed at
  // domain 900 costs 900 fewer page loads to finish rather than starting over.
  if (has("resume") && existing.length) {
    const seen = new Set(existing.map((r) => r.domain));
    const before = list.length;
    list = list.filter((d) => !seen.has(d));
    console.log(`  --resume: ${before - list.length} already measured, ${list.length} left`);
  }

  const results = [];
  // Checkpoint to disk during the run, not only at the end.
  //
  // A 1311-domain sweep is over an hour of real network work, and the previous
  // version wrote its single writeFileSync after the last domain finished. Any
  // process-level death — and this machine produced an ERR_NO_BUFFER_SPACE kill
  // earlier today from socket exhaustion on exactly this kind of workload —
  // discarded every completed measurement. That directly violates the standing
  // rule in AGENTS.md that an expensive sweep is source data and must survive.
  // Flushing every 25 domains caps the worst-case loss at 25 sites instead of
  // all of them, and makes a killed run resumable by diffing the target list
  // against what is already in the file.
  const flush = () => {
    const merged = new Map(existing.map((r) => [r.domain, r]));
    for (const r of results) merged.set(r.domain, r);
    writeFileSync(OUT_URL, JSON.stringify([...merged.values()], null, 1), "utf8");
    return merged.size;
  };

  const browser = await chromium.launch({ headless: true });
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
        if (++done % 25 === 0) {
          flush();
          console.log(`  ${done}/${list.length}  readable: ${results.filter((r) => r.ok).length}  [checkpointed]`);
        }
      }
    }),
  );
  await browser.close();

  // Merge by domain rather than replace — the same lesson the cloaking report
  // had to learn the hard way when one run silently erased another.
  //
  // --out exists so a new sweep does not merge into an incompatible old one.
  // audit-report.json was filled before commit 98fc30e, when brokenSample held
  // bare pathnames; "/_next/image" without its query string is a legitimate 400,
  // so those samples cannot be handed to an operator. Merging fresh full-URL
  // records into that file would leave two formats in one array with no way to
  // tell them apart — the silent-corruption failure this project keeps hitting.
  const total = flush();
  const readable = results.filter((r) => r.ok).length;
  console.log(`\nwrote research/${flag("out") ?? "audit-report.json"} — ${total} sites total, ${results.length} this run (${readable} readable)`);
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
    console.log(`  BROKEN  ${r.brokenReal ?? r.brokenRequests} genuine failures (${r.brokenOwnHost ?? "?"} own host, ${r.brokenThirdParty ?? "?"} third-party) + ${r.brokenRefused ?? 0} refusals aimed at us, ${r.consoleErrors} console errors, ${r.mixedContent} insecure`);
    console.log(`  SEC     ${Object.entries(r.securityHeaders).filter(([, v]) => v).map(([k]) => k.replace(/^(x-|strict-)/, "")).join(", ") || "none set"}`);
    if (r.brokenSample.length) console.log(`          e.g. ${r.brokenSample.join(" | ")}`);
  }
  await browser.close();
  console.log("\n" + JSON.stringify(all).length + " bytes of raw data collected");
}
