import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "sv",
  seo: {
    title: "Parosguide | AGGELOS Rentals",
    description: "Byar, stränder och ankomst till Paros, plus ärliga råd om biluthyrning hos AGGELOS Rentals på öarna i Kykladerna.",
    keywords: [],
  },
  h1: "Reseguide Paros",
  intro: "Byar, stränder och ankomst till Paros, plus ärliga hyrråd från AGGELOS Rentals. AGGELOS Rentals.",
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
    { to: "money/rent-a-car-antiparos-aggelos", anchor: "Hyra på Antiparos · paros-island" },
    { to: "money/paros-rent-a-car", anchor: "Hyra på Paros · paros-island" },
    { to: "fleet", anchor: "Hela flottan · paros-island" },
    { to: "contact/contact", anchor: "Kontakt · paros-island" },
  ],
  finalCta: {
    heading: "Redo för öns vägar?",
    sub: "Boka online, möt oss på flygplats eller hamn, kör med tydliga villkor.",
    button: "Sök fordon",
  },
};

export default copy;
