'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname as useRawPathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { getPathname, usePathname } from '@/i18n/navigation';
import {
  legalLocales,
  legalPathnames,
  localeNames,
  locales,
  pathnames,
  type AppPathname,
  type Locale,
} from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** Zone identifier → its URL slug in each language, built on the server from
 *  `content/zones.ts` so a zone page switches to the same zone, not the home. */
export type ZoneSlugs = Record<string, Record<Locale, string>>;

/**
 * The address of the page being viewed, in another language. A visitor reading
 * about the Cappuccino S in French lands on the English Cappuccino S page, not
 * the homepage — sending people back to the homepage is the usual bug here,
 * and it loses them. Pages that do not exist in the target language (the 404,
 * the untranslated legal pages) fall back to its home.
 *
 * Returns the final URL (French unprefixed), used on a plain link: switching
 * language is a full page load, and no link ever goes through a redirect.
 */
function useAlternateHref(zoneSlugs: ZoneSlugs) {
  const current = useLocale() as Locale;
  const match = matchRoute(useRawPathname() ?? '/');

  function route(target: Locale) {
    if (!match) return '/';
    const { pathname, params } = match;

    // The legal pages exist only in some languages for now.
    const isLegal = (legalPathnames as readonly string[]).includes(pathname);
    if (isLegal && !legalLocales.includes(target)) return '/';

    if (pathname === '/zones/[zone]') {
      const slugs = Object.values(zoneSlugs).find((entry) => entry[current] === params.zone);
      return slugs ? { pathname, params: { zone: slugs[target] } } : '/';
    }

    if (pathname === '/scooters/[slug]') return { pathname, params };

    return pathname;
  }

  return (target: Locale) => getPathname({ href: route(target) as never, locale: target });
}

/**
 * Finds which page a path belongs to, and its parameters. While pages are
 * generated the framework reports the internal path ("/de/prices"), in the
 * browser the public one ("/de/preise"); both resolve to the same page here,
 * so the links rendered on the server and in the browser are identical.
 */
function matchRoute(rawPath: string): { pathname: AppPathname; params: Record<string, string> } | null {
  const path = rawPath.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '') || '/';
  const segments = path.split('/').filter(Boolean);

  for (const [key, localized] of Object.entries(pathnames)) {
    const templates = [key, ...(typeof localized === 'string' ? [localized] : Object.values(localized))];
    for (const template of templates) {
      const parts = template.split('/').filter(Boolean);
      if (parts.length !== segments.length) continue;
      const params: Record<string, string> = {};
      const matches = parts.every((part, index) => {
        const dynamic = part.match(/^\[(\w+)\]$/);
        if (dynamic) params[dynamic[1]] = decodeURIComponent(segments[index]);
        return dynamic !== null || part === segments[index];
      });
      if (matches) return { pathname: key as AppPathname, params };
    }
  }
  return null;
}

/** Compact menu for the header bar: the current language, opening the list. */
export function LanguageMenu({
  zoneSlugs,
  className,
}: {
  zoneSlugs: ZoneSlugs;
  className?: string;
}) {
  const t = useTranslations('common');
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const hrefFor = useAlternateHref(zoneSlugs);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Close after switching, otherwise the list stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname, current]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Globe className="size-4" aria-hidden />
        <span aria-hidden className="uppercase">
          {current}
        </span>
        <span className="sr-only">{t('languageCurrent', { name: localeNames[current] })}</span>
        <ChevronDown
          className={cn('size-4 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {/* Always in the HTML, so the links to every language version can be
          followed by search engines; only shown when opened. */}
      <ul
        id={listId}
        hidden={!open}
        className="surface-card absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden py-1 shadow-[var(--shadow-lift)]"
      >
        {locales.map((code) => {
          const isActive = code === current;
          return (
            <li key={code}>
              <a
                href={hrefFor(code)}
                hrefLang={code}
                lang={code}
                aria-current={isActive ? 'true' : undefined}
                className="flex min-h-11 items-center justify-between gap-3 px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
                style={{ color: 'var(--text-strong)' }}
              >
                {localeNames[code]}
                {isActive ? (
                  <Check className="size-4 text-gold-600 dark:text-gold-400" aria-hidden />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Every language spelled out, for the mobile menu. */
export function LanguageList({ zoneSlugs }: { zoneSlugs: ZoneSlugs }) {
  const current = useLocale() as Locale;
  const hrefFor = useAlternateHref(zoneSlugs);

  return (
    <ul className="flex flex-wrap gap-2">
      {locales.map((code) => {
        const isActive = code === current;
        return (
          <li key={code}>
            <a
              href={hrefFor(code)}
              hrefLang={code}
              lang={code}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors',
                isActive ? 'bg-white text-sea-950' : 'bg-white/10 text-white hover:bg-white/20',
              )}
            >
              {localeNames[code]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
