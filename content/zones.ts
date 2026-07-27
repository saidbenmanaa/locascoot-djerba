import type { Zone } from '@/types/content';

/**
 * ============================================================================
 *  DELIVERY ZONES — these also power the local SEO landing pages
 * ============================================================================
 *
 *  Each entry becomes its own page (e.g. /zones/houmt-souk), targeting people
 *  searching for scooter rental in that specific part of the island. Write the
 *  body text as genuinely useful local advice — Google rewards pages that
 *  actually help, and so do customers.
 */
export const zones: Zone[] = [
  {
    slug: 'houmt-souk',
    name: 'Houmt Souk',
    deliveryFee: 0,
    driveTimeMinutes: 5,
    intro: {
      fr: "Nous livrons gratuitement votre scooter partout à Houmt Souk, devant votre hôtel, votre riad ou votre location, à l'heure qui vous arrange.",
      en: 'We deliver your scooter free of charge anywhere in Houmt Souk — to your hotel, riad or rental — at whatever time suits you.',
    },
    body: {
      fr: [
        "Houmt Souk est la capitale de Djerba et le meilleur point de départ pour découvrir l'île. Les ruelles du centre historique se parcourent à pied, mais dès que vous voulez rejoindre les plages du nord ou la zone touristique, un deux-roues change tout : vous évitez l'attente des taxis et vous vous garez partout gratuitement.",
        "La livraison est gratuite dans tout Houmt Souk, y compris au port de plaisance et à la station de louage. Nous vous remettons le scooter avec le casque et tout l'équipement, ainsi qu'un point rapide sur les routes à emprunter.",
      ],
      en: [
        "Houmt Souk is Djerba's main town and the best base for exploring the island. The old centre is walkable, but the moment you want the northern beaches or the tourist zone, two wheels change everything: no waiting for taxis, and free parking everywhere.",
        'Delivery is free anywhere in Houmt Souk, including the marina and the louage station. We hand the scooter over with the helmet and all the equipment, plus a quick briefing on the best roads to take.',
      ],
    },
    highlights: {
      fr: [
        'Marché couvert et souks (5 min à pied)',
        'Port de plaisance et poissonnerie',
        'Plage de Sidi Mahrez à 15 min',
        'Musée du patrimoine de Djerba',
      ],
      en: [
        'Covered market and souks (5 min walk)',
        'Marina and fish market',
        'Sidi Mahrez beach, 15 min away',
        'Djerba Heritage Museum',
      ],
    },
  },
  {
    slug: 'midoun',
    name: 'Midoun',
    deliveryFee: 0,
    driveTimeMinutes: 20,
    intro: {
      fr: "Livraison gratuite à Midoun et dans tous les hôtels alentour, du centre-ville jusqu'à la route de la plage.",
      en: 'Free delivery in Midoun and every hotel nearby, from the town centre out to the beach road.',
    },
    body: {
      fr: [
        "Midoun est la deuxième ville de l'île et le point de chute de nombreux visiteurs. Son marché du vendredi est le plus animé de Djerba, et un scooter vous permet d'y arriver tôt sans chercher de place de stationnement pendant une demi-heure.",
        "Depuis Midoun, la route côtière vers Aghir et la plage de Seguia se parcourt en une vingtaine de minutes. Nous livrons directement à votre hôtel : vous signez le contrat sur place et vous partez immédiatement.",
      ],
      en: [
        "Midoun is the island's second town and where a lot of visitors stay. Its Friday market is the liveliest on Djerba, and a scooter lets you arrive early without spending half an hour hunting for a parking space.",
        'From Midoun the coast road down to Aghir and Seguia beach takes about twenty minutes. We deliver straight to your hotel: sign the contract on the spot and ride away.',
      ],
    },
    highlights: {
      fr: [
        'Marché du vendredi',
        'Plages de Seguia et Aghir',
        'Djerba Explore Park et ferme aux crocodiles',
        'Village artisanal',
      ],
      en: [
        'Friday market',
        'Seguia and Aghir beaches',
        'Djerba Explore Park and crocodile farm',
        'Craft village',
      ],
    },
  },
  {
    slug: 'zone-touristique',
    name: 'Zone Touristique',
    deliveryFee: 0,
    driveTimeMinutes: 15,
    intro: {
      fr: "Nous livrons gratuitement dans tous les hôtels de la zone touristique, de Sidi Mahrez à la pointe de Taguermess.",
      en: 'We deliver free of charge to every hotel in the tourist zone, from Sidi Mahrez to Taguermess point.',
    },
    body: {
      fr: [
        "La zone touristique concentre la majorité des hôtels de l'île le long d'une quinzaine de kilomètres de plage. C'est confortable, mais on s'y sent vite dépendant des navettes et des taxis. Un scooter vous rend totalement autonome pour aller dîner à Houmt Souk ou rejoindre une plage plus tranquille.",
        "Nous connaissons tous les hôtels du secteur et livrons directement à la réception, au créneau que vous choisissez. Prévoyez une pièce d'identité, et votre permis pour le 125cc : la remise des clés prend moins de dix minutes.",
      ],
      en: [
        "The tourist zone lines up most of the island's hotels along fifteen kilometres of beach. It is comfortable, but you quickly end up dependent on shuttles and taxis. A scooter makes you completely independent, whether for dinner in Houmt Souk or a quieter stretch of sand.",
        'We know every hotel in the area and deliver straight to reception at a time you choose. Bring your ID, plus your licence for the 125cc — the handover takes under ten minutes.',
      ],
    },
    highlights: {
      fr: [
        'Plage de Sidi Mahrez',
        'Phare de Taguermess',
        'Restaurants de Houmt Souk à 15 min',
        'Marché de Midoun à 10 min',
      ],
      en: [
        'Sidi Mahrez beach',
        'Taguermess lighthouse',
        'Houmt Souk restaurants, 15 min away',
        'Midoun market, 10 min away',
      ],
    },
  },
  {
    slug: 'aghir',
    name: 'Aghir',
    deliveryFee: 0,
    driveTimeMinutes: 25,
    intro: {
      fr: "Livraison gratuite à Aghir et sur toute la côte sud-est, jusqu'à la lagune.",
      en: 'Free delivery in Aghir and along the whole south-east coast, down to the lagoon.',
    },
    body: {
      fr: [
        "Aghir borde la plus belle portion de côte de Djerba, plus calme que la zone touristique et bien plus agréable à parcourir en deux-roues. La route qui longe la mer jusqu'à la chaussée romaine est l'une des plus belles balades de l'île.",
        "Cette partie de l'île est mal desservie par les transports : c'est précisément là qu'un scooter fait la plus grande différence. Nous livrons gratuitement malgré la distance, sur simple message WhatsApp la veille.",
      ],
      en: [
        "Aghir fronts the prettiest stretch of coast on Djerba — quieter than the tourist zone and far nicer to ride. The seafront road down to the Roman causeway is one of the best runs on the island.",
        'This side of the island is poorly served by public transport, which is exactly where a scooter earns its keep. We deliver free despite the distance — one WhatsApp message the day before is enough.',
      ],
    },
    highlights: {
      fr: [
        'Plages calmes et lagune',
        'Chaussée romaine (El Kantara)',
        'Spots de kitesurf',
        'Restaurants de poisson en bord de mer',
      ],
      en: [
        'Quiet beaches and the lagoon',
        'Roman causeway (El Kantara)',
        'Kitesurfing spots',
        'Seafront fish restaurants',
      ],
    },
  },
  {
    slug: 'aeroport-djerba',
    name: 'Aéroport Djerba-Zarzis',
    deliveryFee: 0,
    driveTimeMinutes: 10,
    intro: {
      fr: "Récupérez votre scooter dès l'atterrissage : nous vous attendons à l'aéroport Djerba-Zarzis, casques et contrat prêts.",
      en: 'Pick your scooter up the moment you land: we meet you at Djerba-Zarzis airport with helmets and contract ready.',
    },
    body: {
      fr: [
        "L'aéroport Djerba-Zarzis (DJE) se trouve à une dizaine de minutes de Houmt Souk. Plutôt que de négocier un taxi avec vos bagages, réservez votre deux-roues à l'avance : nous vous retrouvons à la sortie des arrivées à l'heure de votre vol.",
        "Indiquez-nous simplement votre numéro de vol lors de la réservation. Si l'avion a du retard, nous ajustons l'heure : nous suivons les arrivées et la livraison reste gratuite.",
      ],
      en: [
        'Djerba-Zarzis airport (DJE) is about ten minutes from Houmt Souk. Rather than negotiating a taxi with your luggage, book ahead: we meet you outside arrivals at your flight time.',
        'Just give us your flight number when you book. If the plane is delayed we adjust — we track arrivals, and delivery stays free.',
      ],
    },
    highlights: {
      fr: [
        'Accueil à la sortie des arrivées',
        'Suivi des vols en cas de retard',
        'Houmt Souk à 10 min',
        'Zone touristique à 20 min',
      ],
      en: [
        'Met outside the arrivals hall',
        'Flight tracking if you are delayed',
        'Houmt Souk 10 min away',
        'Tourist zone 20 min away',
      ],
    },
  },
];

export default zones;
