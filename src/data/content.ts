export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "340+", label: "Casinos certified" },
  { value: "48hrs", label: "Avg. review start" },
  { value: "2.1M", label: "Seals scanned / mo" },
  { value: "6 yrs", label: "Auditing operators" },
];

export interface Step {
  n: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  { n: "1", title: "Apply", desc: "Submit your licensing and platform details for an initial fit check." },
  { n: "2", title: "Audit", desc: "Our team reviews RNG fairness, security posture and payout history." },
  { n: "3", title: "Certify", desc: "Passing operators receive the seal and a public verification record." },
  { n: "4", title: "Monitor", desc: "We re-audit quarterly to keep the seal live and trustworthy." },
];

export interface Criterion {
  title: string;
  desc: string;
}

export const criteria: Criterion[] = [
  { title: "RNG & game fairness", desc: "Independent testing of random number generation and payout tables." },
  { title: "Licensing status", desc: "Verified against the issuing jurisdiction's public registry." },
  { title: "Data & funds security", desc: "Encryption standards, segregated player funds, breach history." },
  { title: "Payout timeliness", desc: "Audited withdrawal times against operator's stated terms." },
  { title: "Responsible gambling tools", desc: "Deposit limits, self-exclusion and support resources in place." },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The audit was thorough but the team told us exactly what to fix. Certification took 19 days.",
    name: "M. Andersen",
    role: "Compliance Lead, launch operator",
  },
  {
    quote: "Players ask about the seal in support tickets. It's become a real trust signal at checkout.",
    name: "R. Osei",
    role: "Head of Product",
  },
  {
    quote: "Quarterly re-audits keep us honest and keep the seal meaningful.",
    name: "J. Vale",
    role: "Founder, new-market operator",
  },
];

export interface Plan {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  featured: boolean;
}

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "$1,900",
    cadence: "one-time audit + 1yr seal",
    featured: false,
    features: [
      "Full 5-point audit",
      "Public verification page",
      "Seal embed kit",
      "Email support",
      "Standard 21-day review",
      "Annual re-audit required",
    ],
  },
  {
    name: "Growth",
    price: "$2,900",
    cadence: "one-time audit + 1yr seal",
    featured: true,
    features: [
      "Everything in Starter",
      "Priority 10-day review",
      "Quarterly re-audits",
      "Dedicated compliance contact",
      "Payout speed monitoring",
      "Seal analytics dashboard",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "multi-brand / network",
    featured: false,
    features: [
      "Everything in Growth",
      "Multi-site coverage",
      "White-label reporting",
      "SLA-backed re-audits",
      "Custom audit scope",
      "Account manager",
    ],
  },
];

export interface BillingNote {
  title: string;
  desc: string;
}

export const billingNotes: BillingNote[] = [
  { title: "Annual renewal", desc: "Seals run 12 months from certification. Renewal is a lighter re-audit at 40% of the original fee." },
  { title: "No hidden fees", desc: "The listed price covers the full audit and one year of monitoring — nothing added later." },
  { title: "Failed audits", desc: "If you don't pass, you keep your findings report and can reapply once issues are fixed, at no extra charge within 60 days." },
];

export interface Stage {
  n: string;
  title: string;
  duration: string;
  desc: string;
  provide: string;
}

export const stages: Stage[] = [
  { n: "1", title: "Application & fit check", duration: "1-2 days", desc: "We confirm your platform is a fit for review: live URL, active license, and a real player base or launch date.", provide: "Company details, licensing info, platform URL" },
  { n: "2", title: "Documentation review", duration: "2-4 days", desc: "Our compliance team reviews licensing paperwork, terms of service, and responsible gambling policies.", provide: "License certificate, T&Cs, RG policy documents" },
  { n: "3", title: "Technical audit", duration: "5-8 days", desc: "Independent testing of RNG fairness, payout tables, and platform security (encryption, fund segregation).", provide: "API/test access, security architecture overview" },
  { n: "4", title: "Payout verification", duration: "3-5 days", desc: "We audit real withdrawal times against your stated terms using sampled transaction data.", provide: "Anonymized withdrawal logs (last 90 days)" },
  { n: "5", title: "Certification decision", duration: "1-2 days", desc: "Findings go to our review board. Passing operators receive the seal and a public verification record.", provide: "Nothing further — we notify you either way" },
  { n: "6", title: "Ongoing monitoring", duration: "Quarterly", desc: "We re-audit every quarter to keep the seal live. Seals are suspended immediately if standards slip.", provide: "Updated logs each quarter" },
];

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

export const team: TeamMember[] = [
  { initials: "MK", name: "Marta Kowalski", role: "Head of Audits, ex-MGA", bio: "Eight years reviewing licensing compliance at a national gaming authority." },
  { initials: "DS", name: "Daniel Suh", role: "RNG & Security Lead", bio: "Former game-fairness engineer specializing in RNG certification." },
  { initials: "LR", name: "Lena Reyes", role: "Payouts & Compliance", bio: "Runs the payout-timeliness audits and quarterly re-certification program." },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  { q: "How much does certification cost?", a: "Plans start at $1,900 for a one-time audit covering one year of seal validity. See the Pricing page for full plan details." },
  { q: "How long does the audit take?", a: "Typically 10–21 days depending on how quickly you provide documentation and test access. Our Growth plan offers a 10-day priority review." },
  { q: "What happens if we fail an audit?", a: "You receive a detailed findings report at no extra charge. You can reapply once issues are fixed — free of charge within 60 days." },
  { q: "Do you re-audit certified casinos?", a: "Yes. Every certified operator is re-audited quarterly. Seals are suspended immediately if standards slip below our threshold." },
  { q: "Is the seal specific to one jurisdiction?", a: "No. Our audit checks licensing validity in whichever jurisdiction you operate under, alongside jurisdiction-agnostic checks like RNG fairness and payout speed." },
  { q: "Can players verify a seal themselves?", a: "Yes — anyone can enter a seal ID on our Verify page to see certification status, license, and next audit date in seconds." },
  { q: "What if our seal is revoked?", a: "We notify you immediately with the reason. The public verification record updates in real time so players see accurate status." },
  { q: "Do you take referral fees from casinos?", a: "No. We only charge the flat audit fee — no revenue share, no referral fees — so findings can't be influenced by ongoing payments." },
];
