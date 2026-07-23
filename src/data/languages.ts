export interface Language {
  code: string;
  name: string;
  iso: string;
}

export const languages: Language[] = [
  { code: "EN", name: "English", iso: "gb" },
  { code: "AR", name: "العربية", iso: "sa" },
  { code: "DA", name: "Dansk", iso: "dk" },
  { code: "DE", name: "Deutsch", iso: "de" },
  { code: "ES", name: "Español", iso: "es" },
  { code: "FR", name: "Français", iso: "fr" },
  { code: "FR-CA", name: "Français (CA)", iso: "ca" },
  { code: "IT", name: "Italiano", iso: "it" },
  { code: "NL", name: "Nederlands", iso: "nl" },
  { code: "PL", name: "Polski", iso: "pl" },
  { code: "PT", name: "Português", iso: "pt" },
  { code: "PT-BR", name: "Português (BR)", iso: "br" },
  { code: "SV", name: "Svenska", iso: "se" },
  { code: "TR", name: "Türkçe", iso: "tr" },
  { code: "HI", name: "हिंदी", iso: "in" },
  { code: "KO", name: "한국어", iso: "kr" },
  { code: "ZH", name: "中文", iso: "cn" },
  { code: "JA", name: "日本語", iso: "jp" },
  { code: "RU", name: "Русский", iso: "ru" },
];

export const defaultLanguage: Language = languages[languages.length - 1]!; // RU
