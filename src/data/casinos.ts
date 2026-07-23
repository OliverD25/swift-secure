export interface Casino {
  name: string;
  jurisdiction: string;
  since: string;
}

export const casinos: Casino[] = [
  { name: "Northgate Interactive", jurisdiction: "Malta Gaming Authority", since: "Mar 2025" },
  { name: "Reef & Rail Casino", jurisdiction: "Isle of Man", since: "Jan 2025" },
  { name: "Vantage Play", jurisdiction: "Curaçao", since: "Jun 2025" },
  { name: "Lucky Harbor Gaming", jurisdiction: "Malta Gaming Authority", since: "Nov 2024" },
  { name: "Aurora Bet", jurisdiction: "UK Gambling Commission", since: "Feb 2026" },
  { name: "Dune Stakes", jurisdiction: "Curaçao", since: "Sep 2025" },
  { name: "Crestline Casino", jurisdiction: "Malta Gaming Authority", since: "Apr 2025" },
  { name: "Anchor & Ace", jurisdiction: "Isle of Man", since: "Dec 2024" },
  { name: "Cobalt Fortune", jurisdiction: "UK Gambling Commission", since: "Jul 2025" },
];

export const featuredCasinos: Casino[] = casinos.slice(0, 6);
