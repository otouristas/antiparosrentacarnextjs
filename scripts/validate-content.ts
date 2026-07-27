/**
 * Native-content validator. Wired as `prebuild`.
 *
 * npx tsx scripts/validate-content.ts report mode (default)
 * npx tsx scripts/validate-content.ts --strict also fail on unauthored routes
 *
 * The brief requires every locale to be written independently rather than
 * translated. That is unenforceable by review at ~900 modules, so it is enforced
 * here: a locale whose H1/title/description/intro matches a sibling's is a hard
 * error, as is a page that is a find-replace of another page in the same locale.
 *
 * Report mode validates everything authored and reports coverage for what is
 * not. Strict mode additionally requires full coverage, and is switched on per
 * locale as Phase 4 completes each one.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";
import { allRoutes, hasRoute } from "@/routes";
import { CONTENT } from "@/content/registry.generated";
import type { CategoryCopy, PageCopy, VehicleCopy } from "@/content/types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content");
const STRICT = process.argv.includes("--strict");

/** Route kinds whose copy is a PageCopy module. */
const PAGE_KINDS = new Set([
  "home",
  "money",
  "location",
  "guide",
  "comparison",
  "contact",
  "legal",
]);

const TITLE_MIN = 25;
const TITLE_MAX = 65;
const DESC_MIN = 110;
const DESC_MAX = 160;
const MIN_FAQS = 3;
const MIN_SECTIONS = 2;
const MIN_RELATED = 3;

/** WordPress cookie-consent text, which poisoned 365 of 374 descriptions. */
const COOKIE_TELLS = [
  "we use cookies",
  "χρησιμοποιούμε cookies",
  "wir verwenden cookies",
  "utilizamos cookies",
  "nous utilisons des cookies",
  "utilizziamo i cookie",
  "we gebruiken cookies",
  "vi använder cookies",
  "мы используем",
  "çerez",
  "manage your preferences",
  "accept all cookies",
];

const PLACEHOLDER_TELLS = [
  "lorem ipsum",
  "todo",
  "tbd",
  "xxx",
  "fixme",
  "placeholder",
];

/** English phrases that should never survive into a non-English module. */
const ENGLISH_TELLS = [
  "rent a car",
  "book now",
  "free cancellation",
  "no hidden fees",
  "check availability",
  "view full fleet",
];

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
const isBlank = (s: unknown) => typeof s !== "string" || s.trim() === "";

/** Files carrying an explicit allow comment are exempt from duplicate rules. */
function hasDuplicateExemption(filePath: string): boolean {
  if (!existsSync(filePath)) return false;
  return /@content-allow-duplicate/.test(readFileSync(filePath, "utf8"));
}

function moduleFile(collection: string, key: string, locale: Locale): string {
  if (collection === "fleet-category")
    return path.join(CONTENT_DIR, "fleet/category", key, `${locale}.ts`);
  if (collection === "vehicle")
    return path.join(CONTENT_DIR, "fleet/vehicle", key, `${locale}.ts`);
  if (collection === "articles")
    return path.join(CONTENT_DIR, "articles", key, `${locale}.ts`);
  return path.join(CONTENT_DIR, "pages", key, `${locale}.ts`);
}

/** A module whose required fields are still empty is a stub, not authored copy. */
function isStub(copy: PageCopy | CategoryCopy): boolean {
  return (
    isBlank(copy.h1) || isBlank(copy.intro) || isBlank(copy.seo.description)
  );
}

const EM_DASH_RE = /[\u2014\u2013\u2015]/; // em dash, en dash, horizontal bar

function checkText(label: string, value: string, locale: Locale) {
  const v = norm(value);
  if (EM_DASH_RE.test(value)) {
    err(
      `${label}: contains em/en dash; rewrite with commas, periods, or colons`,
    );
  }
  for (const tell of COOKIE_TELLS) {
    if (v.includes(tell))
      err(`${label}: contains cookie-banner text ("${tell}")`);
  }
  for (const tell of PLACEHOLDER_TELLS) {
    if (v.includes(tell))
      err(`${label}: contains placeholder text ("${tell}")`);
  }
  if (locale !== defaultLocale) {
    for (const tell of ENGLISH_TELLS) {
      if (v.includes(tell)) warn(`${label}: contains English phrase "${tell}"`);
    }
  }
}

function validatePageCopy(
  key: string,
  locale: Locale,
  copy: PageCopy,
  file: string,
) {
  const at = `${key} [${locale}]`;

  if (copy.locale !== locale) {
    err(
      `${at}: declares locale "${copy.locale}" but lives in ${locale}.ts, copy-pasted from another locale`,
    );
  }

  if (isBlank(copy.seo.title)) err(`${at}: seo.title is empty`);
  else {
    const n = copy.seo.title.trim().length;
    if (n < TITLE_MIN || n > TITLE_MAX)
      warn(`${at}: seo.title is ${n} chars (want ${TITLE_MIN}-${TITLE_MAX})`);
    checkText(`${at} seo.title`, copy.seo.title, locale);
    if (/\|\s*AGGELOS Rentals\s*\|/.test(copy.seo.title)) {
      err(`${at}: seo.title contains a doubled brand suffix`);
    }
  }

  if (isBlank(copy.seo.description)) err(`${at}: seo.description is empty`);
  else {
    const n = copy.seo.description.trim().length;
    if (n < DESC_MIN || n > DESC_MAX)
      warn(
        `${at}: seo.description is ${n} chars (want ${DESC_MIN}-${DESC_MAX})`,
      );
    checkText(`${at} seo.description`, copy.seo.description, locale);
  }

  if (isBlank(copy.h1)) err(`${at}: h1 is empty`);
  else checkText(`${at} h1`, copy.h1, locale);

  if (isBlank(copy.intro)) err(`${at}: intro is empty`);
  else checkText(`${at} intro`, copy.intro, locale);

  if (isBlank(copy.cta?.primary)) err(`${at}: cta.primary is empty`);

  if (!Array.isArray(copy.sections) || copy.sections.length < MIN_SECTIONS) {
    err(
      `${at}: needs at least ${MIN_SECTIONS} sections (has ${copy.sections?.length ?? 0})`,
    );
  }
  if (!Array.isArray(copy.faqs) || copy.faqs.length < MIN_FAQS) {
    err(
      `${at}: needs at least ${MIN_FAQS} FAQs (has ${copy.faqs?.length ?? 0})`,
    );
  }
  if (!Array.isArray(copy.related) || copy.related.length < MIN_RELATED) {
    err(
      `${at}: needs at least ${MIN_RELATED} related links (has ${copy.related?.length ?? 0})`,
    );
  }

  for (const link of copy.related ?? []) {
    if (!hasRoute(link.to))
      err(`${at}: related link points at unknown route "${link.to}"`);
    if (isBlank(link.anchor))
      err(`${at}: related link to "${link.to}" has empty anchor text`);
  }

  if (isBlank(copy.finalCta?.heading) || isBlank(copy.finalCta?.button)) {
    err(`${at}: finalCta needs a heading and a button label`);
  }

  void file;
}

function validateVehicleCopy(
  typeId: string,
  locale: Locale,
  copy: VehicleCopy,
) {
  const at = `vehicle/${typeId} [${locale}]`;
  if (copy.locale !== locale)
    err(`${at}: declares locale "${copy.locale}" but lives in ${locale}.ts`);
  if (isBlank(copy.name)) err(`${at}: name is empty`);
  if (isBlank(copy.blurb)) err(`${at}: blurb is empty`);
  if (isBlank(copy.orSimilar)) err(`${at}: orSimilar is empty`);
  if (isBlank(copy.seo?.title)) err(`${at}: seo.title is empty`);
  if (isBlank(copy.seo?.description)) err(`${at}: seo.description is empty`);
  else checkText(`${at} seo.description`, copy.seo.description, locale);
}

/** Cross-locale: the same page must not read the same in two languages. */
function checkCrossLocaleDuplicates(
  collection: string,
  key: string,
  byLocale: Partial<Record<Locale, PageCopy | CategoryCopy>>,
) {
  const fields: (keyof PageCopy | "seo.title" | "seo.description")[] = [
    "h1",
    "intro",
    "seo.title",
    "seo.description",
  ];

  const read = (c: PageCopy | CategoryCopy, f: string): string =>
    f === "seo.title"
      ? c.seo.title
      : f === "seo.description"
        ? c.seo.description
        : (c[f as "h1"] as string);

  for (const field of fields) {
    const seen = new Map<string, Locale>();
    for (const locale of locales) {
      const copy = byLocale[locale];
      if (!copy) continue;
      const raw = read(copy, field as string);
      if (isBlank(raw)) continue;
      const value = norm(raw);
      const owner = seen.get(value);
      if (owner) {
        if (hasDuplicateExemption(moduleFile(collection, key, locale)))
          continue;
        err(
          `${key}: ${String(field)} is identical in "${owner}" and "${locale}", ` +
            `each locale must be written natively (add // @content-allow-duplicate if intentional)`,
        );
      } else {
        seen.set(value, locale);
      }
    }
  }
}

/** Within a locale: two different pages must not share a title or H1. */
function checkCrossPageDuplicates(
  pages: Record<string, Partial<Record<Locale, PageCopy>>>,
) {
  for (const locale of locales) {
    for (const field of ["h1", "seo.title"] as const) {
      const seen = new Map<string, string>();
      for (const [key, byLocale] of Object.entries(pages)) {
        const copy = byLocale[locale];
        if (!copy) continue;
        const raw = field === "h1" ? copy.h1 : copy.seo.title;
        if (isBlank(raw)) continue;
        const value = norm(raw);
        const owner = seen.get(value);
        if (owner) {
          err(
            `[${locale}] ${field} is identical on "${owner}" and "${key}", one is a find-replace of the other`,
          );
        } else {
          seen.set(value, key);
        }
      }
    }
  }
}

/** Non-English anchor text identical to English is the usual machine-translation tell. */
function checkAnchorText(
  pages: Record<string, Partial<Record<Locale, PageCopy>>>,
) {
  for (const [key, byLocale] of Object.entries(pages)) {
    const en = byLocale[defaultLocale];
    if (!en) continue;
    const enAnchors = new Map(
      (en.related ?? []).map((l) => [l.to, norm(l.anchor)]),
    );
    for (const locale of locales) {
      if (locale === defaultLocale) continue;
      const copy = byLocale[locale];
      if (!copy) continue;
      for (const link of copy.related ?? []) {
        const enAnchor = enAnchors.get(link.to);
        if (
          enAnchor &&
          !isBlank(link.anchor) &&
          norm(link.anchor) === enAnchor
        ) {
          err(
            `${key} [${locale}]: anchor text for "${link.to}" is identical to English ("${link.anchor}")`,
          );
        }
      }
    }
  }

  // Anchor diversity: one target repeatedly linked with the same words looks spammy.
  for (const locale of locales) {
    const counts = new Map<string, number>();
    for (const byLocale of Object.values(pages)) {
      const copy = byLocale[locale];
      if (!copy) continue;
      for (const link of copy.related ?? []) {
        if (isBlank(link.anchor)) continue;
        const id = `${link.to}|${norm(link.anchor)}`;
        counts.set(id, (counts.get(id) ?? 0) + 1);
      }
    }
    for (const [id, n] of counts) {
      if (n > 5) {
        const [to, anchor] = id.split("|");
        warn(
          `[${locale}] "${anchor}" links to ${to} on ${n} pages, vary the anchor text`,
        );
      }
    }
  }
}

/** Detect files on disk that the generated registry does not know about. */
function checkOrphanModules() {
  const pagesRoot = path.join(CONTENT_DIR, "pages");
  if (!existsSync(pagesRoot)) return;
  const walk = (dir: string, depth: number): string[] => {
    if (depth > 3) return [];
    return readdirSync(dir).flatMap((entry) => {
      const p = path.join(dir, entry);
      return statSync(p).isDirectory() ? walk(p, depth + 1) : [p];
    });
  };
  const onDisk = walk(pagesRoot, 0).filter((f) => f.endsWith(".ts"));
  const registered = new Set(
    Object.entries(CONTENT.pages).flatMap(([key, byLocale]) =>
      Object.keys(byLocale).map((l) => moduleFile("pages", key, l as Locale)),
    ),
  );
  for (const f of onDisk) {
    if (!registered.has(f)) {
      warn(
        `${path.relative(ROOT, f)} is not in the registry, run \`npm run content:registry\``,
      );
    }
  }
}

function main() {
  const routes = allRoutes();
  const pages = CONTENT.pages as Record<
    string,
    Partial<Record<Locale, PageCopy>>
  >;
  const categories = CONTENT["fleet-category"] as Record<
    string,
    Partial<Record<Locale, CategoryCopy>>
  >;
  const vehicles = CONTENT.vehicle as Record<
    string,
    Partial<Record<Locale, VehicleCopy>>
  >;

  /* ---- validate everything authored ---- */
  for (const [key, byLocale] of Object.entries(pages)) {
    const present = locales.filter((l) => byLocale[l]);
    const authored = present.filter((l) => !isStub(byLocale[l]!));

    // A page authored in some locales but missing others is unambiguously a bug.
    if (authored.length > 0 && present.length < locales.length) {
      const missing = locales.filter((l) => !byLocale[l]);
      err(
        `${key}: authored in ${authored.length} locale(s) but missing modules for: ${missing.join(", ")}`,
      );
    }

    for (const locale of present) {
      const copy = byLocale[locale]!;
      if (isStub(copy)) continue; // stubs are coverage, not quality, failures
      validatePageCopy(key, locale, copy, moduleFile("pages", key, locale));
    }
    checkCrossLocaleDuplicates("pages", key, byLocale);
  }

  for (const [slug, byLocale] of Object.entries(categories)) {
    for (const locale of locales) {
      const copy = byLocale[locale];
      if (!copy || isStub(copy)) continue;
      validatePageCopy(
        `fleet-category/${slug}`,
        locale,
        copy,
        moduleFile("fleet-category", slug, locale),
      );
      if (isBlank(copy.label))
        err(`fleet-category/${slug} [${locale}]: label is empty`);
    }
    checkCrossLocaleDuplicates("fleet-category", slug, byLocale);
  }

  for (const [typeId, byLocale] of Object.entries(vehicles)) {
    for (const locale of locales) {
      const copy = byLocale[locale];
      if (!copy || isBlank(copy.name)) continue;
      validateVehicleCopy(typeId, locale, copy);
    }
  }

  checkCrossPageDuplicates(pages);
  checkAnchorText(pages);
  checkOrphanModules();

  /* ---- coverage ---- */
  const required = routes.filter((r) => PAGE_KINDS.has(r.kind));
  const requiredKeys = required.map((r) => r.key);
  const authoredCount = requiredKeys.filter((k) =>
    locales.every((l) => pages[k]?.[l] && !isStub(pages[k]![l]!)),
  ).length;
  const stubCount = requiredKeys.filter(
    (k) =>
      pages[k] &&
      !locales.every((l) => pages[k]?.[l] && !isStub(pages[k]![l]!)),
  ).length;
  const absent = requiredKeys.filter((k) => !pages[k]);

  console.log(`\n content coverage (${locales.length} locales)`);
  console.log(` page routes requiring copy : ${requiredKeys.length}`);
  console.log(` fully authored : ${authoredCount}`);
  console.log(` scaffolded, not authored : ${stubCount}`);
  console.log(` not scaffolded : ${absent.length}`);
  console.log(
    ` fleet categories authored : ${Object.keys(categories).length}/9`,
  );
  console.log(` vehicle types authored : ${Object.keys(vehicles).length}/33`);

  if (STRICT && absent.length > 0) {
    for (const k of absent) err(`${k}: no content module in any locale`);
  }

  if (warnings.length) {
    console.log(`\n ${warnings.length} warning(s)`);
    for (const w of warnings.slice(0, 15)) console.log(` ~ ${w}`);
    if (warnings.length > 15)
      console.log(` ~ …and ${warnings.length - 15} more`);
  }
  if (errors.length) {
    console.error(`\n validate-content FAILED, ${errors.length} error(s)\n`);
    for (const e of errors.slice(0, 25)) console.error(` x ${e}`);
    if (errors.length > 25) console.error(` x …and ${errors.length - 25} more`);
    console.error("");
    process.exit(1);
  }
  console.log(
    `\n validate-content OK${STRICT ? " (strict)" : " (report mode)"}`,
  );
}

main();
