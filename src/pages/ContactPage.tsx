import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { BUSINESS_CONFIG } from '../data/productData';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Phone,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const t = translations[language].contactPage;
  const commonT = translations[language];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<keyof typeof t.inquiryTypes>('product');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const resultRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSubmitted) {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(
        language === 'fr'
          ? 'Veuillez renseigner votre nom, email et message.'
          : 'Please fill in your name, email, and message.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage(
        language === 'fr'
          ? 'Veuillez saisir une adresse email valide (ex. nom@domaine.cm).'
          : 'Please enter a valid email address (e.g. name@domain.cm).'
      );
      return;
    }

    const normalizedPhone = phone.trim();
    if (!/^[+\d\s().-]+$/.test(normalizedPhone) || normalizedPhone.replace(/\D/g, '').length < 7 || normalizedPhone.replace(/\D/g, '').length > 15) {
      setErrorMessage(language === 'fr' ? 'Saisissez un numéro de téléphone valide (7 à 15 chiffres).' : 'Enter a valid phone number (7–15 digits).');
      document.getElementById('field-ContactPage-3')?.focus();
      return;
    }
    setPhone(normalizedPhone);
    setIsSubmitted(true);
  };

  const handleForwardToWhatsApp = () => {
    const text = language === 'fr'
      ? `Bonjour Zuna's Choice !

Message de contact :
Nom : ${fullName}
Email : ${email}
Téléphone : ${phone || 'N/A'}
Type de demande : ${t.inquiryTypes[inquiryType]}
Message :
${message}`
      : `Hello Zuna's Choice!

Contact Inquiry:
Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
Inquiry Type: ${t.inquiryTypes[inquiryType]}
Message:
${message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 space-y-8 md:space-y-16">
      {/* Breadcrumb */}
      <nav aria-label={language === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="flex items-center gap-2 text-xs font-bold text-[#263238]/80">
        <span>{commonT.nav.home}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#810778]">{commonT.nav.contact}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#087C21] uppercase tracking-wider">
          {language === 'fr' ? 'Service client et partenariats' : 'Customer Care & Partnerships'}
        </span>
        <h1 tabIndex={-1} className="font-display font-extrabold text-3xl sm:text-5xl text-[#810778] tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-[#263238]/85 font-normal">
          {t.heroSubtitle}
        </p>
      </div>

      <div className="contact-layout grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-3xl border border-[#EAF8FF] shadow-lg">
          {isSubmitted ? (
            <div className="p-8 text-center space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#087C21]/10 text-[#087C21] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 ref={resultRef} tabIndex={-1} className="font-display font-extrabold text-2xl text-[#263238]">
                {t.successTitle}
              </h2>
              <p className="text-sm text-[#263238]/80 leading-relaxed max-w-md mx-auto">
                {t.successDesc}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleForwardToWhatsApp}
                  className="px-6 py-3 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-xs rounded-full shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.sendWhatsAppDirect}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    requestAnimationFrame(() => nameRef.current?.focus());
                  }}
                  className="px-5 py-3 text-xs font-bold text-[#810778] hover:bg-[#EAF8FF] rounded-full transition-colors cursor-pointer"
                >
                  {language === 'fr' ? 'Modifier le message' : 'Edit message'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#263238] pb-2 border-b border-[#EAF8FF]">
                {t.formTitle}
              </h2>

              {errorMessage && (
                <div role="alert" className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-ContactPage-1" className="block text-xs font-bold text-[#263238] mb-1">
                    {t.fullName}
                  </label>
                  <input ref={nameRef} id="field-ContactPage-1"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-ContactPage-2" className="block text-xs font-bold text-[#263238] mb-1">
                    {t.email}
                  </label>
                  <input id="field-ContactPage-2"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-ContactPage-3" className="block text-xs font-bold text-[#263238] mb-1">
                    {t.phone}
                  </label>
                  <input id="field-ContactPage-3"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-ContactPage-4" className="block text-xs font-bold text-[#263238] mb-1">
                    {t.inquiryType}
                  </label>
                  <select id="field-ContactPage-4"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as keyof typeof t.inquiryTypes)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
                  >
                    <option value="product">{t.inquiryTypes.product}</option>
                    <option value="order">{t.inquiryTypes.order}</option>
                    <option value="distribution">{t.inquiryTypes.distribution}</option>
                    <option value="partnership">{t.inquiryTypes.partnership}</option>
                    <option value="general">{t.inquiryTypes.general}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="field-ContactPage-5" className="block text-xs font-bold text-[#263238] mb-1">
                  {t.message}
                </label>
                <textarea id="field-ContactPage-5"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#087C21] hover:bg-[#06611a] disabled:opacity-60 text-white font-extrabold text-sm rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.sendBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Hours */}
        <div className="contact-channels lg:col-span-5 space-y-6">
          <div className="bg-[#EAF8FF] p-8 rounded-3xl border border-[#60C3F2]/40 space-y-6">
            <h3 className="font-display font-extrabold text-xl text-[#810778]">
              {t.directContactTitle}
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#087C21] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263238]/70">
                    {t.whatsappLabel}
                  </span>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-11 font-bold text-base text-[#087C21] hover:underline"
                  >
                    {BUSINESS_CONFIG.displayPhone}
                  </a>
                  <p className="text-xs text-[#263238]/80 mt-0.5">
                    {language === 'fr' ? 'Contactez notre équipe sur WhatsApp' : 'Contact our team on WhatsApp'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#60C3F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263238]/70">
                    {t.emailLabel}
                  </span>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="inline-flex items-center min-h-11 font-bold text-sm text-[#263238] hover:text-[#087C21]"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A14C00] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263238]/70">
                    {t.locationLabel}
                  </span>
                  <p className="font-bold text-sm text-[#263238]">
                    {BUSINESS_CONFIG.location}
                  </p>
                  <p className="text-xs text-[#263238]/80">
                    {language === 'fr' ? 'Production et mouture :' : 'Production & Milling:'} {BUSINESS_CONFIG.productionSite}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#810778] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263238]/70">
                    {t.hoursLabel}
                  </span>
                  <p className="font-bold text-xs text-[#263238]">
                    {language === 'fr' ? 'Lun – Sam : 8 h – 18 h (WAT)' : BUSINESS_CONFIG.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
