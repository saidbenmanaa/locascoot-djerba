import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getUsedCategories, getVehicles } from '@/lib/content';
import { categoryKey } from '@/lib/vehicle-utils';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import type { Locale } from '@/i18n/routing';
import { Container, Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CategoryFilter } from '@/components/vehicle/CategoryFilter';
import { VehicleCard } from '@/components/vehicle/VehicleCard';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.scooters' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/scooters',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ScootersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('scooters');
  const tNav = await getTranslations('nav');
  const tCat = await getTranslations('categories');

  const vehicles = await getVehicles();
  const categories = await getUsedCategories();

  const labels: Record<string, string> = {};
  for (const category of categories) {
    labels[category] = tCat(`${categoryKey(category)}_plural`);
  }

  /* Cards are rendered on the server and handed to the client filter as
     children, so the full fleet is in the HTML that Google receives while the
     filtering still feels instant. */
  const filterable = vehicles.map((vehicle, index) => ({
    slug: vehicle.slug,
    category: vehicle.category,
    card: <VehicleCard vehicle={vehicle} priority={index < 4} />,
  }));

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
        />
      </Container>

      <Section className="pt-2">
        <Container>
          <header className="mb-10 max-w-2xl">
            <h1 className="text-[length:var(--text-h1)]">{t('title')}</h1>
            <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle', { count: vehicles.length })}
            </p>
          </header>

          <CategoryFilter
            vehicles={filterable}
            categories={categories}
            labels={labels}
            allLabel={tCat('all')}
            legend={t('filterLabel')}
            emptyLabel={t('noResults')}
          />
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        schema={breadcrumbSchema([
          { name: tNav('home'), url: urlFor('/', locale as Locale) },
          { name: t('title'), url: urlFor('/scooters', locale as Locale) },
        ])}
      />
    </>
  );
}
