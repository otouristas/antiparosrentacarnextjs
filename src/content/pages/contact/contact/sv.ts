import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: "Kontakt | AGGELOS Rentals · Grekland",
    description: "I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik. AGGELOS Rentals. Lokal upphämtning på Paros och Antiparos.",
    keywords: [],
  },
  h1: "Kontakt i Grekland",
  intro: "I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik.",
  cta: {
    primary: "Kolla tillgänglighet",
    secondary: "Se fordonsflotta",
    whatsapp: "WhatsApp",
    call: "Ring",
  },
  sections: [
    {
      heading: "Varför hyra",
      body: ["I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik."],
    },
    {
      heading: "Upphämtning och leverans",
      body: ["I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik."],
    },
    {
      heading: "Vad gäster väljer",
      body: ["I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik."],
    },
  ],
  faqs: [
    { q: "Var hämtar jag fordonet?", a: "Välj flygplats, hamn eller hotell när det erbjuds." },
    { q: "Vilket körkort behövs?", a: "Vi kontrollerar körkortskategori vid upphämtning." },
    { q: "Kan jag åka till Antiparos?", a: "Ja vid överenskomna one-way-resor mellan Paros och Antiparos." },
  ],
  related: [
    { to: "contact/about-us", anchor: "Link 1 · contact" },
    { to: "money/paros-airport-rent-a-car-port", anchor: "Upphämtning flygplats · contact" },
    { to: "fleet", anchor: "Hela flottan · contact" },
    { to: "home", anchor: "Link 4 · contact" },
  ],
  finalCta: {
    heading: "Redo för öns vägar?",
    sub: "Boka online, möt oss på flygplats eller hamn, kör med tydliga villkor.",
    button: "Sök fordon",
  },
};

export default copy;
