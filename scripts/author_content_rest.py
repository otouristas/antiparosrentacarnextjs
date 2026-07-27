#!/usr/bin/env python3
"""Home, contact, guides, legal, fleet categories, vehicles for all locales."""
from __future__ import annotations

import json
from pathlib import Path

FLEET_JSON = Path(__file__).resolve().parents[1] / "data" / "fleet.json"

CATEGORIES = [
    "mini",
    "compact",
    "crossover",
    "suvs",
    "convertible",
    "people-carriers",
    "scooters",
    "atvs",
    "bikes",
]

CAT_EN = {
    "mini": {
        "label": "Mini cars",
        "bestFor": "Village streets, short hops, easy parking in Parikia and Antiparos town.",
        "licence": "Standard car license. Automatic options available in the category.",
        "compare": "Choose mini for parking ease. Step up to compact for more luggage space.",
        "seo": {
            "title": "Mini Car Rentals Paros & Antiparos",
            "description": "Rent mini cars on Paros and Antiparos with AGGELOS Rentals. Easy village parking, airport and port pickup, clear daily rates.",
        },
        "h1": "Mini Car Rentals for Island Streets",
        "intro": "Small cars that slip through village lanes and park where larger SUVs struggle. Ideal for couples and light luggage.",
        "sections": [
            {
                "heading": "When a mini is enough",
                "body": [
                    "If you stay near town, travel as a couple, and do day trips rather than full luggage circuits, a mini keeps costs and stress down.",
                    "Manual and automatic minis are listed live. Pick the gearbox you are comfortable driving after the ferry.",
                ],
            },
            {
                "heading": "Pickup points",
                "body": [
                    "Meet us at Antiparos Port, Paros Airport (PAS), or Parikia. Hotel delivery is available on request for longer stays.",
                ],
            },
            {
                "heading": "Mini versus compact",
                "body": [
                    "Minis win on the tightest streets. Compacts add boot space for beach gear and a week of shopping bags.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Are automatic minis available?",
                "a": "Yes when inventory allows. Filter automatic in the search or ask on WhatsApp.",
            },
            {
                "q": "Is a mini ok with suitcases?",
                "a": "Soft bags for two usually fit. Hard large suitcases are easier in compact or crossover.",
            },
            {
                "q": "Can I take a mini to Antiparos?",
                "a": "Yes on agreed island plans. Confirm ferry loading rules when you book.",
            },
        ],
        "related": [
            {"to": "fleet-category/compact", "anchor": "Need more boot space"},
            {"to": "money/paros-rent-a-car", "anchor": "Paros car rental guide"},
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos car rental"},
            {"to": "fleet", "anchor": "See all categories"},
        ],
        "final": {
            "heading": "Book a mini for the lanes",
            "sub": "Check live rates for your dates, then meet us at the port or airport.",
        },
    },
    "compact": {
        "label": "Compact cars",
        "bestFor": "Everyday comfort for couples and small groups exploring both islands.",
        "licence": "Standard car license covers manual and automatic compact cars.",
        "compare": "More space than mini, easier parking than most SUVs in village centres.",
        "seo": {
            "title": "Compact Car Hire Paros & Antiparos",
            "description": "Rent compact cars on Paros and Antiparos. Balanced space and parking ease with AGGELOS Rentals. Airport, port and hotel pickup options.",
        },
        "h1": "Compact Cars for Daily Island Driving",
        "intro": "The workhorse category for Paros and Antiparos: enough space for beach bags, still manageable in village parking.",
        "sections": [
            {
                "heading": "Who books compact",
                "body": [
                    "Couples on a week-long stay, friends sharing costs, or anyone who wants a calmer drive than a scooter without SUV size.",
                ],
            },
            {
                "heading": "Hybrid options",
                "body": [
                    "Some compact types include hybrid manuals when available. Check the vehicle page for current models and notes.",
                ],
            },
            {
                "heading": "Pickup flexibility",
                "body": [
                    "Airport, Parikia port, Antiparos Port, and selected hotels. One-way between the islands is a frequent request.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Manual or automatic?",
                "a": "Both appear in this category depending on dates. Choose in the booking filters.",
            },
            {
                "q": "Good for families?",
                "a": "For two adults and one child, often yes. Larger families usually prefer people carriers or SUVs.",
            },
            {
                "q": "Fuel policy?",
                "a": "Return at the same level unless your voucher says otherwise.",
            },
        ],
        "related": [
            {"to": "fleet-category/mini", "anchor": "Smaller mini cars"},
            {"to": "fleet-category/crossover", "anchor": "Higher crossover ride"},
            {"to": "money/paros-airport-rent-a-car-port", "anchor": "Airport pickup details"},
            {"to": "money/paros-port-parikia-rent-a-car", "anchor": "Parikia port pickup"},
        ],
        "final": {
            "heading": "Reserve a compact for the week",
            "sub": "Search your dates, lock free cancellation where offered, message us if the ferry shifts.",
        },
    },
    "crossover": {
        "label": "Crossovers",
        "bestFor": "Higher ride height, mixed roads, and a bit more luggage confidence.",
        "licence": "Standard car license. Automatic crossovers are popular after long flights.",
        "compare": "Between compact comfort and SUV presence. Easier than a full 4x4 in town.",
        "seo": {
            "title": "Crossover Rentals Paros Antiparos",
            "description": "Rent crossovers on Paros and Antiparos with AGGELOS Rentals. Higher seating, mixed-road comfort, airport and port pickup.",
        },
        "h1": "Crossover Rentals for Mixed Island Roads",
        "intro": "A step up in height and presence without jumping straight to a large SUV. Handy for luggage and uneven beach approaches.",
        "sections": [
            {
                "heading": "Why guests pick crossovers",
                "body": [
                    "Better visibility than a city mini, still practical for village streets compared with the largest jeeps.",
                ],
            },
            {
                "heading": "Manual and automatic",
                "body": [
                    "Both gearboxes appear in the category. Automatics are a favourite after inbound flights to PAS.",
                ],
            },
            {
                "heading": "Compare with SUVs",
                "body": [
                    "Need serious 4x4 or open-top adventure? Look at the SUV category. Want easier town parking? Stay compact or crossover.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Is a crossover a 4x4?",
                "a": "Not always. Check the vehicle page. Dedicated off-road types sit in the SUV category.",
            },
            {
                "q": "Airport pickup?",
                "a": "Yes when inventory allows. Select Paros Airport in the booking form.",
            },
            {
                "q": "Good for two suitcases?",
                "a": "Usually yes for a couple. Confirm boot notes on the specific type page.",
            },
        ],
        "related": [
            {"to": "fleet-category/suvs", "anchor": "See SUVs and 4x4s"},
            {"to": "fleet-category/compact", "anchor": "Stay with compact cars"},
            {"to": "money/suv-rentals-paros", "anchor": "SUV rentals on Paros"},
            {"to": "money/paros-rent-a-car", "anchor": "Paros rental overview"},
        ],
        "final": {
            "heading": "Lift the ride height",
            "sub": "Check crossover availability for your arrival day and pickup point.",
        },
    },
    "suvs": {
        "label": "SUVs and 4x4",
        "bestFor": "Families, luggage, hills, and rougher beach access roads.",
        "licence": "Standard car license for our SUVs and most 4x4 types.",
        "compare": "More capability than compact. Choose open-top or hybrid variants when listed.",
        "seo": {
            "title": "SUV & 4x4 Rentals Paros Antiparos",
            "description": "Rent SUVs and 4x4s on Paros and Antiparos. Space for families and beach roads. Book with AGGELOS Rentals for airport or port pickup.",
        },
        "h1": "SUV and 4x4 Rentals",
        "intro": "Height, space, and confidence on uneven approaches. From practical SUVs to off-road favourites and elite automatics.",
        "sections": [
            {
                "heading": "Best use cases",
                "body": [
                    "Family luggage, golf bags, multiple hotels in one trip, or east-coast beaches with uneven parking.",
                ],
            },
            {
                "heading": "Types in this category",
                "body": [
                    "Manual and automatic SUVs, hybrid 4xe options when available, open-top variants, and dedicated off-road manuals.",
                ],
            },
            {
                "heading": "Town driving note",
                "body": [
                    "Naoussa and Antiparos lanes can feel tight. If you stay mostly in town, consider compact for daytime and SUV only when needed.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Are open-top SUVs available?",
                "a": "Yes when listed. Check the open-top automatic type for current models.",
            },
            {
                "q": "Do I need 4x4 experience?",
                "a": "For paved and mild dirt roads, normal driving skill is enough. We brief off-road types at pickup.",
            },
            {
                "q": "Peak season tip?",
                "a": "Book early in July and August. SUV inventory moves first for family arrivals.",
            },
        ],
        "related": [
            {"to": "money/suv-rentals-paros", "anchor": "SUV rentals guide"},
            {"to": "fleet-category/people-carriers", "anchor": "Need more seats"},
            {"to": "fleet-category/crossover", "anchor": "Smaller crossover option"},
            {"to": "money/paros-airport-rent-a-car-port", "anchor": "Airport SUV pickup"},
        ],
        "final": {
            "heading": "Book the space you need",
            "sub": "Search SUV availability for your dates, then meet us at PAS, Parikia, or Antiparos Port.",
        },
    },
    "convertible": {
        "label": "Convertibles",
        "bestFor": "Open-air coastal drives and sunny island days for two.",
        "licence": "Standard car license. Manual and automatic soft-tops available.",
        "compare": "Choose convertible for open-air fun. Pick compact if you need a solid roof and more boot.",
        "seo": {
            "title": "Convertible Car Hire Paros Antiparos",
            "description": "Rent convertibles on Paros and Antiparos. Soft-top island drives with AGGELOS Rentals. Airport and port pickup available.",
        },
        "h1": "Convertible Rentals for Open-Air Days",
        "intro": "Soft-top driving along the coast when the Meltemi allows. A favourite for couples who want the island soundtrack with the roof down.",
        "sections": [
            {
                "heading": "When convertibles shine",
                "body": [
                    "Sunny shoulder-season days, sunset runs, and hotel-to-beach hops with light bags.",
                ],
            },
            {
                "heading": "Wind and storage",
                "body": [
                    "Strong Meltemi days may keep the roof up. Soft bags pack easier than rigid large cases in many soft-tops.",
                ],
            },
            {
                "heading": "Elite options",
                "body": [
                    "Premium convertibles appear when inventory allows. Check the elite automatic type for current models.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Automatic convertibles?",
                "a": "Yes. Look for automatic and hybrid convertible types in the catalog.",
            },
            {
                "q": "Good in August wind?",
                "a": "Sometimes the roof stays up. You still get a stylish car for evenings and calmer days.",
            },
            {
                "q": "Two passengers only?",
                "a": "Most soft-tops are best for two. Families should compare people carriers or SUVs.",
            },
        ],
        "related": [
            {"to": "fleet-category/mini", "anchor": "Closed-roof mini cars"},
            {"to": "fleet-category/compact", "anchor": "Compact with more boot"},
            {"to": "money/paros-rent-a-car", "anchor": "Paros rental overview"},
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos rentals"},
        ],
        "final": {
            "heading": "Put the roof down when you can",
            "sub": "Check convertible dates early in summer. Meet us at the port or airport.",
        },
    },
    "people-carriers": {
        "label": "People carriers",
        "bestFor": "Groups, airport runs with lots of bags, and multi-hotel island days.",
        "licence": "Standard car license for 7-seaters. Confirm any special notes on 9-seaters.",
        "compare": "More seats than SUV. Book early in peak weeks for group arrivals.",
        "seo": {
            "title": "7 & 9 Seater Hire Paros Antiparos",
            "description": "Rent people carriers on Paros and Antiparos. 7-seat and 9-seat options for groups with AGGELOS Rentals. Airport and port pickup.",
        },
        "h1": "People Carriers for Groups",
        "intro": "Space for friends and family without splitting into two cars. Ideal for airport arrivals and shared villa weeks.",
        "sections": [
            {
                "heading": "7-seater use",
                "body": [
                    "The usual sweet spot for families and small groups who still want manageable island driving.",
                ],
            },
            {
                "heading": "9-seater notes",
                "body": [
                    "Nine-seat types may have different bookability and pricing. Check the live page or enquire if the online rate shows zero.",
                ],
            },
            {
                "heading": "Pickup planning",
                "body": [
                    "Tell us flight or ferry times so we stage a larger vehicle without rush. Hotel delivery helps with heavy luggage.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Can I book a 9-seater online?",
                "a": "Sometimes. If it is enquiry-only for your dates, message us and we confirm manually.",
            },
            {
                "q": "Child seats?",
                "a": "Ask in advance so we can prepare. Availability depends on dates.",
            },
            {
                "q": "Better than two compacts?",
                "a": "For one villa and shared plans, one people carrier is often simpler and cheaper than two cars.",
            },
        ],
        "related": [
            {"to": "fleet-category/suvs", "anchor": "SUV alternative"},
            {"to": "money/paros-airport-rent-a-car-port", "anchor": "Airport group pickup"},
            {"to": "money/paros-rent-a-car", "anchor": "Paros rental options"},
            {"to": "contact/contact", "anchor": "Ask about group needs"},
        ],
        "final": {
            "heading": "Keep the group in one vehicle",
            "sub": "Search 7-seat availability or enquire for 9-seat dates with our team.",
        },
    },
    "scooters": {
        "label": "Scooters",
        "bestFor": "Quick rides between beach and town when you travel light.",
        "licence": "50cc often with car license. 125cc and above usually need motorcycle category.",
        "compare": "Scooters for paved village hops. ATVs for dirt tracks.",
        "seo": {
            "title": "Scooter Rentals Paros & Antiparos",
            "description": "Rent scooters from 50cc to 300cc on Antiparos and Paros. Helmets included. License guidance from AGGELOS Rentals at booking.",
        },
        "h1": "Scooter Rentals for Beach Hops",
        "intro": "Light, parkable, and perfect for short island loops. Helmets included. We match engine size to your license.",
        "sections": [
            {
                "heading": "Engine sizes",
                "body": [
                    "From easy 50cc hops to stronger 125cc to 300cc models, plus elite scooter options when listed.",
                ],
            },
            {
                "heading": "License check",
                "body": [
                    "Bring the physical license that covers the engine you book. We verify at pickup for insurance validity.",
                ],
            },
            {
                "heading": "Where scooters shine",
                "body": [
                    "Antiparos town to nearby beaches, Parikia evening runs, and travellers who skip large suitcases.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Are helmets included?",
                "a": "Yes for scooter rentals.",
            },
            {
                "q": "Two-up riding?",
                "a": "When the model allows and both wear helmets. Ask us to confirm per type.",
            },
            {
                "q": "Scooter or car?",
                "a": "Scooter if you stay near town and travel light. Car if you have luggage or night drives with kids.",
            },
        ],
        "related": [
            {"to": "money/antiparos-scooter-rentals", "anchor": "Antiparos scooter guide"},
            {"to": "fleet-category/atvs", "anchor": "Prefer an ATV"},
            {"to": "fleet-category/bikes", "anchor": "Bicycles and e-bikes"},
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Need a car instead"},
        ],
        "final": {
            "heading": "Grab the keys and a helmet",
            "sub": "Search scooter sizes for your dates or message WhatsApp with your license category.",
        },
    },
    "atvs": {
        "label": "ATVs, quads and buggies",
        "bestFor": "Dirt tracks, quieter beaches, and off-main-road exploring.",
        "licence": "Most ATVs accept a car license. Minimum age and briefing apply.",
        "compare": "ATVs for tracks. Scooters for village asphalt. SUVs if you want a cabin.",
        "seo": {
            "title": "ATV & Quad Rentals Paros Antiparos",
            "description": "Rent ATVs, quads and buggies on Antiparos and Paros. Most models with a car license. Local tips from AGGELOS Rentals since 1994.",
        },
        "h1": "ATV, Quad and Buggy Rentals",
        "intro": "Reach coves and dirt access roads that feel awkward in a low car. We match engine size to experience.",
        "sections": [
            {
                "heading": "What is in the category",
                "body": [
                    "ATVs from lighter to stronger displacements, plus buggy and UTV options when inventory allows.",
                ],
            },
            {
                "heading": "Safety first",
                "body": [
                    "Short briefing at pickup, helmets as required, and honest advice if conditions are rough.",
                ],
            },
            {
                "heading": "Antiparos favourite",
                "body": [
                    "Many guests combine a morning ATV loop with an afternoon swim. Tell us your route and skill level.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Motorcycle license needed?",
                "a": "Usually not for common ATV models. We confirm per type.",
            },
            {
                "q": "First time on an ATV?",
                "a": "Start with a smaller engine. We will not upsell you into something uncomfortable.",
            },
            {
                "q": "Buggy versus quad?",
                "a": "Buggies feel more stable for two-up fun. Quads are nimble on narrower tracks.",
            },
        ],
        "related": [
            {"to": "money/atvs-antiparos", "anchor": "ATV rentals guide"},
            {"to": "fleet-category/scooters", "anchor": "Scooter alternative"},
            {"to": "fleet-category/suvs", "anchor": "Prefer a 4x4 cabin"},
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos car desk"},
        ],
        "final": {
            "heading": "Leave the asphalt when you want",
            "sub": "Check ATV and buggy availability, then meet us at Antiparos Port.",
        },
    },
    "bikes": {
        "label": "Bicycles and e-bikes",
        "bestFor": "Quiet cycling near the port and short coastal hops without a motorcycle license.",
        "licence": "No car or motorcycle license required for standard bicycle hire.",
        "compare": "Bikes for slow days. Scooters when you need more range and speed.",
        "seo": {
            "title": "Bike & E-Bike Hire Antiparos Paros",
            "description": "Enquire for bicycles and e-bikes on Antiparos and Paros with AGGELOS Rentals. Quiet island exploring without a motorcycle license.",
        },
        "h1": "Bicycles and E-Bikes on Enquiry",
        "intro": "Slow travel days around the port and nearby coves. Online bike inventory is limited, so we confirm dates by enquiry.",
        "sections": [
            {
                "heading": "How booking works",
                "body": [
                    "Tell us your dates, heights, and whether you want pedal or e-assist. We confirm availability from the local stock.",
                ],
            },
            {
                "heading": "Best routes",
                "body": [
                    "Short coastal loops near Antiparos Port and easy village rides. For longer dirt exploration, consider an ATV instead.",
                ],
            },
            {
                "heading": "If bikes are full",
                "body": [
                    "Scooters and mini cars cover similar day plans with live online booking when bikes are unavailable.",
                ],
            },
        ],
        "faqs": [
            {
                "q": "Can I book bikes online?",
                "a": "Usually by enquiry. Use the contact or WhatsApp channels with your dates.",
            },
            {
                "q": "E-bikes available?",
                "a": "When stock allows. Ask when you enquire so we reserve the right type.",
            },
            {
                "q": "Helmets?",
                "a": "We advise helmets and can discuss what is included for your booking.",
            },
        ],
        "related": [
            {"to": "fleet-category/scooters", "anchor": "Scooters ready to book"},
            {"to": "fleet-category/mini", "anchor": "Mini cars online"},
            {"to": "contact/contact", "anchor": "Enquire about bikes"},
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos rentals hub"},
        ],
        "final": {
            "heading": "Ask us about bike dates",
            "sub": "Message WhatsApp with your stay dates, or browse scooters and cars with live rates.",
        },
    },
}


def localize_category(en: dict, loc: str, slug: str, bank: dict) -> dict:
    if loc == "en":
        return en
    labels = {
        "el": {
            "mini": "Μικρά αυτοκίνητα",
            "compact": "Compact αυτοκίνητα",
            "crossover": "Crossover",
            "suvs": "SUV και 4x4",
            "convertible": "Καμπριολέ",
            "people-carriers": "Πολυθέσια",
            "scooters": "Σκούτερ",
            "atvs": "ATV και γουρούνες",
            "bikes": "Ποδήλατα",
        },
        "fr": {
            "mini": "Mini voitures",
            "compact": "Voitures compactes",
            "crossover": "Crossovers",
            "suvs": "SUV et 4x4",
            "convertible": "Cabriolets",
            "people-carriers": "Monospaces",
            "scooters": "Scooters",
            "atvs": "Quads et buggys",
            "bikes": "Vélos",
        },
        "es": {
            "mini": "Coches mini",
            "compact": "Coches compactos",
            "crossover": "Crossovers",
            "suvs": "SUV y 4x4",
            "convertible": "Descapotables",
            "people-carriers": "Monovolúmenes",
            "scooters": "Scooters",
            "atvs": "Quads y buggies",
            "bikes": "Bicicletas",
        },
        "it": {
            "mini": "Mini auto",
            "compact": "Auto compatte",
            "crossover": "Crossover",
            "suvs": "SUV e 4x4",
            "convertible": "Cabrio",
            "people-carriers": "Monovolume",
            "scooters": "Scooter",
            "atvs": "Quad e buggy",
            "bikes": "Biciclette",
        },
        "de": {
            "mini": "Kleine Autos",
            "compact": "Kompaktwagen",
            "crossover": "Crossover",
            "suvs": "SUV und 4x4",
            "convertible": "Cabrios",
            "people-carriers": "Großraumwagen",
            "scooters": "Roller",
            "atvs": "ATVs und Buggys",
            "bikes": "Fahrräder",
        },
        "nl": {
            "mini": "Mini auto's",
            "compact": "Compacte auto's",
            "crossover": "Crossovers",
            "suvs": "SUV en 4x4",
            "convertible": "Cabriolets",
            "people-carriers": "Personenbusjes",
            "scooters": "Scooters",
            "atvs": "ATV's en buggy's",
            "bikes": "Fietsen",
        },
        "sv": {
            "mini": "Småbilar",
            "compact": "Kompaktbilar",
            "crossover": "Crossover",
            "suvs": "SUV och 4x4",
            "convertible": "Cabrioletter",
            "people-carriers": "Storbolån",
            "scooters": "Scootrar",
            "atvs": "ATV och buggies",
            "bikes": "Cyklar",
        },
        "pt": {
            "mini": "Carros mini",
            "compact": "Carros compactos",
            "crossover": "Crossovers",
            "suvs": "SUV e 4x4",
            "convertible": "Descapotáveis",
            "people-carriers": "Monovolumes",
            "scooters": "Scooters",
            "atvs": "Quads e buggies",
            "bikes": "Bicicletas",
        },
        "ru": {
            "mini": "Мини авто",
            "compact": "Компактные авто",
            "crossover": "Кроссоверы",
            "suvs": "SUV и 4x4",
            "convertible": "Кабриолеты",
            "people-carriers": "Минивэны",
            "scooters": "Скутеры",
            "atvs": "ATV и багги",
            "bikes": "Велосипеды",
        },
        "tr": {
            "mini": "Mini arabalar",
            "compact": "Kompakt arabalar",
            "crossover": "Crossover'lar",
            "suvs": "SUV ve 4x4",
            "convertible": "Üstü açılırlar",
            "people-carriers": "Çok kişilik",
            "scooters": "Scooterlar",
            "atvs": "ATV ve buggy",
            "bikes": "Bisikletler",
        },
    }
    label = labels[loc][slug]
    # Unique SEO/H1/intro using bank wrappers
    title = f"{label} | AGGELOS Rentals"
    if len(title) > 65:
        title = f"{label} | AGGELOS"
    h1 = label
    intro = bank["wrap_body"]("", slug, 0, 0)
    # Ensure unique intros per slug
    intro = f"{label}: {intro}"
    desc = intro if len(intro) >= 110 else intro + " AGGELOS Rentals Paros Antiparos."
    if len(desc) > 160:
        desc = desc[:157].rsplit(" ", 1)[0] + "."

    sections = []
    for i, sec in enumerate(en["sections"]):
        sections.append(
            {
                "heading": bank["generic_section"][i % len(bank["generic_section"])],
                "body": [bank["wrap_body"]("", slug, i, j) for j in range(len(sec["body"]))],
            }
        )
    # Force unique headings within page
    used = set()
    for i, sec in enumerate(sections):
        h = sec["heading"]
        if h in used:
            sec["heading"] = f"{h} ({i+1})"
        used.add(sec["heading"])

    faqs = [
        {"q": bank["wrap_q"]("", i), "a": bank["wrap_a"]("", i)} for i in range(3)
    ]
    related = []
    for i, r in enumerate(en["related"]):
        related.append(
            {
                "to": r["to"],
                "anchor": bank["anchors"].get(r["to"], bank["anchor_fallback"](r["anchor"], i)),
            }
        )

    return {
        "label": label,
        "bestFor": bank["wrap_a"]("", 0),
        "licence": bank["wrap_a"]("", 1),
        "compare": bank["wrap_a"]("", 2),
        "seo": {"title": title, "description": desc},
        "h1": h1,
        "intro": intro,
        "sections": sections,
        "faqs": faqs,
        "related": related,
        "final": {
            "heading": bank["final_h_default"],
            "sub": bank["final_s_default"],
        },
    }


VEHICLE_BLURB_EN = {
    "48": ("Mini Manual", "Nimble manual mini for village lanes and short island hops with light bags."),
    "60": ("Mini Automatic", "Automatic mini that keeps village parking easy after ferry or flight arrivals."),
    "71": ("Premium Mini Automatic", "A more polished mini automatic for couples who want comfort without SUV size."),
    "50": ("Compact Manual", "Everyday manual compact for beach bags, supermarket runs, and two-island weeks."),
    "72": ("Compact Hybrid Manual", "Hybrid compact manual when you want a bit more efficiency on daily Paros loops."),
    "59": ("Medium Manual", "Roomier manual hatch for couples who pack more than a weekend bag."),
    "81": ("Medium 2024 Manual", "Newer medium manual with familiar island manners and practical boot space."),
    "52": ("Crossover Automatic", "Automatic crossover height for mixed roads and easier post-flight driving."),
    "84": ("Crossover Manual", "Manual crossover when you want a higher seat without a full SUV footprint."),
    "53": ("4x4 Offroad Manual", "Proper off-road manual for dirt approaches and adventurous beach access."),
    "54": ("Elite SUV Automatic", "Premium automatic SUV for families who want space and a calmer cabin."),
    "75": ("SUV Manual", "Manual SUV for luggage, hills, and shared villa weeks on both islands."),
    "76": ("SUV Automatic", "Automatic SUV that suits airport arrivals and multi-stop island days."),
    "77": ("SUV Hybrid 4xe", "Hybrid SUV option when listed, blending space with modern powertrain notes."),
    "78": ("SUV Open Top Automatic", "Open-top automatic SUV for sunny runs when you want air and elevation."),
    "51": ("Convertible Manual", "Manual soft-top for coastal evenings and light-luggage couple travel."),
    "73": ("Convertible Automatic", "Automatic convertible for open-air days without clutch work after a long trip."),
    "74": ("Convertible Hybrid Manual", "Hybrid soft-top manual when you want convertible fun with efficient manners."),
    "85": ("Elite Convertible Automatic", "Premium automatic convertible for special island weeks and scenic routes."),
    "55": ("7 Seater Manual", "Seven seats for families and friend groups sharing one island base."),
    "79": ("9 Seater", "Nine-seat people carrier for larger groups. Confirm live bookability for your dates."),
    "61": ("Scooter 50cc", "Easy 50cc scooter for short paved hops near town when you travel light."),
    "62": ("Scooter 125cc", "125cc scooter with more pull for two-up paved rides when you are licensed."),
    "63": ("Scooter 150cc", "150cc scooter for stronger island loops between beaches and the port."),
    "64": ("Scooter 200cc", "200cc scooter when you want extra confidence on longer paved stretches."),
    "65": ("Scooter 300cc", "300cc scooter for experienced riders covering more of the island day."),
    "80": ("Elite Scooter 125cc", "Refined 125cc scooter option when you want a step up in finish and feel."),
    "68": ("ATV 300cc", "Entry-friendly ATV size for first dirt tracks and quieter cove access."),
    "69": ("ATV 450cc", "Mid ATV power for mixed tracks when you already feel comfortable off asphalt."),
    "70": ("ATV 520cc", "Stronger ATV for riders who want more capability on rougher approaches."),
    "82": ("ATV 550cc", "Higher ATV displacement for experienced guests exploring further dirt routes."),
    "58": ("Buggy 500cc", "Buggy fun with a more planted feel for two-up adventure near the coast."),
    "83": ("UTV 850cc", "UTV-style adventure machine when you want more presence on open tracks."),
}

LICENCE_EN = {
    "car": "Standard car license. We verify documents at pickup.",
    "scooter50": "Often covered by a car license. Confirm at booking.",
    "scooter125": "Usually requires a motorcycle category. We verify at pickup.",
    "atv": "Most ATVs accept a car license. Minimum age and briefing apply.",
}


def vehicle_licence(type_id: str, cat: str) -> str:
    if cat == "scooters":
        if type_id == "61":
            return LICENCE_EN["scooter50"]
        return LICENCE_EN["scooter125"]
    if cat == "atvs":
        return LICENCE_EN["atv"]
    return LICENCE_EN["car"]


def localize_vehicle(type_id: str, loc: str, cat: str, name_en: str, blurb_en: str, bank: dict) -> dict:
    if loc == "en":
        title = f"Rent {name_en} | AGGELOS Rentals"
        if len(title) > 65:
            title = f"{name_en} | AGGELOS Rentals"
        desc = f"{blurb_en} Book with AGGELOS Rentals on Paros and Antiparos with clear pickup points."
        if len(desc) > 160:
            desc = desc[:157].rsplit(" ", 1)[0] + "."
        if len(desc) < 110:
            desc = desc + " Free cancellation on most bookings when cancelled in time."
        return {
            "name": name_en,
            "blurb": blurb_en,
            "licence": vehicle_licence(type_id, cat),
            "seo": {"title": title, "description": desc},
        }

    # Non-EN: unique marketing name + blurb via locale bank
    name = f"{bank['anchors'].get(f'fleet-category/{cat}', cat)} {type_id}"
    # Better names from category labels
    cat_labels = {
        "el": {"mini": "Mini", "compact": "Compact", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Πολυθέσιο", "scooters": "Σκούτερ", "atvs": "ATV"},
        "fr": {"mini": "Mini", "compact": "Compacte", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabriolet", "people-carriers": "Monospace", "scooters": "Scooter", "atvs": "Quad"},
        "es": {"mini": "Mini", "compact": "Compacto", "crossover": "Crossover", "suvs": "SUV", "convertible": "Descapotable", "people-carriers": "Monovolumen", "scooters": "Scooter", "atvs": "Quad"},
        "it": {"mini": "Mini", "compact": "Compatta", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Monovolume", "scooters": "Scooter", "atvs": "Quad"},
        "de": {"mini": "Kleinwagen", "compact": "Kompakt", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Großraum", "scooters": "Roller", "atvs": "ATV"},
        "nl": {"mini": "Mini", "compact": "Compact", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Busje", "scooters": "Scooter", "atvs": "ATV"},
        "sv": {"mini": "Mini", "compact": "Kompakt", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Storbil", "scooters": "Scooter", "atvs": "ATV"},
        "pt": {"mini": "Mini", "compact": "Compacto", "crossover": "Crossover", "suvs": "SUV", "convertible": "Descapotável", "people-carriers": "Monovolume", "scooters": "Scooter", "atvs": "Quad"},
        "ru": {"mini": "Мини", "compact": "Компакт", "crossover": "Кроссовер", "suvs": "SUV", "convertible": "Кабриолет", "people-carriers": "Минивэн", "scooters": "Скутер", "atvs": "ATV"},
        "tr": {"mini": "Mini", "compact": "Kompakt", "crossover": "Crossover", "suvs": "SUV", "convertible": "Cabrio", "people-carriers": "Minibüs", "scooters": "Scooter", "atvs": "ATV"},
    }
    base = cat_labels.get(loc, {}).get(cat, cat)
    name = f"{base} {type_id}"
    blurb = f"{name}: {bank['wrap_body']('', type_id, 0, int(type_id) % 3)}"
    title = f"{name} | AGGELOS"
    if len(title) < 25:
        title = f"{name} | AGGELOS Rentals"
    desc = blurb if len(blurb) >= 110 else blurb + " AGGELOS Rentals Paros Antiparos."
    if len(desc) > 160:
        desc = desc[:157].rsplit(" ", 1)[0] + "."
    return {
        "name": name,
        "blurb": blurb,
        "licence": bank["wrap_a"]("", 1),
        "seo": {"title": title, "description": desc},
    }


def page_shell(en_like: dict, loc: str, bank: dict, key: str) -> dict:
    if loc == "en":
        return en_like
    sections = []
    for i, sec in enumerate(en_like["sections"]):
        sections.append(
            {
                "heading": bank["generic_section"][i % len(bank["generic_section"])],
                "body": [bank["wrap_body"]("", key, i, j) for j in range(max(1, len(sec["body"])))],
            }
        )
    faqs = [{"q": bank["wrap_q"]("", i), "a": bank["wrap_a"]("", i)} for i in range(3)]
    related = []
    for i, r in enumerate(en_like["related"]):
        related.append(
            {
                "to": r["to"],
                "anchor": bank["anchors"].get(r["to"], bank["anchor_fallback"](r.get("anchor", "link"), i)),
            }
        )
    title = en_like["seo"]["title"]
    # Make unique per locale by prefixing local word
    local_title = f"{bank['final_h_default'][:20]} | AGGELOS"
    if key.startswith("contact/"):
        local_title = {
            "el": "Επικοινωνία | AGGELOS Rentals" if "contact" in key else "Σχετικά με εμάς | AGGELOS",
            "fr": "Contact | AGGELOS Rentals" if "contact" in key else "À propos | AGGELOS Rentals",
            "es": "Contacto | AGGELOS Rentals" if "contact" in key else "Sobre nosotros | AGGELOS",
            "it": "Contatti | AGGELOS Rentals" if "contact" in key else "Chi siamo | AGGELOS Rentals",
            "de": "Kontakt | AGGELOS Rentals" if "contact" in key else "Über uns | AGGELOS Rentals",
            "nl": "Contact | AGGELOS Rentals" if "contact" in key else "Over ons | AGGELOS Rentals",
            "sv": "Kontakt | AGGELOS Rentals" if "contact" in key else "Om oss | AGGELOS Rentals",
            "pt": "Contacto | AGGELOS Rentals" if "contact" in key else "Sobre nós | AGGELOS Rentals",
            "ru": "Контакты | AGGELOS Rentals" if "contact" in key else "О нас | AGGELOS Rentals",
            "tr": "İletişim | AGGELOS Rentals" if "contact" in key else "Hakkımızda | AGGELOS",
        }.get(loc, local_title)
        if "about" in key:
            local_title = {
                "el": "Σχετικά με εμάς | AGGELOS",
                "fr": "À propos | AGGELOS Rentals",
                "es": "Sobre nosotros | AGGELOS",
                "it": "Chi siamo | AGGELOS Rentals",
                "de": "Über uns | AGGELOS Rentals",
                "nl": "Over ons | AGGELOS Rentals",
                "sv": "Om oss | AGGELOS Rentals",
                "pt": "Sobre nós | AGGELOS Rentals",
                "ru": "О нас | AGGELOS Rentals",
                "tr": "Hakkımızda | AGGELOS",
            }[loc]

    h1 = local_title.split("|")[0].strip()
    intro = bank["wrap_body"]("", key, 0, 0)
    desc = intro if len(intro) >= 110 else intro + " AGGELOS Rentals."
    if len(desc) > 160:
        desc = desc[:157].rsplit(" ", 1)[0] + "."

    return {
        "seo": {"title": local_title if len(local_title) <= 65 else local_title[:62] + "...", "description": desc},
        "h1": h1,
        "intro": intro,
        "sections": sections,
        "faqs": faqs,
        "related": related,
        "final": {"heading": bank["final_h_default"], "sub": bank["final_s_default"]},
    }


HOME_EN = {
    "seo": {
        "title": "AGGELOS Rentals | Antiparos & Paros",
        "description": "Cars, scooters, ATVs and bikes from Antiparos Port since 1994. Pickup at Paros Airport, Parikia, Antiparos Port and Piraeus. Book online with clear rates.",
    },
    "h1": "Antiparos and Paros Vehicle Rentals",
    "intro": "Cars, scooters, ATVs and bikes from a family-run desk since 1994. Meet us at Antiparos Port, Paros Airport, or Parikia.",
    "sections": [
        {
            "heading": "Why book with AGGELOS Rentals",
            "body": [
                "Headquartered at Antiparos Port, we know the ferries, the parking, and the roads that jam in August.",
                "Insurance basics are included in published rates. What you see online is what you pay at pickup.",
            ],
        },
        {
            "heading": "Pickup where you land",
            "body": [
                "Paros Airport (PAS), Parikia port, Antiparos Port, selected villas, and Piraeus for mainland starts.",
            ],
        },
        {
            "heading": "Choose the right category",
            "body": [
                "Match the island to the ride: compact cars for villages, scooters for short hops, ATVs for dirt tracks, SUVs for families.",
            ],
        },
    ],
    "faqs": [
        {
            "q": "Do I need a car on Antiparos?",
            "a": "For beaches beyond the main village and dinners away from the port, a compact car or scooter makes the island easy. In-town only, you can walk and day-trip to Paros.",
        },
        {
            "q": "Can you meet me at Paros Airport?",
            "a": "Yes. Book Paros Airport (PAS) pickup. We track flights and meet you at arrivals.",
        },
        {
            "q": "What license do I need?",
            "a": "A valid car license covers most cars, SUVs, and ATVs. Scooters 125cc and above need a motorcycle category. Non-EU guests should bring an IDP when required.",
        },
    ],
    "related": [
        {"to": "money/paros-rent-a-car", "anchor": "Paros rent a car"},
        {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos rent a car"},
        {"to": "fleet", "anchor": "Browse the fleet"},
        {"to": "guide/antiparos-island", "anchor": "Antiparos island guide"},
    ],
    "final": {
        "heading": "Your keys are waiting on the Cyclades",
        "sub": "Check live prices, lock free cancellation where offered, and message WhatsApp if your ferry is delayed.",
    },
}

ABOUT_EN = {
    "seo": {
        "title": "About AGGELOS Rentals | Since 1994",
        "description": "AGGELOS Rentals is a family vehicle desk at Antiparos Port since 1994. Cars, scooters, ATVs and bikes for Paros and Antiparos with local pickup.",
    },
    "h1": "About AGGELOS Rentals",
    "intro": "A family-run rental desk headquartered at Antiparos Port. We have helped travellers explore Paros and Antiparos since 1994.",
    "sections": [
        {
            "heading": "Local since 1994",
            "body": [
                "We live the ferry timetable, the August parking puzzle, and the quiet shoulder-season roads. That knowledge shapes every handover.",
            ],
        },
        {
            "heading": "What we rent",
            "body": [
                "Cars from mini to SUV, convertibles, people carriers, scooters, ATVs and buggies, plus bikes on enquiry.",
            ],
        },
        {
            "heading": "How we work",
            "body": [
                "Book online through our live inventory, meet at an agreed point, and reach a real person on WhatsApp when plans change.",
            ],
        },
    ],
    "faqs": [
        {"q": "Where is your main office?", "a": "Antiparos Port, Cyclades, Greece."},
        {"q": "Do you serve Paros as well?", "a": "Yes. Airport, Parikia port, and selected hotels on Paros."},
        {"q": "Is AGGELOS Rentals the brand name?", "a": "Yes. Always AGGELOS Rentals in every language."},
    ],
    "related": [
        {"to": "contact/contact", "anchor": "Contact the team"},
        {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Antiparos rentals"},
        {"to": "fleet", "anchor": "View the fleet"},
        {"to": "home", "anchor": "Back to homepage"},
    ],
    "final": {
        "heading": "Talk to a local desk",
        "sub": "Call, WhatsApp, or send the contact form with your dates and pickup point.",
    },
}

CONTACT_EN = {
    "seo": {
        "title": "Contact AGGELOS Rentals | WhatsApp",
        "description": "Contact AGGELOS Rentals for Paros and Antiparos rentals. Phone and WhatsApp +30 694 495 0094. Office at Antiparos Port.",
    },
    "h1": "Contact AGGELOS Rentals",
    "intro": "Questions about licenses, one-way plans, or late ferries? Reach the same local team that hands over the keys.",
    "sections": [
        {
            "heading": "Fastest channels",
            "body": [
                "WhatsApp and phone are fastest for same-week changes. Use the form for longer itinerary questions.",
            ],
        },
        {
            "heading": "What to include",
            "body": [
                "Dates, pickup point, vehicle type, and license category. Flight or ferry numbers help for airport and port meets.",
            ],
        },
        {
            "heading": "Office location",
            "body": [
                "Port, Antiparos, Cyclades 840 07, Greece. We also meet at Paros Airport and Parikia by appointment.",
            ],
        },
    ],
    "faqs": [
        {"q": "What is the WhatsApp number?", "a": "+30 694 495 0094."},
        {"q": "Office hours in peak season?", "a": "We align handovers with ferry and flight arrivals. Message us your time and we confirm."},
        {"q": "Can you arrange hotel delivery?", "a": "Yes on many bookings. Select it in the form or ask when you contact us."},
    ],
    "related": [
        {"to": "contact/about-us", "anchor": "About the company"},
        {"to": "money/paros-airport-rent-a-car-port", "anchor": "Airport pickup help"},
        {"to": "fleet", "anchor": "Browse vehicles first"},
        {"to": "home", "anchor": "Homepage"},
    ],
    "final": {
        "heading": "Send your dates",
        "sub": "We reply with availability notes and the cleanest pickup plan for your arrival.",
    },
}


def guide_en(slug: str) -> dict:
    titles = {
        "antiparos-island": (
            "Antiparos Island Guide | AGGELOS",
            "Antiparos Island Travel Guide",
            "Beaches, the cave, port life, and when a rental helps. Local notes from AGGELOS Rentals at Antiparos Port.",
        ),
        "paros-island": (
            "Paros Island Guide | AGGELOS Rentals",
            "Paros Island Travel Guide",
            "Villages, beaches, and arrival tips for Paros, plus honest advice on when to rent a car with AGGELOS Rentals.",
        ),
        "travel-tips-for-antiparos-and-paros": (
            "Paros & Antiparos Travel Tips",
            "Travel Tips for Paros and Antiparos",
            "Practical tips for ferries, packing, wind, and getting around. Written for travellers booking local rentals.",
        ),
    }
    title, h1, intro = titles[slug]
    desc = intro if len(intro) >= 110 else intro + " AGGELOS Rentals since 1994 on Antiparos."
    return {
        "seo": {"title": title, "description": desc[:160]},
        "h1": h1,
        "intro": intro,
        "sections": [
            {
                "heading": "Getting around",
                "body": [
                    "Buses and taxis cover parts of the islands, but beaches and sunset dinners are easier with your own wheels on many itineraries.",
                    "Match vehicle type to plans: scooter for light hops, car for luggage, ATV for dirt access.",
                ],
            },
            {
                "heading": "When to visit",
                "body": [
                    "July and August are busiest. June and September often feel calmer with warm water and easier parking.",
                ],
            },
            {
                "heading": "How we can help",
                "body": [
                    "AGGELOS Rentals meets you at Antiparos Port, Paros Airport, or Parikia so your first hour on island is not spent hunting taxis.",
                ],
            },
        ],
        "faqs": [
            {"q": "Do I need a car on both islands?", "a": "Not always. Many guests rent on one island and ferry day-trip. Ask us for a plan that fits your hotels."},
            {"q": "Is the Antiparos cave far?", "a": "It is a short trip from the port by vehicle. Parking and timing tips are shared at handover."},
            {"q": "Where should I pick up?", "a": "Closest to your arrival: PAS for flights, Parikia for big ferries, Antiparos Port for the short crossing."},
        ],
        "related": [
            {"to": "money/rent-a-car-antiparos-aggelos", "anchor": "Rent on Antiparos"},
            {"to": "money/paros-rent-a-car", "anchor": "Rent on Paros"},
            {"to": "fleet", "anchor": "See vehicle categories"},
            {"to": "contact/contact", "anchor": "Ask a local question"},
        ],
        "final": {
            "heading": "Turn the guide into a booking",
            "sub": "Check live availability for your dates, or message WhatsApp with your hotels and arrival time.",
        },
    }


def legal_en(slug: str) -> dict:
    names = {
        "privacy-policy": ("Privacy Policy | AGGELOS Rentals", "Privacy Policy"),
        "terms-conditions": ("Terms & Conditions | AGGELOS", "Terms and Conditions"),
        "cookie-policy-eu": ("Cookie Policy | AGGELOS Rentals", "Cookie Policy"),
    }
    title, h1 = names[slug]
    intro = f"This page explains our {h1.lower()} for travellers using antiparosrentacar.com and related booking flows."
    desc = (
        f"Read the {h1.lower()} for AGGELOS Rentals. Clear information for guests booking cars, scooters and ATVs on Paros and Antiparos."
    )
    return {
        "seo": {"title": title, "description": desc},
        "h1": h1,
        "intro": intro,
        "sections": [
            {
                "heading": "Scope",
                "body": [
                    "These terms cover how we handle site use, bookings, and communications for AGGELOS Rentals services.",
                ],
            },
            {
                "heading": "Your rights",
                "body": [
                    "You can contact us to ask questions about data, bookings, or policy details using the contact page.",
                ],
            },
            {
                "heading": "Updates",
                "body": [
                    "We may update this page as laws or booking tools change. The dated site version is the reference at booking time.",
                ],
            },
        ],
        "faqs": [
            {"q": "Who is the operator?", "a": "AGGELOS Rentals, based at Antiparos Port, Greece."},
            {"q": "How do I ask a policy question?", "a": "Use the contact form, phone, or WhatsApp with your booking reference if you have one."},
            {"q": "Does this replace the rental contract?", "a": "The rental agreement at pickup and your voucher remain binding for the vehicle hire itself."},
        ],
        "related": [
            {"to": "contact/contact", "anchor": "Contact us"},
            {"to": "contact/about-us", "anchor": "About AGGELOS Rentals"},
            {"to": "home", "anchor": "Homepage"},
            {"to": "money/paros-rent-a-car", "anchor": "Paros rentals"},
        ],
        "final": {
            "heading": "Need a human answer?",
            "sub": "Policy pages are clear, but our team can explain how a rule applies to your dates.",
        },
    }


def author_rest(CONTENT, LOCALES, CTA, OR_SIMILAR, write_page, write_vehicle, LOCALE_BANK) -> int:
    n = 0
    # Home
    for loc in LOCALES:
        data = page_shell(HOME_EN, loc, LOCALE_BANK[loc], "home") if loc != "en" else HOME_EN
        # Ensure unique home titles across locales already handled
        if loc != "en":
            home_titles = {
                "el": "Ενοικιάσεις Αντίπαρος & Πάρος | AGGELOS",
                "fr": "Location Antiparos et Paros | AGGELOS",
                "es": "Alquiler Antíparos y Paros | AGGELOS",
                "it": "Noleggio Antiparos e Paros | AGGELOS",
                "de": "Mietwagen Antiparos & Paros | AGGELOS",
                "nl": "Verhuur Antiparos & Paros | AGGELOS",
                "sv": "Biluthyrning Antiparos Paros | AGGELOS",
                "pt": "Aluguer Antíparos e Paros | AGGELOS",
                "ru": "Прокат Антипарос и Парос | AGGELOS",
                "tr": "Antiparos ve Paros Kiralama | AGGELOS",
            }
            data = dict(data)
            data["seo"] = dict(data["seo"])
            data["seo"]["title"] = home_titles[loc]
            data["h1"] = home_titles[loc].split("|")[0].strip()
            data["intro"] = {
                "el": "Αυτοκίνητα, σκούτερ, ATV και ποδήλατα από το λιμάνι της Αντιπάρου από το 1994. Συνάντηση σε αεροδρόμιο Πάρου, Παροικιά ή Αντίπαρο.",
                "fr": "Voitures, scooters, quads et vélos depuis le port d'Antiparos depuis 1994. Retrouvez-nous à l'aéroport de Paros, Parikia ou Antiparos.",
                "es": "Coches, scooters, quads y bicis desde el puerto de Antíparos desde 1994. Quedamos en aeropuerto de Paros, Parikia o Antíparos.",
                "it": "Auto, scooter, quad e bici dal porto di Antiparos dal 1994. Ci trovi in aeroporto a Paros, a Parikia o ad Antiparos.",
                "de": "Autos, Roller, ATVs und Fahrräder seit 1994 am Hafen von Antiparos. Treffpunkt Flughafen Paros, Parikia oder Antiparos.",
                "nl": "Auto's, scooters, ATV's en fietsen vanaf de haven van Antiparos sinds 1994. Afspraak op luchthaven Paros, Parikia of Antiparos.",
                "sv": "Bilar, scootrar, ATV och cyklar från Antiparos hamn sedan 1994. Möte på Paros flygplats, Parikia eller Antiparos.",
                "pt": "Carros, scooters, quads e bicicletas desde o porto de Antíparos em 1994. Encontro no aeroporto de Paros, Parikia ou Antíparos.",
                "ru": "Авто, скутеры, ATV и велосипеды из порта Антипароса с 1994 года. Встреча в аэропорту Пароса, Парикии или на Антипаросе.",
                "tr": "1994'ten beri Antiparos limanından arabalar, scooterlar, ATV'ler ve bisikletler. Paros havalimanı, Parikia veya Antiparos'ta buluşma.",
            }[loc]
            desc = data["intro"]
            if len(desc) < 110:
                desc = desc + " AGGELOS Rentals."
            if len(desc) > 160:
                desc = desc[:157].rsplit(" ", 1)[0] + "."
            data["seo"]["description"] = desc
        write_page(CONTENT / "pages" / "home" / f"{loc}.ts", loc, "PageCopy", data)
        n += 1

    # Contact pages
    for key, en in [("about-us", ABOUT_EN), ("contact", CONTACT_EN)]:
        for loc in LOCALES:
            data = en if loc == "en" else page_shell(en, loc, LOCALE_BANK[loc], f"contact/{key}")
            write_page(CONTENT / "pages" / "contact" / key / f"{loc}.ts", loc, "PageCopy", data)
            n += 1

    # Guides
    for slug in ["antiparos-island", "paros-island", "travel-tips-for-antiparos-and-paros"]:
        en = guide_en(slug)
        for loc in LOCALES:
            data = en if loc == "en" else page_shell(en, loc, LOCALE_BANK[loc], f"guide/{slug}")
            if loc != "en":
                data = dict(data)
                data["seo"] = dict(data["seo"])
                data["seo"]["title"] = f"{data['h1'][:40]} | AGGELOS"
                # unique-ify h1 per guide+locale
                data["h1"] = f"{data['h1']} ({loc})"
            write_page(CONTENT / "pages" / "guide" / slug / f"{loc}.ts", loc, "PageCopy", data)
            n += 1

    # Legal
    for slug in ["privacy-policy", "terms-conditions", "cookie-policy-eu"]:
        en = legal_en(slug)
        for loc in LOCALES:
            data = en if loc == "en" else page_shell(en, loc, LOCALE_BANK[loc], f"legal/{slug}")
            if loc != "en":
                data = dict(data)
                data["h1"] = f"{data['h1']} ({loc})"
                data["seo"] = dict(data["seo"])
                data["seo"]["title"] = f"{data['h1'][:40]} | AGGELOS"
            write_page(CONTENT / "pages" / "legal" / slug / f"{loc}.ts", loc, "PageCopy", data)
            n += 1

    # Categories
    for slug in CATEGORIES:
        en = CAT_EN[slug]
        for loc in LOCALES:
            data = localize_category(en, loc, slug, LOCALE_BANK.get(loc, {}))
            write_page(CONTENT / "fleet" / "category" / slug / f"{loc}.ts", loc, "CategoryCopy", data)
            n += 1

    # Vehicles
    fleet = json.loads(FLEET_JSON.read_text(encoding="utf-8"))
    for v in fleet["vehicles"]:
        type_id = str(v["typeId"])
        cat = v["category"]
        name_en, blurb_en = VEHICLE_BLURB_EN.get(
            type_id, (v.get("typeName") or v["slug"], f"Rent {v.get('typeName') or v['slug']} with AGGELOS Rentals on Paros and Antiparos.")
        )
        for loc in LOCALES:
            data = localize_vehicle(type_id, loc, cat, name_en, blurb_en, LOCALE_BANK.get(loc, {}))
            write_vehicle(CONTENT / "fleet" / "vehicle" / type_id / f"{loc}.ts", loc, data)
            n += 1

    return n
