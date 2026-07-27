'use client';

import { useState, type ReactNode } from 'react';
import type { VehicleCategory } from '@/types/content';
import { cn } from '@/lib/utils';

export interface FilterableVehicle {
  slug: string;
  category: VehicleCategory;
  card: ReactNode;
}

/**
 * Client-side filtering over server-rendered cards.
 *
 * Every card is present in the initial HTML and merely hidden when filtered
 * out, so search engines still see the whole fleet on one page and the list
 * works before JavaScript loads. Filtering by URL instead would make the page
 * dynamic and cost the static rendering that keeps it fast.
 */
export function CategoryFilter({
  vehicles,
  categories,
  labels,
  allLabel,
  legend,
  emptyLabel,
}: {
  vehicles: FilterableVehicle[];
  categories: VehicleCategory[];
  labels: Record<string, string>;
  allLabel: string;
  legend: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<VehicleCategory | 'all'>('all');

  /* With a small fleet the filter is noise rather than help — every scooter
     already fits on one screen. It appears on its own once the fleet grows. */
  const showFilter = vehicles.length >= 3 && categories.length >= 2;

  const options: (VehicleCategory | 'all')[] = ['all', ...categories];
  const visibleCount =
    active === 'all'
      ? vehicles.length
      : vehicles.filter((v) => v.category === active).length;

  return (
    <div>
      <fieldset className="mb-8" hidden={!showFilter}>
        <legend className="sr-only">{legend}</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isActive = option === active;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setActive(option)}
                aria-pressed={isActive}
                className={cn(
                  'min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-sea-800 bg-sea-800 text-white dark:border-sea-300 dark:bg-sea-300 dark:text-sea-950'
                    : 'border-[var(--border-subtle)] hover:border-sea-800 hover:text-sea-800 dark:hover:border-sea-300 dark:hover:text-sea-200',
                )}
                style={!isActive ? { color: 'var(--text-body)' } : undefined}
              >
                {option === 'all' ? allLabel : labels[option]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.slug}
            hidden={active !== 'all' && vehicle.category !== active}
          >
            {vehicle.card}
          </div>
        ))}
      </div>

      {visibleCount === 0 ? (
        <p className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>
          {emptyLabel}
        </p>
      ) : null}
    </div>
  );
}
