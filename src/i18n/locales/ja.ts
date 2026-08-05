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
const ja: PartialTranslation = {
  nav: {
    howItWorks: "認証の流れ",
    about: "会社概要",
    faq: "よくある質問",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    primaryLabel: "メインナビゲーション",
  },
  footer: {
    verifySeal: "シールを確認",
    apply: "申し込み",
    faq: "よくある質問",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "認証の流れ",
  },
  methodology: {
    eyebrow: "検証方法",
  },
  directory: {
    statusFilterAll: "すべて",
  },
  casinos: {
    title: "カジノディレクトリ",
    description:
      "Swift Secured が追跡している新規オンラインカジノの一覧。各カジノの現在の検証ステータスを表示します。",
    eyebrow: "ディレクトリ",
    h1: "カジノディレクトリ",
    searchPlaceholder: "カジノ名または法域で検索",
    searchLabel: "認証カジノを検索",
    empty: "条件に一致するカジノはありません。",
  },
  verify: {
    title: "シールを確認",
    description:
      "カジノのサイトに表示されているシールIDを入力すると、本物であること、現在Swift Secureの認証を受けていることを確認できます。",
    h1: "シールを確認",
    inputPlaceholder: "例：CS-2026-0042",
    inputLabel: "シールID",
    button: "確認する",
    validStatus: "有効かつ稼働中のシール",
    operator: "運営者：",
    jurisdiction: "法域：",
    invalidStatus: "該当するシールが見つかりません",
    contactUs: "お問い合わせください",
  },
  apply: {
    fieldName: "カジノ名",
    fieldEmail: "連絡先メールアドレス",
    fieldMessage: "その他にお伝えいただきたいことはありますか？",
  },
  faqPage: {
    eyebrow: "よくある質問",
  },
};

export default ja;
