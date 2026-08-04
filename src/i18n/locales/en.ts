import type { Translation } from "../types";

const en: Translation = {
  nav: {
    howItWorks: "How it works",
    methodology: "Methodology",
    pricing: "Pricing",
    about: "About",
    faq: "FAQ",
    casinos: "Casinos",
    verify: "Verify",
    apply: "Apply",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
  },
  footer: {
    verifySeal: "Verify a Seal",
    apply: "Apply",
    faq: "FAQ",
  },
  stickyCta: {
    note: "Free technical check. Nothing to sign.",
    button: "Ask for a free check",
  },
  seal: {
    certified: "Certified",
  },
  common: {
    certifiedSince: "Certified since",
    viewSealRecord: "View seal record",
    youProvide: "You provide:",
  },
  // Every figure recomputed from research/audit-sweep-battlefield.json, 4 August
  // 2026, over the 1222 readable records. The previous four — "340+ casinos
  // certified", "2.1M seals scanned / mo", "6 yrs auditing operators" — were
  // invented. We have no clients and no history, and an operator who checks
  // would find that out faster than they would find anything else on the page.
  stats: [
    { value: "1,311", label: "Casino domains swept" },
    { value: "1,222", label: "Readable from our crawler" },
    { value: "135", label: "Median homepage requests" },
    { value: "1.9 MB", label: "Median homepage weight" },
  ],
  home: {
    title: "Swift Secure",
    description:
      "Swift Secure runs a free technical check on casino homepages: requests that fail, the single heaviest file, time to a usable Register button, and the licence number against the regulator's own register. We publish what we checked and what we did not.",
    // "Trusted by 340+ licensed operators" was here. Nobody carries the badge.
    // Saying so first is the only version of this line that survives an
    // operator spending thirty seconds on the directory page.
    badge: "New. Nobody carries the badge yet.",
    h1: "We check casino sites and tell you what is broken.",
    sub: "Measured from outside, with no access to your systems. Every finding comes with the exact URL and a command that reproduces it — and we publish the checks we do not run, at the same size as the ones we do.",
    ctaApply: "Ask for a free check",
    ctaVerify: "Verify a Seal",
    howEyebrow: "How it works",
    howTitle: "From a free check to a dated public page",
    criteriaEyebrow: "The Casino Health Report",
    criteriaTitle: "Four checks, run from outside your site",
    operatorsEyebrow: "Our index",
    operatorsTitle: "Casinos in our index — listed, not endorsed",
    viewAllCasinos: "See the full index",
    ctaHeading: "Want the same checks run on your site?",
    ctaSub: "Free, and there is nothing to sign.",
    ctaButton: "Ask for a free check",
  },
  // The old flow began with the operator applying. Ours begins with us having
  // already run the checks and sent the result — which is what the 21 outreach
  // reports actually do, and the site has to describe the same sequence.
  steps: [
    { n: "1", title: "You get a report", desc: "We run the checks from outside and send what we found, with a command to reproduce every line. Nothing to sign, no reply needed." },
    { n: "2", title: "You fix what matters", desc: "Each finding names the exact file or URL. Most are fixable the same afternoon, and many belong to your platform provider rather than your team." },
    { n: "3", title: "You decide if it goes public", desc: "If you want the result public we issue a badge linking to a dated page that states exactly what was and was not checked." },
    { n: "4", title: "We re-check before we publish", desc: "Every finding is re-run against your live site on the day it is sent or published. Anything that no longer reproduces is removed." },
  ],
  // The four checks named in research/methodology.md §1a, replacing five claims
  // of which four were things this project has established it cannot do from
  // outside: RNG fairness needs an accredited lab, payout timeliness needs
  // account access, funds segregation and breach history are not observable,
  // and the responsible-gambling text matching was withdrawn entirely (§5).
  criteria: [
    { title: "Revenue Leak Scan", desc: "Requests that fail while your homepage loads — payment icons, game modules, your own APIs. Reported with the URL and a command to reproduce them." },
    { title: "Dead Weight Finder", desc: "The single largest file your homepage loads, named with its URL and its size. One file to fix, not a page-weight score." },
    { title: "Time-to-Play Test", desc: "Seconds until the Register button can be tapped on a throttled mobile connection, with the settings we used." },
    { title: "Licence Match", desc: "The licence number on your site, looked up in the regulator's own register. No record is reported as unconfirmed, never as unlicensed." },
  ],
  process: {
    title: "How the check works",
    description:
      "Four stages from a free technical check to a dated public page. Nothing behind a login, no access to your systems, and nothing to sign.",
    eyebrow: "The process",
    h1: "How the check works, step by step",
    sub: "Four stages, none of which need anything from you. We produce your report without asking for access, and we still need none.",
    ctaHeading: "Want the same checks run on your site?",
    ctaButton: "Ask for a free check",
  },
  stages: [
    {
      n: "1",
      title: "We run the checks",
      duration: "Minutes",
      desc: "Run from outside your site: requests that fail on the homepage, the single largest file it loads, time to a usable Register button, and the licence number against the regulator's register.",
      provide: "Nothing. No access, no login, no code on your page.",
    },
    {
      n: "2",
      title: "We re-check before sending",
      duration: "Same day",
      desc: "Every finding is re-run against your live site on the day the report goes out. Anything that no longer reproduces is removed rather than left in to make the report look fuller.",
      provide: "Nothing.",
    },
    {
      n: "3",
      title: "You get the report, free",
      duration: "Free",
      desc: "It names what we found, what we checked and found nothing wrong with, and what we did not check at all. A report only contains checks that actually ran on your site.",
      provide: "Nothing. No fee, no card, nothing to sign.",
    },
    {
      n: "4",
      title: "If you want it public",
      duration: "Free for six months",
      desc: "We issue a badge linking to a dated page stating exactly what was and was not checked. Remove it any time by deleting one line of HTML.",
      provide: "A link from your site to that page.",
    },
  ],
  // The page keeps its route and its nav item. A B2B site with no page about
  // money reads as "we quote based on how rich you look", which is exactly the
  // fear a free offer has to answer. What goes is the price table: 21 operators
  // were emailed an offer of free for six months, and would otherwise land on
  // €200–€700 per month plus a €300–500 setup fee.
  //
  // No future price is named — not ours, not a competitor's. We have no clients,
  // so any number is a guess we would have to walk back. No scarcity cap either:
  // those 21 emails promised an uncapped six months, and a limit invented
  // afterwards is a second contradiction rather than a fix.
  pricing: {
    title: "Pricing",
    description:
      "Swift Secure is new and has no clients yet. The technical check is free, and the badge is free for the first six months. No setup fee, no card, no contract.",
    eyebrow: "Pricing",
    h1: "The check is free. The badge is free for six months.",
    sub: "We are new and nobody carries the badge yet. A badge from an issuer with no track record is worth nothing, so we are not charging for one. This page is the whole arrangement.",
    billingTitle: "The whole arrangement",
  },
  // Was Bronze / Silver / Gold, a paid ladder describing work we do not do:
  // real-money withdrawal tests, bonus-term audits, complaint-history review.
  // Bronze also asserted game-provider verification, which research/
  // methodology.md §6 records as tested and confirmed impossible — provider
  // hosts found on live sites: zero. The site was making the one claim the
  // project had specifically proved it could not make.
  //
  // These are now the four checks that actually run, each with what it does,
  // how it is reported, and what it deliberately stops short of saying.
  tiers: [
    {
      id: "revenue-leak-scan",
      name: "Revenue Leak Scan",
      summary: "Requests that fail while your homepage loads.",
      checks: [
        "Every failing request recorded with its full URL, not just a count",
        "Refusals aimed at our crawler separated out and never reported as your breakage",
        "Failures on your own domain separated from your platform vendor's",
        "Each one reproducible by you with a single curl command",
      ],
    },
    {
      id: "dead-weight-finder",
      name: "Dead Weight Finder",
      summary: "The single largest file your homepage loads.",
      checks: [
        "Named with its URL, its size and its type — one file, not a score",
        "Page totals are measured but never quoted: on a site that streams video the total overstated the real transfer by 3.4x",
        "Compared against a measured market median of 1.9 MB across 1,222 sites",
        "Confirmable with one curl command against the file itself",
      ],
    },
    {
      id: "time-to-play-test",
      name: "Time-to-Play Test",
      summary: "Seconds to a usable Register button on a slow mobile connection.",
      checks: [
        "Run on a phone-sized viewport with the connection throttled to a named profile",
        "The button is never clicked — we measure readiness, not create accounts",
        "The throttle settings are stated so you can repeat the measurement",
        "If our detector finds no button we report that as unmeasured, never as missing",
      ],
    },
    {
      id: "licence-match",
      name: "Licence Match",
      summary: "Your licence number, looked up in the regulator's own register.",
      checks: [
        "The number is read from your own page, not from a third-party list",
        "Checked against the regulator's register, including the approved-domain list",
        "No public record is reported as unconfirmed — never as unlicensed",
        "Certificates expire and get reissued, and we say so rather than implying fault",
      ],
    },
  ],
  billingNotes: [
    {
      title: "What it costs today",
      desc: "Nothing. The technical check is free and the badge is free for the first six months. No setup fee, no card and no contract. The technical checks stay free after that either way.",
    },
    {
      title: "What we ask instead",
      desc: "If you take the badge, it links back to your verification page here, and we may name you as one of the first operators we checked. That is the whole exchange — no exclusivity, no revenue share, no referral fee.",
    },
    {
      title: "After six months",
      desc: "We have not set a price. We have no clients, so any number would be a guess and we would have to walk it back. We will tell you the price before it applies and you can say no. Nothing renews on its own, because we never take a payment method.",
    },
    {
      title: "If you want it gone",
      desc: "Delete one line of HTML. We do not ask why, and your verification page stays up with the date it was last checked — it is a record of what we measured, not an endorsement we can withdraw as leverage.",
    },
  ],
  methodology: {
    title: "Verification Methodology",
    description:
      "Exactly what Swift Secure checks before issuing a badge, how often it is re-checked, and what we deliberately do not claim to verify.",
    eyebrow: "Methodology",
    h1: "What the badge actually means",
    // The standing rule that closes the gap between this page and a report.
    // We advertise four checks; a given report may contain fewer, because the
    // generator only composes the checks that actually ran. An operator holding
    // a two-check report must find the explanation here rather than having to
    // ask "where is my licence result?".
    sub: "A trust mark is only worth what stands behind it. This is the full method, including the checks we do not perform, so nobody has to guess. A report only ever contains the checks that actually ran on your site, and it names them — if a check is not named in your report, it did not run.",
    checksTitle: "The four checks, and what each one stops short of claiming",
    limitsTitle: "What we do not verify",
    limitsSub:
      "Published deliberately. A seal that implies more than it checks is worse than no seal, and this is the line we hold when something goes wrong at an operator carrying our badge.",
    monitoringTitle: "Verified-at-Send",
    monitoringBody:
      "Every finding is re-run against the live site on the day it is sent or published, and anything that no longer reproduces is removed rather than left in. Findings go stale — one site fixed an issue between our sweep and our checking it a day later. The verification page always shows the date it was last run, so nobody has to guess how old the result is.",
    suspensionTitle: "How a badge gets suspended",
    suspensionBody:
      "If a complaint arrives or the crawler sees something abnormal, the operator gets 48 hours to respond privately before anything changes publicly — that protects against false reports from competitors. If the problem is real, the badge comes down and the verification page is updated with the facts. We do not remove pages for payment, and there is no fee that makes a finding disappear.",
    ctaHeading: "Want your platform checked?",
    ctaButton: "Request a scan",
  },
  limits: [
    {
      title: "RTP and whether individual results are fair",
      desc: "Proving this needs millions of spins or direct data from the provider. No verification service on this market genuinely does it, and we will not imply that we do.",
    },
    {
      title: "Where the games actually come from",
      desc: "We tried. Operators serve game content through their own domains and unbranded CDNs, so the studio behind a game cannot be established from outside. We record which studios a site names and the date it named them. We do not verify the claim.",
    },
    {
      title: "Anything behind a login",
      desc: "Every check runs as a first-time visitor with no account. Deposits, withdrawals, KYC and account settings are invisible to us, so we say nothing about them.",
    },
    {
      title: "Whether an operator can pay a large win",
      desc: "Solvency is not visible from outside, and we do not test withdrawals. Nothing we publish is a statement about whether a jackpot gets paid.",
    },
    {
      title: "That an operator will never treat a player badly",
      desc: "The badge reports four measurements taken on one day from outside the site. It is a record of what we measured, not a character reference.",
    },
  ],
  directory: {
    certified: {
      label: "Verified",
      desc: "Checked, and the operator chose to publish the result. The verification page shows the date it was last run.",
    },
    scanned: {
      label: "Scanned",
      desc: "Checked automatically by our crawler. No commercial relationship, and no badge issued.",
    },
    listed: {
      label: "Listed",
      desc: "In our index from public sources. No check has been run yet and nothing here is endorsed.",
    },
    flagged: {
      label: "Needs review",
      desc: "The automated check found something that needs a human look before any conclusion.",
    },
    statusFilterAll: "All",
    lastScanned: "Last checked",
    viewReport: "View report",
  },
  casinos: {
    title: "Casino Directory",
    description: "Directory of new online casinos tracked by Swift Secure, each with its current verification status.",
    eyebrow: "Directory",
    h1: "Casino directory",
    sub: "Every new casino we index, with its current status. Most are listed from public sources and have not been checked yet — the status on each card says which.",
    searchPlaceholder: "Search by casino name or jurisdiction",
    searchLabel: "Search certified casinos",
    empty: "No casinos match that search.",
  },
  verify: {
    title: "Verify a Seal",
    description: "Enter the seal ID shown on a casino's site to check it against the seals we have actually issued.",
    h1: "Verify a Seal",
    sub: "Enter the seal ID shown on the casino's site to confirm it's genuine and current.",
    inputPlaceholder: "e.g. CS-2026-0042",
    inputLabel: "Seal ID",
    button: "Verify",
    validStatus: "Valid & active seal",
    operator: "Operator:",
    jurisdiction: "Jurisdiction:",
    lastChecked: "Last checked:",
    invalidStatus: "No matching seal found",
    invalidBody: "No seal matches that ID. We have not issued any badges yet, so every lookup returns this today. If you believe this is an error,",
    contactUs: "contact us",
  },
  apply: {
    title: "Apply for Certification",
    description: "Get your Swift Secure seal in as little as 10 days. Tell us about your platform — our compliance team responds within 48 hours.",
    eyebrow: "Apply for certification",
    h1: "Get your seal in as little as 10 days",
    sub: "Tell us about your platform. Our compliance team responds within 48 hours.",
    fieldName: "Casino name",
    fieldNamePlaceholder: "Northgate Interactive",
    fieldWebsite: "Website URL",
    fieldJurisdiction: "Licensing jurisdiction",
    fieldJurisdictionPlaceholder: "e.g. Malta, Curacao",
    fieldEmail: "Contact email",
    fieldMessage: "Anything else we should know?",
    fieldMessagePlaceholder: "Launch date, target markets, current audits...",
    submit: "Submit application",
    successTitle: "Application received",
    successBody: "Our team will reach out to {email} within 48 hours to start the audit.",
  },
  // Was: "An independent check on new casinos, since 2020", an audit "players
  // and casinos both trust", and a team of "ex-regulators and RNG engineers".
  // None of it true. The project is days old, has no clients, no team and no
  // RNG capability — the methodology page says so explicitly two clicks away,
  // so this page was arguing against our own documentation.
  about: {
    title: "About",
    description: "Swift Secure is new. We run four measurements on casino homepages from the outside, publish the method in full, and say plainly what we cannot check.",
    eyebrow: "About",
    h1: "New, and saying so",
    sub: "We started in 2026 by measuring 1,311 casino sites to find out what could honestly be checked from outside. Most of what verification services advertise turned out not to be checkable that way, so we do not offer it.",
    card1Title: "Nothing changes what a check reports",
    card1Body: "No revenue share, no referral fees, and the check is free — so there is no fee to withhold and nothing to buy. A finding is removed only when it stops reproducing on the live site.",
    card2Title: "We publish what we cannot do",
    card2Body: "The methodology page lists the checks we do not perform at the same size as the ones we do, including the one we tried and abandoned. A mark that implies more than it measures is worth less than no mark.",
  },
  faqPage: {
    title: "FAQ",
    description: "What Swift Secure checks, what it deliberately does not check, what it costs, and how to reproduce any finding yourself.",
    eyebrow: "FAQ",
    h1: "Frequently asked questions",
    ctaHeading: "Still have questions?",
    ctaButton: "Get in touch",
  },
  faqs: [
    {
      q: "How much does the check cost?",
      a: "Nothing. The technical check is free, and the badge is free for the first six months. There is no setup fee, no card and no contract. We have not set a price for after six months, because we have no clients yet and any number would be a guess.",
    },
    {
      q: "What do you actually check?",
      a: "Four things, all from outside your site with no access to your systems: requests that fail while your homepage loads, the single largest file it loads, how long it takes before the Register button can be tapped on a slow mobile connection, and your licence number against the regulator's own register.",
    },
    {
      q: "What can you not check?",
      a: "Anything behind a login. Where your games actually come from — operators serve game content through their own domains, so the studio behind a game cannot be established from outside. RNG fairness, which needs an accredited lab and millions of spins. Whether an operator can pay a large win.",
    },
    {
      q: "My report only listed two checks. Why?",
      a: "A report only ever contains the checks that actually ran on your site, and it names them. If a check is not named in your report, it did not happen. Ask and we will run the others.",
    },
    {
      q: "How do I know the findings are real?",
      a: "Every finding carries the exact URL and a command you can paste into a terminal to reproduce it. We also re-run every finding against your live site on the day the report is sent, and remove anything that no longer reproduces.",
    },
    {
      q: "Do we have to do anything to get a report?",
      a: "No. We run the checks without asking you for anything, and send the result whether or not you ever reply. Taking the badge is a separate decision you make afterwards.",
    },
    {
      q: "What happens if you find nothing?",
      a: "You get a report saying exactly that. We do not add weak findings to make a report look fuller — that would destroy the only thing that makes it worth reading.",
    },
    {
      q: "Can we remove the badge later?",
      a: "Delete one line of HTML. We do not ask why. Your verification page stays up with the date it was last checked, because it is a record of what we measured rather than an endorsement we withdraw as leverage.",
    },
    {
      q: "Do you take referral fees from casinos?",
      a: "No. No revenue share, no referral fees, and no payment of any kind changes what a check reports.",
    },
  ],
  badge: {
    title: "The Swift Secure Seal",
    description: "Brand reference for the Swift Secure certification seal: primary badge, compact lockup, and dark-background variant.",
    eyebrow: "The seal",
    h1: "Swift Secure",
    sub: "One badge, three forms. Simple enough to sit next to a footer logo, clear enough to mean something at a glance.",
    primaryTitle: "Primary seal",
    primaryBody:
      "The full badge, for a homepage hero or footer. One weight of stroke, one accent color, no gradients or extra ornament — it has to read clearly at any size, even shrunk to 60px.",
    compactTitle: "Compact lockup",
    compactBody: "For a checkout page, footer strip, or anywhere horizontal space is tight. Same icon, same wordmark, one line.",
    darkTitle: "Dark-background variant",
    darkBody:
      "For casino sites with dark themes: the ring switches to an outlined icon and white type so it stays legible without needing a white plate behind it.",
    ctaHeading: "Want to display Swift Secure on your site?",
    ctaButton: "Apply for Certification",
  },
};

export default en;
