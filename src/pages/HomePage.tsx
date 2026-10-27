import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, FAQS_DATA, INGREDIENTS_DATA, PRODUCT_INFO } from '../data/productData';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  ChevronDown,
  Search,
  MessageCircle,
  CheckCircle2,
  Wheat,
  Utensils,
  Flame,
  Award,
  Layers,
  Calculator,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenOrder: (quantity?: number) => void;
  onOpenCalculator: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  language,
  onOpenOrder,
  onOpenCalculator,
}) => {
  const t = translations[language];

  // Product Spotlight local state
  const [spotlightQty, setSpotlightQty] = useState(2);

  // Preparation active step
  const [activePrepStep, setActivePrepStep] = useState(1);

  // FAQ state
  const [searchFaq, setSearchFaq] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('ingredients');

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
    const qText = faq.question[language].toLowerCase();
    const aText = faq.answer[language].toLowerCase();
    const matchesSearch =
      searchFaq === '' || qText.includes(searchFaq.toLowerCase()) || aText.includes(searchFaq.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* =========================================================================
          SECTION 1 — HERO
          Two-column desktop layout, cheerful sky-blue aesthetic with gentle clouds
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#60C3F2]/25 via-[#EAF8FF] to-[#F4FAFF] pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Soft SVG Background Clouds */}
        <div className="absolute top-6 left-10 w-44 h-16 bg-white/70 rounded-full blur-md animate-cloud-drift pointer-events-none" />
        <div className="absolute top-20 right-16 w-60 h-20 bg-white/60 rounded-full blur-lg animate-cloud-drift pointer-events-none" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-24 bg-white/50 rounded-full blur-md pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Supporting Copy, CTAs, Highlights */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Official Brand Logo & Cameroon Sourced Trust Marker */}
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={ASSETS.logo}
                  alt="Zuna's Choice Baby Cereal Weanimix"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-xs rounded-full border border-[#60C3F2]/40 shadow-xs text-xs font-bold text-[#087C21]">
                  <ShieldCheck className="w-4 h-4 text-[#087C21]" />
                  <span>{t.hero.certifiedNotice}</span>
                </div>
              </div>

              {/* Expressive Display Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#810778] tracking-tight leading-[1.12]">
                <span>{t.hero.headlinePart1}</span>{' '}
                <span className="text-[#087C21] block sm:inline">
                  {t.hero.headlinePart2}
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#263238]/90 max-w-2xl leading-relaxed font-normal">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('product')}
                  className="px-7 py-3.5 bg-white hover:bg-[#EAF8FF] text-[#810778] border-2 border-[#60C3F2] font-extrabold text-sm sm:text-base rounded-full shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenOrder()}
                  className="px-7 py-3.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.hero.orderBtn} (1,500 FCFA)</span>
                </button>
              </div>

              {/* 3 Short Product Highlights */}
              <div className="pt-6 border-t border-[#60C3F2]/30 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EAF8FF] flex items-center justify-center text-[#087C21] shrink-0 border border-[#60C3F2]/30">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#263238]">
                    {t.hero.highlight1}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EAF8FF] flex items-center justify-center text-[#810778] shrink-0 border border-[#60C3F2]/30">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#263238]">
                    {t.hero.highlight2}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EAF8FF] flex items-center justify-center text-[#F19A24] shrink-0 border border-[#60C3F2]/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#263238]">
                    {t.hero.highlight3}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Product Box Photograph & Floating Elements */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Sunbeam Halo & Sky Circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#60C3F2]/30 to-[#810778]/10 rounded-full blur-2xl transform scale-90 -z-10" />

              <div className="relative max-w-sm sm:max-w-md w-full animate-gentle-float">
                {/* 3D Box Packaging Image */}
                <div className="relative rounded-3xl p-3 bg-white/90 backdrop-blur-xs shadow-2xl border-2 border-white">
                  <img
                    src={ASSETS.productBox}
                    alt="Zuna's Choice Baby Cereal Weanimix Box Packaging"
                    className="w-full h-auto object-cover rounded-2xl shadow-inner select-none"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Price & Weight Badge */}
                  <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-[#F19A24] text-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 fill-current text-white" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-white/90">
                        {t.hero.badgeWeight}
                      </span>
                      <span className="font-display font-extrabold text-base text-white">
                        {t.hero.badgePrice}
                      </span>
                    </div>
                  </div>

                  {/* Floating 6+ Months Badge */}
                  <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#087C21] text-white px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white text-xs font-black tracking-wide">
                    6+ Months / Mois
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — WHY ZUNA'S CHOICE?
          Four rounded benefit cards with gentle hover micro-interactions
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-[#810778] uppercase tracking-wider">
            {t.whyUs.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="text-base text-[#263238]/80 leading-relaxed font-normal">
            {t.whyUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Locally Sourced */}
          <div className="p-7 bg-[#EAF8FF] rounded-3xl border border-[#60C3F2]/30 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#087C21] shadow-xs">
              <Wheat className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#263238]">
              {t.whyUs.card1Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.whyUs.card1Desc}
            </p>
          </div>

          {/* Card 2: Thoughtful Nutrition */}
          <div className="p-7 bg-white rounded-3xl border border-[#EAF8FF] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF8FF] flex items-center justify-center text-[#810778] shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#263238]">
              {t.whyUs.card2Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.whyUs.card2Desc}
            </p>
          </div>

          {/* Card 3: Quick & Convenient */}
          <div className="p-7 bg-[#F4FAFF] rounded-3xl border border-[#60C3F2]/30 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#F19A24] shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#263238]">
              {t.whyUs.card3Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.whyUs.card3Desc}
            </p>
          </div>

          {/* Card 4: Affordable for Families */}
          <div className="p-7 bg-[#087C21]/5 rounded-3xl border border-[#087C21]/20 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#087C21] flex items-center justify-center text-white shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#087C21]">
              {t.whyUs.card4Title}
            </h3>
            <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
              {t.whyUs.card4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — THREE GRAINS, ONE THOUGHTFUL BLEND
          Rich ingredient cards for Wheat, Soybeans, Rice
      ========================================================================= */}
      <section className="bg-white py-16 border-y border-[#EAF8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
                {t.grains.tag}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
                {t.grains.title}
              </h2>
              <p className="text-base text-[#263238]/80 font-normal">
                {t.grains.subtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate('nutrition')}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#087C21] hover:text-[#06611a] cursor-pointer self-start md:self-auto group"
            >
              <span>{t.grains.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Artisanal Photo Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#EAF8FF] h-64 sm:h-80 md:h-96">
            <img
              src={ASSETS.threeGrains}
              alt="Locally cultivated wheat, soybeans, and rice"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#60C3F2]">
                  Authentic Cameroonian Harvest
                </span>
                <p className="text-base sm:text-lg font-bold mt-1 text-white/95">
                  Grown in fertile volcanic soils and harvested by local farming cooperatives.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Grain Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INGREDIENTS_DATA.map((grain, idx) => {
              const bgColors = ['bg-[#F4FAFF]', 'bg-[#FFF9F2]', 'bg-[#F2FCF5]'];
              const borderColors = ['border-[#60C3F2]/40', 'border-[#F19A24]/40', 'border-[#087C21]/40'];
              const textColors = ['text-[#006688]', 'text-[#F19A24]', 'text-[#087C21]'];

              return (
                <div
                  key={grain.id}
                  className={`p-7 rounded-3xl border ${bgColors[idx]} ${borderColors[idx]} space-y-4 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <span className={`text-xs font-black uppercase tracking-wider ${textColors[idx]}`}>
                      {grain.shortRole[language]}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[#263238]">
                      {grain.name[language]}
                    </h3>
                    <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
                      {grain.description[language]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#263238]/70">
                    <span>{grain.nutrientHighlight[language]}</span>
                    <Sparkles className={`w-4 h-4 ${textColors[idx]}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — PRODUCT SPOTLIGHT
          Interactive quantity stepper, subtotal, and direct WhatsApp ordering
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#EAF8FF] via-white to-[#F4FAFF] rounded-3xl border-2 border-[#60C3F2]/30 p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Product Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-xs sm:max-w-sm w-full">
                <div className="bg-white rounded-3xl p-4 shadow-xl border border-[#60C3F2]/30">
                  <img
                    src={ASSETS.productBox}
                    alt="Zuna's Choice Baby Cereal"
                    className="w-full h-auto object-cover rounded-2xl select-none"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Product Ordering Console */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
                  {t.spotlight.tag}
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
                  {t.spotlight.title}
                </h2>
                <p className="text-base text-[#263238]/80 font-normal">
                  {t.spotlight.subtitle}
                </p>
              </div>

              {/* Price & Weight row */}
              <div className="flex items-baseline gap-3">
                <span className="font-display font-black text-4xl text-[#087C21]">
                  1,500 FCFA
                </span>
                <span className="text-sm font-bold text-[#263238]/70">
                  {t.spotlight.perPack}
                </span>
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-bold text-[#263238]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
                  <span>{t.spotlight.feature1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
                  <span>{t.spotlight.feature2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
                  <span>{t.spotlight.feature3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087C21] shrink-0" />
                  <span>{t.spotlight.feature4}</span>
                </div>
              </div>

              {/* Interactive Quantity & Subtotal Console */}
              <div className="p-5 bg-white rounded-2xl border border-[#60C3F2]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#263238]">
                    {t.spotlight.quantityLabel}
                  </span>
                  <div className="flex items-center bg-[#F4FAFF] rounded-full border border-[#60C3F2]/40 p-1">
                    <button
                      onClick={() => setSpotlightQty(Math.max(1, spotlightQty - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#60C3F2]/20 text-[#810778] font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-display font-extrabold text-base text-[#263238]">
                      {spotlightQty}
                    </span>
                    <button
                      onClick={() => setSpotlightQty(spotlightQty + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#60C3F2]/20 text-[#810778] font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-[#263238]/70 block">
                    {t.spotlight.subtotalLabel}
                  </span>
                  <span className="font-display font-black text-2xl text-[#087C21]">
                    {(spotlightQty * PRODUCT_INFO.priceFcfa).toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenOrder(spotlightQty)}
                  className="px-8 py-3.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t.spotlight.orderWhatsApp}</span>
                </button>

                <button
                  onClick={() => onNavigate('product')}
                  className="px-6 py-3.5 bg-white hover:bg-[#EAF8FF] text-[#810778] border border-[#60C3F2] font-bold text-sm rounded-full transition-colors cursor-pointer"
                >
                  {t.spotlight.viewDetails}
                </button>
              </div>

              <p className="text-xs text-[#263238]/60 font-medium">
                {t.spotlight.fastDelivery}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — SIMPLE PREPARATION
          3-step visual preparation guide with warm bowl presentation
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#F19A24] uppercase tracking-wider">
            {t.prep.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
            {t.prep.title}
          </h2>
          <p className="text-base text-[#263238]/80 leading-relaxed font-normal">
            {t.prep.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 3 Step Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Step 1 */}
            <div
              onClick={() => setActivePrepStep(1)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activePrepStep === 1
                  ? 'bg-white border-[#087C21] shadow-md ring-2 ring-[#087C21]/20'
                  : 'bg-[#F4FAFF] border-[#EAF8FF] hover:border-[#60C3F2]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-display font-black text-lg shrink-0 ${
                    activePrepStep === 1
                      ? 'bg-[#087C21] text-white shadow-xs'
                      : 'bg-white text-[#263238] border border-[#bec8cf]/40'
                  }`}
                >
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#263238]">
                    {t.prep.step1Title}
                  </h3>
                  <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
                    {t.prep.step1Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActivePrepStep(2)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activePrepStep === 2
                  ? 'bg-white border-[#810778] shadow-md ring-2 ring-[#810778]/20'
                  : 'bg-[#F4FAFF] border-[#EAF8FF] hover:border-[#60C3F2]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-display font-black text-lg shrink-0 ${
                    activePrepStep === 2
                      ? 'bg-[#810778] text-white shadow-xs'
                      : 'bg-white text-[#263238] border border-[#bec8cf]/40'
                  }`}
                >
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#263238]">
                    {t.prep.step2Title}
                  </h3>
                  <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
                    {t.prep.step2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActivePrepStep(3)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activePrepStep === 3
                  ? 'bg-white border-[#F19A24] shadow-md ring-2 ring-[#F19A24]/20'
                  : 'bg-[#F4FAFF] border-[#EAF8FF] hover:border-[#60C3F2]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-display font-black text-lg shrink-0 ${
                    activePrepStep === 3
                      ? 'bg-[#F19A24] text-white shadow-xs'
                      : 'bg-white text-[#263238] border border-[#bec8cf]/40'
                  }`}
                >
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#263238]">
                    {t.prep.step3Title}
                  </h3>
                  <p className="text-sm text-[#263238]/80 leading-relaxed font-medium">
                    {t.prep.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Caregiver note */}
            <div className="p-4 bg-[#EAF8FF] rounded-2xl border border-[#60C3F2]/40 text-xs text-[#006688] font-medium leading-relaxed">
              <span className="font-bold text-[#810778]">{t.prep.prepTipTitle}: </span>
              {t.prep.prepTipDesc}
            </div>
          </div>

          {/* Right: Visual Baby Cereal Bowl Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-sm w-full">
              <img
                src={ASSETS.cerealBowl}
                alt="Nutritious warm baby cereal porridge bowl with wooden spoon"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#810778] shadow-sm border border-[#EAF8FF]">
                {activePrepStep === 1 && (language === 'fr' ? 'Étape 1 : Hygiène & Eau Propre' : 'Step 1: Clean Utensils & Safe Water')}
                {activePrepStep === 2 && (language === 'fr' ? 'Étape 2 : Cuisson Douce ~5 min' : 'Step 2: Gentle Simmer ~5 min')}
                {activePrepStep === 3 && (language === 'fr' ? 'Étape 3 : Tiédir & Servir avec Amour' : 'Step 3: Cool & Spoon-Feed with Care')}
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-[#EAF8FF] shadow-xs text-xs font-bold text-[#263238] flex items-center justify-between">
                <span>
                  {activePrepStep === 1 && (language === 'fr' ? 'Hygiène irréprochable pour bébé' : 'Hygiene first for delicate bellies')}
                  {activePrepStep === 2 && (language === 'fr' ? 'Mélange fluide sans grumeaux' : 'Stir continuously for lump-free texture')}
                  {activePrepStep === 3 && (language === 'fr' ? 'Texture soyeuse facile à avaler' : 'Silky smooth & gentle on infant tummies')}
                </span>
                <Sparkles className="w-4 h-4 text-[#F19A24]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — OUR STORY TEASER
          Cameroon farm roots and mission
      ========================================================================= */}
      <section className="bg-gradient-to-b from-white to-[#F4FAFF] py-16 border-y border-[#EAF8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Farm landscape photograph */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={ASSETS.cameroonFarms}
                  alt="Fertile agricultural farm fields and rolling green hills in Cameroon"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating trust card */}
              <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 rounded-2xl shadow-lg border border-[#EAF8FF] max-w-xs text-xs">
                <span className="text-[#087C21] font-bold block mb-1">
                  100% Cameroonian Harvest
                </span>
                <span className="text-[#263238]/80 font-medium">
                  Direct partnership with smallholder farmers in Cameroon.
                </span>
              </div>
            </div>

            {/* Right: Story Copy & Stats */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
                {t.storySnippet.tag}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
                {t.storySnippet.title}
              </h2>
              <div className="space-y-4 text-base text-[#263238]/90 leading-relaxed font-normal">
                <p>{t.storySnippet.copy1}</p>
                <p>{t.storySnippet.copy2}</p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EAF8FF] text-center">
                <div className="p-3 bg-[#EAF8FF] rounded-2xl">
                  <span className="font-display font-extrabold text-sm text-[#087C21] block">100%</span>
                  <span className="text-[11px] font-semibold text-[#263238]/70">Local Grain</span>
                </div>
                <div className="p-3 bg-[#EAF8FF] rounded-2xl">
                  <span className="font-display font-extrabold text-sm text-[#810778] block">1,500 F</span>
                  <span className="text-[11px] font-semibold text-[#263238]/70">Fair Price</span>
                </div>
                <div className="p-3 bg-[#EAF8FF] rounded-2xl">
                  <span className="font-display font-extrabold text-sm text-[#F19A24] block">6+ Mo</span>
                  <span className="text-[11px] font-semibold text-[#263238]/70">Safe Weaning</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('story')}
                className="px-6 py-3 bg-[#810778] hover:bg-[#680560] text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{t.storySnippet.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — NUTRITION SPOTLIGHT & FEEDING CALCULATOR
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF8FF] rounded-3xl p-8 sm:p-12 border border-[#60C3F2]/40 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#810778] uppercase tracking-wider">
              {t.nutritionSnippet.tag}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
              {t.nutritionSnippet.title}
            </h2>
            <p className="text-base text-[#263238]/80 leading-relaxed font-normal">
              {t.nutritionSnippet.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl text-center shadow-xs border border-[#60C3F2]/20">
              <span className="font-display font-extrabold text-xl text-[#087C21] block">14.8g</span>
              <span className="text-xs font-bold text-[#263238] block mt-1">{t.nutritionSnippet.pill1}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl text-center shadow-xs border border-[#60C3F2]/20">
              <span className="font-display font-extrabold text-xl text-[#810778] block">Iron & Ca</span>
              <span className="text-xs font-bold text-[#263238] block mt-1">{t.nutritionSnippet.pill2}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl text-center shadow-xs border border-[#60C3F2]/20">
              <span className="font-display font-extrabold text-xl text-[#F19A24] block">6.2g</span>
              <span className="text-xs font-bold text-[#263238] block mt-1">{t.nutritionSnippet.pill3}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl text-center shadow-xs border border-[#60C3F2]/20">
              <span className="font-display font-extrabold text-xl text-[#006688] block">10+</span>
              <span className="text-xs font-bold text-[#263238] block mt-1">{t.nutritionSnippet.pill4}</span>
            </div>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl text-xs text-[#263238]/70 text-center max-w-2xl mx-auto leading-relaxed border border-[#60C3F2]/20">
            {t.nutritionSnippet.guidelineNotice}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('nutrition')}
              className="px-6 py-3 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer"
            >
              {t.nutritionSnippet.viewTableBtn}
            </button>
            <button
              onClick={onOpenCalculator}
              className="px-6 py-3 bg-white hover:bg-[#F4FAFF] text-[#810778] border border-[#810778] font-extrabold text-sm rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.calculator}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — ORDER ZUNA'S CHOICE PROMO BANNER
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#60C3F2] via-[#51b6e6] to-[#087C21] rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          {/* Decorative Clouds */}
          <div className="absolute top-0 right-10 w-48 h-14 bg-white/20 rounded-full blur-md" />
          <div className="absolute bottom-0 left-10 w-64 h-16 bg-white/20 rounded-full blur-lg" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold uppercase tracking-wider text-white">
              250g · 1,500 FCFA
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              {t.orderBanner.title}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {t.orderBanner.subtitle}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenOrder()}
                className="px-8 py-4 bg-white hover:bg-[#EAF8FF] text-[#087C21] font-extrabold text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-98 cursor-pointer flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.orderBanner.buttonText}</span>
              </button>
            </div>
            <p className="text-xs text-white/80 font-medium">
              {t.orderBanner.helpText}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — FAQS ACCORDION
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#810778] uppercase tracking-wider">
            {t.faq.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#810778] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-base text-[#263238]/80 font-normal">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#263238]/40" />
            <input
              type="text"
              value={searchFaq}
              onChange={(e) => setSearchFaq(e.target.value)}
              placeholder={t.faq.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center text-xs font-bold">
            <button
              onClick={() => setSelectedFaqCategory('all')}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedFaqCategory === 'all'
                  ? 'bg-[#810778] text-white shadow-xs'
                  : 'bg-white text-[#263238] border border-[#bec8cf]/50 hover:bg-[#EAF8FF]'
              }`}
            >
              {t.faq.allCategories}
            </button>
            <button
              onClick={() => setSelectedFaqCategory('product')}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedFaqCategory === 'product'
                  ? 'bg-[#810778] text-white shadow-xs'
                  : 'bg-white text-[#263238] border border-[#bec8cf]/50 hover:bg-[#EAF8FF]'
              }`}
            >
              {t.faq.productCat}
            </button>
            <button
              onClick={() => setSelectedFaqCategory('preparation')}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedFaqCategory === 'preparation'
                  ? 'bg-[#810778] text-white shadow-xs'
                  : 'bg-white text-[#263238] border border-[#bec8cf]/50 hover:bg-[#EAF8FF]'
              }`}
            >
              {t.faq.prepCat}
            </button>
            <button
              onClick={() => setSelectedFaqCategory('ordering')}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedFaqCategory === 'ordering'
                  ? 'bg-[#810778] text-white shadow-xs'
                  : 'bg-white text-[#263238] border border-[#bec8cf]/50 hover:bg-[#EAF8FF]'
              }`}
            >
              {t.faq.orderingCat}
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EAF8FF] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F4FAFF] transition-colors"
                >
                  <span className="font-display font-bold text-base text-[#263238]">
                    {faq.question[language]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#810778] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#263238]/85 leading-relaxed border-t border-[#EAF8FF] font-medium bg-[#FAFDFF]">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help prompt */}
        <div className="p-6 bg-[#F4FAFF] rounded-2xl border border-[#60C3F2]/30 text-center space-y-3">
          <p className="text-sm text-[#263238]/80 font-medium">
            {t.faq.stillHaveQuestions}
          </p>
          <button
            onClick={() => onOpenOrder()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-xs rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{t.faq.askWhatsApp}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
