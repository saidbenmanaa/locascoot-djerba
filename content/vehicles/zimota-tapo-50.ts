import type { Vehicle } from '@/types/content';

/**
 * To add a new vehicle: copy this file, rename it, change the values, then
 * add it to the list in `content/vehicles/index.ts`. That's all.
 */
const vehicle: Vehicle = {
  slug: 'zimota-tapo-50',
  /* Displayed model name. The engine size belongs in the specs and the
     description, not in the name. */
  name: 'Zimota Tapo',
  category: 'scooter-50',

  engineCc: 50,
  transmission: 'automatic',
  seats: 2,

  minAge: 18,

  images: ['zimota-tapo-50-1.jpg', 'zimota-tapo-50-2.jpg'],

  tagline: {
    fr: 'Scooter urbain 50cc, léger et maniable',
    en: '50cc urban scooter, light and easy to handle',
    de: '50-cm³-Stadtroller, leicht und wendig',
    pl: 'Miejski skuter 50 cm³, lekki i zwrotny',
  },
  description: {
    fr: 'Scooter urbain 50cc, léger et compact, facile à conduire et maniable en ville.',
    en: 'Lightweight and compact 50cc urban scooter, easy to ride and maneuverable in the city.',
    de: 'Leichter und kompakter 50-cm³-Stadtroller, einfach zu fahren und wendig in der Stadt.',
    pl: 'Lekki i kompaktowy miejski skuter 50 cm³, łatwy w prowadzeniu i zwrotny w mieście.',
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

  /* One flat daily rate. To introduce cheaper long rentals later, add more
     bands here and every price table on the site adapts automatically. */
  pricing: [{ minDays: 1, maxDays: null, pricePerDay: 60 }],

  available: true,
  featured: true,
  order: 1,
};

export default vehicle;
