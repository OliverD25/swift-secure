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
const fr: PartialTranslation = {
  nav: {
    howItWorks: "Fonctionnement",
    about: "À propos",
    faq: "FAQ",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Vérifier un sceau",
    apply: "Candidater",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Fonctionnement",
  },
  methodology: {
    eyebrow: "Méthodologie",
  },
  directory: {
    statusFilterAll: "Tous",
  },
  casinos: {
    title: "Répertoire des casinos",
    description:
      "Répertoire des nouveaux casinos en ligne suivis par Swift Secured, chacun avec son statut de vérification actuel.",
    eyebrow: "Répertoire",
    h1: "Répertoire des casinos",
    searchPlaceholder: "Chercher par nom de casino ou juridiction",
    searchLabel: "Rechercher parmi les casinos certifiés",
    empty: "Aucun casino ne correspond à cette recherche.",
  },
  verify: {
    title: "Vérifier un sceau",
    description:
      "Saisissez l’identifiant du sceau affiché sur le site d’un casino pour confirmer qu’il est authentique et actuellement certifié par Swift Secured.",
    h1: "Vérifier un sceau",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "Identifiant du sceau",
    button: "Vérifier",
    validStatus: "Sceau valide et actif",
    operator: "Opérateur :",
    jurisdiction: "Juridiction :",
    invalidStatus: "Aucun sceau correspondant",
    contactUs: "contactez-nous",
  },
  apply: {
    fieldName: "Nom du casino",
    fieldEmail: "E-mail de contact",
    fieldMessage: "Autre chose à nous signaler ?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default fr;
