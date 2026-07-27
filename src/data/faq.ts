export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const FAQ_DATA: FaqItem[] = [
  {
    id: "license-car",
    question: "What license do I need to rent a car in Paros?",
    answer:
      "You need a valid national driving license (category B) or an international driving permit. EU licenses are accepted directly. Non-EU visitors should carry an International Driving Permit (IDP) alongside their national license.",
    category: "licensing",
  },
  {
    id: "license-scooter",
    question: "Do I need a motorcycle license to rent a scooter?",
    answer:
      "For 50cc scooters, a standard car license (category B or AM) is sufficient. For 125cc and above, you need an A1 or A2 motorcycle license. We check licenses at pickup to ensure road safety and insurance validity.",
    category: "licensing",
  },
  {
    id: "license-atv",
    question: "What license do I need to rent an ATV or quad?",
    answer:
      "A standard car license (category B) is all you need to rent an ATV or quad up to 450cc. No motorcycle license required. You must be at least 18 years old.",
    category: "licensing",
  },
  {
    id: "min-age",
    question: "What is the minimum age to rent a vehicle?",
    answer:
      "The minimum age is 21 for cars and SUVs (with at least 1 year of driving experience), and 18 for scooters, ATVs, and bicycles. Young driver surcharges do not apply at AGGELOS Rentals.",
    category: "requirements",
  },
  {
    id: "insurance",
    question: "Is insurance included in the rental price?",
    answer:
      "Yes. Basic third-party insurance and personal accident coverage are included with every rental. Full Collision Damage Waiver (CDW) with reduced excess is available as an upgrade for extra peace of mind.",
    category: "insurance",
  },
  {
    id: "deposit",
    question: "Do I need to pay a deposit?",
    answer:
      "A small refundable security deposit is held at pickup and returned on vehicle return in the same condition. Cash or credit card accepted. The deposit varies by vehicle type.",
    category: "payment",
  },
  {
    id: "credit-card",
    question: "Do I need a credit card to rent?",
    answer:
      "No. We accept cash, debit cards, and credit cards. Unlike international chains, we do not require a credit card for the deposit. This is one of the benefits of renting with a local family-run business.",
    category: "payment",
  },
  {
    id: "cancel",
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 48 hours before your pickup time. Cancellations within 48 hours incur a one-day rental charge. No-shows are charged the full booking amount.",
    category: "booking",
  },
  {
    id: "airport-pickup",
    question: "How does Paros Airport pickup work?",
    answer:
      "We track your flight in real time and have your vehicle waiting when you land at Paros National Airport (PAS). Walk out of arrivals, and our team member will meet you with the keys. No queues, no shuttle buses.",
    category: "pickup",
  },
  {
    id: "port-pickup",
    question: "How does Paros Port (Parikia) pickup work?",
    answer:
      "We meet you at the Parikia ferry terminal with your vehicle ready. Alternatively, you can walk to our Parikia pickup point, it is a 2-minute walk from the gangway. We monitor ferry schedules for delays.",
    category: "pickup",
  },
  {
    id: "antiparos-pickup",
    question: "How does Antiparos pickup work?",
    answer:
      "Our main office is at Antiparos Port, 50 meters from the ferry dock. We can also deliver to your villa, hotel, or the Antiparos helipad. We are the only rental agency based on Antiparos island.",
    category: "pickup",
  },
  {
    id: "delivery-free",
    question: "Is vehicle delivery free?",
    answer:
      "Yes, free delivery and collection anywhere in Antiparos, and at Paros Airport, Paros Port (Parikia), Naoussa, and most Paros hotels. Remote locations may incur a small delivery fee.",
    category: "pickup",
  },
  {
    id: "fuel-policy",
    question: "What is the fuel policy?",
    answer:
      "Full-to-full. You receive the vehicle with a full tank and return it full. We provide a map of gas stations on both Paros and Antiparos. Scooters and ATVs are delivered with a full tank at no extra cost.",
    category: "during-rental",
  },
  {
    id: "ferry-antiparos",
    question: "Can I take the rental car from Paros to Antiparos?",
    answer:
      "Yes. You can drive any of our rental cars onto the Pounta, Antiparos ferry (runs every 30 minutes, 10 minutes crossing). The ferry ticket for a car costs approximately €10 each way. We recommend it, Antiparos is worth the trip.",
    category: "during-rental",
  },
  {
    id: "ferry-other-islands",
    question: "Can I take the rental car to other islands?",
    answer:
      "Our vehicles are only permitted on Paros and Antiparos. Taking them to other islands (Naxos, Mykonos, etc.) is not allowed and voids the insurance coverage.",
    category: "during-rental",
  },
  {
    id: "roads-paros",
    question: "What are the road conditions like in Paros?",
    answer:
      "Main roads between Parikia, Naoussa, and the airport are paved and well-maintained. Beach access roads can be narrow and unpaved, an SUV or ATV is recommended for remote beaches like Faragas or Kalogeros. Speed limits are 50 km/h in towns, 80 km/h outside.",
    category: "during-rental",
  },
  {
    id: "parking",
    question: "Is parking easy in Paros?",
    answer:
      "Parking in Parikia and Naoussa town centers is limited in July, August. Free parking lots exist on the outskirts of both towns (5-minute walk to the center). At beaches, parking is generally free and abundant except for the most popular spots at peak season.",
    category: "during-rental",
  },
  {
    id: "helmets",
    question: "Are helmets included with scooter and ATV rentals?",
    answer:
      "Yes. Two helmets are included with every scooter and ATV rental. Wearing a helmet is mandatory by Greek law, and we enforce this strictly for your safety.",
    category: "safety",
  },
  {
    id: "breakdown",
    question: "What happens if the vehicle breaks down?",
    answer:
      "Call us immediately and we will bring a replacement vehicle to your location as fast as possible. Roadside assistance is included with every rental. We operate 7 days a week during the season.",
    category: "safety",
  },
  {
    id: "gps",
    question: "Do you offer GPS or navigation?",
    answer:
      "We recommend using Google Maps on your phone, it works well across Paros and Antiparos. We also provide a printed island map with marked beaches, restaurants, and gas stations at pickup.",
    category: "extras",
  },
  {
    id: "child-seat",
    question: "Do you offer child seats?",
    answer:
      "Yes. Baby seats (0, 13 kg), child seats (9, 18 kg), and booster seats (15, 36 kg) are available free of charge. Please request when booking so we can reserve the right size.",
    category: "extras",
  },
  {
    id: "one-way",
    question:
      "Can I pick up in Paros and drop off in Antiparos (or vice versa)?",
    answer:
      "Yes. One-way rentals between Paros and Antiparos are available at no extra charge. Pick up at Paros Airport and drop off at Antiparos Port, or any combination of our locations.",
    category: "booking",
  },
  {
    id: "peak-season",
    question: "Should I book in advance for summer?",
    answer:
      "Yes, strongly recommended. July and August are peak season and our fleet fills up weeks in advance, especially for popular models like the Suzuki Jimny and Fiat 500 Cabrio. Book early for the best selection and prices.",
    category: "booking",
  },
  {
    id: "multi-day-discount",
    question: "Do you offer multi-day discounts?",
    answer:
      "Yes. Rentals of 3+ days receive a 10% discount, 5+ days get 15%, and 7+ days get 20, 30% depending on the vehicle type and season. The discount is applied automatically when you book online.",
    category: "pricing",
  },
  {
    id: "hidden-fees",
    question: "Are there any hidden fees?",
    answer:
      "No. The price you see at booking is the price you pay. Insurance, helmets (for 2-wheelers), delivery, and collection are included. The only extras are optional CDW upgrade and fuel.",
    category: "pricing",
  },
];
