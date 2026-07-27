import type { MetadataRoute } from 'next';
import { getVehicles, getZones } from '@/lib/content';
import { locales, type AppPathname, type Locale } from '@/i18n/routing';
import { urlFor } from '@/lib/seo';

/**
 * Sitemap, generated from your content.
 *
 * Add a scooter or a delivery zone and it appears here automatically — there
 * is no separate list to keep in sync. Each entry declares its translations so
 * Google indexes the French and English versions as one page in two languages
 * rather than as competing duplicates.
 *
 * Submit https://your-domain.com/sitemap.xml once in Google Search Console.
 */

type Entry = {
  pathname: AppPathname;
  params?: Record<string, string>;
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
      params: { slug: vehicle.slug },
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),

    ...zones.map((zone) => ({
      pathname: '/zones/[zone]' as AppPathname,
      params: { zone: zone.slug },
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];

  // One row per page per language, each declaring the full set of alternates.
  return entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: urlFor(entry.pathname, locale as Locale, entry.params),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            urlFor(entry.pathname, alt as Locale, entry.params),
          ]),
        ),
      },
    })),
  );
}
