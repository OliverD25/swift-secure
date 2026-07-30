import { chromium, type Browser } from "playwright";
import { checkGames, type GamesResult } from "./checks/games.ts";
import { checkLicence, type LicenceResult } from "./checks/licence.ts";
import { loadProxies, selectForScan, type ProxyEntry } from "./proxies.ts";

export interface RegionScan {
  region: string;
  proxied: boolean;
  games: GamesResult;
}

export interface ScanReport {
  domain: string;
  scannedAt: string;
  proxied: boolean;
  regionsChecked: string[];
  licence: LicenceResult;
  perRegion: RegionScan[];
  /** True when regions disagreed — the signature of geo-cloaking. */
  regionMismatch: boolean;
  verdict: "clean" | "suspicious" | "inconclusive";
  summary: string;
}

async function launch(proxy?: ProxyEntry): Promise<Browser> {
  return chromium.launch({
    headless: true,
    proxy: proxy
      ? { server: proxy.server, username: proxy.username, password: proxy.password }
      : undefined,
  });
}

export async function scanCasino(
  domain: string,
  opts: { regions?: number; maxGames?: number } = {},
): Promise<ScanReport> {
  const pool = loadProxies();
  const chosen = selectForScan(pool, opts.regions ?? 3);
  const proxied = chosen.length > 0;

  const perRegion: RegionScan[] = [];
  // Without proxies we still run once, direct, and say so in the report.
  const runs: (ProxyEntry | undefined)[] = proxied ? chosen : [undefined];

  let licence: LicenceResult = {
    registry: "Anjouan Gaming Authority",
    checked: false,
    found: false,
    error: "not attempted",
  };

  for (const [i, proxy] of runs.entries()) {
    const browser = await launch(proxy);
    try {
      // The register lookup is geo-independent; do it once on the first run.
      if (i === 0) licence = await checkLicence(browser, domain);
      const games = await checkGames(browser, domain, { maxGames: opts.maxGames });
      perRegion.push({ region: proxy?.region ?? "direct", proxied: Boolean(proxy), games });
    } finally {
      await browser.close().catch(() => {});
    }
  }

  // Cloaking shows up as the same site answering differently by region.
  const verdicts = new Set(perRegion.map((r) => r.games.verdict));
  const conclusive = perRegion.filter((r) => r.games.verdict !== "inconclusive");
  const regionMismatch =
    conclusive.length > 1 && new Set(conclusive.map((r) => r.games.verdict)).size > 1;

  let verdict: ScanReport["verdict"];
  let summary: string;
  if (regionMismatch) {
    verdict = "suspicious";
    summary =
      "Different regions saw different behaviour, which is the signature of geo-targeted swapping. " +
      perRegion.map((r) => `${r.region}: ${r.games.verdict}`).join("; ");
  } else if (verdicts.has("suspicious")) {
    verdict = "suspicious";
    summary = conclusive.map((r) => r.games.reasoning)[0] ?? "Suspicious game origins.";
  } else if (conclusive.some((r) => r.games.verdict === "clean")) {
    verdict = "clean";
    summary = conclusive.find((r) => r.games.verdict === "clean")!.games.reasoning;
  } else {
    verdict = "inconclusive";
    summary = perRegion[0]?.games.reasoning ?? "Nothing observed.";
  }

  if (!proxied) {
    summary +=
      " NOTE: run without residential proxies, from a single datacentre IP. Geo-cloaking cannot be ruled out and " +
      "this must not be published as a geo-verified result.";
  }

  return {
    domain,
    scannedAt: new Date().toISOString().slice(0, 10),
    proxied,
    regionsChecked: perRegion.map((r) => r.region),
    licence,
    perRegion,
    regionMismatch,
    verdict,
    summary,
  };
}
