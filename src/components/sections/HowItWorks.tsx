import { getTranslations } from 'next-intl/server';
import { Container, Section, SectionHeading } from '@/components/ui/Section';

export async function HowItWorks() {
  const t = await getTranslations('home');

  const steps = [
    { title: t('how1Title'), text: t('how1Text') },
    { title: t('how2Title'), text: t('how2Text') },
    { title: t('how3Title'), text: t('how3Text') },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading title={t('howTitle')} subtitle={t('howSubtitle')} />

        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="font-display text-5xl font-bold text-sand-300 dark:text-sea-800">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
