import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind classes, with later classes winning conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a dinar amount the way it is written locally, e.g. "45 DT". */
export function formatTnd(amount: number): string {
  return `${amount} DT`;
}

/** Turns "2026-07-24" into a date the visitor's locale reads naturally. */
export function formatDate(date: string, locale: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

/** Today in `YYYY-MM-DD`, used as the minimum for date pickers. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Whole days between two ISO dates. Returns 0 if the range is invalid. */
export function daysBetween(from: string, to: string): number {
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return diff > 0 ? diff : 0;
}
