import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, locales, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { SITE_DEFAULTS } from "@/seo/defaults";
import { OG_LOCALE, LOCALE_DIR } from "@/seo/og-locale";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import MarketingStrip from "@/components/cro/MarketingStrip";
import StickyMobileBookingBar from "@/components/cro/StickyMobileBookingBar";
import DesktopBookingDock from "@/components/cro/DesktopBookingDock";
import TrustReviewBadges from "@/components/reviews/TrustReviewBadges";
import JsonLd from "@/components/seo/JsonLd";
import { autoRentalSchema, organizationSchema } from "@/lib/schema";
import "../globals.css";

/**
 * ROOT LAYOUT.
 *
 * Next allows the root layout to live inside a dynamic segment — see
 * node_modules/next/dist/docs/01-app/02-guides/internationalization.md — and it
 * must here, because `<html lang>` has to be server-rendered per locale.
 * Previously src/app/layout.tsx hardcoded lang="en" and a client effect patched
 * it after hydration, so 821 of 849 built pages (every DE, EL and RU page
 * included) served lang="en" to crawlers.
 */

/**
 * Manrope replaces Outfit as the display face. Outfit ships latin/latin-ext
 * only, so Greek and Russian headings silently fell back to system-ui. Manrope
 * covers greek + cyrillic and is the closest geometric match to Outfit.
 */
const display = Manrope({
  subsets: ["latin", "latin-ext", "greek", "cyrillic"],
  // Raw face variable. The Tailwind token `--font-display` in globals.css points
  // at this — they must not share a name or the @theme value is self-referential.
  variable: "--font-manrope",
  display: "swap",
});

// `greek` was missing here too, so Greek body copy fell back as well.
const body = Source_Sans_3({
  subsets: ["latin", "latin-ext", "greek", "cyrillic"],
  variable: "--font-source-sans",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key = (
    (locales as readonly string[]).includes(locale) ? locale : "en"
  ) as Locale;
  const defaults = SITE_DEFAULTS[key];

  return {
    metadataBase: new URL(SITE.domain),
    // `absolute` on purpose — no template is ever appended. Page titles are
    // authored complete, per locale.
    title: { absolute: defaults.title },
    description: defaults.description,
    icons: { icon: "/favicon.png", apple: "/favicon.png" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: OG_LOCALE[key],
      alternateLocale: locales
        .filter((l) => l !== key)
        .map((l) => OG_LOCALE[l]),
      title: defaults.title,
      description: defaults.description,
      images: [{ url: `${SITE.domain}/images/og-default.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaults.title,
      description: defaults.description,
      images: [`${SITE.domain}/images/og-default.webp`],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  const typed = locale as Locale;

  setRequestLocale(typed);
  const messages = await getMessages();

  return (
    <html
      lang={typed}
      dir={LOCALE_DIR[typed]}
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://antiparosrentacar.gocars.gr" />
      </head>
      <body className="min-h-screen bg-background font-body text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <a href="#main" className="skip-link">
            {SITE_DEFAULTS[typed].skipToContent}
          </a>
          {/* WebSite describes the site, not each page — it is emitted once, on the homepage. */}
          <JsonLd data={[organizationSchema(), autoRentalSchema()]} />
          <MarketingStrip />
          <Navbar />
          <main id="main" className="min-h-[70vh]">
            {children}
          </main>
          <TrustReviewBadges />
          <Footer />
          <WhatsAppFab />
          <StickyMobileBookingBar />
          <DesktopBookingDock />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
