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

  const t = await getTranslations({ locale, namespace: 'meta.legalNotice' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/legal-notice',
    title: t('title'),
    description: t('description'),
    noIndex: true,
    availableLocales: legalLocales,
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Not translated until the final legal text exists: see legalLocales.
  if (!legalLocales.includes(locale as Locale)) notFound();

  const t = await getTranslations('meta.legalNotice');
  const tl = await getTranslations('legal');

  return <LegalPage title={t('title')} intro={tl('legalNoticeIntro')} />;
}
