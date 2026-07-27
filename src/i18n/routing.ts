import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "el",
  "fr",
  "es",
  "it",
  "de",
  "nl",
  "sv",
  "pt",
  "ru",
  "tr",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  el: "Ελληνικά",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  de: "Deutsch",
  nl: "Nederlands",
  sv: "Svenska",
  pt: "Português",
  ru: "Русский",
  tr: "Türkçe",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  /**
   * Every locale carries its prefix, English included — `/en/paros-rent-a-car/`.
   *
   * Under the previous "as-needed" setting English lived at the bare root and
   * there was no `/en/` at all. Combined with locale auto-detection that made
   * English genuinely unreachable: a Greek browser hitting `/` was redirected to
   * `/el/`, and no URL existed to get back.
   */
  localePrefix: "always",
  /**
   * Never guess from Accept-Language. `/` resolves to the default locale
   * deterministically and visitors change language via the switcher, which is
   * the only behaviour that lets a shared link land everyone on the same page.
   */
  localeDetection: false,
});
