/**
 * Delete keys from the 18 non-English locale files whose English text changed.
 *
 * WHY DELETION AND NOT TRANSLATION.
 *
 * src/i18n/index.ts merges English under each locale, but a translated string
 * always wins over the English one — that is the entire point of a translation.
 * So rewriting en.ts alone does NOT update the site: de.ts keeps rendering
 * "€200" and ru.ts keeps rendering "$1,900" inside FAQPage JSON-LD, which is
 * eligible for Google rich results. The stale translation beats the corrected
 * English at every depth.
 *
 * Removing the key is what lets English through. The page then shows the
 * corrected copy in English for those sections, in every language, which is the
 * right trade: an English sentence that is true beats a translated one that is
 * false. Translations can be added back afterwards, one at a time, and each one
 * starts winning again the moment it exists.
 *
 * Scope is deliberately narrow — only keys whose English wording actually
 * changed on 4 August 2026. Keys left alone keep their translations: nav,
 * footer, seal, common, verify, casinos, badge, apply and the untouched parts
 * of home and methodology.
 *
 * Run once from the repo root:  node scripts/strip-stale-locales.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const DIR = "src/i18n/locales";

/** Whole top-level arrays: either replaced wholesale or deleted from the type. */
const TOP_LEVEL_ARRAYS = [
  "stats",        // was invented traction: "340+ casinos certified", "6 yrs"
  "criteria",     // was five checks, four of which we cannot perform
  "steps",        // flow now starts with us sending, not them applying
  "stages",       // was six stages incl. RNG testing and payout verification
  "tiers",        // was Bronze/Silver/Gold, a paid ladder for work we do not do
  "limits",       // grew from three to five, adding login and game provenance
  "billingNotes", // now the whole commercial arrangement
  "faqs",         // named a $1,900 price and a "Growth plan" that never existed
  "testimonials", // three quotes from people who do not exist — deleted
  "plans",        // the €200/€400/€700 table — deleted
  "addOns",       // the €300-500 setup fee — deleted
  "team",         // three named colleagues with invented career histories
];

/** Keys inside an object, listed only where the English wording changed. */
const NESTED = {
  stickyCta: ["note", "button"],
  home: [
    "description", "badge", "h1", "sub", "ctaApply", "howTitle",
    "criteriaEyebrow", "criteriaTitle", "operatorsEyebrow", "operatorsTitle",
    "viewAllCasinos", "ctaHeading", "ctaSub", "ctaButton",
    // removed from the type entirely:
    "testimonialsEyebrow", "testimonialsTitle", "pricingEyebrow", "pricingTitle",
  ],
  process: ["title", "description", "eyebrow", "h1", "sub", "ctaHeading", "ctaButton"],
  pricing: [
    "description", "eyebrow", "h1", "sub", "billingTitle",
    // removed from the type entirely:
    "applyNow", "mostPopular", "addOnsTitle", "addOnsSub", "tiersTitle", "tiersSub",
  ],
  methodology: ["monitoringTitle", "monitoringBody"],
  directory: ["certified"],
  faqPage: ["description"],
};

/**
 * Find the block for `key` and return [start, endExclusive], or null.
 * Brace/bracket counting rather than a regex: several values contain braces and
 * brackets inside their own strings, and a lazy regex stops at the first one.
 */
function blockRange(src, key, indent = "  ") {
  const open = new RegExp(`^${indent}${key}: ([\\[{])`, "m").exec(src);
  if (!open) return null;
  const openChar = open[1];
  const closeChar = openChar === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let quote = "";
  for (let i = open.index + open[0].length - 1; i < src.length; i++) {
    const c = src[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === quote) inString = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inString = true; quote = c; continue; }
    if (c === openChar) depth++;
    else if (c === closeChar) {
      depth--;
      if (depth === 0) {
        const after = src.indexOf("\n", i);
        return [open.index, after === -1 ? src.length : after + 1];
      }
    }
  }
  throw new Error(`unterminated block for ${key}`);
}

function dropTopLevel(src, key) {
  const range = blockRange(src, key);
  if (!range) return [src, false];
  return [src.slice(0, range[0]) + src.slice(range[1]), true];
}

function dropNested(src, parent, keys) {
  const range = blockRange(src, parent);
  if (!range) return [src, 0];
  let body = src.slice(range[0], range[1]);
  let removed = 0;
  for (const key of keys) {
    const inner = blockRange(body, key, "    ");
    if (inner) {
      body = body.slice(0, inner[0]) + body.slice(inner[1]);
      removed++;
      continue;
    }
    // Scalar: `    key: "value",` possibly wrapped onto the following line.
    const scalar = new RegExp(`^    ${key}:[^\\n]*(\\n(?!    [A-Za-z0-9_]+:|  \\}))*[^\\n]*\\n`, "m");
    const before = body;
    body = body.replace(scalar, "");
    if (body !== before) removed++;
  }
  return [src.slice(0, range[0]) + body + src.slice(range[1]), removed];
}

let files = 0;
for (const file of readdirSync(DIR)) {
  if (!file.endsWith(".ts") || file === "en.ts") continue;
  let src = readFileSync(`${DIR}/${file}`, "utf8");
  const before = src.split("\n").length;

  for (const key of TOP_LEVEL_ARRAYS) [src] = dropTopLevel(src, key);
  for (const [parent, keys] of Object.entries(NESTED)) [src] = dropNested(src, parent, keys);

  writeFileSync(`${DIR}/${file}`, src);
  console.log(`  ${file.padEnd(10)} ${before} -> ${src.split("\n").length} lines`);
  files++;
}
console.log(`\nstripped ${files} locale files; English now fills every removed key`);
