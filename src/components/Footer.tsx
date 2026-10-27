import { PageLink } from './PageLink';
import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, BUSINESS_CONFIG, PRODUCT_INFO } from '../data/productData';
import { MessageCircle, Mail, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

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
                alt={language === 'fr' ? "Zuna’s Choice — Céréales infantiles" : "Zuna's Choice Baby Cereal"}
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
            <SocialLinks language={language} />
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-base text-[#810778]">
              {t.footer.quickLinks}
            </h2>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <PageLink page="home" language={language} onNavigate={onNavigate} className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80 inline-flex items-center min-h-11">{t.nav.home}</PageLink>
              </li>
              <li>
                <PageLink page="product" language={language} onNavigate={onNavigate} className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80 inline-flex items-center min-h-11">{t.nav.product}</PageLink>
              </li>
              <li>
                <PageLink page="nutrition" language={language} onNavigate={onNavigate} className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80 inline-flex items-center min-h-11">{t.nav.nutrition}</PageLink>
              </li>
              <li>
                <PageLink page="story" language={language} onNavigate={onNavigate} className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80 inline-flex items-center min-h-11">{t.nav.story}</PageLink>
              </li>
              <li>
                <PageLink page="contact" language={language} onNavigate={onNavigate} className="hover:text-[#087C21] transition-colors cursor-pointer text-[#263238]/80 inline-flex items-center min-h-11">{t.nav.contact}</PageLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-base text-[#810778]">
              {t.footer.contactInfo}
            </h2>
            <div className="space-y-3 text-sm text-[#263238]/80">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2.5 hover:text-[#087C21] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span className="font-medium">WhatsApp: {BUSINESS_CONFIG.displayPhone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="flex min-h-11 items-center gap-2.5 hover:text-[#087C21] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#60C3F2] shrink-0 mt-0.5" />
                <span className="font-medium">{BUSINESS_CONFIG.email}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#954900] shrink-0 mt-0.5" />
                <span className="font-medium">{BUSINESS_CONFIG.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#810778] shrink-0 mt-0.5" />
                <span className="font-medium text-xs">{language === 'fr' ? 'Lun – Sam : 8 h – 18 h (WAT)' : BUSINESS_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          {/* Column 4: WhatsApp Ordering Callout */}
          <div className="bg-[#EAF8FF] p-6 rounded-3xl border border-[#60C3F2]/40 space-y-4">
            <div className="flex items-center gap-2 text-[#087C21] font-bold text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'fr' ? "Commandes sur WhatsApp" : "WhatsApp Orders"}</span>
            </div>
            <p className="text-xs text-[#263238]/90 leading-relaxed">
              {language === 'fr' ? "Commandez vos paquets de 250g sur WhatsApp. Notre équipe confirmera les options et les frais de livraison." : "Order 250g packs via WhatsApp. Our team will confirm delivery options and charges."}
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
          <p className="text-xs text-[#263238]/80 leading-relaxed text-center max-w-4xl mx-auto">
            {t.footer.disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#263238]/80 pt-4 border-t border-[#EAF8FF]">
            <p>© {new Date().getFullYear()} Zuna's Choice. {t.footer.rights}</p>
            <p className="flex items-center gap-1 mt-2 sm:mt-0 font-medium text-[#810778]">
              <span>{language === 'fr' ? "Créé avec amour pour les familles camerounaises" : "Made with love for Cameroonian families"}</span>
              <Heart className="w-3.5 h-3.5 text-[#810778] fill-current" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
