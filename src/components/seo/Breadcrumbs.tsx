import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';

export interface Crumb {
  label: string;
  href?: StaticPathname;
  params?: Record<string, string>;
}

/**
 * Visible breadcrumbs, paired with BreadcrumbList structured data on the page.
 * Google frequently renders these under the search result in place of the raw
 * URL, which makes the listing easier to scan.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={
                    item.params
                      ? ({ pathname: item.href, params: item.params } as never)
                      : item.href
                  }
                  className="hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{ color: isLast ? 'var(--text-body)' : 'var(--text-muted)' }}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  className="size-3.5 shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
