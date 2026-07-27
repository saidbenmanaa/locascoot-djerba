import { ChevronDown } from 'lucide-react';

/**
 * Built on the native <details> element: keyboard accessible, works before
 * hydration and ships zero JavaScript. On an FAQ page that a visitor may open
 * on a slow connection, that is worth more than an animated custom widget.
 */
export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary
            className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold marker:content-none [&::-webkit-details-marker]:hidden"
            style={{ color: 'var(--text-strong)' }}
          >
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="pb-5 pr-8 leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
