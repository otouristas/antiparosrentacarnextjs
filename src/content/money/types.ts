export type MoneyFaq = { q: string; a: string };

export type MoneyContent = {
  h1: string;
  intro: string;
  image?: string;
  ctaPrimary: string;
  fleetTitle: string;
  faqTitle: string;
  finalTitle: string;
  finalSubtitle: string;
  sections: { title: string; paragraphs: string[] }[];
  vehicleHints?: { title: string; body: string }[];
  faqs: MoneyFaq[];
  related: ({ label: string; id: string } | { label: string; href: string })[];
};
