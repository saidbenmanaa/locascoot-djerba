import type {
  Locale,
  Localised,
  LocalisedList,
  Vehicle,
  VehicleCategory,
} from '@/types/content';

/**
 * Pure helpers for working with content. No data access here, so these are
 * safe to use in client components as well as on the server.
 */

// ---------------------------------------------------------------------------
// Translation
// ---------------------------------------------------------------------------

/** Picks the right language out of a translated content field. */
export function t(field: Localised, locale: Locale): string {
  return field[locale] ?? field.fr;
}

/** Picks the right language out of a translated list field. */
export function tList(field: LocalisedList, locale: Locale): string[] {
  return field[locale] ?? field.fr;
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

/**
 * Cheapest daily rate — the "from X DT / day" figure on cards and in search
 * results. Derived from the tiers so it can never fall out of sync with the
 * price table.
 */
export function getStartingPrice(vehicle: Vehicle): number {
  return Math.min(...vehicle.pricing.map((tier) => tier.pricePerDay));
}

/** Highest daily rate — what a single day costs. */
export function getDayRate(vehicle: Vehicle): number {
  return Math.max(...vehicle.pricing.map((tier) => tier.pricePerDay));
}

/** The pricing tier that applies to a given rental length. */
export function getTierForDays(vehicle: Vehicle, days: number) {
  return (
    vehicle.pricing.find(
      (tier) =>
        days >= tier.minDays && (tier.maxDays === null || days <= tier.maxDays),
    ) ?? vehicle.pricing[vehicle.pricing.length - 1]
  );
}

/** Total cost of a rental, in TND. */
export function getTotalPrice(vehicle: Vehicle, days: number): number {
  return getTierForDays(vehicle, days).pricePerDay * days;
}

/**
 * Human label for a tier, e.g. "1 day", "2–3 days", "7+ days".
 * Takes both forms of the word so a single day never reads "1 days".
 */
export function tierLabel(
  tier: { minDays: number; maxDays: number | null },
  dayWord: string,
  daysWord: string,
): string {
  if (tier.maxDays === null) return `${tier.minDays}+ ${daysWord}`;
  if (tier.minDays === tier.maxDays) {
    return `${tier.minDays} ${tier.minDays === 1 ? dayWord : daysWord}`;
  }
  return `${tier.minDays}–${tier.maxDays} ${daysWord}`;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/** Order categories are presented in, cheapest and most popular first. */
export const categoryOrder: VehicleCategory[] = [
  'scooter-50',
  'scooter-125',
  'maxi-scooter',
  'motorcycle',
];

/** Maps a category to its key in the translation files. */
export function categoryKey(category: VehicleCategory): string {
  return category.replace(/-/g, '_');
}
