import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFeaturedVehicles, getZoneBySlug, getZones } from '@/lib/content';
import { t as translate, tList } from '@/lib/vehicle-utils';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema, zoneServiceSchema } from '@/lib/schema';
import { routing, type Locale } from '@/i18n/routing';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { VehicleGrid } from '@/components/vehicle/VehicleGrid';
import { ZonesGrid } from '@/components/sections/ZonesGrid';
import { CtaBand } from '@/components/sections/CtaBand';

/**
 * Local SEO landing pages.
 *
 * These target searches your competitors largely ignore — "location scooter
 * Midoun", "scooter rental Djerba airport" — where intent is high and
 * competition is thin. Each page is genuinely useful local content rather than
 * a keyword-swapped clone, which is what keeps it ranking.
 */
export async function generateStaticParams() {
  const zones = await getZones();
  return routing.locales.flatMap((locale) =>
    zones.map((zone) => ({ locale, zone: zone.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; zone: string }>;
}): Promise<Metadata> {
  const { locale, zone: slug } = await params;
  const zone = await getZoneBySlug(slug);
  if (!zone) return {};

  const t = await getTranslations({ locale, namespace: 'meta.zone' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/zones/[zone]',
    params: { zone: slug },
    title: t('title', { zone: zone.name }),
    description: t('description', { zone: zone.name }),
  });
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ locale: string; zone: string }>;
}) {
  const { locale, zone: slug } = await params;
  setRequestLocale(locale);

  const zone = await getZoneBySlug(slug);
  if (!zone) notFound();

  const t = await getTranslations('zones');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');

  const typedLocale = locale as Locale;
  const vehicles = await getFeaturedVehicles(4);

  const body = tList(zone.body, typedLocale);
  const highlights = tList(zone.highlights, typedLocale);

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: zone.name },
          ]}
        />
      </Container>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[length:var(--text-h1)]">
                {t('title', { zone: zone.name })}
              </h1>

              <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
                {translate(zone.intro, typedLocale)}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-whatsapp-dark dark:text-whatsapp">
                  <MapPin className="size-4" aria-hidden />
                  {zone.deliveryFee === 0
                    ? t('deliveryFree')
                    : t('deliveryFee', { fee: zone.deliveryFee })}
                </span>
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Clock className="size-4" aria-hidden />
                  {t('driveTime', { minutes: zone.driveTimeMinutes })}
                </span>
              </div>

              <div className="prose-locascoot mt-8">
                {body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">
                  {tc('bookNow')}
                </ButtonLink>
                <ButtonLink href="/prices" variant="outline" size="lg">
                  {tc('seeAllPrices')}
                </ButtonLink>
              </div>
            </div>

            <aside>
              <div className="surface-card p-6">
                <h2 className="text-[length:var(--text-h3)]">
                  {t('highlightsTitle', { zone: zone.name })}
                </h2>
                <ul className="mt-4 grid gap-2.5">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden />
                      <span style={{ color: 'var(--text-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading title={t('fleetTitle', { zone: zone.name })} />
          <VehicleGrid vehicles={vehicles} priorityCount={0} />
          <div className="mt-10 text-center">
            <ButtonLink href="/scooters" variant="outline" size="lg">
              {tc('seeAllVehicles')}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Internal links between zone pages: this is how they pass authority to
          one another and get discovered by search engines. */}
      <ZonesGrid excludeSlug={zone.slug} title={t('otherZones')} subtitle="" />

      <CtaBand
        title={t('ctaTitle', { zone: zone.name })}
        text={t('ctaText')}
        whatsappMessage={t('whatsappMessage', { zone: zone.name })}
      />

      <JsonLd
        schema={[
          zoneServiceSchema(zone, typedLocale),
          breadcrumbSchema([
            { name: tNav('home'), url: urlFor('/', typedLocale) },
            {
              name: zone.name,
              url: urlFor('/zones/[zone]', typedLocale, { zone: zone.slug }),
            },
          ]),
        ]}
      />
    </>
  );
}
