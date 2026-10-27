import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  onOpenOrder: () => void;
  language: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenOrder, language }) => {
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 z-40 hidden sm:flex items-center gap-2 group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block px-3 py-1.5 bg-[#263238] text-white text-xs font-bold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {language === 'fr' ? 'Commander sur WhatsApp (1 500 FCFA)' : 'Order via WhatsApp (1,500 FCFA)'}
      </span>

      <button
        onClick={onOpenOrder}
        aria-label={language === 'fr' ? 'Commander Zuna’s Choice sur WhatsApp' : "Order Zuna's Choice via WhatsApp"}
        className="relative w-14 h-14 rounded-full bg-[#087C21] hover:bg-[#06611a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-hidden"
      >
        {/* Gentle radar ring */}
        <span className="hidden sm:block absolute -inset-1 rounded-full bg-[#087C21]/30 animate-ping -z-10" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
