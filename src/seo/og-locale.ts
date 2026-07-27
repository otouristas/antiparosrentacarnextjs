import type { Locale } from "@/i18n/routing";

/**
 * Open Graph requires `language_TERRITORY`, not a bare language code.
 * The previous metadata builder emitted `de`, `el`, `ru` etc., which OG parsers
 * reject — so locale was effectively absent from every share card.
 */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  el: "el_GR",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  de: "de_DE",
  nl: "nl_NL",
  sv: "sv_SE",
  pt: "pt_PT",
  ru: "ru_RU",
  tr: "tr_TR",
};

/** Text direction. All 11 current locales are LTR; kept explicit for future RTL. */
export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  el: "ltr",
  fr: "ltr",
  es: "ltr",
  it: "ltr",
  de: "ltr",
  nl: "ltr",
  sv: "ltr",
  pt: "ltr",
  ru: "ltr",
  tr: "ltr",
};
