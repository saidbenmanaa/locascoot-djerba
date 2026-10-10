/**
 * ============================================================================
 *  GLOBAL SETTINGS — edit this file to change your details everywhere
 * ============================================================================
 *
 *  Everything here appears across the whole website. Change the phone number
 *  once, and it updates in the header, the footer, the contact page, the
 *  WhatsApp links and the data Google reads.
 */

export const site = {
  /** Always written in full — never "Locascoot" on its own. */
  name: 'Locascoot Djerba',

  tagline: {
    fr: 'Location de scooters premium à Djerba',
    en: 'Premium scooter rental in Djerba',
  },

  /** Your live domain, with no trailing slash. Used for every SEO link.
   *  The site is served on www; the bare domain redirects to it. */
  url: 'https://www.locascootdjerba.tn',

  /** Part of the "Groupe Alibaba", as shown on the logo. */
  group: 'Groupe Alibaba',

  /** Your logo file, in `public/images/`. Leave empty to fall back to the
   *  built-in wordmark. Because the logo has a white background, the navy
   *  header places it on a small white panel so it always reads cleanly —
   *  that means you can drop in your file exactly as it is, with no editing. */
  logo: '/images/logo.png',

  contact: {
    /** International format, no spaces. Used for click-to-call links. */
    phone: '+21656029971',
    /** How the number is displayed to a human. */
    phoneDisplay: '+216 56 029 971',
    /** Digits only, country code included, no "+". Used for WhatsApp links. */
    whatsapp: '21656029971',
    email: 'djerbalocascoot@gmail.com',
  },

  address: {
    /** The address exactly as it should appear to visitors. This is the string
     *  shown on the site, so it reads the way you wrote it. */
    full: 'Near Djerba Explore Park, Tourist Route, Djerba Midoun 1148, Tunisia',
    /** The same address broken into parts, which is the form Google needs for
     *  local results. Keep the two in step if you ever change one. */
    street: 'Near Djerba Explore Park, Tourist Route',
    city: 'Djerba Midoun',
    region: 'Médenine',
    postalCode: '1148',
    country: 'TN',
    countryName: 'Tunisia',
  },

  /** Exact position, used for the map on the contact page and for the
   *  coordinates Google reads. */
  geo: {
    latitude: 33.81700850326012,
    longitude: 11.043119326739435,
  },

  /** Your Google Maps listing. Used by the "Open in Google Maps" button. */
  mapsUrl: 'https://maps.app.goo.gl/GwkPDHPEKyrWEcKg6',

  /** Open every day, same hours. 24-hour format. */
  openingHours: {
    open: '08:00',
    close: '20:00',
  },

  /** Prices are stored in dinar. This rate only powers the "≈ €18" hint shown
   *  next to them, since most visitors think in euros. Update it occasionally —
   *  it is explicitly labelled as approximate, so it need not be exact. */
  currency: {
    code: 'TND',
    symbol: 'DT',
    approxEurRate: 0.3, // 60 DT ≈ 18 € · 80 DT ≈ 24 €
  },

  /** Cash on delivery, in any of these currencies. No online payment. */
  acceptedCurrencies: ['TND', 'EUR', 'USD'],

  /** Delivery is available on Djerba Island only — Djerba-Zarzis airport is
   *  on the island, so it is included. The fee is in euros and is always shown
   *  as its own line: it is never part of the daily price, never added to the
   *  dinar total and never converted. Change the number here and every page,
   *  the booking form and the WhatsApp message follow. */
  delivery: {
    feeEur: 10,
  },

  /** Trust signals shown across the site. */
  highlights: {
    helmetIncluded: true,
    breakdownAssistance: true,
    minAge: 18,
    minRentalDays: 1,
  },

  /** Copy each link exactly as given, query string included.
   *  Leave a link as an empty string to hide it. */
  social: {
    facebook: 'https://www.facebook.com/share/1KL2TXDuWh/',
    instagram: 'https://www.instagram.com/djerbalocascoot?stkn=NW1oc3czMm9vNnVk',
    tiktok: 'https://www.tiktok.com/@locascootdjerba',
    tripadvisor: '',
  },

  /** Aggregate review score shown to Google. Only fill this in once the numbers
   *  are real — inventing them breaches Google's guidelines and can get your
   *  rich results removed. Set `count` to your real total to enable stars. */
  reviews: {
    rating: 0,
    count: 0,
  },
} as const;

export type Site = typeof site;
