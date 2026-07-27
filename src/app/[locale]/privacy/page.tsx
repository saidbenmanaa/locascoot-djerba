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
  const t = await getTranslations({ locale, namespace: 'meta.privacy' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/privacy',
    title: t('title'),
    description: t('description'),
    noIndex: true,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('meta.privacy');
  const tl = await getTranslations('legal');

  return <LegalPage title={t('title')} intro={tl('privacyIntro')} />;
}
