import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  /* Navy text on gold, not white: white on this gold falls below the 4.5:1
     contrast minimum and is genuinely hard to read in bright sunlight — which
     is exactly the condition most of these visitors are in. */
  primary:
    'bg-gold-400 text-sea-950 hover:bg-gold-300 active:bg-gold-500 shadow-sm',
  secondary:
    'bg-sea-800 text-white hover:bg-sea-900 active:bg-sea-950 shadow-sm',
  outline:
    'border-2 border-sea-800 text-sea-800 hover:bg-sea-800 hover:text-white dark:border-sea-300 dark:text-sea-200 dark:hover:bg-sea-300 dark:hover:text-sea-950',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-dark active:bg-whatsapp-dark shadow-sm',
  ghost:
    'text-sea-800 hover:bg-sea-50 dark:text-sea-200 dark:hover:bg-sea-900/40',
};

/* Minimum 44px tall on every size — the accepted target for comfortable
   tapping on a phone, which is where most of this traffic is. */
const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2.5 min-h-11',
  md: 'text-base px-6 py-3 min-h-12',
  lg: 'text-base sm:text-lg px-8 py-4 min-h-14',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonAsButton) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/** Internal navigation. Always resolves to the correct localised URL. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/** External links — WhatsApp, phone, maps, social. */
export function ButtonExternal({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'a'>) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
