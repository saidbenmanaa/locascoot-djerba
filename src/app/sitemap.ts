import type { MetadataRoute } from 'next';
import { getVehicles, getZones } from '@/lib/content';
import { defaultLocale, locales, type AppPathname, type Locale } from '@/i18n/routing';
import { urlFor } from '@/lib/seo';
import { zoneSlug } from '@/lib/vehicle-utils';

/**
 * Sitemap, generated from your content.
 *
 * Add a scooter or a delivery zone and it appears here automatically — there
 * is no separate list to keep in sync. Each entry declares its translations
 * (plus x-default, the French page) so Google indexes the language versions as
 * one page rather than as competing duplicates.
 *
 * The legal pages are left out on purpose: they are templates awaiting the
 * owner's legal details, and are marked noindex.
 *
 * Submit https://www.locascootdjerba.tn/sitemap.xml once in Google Search Console.
 */

type Entry = {
  pathname: AppPathname;
  /** Route params in a given language (zone slugs are translated). */
  params?: (locale: Locale) => Record<string, string>;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getVehicles();
  const zones = await getZones();
  const lastModified = new Date();

  const entries: Entry[] = [
    { pathname: '/', priority: 1.0, changeFrequency: 'weekly' },
    { pathname: '/scooters', priority: 0.9, changeFrequency: 'weekly' },
    { pathname: '/prices', priority: 0.9, changeFrequency: 'monthly' },
    { pathname: '/book', priority: 0.8, changeFrequency: 'monthly' },
    { pathname: '/rental-conditions', priority: 0.7, changeFrequency: 'monthly' },
    { pathname: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { pathname: '/about', priority: 0.6, changeFrequency: 'yearly' },

    ...vehicles.map((vehicle) => ({
      pathname: '/scooters/[slug]' as AppPathname,
      params: () => ({ slug: vehicle.slug }),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),

    ...zones.map((zone) => ({
      pathname: '/zones/[zone]' as AppPathname,
      params: (locale: Locale) => ({ zone: zoneSlug(zone, locale) }),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];

  // One row per page per language, each declaring the full set of alternates.
  return entries.flatMap((entry) => {
    const url = (locale: Locale) => urlFor(entry.pathname, locale, entry.params?.(locale));
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((alt) => [alt, url(alt)]),
    );
    languages['x-default'] = url(defaultLocale);

    return locales.map((locale) => ({
      url: url(locale),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    }));
  });
}
