import type { Browser, Request } from "playwright";
import { classify, type Origin } from "../signatures.ts";

export interface GameProbe {
  /** The tile/iframe we tried to open, for the report. */
  label: string;
  launched: boolean;
  origins: Record<Origin, string[]>;
  /** Providers and aggregators seen while this game loaded. */
  seen: string[];
}

export interface GamesResult {
  reachable: boolean;
  blockedReason?: string;
  probes: GameProbe[];
  /** Hosts serving game code from the operator's own domain. */
  selfHosted: string[];
  providersSeen: string[];
  aggregatorsSeen: string[];
  verdict: "clean" | "suspicious" | "inconclusive";
  reasoning: string;
}

const GAME_HINT =
  /(game|slot|casino|play|launch|iframe|gs\/|\/gs|launcher|rgs|gameplay)/i;

/**
 * Load the casino, open a handful of games, and record where their code and
 * API calls actually come from.
 *
 * Images, fonts and media are blocked. We only need request URLs, and on
 * metered residential bandwidth the payloads are the entire cost — blocking
 * them cuts a scan from tens of megabytes to a few.
 */
export async function checkGames(
  browser: Browser,
  domain: string,
  opts: { maxGames?: number; timeoutMs?: number } = {},
): Promise<GamesResult> {
  const maxGames = opts.maxGames ?? 5;
  const timeoutMs = opts.timeoutMs ?? 30_000;

  const context = await browser.newContext({
    locale: "en-GB",
    viewport: { width: 1366, height: 900 },
  });

  await context.route("**/*", (route) => {
    const type = route.request().resourceType();
    if (type === "image" || type === "font" || type === "media") return route.abort();
    return route.continue();
  });

  const page = await context.newPage();
  const requests: string[] = [];
  const record = (r: Request) => requests.push(r.url());
  page.on("request", record);

  const result: GamesResult = {
    reachable: false,
    probes: [],
    selfHosted: [],
    providersSeen: [],
    aggregatorsSeen: [],
    verdict: "inconclusive",
    reasoning: "",
  };

  try {
    const resp = await page.goto(`https://${domain}`, { waitUntil: "domcontentloaded", timeout: timeoutMs });
    const status = resp?.status() ?? 0;
    const text = await page.evaluate(() => document.body?.innerText?.slice(0, 400) ?? "").catch(() => "");

    // A 200 that says "turn on your VPN" is a block, not a homepage.
    if (status >= 400) {
      result.blockedReason = `HTTP ${status}`;
    } else if (/use your vpn|vpn required|vpn friendly|access denied|not available in your (country|region)/i.test(text)) {
      result.blockedReason = "geo/VPN interstitial";
    } else if (text.trim().length < 60) {
      result.blockedReason = "empty or placeholder page";
    }
    result.reachable = !result.blockedReason;

    if (result.reachable) {
      // Collect candidate game launch points: iframes plus links/tiles whose
      // href or text suggests a game.
      const candidates = await page.evaluate((hint) => {
        const re = new RegExp(hint, "i");
        const out: { label: string; href: string | null; kind: string }[] = [];
        for (const f of Array.from(document.querySelectorAll("iframe"))) {
          out.push({ label: f.getAttribute("title") || f.getAttribute("src") || "iframe", href: f.getAttribute("src"), kind: "iframe" });
        }
        for (const a of Array.from(document.querySelectorAll("a[href]")).slice(0, 400)) {
          const href = a.getAttribute("href") || "";
          const label = (a.textContent || "").trim().slice(0, 60);
          if (re.test(href) || re.test(label)) out.push({ label: label || href, href, kind: "link" });
        }
        return out.slice(0, 40);
      }, GAME_HINT.source);

      for (const c of candidates.slice(0, maxGames)) {
        const before = requests.length;
        let launched = false;
        try {
          if (c.href) {
            const url = new URL(c.href, `https://${domain}`).toString();
            await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs });
            // Games load their engine after the shell; give it a moment.
            await page.waitForTimeout(3500);
            launched = true;
          }
        } catch {
          /* a dead tile is not evidence of anything */
        }
        const slice = requests.slice(before);
        const origins: Record<Origin, string[]> = {
          provider: [], aggregator: [], self: [], neutral: [], ignore: [], unknown: [],
        };
        const seen = new Set<string>();
        for (const u of slice) {
          const k = classify(u, domain);
          if (!origins[k.origin].includes(k.host)) origins[k.origin].push(k.host);
          if (k.label) seen.add(k.label);
        }
        result.probes.push({ label: c.label.slice(0, 60), launched, origins, seen: [...seen] });
      }
    }
  } catch (err) {
    result.blockedReason ??= `navigation failed: ${(err as Error).message.split("\n")[0].slice(0, 120)}`;
  } finally {
    page.off("request", record);
    await context.close().catch(() => {});
  }

  // Aggregate across probes.
  const allProviders = new Set<string>();
  const allAggregators = new Set<string>();
  const selfHosts = new Set<string>();
  for (const p of result.probes) {
    for (const h of p.origins.self) selfHosts.add(h);
    for (const label of p.seen) {
      if (knownIsAggregator(label)) allAggregators.add(label);
      else allProviders.add(label);
    }
  }
  result.selfHosted = [...selfHosts];
  result.providersSeen = [...allProviders];
  result.aggregatorsSeen = [...allAggregators];

  const launchedCount = result.probes.filter((p) => p.launched).length;
  const recognised = result.providersSeen.length + result.aggregatorsSeen.length;

  if (!result.reachable) {
    result.verdict = "inconclusive";
    result.reasoning = `Site not reachable for checking (${result.blockedReason}). No conclusion drawn.`;
  } else if (launchedCount === 0) {
    result.verdict = "inconclusive";
    result.reasoning = "No game could be opened, so nothing was observed. This is not a negative finding.";
  } else if (recognised > 0) {
    result.verdict = "clean";
    result.reasoning =
      `Games served from recognised infrastructure: ${[...result.providersSeen, ...result.aggregatorsSeen].join(", ")}.`;
  } else if (result.selfHosted.length > 0) {
    result.verdict = "suspicious";
    result.reasoning =
      `Game traffic came only from the operator's own hosts (${result.selfHosted.join(", ")}) with no recognised ` +
      `provider or aggregator seen. Needs a human look — it can also mean the provider is simply missing from our ` +
      `signature database.`;
  } else {
    result.verdict = "inconclusive";
    result.reasoning = "Game traffic did not match any known signature. Likely a gap in the signature database.";
  }

  return result;
}

// Cheap lookup so the aggregate step can split the two categories back out.
import { knownAggregatorNames } from "../signatures.ts";
const aggregatorSet = new Set(knownAggregatorNames());
function knownIsAggregator(label: string) {
  return aggregatorSet.has(label);
}
