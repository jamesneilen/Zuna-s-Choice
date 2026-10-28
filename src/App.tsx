import { pagePath, resolveLocation } from './routing';
import { translations } from './i18n/translations';
import React, { useState, useEffect } from 'react';
import { Language, PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { NutritionPage } from './pages/NutritionPage';
import { StoryPage } from './pages/StoryPage';
import { ContactPage } from './pages/ContactPage';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DailyCalculatorModal } from './components/DailyCalculatorModal';

export default function App({ initialPage = 'home', initialLanguage = 'en' }: { initialPage?: PageId; initialLanguage?: Language } = {}) {
  const [currentPage, setCurrentPage] = useState<PageId>(() => typeof window === 'undefined' ? initialPage : resolveLocation(window.location).page);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return initialLanguage;
    const route = resolveLocation(window.location);
    try { return window.location.pathname === '/' && localStorage.getItem('zuna-language') === 'fr' ? 'fr' : route.language; }
    catch { return route.language; }
  });
  const focusPage = () => requestAnimationFrame(() => document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true }));
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(2);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Preserve legacy hash links while exposing real, directly loadable page URLs.
  useEffect(() => {
    let initial = true;
    const syncLocation = () => {
      const route = resolveLocation(window.location);
      let locale = route.language;
      try { if (initial && window.location.pathname === '/' && localStorage.getItem('zuna-language') === 'fr') locale = 'fr'; } catch {}
      const page = route.valid ? route.page : 'home';
      setCurrentPage(page);
      setLanguage(locale);
      setIsOrderModalOpen(route.order);
      const path = pagePath(page, locale) + (route.order ? '#order' : '');
      if (window.location.pathname + window.location.hash !== path) history.replaceState(null, '', path);
      if (!initial) { window.scrollTo({ top: 0, behavior: 'instant' }); focusPage(); }
      initial = false;
    };
    syncLocation();
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem('zuna-language', language); } catch { /* Storage may be disabled. */ }
  }, [language]);

  useEffect(() => {
    const t = translations[language];
    const descriptions = {
      home: t.hero.subtitle, product: t.productPage.subtitle,
      nutrition: t.nutritionPage.heroSubtitle, story: t.storyPage.heroSubtitle,
      contact: t.contactPage.heroSubtitle,
    };
    const title = `${t.nav[currentPage]} | Zuna's Choice`;
    document.title = title;
    const setMeta = (attribute: string, key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.content = content;
    };
    setMeta('name', 'description', descriptions[currentPage]);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', descriptions[currentPage]);
    setMeta('property', 'og:locale', language === 'fr' ? 'fr_CM' : 'en_CM');
    setMeta('property', 'og:image', new URL('/assets/share.jpg', window.location.origin).href);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', descriptions[currentPage]);
    setMeta('name', 'twitter:image', new URL('/assets/share.jpg', window.location.origin).href);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const origin = new URL(canonical.href).origin;
      canonical.href = origin + pagePath(currentPage, language);
      setMeta('property', 'og:url', canonical.href);
      document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach(link => {
        link.href = origin + pagePath(currentPage, link.hreflang === 'fr' ? 'fr' : 'en');
      });
    }
  }, [currentPage, language]);

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
    if (window.location.hash === '#order') {
      history.replaceState(null, '', pagePath(currentPage, language));
    }
  };

  const handleNavigate = (page: PageId, locale: Language = language) => {
    const path = pagePath(page, locale);
    if (window.location.pathname + window.location.hash !== path) history.pushState(null, '', path);
    setCurrentPage(page);
    setLanguage(locale);
    setIsOrderModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    focusPage();
  };

  const handleOpenOrder = (qty: number = 2) => {
    setOrderQuantity(qty);
    setIsOrderModalOpen(true);
  };

  const handleOrderFromCalculator = (qty: number) => {
    setOrderQuantity(qty);
    setIsCalculatorOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4FAFF] text-[#263238] font-body selection:bg-[#60C3F2]/30 selection:text-[#810778]">
      <a href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-white p-3 text-[#810778]">{language === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
      {/* Top Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={locale => handleNavigate(currentPage, locale)}
        onOpenOrder={() => handleOpenOrder(2)}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            language={language}
            onOpenOrder={handleOpenOrder}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
        {currentPage === 'product' && (
          <ProductPage
            language={language}
            onOpenOrder={handleOpenOrder}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
        {currentPage === 'nutrition' && (
          <NutritionPage
            language={language}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenOrder={() => handleOpenOrder(2)}
          />
        )}
        {currentPage === 'story' && (
          <StoryPage
            language={language}
            onOpenOrder={() => handleOpenOrder(2)}
            onNavigateProduct={() => handleNavigate('product')}
          />
        )}
        {currentPage === 'contact' && <ContactPage language={language} />}
      </main>

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onOpenOrder={() => handleOpenOrder(2)}
      />

      {/* Floating Quick WhatsApp Action Button */}
      <FloatingWhatsApp
        onOpenOrder={() => handleOpenOrder(2)}
        language={language}
      />

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialQuantity={orderQuantity}
        language={language}
      />

      {/* Daily Feeding & Supply Calculator Modal */}
      <DailyCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onOrderWithQuantity={handleOrderFromCalculator}
        language={language}
      />
    </div>
  );
}
