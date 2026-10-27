import { PageLink } from './PageLink';
import React, { useState, useEffect, useRef } from 'react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, PRODUCT_INFO } from '../data/productData';
import { Globe, Menu, X, ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenOrder: (quantity?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileMenuOpen(false); menuRef.current?.focus(); }
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [mobileMenuOpen]);
  const t = translations[language];

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'product', label: t.nav.product },
    { id: 'nutrition', label: t.nav.nutrition },
    { id: 'story', label: t.nav.story },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAF8FF] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract: Brand — 5 Nav Links — Primary Action + Lang */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 min-h-[72px] sm:min-h-20 py-2">
          {/* Zone 1: Official Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-hidden cursor-pointer"
            aria-label={language === 'fr' ? 'Accueil Zuna’s Choice' : "Zuna's Choice Home"}
          >
            <img
              src={ASSETS.logo}
              alt={language === 'fr' ? "Zuna’s Choice — Céréales infantiles Weanimix" : "Zuna's Choice Baby Cereal Weanimix"}
              className="h-10 sm:h-12 max-w-[42vw] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </button>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav aria-label={language === 'fr' ? 'Navigation principale' : 'Main navigation'} className="hidden min-[90rem]:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <PageLink
                  page={item.id}
                  language={language}
                  aria-current={isActive ? 'page' : undefined}
                  key={item.id}
                  onNavigate={handleNavClick}
                  className={`relative inline-flex items-center min-h-11 py-1 text-[15px] font-bold tracking-tight whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#810778]'
                      : 'text-[#263238]/80 hover:text-[#087C21]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#810778] rounded-full" />
                  )}
                </PageLink>
              );
            })}
          </nav>

          {/* Zone 3: Primary action + Language Switcher */}
          <div className="flex flex-wrap max-w-full items-center gap-1 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#EAF8FF] p-1 rounded-full border border-[#60C3F2]/40 text-xs font-bold">
              <button
                onClick={() => onLanguageChange('en')}
                aria-label="Switch to English"
                className={`px-2.5 py-2 rounded-full transition-all duration-150 ${
                  language === 'en'
                    ? 'bg-[#810778] text-white shadow-xs'
                    : 'text-[#263238] hover:text-[#810778]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('fr')}
                aria-label="Passer au Français"
                className={`px-2.5 py-2 rounded-full transition-all duration-150 ${
                  language === 'fr'
                    ? 'bg-[#810778] text-white shadow-xs'
                    : 'text-[#263238] hover:text-[#810778]'
                }`}
              >
                FR
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenOrder()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.nav.orderNow}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              ref={menuRef}
              data-menu-trigger
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[90rem]:hidden p-2.5 rounded-xl text-[#263238] hover:bg-[#EAF8FF] transition-colors focus-visible:outline-hidden"
              aria-label={language === 'fr' ? 'Ouvrir ou fermer le menu' : 'Toggle Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav aria-label={language === 'fr' ? 'Navigation mobile' : 'Mobile navigation'} id="mobile-navigation" className="min-[90rem]:hidden max-h-[calc(100dvh-72px)] overflow-y-auto bg-white border-b border-[#EAF8FF] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 pt-2 pb-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <PageLink
                  page={item.id}
                  language={language}
                  aria-current={isActive ? 'page' : undefined}
                  key={item.id}
                  onNavigate={handleNavClick}
                  className={`block w-full text-left px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                    isActive
                      ? 'bg-[#EAF8FF] text-[#810778]'
                      : 'text-[#263238] hover:bg-[#F4FAFF]'
                  }`}
                >
                  {item.label}
                </PageLink>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#EAF8FF] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-base rounded-full shadow-md active:scale-98 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{t.nav.orderNow} (1,500 FCFA)</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
