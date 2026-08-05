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
const ko: PartialTranslation = {
  nav: {
    howItWorks: "인증 절차",
    about: "회사 소개",
    faq: "자주 묻는 질문",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    primaryLabel: "주요 메뉴",
  },
  footer: {
    verifySeal: "씰 확인하기",
    apply: "신청",
    faq: "자주 묻는 질문",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "인증 절차",
  },
  methodology: {
    eyebrow: "검증 방법",
  },
  directory: {
    statusFilterAll: "전체",
  },
  casinos: {
    title: "카지노 디렉터리",
    description:
      "Swift Secure가 추적하는 신규 온라인 카지노 디렉터리이며, 각 항목의 현재 검증 상태를 표시합니다.",
    eyebrow: "디렉터리",
    h1: "카지노 디렉터리",
    searchPlaceholder: "카지노 이름 또는 관할로 검색",
    searchLabel: "인증 카지노 검색",
    empty: "검색 조건에 맞는 카지노가 없습니다.",
  },
  verify: {
    title: "씰 확인하기",
    description:
      "카지노 사이트에 표시된 씰 ID를 입력하면 해당 씰이 진짜이며 현재 Swift Secured 인증을 유지하고 있는지 확인할 수 있습니다.",
    h1: "씰 확인하기",
    inputPlaceholder: "예: CS-2026-0042",
    inputLabel: "씰 ID",
    button: "확인",
    validStatus: "유효하며 활성 상태인 씰",
    operator: "운영사:",
    jurisdiction: "관할:",
    invalidStatus: "일치하는 씰을 찾을 수 없습니다",
    contactUs: "문의하기",
  },
  apply: {
    fieldName: "카지노 이름",
    fieldEmail: "연락용 이메일",
    fieldMessage: "그 밖에 알려주실 내용이 있습니까?",
  },
  faqPage: {
    eyebrow: "자주 묻는 질문",
  },
};

export default ko;
