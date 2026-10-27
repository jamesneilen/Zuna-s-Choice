import { SOCIAL_LINKS } from '../data/productData';
import { Language } from '../types';

const socialIconPaths: Record<string, string> = {
  TikTok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.5-2.86V9.3a6.34 6.34 0 1 0 5.95 6.37V8.68a8.24 8.24 0 0 0 4.81 1.55V6.78a4.85 4.85 0 0 1-1.04-.09Z',
  Instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  LinkedIn: 'M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.72H9.53V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.56 1.96 3.56 4.5v5.27Z',
  Facebook: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.71 4.53-4.71 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.28h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z',
};

export function SocialLinks({ language }: { language: Language }) {
  const label = language === 'fr' ? 'Suivez-nous' : 'Follow us';

  return (
    <div role="group" aria-label={label} className="space-y-3">
      <p className="text-sm font-bold text-[#810778]">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {SOCIAL_LINKS.map(({ name, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#60C3F2]/40 text-[#263238] transition-colors hover:bg-[#EAF8FF] hover:text-[#810778] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#810778]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true" focusable="false">
                <path d={socialIconPaths[name]} />
              </svg>
              <span className="sr-only">
                {name}{language === 'fr' ? ' (nouvel onglet)' : ' (opens in a new tab)'}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
