import { MapPin, Clock } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getZones } from '@/lib/content';
import { t as translate } from '@/lib/vehicle-utils';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import type { Locale } from '@/i18n/routing';

/**
 * Links out to the zone landing pages. This doubles as internal linking, which
 * is how those pages accumulate authority and start ranking for the
 * "scooter rental + area" searches that competitors are not targeting.
 */
export async function ZonesGrid({
  muted = false,
  excludeSlug,
  title,
  subtitle,
}: {
  muted?: boolean;
  /** Omit the zone the visitor is already on. */
  excludeSlug?: string;
  title?: string;
  subtitle?: string;
}) {
  const t = await getTranslations('home');
  const tz = await getTranslations('zones');
  const locale = (await getLocale()) as Locale;
  const zones = (await getZones()).filter((zone) => zone.slug !== excludeSlug);

  return (
    <Section muted={muted}>
      <Container>
        <SectionHeading
          title={title ?? t('zonesTitle')}
          subtitle={subtitle ?? t('zonesSubtitle')}
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <li key={zone.slug}>
              <Link
                href={{ pathname: '/zones/[zone]', params: { zone: zone.slug } }}
                className="surface-card flex h-full flex-col p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-5 text-gold-600 dark:text-gold-400" aria-hidden />
                  <span className="font-display text-lg font-bold" style={{ color: 'var(--text-strong)' }}>
                    {zone.name}
                  </span>
                </span>

                <span
                  className="mt-3 flex-1 text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {translate(zone.intro, locale)}
                </span>

                <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="font-semibold text-whatsapp-dark dark:text-whatsapp">
                    {zone.deliveryFee === 0
                      ? tz('deliveryFree')
                      : tz('deliveryFee', { fee: zone.deliveryFee })}
                  </span>
                  <span className="inline-flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="size-3.5" aria-hidden />
                    {tz('driveTime', { minutes: zone.driveTimeMinutes })}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
