import { setRequestLocale, getTranslations } from "next-intl/server";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import RelatedLinks from "@/components/content/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { GoogleGMark, StarRow } from "@/components/reviews/ReviewMarks";
import ReviewsList from "@/components/reviews/ReviewsList";
import { getReviewStats, getSortedReviews } from "@/data/reviews";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return metadataFor(
    "utility/reviews",
    locale as Locale,
    getRouteSeo("utility/reviews", locale as Locale),
  );
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("reviews");
  const stats = getReviewStats();
  const reviews = getSortedReviews();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: `${SITE.domain}/${locale}/reviews/`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.rating,
      reviewCount: stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <header className="border-b border-[#dadce0] bg-white">
        <div className="mx-auto max-w-page px-4 py-14 text-center sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2.5">
            <GoogleGMark className="h-8 w-8" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
              {t("googleLabel")}
            </p>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-navy sm:text-5xl">
            {t("pageTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
            {t("pageLead")}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <span className="font-display text-5xl font-extrabold tabular text-navy">
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
        </div>
      </header>

      <div className="bg-[#f8f9fa]">
        <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:py-16">
          <ReviewsList
            reviews={reviews}
            locale={locale}
            filterLabel={t("filterBy")}
            loadMoreLabel={t("loadMore")}
          />
        </div>
      </div>

      <JsonLd data={schema} />

      <RelatedLinks
        locale={locale}
        links={[
          { href: "/fleet/", label: t("relatedFleet") },
          { id: "contact", label: t("relatedContact") },
          { href: "/faq/", label: "FAQ" },
          { href: SITE.googleMapsUrl, label: t("relatedMaps") },
        ]}
      />
      <FinalCtaBlock />
    </>
  );
}
