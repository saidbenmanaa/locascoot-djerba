'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { socialLinks, telHref, site } from '@/lib/site';
import { LanguageList, type ZoneSlugs } from './LanguageSwitcher';

export interface NavItem {
  href: StaticPathname;
  label: string;
}

export function MobileMenu({ items, zoneSlugs }: { items: NavItem[]; zoneSlugs: ZoneSlugs }) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Close when navigating or switching language, otherwise the panel stays
  // over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  // Stop the page scrolling behind the open panel.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus moves into the panel when it opens, and back to the menu button
  // when it closes, so keyboard and screen-reader users never get lost.
  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Escape closes; Tab cycles inside the panel while it is open.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Any link in the panel closes it, including phone and social links that
  // do not change the page.
  function onClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('openMenu')}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
          onKeyDown={onKeyDown}
          onClick={onClick}
          className="fixed inset-0 z-50 flex flex-col bg-sea-950 text-white"
        >
          <div className="flex items-center justify-end px-5 py-4">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('closeMenu')}
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-8">
            <nav aria-label={t('main')}>
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
            </nav>

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

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-400">
                {tc('language')}
              </p>
              <div className="mt-3">
                <LanguageList zoneSlugs={zoneSlugs} />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-sand-400">
                {tc('followUs')}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialLinks().map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold hover:bg-white/20"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
