import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFaq, getFeaturedVehicles } from '@/lib/content';
import { t as translate } from '@/lib/vehicle-utils';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import type { Locale } from '@/i18n/routing';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Hero } from '@/components/sections/Hero';
import { WhyUs } from '@/components/sections/WhyUs';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ZonesGrid } from '@/components/sections/ZonesGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { VehicleGrid } from '@/components/vehicle/VehicleGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/',
    title: t('title'),
    description: t('description'),
    keywords:
      locale === 'fr'
        ? [
            'location scooter Djerba',
            'louer moto Djerba',
            'location scooter Houmt Souk',
            'location moto Tunisie',
            'louer scooter Midoun',
          ]
        : [
            'scooter rental Djerba',
            'rent motorcycle Djerba',
            'scooter hire Houmt Souk',
            'motorbike rental Tunisia',
            'rent scooter Midoun',
          ],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tc = await getTranslations('common');

  const featured = await getFeaturedVehicles(4);
  const faq = await getFaq();
  const previewFaq = faq.slice(0, 5);

  return (
    <>
      <Hero />

      {/* Featured fleet — the commercial core of the page, kept high up */}
      <Section>
        <Container>
          <SectionHeading title={t('fleetTitle')} subtitle={t('fleetSubtitle')} />
          <VehicleGrid vehicles={featured} priorityCount={2} />

          <div className="mt-10 text-center">
            <ButtonLink href="/scooters" variant="outline" size="lg">
              {tc('seeAllVehicles')}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <WhyUs />
      <HowItWorks />
      <ZonesGrid muted />

      {/* FAQ preview. The structured data below makes these answers eligible
          to appear directly in Google's results. */}
      <Section muted>
        <Container>
          <SectionHeading title={t('faqTitle')} subtitle={t('faqSubtitle')} />

          <div className="mx-auto max-w-3xl surface-card px-6">
            <Accordion
              items={previewFaq.map((item) => ({
                question: translate(item.question, locale as Locale),
                answer: translate(item.answer, locale as Locale),
              }))}
            />
          </div>

          <div className="mt-8 text-center">
            <ButtonLink href="/rental-conditions" variant="outline">
              {t('faqCta')}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Keyword-rich introduction. Genuinely informative rather than stuffed —
          it gives Google the local context it needs to rank the page. */}
      <Section>
        <Container>
          <div className="prose-locascoot mx-auto max-w-3xl text-center">
            <p>{t('intro')}</p>
          </div>
        </Container>
      </Section>

      <CtaBand />

      <JsonLd schema={faqSchema(previewFaq, locale as Locale)} />
    </>
  );
}
