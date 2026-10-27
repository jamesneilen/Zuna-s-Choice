import { useEffect, useRef } from 'react';

// Keep keyboard navigation inside an open dialog and return focus to its trigger.
export function useDialog(isOpen: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const controls = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]'
    )).filter(el => el.getClientRects().length > 0);
    (controls()[0] || dialog).focus();
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = controls();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (!dialog.contains(document.activeElement) ||
          (event.shiftKey && document.activeElement === first) ||
          (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = previousOverflow;
      const fallback = Array.from(document.querySelectorAll<HTMLElement>('[data-menu-trigger], main h1')).find(el => el.getClientRects().length > 0);
      const target = previousFocus?.isConnected && previousFocus !== document.body ? previousFocus : fallback;
      target?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  return ref;
}
