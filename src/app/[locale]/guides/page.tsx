import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import {
  getAllPages,
  getPageBody,
  getPageDescription,
  getPageTitle,
} from "@/data/content-registry";
import { metadataFor } from "@/seo/metadata";
import { getRouteSeo } from "@/seo/route-seo";
import RelatedLinks from "@/components/content/RelatedLinks";
import GuideCard, { type GuideCategory } from "@/components/content/GuideCard";
import FinalCtaBlock from "@/components/cro/FinalCtaBlock";
import TrustBadges from "@/components/cro/TrustBadges";
import Hero, { HERO_ART } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import {
  FEATURED_GUIDE_IDS,
  GUIDE_CATEGORY,
  estimateReadMinutes,
  guideImage,
} from "@/lib/guide-meta";
import { localizedHref } from "@/data/nav-links";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return metadataFor(
    "utility/guides",
    locale as Locale,
    getRouteSeo("utility/guides", locale as Locale),
  );
}

const CATEGORY_ORDER: GuideCategory[] = [
  "islands",
  "getting-around",
  "tips",
  "seasonal",
];

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = loc as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("guidesPortal");

  const guides = getAllPages().filter(
    (p) => (p.type === "guide" || p.type === "blog") && p.indexable,
  );

  const cards = guides.map((g) => {
    const href = localizedHref(g.id, locale);
    const title = (g.h1s?.[locale] || getPageTitle(g, locale))
      .split("|")[0]
      .trim();
    const desc = getPageDescription(g, locale);
    const body = getPageBody(g, locale);
    return {
      id: g.id,
      href,
      title,
      description: desc.includes("AGGELOS Rentals — car, scooter") ? "" : desc,
      image: guideImage(g.images),
      category: GUIDE_CATEGORY[g.id] || ("tips" as GuideCategory),
      typeLabel: g.type === "guide" ? t("badgeGuide") : t("badgeArticle"),
      minutes: estimateReadMinutes(body),
    };
  });

  const featured = FEATURED_GUIDE_IDS.map((id) =>
    cards.find((c) => c.id === id),
  ).filter(Boolean) as typeof cards;
  const featuredIds = new Set(featured.map((c) => c.id));
  const rest = cards.filter((c) => !featuredIds.has(c.id));

  return (
    <>
      <Hero
        image={HERO_ART.guide.desktop}
        imageMobile={HERO_ART.guide.mobile}
        imageOpacity={0.42}
        scrim="soft"
        className="bg-navy text-foam"
        align="start"
        eyebrow={
          <p className="inline-flex items-center gap-2 rounded-pill bg-white/12 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-yellow backdrop-blur-sm">
            {t("eyebrow")}
          </p>
        }
        title={
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {t("h1")}
          </h1>
        }
        lead={<p className="max-w-xl text-lg text-foam/80">{t("lead")}</p>}
        actions={
          <>
            <Button href="#guides" variant="yellow" size="md">
              {t("ctaBrowse")}
            </Button>
            <Button
              href={`${localizedHref("home", locale)}#book`}
              variant="ghost"
              size="md"
            >
              {t("ctaBook")}
            </Button>
            <Button href={SITE.whatsapp} variant="whatsapp" size="md">
              WhatsApp
            </Button>
          </>
        }
        footer={
          <TrustBadges
            variant="dark"
            className="mt-8 border-t border-foam/15 pt-6"
          />
        }
      />

      <section className="border-b border-navy/10 bg-foam">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="text-sm font-semibold text-navy/75">
            {t("indicatorLine")}
          </p>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </div>
      </section>

      <section id="guides" className="scroll-mt-24 bg-sand/40 py-14 sm:py-16">
        <div className="mx-auto max-w-page px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
              {t("featuredEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              {t("featuredTitle")}
            </h2>
            <p className="mt-3 text-ink/70">{t("featuredLead")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c, i) => (
              <GuideCard
                key={c.id}
                {...c}
                featured={i < 2}
                className={i < 2 ? "sm:col-span-1 lg:col-span-2" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {CATEGORY_ORDER.map((cat) => {
        const items = rest.filter((c) => c.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="border-t border-navy/8 py-12 sm:py-16">
            <div className="mx-auto max-w-page px-4 sm:px-6">
              <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                {t(`cat.${cat}`)}
              </h2>
              <p className="mt-2 max-w-2xl text-ink/65">
                {t(`catLead.${cat}`)}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <GuideCard key={c.id} {...c} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <RelatedLinks
        locale={locale}
        title={t("readyTitle")}
        links={[
          { id: "paros-rent-a-car", label: t("linkParos") },
          { id: "rent-a-car-antiparos-aggelos", label: t("linkAntiparos") },
          { href: "/fleet/", label: t("linkFleet") },
          { href: "/faq/", label: t("linkFaq") },
        ]}
      />
      <FinalCtaBlock
        title={t("finalTitle")}
        subtitle={t("finalSub")}
        ctaLabel={t("finalCta")}
      />
    </>
  );
}
