"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import {
  FLEET_INTENTS,
  fleetTilesForIntent,
  type FleetIntentId,
} from "@/data/mega-menu";
import { MegaRailButton, FleetIconTile } from "./MegaTile";

type Props = {
  bookHref: string;
};

/**
 * Vehicles mega — icon directory (silhouettes), not photo collage.
 */
export default function FleetMega({ bookHref }: Props) {
  const t = useTranslations("mega");
  const tf = useTranslations("fleet");
  const tm = useTranslations("menu");
  const locale = useLocale() as Locale;
  const [intent, setIntent] = useState<FleetIntentId>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const tiles = useMemo(() => fleetTilesForIntent(intent), [intent]);

  const localePath = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean.endsWith("/") ? clean : `${clean}/`}`;
  };

  const hint =
    intent !== "all"
      ? t(`intentHint.${intent}`)
      : hovered
        ? t("fleetHint.active", { category: tf(`categories.${hovered}`) })
        : t("fleetHint.default");

  return (
    <div className="grid gap-6 lg:grid-cols-[11rem_1fr_14rem]">
      <nav
        aria-label={t("intentRail")}
        className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {FLEET_INTENTS.map((item) => (
          <MegaRailButton
            key={item.id}
            active={intent === item.id}
            onClick={() => setIntent(item.id)}
          >
            {t(`intents.${item.id}`)}
          </MegaRailButton>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {tiles.map((tile) => (
          <FleetIconTile
            key={tile.slug}
            href={localePath(`/fleet/${tile.slug}/`)}
            icon={tile.icon}
            label={tf(`categories.${tile.slug}`)}
            active={hovered === tile.slug}
            dimmed={Boolean(hovered) && hovered !== tile.slug}
            onMouseEnter={() => setHovered(tile.slug)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(tile.slug)}
            onBlur={() => setHovered(null)}
          />
        ))}
      </div>

      <aside className="flex flex-col justify-between gap-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
        <div>
          <p className="text-2xs font-bold uppercase tracking-[0.18em] text-navy/45">
            {t("recommended")}
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-snug text-navy">
            {hint}
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={localePath("/fleet/")}
            className="group inline-flex min-h-11 items-center gap-2 border-b-2 border-yellow pb-1 text-sm font-bold text-navy transition-colors hover:border-navy"
          >
            {tm("allFleet")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href={bookHref} className="btn-yellow w-full px-4 py-2.5 text-sm">
            {t("bookCta")}
          </a>
        </div>
      </aside>
    </div>
  );
}
