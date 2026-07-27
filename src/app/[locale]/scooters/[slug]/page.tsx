import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getVehicleBySlug, getVehicles } from '@/lib/content';
import {
  getStartingPrice,
  t as translate,
  tList,
  categoryKey,
} from '@/lib/vehicle-utils';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema, vehicleSchema } from '@/lib/schema';
import { whatsappHref, toEur } from '@/lib/site';
import { routing, type Locale } from '@/i18n/routing';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { VehicleGallery } from '@/components/vehicle/VehicleGallery';
import { SpecsList } from '@/components/vehicle/SpecsList';
import { PricingTable } from '@/components/vehicle/PricingTable';
import { VehicleGrid } from '@/components/vehicle/VehicleGrid';

/** Pre-renders every vehicle in every language at build time. */
export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return routing.locales.flatMap((locale) =>
    vehicles.map((vehicle) => ({ locale, slug: vehicle.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) return {};

  const t = await getTranslations({ locale, namespace: 'meta.vehicle' });
  const price = getStartingPrice(vehicle);

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/scooters/[slug]',
    params: { slug },
    title: t('title', { name: vehicle.name, price }),
    description: t('description', { name: vehicle.name, price }),
    image: `/images/vehicles/${vehicle.images[0]}`,
  });
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const t = await getTranslations('vehicle');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');
  const tCat = await getTranslations('categories');

  const typedLocale = locale as Locale;
  const price = getStartingPrice(vehicle);
  const included = tList(vehicle.included, typedLocale);
  const isFlatRate = vehicle.pricing.length === 1;

  const others = (await getVehicles())
    .filter((item) => item.slug !== vehicle.slug)
    .slice(0, 4);

  const whatsappMessage = t('whatsappMessage', { name: vehicle.name });

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: tNav('home'), href: '/' },
            { label: t('breadcrumbFleet'), href: '/scooters' },
            { label: vehicle.name },
          ]}
        />
      </Container>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <VehicleGallery
                images={vehicle.images}
                name={vehicle.name}
                alts={vehicle.images.map((_, index) =>
                  t('galleryAlt', { name: vehicle.name, index: index + 1 }),
                )}
              />
            </div>

            <div>
              <span className="inline-block rounded-full bg-sea-800 px-3 py-1 text-xs font-semibold text-white">
                {tCat(categoryKey(vehicle.category))}
              </span>

              <h1 className="mt-3 text-[length:var(--text-h1)]">{vehicle.name}</h1>

              <p className="mt-2 text-lg" style={{ color: 'var(--text-muted)' }}>
                {translate(vehicle.tagline, typedLocale)}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {tc('from')}
                </span>
                <span className="font-display text-4xl font-bold text-gold-700 dark:text-gold-300">
                  {price} DT
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{tc('perDay')}</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {tc('approxEur', { price: toEur(price) })}
                </span>
              </div>

              <p className="mt-5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {translate(vehicle.description, typedLocale)}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonExternal
                  href={whatsappHref(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                >
                  {t('bookCta', { name: vehicle.name })}
                </ButtonExternal>

                <ButtonLink href="/book" variant="outline" size="lg">
                  {t('bookByForm')}
                </ButtonLink>
              </div>

              <div className="mt-8">
                <h2 className="text-[length:var(--text-h3)]">{t('includedTitle')}</h2>
                <ul className="mt-3 grid gap-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-whatsapp"
                        aria-hidden
                      />
                      <span style={{ color: 'var(--text-body)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section muted className="pt-0 md:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="surface-card p-6 md:p-8">
              <h2 className="text-[length:var(--text-h3)]">{t('specsTitle')}</h2>
              <div className="mt-4">
                <SpecsList vehicle={vehicle} />
              </div>
            </div>

            <div className="surface-card p-6 md:p-8">
              {/* "Rates by duration" only makes sense with more than one band.
                  With a single flat rate it would promise a discount that does
                  not exist. */}
              <h2 className="text-[length:var(--text-h3)]">
                {isFlatRate ? t('pricingTitleFlat') : t('pricingTitle')}
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                {isFlatRate ? t('pricingSubtitleFlat') : t('pricingSubtitle')}
              </p>
              <div className="mt-4">
                <PricingTable vehicle={vehicle} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {others.length > 0 ? (
        <Section>
          <Container>
            <SectionHeading title={t('otherVehicles')} />
            <VehicleGrid vehicles={others} priorityCount={0} />
          </Container>
        </Section>
      ) : null}

      <JsonLd
        schema={[
          vehicleSchema(vehicle, typedLocale),
          breadcrumbSchema([
            { name: tNav('home'), url: urlFor('/', typedLocale) },
            { name: t('breadcrumbFleet'), url: urlFor('/scooters', typedLocale) },
            {
              name: vehicle.name,
              url: urlFor('/scooters/[slug]', typedLocale, { slug: vehicle.slug }),
            },
          ]),
        ]}
      />
    </>
  );
}
