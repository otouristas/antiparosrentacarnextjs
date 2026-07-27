import { setRequestLocale, getTranslations } from "next-intl/server";
import { FAQ_DATA } from "@/data/faq";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import RelatedLinks from "@/components/content/RelatedLinks";
import BookingWidget from "@/components/booking/BookingWidget";
import TrustBadges from "@/components/cro/TrustBadges";
import Atmosphere from "@/components/ui/Atmosphere";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return metadataFor(
    "utility/faq",
    locale as Locale,
    getRouteSeo("utility/faq", locale as Locale),
  );
}

const GROUPS: { key: string; title: string }[] = [
  { key: "licensing", title: "Licenses" },
  { key: "requirements", title: "Driver age & eligibility" },
  { key: "insurance", title: "Insurance" },
  { key: "payment", title: "Payment & deposits" },
  { key: "pickup", title: "Pickup & delivery" },
  { key: "booking", title: "Booking & cancellation" },
  { key: "during-rental", title: "Fuel, ferries & roads" },
  { key: "safety", title: "Safety & breakdowns" },
  { key: "extras", title: "Extras" },
  { key: "pricing", title: "Pricing" },
];

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("pages.faq");

  const categorized = GROUPS.map((g) => ({
    ...g,
    faqs: FAQ_DATA.filter((f) => f.category === g.key).map((f) => ({
      q: f.question,
      a: f.answer,
    })),
  })).filter((g) => g.faqs.length > 0);

  const leftover = FAQ_DATA.filter(
    (f) => !GROUPS.some((g) => g.key === f.category),
  ).map((f) => ({ q: f.question, a: f.answer }));

  const allFaqs = [...categorized.flatMap((g) => g.faqs), ...leftover];

  return (
    <>
      <Atmosphere tone="navy" orb>
        <div className="mx-auto max-w-page px-4 pb-20 pt-14 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow">
            {t("badge")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-foam sm:text-5xl">
            {t("h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-foam/75">{t("subtitle")}</p>
        </div>
      </Atmosphere>

      <section className="relative z-10 -mt-10 bg-brand-light pb-4">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <BookingWidget variant="bar" />
          <TrustBadges className="mt-4" />
        </div>
      </section>

      <div className="mx-auto max-w-page px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          {categorized.map((g) => (
            <div key={g.key}>
              <h2 className="mb-3 font-display text-xl font-extrabold text-navy">
                {g.title}
              </h2>
              <div className="divide-y divide-navy/10 border-y border-navy/10">
                {g.faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-bold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span className="text-yellow transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          {leftover.length > 0 ? (
            <div>
              <h2 className="mb-3 font-display text-xl font-extrabold text-navy">
                More questions
              </h2>
              <div className="divide-y divide-navy/10 border-y border-navy/10">
                {leftover.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-bold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span className="text-yellow transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <JsonLd data={faqSchema(allFaqs)} />

      <RelatedLinks
        locale={locale}
        links={[
          { id: "paros-rent-a-car", label: "Paros rent a car" },
          { id: "rent-a-car-antiparos-aggelos", label: "Antiparos rent a car" },
          { href: "/fleet/", label: "Fleet" },
          { id: "contact", label: "Contact" },
        ]}
      />
      <FinalCtaBlock />
    </>
  );
}
