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
const ru: PartialTranslation = {
  nav: {
    howItWorks: "Как это работает",
    about: "О нас",
    faq: "Вопросы",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    primaryLabel: "Основное",
  },
  footer: {
    verifySeal: "Проверить знак",
    apply: "Заявка",
    faq: "Вопросы",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Как это работает",
  },
  methodology: {
    eyebrow: "Методика",
  },
  directory: {
    statusFilterAll: "Все",
  },
  casinos: {
    title: "Каталог казино",
    description:
      "Каталог новых онлайн-казино, которые отслеживает Swift Secured, с текущим статусом проверки для каждого.",
    eyebrow: "Каталог",
    h1: "Каталог казино",
    searchPlaceholder: "Поиск по названию казино или юрисдикции",
    searchLabel: "Поиск по сертифицированным казино",
    empty: "По этому запросу казино не найдены.",
  },
  verify: {
    title: "Проверка знака",
    description:
      "Введите ID знака, указанный на сайте казино, чтобы убедиться, что он подлинный и действует в системе Swift Secured.",
    h1: "Проверка знака",
    inputPlaceholder: "напр. CS-2026-0042",
    inputLabel: "ID знака",
    button: "Проверить",
    validStatus: "Знак действителен и активен",
    operator: "Оператор:",
    jurisdiction: "Юрисдикция:",
    invalidStatus: "Знак не найден",
    contactUs: "свяжитесь с нами",
  },
  apply: {
    fieldName: "Название казино",
    fieldEmail: "Контактный email",
    fieldMessage: "Что ещё нам стоит знать?",
  },
  faqPage: {
    eyebrow: "Вопросы",
  },
};

export default ru;
