import { getLocale, getTranslations } from 'next-intl/server';
import type { Vehicle } from '@/types/content';
import { t as translate } from '@/lib/vehicle-utils';
import type { Locale } from '@/i18n/routing';

export async function SpecsList({ vehicle }: { vehicle: Vehicle }) {
  const t = await getTranslations('specs');
  const locale = (await getLocale()) as Locale;

  /* Optional figures are only listed when they are actually known. A spec
     table with invented numbers is worse than a shorter honest one. */
  const rows: { label: string; value: string }[] = [
    { label: t('engine'), value: t('cc', { value: vehicle.engineCc }) },
    {
      label: t('transmission'),
      value: vehicle.transmission === 'automatic' ? t('automatic') : t('manual'),
    },
    { label: t('seats'), value: t('seatsValue', { count: vehicle.seats }) },
  ];

  if (vehicle.tankLitres !== undefined) {
    rows.push({ label: t('tank'), value: t('litres', { value: vehicle.tankLitres }) });
  }

  if (vehicle.consumptionPer100km !== undefined) {
    rows.push({
      label: t('consumption'),
      value: t('per100', { value: vehicle.consumptionPer100km }),
    });
  }

  rows.push(
    { label: t('licence'), value: translate(vehicle.licence, locale) },
    { label: t('minAge'), value: t('yearsOld', { count: vehicle.minAge }) },
  );

  return (
    <dl className="grid gap-x-8 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b py-3"
        >
          <dt className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {row.label}
          </dt>
          <dd className="text-right font-semibold" style={{ color: 'var(--text-strong)' }}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
