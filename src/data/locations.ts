/**
 * Primary marketing pickup points shown on the homepage.
 * GoCars checkout IDs live separately in `GOCARS_LOCATIONS` (src/lib/site.ts).
 */

export const PICKUP_LOCATIONS = [
  {
    id: "antiparos-port",
    name: "Antiparos Port",
    nameEl: "Λιμάνι Αντιπάρου",
    coordinates: { lat: 37.0383, lng: 25.0783 },
    description:
      "Meet at the Antiparos ferry dock, we are 50m from the gangway.",
    isPrimary: true,
  },
  {
    id: "antiparos-helipad",
    name: "Antiparos Helipad",
    nameEl: "Ελικοδρόμιο Αντιπάρου",
    coordinates: { lat: 37.032, lng: 25.073 },
    description: "VIP pickup at the Antiparos helipad for private arrivals.",
    isPrimary: false,
  },
  {
    id: "antiparos-villa",
    name: "Your Villa / Hotel in Antiparos",
    nameEl: "Βίλα / Ξενοδοχείο Αντιπάρου",
    coordinates: { lat: 37.038, lng: 25.078 },
    description: "Free delivery to any hotel, villa, or Airbnb in Antiparos.",
    isPrimary: false,
  },
  {
    id: "paros-airport",
    name: "Paros Airport (PAS)",
    nameEl: "Αεροδρόμιο Πάρου (PAS)",
    coordinates: { lat: 37.0205, lng: 25.1278 },
    description:
      "Car waiting at Paros National Airport arrivals. Flight tracking included.",
    isPrimary: true,
  },
  {
    id: "paros-port",
    name: "Paros Port (Parikia)",
    nameEl: "Λιμάνι Πάρου (Παροικιά)",
    coordinates: { lat: 37.0867, lng: 25.1483 },
    description: "Pick up your vehicle steps from the Parikia ferry terminal.",
    isPrimary: true,
  },
  {
    id: "naoussa",
    name: "Naoussa",
    nameEl: "Νάουσα",
    coordinates: { lat: 37.1231, lng: 25.2367 },
    description:
      "Delivery to Naoussa town center or your accommodation nearby.",
    isPrimary: false,
  },
  {
    id: "parikia",
    name: "Parikia Town Center",
    nameEl: "Κέντρο Παροικιάς",
    coordinates: { lat: 37.0867, lng: 25.1483 },
    description:
      "Pickup in the heart of Parikia, near the windmill and old market.",
    isPrimary: false,
  },
  {
    id: "piraeus",
    name: "Piraeus Port (Athens)",
    nameEl: "Λιμάνι Πειραιά",
    coordinates: { lat: 37.9475, lng: 23.6378 },
    description:
      "Pick up in Piraeus before boarding the ferry, start your trip from Athens.",
    isPrimary: false,
  },
];
