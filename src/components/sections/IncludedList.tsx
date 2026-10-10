import { Check, Truck } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { deliveryFee } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * What the daily price covers, and — under its own heading — what it does not.
 * Delivery is never part of the daily price, so it is always listed apart,
 * with the fee from `content/site.ts`.
 */
export async function IncludedList({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('prices');
  const tc = await getTranslations('common');
  const fee = deliveryFee(await getLocale());

  const included = [t('included1'), t('included2'), t('included3')];
  const textClass = cn(compact && 'text-sm');

  return (
    <>
      <h2 className="text-[length:var(--text-h3)]">{t('includedTitle')}</h2>
      <ul className="mt-4 grid gap-2.5">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-5 shrink-0 text-whatsapp" aria-hidden />
            <span className={textClass} style={{ color: 'var(--text-body)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-[length:var(--text-h3)]">{t('notIncludedTitle')}</h2>
      <ul className="mt-4 grid gap-2.5">
        <li className="flex items-start gap-2.5">
          <Truck
            className="mt-0.5 size-5 shrink-0 text-gold-600 dark:text-gold-400"
            aria-hidden
          />
          <span className={textClass} style={{ color: 'var(--text-body)' }}>
            {tc('deliveryLine', { fee })}
          </span>
        </li>
      </ul>
    </>
  );
}
