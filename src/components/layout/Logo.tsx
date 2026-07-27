import Image from 'next/image';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The logo.
 *
 * When `logo` is set in `content/site.ts`, the file is rendered on a small
 * white panel. The Locascoot logo is dark navy text on white, and the header is
 * navy — the panel is what lets the artwork be dropped in completely unedited
 * and still read cleanly. If you later have a transparent, light-text version,
 * delete the `panel` classes below and it will sit directly on the navy.
 *
 * With `logo` empty it falls back to a built-in wordmark in the brand colours:
 * no network request, sharp at any size, works on light and dark.
 */
export function Logo({ className }: { className?: string }) {
  const custom = site.logo as string;

  if (custom) {
    return (
      <span
        className={cn(
          // panel
          'inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm',
          className,
        )}
      >
        <Image
          src={custom}
          alt={site.name}
          width={600}
          height={200}
          priority
          className="h-8 w-auto md:h-9"
        />
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 40 40" aria-hidden className="size-9 shrink-0" fill="none">
        <circle cx="20" cy="20" r="20" className="fill-gold-400" />
        <path
          d="M11.5 27.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm17 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          className="stroke-sea-950"
          strokeWidth="2"
        />
        <path
          d="M15 24h7l3.5-8M21 16h4.5M25.5 16l3 8"
          className="stroke-sea-950"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-display text-lg font-bold leading-none tracking-tight">
        {/* Echoes the logo lockup, where SCOOT is picked out in gold */}
        LOCA<span className="text-gold-400">SCOOT</span>
        <span className="block text-[0.7rem] font-medium uppercase tracking-[0.18em] opacity-70">
          Djerba
        </span>
      </span>
    </span>
  );
}
