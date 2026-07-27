import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getVehicles } from '@/lib/content';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import type { Locale } from '@/i18n/routing';
import { Container, Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BookingForm } from '@/components/forms/BookingForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.book' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/book',
    title: t('title'),
    description: t('description'),
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('book');
  const tp = await getTranslations('prices');
  const tNav = await getTranslations('nav');

  const vehicles = await getVehicles();

  const options = vehicles.map((vehicle) => ({
    slug: vehicle.slug,
    name: vehicle.name,
    pricing: vehicle.pricing.map((tier) => ({ ...tier })),
    deposit: vehicle.deposit,
  }));

  const included = [
    tp('included1'),
    tp('included2'),
    tp('included3'),
    tp('included4'),
    tp('included5'),
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
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <h1 className="text-[length:var(--text-h1)]">{t('title')}</h1>
              <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
                {t('subtitle')}
              </p>

              <div className="mt-8">
                <BookingForm vehicles={options} />
              </div>
            </div>

            <aside className="lg:pt-24">
              <div className="surface-card p-6">
                <h2 className="text-[length:var(--text-h3)]">{tp('includedTitle')}</h2>
                <ul className="mt-4 grid gap-2.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-5 shrink-0 text-whatsapp" aria-hidden />
                      <span className="text-sm" style={{ color: 'var(--text-body)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: tNav('home'), url: urlFor('/', locale as Locale) },
          { name: t('title'), url: urlFor('/book', locale as Locale) },
        ])}
      />
    </>
  );
}
