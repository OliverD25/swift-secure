import type { Browser } from "playwright";

export interface LicenceRecord {
  company: string;
  status: string;
  number: string;
  type: string;
  issued: string;
  expiry: string;
  domains: string;
}

export interface LicenceResult {
  registry: string;
  checked: boolean;
  found: boolean;
  record?: LicenceRecord;
  /** Set when the register was unreachable rather than the domain absent. */
  error?: string;
  note?: string;
}

/**
 * Anjouan publishes its whole register as a JSON blob embedded in the register
 * page — around 1,400 records — so one fetch answers any number of lookups.
 * Cache it and match by domain.
 */
let anjouanCache: LicenceRecord[] | null = null;

export async function loadAnjouanRegister(browser: Browser): Promise<LicenceRecord[]> {
  if (anjouanCache) return anjouanCache;
  const context = await browser.newContext({ locale: "en-GB" });
  const page = await context.newPage();
  try {
    await page.goto("https://anjouangaming.com/license-register/", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    const data = await page.evaluate(() => {
      const s = [...document.querySelectorAll("script")]
        .map((x) => x.textContent || "")
        .find((t) => /ALSI-/.test(t) && t.includes('[{"company"'));
      if (!s) return null;
      const start = s.indexOf('[{"company"');
      let depth = 0;
      for (let i = start; i < s.length; i++) {
        if (s[i] === "[") depth++;
        else if (s[i] === "]") {
          depth--;
          if (depth === 0) return JSON.parse(s.slice(start, i + 1));
        }
      }
      return null;
    });
    anjouanCache = (data as LicenceRecord[]) ?? [];
    return anjouanCache;
  } finally {
    await context.close().catch(() => {});
  }
}

const norm = (d: string) => d.toLowerCase().replace(/^www\./, "").trim();

export async function checkLicence(browser: Browser, domain: string): Promise<LicenceResult> {
  try {
    const records = await loadAnjouanRegister(browser);
    if (records.length === 0) {
      return { registry: "Anjouan Gaming Authority", checked: false, found: false, error: "register returned no records" };
    }
    const target = norm(domain);
    for (const r of records) {
      for (const d of String(r.domains || "").split(",")) {
        if (norm(d) === target) {
          return { registry: "Anjouan Gaming Authority", checked: true, found: true, record: r };
        }
      }
    }
    return {
      registry: "Anjouan Gaming Authority",
      checked: true,
      found: false,
      note:
        "Not in the Anjouan register. That is not a finding on its own — the operator may be licensed elsewhere " +
        "(Curaçao, Tobique, Kahnawake), and those registers are not machine-checkable yet.",
    };
  } catch (err) {
    return {
      registry: "Anjouan Gaming Authority",
      checked: false,
      found: false,
      error: (err as Error).message.split("\n")[0].slice(0, 140),
    };
  }
}

/**
 * Curaçao is deliberately not implemented.
 *
 * The CGA portal is operator-login only and exposes no public search by
 * domain; certificates are reachable only through the seal on the operator's
 * own site (cert.cga.cw/<id>). That makes it a per-site scrape gated behind
 * the same blocking that stops the games check, not a register lookup. Wire it
 * in once the proxy pool exists: read the footer seal href, follow it, parse
 * the certificate page.
 */
export const CURACAO_NOT_IMPLEMENTED =
  "Curaçao (CGA) has no public domain search; verify via the operator's own seal link once proxies are available.";
