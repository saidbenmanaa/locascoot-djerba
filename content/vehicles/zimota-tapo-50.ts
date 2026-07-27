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
  },
  minAge: 18,

  images: ['zimota-tapo-50-1.jpg', 'zimota-tapo-50-2.jpg'],

  tagline: {
    fr: 'Scooter urbain 50cc, léger et très économique en carburant',
    en: '50cc urban scooter, light and very fuel-efficient',
  },
  description: {
    fr: 'Scooter urbain 50cc, léger et compact, très économique en carburant, facile à conduire et maniable en ville. Confortable et sécurisant, parfait pour vos déplacements quotidiens et pour explorer la ville en toute simplicité.',
    en: 'Lightweight and compact 50cc urban scooter, very fuel-efficient, easy to ride and maneuverable in the city. Comfortable and safe, perfect for your daily trips and exploring the city with ease.',
  },
  included: {
    fr: [
      'Casque fourni',
      'Tout l’équipement inclus',
      'Assistance immédiate en cas de panne',
      'Livraison gratuite partout à Djerba',
    ],
    en: [
      'Helmet included',
      'All equipment included',
      'Immediate breakdown assistance',
      'Free delivery anywhere in Djerba',
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
