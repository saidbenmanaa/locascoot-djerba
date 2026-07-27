'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Switches language while staying on the same page — a visitor reading about
 * the Honda PCX in French lands on the English PCX page, not the homepage.
 * Sending people back to the homepage is the usual bug here, and it loses them.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // `params` carries any dynamic segments (slug, zone) so the equivalent
        // page is resolved in the target language.
        { pathname, params } as never,
        { locale: next as (typeof locales)[number] },
      );
    });
  }

  return (
    <div
      className={cn('flex items-center gap-1', isPending && 'opacity-60', className)}
      role="group"
      aria-label={t('language')}
    >
      {locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'min-h-9 rounded-full px-2.5 text-xs font-semibold uppercase transition-colors',
              isActive
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white',
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
