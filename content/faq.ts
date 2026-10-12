import type { FaqItem } from '@/types/content';
import { deliveryFee } from '@/lib/site';

/**
 * ============================================================================
 *  FREQUENTLY ASKED QUESTIONS
 * ============================================================================
 *
 *  These serve two purposes: they remove the hesitation that stops people
 *  booking, and they are published as structured data so Google can show them
 *  directly in search results. Adding a question here is one of the cheapest
 *  SEO wins available — write them using the words your customers actually use.
 *
 *  Only answer with conditions you actually apply. The delivery fee comes from
 *  `content/site.ts`.
 */
const fee = {
  fr: deliveryFee('fr'),
  en: deliveryFee('en'),
  de: deliveryFee('de'),
  pl: deliveryFee('pl'),
};

export const faq: FaqItem[] = [
  {
    topic: 'booking',
    question: {
      fr: 'La livraison est-elle incluse dans le prix ?',
      en: 'Is delivery included in the price?',
      de: 'Ist die Lieferung im Preis inbegriffen?',
      pl: 'Czy dostawa jest wliczona w cenę?',
    },
    answer: {
      fr: `Non, la livraison n’est pas comprise dans le prix de location par jour. Nous livrons votre scooter dans la zone touristique, à Aghir et à Midoun, pour ${fee.fr}. Nous livrons uniquement dans ces trois zones.`,
      en: `No, delivery is not included in the daily rental price. We deliver your scooter to the Tourist Zone, Aghir and Midoun for ${fee.en}. We only deliver to these three areas.`,
      de: `Nein, die Lieferung ist nicht im Tagesmietpreis enthalten. Wir liefern Ihren Roller in die Touristenzone, nach Aghir und nach Midoun, für ${fee.de}. Wir liefern ausschließlich in diese drei Zonen.`,
      pl: `Nie, dostawa nie jest wliczona w cenę wynajmu za dzień. Dostarczamy skuter do strefy turystycznej, do Aghir i do Midoun, za ${fee.pl}. Dostarczamy wyłącznie do tych trzech stref.`,
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Ai-je besoin d’un permis de conduire ?',
      en: 'Do I need a driver’s licence?',
      de: 'Brauche ich einen Führerschein?',
      pl: 'Czy potrzebuję prawa jazdy?',
    },
    answer: {
      fr: 'Un permis de conduire valide est requis pour le scooter 125cc.',
      en: 'A valid driver’s licence is required for the 125cc scooter.',
      de: 'Für den 125-cm³-Roller ist ein gültiger Führerschein erforderlich.',
      pl: 'Do skutera 125 cm³ wymagane jest ważne prawo jazdy.',
    },
  },
  {
    topic: 'booking',
    question: {
      fr: 'Comment puis-je payer ma réservation ?',
      en: 'How do I pay for my reservation?',
      de: 'Wie bezahle ich meine Reservierung?',
      pl: 'Jak zapłacić za rezerwację?',
    },
    answer: {
      fr: 'Aucun paiement en ligne n’est requis. Remplissez le formulaire de réservation sur notre site, qui envoie les détails à notre WhatsApp. Vous payez en espèces (Euro, Dollar ou Dinar tunisien) à la livraison du scooter.',
      en: 'No online payment is required. Complete the reservation form on our site, which sends the details to our WhatsApp. You pay in cash (Euro, Dollar or Tunisian Dinar) upon scooter delivery.',
      de: 'Es ist keine Online-Zahlung nötig. Füllen Sie das Buchungsformular auf unserer Website aus, das die Angaben an unser WhatsApp sendet. Sie zahlen bar (Euro, Dollar oder Tunesischer Dinar) bei Lieferung des Rollers.',
      pl: 'Płatność online nie jest wymagana. Wypełnij formularz rezerwacji na naszej stronie, który przesyła dane na nasz WhatsApp. Płacisz gotówką (w euro, dolarach lub dinarach tunezyjskich) przy dostawie skutera.',
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Quel est l’âge minimum pour louer un scooter ?',
      en: 'What is the minimum age to rent a scooter?',
      de: 'Wie alt muss man sein, um einen Roller zu mieten?',
      pl: 'Jaki jest minimalny wiek, aby wynająć skuter?',
    },
    answer: {
      fr: 'L’âge minimum est de 18 ans, pour tous nos scooters.',
      en: 'The minimum age is 18, for all of our scooters.',
      de: 'Das Mindestalter beträgt 18 Jahre, für alle unsere Roller.',
      pl: 'Minimalny wiek to 18 lat, dla wszystkich naszych skuterów.',
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Quels documents dois-je présenter ?',
      en: 'Which documents do I need to provide?',
      de: 'Welche Dokumente muss ich vorlegen?',
      pl: 'Jakie dokumenty muszę przedstawić?',
    },
    answer: {
      fr: 'Un permis de conduire valide pour le scooter 125cc.',
      en: 'A valid driving licence for the 125cc scooter.',
      de: 'Für den 125-cm³-Roller einen gültigen Führerschein.',
      pl: 'W przypadku skutera 125 cm³ ważne prawo jazdy.',
    },
  },
  {
    topic: 'practical',
    question: {
      fr: 'Le casque est-il fourni ?',
      en: 'Is a helmet provided?',
      de: 'Ist ein Helm dabei?',
      pl: 'Czy kask jest zapewniony?',
    },
    answer: {
      fr: 'Oui. Un casque et tout l’équipement nécessaire sont inclus avec chaque scooter.',
      en: 'Yes. A helmet and all necessary equipment are included with every scooter.',
      de: 'Ja. Ein Helm und die gesamte nötige Ausrüstung sind bei jedem Roller inklusive.',
      pl: 'Tak. Kask i całe niezbędne wyposażenie są w cenie każdego skutera.',
    },
  },
];

export default faq;
