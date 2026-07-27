import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container, Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import type { ReactNode } from 'react';

/**
 * Shared shell for the three legal pages.
 *
 * ⚠️ The text on these pages is a starting template, not legal advice. Have it
 *    reviewed against your actual rental contract and Tunisian consumer law
 *    before the site goes live, then delete the warning banner.
 */
export async function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  const t = await getTranslations('legal');
  const tNav = await getTranslations('nav');

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: title }]} />
      </Container>

      <Section className="pt-2">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-[length:var(--text-h1)]">{title}</h1>

            <p className="mt-6 flex items-start gap-3 rounded-xl bg-gold-50 p-4 text-sm text-gold-900 dark:bg-gold-950/40 dark:text-gold-100">
              <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
              {t('placeholderNotice')}
            </p>

            <div className="prose-locascoot mt-8">
              <p>{intro}</p>
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
