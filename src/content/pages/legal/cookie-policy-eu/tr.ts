import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "tr",
  seo: {
    title: 'Çerez politikası (AB) | AGGELOS Rentals',
    description: 'AGGELOS Rentals’ın antiparosrentacar.com üzerinde çerezleri nasıl kullandığı ve Paros ile Antiparos için tercihleri nasıl yöneteceğiniz.',
    keywords: [],
  },
  h1: 'Çerez politikası (AB)',
  intro: 'Bu sayfa, AGGELOS Rentals’ın antiparosrentacar.com üzerinde Avrupa Ekonomik Alanı ve İsviçre ziyaretçileri için hangi çerezleri ve benzer teknolojileri kullandığını ve bunları nasıl kontrol edeceğinizi açıklar.',
  cta: {
    primary: 'Araç ara',
    secondary: 'Filo',
    whatsapp: 'WhatsApp',
    call: 'Ara',
  },
  sections: [
    {
      heading: 'Biz kimiz',
      body: [
        'AGGELOS Rentals bu siteyi Antiparos Limanı, Kikladlar, Yunanistan’dan işletir. Rezervasyon veya site gizliliği için iletişim sayfası, telefon veya WhatsApp kullanın.',
      ],
    },
    {
      heading: 'Çerez nedir',
      body: [
        'Çerezler cihazınızda saklanan küçük metin dosyalarıdır. Yerel depolama gibi benzer araçlar tercihleri tutabilir. Sitenin seçimleri hatırlamasına ve temel özellikleri çalıştırmasına yardım ederler.',
      ],
    },
    {
      heading: 'Bu sitedeki çerezler',
      body: [
        'Bu Next.js sitesi eski WordPress kurulumu değildir. Bu sayfalarda WordPress, Elementor veya Google AdSense gibi reklam ağları çalıştırmıyoruz.',
      ],
      bullets: [
        'Zorunlu: çerez seçiminizi (Tümünü kabul et veya Yalnızca gerekli) saklar, böylece banner her ziyarette gelmez.',
        'Zorunlu: dil ve rezervasyon arama alanları tarayıcıda kısa süre tutulabilir.',
        'İsteğe bağlı analitik veya pazarlama çerezleri yalnızca kabul ederseniz ve araçlar açıksa kullanılır.',
      ],
    },
    {
      heading: 'Çerezleri yönetmek',
      body: [
        'Bannerda Tümünü kabul et veya Yalnızca gerekli kullanın. Tarayıcıda site verilerini temizlemek seçimi sıfırlar.',
      ],
    },
    {
      heading: 'Güncellemeler',
      body: [
        'Yasalar veya özellikler değişince bu politikayı güncelleyebiliriz. Bu URL’deki sürüm ziyaret veya rezervasyon tarihiniz için geçerlidir.',
      ],
    },
    {
      heading: 'İletişim',
      body: [
        'Çerez veya kişisel veri soruları: İletişim, +30 694 495 0094 veya WhatsApp. Varsa rezervasyon referansınızı yazın.',
      ],
    },
  ],
  faqs: [
    { q: 'Rezervasyon için isteğe bağlı çerezleri kabul etmeli miyim?', a: 'Hayır. Gezinmek ve rezervasyona başlamak için zorunlu çerezler yeterlidir.' },
    { q: 'Seçimim nerede saklanır?', a: 'Tarayıcı yerel depolamasında AGGELOS onay anahtarı altında.' },
    { q: 'Bu kiralama sözleşmesinin yerine geçer mi?', a: 'Hayır. Teslimdeki sözleşme ve fiş kiralamayı yönetir. Bu sayfa yalnızca site çerezlerini kapsar.' },
  ],
  related: [
    { to: 'legal/privacy-policy', anchor: 'Gizlilik politikası' },
    { to: 'legal/terms-conditions', anchor: 'Şartlar ve koşullar' },
    { to: 'contact/contact', anchor: 'AGGELOS Rentals ile iletişim' },
    { to: 'home', anchor: 'Ana sayfaya dön' },
  ],
  finalCta: {
    heading: 'Hazır olduğunuzda',
    sub: 'Paros ve Antiparos için canlı fiyat arayın veya aile masasına sorun.',
    button: 'Araç ara',
  },
};

export default copy;
