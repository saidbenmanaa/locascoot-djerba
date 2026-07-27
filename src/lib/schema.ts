import type { FaqItem, Locale, Vehicle, Zone } from '@/types/content';
import { site } from './site';
import { absoluteUrl, urlFor } from './seo';
import { getStartingPrice, t } from './vehicle-utils';

/**
 * ============================================================================
 *  STRUCTURED DATA (JSON-LD)
 * ============================================================================
 *
 *  This is how Google understands what the business is, where it is and what
 *  it charges. It is what makes the shop eligible for the local map pack, and
 *  what can put prices and FAQ answers directly into search results.
 *
 *  Validate any change at https://search.google.com/test/rich-results
 */

const ALL_DAYS = [
  'https://schema.org/Monday',
  'https://schema.org/Tuesday',
  'https://schema.org/Wednesday',
  'https://schema.org/Thursday',
  'https://schema.org/Friday',
  'https://schema.org/Saturday',
  'https://schema.org/Sunday',
];

/** Open every day, same hours — one specification covering the whole week. */
function openingHoursSpecification() {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ALL_DAYS,
      opens: site.openingHours.open,
      closes: site.openingHours.close,
    },
  ];
}

/** Stable identifier so every other schema can point back to the business. */
export const BUSINESS_ID = `${site.url}/#business`;

/**
 * The core local-SEO object. `AutoRental` is the most specific schema.org type
 * for a vehicle rental business, and it inherits from LocalBusiness so it still
 * qualifies for local results.
 */
export function localBusinessSchema(locale: Locale) {
  const sameAs = [site.social.facebook, site.social.instagram, site.social.tripadvisor]
    .filter((url) => url.length > 0);

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': BUSINESS_ID,
    name: site.name,
    url: urlFor('/', locale),
    image: absoluteUrl('/images/og/default.jpg'),
    // Only advertise a logo once one actually exists — pointing Google at a
    // missing file is worse than omitting the field.
    ...(site.logo ? { logo: absoluteUrl(site.logo) } : {}),
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: 'DT60–DT80',
    currenciesAccepted: 'TND, EUR, USD',
    paymentAccepted: 'Cash (TND, EUR, USD)',
    address: {
      '@type': 'PostalAddress',
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: {
      '@type': 'Place',
      name: 'Djerba, Tunisia',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    // Only published when there are genuinely reviews to report. Inventing
    // these breaches Google's guidelines and risks losing rich results.
    ...(site.reviews.count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: site.reviews.rating,
            reviewCount: site.reviews.count,
          },
        }
      : {}),
  };
}

/** Lets Google show a site-wide search box and understand the brand. */
export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: urlFor('/', locale),
    inLanguage: locale,
    publisher: { '@id': BUSINESS_ID },
  };
}

/**
 * Per-vehicle Product schema with an Offer. This is what can put your daily
 * price directly into the search result for "location scooter Djerba".
 */
export function vehicleSchema(vehicle: Vehicle, locale: Locale) {
  const price = getStartingPrice(vehicle);

  // Offers need a validity window; a rolling year avoids stale-looking data.
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${urlFor('/scooters/[slug]', locale, { slug: vehicle.slug })}#product`,
    name: vehicle.name,
    description: t(vehicle.description, locale),
    image: vehicle.images.map((file) =>
      absoluteUrl(`/images/vehicles/${file}`),
    ),
    category: vehicle.category,
    brand: {
      '@type': 'Brand',
      name: vehicle.name.split(' ')[0],
    },
    offers: {
      '@type': 'Offer',
      url: urlFor('/scooters/[slug]', locale, { slug: vehicle.slug }),
      price,
      priceCurrency: 'TND',
      priceValidUntil: validUntil.toISOString().slice(0, 10),
      availability: vehicle.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@id': BUSINESS_ID },
      // Signals that the price is per day rather than a purchase price.
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price,
        priceCurrency: 'TND',
        unitCode: 'DAY',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'DAY',
        },
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Engine',
        value: `${vehicle.engineCc} cc`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Transmission',
        value: vehicle.transmission,
      },
      {
        '@type': 'PropertyValue',
        name: 'Seats',
        value: vehicle.seats,
      },
    ],
  };
}

/** Powers the expandable FAQ block that can appear under your search result. */
export function faqSchema(items: FaqItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: t(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answer, locale),
      },
    })),
  };
}

/** Shows the page's position in the site as a trail under the result. */
export function breadcrumbSchema(
  trail: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** Ties a zone landing page to the area it serves. */
export function zoneServiceSchema(zone: Zone, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType:
      locale === 'fr'
        ? `Location de scooter à ${zone.name}`
        : `Scooter rental in ${zone.name}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'Place',
      name: `${zone.name}, Djerba, Tunisia`,
    },
    url: urlFor('/zones/[zone]', locale, { zone: zone.slug }),
    description: t(zone.intro, locale),
  };
}

/** Renders any of the above into the page. */
export function jsonLdScript(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
