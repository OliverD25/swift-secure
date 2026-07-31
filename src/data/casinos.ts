/**
 * Directory data.
 *
 * `status` is the load-bearing field and must never be inflated:
 *
 *   listed    — in the index from public sources. No check has been run. This
 *               is the only honest value until the verification crawler exists
 *               and has actually visited the site.
 *   scanned   — the crawler ran against the public site. No commercial
 *               relationship, no badge issued, nothing endorsed.
 *   flagged   — the automated check saw something worth a human look.
 *   certified — passed verification AND is under active monitoring. Only ever
 *               set for a real, paying, verified client.
 *
 * Listing a real operator as `listed` is ordinary directory practice and is
 * what makes the outreach hook work ("you are in our index, want a free
 * check?"). Marking one `certified`, or `scanned` before a scan has actually
 * happened, would be a false claim about a third party's brand — the fastest
 * way to destroy the only asset this business has.
 *
 * Provenance: entries below are real operators compiled from public new-launch
 * trackers and review sites in July 2026. Licence numbers are second-hand
 * (the sites publishing them block automated reads) and should be re-checked
 * against each regulator's register before any of this is used commercially.
 */
export type CasinoStatus = "certified" | "scanned" | "listed" | "flagged";
export type VerificationLevel = "Bronze" | "Silver" | "Gold";

export interface Casino {
  /** URL segment for the per-casino verification page. */
  slug: string;
  name: string;
  domain: string;
  jurisdiction: string;
  licenceNumber?: string | null;
  launched?: string | null;
  platform?: string | null;
  /** Legal entity named on the licence, where a register confirms it. */
  operator?: string | null;
  /** Set only when the number was matched in the regulator's own register.
   *  "YYYY-MM-DD — registry name". Absent means the number is second-hand. */
  licenceVerified?: string | null;
  licenceExpiry?: string | null;
  status: CasinoStatus;
  /** Only meaningful when status === "certified". */
  level?: VerificationLevel | null;
  /** Date the crawler last ran, or "—" when it never has. */
  lastScanned: string;
  note?: string | null;
}

export const casinos: Casino[] = [
  {
    slug: "lucky-coin-casino",
    name: "Lucky Coin Casino",
    domain: "luckycoin.cash",
    jurisdiction: "Anjouan",
    licenceNumber: null,
    launched: "2026-05",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto-first casino and sportsbook, ~4,000 titles from around 54 studios. The Anjouan licence this brand is associated with (ALSI-202411002-FI1, ONCHAIN Technologies Ltd) lists luckycoin.com rather than this .cash domain; number withheld pending clarification.",
  },
  {
    slug: "casinok",
    name: "CasinOK",
    domain: "casinok.com",
    jurisdiction: "Curaçao GCB",
    licenceNumber: "OGL/2024/1800/1049",
    launched: "2025",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto-friendly, roughly 2,000 games, marketed on fast payouts.",
  },
  {
    slug: "vivaspin-casino",
    name: "VivaSpin Casino",
    domain: "vivaspin.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-142311005-FI2",
    launched: "2025",
    platform: null,
    operator: "Igloo Ventures SRL",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-11-14",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Multi-provider site, 5,000+ titles. Sources disagree on the regulator.",
  },
  {
    slug: "spinzen-casino",
    name: "Spinzen Casino",
    domain: "spinzen.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202409044-FI2",
    launched: "2026",
    platform: null,
    operator: "Fionex Holding LTD",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-09-22",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Large aggregated library, 120+ providers. Targets Nordics and Canada.",
  },
  {
    slug: "moemoe-casino",
    name: "MoeMoe Casino",
    domain: "moemoecasino.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202504039-FI2",
    launched: "2025",
    platform: null,
    operator: "Fin Tech Montana Azul Capital Limitada",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2027-04-21",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "4,300+ games from 20+ studios, crypto and card payments, no sportsbook.",
  },
  {
    slug: "kings-game-casino",
    name: "Kings Game Casino",
    domain: "kings.game",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202410033-FI2",
    launched: "2026",
    platform: null,
    operator: "Royal Way Limited",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-10-27",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto and fiat, 8,000+ titles from 70+ providers plus a sportsbook.",
  },
  {
    slug: "north-spin-casino",
    name: "North Spin Casino",
    domain: "northspin.com",
    jurisdiction: "Tobique",
    licenceNumber: "0000174",
    launched: "2026",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Canada-focused, Interac payouts, 6,000+ games from 47 providers.",
  },
  {
    slug: "winberry-casino",
    name: "Winberry Casino",
    domain: "winberry.casino",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202510054-FI2",
    launched: "2025",
    platform: null,
    operator: "3-102-937610 SRL",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-10-28",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Canada-focused, 1,000+ slots plus live dealer from 25-29 providers.",
  },
  {
    slug: "emberbet-casino",
    name: "EmberBet Casino",
    domain: "emberbet21.io",
    jurisdiction: "Anjouan",
    licenceNumber: null,
    launched: "2025",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Casino and sportsbook; operator runs multiple sister brands. Licence number seen in secondary sources belongs to a different domain in the official register; withdrawn pending verification.",
  },
  {
    slug: "turbosven-casino",
    name: "TurboSven Casino",
    domain: "turbosven.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202502014-FI1",
    launched: "2025",
    platform: null,
    operator: "Green Champions Leader SRL",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2027-02-11",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Large aggregated library plus sportsbook; no licence number in the site footer.",
  },
  {
    slug: "luckleopard-casino",
    name: "LuckLeopard Casino",
    domain: "luckleopard.casino",
    jurisdiction: "Anjouan",
    licenceNumber: null,
    launched: null,
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Casino plus sportsbook; no licence number published in the footer.",
  },
  {
    slug: "zenobet",
    name: "Zenobet",
    domain: "zenobet.io",
    jurisdiction: "Costa Rica — no gaming regulator",
    licenceNumber: null,
    launched: "2026-06",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 15 June 2026. The site names Costa Rica but publishes no gaming licence number. Costa Rica does not license online gambling — companies incorporate there and operate without gaming oversight.",
  },
  {
    slug: "grailbet",
    name: "Grailbet",
    domain: "grailbet.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202512005-FI1",
    launched: "2026-06",
    platform: null,
    operator: "Grail Technologies Ltd.",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-12-14",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 13 June 2026.",
  },
  {
    slug: "smash-casino",
    name: "Smash Casino",
    domain: "smash.casino",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202409012-FI1",
    launched: "2026-03",
    platform: null,
    operator: "Softon Ltd",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-09-06",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 16 March 2026.",
  },
  {
    slug: "royalen",
    name: "Royalen",
    domain: "royalen.com",
    jurisdiction: "Not published",
    licenceNumber: null,
    launched: "2026-03",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 9 March 2026.",
  },
  {
    slug: "allstars-casino",
    name: "Allstars Casino",
    domain: "allstars.io",
    jurisdiction: "Costa Rica — no gaming regulator",
    licenceNumber: null,
    launched: "2026-03",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 5 March 2026. The footer names Alsio Tech SRL, San Jose, Costa Rica and cites a 'Corporate Identification license number' of 3-102-935971 — that is a company registration number, not a gaming licence. Costa Rica issues no gaming licences.",
  },
  {
    slug: "casino-cat",
    name: "Casino Cat",
    domain: "casinocat.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202511009-FI1",
    launched: "2026-02",
    platform: null,
    operator: "Stratum Tech Limited",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-11-14",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 28 February 2026.",
  },
  {
    slug: "lucky-anon-casino",
    name: "Lucky Anon Casino",
    domain: "luckyanon.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202512022-FI1",
    launched: "2026-02",
    platform: null,
    operator: "3-102-940062 SRL",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2026-12-14",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 23 February 2026.",
  },
  {
    slug: "ala-win-casino",
    name: "Ala Win Casino",
    domain: "alawin.com",
    jurisdiction: "Not published",
    licenceNumber: null,
    launched: "2026-02",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 10 February 2026.",
  },
  {
    slug: "hercules-casino",
    name: "Hercules Casino",
    domain: "herculescasino.com",
    jurisdiction: "Anjouan",
    licenceNumber: "ALSI-202601043-FI2",
    launched: "2026-02",
    platform: null,
    operator: "Wild Blackfin Limited SRL",
    licenceVerified: "2026-07-30 — Anjouan Gaming Authority register",
    licenceExpiry: "2027-01-30",
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 5 February 2026.",
  },
  {
    slug: "spinko-casino",
    name: "Spinko Casino",
    domain: "spinko.co",
    jurisdiction: "Not published",
    licenceNumber: null,
    launched: "2026-01",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 28 January 2026.",
  },
  {
    slug: "bet-republic",
    name: "Bet Republic",
    domain: "betrepublic.com",
    jurisdiction: "Not published",
    licenceNumber: null,
    launched: "2026-01",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino; CryptoLists new-launch tracker dates the launch to 10 January 2026.",
  },
  {
    slug: "zizobet-casino",
    name: "ZizoBet Casino",
    domain: "zizobet.com",
    jurisdiction: "Anjouan",
    licenceNumber: null,
    launched: "2026-01",
    platform: null,
    status: "listed",
    level: null,
    lastScanned: "—",
    note: "Crypto casino launched 3 January 2026; also listed on an Anjouan-licensed casino directory. Domain confirmed live (host returned HTTP 403 to automated fetch).",
  },
];

export const certifiedCasinos = () => casinos.filter((c) => c.status === "certified");
export const featuredCasinos = () => casinos.slice(0, 6);
export const statusCount = (status: CasinoStatus) => casinos.filter((c) => c.status === status).length;
