export const SITE = {
  name: "AGGELOS Rentals",
  domain: "https://antiparosrentacar.com",
  phone: "+306944950094",
  phoneDisplay: "+30 694 495 0094",
  email: "aggelos@antiparosrentacar.com",
  whatsapp: "https://wa.link/b2nt63",
  whatsappNumber: "306944950094",
  bookingOrigin: "https://antiparosrentacar.gocars.gr",
  userArea: "https://antiparosrentacar.gocars.gr/user-area",
  address: {
    street: "Port, Antiparos",
    city: "Antiparos",
    region: "Cyclades",
    postalCode: "840 07",
    country: "GR",
  },
  coordinates: { lat: 37.0398079, lng: 25.0845734 },
  foundedYear: 1994,
  hours: "Mo-Su 08:00-22:00",
  social: {
    facebook: "https://www.facebook.com/AggelosRentACar",
    instagram: "https://www.instagram.com/aggelosrentacar/",
    twitter: "https://x.com/AggelosRentACar",
    youtube: "https://www.youtube.com/@AggelosRentACarAntiparos",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/AGGELOS+Rentals/@37.0398079,25.0845734,17z/data=!4m6!3m5!1s0x1498655b76d68d07:0x740cbe8b35e316f6!8m2!3d37.0398079!4d25.0845734!16s%2Fg%2F11cmj3m3qr",
  trustpilotUrl: "https://www.trustpilot.com/review/antiparosrentacar.com",
  related: {
    transfers: "https://antiparostransfer.gr/",
    rooms: "https://antiparosrooms.com/",
    piraeus: "https://www.aggelosrentals.com/",
  },
} as const;

export const GOCARS_LOCATIONS = [
  { id: "1", key: "antiparosPort" as const },
  { id: "13", key: "antiparosHelipad" as const },
  { id: "3", key: "antiparosVillas" as const },
  { id: "18", key: "parosAirport" as const },
  { id: "19", key: "parosPort" as const },
  { id: "20", key: "parosVillas" as const },
];

export const GOCARS_AGES = [
  { id: "27", key: "age2124" as const },
  { id: "28", key: "age2570" as const },
];
