import { SOCIAL_LINKS } from '../data/productData';
import { Language } from '../types';
import { ArrowUpRight } from 'lucide-react';

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
              className="inline-flex items-center gap-1 rounded-full border border-[#60C3F2]/40 px-3 py-2 text-xs font-semibold text-[#263238] transition-colors hover:bg-[#EAF8FF] hover:text-[#810778] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#810778]"
            >
              {name}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">
                {language === 'fr' ? ' (nouvel onglet)' : ' (opens in a new tab)'}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
