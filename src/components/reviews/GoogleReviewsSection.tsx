import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getFeaturedReviews, getReviewStats } from "@/data/reviews";
import { SITE } from "@/lib/site";
import { GoogleGMark, StarRow } from "./ReviewMarks";
import ReviewCard from "./ReviewCard";

export default async function GoogleReviewsSection({
  locale,
}: {
  locale: Locale;
}) {
  const t = await getTranslations("reviews");
  const stats = getReviewStats();
  const featured = getFeaturedReviews(6);

  return (
    <section className="bg-[#f8f9fa]" aria-labelledby="google-reviews-heading">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2.5">
            <GoogleGMark className="h-7 w-7" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
              {t("googleLabel")}
            </p>
          </div>
          <h2
            id="google-reviews-heading"
            className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl"
          >
            {t("homeTitle")}
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <span className="font-display text-4xl font-extrabold tabular text-navy">
              {stats.rating.toFixed(1)}
            </span>
            <StarRow rating={Math.round(stats.rating)} size="lg" />
          </div>
          <a
            href={SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-[#1967d2] hover:underline"
          >
            {t("basedOn", { count: stats.reviewCount })}
          </a>
          <p className="mt-4 text-lg text-ink/60">{t("homeLead")}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <ReviewCard key={r.id} review={r} locale={locale} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={`/${locale}/reviews/`}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dadce0] bg-white px-7 text-sm font-semibold text-[#1967d2] shadow-[0_1px_2px_rgba(60,64,67,0.08)] transition hover:bg-[#f8f9fa] hover:shadow-[0_1px_3px_rgba(60,64,67,0.12)]"
          >
            {t("readAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
