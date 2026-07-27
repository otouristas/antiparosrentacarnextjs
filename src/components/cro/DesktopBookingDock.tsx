"use client";

import { CalendarDays } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { localizedHref } from "@/data/nav-links";
import type { Locale } from "@/i18n/routing";

export default function DesktopBookingDock() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <a
      href={`${localizedHref("home", locale)}#book`}
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl bg-yellow px-3 py-4 font-display text-sm font-extrabold text-navy shadow-lg transition hover:bg-yellow-hover lg:flex"
      aria-label={t("bookNow")}
    >
      <CalendarDays className="h-5 w-5" />
      <span
        className="writing-mode-vertical text-[11px] uppercase tracking-[0.18em]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {t("bookNow")}
      </span>
    </a>
  );
}
