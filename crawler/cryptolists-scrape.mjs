/**
 * Scrape the CryptoLists casino directory listing.
 *
 * The listing is JS-rendered (a plain fetch sees an empty shell), so this stage
 * needs a real browser. What it produces is not casino domains — every "Visit
 * Website" button is an affiliate redirect (`/goto/<slug>`), never the casino's
 * own URL. Resolving those to real domains is a second, browser-free stage
 * (`research/scripts/11-cryptolists-resolve.py`), because the redirects
 * themselves are plain HTTP 301s that a browser is not needed for.
 *
 * Pagination is `?page=N`, confirmed by page 2 returning a different set of
 * cards. Stops when a page repeats the previous page's first slug (end of
 * real pages) or returns none.
 *
 * Usage: node cryptolists-scrape.mjs [maxPages]
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const RESEARCH = new URL("../research/", import.meta.url);
const MAX_PAGES = Number(process.argv[2] ?? 20);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: UA, locale: "en-GB" });
const page = await ctx.newPage();

const cards = [];
let claimedTotal = null;
let lastFirstSlug = null;

for (let n = 1; n <= MAX_PAGES; n++) {
  await page.goto(`https://www.cryptolists.com/casinos/?page=${n}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(4000);

  if (claimedTotal === null) {
    claimedTotal = await page
      .evaluate(() => document.body.innerText.match(/(\d+)\s+casinos match/i)?.[1])
      .then((v) => (v ? Number(v) : null));
    if (claimedTotal) console.log(`site claims ${claimedTotal} casinos total`);
  }

  const found = await page.evaluate(() => {
    const out = [];
    // Each card's badges (New, VPN Friendly, Instant Payouts, No KYC, Cashback,
    // Sports) sit as sibling text near the "Visit Website" link. Walking up to
    // a reasonably-sized ancestor and reading its text is more robust than
    // guessing a class name that a site redesign would break silently.
    for (const a of document.querySelectorAll('a[href*="/goto/"]')) {
      const slug = a.getAttribute("href").split("/goto/")[1]?.split(/[?#]/)[0];
      if (!slug) continue;
      let card = a;
      for (let i = 0; i < 6 && card.parentElement; i++) {
        card = card.parentElement;
        if ((card.innerText || "").length > 40) break;
      }
      // Card text reads "#3 Blockspins Casino 100% up to 1.75 BNB...". The rank
      // prefix has to be stripped before the name, or the name-boundary regex
      // never matches anything and every card comes back with an empty name —
      // which is exactly what happened on the first pass.
      const text = (card.innerText || "").replace(/\s+/g, " ").trim();
      const noRank = text.replace(/^#\d+\s*/, "");
      const nameMatch = noRank.match(/^([A-Za-z0-9][\w' .-]{1,40}?)\s+(?:\d+%|Up to|New\b|Instant\b|★|VPN\b)/);
      out.push({
        slug,
        cardText: text.slice(0, 220),
        name: nameMatch ? nameMatch[1].trim() : "",
        isNew: /\bNew\b/.test(text),
        vpnFriendly: /VPN Friendly/i.test(text),
        noKyc: /No KYC/i.test(text),
        rating: text.match(/(\d\.\d{2})/)?.[1] ?? "",
      });
    }
    return out;
  });

  const firstSlug = found[0]?.slug ?? null;
  if (!found.length || firstSlug === lastFirstSlug) {
    console.log(`page ${n}: ${found.length ? "repeats previous page — end of listing" : "empty — end of listing"}`);
    break;
  }
  lastFirstSlug = firstSlug;
  cards.push(...found);
  console.log(`page ${n}: ${found.length} cards (running total ${cards.length})`);
}

await browser.close();

const bySlug = new Map(cards.map((c) => [c.slug, c]));
const unique = [...bySlug.values()];

writeFileSync(new URL("cryptolists-listing.json", RESEARCH), JSON.stringify(unique, null, 1), "utf8");

console.log(`\n=== ${unique.length} unique casinos collected${claimedTotal ? ` (site claims ${claimedTotal})` : ""} ===`);
console.log(`  marked "New": ${unique.filter((c) => c.isNew).length}`);
console.log(`wrote research/cryptolists-listing.json`);
