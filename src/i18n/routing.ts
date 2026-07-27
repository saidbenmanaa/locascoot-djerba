import { defineRouting } from 'next-intl/routing';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

/**
 * Localised URLs. French is the primary market so it lives at the domain root
 * (`/tarifs`), English is prefixed (`/en/prices`). Keeping the slugs in the
 * visitor's own language is a real ranking factor for local search terms.
 *
 * To add a language later: add it to `locales` above, add a `messages/xx.json`
 * file, and add its slugs to each entry below. Nothing else needs to change.
 */
export const pathnames = {
  '/': '/',
  '/scooters': {
    fr: '/scooters',
    en: '/scooters',
  },
  '/scooters/[slug]': {
    fr: '/scooters/[slug]',
    en: '/scooters/[slug]',
  },
  '/prices': {
    fr: '/tarifs',
    en: '/prices',
  },
  '/rental-conditions': {
    fr: '/conditions-de-location',
    en: '/rental-conditions',
  },
  '/about': {
    fr: '/a-propos',
    en: '/about',
  },
  '/contact': {
    fr: '/contact',
    en: '/contact',
  },
  '/book': {
    fr: '/reservation',
    en: '/book',
  },
  '/zones/[zone]': {
    fr: '/zones/[zone]',
    en: '/areas/[zone]',
  },
  '/terms': {
    fr: '/conditions-generales',
    en: '/terms',
  },
  '/privacy': {
    fr: '/confidentialite',
    en: '/privacy',
  },
  '/legal-notice': {
    fr: '/mentions-legales',
    en: '/legal-notice',
  },
} as const;

export type AppPathname = keyof typeof pathnames;

/**
 * Routes with no dynamic segment, so they can be linked to with a plain
 * string. Routes like '/scooters/[slug]' must be passed as
 * `{ pathname, params }` instead — the type system enforces that, which stops
 * a broken link from ever reaching production.
 */
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
  // French serves from `/`, other locales are prefixed. Keeps the primary
  // market on the cleanest possible URLs.
  localePrefix: 'as-needed',
});
