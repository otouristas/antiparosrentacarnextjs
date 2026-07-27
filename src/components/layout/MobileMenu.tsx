"use client";

import Image from "next/image";
import { ChevronDown, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SITE } from "@/lib/site";
import { localizedHref } from "@/data/nav-links";
import { FLEET_CATEGORIES } from "@/data/fleet-categories";
import { FLEET_TILES, LOCATION_TILES } from "@/data/mega-menu";
import type { Locale } from "@/i18n/routing";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import TrustBadges from "@/components/cro/TrustBadges";

type Props = { open: boolean; onClose: () => void };

/**
 * Full-screen mobile navigation at `lg:hidden`.
 * Matches the desktop mega language: icon-led fleet tiles, labeled location
 * photos, editorial accordions — not the old unlabeled thumbnail strip.
 */
export default function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations("nav");
  const tm = useTranslations("menu");
  const tf = useTranslations("fleet");
  const locale = useLocale() as Locale;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const localePath = (path: string) => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean.endsWith("/") ? clean : `${clean}/`}`;
  };

  const guides = [
    { href: localePath("/guides/"), label: tm("guides") },
    {
      href: localizedHref("travel-tips-for-antiparos-and-paros", locale),
      label: tm("travelTips"),
    },
    {
      href: localizedHref(
        "how-to-get-to-paros-ferries-flights-airport",
        locale,
      ),
      label: tm("howToGet"),
    },
    {
      href: localizedHref("do-you-need-to-rent-a-car-in-paros", locale),
      label: tm("needCar"),
    },
    { href: localePath("/faq/"), label: t("faq") },
    { href: localePath("/reviews/"), label: t("reviews") },
  ];

  const company = [
    { href: localizedHref("about-us", locale), label: t("about") },
    { href: localizedHref("contact", locale), label: t("contact") },
  ];

  const locationLabel = (id: string) => {
    switch (id) {
      case "paros-airport":
        return t("parosAirport");
      case "parikia-port":
        return tm("parosPort");
      case "paros-island":
        return t("parosCar");
      case "antiparos-port":
        return t("antiparosCar");
      case "piraeus":
        return tm("piraeus");
      default:
        return id;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tm("openMenu")}
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy-deep/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <div
        ref={panelRef}
        className={`absolute inset-0 flex h-dvh w-screen max-w-none flex-col bg-sand text-navy transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy/10 bg-white px-4 py-4 sm:px-6">
          <a
            href={localizedHref("home", locale)}
            onClick={onClose}
            className="relative h-11 w-40"
          >
            <Image
              src="/aggelos-rent-a-car-logo-final.png"
              alt="AGGELOS Rentals"
              fill
              className="object-contain object-left"
              sizes="160px"
            />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-12 w-12 items-center justify-center rounded-sm text-navy transition-colors hover:bg-navy/5"
            aria-label={tm("closeMenu")}
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="border-b border-navy/10 bg-white px-4 py-4 sm:px-6">
          <a
            href={`${localizedHref("home", locale)}#book`}
            onClick={onClose}
            className="btn-yellow w-full py-4 text-base"
          >
            {t("bookNow")}
          </a>
        </div>

        <nav
          aria-label="Mobile"
          className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6"
        >
          <AccordionGroup title={tm("vehicles")} defaultOpen>
            <div className="mb-3 grid grid-cols-3 gap-2.5 sm:grid-cols-3">
              {FLEET_TILES.map((tile) => (
                <a
                  key={tile.slug}
                  href={localePath(`/fleet/${tile.slug}/`)}
                  onClick={onClose}
                  className="group flex flex-col items-center gap-2.5 rounded-lg border border-navy/10 bg-white px-2 py-4 text-center transition-[border-color,box-shadow] hover:border-navy/25 hover:shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="font-display text-xs font-extrabold leading-tight text-navy">
                    {tf(`categories.${tile.slug}`)}
                  </span>
                </a>
              ))}
            </div>
            <MenuLink href={localePath("/fleet/")} onClose={onClose}>
              {tm("allFleet")}
            </MenuLink>
            {FLEET_CATEGORIES.map((c) => (
              <MenuLink
                key={c.slug}
                href={localePath(`/fleet/${c.slug}/`)}
                onClose={onClose}
              >
                {tf(`categories.${c.slug}`)}
              </MenuLink>
            ))}
          </AccordionGroup>

          <AccordionGroup title={tm("locations")}>
            <div className="mb-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {LOCATION_TILES.map((tile) => (
                <a
                  key={tile.id}
                  href={localizedHref(tile.pageId, locale)}
                  onClick={onClose}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute inset-x-0 bottom-0 p-2.5">
                    <span className="block rounded-sm bg-white/95 px-2.5 py-1.5 text-center text-xs font-bold leading-tight text-navy">
                      {locationLabel(tile.id)}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </AccordionGroup>

          <AccordionGroup title={tm("guides")}>
            {guides.map((item) => (
              <MenuLink key={item.href} href={item.href} onClose={onClose}>
                {item.label}
              </MenuLink>
            ))}
          </AccordionGroup>

          <AccordionGroup title={tm("company")}>
            {company.map((item) => (
              <MenuLink key={item.href} href={item.href} onClose={onClose}>
                {item.label}
              </MenuLink>
            ))}
          </AccordionGroup>

          <div className="mt-8 border-t border-navy/10 pt-5">
            <LocaleSwitcher />
          </div>
        </nav>

        <div className="shrink-0 border-t border-navy/10 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
          <TrustBadges variant="light" className="mb-3 justify-center" />
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-navy/15 bg-white text-sm font-bold text-navy transition-colors hover:bg-navy/5"
            >
              <Phone className="h-4 w-4" />
              {tm("call")}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[#25D366] text-sm font-bold text-white transition hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  href,
  onClose,
  children,
}: {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClose}
      className="flex min-h-11 items-center border-b border-navy/5 py-2.5 text-sm font-semibold text-navy/85 transition-colors last:border-0 hover:text-navy"
    >
      {children}
    </a>
  );
}

function AccordionGroup({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="mt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="text-2xs font-bold uppercase tracking-[0.18em] text-navy/45">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-navy/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div id={panelId} hidden={!open} className="pb-1">
        {children}
      </div>
    </div>
  );
}
