import type { Translation } from "./types";
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

const translations: Record<string, Translation> = {
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

export const useTranslations = (locale: string | undefined): Translation =>
  translations[locale ?? defaultLocale] ?? en;

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
