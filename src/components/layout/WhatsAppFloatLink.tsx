'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import {
  getWhatsappDraft,
  subscribeWhatsappDraft,
} from '@/lib/whatsapp-draft';

/**
 * The floating button's link. Everywhere it opens the pre-written greeting;
 * on the booking page it carries whatever the visitor has already typed in
 * the form, so nothing is ever lost by tapping it instead of the form button.
 */
export function WhatsAppFloatLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const draft = useSyncExternalStore(
    subscribeWhatsappDraft,
    getWhatsappDraft,
    () => null,
  );

  return (
    <a
      href={draft ?? href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}
