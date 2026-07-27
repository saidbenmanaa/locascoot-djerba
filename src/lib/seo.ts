import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, type AppPathname, type Locale } from '@/i18n/routing';
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

interface BuildMetadataOptions {
  locale: Locale;
  /** The internal route, e.g. '/scooters/[slug]'. */
  pathname: AppPathname;
  /** Route params, e.g. `{ slug: 'honda-pcx-125' }`. */
  params?: Params;
  title: string;
  description: string;
  /** Path to a social share image, relative to /public. */
  image?: string;
  /** Set for pages that should stay out of search results. */
  noIndex?: boolean;
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
  noIndex = false,
  keywords,
}: BuildMetadataOptions): Metadata {
  const canonical = urlFor(pathname, locale, params);

  // One entry per language, so Google knows these pages are translations of
  // each other rather than competing duplicates.
  const languages: Record<string, string> = {};
  for (const alt of locales) {
    languages[alt] = urlFor(pathname, alt, params);
  }
  languages['x-default'] = urlFor(pathname, 'fr', params);

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
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title,
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

/**
 * Titles are capped so Google does not truncate them in results. Roughly 60
 * characters is the practical limit; the site name is appended by the layout
 * template only when there is room.
 */
export function pageTitle(title: string): string {
  return title.length > 60 ? title.slice(0, 57).trimEnd() + '…' : title;
}
