import type { PartialTranslation, Translation } from "./types";
import { defaultLocale, getLanguage, languages } from "../data/languages";
import en from "./locales/en";
import ar from "./locales/ar";
import da from "./locales/da";
import de from "./locales/de";
import es from "./locales/es";
import fr from "./locales/fr";
import frCA from "./locales/fr-ca";
import it from "./locales/it";
import nl from "./locales/nl";
import pl from "./locales/pl";
import pt from "./locales/pt";
import ptBR from "./locales/pt-br";
import sv from "./locales/sv";
import tr from "./locales/tr";
import hi from "./locales/hi";
import ko from "./locales/ko";
import zh from "./locales/zh";
import ja from "./locales/ja";
import ru from "./locales/ru";
import { withBase } from "../lib/url";

const translations: Record<string, PartialTranslation> = {
  en,
  ar,
  da,
  de,
  es,
  fr,
  "fr-ca": frCA,
  it,
  nl,
  pl,
  pt,
  "pt-br": ptBR,
  sv,
  tr,
  hi,
  ko,
  zh,
  ja,
  ru,
};

/**
 * Fill any key a locale is missing from English, at every depth.
 *
 * The previous lookup fell back only when the whole LOCALE was unknown. A key
 * present in en.ts but absent from the other 18 files came back `undefined` and
 * rendered as a blank heading or an empty list. In practice that meant new copy
 * could not ship until all 19 files were written, so it either did not ship or
 * shipped as 18 machine translations nobody had read.
 *
 * With this, English is the floor. A translated string always wins; an
 * untranslated one shows in English rather than as nothing. Adding a section to
 * en.ts alone is now a safe, complete change, and translations can follow later
 * without blocking the page.
 *
 * Arrays are taken whole rather than merged per index. A locale that translated
 * three of four plans should not render the fourth in English inside an
 * otherwise translated table — and worse, a shorter translated array merged
 * against a longer English one would resurrect entries that locale deliberately
 * dropped.
 */
function withEnglishFallback<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (typeof base !== "object" || typeof override !== "object") return override as T;

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    out[key] = key in out ? withEnglishFallback(out[key], value) : value;
  }
  return out as T;
}

const resolved = new Map<string, Translation>();

export const useTranslations = (locale: string | undefined): Translation => {
  const loc = locale ?? defaultLocale;
  const cached = resolved.get(loc);
  if (cached) return cached;
  const merged = loc === defaultLocale
    ? en
    : withEnglishFallback(en, translations[loc]);
  resolved.set(loc, merged);
  return merged;
};

/**
 * Builds an internal href for a given locale. The default locale is served at
 * the root (no prefix), so only the others get a /<locale> segment.
 */
export function localePath(path: string, locale: string | undefined): string {
  const loc = locale ?? defaultLocale;
  const prefix = loc === defaultLocale ? "" : `/${loc}`;
  return withBase(`${prefix}${path}`);
}

/** getStaticPaths entries for every locale; the default one has no segment. */
export function localeStaticPaths() {
  return languages.map((lang) => ({
    params: { locale: lang.locale === defaultLocale ? undefined : lang.locale },
    props: { locale: lang.locale },
  }));
}

export { getLanguage, languages, defaultLocale };
export type { Translation };
