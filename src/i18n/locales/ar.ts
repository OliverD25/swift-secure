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
const ar: PartialTranslation = {
  nav: {
    howItWorks: "كيف يعمل",
    about: "من نحن",
    faq: "الأسئلة الشائعة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    primaryLabel: "رئيسية",
  },
  footer: {
    verifySeal: "التحقق من ختم",
    apply: "التقديم",
    faq: "الأسئلة الشائعة",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "كيف يعمل",
  },
  methodology: {
    eyebrow: "المنهجية",
  },
  directory: {
    statusFilterAll: "الكل",
  },
  casinos: {
    title: "دليل الكازينوهات",
    description:
      "دليل الكازينوهات الجديدة على الإنترنت التي تتابعها Swift Secured، مع حالة التحقق الحالية لكل منها.",
    eyebrow: "الدليل",
    h1: "دليل الكازينوهات",
    searchPlaceholder: "ابحث باسم الكازينو أو الولاية القضائية",
    searchLabel: "البحث في الكازينوهات المعتمدة",
    empty: "لا توجد كازينوهات مطابقة لهذا البحث.",
  },
  verify: {
    title: "التحقق من ختم",
    description:
      "أدخل معرّف الختم الظاهر على موقع الكازينو للتأكد من أنه أصلي ومعتمد حالياً من Swift Secured.",
    h1: "التحقق من ختم",
    inputPlaceholder: "مثال: CS-2026-0042",
    inputLabel: "معرّف الختم",
    button: "تحقّق",
    validStatus: "ختم صالح وفعّال",
    operator: "المشغّل:",
    jurisdiction: "الولاية القضائية:",
    invalidStatus: "لم يُعثر على ختم مطابق",
    contactUs: "تواصل معنا",
  },
  apply: {
    fieldName: "اسم الكازينو",
    fieldEmail: "البريد الإلكتروني للتواصل",
    fieldMessage: "هل من شيء آخر يجب أن نعرفه؟",
  },
  faqPage: {
    eyebrow: "الأسئلة الشائعة",
  },
};

export default ar;
