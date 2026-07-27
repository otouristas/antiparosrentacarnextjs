export type HomeFaq = { q: string; a: string };

export type HomeContent = {
  brand: string;
  h1: string;
  valueProp: string;
  ctaBook: string;
  ctaWhatsApp: string;
  ctaCall: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  locationsTitle: string;
  locationsSubtitle: string;
  whyTitle: string;
  whySubtitle: string;
  whyItems: { title: string; body: string }[];
  featuredTitle: string;
  featuredSubtitle: string;
  routesTitle: string;
  routesSubtitle: string;
  routes: { title: string; body: string }[];
  faqTitle: string;
  faqs: HomeFaq[];
  guidesTitle: string;
  guidesSubtitle: string;
  finalTitle: string;
  finalSubtitle: string;
  finalCta: string;
};
