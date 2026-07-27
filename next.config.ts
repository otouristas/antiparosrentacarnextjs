import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import redirectsData from "./content/redirects.json";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

type RedirectRow = {
  source: string;
  destination: string;
  permanent?: boolean;
};

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "antiparosrentacar.com" },
      { protocol: "https", hostname: "antiparosrentacar.gocars.gr" },
      { protocol: "https", hostname: "gocars.gr" },
    ],
  },
  async redirects() {
    return (redirectsData as RedirectRow[])
      .filter((r) => r.source && !String(r.source).includes("?"))
      .map((r) => {
        let source = r.source;
        let destination = r.destination;
        // next trailingSlash:true expects trailing slashes on paths
        if (source !== "/" && !source.endsWith("/")) source = `${source}/`;
        if (destination !== "/" && !destination.endsWith("/")) {
          destination = `${destination}/`;
        }
        return {
          source,
          destination,
          permanent: r.permanent ?? true,
        };
      });
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/media/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
