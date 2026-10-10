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
const fee = {
  fr: deliveryFee('fr'),
  en: deliveryFee('en'),
  de: deliveryFee('de'),
  pl: deliveryFee('pl'),
};

export const zones: Zone[] = [
  {
    slug: 'houmt-souk',
    name: { fr: 'Houmt Souk', en: 'Houmt Souk', de: 'Houmt Souk', pl: 'Houmt Souk' },
    where: { fr: 'à Houmt Souk', en: 'in Houmt Souk', de: 'in Houmt Souk', pl: 'w Houmt Souk' },
    driveTimeMinutes: 5,
    intro: {
      fr: `Nous livrons votre scooter partout à Houmt Souk, à votre hôtel, votre riad ou votre location, pour ${fee.fr}, tous les jours entre 08:00 et 20:00.`,
      en: `We deliver your scooter anywhere in Houmt Souk — to your hotel, riad or rental — for ${fee.en}, every day between 08:00 and 20:00.`,
      de: `Wir liefern Ihren Roller überall in Houmt Souk – zu Ihrem Hotel, Riad oder Ihrer Unterkunft – für ${fee.de}, täglich zwischen 08:00 und 20:00.`,
      pl: `Dostarczamy skuter w dowolne miejsce w Houmt Souk – do hotelu, riadu lub apartamentu – za ${fee.pl}, codziennie od 08:00 do 20:00.`,
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
      de: [
        'Houmt Souk ist der Hauptort von Djerba und der beste Ausgangspunkt, um die Insel zu entdecken. Die Gassen der Altstadt erkunden Sie zu Fuß, doch sobald Sie zu den Stränden im Norden oder in die Touristenzone möchten, ändert ein Zweirad alles: kein Warten mehr auf Taxis.',
        `Wir liefern überall in Houmt Souk, auch zum Jachthafen und zur Louage-Station, für ${fee.de}. Der Roller wird mit Helm und gesamter Ausrüstung übergeben.`,
      ],
      pl: [
        'Houmt Souk to główne miasto Dżerby i najlepsza baza do zwiedzania wyspy. Uliczki starego miasta zwiedzisz pieszo, ale gdy zechcesz pojechać na plaże na północy lub do strefy turystycznej, jednoślad zmienia wszystko: koniec z czekaniem na taksówki.',
        `Dostarczamy w dowolne miejsce w Houmt Souk, także do mariny i na dworzec louage, za ${fee.pl}. Skuter przekazujemy razem z kaskiem i całym wyposażeniem.`,
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
      de: [
        'Markthalle und Souks (5 Min. zu Fuß)',
        'Jachthafen und Fischmarkt',
        'Strand von Sidi Mahrez, 15 Min. entfernt',
        'Museum des Kulturerbes von Djerba',
      ],
      pl: [
        'Hala targowa i suki (5 min pieszo)',
        'Marina i targ rybny',
        'Plaża Sidi Mahrez, 15 min stąd',
        'Muzeum Dziedzictwa Dżerby',
      ],
    },
  },
  {
    slug: 'midoun',
    name: { fr: 'Midoun', en: 'Midoun', de: 'Midoun', pl: 'Midoun' },
    where: { fr: 'à Midoun', en: 'in Midoun', de: 'in Midoun', pl: 'w Midoun' },
    driveTimeMinutes: 20,
    intro: {
      fr: `Livraison à Midoun et dans les hôtels alentour, du centre-ville jusqu'à la route de la plage, pour ${fee.fr}.`,
      en: `Delivery in Midoun and to the hotels nearby, from the town centre out to the beach road, for ${fee.en}.`,
      de: `Lieferung in Midoun und zu den Hotels der Umgebung, vom Stadtzentrum bis zur Strandstraße, für ${fee.de}.`,
      pl: `Dostawa w Midoun i do okolicznych hoteli, od centrum miasta po drogę przy plaży, za ${fee.pl}.`,
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
      de: [
        'Midoun ist der zweitgrößte Ort der Insel und Anlaufpunkt vieler Urlauber. Sein Freitagsmarkt ist der lebhafteste auf Djerba, und mit dem Roller sind Sie früh dort, ohne eine halbe Stunde nach einem Parkplatz zu suchen.',
        'Von Midoun aus erreichen Sie Aghir und den Strand von Seguia über die Küstenstraße in rund zwanzig Minuten. Wir liefern direkt zu Ihrem Hotel, täglich zwischen 08:00 und 20:00.',
      ],
      pl: [
        'Midoun to drugie co do wielkości miasto wyspy i miejsce pobytu wielu turystów. Tutejszy piątkowy targ jest najbardziej tętniący życiem na całej Dżerbie, a skuterem dotrzesz na niego wcześnie, bez półgodzinnego szukania miejsca do zaparkowania.',
        'Z Midoun drogą nadmorską dojedziesz do Aghir i plaży Seguia w około dwadzieścia minut. Dostarczamy skuter prosto do hotelu, codziennie od 08:00 do 20:00.',
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
    driveTimeMinutes: 15,
    intro: {
      fr: `Livraison dans les hôtels de la zone touristique, de Sidi Mahrez à la pointe de Taguermess, pour ${fee.fr}.`,
      en: `Delivery to the hotels of the Tourist Zone, from Sidi Mahrez to Taguermess point, for ${fee.en}.`,
      de: `Lieferung zu den Hotels der Touristenzone, von Sidi Mahrez bis zur Landspitze Taguermess, für ${fee.de}.`,
      pl: `Dostawa do hoteli w strefie turystycznej, od Sidi Mahrez po przylądek Taguermess, za ${fee.pl}.`,
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
      de: [
        'In der Touristenzone liegen die meisten Hotels der Insel, aufgereiht an rund fünfzehn Kilometern Strand. Das ist bequem, doch man ist schnell auf Shuttles und Taxis angewiesen. Mit dem Roller sind Sie völlig unabhängig, ob zum Abendessen in Houmt Souk oder zu einem ruhigeren Strandabschnitt.',
        'Wir liefern direkt an die Rezeption Ihres Hotels, täglich zwischen 08:00 und 20:00. Bringen Sie einen Ausweis mit, für den 125-cm³-Roller außerdem Ihren Führerschein.',
      ],
      pl: [
        'W strefie turystycznej skupia się większość hoteli wyspy, ciągnących się wzdłuż około piętnastu kilometrów plaży. To wygodne, ale łatwo uzależnić się od busów i taksówek. Skuter daje pełną niezależność – czy to na kolację w Houmt Souk, czy na spokojniejszą plażę.',
        'Dostarczamy skuter prosto do recepcji hotelu, codziennie od 08:00 do 20:00. Zabierz dokument tożsamości, a w przypadku skutera 125 cm³ także prawo jazdy.',
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
      de: [
        'Strand von Sidi Mahrez',
        'Leuchtturm von Taguermess',
        'Restaurants in Houmt Souk, 15 Min. entfernt',
        'Markt von Midoun, 10 Min. entfernt',
      ],
      pl: [
        'Plaża Sidi Mahrez',
        'Latarnia morska Taguermess',
        'Restauracje w Houmt Souk, 15 min stąd',
        'Targ w Midoun, 10 min stąd',
      ],
    },
  },
  {
    slug: 'aghir',
    name: { fr: 'Aghir', en: 'Aghir', de: 'Aghir', pl: 'Aghir' },
    where: { fr: 'à Aghir', en: 'in Aghir', de: 'in Aghir', pl: 'w Aghir' },
    driveTimeMinutes: 25,
    intro: {
      fr: `Livraison à Aghir et sur toute la côte sud-est, jusqu'à la lagune, pour ${fee.fr}.`,
      en: `Delivery in Aghir and along the whole south-east coast, down to the lagoon, for ${fee.en}.`,
      de: `Lieferung in Aghir und entlang der gesamten Südostküste bis zur Lagune, für ${fee.de}.`,
      pl: `Dostawa w Aghir i wzdłuż całego południowo-wschodniego wybrzeża, aż do laguny, za ${fee.pl}.`,
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
      de: [
        'Aghir liegt am schönsten Küstenabschnitt Djerbas – ruhiger als die Touristenzone und mit dem Zweirad viel angenehmer zu erkunden. Die Uferstraße bis zum römischen Damm ist eine der schönsten Strecken der Insel.',
        `Dieser Teil der Insel ist schlecht an öffentliche Verkehrsmittel angebunden – genau hier macht ein Roller den größten Unterschied. Wir liefern hierher zum selben Preis wie überall sonst auf der Insel: ${fee.de}.`,
      ],
      pl: [
        'Aghir leży nad najpiękniejszym odcinkiem wybrzeża Dżerby – spokojniejszym niż strefa turystyczna i znacznie przyjemniejszym na jednośladzie. Nadmorska droga aż do rzymskiej grobli to jedna z najpiękniejszych tras na wyspie.',
        `Ta część wyspy jest słabo skomunikowana – właśnie tu skuter robi największą różnicę. Dostarczamy tutaj w tej samej cenie co w każdym innym miejscu na wyspie: ${fee.pl}.`,
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
    slug: 'aeroport-djerba',
    slugs: { de: 'flughafen-djerba', pl: 'lotnisko-djerba' },
    name: {
      fr: 'Aéroport de Djerba-Zarzis',
      en: 'Djerba-Zarzis Airport',
      de: 'Flughafen Djerba-Zarzis',
      pl: 'Lotnisko Dżerba-Zarzis',
    },
    where: {
      fr: "à l'aéroport de Djerba-Zarzis",
      en: 'at Djerba-Zarzis Airport',
      de: 'am Flughafen Djerba-Zarzis',
      pl: 'na lotnisku Dżerba-Zarzis',
    },
    driveTimeMinutes: 10,
    intro: {
      fr: `Récupérez votre scooter dès votre arrivée : nous livrons à l'aéroport international de Djerba-Zarzis, situé sur l'île, pour ${fee.fr}, tous les jours entre 08:00 et 20:00.`,
      en: `Pick up your scooter when you arrive: we deliver to Djerba-Zarzis International Airport, which is on the island, for ${fee.en}, every day between 08:00 and 20:00.`,
      de: `Übernehmen Sie Ihren Roller direkt bei Ihrer Ankunft: Wir liefern zum Internationalen Flughafen Djerba-Zarzis, der auf der Insel liegt, für ${fee.de}, täglich zwischen 08:00 und 20:00.`,
      pl: `Odbierz skuter zaraz po przylocie: dostarczamy go na Międzynarodowe lotnisko Dżerba-Zarzis, położone na wyspie, za ${fee.pl}, codziennie od 08:00 do 20:00.`,
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
      de: [
        'Der Internationale Flughafen Djerba-Zarzis (DJE) liegt auf der Insel Djerba, etwa zehn Minuten von Houmt Souk entfernt. Statt mit Gepäck ein Taxi auszuhandeln, reservieren Sie Ihren Roller im Voraus.',
        `Die Lieferung zum Flughafen kostet ${fee.de}, wie überall sonst auf der Insel, und erfolgt zwischen 08:00 und 20:00. Geben Sie Ihre Wunschzeit in Ihrer Buchungsanfrage an.`,
      ],
      pl: [
        'Międzynarodowe lotnisko Dżerba-Zarzis (DJE) leży na wyspie Dżerba, około dziesięciu minut od Houmt Souk. Zamiast negocjować cenę taksówki z bagażem, zarezerwuj skuter z wyprzedzeniem.',
        `Dostawa na lotnisko kosztuje ${fee.pl}, tak jak w każdym innym miejscu na wyspie, i odbywa się między 08:00 a 20:00. Podaj preferowaną godzinę w prośbie o rezerwację.`,
      ],
    },
    highlights: {
      fr: ['Houmt Souk à 10 min', 'Zone touristique à 20 min'],
      en: ['Houmt Souk 10 min away', 'Tourist Zone 20 min away'],
      de: ['Houmt Souk in 10 Min.', 'Touristenzone in 20 Min.'],
      pl: ['Houmt Souk w 10 min', 'Strefa turystyczna w 20 min'],
    },
  },
];

export default zones;
