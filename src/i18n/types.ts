/** Which figure StatRow counts out of src/data/casinos.ts at build time.
 *  There is deliberately no way to write a stat value by hand: the first four
 *  on this site were invented outright, and the three that replaced them were
 *  correct on 5 August and wrong the next time a casino was added. */
export type StatCount = "listed" | "topJurisdiction" | "registryMatched" | "badged";

export interface Stat {
  count: StatCount;
  /** May contain {regulator}, replaced with the most common jurisdiction in
   *  the index — so the sentence survives the mix shifting away from Anjouan. */
  label: string;
}
export interface Step {
  n: string;
  title: string;
  desc: string;
}
export interface Criterion {
  title: string;
  desc: string;
}
/** One numbered step under the home-page casino lookup. Shorter than `Step`:
 *  it labels an action the visitor is doing right now, not a stage of the
 *  audit, so there is nothing to describe underneath it. */
export interface CheckStep {
  n: string;
  title: string;
}
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
export interface Plan {
  name: string;
  price: string;
  cadence: string;
  features: string[];
}
export interface BillingNote {
  title: string;
  desc: string;
}
/** One-off charges that sit alongside the monthly plans. */
export interface AddOn {
  name: string;
  price: string;
  desc: string;
}
/** Bronze / Silver / Gold — what is actually checked, priced as an upsell path. */
export interface Tier {
  id: string;
  name: string;
  summary: string;
  checks: string[];
}
/** A line in the "what we deliberately do not verify" list. Kept in the data
 *  rather than prose so it stays as prominent as the claims themselves. */
export interface Limit {
  title: string;
  desc: string;
}
export interface DirectoryStatus {
  label: string;
  desc: string;
}
export interface Stage {
  n: string;
  title: string;
  duration: string;
  desc: string;
  provide: string;
}
export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
}
export interface Faq {
  q: string;
  a: string;
}

export interface Translation {
  nav: {
    howItWorks: string;
    methodology: string;
    pricing: string;
    about: string;
    faq: string;
    casinos: string;
    verify: string;
    apply: string;
    openMenu: string;
    closeMenu: string;
    primaryLabel: string;
  };
  footer: {
    verifySeal: string;
    apply: string;
    faq: string;
  };
  stickyCta: {
    note: string;
    button: string;
  };
  seal: {
    certified: string;
  };
  common: {
    certifiedSince: string;
    viewSealRecord: string;
    youProvide: string;
  };
  stats: Stat[];
  home: {
    title: string;
    description: string;
    badge: string;
    h1: string;
    sub: string;
    ctaApply: string;
    ctaVerify: string;
    howEyebrow: string;
    howTitle: string;
    criteriaEyebrow: string;
    criteriaTitle: string;
    operatorsEyebrow: string;
    operatorsTitle: string;
    viewAllCasinos: string;
    ctaHeading: string;
    ctaSub: string;
    ctaButton: string;
  };
  steps: Step[];
  criteria: Criterion[];
  process: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    ctaHeading: string;
    ctaButton: string;
  };
  stages: Stage[];
  pricing: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    billingTitle: string;
  };
  tiers: Tier[];
  billingNotes: BillingNote[];
  methodology: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    checksTitle: string;
    limitsTitle: string;
    limitsSub: string;
    monitoringTitle: string;
    monitoringBody: string;
    suspensionTitle: string;
    suspensionBody: string;
    ctaHeading: string;
    ctaButton: string;
  };
  limits: Limit[];
  directory: {
    certified: DirectoryStatus;
    scanned: DirectoryStatus;
    listed: DirectoryStatus;
    flagged: DirectoryStatus;
    statusFilterAll: string;
    lastScanned: string;
    viewReport: string;
  };
  casinos: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    searchPlaceholder: string;
    searchLabel: string;
    empty: string;
  };
  /** The casino lookup on the home page. Separate from `verify`, which answers
   *  a different question: `verify` proves a badge we issued is genuine, this
   *  reports what the index holds on a casino the visitor names. */
  checker: {
    inputPlaceholder: string;
    inputLabel: string;
    button: string;
    steps: CheckStep[];
    /** Contains {count}, replaced with the size of the index at build time, so
     *  the sentence cannot go stale when a casino is added. */
    footnote: string;
    emptyInput: string;
    recordEyebrow: string;
    jurisdiction: string;
    operator: string;
    licence: string;
    licenceNone: string;
    licenceExpiry: string;
    licenceExpired: string;
    /** Contains {registry} and {date}. The record stores both in one string
     *  ("2026-07-30 — Anjouan Gaming Authority register"); the component splits
     *  it so the sentence reads properly in any word order. */
    licenceMatched: string;
    licenceSecondhand: string;
    scan: string;
    scanNone: string;
    noteLabel: string;
    viewRecord: string;
    multipleTitle: string;
    multipleBody: string;
    notFoundTitle: string;
    notFoundBody: string;
    notFoundBrowse: string;
    notFoundApply: string;
  };
  verify: {
    title: string;
    description: string;
    h1: string;
    sub: string;
    inputPlaceholder: string;
    inputLabel: string;
    button: string;
    validStatus: string;
    operator: string;
    jurisdiction: string;
    lastChecked: string;
    invalidStatus: string;
    invalidBody: string;
    contactUs: string;
  };
  apply: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    fieldName: string;
    fieldNamePlaceholder: string;
    fieldWebsite: string;
    fieldJurisdiction: string;
    fieldJurisdictionPlaceholder: string;
    fieldEmail: string;
    fieldMessage: string;
    fieldMessagePlaceholder: string;
    submit: string;
    successTitle: string;
    successBody: string;
  };
  about: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    card1Title: string;
    card1Body: string;
    card2Title: string;
    card2Body: string;
  };
  faqPage: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    ctaHeading: string;
    ctaButton: string;
  };
  faqs: Faq[];
  badge: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    sub: string;
    primaryTitle: string;
    primaryBody: string;
    compactTitle: string;
    compactBody: string;
    darkTitle: string;
    darkBody: string;
    ctaHeading: string;
    ctaButton: string;
  };
}

/**
 * What a non-English locale file is allowed to be.
 *
 * Every locale used to be typed as a full `Translation`, so adding one key to
 * en.ts turned into 18 type errors and 18 files to edit before anything could
 * ship. Non-English files are now deep-partial: they carry what has actually
 * been translated, and `useTranslations` fills the rest from English.
 *
 * Arrays stay whole rather than becoming arrays of partials — a locale either
 * translates a list or leaves it to English, and half-translated lists are the
 * one outcome nobody wants on a pricing table.
 */
export type PartialTranslation = {
  [K in keyof Translation]?: Translation[K] extends readonly unknown[]
    ? Translation[K]
    : Translation[K] extends object
      ? { [P in keyof Translation[K]]?: Translation[K][P] }
      : Translation[K];
};
