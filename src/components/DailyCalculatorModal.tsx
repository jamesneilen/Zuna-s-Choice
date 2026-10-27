import { useDialog } from '../hooks/useDialog';
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, PRODUCT_INFO } from '../data/productData';
import { X, Calculator, Plus, Minus, Check, Calendar, ShoppingBag, Sparkles } from 'lucide-react';

interface DailyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderWithQuantity: (qty: number) => void;
  language: Language;
}

export const DailyCalculatorModal: React.FC<DailyCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOrderWithQuantity,
  language,
}) => {
  const [selectedAge, setSelectedAge] = useState<'early' | 'mid' | 'toddler'>('early');
  const [packs, setPacks] = useState<number>(2);

  const dialogRef = useDialog(isOpen);

  const t = translations[language].calculator;

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Daily consumption metrics in grams
  const consumptionConfig = {
    early: { dailyGrams: 30, label: t.ageOpt1, bowlsPerDay: 1 },
    mid: { dailyGrams: 50, label: t.ageOpt2, bowlsPerDay: 2 },
    toddler: { dailyGrams: 65, label: t.ageOpt3, bowlsPerDay: 2 },
  };

  const current = consumptionConfig[selectedAge];
  const totalGrams = packs * PRODUCT_INFO.weightGrams;
  const estimatedDays = Math.round(totalGrams / current.dailyGrams);
  const totalBowls = Math.round(totalGrams / (current.dailyGrams / current.bowlsPerDay));
  const totalCost = packs * PRODUCT_INFO.priceFcfa;
  const dailyCost = Math.round(PRODUCT_INFO.priceFcfa / PRODUCT_INFO.weightGrams * current.dailyGrams);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#60C3F2]/30 space-y-6 max-h-[92vh] overflow-y-auto"
        ref={dialogRef}
        tabIndex={-1}
        aria-labelledby="DailyCalculatorModal-title"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#263238]/80 hover:text-[#810778] hover:bg-[#EAF8FF] transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#810778]">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Calculateur de bouillie' : 'Infant Weaning Calculator'}</span>
            </div>
            <img
              src={ASSETS.logo}
              alt="Zuna's Choice"
              className="h-10 w-auto object-contain"
            />
          </div>
          <h3 id="DailyCalculatorModal-title" className="font-display font-extrabold text-2xl text-[#810778] tracking-tight">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#263238]/80 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Age Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#263238]">
            {t.ageLabel}
          </label>
          <div className="space-y-2">
            {(['early', 'mid', 'toddler'] as const).map((stage) => {
              const active = selectedAge === stage;
              return (
                <button
                  key={stage}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedAge(stage)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs font-semibold cursor-pointer ${
                    active
                      ? 'border-[#087C21] bg-[#087C21]/5 text-[#087C21] shadow-xs'
                      : 'border-[#bec8cf]/50 bg-white text-[#263238] hover:border-[#60C3F2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{consumptionConfig[stage].label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        active ? 'border-[#087C21] bg-[#087C21]' : 'border-slate-300'
                      }`}
                    >
                      {active && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Packs Selector */}
        <div className="flex items-center justify-between p-4 bg-[#F4FAFF] rounded-2xl border border-[#EAF8FF]">
          <span className="text-xs font-bold text-[#263238]">
            {t.packsLabel}
          </span>
          <div className="flex items-center bg-white rounded-full border border-[#60C3F2]/40 p-1">
            <button
              type="button"
              aria-label={language === 'fr' ? 'Réduire les paquets' : 'Decrease packs'}
              disabled={packs === 1}
              onClick={() => setPacks(Math.max(1, packs - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EAF8FF] text-[#810778] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-display font-extrabold text-base text-[#263238]">
              {packs}
            </span>
            <button
              type="button"
              aria-label={language === 'fr' ? 'Ajouter un paquet' : 'Increase packs'}
              onClick={() => setPacks(packs + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EAF8FF] text-[#810778] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calculation Results Card */}
        <div className="p-5 bg-gradient-to-br from-[#EAF8FF] to-white rounded-3xl border border-[#60C3F2]/30 space-y-4">
          <div className="text-center pb-3 border-b border-[#60C3F2]/20">
            <span className="text-xs font-semibold text-[#263238]/70 block">
              {t.resultDays}
            </span>
            <div className="flex items-baseline justify-center gap-1.5 mt-1">
              <span className="font-display font-black text-4xl text-[#087C21]">
                {estimatedDays}
              </span>
              <span className="font-display font-bold text-lg text-[#087C21]">
                {t.days}
              </span>
            </div>
            <span className="text-[11px] text-[#263238]/70">
              ({totalGrams}g {language === 'fr' ? 'de farine au total' : 'total porridge flour'})
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-[#EAF8FF]">
              <span className="text-[#263238]/70 block text-[10px] uppercase font-bold">{t.bowlsTotal}</span>
              <span className="font-display font-bold text-sm text-[#810778] mt-0.5 block">{totalBowls} {language === 'fr' ? 'bols' : 'bowls'}</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#EAF8FF]">
              <span className="text-[#263238]/70 block text-[10px] uppercase font-bold">{t.estimatedCost}</span>
              <span className="font-display font-bold text-sm text-[#263238] mt-0.5 block">{totalCost.toLocaleString()} FCFA</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-[#EAF8FF]">
              <span className="text-[#263238]/70 block text-[10px] uppercase font-bold">{t.dailyCost}</span>
              <span className="font-display font-bold text-sm text-[#087C21] mt-0.5 block">~{dailyCost} FCFA/{language === 'fr' ? 'j' : 'd'}</span>
            </div>
          </div>
        </div>

        {/* Pediatric Advisory */}
        <p className="text-[11px] text-[#263238]/70 bg-[#F4FAFF] p-3 rounded-xl border border-[#EAF8FF] leading-relaxed">
          {t.pediatricTip}
        </p>

        {/* Action Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOrderWithQuantity(packs);
            }}
            className="w-full py-3.5 px-6 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.orderPacks} ({totalCost.toLocaleString()} FCFA)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
