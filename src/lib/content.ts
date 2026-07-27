import 'server-only';

import type { FaqItem, Vehicle, VehicleCategory, Zone } from '@/types/content';

import { vehicles as allVehicles } from '@content/vehicles';
import { zones as allZones } from '@content/zones';
import { faq as allFaq } from '@content/faq';
import { categoryOrder } from './vehicle-utils';

/**
 * ============================================================================
 *  THE CONTENT API — the only place that knows where content comes from
 * ============================================================================
 *
 *  Pages read content through these functions and never import from `/content`
 *  directly. That single rule is what keeps the door open to a CMS: to move to
 *  Sanity later you rewrite the bodies below to fetch from its API, and nothing
 *  else in the codebase changes.
 *
 *  They are deliberately `async` even though reading local files is instant.
 *  A CMS call would be asynchronous, so writing every caller that way now makes
 *  the migration a genuine drop-in rather than a refactor of every page.
 *
 *  (`content/site.ts` is the one exception — it is a plain settings object with
 *  no I/O, so it is imported directly via `@/lib/site` and works on the client
 *  too.)
 */

// ---------------------------------------------------------------------------
// Vehicles
// ---------------------------------------------------------------------------

const byOrder = (a: Vehicle, b: Vehicle) => a.order - b.order;

/** Every bookable vehicle, in display order. Hidden ones are filtered out. */
export async function getVehicles(): Promise<Vehicle[]> {
  return allVehicles.filter((v) => v.available).sort(byOrder);
}

/** Includes vehicles marked `available: false`. */
export async function getAllVehicles(): Promise<Vehicle[]> {
  return [...allVehicles].sort(byOrder);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return allVehicles.find((v) => v.slug === slug && v.available) ?? null;
}

/** The handful shown on the homepage. */
export async function getFeaturedVehicles(limit = 4): Promise<Vehicle[]> {
  const featured = allVehicles
    .filter((v) => v.available && v.featured)
    .sort(byOrder);

  // Never let the homepage be empty, even if nothing is flagged as featured.
  const list =
    featured.length > 0 ? featured : allVehicles.filter((v) => v.available).sort(byOrder);

  return list.slice(0, limit);
}

/** Categories that actually contain bookable vehicles, in presentation order. */
export async function getUsedCategories(): Promise<VehicleCategory[]> {
  const present = new Set(
    allVehicles.filter((v) => v.available).map((v) => v.category),
  );
  return categoryOrder.filter((category) => present.has(category));
}

// ---------------------------------------------------------------------------
// Zones and FAQ
// ---------------------------------------------------------------------------

export async function getZones(): Promise<Zone[]> {
  return allZones;
}

export async function getZoneBySlug(slug: string): Promise<Zone | null> {
  return allZones.find((z) => z.slug === slug) ?? null;
}

export async function getFaq(): Promise<FaqItem[]> {
  return allFaq;
}
