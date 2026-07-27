import { ArrowUpRight } from "lucide-react";
import Atmosphere from "@/components/ui/Atmosphere";
import {
  DestinationList,
  DestinationRow,
} from "@/components/ui/DestinationList";
import { localizedHref, hasNavLink } from "@/data/nav-links";
import { hasRoute, href as routeHref } from "@/routes";
import type { Locale } from "@/i18n/routing";

type LinkItem =
  | { label: string; id: string; blurb?: string }
  | { label: string; href: string; blurb?: string }
  | { anchor: string; to: string; blurb?: string };

function labelOf(item: LinkItem): string {
  return "anchor" in item ? item.anchor : item.label;
}

/**
 * Related links as destination rows, not pill chips.
 */
export default function RelatedLinks({
  locale,
  title = "Keep exploring",
  lead,
  links,
}: {
  locale: Locale;
  title?: string;
  lead?: string;
  links: LinkItem[];
}) {
  const resolve = (item: LinkItem) => {
    if ("to" in item) {
      if (hasRoute(item.to)) return routeHref(item.to, locale);
      // Allow page ids like "paros-rent-a-car" as a convenience.
      const moneyKey = `money/${item.to}`;
      if (hasRoute(moneyKey)) return routeHref(moneyKey, locale);
      if (hasNavLink(item.to)) return localizedHref(item.to, locale);
      return `/${locale}/${item.to.replace(/^\/|\/$/g, "")}/`;
    }
    if ("href" in item) {
      const h = item.href;
      if (h.startsWith("http") || h.startsWith(`/${locale}/`)) return h;
      return `/${locale}${h.startsWith("/") ? h : `/${h}`}`;
    }
    return localizedHref(item.id, locale);
  };

  return (
    <Atmosphere tone="light" orb={false}>
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/45">
          {title}
        </p>
        {lead ? (
          <p className="mt-3 max-w-xl text-lg text-ink/65">{lead}</p>
        ) : null}
        <div className="mt-6">
          <DestinationList aria-label={title}>
            {links.map((item, i) => (
              <DestinationRow
                key={labelOf(item)}
                href={resolve(item)}
                title={labelOf(item)}
                blurb={item.blurb}
                index={i}
                icon={
                  <ArrowUpRight className="text-navy/40" strokeWidth={1.75} />
                }
              />
            ))}
          </DestinationList>
        </div>
      </div>
    </Atmosphere>
  );
}
