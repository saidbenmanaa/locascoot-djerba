import type { Metadata } from 'next';
import Image from 'next/image';
import { Eye, ShieldCheck, PhoneCall } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getVehicles, getZones } from '@/lib/content';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/about',
    title: t('title'),
    description: t('description'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tNav = await getTranslations('nav');

  const vehicles = await getVehicles();
  const zones = await getZones();

  const values = [
    { icon: Eye, title: t('value1Title'), text: t('value1Text') },
    { icon: ShieldCheck, title: t('value2Title'), text: t('value2Text') },
    { icon: PhoneCall, title: t('value3Title'), text: t('value3Text') },
  ];

  const stats = [
    { value: String(vehicles.length), label: t('statsVehicles') },
    { value: String(zones.length), label: t('statsZones') },
    { value: '7/7', label: t('statsOpen') },
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
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h1 className="text-[length:var(--text-h1)]">{t('title')}</h1>
              <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
                {t('subtitle')}
              </p>

              <div className="prose-locascoot mt-6">
                <p>{t('p1')}</p>
                <p>{t('p2')}</p>
                <p>{t('p3')}</p>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-bold text-gold-700 dark:text-gold-300">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-sm" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-sand-100 dark:bg-sea-900">
              <Image
                src="/images/about/about.jpg"
                alt={`${site.name} — ${site.address.city}, ${site.address.countryName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading title={t('valuesTitle')} />
          <ul className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="surface-card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sea-800 text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd
        schema={breadcrumbSchema([
          { name: tNav('home'), url: urlFor('/', locale as Locale) },
          { name: t('title'), url: urlFor('/about', locale as Locale) },
        ])}
      />
    </>
  );
}
