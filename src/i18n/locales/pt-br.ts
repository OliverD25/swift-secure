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
const ptBR: PartialTranslation = {
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
    apply: "Solicitar",
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
    title: "Diretório de cassinos",
    description:
      "Diretório de novos cassinos online acompanhados pela Swift Secured, cada um com seu status de verificação atual.",
    eyebrow: "Diretório",
    h1: "Diretório de cassinos",
    searchPlaceholder: "Buscar por nome do cassino ou jurisdição",
    searchLabel: "Buscar cassinos certificados",
    empty: "Nenhum cassino corresponde a essa busca.",
  },
  verify: {
    title: "Verificar um selo",
    description:
      "Digite o ID do selo exibido no site de um cassino para confirmar que ele é autêntico e está certificado pela Swift Secured.",
    h1: "Verificar um selo",
    inputPlaceholder: "ex. CS-2026-0042",
    inputLabel: "ID do selo",
    button: "Verificar",
    validStatus: "Selo válido e ativo",
    operator: "Operador:",
    jurisdiction: "Jurisdição:",
    invalidStatus: "Nenhum selo correspondente",
    contactUs: "fale conosco",
  },
  apply: {
    fieldName: "Nome do cassino",
    fieldEmail: "E-mail de contato",
    fieldMessage: "Mais alguma coisa que devemos saber?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default ptBR;
