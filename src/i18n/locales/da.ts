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
const da: PartialTranslation = {
  nav: {
    howItWorks: "Sådan virker det",
    about: "Om os",
    faq: "FAQ",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    primaryLabel: "Primær",
  },
  footer: {
    verifySeal: "Verificer et segl",
    apply: "Ansøg",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Sådan virker det",
  },
  methodology: {
    eyebrow: "Metode",
  },
  directory: {
    statusFilterAll: "Alle",
  },
  casinos: {
    title: "Casinooversigt",
    description:
      "Oversigt over nye onlinecasinoer, som Swift Secured følger, hver med sin aktuelle verifikationsstatus.",
    eyebrow: "Oversigt",
    h1: "Casinooversigt",
    searchPlaceholder: "Søg på casinonavn eller jurisdiktion",
    searchLabel: "Søg i certificerede casinoer",
    empty: "Ingen casinoer matcher den søgning.",
  },
  verify: {
    title: "Verificer et segl",
    description:
      "Indtast det segl-id, der vises på et casinos side, for at bekræfte, at det er ægte og aktuelt certificeret af Swift Secured.",
    h1: "Verificer et segl",
    inputPlaceholder: "f.eks. CS-2026-0042",
    inputLabel: "Segl-id",
    button: "Verificer",
    validStatus: "Gyldigt og aktivt segl",
    operator: "Operatør:",
    jurisdiction: "Jurisdiktion:",
    invalidStatus: "Intet matchende segl fundet",
    contactUs: "så kontakt os",
  },
  apply: {
    fieldName: "Casinonavn",
    fieldEmail: "Kontakt-e-mail",
    fieldMessage: "Er der andet, vi bør vide?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default da;
