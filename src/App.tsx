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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('zuna-language') === 'fr' ? 'fr' : 'en'; }
    catch { return 'en'; }
  });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(2);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash === '' || rawHash === 'home' || rawHash === 'product' || rawHash === 'nutrition' || rawHash === 'story' || rawHash === 'contact') {
        setCurrentPage(rawHash || 'home');
        setIsOrderModalOpen(false);
      } else if (rawHash === 'order') {
        setIsOrderModalOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
  }, [currentPage, language]);

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
    if (window.location.hash === '#order') {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}${currentPage === 'home' ? '' : `#${currentPage}`}`);
    }
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Top Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        onOpenOrder={() => handleOpenOrder(2)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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
