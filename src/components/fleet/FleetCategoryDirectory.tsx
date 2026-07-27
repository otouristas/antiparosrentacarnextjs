import { getTranslations } from "next-intl/server";
import Atmosphere from "@/components/ui/Atmosphere";
import EditorialSplit from "@/components/ui/EditorialSplit";
import {
  DestinationList,
  DestinationRow,
} from "@/components/ui/DestinationList";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";
import { FLEET_CATEGORY_ICON } from "@/data/fleet-icons";
import type { Locale } from "@/i18n/routing";
import { href } from "@/routes";

/**
 * Home fleet picker — editorial directory built on shared primitives.
 */
export default async function FleetCategoryDirectory({
  locale,
  title,
  lead,
}: {
  locale: Locale;
  title: string;
  lead: string;
}) {
  const t = await getTranslations();

  return (
    <Atmosphere tone="sand">
      <EditorialSplit
        eyebrow={t("fleet.title")}
        title={title}
        lead={lead}
        action={{ href: href("fleet", locale), label: t("fleet.viewAll") }}
      >
        <DestinationList aria-label={title}>
          {FLEET_CATEGORIES.map((cat, i) => (
            <DestinationRow
              key={cat.slug}
              href={href(`fleet-category/${cat.slug}`, locale)}
              title={t(`fleet.categories.${cat.slug}`)}
              blurb={t(`fleet.categoryBlurb.${cat.slug}`)}
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
        </DestinationList>
      </EditorialSplit>
    </Atmosphere>
  );
}
