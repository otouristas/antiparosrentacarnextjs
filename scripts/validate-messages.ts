/**
 * UI-string validator. Wired as `prebuild`.
 *
 * npx tsx scripts/validate-messages.ts
 *
 * `messages/*.json` carries chrome only (nav, booking widget, trust badges,
 * footer). Page copy lives in src/content/**.
 *
 * The headline check is the byte-identical one: es, pt, ru, sv and tr currently
 * hash the same as en.json, so five of eleven locales render an entirely English
 * interface. A file that merely *exists* proves nothing.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { locales, defaultLocale, type Locale } from "@/i18n/routing";

const ROOT = process.cwd();
const MESSAGES_DIR = path.join(ROOT, "messages");

/** Strings that are legitimately identical across locales (brand, channels, symbols). */
const ALLOWED_IDENTICAL = new Set([
  "AGGELOS Rentals",
  "WhatsApp",
  "Antiparos",
  "Paros",
  "Piraeus",
  "Parikia",
  "Naoussa",
  "AGGELOS Rentals",
  "SUV",
  "SUVs",
  "ATV",
  "ATVs",
  "€",
  "km",
  "cc",
  "A/C",
]);

const errors: string[] = [];
const warnings: string[] = [];

function flatten(obj: unknown, prefix = "", out: Record<string, string> = {}) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else if (typeof obj === "string") {
    out[prefix] = obj;
  }
  return out;
}

function md5(s: string) {
  return createHash("md5").update(s).digest("hex");
}

function main() {
  const basePath = path.join(MESSAGES_DIR, `${defaultLocale}.json`);
  if (!existsSync(basePath)) {
    console.error(` messages/${defaultLocale}.json not found`);
    process.exit(1);
  }

  const baseRaw = readFileSync(basePath, "utf8");
  const baseFlat = flatten(JSON.parse(baseRaw));
  const baseKeys = Object.keys(baseFlat).sort();
  const baseHash = md5(baseRaw);

  const report: {
    locale: Locale;
    keys: number;
    identical: number;
    pct: number;
  }[] = [];

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const p = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!existsSync(p)) {
      errors.push(`messages/${locale}.json is missing`);
      continue;
    }

    const raw = readFileSync(p, "utf8");
    const flat = flatten(JSON.parse(raw));
    const keys = Object.keys(flat).sort();

    // whole-file identity, the unambiguous "this was never translated" signal
    if (md5(raw) === baseHash) {
      errors.push(
        `messages/${locale}.json is byte-identical to ${defaultLocale}.json, the entire UI renders in English`,
      );
    }

    const missing = baseKeys.filter((k) => !(k in flat));
    const extra = keys.filter((k) => !(k in baseFlat));
    for (const k of missing)
      errors.push(`messages/${locale}.json: missing key "${k}"`);
    for (const k of extra)
      warnings.push(
        `messages/${locale}.json: key "${k}" not in ${defaultLocale}.json`,
      );

    const shared = baseKeys.filter((k) => k in flat);
    const identical = shared.filter(
      (k) => flat[k] === baseFlat[k] && !ALLOWED_IDENTICAL.has(flat[k].trim()),
    );
    const pct = shared.length
      ? Math.round((identical.length / shared.length) * 100)
      : 0;
    report.push({
      locale,
      keys: keys.length,
      identical: identical.length,
      pct,
    });

    // A partial copy is harder to spot than a whole one, so flag it too.
    if (pct >= 60 && md5(raw) !== baseHash) {
      errors.push(
        `messages/${locale}.json: ${pct}% of values are identical to English (${identical.length}/${shared.length})`,
      );
    } else if (pct >= 25) {
      warnings.push(
        `messages/${locale}.json: ${pct}% of values still match English`,
      );
    }
  }

  console.log(`\n locale keys same-as-en`);
  console.log(` ------ ---- ----------`);
  console.log(
    ` ${defaultLocale.padEnd(6)} ${String(baseKeys.length).padStart(4)} (baseline)`,
  );
  for (const r of report) {
    const flag =
      r.pct >= 60 ? " <-- untranslated" : r.pct >= 25 ? " <-- partial" : "";
    console.log(
      ` ${r.locale.padEnd(6)} ${String(r.keys).padStart(4)} ${String(r.pct).padStart(3)}%${flag}`,
    );
  }

  if (warnings.length) {
    console.log(`\n ${warnings.length} warning(s)`);
    for (const w of warnings.slice(0, 12)) console.log(` ~ ${w}`);
    if (warnings.length > 12)
      console.log(` ~ …and ${warnings.length - 12} more`);
  }
  if (errors.length) {
    console.error(`\n validate-messages FAILED, ${errors.length} error(s)\n`);
    for (const e of errors.slice(0, 20)) console.error(` x ${e}`);
    if (errors.length > 20) console.error(` x …and ${errors.length - 20} more`);
    console.error("");
    process.exit(1);
  }
  console.log(`\n validate-messages OK`);
}

main();
