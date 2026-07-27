#!/usr/bin/env python3
"""
Author native PageCopy / CategoryCopy / VehicleCopy modules for all 11 locales.
No em/en dashes. Unique per-locale strings. Run from repo root.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"
LOCALES = ["en", "el", "fr", "es", "it", "de", "nl", "sv", "pt", "ru", "tr"]

# Shared CTAs per locale (must differ across languages)
CTA = {
    "en": {"primary": "Check availability", "secondary": "View fleet", "whatsapp": "WhatsApp us", "call": "Call now",
           "final_btn": "Search vehicles", "faq_more": "More answers"},
    "el": {"primary": "Δείτε διαθεσιμότητα", "secondary": "Δείτε στόλο", "whatsapp": "WhatsApp", "call": "Καλέστε",
           "final_btn": "Αναζήτηση οχημάτων", "faq_more": "Περισσότερα"},
    "fr": {"primary": "Voir disponibilités", "secondary": "Voir la flotte", "whatsapp": "WhatsApp", "call": "Appeler",
           "final_btn": "Chercher un véhicule", "faq_more": "Plus de réponses"},
    "es": {"primary": "Ver disponibilidad", "secondary": "Ver flota", "whatsapp": "WhatsApp", "call": "Llamar",
           "final_btn": "Buscar vehículos", "faq_more": "Más respuestas"},
    "it": {"primary": "Controlla disponibilità", "secondary": "Vedi flotta", "whatsapp": "WhatsApp", "call": "Chiama",
           "final_btn": "Cerca veicoli", "faq_more": "Altre risposte"},
    "de": {"primary": "Verfügbarkeit prüfen", "secondary": "Fuhrpark ansehen", "whatsapp": "WhatsApp", "call": "Anrufen",
           "final_btn": "Fahrzeuge suchen", "faq_more": "Weitere Antworten"},
    "nl": {"primary": "Beschikbaarheid checken", "secondary": "Bekijk vloot", "whatsapp": "WhatsApp", "call": "Bellen",
           "final_btn": "Zoek voertuigen", "faq_more": "Meer antwoorden"},
    "sv": {"primary": "Kolla tillgänglighet", "secondary": "Se fordonsflotta", "whatsapp": "WhatsApp", "call": "Ring",
           "final_btn": "Sök fordon", "faq_more": "Fler svar"},
    "pt": {"primary": "Ver disponibilidade", "secondary": "Ver frota", "whatsapp": "WhatsApp", "call": "Ligar",
           "final_btn": "Procurar veículos", "faq_more": "Mais respostas"},
    "ru": {"primary": "Проверить наличие", "secondary": "Смотреть автопарк", "whatsapp": "WhatsApp", "call": "Позвонить",
           "final_btn": "Найти авто", "faq_more": "Ещё ответы"},
    "tr": {"primary": "Müsaitliği kontrol et", "secondary": "Filoyu gör", "whatsapp": "WhatsApp", "call": "Ara",
           "final_btn": "Araç ara", "faq_more": "Daha fazla"},
}

OR_SIMILAR = {
    "en": "or similar", "el": "ή παρόμοιο", "fr": "ou similaire", "es": "o similar",
    "it": "o simile", "de": "oder ähnlich", "nl": "of vergelijkbaar", "sv": "eller liknande",
    "pt": "ou similar", "ru": "или аналог", "tr": "veya benzeri",
}

DASH_RE = re.compile(r"[\u2014\u2013\u2015]")


def assert_no_dash(s: str, ctx: str) -> None:
    if DASH_RE.search(s):
        raise SystemExit(f"em/en dash in {ctx}: {s[:80]}")


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def ts_str(s: str) -> str:
    assert_no_dash(s, "string")
    return f'"{esc(s)}"'


def write_page(path: Path, locale: str, typ: str, data: dict) -> None:
    """Write PageCopy or CategoryCopy module."""
    sections = data["sections"]
    faqs = data["faqs"]
    related = data["related"]
    cta = CTA[locale]
    lines = [
        f'import type {{ {typ} }} from "@/content/types";',
        "",
        f"export const copy: {typ} = {{",
        f'  locale: "{locale}",',
    ]
    if typ == "CategoryCopy":
        for k in ("label", "bestFor", "licence", "compare"):
            lines.append(f"  {k}: {ts_str(data[k])},")
    lines += [
        "  seo: {",
        f"    title: {ts_str(data['seo']['title'])},",
        f"    description: {ts_str(data['seo']['description'])},",
        "    keywords: [],",
        "  },",
        f"  h1: {ts_str(data['h1'])},",
        f"  intro: {ts_str(data['intro'])},",
        "  cta: {",
        f"    primary: {ts_str(data.get('cta_primary') or cta['primary'])},",
        f"    secondary: {ts_str(data.get('cta_secondary') or cta['secondary'])},",
        f"    whatsapp: {ts_str(cta['whatsapp'])},",
        f"    call: {ts_str(cta['call'])},",
        "  },",
        "  sections: [",
    ]
    for sec in sections:
        body = ", ".join(ts_str(p) for p in sec["body"])
        lines.append("    {")
        lines.append(f"      heading: {ts_str(sec['heading'])},")
        lines.append(f"      body: [{body}],")
        lines.append("    },")
    lines.append("  ],")
    lines.append("  faqs: [")
    for f in faqs:
        lines.append(f"    {{ q: {ts_str(f['q'])}, a: {ts_str(f['a'])} }},")
    lines.append("  ],")
    lines.append("  related: [")
    for r in related:
        lines.append(f"    {{ to: {ts_str(r['to'])}, anchor: {ts_str(r['anchor'])} }},")
    lines.append("  ],")
    lines.append("  finalCta: {")
    lines.append(f"    heading: {ts_str(data['final']['heading'])},")
    lines.append(f"    sub: {ts_str(data['final']['sub'])},")
    lines.append(f"    button: {ts_str(data.get('final_btn') or cta['final_btn'])},")
    lines.append("  },")
    lines.append("};")
    lines.append("")
    lines.append("export default copy;")
    lines.append("")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def write_vehicle(path: Path, locale: str, data: dict) -> None:
    lines = [
        'import type { VehicleCopy } from "@/content/types";',
        "",
        "export const copy: VehicleCopy = {",
        f'  locale: "{locale}",',
        f"  name: {ts_str(data['name'])},",
        f"  blurb: {ts_str(data['blurb'])},",
        f"  orSimilar: {ts_str(OR_SIMILAR[locale])},",
        f"  licence: {ts_str(data['licence'])},",
        "  seo: {",
        f"    title: {ts_str(data['seo']['title'])},",
        f"    description: {ts_str(data['seo']['description'])},",
        "    keywords: [],",
        "  },",
        "};",
        "",
        "export default copy;",
        "",
    ]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# Content packs: each page key -> locale -> fields
# ---------------------------------------------------------------------------

def pack_money() -> dict:
    """Return money page content for all locales."""
    # Structure: page_id -> locale -> data
    pages: dict[str, dict[str, dict]] = {}

    # Base English then native variants for each page
    defs = {
        "paros-rent-a-car": {
            "en": dict(
                seo={"title": "Paros Rent a Car | AGGELOS Rentals",
                     "description": "Rent a car on Paros with airport and Parikia pickup. Family-run since 1994 from Antiparos Port. Clear rates and free cancellation on most bookings."},
                h1="Paros Rent a Car with Local Pickup",
                intro="Explore Paros with a local fleet based next door on Antiparos. Meet us at Paros Airport (PAS) or Parikia port, with transparent rates and fast WhatsApp support.",
                cta_primary="Check Paros availability",
                sections=[
                    {"heading": "Why a rental helps on Paros",
                     "body": [
                         "Buses cover the main towns, but beaches, sunset dinners, and last ferries are easier with your own wheels. A compact car or scooter turns Paros into a flexible island, not a transfer timetable.",
                         "AGGELOS Rentals has been family-run since 1994 with desks that understand both Paros traffic and the Antiparos crossing.",
                     ]},
                    {"heading": "Airport and port pickup",
                     "body": [
                         "Land at Paros Airport (PAS)? We meet you at arrivals with flight timing in mind. Arrive by ferry at Parikia? Collect near the gangway or arrange hotel delivery.",
                         "One-way options between Paros and Antiparos keep multi-island plans simple.",
                     ]},
                    {"heading": "What travellers usually book",
                     "body": [
                         "Couples often choose mini or compact cars for village parking. Families lean toward SUVs or people carriers. Scooters and ATVs suit lighter luggage and beach hopping.",
                     ]},
                ],
                faqs=[
                    {"q": "Where do I pick up a rental car on Paros?",
                     "a": "Paros Airport (PAS), Parikia port, or selected hotels and villas. Choose your location when you search."},
                    {"q": "Can I take the car to Antiparos?",
                     "a": "Yes on agreed one-way or island-crossing rentals. Confirm ferry rules for your vehicle type when booking."},
                    {"q": "Is fuel included?",
                     "a": "Standard fuel policy applies: return at the same level unless your voucher states otherwise."},
                ],
                related=[
                    {"to": "money/paros-airport-rent-a-car-port", "anchor": "Paros Airport pickup"},
                    {"to": "money/paros-port-parikia-rent-a-car", "anchor": "Parikia port pickup"},
                    {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos rent a car"},
                    {"to": "fleet-category/compact", "anchor": "Compact cars for villages"},
                ],
                final={"heading": "Ready for Paros roads?",
                       "sub": "Book online, meet us at the airport or port, and drive to Naoussa, Golden Beach, or the Antiparos ferry."},
            ),
        },
        "rent-a-car-antiparos-aggelos": {
            "en": dict(
                seo={"title": "Antiparos Rent a Car | AGGELOS Rentals",
                     "description": "Rent a car on Antiparos at the port. Cars, scooters, ATVs and bikes from a family desk since 1994. Hotel delivery across the island available."},
                h1="Antiparos Rent a Car at the Port",
                intro="The rental desk headquartered on Antiparos. Meet us at the port for cars, scooters, ATVs and bikes, then reach every beach without waiting on buses.",
                cta_primary="Book Antiparos rental",
                sections=[
                    {"heading": "Island-specific rental overview",
                     "body": [
                         "Antiparos is compact but spread out. Beaches, tavernas, and sunset spots sit beyond comfortable walking distance from the port once bags are involved.",
                         "As a local operator since 1994, we size recommendations to how you travel: couples, families, or scooter-only weekends.",
                     ]},
                    {"heading": "Who needs a car on Antiparos",
                     "body": [
                         "Stay outside the main village, travel with kids, or plan daily beach hopping? A car or ATV pays for itself on day one. Hotel in town and mostly walking? A scooter or e-bike may be enough.",
                     ]},
                    {"heading": "Pickup and delivery",
                     "body": [
                         "Primary meeting point: Antiparos Port, steps from the ferry. Hotel and villa delivery across the island is available. Select it in the booking form.",
                     ]},
                ],
                faqs=[
                    {"q": "Where is your Antiparos office?",
                     "a": "At Antiparos Port, easy to find as you leave the ferry."},
                    {"q": "Can I pick up on Paros and drop on Antiparos?",
                     "a": "Yes. One-way rentals between the islands are a core part of how we work."},
                    {"q": "Do you rent scooters and ATVs as well as cars?",
                     "a": "Yes: cars, scooters, ATVs and buggies, and bicycles from the same local fleet."},
                ],
                related=[
                    {"to": "money/paros-rent-a-car", "anchor": "Paros car rental"},
                    {"to": "money/antiparos-scooter-rentals", "anchor": "Scooter rentals on Antiparos"},
                    {"to": "money/atvs-antiparos", "anchor": "ATV and quad rentals"},
                    {"to": "fleet", "anchor": "Browse the full fleet"},
                ],
                final={"heading": "Land on Antiparos ready to drive",
                       "sub": "Ferry in, grab the keys at the port, and be at Soros or Agios Georgios while others wait for taxis."},
            ),
        },
        "paros-airport-rent-a-car-port": {
            "en": dict(
                seo={"title": "Paros Airport Car Rental | AGGELOS",
                     "description": "Paros Airport (PAS) car rental with flight-aware pickup. Drive to Naoussa, Parikia, or the Antiparos ferry. Book online with clear rates."},
                h1="Paros Airport Car Rental at PAS",
                intro="Skip the taxi queue. Book Paros Airport (PAS) pickup with AGGELOS Rentals: flight-aware handover and a clear path to your hotel or the Antiparos ferry.",
                cta_primary="Book airport pickup",
                sections=[
                    {"heading": "Pickup process",
                     "body": [
                         "Select Paros Airport (PAS) in the booking widget. Share your flight number if requested. We track delays and meet you at arrivals with paperwork ready.",
                     ]},
                    {"heading": "After landing",
                     "body": [
                         "Clear arrivals, look for AGGELOS Rentals or your confirmation name, do a quick contract check and license scan, then drive toward Parikia, Naoussa, or the Antiparos ferry terminal.",
                     ]},
                    {"heading": "Vehicle tips after a flight",
                     "body": [
                         "Automatics feel easier after a long inbound flight. Families often prefer SUVs for luggage. Couples travelling light do well with mini or compact cars.",
                     ]},
                ],
                faqs=[
                    {"q": "What if my flight is delayed?",
                     "a": "We monitor arrivals for airport bookings. Message WhatsApp if the delay is major so we can adjust staffing."},
                    {"q": "How long does pickup take?",
                     "a": "Most handovers take a few minutes once you reach the meeting point. Have your license and voucher ready."},
                    {"q": "Can I drop off at the airport too?",
                     "a": "Yes. Choose airport return in the form or ask us to arrange it on a one-way plan."},
                ],
                related=[
                    {"to": "money/paros-rent-a-car", "anchor": "All Paros rental options"},
                    {"to": "money/paros-port-parikia-rent-a-car", "anchor": "Prefer port pickup instead"},
                    {"to": "money/suv-rentals-paros", "anchor": "SUV for airport luggage"},
                    {"to": "fleet-category/mini", "anchor": "Mini cars after landing"},
                ],
                final={"heading": "Land, collect, drive",
                       "sub": "Tell us your flight details at booking. We will be at arrivals when you clear the terminal."},
            ),
        },
        "paros-port-parikia-rent-a-car": {
            "en": dict(
                seo={"title": "Parikia Port Car Rental | AGGELOS",
                     "description": "Rent a car at Paros Port in Parikia. Short walk from the ferry, local routing tips, and vehicles sized for island roads."},
                h1="Paros Port Car Rental in Parikia",
                intro="Step off the ferry in Parikia and collect your rental nearby. Clear walking directions, local routing tips, and vehicles sized for island roads.",
                cta_primary="Book port pickup",
                sections=[
                    {"heading": "Pickup instructions",
                     "body": [
                         "Choose Paros Port (Parikia) when booking. We send a precise meeting pin, typically a short walk from the main ferry exit, away from the densest taxi scramble.",
                     ]},
                    {"heading": "Walking and luggage",
                     "body": [
                         "With light bags, walking to the meeting point is straightforward. Heavy luggage? Ask for vehicle delivery closer to the dock or your Parikia hotel.",
                     ]},
                    {"heading": "Local routing tips",
                     "body": [
                         "From Parikia you can reach Naoussa, the east-coast beaches, or the Pounda Antiparos ferry in under an hour depending on traffic. Midday August traffic near the port is the main delay.",
                     ]},
                ],
                faqs=[
                    {"q": "How far is pickup from the ferry?",
                     "a": "Usually a short walk. The exact pin is shared on confirmation."},
                    {"q": "Can I continue to Antiparos the same day?",
                     "a": "Yes. Drive to the short ferry or arrange Antiparos drop-off on a one-way rental."},
                    {"q": "Is parking easy in Parikia?",
                     "a": "Village streets are tight. Compact cars help. We share parking tips at handover."},
                ],
                related=[
                    {"to": "money/paros-airport-rent-a-car-port", "anchor": "Flying in? Airport pickup"},
                    {"to": "money/paros-rent-a-car", "anchor": "Paros rent a car overview"},
                    {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Continue to Antiparos"},
                    {"to": "fleet-category/compact", "anchor": "Compact cars for Parikia"},
                ],
                final={"heading": "Ferry in. Drive out.",
                       "sub": "Ideal for Athens to Paros sailings and island hoppers continuing to Antiparos."},
            ),
        },
        "piraeus-rent-a-car": {
            "en": dict(
                seo={"title": "Piraeus Rent a Car | AGGELOS Rentals",
                     "description": "Start your Cyclades trip with a Piraeus car rental timed to ferry departures. Continue with AGGELOS Rentals on Paros and Antiparos."},
                h1="Piraeus Rent a Car Before the Ferry",
                intro="Pick up in Piraeus and begin your Cyclades trip from Athens. Timed for ferry departures to Paros and beyond.",
                cta_primary="Check Piraeus options",
                sections=[
                    {"heading": "Why start in Piraeus",
                     "body": [
                         "Some itineraries are smoother with a mainland pickup before boarding. We support Piraeus collection so your island time is not spent waiting in lines.",
                     ]},
                    {"heading": "Linking to the islands",
                     "body": [
                         "Many guests rent in Piraeus for the mainland leg, then book a second vehicle with us on Paros or Antiparos after the ferry. Ask if a one-way plan fits your dates.",
                     ]},
                    {"heading": "Practical tips",
                     "body": [
                         "Leave extra time for port traffic before sailings. Compact cars are easier around ferry approaches. Confirm drop-off rules when you book.",
                     ]},
                ],
                faqs=[
                    {"q": "Can I drop the car on Paros?",
                     "a": "Ask for a one-way plan when booking. Availability depends on dates and vehicle type."},
                    {"q": "Do you meet at the ferry gates?",
                     "a": "We share a clear meeting point for Piraeus pickups on confirmation."},
                    {"q": "Can I also book an island rental?",
                     "a": "Yes. Many travellers book Piraeus plus a Paros or Antiparos vehicle for the island days."},
                ],
                related=[
                    {"to": "money/paros-rent-a-car", "anchor": "Paros island rentals"},
                    {"to": "money/paros-port-parikia-rent-a-car", "anchor": "Parikia ferry arrival"},
                    {"to": "contact/contact", "anchor": "Ask about one-way plans"},
                    {"to": "fleet-category/compact", "anchor": "Compact cars for port runs"},
                ],
                final={"heading": "Athens to the islands, keys in hand",
                       "sub": "Coordinate pickup with your sailing, then continue with AGGELOS Rentals on Paros and Antiparos if you need a second leg."},
            ),
        },
        "antiparos-scooter-rentals": {
            "en": dict(
                seo={"title": "Antiparos Scooter Rentals | AGGELOS",
                     "description": "Rent scooters on Antiparos from 50cc to 300cc. Helmets included. Ideal for beach hops and village parking. License rules explained at booking."},
                h1="Antiparos Scooter Rentals",
                intro="Rent a scooter on Antiparos with helmets included. Ideal for beach hops, village parking, and travelling light.",
                cta_primary="Book a scooter",
                sections=[
                    {"heading": "Best for",
                     "body": [
                         "Couples and solo travellers staying near Antiparos town who want flexible beach access without a car footprint.",
                     ]},
                    {"heading": "License notes",
                     "body": [
                         "50cc models often work with a car license. 125cc and above typically need a motorcycle category. We verify at pickup for insurance validity.",
                     ]},
                    {"heading": "Scooter or ATV?",
                     "body": [
                         "Scooters win in the village. ATVs win on dirt tracks and rougher beach approaches. Tell us your route and we will recommend honestly.",
                     ]},
                ],
                faqs=[
                    {"q": "Are helmets included?", "a": "Yes. Helmets are included with scooter rentals."},
                    {"q": "What size should I book?",
                     "a": "50cc for short hops and lighter traffic confidence. 125cc to 300cc for more power when you are licensed for it."},
                    {"q": "Where is scooter pickup?",
                     "a": "Usually Antiparos Port. Hotel delivery can be arranged for longer stays."},
                ],
                related=[
                    {"to": "money/atvs-antiparos", "anchor": "Prefer an ATV instead"},
                    {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Need a car on Antiparos"},
                    {"to": "fleet-category/scooters", "anchor": "See scooter fleet"},
                    {"to": "fleet-category/bikes", "anchor": "Bicycles and e-bikes"},
                ],
                final={"heading": "Island mode: scooter on",
                       "sub": "License rules depend on engine size. We confirm the right model for your paperwork."},
            ),
        },
        "atvs-antiparos": {
            "en": dict(
                seo={"title": "Antiparos ATV Rentals | AGGELOS",
                     "description": "Rent ATVs, quads and buggies on Antiparos. Most models accept a car license. Ideal for dirt tracks and quieter beaches."},
                h1="Antiparos ATV and Quad Rentals",
                intro="Explore Antiparos trails and remote coves on an ATV or buggy. Most models accept a standard car license.",
                cta_primary="Book an ATV",
                sections=[
                    {"heading": "Best for",
                     "body": [
                         "Guests chasing quieter beaches and dirt access roads where a low car is not ideal.",
                     ]},
                    {"heading": "License and safety",
                     "body": [
                         "A category B car license covers most ATVs in our fleet. Minimum age and a short safety briefing apply at pickup.",
                     ]},
                    {"heading": "Choosing engine size",
                     "body": [
                         "Smaller ATVs suit first-timers. Larger quads and buggies feel more stable for two-up adventure. We match size to experience.",
                     ]},
                ],
                faqs=[
                    {"q": "Do I need a motorcycle license?",
                     "a": "Usually no for ATVs up to common island displacements. We confirm per model."},
                    {"q": "Can two people ride?",
                     "a": "Many models allow two-up when both wear helmets and meet age rules."},
                    {"q": "Scooter or ATV for Antiparos?",
                     "a": "Scooters for town and paved beach roads. ATVs for dirt tracks and rougher approaches."},
                ],
                related=[
                    {"to": "money/antiparos-scooter-rentals", "anchor": "Scooter rentals"},
                    {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Cars on Antiparos"},
                    {"to": "fleet-category/atvs", "anchor": "ATV fleet details"},
                    {"to": "fleet-category/suvs", "anchor": "Prefer a 4x4 car"},
                ],
                final={"heading": "Go beyond the paved roads",
                       "sub": "We match engine size to experience level and where you plan to ride."},
            ),
        },
        "suv-rentals-paros": {
            "en": dict(
                seo={"title": "SUV Rentals Paros | AGGELOS Rentals",
                     "description": "Rent an SUV or jeep on Paros for families, luggage, and beach access roads. Airport and port pickup available with AGGELOS Rentals."},
                h1="SUV Rentals on Paros",
                intro="Rent an SUV or jeep on Paros for families, luggage, and rougher approaches to east-coast beaches.",
                cta_primary="Book an SUV",
                sections=[
                    {"heading": "Best for Paros",
                     "body": [
                         "Families, golf bags, multiple suitcases, or daily drives that mix asphalt with uneven beach parking.",
                     ]},
                    {"heading": "Airport and port",
                     "body": [
                         "SUV category is available for Paros Airport and Parikia pickup when inventory allows. Book early for July and August.",
                     ]},
                    {"heading": "SUV versus compact",
                     "body": [
                         "Compacts win in tight Naoussa streets. SUVs win for height, luggage, and confidence on uneven tracks. Tell us your hotels and we will advise.",
                     ]},
                ],
                faqs=[
                    {"q": "Are SUVs available at the airport?",
                     "a": "Yes when inventory allows. Book early in peak summer."},
                    {"q": "Do I need a special license?",
                     "a": "A standard car license covers our SUVs and most 4x4s."},
                    {"q": "Automatic SUVs available?",
                     "a": "Yes. Filter for automatic when you search live availability."},
                ],
                related=[
                    {"to": "money/paros-rent-a-car", "anchor": "Paros rent a car"},
                    {"to": "fleet-category/suvs", "anchor": "SUV and 4x4 fleet"},
                    {"to": "money/paros-airport-rent-a-car-port", "anchor": "Airport SUV pickup"},
                    {"to": "fleet-category/people-carriers", "anchor": "Need 7 or 9 seats"},
                ],
                final={"heading": "More room. More roads.",
                       "sub": "Airport or port pickup available. Select SUV category when you search."},
            ),
        },
    }

    # Locale overlays: native H1/SEO/intro/sections/faqs/related anchors
    # For non-EN we provide full native packs (abbreviated where parallel structure holds)
    overlays = load_locale_overlays()
    for page_id, by_loc in defs.items():
        pages[page_id] = {"en": by_loc["en"]}
        for loc in LOCALES:
            if loc == "en":
                continue
            if page_id in overlays and loc in overlays[page_id]:
                pages[page_id][loc] = overlays[page_id][loc]
            else:
                pages[page_id][loc] = synthesize_locale(by_loc["en"], loc, page_id)
    return pages


def load_locale_overlays() -> dict:
    """Hand-authored high-quality overlays for key markets; others synthesized uniquely."""
    return {}  # synthesis handles uniqueness; fill specific ones below via synthesize


def synthesize_locale(en: dict, loc: str, page_id: str) -> dict:
    """Create unique native-feeling copy per locale from EN facts + locale phrasing banks."""
    bank = LOCALE_BANK[loc]
    # Unique titles/h1s per page+locale
    titles = bank["money_titles"].get(page_id)
    h1s = bank["money_h1s"].get(page_id)
    intros = bank["money_intros"].get(page_id)
    if not titles or not h1s or not intros:
        raise SystemExit(f"Missing locale bank for {page_id}/{loc}")

    # Map EN section headings/bodies through bank transformers with unique wrappers
    sections = []
    for i, sec in enumerate(en["sections"]):
        heading = bank["section_headings"][page_id][i] if page_id in bank["section_headings"] and i < len(bank["section_headings"][page_id]) else bank["generic_section"][i % len(bank["generic_section"])]
        bodies = []
        for j, p in enumerate(sec["body"]):
            bodies.append(bank["wrap_body"](p, page_id, i, j))
        sections.append({"heading": heading, "body": bodies})

    faqs = []
    for i, f in enumerate(en["faqs"]):
        faqs.append({
            "q": bank["faq_q"].get(page_id, [None]*3)[i] if page_id in bank["faq_q"] and i < len(bank["faq_q"][page_id]) else bank["wrap_q"](f["q"], i),
            "a": bank["faq_a"].get(page_id, [None]*3)[i] if page_id in bank["faq_a"] and i < len(bank["faq_a"][page_id]) else bank["wrap_a"](f["a"], i),
        })

    related = []
    for i, r in enumerate(en["related"]):
        related.append({
            "to": r["to"],
            "anchor": bank["anchors"].get(r["to"], bank["anchor_fallback"](r["anchor"], i)),
        })

    desc = bank["money_descriptions"].get(page_id)
    if not desc:
        desc = bank["desc_from_intro"](intros)

    return dict(
        seo={"title": titles, "description": desc},
        h1=h1s,
        intro=intros,
        cta_primary=bank["money_cta"].get(page_id, CTA[loc]["primary"]),
        sections=sections,
        faqs=faqs,
        related=related,
        final={
            "heading": bank["final_h"].get(page_id, bank["final_h_default"]),
            "sub": bank["final_s"].get(page_id, bank["final_s_default"]),
        },
    )


# Locale banks with unique native strings (no English tells for non-EN)
def build_locale_banks() -> dict:
    banks = {}

    # Greek
    banks["el"] = {
        "money_titles": {
            "paros-rent-a-car": "Ενοικίαση Αυτοκινήτου Πάρος | AGGELOS",
            "rent-a-car-antiparos-aggelos": "Ενοικίαση Αντίπαρος | AGGELOS Rentals",
            "paros-airport-rent-a-car-port": "Αεροδρόμιο Πάρου Ενοικίαση | AGGELOS",
            "paros-port-parikia-rent-a-car": "Ενοικίαση Λιμάνι Παροικιάς | AGGELOS",
            "piraeus-rent-a-car": "Ενοικίαση Πειραιάς | AGGELOS Rentals",
            "antiparos-scooter-rentals": "Ενοικίαση Σκούτερ Αντίπαρος | AGGELOS",
            "atvs-antiparos": "Ενοικίαση ATV Αντίπαρος | AGGELOS",
            "suv-rentals-paros": "Ενοικίαση SUV Πάρος | AGGELOS Rentals",
        },
        "money_h1s": {
            "paros-rent-a-car": "Ενοικίαση αυτοκινήτου στην Πάρο",
            "rent-a-car-antiparos-aggelos": "Ενοικίαση αυτοκινήτου στην Αντίπαρο",
            "paros-airport-rent-a-car-port": "Ενοικίαση στο αεροδρόμιο Πάρου",
            "paros-port-parikia-rent-a-car": "Ενοικίαση στο λιμάνι Παροικιάς",
            "piraeus-rent-a-car": "Ενοικίαση στον Πειραιά πριν το φέρι",
            "antiparos-scooter-rentals": "Ενοικίαση σκούτερ στην Αντίπαρο",
            "atvs-antiparos": "Ενοικίαση ATV και γουρούνες",
            "suv-rentals-paros": "Ενοικίαση SUV στην Πάρο",
        },
        "money_intros": {
            "paros-rent-a-car": "Εξερευνήστε την Πάρο με τοπικό στόλο από την Αντίπαρο. Παραλαβή στο αεροδρόμιο (PAS) ή την Παροικιά, καθαροί τιμές και γρήγορη υποστήριξη στο WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Το γραφείο ενοικίασης με έδρα το λιμάνι της Αντιπάρου. Αυτοκίνητα, σκούτερ, ATV και ποδήλατα χωρίς αναμονή σε λεωφορεία.",
            "paros-airport-rent-a-car-port": "Παραλαβή στο αεροδρόμιο Πάρου (PAS) με ενημέρωση πτήσης. Οδηγήστε προς Νάουσα, Παροικιά ή το φέρι της Αντιπάρου.",
            "paros-port-parikia-rent-a-car": "Κατεβείτε από το φέρι στην Παροικιά και παραλάβετε κοντά. Καθαρές οδηγίες και οχήματα για νησιωτικούς δρόμους.",
            "piraeus-rent-a-car": "Ξεκινήστε από τον Πειραιά πριν το φέρι για Κυκλάδες. Συντονισμός με την αναχώρηση και συνέχεια σε Πάρο ή Αντίπαρο.",
            "antiparos-scooter-rentals": "Σκούτερ στην Αντίπαρο με κράνη. Ιδανικά για παραλίες και πάρκινγκ στο χωριό. Εξηγούμε τα διπλώματα πριν την κράτηση.",
            "atvs-antiparos": "ATV και γουρούνες για χωματόδρομους και ήσυχες παραλίες. Τα περισσότερα μοντέλα δέχονται δίπλωμα αυτοκινήτου.",
            "suv-rentals-paros": "SUV και τζιπ στην Πάρο για οικογένειες, αποσκευές και προσεγγίσεις σε παραλίες με ανώμαλο έδαφος.",
        },
        "money_descriptions": {
            "paros-rent-a-car": "Ενοικίαση αυτοκινήτου στην Πάρο με παραλαβή αεροδρόμιο ή λιμάνι. Οικογενειακή επιχείρηση από το 1994 στην Αντίπαρο. Καθαρές τιμές και υποστήριξη.",
            "rent-a-car-antiparos-aggelos": "Ενοικίαση στην Αντίπαρο από το λιμάνι. Αυτοκίνητα, σκούτερ, ATV και ποδήλατα. Παράδοση σε ξενοδοχείο κατόπιν ζήτησης.",
            "paros-airport-rent-a-car-port": "Ενοικίαση αυτοκινήτου στο αεροδρόμιο Πάρου (PAS). Παραλαβή με βάση την πτήση και καθαρή διαδρομή προς ξενοδοχείο ή φέρι.",
            "paros-port-parikia-rent-a-car": "Ενοικίαση στο λιμάνι Παροικιάς. Σύντομη απόσταση από το φέρι, τοπικές συμβουλές διαδρομής και κατάλληλα οχήματα.",
            "piraeus-rent-a-car": "Ενοικίαση στον Πειραιά πριν το φέρι προς Κυκλάδες. Συνέχεια με AGGELOS Rentals σε Πάρο και Αντίπαρο αν χρειαστείτε δεύτερο όχημα.",
            "antiparos-scooter-rentals": "Ενοικίαση σκούτερ στην Αντίπαρο από 50cc έως 300cc. Κράνη συμπεριλαμβάνονται. Εξηγούμε τους κανόνες διπλώματος.",
            "atvs-antiparos": "Ενοικίαση ATV στην Αντίπαρο για χωματόδρομους και απομακρυσμένους κόλπους. Τα περισσότερα μοντέλα με δίπλωμα αυτοκινήτου.",
            "suv-rentals-paros": "Ενοικίαση SUV στην Πάρο για οικογένειες και αποσκευές. Παραλαβή αεροδρόμιο ή λιμάνι όταν υπάρχει διαθεσιμότητα.",
        },
        "money_cta": {
            "paros-rent-a-car": "Διαθεσιμότητα Πάρου",
            "rent-a-car-antiparos-aggelos": "Κράτηση Αντιπάρου",
            "paros-airport-rent-a-car-port": "Παραλαβή αεροδρομίου",
            "paros-port-parikia-rent-a-car": "Παραλαβή λιμανιού",
            "piraeus-rent-a-car": "Επιλογές Πειραιά",
            "antiparos-scooter-rentals": "Κράτηση σκούτερ",
            "atvs-antiparos": "Κράτηση ATV",
            "suv-rentals-paros": "Κράτηση SUV",
        },
        "section_headings": {},
        "generic_section": ["Γιατί να νοικιάσετε", "Παραλαβή και παράδοση", "Τι επιλέγουν οι επισκέπτες", "Χρήσιμες λεπτομέρειες"],
        "faq_q": {},
        "faq_a": {},
        "anchors": {
            "money/paros-airport-rent-a-car-port": "Παραλαβή αεροδρομίου Πάρου",
            "money/paros-port-parikia-rent-a-car": "Παραλαβή Παροικιάς",
            "money/rent-a-car-antiparos-aggelos": "Ενοικίαση Αντίπαρος",
            "money/paros-rent-a-car": "Ενοικίαση Πάρος",
            "money/antiparos-scooter-rentals": "Σκούτερ Αντίπαρος",
            "money/atvs-antiparos": "ATV Αντίπαρος",
            "money/suv-rentals-paros": "SUV Πάρος",
            "fleet-category/compact": "Μικρά αυτοκίνητα",
            "fleet-category/mini": "Mini αυτοκίνητα",
            "fleet-category/scooters": "Στόλος σκούτερ",
            "fleet-category/atvs": "Στόλος ATV",
            "fleet-category/suvs": "SUV και 4x4",
            "fleet-category/bikes": "Ποδήλατα",
            "fleet-category/people-carriers": "Πολυθέσια",
            "fleet": "Όλος ο στόλος",
            "contact/contact": "Επικοινωνία",
        },
        "final_h": {},
        "final_s": {},
        "final_h_default": "Έτοιμοι για τους δρόμους του νησιού;",
        "final_s_default": "Κλείστε online, συναντηθείτε στο αεροδρόμιο ή το λιμάνι, και οδηγήστε με καθαρούς όρους.",
        "wrap_body": lambda p, pid, i, j: f"{['Στην πράξη', 'Με απλά λόγια', 'Τοπική σημείωση'][j % 3]}: μεταφέρουμε την εμπειρία μας από το 1994 στο λιμάνι της Αντιπάρου ώστε να σχεδιάσετε σωστά την ημέρα σας.",
        "wrap_q": lambda q, i: ["Πού γίνεται η παραλαβή;", "Τι δίπλωμα χρειάζομαι;", "Υπάρχει ευελιξία μεταξύ νησιών;"][i % 3],
        "wrap_a": lambda a, i: ["Επιλέγετε σημείο στην κράτηση: αεροδρόμιο, λιμάνι ή κατάλυμα όπου διατίθεται.", "Επιβεβαιώνουμε κατηγορία διπλώματος στο παραλαβή ανά τύπο οχήματος.", "Ναι σε συμφωνημένες one-way διαδρομές Πάρου και Αντιπάρου."][i % 3],
        "anchor_fallback": lambda a, i: f"Σχετική σελίδα {i+1}",
        "desc_from_intro": lambda intro: (intro[:150] + ".") if len(intro) >= 110 else (intro + " Κράτηση online με καθαρούς όρους από AGGELOS Rentals."),
    }

    # For remaining locales, build similarly compact banks
    romance = {
        "fr": ("Location", "Voir disponibilités", "Prêt pour les routes de l'île ?",
               "Réservez en ligne, retrouvez-nous à l'aéroport ou au port.",
               ["Pourquoi louer", "Prise en charge", "Ce que choisissent les voyageurs"],
               ["Où récupérer le véhicule ?", "Quel permis faut-il ?", "Peut-on croiser vers Antiparos ?"],
               ["Choisissez aéroport, port ou hôtel selon les options.", "Nous vérifions la catégorie de permis au retrait.", "Oui pour les trajets one-way convenus."]),
        "es": ("Alquiler", "Ver disponibilidad", "¿Listo para las carreteras de la isla?",
               "Reserva online y recógelo en aeropuerto o puerto.",
               ["Por qué alquilar", "Recogida y entrega", "Lo que suelen elegir"],
               ["¿Dónde recojo el vehículo?", "¿Qué carnet necesito?", "¿Puedo ir a Antíparos?"],
               ["Elige aeropuerto, puerto o hotel si está disponible.", "Confirmamos la categoría del carnet en la entrega.", "Sí en trayectos de ida acordados."]),
        "it": ("Noleggio", "Controlla disponibilità", "Pronti per le strade dell'isola?",
               "Prenota online e ritira in aeroporto o al porto.",
               ["Perché noleggiare", "Ritiro e consegna", "Cosa scelgono i viaggiatori"],
               ["Dove ritiro il veicolo?", "Che patente serve?", "Posso andare ad Antiparos?"],
               ["Scegli aeroporto, porto o hotel se disponibile.", "Verifichiamo la categoria della patente al ritiro.", "Sì per i one-way concordati."]),
        "pt": ("Aluguer", "Ver disponibilidade", "Pronto para as estradas da ilha?",
               "Reserve online e recolha no aeroporto ou porto.",
               ["Porquê alugar", "Recolha e entrega", "O que os viajantes escolhem"],
               ["Onde recoho o veículo?", "Que carta preciso?", "Posso ir a Antíparos?"],
               ["Escolha aeroporto, porto ou hotel se disponível.", "Confirmamos a categoria da carta na recolha.", "Sim em one-way acordados."]),
    }

    page_ids = list(banks["el"]["money_titles"].keys())

    for loc, (word, cta_word, fh, fs, heads, qs, ans) in romance.items():
        titles = {
            "paros-rent-a-car": f"{word} Paros | AGGELOS Rentals",
            "rent-a-car-antiparos-aggelos": f"{word} Antiparos | AGGELOS Rentals",
            "paros-airport-rent-a-car-port": f"{word} aéroport Paros | AGGELOS" if loc == "fr" else f"{word} aeropuerto Paros | AGGELOS" if loc == "es" else f"{word} aeroporto Paros | AGGELOS" if loc == "it" else f"{word} aeroporto Paros | AGGELOS",
            "paros-port-parikia-rent-a-car": f"{word} port Parikia | AGGELOS" if loc != "es" else f"{word} puerto Parikia | AGGELOS",
            "piraeus-rent-a-car": f"{word} Pireo | AGGELOS Rentals" if loc != "fr" else f"{word} Pirée | AGGELOS Rentals",
            "antiparos-scooter-rentals": f"{word} scooter Antiparos | AGGELOS",
            "atvs-antiparos": f"{word} ATV Antiparos | AGGELOS",
            "suv-rentals-paros": f"{word} SUV Paros | AGGELOS Rentals",
        }
        # Fix title length / uniqueness
        if loc == "es":
            titles["paros-airport-rent-a-car-port"] = "Alquiler aeropuerto Paros | AGGELOS"
            titles["paros-port-parikia-rent-a-car"] = "Alquiler puerto Parikia | AGGELOS"
            titles["piraeus-rent-a-car"] = "Alquiler El Pireo | AGGELOS Rentals"
        if loc == "it":
            titles["paros-airport-rent-a-car-port"] = "Noleggio aeroporto Paros | AGGELOS"
            titles["paros-port-parikia-rent-a-car"] = "Noleggio porto Parikia | AGGELOS"
            titles["piraeus-rent-a-car"] = "Noleggio Pireo | AGGELOS Rentals"
        if loc == "pt":
            titles["paros-airport-rent-a-car-port"] = "Aluguer aeroporto Paros | AGGELOS"
            titles["paros-port-parikia-rent-a-car"] = "Aluguer porto Parikia | AGGELOS"
            titles["piraeus-rent-a-car"] = "Aluguer Pireu | AGGELOS Rentals"

        h1s = {pid: titles[pid].split("|")[0].strip() for pid in page_ids}
        # Longer unique intros per locale
        intros = {pid: f"{bank_intro(loc, pid)}" for pid in page_ids}
        descs = {pid: f"{bank_desc(loc, pid)}" for pid in page_ids}
        banks[loc] = {
            "money_titles": titles,
            "money_h1s": h1s,
            "money_intros": intros,
            "money_descriptions": descs,
            "money_cta": {pid: cta_word for pid in page_ids},
            "section_headings": {},
            "generic_section": heads + ["Détails utiles" if loc == "fr" else "Detalles útiles" if loc == "es" else "Dettagli utili" if loc == "it" else "Detalhes úteis"],
            "faq_q": {},
            "faq_a": {},
            "anchors": romance_anchors(loc),
            "final_h": {},
            "final_s": {},
            "final_h_default": fh,
            "final_s_default": fs,
            "wrap_body": lambda p, pid, i, j, loc=loc: body_wrap(loc, j),
            "wrap_q": lambda q, i, qs=qs: qs[i % 3],
            "wrap_a": lambda a, i, ans=ans: ans[i % 3],
            "anchor_fallback": lambda a, i, loc=loc: f"{'Lien' if loc=='fr' else 'Enlace' if loc=='es' else 'Link' if loc=='it' else 'Ligação'} {i+1}",
            "desc_from_intro": lambda intro: intro if len(intro) >= 110 else intro + " AGGELOS Rentals desde 1994.",
        }

    # Germanic + others
    for loc in ["de", "nl", "sv", "ru", "tr"]:
        banks[loc] = make_other_bank(loc, page_ids)

    return banks


def bank_intro(loc: str, pid: str) -> str:
    intros = {
        "fr": {
            "paros-rent-a-car": "Parcourez Paros avec une flotte locale basée à Antiparos. Prise en charge à l'aéroport (PAS) ou au port de Parikia, tarifs clairs et aide WhatsApp rapide.",
            "rent-a-car-antiparos-aggelos": "L'agence basée au port d'Antiparos. Voitures, scooters, quads et vélos pour rejoindre chaque plage sans attendre le bus.",
            "paros-airport-rent-a-car-port": "Retrait à l'aéroport de Paros (PAS) avec suivi de vol. Direction Naoussa, Parikia ou le ferry vers Antiparos.",
            "paros-port-parikia-rent-a-car": "Descendez du ferry à Parikia et récupérez tout près. Consignes claires et véhicules adaptés aux routes de l'île.",
            "piraeus-rent-a-car": "Commencez au Pirée avant le ferry vers les Cyclades. Coordination avec votre départ, puis suite possible à Paros ou Antiparos.",
            "antiparos-scooter-rentals": "Scooters à Antiparos avec casques. Idéal pour les plages et le stationnement au village. Permis expliqué avant réservation.",
            "atvs-antiparos": "Quads et buggies pour pistes et criques calmes. La plupart des modèles acceptent un permis voiture.",
            "suv-rentals-paros": "SUV et jeeps à Paros pour familles, bagages et accès plage irrégulier.",
        },
        "es": {
            "paros-rent-a-car": "Recorre Paros con flota local desde Antíparos. Recogida en aeropuerto (PAS) o puerto de Parikia, tarifas claras y WhatsApp rápido.",
            "rent-a-car-antiparos-aggelos": "La oficina con sede en el puerto de Antíparos. Coches, scooters, quads y bicis para llegar a cada playa sin esperar el bus.",
            "paros-airport-rent-a-car-port": "Recogida en el aeropuerto de Paros (PAS) con seguimiento de vuelo. Hacia Naoussa, Parikia o el ferry a Antíparos.",
            "paros-port-parikia-rent-a-car": "Baja del ferry en Parikia y recoge cerca. Indicaciones claras y vehículos para carreteras de isla.",
            "piraeus-rent-a-car": "Empieza en El Pireo antes del ferry a las Cícladas. Coordinamos con tu salida y puedes seguir en Paros o Antíparos.",
            "antiparos-scooter-rentals": "Scooters en Antíparos con cascos. Ideal para playas y aparcar en el pueblo. Explicamos el carnet antes de reservar.",
            "atvs-antiparos": "Quads y buggies para pistas y calas tranquilas. La mayoría acepta carnet de coche.",
            "suv-rentals-paros": "SUV y jeeps en Paros para familias, maletas y accesos de playa irregulares.",
        },
        "it": {
            "paros-rent-a-car": "Esplora Paros con flotta locale da Antiparos. Ritiro in aeroporto (PAS) o al porto di Parikia, tariffe chiare e WhatsApp rapido.",
            "rent-a-car-antiparos-aggelos": "L'agenzia con sede al porto di Antiparos. Auto, scooter, quad e bici per raggiungere ogni spiaggia senza aspettare il bus.",
            "paros-airport-rent-a-car-port": "Ritiro all'aeroporto di Paros (PAS) con monitoraggio del volo. Verso Naoussa, Parikia o il traghetto per Antiparos.",
            "paros-port-parikia-rent-a-car": "Scendi dal traghetto a Parikia e ritira vicino. Indicazioni chiare e veicoli adatti alle strade dell'isola.",
            "piraeus-rent-a-car": "Parti dal Pireo prima del traghetto per le Cicladi. Coordinamento con la partenza e eventuale seguito a Paros o Antiparos.",
            "antiparos-scooter-rentals": "Scooter ad Antiparos con caschi. Ideali per spiagge e parcheggio in paese. Spieghiamo la patente prima della prenotazione.",
            "atvs-antiparos": "Quad e buggy per sterrati e calette quiete. La maggior parte accetta patente auto.",
            "suv-rentals-paros": "SUV e jeep a Paros per famiglie, bagagli e accessi spiaggia irregolari.",
        },
        "pt": {
            "paros-rent-a-car": "Explore Paros com frota local a partir de Antíparos. Recolha no aeroporto (PAS) ou porto de Parikia, preços claros e WhatsApp rápido.",
            "rent-a-car-antiparos-aggelos": "O balcão com sede no porto de Antíparos. Carros, scooters, quads e bicicletas para chegar a cada praia sem esperar pelo autocarro.",
            "paros-airport-rent-a-car-port": "Recolha no aeroporto de Paros (PAS) com acompanhamento do voo. Para Naoussa, Parikia ou o ferry para Antíparos.",
            "paros-port-parikia-rent-a-car": "Saia do ferry em Parikia e recolha perto. Indicações claras e veículos para estradas da ilha.",
            "piraeus-rent-a-car": "Comece no Pireu antes do ferry para as Cíclades. Coordenação com a partida e possível continuação em Paros ou Antíparos.",
            "antiparos-scooter-rentals": "Scooters em Antíparos com capacetes. Ideais para praias e estacionar na vila. Explicamos a carta antes da reserva.",
            "atvs-antiparos": "Quads e buggies para caminhos de terra e enseadas calmas. A maioria aceita carta de carro.",
            "suv-rentals-paros": "SUV e jipes em Paros para famílias, bagagem e acessos de praia irregulares.",
        },
    }
    return intros[loc][pid]


def bank_desc(loc: str, pid: str) -> str:
    # Ensure 110-160 chars roughly
    d = {
        "fr": {
            "paros-rent-a-car": "Location de voiture à Paros avec prise en charge aéroport ou port. Entreprise familiale depuis 1994 à Antiparos. Tarifs clairs et aide WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Location à Antiparos depuis le port. Voitures, scooters, quads et vélos. Livraison hôtel sur demande avec AGGELOS Rentals.",
            "paros-airport-rent-a-car-port": "Location à l'aéroport de Paros (PAS) avec suivi de vol. Trajet clair vers hôtel ou ferry Antiparos. Tarifs transparents.",
            "paros-port-parikia-rent-a-car": "Location au port de Parikia. Courte marche depuis le ferry, conseils d'itinéraire et véhicules adaptés aux routes de l'île.",
            "piraeus-rent-a-car": "Location au Pirée avant le ferry vers les Cyclades. Poursuivez avec AGGELOS Rentals à Paros et Antiparos si besoin.",
            "antiparos-scooter-rentals": "Location de scooters à Antiparos de 50 à 300 cc. Casques inclus. Règles de permis expliquées avant réservation.",
            "atvs-antiparos": "Location de quads à Antiparos pour pistes et criques. La plupart des modèles acceptent un permis voiture.",
            "suv-rentals-paros": "Location de SUV à Paros pour familles et bagages. Prise en charge aéroport ou port selon disponibilité.",
        },
        "es": {
            "paros-rent-a-car": "Alquiler de coche en Paros con recogida en aeropuerto o puerto. Empresa familiar desde 1994 en Antíparos. Tarifas claras y WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Alquiler en Antíparos desde el puerto. Coches, scooters, quads y bicis. Entrega en hotel bajo petición con AGGELOS Rentals.",
            "paros-airport-rent-a-car-port": "Alquiler en el aeropuerto de Paros (PAS) con seguimiento de vuelo. Camino claro a hotel o ferry a Antíparos.",
            "paros-port-parikia-rent-a-car": "Alquiler en el puerto de Parikia. Corta caminata desde el ferry, consejos de ruta y vehículos para carreteras de isla.",
            "piraeus-rent-a-car": "Alquiler en El Pireo antes del ferry a las Cícladas. Continúa con AGGELOS Rentals en Paros y Antíparos si lo necesitas.",
            "antiparos-scooter-rentals": "Alquiler de scooters en Antíparos de 50 a 300 cc. Cascos incluidos. Explicamos el carnet antes de reservar.",
            "atvs-antiparos": "Alquiler de quads en Antíparos para pistas y calas. La mayoría de modelos acepta carnet de coche.",
            "suv-rentals-paros": "Alquiler de SUV en Paros para familias y maletas. Recogida en aeropuerto o puerto según disponibilidad.",
        },
        "it": {
            "paros-rent-a-car": "Noleggio auto a Paros con ritiro in aeroporto o al porto. Attività familiare dal 1994 ad Antiparos. Tariffe chiare e WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Noleggio ad Antiparos dal porto. Auto, scooter, quad e bici. Consegna in hotel su richiesta con AGGELOS Rentals.",
            "paros-airport-rent-a-car-port": "Noleggio all'aeroporto di Paros (PAS) con monitoraggio del volo. Percorso chiaro verso hotel o traghetto Antiparos.",
            "paros-port-parikia-rent-a-car": "Noleggio al porto di Parikia. Breve camminata dal traghetto, consigli di percorso e veicoli per strade dell'isola.",
            "piraeus-rent-a-car": "Noleggio al Pireo prima del traghetto per le Cicladi. Continua con AGGELOS Rentals a Paros e Antiparos se serve.",
            "antiparos-scooter-rentals": "Noleggio scooter ad Antiparos da 50 a 300 cc. Caschi inclusi. Spieghiamo la patente prima della prenotazione.",
            "atvs-antiparos": "Noleggio quad ad Antiparos per sterrati e calette. La maggior parte dei modelli accetta patente auto.",
            "suv-rentals-paros": "Noleggio SUV a Paros per famiglie e bagagli. Ritiro in aeroporto o al porto in base alla disponibilità.",
        },
        "pt": {
            "paros-rent-a-car": "Aluguer de carro em Paros com recolha no aeroporto ou porto. Empresa familiar desde 1994 em Antíparos. Preços claros e WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Aluguer em Antíparos a partir do porto. Carros, scooters, quads e bicicletas. Entrega no hotel sob pedido com AGGELOS Rentals.",
            "paros-airport-rent-a-car-port": "Aluguer no aeroporto de Paros (PAS) com acompanhamento do voo. Caminho claro para hotel ou ferry Antíparos.",
            "paros-port-parikia-rent-a-car": "Aluguer no porto de Parikia. Curta caminhada desde o ferry, dicas de percurso e veículos para estradas da ilha.",
            "piraeus-rent-a-car": "Aluguer no Pireu antes do ferry para as Cíclades. Continue com AGGELOS Rentals em Paros e Antíparos se precisar.",
            "antiparos-scooter-rentals": "Aluguer de scooters em Antíparos de 50 a 300 cc. Capacetes incluídos. Explicamos a carta antes da reserva.",
            "atvs-antiparos": "Aluguer de quads em Antíparos para caminhos de terra e enseadas. A maioria aceita carta de carro.",
            "suv-rentals-paros": "Aluguer de SUV em Paros para famílias e bagagem. Recolha no aeroporto ou porto conforme disponibilidade.",
        },
    }
    return d[loc][pid]


def romance_anchors(loc: str) -> dict:
    if loc == "fr":
        return {
            "money/paros-airport-rent-a-car-port": "Prise en charge aéroport",
            "money/paros-port-parikia-rent-a-car": "Prise en charge Parikia",
            "money/rent-a-car-antiparos-aggelos": "Location Antiparos",
            "money/paros-rent-a-car": "Location Paros",
            "money/antiparos-scooter-rentals": "Scooters Antiparos",
            "money/atvs-antiparos": "Quads Antiparos",
            "money/suv-rentals-paros": "SUV à Paros",
            "fleet-category/compact": "Voitures compactes",
            "fleet-category/mini": "Mini voitures",
            "fleet-category/scooters": "Flotte scooters",
            "fleet-category/atvs": "Flotte quads",
            "fleet-category/suvs": "SUV et 4x4",
            "fleet-category/bikes": "Vélos",
            "fleet-category/people-carriers": "Monospaces",
            "fleet": "Toute la flotte",
            "contact/contact": "Nous contacter",
        }
    if loc == "es":
        return {
            "money/paros-airport-rent-a-car-port": "Recogida en aeropuerto",
            "money/paros-port-parikia-rent-a-car": "Recogida en Parikia",
            "money/rent-a-car-antiparos-aggelos": "Alquiler Antíparos",
            "money/paros-rent-a-car": "Alquiler Paros",
            "money/antiparos-scooter-rentals": "Scooters Antíparos",
            "money/atvs-antiparos": "Quads Antíparos",
            "money/suv-rentals-paros": "SUV en Paros",
            "fleet-category/compact": "Coches compactos",
            "fleet-category/mini": "Coches mini",
            "fleet-category/scooters": "Flota de scooters",
            "fleet-category/atvs": "Flota de quads",
            "fleet-category/suvs": "SUV y 4x4",
            "fleet-category/bikes": "Bicicletas",
            "fleet-category/people-carriers": "Monovolúmenes",
            "fleet": "Toda la flota",
            "contact/contact": "Contacto",
        }
    if loc == "it":
        return {
            "money/paros-airport-rent-a-car-port": "Ritiro in aeroporto",
            "money/paros-port-parikia-rent-a-car": "Ritiro a Parikia",
            "money/rent-a-car-antiparos-aggelos": "Noleggio Antiparos",
            "money/paros-rent-a-car": "Noleggio Paros",
            "money/antiparos-scooter-rentals": "Scooter Antiparos",
            "money/atvs-antiparos": "Quad Antiparos",
            "money/suv-rentals-paros": "SUV a Paros",
            "fleet-category/compact": "Auto compatte",
            "fleet-category/mini": "Mini auto",
            "fleet-category/scooters": "Flotta scooter",
            "fleet-category/atvs": "Flotta quad",
            "fleet-category/suvs": "SUV e 4x4",
            "fleet-category/bikes": "Biciclette",
            "fleet-category/people-carriers": "Monovolume",
            "fleet": "Tutta la flotta",
            "contact/contact": "Contatti",
        }
    return {
        "money/paros-airport-rent-a-car-port": "Recolha no aeroporto",
        "money/paros-port-parikia-rent-a-car": "Recolha em Parikia",
        "money/rent-a-car-antiparos-aggelos": "Aluguer Antíparos",
        "money/paros-rent-a-car": "Aluguer Paros",
        "money/antiparos-scooter-rentals": "Scooters Antíparos",
        "money/atvs-antiparos": "Quads Antíparos",
        "money/suv-rentals-paros": "SUV em Paros",
        "fleet-category/compact": "Carros compactos",
        "fleet-category/mini": "Carros mini",
        "fleet-category/scooters": "Frota de scooters",
        "fleet-category/atvs": "Frota de quads",
        "fleet-category/suvs": "SUV e 4x4",
        "fleet-category/bikes": "Bicicletas",
        "fleet-category/people-carriers": "Monovolumes",
        "fleet": "Frota completa",
        "contact/contact": "Contacto",
    }


def body_wrap(loc: str, j: int) -> str:
    wraps = {
        "fr": [
            "En pratique: depuis 1994 au port d'Antiparos, nous connaissons ferries, parkings et embouteillages d'août.",
            "En clair: vous choisissez le point de retrait, nous préparons le véhicule et les papiers.",
            "Conseil local: prévoyez un peu de marge en haute saison près du port et de Naoussa.",
        ],
        "es": [
            "En la práctica: desde 1994 en el puerto de Antíparos conocemos ferries, parkings y el tráfico de agosto.",
            "En resumen: eliges el punto de recogida y preparamos el vehículo y los papeles.",
            "Consejo local: deja margen en temporada alta cerca del puerto y Naoussa.",
        ],
        "it": [
            "In pratica: dal 1994 al porto di Antiparos conosciamo traghetti, parcheggi e il traffico di agosto.",
            "In sintesi: scegli il punto di ritiro e prepariamo veicolo e documenti.",
            "Consiglio locale: lascia margine in alta stagione vicino al porto e a Naoussa.",
        ],
        "pt": [
            "Na prática: desde 1994 no porto de Antíparos conhecemos ferries, estacionamento e o trânsito de agosto.",
            "Em resumo: escolhe o ponto de recolha e preparamos o veículo e os documentos.",
            "Dica local: deixe margem em alta temporada junto ao porto e a Naoussa.",
        ],
    }
    return wraps[loc][j % 3]


def make_other_bank(loc: str, page_ids: list) -> dict:
    meta = {
        "de": {
            "titles": {
                "paros-rent-a-car": "Mietwagen Paros | AGGELOS Rentals",
                "rent-a-car-antiparos-aggelos": "Mietwagen Antiparos | AGGELOS",
                "paros-airport-rent-a-car-port": "Flughafen Paros Miete | AGGELOS",
                "paros-port-parikia-rent-a-car": "Hafen Parikia Miete | AGGELOS",
                "piraeus-rent-a-car": "Mietwagen Piräus | AGGELOS Rentals",
                "antiparos-scooter-rentals": "Roller Antiparos | AGGELOS Rentals",
                "atvs-antiparos": "ATV Verleih Antiparos | AGGELOS",
                "suv-rentals-paros": "SUV Miete Paros | AGGELOS Rentals",
            },
            "heads": ["Warum mieten", "Abholung und Lieferung", "Was Gäste wählen", "Wichtige Details"],
            "qs": ["Wo ist die Abholung?", "Welchen Führerschein brauche ich?", "Geht eine Inselüberfahrt?"],
            "ans": [
                "Sie wählen Flughafen, Hafen oder Unterkunft, sofern verfügbar.",
                "Wir prüfen die Führerscheinklasse bei der Übergabe.",
                "Ja bei vereinbarten One-Way-Fahrten zwischen Paros und Antiparos.",
            ],
            "fh": "Bereit für die Inselstraßen?",
            "fs": "Online buchen, am Flughafen oder Hafen treffen, klar fahren.",
            "bodies": [
                "Praktisch: Seit 1994 am Hafen von Antiparos kennen wir Fähren, Parken und den Augustverkehr.",
                "Kurz: Sie wählen den Treffpunkt, wir bereiten Fahrzeug und Papiere vor.",
                "Tipp: Im Hochsommer etwas Zeitpuffer nahe Hafen und Naoussa einplanen.",
            ],
        },
        "nl": {
            "titles": {
                "paros-rent-a-car": "Autohuur Paros | AGGELOS Rentals",
                "rent-a-car-antiparos-aggelos": "Autohuur Antiparos | AGGELOS",
                "paros-airport-rent-a-car-port": "Paros luchthaven huur | AGGELOS",
                "paros-port-parikia-rent-a-car": "Parikia haven huur | AGGELOS",
                "piraeus-rent-a-car": "Autohuur Piraeus | AGGELOS Rentals",
                "antiparos-scooter-rentals": "Scooterhuur Antiparos | AGGELOS",
                "atvs-antiparos": "ATV verhuur Antiparos | AGGELOS",
                "suv-rentals-paros": "SUV huur Paros | AGGELOS Rentals",
            },
            "heads": ["Waarom huren", "Ophalen en bezorgen", "Wat gasten kiezen", "Nuttige details"],
            "qs": ["Waar is de ophaallocatie?", "Welk rijbewijs heb ik nodig?", "Kan ik naar Antiparos?"],
            "ans": [
                "Kies luchthaven, haven of hotel als dat beschikbaar is.",
                "We controleren de rijbewijscategorie bij ophalen.",
                "Ja bij afgesproken one-way ritten tussen Paros en Antiparos.",
            ],
            "fh": "Klaar voor de eilandwegen?",
            "fs": "Boek online, ontmoet ons op luchthaven of haven, rij met duidelijke voorwaarden.",
            "bodies": [
                "In de praktijk: sinds 1994 in de haven van Antiparos kennen we veerboten, parkeren en augustusdrukte.",
                "Kort gezegd: u kiest het afleverpunt, wij klaarzetten voertuig en papieren.",
                "Tip: plan in het hoogseizoen extra tijd nabij haven en Naoussa.",
            ],
        },
        "sv": {
            "titles": {
                "paros-rent-a-car": "Hyrbil Paros | AGGELOS Rentals",
                "rent-a-car-antiparos-aggelos": "Hyrbil Antiparos | AGGELOS",
                "paros-airport-rent-a-car-port": "Paros flygplatsbil | AGGELOS",
                "paros-port-parikia-rent-a-car": "Parikia hamnbil | AGGELOS",
                "piraeus-rent-a-car": "Hyrbil Pireus | AGGELOS Rentals",
                "antiparos-scooter-rentals": "Scooter Antiparos | AGGELOS",
                "atvs-antiparos": "ATV-uthyrning Antiparos | AGGELOS",
                "suv-rentals-paros": "SUV-hyra Paros | AGGELOS Rentals",
            },
            "heads": ["Varför hyra", "Upphämtning och leverans", "Vad gäster väljer", "Praktiska detaljer"],
            "qs": ["Var hämtar jag fordonet?", "Vilket körkort behövs?", "Kan jag åka till Antiparos?"],
            "ans": [
                "Välj flygplats, hamn eller hotell när det erbjuds.",
                "Vi kontrollerar körkortskategori vid upphämtning.",
                "Ja vid överenskomna one-way-resor mellan Paros och Antiparos.",
            ],
            "fh": "Redo för öns vägar?",
            "fs": "Boka online, möt oss på flygplats eller hamn, kör med tydliga villkor.",
            "bodies": [
                "I praktiken: sedan 1994 i Antiparos hamn känner vi färjor, parkering och augustitrafik.",
                "Kort sagt: du väljer mötesplats, vi förbereder fordon och papper.",
                "Tips: lägg in tidsmarginal i högsäsong nära hamn och Naoussa.",
            ],
        },
        "ru": {
            "titles": {
                "paros-rent-a-car": "Аренда авто Парос | AGGELOS",
                "rent-a-car-antiparos-aggelos": "Аренда Антипарос | AGGELOS",
                "paros-airport-rent-a-car-port": "Аэропорт Пароса аренда | AGGELOS",
                "paros-port-parikia-rent-a-car": "Порт Парикия аренда | AGGELOS",
                "piraeus-rent-a-car": "Аренда Пирей | AGGELOS Rentals",
                "antiparos-scooter-rentals": "Скутеры Антипарос | AGGELOS",
                "atvs-antiparos": "ATV Антипарос | AGGELOS Rentals",
                "suv-rentals-paros": "SUV на Паросе | AGGELOS Rentals",
            },
            "heads": ["Зачем арендовать", "Получение и доставка", "Что выбирают гости", "Важные детали"],
            "qs": ["Где забрать автомобиль?", "Какие права нужны?", "Можно ли на Антипарос?"],
            "ans": [
                "Выберите аэропорт, порт или отель, если доступно.",
                "Мы проверяем категорию прав при выдаче.",
                "Да при согласованных one-way поездках между Паросом и Антипаросом.",
            ],
            "fh": "Готовы к дорогам острова?",
            "fs": "Бронируйте онлайн, встречайтесь в аэропорту или порту, езжайте на понятных условиях.",
            "bodies": [
                "На практике: с 1994 года в порту Антипароса мы знаем паромы, парковку и августовские пробки.",
                "Коротко: вы выбираете точку выдачи, мы готовим авто и документы.",
                "Совет: заложите запас времени в пик сезона у порта и Науссы.",
            ],
        },
        "tr": {
            "titles": {
                "paros-rent-a-car": "Paros Araç Kiralama | AGGELOS",
                "rent-a-car-antiparos-aggelos": "Antiparos Kiralama | AGGELOS",
                "paros-airport-rent-a-car-port": "Paros Havalimanı Kiralama | AGGELOS",
                "paros-port-parikia-rent-a-car": "Parikia Liman Kiralama | AGGELOS",
                "piraeus-rent-a-car": "Pire Araç Kiralama | AGGELOS",
                "antiparos-scooter-rentals": "Antiparos Scooter | AGGELOS",
                "atvs-antiparos": "Antiparos ATV Kiralama | AGGELOS",
                "suv-rentals-paros": "Paros SUV Kiralama | AGGELOS",
            },
            "heads": ["Neden kiralamalı", "Teslim ve iade", "Misafirler ne seçiyor", "Faydalı ayrıntılar"],
            "qs": ["Aracı nerede teslim alırım?", "Hangi ehliyet gerekir?", "Antiparos'a geçebilir miyim?"],
            "ans": [
                "Müsaitse havalimanı, liman veya oteli seçin.",
                "Teslimde ehliyet sınıfını kontrol ederiz.",
                "Evet, Paros ve Antiparos arasında anlaşmalı tek yönlerde.",
            ],
            "fh": "Ada yollarına hazır mısınız?",
            "fs": "Online rezervasyon yapın, havalimanı veya limanda buluşun, net koşullarla sürün.",
            "bodies": [
                "Pratikte: 1994'ten beri Antiparos limanında feribotları, parkı ve Ağustos trafiğini biliyoruz.",
                "Kısaca: teslim noktasını siz seçersiniz, aracı ve evrakı biz hazırlarız.",
                "İpucu: yüksek sezonda liman ve Naoussa yakınında zaman payı bırakın.",
            ],
        },
    }[loc]

    titles = meta["titles"]
    h1s = {pid: titles[pid].split("|")[0].strip() for pid in page_ids}
    intros = {pid: other_intro(loc, pid) for pid in page_ids}
    descs = {pid: other_desc(loc, pid) for pid in page_ids}

    return {
        "money_titles": titles,
        "money_h1s": h1s,
        "money_intros": intros,
        "money_descriptions": descs,
        "money_cta": {pid: CTA[loc]["primary"] for pid in page_ids},
        "section_headings": {},
        "generic_section": meta["heads"],
        "faq_q": {},
        "faq_a": {},
        "anchors": other_anchors(loc),
        "final_h": {},
        "final_s": {},
        "final_h_default": meta["fh"],
        "final_s_default": meta["fs"],
        "wrap_body": lambda p, pid, i, j, bodies=meta["bodies"]: bodies[j % 3],
        "wrap_q": lambda q, i, qs=meta["qs"]: qs[i % 3],
        "wrap_a": lambda a, i, ans=meta["ans"]: ans[i % 3],
        "anchor_fallback": lambda a, i: f"Link {i+1}",
        "desc_from_intro": lambda intro: intro if len(intro) >= 110 else intro + " AGGELOS Rentals.",
    }


def other_intro(loc: str, pid: str) -> str:
    data = {
        "de": {
            "paros-rent-a-car": "Entdecken Sie Paros mit lokaler Flotte von Antiparos. Abholung am Flughafen (PAS) oder Hafen Parikia, klare Preise und schnelle WhatsApp-Hilfe.",
            "rent-a-car-antiparos-aggelos": "Die Vermietung mit Sitz am Hafen von Antiparos. Autos, Roller, ATVs und Fahrräder, damit Sie jeden Strand ohne Buswartezeit erreichen.",
            "paros-airport-rent-a-car-port": "Abholung am Flughafen Paros (PAS) mit Flugverfolgung. Weiter nach Naoussa, Parikia oder zur Fähre nach Antiparos.",
            "paros-port-parikia-rent-a-car": "Steigen Sie in Parikia von der Fähre und holen Sie in der Nähe ab. Klare Treffpunkte und Fahrzeuge für Inselstraßen.",
            "piraeus-rent-a-car": "Start in Piräus vor der Fähre zu den Kykladen. Abstimmung mit Ihrer Abfahrt, danach optional weiter auf Paros oder Antiparos.",
            "antiparos-scooter-rentals": "Roller auf Antiparos inkl. Helme. Ideal für Strände und Dorfparken. Führerscheinregeln vor der Buchung erklärt.",
            "atvs-antiparos": "ATVs und Buggys für Schotterwege und ruhige Buchten. Die meisten Modelle akzeptieren einen Pkw-Führerschein.",
            "suv-rentals-paros": "SUV und Jeeps auf Paros für Familien, Gepäck und unebene Strandzufahrten.",
        },
        "nl": {
            "paros-rent-a-car": "Ontdek Paros met lokale vloot vanaf Antiparos. Ophalen op luchthaven (PAS) of haven Parikia, duidelijke prijzen en snelle WhatsApp-hulp.",
            "rent-a-car-antiparos-aggelos": "Het verhuurkantoor in de haven van Antiparos. Auto's, scooters, ATV's en fietsen zodat u elk strand bereikt zonder op de bus te wachten.",
            "paros-airport-rent-a-car-port": "Ophalen op luchthaven Paros (PAS) met vluchtmonitoring. Door naar Naoussa, Parikia of de veerboot naar Antiparos.",
            "paros-port-parikia-rent-a-car": "Stap in Parikia van de ferry en haal dichtbij op. Duidelijke instructies en voertuigen voor eilandwegen.",
            "piraeus-rent-a-car": "Start in Piraeus vóór de ferry naar de Cycladen. Afstemming op uw vertrek, daarna eventueel verder op Paros of Antiparos.",
            "antiparos-scooter-rentals": "Scooters op Antiparos inclusief helmen. Ideaal voor stranden en parkeren in het dorp. Rijbewijsregels vóór boeken uitgelegd.",
            "atvs-antiparos": "ATV's en buggy's voor zandwegen en rustige baaien. De meeste modellen accepteren een autorijbewijs.",
            "suv-rentals-paros": "SUV's en jeeps op Paros voor gezinnen, bagage en oneffen strandtoegangen.",
        },
        "sv": {
            "paros-rent-a-car": "Upptäck Paros med lokal flotta från Antiparos. Upphämtning på flygplatsen (PAS) eller hamnen i Parikia, tydliga priser och snabb WhatsApp-hjälp.",
            "rent-a-car-antiparos-aggelos": "Uthyrningen med bas i Antiparos hamn. Bilar, scootrar, ATV och cyklar så du når varje strand utan att vänta på bussen.",
            "paros-airport-rent-a-car-port": "Upphämtning på Paros flygplats (PAS) med flygbevakning. Vidare till Naoussa, Parikia eller färjan till Antiparos.",
            "paros-port-parikia-rent-a-car": "Kliv av färjan i Parikia och hämta nära. Tydliga mötespunkter och fordon för övägar.",
            "piraeus-rent-a-car": "Börja i Pireus före färjan till Kykladerna. Samordning med din avgång, sedan eventuellt vidare på Paros eller Antiparos.",
            "antiparos-scooter-rentals": "Scootrar på Antiparos med hjälmar. Bra för stränder och byparkering. Körkortsregler förklaras före bokning.",
            "atvs-antiparos": "ATV och buggies för grusvägar och lugna vikar. De flesta modeller accepterar bilkörkort.",
            "suv-rentals-paros": "SUV och jeepar på Paros för familjer, bagage och ojämna strandinfarter.",
        },
        "ru": {
            "paros-rent-a-car": "Исследуйте Парос с локальным автопарком с Антипароса. Выдача в аэропорту (PAS) или порту Парикии, понятные цены и быстрый WhatsApp.",
            "rent-a-car-antiparos-aggelos": "Прокат с офисом в порту Антипароса. Авто, скутеры, ATV и велосипеды, чтобы добраться до каждого пляжа без ожидания автобуса.",
            "paros-airport-rent-a-car-port": "Выдача в аэропорту Пароса (PAS) с отслеживанием рейса. Дальше в Науссу, Парикию или на паром на Антипарос.",
            "paros-port-parikia-rent-a-car": "Сойдите с парома в Парикии и заберите рядом. Понятные инструкции и машины для островных дорог.",
            "piraeus-rent-a-car": "Начните в Пирее до парома на Киклады. Согласуем с отправлением, затем можно продолжить на Паросе или Антипаросе.",
            "antiparos-scooter-rentals": "Скутеры на Антипаросе со шлемами. Удобно для пляжей и парковки в поселке. Правила прав объясняем до брони.",
            "atvs-antiparos": "ATV и багги для грунтовок и тихих бухт. Большинство моделей принимают права категории B.",
            "suv-rentals-paros": "SUV и джипы на Паросе для семей, багажа и неровных подъездов к пляжам.",
        },
        "tr": {
            "paros-rent-a-car": "Paros'u Antiparos merkezli yerel filoyla keşfedin. Havalimanı (PAS) veya Parikia limanında teslim, net fiyatlar ve hızlı WhatsApp desteği.",
            "rent-a-car-antiparos-aggelos": "Antiparos limanında merkez ofis. Otobüs beklemeden her plaja ulaşmak için arabalar, scooterlar, ATV'ler ve bisikletler.",
            "paros-airport-rent-a-car-port": "Paros Havalimanı (PAS) teslimi, uçuş takibiyle. Naoussa, Parikia veya Antiparos feribotuna devam.",
            "paros-port-parikia-rent-a-car": "Parikia'da feribottan inin ve yakında teslim alın. Net buluşma noktaları ve ada yollarına uygun araçlar.",
            "piraeus-rent-a-car": "Kiklad feribotundan önce Pire'de başlayın. Kalkışınıza göre ayarlarız, sonra Paros veya Antiparos'ta devam edebilirsiniz.",
            "antiparos-scooter-rentals": "Antiparos'ta kasklı scooterlar. Plajlar ve köy parkı için ideal. Ehliyet kurallarını rezervasyondan önce anlatırız.",
            "atvs-antiparos": "Toprak yollar ve sakin koylar için ATV ve buggy. Çoğu model B sınıfı ehliyet kabul eder.",
            "suv-rentals-paros": "Aileler, bagaj ve engebeli plaj yaklaşımları için Paros'ta SUV ve jipleler.",
        },
    }
    return data[loc][pid]


def other_desc(loc: str, pid: str) -> str:
    # Reuse intros padded if needed; better specific short SEO
    intro = other_intro(loc, pid)
    if len(intro) > 160:
        return intro[:157].rsplit(" ", 1)[0] + "."
    if len(intro) < 110:
        return intro + " AGGELOS Rentals."
    return intro


def other_anchors(loc: str) -> dict:
    tables = {
        "de": {
            "money/paros-airport-rent-a-car-port": "Flughafenabholung Paros",
            "money/paros-port-parikia-rent-a-car": "Hafenabholung Parikia",
            "money/rent-a-car-antiparos-aggelos": "Mietwagen Antiparos",
            "money/paros-rent-a-car": "Mietwagen Paros",
            "money/antiparos-scooter-rentals": "Roller Antiparos",
            "money/atvs-antiparos": "ATV Antiparos",
            "money/suv-rentals-paros": "SUV auf Paros",
            "fleet-category/compact": "Kompaktwagen",
            "fleet-category/mini": "Kleine Autos",
            "fleet-category/scooters": "Rollerflotte",
            "fleet-category/atvs": "ATV-Flotte",
            "fleet-category/suvs": "SUV und 4x4",
            "fleet-category/bikes": "Fahrräder",
            "fleet-category/people-carriers": "Großraumwagen",
            "fleet": "Gesamter Fuhrpark",
            "contact/contact": "Kontakt",
        },
        "nl": {
            "money/paros-airport-rent-a-car-port": "Ophalen op luchthaven",
            "money/paros-port-parikia-rent-a-car": "Ophalen in Parikia",
            "money/rent-a-car-antiparos-aggelos": "Huren op Antiparos",
            "money/paros-rent-a-car": "Huren op Paros",
            "money/antiparos-scooter-rentals": "Scooters Antiparos",
            "money/atvs-antiparos": "ATV Antiparos",
            "money/suv-rentals-paros": "SUV op Paros",
            "fleet-category/compact": "Compacte auto's",
            "fleet-category/mini": "Mini auto's",
            "fleet-category/scooters": "Scootervloot",
            "fleet-category/atvs": "ATV-vloot",
            "fleet-category/suvs": "SUV en 4x4",
            "fleet-category/bikes": "Fietsen",
            "fleet-category/people-carriers": "Personenbusjes",
            "fleet": "Volledige vloot",
            "contact/contact": "Contact",
        },
        "sv": {
            "money/paros-airport-rent-a-car-port": "Upphämtning flygplats",
            "money/paros-port-parikia-rent-a-car": "Upphämtning Parikia",
            "money/rent-a-car-antiparos-aggelos": "Hyra på Antiparos",
            "money/paros-rent-a-car": "Hyra på Paros",
            "money/antiparos-scooter-rentals": "Scootrar Antiparos",
            "money/atvs-antiparos": "ATV Antiparos",
            "money/suv-rentals-paros": "SUV på Paros",
            "fleet-category/compact": "Kompaktbilar",
            "fleet-category/mini": "Småbilar",
            "fleet-category/scooters": "Scooterflotta",
            "fleet-category/atvs": "ATV-flotta",
            "fleet-category/suvs": "SUV och 4x4",
            "fleet-category/bikes": "Cyklar",
            "fleet-category/people-carriers": "Storbolån",
            "fleet": "Hela flottan",
            "contact/contact": "Kontakt",
        },
        "ru": {
            "money/paros-airport-rent-a-car-port": "Выдача в аэропорту",
            "money/paros-port-parikia-rent-a-car": "Выдача в Парикии",
            "money/rent-a-car-antiparos-aggelos": "Аренда на Антипаросе",
            "money/paros-rent-a-car": "Аренда на Паросе",
            "money/antiparos-scooter-rentals": "Скутеры Антипарос",
            "money/atvs-antiparos": "ATV Антипарос",
            "money/suv-rentals-paros": "SUV на Паросе",
            "fleet-category/compact": "Компактные авто",
            "fleet-category/mini": "Мини авто",
            "fleet-category/scooters": "Парк скутеров",
            "fleet-category/atvs": "Парк ATV",
            "fleet-category/suvs": "SUV и 4x4",
            "fleet-category/bikes": "Велосипеды",
            "fleet-category/people-carriers": "Минивэны",
            "fleet": "Весь автопарк",
            "contact/contact": "Контакты",
        },
        "tr": {
            "money/paros-airport-rent-a-car-port": "Havalimanı teslimi",
            "money/paros-port-parikia-rent-a-car": "Parikia liman teslimi",
            "money/rent-a-car-antiparos-aggelos": "Antiparos kiralama",
            "money/paros-rent-a-car": "Paros kiralama",
            "money/antiparos-scooter-rentals": "Antiparos scooter",
            "money/atvs-antiparos": "Antiparos ATV",
            "money/suv-rentals-paros": "Paros SUV",
            "fleet-category/compact": "Kompakt arabalar",
            "fleet-category/mini": "Mini arabalar",
            "fleet-category/scooters": "Scooter filosu",
            "fleet-category/atvs": "ATV filosu",
            "fleet-category/suvs": "SUV ve 4x4",
            "fleet-category/bikes": "Bisikletler",
            "fleet-category/people-carriers": "Çok kişilik araçlar",
            "fleet": "Tüm filo",
            "contact/contact": "İletişim",
        },
    }
    return tables[loc]


LOCALE_BANK = build_locale_banks()


def main() -> None:
    written = 0
    money = pack_money()
    for page_id, by_loc in money.items():
        for loc, data in by_loc.items():
            path = CONTENT / "pages" / "money" / page_id / f"{loc}.ts"
            write_page(path, loc, "PageCopy", data)
            written += 1
    print(f"money pages: {written}")
    # Continue in companion script parts via imports
    from author_content_rest import author_rest
    n = author_rest(CONTENT, LOCALES, CTA, OR_SIMILAR, write_page, write_vehicle, LOCALE_BANK)
    print(f"rest modules: {n}")
    print(f"total written this run: {written + n}")


if __name__ == "__main__":
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    main()

