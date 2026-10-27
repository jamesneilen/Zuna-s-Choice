import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, INGREDIENTS_DATA, NUTRITION_TABLE } from '../data/productData';
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

  const [portionFilter, setPortionFilter] = useState<'both' | '100g' | '50g'>('both');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 space-y-8 md:space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-[#263238]/60">
        <span>{commonT.nav.home}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#810778]">{commonT.nav.nutrition}</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#087C21]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cameroonian Pediatric Nutrition</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#810778] tracking-tight">
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
              The Power of the Weanimix Formulation
            </h2>
            <p className="text-sm sm:text-base text-[#263238]/80 leading-relaxed font-medium">
              {t.threeGrainsIntro}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#F4FAFF] text-[#006688] rounded-full text-xs font-bold border border-[#60C3F2]/30">
                Wheat (Glucides complexes)
              </span>
              <span className="px-3 py-1 bg-[#FFF9F2] text-[#F19A24] rounded-full text-xs font-bold border border-[#F19A24]/30">
                Soybeans (Protéines complètes)
              </span>
              <span className="px-3 py-1 bg-[#F2FCF5] text-[#087C21] rounded-full text-xs font-bold border border-[#087C21]/30">
                Rice (Douceur digestive)
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md">
            <img
              src={ASSETS.threeGrains}
              alt="Artisanal bowls of wheat, soybeans, and rice"
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

      {/* Nutritional Table Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-12 border border-[#EAF8FF] shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#810778]">
              {t.tableTitle}
            </h2>
            <p className="text-sm text-[#263238]/70 mt-1 font-medium">
              {t.tableSubtitle}
            </p>
          </div>

          {/* Portion filter tabs */}
          <div className="flex items-center bg-[#EAF8FF] p-1 rounded-full border border-[#60C3F2]/40 text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setPortionFilter('both')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                portionFilter === 'both' ? 'bg-[#810778] text-white shadow-xs' : 'text-[#263238]'
              }`}
            >
              {language === 'fr' ? 'Tout' : 'All Columns'}
            </button>
            <button
              onClick={() => setPortionFilter('100g')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                portionFilter === '100g' ? 'bg-[#810778] text-white shadow-xs' : 'text-[#263238]'
              }`}
            >
              {language === 'fr' ? 'Pour 100g' : 'Per 100g'}
            </button>
            <button
              onClick={() => setPortionFilter('50g')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                portionFilter === '50g' ? 'bg-[#810778] text-white shadow-xs' : 'text-[#263238]'
              }`}
            >
              {language === 'fr' ? 'Bol de 50g' : 'Per 50g Bowl'}
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#EAF8FF]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#EAF8FF] text-[#263238] font-display font-bold">
                <th className="py-3.5 px-4 sm:px-6">{t.nutrientCol}</th>
                {(portionFilter === 'both' || portionFilter === '100g') && (
                  <th className="py-3.5 px-4 sm:px-6 text-right tabular-nums">{t.per100gCol}</th>
                )}
                {(portionFilter === 'both' || portionFilter === '50g') && (
                  <th className="py-3.5 px-4 sm:px-6 text-right tabular-nums">{t.per50gCol}</th>
                )}
                <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">{t.noteCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAF8FF] font-medium">
              {NUTRITION_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F4FAFF] transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#263238]">
                    {row.nutrient[language]}
                  </td>
                  {(portionFilter === 'both' || portionFilter === '100g') && (
                    <td className="py-3.5 px-4 sm:px-6 text-right font-mono font-bold text-[#087C21] tabular-nums whitespace-nowrap">
                      {row.per100g}
                    </td>
                  )}
                  {(portionFilter === 'both' || portionFilter === '50g') && (
                    <td className="py-3.5 px-4 sm:px-6 text-right font-mono font-bold text-[#810778] tabular-nums whitespace-nowrap">
                      {row.perServing50g}
                    </td>
                  )}
                  <td className="py-3.5 px-4 sm:px-6 text-xs text-[#263238]/70 hidden md:table-cell">
                    {row.dailyValueNote ? row.dailyValueNote[language] : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#263238]/60 italic">
          * Note: Values represent typical nutritional characteristics of the blend formulated for 6+ months infant complementary feeding.
        </p>
      </div>

      {/* WHO / UNICEF Responsible Complementary Feeding Guidelines */}
      <div className="p-5 sm:p-10 bg-[#FFF8F0] rounded-3xl border border-[#F19A24]/30 space-y-4">
        <div className="flex items-center gap-2.5 text-[#F19A24]">
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
            <span>Start at 6 Completed Months</span>
          </div>
          <div className="p-3 bg-white rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
            <span>Continue Frequent Breastfeeding</span>
          </div>
          <div className="p-3 bg-white rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
            <span>Progress Texture with Age</span>
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
            <span>Launch Planner</span>
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
