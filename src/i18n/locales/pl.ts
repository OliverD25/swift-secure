import type { PartialTranslation } from "../types";

/**
 * Partial overrides. Any key absent here falls back to English, per key.
 *
 * Sixty strings were removed on 5 August 2026, when the English copy was
 * rewritten for players. They were faithful translations of claims the rewrite
 * deleted — a badge "in 10 days", a reply "within 48 hours", the word
 * "Certified" — and this project has no clients, no team and no issued badge.
 * A correct English sentence beats a fluent promise we cannot keep, so these
 * keys now fall through until they are translated again.
 */
const pl: PartialTranslation = {
  nav: {
    howItWorks: "Jak to działa",
    about: "O nas",
    faq: "FAQ",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    primaryLabel: "Główne",
  },
  footer: {
    verifySeal: "Zweryfikuj pieczęć",
    apply: "Wniosek",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Jak to działa",
  },
  methodology: {
    eyebrow: "Metodyka",
  },
  directory: {
    statusFilterAll: "Wszystkie",
  },
  casinos: {
    title: "Katalog kasyn",
    description:
      "Katalog nowych kasyn online śledzonych przez Swift Secured, każde z aktualnym statusem weryfikacji.",
    eyebrow: "Katalog",
    h1: "Katalog kasyn",
    searchPlaceholder: "Szukaj po nazwie kasyna lub jurysdykcji",
    searchLabel: "Szukaj wśród certyfikowanych kasyn",
    empty: "Żadne kasyno nie pasuje do wyszukiwania.",
  },
  verify: {
    title: "Zweryfikuj pieczęć",
    description:
      "Wpisz identyfikator pieczęci widoczny na stronie kasyna, aby potwierdzić, że jest autentyczna i aktualnie certyfikowana przez Swift Secured.",
    h1: "Zweryfikuj pieczęć",
    inputPlaceholder: "np. CS-2026-0042",
    inputLabel: "Identyfikator pieczęci",
    button: "Zweryfikuj",
    validStatus: "Pieczęć ważna i aktywna",
    operator: "Operator:",
    jurisdiction: "Jurysdykcja:",
    invalidStatus: "Nie znaleziono pasującej pieczęci",
    contactUs: "skontaktuj się z nami",
  },
  apply: {
    fieldName: "Nazwa kasyna",
    fieldEmail: "E-mail kontaktowy",
    fieldMessage: "Co jeszcze powinniśmy wiedzieć?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default pl;
