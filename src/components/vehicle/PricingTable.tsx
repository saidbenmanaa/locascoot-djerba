import { getTranslations } from 'next-intl/server';
import type { Vehicle } from '@/types/content';
import { tierLabel } from '@/lib/vehicle-utils';
import { toEur } from '@/lib/site';

/**
 * Degressive pricing shown as a table rather than prose: it makes the saving
 * on a longer rental immediately obvious, which is what nudges a three-day
 * booking into a week.
 */
export async function PricingTable({ vehicle }: { vehicle: Vehicle }) {
  const t = await getTranslations('vehicle');
  const tc = await getTranslations('common');

  const isFlatRate = vehicle.pricing.length === 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-80 border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th scope="col" className="py-3 pr-4 text-sm font-semibold">
                {isFlatRate ? t('durationAny') : t('duration')}
              </th>
              <th scope="col" className="py-3 text-right text-sm font-semibold">
                {t('pricePerDayLabel')}
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicle.pricing.map((tier) => {
              return (
                <tr key={`${tier.minDays}-${tier.maxDays}`} className="border-b">
                  <th
                    scope="row"
                    className="py-3.5 pr-4 font-medium"
                    style={{ color: 'var(--text-body)' }}
                  >
                    {tierLabel(tier, tc('day'), tc('days'))}
                  </th>
                  <td className="py-3.5 text-right">
                    <span className="font-display text-lg font-bold text-gold-700 dark:text-gold-300">
                      {tier.pricePerDay} DT
                    </span>
                    <span className="ml-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {tc('approxEur', { price: toEur(tier.pricePerDay) })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {vehicle.deposit ? (
        <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('depositNote', { amount: vehicle.deposit })}
        </p>
      ) : null}
    </div>
  );
}
