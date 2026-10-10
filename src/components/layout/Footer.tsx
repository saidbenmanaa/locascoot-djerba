import { Mail, MapPin, Phone } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getZones } from '@/lib/content';
import { deliveryFee, formattedAddress, mailtoHref, site, socialLinks, telHref } from '@/lib/site';
import { t as translate, zoneSlug } from '@/lib/vehicle-utils';
import { Container } from '@/components/ui/Section';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;
  const zones = await getZones();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/scooters', label: tNav('scooters') },
    { href: '/prices', label: tNav('prices') },
    { href: '/rental-conditions', label: tNav('conditions') },
    { href: '/about', label: tNav('about') },
    { href: '/contact', label: tNav('contact') },
    { href: '/book', label: tNav('book') },
  ] as const;

  /* The legal pages (terms, privacy, legal notice) are not linked until their
     final text — publisher, registration and host details — is supplied. They
     stay reachable by URL and are kept out of search results. */

  const socials = socialLinks();

  return (
    <footer className="mt-auto bg-sea-950 text-sand-200">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
              {t('tagline', { fee: deliveryFee(locale) })}
            </p>

            {socials.length > 0 ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-400">
                  {tc('followUs')}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sand-300 underline-offset-4 hover:text-white hover:underline"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Column titles are styled labels, not headings, so every page's
              heading outline holds only its own content. */}
          <nav aria-label={t('navTitle')}>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('navTitle')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('zonesTitle')}>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('zonesTitle')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={{ pathname: '/zones/[zone]', params: { zone: zoneSlug(zone, locale) } }}
                    className="text-sm text-sand-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {translate(zone.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('contactTitle')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-sand-300">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sand-400" aria-hidden />
                <span>{formattedAddress()}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-sand-400" aria-hidden />
                <a href={telHref} className="hover:text-white hover:underline">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-sand-400" aria-hidden />
                <a href={mailtoHref} className="break-all hover:text-white hover:underline">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-sand-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t('rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
