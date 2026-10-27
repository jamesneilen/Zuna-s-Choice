import { ResponsiveImage } from '../components/ResponsiveImage';
import { useDialog } from '../hooks/useDialog';
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, PRODUCT_INFO, NUTRITION_TABLE, FAQS_DATA } from '../data/productData';
import {
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Clock,
  Heart,
  ChevronRight,
  MessageCircle,
  Plus,
  Minus,
  ZoomIn,
  AlertCircle,
  HelpCircle,
  X,
} from 'lucide-react';

interface ProductPageProps {
  language: Language;
  onOpenOrder: (quantity?: number) => void;
  onOpenCalculator: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  language,
  onOpenOrder,
  onOpenCalculator,
}) => {
  const t = translations[language].productPage;
  const commonT = translations[language];

  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState<string>(ASSETS.productBox);
  const [showLightbox, setShowLightbox] = useState(false);

  const dialogRef = useDialog(showLightbox);

  const galleryImages = [
    { src: ASSETS.productBox, label: language === 'fr' ? 'Illustration' : 'Illustration' },
    { src: ASSETS.cerealBowl, label: language === 'fr' ? 'Bol de Céréale' : 'Cereal Bowl' },
    { src: ASSETS.threeGrains, label: language === 'fr' ? '3 Céréales' : 'Three Grains' },
    { src: ASSETS.motherBaby, label: language === 'fr' ? 'Repas de Bébé' : 'Baby Feeding' },
  ];

  useEffect(() => {
    if (showLightbox) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowLightbox(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showLightbox]);

  const subtotal = quantity * PRODUCT_INFO.priceFcfa;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 space-y-8 md:space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-[#263238]/80">
        <span>{commonT.nav.home}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#810778]">{commonT.nav.product}</span>
      </nav>

      {/* Main Product Showcase: Sticky Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Frame */}
          <button
            type="button"
            aria-label={t.zoomNotice}
            onClick={() => setShowLightbox(true)}
            className="relative rounded-3xl overflow-hidden bg-white border-2 border-[#60C3F2]/30 shadow-xl cursor-zoom-in group aspect-square flex items-center justify-center p-4 hover:border-[#60C3F2] transition-colors"
          >
            <ResponsiveImage
              src={selectedImage}
              alt={language === 'fr' ? "Zuna’s Choice — Céréales infantiles" : "Zuna's Choice Baby Cereal"}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold text-[#263238] shadow-md flex items-center gap-1.5 pointer-events-none group-hover:bg-[#810778] group-hover:text-white transition-colors">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{t.zoomNotice}</span>
            </div>
            <div className="absolute top-4 left-4 bg-[#087C21] text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-xs">
              {PRODUCT_INFO.ageIndication}
            </div>
          </button>

          <p className="text-xs text-[#263238]/80">
            {language === 'fr' ? 'Illustration du produit. Le produit est conditionné en sachet refermable de 250g.' : 'Product illustration. Supplied in a resealable 250g pouch.'}
          </p>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {galleryImages.map((img, i) => {
              const active = selectedImage === img.src;
              return (
                <button
                  aria-label={img.label}
                  aria-pressed={active}
                  key={i}
                  type="button"
                  onClick={() => {
                    setSelectedImage(img.src);
                  }}
                  className={`p-2 rounded-2xl border-2 transition-all cursor-pointer aspect-square bg-white flex flex-col items-center justify-center ${
                    active
                      ? 'border-[#087C21] shadow-md ring-2 ring-[#087C21]/20'
                      : 'border-[#EAF8FF] hover:border-[#60C3F2]/60'
                  }`}
                >
                  <ResponsiveImage
                    sizes="(min-width: 1024px) 160px, 25vw"
                    src={img.src}
                    alt={img.label}
                    className="w-full h-12 sm:h-16 object-contain rounded-lg shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <span className="w-full text-center text-[9px] sm:text-[10px] font-bold text-[#263238] mt-1 truncate">
                    {img.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 bg-white p-5 sm:p-10 rounded-3xl border border-[#EAF8FF] shadow-lg">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#087C21]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.labelBadge}</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing & Pack Specs */}
          <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#60C3F2]/30 flex items-center justify-between">
            <div>
              <span className="font-display font-black text-3xl text-[#087C21] block">
                {PRODUCT_INFO.priceFcfa.toLocaleString()} {t.fcfa}
              </span>
              <span className="text-xs font-bold text-[#263238]/70">
                {t.weight} · {PRODUCT_INFO.origin}
              </span>
            </div>
            <span className="px-3 py-1 bg-[#A14C00] text-white rounded-full text-xs font-extrabold">
              {t.age}
            </span>
          </div>

          {/* Interactive Stepper & Subtotal */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#263238]">
                {t.quantity}
              </span>
              <div className="flex items-center bg-[#EAF8FF] rounded-full border border-[#60C3F2]/40 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#810778] transition-colors"
                  aria-label={language === 'fr' ? 'Réduire la quantité' : 'Decrease quantity'}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-display font-extrabold text-base text-[#263238]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#810778] transition-colors"
                  aria-label={language === 'fr' ? 'Augmenter la quantité' : 'Increase quantity'}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-[#EAF8FF] to-white rounded-xl border border-[#60C3F2]/20">
              <span className="text-xs font-bold text-[#263238]">
                {t.subtotal}
              </span>
              <span className="font-display font-black text-2xl text-[#087C21]">
                {subtotal.toLocaleString()} {t.fcfa}
              </span>
            </div>

            {/* Direct Order via WhatsApp */}
            <button
              type="button"
              onClick={() => onOpenOrder(quantity)}
              className="w-full py-4 px-6 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t.whatsAppOrderCta}</span>
            </button>
          </div>

          {/* Product Highlights List */}
          <div className="pt-4 border-t border-[#EAF8FF] space-y-3">
            <h4 className="font-display font-bold text-sm text-[#263238]">
              {t.characteristicsTitle}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-[#263238]/85">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span>{t.char1}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span>{t.char2}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span>{t.char3}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span>{t.char4}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0 mt-0.5" />
                <span>{t.char5}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Storage & Allergen Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Storage */}
        <div className="p-7 bg-[#EAF8FF] rounded-3xl border border-[#60C3F2]/30 space-y-3">
          <div className="flex items-center gap-2 text-[#006688] font-bold text-sm">
            <Clock className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg text-[#263238]">
              {t.storageTitle}
            </h3>
          </div>
          <p className="text-sm text-[#263238]/85 leading-relaxed font-medium">
            {t.storageDesc}
          </p>
        </div>

        {/* Allergen */}
        <div className="p-7 bg-[#FFF8F0] rounded-3xl border border-[#F19A24]/30 space-y-3">
          <div className="flex items-center gap-2 text-[#954900] font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg text-[#263238]">
              {t.allergenTitle}
            </h3>
          </div>
          <p className="text-sm text-[#263238]/85 leading-relaxed font-medium">
            {t.allergenDesc}
          </p>
        </div>
      </div>

      {/* Nutrition Summary Strip */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#EAF8FF] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-[#810778]">
              {commonT.nutritionSnippet.title}
            </h3>
            <p className="text-xs text-[#263238]/70 mt-1">
              {commonT.nutritionPage.tableSubtitle}
            </p>
          </div>
          <button
            onClick={onOpenCalculator}
            className="px-5 py-2.5 bg-[#EAF8FF] hover:bg-[#60C3F2]/30 text-[#006688] font-extrabold text-xs rounded-full transition-colors cursor-pointer self-start sm:self-auto"
          >
            {commonT.nav.calculator}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {NUTRITION_TABLE.slice(0, 4).map((fact, idx) => (
            <div key={idx} className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#EAF8FF]">
              <span className="text-xs font-semibold text-[#263238]/70 block">{fact.nutrient[language]}</span>
              <span className="font-display font-bold text-base text-[#087C21] mt-1 block">{fact.per100g}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLightbox(false);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          ref={dialogRef}
          tabIndex={-1}
          aria-label={t.zoomNotice}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setShowLightbox(false)}
              className="fixed top-4 right-4 p-2 text-white hover:text-[#60C3F2] transition-colors rounded-full bg-white/10 hover:bg-white/20"
              aria-label={language === 'fr' ? 'Fermer l’aperçu' : 'Close Preview'}
            >
              <X className="w-6 h-6" />
            </button>
            <ResponsiveImage
              src={selectedImage}
              alt={language === 'fr' ? "Aperçu de l’emballage" : "Packaging inspection view"}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl bg-white p-2"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/80 text-xs mt-3 text-center font-medium">
              {language === 'fr' ? "Zuna’s Choice — Céréales infantiles Weanimix (250g) · Dès 6 mois · Cameroun" : "Zuna’s Choice Baby Cereal Weanimix (250g) · 6+ Months · Cameroon"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
