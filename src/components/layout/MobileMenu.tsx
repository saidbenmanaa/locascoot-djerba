'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { telHref, site } from '@/lib/site';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface NavItem {
  href: StaticPathname;
  label: string;
}

export function MobileMenu({ items }: { items: NavItem[] }) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when navigating, otherwise the panel stays over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Stop the page scrolling behind the open panel.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('openMenu')}
        aria-expanded={open}
        className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-sea-950 text-white">
          <div className="flex items-center justify-between px-5 py-4">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('closeMenu')}
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 pb-8">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-4 font-display text-xl font-semibold hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={telHref}
              className="mt-6 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4 font-semibold"
            >
              <Phone className="size-5" aria-hidden />
              <span>
                <span className="block text-xs font-normal opacity-70">
                  {tc('callUs')}
                </span>
                {site.contact.phoneDisplay}
              </span>
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
