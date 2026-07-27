"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { localizedHref } from "@/data/nav-links";
import {
  LOCATION_TILES,
  locationTilesForIsland,
  type LocationIsland,
} from "@/data/mega-menu";
import MegaTile, { MegaRailButton } from "./MegaTile";
import PickupMap from "./PickupMap";

type IslandFilter = LocationIsland | "all";

type Props = {
  bookHref: string;
};

export default function LocationsMega({ bookHref }: Props) {
  const t = useTranslations("mega");
  const tn = useTranslations("nav");
  const tm = useTranslations("menu");
  const locale = useLocale() as Locale;
  const [island, setIsland] = useState<IslandFilter>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const tiles = useMemo(() => locationTilesForIsland(island), [island]);

  const labelFor = (id: string) => {
    switch (id) {
      case "paros-airport":
        return tn("parosAirport");
      case "parikia-port":
        return tm("parosPort");
      case "paros-island":
        return tn("parosCar");
      case "antiparos-port":
        return tn("antiparosCar");
      case "piraeus":
        return tm("piraeus");
      default:
        return id;
    }
  };

  const mapPins = useMemo(() => {
    const source =
      island === "all"
        ? LOCATION_TILES
        : LOCATION_TILES.filter((loc) => loc.island === island);
    return source
      .filter((loc) => loc.coords)
      .map((loc) => ({
        id: loc.id,
        lat: loc.coords!.lat,
        lng: loc.coords!.lng,
        label: labelFor(loc.id),
      }));
    // labelFor closes over locale translations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [island, locale]);

  const activeTile = LOCATION_TILES.find((loc) => loc.id === hovered);
  const mainlandActive = hovered === "piraeus" || island === "mainland";

  const hint = activeTile
    ? t(`locationHint.${activeTile.id}`)
    : island === "all"
      ? t("locationHint.default")
      : t(`islandHint.${island}`);

  const filters: IslandFilter[] = ["all", "paros", "antiparos", "mainland"];

  return (
    <div className="grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)_minmax(16rem,18rem)]">
      <nav
        aria-label={t("islandRail")}
        className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {filters.map((f) => (
          <MegaRailButton
            key={f}
            active={island === f}
            onClick={() => setIsland(f)}
          >
            {t(`islands.${f}`)}
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
            active={hovered === tile.id}
            dimmed={Boolean(hovered) && hovered !== tile.id}
            onMouseEnter={() => setHovered(tile.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(tile.id)}
            onBlur={() => setHovered(null)}
          />
        ))}
      </div>

      <aside className="flex flex-col gap-3">
        <PickupMap
          pins={mapPins}
          activeId={
            hovered && LOCATION_TILES.find((l) => l.id === hovered)?.coords
              ? hovered
              : null
          }
          onPinHover={setHovered}
          mainlandActive={mainlandActive}
        />
        <div className="rounded-sm border border-line bg-white p-3">
          <p className="text-2xs font-bold uppercase tracking-[0.18em] text-navy/45">
            {t("pickup")}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-navy">
            {hint}
          </p>
          <a
            href={bookHref}
            className="btn-yellow mt-3 inline-flex w-full px-4 py-2.5 text-sm"
          >
            {t("bookCta")}
          </a>
        </div>
      </aside>
    </div>
  );
}
