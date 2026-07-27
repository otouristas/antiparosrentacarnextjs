import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ResultsClient from "./ResultsClient";

export const metadata = {
  title: "Search Results | AGGELOS Rentals",
  robots: { index: false, follow: false },
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking.results");

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/"
            className="text-sm font-semibold text-navy/60 hover:text-navy"
          >
            ← {t("back")}
          </Link>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-navy">
            {t("title")}
          </h1>
          <p className="text-sm text-ink/70">{t("subtitle")}</p>
        </div>
        <Link
          href="/#book"
          className="text-sm font-bold text-navy underline-offset-2 hover:underline"
        >
          {t("modifySearch")}
        </Link>
      </div>
      <Suspense
        fallback={
          <p className="py-10 text-center font-semibold text-navy">
            {t("loading")}
          </p>
        }
      >
        <ResultsClient />
      </Suspense>
    </section>
  );
}
