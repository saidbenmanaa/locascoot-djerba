import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getVehicles } from '@/lib/content';
import { tierLabel, categoryKey } from '@/lib/vehicle-utils';
import { toEur } from '@/lib/site';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Container, Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.prices' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/prices',
    title: t('title'),
    description: t('description'),
  });
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('prices');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');
  const tCat = await getTranslations('categories');

  const vehicles = await getVehicles();

  /* All vehicles share the same tier structure, so the first vehicle defines
     the columns. With a single flat rate there is one column, headed simply
     "price per day"; add duration bands later and the table grows by itself. */
  const tiers = vehicles[0]?.pricing ?? [];
  const isFlatRate = tiers.length === 1;

  // Only show a deposit column if a deposit is actually taken on something.
  const showDeposit = vehicles.some((vehicle) => Boolean(vehicle.deposit));

  const included = [
    t('included1'),
    t('included2'),
    t('included3'),
    t('included4'),
    t('included5'),
  ];

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
              {t('subtitle')}
            </p>
          </header>

          {/* Horizontal scroll on small screens rather than a squashed table —
              the page itself never scrolls sideways. */}
          <div className="surface-card overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b" style={{ backgroundColor: 'var(--surface-muted)' }}>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    {t('vehicle')}
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={`${tier.minDays}-${tier.maxDays}`}
                      scope="col"
                      className="px-4 py-4 text-right font-semibold whitespace-nowrap"
                    >
                      {isFlatRate
                        ? t('pricePerDayColumn')
                        : tierLabel(tier, tc('day'), tc('days'))}
                    </th>
                  ))}
                  {showDeposit ? (
                    <th scope="col" className="px-5 py-4 text-right font-semibold">
                      {t('depositColumn')}
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => {
                  return (
                    <tr key={vehicle.slug} className="border-b last:border-0">
                      <th scope="row" className="px-5 py-4 font-normal">
                        <Link
                          href={{
                            pathname: '/scooters/[slug]',
                            params: { slug: vehicle.slug },
                          }}
                          className="font-semibold hover:underline"
                          style={{ color: 'var(--text-strong)' }}
                        >
                          {vehicle.name}
                        </Link>
                        <span
                          className="mt-0.5 block text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {tCat(categoryKey(vehicle.category))}
                        </span>
                      </th>

                      {vehicle.pricing.map((tier) => (
                        <td
                          key={`${tier.minDays}-${tier.maxDays}`}
                          className="px-4 py-4 text-right whitespace-nowrap"
                        >
                          <span className="font-bold text-gold-700 dark:text-gold-300">
                            {tier.pricePerDay} DT
                          </span>
                          <span
                            className="ml-1.5 text-xs font-normal"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {tc('approxEur', { price: toEur(tier.pricePerDay) })}
                          </span>
                        </td>
                      ))}

                      {showDeposit ? (
                        <td
                          className="px-5 py-4 text-right whitespace-nowrap"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {vehicle.deposit ? `${vehicle.deposit} DT` : '—'}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('tableNote')}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="surface-card p-6 lg:col-span-1">
              <h2 className="text-[length:var(--text-h3)]">{t('includedTitle')}</h2>
              <ul className="mt-4 grid gap-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-5 shrink-0 text-whatsapp" aria-hidden />
                    <span style={{ color: 'var(--text-body)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {showDeposit ? (
              <div className="surface-card p-6">
                <h2 className="text-[length:var(--text-h3)]">{t('depositTitle')}</h2>
                <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {t('depositText')}
                </p>
              </div>
            ) : (
              <div className="surface-card p-6">
                <h2 className="text-[length:var(--text-h3)]">{t('documentsTitle')}</h2>
                <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {t('documentsText')}
                </p>
              </div>
            )}

            <div className="surface-card p-6">
              <h2 className="text-[length:var(--text-h3)]">{t('paymentTitle')}</h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {t('paymentText')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        schema={breadcrumbSchema([
          { name: tNav('home'), url: urlFor('/', locale as Locale) },
          { name: t('title'), url: urlFor('/prices', locale as Locale) },
        ])}
      />
    </>
  );
}
