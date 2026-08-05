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
const zh: PartialTranslation = {
  nav: {
    howItWorks: "认证流程",
    about: "关于我们",
    faq: "常见问题",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    primaryLabel: "主导航",
  },
  footer: {
    verifySeal: "验证标识",
    apply: "申请",
    faq: "常见问题",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "认证流程",
  },
  methodology: {
    eyebrow: "核查方法",
  },
  directory: {
    statusFilterAll: "全部",
  },
  casinos: {
    title: "赌场目录",
    description: "Swift Secured 追踪的新在线赌场目录，每家均标注当前验证状态。",
    eyebrow: "目录",
    h1: "赌场目录",
    searchPlaceholder: "按赌场名称或辖区搜索",
    searchLabel: "搜索已认证赌场",
    empty: "没有符合该搜索条件的赌场。",
  },
  verify: {
    title: "验证标识",
    description:
      "输入赌场网站上显示的标识编号，确认其真实性以及当前是否由 Swift Secured 认证。",
    h1: "验证标识",
    inputPlaceholder: "例如 CS-2026-0042",
    inputLabel: "标识编号",
    button: "验证",
    validStatus: "标识有效且在有效期内",
    operator: "运营商：",
    jurisdiction: "牌照辖区：",
    invalidStatus: "未找到匹配的标识",
    contactUs: "联系我们",
  },
  apply: {
    fieldName: "赌场名称",
    fieldEmail: "联系邮箱",
    fieldMessage: "还有其他需要我们了解的信息吗？",
  },
  faqPage: {
    eyebrow: "常见问题",
  },
};

export default zh;
