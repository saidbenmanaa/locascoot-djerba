import type { Zone } from '@/types/content';
import { deliveryFee } from '@/lib/site';

/**
 * ============================================================================
 *  DELIVERY ZONES — these also power the local SEO landing pages
 * ============================================================================
 *
 *  Each entry becomes its own page (e.g. /zones/houmt-souk), targeting people
 *  searching for scooter rental in that specific part of the island. Write the
 *  body text as genuinely useful local advice — Google rewards pages that
 *  actually help, and so do customers.
 *
 *  Delivery is available on Djerba Island only. The fee below comes from
 *  `content/site.ts` (`delivery.feeEur`), so these texts never need editing
 *  when it changes.
 */
const fee = { fr: deliveryFee('fr'), en: deliveryFee('en') };

export const zones: Zone[] = [
  {
    slug: 'houmt-souk',
    name: { fr: 'Houmt Souk', en: 'Houmt Souk' },
    where: { fr: 'à Houmt Souk', en: 'in Houmt Souk' },
    driveTimeMinutes: 5,
    intro: {
      fr: `Nous livrons votre scooter partout à Houmt Souk, à votre hôtel, votre riad ou votre location, pour ${fee.fr}, tous les jours entre 08:00 et 20:00.`,
      en: `We deliver your scooter anywhere in Houmt Souk — to your hotel, riad or rental — for ${fee.en}, every day between 08:00 and 20:00.`,
    },
    body: {
      fr: [
        "Houmt Souk est la capitale de Djerba et le meilleur point de départ pour découvrir l'île. Les ruelles du centre historique se parcourent à pied, mais dès que vous voulez rejoindre les plages du nord ou la zone touristique, un deux-roues change tout : vous n'attendez plus les taxis.",
        `Nous livrons dans tout Houmt Souk, y compris au port de plaisance et à la station de louage, pour ${fee.fr}. Le scooter vous est remis avec le casque et tout l'équipement.`,
      ],
      en: [
        "Houmt Souk is Djerba's main town and the best base for exploring the island. The old centre is walkable, but the moment you want the northern beaches or the tourist zone, two wheels change everything: no more waiting for taxis.",
        `We deliver anywhere in Houmt Souk, including the marina and the louage station, for ${fee.en}. The scooter is handed over with the helmet and all the equipment.`,
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
    name: { fr: 'Midoun', en: 'Midoun' },
    where: { fr: 'à Midoun', en: 'in Midoun' },
    driveTimeMinutes: 20,
    intro: {
      fr: `Livraison à Midoun et dans les hôtels alentour, du centre-ville jusqu'à la route de la plage, pour ${fee.fr}.`,
      en: `Delivery in Midoun and to the hotels nearby, from the town centre out to the beach road, for ${fee.en}.`,
    },
    body: {
      fr: [
        "Midoun est la deuxième ville de l'île et le point de chute de nombreux visiteurs. Son marché du vendredi est le plus animé de Djerba, et un scooter vous permet d'y arriver tôt sans chercher de place de stationnement pendant une demi-heure.",
        'Depuis Midoun, la route côtière vers Aghir et la plage de Seguia se parcourt en une vingtaine de minutes. Nous livrons directement à votre hôtel, tous les jours entre 08:00 et 20:00.',
      ],
      en: [
        "Midoun is the island's second town and where a lot of visitors stay. Its Friday market is the liveliest on Djerba, and a scooter lets you arrive early without spending half an hour hunting for a parking space.",
        'From Midoun the coast road down to Aghir and Seguia beach takes about twenty minutes. We deliver straight to your hotel, every day between 08:00 and 20:00.',
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
    name: { fr: 'Zone touristique', en: 'Tourist Zone' },
    where: { fr: 'dans la zone touristique', en: 'in the Tourist Zone' },
    driveTimeMinutes: 15,
    intro: {
      fr: `Livraison dans les hôtels de la zone touristique, de Sidi Mahrez à la pointe de Taguermess, pour ${fee.fr}.`,
      en: `Delivery to the hotels of the Tourist Zone, from Sidi Mahrez to Taguermess point, for ${fee.en}.`,
    },
    body: {
      fr: [
        "La zone touristique concentre la majorité des hôtels de l'île le long d'une quinzaine de kilomètres de plage. C'est confortable, mais on s'y sent vite dépendant des navettes et des taxis. Un scooter vous rend totalement autonome pour aller dîner à Houmt Souk ou rejoindre une plage plus tranquille.",
        "Nous livrons directement à la réception de votre hôtel, tous les jours entre 08:00 et 20:00. Prévoyez une pièce d'identité, et votre permis pour le 125cc.",
      ],
      en: [
        "The Tourist Zone lines up most of the island's hotels along fifteen kilometres of beach. It is comfortable, but you quickly end up dependent on shuttles and taxis. A scooter makes you completely independent, whether for dinner in Houmt Souk or a quieter stretch of sand.",
        'We deliver straight to your hotel reception, every day between 08:00 and 20:00. Bring your ID, plus your licence for the 125cc.',
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
    name: { fr: 'Aghir', en: 'Aghir' },
    where: { fr: 'à Aghir', en: 'in Aghir' },
    driveTimeMinutes: 25,
    intro: {
      fr: `Livraison à Aghir et sur toute la côte sud-est, jusqu'à la lagune, pour ${fee.fr}.`,
      en: `Delivery in Aghir and along the whole south-east coast, down to the lagoon, for ${fee.en}.`,
    },
    body: {
      fr: [
        "Aghir borde la plus belle portion de côte de Djerba, plus calme que la zone touristique et bien plus agréable à parcourir en deux-roues. La route qui longe la mer jusqu'à la chaussée romaine est l'une des plus belles balades de l'île.",
        `Cette partie de l'île est mal desservie par les transports : c'est précisément là qu'un scooter fait la plus grande différence. Nous y livrons au même tarif que partout ailleurs sur l'île : ${fee.fr}.`,
      ],
      en: [
        "Aghir fronts the prettiest stretch of coast on Djerba — quieter than the tourist zone and far nicer to ride. The seafront road down to the Roman causeway is one of the best runs on the island.",
        `This side of the island is poorly served by public transport, which is exactly where a scooter earns its keep. We deliver here for the same fee as everywhere else on the island: ${fee.en}.`,
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
    name: { fr: 'Aéroport de Djerba-Zarzis', en: 'Djerba-Zarzis Airport' },
    where: { fr: "à l'aéroport de Djerba-Zarzis", en: 'at Djerba-Zarzis Airport' },
    driveTimeMinutes: 10,
    intro: {
      fr: `Récupérez votre scooter dès votre arrivée : nous livrons à l'aéroport international de Djerba-Zarzis, situé sur l'île, pour ${fee.fr}, tous les jours entre 08:00 et 20:00.`,
      en: `Pick up your scooter when you arrive: we deliver to Djerba-Zarzis International Airport, which is on the island, for ${fee.en}, every day between 08:00 and 20:00.`,
    },
    body: {
      fr: [
        "L'aéroport international de Djerba-Zarzis (DJE) se trouve sur l'île de Djerba, à une dizaine de minutes de Houmt Souk. Plutôt que de négocier un taxi avec vos bagages, réservez votre deux-roues à l'avance.",
        `La livraison à l'aéroport coûte ${fee.fr}, comme partout ailleurs sur l'île, et se fait entre 08:00 et 20:00. Indiquez l'heure souhaitée dans votre demande de réservation.`,
      ],
      en: [
        'Djerba-Zarzis International Airport (DJE) is on Djerba Island, about ten minutes from Houmt Souk. Rather than negotiating a taxi with your luggage, book your scooter ahead.',
        `Airport delivery costs ${fee.en}, as everywhere else on the island, and takes place between 08:00 and 20:00. Add your preferred time to your booking request.`,
      ],
    },
    highlights: {
      fr: ['Houmt Souk à 10 min', 'Zone touristique à 20 min'],
      en: ['Houmt Souk 10 min away', 'Tourist Zone 20 min away'],
    },
  },
];

export default zones;
