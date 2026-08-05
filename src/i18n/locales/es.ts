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
const es: PartialTranslation = {
  nav: {
    howItWorks: "Cómo funciona",
    about: "Nosotros",
    faq: "FAQ",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
  },
  footer: {
    verifySeal: "Verificar un sello",
    apply: "Solicitar",
    faq: "FAQ",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Cómo funciona",
  },
  methodology: {
    eyebrow: "Metodología",
  },
  directory: {
    statusFilterAll: "Todos",
  },
  casinos: {
    title: "Directorio de casinos",
    description:
      "Directorio de nuevos casinos online que Swift Secured sigue, cada uno con su estado de verificación actual.",
    eyebrow: "Directorio",
    h1: "Directorio de casinos",
    searchPlaceholder: "Buscar por nombre de casino o jurisdicción",
    searchLabel: "Buscar casinos certificados",
    empty: "Ningún casino coincide con esa búsqueda.",
  },
  verify: {
    title: "Verificar un sello",
    description:
      "Introduzca el ID del sello que aparece en el sitio de un casino para confirmar que es auténtico y que está certificado actualmente por Swift Secured.",
    h1: "Verificar un sello",
    inputPlaceholder: "p. ej. CS-2026-0042",
    inputLabel: "ID del sello",
    button: "Verificar",
    validStatus: "Sello válido y activo",
    operator: "Operador:",
    jurisdiction: "Jurisdicción:",
    invalidStatus: "No se ha encontrado ningún sello",
    contactUs: "contáctenos",
  },
  apply: {
    fieldName: "Nombre del casino",
    fieldEmail: "Correo electrónico de contacto",
    fieldMessage: "¿Algo más que debamos saber?",
  },
  faqPage: {
    eyebrow: "FAQ",
  },
};

export default es;
