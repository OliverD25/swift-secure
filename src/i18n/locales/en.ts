import type { Translation } from "../types";

/**
 * English source copy. The other eighteen locales fall back to this file per
 * key, so a string added here reaches every language without touching them.
 *
 * Two rules govern everything below, and both have been broken before:
 *
 * 1. This site speaks to players. It is a trust service. The free technical
 *    report we send casino operators is how we open a sales conversation, and
 *    it appears nowhere in public copy.
 * 2. Every number is counted from a file in this repository. Nothing is
 *    estimated, rounded up, or carried over from a previous draft.
 */
const en: Translation = {
  nav: {
    howItWorks: "How it works",
    methodology: "What we check",
    pricing: "For casinos",
    about: "About",
    faq: "FAQ",
    casinos: "The index",
    verify: "Check a badge",
    apply: "Casino sign-up",
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
    note: "Run one of the casinos listed here? The operator side of this site starts here.",
    button: "Casino sign-up",
  },
  // "Certified" until 5 August 2026. It claimed a judgement we do not make: we
  // confirm a licence number appears in a register, which is a smaller and true
  // thing. Seal.astro measures this string to size the badge, so a longer word
  // is safe here.
  seal: {
    certified: "Licence checked",
  },
  common: {
    certifiedSince: "Record dated",
    viewSealRecord: "Open the record",
    youProvide: "What this needs:",
  },
  // Only the wording lives here. Every figure is counted out of
  // src/data/casinos.ts while the site builds — see StatRow.astro.
  //
  // The middle tile is deliberate. Naming the concentration ourselves is worth
  // more than hiding it, because a reader who opens the index sees it in ten
  // seconds anyway, and a trust service caught presenting only flattering facts
  // has nothing left to sell. {regulator} is filled from the index too, so the
  // sentence stays true if the mix ever moves off Anjouan.
  stats: [
    { count: "listed", label: "Casinos listed" },
    {
      count: "topJurisdiction",
      label: "Of them under one regulator, {regulator}",
    },
    { count: "badged", label: "Carrying the badge today" },
  ],
  // Written for players. The technical checks we run for operators are an
  // internal tool for opening a conversation, and must not be described on any
  // public page.
  //
  // The sub-headline names the regulator and stops. An earlier draft added that
  // a regulator's rules "in many places" cover lab-tested games and approved
  // suppliers — cut, because 215 of the 223 casinos in our own index hold an
  // Anjouan licence, which imposes neither. The site would have been refuted by
  // its own directory, one click away.
  home: {
    title: "Swift Secured",
    description:
      "We validate casino licence data against the registers of the relevant regulators and record the technical condition of their pages. Every result is dated.",
    badge: "Independent. Not affiliated with any casino.",
    h1: "Independent audit of licence data and technical condition.",
    sub: "Our service performs a comprehensive technical audit of online casinos, validating licence data against the registers of the relevant regulators and recording the actual technical condition of game and payment pages. We document discrepancies in how licence information is presented across jurisdictions, ensuring every result is published with the date the check was carried out.",
    ctaApply: "See what we check",
    ctaVerify: "Check a badge",
    howEyebrow: "How it works",
    howTitle: "From register lookup to a dated public record",
    criteriaEyebrow: "What the badge means",
    criteriaTitle: "What a record establishes, and the rules that govern it",
    operatorsEyebrow: "Our index",
    operatorsTitle: "Casinos in our index — listed, not recommended",
    viewAllCasinos: "See the full index",
    ctaHeading: "How the audit is carried out",
    ctaSub:
      "The full method is published: which registers are read, how the technical condition of a page is recorded, and what each result does and does not establish.",
    ctaButton: "Read the method",
  },
  steps: [
    {
      n: "1",
      title: "Start with the licence number",
      desc: "A licensed casino publishes a licence number and the name of the regulator behind it, usually at the bottom of the page. That number, and the address of the site you would play on, are where we start.",
    },
    {
      n: "2",
      title: "Look for it in the regulator's register",
      desc: "We search the register kept by the regulator that issued the licence. Where the register publishes the sites a licence covers, we check whether this site is on that list.",
    },
    {
      n: "3",
      title: "Publish the answer with a date",
      desc: "Confirmed or unconfirmed, both get published, and both carry the day we checked. A licence we cannot find in the register is reported as unconfirmed, never as unlicensed.",
    },
    {
      n: "4",
      title: "Check it yourself",
      desc: "The record names the licence number and the regulator that issued it. Those registers are public, so you can repeat the check and never have to take our word for it.",
    },
  ],
  criteria: [
    {
      title: "The licence number is in the regulator's register",
      desc: "We look for the licence number, and for the address of the site itself, in the register kept by the regulator that issued it. Where that register also publishes the sites a licence covers, we check whether this one is on the list. That is the whole of what the badge says.",
    },
    {
      title: "We name the regulator, so you can judge it yourself",
      desc: "Regulators differ in what they demand of a casino and in what they publish. Every record names the regulator and the number, so you can read that regulator's rules and reach your own view of how much the licence is worth.",
    },
    {
      title: "Every record carries the day it was checked",
      desc: "Licences get renewed, moved to another company, or withdrawn. An answer without a date on it says nothing, so the date sits on every record, next to the answer.",
    },
    {
      title: "No payment will ever change a record",
      desc: "No casino can buy a confirmation, alter one, or have one taken down. A record changes when the register changes, and the new date goes on it.",
    },
  ],
  process: {
    title: "How it works",
    description:
      "How Swift Secured reads a casino's licence number, looks it up in the register of the regulator that issued it, names that regulator, and prints the date on every record.",
    eyebrow: "How it works",
    h1: "How a casino gets checked and listed",
    sub: "The procedure is fixed and published, so any result can be reproduced independently. We read the licence number a casino publishes, search for it in the register of the regulator that issued it, and record the answer with the date. The casino is not contacted, and nothing is required from the reader.",
    ctaHeading: "Run one of these casinos?",
    ctaButton: "Casino sign-up",
  },
  stages: [
    {
      n: "1",
      title: "We read what the casino says about its licence",
      duration: "Public pages only",
      desc: "The licence number and the name of the regulator, read from the casino's own pages. What we read is what that site showed us, from where we looked, on the day we looked. Some entries in the index came from public trackers and review sites instead. Those are marked as not checked until someone reads the number off the casino's own page.",
      provide: "Nothing. You can open the same page yourself.",
    },
    {
      n: "2",
      title: "We look the number up in the register",
      duration: "Public register only",
      desc: "We search the register kept by the regulator that issued the licence, including the list of approved site addresses where the regulator publishes one. Not every place has one. Some casinos name a jurisdiction with no gaming regulator, and some publish no number at all. Then there is nothing to search, and the record says that instead of pretending otherwise.",
      provide: "Nothing.",
    },
    {
      n: "3",
      title: "We publish the answer, the regulator and the date",
      duration: "Free to read",
      desc: "The record says which regulator issued the licence, what came back, and the day we looked. We name the regulator because regulators are not equal, and what one of them demands of a casino before granting a licence is the thing worth knowing. If no matching entry came back, the answer is unconfirmed. It is never unlicensed.",
      provide: "Nothing. No account, no email, no payment.",
    },
    {
      n: "4",
      title: "We will look again, and the date will move",
      duration: "On every re-check",
      desc: "Registers change. A licence lapses, is handed back, is reissued, or a site address is added or dropped. Every record here carries one date because it has been read once. When it is read again the answer is rewritten and the date moves with it, and the old answer is not hidden.",
      provide: "Nothing. But read the date before you trust the answer.",
    },
  ],
  pricing: {
    title: "For casinos",
    description:
      "Terms for operators. The badge is free for the first six months from the day it goes up. No setup fee, no card, no contract, and no payment changes what a record says.",
    eyebrow: "For casinos",
    h1: "What it costs to carry the badge",
    sub: "This page is for people who run casinos. If you came here to look a site up before depositing, the index is the page you want. We are new and no casino carries the badge yet. A badge from a company nobody has heard of is worth nothing, so we are not charging for one. Being in the index is free and no casino pays to be there.",
    billingTitle: "The whole arrangement",
  },
  // The four ids are load-bearing: other code and the outreach reports key off
  // them, so they stay. Their visible names and text no longer describe the
  // internal checks they were named after.
  tiers: [
    {
      id: "revenue-leak-scan",
      name: "What the badge confirms",
      summary:
        "One fact: the licence number on the casino's own page appears in the register of the regulator that issued it.",
      checks: [
        "The number is read from the casino's own pages, not copied from a third-party list",
        "It is looked up in the issuing regulator's own register, including the approved-address list where that regulator publishes one",
        "The record names that regulator, so you can find out what it demands of a casino and decide what the licence is worth",
        "Nothing else is confirmed. The badge is not a statement that a casino is safe",
      ],
    },
    {
      id: "dead-weight-finder",
      name: "How a record is dated",
      summary:
        "A register answer is true on the day it was read, and every record says which day that was.",
      checks: [
        "Where we have read the register, the record shows the day we read it, next to the answer and not in small print",
        "Where nobody has read it yet, the record says so rather than showing an answer we do not have",
        "An old date is left visible. Nothing is quietly refreshed to look newer than it is",
        "If the date is too old to trust, do not trust the answer. That is the right reaction, and it is why the date is there",
      ],
    },
    {
      id: "time-to-play-test",
      name: "What makes a record change",
      summary:
        "A register can change. The record follows it, and says which way it went.",
      checks: [
        "A licence that is withdrawn, handed back or expired is recorded as exactly that, not softened into unconfirmed",
        "A site address dropped from the regulator's approved list changes the record too",
        "No entry found is its own answer: unconfirmed, meaning we found nothing, not that we found something bad",
        "A record changes because the register changed. No payment, from anyone, changes what it says",
      ],
    },
    {
      id: "licence-match",
      name: "What we refuse to do",
      summary:
        "The limits are part of the product, not a footnote at the end of it.",
      checks: [
        "We never call a casino safe, recommended or trustworthy. Nobody can tell you that from outside",
        "We never call a casino unlicensed. No record found means unconfirmed, and that is all it means",
        "We say nothing about the games, the odds, or whether a win gets paid",
        "We do not grade casinos and we do not sell a better answer, a faster one, or a higher place in the list",
      ],
    },
  ],
  billingNotes: [
    {
      title: "What it costs today",
      desc: "Nothing. A listing in the index is free and stays free, whether you ever speak to us or not. The badge is free for the first six months, counted from the day it goes up on your site. No setup fee, no card, no contract.",
    },
    {
      title: "What we ask in return",
      desc: "One link, from your badge to your record here. That link is the consideration: it is how players check the badge is real, and it is how people find us. That is the whole exchange. No exclusivity, no revenue share, no referral fee, and nothing you can buy that changes what your record says.",
    },
    {
      title: "After six months",
      desc: "We have not set a price. We have no clients, so any figure now would be a guess we would have to withdraw later. You will hear the price before it applies and you can say no. Nothing renews on its own, because we never hold a payment method.",
    },
    {
      title: "If you want it gone",
      desc: "Delete one line from your page and the badge is gone. We do not ask why. Your record stays up with the date on it, because it is a record of what the register said, not an endorsement we can pull as leverage.",
    },
  ],
  methodology: {
    title: "What we check",
    description:
      "The full procedure: which registers are read, why every record carries a date, the defined perimeter of the audit, and what happens when a licence stops appearing.",
    eyebrow: "Methodology",
    h1: "How the audit is carried out",
    sub: "The audit is performed externally, from the position of an ordinary visitor, without an account and without any access granted by the casino. We take the licence number a site publishes and the address of the site, and search for both in the register maintained by the regulator that issued the licence. The result is published with the date it was recorded. This page sets out the procedure and the perimeter it runs inside.",
    checksTitle: "What we confirm",
    limitsTitle: "Scope of the audit",
    limitsSub:
      "Every audit has a defined perimeter, and ours is published so a reader can judge what a record is worth. It also states which registers are readable today, because a casino nobody has checked is marked not checked, and that is not the same word as unconfirmed.",
    monitoringTitle: "Why every record carries a date",
    monitoringBody:
      "A register is not a fixed thing. A licence lapses, a site address is added or dropped, a certificate is reissued under a new number. So an answer is only true on the day it was read, and we print that day beside the answer rather than leave you to guess. Every record here has been read once. When we read one again, the record is rewritten and the date moves with it, and the earlier answer is not hidden. An old date stays visible on purpose. It is better that you distrust a stale record than trust one that only looks fresh.",
    suspensionTitle: "When a badge comes down",
    suspensionBody:
      "If a licence stops appearing in the register, that is what the register says, and we publish it when we see it. We do not hold it back while the casino decides how to respond. A report from anyone, including a rival, is not a finding and never changes a record on its own. It only makes us read the register again, and what publishes is what the register said and the day we read it. The operator can send an answer, and it is added to the record when it arrives. If the licence is gone, the badge comes down and the record says what changed and when. No payment removes a record, and there is no fee that makes one say something friendlier.",
    ctaHeading: "Before you deposit, look the casino up.",
    ctaButton: "See the full index",
  },
  limits: [
    {
      title: "Whether the games are fair",
      desc: "Whether a spin is honest, and what a game really pays back over time, can only be established by an accredited testing lab with access to the game's own data. We are not a lab and we do not have that data. Some regulators require independent lab testing before they grant a licence and some do not, so a licence sitting in a register is not a substitute for that testing. We will not let the badge suggest it is.",
    },
    {
      title: "Who really made a game",
      desc: "We tried to establish this from outside and could not do it on any site we looked at. A casino can name any studio on a page. We cannot confirm the claim, so we do not repeat it as a finding.",
    },
    {
      title: "Anything behind a login",
      desc: "Every check is done as a visitor with no account. Deposits, withdrawals, identity checks, bonus terms and account settings are invisible to us, so we say nothing at all about them.",
    },
    {
      title: "Whether a big win gets paid",
      desc: "We do not test withdrawals, and whether a company can cover a large win is not visible from outside. Nothing in a record says whether you get your money.",
    },
    {
      title: "That a casino is safe",
      desc: "A licence is a permission the issuer can withdraw. That is all it is. What a regulator demands before granting one varies enormously, and a badge cannot tell two regulators apart. As of 4 August 2026, 215 of the 223 casinos in this index hold a licence from Anjouan, which is why we print the regulator's name on every record and expect you to look it up. We never call a casino safe.",
    },
  ],
  directory: {
    certified: {
      label: "Licence number confirmed",
      desc: "The licence number on the casino's site was found in the register of the regulator that issued it. The record names that regulator and the day we looked. Registers are incomplete and lag behind, so this means found on that day, in that register, and nothing more.",
    },
    scanned: {
      label: "Not found in register",
      desc: "We searched on the date shown and no matching entry came back. That is not the same as unlicensed. Registers are incomplete, go offline and lag behind. Some casinos also name a place with no gaming regulator, or publish no number at all, and then there is no register to search.",
    },
    listed: {
      label: "Not checked yet",
      desc: "In the index from public sources. The licence number here is second-hand and nobody has looked it up in the register. Being listed is not a recommendation.",
    },
    flagged: {
      label: "Held for a person to read",
      desc: "The lookup returned something that does not add up, such as a number matching nothing or a claim we could not follow. It is held back until a person reads it, and nothing is published as a conclusion until then.",
    },
    statusFilterAll: "All",
    lastScanned: "Record dated",
    viewReport: "Open the record",
  },
  casinos: {
    title: "Casino Directory",
    description:
      "Directory of new online casinos tracked by Swift Secured, each with its current verification status.",
    eyebrow: "Directory",
    h1: "Casino directory",
    sub: "Every casino in our index, with the regulator named on its licence and the date of any check. Listed is not checked, and checked is not recommended. Each card says which.",
    searchPlaceholder: "Search by casino name or jurisdiction",
    searchLabel: "Search certified casinos",
    empty: "No casinos match that search.",
  },
  verify: {
    title: "Verify a Seal",
    description:
      "Enter the seal ID shown on a casino's site to check it against the seals we have actually issued.",
    h1: "Verify a Seal",
    sub: "Enter the number printed on a badge. No badges have been issued yet, so today every lookup comes back empty.",
    inputPlaceholder: "e.g. CS-2026-0042",
    inputLabel: "Seal ID",
    button: "Verify",
    validStatus: "Valid & active seal",
    operator: "Operator:",
    jurisdiction: "Jurisdiction:",
    lastChecked: "Last checked:",
    invalidStatus: "No matching seal found",
    invalidBody:
      "No seal matches that ID. We have not issued any badges yet, so every lookup returns this today. If you believe this is an error,",
    contactUs: "contact us",
  },
  apply: {
    title: "For casinos: ask us to check your licence",
    description:
      "The operator side of Swift Secured. Tell us where your licence number is published and we will look it up in the register of the regulator that issued it, and publish what we find with the date.",
    eyebrow: "For casinos",
    h1: "Ask us to check your licence",
    sub: "This form is for operators. If you are here to look a casino up before depositing, the index is what you want. There is no department behind this form, so we make no promise about how fast you hear back and there is no promised date. There is nothing to pay and nothing to sign. If the register shows nothing against your number, we publish that too.",
    fieldName: "Casino name",
    fieldNamePlaceholder: "The name players see",
    fieldWebsite: "Website address",
    fieldJurisdiction: "Regulator that issued your licence",
    fieldJurisdictionPlaceholder: "e.g. Anjouan, Curacao GCB",
    fieldEmail: "Contact email",
    fieldMessage: "Anything else we should know?",
    fieldMessagePlaceholder:
      "Licence number, the page it is printed on, who to reply to",
    submit: "Send",
    successTitle: "Received",
    successBody:
      "It is with us. If we can act on it, you will hear back at {email} once a person has read it. We are new and small, so that can take a while, and we are not promising a date. If the register shows nothing against your number, we will tell you that as well.",
  },
  about: {
    title: "About",
    description:
      "Swift Secured audits online casinos from the outside, publishes the procedure in full, and states the perimeter every record runs inside.",
    eyebrow: "About",
    h1: "Independent by construction",
    sub: "Swift Secured audits online casinos and publishes each result with the date it was recorded. Operators pay to display a record. They never pay for what it says: no revenue share, no referral fee, and no arrangement under which a finding can be altered or withdrawn. The procedure is published in full, so any result can be repeated without taking our word for it.",
    card1Title: "No casino can buy a result",
    card1Body:
      "No payment will ever change what a record says, and no record comes down because someone asked. We will not take a share of a casino's revenue and we will not take a referral fee. A casino may one day pay to display a record. It will never pay for a word of what the record says.",
    card2Title: "Defined scope, published in full",
    card2Body:
      "Whether a game is fair, whether a large win is paid, and anything behind a login cannot be observed from outside. They fall outside the perimeter of this audit, and no record claims them. The scope is set out on the method page, in the same size type as the findings.",
  },
  faqPage: {
    title: "Questions",
    description:
      "What the badge confirms, what unconfirmed means, whether casinos pay us, and why we name the regulator instead of judging it for you.",
    eyebrow: "FAQ",
    h1: "Questions players ask",
    ctaHeading: "Run a casino? The operator side starts here.",
    ctaButton: "Casino sign-up",
  },
  faqs: [
    {
      q: "What does the badge actually mean?",
      a: "It means the licence number shown for that casino was found in the register kept by the regulator that issued it, on the date printed on the record. That is the whole claim. It is not a recommendation, and it is not a promise that you will be treated well.",
    },
    {
      q: "Do you check the games?",
      a: "No. We do not test games, spins or payout percentages, and we will not pretend to. That takes an accredited laboratory and millions of recorded spins, and no badge can do it from outside a casino. What we confirm is the licence, because the licence is the thing a casino can lose. A regulator sets the rules a licensed casino has to follow, and in many places those rules cover games tested by an accredited laboratory and suppliers the regulator has approved. The regulator, not us, is the body that can withdraw the licence. So a confirmed licence tells you the casino answers to someone with that power, and it tells you who that someone is, so you can read their rules yourself. It does not tell you we looked at the games. We did not.",
    },
    {
      q: "Does the casino pay you for the badge?",
      a: "No casino pays us for a result. No payment will ever change what a record says, and no record comes down because someone asked. If a casino ever pays us, it buys the right to display a record, never a word of what the record says.",
    },
    {
      q: "It says unconfirmed. Is the casino illegal?",
      a: "No, and we are careful with that word. Unconfirmed means we found no public record for that number. Registers go offline, numbers get printed wrong, licences get moved to another company name, and some regulators publish very little. It is not the same as unlicensed, and we never write that. Ask the casino for its licence details directly. A refusal to answer tells you more than our result does.",
    },
    {
      q: "I have a problem with a casino. Can you help?",
      a: "Not with money, a locked account or a refused withdrawal. We have no access to any account and no power over any casino, and saying otherwise would waste your time. The record names the regulator that issued the licence, and that is the body with power over the licence. Some regulators publish a complaints procedure and some publish almost nothing, so look at what the one named on the record actually offers before you count on it.",
    },
    {
      q: "Why should I trust a brand nobody has heard of?",
      a: "You should not, yet. Swift Secured is days old and no casino carries the badge. All we offer is a check you can repeat: the licence number is public, the register is public, and the date is on the record. Look it up yourself, and our name stops mattering.",
    },
  ],
  badge: {
    title: "The badge",
    description:
      "What the Swift Secured badge looks like, the one thing it confirms, and how to tell a real badge from a picture of one.",
    eyebrow: "The badge",
    h1: "What the badge means when you see it",
    sub: "One mark, three forms, one meaning. It reads Licence checked, because that is the only thing it says: on the date shown, we looked that casino's licence number up in the register of the regulator that issued it. Every real badge is a link. If it does not open a dated record here that names the regulator, it is a picture, not a badge.",
    primaryTitle: "The full badge",
    primaryBody:
      "The version you would meet in a footer or near a sign-up form. It says Licence checked, and it is deliberately plain, because a mark dressed up as an award is trying to tell you something nobody checked. Click it and it opens that casino's record here, with the regulator named at the top and the date we looked. No casino carries it yet.",
    compactTitle: "The small version",
    compactBody:
      "The same mark on one line, for a footer strip or a row of payment logos where there is no room. It links to the same record and means exactly the same thing. Small does not mean lesser, and there is no bigger badge that means more.",
    darkTitle: "On dark pages",
    darkBody:
      "Most casino sites are dark, so there is an outlined version with white type. Same mark, same words, same record. The colour is about staying readable, not a higher grade. We do not have grades.",
    ctaHeading: "Run a casino and want to carry it?",
    ctaButton: "Casino sign-up",
  },
};

export default en;
