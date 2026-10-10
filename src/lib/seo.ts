import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { defaultLocale, locales, type AppPathname, type Locale } from '@/i18n/routing';
import { site } from './site';

/**
 * ============================================================================
 *  SEO HELPERS
 * ============================================================================
 *
 *  Every page builds its metadata through `buildMetadata` so that canonical
 *  URLs, hreflang alternates, Open Graph and Twitter cards are correct and
 *  consistent by construction rather than by remembering to add them.
 *
 *  The hreflang matrix matters more than it looks: without it Google treats the
 *  French and English versions of a page as duplicates competing with each
 *  other, which is what quietly sinks most multilingual small-business sites.
 */

export const OG_IMAGE = '/images/og/default.jpg';

/** Absolute URL for a path. */
export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, '');
  return path === '/' ? base : `${base}${path}`;
}

type Params = Record<string, string>;

/** Absolute, locale-correct URL for one of our routes. */
export function urlFor(
  pathname: AppPathname,
  locale: Locale,
  params?: Params,
): string {
  const path = getPathname({
    href: params ? ({ pathname, params } as never) : ({ pathname } as never),
    locale,
  });
  return absoluteUrl(path);
}

/** Open Graph locale codes, one per site language. */
export const OG_LOCALES: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
};

interface BuildMetadataOptions {
  locale: Locale;
  /** The internal route, e.g. '/scooters/[slug]'. */
  pathname: AppPathname;
  /** Route params, e.g. `{ slug: 'cappuccino-s-125' }` — or a function giving
   *  them per language, for routes whose slug is translated (zones). */
  params?: Params | ((locale: Locale) => Params);
  title: string;
  description: string;
  /** Path to a social share image, relative to /public. */
  image?: string;
  /** Alt text for the share image. Defaults to the title. */
  imageAlt?: string;
  /** Set for pages that should stay out of search results. */
  noIndex?: boolean;
  /** Languages the page exists in, when not all of them. */
  availableLocales?: readonly Locale[];
  /** Extra keywords. Low value for ranking, harmless to include. */
  keywords?: string[];
}

export function buildMetadata({
  locale,
  pathname,
  params,
  title,
  description,
  image = OG_IMAGE,
  imageAlt,
  noIndex = false,
  availableLocales = locales,
  keywords,
}: BuildMetadataOptions): Metadata {
  const paramsFor = (target: Locale) =>
    typeof params === 'function' ? params(target) : params;
  const canonical = urlFor(pathname, locale, paramsFor(locale));

  // One entry per language, so Google knows these pages are translations of
  // each other rather than competing duplicates. x-default points to French.
  const languages: Record<string, string> = {};
  for (const alt of availableLocales) {
    languages[alt] = urlFor(pathname, alt, paramsFor(alt));
  }
  languages['x-default'] = urlFor(pathname, defaultLocale, paramsFor(defaultLocale));

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[locale],
      alternateLocale: availableLocales
        .filter((alt) => alt !== locale)
        .map((alt) => OG_LOCALES[alt]),
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/** Metadata for a page that does not exist: a clear title, and never indexed. */
export async function notFoundMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.notFound' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}
