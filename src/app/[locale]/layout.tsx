import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import '@/styles/globals.css';

/* Self-hosted at build time by next/font — no request to Google at runtime,
   no layout shift, and nothing for a cookie banner to worry about. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#16294a',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(site.url),
    title: {
      // Sub-pages get "Page name | Locascoot Djerba" automatically.
      default: t('title'),
      template: `%s | ${site.name}`,
    },
    description: t('description'),
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    formatDetection: { telephone: true, address: true, email: true },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/apple-touch-icon.png' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      siteName: site.name,
      images: [{ url: absoluteUrl('/images/og/default.jpg'), width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for the page to be statically rendered rather than generated
  // per request — this is what keeps the site fast and cheap to host.
  setRequestLocale(locale);

  const t = await getTranslations('nav');

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only-focusable absolute left-4 top-4 z-50 rounded-full bg-white px-4 py-2 font-semibold text-sea-950 shadow-lg"
          >
            {t('skipToContent')}
          </a>

          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />
          <WhatsAppFloat />

          {/* Site-wide structured data: tells Google what and where this
              business is. Page-specific schema is added by each page. */}
          <JsonLd
            schema={[
              localBusinessSchema(locale as Locale),
              websiteSchema(locale as Locale),
            ]}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
