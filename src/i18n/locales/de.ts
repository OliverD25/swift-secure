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
const de: PartialTranslation = {
  nav: {
    howItWorks: "Ablauf",
    about: "Über uns",
    faq: "FAQ",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    primaryLabel: "Hauptnavigation",
  },
  footer: {
    verifySeal: "Siegel prüfen",
    apply: "Bewerben",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Ablauf",
  },
  methodology: {
    eyebrow: "Methodik",
  },
  directory: {
    statusFilterAll: "Alle",
  },
  casinos: {
    title: "Casino-Verzeichnis",
    description:
      "Verzeichnis neuer Online-Casinos, die Swift Secured erfasst, jeweils mit aktuellem Prüfstatus.",
    eyebrow: "Verzeichnis",
    h1: "Casino-Verzeichnis",
    searchPlaceholder: "Nach Casinoname oder Jurisdiktion suchen",
    searchLabel: "Zertifizierte Casinos durchsuchen",
    empty: "Keine Casinos passen zu dieser Suche.",
  },
  verify: {
    title: "Siegel prüfen",
    description:
      "Geben Sie die auf der Casino-Website angezeigte Siegel-ID ein, um zu bestätigen, dass sie echt und aktuell von Swift Secured zertifiziert ist.",
    h1: "Siegel prüfen",
    inputPlaceholder: "z. B. CS-2026-0042",
    inputLabel: "Siegel-ID",
    button: "Prüfen",
    validStatus: "Gültiges & aktives Siegel",
    operator: "Betreiber:",
    jurisdiction: "Jurisdiktion:",
    invalidStatus: "Kein passendes Siegel gefunden",
    contactUs: "kontaktieren Sie uns",
  },
  apply: {
    fieldName: "Casinoname",
    fieldEmail: "Kontakt-E-Mail",
    fieldMessage: "Sonst noch etwas, das wir wissen sollten?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default de;
