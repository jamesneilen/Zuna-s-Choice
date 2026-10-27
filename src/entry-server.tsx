import { renderToString } from 'react-dom/server';
import App from './App';
import type { Language, PageId } from './types';
export function render(page: PageId, language: Language) {
  return renderToString(<App initialPage={page} initialLanguage={language} />);
}
