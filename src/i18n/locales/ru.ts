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
    apply: "Регистрация казино",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    primaryLabel: "Основное",
  },
  stickyCta: {
    note: "Управляете одним из казино в этом списке? Операторская часть сайта начинается здесь.",
    button: "Регистрация казино",
  },
  footer: {
    verifySeal: "Проверить знак",
    apply: "Заявка",
    faq: "Вопросы",
  },
  home: {
    title: "Swift Secured",
    howEyebrow: "Как это работает",
    badge: "Независимый сервис. Не аффилирован ни с одним казино.",
    criteriaTitle: "Что устанавливает запись и по каким правилам",
    howTitle: "От сверки с реестром до датированной публичной записи",
    ctaApply: "Что мы проверяем",
    ctaVerify: "Проверить знак",
    description:
      "Мы валидируем лицензионные данные казино по реестрам профильных регуляторов и фиксируем техническое состояние их страниц. Каждый результат с датой.",
    h1: "Независимый аудит лицензионных данных и технического состояния",
    sub: "Наш сервис осуществляет комплексный технический аудит онлайн-казино, валидируя лицензионные данные по реестрам профильных регуляторов и фиксируя фактическое техническое состояние игровых и платёжных страниц. Мы документируем расхождения в подаче лицензионной информации между юрисдикциями, обеспечивая публикацию каждого результата с датой проведения проверки.",
    ctaHeading: "Как проводится аудит",
    ctaSub:
      "Метод опубликован полностью: какие реестры читаются, как фиксируется техническое состояние страницы и что каждый результат устанавливает, а что нет.",
    ctaButton: "Читать метод",
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
