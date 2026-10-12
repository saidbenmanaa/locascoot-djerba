import type { Zone } from '@/types/content';
import { deliveryFee } from '@/lib/site';

/**
 * ============================================================================
 *  DELIVERY ZONES — these also power the local SEO landing pages
 * ============================================================================
 *
 *  Each entry becomes its own page (e.g. /zones/midoun), targeting people
 *  searching for scooter rental in that specific part of the island. Write the
 *  body text as genuinely useful local advice — Google rewards pages that
 *  actually help, and so do customers.
 *
 *  Delivery is available in these three areas only: the Tourist Zone, Aghir
 *  and Midoun. The fee below comes from `content/site.ts` (`delivery.feeEur`),
 *  so these texts never need editing when it changes.
 */
const fee = {
  fr: deliveryFee('fr'),
  en: deliveryFee('en'),
  de: deliveryFee('de'),
  pl: deliveryFee('pl'),
};

export const zones: Zone[] = [
  {
    slug: 'zone-touristique',
    slugs: { de: 'touristenzone', pl: 'strefa-turystyczna' },
    name: {
      fr: 'Zone touristique',
      en: 'Tourist Zone',
      de: 'Touristenzone',
      pl: 'Strefa turystyczna',
    },
    where: {
      fr: 'dans la zone touristique',
      en: 'in the Tourist Zone',
      de: 'in der Touristenzone',
      pl: 'w strefie turystycznej',
    },
    intro: {
      fr: `Livraison dans les hôtels de la zone touristique, de Sidi Mahrez à la pointe de Taguermess, pour ${fee.fr}.`,
      en: `Delivery to the hotels of the Tourist Zone, from Sidi Mahrez to Taguermess point, for ${fee.en}.`,
      de: `Lieferung zu den Hotels der Touristenzone, von Sidi Mahrez bis zur Landspitze Taguermess, für ${fee.de}.`,
      pl: `Dostawa do hoteli w strefie turystycznej, od Sidi Mahrez po przylądek Taguermess, za ${fee.pl}.`,
    },
    body: {
      fr: [
        "La zone touristique concentre la majorité des hôtels de l'île le long d'une quinzaine de kilomètres de plage. C'est confortable, mais on s'y sent vite dépendant des navettes et des taxis. Un scooter vous rend totalement autonome pour aller dîner à Houmt Souk ou rejoindre une plage plus tranquille.",
        'Nous livrons directement à la réception de votre hôtel, tous les jours entre 08:00 et 20:00.',
      ],
      en: [
        "The Tourist Zone lines up most of the island's hotels along fifteen kilometres of beach. It is comfortable, but you quickly end up dependent on shuttles and taxis. A scooter makes you completely independent, whether for dinner in Houmt Souk or a quieter stretch of sand.",
        'We deliver straight to your hotel reception, every day between 08:00 and 20:00.',
      ],
      de: [
        'In der Touristenzone liegen die meisten Hotels der Insel, aufgereiht an rund fünfzehn Kilometern Strand. Das ist bequem, doch man ist schnell auf Shuttles und Taxis angewiesen. Mit dem Roller sind Sie völlig unabhängig, ob zum Abendessen in Houmt Souk oder zu einem ruhigeren Strandabschnitt.',
        'Wir liefern direkt an die Rezeption Ihres Hotels, täglich zwischen 08:00 und 20:00.',
      ],
      pl: [
        'W strefie turystycznej skupia się większość hoteli wyspy, ciągnących się wzdłuż około piętnastu kilometrów plaży. To wygodne, ale łatwo uzależnić się od busów i taksówek. Skuter daje pełną niezależność – czy to na kolację w Houmt Souk, czy na spokojniejszą plażę.',
        'Dostarczamy skuter prosto do recepcji hotelu, codziennie od 08:00 do 20:00.',
      ],
    },
    highlights: {
      fr: [
        'Plage de Sidi Mahrez',
        'Phare de Taguermess',
        'Restaurants de Houmt Souk',
        'Marché de Midoun',
      ],
      en: [
        'Sidi Mahrez beach',
        'Taguermess lighthouse',
        'Houmt Souk restaurants',
        'Midoun market',
      ],
      de: [
        'Strand von Sidi Mahrez',
        'Leuchtturm von Taguermess',
        'Restaurants in Houmt Souk',
        'Markt von Midoun',
      ],
      pl: [
        'Plaża Sidi Mahrez',
        'Latarnia morska Taguermess',
        'Restauracje w Houmt Souk',
        'Targ w Midoun',
      ],
    },
  },
  {
    slug: 'aghir',
    name: { fr: 'Aghir', en: 'Aghir', de: 'Aghir', pl: 'Aghir' },
    where: { fr: 'à Aghir', en: 'in Aghir', de: 'in Aghir', pl: 'w Aghir' },
    intro: {
      fr: `Livraison à Aghir pour ${fee.fr}.`,
      en: `Delivery in Aghir for ${fee.en}.`,
      de: `Lieferung in Aghir für ${fee.de}.`,
      pl: `Dostawa w Aghir za ${fee.pl}.`,
    },
    body: {
      fr: [
        "Aghir borde la plus belle portion de côte de Djerba, plus calme que la zone touristique et bien plus agréable à parcourir en deux-roues. La route qui longe la mer jusqu'à la chaussée romaine est l'une des plus belles balades de l'île.",
        `Cette partie de l'île est mal desservie par les transports : c'est précisément là qu'un scooter fait la plus grande différence. Nous y livrons au même tarif que dans la zone touristique et à Midoun : ${fee.fr}.`,
      ],
      en: [
        "Aghir fronts the prettiest stretch of coast on Djerba — quieter than the tourist zone and far nicer to ride. The seafront road down to the Roman causeway is one of the best runs on the island.",
        `This side of the island is poorly served by public transport, which is exactly where a scooter earns its keep. We deliver here for the same fee as in the Tourist Zone and Midoun: ${fee.en}.`,
      ],
      de: [
        'Aghir liegt am schönsten Küstenabschnitt Djerbas – ruhiger als die Touristenzone und mit dem Zweirad viel angenehmer zu erkunden. Die Uferstraße bis zum römischen Damm ist eine der schönsten Strecken der Insel.',
        `Dieser Teil der Insel ist schlecht an öffentliche Verkehrsmittel angebunden – genau hier macht ein Roller den größten Unterschied. Wir liefern hierher zum selben Preis wie in die Touristenzone und nach Midoun: ${fee.de}.`,
      ],
      pl: [
        'Aghir leży nad najpiękniejszym odcinkiem wybrzeża Dżerby – spokojniejszym niż strefa turystyczna i znacznie przyjemniejszym na jednośladzie. Nadmorska droga aż do rzymskiej grobli to jedna z najpiękniejszych tras na wyspie.',
        `Ta część wyspy jest słabo skomunikowana – właśnie tu skuter robi największą różnicę. Dostarczamy tutaj w tej samej cenie co do strefy turystycznej i do Midoun: ${fee.pl}.`,
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
      de: [
        'Ruhige Strände und die Lagune',
        'Römischer Damm (El Kantara)',
        'Kitesurf-Spots',
        'Fischrestaurants am Meer',
      ],
      pl: [
        'Spokojne plaże i laguna',
        'Rzymska grobla (El Kantara)',
        'Miejsca do kitesurfingu',
        'Restauracje rybne nad morzem',
      ],
    },
  },
  {
    slug: 'midoun',
    name: { fr: 'Midoun', en: 'Midoun', de: 'Midoun', pl: 'Midoun' },
    where: { fr: 'à Midoun', en: 'in Midoun', de: 'in Midoun', pl: 'w Midoun' },
    intro: {
      fr: `Livraison à Midoun, du centre-ville jusqu'à la route de la plage, pour ${fee.fr}.`,
      en: `Delivery in Midoun, from the town centre out to the beach road, for ${fee.en}.`,
      de: `Lieferung in Midoun, vom Stadtzentrum bis zur Strandstraße, für ${fee.de}.`,
      pl: `Dostawa w Midoun, od centrum miasta po drogę przy plaży, za ${fee.pl}.`,
    },
    body: {
      fr: [
        "Midoun est la deuxième ville de l'île et le point de chute de nombreux visiteurs. Son marché du vendredi est le plus animé de Djerba, et un scooter vous permet d'y arriver tôt sans chercher de place de stationnement pendant une demi-heure.",
        'Nous livrons directement à votre hôtel, tous les jours entre 08:00 et 20:00.',
      ],
      en: [
        "Midoun is the island's second town and where a lot of visitors stay. Its Friday market is the liveliest on Djerba, and a scooter lets you arrive early without spending half an hour hunting for a parking space.",
        'We deliver straight to your hotel, every day between 08:00 and 20:00.',
      ],
      de: [
        'Midoun ist der zweitgrößte Ort der Insel und Anlaufpunkt vieler Urlauber. Sein Freitagsmarkt ist der lebhafteste auf Djerba, und mit dem Roller sind Sie früh dort, ohne eine halbe Stunde nach einem Parkplatz zu suchen.',
        'Wir liefern direkt zu Ihrem Hotel, täglich zwischen 08:00 und 20:00.',
      ],
      pl: [
        'Midoun to drugie co do wielkości miasto wyspy i miejsce pobytu wielu turystów. Tutejszy piątkowy targ jest najbardziej tętniący życiem na całej Dżerbie, a skuterem dotrzesz na niego wcześnie, bez półgodzinnego szukania miejsca do zaparkowania.',
        'Dostarczamy skuter prosto do hotelu, codziennie od 08:00 do 20:00.',
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
      de: [
        'Freitagsmarkt',
        'Strände von Seguia und Aghir',
        'Djerba Explore Park und Krokodilfarm',
        'Handwerkerdorf',
      ],
      pl: [
        'Piątkowy targ',
        'Plaże Seguia i Aghir',
        'Djerba Explore Park i farma krokodyli',
        'Wioska rzemieślnicza',
      ],
    },
  },
];

export default zones;
