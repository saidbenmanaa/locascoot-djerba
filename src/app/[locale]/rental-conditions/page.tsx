import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFaq } from '@/lib/content';
import { t as translate } from '@/lib/vehicle-utils';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import type { Locale } from '@/i18n/routing';
import type { FaqItem } from '@/types/content';
import { Container, Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.conditions' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/rental-conditions',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('conditions');
  const tNav = await getTranslations('nav');
  const typedLocale = locale as Locale;

  const faq = await getFaq();

  const groups: { key: FaqItem['topic']; title: string }[] = [
    { key: 'requirements', title: t('topicRequirements') },
    { key: 'booking', title: t('topicBooking') },
    { key: 'insurance', title: t('topicInsurance') },
    { key: 'practical', title: t('topicPractical') },
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

          <div className="mx-auto max-w-3xl space-y-10">
            {groups.map((group) => {
              const items = faq.filter((item) => item.topic === group.key);
              if (items.length === 0) return null;

              return (
                <section key={group.key}>
                  <h2 className="text-[length:var(--text-h3)]">{group.title}</h2>
                  <div className="mt-3 surface-card px-6">
                    <Accordion
                      items={items.map((item) => ({
                        question: translate(item.question, typedLocale),
                        answer: translate(item.answer, typedLocale),
                      }))}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand title={t('stillQuestions')} text={t('stillQuestionsText')} />

      {/* The whole FAQ is published as structured data, which is what makes
          these answers eligible to appear directly under the search result. */}
      <JsonLd
        schema={[
          faqSchema(faq, typedLocale),
          breadcrumbSchema([
            { name: tNav('home'), url: urlFor('/', typedLocale) },
            { name: t('title'), url: urlFor('/rental-conditions', typedLocale) },
          ]),
        ]}
      />
    </>
  );
}
