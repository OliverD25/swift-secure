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
const sv: PartialTranslation = {
  nav: {
    howItWorks: "Så fungerar det",
    about: "Om oss",
    faq: "FAQ",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    primaryLabel: "Primär",
  },
  footer: {
    verifySeal: "Verifiera ett sigill",
    apply: "Ansök",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Så fungerar det",
  },
  methodology: {
    eyebrow: "Metod",
  },
  directory: {
    statusFilterAll: "Alla",
  },
  casinos: {
    title: "Casinokatalog",
    description:
      "Katalog över nya onlinecasinon som Swift Secured följer, var och en med sin aktuella verifieringsstatus.",
    eyebrow: "Katalog",
    h1: "Casinokatalog",
    searchPlaceholder: "Sök på casinonamn eller jurisdiktion",
    searchLabel: "Sök bland certifierade casinon",
    empty: "Inga casinon matchar den sökningen.",
  },
  verify: {
    title: "Verifiera ett sigill",
    description:
      "Ange sigill-ID:t som visas på ett casinos webbplats för att bekräfta att det är äkta och för närvarande certifierat av Swift Secured.",
    h1: "Verifiera ett sigill",
    inputPlaceholder: "t.ex. CS-2026-0042",
    inputLabel: "Sigill-ID",
    button: "Verifiera",
    validStatus: "Giltigt och aktivt sigill",
    operator: "Operatör:",
    jurisdiction: "Jurisdiktion:",
    invalidStatus: "Inget matchande sigill hittades",
    contactUs: "kontakta oss",
  },
  apply: {
    fieldName: "Casinots namn",
    fieldEmail: "Kontakt-e-post",
    fieldMessage: "Något annat vi bör veta?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default sv;
