import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GoogleGMark, StarRow } from "@/components/reviews/ReviewMarks";
import {
  getReviewStats,
  getVehicleInsight,
  type FleetReviewInsight,
} from "@/data/reviews";
import type { Locale } from "@/i18n/routing";

export default async function VehicleReviewsBand({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const tr = await getTranslations("reviews");
  const t = await getTranslations("fleet");
  const stats = getReviewStats();
  const insight: FleetReviewInsight | null = getVehicleInsight(slug);
  const quotes = insight?.quotes?.slice(0, 2) ?? [];

  return (
    <section className="mt-14 border-t border-navy/10 bg-sand/60 py-12 sm:py-14">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-2xs font-bold uppercase tracking-[0.16em] text-navy/45">
              {tr("googleLabel")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-3xl">
              {t("reviewsBandTitle")}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <GoogleGMark className="h-7 w-7" />
              <StarRow rating={stats.rating} size="lg" />
              <p className="text-sm font-semibold text-navy/70">
                <span className="font-display text-lg font-extrabold text-navy tabular">
                  {stats.rating.toFixed(1)}
                </span>
                {" · "}
                {tr("basedOn", { count: stats.reviewCount })}
              </p>
            </div>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy underline-offset-4 hover:underline"
          >
            {tr("readAll")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {quotes.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {quotes.map((q, i) => (
              <li
                key={q.id}
                className={`animate-fade-up border border-navy/8 bg-white p-6 shadow-xs ${
                  i === 1 ? "animate-fade-up-delay" : ""
                }`}
              >
                <StarRow rating={q.rating} size="sm" />
                <blockquote className="mt-3 font-display text-lg font-semibold leading-snug text-navy sm:text-xl">
                  “{q.text}”
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-navy/45">
                  {tr("guestCaption", { author: q.author })}
                </figcaption>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/70">
            {t("reviewsFallback")}
          </p>
        )}

        {insight?.idealFor ? (
          <p className="mt-8 inline-flex max-w-2xl items-start gap-2 border-l-4 border-yellow bg-white px-4 py-3 text-base text-ink/80 shadow-xs">
            <span className="font-bold text-navy">{tr("idealFor")}:</span>
            <span>{insight.idealFor}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}
