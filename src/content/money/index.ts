import type { Locale } from "@/i18n/routing";
import type { MoneyContent } from "./types";
import { moneyEn } from "./en";
import { moneyEl } from "./el";

const byLocale: Partial<Record<Locale, Record<string, MoneyContent>>> = {
  en: moneyEn,
  el: moneyEl,
};

export function getMoneyContent(
  pageId: string,
  locale: Locale,
): MoneyContent | null {
  const localized = byLocale[locale]?.[pageId];
  if (localized) return localized;
  return moneyEn[pageId] || null;
}

export type { MoneyContent } from "./types";
