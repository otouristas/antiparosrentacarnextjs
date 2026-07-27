"use client";

import { useEffect, useMemo, useState } from "react";
import type { SiteReview } from "@/data/reviews";
import ReviewCard from "./ReviewCard";

const PAGE_SIZE = 15;

const FILTERS = [
  { key: "all", label: "All" },
  { key: "5", label: "5" },
  { key: "4", label: "4" },
  { key: "3", label: "3" },
  { key: "2", label: "2" },
  { key: "1", label: "1" },
] as const;

export default function ReviewsList({
  reviews,
  locale,
  filterLabel,
  loadMoreLabel,
}: {
  reviews: SiteReview[];
  locale: string;
  filterLabel: string;
  loadMoreLabel: string;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    const n = Number(filter);
    return reviews.filter((r) => r.rating === n);
  }, [filter, reviews]);

  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [filter]);

  const visible = filtered.slice(0, limit);
  const remaining = filtered.length - visible.length;

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy/45">
          {filterLabel}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-navy bg-navy text-foam"
                    : "border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa]"
                }`}
                aria-pressed={active}
              >
                {f.label === "All" ? f.label : `${f.label} ★`}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-6 text-center text-sm text-[#70757a]">
        {visible.length} / {filtered.length}{" "}
        {filtered.length === 1 ? "review" : "reviews"}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((r) => (
          <ReviewCard key={r.id} review={r} locale={locale} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dadce0] bg-white px-7 text-sm font-semibold text-[#1967d2] shadow-[0_1px_2px_rgba(60,64,67,0.08)] transition hover:bg-[#f8f9fa] hover:shadow-[0_1px_3px_rgba(60,64,67,0.12)]"
          >
            {loadMoreLabel}
            <span className="ml-2 font-medium text-[#70757a]">
              (+{Math.min(PAGE_SIZE, remaining)})
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
