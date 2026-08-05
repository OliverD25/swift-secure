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
const tr: PartialTranslation = {
  nav: {
    howItWorks: "Nasıl çalışır",
    about: "Hakkımızda",
    faq: "SSS",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    primaryLabel: "Ana",
  },
  footer: {
    verifySeal: "Mühür doğrula",
    apply: "Başvur",
    faq: "SSS",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Nasıl çalışır",
  },
  methodology: {
    eyebrow: "Yöntem",
  },
  directory: {
    statusFilterAll: "Tümü",
  },
  casinos: {
    title: "Casino dizini",
    description:
      "Swift Secured tarafından takip edilen yeni çevrimiçi casinoların dizini, her biri güncel doğrulama durumuyla.",
    eyebrow: "Dizin",
    h1: "Casino dizini",
    searchPlaceholder: "Casino adına veya yargı bölgesine göre ara",
    searchLabel: "Sertifikalı casinolarda ara",
    empty: "Bu aramayla eşleşen casino yok.",
  },
  verify: {
    title: "Mühür doğrula",
    description:
      "Bir casinonun sitesinde görünen mühür kimliğini girerek mührün gerçek ve Swift Secured tarafından güncel olarak sertifikalı olduğunu doğrulayın.",
    h1: "Mühür doğrula",
    inputPlaceholder: "örn. CS-2026-0042",
    inputLabel: "Mühür kimliği",
    button: "Doğrula",
    validStatus: "Geçerli ve etkin mühür",
    operator: "Operatör:",
    jurisdiction: "Yargı bölgesi:",
    invalidStatus: "Eşleşen mühür bulunamadı",
    contactUs: "bize ulaşın",
  },
  apply: {
    fieldName: "Casino adı",
    fieldEmail: "İletişim e-postası",
    fieldMessage: "Bilmemiz gereken başka bir şey var mı?",
  },
  faqPage: {
    eyebrow: "SSS",
  },
};

export default tr;
