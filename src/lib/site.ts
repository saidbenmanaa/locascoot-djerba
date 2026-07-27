import { site } from '@content/site';

export { site };

/**
 * Derived values from your settings. Safe to use anywhere, including client
 * components — `content/site.ts` is a plain object with no data fetching.
 */

/** `tel:` link for the header and footer call buttons. */
export const telHref = `tel:${site.contact.phone}`;

/** `mailto:` link. */
export const mailtoHref = `mailto:${site.contact.email}`;

/**
 * Builds a WhatsApp link with the message already written for the customer.
 *
 * This is the single most important conversion detail on the site: arriving in
 * WhatsApp with the vehicle and dates already typed converts far better than
 * an empty chat window.
 */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface BookingDetails {
  name?: string;
  phone?: string;
  vehicle?: string;
  startDate?: string;
  endDate?: string;
  days?: number;
  total?: number;
  place?: string;
}

/**
 * Formats a booking enquiry as a readable WhatsApp message.
 *
 * Laid out as labelled lines rather than a sentence so that, on a busy day, you
 * can read the essentials off a notification without opening the chat. Fields
 * the customer has not filled in are left out entirely rather than shown empty.
 */
export function bookingWhatsappMessage(
  details: BookingDetails,
  locale: string = 'fr',
): string {
  const fr = locale !== 'en';

  const heading = fr
    ? '🛵 Nouvelle demande de réservation — Locascoot Djerba'
    : '🛵 New booking request — Locascoot Djerba';

  const labels = fr
    ? {
        name: 'Nom',
        phone: 'Téléphone / WhatsApp',
        vehicle: 'Scooter',
        start: 'Date de début',
        end: 'Date de fin',
        duration: 'Durée',
        total: 'Total estimé',
        place: 'Lieu de livraison',
        days: (n: number) => `${n} ${n === 1 ? 'jour' : 'jours'}`,
      }
    : {
        name: 'Name',
        phone: 'Phone / WhatsApp',
        vehicle: 'Scooter',
        start: 'Start date',
        end: 'End date',
        duration: 'Duration',
        total: 'Estimated total',
        place: 'Delivery location',
        days: (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`,
      };

  const lines: string[] = [heading, ''];
  // French puts a space before a colon; English does not.
  const separator = fr ? ' : ' : ': ';
  const add = (label: string, value?: string) => {
    if (value) lines.push(`${label}${separator}${value}`);
  };

  add(labels.name, details.name);
  add(labels.phone, details.phone);
  add(labels.vehicle, details.vehicle);
  add(labels.start, details.startDate);
  add(labels.end, details.endDate);
  if (details.days && details.days > 0) {
    add(labels.duration, labels.days(details.days));
  }
  if (details.total && details.total > 0) {
    add(labels.total, `${details.total} DT (≈ ${toEur(details.total)} €)`);
  }
  add(labels.place, details.place);

  return lines.join('\n');
}

/**
 * The address as written in `content/site.ts`. Returned verbatim rather than
 * rebuilt from the parts, so it always reads exactly as intended.
 */
export function formattedAddress(): string {
  return site.address.full;
}

/** Link to the Google Maps listing. */
export function mapsHref(): string {
  return site.mapsUrl;
}

/** Embeddable map, loaded lazily so it never slows the first paint. */
export function mapEmbedSrc(): string {
  const { latitude, longitude } = site.geo;
  const delta = 0.02;
  const bbox = [
    longitude - delta,
    latitude - delta / 2,
    longitude + delta,
    latitude + delta / 2,
  ].join('%2C');

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
}

/** Rough euro equivalent, for the hint shown next to dinar prices. */
export function toEur(tnd: number): number {
  return Math.round(tnd * site.currency.approxEurRate);
}

/** Opening hours as a single line, e.g. "08:00 – 20:00". */
export function openingHoursRange(): string {
  return `${site.openingHours.open} – ${site.openingHours.close}`;
}
