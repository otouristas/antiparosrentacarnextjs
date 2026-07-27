import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , en
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "en",

  seo: {
    title: 'Terms & Conditions 2026 | AGGELOS Rentals',
    description: '2026 rental terms for cars, scooters and ATVs with AGGELOS Rentals on Paros and Antiparos, including deposits, insurance and cancellation.',
    keywords: [],
  },

  h1: 'Terms & Conditions',
  intro: 'Please read carefully our car hire terms and conditions for Antiparos, Paros and Piraeus rentals.',

  cta: {
    primary: 'Book a car',
    secondary: "",
    whatsapp: 'WhatsApp us',
    call: 'Call us',
  },

  sections: [
    { heading: 'Scope of these terms', body: ['These terms cover bookings and vehicle hire with AGGELOS Rentals for Paros, Antiparos and related pickup points.'] },
    { heading: 'Rental agreement at pickup', body: ['The contract and voucher presented at handover remain binding for deposits, insurance options and return conditions.'] },
    { heading: 'Questions', body: ['Contact the Antiparos Port desk if any clause is unclear before you collect the keys.'] },
  ],

  faqs: [
    { q: 'Are bookings refundable?', a: 'No. All reservations are non-refundable for Antiparos, Paros and Piraeus rentals.' },
    { q: 'What is the minimum driver age?', a: 'The minimum age is 24, or 26 for premium and luxury cars. The maximum age is 74 without a surcharge.' },
    { q: 'Is mileage unlimited?', a: 'Mileage is unlimited on Antiparos and Paros. Piraeus rentals allow 150 km per day; overage is charged per kilometre.' }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Paros car rental' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Antiparos car rental' },
    { to: 'legal/privacy-policy', anchor: 'Privacy policy' }
  ],

  finalCta: { heading: 'Ready to rent?', sub: 'Search live prices for your dates on Antiparos and Paros.', button: 'Search prices' },
};

export default copy;
