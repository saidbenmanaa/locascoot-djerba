import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('container-page', className)}>{children}</div>;
}

export function Section({
  children,
  className,
  muted = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  /** Alternating background, so long pages read as distinct blocks. */
  muted?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn('py-14 md:py-20', className)}
      style={muted ? { backgroundColor: 'var(--surface-muted)' } : undefined}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  /** Renders as h1 on pages where this is the main title. */
  as: Tag = 'h2',
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-12 max-w-2xl',
        centered && 'mx-auto text-center',
        className,
      )}
    >
      <Tag
        className={cn(
          Tag === 'h1' ? 'text-[length:var(--text-h1)]' : 'text-[length:var(--text-h2)]',
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-4 text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
