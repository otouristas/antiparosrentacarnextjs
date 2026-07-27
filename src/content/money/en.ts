import type { MoneyContent } from "./types";

export const moneyEn: Record<string, MoneyContent> = {
  "paros-rent-a-car": {
    h1: "Paros Rent a Car, Airport, Port & Hotel Delivery",
    intro:
      "Explore Paros with a local fleet based next door on Antiparos. Free pickup at Paros Airport (PAS) and Parikia port, transparent rates, and fast WhatsApp support.",
    ctaPrimary: "Check Paros availability",
    fleetTitle: "Best vehicle types for Paros",
    faqTitle: "Paros car rental FAQs",
    finalTitle: "Ready for Paros roads?",
    finalSubtitle:
      "Book online, meet us at the airport or port, and drive to Naoussa, Golden Beach, or the Antiparos ferry.",
    sections: [
      {
        title: "Why a rental matters on Paros",
        paragraphs: [
          "Buses cover the main towns, but beaches, sunset dinners, and last ferries reward having your own wheels. A compact car or scooter turns Paros into a flexible island, not a transfer timetable.",
          "AGGELOS Rentals is family-run since 1994 with desks that understand both Paros traffic and the Antiparos crossing. You get clear pickup instructions and no surprise desk fees.",
        ],
      },
      {
        title: "Airport and port pickup",
        paragraphs: [
          "Land at Paros Airport (PAS)? We meet you at arrivals with flight tracking. Arrive by ferry at Parikia? Collect steps from the gangway or arrange hotel delivery.",
          "One-way options between Paros and Antiparos keep multi-island plans simple.",
        ],
      },
      {
        title: "Why choose AGGELOS Rentals on Paros",
        paragraphs: [
          "Local knowledge, insurance basics included, free cancellation on most bookings when cancelled in time, and a real person on WhatsApp if your ferry shifts.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Compact & economy cars",
        body: "Best for couples and village parking in Parikia and Naoussa.",
      },
      {
        title: "SUVs & jeeps",
        body: "Comfort for families and rougher beach access roads.",
      },
      {
        title: "Scooters",
        body: "Quick hops between beaches when travelling light.",
      },
      {
        title: "ATVs / quads",
        body: "Dirt tracks and off-main-road exploration with a car license for most models.",
      },
    ],
    faqs: [
      {
        q: "Where do I pick up a rental car on Paros?",
        a: "Paros Airport (PAS), Parikia port, or selected hotels/villas. Choose your location when you search.",
      },
      {
        q: "Can I take the car to Antiparos?",
        a: "Yes on agreed one-way or island-crossing rentals. Confirm ferry rules for your vehicle type when booking.",
      },
      {
        q: "Is fuel included?",
        a: "Standard fuel policy applies, return at the same level unless your voucher states otherwise.",
      },
    ],
    related: [
      { id: "paros-airport-rent-a-car-port", label: "Paros Airport pickup" },
      { id: "paros-port-parikia-rent-a-car", label: "Parikia port pickup" },
      { id: "rent-a-car-antiparos-aggelos", label: "Antiparos rent a car" },
      { href: "/fleet/mini/", label: "Car fleet" },
      { href: "/faq/", label: "FAQ hub" },
    ],
  },

  "rent-a-car-antiparos-aggelos": {
    h1: "Antiparos Rent a Car, Port Pickup & Local Fleet",
    intro:
      "The only rental desk headquartered on Antiparos. Meet us at the port for cars, scooters, ATVs and bikes, then reach every beach without waiting on buses.",
    ctaPrimary: "Book Antiparos rental",
    fleetTitle: "What to rent on Antiparos",
    faqTitle: "Antiparos rental FAQs",
    finalTitle: "Land on Antiparos ready to drive",
    finalSubtitle:
      "Ferry in, grab the keys at the port, and be at Soros or Agios Georgios while others wait for taxis.",
    sections: [
      {
        title: "Island-specific rental overview",
        paragraphs: [
          "Antiparos is compact but spread out. Beaches, tavernas, and sunset spots sit beyond comfortable walking distance from the port once bags are involved.",
          "As a local operator since 1994, we size recommendations to how you travel, couples, families, or scooter-only weekends.",
        ],
      },
      {
        title: "Who needs a car on Antiparos",
        paragraphs: [
          "Stay outside the main village, travel with kids, or plan daily beach hopping? A car or ATV pays for itself on day one. Hotel in town and mostly walking? A scooter or e-bike may be enough.",
        ],
      },
      {
        title: "Pickup and delivery",
        paragraphs: [
          "Primary meeting point: Antiparos Port, steps from the ferry. Hotel and villa delivery across the island is available, select it in the booking form.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Mini & compact cars",
        body: "Easy parking in the village lanes.",
      },
      {
        title: "Scooters",
        body: "The classic Antiparos hop between beaches.",
      },
      {
        title: "ATVs",
        body: "For dirt roads and wilder coastline access.",
      },
      {
        title: "Bikes & e-bikes",
        body: "Slow travel days around the port and nearby coves.",
      },
    ],
    faqs: [
      {
        q: "Where is your Antiparos office?",
        a: "At Antiparos Port, easy to find as you leave the ferry.",
      },
      {
        q: "Can I pick up on Paros and drop on Antiparos?",
        a: "Yes. One-way rentals between the islands are a core part of how we work.",
      },
      {
        q: "Do you rent scooters and ATVs as well as cars?",
        a: "Yes, cars, scooters, ATVs/buggies, and bicycles from the same local fleet.",
      },
    ],
    related: [
      { id: "paros-rent-a-car", label: "Paros rent a car" },
      { id: "antiparos-scooter-rentals", label: "Scooter rentals" },
      { id: "atvs-antiparos", label: "ATV rentals" },
      { href: "/fleet/", label: "Full fleet" },
      { id: "contact", label: "Contact" },
    ],
  },

  "paros-airport-rent-a-car-port": {
    h1: "Paros Airport Car Rental, Meet at PAS Arrivals",
    intro:
      "Skip the taxi queue. Book Paros Airport (PAS) pickup with AGGELOS Rentals, flight-aware handover and a clear path to your hotel or the Antiparos ferry.",
    ctaPrimary: "Book airport pickup",
    fleetTitle: "Suggested fleet after landing",
    faqTitle: "Airport pickup FAQs",
    finalTitle: "Land, collect, drive",
    finalSubtitle:
      "Tell us your flight details at booking. We’ll be at arrivals when you clear the terminal.",
    sections: [
      {
        title: "Pickup process",
        paragraphs: [
          "Select Paros Airport (PAS) in the booking widget. Share your flight number if requested. We track delays and meet you at arrivals with the vehicle paperwork ready.",
        ],
      },
      {
        title: "What to do after landing",
        paragraphs: [
          "1) Clear arrivals. 2) Look for AGGELOS Rentals / your confirmation name. 3) Quick contract check and license scan. 4) Drive out toward Parikia, Naoussa, or the Antiparos ferry terminal.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Economy cars",
        body: "Light luggage and couple travel.",
      },
      {
        title: "SUVs",
        body: "Families and larger suitcases.",
      },
      {
        title: "Automatics",
        body: "Easier after a long inbound flight.",
      },
    ],
    faqs: [
      {
        q: "What if my flight is delayed?",
        a: "We monitor arrivals for airport bookings. Message WhatsApp if the delay is major so we can adjust staffing.",
      },
      {
        q: "How long does pickup take?",
        a: "Most handovers take a few minutes once you reach the meeting point, have your license and voucher ready.",
      },
      {
        q: "Can I drop off at the airport too?",
        a: "Yes. Choose airport return in the form or ask us to arrange it on a one-way plan.",
      },
    ],
    related: [
      { id: "paros-rent-a-car", label: "Paros rent a car" },
      { id: "paros-port-parikia-rent-a-car", label: "Port pickup" },
      {
        id: "how-to-get-to-paros-ferries-flights-airport",
        label: "How to get to Paros",
      },
      { href: "/fleet/mini/", label: "Cars" },
    ],
  },

  "paros-port-parikia-rent-a-car": {
    h1: "Paros Port Car Rental, Parikia Ferry Pickup",
    intro:
      "Step off the ferry in Parikia and collect your rental nearby. Clear walking directions, local routing tips, and vehicles sized for island roads.",
    ctaPrimary: "Book port pickup",
    fleetTitle: "Fleet for ferry arrivals",
    faqTitle: "Parikia port FAQs",
    finalTitle: "Ferry in. Drive out.",
    finalSubtitle:
      "Perfect for Athens, Paros sailings and island hoppers continuing to Antiparos.",
    sections: [
      {
        title: "Pickup instructions",
        paragraphs: [
          "Choose Paros Port (Parikia) when booking. We’ll send a precise meeting pin, typically a short walk from the main ferry exit, away from the densest taxi scramble.",
        ],
      },
      {
        title: "Walking and transfer clarity",
        paragraphs: [
          "With light bags, walking to the meeting point is straightforward. Heavy luggage? Ask for vehicle delivery closer to the dock or your Parikia hotel.",
        ],
      },
      {
        title: "Local routing tips",
        paragraphs: [
          "From Parikia you can reach Naoussa, the east-coast beaches, or the Pounda/Antiparos ferry in under an hour depending on traffic. Midday August traffic near the port is the main delay, we plan handovers accordingly.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Compact cars",
        body: "Ideal for Parikia parking and village streets.",
      },
      {
        title: "Scooters",
        body: "If you’re staying near town and travelling light.",
      },
    ],
    faqs: [
      {
        q: "How far is pickup from the ferry?",
        a: "Usually a short walk. Exact pin is shared on confirmation.",
      },
      {
        q: "Can I continue to Antiparos the same day?",
        a: "Yes, either drive to the short ferry or arrange Antiparos drop-off on a one-way rental.",
      },
    ],
    related: [
      { id: "paros-airport-rent-a-car-port", label: "Airport pickup" },
      { id: "paros-rent-a-car", label: "Paros rent a car" },
      { id: "rent-a-car-antiparos-aggelos", label: "Antiparos rentals" },
      { href: "/faq/", label: "FAQ" },
    ],
  },

  "piraeus-rent-a-car": {
    h1: "Piraeus Rent a Car, Start Before the Ferry",
    intro:
      "Pick up in Piraeus and begin your Cyclades trip from Athens. Timed for ferry departures to Paros and beyond.",
    ctaPrimary: "Check Piraeus options",
    fleetTitle: "Vehicles for the Athens start",
    faqTitle: "Piraeus rental FAQs",
    finalTitle: "Athens to the islands, keys in hand",
    finalSubtitle:
      "Coordinate pickup with your sailing, then continue with AGGELOS Rentals on Paros & Antiparos if you need a second leg.",
    sections: [
      {
        title: "Why start in Piraeus",
        paragraphs: [
          "Some itineraries are smoother with a mainland pickup before boarding. We support Piraeus collection so your island time isn’t spent waiting in lines.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Compact & economy",
        body: "Easy for port approaches and ferry logistics.",
      },
    ],
    faqs: [
      {
        q: "Can I drop the car on Paros?",
        a: "Ask for a one-way plan when booking, availability depends on dates and vehicle type.",
      },
    ],
    related: [
      { id: "paros-rent-a-car", label: "Paros rent a car" },
      { id: "paros-port-parikia-rent-a-car", label: "Parikia port" },
      { id: "contact", label: "Contact us" },
    ],
  },

  "antiparos-scooter-rentals": {
    h1: "Antiparos Scooter Rentals, 50cc to 300cc",
    intro:
      "Rent a scooter on Antiparos with helmets included. Ideal for beach hops, village parking, and travelling light.",
    ctaPrimary: "Book a scooter",
    fleetTitle: "Scooter suitability",
    faqTitle: "Scooter rental FAQs",
    finalTitle: "Island mode: scooter on",
    finalSubtitle:
      "License rules depend on engine size, we’ll confirm the right model for your paperwork.",
    sections: [
      {
        title: "Best for",
        paragraphs: [
          "Couples and solo travellers staying near Antiparos town who want flexible beach access without a car footprint.",
        ],
      },
      {
        title: "License notes",
        paragraphs: [
          "50cc models often work with a car license. 125cc+ typically need a motorcycle category. We verify at pickup for insurance validity.",
        ],
      },
    ],
    vehicleHints: [
      { title: "50cc", body: "Short hops, lighter traffic confidence." },
      {
        title: "125, 300cc",
        body: "More power for two-up travel where licensed.",
      },
    ],
    faqs: [
      {
        q: "Are helmets included?",
        a: "Yes. Helmets are included with scooter rentals.",
      },
      {
        q: "Scooter or ATV?",
        a: "Scooters win in the village; ATVs win on dirt tracks and rougher beach approaches.",
      },
    ],
    related: [
      { id: "atvs-antiparos", label: "ATV rentals" },
      { id: "rent-a-car-antiparos-aggelos", label: "Antiparos cars" },
      { href: "/fleet/scooters/", label: "Scooter fleet" },
    ],
  },

  "atvs-antiparos": {
    h1: "Antiparos ATV & Quad Rentals",
    intro:
      "Explore Antiparos trails and remote coves on an ATV or buggy. Most models accept a standard car license.",
    ctaPrimary: "Book an ATV",
    fleetTitle: "ATV suitability",
    faqTitle: "ATV rental FAQs",
    finalTitle: "Go beyond the paved roads",
    finalSubtitle:
      "We’ll match engine size to experience level and where you plan to ride.",
    sections: [
      {
        title: "Best for",
        paragraphs: [
          "Guests chasing quieter beaches and dirt access roads where a low car isn’t ideal.",
        ],
      },
      {
        title: "License & safety",
        paragraphs: [
          "A category B car license covers most ATVs in our fleet. Minimum age and safety briefing apply at pickup.",
        ],
      },
    ],
    vehicleHints: [
      { title: "200, 300cc", body: "Easier handling for first-timers." },
      {
        title: "Larger quads / buggies",
        body: "More stability for two-up adventure.",
      },
    ],
    faqs: [
      {
        q: "Do I need a motorcycle license?",
        a: "Usually no for ATVs up to common island displacements, we confirm per model.",
      },
    ],
    related: [
      { id: "antiparos-scooter-rentals", label: "Scooters" },
      { id: "rent-a-car-antiparos-aggelos", label: "Cars on Antiparos" },
      { href: "/fleet/atvs/", label: "ATV fleet" },
    ],
  },

  "suv-rentals-paros": {
    h1: "SUV Rentals Paros, Space, Height & Beach Roads",
    intro:
      "Rent an SUV or jeep on Paros for families, luggage, and rougher approaches to east-coast beaches.",
    ctaPrimary: "Book an SUV",
    fleetTitle: "When to choose an SUV",
    faqTitle: "SUV rental FAQs",
    finalTitle: "More room. More roads.",
    finalSubtitle:
      "Airport or port pickup available, select SUV category when you search.",
    sections: [
      {
        title: "Best for Paros",
        paragraphs: [
          "Families, golf bags, multiple suitcases, or daily drives that mix asphalt with uneven beach parking.",
        ],
      },
    ],
    vehicleHints: [
      {
        title: "Compact SUVs",
        body: "Easier in Naoussa when streets tighten.",
      },
      { title: "Larger 4x4s", body: "Confidence on rougher tracks." },
    ],
    faqs: [
      {
        q: "Are SUVs available at the airport?",
        a: "Yes when inventory allows, book early in July, August.",
      },
    ],
    related: [
      { id: "paros-rent-a-car", label: "Paros rent a car" },
      { href: "/fleet/suvs/", label: "SUV fleet" },
      { id: "paros-airport-rent-a-car-port", label: "Airport pickup" },
    ],
  },
};
