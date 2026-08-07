import type { PartialTranslation } from "../types";

/**
 * Partial overrides. Any key absent here falls back to English, per key.
 *
 * Added 7 August 2026 with the home page only. Ukrainian was not one of the
 * nineteen locales before this, so everything outside `home` is deliberately
 * English until it is translated — the fallback makes that safe rather than
 * broken, and a correct English sentence beats a fluent guess.
 *
 * Written by hand rather than translated from the English word for word.
 * Ukrainian and Russian are the only two locales that never derive from en.ts,
 * so they are the only two allowed to depart from its phrasing. The facts must
 * not depart: same registers, same dating, same absence of any claim about
 * games, fairness or payouts.
 */
const uk: PartialTranslation = {
  nav: {
    howItWorks: "Як це працює",
    about: "Про нас",
    faq: "Питання",
    apply: "Реєстрація казино",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    primaryLabel: "Основне",
  },
  footer: {
    verifySeal: "Перевірити знак",
    apply: "Заявка",
    faq: "Питання",
  },
  stickyCta: {
    note: "Керуєте одним із казино в цьому списку? Операторська частина сайту починається тут.",
    button: "Реєстрація казино",
  },
  home: {
    title: "Swift Secured",
    badge: "Незалежний сервіс. Не афілійований із жодним казино.",
    criteriaTitle: "Що встановлює запис і за якими правилами",
    howTitle: "Від звірки з реєстром до датованого публічного запису",
    ctaApply: "Що ми перевіряємо",
    ctaVerify: "Перевірити знак",
    description:
      "Ми валідуємо ліцензійні дані казино за реєстрами профільних регуляторів і фіксуємо технічний стан їхніх сторінок. Кожен результат із датою.",
    h1: "Незалежний аудит ліцензійних даних та технічного стану",
    sub: "Наш сервіс здійснює комплексний технічний аудит онлайн-казино, валідуючи ліцензійні дані за реєстрами профільних регуляторів та фіксуючи фактичний технічний стан ігрових і платіжних сторінок. Ми документуємо розбіжності в поданні ліцензійної інформації між юрисдикціями, забезпечуючи публікацію кожного результату з датою проведення перевірки.",
    howEyebrow: "Як це працює",
    ctaHeading: "Як проводиться аудит",
    ctaSub:
      "Метод опубліковано повністю: які реєстри читаються, як фіксується технічний стан сторінки і що кожен результат встановлює, а що ні.",
    ctaButton: "Читати метод",
  },
};

export default uk;
