import type { Vehicle } from '@/types/content';
import { VehicleCard } from './VehicleCard';

export function VehicleGrid({
  vehicles,
  /** Number of cards to load eagerly, for the ones above the fold. */
  priorityCount = 1,
}: {
  vehicles: Vehicle[];
  priorityCount?: number;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={vehicle.slug}
          vehicle={vehicle}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
