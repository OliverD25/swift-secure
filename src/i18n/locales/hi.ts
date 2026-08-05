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
const hi: PartialTranslation = {
  nav: {
    howItWorks: "कैसे काम करता है",
    about: "परिचय",
    faq: "सामान्य प्रश्न",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    primaryLabel: "मुख्य",
  },
  footer: {
    verifySeal: "सील सत्यापित करें",
    apply: "आवेदन",
    faq: "सामान्य प्रश्न",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "कैसे काम करता है",
  },
  methodology: {
    eyebrow: "कार्यप्रणाली",
  },
  directory: {
    statusFilterAll: "सभी",
  },
  casinos: {
    title: "कैसीनो निर्देशिका",
    description:
      "Swift Secured द्वारा ट्रैक किए जाने वाले नए ऑनलाइन कैसीनो की निर्देशिका, प्रत्येक की वर्तमान सत्यापन स्थिति के साथ।",
    eyebrow: "निर्देशिका",
    h1: "कैसीनो निर्देशिका",
    searchPlaceholder: "कैसीनो नाम या क्षेत्राधिकार से खोजें",
    searchLabel: "प्रमाणित कैसीनो खोजें",
    empty: "इस खोज से कोई कैसीनो मेल नहीं खाता।",
  },
  verify: {
    title: "सील सत्यापित करें",
    description:
      "कैसीनो की साइट पर दिखाई गई सील ID दर्ज करें और पुष्टि करें कि वह असली है और Swift Secured द्वारा वर्तमान में प्रमाणित है।",
    h1: "सील सत्यापित करें",
    inputPlaceholder: "जैसे CS-2026-0042",
    inputLabel: "सील ID",
    button: "सत्यापित करें",
    validStatus: "वैध और सक्रिय सील",
    operator: "ऑपरेटर:",
    jurisdiction: "क्षेत्राधिकार:",
    invalidStatus: "कोई मेल खाती सील नहीं मिली",
    contactUs: "हमसे संपर्क करें",
  },
  apply: {
    fieldName: "कैसीनो का नाम",
    fieldEmail: "संपर्क ईमेल",
    fieldMessage: "और कुछ जो हमें जानना चाहिए?",
  },
  faqPage: {
    eyebrow: "सामान्य प्रश्न",
  },
};

export default hi;
