/**
 * Harvest the AFFCatalog affiliate-programme directory.
 *
 * WHY THIS SOURCE. The blocker on the outreach list is not finding casinos, it
 * is finding a human to write to: 81 domains that produce a real, verified
 * finding have no address at all. AFFCatalog publishes, per programme, a
 * contact address AND the list of brands that programme runs. Tested against
 * our own data before this was written — 6 of the 14 brands under N1 Partners
 * (n1bet.live, joocasino.live, rollxo.co, retrobet.co, slotlounge.live,
 * goldexcasino.live) are already in master-outreach-list.csv, every one of them
 * with no email and a blank operator field. One page fills both gaps.
 *
 * The brand roster is worth as much as the address. Our operator grouping comes
 * from licence registers and is frequently blank, and the dedup rule that stops
 * this outreach reading as a mail-merge depends on knowing that six domains are
 * one company. A programme's brand list states that directly.
 *
 * NO BROWSER. The fields are in the server-rendered HTML, so this is plain
 * fetch. Playwright over 1459 pages would cost an hour and buy nothing.
 *
 * POLITE BY CONSTRUCTION. robots.txt disallows `*\/?*`, which covers the
 * paginated listing, so pagination is never touched — the sitemap is both the
 * allowed route and the complete one. Concurrency is low and every response is
 * read once.
 *
 * Usage:
 *   node affcatalog-scrape.mjs                        # all programmes
 *   node affcatalog-scrape.mjs --limit=20 --out=affcatalog.partial.json
 *   node affcatalog-scrape.mjs --resume               # continue a killed run
 */
import { writeFileSync, readFileSync } from "node:fs";

const RESEARCH = new URL("../research/", import.meta.url);
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const SITEMAP = "https://affcatalog.com/en/aff-program-sitemap.xml";

const flag = (n) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=");
const has = (n) => process.argv.includes(`--${n}`);

// The catalogue's own contact address appears in the page footer on every
// single programme page, and on a programme with no address of its own it is
// the ONLY mailto present. Scraped naively it would produce 1459 rows all
// pointing at support@affcatalog.com — a list that looks full and is empty.
const OWN_DOMAIN = /@affcatalog\.com$/i;

const strip = (s) => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9" }, signal: AbortSignal.timeout(30000) });
      if (r.status === 429 || r.status >= 500) {
        await new Promise((res) => setTimeout(res, 2000 * (i + 1)));
        continue;
      }
      if (!r.ok) return { status: r.status, html: "" };
      return { status: r.status, html: await r.text() };
    } catch (err) {
      if (i === tries - 1) return { status: 0, html: "", error: String(err.message).slice(0, 60) };
      await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
    }
  }
  return { status: 0, html: "" };
}

function parse(url, html) {
  const out = { url, slug: url.replace(/\/$/, "").split("/").pop(), name: "", email: "", telegram: "", fields: {}, brands: [], ok: false };
  if (!html) return out;

  out.name = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] ?? "");

  // Every fact on the page is a condition-item title/value pair — 14 of them on
  // a full profile. Reading them generically rather than hardcoding the four we
  // happen to want today means a new field the site adds arrives on its own.
  for (const m of html.matchAll(/condition-item__title[^>]*>([\s\S]*?)<\/div>[\s\S]{0,120}?condition-item__value[^>]*>([\s\S]*?)<\/div>/g)) {
    const k = strip(m[1]);
    const v = strip(m[2]);
    if (k && v) out.fields[k] = v;
  }

  const brandField = out.fields["Brand names"] ?? out.fields["Brands"] ?? "";
  out.brands = brandField.split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);

  const mails = [...html.matchAll(/mailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24})/g)]
    .map((m) => m[1].toLowerCase())
    .filter((a) => !OWN_DOMAIN.test(a));
  out.email = mails[0] ?? "";

  out.telegram = (html.match(/https?:\/\/(?:t|telegram)\.me\/[^"'<\s]+/) || [])[0] ?? "";
  out.ok = Boolean(out.name);
  return out;
}

// ---------------------------------------------------------------- run
const sm = await get(SITEMAP);
let urls = [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => /\/aff-program\/[^/]+\/?$/.test(u));
console.log(`sitemap lists ${urls.length} programme pages`);

const OUT_NAME = flag("out") ?? (flag("limit") ? "affcatalog-programs.partial.json" : "affcatalog-programs.json");
const OUT_URL = new URL(OUT_NAME, RESEARCH);
if (flag("limit") && !flag("out")) console.log(`Limited run -> ${OUT_NAME}; the full file is left alone.`);

let existing = [];
try { existing = JSON.parse(readFileSync(OUT_URL, "utf8")); } catch { /* first run */ }
if (has("resume") && existing.length) {
  const seen = new Set(existing.map((r) => r.url));
  const before = urls.length;
  urls = urls.filter((u) => !seen.has(u));
  console.log(`  --resume: ${before - urls.length} already scraped, ${urls.length} left`);
}
if (flag("limit")) urls = urls.slice(0, Number(flag("limit")));

const CONC = Number(flag("conc") ?? 4);
const results = [];
const flush = () => {
  const merged = new Map(existing.map((r) => [r.url, r]));
  for (const r of results) merged.set(r.url, r);
  writeFileSync(OUT_URL, JSON.stringify([...merged.values()], null, 1), "utf8");
  return merged.size;
};

console.log(`scraping ${urls.length} pages, concurrency ${CONC}`);
const queue = [...urls];
let done = 0;
await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const u = queue.shift();
      const { status, html, error } = await get(u);
      const rec = parse(u, html);
      rec.status = status;
      if (error) rec.error = error;
      results.push(rec);
      if (++done % 25 === 0) {
        flush();
        const withMail = results.filter((r) => r.email).length;
        console.log(`  ${done}/${urls.length}  with an address: ${withMail}  [checkpointed]`);
      }
    }
  }),
);
const total = flush();

const ok = results.filter((r) => r.ok);
const mailed = ok.filter((r) => r.email);
const branded = ok.filter((r) => r.brands.length);
console.log(`\n=== ${results.length} scraped, ${ok.length} parsed ===`);
console.log(`  with a contact address     : ${mailed.length}  (${Math.round((100 * mailed.length) / Math.max(ok.length, 1))}%)`);
console.log(`  with a brand roster        : ${branded.length}`);
console.log(`  total brand names listed   : ${branded.reduce((n, r) => n + r.brands.length, 0)}`);
console.log(`\nwrote research/${OUT_NAME} — ${total} records total`);
