import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { getReviewStats } from "@/data/reviews";
import { GoogleGMark, StarRow, TrustpilotMark } from "./ReviewMarks";

export default async function TrustReviewBadges() {
  const t = await getTranslations("reviews");
  const stats = getReviewStats();

  return (
    <aside
      className="border-y border-navy/8 bg-sand"
      aria-label={t("trustStripLabel")}
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-7 sm:gap-x-12 sm:px-6">
        <a
          href={SITE.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <GoogleGMark className="h-7 w-7" />
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy/45">
              {t("googleLabel")}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="font-display text-lg font-extrabold tabular text-navy">
                {stats.rating.toFixed(1)}
              </span>
              <StarRow rating={Math.round(stats.rating)} size="sm" />
              <span className="text-sm text-ink/50">({stats.reviewCount})</span>
            </div>
          </div>
        </a>

        <span className="hidden h-8 w-px bg-navy/12 sm:block" aria-hidden />

        <a
          href={SITE.trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <TrustpilotMark className="h-7 w-7" />
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy/45">
              Trustpilot
            </p>
            <p className="mt-0.5 text-sm font-semibold text-navy group-hover:underline">
              {t("trustpilotCta")}
            </p>
          </div>
        </a>
      </div>
    </aside>
  );
}
