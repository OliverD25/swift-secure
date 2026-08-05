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
const it: PartialTranslation = {
  nav: {
    howItWorks: "Come funziona",
    about: "Chi siamo",
    faq: "FAQ",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    primaryLabel: "Principale",
  },
  footer: {
    verifySeal: "Verifica un sigillo",
    apply: "Richiedi",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Come funziona",
  },
  methodology: {
    eyebrow: "Metodologia",
  },
  directory: {
    statusFilterAll: "Tutti",
  },
  casinos: {
    title: "Directory dei casinò",
    description:
      "Directory dei nuovi casinò online monitorati da Swift Secured, ciascuno con il suo stato di verifica attuale.",
    eyebrow: "Directory",
    h1: "Directory dei casinò",
    searchPlaceholder: "Cerca per nome del casinò o giurisdizione",
    searchLabel: "Cerca tra i casinò certificati",
    empty: "Nessun casinò corrisponde alla ricerca.",
  },
  verify: {
    title: "Verifica un sigillo",
    description:
      "Inserisci l'ID del sigillo mostrato sul sito di un casinò per confermare che sia autentico e attualmente certificato da Swift Secured.",
    h1: "Verifica un sigillo",
    inputPlaceholder: "es. CS-2026-0042",
    inputLabel: "ID sigillo",
    button: "Verifica",
    validStatus: "Sigillo valido e attivo",
    operator: "Operatore:",
    jurisdiction: "Giurisdizione:",
    invalidStatus: "Nessun sigillo corrispondente",
    contactUs: "contattaci",
  },
  apply: {
    fieldName: "Nome del casinò",
    fieldEmail: "Email di contatto",
    fieldMessage: "Altro che dovremmo sapere?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default it;
