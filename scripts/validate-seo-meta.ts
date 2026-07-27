/**
 * SEO meta validator for content/seo-meta.json.
 *
 * npx tsx scripts/validate-seo-meta.ts
 *
 * Enforces Google-length titles/descriptions, no em/en dashes, full coverage
 * of indexable manifest routes × locales, and cross-locale uniqueness.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { locales, type Locale } from "@/i18n/routing";
import { allRoutes } from "@/routes";

const ROOT = process.cwd();
const TITLE_MIN = 25;
const TITLE_MAX = 65;
const DESC_MIN = 110;
const DESC_MAX = 160;

const COOKIE_TELLS = [
  "we use cookies",
  "χρησιμοποιούμε cookies",
  "manage your preferences",
  "accept all cookies",
];

type Entry = { title: string; description: string };
type Store = Record<string, Partial<Record<Locale, Entry>>>;

const store = JSON.parse(
  readFileSync(path.join(ROOT, "content/seo-meta.json"), "utf8"),
) as Store;

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);
const charLen = (s: string) => [...s].length;

const indexableKeys = allRoutes()
  .filter((r) => r.indexable)
  .map((r) => r.key);

for (const key of indexableKeys) {
  const byLocale = store[key];
  if (!byLocale) {
    err(`Missing SEO meta for indexable route "${key}"`);
    continue;
  }

  const titles: string[] = [];
  const descs: string[] = [];

  for (const locale of locales) {
    const entry = byLocale[locale];
    const at = `${key} [${locale}]`;
    if (!entry?.title?.trim() || !entry?.description?.trim()) {
      err(`${at}: missing title or description`);
      continue;
    }

    const title = entry.title.trim();
    const description = entry.description.trim();
    const tl = charLen(title);
    const dl = charLen(description);

    if (tl < TITLE_MIN || tl > TITLE_MAX) {
      err(
        `${at}: title is ${tl} chars (want ${TITLE_MIN}-${TITLE_MAX}): ${title}`,
      );
    }
    if (dl < DESC_MIN || dl > DESC_MAX) {
      err(`${at}: description is ${dl} chars (want ${DESC_MIN}-${DESC_MAX})`);
    }
    if (/[\u2013\u2014\u2015]/.test(title) || /[\u2013\u2014\u2015]/.test(description)) {
      err(`${at}: contains em dash or en dash`);
    }
    if (/\|\s*AGGELOS Rentals\s*\|/.test(title)) {
      err(`${at}: doubled brand suffix`);
    }
    const lower = `${title} ${description}`.toLowerCase();
    for (const tell of COOKIE_TELLS) {
      if (lower.includes(tell)) err(`${at}: cookie-banner text ("${tell}")`);
    }

    titles.push(title);
    descs.push(description);
  }

  if (new Set(titles).size < titles.length) {
    err(`${key}: duplicate titles across locales`);
  }
  if (new Set(descs).size < descs.length) {
    err(`${key}: duplicate descriptions across locales`);
  }
}

// Within each locale, money pages must not share descriptions
for (const locale of locales) {
  const moneyDescs = new Map<string, string>();
  for (const key of indexableKeys.filter((k) => k.startsWith("money/"))) {
    const d = store[key]?.[locale]?.description?.trim();
    if (!d) continue;
    const prior = moneyDescs.get(d);
    if (prior)
      err(`${locale}: money pages share description: ${prior} & ${key}`);
    else moneyDescs.set(d, key);
  }
}

const extra = Object.keys(store).filter((k) => !indexableKeys.includes(k));
for (const k of extra)
  warn(`seo-meta.json has non-indexable key "${k}" (ok if intentional)`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(` · ${w}`);
}

if (errors.length) {
  console.error(`\n${errors.length} SEO meta error(s):`);
  for (const e of errors) console.error(` ✗ ${e}`);
  process.exit(1);
}

console.log(
  `SEO meta OK: ${indexableKeys.length} routes × ${locales.length} locales (${indexableKeys.length * locales.length} pairs).`,
);
