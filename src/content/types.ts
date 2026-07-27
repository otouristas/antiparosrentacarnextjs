import type { Locale } from "@/i18n/routing";

/**
 * Content model for natively-authored, per-locale page copy.
 *
 * One module per (page, locale). Every locale is written independently , these
 * are not translations, and `scripts/validate-content.ts` enforces that by
 * rejecting any locale whose H1, title, description or intro matches another's.
 *
 * NOTE: frozen at the end of Phase 1. Phase 4 authors ~900 modules against these
 * types, after which a change here is a codemod rather than an edit.
 */

export type Seo = {
  /** Complete title. No template is appended anywhere , what you write is what ships. */
  title: string;
  description: string;
  /** Absolute or public-relative image for OG/Twitter. Falls back to the route default. */
  ogImage?: string;
  /** Authoring aid only. Never emitted as <meta keywords>. */
  keywords?: string[];
};

export type Faq = { q: string; a: string };

export type Section = {
  heading: string;
  body: string[];
  bullets?: string[];
};

/**
 * An internal link. `anchor` is the SEO payload and must be written natively per
 * locale , the validator rejects a non-English anchor identical to its English
 * counterpart, which is the usual tell that copy was machine-translated.
 */
export type InternalLink = {
  /** Route manifest key, validated to exist. */
  to: string;
  anchor: string;
};

export type Cta = {
  primary: string;
  secondary?: string;
  whatsapp: string;
  call: string;
};

export type PageCopy = {
  /**
   * Self-declared locale. The validator asserts this matches the folder the file
   * lives in, which makes a copy-pasted en.ts -> ru.ts mechanically detectable.
   */
  locale: Locale;
  seo: Seo;
  h1: string;
  intro: string;
  cta: Cta;
  sections: Section[];
  faqs: Faq[];
  related: InternalLink[];
  finalCta: { heading: string; sub: string; button: string };
};

export type CategoryCopy = PageCopy & {
  /** Locale-native category name, reused in nav and breadcrumbs. */
  label: string;
  bestFor: string;
  licence: string;
  compare: string;
};

export type VehicleCopy = {
  locale: Locale;
  /** Locale-native marketing name, e.g. "Mini Manual" -> "Kleinwagen, Schaltgetriebe". */
  name: string;
  blurb: string;
  /** "or similar" phrasing — grammar differs enough per language to be authored. */
  orSimilar: string;
  licence?: string;
  /** Up to 3 short selling points for the PDP story section. */
  highlights?: string[];
  seo: Seo;
};

export type ArticleCopy = PageCopy & {
  /** Long-form body as markdown, generated from content/raw/**\/*.md. */
  body: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export type AnyCopy = PageCopy | CategoryCopy | VehicleCopy | ArticleCopy;

/** Collections in the generated registry. */
export type ContentCollection =
  "pages" | "fleet-category" | "vehicle" | "articles" | "shared";
