import type { Browser } from "playwright";

/**
 * Verify a Curaçao licence against the regulator's own certificate.
 *
 * Curaçao publishes no downloadable register, so the Anjouan approach — pull the
 * whole list, match on domain — is not available. What it does publish is a
 * per-certificate endpoint, and the licence number contains the key to it:
 *
 *   OGL/2024/887/0618  ->  https://cert.cga.cw/token?id=618
 *
 * That turns out to be stronger than a register lookup, because the certificate
 * names **the domain the seal may be displayed on**. So this does not merely
 * confirm a licence exists — it confirms the licence belongs to the site
 * showing it, which is the check that catches an operator publishing somebody
 * else's number.
 */

export interface CuracaoCertificate {
  /** The number as published by the operator. */
  licenceNumber: string;
  found: boolean;
  type?: "B2C" | "B2B" | "unknown";
  company?: string;
  companyNumber?: string;
  licensedSince?: string;
  /** The domain the regulator authorises for this certificate. */
  certifiedDomain?: string;
  /** True only when the certified domain matches the site we are checking. */
  domainMatches?: boolean;
  note: string;
  sourceUrl?: string;
}

/** OGL/YYYY/NNN/NNNN — the trailing group is the certificate token. */
const LICENCE = /OGL\/(\d{4})\/(\d+)\/(\d+)/i;

export function tokenFromLicence(licenceNumber: string): string | null {
  const m = licenceNumber.match(LICENCE);
  if (!m) return null;
  // Leading zeros are presentational: 0618 is token 618.
  return String(Number(m[3]));
}

const norm = (d: string) => d.trim().toLowerCase().replace(/^www\./, "");

export async function verifyCuracaoLicence(
  browser: Browser,
  licenceNumber: string,
  casinoDomain?: string,
): Promise<CuracaoCertificate> {
  const out: CuracaoCertificate = {
    licenceNumber,
    found: false,
    note: "",
  };

  const token = tokenFromLicence(licenceNumber);
  if (!token) {
    out.note = "Not a Curaçao LOK licence number, so there is no certificate to look up.";
    return out;
  }

  const url = `https://cert.cga.cw/token?id=${token}`;
  out.sourceUrl = url;

  const context = await browser.newContext({
    locale: "en-GB",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForTimeout(2500);
    const text = (await page.evaluate(() => document.body?.innerText ?? "")).replace(/\s+/g, " ").trim();

    // The endpoint answers 200 either way; absence is stated in the body.
    if (/cannot be found or the token has expired/i.test(text)) {
      out.note =
        "No certificate is published under that number. That is not proof of an invalid licence — " +
        "a token can expire and the operator has to reissue it — but the claim is unconfirmed.";
      return out;
    }

    out.found = true;
    out.type = /Certificate\s+B2C/i.test(text) ? "B2C" : /Certificate\s+B2B/i.test(text) ? "B2B" : "unknown";
    out.company = text.match(/certify that (.+?), a company incorporated/i)?.[1]?.trim();
    out.companyNumber = text.match(/Company Number (\w+)/i)?.[1];
    out.licensedSince = text.match(/since ([0-9]{1,2}\/\w{3}\/[0-9]{4})/i)?.[1];
    out.certifiedDomain = text.match(/seal of approval on their corporate website ([^\s,]+)/i)?.[1]?.replace(/\.$/, "");

    if (casinoDomain && out.certifiedDomain) {
      const a = norm(out.certifiedDomain);
      const b = norm(casinoDomain);
      out.domainMatches = a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
    }

    // The domain line is the whole point: a real licence number displayed on a
    // site it does not cover is the failure this check exists to find.
    out.note = out.domainMatches === false
      ? `The certificate is genuine but authorises ${out.certifiedDomain}, not ${casinoDomain}. ` +
        `A licence number shown on a domain it does not cover needs a human to look at it.`
      : out.domainMatches === true
        ? `Confirmed against the Curaçao Gaming Authority certificate, including the authorised domain.`
        : `Certificate found. No casino domain was supplied, so the domain it authorises was not compared.`;
  } catch (err) {
    out.note = `Could not reach the certificate endpoint (${(err as Error).message.split("\n")[0].slice(0, 80)}). Nothing concluded.`;
  } finally {
    await context.close().catch(() => {});
  }
  return out;
}
