import Image from 'next/image';
import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { whatsappHref } from '@/lib/site';

export async function Hero() {
  const t = await getTranslations('home');
  const tb = await getTranslations('book');

  const trust = [t('trustDelivery'), t('trustInsurance'), t('trustNoPrepay')];

  return (
    <section className="relative isolate overflow-hidden bg-sea-950">
      <Image
        src="/images/hero/hero-bg.jpg"
        alt=""
        fill
        priority
        /* The hero image is the largest contentful paint on the homepage, so it
           is loaded eagerly and sized precisely for each breakpoint. */
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      {/* Gradient keeps text contrast above 4.5:1 whatever the photo behind it */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-sea-950/95 via-sea-950/75 to-sea-900/45"
      />

      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="text-[length:var(--text-display)] leading-[1.05] text-white">
            {t('heroTitle')}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100 md:text-xl">
            {t('heroSubtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonExternal
              href={whatsappHref(tb('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
              </svg>
              {t('heroPrimaryCta')}
            </ButtonExternal>

            <ButtonLink
              href="/scooters"
              size="lg"
              className="border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-sea-950"
            >
              {t('heroSecondaryCta')}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-sand-100">
                <Check className="size-4 shrink-0 text-gold-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
