"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Menu } from "lucide-react";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import MobileMenu from "@/components/layout/MobileMenu";
import MegaPanel, {
  useMegaHoverBridge,
} from "@/components/layout/mega/MegaPanel";
import FleetMega from "@/components/layout/mega/FleetMega";
import LocationsMega from "@/components/layout/mega/LocationsMega";
import GuidesMega from "@/components/layout/mega/GuidesMega";
import { localizedHref } from "@/data/nav-links";
import type { Locale } from "@/i18n/routing";

const NAV_LINK =
  "rounded-sm px-3 py-2 text-sm font-semibold text-navy/80 transition-colors duration-200 hover:bg-navy/5 hover:text-navy";

type MegaId = "vehicles" | "locations" | "guides" | null;

export default function Navbar() {
  const t = useTranslations("nav");
  const tm = useTranslations("menu");
  const locale = useLocale() as Locale;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaId>(null);
  const [scrolled, setScrolled] = useState(false);

  const vehiclesId = useId();
  const locationsId = useId();
  const guidesId = useId();

  const bookHref = `${localizedHref("home", locale)}#book`;

  const closeAll = useCallback(() => setActiveMega(null), []);

  const setMega = (id: Exclude<MegaId, null>) => (open: boolean) => {
    setActiveMega((current) => {
      if (open) return id;
      // Only clear if this bridge still owns the open panel (avoids race when
      // switching Vehicles → Locations before the prior close timer fires).
      return current === id ? null : current;
    });
  };

  const vehiclesBridge = useMegaHoverBridge(setMega("vehicles"));
  const locationsBridge = useMegaHoverBridge(setMega("locations"));
  const guidesBridge = useMegaHoverBridge(setMega("guides"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [activeMega, closeAll]);

  const vehiclesOpen = activeMega === "vehicles";
  const locationsOpen = activeMega === "locations";
  const guidesOpen = activeMega === "guides";

  const triggerClass = (open: boolean) =>
    `${NAV_LINK} inline-flex items-center gap-1 ${
      open
        ? "bg-navy/5 text-navy underline decoration-yellow decoration-2 underline-offset-8"
        : ""
    }`;

  return (
    <>
      <header
        className={`relative sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled || activeMega
            ? "border-line-strong shadow-sm"
            : "border-line"
        }`}
      >
        <div className="relative mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href={localizedHref("home", locale)}
            className="relative h-12 w-40 shrink-0 rounded-sm sm:h-14 sm:w-48"
          >
            <Image
              src="/aggelos-rent-a-car-logo-final.png"
              alt="AGGELOS Rentals — Antiparos Rent A Car"
              fill
              className="object-contain object-left"
              priority
              sizes="192px"
            />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div
              onMouseEnter={vehiclesBridge.scheduleOpen}
              onMouseLeave={vehiclesBridge.scheduleClose}
            >
              <button
                type="button"
                className={triggerClass(vehiclesOpen)}
                aria-expanded={vehiclesOpen}
                aria-controls={vehiclesId}
                aria-haspopup="true"
                onClick={() => {
                  if (vehiclesOpen) vehiclesBridge.closeNow();
                  else vehiclesBridge.openNow();
                }}
              >
                {tm("vehicles")}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${vehiclesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              onMouseEnter={locationsBridge.scheduleOpen}
              onMouseLeave={locationsBridge.scheduleClose}
            >
              <button
                type="button"
                className={triggerClass(locationsOpen)}
                aria-expanded={locationsOpen}
                aria-controls={locationsId}
                aria-haspopup="true"
                onClick={() => {
                  if (locationsOpen) locationsBridge.closeNow();
                  else locationsBridge.openNow();
                }}
              >
                {tm("locations")}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${locationsOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              onMouseEnter={guidesBridge.scheduleOpen}
              onMouseLeave={guidesBridge.scheduleClose}
            >
              <button
                type="button"
                className={triggerClass(guidesOpen)}
                aria-expanded={guidesOpen}
                aria-controls={guidesId}
                aria-haspopup="true"
                onClick={() => {
                  if (guidesOpen) guidesBridge.closeNow();
                  else guidesBridge.openNow();
                }}
              >
                {tm("guides")}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${guidesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <a href={localizedHref("contact", locale)} className={NAV_LINK}>
              {t("contact")}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher />

            <a
              href={bookHref}
              className="btn-yellow hidden px-4 py-2 text-sm lg:inline-flex"
            >
              {t("bookNow")}
            </a>

            <button
              type="button"
              className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-sm text-navy transition-colors hover:bg-navy/5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label={tm("openMenu")}
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Full-bleed megas — hover bridge on panel cancels close */}
        <MegaPanel
          id={vehiclesId}
          open={vehiclesOpen}
          label={tm("vehicles")}
          onClose={closeAll}
          onPointerEnter={vehiclesBridge.cancelClose}
          onPointerLeave={vehiclesBridge.scheduleClose}
          footer={
            <>
              <p className="text-sm text-navy/65">{tm("megaFooterFleet")}</p>
              <a href={bookHref} className="btn-yellow px-5 py-2 text-sm">
                {t("bookNow")}
              </a>
            </>
          }
        >
          <FleetMega bookHref={bookHref} />
        </MegaPanel>

        <MegaPanel
          id={locationsId}
          open={locationsOpen}
          label={tm("locations")}
          onClose={closeAll}
          onPointerEnter={locationsBridge.cancelClose}
          onPointerLeave={locationsBridge.scheduleClose}
          footer={
            <>
              <p className="text-sm text-navy/65">
                {tm("megaFooterLocations")}
              </p>
              <a href={bookHref} className="btn-yellow px-5 py-2 text-sm">
                {t("bookNow")}
              </a>
            </>
          }
        >
          <LocationsMega bookHref={bookHref} />
        </MegaPanel>

        <MegaPanel
          id={guidesId}
          open={guidesOpen}
          label={tm("guides")}
          onClose={closeAll}
          onPointerEnter={guidesBridge.cancelClose}
          onPointerLeave={guidesBridge.scheduleClose}
          footer={
            <>
              <p className="text-sm text-navy/65">{tm("megaFooterGuides")}</p>
              <a href={bookHref} className="btn-yellow px-5 py-2 text-sm">
                {t("bookNow")}
              </a>
            </>
          }
        >
          <GuidesMega bookHref={bookHref} />
        </MegaPanel>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
