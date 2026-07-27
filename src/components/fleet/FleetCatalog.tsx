"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import type { FleetVehicleType } from "@/data/fleet-types";
import type { FleetCategorySlug } from "@/data/fleet-categories";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";
import { FLEET_CATEGORY_ICON } from "@/data/fleet-icons";
import VehicleCard from "@/components/fleet/VehicleCard";

type FilterState = {
  categories: Set<FleetCategorySlug>;
  transmission: "all" | "automatic" | "manual";
  seats: Set<number>;
  fuel: "all" | "petrol" | "diesel" | "hybrid";
  priceMin: string;
  priceMax: string;
};

const SEAT_OPTIONS = [2, 4, 5, 7, 9] as const;

function emptyFilters(locked?: FleetCategorySlug): FilterState {
  return {
    categories: locked ? new Set([locked]) : new Set(),
    transmission: "all",
    seats: new Set(),
    fuel: "all",
    priceMin: "",
    priceMax: "",
  };
}

function applyFilters(
  vehicles: FleetVehicleType[],
  f: FilterState,
): FleetVehicleType[] {
  return vehicles.filter((v) => {
    if (f.categories.size && !f.categories.has(v.category)) return false;
    const tr = (v.specs.transmission ?? "").toLowerCase();
    if (f.transmission === "automatic" && !tr.includes("auto")) return false;
    if (f.transmission === "manual" && !tr.includes("manual")) return false;
    if (f.seats.size) {
      const p = v.specs.passengers;
      if (p == null || !f.seats.has(p)) return false;
    }
    const fuel = (v.specs.fuel ?? "").toLowerCase();
    if (
      f.fuel === "petrol" &&
      !(fuel.includes("petrol") || fuel.includes("gas"))
    )
      return false;
    if (f.fuel === "diesel" && !fuel.includes("diesel")) return false;
    if (f.fuel === "hybrid" && !fuel.includes("hybrid")) return false;
    const min = f.priceMin.trim() ? Number(f.priceMin) : null;
    const max = f.priceMax.trim() ? Number(f.priceMax) : null;
    if (
      min != null &&
      !Number.isNaN(min) &&
      (v.priceFrom == null || v.priceFrom < min)
    ) {
      return false;
    }
    if (
      max != null &&
      !Number.isNaN(max) &&
      (v.priceFrom == null || v.priceFrom > max)
    ) {
      return false;
    }
    return true;
  });
}

function FiltersPanel({
  filters,
  setFilters,
  onReset,
  resultCount,
  lockedCategory,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onReset: () => void;
  resultCount: number;
  lockedCategory?: FleetCategorySlug;
}) {
  const t = useTranslations("fleet");

  const pill = (active: boolean) =>
    `min-h-10 rounded-sm border px-3 text-sm font-semibold transition-colors ${
      active
        ? "border-yellow bg-yellow text-navy"
        : "border-navy/15 bg-white text-navy/75 hover:border-navy/35"
    }`;

  const toggleCategory = (slug: FleetCategorySlug) => {
    const next = new Set(filters.categories);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setFilters({ ...filters, categories: next });
  };

  const toggleSeat = (n: number) => {
    const next = new Set(filters.seats);
    if (next.has(n)) next.delete(n);
    else next.add(n);
    setFilters({ ...filters, seats: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-navy">
          {t("available", { count: resultCount })}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold uppercase tracking-wider text-navy/50 underline-offset-2 hover:text-navy hover:underline"
        >
          {t("clearAll")}
        </button>
      </div>

      {!lockedCategory ? (
        <fieldset>
          <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
            {t("filterCategory")}
          </legend>
          <ul className="space-y-1.5">
            {FLEET_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-sm px-1 py-1.5 text-sm font-medium text-navy/80 hover:bg-brand-light">
                  <input
                    type="checkbox"
                    checked={filters.categories.has(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="h-4 w-4 accent-navy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FLEET_CATEGORY_ICON[cat.slug]}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                  <span>{t(`categories.${cat.slug}`)}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {t("filterTransmission")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["all", "automatic", "manual"] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={pill(filters.transmission === key)}
              onClick={() => setFilters({ ...filters, transmission: key })}
            >
              {key === "all"
                ? t("filterAll")
                : key === "automatic"
                  ? t("specs.automatic")
                  : t("specs.manual")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {t("filterSeats")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {SEAT_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              className={pill(filters.seats.has(n))}
              onClick={() => toggleSeat(n)}
            >
              {String(n).padStart(2, "0")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {t("filterFuel")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(["all", "petrol", "diesel", "hybrid"] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={pill(filters.fuel === key)}
              onClick={() => setFilters({ ...filters, fuel: key })}
            >
              {key === "all"
                ? t("filterAll")
                : key === "petrol"
                  ? t("petrol")
                  : key === "diesel"
                    ? t("diesel")
                    : t("hybrid")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {t("filterPrice")}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={t("priceFrom")}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
            className="min-h-11 w-full rounded-sm border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:shadow-focus"
            aria-label={t("priceFrom")}
          />
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={t("priceTo")}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
            className="min-h-11 w-full rounded-sm border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:shadow-focus"
            aria-label={t("priceTo")}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default function FleetCatalog({
  vehicles,
  lockedCategory,
  showCategoryStrip = false,
}: {
  vehicles: FleetVehicleType[];
  lockedCategory?: FleetCategorySlug;
  showCategoryStrip?: boolean;
}) {
  const t = useTranslations("fleet");
  const locale = useLocale();
  const [filters, setFilters] = useState(() => emptyFilters(lockedCategory));
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(
    () => applyFilters(vehicles, filters),
    [vehicles, filters],
  );

  const popular = useMemo(() => {
    const priced = filtered
      .filter((v) => v.bookable && v.priceFrom != null)
      .sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
    // Need enough inventory that Popular doesn't empty the main grid (e.g. mini has 3).
    if (priced.length < 4) return [] as FleetVehicleType[];
    return priced.slice(0, 3);
  }, [filtered]);

  const popularIds = useMemo(
    () => new Set(popular.map((v) => v.typeId)),
    [popular],
  );

  const collection = useMemo(
    () => filtered.filter((v) => !popularIds.has(v.typeId)),
    [filtered, popularIds],
  );

  const hrefFor = (v: FleetVehicleType) =>
    `/${locale}/fleet/${v.category}/${v.slug}/`;

  const reset = () => setFilters(emptyFilters(lockedCategory));

  const panel = (
    <FiltersPanel
      filters={filters}
      setFilters={setFilters}
      onReset={reset}
      resultCount={filtered.length}
      lockedCategory={lockedCategory}
    />
  );

  return (
    <div>
      {showCategoryStrip ? (
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 edge-fade-r">
          {FLEET_CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/${locale}/fleet/${cat.slug}/`}
              className="flex min-w-[5.5rem] flex-col items-center gap-2 rounded-lg border border-line bg-white px-3 py-3 text-center transition hover:border-navy/25 hover:shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLEET_CATEGORY_ICON[cat.slug]}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xs font-bold text-navy">
                {t(`categories.${cat.slug}`)}
              </span>
            </a>
          ))}
        </div>
      ) : null}

      {popular.length >= 2 ? (
        <div className="mb-10 overflow-hidden rounded-xl bg-sand px-4 py-8 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold text-navy">
            {t("popular")}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {popular.map((v) => (
              <VehicleCard
                key={`popular-${v.typeId}`}
                vehicle={v}
                href={hrefFor(v)}
                variant="popular"
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-sm font-bold text-navy">
          {t("available", { count: filtered.length })}
        </p>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/15 bg-white px-4 text-sm font-bold text-navy"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-line bg-white p-5 shadow-sm">
            {panel}
          </div>
        </aside>

        <div>
          {collection.length || popular.length ? (
            <>
              {popular.length >= 2 && collection.length > 0 ? (
                <h2 className="mb-5 font-display text-xl font-bold text-navy">
                  {t("moreVehicles")}
                </h2>
              ) : null}
              {collection.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {collection.map((v) => (
                    <VehicleCard key={v.typeId} vehicle={v} href={hrefFor(v)} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="rounded-lg border border-line bg-brand-light p-8 text-sm text-navy/70">
              {t("noResults")}
            </p>
          )}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-deep/50"
            aria-label={t("closeFilters")}
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,92vw)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display text-lg font-bold text-navy">
                {t("filters")}
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-navy/5"
                aria-label={t("closeFilters")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{panel}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
