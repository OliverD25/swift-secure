import type { Browser } from "playwright";

export interface FooterLicence {
  domain: string;
  reachable: boolean;
  blockedReason?: string;
  /** Regulator names mentioned anywhere in the rendered page. */
  regulators: string[];
  /** Licence-number-shaped strings found in the text. */
  numbers: string[];
  /** Links to a regulator's own certificate/validator — the strongest signal. */
  sealLinks: string[];
  /** The sentence around the first licence mention, for a human to read. */
  excerpt?: string;
}

const REGULATORS: [RegExp, string][] = [
  [/anjouan/i, "Anjouan"],
  [/cura[cç]ao|curacao/i, "Curaçao"],
  [/tobique/i, "Tobique"],
  [/kahnawake|kahnaw[àa]:?ke/i, "Kahnawake"],
  [/malta gaming authority|\bMGA\b/i, "Malta (MGA)"],
  [/gaming curacao|gaming-curacao/i, "Curaçao"],
  [/costa rica/i, "Costa Rica (no gaming regulator)"],
  [/isle of man/i, "Isle of Man"],
];

// Licence formats seen in the wild across the small jurisdictions.
const NUMBER_PATTERNS = [
  /ALSI-[0-9]{6,12}-[A-Z0-9]{2,4}/gi,   // Anjouan
  /OGL\/[0-9]{4}\/[0-9]+\/[0-9]+/gi,     // Curaçao (new LOK)
  /GLH-OCCHKTW[0-9A-Z]+/gi,              // Curaçao (legacy sub-licence)
  /\b[0-9]{4}-[0-9]{4}\b/g,              // Curaçao legacy master style
  /CEG-[0-9A-Z/-]+/gi,                   // Costa Rica-ish
];

/**
 * Read whatever a casino publishes about its own licence.
 *
 * This is deliberately observational: it records what the site claims, so the
 * claim can be checked against the regulator's register. It is not itself a
 * verification — a footer can say anything.
 */
export async function readFooterLicence(browser: Browser, domain: string): Promise<FooterLicence> {
  const out: FooterLicence = { domain, reachable: false, regulators: [], numbers: [], sealLinks: [] };
  const context = await browser.newContext({
    locale: "en-GB",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  await context.route("**/*", (r) => {
    const t = r.request().resourceType();
    return t === "image" || t === "font" || t === "media" ? r.abort() : r.continue();
  });
  const page = await context.newPage();
  try {
    const resp = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: 40_000 });
    const status = resp?.status() ?? 0;
    // Footers are frequently below the fold and lazily rendered.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});
    await page.waitForTimeout(4000);

    const text = await page.evaluate(() => document.body?.innerText ?? "").catch(() => "");
    if (status >= 400) out.blockedReason = `HTTP ${status}`;
    else if (/use your vpn|vpn required|vpn friendly|access denied|not available in your (country|region)/i.test(text))
      out.blockedReason = "geo/VPN interstitial";
    else if (text.trim().length < 80) out.blockedReason = "empty or placeholder page";
    out.reachable = !out.blockedReason;

    if (out.reachable) {
      for (const [re, name] of REGULATORS) if (re.test(text) && !out.regulators.includes(name)) out.regulators.push(name);
      for (const re of NUMBER_PATTERNS) {
        for (const m of text.match(re) ?? []) if (!out.numbers.includes(m)) out.numbers.push(m);
      }
      out.sealLinks = await page.evaluate(() =>
        [...document.querySelectorAll("a[href]")]
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((h) => /cert\.cga\.cw|validator|licensing|gaminglicence|anjouangaming|verification|certificate/i.test(h))
          .slice(0, 6),
      );
      const idx = text.search(/licen[cs]e|regulated by|anjouan|cura[cç]ao|tobique/i);
      if (idx >= 0) out.excerpt = text.slice(Math.max(0, idx - 120), idx + 260).replace(/\s+/g, " ").trim();
    }
  } catch (err) {
    out.blockedReason ??= (err as Error).message.split("\n")[0].slice(0, 120);
  } finally {
    await context.close().catch(() => {});
  }
  return out;
}
