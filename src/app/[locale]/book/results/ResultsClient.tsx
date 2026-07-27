"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import type { SearchVehicle } from "@/lib/gocars-core";
import ResultCarRow from "@/components/booking/ResultCarRow";

type TransmissionFilter = "all" | "automatic" | "manual";
type FuelFilter = "all" | "petrol" | "diesel" | "hybrid";
type SortKey = "price-asc" | "price-desc";

type FilterState = {
  categories: Set<string>;
  transmission: TransmissionFilter;
  seats: Set<number>;
  seatsPlus: boolean;
  fuel: FuelFilter;
  priceMin: string;
  priceMax: string;
};

const SEAT_OPTIONS = [2, 4, 5] as const;

function emptyFilters(): FilterState {
  return {
    categories: new Set(),
    transmission: "all",
    seats: new Set(),
    seatsPlus: false,
    fuel: "all",
    priceMin: "",
    priceMax: "",
  };
}

function applyFilters(
  vehicles: SearchVehicle[],
  f: FilterState,
): SearchVehicle[] {
  return vehicles.filter((v) => {
    if (!v.available) return false;
    if (f.categories.size && !f.categories.has(v.typeLabel)) return false;

    const tr = (v.transmission ?? "").toLowerCase();
    if (f.transmission === "automatic" && !tr.includes("auto")) return false;
    if (f.transmission === "manual" && !tr.includes("manual")) return false;

    if (f.seats.size || f.seatsPlus) {
      const seats = v.seats;
      if (seats == null) return false;
      const matchExact = f.seats.has(seats);
      const matchPlus = f.seatsPlus && seats >= 7;
      if (!matchExact && !matchPlus) return false;
    }

    const fuel = (v.fuel ?? "").toLowerCase();
    if (
      f.fuel === "petrol" &&
      !(fuel.includes("petrol") || fuel.includes("gas"))
    ) {
      return false;
    }
    if (f.fuel === "diesel" && !fuel.includes("diesel")) return false;
    if (f.fuel === "hybrid" && !fuel.includes("hybrid")) return false;

    const min = f.priceMin.trim() ? Number(f.priceMin) : null;
    const max = f.priceMax.trim() ? Number(f.priceMax) : null;
    if (
      min != null &&
      !Number.isNaN(min) &&
      (v.totalPrice == null || v.totalPrice < min)
    ) {
      return false;
    }
    if (
      max != null &&
      !Number.isNaN(max) &&
      (v.totalPrice == null || v.totalPrice > max)
    ) {
      return false;
    }
    return true;
  });
}

function sortVehicles(
  vehicles: SearchVehicle[],
  sort: SortKey,
): SearchVehicle[] {
  const copy = [...vehicles];
  copy.sort((a, b) => {
    const pa = a.totalPrice ?? Number.POSITIVE_INFINITY;
    const pb = b.totalPrice ?? Number.POSITIVE_INFINITY;
    return sort === "price-asc" ? pa - pb : pb - pa;
  });
  return copy;
}

function FiltersPanel({
  filters,
  setFilters,
  onReset,
  resultCount,
  categories,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onReset: () => void;
  resultCount: number;
  categories: string[];
}) {
  const t = useTranslations("booking.results");
  const tFleet = useTranslations("fleet");

  const pill = (active: boolean) =>
    `min-h-10 rounded-sm border px-3 text-sm font-semibold transition-colors ${
      active
        ? "border-yellow bg-yellow text-navy"
        : "border-navy/15 bg-white text-navy/75 hover:border-navy/35"
    }`;

  const toggleCategory = (label: string) => {
    const next = new Set(filters.categories);
    if (next.has(label)) next.delete(label);
    else next.add(label);
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
          {tFleet("clearAll")}
        </button>
      </div>

      {categories.length > 1 ? (
        <fieldset>
          <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
            {t("filterCategory")}
          </legend>
          <ul className="space-y-1.5">
            {categories.map((label) => (
              <li key={label}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-sm px-1 py-1.5 text-sm font-medium text-navy/80 hover:bg-brand-light">
                  <input
                    type="checkbox"
                    checked={filters.categories.has(label)}
                    onChange={() => toggleCategory(label)}
                    className="h-4 w-4 accent-navy"
                  />
                  <span>{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {tFleet("filterTransmission")}
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
                ? tFleet("filterAll")
                : key === "automatic"
                  ? tFleet("specs.automatic")
                  : tFleet("specs.manual")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {tFleet("filterSeats")}
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
          <button
            type="button"
            className={pill(filters.seatsPlus)}
            onClick={() =>
              setFilters({ ...filters, seatsPlus: !filters.seatsPlus })
            }
          >
            {t("seatsPlus")}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-2xs font-bold uppercase tracking-[0.14em] text-navy/50">
          {tFleet("filterFuel")}
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
                ? tFleet("filterAll")
                : key === "petrol"
                  ? tFleet("petrol")
                  : key === "diesel"
                    ? tFleet("diesel")
                    : tFleet("hybrid")}
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
            placeholder={tFleet("priceFrom")}
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
            className="min-h-11 w-full rounded-sm border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:shadow-focus"
            aria-label={tFleet("priceFrom")}
          />
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={tFleet("priceTo")}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
            className="min-h-11 w-full rounded-sm border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-navy focus:shadow-focus"
            aria-label={tFleet("priceTo")}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default function ResultsClient() {
  const params = useSearchParams();
  const t = useTranslations("booking.results");
  const tFleet = useTranslations("fleet");

  const [vehicles, setVehicles] = useState<SearchVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const qs = params.toString();
    if (!qs) {
      setError("missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/gocars/search?${qs}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Search failed");
        setVehicles(data.vehicles || []);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Search failed"),
      )
      .finally(() => setLoading(false));
  }, [params]);

  const categories = useMemo(() => {
    const labels = new Set<string>();
    for (const v of vehicles) {
      if (v.typeLabel) labels.add(v.typeLabel);
    }
    return [...labels].sort((a, b) => a.localeCompare(b));
  }, [vehicles]);

  const filtered = useMemo(
    () => sortVehicles(applyFilters(vehicles, filters), sort),
    [vehicles, filters, sort],
  );

  const reset = () => setFilters(emptyFilters());

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-navy/20 border-t-yellow" />
        <p className="mt-4 font-semibold text-navy">{t("searching")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-bold">{t("errorTitle")}</p>
        <p className="mt-1 text-sm">
          {error === "missing" ? t("missingParams") : error}
        </p>
      </div>
    );
  }

  if (!vehicles.length) {
    return (
      <div className="rounded-lg border border-line bg-brand-light p-8 text-center">
        <p className="text-lg font-bold text-navy">{t("emptyTitle")}</p>
        <p className="mt-2 text-sm text-ink/70">{t("emptyHint")}</p>
      </div>
    );
  }

  const panel = (
    <FiltersPanel
      filters={filters}
      setFilters={setFilters}
      onReset={reset}
      resultCount={filtered.length}
      categories={categories}
    />
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 lg:hidden">
          <p className="text-sm font-bold text-navy">
            {t("available", { count: filtered.length })}
          </p>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy/15 bg-white px-4 text-sm font-bold text-navy"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {tFleet("filters")}
          </button>
        </div>

        <label className="ml-auto flex items-center gap-2 text-sm text-navy/70">
          <span className="font-semibold">{t("sortLabel")}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="min-h-11 rounded-sm border border-navy/15 bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-navy"
          >
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
          </select>
        </label>
      </div>

      <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-line bg-white p-5 shadow-sm">
            {panel}
          </div>
        </aside>

        <div>
          {filtered.length ? (
            <div className="border-t border-navy/10">
              {filtered.map((v, i) => (
                <ResultCarRow
                  key={`${v.id}-${v.typeId ?? ""}`}
                  vehicle={v}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-line bg-brand-light p-8 text-sm text-navy/70">
              {t("noFilterMatch")}
            </p>
          )}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-deep/50"
            aria-label={tFleet("closeFilters")}
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,92vw)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display text-lg font-bold text-navy">
                {tFleet("filters")}
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm hover:bg-navy/5"
                aria-label={tFleet("closeFilters")}
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
