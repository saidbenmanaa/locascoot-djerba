import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata, notFoundMetadata } from '@/lib/seo';
import { legalLocales, type Locale } from '@/i18n/routing';
import { LegalPage } from '@/components/sections/LegalPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!legalLocales.includes(locale as Locale)) return notFoundMetadata(locale);

  const t = await getTranslations({ locale, namespace: 'meta.terms' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/terms',
    title: t('title'),
    description: t('description'),
    // Legal pages carry no search value and would dilute the pages that do.
    noIndex: true,
    availableLocales: legalLocales,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Not translated until the final legal text exists: see legalLocales.
  if (!legalLocales.includes(locale as Locale)) notFound();

  const t = await getTranslations('meta.terms');
  const tl = await getTranslations('legal');

  return <LegalPage title={t('title')} intro={tl('termsIntro')} />;
}
