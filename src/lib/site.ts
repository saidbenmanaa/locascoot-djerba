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

/**
 * The delivery fee as it is written in each language: "€10" in English,
 * "10 €" everywhere else. The non-breaking space keeps the amount and the
 * symbol on the same line.
 */
export function deliveryFee(locale: string): string {
  const amount = site.delivery.feeEur;
  return locale === 'en' ? `€${amount}` : `${amount} €`;
}

/** Social profiles and the Google Maps listing, in display order. Empty
 *  links in `content/site.ts` are left out. */
export function socialLinks(): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [
    { label: 'Facebook', href: site.social.facebook },
    { label: 'Instagram', href: site.social.instagram },
    { label: 'TikTok', href: site.social.tiktok },
    { label: 'Google Maps', href: site.mapsUrl },
    { label: 'Tripadvisor', href: site.social.tripadvisor },
  ];
  return links.filter((link) => link.href.length > 0);
}

/** Everything the visitor typed in the booking form, already worded for the
 *  message (the duration and total arrive formatted in their language). */
export interface BookingDetails {
  name?: string;
  phone?: string;
  email?: string;
  vehicle?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  total?: string;
  deliveryPlace?: string;
  deliveryTime?: string;
  riders?: string;
  message?: string;
}

/** The message labels, taken from the visitor's language file. */
export interface BookingMessageLabels {
  heading: string;
  /** Joins a label and its value with the punctuation of the language. */
  line: (label: string, value: string) => string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  duration: string;
  total: string;
  delivery: string;
  deliveryPlace: string;
  deliveryTime: string;
  riders: string;
  language: string;
  message: string;
}

/**
 * Formats a booking request as a readable WhatsApp message.
 *
 * Laid out as labelled lines rather than a sentence so that, on a busy day, you
 * can read the essentials off a notification without opening the chat. Fields
 * the customer has not filled in are left out entirely rather than shown empty.
 * The delivery fee is its own line and is never added to the dinar total.
 */
export function bookingWhatsappMessage(
  details: BookingDetails,
  labels: BookingMessageLabels,
  locale: string,
): string {
  const lines: string[] = [labels.heading, ''];
  const add = (label: string, value?: string) => {
    const text = value?.trim();
    if (text) lines.push(labels.line(label, text));
  };

  add(labels.name, details.name);
  add(labels.phone, details.phone);
  add(labels.email, details.email);
  add(labels.vehicle, details.vehicle);
  add(labels.startDate, details.startDate);
  add(labels.endDate, details.endDate);
  add(labels.duration, details.duration);
  add(labels.total, details.total);
  add(labels.delivery, deliveryFee(locale));
  add(labels.deliveryPlace, details.deliveryPlace);
  add(labels.deliveryTime, details.deliveryTime);
  add(labels.riders, details.riders);
  add(labels.language, locale.toUpperCase());

  const message = details.message?.trim();
  if (message) lines.push('', labels.line(labels.message, message));

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
