'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Main photo plus thumbnails. The first image is server-rendered with
 * `priority`, since on a vehicle page it is almost always the largest
 * contentful paint — the single metric that most affects the page's speed
 * score and how quickly the visitor sees what they came for.
 */
export function VehicleGallery({
  images,
  name,
  alts,
}: {
  images: string[];
  name: string;
  /** Localised alt text, one per image. Resolved on the server. */
  alts: string[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-sand-100 dark:bg-sea-900">
        {images.map((file, index) => (
          <Image
            key={file}
            src={`/images/vehicles/${file}`}
            alt={alts[index] ?? name}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={cn(
              'object-cover transition-opacity duration-300',
              index === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-3">
          {images.map((file, index) => (
            <button
              key={file}
              type="button"
              onClick={() => setActive(index)}
              aria-label={alts[index] ?? name}
              aria-current={index === active}
              className={cn(
                'relative aspect-4/3 w-24 overflow-hidden rounded-lg border-2 transition-colors',
                index === active
                  ? 'border-gold-500'
                  : 'border-transparent hover:border-sand-300',
              )}
            >
              <Image
                src={`/images/vehicles/${file}`}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      <span className="sr-only">{name}</span>
    </div>
  );
}
