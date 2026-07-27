import type { Locale } from "@/i18n/routing";
import type { HomeContent } from "./types";
import { homeEn } from "./en";
import { homeEl } from "./el";

const map: Partial<Record<Locale, HomeContent>> = {
  en: homeEn,
  el: homeEl,
};

export function getHomeContent(locale: Locale): HomeContent {
  return map[locale] || homeEn;
}

export type { HomeContent, HomeFaq } from "./types";
