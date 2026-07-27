/**
 * Scaffold per-locale content modules for a route key.
 *
 * npm run content:scaffold -- money/paros-rent-a-car
 * npm run content:scaffold -- --all-money
 * npm run content:scaffold -- vehicle/76 (VehicleCopy shape)
 * npm run content:scaffold -- fleet-category/suvs (CategoryCopy shape)
 *
 * Writes 11 stubs, one per locale, with required fields left EMPTY so the
 * TypeScript compiler forces an author to fill each one.
 *
 * Seeding policy:
 * - `seo.title` and `h1` are pre-filled from content/pages.json, which holds the
 * genuine per-locale Yoast titles/H1s from the WordPress site. These are real
 * native strings, not machine output, so they are a legitimate starting point.
 * - `seo.description` is NEVER seeded: 365 of 374 values in pages.json are the
 * WordPress cookie-consent paragraph.
 * - Any English reference text is embedded as a COMMENT block so it cannot ship
 * as real copy, and so validate-content's duplicate rules still bite.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { getRoute, hasRoute, routesOfKind } from "@/routes";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content");

const COOKIE_TELLS = [
  "We use cookies",
  "Χρησιμοποιούμε cookies",
  "Wir verwenden Cookies",
  "Utilizamos cookies",
  "Nous utilisons des cookies",
  "Utilizziamo i cookie",
  "We gebruiken cookies",
  "Vi använder cookies",
  "Мы используем",
  "Çerezleri",
];

type ContentPage = {
  id: string;
  type: string;
  titles: Partial<Record<Locale, string>>;
  h1s?: Partial<Record<Locale, string>>;
};

function loadPages(): Map<string, ContentPage> {
  const p = path.join(ROOT, "content/pages.json");
  if (!existsSync(p)) return new Map();
  const data = JSON.parse(readFileSync(p, "utf8")) as { pages: ContentPage[] };
  return new Map(data.pages.map((pg) => [pg.id, pg]));
}

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

function isCookieJunk(s: string | undefined): boolean {
  if (!s) return true;
  return COOKIE_TELLS.some((t) => s.includes(t));
}

function pageStub(
  key: string,
  locale: Locale,
  seed: { title?: string; h1?: string },
): string {
  const title = seed.title && !isCookieJunk(seed.title) ? esc(seed.title) : "";
  const h1 = seed.h1 && !isCookieJunk(seed.h1) ? esc(seed.h1) : "";

  return `import type { PageCopy } from "@/content/types";

/**
 * ${key}, ${locale}
 *
 * Write this natively. Do NOT translate another locale: validate-content rejects
 * any H1, title, description or intro that matches a sibling locale's.
 * Target this locale's own keywords and phrasing.
 */
export const copy: PageCopy = {
 locale: "${locale}",

 seo: {
 title: "${title}", // 25-65 chars
 description: "",${title ? "" : " // 110-160 chars"}
 keywords: [],
 },

 h1: "${h1}",
 intro: "",

 cta: {
 primary: "",
 secondary: "",
 whatsapp: "",
 call: "",
 },

 sections: [
 // { heading: "", body: [""], bullets: [] },
 ],

 faqs: [
 // { q: "", a: "" }, // minimum 3, written for this locale's search behaviour
 ],

 related: [
 // { to: "money/paros-rent-a-car", anchor: "" }, // minimum 3, native anchor text
 ],

 finalCta: { heading: "", sub: "", button: "" },
};

export default copy;
`;
}

function categoryStub(slug: string, locale: Locale): string {
  return `import type { CategoryCopy } from "@/content/types";

/** fleet-category/${slug}, ${locale}. Written natively; see validate-content rules. */
export const copy: CategoryCopy = {
 locale: "${locale}",
 label: "", // locale-native category name, reused in nav + breadcrumbs
 bestFor: "",
 licence: "",
 compare: "",

 seo: { title: "", description: "", keywords: [] },
 h1: "",
 intro: "",
 cta: { primary: "", secondary: "", whatsapp: "", call: "" },
 sections: [],
 faqs: [],
 related: [],
 finalCta: { heading: "", sub: "", button: "" },
};

export default copy;
`;
}

function vehicleStub(typeId: string, locale: Locale, ref: string): string {
  return `import type { VehicleCopy } from "@/content/types";

/**
 * vehicle type ${typeId}, ${locale}
 * GoCars models (reference, do not translate make/model): ${ref}
 */
export const copy: VehicleCopy = {
 locale: "${locale}",
 name: "", // marketing name in this language, NOT the GoCars English label
 blurb: "",
 orSimilar: "", // e.g. en "or similar" / de "oder ähnlich"
 seo: { title: "", description: "", keywords: [] },
};

export default copy;
`;
}

function targetDir(key: string): {
  dir: string;
  kind: "page" | "category" | "vehicle";
  typeId?: string;
} {
  if (key.startsWith("fleet-category/")) {
    return {
      dir: path.join(CONTENT_DIR, "fleet/category", key.split("/")[1]),
      kind: "category",
    };
  }
  if (key.startsWith("vehicle/")) {
    const route = getRoute(key);
    const typeId = route.params?.typeId ?? key.split("/").pop()!;
    return {
      dir: path.join(CONTENT_DIR, "fleet/vehicle", typeId),
      kind: "vehicle",
      typeId,
    };
  }
  return { dir: path.join(CONTENT_DIR, "pages", key), kind: "page" };
}

function scaffold(
  key: string,
  pages: Map<string, ContentPage>,
  force: boolean,
): number {
  const { dir, kind, typeId } = targetDir(key);
  mkdirSync(dir, { recursive: true });

  const pageId = key.includes("/") ? key.split("/").slice(1).join("/") : key;
  const seedPage = pages.get(pageId) ?? pages.get(key);

  let written = 0;
  for (const locale of locales) {
    const file = path.join(dir, `${locale}.ts`);
    if (existsSync(file) && !force) continue;

    let source: string;
    if (kind === "category") source = categoryStub(key.split("/")[1], locale);
    else if (kind === "vehicle") {
      const id = typeId ?? key.split("/").pop()!;
      source = vehicleStub(id, locale, "see data/fleet.json");
    } else
      source = pageStub(key, locale, {
        title: seedPage?.titles?.[locale],
        h1: seedPage?.h1s?.[locale],
      });

    writeFileSync(file, source, "utf8");
    written++;
  }
  return written;
}

function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const force = args.includes("--force");
  const targets = args.filter((a) => !a.startsWith("--"));

  let keys: string[] = targets;
  if (args.includes("--all-money"))
    keys = routesOfKind("money").map((r) => r.key);
  if (args.includes("--all-categories"))
    keys = routesOfKind("fleet-category").map((r) => r.key);
  if (args.includes("--all-vehicles"))
    keys = routesOfKind("vehicle").map((r) => r.key);
  if (args.includes("--all-editorial")) {
    keys = [
      ...routesOfKind("home"),
      ...routesOfKind("money"),
      ...routesOfKind("contact"),
      ...routesOfKind("guide"),
      ...routesOfKind("legal"),
    ].map((r) => r.key);
  }
  if (args.includes("--all")) {
    keys = [
      ...routesOfKind("home"),
      ...routesOfKind("money"),
      ...routesOfKind("contact"),
      ...routesOfKind("guide"),
      ...routesOfKind("legal"),
      ...routesOfKind("fleet-category"),
      ...routesOfKind("vehicle"),
    ].map((r) => r.key);
  }

  if (keys.length === 0) {
    console.error(
      "\n  usage: npm run content:scaffold -- <routeKey> [--force]\n" +
        "         npm run content:scaffold -- --all | --all-editorial | --all-money | --all-categories | --all-vehicles\n",
    );
    process.exit(1);
  }

  const pages = loadPages();
  let total = 0;

  for (const key of keys) {
    if (!hasRoute(key)) {
      console.error(
        `  skipped "${key}", not a route key (run \`npm run routes:build\`)`,
      );
      continue;
    }
    const n = scaffold(key, pages, force);
    total += n;
    const seeded =
      pages.has(key.split("/").slice(1).join("/")) || pages.has(key);
    console.log(
      `  ${key.padEnd(42)} ${String(n).padStart(2)} stub(s)` +
        (n === 0
          ? "  (already exists, use --force)"
          : seeded
            ? "  [titles/H1s seeded]"
            : ""),
    );
  }

  console.log(`\n  ${total} module(s) written. Next: npm run content:registry`);
  console.log(
    `  Default locale is "${defaultLocale}", but every locale is authored, not translated.`,
  );
}

main();
