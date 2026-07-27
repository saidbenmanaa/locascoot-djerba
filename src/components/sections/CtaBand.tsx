import { Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { site, telHref, whatsappHref } from '@/lib/site';

export async function CtaBand({
  title,
  text,
  whatsappMessage,
}: {
  title?: string;
  text?: string;
  whatsappMessage?: string;
}) {
  const t = await getTranslations('home');
  const tc = await getTranslations('common');
  const tb = await getTranslations('book');

  return (
    <section className="bg-sea-900 py-14 text-white md:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-[length:var(--text-h2)] text-white">
              {title ?? t('ctaTitle')}
            </h2>
            <p className="mt-3 text-sand-100">{text ?? t('ctaText')}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonExternal
              href={whatsappHref(whatsappMessage ?? tb('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              {tc('whatsappUs')}
            </ButtonExternal>

            <ButtonExternal
              href={telHref}
              size="lg"
              className="border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-sea-950"
            >
              <Phone className="size-5" aria-hidden />
              {site.contact.phoneDisplay}
            </ButtonExternal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Compact variant used at the end of secondary pages. */
export async function BookCta() {
  const tc = await getTranslations('common');
  return <ButtonLink href="/book">{tc('bookNow')}</ButtonLink>;
}
