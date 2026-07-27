import type { PageCopy } from "@/content/types";

export const copy: PageCopy = {
  locale: "en",
  seo: {
    title: "Privacy Policy | AGGELOS Rentals",
    description: "Privacy Policy: Read this policy for AGGELOS Rentals bookings and website use on Paros and Antiparos. Contact us with questions about your rental.",
    keywords: [],
  },
  h1: "Privacy Policy",
  intro: "Privacy Policy: Read this policy for AGGELOS Rentals bookings and website use on Paros and Antiparos. Contact us with questions about your rental.",
  cta: {
    primary: "Check availability",
    secondary: "View fleet",
    whatsapp: "WhatsApp us",
    call: "Call now",
  },
  sections: [
    {
      heading: "Scope",
      body: ["These terms cover how we handle site use, bookings, and communications for AGGELOS Rentals services."],
    },
    {
      heading: "Your rights",
      body: ["You can contact us to ask questions about data, bookings, or policy details using the contact page."],
    },
    {
      heading: "Updates",
      body: ["We may update this page as laws or booking tools change. The dated site version is the reference at booking time."],
    },
  ],
  faqs: [
    { q: "Who is the operator?", a: "AGGELOS Rentals, based at Antiparos Port, Greece." },
    { q: "How do I ask a policy question?", a: "Use the contact form, phone, or WhatsApp with your booking reference if you have one." },
    { q: "Does this replace the rental contract?", a: "The rental agreement at pickup and your voucher remain binding for the vehicle hire itself." },
  ],
  related: [
    { to: "contact/contact", anchor: "Contact us · privacy-policy" },
    { to: "contact/about-us", anchor: "About AGGELOS Rentals · privacy-policy" },
    { to: "home", anchor: "Homepage · privacy-policy" },
    { to: "money/paros-rent-a-car", anchor: "Paros rentals · privacy-policy" },
  ],
  finalCta: {
    heading: "Need a human answer?",
    sub: "Policy pages are clear, but our team can explain how a rule applies to your dates.",
    button: "Search vehicles",
  },
};

export default copy;
