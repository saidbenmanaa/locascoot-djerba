import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFeaturedVehicles, getZoneBySlug, getZones } from '@/lib/content';
import { t as translate, tList, zoneSlug } from '@/lib/vehicle-utils';
import { buildMetadata, notFoundMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema, zoneServiceSchema } from '@/lib/schema';
import { deliveryFee } from '@/lib/site';
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
    zones.map((zone) => ({ locale, zone: zoneSlug(zone, locale) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; zone: string }>;
}): Promise<Metadata> {
  const { locale, zone: slug } = await params;
  const typedLocale = locale as Locale;
  const zone = await getZoneBySlug(slug, typedLocale);
  if (!zone) return notFoundMetadata(locale);

  const t = await getTranslations({ locale, namespace: 'meta.zone' });
  const values = {
    zone: translate(zone.name, typedLocale),
    where: translate(zone.where, typedLocale),
    fee: deliveryFee(locale),
  };

  return buildMetadata({
    locale: typedLocale,
    pathname: '/zones/[zone]',
    params: (alt) => ({ zone: zoneSlug(zone, alt) }),
    title: t('title', values),
    description: t('description', values),
  });
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ locale: string; zone: string }>;
}) {
  const { locale, zone: slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const zone = await getZoneBySlug(slug, typedLocale);
  if (!zone) notFound();

  const t = await getTranslations('zones');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');

  const vehicles = await getFeaturedVehicles(4);

  const name = translate(zone.name, typedLocale);
  const where = translate(zone.where, typedLocale);
  const fee = deliveryFee(locale);
  const body = tList(zone.body, typedLocale);
  const highlights = tList(zone.highlights, typedLocale);
  const pageUrl = urlFor('/zones/[zone]', typedLocale, { zone: zoneSlug(zone, typedLocale) });

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: name },
          ]}
        />
      </Container>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[length:var(--text-h1)]">{t('title', { where })}</h1>

              <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
                {translate(zone.intro, typedLocale)}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-whatsapp-ink dark:text-whatsapp">
                  <MapPin className="size-4" aria-hidden />
                  {t('deliveryFee', { fee })}
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
                <h2 className="text-[length:var(--text-h3)]">{t('highlightsTitle')}</h2>
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
          <SectionHeading title={t('fleetTitle', { where })} />
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
        title={t('ctaTitle', { where })}
        text={t('ctaText', { fee })}
        whatsappMessage={t('whatsappMessage', { where })}
      />

      <JsonLd
        schema={[
          zoneServiceSchema(zone, typedLocale, t('title', { where })),
          breadcrumbSchema([
            { name: tNav('home'), url: urlFor('/', typedLocale) },
            { name, url: pageUrl },
          ]),
        ]}
      />
    </>
  );
}
