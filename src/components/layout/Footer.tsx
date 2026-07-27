import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getZones } from '@/lib/content';
import { formattedAddress, mailtoHref, site, telHref } from '@/lib/site';
import { Container } from '@/components/ui/Section';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
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

  const legalLinks = [
    { href: '/terms', label: t('terms') },
    { href: '/privacy', label: t('privacy') },
    { href: '/legal-notice', label: t('legalNotice') },
  ] as const;

  const socials = [
    { href: site.social.facebook, label: 'Facebook' },
    { href: site.social.instagram, label: 'Instagram' },
    { href: site.social.tripadvisor, label: 'Tripadvisor' },
  ].filter((s) => s.href.length > 0);

  return (
    <footer className="mt-auto bg-sea-950 text-sand-200">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-white">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
              {t('tagline')}
            </p>

            {socials.length > 0 ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sand-400">
                  {t('followUs')}
                </p>
                <div className="mt-2 flex gap-3">
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

          <nav aria-label={t('navTitle')}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('navTitle')}
            </h2>
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('zonesTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {zones.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={{ pathname: '/zones/[zone]', params: { zone: zone.slug } }}
                    className="text-sm text-sand-300 underline-offset-4 hover:text-white hover:underline"
                  >
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('contactTitle')}
            </h2>
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
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
