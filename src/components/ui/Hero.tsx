import Image from "next/image";
import type { ReactNode } from "react";

export type HeroScrim = "default" | "soft" | "heavy";

const SCRIM: Record<HeroScrim, string> = {
  default: "hero-gradient",
  soft: "hero-gradient hero-scrim-soft",
  heavy: "hero-gradient",
};

const SCRIM_STYLE: Record<HeroScrim, React.CSSProperties | undefined> = {
  default: undefined,
  soft: undefined,
  heavy: { ["--hero-scrim" as string]: "0.88" },
};

/** Interim cinematic art — strongest real frames until Pexels pipeline is live. */
export const HERO_ART = {
  home: {
    desktop: "/media/2026/06/paros-naoussa-village.png.webp",
    mobile: "/media/2025/02/Aerial-View-of-Antiparos-Island-1536x864.webp",
  },
  money: {
    desktop: "/media/2025/02/Aerial-View-of-Antiparos-Island-1536x864.webp",
    mobile: "/media/2026/06/paros-naoussa-village-1024x683.png.webp",
  },
  guide: {
    desktop: "/media/2026/06/paros-naoussa-village-1024x683.png.webp",
    mobile: "/media/2025/02/Aerial-View-of-Antiparos-Island-1024x576.webp",
  },
} as const;

type HeroProps = {
  /** Desktop / wide art. */
  image: string;
  /** Optional portrait-leaning source for narrow viewports. */
  imageMobile?: string;
  alt?: string;
  scrim?: HeroScrim;
  /** Opacity on the photo before the scrim (0–1). */
  imageOpacity?: number;
  /** Brand / meta row above the headline. */
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  align?: "start" | "center";
  className?: string;
  innerClassName?: string;
};

/**
 * Full-bleed hero primitive shared by home, money and guide templates.
 * Art-directed sources + scrim token + optional booking aside.
 */
export default function Hero({
  image,
  imageMobile,
  alt = "",
  scrim = "default",
  imageOpacity = 1,
  eyebrow,
  title,
  lead,
  actions,
  aside,
  footer,
  align = "start",
  className = "",
  innerClassName = "",
}: HeroProps) {
  const centered = align === "center";

  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10">
        {imageMobile ? (
          <>
            <Image
              src={imageMobile}
              alt={alt}
              fill
              priority
              className="hero-media-motion object-cover md:hidden"
              style={{ opacity: imageOpacity }}
              sizes="100vw"
            />
            <Image
              src={image}
              alt={alt}
              fill
              priority
              className="hero-media-motion hidden object-cover md:block"
              style={{ opacity: imageOpacity }}
              sizes="100vw"
            />
          </>
        ) : (
          <Image
            src={image}
            alt={alt}
            fill
            priority
            className="hero-media-motion object-cover"
            style={{ opacity: imageOpacity }}
            sizes="100vw"
          />
        )}
        <div
          className={`${SCRIM[scrim]} absolute inset-0`}
          style={SCRIM_STYLE[scrim]}
        />
      </div>

      <div
        className={`mx-auto flex max-w-page flex-col gap-10 px-4 pb-14 pt-14 sm:px-6 lg:pb-24 lg:pt-24 ${
          aside ? "lg:flex-row lg:items-center lg:gap-14" : ""
        } ${centered ? "items-center text-center" : ""} ${innerClassName}`}
      >
        <div
          className={`flex-1 text-white ${centered ? "mx-auto max-w-3xl" : ""}`}
        >
          {eyebrow ? (
            <div className="animate-fade-up mb-4">{eyebrow}</div>
          ) : null}
          <div className="animate-fade-up">{title}</div>
          {lead ? (
            <div className="animate-fade-up-delay mt-5">{lead}</div>
          ) : null}
          {actions ? (
            <div
              className={`animate-fade-up-delay mt-8 flex flex-wrap gap-3 ${
                centered ? "justify-center" : ""
              }`}
            >
              {actions}
            </div>
          ) : null}
          {footer ? (
            <div className="animate-fade-up-delay-2 mt-9">{footer}</div>
          ) : null}
        </div>
        {aside ? (
          <div
            id="book"
            className="w-full scroll-mt-24 lg:w-[420px] lg:shrink-0"
          >
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
