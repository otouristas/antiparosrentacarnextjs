import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , ru
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "ru",

  seo: {
    title: 'Условия 2026 | AGGELOS Rentals',
    description: 'Условия использования 2026: бронирования авто, скутеров и ATV у AGGELOS Rentals на Паросе и Антипаросе, депозиты и отмена.',
    keywords: [],
  },

  h1: 'Условия использования',
  intro: 'Пожалуйста, внимательно ознакомьтесь с условиями аренды для Антипароса, Пароса и Пирея.',

  cta: {
    primary: 'Забронировать авто',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Позвонить',
  },

  sections: [
    { heading: 'Область применения', body: ['Эти условия покрывают бронирования и аренду у AGGELOS Rentals на Паросе, Антипаросе и связанных точках выдачи.'] },
    { heading: 'Договор при выдаче', body: ['Договор и ваучер при передаче остаются обязательными для депозита, страховки и возврата.'] },
    { heading: 'Вопросы', body: ['Свяжитесь с офисом в порту Антипароса, если пункт непонятен до получения ключей.'] },
  ],

  faqs: [
    { q: 'Возвращаются ли деньги за бронирование?', a: 'Нет. Все бронирования для Антипароса, Пароса и Пирея невозвратные.' },
    { q: 'Какой минимальный возраст водителя?', a: 'Минимум 24 года, для премиум/люкс , 26. Максимум 74 без доплаты.' },
    { q: 'Пробег безлимитный?', a: 'Безлимит на Антипаросе и Паросе. В Пирее , 150 км в день.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Аренда авто на Паросе' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Аренда авто на Антипаросе' },
    { to: 'legal/privacy-policy', anchor: 'Политика конфиденциальности' }
  ],

  finalCta: { heading: 'Готовы арендовать?', sub: 'Смотрите актуальные цены на ваши даты.', button: 'Искать цены' },
};

export default copy;
