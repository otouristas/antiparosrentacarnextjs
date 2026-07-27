import type { PageCopy } from "@/content/types";

/**
 * legal/terms-conditions , tr
 *
 * Rental terms body is served from content/raw markdown (2026 edition).
 * This module holds locale-native SEO chrome and related links.
 */
export const copy: PageCopy = {
  locale: "tr",

  seo: {
    title: 'Şartlar ve Koşullar 2026 | AGGELOS Rentals',
    description: "Şartlar ve Koşullar 2026: Paros ve Antiparos’ta AGGELOS Rentals araç, scooter ve ATV kiralamaları, depozito ve iptal kuralları.",
    keywords: [],
  },

  h1: 'Şartlar ve Koşullar',
  intro: 'Antiparos, Paros ve Pire için araç kiralama şartlarımızı dikkatle okuyun.',

  cta: {
    primary: 'Araç kirala',
    secondary: "",
    whatsapp: 'WhatsApp',
    call: 'Bizi arayın',
  },

  sections: [
    { heading: 'Kapsam', body: ['Bu şartlar Paros, Antiparos ve ilgili teslim noktalarında AGGELOS Rentals rezervasyon ve kiralamalarını kapsar.'] },
    { heading: 'Teslimde sözleşme', body: ['Teslimdeki sözleşme ve voucher depozito, sigorta ve iade için bağlayıcıdır.'] },
    { heading: 'Sorular', body: ['Teslimden önce bir madde net değilse Antiparos liman ofisiyle iletişime geçin.'] },
  ],

  faqs: [
    { q: 'Rezervasyonlar iade edilir mi?', a: 'Hayır. Antiparos, Paros ve Pire rezervasyonları iade edilmez.' },
    { q: 'Minimum sürücü yaşı nedir?', a: 'Minimum 24, premium/lüks için 26. Azami 74, ek ücret olmadan.' },
    { q: 'Kilometre sınırsız mı?', a: "Antiparos ve Paros'ta sınırsız. Pire'de günde 150 km." }
  ],

  related: [
    { to: 'money/paros-rent-a-car', anchor: 'Paros araç kiralama' },
    { to: 'money/rent-a-car-antiparos-aggelos', anchor: 'Antiparos araç kiralama' },
    { to: 'legal/privacy-policy', anchor: 'Gizlilik politikası' }
  ],

  finalCta: { heading: 'Kiralamaya hazır mısınız?', sub: 'Tarihleriniz için canlı fiyatları görün.', button: 'Fiyat ara' },
};

export default copy;
