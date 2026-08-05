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
const pt: PartialTranslation = {
  nav: {
    howItWorks: "Como funciona",
    about: "Sobre nós",
    faq: "FAQ",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar um selo",
    apply: "Candidatura",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Como funciona",
  },
  methodology: {
    eyebrow: "Metodologia",
  },
  directory: {
    statusFilterAll: "Todos",
  },
  casinos: {
    title: "Diretório de casinos",
    description:
      "Diretório de novos casinos online acompanhados pela Swift Secured, cada um com o estado de verificação atual.",
    eyebrow: "Diretório",
    h1: "Diretório de casinos",
    searchPlaceholder: "Pesquisar por nome do casino ou jurisdição",
    searchLabel: "Pesquisar casinos certificados",
    empty: "Nenhum casino corresponde a essa pesquisa.",
  },
  verify: {
    title: "Verificar um selo",
    description:
      "Introduza o ID do selo apresentado no site de um casino para confirmar que é autêntico e está atualmente certificado pela Swift Secured.",
    h1: "Verificar um selo",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "ID do selo",
    button: "Verificar",
    validStatus: "Selo válido e ativo",
    operator: "Operador:",
    jurisdiction: "Jurisdição:",
    invalidStatus: "Nenhum selo correspondente",
    contactUs: "contacte-nos",
  },
  apply: {
    fieldName: "Nome do casino",
    fieldEmail: "Email de contacto",
    fieldMessage: "Mais alguma coisa que devamos saber?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default pt;
