import type { Vehicle } from '@/types/content';

const vehicle: Vehicle = {
  slug: 'cappuccino-s-125',
  /* Displayed model name. The engine size belongs in the specs and the
     description, not in the name. */
  name: 'Cappuccino S',
  category: 'scooter-125',

  engineCc: 125,
  transmission: 'automatic',
  seats: 2,

  licence: {
    fr: 'Permis de conduire valide',
    en: 'Valid driving licence',
    de: 'Gültiger Führerschein',
    pl: 'Ważne prawo jazdy',
  },
  minAge: 18,

  images: ['cappuccino-s-125-1.jpg', 'cappuccino-s-125-2.jpg'],

  tagline: {
    fr: 'Scooter rétro 125cc, assise large',
    en: '125cc retro scooter with a wide seat',
    de: '125-cm³-Retro-Roller mit breiter Sitzbank',
    pl: 'Skuter retro 125 cm³ z szerokim siedziskiem',
  },
  description: {
    fr: 'Scooter rétro 125cc avec une assise large, facile à prendre en main.',
    en: '125cc retro scooter with a wide seat, easy to handle.',
    de: '125-cm³-Retro-Roller mit breiter Sitzbank, einfach zu handhaben.',
    pl: 'Skuter retro 125 cm³ z szerokim siedziskiem, łatwy w prowadzeniu.',
  },
  /* Only what the daily price covers. Delivery is not included: the site
     shows it as its own line, using the fee from `content/site.ts`. */
  included: {
    fr: [
      'Casque fourni',
      'Tout l’équipement inclus',
    ],
    en: [
      'Helmet included',
      'All equipment included',
    ],
    de: [
      'Helm inklusive',
      'Gesamte Ausrüstung inklusive',
    ],
    pl: [
      'Kask w cenie',
      'Całe wyposażenie w cenie',
    ],
  },

  pricing: [{ minDays: 1, maxDays: null, pricePerDay: 90 }],

  available: true,
  featured: true,
  order: 2,
};

export default vehicle;
