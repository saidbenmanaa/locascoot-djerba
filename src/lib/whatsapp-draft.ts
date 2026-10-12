/**
 * The WhatsApp link the floating button should use while the booking form is
 * on screen. Without it, a visitor who fills in the form and then taps the
 * floating button would open a generic message and lose everything typed.
 *
 * A tiny module-level store read with `useSyncExternalStore`: the booking form
 * writes the link, the floating button reads it, and it resets when the form
 * unmounts. Client components only.
 */

type Listener = () => void;

let draftHref: string | null = null;
const listeners = new Set<Listener>();

export function setWhatsappDraft(href: string | null): void {
  if (href === draftHref) return;
  draftHref = href;
  listeners.forEach((listener) => listener());
}

export function subscribeWhatsappDraft(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getWhatsappDraft(): string | null {
  return draftHref;
}
