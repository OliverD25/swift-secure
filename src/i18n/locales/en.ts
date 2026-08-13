import type { Translation } from "../types";

/**
 * English source copy. Every string the site shows lives here or in the two
 * hand-written locales beside it.
 *
 * Rewritten in full on 10 August 2026 from a single document the owner edited
 * offline — all 245 keys, in English, Ukrainian and Russian together, so the
 * three could not drift apart one key at a time.
 *
 * The site addresses operators first and players as well. That was decided on
 * 13 August 2026 and it is why the header leads with "For casinos". It replaces
 * an earlier line here saying the site speaks to players only.
 *
 * In practice both audiences read the same pages. An operator wants to know
 * what will be checked on their site and where the audit stops; that is the
 * same page which convinces a player the service is honest.
 *
 * Unchanged by that decision: the technical report sent to casino operators is
 * how a sales conversation opens, and it belongs in research/reports/, not on
 * any public page.
 */
const en: Translation = {
  nav: {
    howItWorks: "How it works",
    methodology: "What we check",
    pricing: "For casinos",
    about: "About",
    faq: "FAQ",
    casinos: "Casino index",
    verify: "Check a badge",
    apply: "Get certified",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
  },
  footer: {
    verifySeal: "Verify a Seal",
    apply: "Apply for Seal",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Operating an online casino? Boost player trust and first deposits with an independent audit.",
    button: "Get certified free",
  },
  seal: {
    certified: "Licence & slots verified",
  },
  // The `count` field is not copy. It names which figure StatRow counts out of
  // src/data/casinos.ts while the site builds — "listed", "topJurisdiction" or
  // "badged" — and the type will not accept anything else. Only `label` is
  // translated, and {regulator} in it is filled from the index.
  stats: [
    {
      count: "listed",
      label: "Casinos tracked",
    },
    {
      count: "topJurisdiction",
      label: "Licensed under {regulator}",
    },
    {
      count: "badged",
      label: "Displaying verified seal today",
    },
  ],
  common: {
    certifiedSince: "Record dated",
    viewSealRecord: "Open audit record",
    youProvide: "What this needs:",
  },
  home: {
    title: "Swift Secured — Independent Casino & Game Server Verification",
    description:
      "Verify casino licences against official regulator registries and detect scripted slots before making a deposit. Independent technical audit with public timestamps.",
    badge: "Independent Audit Service. 100% Unbiased.",
    h1: "Stop depositing blind: Verify licence & authentic game servers",
    sub: "We audit online casinos in real time. We trace live game servers to confirm slots are 100% original, verify active licence registration, and flag scam copycats before you risk your money.",
    ctaApply: "What we check",
    ctaVerify: "Check a badge",
    howEyebrow: "How it works",
    howTitle: "Real-time registry search to unalterable dated audit",
    criteriaEyebrow: "Security standards",
    criteriaTitle: "What our audit verifies — and the strict rules behind it",
    operatorsEyebrow: "Public Directory",
    operatorsTitle:
      "Tracked casinos in our index — verified, unconfirmed, or flagged",
    viewAllCasinos: "Explore casino index",
    ctaHeading: "Transparent technical methodology",
    ctaSub:
      "Learn exactly how we trace game server requests, cross-reference regulator registers, and detect manipulated RTP without taking operator payments for positive reviews.",
    ctaButton: "Read methodology",
  },
  criteria: [
    {
      title: "Direct Regulator Registry Verification",
      desc: "Hundreds of scam sites render fake licence logos in their footer. We verify licence numbers and active website domains directly inside official regulator databases.",
    },
    {
      title: "Complete Regulator Identity & Jurisdiction Rules",
      desc: "Licensing bodies differ widely in protection levels. Every record highlights the exact regulator name and licence ID so you can judge the legal strength behind it.",
    },
    {
      title: "Exact Verification Date & Timestamp",
      desc: "Licences expire, get suspended, or change domains overnight. Static claims mean nothing — every record prints the exact UTC date when the system performed the lookup.",
    },
    {
      title: "Unbuyable & Tamper-Proof Audit Records",
      desc: "No casino can pay to alter findings, conceal bad audit results, or erase record logs. Verification status changes only when registry data or server traces change.",
    },
    {
      title: "Authentic Game Server Audit (Anti-Scripted Slots)",
      desc: "Fake casinos copy game graphics but route spin math through private servers with rigged RTP. We inspect live network requests to ensure every spin connects directly to official provider servers.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Extract Licence & Domain Data",
      desc: "We parse the claimed licence number, corporate entity, and exact play URL directly from the target casino's public frontend.",
    },
    {
      n: "2",
      title: "Registry Cross-Match & Server Trace",
      desc: "We search the issuing regulator's official active database for matching domain approvals and analyze outgoing websocket/HTTP streams when games launch.",
    },
    {
      n: "3",
      title: "Publish Dated Audit Certificate",
      desc: "Whether confirmed, missing, or unverified, the complete audit record goes live with an immutable timestamp detailing every check conducted.",
    },
    {
      n: "4",
      title: "Independent One-Click Verification",
      desc: "Every record provides raw register destination links and network trace proof, allowing players to verify findings independently.",
    },
  ],
  process: {
    title: "How It Works — Verification Process",
    description:
      "How Swift Secured audits casino licence data, traces original game server endpoints, and publishes tamper-proof public audit records.",
    eyebrow: "Verification Process",
    h1: "How casinos get audited, verified, and indexed",
    sub: "Our technical procedure is fully automated and published, ensuring complete reproducibility. We extract published licence IDs, cross-reference official regulator lists, and trace live game requests without requiring casino access or player sign-up.",
    ctaHeading: "Operating a licensed online casino?",
    ctaButton: "Apply for verified seal",
  },
  stages: [
    {
      n: "1",
      title: "Public Data & Endpoint Extraction",
      duration: "Frontend scanning",
      desc: "We parse licence claims, operator corporate details, and site domain URLs directly from target site footers. Unverified tracker entries are explicitly marked as unchecked until a full live extraction is complete.",
      provide: "Nothing required from players or operators.",
    },
    {
      n: "2",
      title: "Regulator Registry & Server Trace",
      duration: "Public register only",
      desc: "We search official regulator databases for approved domain lists. Simultaneously, we launch test game sessions to confirm game math loads directly from provider CDNs (e.g., Pragmatic, Evolution).",
      provide: "No registration or fee required.",
    },
    {
      n: "3",
      title: "Independent Status & Timestamp Publishing",
      duration: "Free to read",
      desc: 'Results are generated instantly with the exact date of verification. If a licence cannot be found or domain validation fails, the record transparently states "unconfirmed" rather than hiding findings.',
      provide: "Open public access for all users.",
    },
    {
      n: "4",
      title: "Continuous Monitoring & Re-Check Cycles",
      duration: "On every re-check",
      desc: "Registries and game domains change over time. When a re-check occurs, the status and date update automatically. Historical check logs remain archived to prevent stealth changes.",
      provide: "Always verify the audit date on the badge.",
    },
  ],
  methodology: {
    title: "Technical Audit Methodology",
    description:
      "Full verification specification: how we check regulator registers, audit original slot servers, record dates, and revoke badges when licences expire.",
    eyebrow: "Methodology & Scope",
    h1: "Technical verification methodology & operational boundary",
    sub: "Audits are conducted externally from an ordinary player perspective without special access or operator intervention. We test published licence numbers, check active domain approvals in official registries, and trace live slot server requests. Every finding is dated and published.",
    checksTitle: "Verified technical parameters",
    limitsTitle: "Audit boundaries & limitations",
    limitsSub:
      "Every technical audit has strict boundaries. We explicitly state what we verify (licence validity, official slot servers) and what cannot be audited from outside (internal accounting, individual withdrawal decisions).",
    monitoringTitle: "Mandatory date stamping & monitoring",
    monitoringBody:
      "Regulator databases constantly update: licences expire, domains rotate, or certificates get revoked. A check is only accurate for the exact moment it was performed. We display the check date prominently. Older dates prompt a new automated audit. Archived findings are never quietly overwritten.",
    suspensionTitle: "Automated badge revocation rules",
    suspensionBody:
      "If a licence vanishes from a registry or a site switches to scripted game servers, the badge status updates immediately. Complaints or competitor reports do not alter status directly — they trigger an automated re-check. No fee or sponsorship can restore a badge for an invalid licence.",
    ctaHeading: "Always verify a casino before you deposit.",
    ctaButton: "Search casino index",
  },
  tiers: [
    {
      id: "licence-and-domain-scan",
      name: "Licence & Registry Match",
      summary:
        "Confirms official licence registration and verifies the active play domain in regulator records.",
      checks: [
        "Licence ID extracted directly from operator frontend",
        "Verified against official issuing regulator database",
        "Active website domain cross-matched on approved list",
        "Full transparency on jurisdiction parameters",
      ],
    },
    {
      id: "slot-server-audit",
      name: "Authentic Game Server Audit",
      summary:
        "Ensures slots run on genuine provider CDNs, preventing counterfeit games with manipulated RTP.",
      checks: [
        "Network request inspection during game initialization",
        "Verification of game math endpoints (Pragmatic, Play'n GO, Hacksaw, etc.)",
        "Detection of proxy servers and fake slot mirrors",
        "Confirmation of unaltered provider configurations",
      ],
    },
    {
      id: "dated-records",
      name: "Date & Time Proof",
      summary:
        "Every finding carries an immutable UTC timestamp showing exactly when the system audited the site.",
      checks: [
        "Clearly printed check date next to verification status",
        "Unchecked entries explicitly identified",
        "Visible historical record logs",
        "Immediate status updates upon re-audit",
      ],
    },
    {
      id: "strict-independence",
      name: "Independence Guarantees",
      summary:
        "Zero affiliate bias, zero paid status modifications, and zero promotional rankings.",
      checks: [
        "No affiliate links or pay-per-click casino referrals",
        "No paid rating upgrades or sponsored badge positions",
        "Objective technical findings over editorial opinions",
        "Open procedure for player self-verification",
      ],
    },
  ],
  limits: [
    {
      title: "Game RTP & Random Number Generators (RNG)",
      desc: "Evaluating long-term statistical RTP or RNG randomness requires internal server access and millions of logged spins across millions of rounds. While we confirm slots connect directly to official provider servers (who use accredited testing labs like iTech Labs or eCOGRA), we do not run independent RNG lab tests ourselves.",
    },
    {
      title: "Internal Account & Banking Procedures",
      desc: "Audits are performed from a visitor standpoint. Player identity verification (KYC), account closures, bonus wager requirements, and payment processing queues remain private inside the casino software and fall outside external technical checks.",
    },
    {
      title: "Guaranteed Withdrawal Security",
      desc: "External audits cannot inspect a casino operator's private bank accounts or liquidity reserves. A valid licence and original slots confirm regulatory compliance and genuine games, but cannot guarantee operational solvency or payout speed.",
    },
    {
      title: 'Subjective "Safe Casino" Endorsements',
      desc: "A licence is a regulatory permit subject to conditions. Requirements vary substantially between jurisdictions (e.g., MGA, Curacao, Anjouan). As of 4 August 2026, 215 of 223 indexed casinos hold Anjouan credentials. We provide raw facts and server proof so you can make informed decisions — we never issue generic safety guarantees.",
    },
  ],
  directory: {
    certified: {
      label: "Verified Licence & Slots",
      desc: "Licence number match confirmed in regulator registry AND game servers verified as authentic provider endpoints on the audit date.",
    },
    scanned: {
      label: "Unconfirmed / Registry Absence",
      desc: "Search returned no official registry match for the domain on the audit date. The operator may use an unlisted domain, unindexed licensing, or operate without a public permit.",
    },
    listed: {
      label: "Unchecked Entry",
      desc: "Indexed from public web sources. Automated backend scanning and slot server tracing have not been conducted for this site yet.",
    },
    flagged: {
      label: "Flagged / Discrepancy Found",
      desc: "Audit detected inconsistencies: e.g., domain mismatches, broken licence seals, or proxy server redirects during slot initialization.",
    },
    statusFilterAll: "All Statuses",
    lastScanned: "Audit Date",
    viewReport: "View full report",
  },
  casinos: {
    title: "Verified Casino Directory",
    description:
      "Directory of online casinos tracked by Swift Secured. Check live licence statuses, official regulator entries, and game server audit results.",
    eyebrow: "Casino Directory",
    h1: "Online casino audit directory",
    sub: "Search tracked casinos to view licence registry statuses, issuing jurisdictions, and game server verification logs. Listed entries do not imply endorsement.",
    searchPlaceholder: "Search by casino name, domain, or jurisdiction...",
    searchLabel: "Search audited casinos",
    empty: "No casinos match your search parameters.",
  },
  // The home-page lookup. Wording here is deliberately modest: for now the
  // index answers with a licence matched in a regulator's register and a date,
  // and says plainly that no technical scan has run. It must never read as a
  // verdict on a casino, because it is not one.
  checker: {
    inputPlaceholder: "Enter casino name or URL (e.g. Lucky Coin Casino or luckycoin.cash)",
    inputLabel: "Casino name, website address or licence number",
    button: "Check",
    steps: [
      { n: "1", title: "Enter the casino name or URL" },
      { n: "2", title: "We search our audit index" },
      { n: "3", title: "Read the licence and scan record" },
    ],
    footnote:
      "{count} casinos indexed. We report the licence number a casino publishes, whether it appears in the issuing regulator's own register, and the date we looked.",
    emptyInput: "Type a casino name, website address or licence number first.",
    recordEyebrow: "Index record",
    jurisdiction: "Jurisdiction",
    operator: "Licensed company",
    licence: "Licence number",
    licenceNone: "None published",
    licenceExpiry: "Licence expires",
    licenceExpired: "This date has passed. Ask the casino for a current licence.",
    licenceMatched: "Found in the {registry} when we looked on {date}",
    licenceSecondhand: "Taken from public sources. Not yet matched in a register.",
    scan: "Technical scan",
    scanNone: "Not run yet",
    noteLabel: "What we noticed",
    viewRecord: "Open the full record",
    multipleTitle: "More than one casino matches",
    multipleBody: "Choose the one you meant.",
    notFoundTitle: "Not in the index",
    notFoundBody:
      "We hold no record under that name, address or licence number. That is not a finding against the casino — it only means we have not indexed it yet.",
    notFoundBrowse: "Browse the index",
    notFoundApply: "Ask us to check it",
  },
  verify: {
    title: "Verify Seal Authenticity",
    description:
      "Enter a Swift Secured Seal ID to confirm an operator's live verification status and prevent fake badge usage.",
    h1: "Verify a Swift Secured Seal",
    sub: "Enter the unique Seal ID displayed on a casino site to confirm official audit validity and inspect underlying verification traces.",
    inputPlaceholder: "e.g. CS-2026-0042",
    inputLabel: "Seal ID",
    button: "Verify Seal",
    validStatus: "Valid & Active Verified Seal",
    operator: "Casino Brand / Operator:",
    jurisdiction: "Regulator Jurisdiction:",
    lastChecked: "Last Audit Date:",
    invalidStatus: "Unregistered / Invalid Seal ID",
    invalidBody:
      "No active verification record exists for this ID. The site displaying this mark may be using an unapproved or counterfeit badge image. If you suspect fraud,",
    contactUs: "contact our team",
  },
  apply: {
    title: "Casino Certification Application",
    description:
      "Submit your online casino brand for independent licence and game server audit. Build player trust and increase First Time Deposits (FTD).",
    eyebrow: "Operator Solutions",
    h1: "Get your casino audited & verified",
    sub: "Form for casino operators and platform owners. Displaying a verified Swift Secured seal proves your licence validity and authentic slot servers, removing player friction at the deposit stage. Audits are free for the first 6 months.",
    fieldName: "Casino Brand Name",
    fieldNamePlaceholder: "Primary player-facing brand name",
    fieldWebsite: "Active Website Domain",
    fieldJurisdiction: "Licensing Regulator",
    fieldJurisdictionPlaceholder: "e.g. Anjouan, Curacao GCB, MGA",
    fieldEmail: "Corporate Contact Email",
    fieldMessage: "Additional Technical Notes",
    fieldMessagePlaceholder:
      "Licence number, direct validation URL, or technical contact info",
    submit: "Submit for Audit",
    successTitle: "Application Submitted Successfully",
    successBody:
      "Our system and compliance team will review your domain and conduct game server trace tests. You will receive an audit status update at {email} within 24–48 hours.",
  },
  pricing: {
    title: "Verified Seal Terms & Pricing",
    description:
      "Free 6-month verification seal for online casinos. No setup fees, no credit card required, zero revenue share. Turn player doubt into deposits.",
    eyebrow: "Operator Solutions",
    h1: "Turn Player Skepticism Into First Deposits",
    sub: "New casino brands lose up to 70% of potential depositors due to trust deficits. Displaying an independent, tamper-proof verification seal instantly confirms your active licence and original game servers, boosting conversion rates without setup friction.",
    billingTitle: "Verification Program Details",
  },
  billingNotes: [
    {
      title: "Free Audit & Seal for 6 Months",
      desc: "Get fully audited and display the verified seal free for 6 months from integration date. No setup charges, no credit card, and no hidden contracts.",
    },
    {
      title: "Simple Reciprocal Link Requirement",
      desc: "All we require is linking the footer badge to your dedicated audit certificate on our site. This allows players to verify technical traces in real time. Zero revenue share or referral fees.",
    },
    {
      title: "Transparent Post-Trial Options",
      desc: "Before your 6-month trial ends, we will provide transparent renewal pricing options. There are no automated charges or forced subscriptions — you remain in total control.",
    },
    {
      title: "Instant Removal Option",
      desc: "Simply remove the badge code snippet from your site footer anytime to terminate integration. Your historical check records remain archived in our directory with full audit timestamps.",
    },
  ],
  badge: {
    title: "Verified Seal Formats & Integration",
    description:
      "Explore Swift Secured seal designs, visual badge formats, and technical guidelines on how players verify authentic audit links.",
    eyebrow: "Visual Seal Assets",
    h1: "Swift Secured badge integration & verification behavior",
    sub: "Available in three responsive formats designed for footer strips and registration forms. Every authentic badge functions as a direct cryptographic link to the live audit report. Static images without active links fail verification.",
    primaryTitle: "Standard Badge",
    primaryBody:
      "Designed for website footers alongside licence seals. Clean and authoritative. Clicking opens the casino's live verification report with game server trace proofs and registry check timestamps.",
    compactTitle: "Compact / Single-Line Variant",
    compactBody:
      "Horizontal format tailored for payment icon rows or mobile navigation bars. Retains full verification tracking and leads to the exact same audit certificate.",
    darkTitle: "Dark Theme Outline Variant",
    darkBody:
      "High-contrast outlined version styled for dark casino UIs. Maintains maximum readability without compromising visual brand integrity.",
    ctaHeading: "Ready to display the verified seal on your site?",
    ctaButton: "Get certified",
  },
  faqPage: {
    title: "Frequently Asked Questions",
    description:
      "Answers about licence registry checks, anti-scripted slot detection, operator independence, and verification criteria.",
    eyebrow: "FAQ & Transparency",
    h1: "Frequently asked questions by players & operators",
    ctaHeading: "Operating a casino? Apply for audit in under 2 minutes.",
    ctaButton: "Get certified free",
  },
  faqs: [
    {
      q: "What does the Swift Secured badge guarantee to a player?",
      a: "The badge proves that on the indicated audit date, the casino's domain was actively registered in official regulator records AND game spin requests connected directly to certified provider servers (confirming non-scripted, original RTP slots).",
    },
    {
      q: "How do you detect scripted or counterfeit slots?",
      a: "During testing, we inspect outgoing network traffic when slots launch. Official games stream math and assets directly from certified provider domains (e.g., Pragmatic, Evolution). If a site reroutes spin requests through unknown intermediate proxy servers to fake game outcomes, it is flagged as scripted.",
    },
    {
      q: "Can a casino pay to get verified or alter audit findings?",
      a: "Absolute zero payment influence. Verification status is automatically determined by registry queries and technical server traces. Operators can display audit badges, but cannot buy status changes or delete historical record logs.",
    },
    {
      q: 'What does an "unconfirmed" status mean for a casino?',
      a: "Unconfirmed means our system found no matching domain record in the official regulator database on the audit date. This can happen if registries go offline, domain approvals are pending, or the operator uses unregistered mirrors. It is a factual observation, not a legal declaration.",
    },
    {
      q: "Can Swift Secured resolve my withdrawal dispute with a casino?",
      a: "We do not manage player accounts or process payments. However, our audit certificate provides direct links to the official licensing authority named on the record, where you can submit official regulatory complaints.",
    },
    {
      q: "Why should players and operators trust Swift Secured?",
      a: "Because every claim is verifiable in one click. We publish raw registry search destinations and slot network endpoint traces so players do not have to rely on promises or affiliate reviews.",
    },
  ],
  about: {
    title: "About Swift Secured",
    description:
      "Learn about Swift Secured's mission: delivering transparent, automated, independent casino licence and game server audits.",
    eyebrow: "About Us",
    h1: "Independent verification built on technical facts",
    sub: "Swift Secured provides automated technical audits for online casinos. We verify regulator registry entries and audit slot server connections, publishing findings with precise timestamps. No paid placement, no affiliate links, and no tampered results.",
    card1Title: "Zero Commercial Bias",
    card1Body:
      "No casino can purchase a verified seal without passing technical checks. We refuse affiliate rev-share, pay-per-click referrals, and sponsored rating rankings. Findings remain purely objective.",
    card2Title: "Defined Technical Perimeter",
    card2Body:
      "We state audit capabilities transparently: we confirm official licence records and non-scripted slot endpoints, while explicitly noting limits regarding internal operator finances or player wagering rules.",
  },
};

export default en;
