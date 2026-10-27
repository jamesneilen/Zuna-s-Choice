import type { AnchorHTMLAttributes } from 'react';
import type { Language, PageId } from '../types';
import { pagePath } from '../routing';
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  page: PageId;
  language: Language;
  onNavigate?: (page: PageId) => void;
}
export function PageLink({ page, language, onNavigate, children, ...props }: Props) {
  return <a {...props} href={pagePath(page, language)} onClick={event => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault(); onNavigate(page);
    }
  }}>{children}</a>;
}
