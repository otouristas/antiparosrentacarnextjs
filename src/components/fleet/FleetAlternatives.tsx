import Atmosphere from "@/components/ui/Atmosphere";
import EditorialSplit from "@/components/ui/EditorialSplit";
import {
  DestinationList,
  DestinationRow,
} from "@/components/ui/DestinationList";
import {
  FLEET_CATEGORIES,
  type FleetCategorySlug,
} from "@/data/fleet-categories";
import { FLEET_CATEGORY_ICON } from "@/data/fleet-icons";
import type { Locale } from "@/i18n/routing";
import { href } from "@/routes";
import { getTranslations } from "next-intl/server";

/** Related categories to push when inventory is empty or thin. */
const ALTERNATIVES: Record<FleetCategorySlug, readonly FleetCategorySlug[]> = {
  mini: ["compact", "scooters", "crossover"],
  compact: ["mini", "crossover", "suvs"],
  crossover: ["compact", "suvs", "convertible"],
  suvs: ["crossover", "people-carriers", "atvs"],
  convertible: ["compact", "mini", "crossover"],
  "people-carriers": ["suvs", "crossover", "compact"],
  scooters: ["atvs", "mini", "bikes"],
  atvs: ["scooters", "suvs", "bikes"],
  bikes: ["scooters", "mini", "compact"],
};

/**
 * Marketing strip — empty / enquiry categories + “check something else” destinations.
 */
export default async function FleetAlternatives({
  locale,
  category,
  mode,
}: {
  locale: Locale;
  category: FleetCategorySlug;
  /** empty = no inventory; suggest = soft cross-sell under a thin catalog */
  mode: "empty" | "suggest";
}) {
  const t = await getTranslations("fleet");
  const label = t(`categories.${category}`);
  const alts = ALTERNATIVES[category]
    .map((slug) => FLEET_CATEGORIES.find((c) => c.slug === slug))
    .filter((c): c is (typeof FLEET_CATEGORIES)[number] => Boolean(c));

  return (
    <Atmosphere tone={mode === "empty" ? "sand" : "light"}>
      <EditorialSplit
        eyebrow={
          mode === "empty" ? t("enquiryCategory") : t("alternativesEyebrow")
        }
        title={
          mode === "empty"
            ? t("emptyCategoryTitle", { category: label })
            : t("alternativesTitle")
        }
        lead={
          mode === "empty"
            ? category === "bikes"
              ? t("enquiryCategoryBody")
              : t("emptyCategoryBody", { category: label })
            : t("alternativesLead")
        }
        action={{ href: href("fleet", locale), label: t("viewAll") }}
      >
        <DestinationList aria-label={t("alternativesTitle")}>
          {alts.map((cat, i) => (
            <DestinationRow
              key={cat.slug}
              href={href(`fleet-category/${cat.slug}`, locale)}
              title={t(`categories.${cat.slug}`)}
              blurb={t(`categoryBlurb.${cat.slug}`)}
              index={i}
              icon={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={FLEET_CATEGORY_ICON[cat.slug]}
                  alt=""
                  width={72}
                  height={72}
                />
              }
            />
          ))}
          <DestinationRow
            href={`/${locale}/#book`}
            title={t("checkAvailability")}
            blurb={t("alternativesBookBlurb")}
            index={alts.length}
            marker="→"
          />
        </DestinationList>
      </EditorialSplit>
    </Atmosphere>
  );
}
