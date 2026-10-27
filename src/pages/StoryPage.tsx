import { ResponsiveImage } from '../components/ResponsiveImage';
import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS } from '../data/productData';
import {
  ShieldCheck,
  Wheat,
  Heart,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface StoryPageProps {
  language: Language;
  onOpenOrder: () => void;
  onNavigateProduct: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  language,
  onOpenOrder,
  onNavigateProduct,
}) => {
  const t = translations[language].storyPage;
  const commonT = translations[language];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 space-y-10 md:space-y-20">
      {/* Breadcrumb */}
      <nav aria-label={language === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-xs font-bold text-[#263238]/80">
        <span>{commonT.nav.home}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#810778]">{commonT.nav.story}</span>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#087C21]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? "Racines agricoles camerounaises" : "Cameroon Agricultural Roots"}</span>
          </div>
          <h1 tabIndex={-1} className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#810778] tracking-tight leading-[1.12]">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-[#263238]/85 leading-relaxed font-normal max-w-xl">
            {t.heroSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateProduct}
              className="px-6 py-3.5 bg-white hover:bg-[#EAF8FF] text-[#810778] border-2 border-[#60C3F2] font-extrabold text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{commonT.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOrder}
              className="px-6 py-3.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{commonT.nav.orderNow}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <ResponsiveImage
              sizes="(min-width: 1024px) 520px, 100vw"
              src={ASSETS.motherBaby}
              alt={language === 'fr' ? "Mère camerounaise donnant à manger à son bébé" : "Cameroonian mother lovingly feeding her baby"}
              className="w-full h-80 sm:h-96 object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-5 sm:p-10 bg-gradient-to-br from-[#EAF8FF] to-white rounded-3xl border border-[#60C3F2]/40 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#087C21] text-white flex items-center justify-center shadow-xs">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#810778]">
            {t.missionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#263238]/85 leading-relaxed font-medium">
            {t.missionText}
          </p>
        </div>

        <div className="p-5 sm:p-10 bg-gradient-to-br from-[#FFF8F0] to-white rounded-3xl border border-[#F19A24]/40 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#810778] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#810778]">
            {t.visionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#263238]/85 leading-relaxed font-medium">
            {t.visionText}
          </p>
        </div>
      </div>

      {/* 3 Pillars of Impact */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
            Our Foundation
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#263238]">
            Built on Three Core Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 sm:p-8 bg-white rounded-3xl border border-[#EAF8FF] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF8FF] text-[#087C21] flex items-center justify-center font-bold">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#263238]">
              {t.pillar1Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.pillar1Desc}
            </p>
          </div>

          <div className="p-5 sm:p-8 bg-white rounded-3xl border border-[#EAF8FF] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF9F2] text-[#954900] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#263238]">
              {t.pillar2Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.pillar2Desc}
            </p>
          </div>

          <div className="p-5 sm:p-8 bg-white rounded-3xl border border-[#EAF8FF] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#F4FAFF] text-[#810778] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#263238]">
              {t.pillar3Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.pillar3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Quote Banner with Cameroon Farms Backdrop */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
        <ResponsiveImage
          sizes="(min-width: 1280px) 1216px, 100vw"
          src={ASSETS.cameroonFarms}
          alt={language === 'fr' ? "Terres agricoles du Cameroun" : "Farmlands of Cameroon"}
          className="w-full h-80 sm:h-96 object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-center p-6 sm:p-12 text-center">
          <blockquote className="max-w-3xl space-y-4 text-white">
            <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl leading-relaxed text-white/95">
              "{t.quoteText}"
            </p>
            <footer className="text-xs sm:text-sm font-semibold tracking-wider text-[#60C3F2] uppercase">
              {language === 'fr' ? "L’équipe Zuna’s Choice · Cameroun" : "The Zuna’s Choice Team · Cameroon"}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};
