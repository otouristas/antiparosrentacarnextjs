import { readFileSync } from "fs";
import path from "path";
import { locales, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";

export type PageType =
  "home" | "money" | "fleet" | "guide" | "blog" | "legal" | "contact";

export type ContentPage = {
  id: string;
  enSlug: string;
  type: PageType;
  paths: Partial<Record<Locale, string>>;
  titles: Partial<Record<Locale, string>>;
  descriptions: Partial<Record<Locale, string>>;
  h1s?: Partial<Record<Locale, string>>;
  bodyPaths: Partial<Record<Locale, string>>;
  images: string[];
  indexable: boolean;
};

type PagesFile = { count: number; pages: ContentPage[] };

const ROOT = process.cwd();

function loadPages(): ContentPage[] {
  try {
    const raw = readFileSync(path.join(ROOT, "content/pages.json"), "utf8");
    const data = JSON.parse(raw) as PagesFile;
    return data.pages ?? [];
  } catch {
    return [];
  }
}

let _pages: ContentPage[] | null = null;
export function getAllPages(): ContentPage[] {
  if (process.env.NODE_ENV !== "production") {
    return loadPages();
  }
  if (!_pages) _pages = loadPages();
  return _pages;
}

export function normalizeContentPath(pathStr: string): string {
  if (!pathStr || pathStr === "/") return "/";
  let p = pathStr.startsWith("/") ? pathStr : `/${pathStr}`;
  if (!p.endsWith("/")) p += "/";
  return p;
}

export function pathFromSlugParts(locale: Locale, slug?: string[]): string {
  if (!slug || slug.length === 0) {
    return locale === "en" ? "/" : `/${locale}/`;
  }
  const joined = slug.join("/");
  if (locale === "en") return normalizeContentPath(`/${joined}`);
  return normalizeContentPath(`/${locale}/${joined}`);
}

/** Look a page up by its registry id, the route manifest's `contentRef.id`. */
export function findPageById(id: string): ContentPage | undefined {
  return getAllPages().find((p) => p.id === id);
}

export function findPageByLocalePath(
  locale: Locale,
  pathStr: string,
): ContentPage | undefined {
  const target = normalizeContentPath(pathStr);
  return getAllPages().find((p) => {
    const candidate = p.paths[locale];
    return candidate && normalizeContentPath(candidate) === target;
  });
}

export function getPageTitle(page: ContentPage, locale: Locale): string {
  return (
    page.titles[locale] ||
    page.titles.en ||
    page.h1s?.[locale] ||
    page.h1s?.en ||
    SITE.name
  );
}

export function getPageDescription(page: ContentPage, locale: Locale): string {
  return (
    page.descriptions[locale] ||
    page.descriptions.en ||
    `AGGELOS Rentals, car, scooter and ATV hire on Antiparos & Paros.`
  );
}

export function getPageBody(page: ContentPage, locale: Locale): string {
  const rel =
    page.bodyPaths[locale] ||
    page.bodyPaths.en ||
    Object.values(page.bodyPaths)[0];
  if (!rel) return "";
  try {
    return readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return "";
  }
}

export function hreflangForPage(page: ContentPage): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const p = page.paths[locale];
    if (!p) continue;
    const path = normalizeContentPath(p);
    languages[locale] =
      path === "/" ? SITE.domain + "/" : `${SITE.domain}${path}`;
  }
  const en = page.paths.en;
  if (en) {
    languages["x-default"] =
      normalizeContentPath(en) === "/"
        ? SITE.domain + "/"
        : `${SITE.domain}${normalizeContentPath(en)}`;
  }
  return languages;
}

export function absolutePageUrl(page: ContentPage, locale: Locale): string {
  const p = page.paths[locale] || page.paths.en || "/";
  const path = normalizeContentPath(p);
  return path === "/" ? `${SITE.domain}/` : `${SITE.domain}${path}`;
}

export function staticParamsFromRegistry(): {
  locale: string;
  slug?: string[];
}[] {
  const params: { locale: string; slug?: string[] }[] = [];
  for (const page of getAllPages()) {
    for (const locale of locales) {
      const p = page.paths[locale];
      if (!p) continue;
      const path = normalizeContentPath(p);
      if (locale === "en") {
        if (path === "/") {
          params.push({ locale: "en" });
        } else {
          const parts = path
            .replace(/^\/|\/$/g, "")
            .split("/")
            .filter(Boolean);
          params.push({ locale: "en", slug: parts });
        }
      } else {
        const parts = path
          .replace(/^\/|\/$/g, "")
          .split("/")
          .filter(Boolean);
        if (parts[0] === locale) parts.shift();
        if (parts.length === 0) {
          params.push({ locale });
        } else {
          params.push({ locale, slug: parts });
        }
      }
    }
  }
  return params;
}

export function localizedHref(pageIdOrEnPath: string, locale: Locale): string {
  const pages = getAllPages();
  const key = pageIdOrEnPath.replace(/^\/|\/$/g, "") || "home";
  const page =
    pages.find((p) => p.id === key || p.id === pageIdOrEnPath) ||
    pages.find((p) => p.enSlug === key) ||
    pages.find(
      (p) =>
        normalizeContentPath(p.paths.en || "") ===
        normalizeContentPath(pageIdOrEnPath),
    );
  if (!page) {
    if (locale === "en")
      return pageIdOrEnPath.startsWith("/")
        ? pageIdOrEnPath
        : `/${pageIdOrEnPath}`;
    return `/${locale}${pageIdOrEnPath.startsWith("/") ? pageIdOrEnPath : `/${pageIdOrEnPath}`}`;
  }
  return page.paths[locale] || page.paths.en || "/";
}
