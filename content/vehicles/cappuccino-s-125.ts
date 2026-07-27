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
  },
  minAge: 18,

  images: ['cappuccino-s-125-1.jpg', 'cappuccino-s-125-2.jpg'],

  tagline: {
    fr: 'Scooter rétro 125cc, confortable et économique',
    en: '125cc retro scooter, comfortable and fuel-efficient',
  },
  description: {
    fr: 'Scooter rétro 125cc économique en carburant, avec une assise large et une conduite très confortable. Excellente stabilité sur la route et facile à prendre en main. Un choix idéal pour vos trajets quotidiens et pour découvrir la région avec style.',
    en: 'Fuel-efficient 125cc retro scooter with a wide seat and very comfortable ride. Excellent road stability and easy to handle. An ideal choice for your daily trips and discovering the region in style.',
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

  pricing: [{ minDays: 1, maxDays: null, pricePerDay: 80 }],

  available: true,
  featured: true,
  order: 2,
};

export default vehicle;
