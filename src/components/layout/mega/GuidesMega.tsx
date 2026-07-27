"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { localizedHref } from "@/data/nav-links";
import { guideTilesForCategory, type GuideCategoryId } from "@/data/mega-menu";
import MegaTile, { MegaRailButton } from "./MegaTile";

type Props = {
  bookHref: string;
};

export default function GuidesMega({ bookHref }: Props) {
  const t = useTranslations("mega");
  const tm = useTranslations("menu");
  const locale = useLocale() as Locale;
  const [category, setCategory] = useState<GuideCategoryId>("all");

  const tiles = useMemo(
    () => guideTilesForCategory(category).slice(0, 6),
    [category],
  );

  const localePath = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean.endsWith("/") ? clean : `${clean}/`}`;
  };

  const labelFor = (id: string) => {
    switch (id) {
      case "best-things":
        return t("guides.bestThings");
      case "how-to-get":
        return tm("howToGet");
      case "need-car":
        return tm("needCar");
      case "paros-vs":
        return t("guides.parosVs");
      case "travel-tips":
        return tm("travelTips");
      case "antiparos-island":
        return t("guides.antiparosIsland");
      default:
        return id;
    }
  };

  const categories: GuideCategoryId[] = [
    "all",
    "islands",
    "getting-around",
    "tips",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[11rem_1fr_14rem]">
      <nav
        aria-label={t("guideRail")}
        className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {categories.map((c) => (
          <MegaRailButton
            key={c}
            active={category === c}
            onClick={() => setCategory(c)}
          >
            {t(`guideCats.${c}`)}
          </MegaRailButton>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {tiles.map((tile) => (
          <MegaTile
            key={tile.id}
            href={localizedHref(tile.pageId, locale)}
            image={tile.image}
            label={labelFor(tile.id)}
          />
        ))}
      </div>

      <aside className="flex flex-col justify-between gap-4 rounded-sm border border-line bg-navy p-5 text-foam">
        <div>
          <p className="text-2xs font-bold uppercase tracking-[0.18em] text-yellow/80">
            {t("guidesAsideEyebrow")}
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug">
            {t("guidesAsideTitle")}
          </p>
          <p className="mt-2 text-sm text-foam/75">{t("guidesAsideBody")}</p>
        </div>
        <div className="space-y-2">
          <a
            href={localePath("/guides/")}
            className="block text-sm font-bold text-yellow underline-offset-4 hover:underline"
          >
            {t("allGuides")}
          </a>
          <a href={bookHref} className="btn-yellow w-full px-4 py-2.5 text-sm">
            {t("bookCta")}
          </a>
        </div>
      </aside>
    </div>
  );
}
