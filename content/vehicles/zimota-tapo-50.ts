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

  licence: {
    fr: 'Carte d’identité ou passeport',
    en: 'ID card or passport',
    de: 'Personalausweis oder Reisepass',
    pl: 'Dowód osobisty lub paszport',
  },
  minAge: 18,

  images: ['zimota-tapo-50-1.jpg', 'zimota-tapo-50-2.jpg'],

  tagline: {
    fr: 'Scooter urbain 50cc, léger et très économique en carburant',
    en: '50cc urban scooter, light and very fuel-efficient',
    de: '50-cm³-Stadtroller, leicht und sehr sparsam',
    pl: 'Miejski skuter 50 cm³, lekki i bardzo oszczędny',
  },
  description: {
    fr: 'Scooter urbain 50cc, léger et compact, très économique en carburant, facile à conduire et maniable en ville. Confortable et sécurisant, parfait pour vos déplacements quotidiens et pour explorer la ville en toute simplicité.',
    en: 'Lightweight and compact 50cc urban scooter, very fuel-efficient, easy to ride and maneuverable in the city. Comfortable and safe, perfect for your daily trips and exploring the city with ease.',
    de: 'Leichter und kompakter 50-cm³-Stadtroller, sehr sparsam im Verbrauch, einfach zu fahren und wendig in der Stadt. Bequem und sicher, ideal für Ihre täglichen Fahrten und um die Stadt ganz einfach zu erkunden.',
    pl: 'Lekki i kompaktowy miejski skuter 50 cm³, bardzo oszczędny, łatwy w prowadzeniu i zwrotny w mieście. Wygodny i bezpieczny, idealny na codzienne przejazdy i do łatwego zwiedzania miasta.',
  },
  /* Only what the daily price covers. Delivery is not included: the site
     shows it as its own line, using the fee from `content/site.ts`. */
  included: {
    fr: [
      'Casque fourni',
      'Tout l’équipement inclus',
      'Assistance immédiate en cas de panne',
    ],
    en: [
      'Helmet included',
      'All equipment included',
      'Immediate breakdown assistance',
    ],
    de: [
      'Helm inklusive',
      'Gesamte Ausrüstung inklusive',
      'Sofortige Pannenhilfe',
    ],
    pl: [
      'Kask w cenie',
      'Całe wyposażenie w cenie',
      'Natychmiastowa pomoc w razie awarii',
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
