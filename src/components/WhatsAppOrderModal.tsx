import { useDialog } from '../hooks/useDialog';
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ASSETS, BUSINESS_CONFIG, CAMEROON_CITIES, PRODUCT_INFO } from '../data/productData';
import { X, MessageCircle, Copy, Check, Plus, Minus, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
  language: Language;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  initialQuantity = 2,
  language,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const dialogRef = useDialog(isOpen);

  const t = translations[language].orderModal;

  useEffect(() => {
    if (isOpen) {
      setValidationError(false);
      setCopyError(false);
      setCopied(false);
    }
    if (initialQuantity > 0) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity, isOpen]);

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

  const subtotal = quantity * PRODUCT_INFO.priceFcfa;
  const formattedSubtotal = `${subtotal.toLocaleString()} FCFA`;

  // Construct message based on user specifications and active language
  const generatedMessage = language === 'fr'
    ? `Bonjour Zuna's Choice !

Je souhaite passer une commande.

Produit : ${PRODUCT_INFO.name} Céréales infantiles — Weanimix (${PRODUCT_INFO.weightGrams}g)
Quantité : ${quantity} paquet${quantity > 1 ? 's' : ''}
Sous-total : ${formattedSubtotal}
Nom du client : ${customerName.trim() || '[Non précisé]'}
Lieu de livraison : ${deliveryLocation.trim() || '[À préciser]'}
${phone.trim() ? `Téléphone : ${phone.trim()}\n` : ''}${notes.trim() ? `Instructions : ${notes.trim()}\n` : ''}
Merci de confirmer la disponibilité, les frais de livraison et les modalités de paiement.

Merci beaucoup !`
    : `Hello Zuna's Choice!

I would like to place an order.

Product: ${PRODUCT_INFO.name} ${PRODUCT_INFO.subname} (${PRODUCT_INFO.weightGrams}g)
Quantity: ${quantity} pack${quantity > 1 ? 's' : ''}
Subtotal: ${formattedSubtotal}
Name: ${customerName.trim() || '[Not specified]'}
Delivery Location: ${deliveryLocation.trim() || '[To be specified]'}
${phone.trim() ? `Phone: ${phone.trim()}\n` : ''}${notes.trim() ? `Notes: ${notes.trim()}\n` : ''}
Please confirm availability, delivery charges and payment options.

Thank you!`;

  const handleLaunchWhatsApp = () => {
    if (!customerName.trim() || !deliveryLocation.trim()) {
      setValidationError(true);
      dialogRef.current?.querySelector<HTMLInputElement>(!customerName.trim() ? '#field-WhatsAppOrderModal-1' : '#field-WhatsAppOrderModal-2')?.focus();
      return;
    }
    setValidationError(false);
    const encodedText = encodeURIComponent(generatedMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    setCopyError(false);
    setCopied(false);
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

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
        aria-labelledby="WhatsAppOrderModal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#263238]/80 hover:text-[#810778] hover:bg-[#EAF8FF] transition-colors"
          aria-label={language === 'fr' ? 'Fermer la commande' : 'Close Modal'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF8FF] rounded-full text-xs font-bold text-[#087C21]">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Commande WhatsApp' : 'WhatsApp Order'}</span>
            </div>
            <img
              src={ASSETS.logo}
              alt="Zuna's Choice"
              className="h-8 w-auto object-contain"
            />
          </div>
          <h3 id="WhatsAppOrderModal-title" className="font-display font-extrabold text-2xl text-[#810778] tracking-tight">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#263238]/80 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Product Summary & Quantity Selector */}
        <div className="p-4 bg-[#F4FAFF] rounded-2xl border border-[#EAF8FF] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-base text-[#263238]">
                {PRODUCT_INFO.name} — {language === 'fr' ? 'Céréales infantiles — Weanimix' : PRODUCT_INFO.subname}
              </p>
              <p className="text-xs text-[#263238]/70">
                {PRODUCT_INFO.weightGrams}g · {t.pricePerPack}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-[#60C3F2]/20 text-[#006688] rounded-full">
              {language === 'fr' ? '6+ Mois' : '6+ Months'}
            </span>
          </div>

          {/* Stepper & Total */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 items-center pt-2 border-t border-[#EAF8FF]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#263238]">
                {t.quantity}
              </span>
              <div className="flex items-center bg-white rounded-full border border-[#60C3F2]/40 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#EAF8FF] text-[#810778] transition-colors"
                  aria-label={language === 'fr' ? 'Réduire la quantité' : 'Decrease Quantity'}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-display font-extrabold text-sm text-[#263238]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#EAF8FF] text-[#810778] transition-colors"
                  aria-label={language === 'fr' ? 'Augmenter la quantité' : 'Increase Quantity'}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-left min-[400px]:text-right">
              <span className="block text-[11px] font-semibold text-[#263238]/70">
                {t.subtotal}
              </span>
              <span className="font-display font-extrabold text-xl text-[#087C21] whitespace-nowrap">
                {formattedSubtotal}
              </span>
            </div>
          </div>
        </div>

        {validationError && (
          <p id="order-validation" role="alert" className="text-sm text-red-800">
            {language === 'fr' ? 'Indiquez votre nom et le lieu de livraison avant de continuer.' : 'Enter your name and delivery location before continuing.'}
          </p>
        )}
        {/* Customer Details Form */}
        <div className="space-y-3.5">
          <div>
            <label htmlFor="field-WhatsAppOrderModal-1" className="block text-xs font-bold text-[#263238] mb-1">
              {t.nameLabel}
            </label>
            <input id="field-WhatsAppOrderModal-1" required aria-invalid={validationError && !customerName.trim()} aria-describedby={validationError ? "order-validation" : undefined}
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
            />
          </div>

          <div>
            <label htmlFor="field-WhatsAppOrderModal-2" className="block text-xs font-bold text-[#263238] mb-1">
              {t.locationLabel}
            </label>
            <input id="field-WhatsAppOrderModal-2" required aria-invalid={validationError && !deliveryLocation.trim()} aria-describedby={validationError ? "order-validation" : undefined}
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder={t.locationPlaceholder}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
            />
            {/* Quick City Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {CAMEROON_CITIES.slice(0, 5).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDeliveryLocation(city)}
                  className="text-[11px] px-2.5 py-1 bg-[#EAF8FF] hover:bg-[#60C3F2]/30 text-[#006688] font-semibold rounded-full transition-colors cursor-pointer"
                >
                  {city.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="field-WhatsAppOrderModal-3" className="block text-xs font-bold text-[#263238] mb-1">
                {t.phoneLabel}
              </label>
              <input id="field-WhatsAppOrderModal-3"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="field-WhatsAppOrderModal-4" className="block text-xs font-bold text-[#263238] mb-1">
                {t.notesLabel}
              </label>
              <input id="field-WhatsAppOrderModal-4"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#bec8cf]/60 text-sm focus:outline-hidden focus:border-[#60C3F2] focus:ring-2 focus:ring-[#60C3F2]/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Message Preview Accordion */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#263238]">
            <span>{t.whatsappPreview}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[#810778] hover:text-[#087C21] transition-colors cursor-pointer font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#087C21]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyBtn}</span>
            </button>
          </div>
          {copyError && (
            <p role="alert" className="text-xs text-red-700">
              {language === 'fr' ? 'Copie impossible. Sélectionnez et copiez le message ci-dessous.' : 'Unable to copy. Select and copy the message below.'}
            </p>
          )}
          <pre tabIndex={0} aria-label={t.whatsappPreview} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
            {generatedMessage}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleLaunchWhatsApp}
            className="w-full py-3.5 px-6 bg-[#087C21] hover:bg-[#06611a] text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{t.orderBtn}</span>
          </button>

          <p className="text-[11px] text-[#263238]/80 text-center leading-relaxed">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
