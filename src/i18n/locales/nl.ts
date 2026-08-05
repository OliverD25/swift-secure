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
const nl: PartialTranslation = {
  nav: {
    howItWorks: "Hoe het werkt",
    about: "Over ons",
    faq: "FAQ",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    primaryLabel: "Primair",
  },
  footer: {
    verifySeal: "Zegel verifiëren",
    apply: "Aanvragen",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Hoe het werkt",
  },
  methodology: {
    eyebrow: "Methodiek",
  },
  directory: {
    statusFilterAll: "Alle",
  },
  casinos: {
    title: "Casinogids",
    description:
      "Overzicht van nieuwe onlinecasino's die Swift Secured volgt, elk met de huidige verificatiestatus.",
    eyebrow: "Overzicht",
    h1: "Casinogids",
    searchPlaceholder: "Zoek op casinonaam of jurisdictie",
    searchLabel: "Zoek in gecertificeerde casino's",
    empty: "Geen casino's gevonden voor die zoekopdracht.",
  },
  verify: {
    title: "Zegel verifiëren",
    description:
      "Voer de zegel-ID in die op de site van een casino staat om te bevestigen dat het zegel echt is en op dit moment door Swift Secured is gecertificeerd.",
    h1: "Zegel verifiëren",
    inputPlaceholder: "bijv. CS-2026-0042",
    inputLabel: "Zegel-ID",
    button: "Verifiëren",
    validStatus: "Geldig & actief zegel",
    operator: "Operator:",
    jurisdiction: "Jurisdictie:",
    invalidStatus: "Geen overeenkomend zegel gevonden",
    contactUs: "neem contact op",
  },
  apply: {
    fieldName: "Naam casino",
    fieldEmail: "Contact-e-mail",
    fieldMessage: "Nog iets dat we moeten weten?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default nl;
