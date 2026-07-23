export interface Language {
  /** URL segment and Astro locale key, e.g. "pt-br" → /pt-br/ */
  locale: string;
  /** Value for <html lang>, BCP-47 */
  htmlLang: string;
  /** Short code shown in the switcher pill */
  code: string;
  /** Endonym — the language's name in its own script */
  name: string;
  /** flagcdn.com country code */
  iso: string;
  dir: "ltr" | "rtl";
}

export const languages: Language[] = [
  { locale: "en", htmlLang: "en", code: "EN", name: "English", iso: "gb", dir: "ltr" },
  { locale: "ar", htmlLang: "ar", code: "AR", name: "العربية", iso: "sa", dir: "rtl" },
  { locale: "da", htmlLang: "da", code: "DA", name: "Dansk", iso: "dk", dir: "ltr" },
  { locale: "de", htmlLang: "de", code: "DE", name: "Deutsch", iso: "de", dir: "ltr" },
  { locale: "es", htmlLang: "es", code: "ES", name: "Español", iso: "es", dir: "ltr" },
  { locale: "fr", htmlLang: "fr", code: "FR", name: "Français", iso: "fr", dir: "ltr" },
  { locale: "fr-ca", htmlLang: "fr-CA", code: "FR-CA", name: "Français (CA)", iso: "ca", dir: "ltr" },
  { locale: "it", htmlLang: "it", code: "IT", name: "Italiano", iso: "it", dir: "ltr" },
  { locale: "nl", htmlLang: "nl", code: "NL", name: "Nederlands", iso: "nl", dir: "ltr" },
  { locale: "pl", htmlLang: "pl", code: "PL", name: "Polski", iso: "pl", dir: "ltr" },
  { locale: "pt", htmlLang: "pt", code: "PT", name: "Português", iso: "pt", dir: "ltr" },
  { locale: "pt-br", htmlLang: "pt-BR", code: "PT-BR", name: "Português (BR)", iso: "br", dir: "ltr" },
  { locale: "sv", htmlLang: "sv", code: "SV", name: "Svenska", iso: "se", dir: "ltr" },
  { locale: "tr", htmlLang: "tr", code: "TR", name: "Türkçe", iso: "tr", dir: "ltr" },
  { locale: "hi", htmlLang: "hi", code: "HI", name: "हिंदी", iso: "in", dir: "ltr" },
  { locale: "ko", htmlLang: "ko", code: "KO", name: "한국어", iso: "kr", dir: "ltr" },
  { locale: "zh", htmlLang: "zh", code: "ZH", name: "中文", iso: "cn", dir: "ltr" },
  { locale: "ja", htmlLang: "ja", code: "JA", name: "日本語", iso: "jp", dir: "ltr" },
  { locale: "ru", htmlLang: "ru", code: "RU", name: "Русский", iso: "ru", dir: "ltr" },
];

export const defaultLocale = "en";

export const localeCodes = languages.map((l) => l.locale);

export const getLanguage = (locale: string): Language =>
  languages.find((l) => l.locale === locale) ?? languages[0]!;

export const flagUrl = (iso: string) => `https://flagcdn.com/w40/${iso}.png`;
