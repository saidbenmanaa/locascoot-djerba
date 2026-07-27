import { getTranslations } from 'next-intl/server';
import { Container, Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  const tc = await getTranslations('common');

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl py-12 text-center">
          <p className="font-display text-6xl font-bold text-sand-300 dark:text-sea-800">
            404
          </p>
          <h1 className="mt-4 text-[length:var(--text-h1)]">{t('title')}</h1>
          <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
            {t('text')}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/scooters" size="lg">
              {t('cta')}
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">
              {tc('backHome')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
