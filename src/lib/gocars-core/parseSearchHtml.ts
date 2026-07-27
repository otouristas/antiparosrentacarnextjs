import { checkoutUrl } from "./urls";
import { parseEuroPrice } from "./parsePrice";
import type {
  SearchParams,
  SearchResult,
  SearchVehicle,
  SearchVehiclePerk,
} from "./types";

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&euro;/gi, "€")
    .replace(/&nbsp;/g, " ")
    .replace(/\u200b/g, "");
}

function stripTags(input: string): string {
  return decodeEntities(
    input
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function cleanPriceText(text?: string): string | undefined {
  if (!text) return undefined;
  return text
    .replace(/\s+,/g, ",")
    .replace(/,\s+/g, ",")
    .replace(/\s+€/g, "€")
    .trim();
}

function matchGroup(html: string, re: RegExp): string | undefined {
  const m = re.exec(html);
  return m?.[1] ? stripTags(m[1]) : undefined;
}

function extractBlock(html: string, id: string): string | null {
  const marker = `data-id="${id}"`;
  const start = html.indexOf(marker);
  if (start < 0) return null;
  const divStart = html.lastIndexOf("<div", start);
  if (divStart < 0) return null;
  const next = html.indexOf('data-id="', start + marker.length);
  const end = next > 0 ? html.lastIndexOf("<div", next) : html.length;
  return html.slice(divStart, end > divStart ? end : html.length);
}

function featureText(block: string, iconClass: string): string | undefined {
  const re = new RegExp(
    `class="[^"]*${iconClass}[^"]*"[^>]*>[\\s\\S]*?<\\/i>[\\s\\S]*?<\\/span>|` +
      `<i[^>]*class="[^"]*${iconClass}[^"]*"[^>]*><\\/i>([\\s\\S]*?)<\\/span>`,
    "i",
  );
  const m = re.exec(block);
  if (!m) return undefined;
  // Prefer capture group when present; else strip from the whole match after the icon.
  if (m[1]) return stripTags(m[1]) || undefined;
  const afterIcon = m[0].replace(/<i[\s\S]*?<\/i>/i, "");
  return stripTags(afterIcon) || undefined;
}

function parseFeatureNumber(
  block: string,
  iconClass: string,
): number | undefined {
  const text = featureText(block, iconClass);
  if (!text) return undefined;
  const m = /(\d+)/.exec(text);
  return m ? Number.parseInt(m[1], 10) : undefined;
}

function parseIncluded(block: string): string[] {
  const section =
    /class="[^"]*car-included-wrap[^"]*"[^>]*>([\s\S]*?)(?=<div class="[^"]*extra-features-discount|class="[^"]*scenario-|<\/div>\s*<\/div>\s*<div class="[^"]*scenario)/i.exec(
      block,
    )?.[1] ??
    /class="[^"]*car-included-wrap[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(
      block,
    )?.[1];
  if (!section) return [];

  const items: string[] = [];
  const re =
    /class="[^"]*single-feature[^"]*"[^>]*>[\s\S]*?icon-check[\s\S]*?<\/span>([\s\S]*?)<\/span>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) {
    const label = stripTags(m[1]);
    if (label) items.push(label);
  }
  // Fallback: any check-marked span text in included wraps
  if (!items.length) {
    const all = [...block.matchAll(/car-included-wrap[\s\S]*?<\/div>/gi)]
      .map((x) => x[0])
      .join("\n");
    for (const hit of all.matchAll(/icon-check[\s\S]*?<\/span>\s*([^<]+)/gi)) {
      const label = stripTags(hit[1]);
      if (label && !items.includes(label)) items.push(label);
    }
  }
  return items;
}

function parsePerks(block: string): SearchVehiclePerk[] {
  const section =
    /class="[^"]*extra-features-discount-wrap[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(
      block,
    )?.[1] ?? "";
  if (!section) return [];
  const perks: SearchVehiclePerk[] = [];
  const re =
    /class="[^"]*scenario-single-extra[^"]*"[^>]*>\s*<span class="([^"]*)"[^>]*><\/span>\s*([\s\S]*?)<\/span>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) {
    const iconClass = m[1] ?? "";
    const label = stripTags(m[2]);
    if (!label) continue;
    perks.push({
      label,
      positive: /icon-check/i.test(iconClass),
    });
  }
  return perks;
}

function parseTransmission(block: string): string | undefined {
  const auto = featureText(block, "icon-auto");
  if (auto) return auto;
  const manual = featureText(block, "icon-manual");
  if (manual) return manual;
  if (/icon-auto/i.test(block)) return "Automatic";
  if (/icon-manual/i.test(block)) return "Manual";
  return undefined;
}

/** Short “or similar” line under the title, never Terms popup body. */
function parseSubtitle(block: string): string | undefined {
  const modelWrap =
    /class="[^"]*car-model-wrap[^"]*"[^>]*>([\s\S]*?)(?=<div class="[^"]*car-features|class="[^"]*car-features|<div class="[^"]*features-wrapper)/i.exec(
      block,
    )?.[1] ?? "";
  const scope = modelWrap || block;

  const candidates = [
    /class="simple-text"(?![^"]*single-feature)[^>]*>\s*<p>([\s\S]*?)<\/p>/i.exec(
      scope,
    )?.[1],
    /class="[^"]*main-car-subtitle[^"]*"[^>]*>([\s\S]*?)<\//i.exec(scope)?.[1],
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    const text = stripTags(raw);
    if (!text) continue;
    // Guard: Terms HTML / long legal copy must never become the subtitle.
    if (text.length > 60) continue;
    if (
      /pricing|collision damage|terms and conditions|excess|waiver/i.test(text)
    )
      continue;
    return text;
  }
  return undefined;
}

function parseVehicleBlock(
  block: string,
  id: string,
  params: SearchParams,
): SearchVehicle {
  const typeLabel =
    matchGroup(block, /class="main-car-type[^"]*"[^>]*>([\s\S]*?)<\//i) ?? "";
  const title =
    matchGroup(block, /class="main-car-title[^"]*"[^>]*>([\s\S]*?)<\//i) ??
    `Vehicle ${id}`;
  const subtitle = parseSubtitle(block);
  const thumb =
    matchGroup(block, /data-src=['"]([^'"]+)['"]/i) ||
    matchGroup(block, /src=['"](https?:\/\/[^'"]*\/models\/[^'"]+)['"]/i);

  const strikePriceText = cleanPriceText(
    matchGroup(
      block,
      /class="[^"]*price-text[^"]*line-through[^"]*"[^>]*>([\s\S]*?)<\/span>\s*<\/span>/i,
    ) ??
      matchGroup(
        block,
        /class="[^"]*line-through[^"]*"[^>]*>([\s\S]*?)<\/span>/i,
      ),
  );
  const totalPriceText = cleanPriceText(
    matchGroup(
      block,
      /class="[^"]*main-price-total[^"]*"[^>]*>([\s\S]*?)<\/span>\s*<\/span>/i,
    ) ??
      matchGroup(
        block,
        /class="[^"]*main-price-total[^"]*"[^>]*>([\s\S]*?)<\//i,
      ),
  );
  const perDayPriceText = cleanPriceText(
    matchGroup(block, /class="[^"]*per-day-price[^"]*"[^>]*>([\s\S]*?)<\//i),
  );

  const rentalDaysMatch =
    /Total\s+Rental:\s*(\d+)/i.exec(block) ||
    /class="[^"]*rental-day-text[^"]*"[^>]*>[\s\S]*?(\d+)/i.exec(block);
  const rentalDays = rentalDaysMatch
    ? Number.parseInt(rentalDaysMatch[1], 10)
    : undefined;

  const remainingMatch = /Last\s+(\d+)\s+available/i.exec(block);
  const remaining = remainingMatch
    ? Number.parseInt(remainingMatch[1], 10)
    : undefined;

  const seats = parseFeatureNumber(block, "icon-seats");
  const doors = parseFeatureNumber(block, "icon-car-doors");
  const largeBags = parseFeatureNumber(block, "icon-luggage");
  const smallBags = parseFeatureNumber(block, "icon-handbag");
  const fuel = featureText(block, "icon-fuel");
  const airCondition =
    /icon-ac/i.test(block) || /air[- ]?condition/i.test(block);
  const transmission = parseTransmission(block);

  const typeId =
    matchGroup(block, /data-type_id=["'](\d+)["']/i) ??
    matchGroup(block, /btnNextCheckout[^>]*data-type_id=["'](\d+)["']/i);
  const paymentMethod =
    matchGroup(block, /btnNextCheckout[^>]*data-payment_method=["']([^"']+)["']/i) ??
    matchGroup(block, /data-payment_method=["']([^"']+)["']/i);
  const insurance =
    matchGroup(block, /btnNextCheckout[^>]*data-insurance=["']([^"']+)["']/i) ??
    matchGroup(block, /data-insurance=["']([^"']+)["']/i);

  const wrapClass =
    /class="([^"]*single-car-wrap[^"]*)"/.exec(block)?.[1] ?? "";
  const hidden = /\bhidden\b/.test(wrapClass);
  const notAvailable =
    /class="[^"]*not[-_]available[^"]*"/i.test(block) ||
    />\s*Not available\s*</i.test(block);

  return {
    id,
    typeId: typeId || undefined,
    typeLabel,
    title,
    subtitle,
    thumb: thumb?.split("?")[0],
    totalPriceText,
    perDayPriceText,
    totalPrice: parseEuroPrice(totalPriceText),
    perDayPrice: parseEuroPrice(perDayPriceText),
    strikePriceText,
    strikePrice: parseEuroPrice(strikePriceText),
    rentalDays,
    remaining,
    available: !hidden && !notAvailable,
    seats,
    doors,
    transmission,
    largeBags,
    smallBags,
    fuel,
    airCondition: airCondition || undefined,
    included: parseIncluded(block),
    perks: parsePerks(block),
    checkoutUrl: checkoutUrl({
      ...params,
      model_id: id,
      payment_method: paymentMethod,
      insurance,
    }),
  };
}

/** Parse GOCARS `gcActionCars` SSR HTML into structured vehicle results. */
export function parseSearchHtml(
  html: string,
  params: SearchParams,
): SearchResult {
  const idMatches = [...html.matchAll(/data-id="(\d+)"/g)].map((m) => m[1]);
  const seen = new Set<string>();
  const vehicles: SearchVehicle[] = [];

  for (const id of idMatches) {
    if (seen.has(id)) continue;
    seen.add(id);
    const block = extractBlock(html, id);
    if (!block || !/single-car-wrap/i.test(block)) continue;
    if (!/main-car-title/i.test(block)) continue;
    vehicles.push(parseVehicleBlock(block, id, params));
  }

  return {
    vehicles,
    searchUrl: "",
    scrapedAt: new Date().toISOString(),
    count: vehicles.length,
  };
}
