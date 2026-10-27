import { ResponsiveImage } from '../components/ResponsiveImage';
import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, INGREDIENTS_DATA } from '../data/productData';
import {
  ShieldCheck,
  Wheat,
  Heart,
  Sparkles,
  Info,
  CheckCircle2,
  Calculator,
  ChevronRight,
  Apple,
  Milk,
} from 'lucide-react';

interface NutritionPageProps {
  language: Language;
  onOpenCalculator: () => void;
  onOpenOrder: () => void;
}

export const NutritionPage: React.FC<NutritionPageProps> = ({
  language,
  onOpenCalculator,
  onOpenOrder,
}) => {
  const t = translations[language].nutritionPage;
  const commonT = translations[language];


  return (
    <div className="page-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 space-y-8 md:space-y-16">
      {/* Breadcrumb */}
      <nav aria-label={language === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-xs font-bold text-[#263238]/80">
        <span>{commonT.nav.home}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#810778]">{commonT.nav.nutrition}</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#087C21]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'fr' ? 'Nutrition infantile au Cameroun' : 'Infant Nutrition in Cameroon'}</span>
        </div>
        <h1 tabIndex={-1} className="font-display font-extrabold text-3xl sm:text-5xl text-[#810778] tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-[#263238]/85 leading-relaxed font-normal">
          {t.heroSubtitle}
        </p>
      </div>

      {/* Tri-Grain Synergy Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-12 border border-[#EAF8FF] shadow-lg space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
              {t.threeGrainsTitle}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#263238]">
              {t.threeGrainsTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#263238]/80 leading-relaxed font-medium">
              {t.threeGrainsIntro}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#F4FAFF] text-[#006688] rounded-full text-xs font-bold border border-[#60C3F2]/30">
                {language === 'fr' ? 'Blé — glucides et fibres' : 'Wheat — carbohydrates & fibre'}
              </span>
              <span className="px-3 py-1 bg-[#FFF9F2] text-[#954900] rounded-full text-xs font-bold border border-[#F19A24]/30">
                {language === 'fr' ? 'Soja — protéines végétales' : 'Soybeans — plant protein'}
              </span>
              <span className="px-3 py-1 bg-[#F2FCF5] text-[#087C21] rounded-full text-xs font-bold border border-[#087C21]/30">
                {language === 'fr' ? 'Riz — glucides' : 'Rice — carbohydrates'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md">
            <ResponsiveImage
              sizes="(min-width: 1024px) 480px, 100vw"
              src={ASSETS.threeGrains}
              alt={language === 'fr' ? "Bols de blé, de soja et de riz" : "Artisanal bowls of wheat, soybeans, and rice"}
              className="w-full h-64 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3 Grain Deep-Dives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#EAF8FF]">
          {INGREDIENTS_DATA.map((grain) => (
            <div key={grain.id} className="p-6 bg-[#F4FAFF] rounded-2xl border border-[#EAF8FF] space-y-2">
              <span className="text-xs font-extrabold text-[#810778] block">
                {grain.shortRole[language]}
              </span>
              <h3 className="font-display font-bold text-xl text-[#263238]">
                {grain.name[language]}
              </h3>
              <p className="text-xs sm:text-sm text-[#263238]/80 leading-relaxed font-medium">
                {grain.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white rounded-3xl p-5 sm:p-12 border border-[#EAF8FF] space-y-4" aria-labelledby="nutrition-details">
        <h2 id="nutrition-details" className="font-display font-bold text-2xl text-[#810778]">{t.tableTitle}</h2>
        <p className="text-sm text-[#263238]">{t.tableSubtitle}</p>
        <p className="text-sm text-[#263238]">{language === 'fr' ? 'Pour les allergènes, la composition complète et les valeurs nutritionnelles confirmées, consultez l’étiquette du produit ou contactez notre équipe.' : 'For allergens, full composition and confirmed nutrition values, check the product label or contact our team.'}</p>
      </section>

      {/* WHO / UNICEF Responsible Complementary Feeding Guidelines */}
      <div className="p-5 sm:p-10 bg-[#FFF8F0] rounded-3xl border border-[#F19A24]/30 space-y-4">
        <div className="flex items-center gap-2.5 text-[#954900]">
          <Info className="w-5 h-5" />
          <h3 className="font-display font-extrabold text-xl text-[#263238]">
            {t.whoNoticeTitle}
          </h3>
        </div>
        <p className="text-sm text-[#263238]/85 leading-relaxed font-medium">
          {t.whoNoticeDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F19A24]/20 text-xs font-bold text-[#263238]">
          <div className="p-3 bg-white rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
            <span>{language === 'fr' ? 'Commencer à 6 mois révolus' : 'Start at 6 Completed Months'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
            <span>{language === 'fr' ? 'Poursuivre l’allaitement fréquent' : 'Continue Frequent Breastfeeding'}</span>
          </div>
          <div className="p-3 bg-white rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
            <span>{language === 'fr' ? 'Adapter la texture à l’âge' : 'Progress Texture with Age'}</span>
          </div>
        </div>
      </div>

      {/* Calculator Banner */}
      <div className="p-5 sm:p-10 bg-gradient-to-r from-[#EAF8FF] to-[#F4FAFF] rounded-3xl border border-[#60C3F2]/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="font-display font-extrabold text-2xl text-[#810778]">
            {t.calcTitle}
          </h3>
          <p className="text-sm text-[#263238]/80">
            {t.calcSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCalculator}
            className="px-6 py-3.5 bg-[#810778] hover:bg-[#680560] text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>{language === 'fr' ? 'Ouvrir le calculateur' : 'Launch Planner'}</span>
          </button>
          <button
            onClick={onOpenOrder}
            className="px-6 py-3.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer"
          >
            {commonT.nav.orderNow}
          </button>
        </div>
      </div>
    </div>
  );
};
