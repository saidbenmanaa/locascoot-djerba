import type { FaqItem } from '@/types/content';

/**
 * ============================================================================
 *  FREQUENTLY ASKED QUESTIONS
 * ============================================================================
 *
 *  These serve two purposes: they remove the hesitation that stops people
 *  booking, and they are published as structured data so Google can show them
 *  directly in search results. Adding a question here is one of the cheapest
 *  SEO wins available — write them using the words your customers actually use.
 */
export const faq: FaqItem[] = [
  {
    topic: 'booking',
    question: {
      fr: 'Est-ce que la livraison est incluse ?',
      en: 'Is delivery included?',
    },
    answer: {
      fr: 'Oui, nous offrons la livraison gratuite de votre scooter partout sur l’île de Djerba.',
      en: 'Yes, we offer free scooter delivery anywhere on Djerba island.',
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Ai-je besoin d’un permis de conduire ?',
      en: 'Do I need a driver’s licence?',
    },
    answer: {
      fr: 'Un permis de conduire valide est requis pour le scooter 125cc. Pour le scooter 50cc, une carte d’identité ou un passeport suffit.',
      en: 'A valid driver’s licence is required for the 125cc scooter. For the 50cc scooter, a standard ID or passport is sufficient.',
    },
  },
  {
    topic: 'booking',
    question: {
      fr: 'Comment puis-je payer ma réservation ?',
      en: 'How do I pay for my reservation?',
    },
    answer: {
      fr: 'Aucun paiement en ligne n’est requis. Remplissez le formulaire de réservation sur notre site, qui envoie les détails à notre WhatsApp. Vous payez en espèces (Euro, Dollar ou Dinar tunisien) à la livraison du scooter.',
      en: 'No online payment is required. Complete the reservation form on our site, which sends the details to our WhatsApp. You pay in cash (Euro, Dollar or Tunisian Dinar) upon scooter delivery.',
    },
  },
  {
    topic: 'practical',
    question: {
      fr: 'Que se passe-t-il en cas de panne du scooter ?',
      en: 'What happens if the scooter breaks down?',
    },
    answer: {
      fr: 'Nous fournissons une assistance immédiate en cas de panne. Contactez-nous et nous intervenons immédiatement.',
      en: 'We provide immediate breakdown assistance. Contact us and we intervene right away.',
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Quel est l’âge minimum pour louer un scooter ?',
      en: 'What is the minimum age to rent a scooter?',
    },
    answer: {
      fr: 'L’âge minimum est de 18 ans, pour tous nos scooters.',
      en: 'The minimum age is 18, for all of our scooters.',
    },
  },
  {
    topic: 'requirements',
    question: {
      fr: 'Quels documents dois-je présenter ?',
      en: 'Which documents do I need to provide?',
    },
    answer: {
      fr: 'Une carte d’identité nationale ou un passeport, ainsi qu’un permis de conduire valide pour le scooter 125cc.',
      en: 'A national ID card or passport, plus a valid driving licence for the 125cc scooter.',
    },
  },
  {
    topic: 'practical',
    question: {
      fr: 'Le casque est-il fourni ?',
      en: 'Is a helmet provided?',
    },
    answer: {
      fr: 'Oui. Un casque et tout l’équipement nécessaire sont fournis avec chaque scooter, sans supplément.',
      en: 'Yes. A helmet and all necessary equipment are supplied with every scooter, at no extra cost.',
    },
  },
];

export default faq;
