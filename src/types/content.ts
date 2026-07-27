/**
 * Shapes for everything in `/content`.
 *
 * These types are what make file-based content safe: if a price is missing,
 * a category is misspelled or a translation is forgotten, `npm run build`
 * fails with a clear message instead of publishing a broken page.
 */

export type Locale = 'fr' | 'en';

/** A string that must be provided in every supported language. */
export type Localised = Record<Locale, string>;

/** A list of strings that must be provided in every supported language. */
export type LocalisedList = Record<Locale, string[]>;

export type VehicleCategory =
  | 'scooter-50'
  | 'scooter-125'
  | 'maxi-scooter'
  | 'motorcycle';

export type Transmission = 'automatic' | 'manual';

/**
 * Price for a duration band, expressed as a **price per day** in TND.
 *
 * A single band covering everything (`minDays: 1, maxDays: null`) means one
 * flat daily rate, which is how Locascoot currently prices. If you later want
 * cheaper long rentals, add more bands and the price tables adapt on their own.
 */
export interface PriceTier {
  /** Minimum number of days this tier applies from (inclusive). */
  minDays: number;
  /** Maximum number of days, or `null` for "and above". */
  maxDays: number | null;
  /** Price per day, in Tunisian dinar. */
  pricePerDay: number;
}

export interface Vehicle {
  /** URL segment. Lowercase, words separated by hyphens. Must be unique. */
  slug: string;
  /** Commercial name, e.g. "Cappuccino S 125cc". Not translated. */
  name: string;
  category: VehicleCategory;

  /** Engine size in cubic centimetres. */
  engineCc: number;
  transmission: Transmission;
  /** Number of people the vehicle is homologated for. */
  seats: number;

  /** Fuel tank capacity in litres. Omit if you do not have the figure. */
  tankLitres?: number;
  /** Combined consumption, litres per 100 km. Omit if unknown. */
  consumptionPer100km?: number;

  /** What the rider must present, e.g. "ID card or passport". */
  licence: Localised;
  /** Minimum age of the rider, in years. */
  minAge: number;

  /** Filenames inside `/public/images/vehicles/`. First one is the main photo. */
  images: string[];
  /** Short selling sentence shown on cards and in search results. */
  tagline: Localised;
  /** A short paragraph for the vehicle page. */
  description: Localised;
  /** What the customer gets for the price. */
  included: LocalisedList;

  pricing: PriceTier[];
  /** Refundable security deposit in TND. Omit or use 0 when none is taken. */
  deposit?: number;

  /** Set to false to hide the vehicle without deleting its file. */
  available: boolean;
  /** Show on the homepage. */
  featured: boolean;
  /** Lower numbers appear first. */
  order: number;
}

export interface Zone {
  /** URL segment, e.g. "houmt-souk". */
  slug: string;
  name: string;
  /** Delivery charge in TND. Use 0 for free delivery. */
  deliveryFee: number;
  /** Approximate driving time from Houmt Souk, in minutes. */
  driveTimeMinutes: number;
  intro: Localised;
  /** Two or three paragraphs of genuinely useful local content. */
  body: LocalisedList;
  /** Places worth riding to from this area. */
  highlights: LocalisedList;
}

export interface FaqItem {
  question: Localised;
  answer: Localised;
  /** Groups questions on the rental conditions page. */
  topic: 'booking' | 'requirements' | 'insurance' | 'practical';
}
