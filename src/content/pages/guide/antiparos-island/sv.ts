import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: "Antiparosguide | AGGELOS Rentals",
    description: "Stränder, grottan, hamnliv och när hyra lönar sig på Antiparos. Lokala tips från AGGELOS Rentals i hamnen. AGGELOS Rentals.",
    keywords: [],
  },
  h1: "Reseguide Antiparos",
  intro: "Stränder, grottan, hamnliv och när hyra lönar sig på Antiparos. Lokala tips från AGGELOS Rentals i hamnen. AGGELOS Rentals.",
  cta: {
    primary: "Kolla tillgänglighet",
    secondary: "Se fordonsflotta",
    whatsapp: "WhatsApp",
    call: "Ring",
  },
  sections: [
    {
      heading: "Varför hyra",
      body: ["I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik.", "Kort sagt: du väljer mötesplats, vi förbereder fordon och papper."],
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Hyra på Antiparos · antiparos-island" },
    { to: "money/paros-rent-a-car", anchor: "Hyra på Paros · antiparos-island" },
    { to: "fleet", anchor: "Hela flottan · antiparos-island" },
    { to: "contact/contact", anchor: "Kontakt · antiparos-island" },
  ],
  finalCta: {
    heading: "Redo för öns vägar?",
    sub: "Boka online, möt oss på flygplats eller hamn, kör med tydliga villkor.",
    button: "Sök fordon",
  },
};

export default copy;
