import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, BUSINESS_CONFIG, PRODUCT_INFO } from '../data/productData';
import { MessageCircle, Mail, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language, onOpenOrder }) => {
  const t = translations[language];

  return (
    <footer className="bg-white border-t border-[#EAF8FF] pt-16 pb-12 text-[#263238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#EAF8FF]">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={ASSETS.logo}
                alt="Zuna's Choice Baby Cereal"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.footer.brandDesc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EAF8FF] rounded-full border border-[#60C3F2]/30 text-xs font-bold text-[#087C21]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.footer.cameroonBadge}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-[#810778]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('product');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80"
                >
                  {t.nav.product}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('nutrition');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80"
                >
                  {t.nav.nutrition}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80"
                >
                  {t.nav.story}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-[#810778]">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm text-[#263238]/80">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#087C21] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span className="font-medium">WhatsApp: {BUSINESS_CONFIG.displayPhone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="flex items-start gap-2.5 hover:text-[#087C21] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#60C3F2] shrink-0 mt-0.5" />
                <span className="font-medium">{BUSINESS_CONFIG.email}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F19A24] shrink-0 mt-0.5" />
                <span className="font-medium">{BUSINESS_CONFIG.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#810778] shrink-0 mt-0.5" />
                <span className="font-medium text-xs">{BUSINESS_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 4: WhatsApp Ordering Callout */}
          <div className="bg-[#EAF8FF] p-6 rounded-3xl border border-[#60C3F2]/40 space-y-4">
            <div className="flex items-center gap-2 text-[#087C21] font-bold text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>Fast Order Dispatch</span>
            </div>
            <p className="text-xs text-[#263238]/90 leading-relaxed">
              Order fresh 250g packs directly via WhatsApp. Fast delivery across Douala, Yaoundé, and partner towns.
            </p>
            <button
              onClick={onOpenOrder}
              className="w-full py-2.5 px-4 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-xs rounded-full shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.nav.orderNow} (1,500 FCFA)</span>
            </button>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 space-y-4">
          <p className="text-xs text-[#263238]/60 leading-relaxed text-center max-w-4xl mx-auto">
            {t.footer.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#263238]/60 pt-4 border-t border-[#EAF8FF]">
            <p>© {new Date().getFullYear()} Zuna's Choice. {t.footer.rights}</p>
            <p className="flex items-center gap-1 mt-2 sm:mt-0 font-medium text-[#810778]">
              <span>Made with love for Cameroonian families</span>
              <Heart className="w-3.5 h-3.5 text-[#810778] fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
