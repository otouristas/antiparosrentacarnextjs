import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: "Om oss | AGGELOS Rentals · Grekland",
    description: "I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik. AGGELOS Rentals. Lokal upphämtning på Paros och Antiparos.",
    keywords: [],
  },
  h1: "Om oss i Grekland",
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
    { to: "contact/contact", anchor: "Kontakt · about-us" },
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Hyra på Antiparos · about-us" },
    { to: "fleet", anchor: "Hela flottan · about-us" },
    { to: "home", anchor: "Link 4 · about-us" },
  ],
  finalCta: {
    heading: "Redo för öns vägar?",
    sub: "Boka online, möt oss på flygplats eller hamn, kör med tydliga villkor.",
    button: "Sök fordon",
  },
};

export default copy;
