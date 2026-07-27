#!/usr/bin/env python3
"""Build content/pages.json + pathnames + redirects from inventory + TRP + scraped raw."""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ["en", "el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"]
LOCALE_SET = set(LOCALES)

MONEY_SLUGS = {
    "paros-rent-a-car",
    "rent-a-car-antiparos-aggelos",
    "paros-airport-rent-a-car-port",
    "paros-port-parikia-rent-a-car",
    "piraeus-rent-a-car",
    "atvs-antiparos",
    "antiparos-scooter-rentals",
    "suv-rentals-paros",
}
FLEET_SLUGS = {"car-fleet", "aggelos-fleet", "bicycles-fleet"}
GUIDE_SLUGS = {"paros-island", "antiparos-island", "travel-tips-for-antiparos-and-paros"}
LEGAL_SLUGS = {"terms-conditions", "privacy-policy", "cookie-policy-eu"}
CONTACT_SLUGS = {"contact", "about-us"}


def classify(en_slug: str, post_type: str | None = None) -> str:
    if en_slug in ("", "/", "__home__") or en_slug == "home":
        return "home"
    if en_slug in MONEY_SLUGS:
        return "money"
    if en_slug in FLEET_SLUGS:
        return "fleet"
    if en_slug in GUIDE_SLUGS:
        return "guide"
    if en_slug in LEGAL_SLUGS:
        return "legal"
    if en_slug in CONTACT_SLUGS:
        return "contact"
    if post_type == "post" or any(
        x in en_slug
        for x in (
            "guide",
            "tips",
            "earthquake",
            "pasxa",
            "windsurf",
            "best-things",
            "how-to",
            "do-you-need",
            "vs-",
            "exploring",
            "rent-a-car-in-paros",
            "affordable",
            "best-deals",
            "imeres",
            "ultimate",
        )
    ):
        return "blog"
    return "guide"


def normalize_path(path: str) -> str:
    path = unquote(path or "/")
    if not path.startswith("/"):
        path = "/" + path
    if path != "/" and not path.endswith("/"):
        path += "/"
    return path


def path_from_url(url: str) -> tuple[str, str]:
    p = normalize_path(urlparse(url).path)
    parts = [x for x in p.strip("/").split("/") if x]
    if not parts:
        return "en", "/"
    if parts[0] in LOCALE_SET:
        loc = parts[0]
        rest = parts[1:]
        return loc, f"/{loc}/" if not rest else f"/{loc}/{'/'.join(rest)}/"
    return "en", p if p != "//" else "/"


def slug_key(locale: str, path: str) -> str:
    parts = [x for x in path.strip("/").split("/") if x]
    if locale != "en" and parts and parts[0] == locale:
        parts = parts[1:]
    return "__home__" if not parts else "/".join(parts)


def raw_paths(locale: str, path: str) -> tuple[Path, Path]:
    key = slug_key(locale, path).replace("/", "__")
    base = ROOT / "content" / "raw" / locale
    return base / f"{key}.md", base / f"{key}.json"


def normalize_trp_lang(code: str) -> str | None:
    c = (code or "").lower().replace("-", "_")
    mapping = {
        "el": "el",
        "fr": "fr",
        "fr_fr": "fr",
        "es": "es",
        "es_es": "es",
        "it": "it",
        "it_it": "it",
        "de": "de",
        "de_de": "de",
        "nl": "nl",
        "nl_nl": "nl",
        "sv": "sv",
        "sv_se": "sv",
        "pt": "pt",
        "pt_pt": "pt",
        "pt_br": "pt",
        "ru": "ru",
        "ru_ru": "ru",
        "tr": "tr",
        "tr_tr": "tr",
        "en": "en",
        "en_us": "en",
        "en_gb": "en",
    }
    return mapping.get(c)


def load_trp() -> dict[str, dict[str, str]]:
    """original_en_slug -> {locale: translated_slug}"""
    p = ROOT / "content" / "trp-slug-map.json"
    if not p.exists():
        return {}
    data = json.loads(p.read_text(encoding="utf-8"))
    originals = {str(o["id"]): o["original"] for o in data["originals"]}
    out: dict[str, dict[str, str]] = {}
    for t in data["translations"]:
        oid = str(t["original_id"])
        en = originals.get(oid)
        if not en:
            continue
        lang = normalize_trp_lang(t["language"])
        if not lang or lang == "en":
            continue
        out.setdefault(en, {})[lang] = t["translated"]
    return out


def infer_hreflang(html: str | None, links: list | None) -> dict[str, str]:
    found: dict[str, str] = {}
    if html:
        for m in re.finditer(
            r'<link[^>]+rel=["\']alternate["\'][^>]*>',
            html,
            re.I,
        ):
            tag = m.group(0)
            hm = re.search(r'hreflang=["\']([^"\']+)["\']', tag, re.I)
            hm2 = re.search(r'href=["\']([^"\']+)["\']', tag, re.I)
            if hm and hm2:
                lang = hm.group(1).lower().split("-")[0]
                if lang in LOCALE_SET or lang == "x":
                    if lang != "x":
                        _, path = path_from_url(hm2.group(1))
                        found[lang] = path
    if links:
        for link in links:
            if not isinstance(link, str):
                continue
            if "antiparosrentacar.com" not in link:
                continue
            loc, path = path_from_url(link)
            # only keep if looks like same site nav — skip
            _ = (loc, path)
    return found


def main() -> None:
    inv = json.loads((ROOT / "content" / "url-inventory.json").read_text(encoding="utf-8"))
    trp = load_trp()

    # Index inventory by locale+path and by trailing slug
    by_path: dict[tuple[str, str], dict] = {}
    by_locale_slug: dict[tuple[str, str], dict] = {}
    for row in inv["urls"]:
        # Skip query-string UI chrome URLs when indexing by path
        if "?" in row["url"]:
            continue
        loc, path = path_from_url(row["url"])
        row = {**row, "locale": loc, "path": path}
        prev = by_path.get((loc, path))
        # Prefer indexable rows if duplicate paths appear
        if prev and prev.get("indexable") and not row.get("indexable"):
            continue
        by_path[(loc, path)] = row
        by_locale_slug[(loc, slug_key(loc, path))] = row

    # Build groups keyed by EN slug
    groups: dict[str, dict] = {}

    # Seed from EN inventory
    for (loc, path), row in by_path.items():
        if loc != "en" or not row.get("indexable"):
            continue
        en_slug = slug_key("en", path)
        groups[en_slug] = {
            "id": en_slug if en_slug != "__home__" else "home",
            "enSlug": en_slug if en_slug != "__home__" else "",
            "type": classify(en_slug if en_slug != "__home__" else "home"),
            "paths": {"en": path},
            "titles": {"en": row.get("title") or ""},
            "descriptions": {},
            "indexable": True,
        }

    # Force locale homepages onto home group
    if "__home__" in groups or "home" in [g["id"] for g in groups.values()]:
        home_key = "__home__" if "__home__" in groups else None
        if not home_key:
            for k, g in groups.items():
                if g["id"] == "home":
                    home_key = k
                    break
        if home_key:
            for lang in LOCALES:
                if lang == "en":
                    continue
                cand = f"/{lang}/"
                if (lang, cand) in by_path and by_path[(lang, cand)].get("indexable"):
                    groups[home_key]["paths"][lang] = cand
                    groups[home_key]["titles"][lang] = by_path[(lang, cand)].get("title") or ""

    # Attach translations via TRP + inventory presence
    for en_slug, g in list(groups.items()):
        key = en_slug if en_slug != "__home__" else ""
        translations = trp.get(key, {})
        # also try page id
        if not translations and g.get("enSlug"):
            translations = trp.get(g["enSlug"], {})
        for lang in LOCALES:
            if lang == "en":
                continue
            if lang in g["paths"]:
                continue
            translated = translations.get(lang)
            candidates = []
            if en_slug in ("", "__home__") or g["id"] == "home":
                candidates.append(f"/{lang}/")
            else:
                if translated:
                    candidates.append(f"/{lang}/{unquote(translated)}/")
                candidates.append(f"/{lang}/{en_slug}/")
            for cand in candidates:
                cand = normalize_path(cand)
                if (lang, cand) in by_path and by_path[(lang, cand)].get("indexable"):
                    g["paths"][lang] = cand
                    g["titles"][lang] = by_path[(lang, cand)].get("title") or ""
                    break

    # Attach remaining indexable locale URLs that weren't grouped — match via scraped hreflang or create singleton
    assigned = set()
    for g in groups.values():
        for loc, path in g["paths"].items():
            assigned.add((loc, path))

    orphans = []
    for (loc, path), row in by_path.items():
        if not row.get("indexable"):
            continue
        if (loc, path) in assigned:
            continue
        orphans.append(row)

    # Try hreflang from scraped JSON for orphans
    for row in orphans:
        loc, path = row["locale"], row["path"]
        md_path, json_path = raw_paths(loc, path)
        hrefs = {}
        if json_path.exists():
            doc = json.loads(json_path.read_text(encoding="utf-8"))
            hrefs = infer_hreflang(doc.get("html"), doc.get("links"))
            meta = doc.get("meta") or {}
            if meta.get("description"):
                pass
        en_path = hrefs.get("en")
        if en_path:
            en_slug = slug_key("en", en_path)
            g = groups.get(en_slug)
            if g:
                g["paths"][loc] = path
                g["titles"][loc] = row.get("title") or ""
                assigned.add((loc, path))
                continue
        # singleton group under locale-prefixed id
        sid = f"{loc}:{slug_key(loc, path)}"
        groups[sid] = {
            "id": sid,
            "enSlug": slug_key(loc, path) if loc == "en" else "",
            "type": classify(slug_key(loc, path)),
            "paths": {loc: path},
            "titles": {loc: row.get("title") or ""},
            "descriptions": {},
            "indexable": True,
        }
        assigned.add((loc, path))

    # Enrich from scraped raw
    pages = []
    for g in groups.values():
        bodies: dict[str, str] = {}
        images: list[str] = []
        for loc, path in g["paths"].items():
            md_path, json_path = raw_paths(loc, path)
            body_rel = None
            if md_path.exists():
                body_rel = str(md_path.relative_to(ROOT))
                bodies[loc] = body_rel
            if json_path.exists():
                doc = json.loads(json_path.read_text(encoding="utf-8"))
                meta = doc.get("meta") or {}
                if meta.get("description"):
                    g["descriptions"][loc] = meta["description"]
                if meta.get("title") and not g["titles"].get(loc):
                    g["titles"][loc] = meta["title"]
                if meta.get("h1"):
                    g.setdefault("h1s", {})[loc] = meta["h1"]
                if meta.get("ogImage"):
                    images.append(meta["ogImage"])
                # more hreflang merge
                hrefs = infer_hreflang(doc.get("html"), doc.get("links"))
                for hl, hp in hrefs.items():
                    if hl not in g["paths"] and (hl, hp) in by_path:
                        g["paths"][hl] = hp
                        g["titles"][hl] = by_path[(hl, hp)].get("title") or ""
            else:
                body_rel = body_rel
            _ = body_rel
        pages.append(
            {
                **g,
                "bodyPaths": bodies,
                "images": list(dict.fromkeys(images)),
            }
        )

    pages.sort(key=lambda p: (p["type"], p["id"]))

    # next-intl pathnames: logical keys -> per-locale path WITHOUT leading locale prefix
    # next-intl with as-needed expects pathnames like { '/about': { en: '/about-us', el: '/gia-emas' } }
    pathnames: dict[str, dict[str, str]] = {}
    for p in pages:
        key = "/" if p["id"] == "home" else f"/{p['id']}"
        entry: dict[str, str] = {}
        for loc, path in p["paths"].items():
            # strip locale prefix for next-intl
            parts = [x for x in path.strip("/").split("/") if x]
            if loc != "en" and parts and parts[0] == loc:
                parts = parts[1:]
            entry[loc] = "/" if not parts else "/" + "/".join(parts)
        # ensure all locales have something (fallback to en slug)
        en_fallback = entry.get("en") or (f"/{p['enSlug']}" if p.get("enSlug") else "/")
        for loc in LOCALES:
            entry.setdefault(loc, en_fallback)
        pathnames[key] = entry

    (ROOT / "content" / "pages.json").write_text(
        json.dumps({"count": len(pages), "pages": pages}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (ROOT / "content" / "pathnames.json").write_text(
        json.dumps(pathnames, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # Nav link map (page id / en slug -> paths)
    nav_links: dict[str, dict[str, str]] = {}
    for p in pages:
        nav_links[p["id"]] = dict(p["paths"])
        if p.get("enSlug"):
            nav_links[p["enSlug"]] = dict(p["paths"])
        if p["id"] == "home":
            nav_links["home"] = dict(p["paths"])
    (ROOT / "content" / "nav-links.json").write_text(
        json.dumps(nav_links, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # Locale switcher: every path -> full paths object
    switch_map: dict[str, dict[str, str]] = {}
    for p in pages:
        for loc, path in p["paths"].items():
            switch_map[normalize_path(path)] = dict(p["paths"])
    (ROOT / "content" / "locale-switch-map.json").write_text(
        json.dumps(switch_map, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    # Redirects for non-indexable
    redirects = []
    money_fallback = {
        "en": "/paros-rent-a-car/",
        "el": "/el/paros-enoikiasi-aftokinitou/",
    }
    for row in inv["urls"]:
        if row.get("indexable"):
            continue
        loc, path = path_from_url(row["url"])
        if "uicore-tb=" in row["url"]:
            dest = f"/{loc}/" if loc != "en" else "/"
        elif "airport-port-pickup" in row["url"]:
            dest = (
                "/el/limani-enoikiasis-aftokiniton-sto-aerodromio-tis-parou/"
                if loc == "el"
                else "/paros-airport-rent-a-car-port/"
                if loc == "en"
                else f"/{loc}/paros-airport-rent-a-car-port/"
            )
        else:
            dest = money_fallback.get(loc, money_fallback["en"])
        redirects.append(
            {
                "source": path if "?" not in row["url"] else row["url"].replace("https://antiparosrentacar.com", ""),
                "destination": dest,
                "permanent": True,
            }
        )

    # known yoast
    redirects.extend(
        [
            {"source": "/bike-fleet/", "destination": "/antiparos-scooter-rentals/", "permanent": True},
            {"source": "/scooter-fleet-2/", "destination": "/atvs-antiparos/", "permanent": True},
            {"source": "/scooter-fleet/", "destination": "/antiparos-scooter-rentals/", "permanent": True},
            {
                "source": "/paros-rent-a-car-with-aggelos-rentals/",
                "destination": "/rent-a-car-in-paros-with-aggelos-rentals/",
                "permanent": True,
            },
            {
                "source": "/antiparos-rent-a-car/",
                "destination": "/rent-a-car-antiparos-aggelos/",
                "permanent": True,
            },
            {"source": "/hotel-partners/", "destination": "/paros-rent-a-car/", "permanent": True},
            {"source": "/check/", "destination": "/", "permanent": True},
            {
                "source": "/locations-car-rental/",
                "destination": "/paros-rent-a-car/",
                "permanent": True,
            },
            {
                "source": "/locations-car-rental/antiparos-island/",
                "destination": "/rent-a-car-antiparos-aggelos/",
                "permanent": True,
            },
            {
                "source": "/locations-car-rental/paros-island/",
                "destination": "/paros-rent-a-car/",
                "permanent": True,
            },
        ]
    )

    (ROOT / "content" / "redirects.json").write_text(
        json.dumps(redirects, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"pages={len(pages)} pathnames={len(pathnames)} redirects={len(redirects)}")
    print("types", {t: sum(1 for p in pages if p["type"] == t) for t in sorted({p['type'] for p in pages})})
    # coverage
    covered = sum(len(p["paths"]) for p in pages)
    print(f"locale-path combos covered={covered} inventory indexable={inv['indexable_count']}")


if __name__ == "__main__":
    main()
