#!/usr/bin/env python3
"""Build url-inventory.json from the GSC/Yoast export paste and parse locale+path."""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse, unquote

# Full inventory from user paste (url, title, indexable)
RAW = r'''
https://antiparosrentacar.com/	Antiparos & Paros Rent a Car | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/piraeus-rent-a-car/	Piraeus rent a car | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/terms-conditions/	Terms & Conditions | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/bicycles-fleet/	Bicycle Rentals Paros & Antiparos | AGGELOS	Indexable
https://antiparosrentacar.com/rent-a-car-in-paros-with-aggelos-rentals/	Rent a Car in Paros with AGGELOS Rentals	Indexable
https://antiparosrentacar.com/fr/	Location Voiture Antiparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/contact/	Contact us | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/paros-island/	Paros Travel Guide | Best Beaches, Villages & Attractions	Indexable
https://antiparosrentacar.com/ultimate-travel-guide-to-paros-greece-updated-for-2025/	Paros Travel Guide [2026]: Beaches, Hotels etc.	Indexable
https://antiparosrentacar.com/de/	Autovermietung Antiparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/paros-port-parikia-rent-a-car/	Paros Port Rent a Car Parikia | Ferry Pickup | AGGELOS	Indexable
https://antiparosrentacar.com/paros-rent-a-car/	Rent a car and moto in Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/travel-tips-for-antiparos-and-paros/	Travel Tips for Antiparos & Paros | AGGELOS	Indexable
https://antiparosrentacar.com/sv/	Hyrbil Antiparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/antiparos-scooter-rentals/	Antiparos Rent a Scooter | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/nl/	Auto Huren Antiparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/car-fleet/	Our car fleet – Perfect for Paros and Antiparos Adventures	Indexable
https://antiparosrentacar.com/antiparos-island/	Antiparos Island Guide | Beaches & Attractions	Indexable
https://antiparosrentacar.com/rent-a-car-antiparos-aggelos/	Antiparos Rent a Car | Cars, ATVs & Scooters	Indexable
https://antiparosrentacar.com/it/	Autonoleggio Antiparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/suv-rentals-paros/	SUV Rentals Paros | Jeep & Mercedes | AGGELOS	Indexable
https://antiparosrentacar.com/el/	Ενοικίαση Αυτοκινήτου Αντίπαρος & Πάρος | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/tr/	Antiparos & Paros Araç Kiralama | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/about-us/	About AGGELOS Rentals	Indexable
https://antiparosrentacar.com/paros-airport-rent-a-car-port/	Paros Airport Rent a Car 2026 | PAS Pickup | AGGELOS	Indexable
https://antiparosrentacar.com/atvs-antiparos/	Antiparos ATV Rentals | Quad & Buggy Rentals – AGGELOS	Indexable
https://antiparosrentacar.com/ru/	Аренда авто Антипарос и Парос | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/es/	Alquiler de Coches Antíparos & Paros | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/cookie-policy-eu/	Cookie Policy (EU) | AGGELOS Rentals	Indexable
https://antiparosrentacar.com/pt/	Aluguer de Carros Antíparos & Paros | AGGELOS Rentals	Indexable
'''

LOCALES = {"en", "el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"}

# We'll load the full list from a companion file if present, else expand from stdin file
ROOT = Path(__file__).resolve().parent.parent
INVENTORY_TXT = ROOT / "content" / "_inventory_raw.txt"


def parse_url(url: str) -> dict:
    p = urlparse(url.strip())
    path = unquote(p.path or "/")
    if not path.endswith("/") and path != "/":
        path = path + "/"
    parts = [x for x in path.strip("/").split("/") if x]
    locale = "en"
    slug_parts = parts
    if parts and parts[0] in LOCALES - {"en"}:
        locale = parts[0]
        slug_parts = parts[1:]
    slug = "/".join(slug_parts)
    return {
        "locale": locale,
        "slug": slug,  # empty = homepage for that locale
        "path": path if path != "//" else "/",
    }


def main():
    # Prefer full raw file written separately
    if INVENTORY_TXT.exists():
        lines = INVENTORY_TXT.read_text(encoding="utf-8").splitlines()
    else:
        lines = [l for l in RAW.strip().splitlines() if l.strip()]

    entries = []
    seen = set()
    for line in lines:
        line = line.strip()
        if not line or not line.startswith("http"):
            continue
        # Formats: url \t ... OR url spaces title Indexable
        if "\t" in line:
            cols = [c.strip() for c in line.split("\t")]
            url = cols[0]
            title = cols[2] if len(cols) > 2 else cols[1]
            status = cols[-1] if cols else "Indexable"
            if "Non-Indexable" in line or "noindex" in line.lower():
                indexable = False
            else:
                indexable = "Indexable" in status and "Non-" not in status
        else:
            # space-separated ending with Indexable / Non-Indexable
            m = re.match(r"(https://\S+)\s+.*?(\S+)\s*$", line)
            if not m:
                continue
            url = m.group(1)
            rest = line[len(url) :].strip()
            indexable = "Non-Indexable" not in rest and "noindex" not in rest.lower()
            # title is between leading junk numbers and Indexable
            title = re.sub(r"^\d+\s+", "", rest)
            title = re.sub(r"\s+\d+\s+\d+\s+(Indexable|Non-Indexable).*$", "", title).strip()
            title = re.sub(r"\s+(Indexable|Non-Indexable).*$", "", title).strip()

        if "?" in url and "uicore-tb" in url:
            indexable = False

        parsed = parse_url(url.split("?")[0])
        key = (parsed["locale"], parsed["slug"])
        if key in seen:
            continue
        seen.add(key)
        entries.append(
            {
                "url": url.split("?")[0].rstrip("/") + ("/" if parsed["path"] != "/" or True else ""),
                "title": title,
                "indexable": indexable,
                **parsed,
            }
        )
        # normalize homepage urls
        if parsed["slug"] == "":
            entries[-1]["url"] = (
                f"https://antiparosrentacar.com/{parsed['locale']}/"
                if parsed["locale"] != "en"
                else "https://antiparosrentacar.com/"
            )
            entries[-1]["path"] = (
                f"/{parsed['locale']}/" if parsed["locale"] != "en" else "/"
            )

    out = ROOT / "content" / "url-inventory.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "gsc-yoast-export",
        "count": len(entries),
        "indexable": sum(1 for e in entries if e["indexable"]),
        "noindex": sum(1 for e in entries if not e["indexable"]),
        "entries": entries,
    }
    out.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {out} — {payload['count']} total, {payload['indexable']} indexable, {payload['noindex']} noindex")


if __name__ == "__main__":
    main()
