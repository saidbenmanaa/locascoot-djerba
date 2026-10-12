import { Truck, Tag, MessageCircle } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { deliveryFee } from '@/lib/site';

export async function WhyUs() {
  const t = await getTranslations('home');
  const fee = deliveryFee(await getLocale());

  const items = [
    { icon: Truck, title: t('why1Title'), text: t('why1Text', { fee }) },
    { icon: Tag, title: t('why2Title'), text: t('why2Text', { fee }) },
    { icon: MessageCircle, title: t('why4Title'), text: t('why4Text') },
  ];

  return (
    <Section muted>
      <Container>
        <SectionHeading title={t('whyTitle')} subtitle={t('whySubtitle')} />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="surface-card p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sea-800 text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
