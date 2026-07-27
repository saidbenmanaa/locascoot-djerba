import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { LegalPage } from '@/components/sections/LegalPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.legalNotice' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/legal-notice',
    title: t('title'),
    description: t('description'),
    noIndex: true,
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('meta.legalNotice');
  const tl = await getTranslations('legal');

  return <LegalPage title={t('title')} intro={tl('legalNoticeIntro')} />;
}
