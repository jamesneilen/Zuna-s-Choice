import type { Language, PageId } from './types';
export const pages: PageId[] = ['home', 'product', 'nutrition', 'story', 'contact'];
export function pagePath(page: PageId, language: Language = 'en') {
  return `${language === 'fr' ? '/fr' : ''}/${page === 'home' ? '' : `${page}/`}`;
}
export function resolveLocation(location: Pick<Location, 'pathname' | 'hash'>) {
  const parts = location.pathname.split('/').filter(Boolean);
  const language: Language = parts[0] === 'fr' ? 'fr' : 'en';
  const pathPage = parts[language === 'fr' ? 1 : 0] || 'home';
  const legacy = location.hash.slice(1);
  const page = pages.includes(legacy as PageId) ? legacy as PageId : pages.includes(pathPage as PageId) ? pathPage as PageId : 'home';
  const validPath = parts.length <= (language === 'fr' ? 2 : 1) && (pages.includes(pathPage as PageId));
  return { page, language, valid: validPath && (!legacy || legacy === 'order' || pages.includes(legacy as PageId)), order: legacy === 'order' };
}
