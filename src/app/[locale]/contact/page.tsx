import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata, urlFor } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import {
  formattedAddress,
  mailtoHref,
  mapEmbedSrc,
  mapsHref,
  openingHoursRange,
  site,
  telHref,
  whatsappHref,
} from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { Container, Section } from '@/components/ui/Section';
import { ButtonExternal } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ContactForm } from '@/components/forms/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });

  return buildMetadata({
    locale: locale as Locale,
    pathname: '/contact',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tc = await getTranslations('common');
  const tb = await getTranslations('book');
  const tNav = await getTranslations('nav');


  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ label: tNav('home'), href: '/' }, { label: t('title') }]}
        />
      </Container>

      <Section className="pt-2">
        <Container>
          <header className="mb-10 max-w-2xl">
            <h1 className="text-[length:var(--text-h1)]">{t('title')}</h1>
            <p className="mt-4 text-lg" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle')}
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <ButtonExternal
                href={whatsappHref(tb('whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto"
              >
                {tc('whatsappUs')}
              </ButtonExternal>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                    <MapPin className="size-4 text-gold-600 dark:text-gold-400" aria-hidden />
                    {t('addressTitle')}
                  </dt>
                  <dd className="mt-1.5 text-sm" style={{ color: 'var(--text-body)' }}>
                    {formattedAddress()}
                    <a
                      href={mapsHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 font-medium text-sea-700 hover:underline dark:text-sea-300"
                    >
                      {t('openMaps')}
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                    <Phone className="size-4 text-gold-600 dark:text-gold-400" aria-hidden />
                    {t('phoneTitle')}
                  </dt>
                  <dd className="mt-1.5 text-sm">
                    <a href={telHref} className="hover:underline" style={{ color: 'var(--text-body)' }}>
                      {site.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                    <Mail className="size-4 text-gold-600 dark:text-gold-400" aria-hidden />
                    {t('emailTitle')}
                  </dt>
                  <dd className="mt-1.5 text-sm">
                    <a href={mailtoHref} className="break-all hover:underline" style={{ color: 'var(--text-body)' }}>
                      {site.contact.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                    <Clock className="size-4 text-gold-600 dark:text-gold-400" aria-hidden />
                    {t('hoursTitle')}
                  </dt>
                  <dd className="mt-1.5 text-sm" style={{ color: 'var(--text-body)' }}>
                    <span className="block">{t('everyDay')}</span>
                    <span className="block tabular-nums font-semibold">
                      {openingHoursRange()}
                    </span>
                  </dd>
                </div>
              </dl>

              {/* Lazy-loaded so the map never delays the first paint */}
              <div className="mt-8 overflow-hidden rounded-2xl border">
                <iframe
                  src={mapEmbedSrc()}
                  title={t('mapTitle')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0"
                />
              </div>
            </div>

            <div>
              <h2 className="text-[length:var(--text-h3)]">{t('formTitle')}</h2>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: tNav('home'), url: urlFor('/', locale as Locale) },
          { name: t('title'), url: urlFor('/contact', locale as Locale) },
        ])}
      />
    </>
  );
}
