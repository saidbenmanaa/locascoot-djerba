import { Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { site, telHref } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu, type NavItem } from './MobileMenu';

export async function Header() {
  const t = await getTranslations('nav');
  const tc = await getTranslations('common');

  const items: NavItem[] = [
    { href: '/scooters', label: t('scooters') },
    { href: '/prices', label: t('prices') },
    { href: '/rental-conditions', label: t('conditions') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-sea-950 text-white shadow-sm">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link
            href="/"
            className="text-white transition-opacity hover:opacity-90"
            aria-label={site.name}
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />

            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>

            <ButtonLink href="/book" size="sm" className="hidden sm:inline-flex">
              {tc('bookNow')}
            </ButtonLink>

            <MobileMenu items={items} />
          </div>
        </div>
      </div>
    </header>
  );
}
