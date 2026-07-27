import Image from 'next/image';
import { Users, Gauge, IdCard } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Vehicle } from '@/types/content';
import { getStartingPrice, t as translate, categoryKey } from '@/lib/vehicle-utils';
import { toEur } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

/**
 * The card does the selling: photo, one-line pitch, the three specs people
 * actually compare, and a "from" price. Everything else lives on the detail
 * page.
 */
export async function VehicleCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  /** Set on the first card above the fold so the image loads eagerly. */
  priority?: boolean;
}) {
  const t = await getTranslations('common');
  const tCat = await getTranslations('categories');
  const tSpecs = await getTranslations('specs');
  const locale = (await getLocale()) as Locale;

  const price = getStartingPrice(vehicle);

  return (
    <article className="group surface-card overflow-hidden transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={{ pathname: '/scooters/[slug]', params: { slug: vehicle.slug } }}
        className="block"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-sand-100 dark:bg-sea-900">
          <Image
            src={`/images/vehicles/${vehicle.images[0]}`}
            alt={`${vehicle.name} — ${translate(vehicle.tagline, locale)}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-sea-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {tCat(categoryKey(vehicle.category))}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <h3 className="text-[length:var(--text-h3)] leading-tight">
          <Link
            href={{ pathname: '/scooters/[slug]', params: { slug: vehicle.slug } }}
            className="hover:underline"
          >
            {vehicle.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
          {translate(vehicle.tagline, locale)}
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <li className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" aria-hidden />
            {tSpecs('cc', { value: vehicle.engineCc })}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden />
            {tSpecs('seatsValue', { count: vehicle.seats })}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <IdCard className="size-3.5" aria-hidden />
            {translate(vehicle.licence, locale)}
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between gap-3 border-t pt-4">
          <div>
            <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('from')}
            </span>
            <span className="font-display text-2xl font-bold text-gold-700 dark:text-gold-300">
              {price} DT
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {' '}
              {t('perDay')}
            </span>
            <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('approxEur', { price: toEur(price) })}
            </span>
          </div>

          <Link
            href={{ pathname: '/scooters/[slug]', params: { slug: vehicle.slug } }}
            className="shrink-0 rounded-full border-2 border-sea-800 px-4 py-2 text-sm font-semibold text-sea-800 transition-colors hover:bg-sea-800 hover:text-white dark:border-sea-300 dark:text-sea-200 dark:hover:bg-sea-300 dark:hover:text-sea-950"
          >
            {t('viewDetails')}
          </Link>
        </div>
      </div>
    </article>
  );
}
