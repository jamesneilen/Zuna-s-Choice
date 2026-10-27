export type Language = 'en' | 'fr';

export type PageId = 'home' | 'product' | 'nutrition' | 'story' | 'contact';

export interface ProductInfo {
  name: string;
  subname: string;
  tagline: string;
  priceFcfa: number;
  weightGrams: number;
  ageIndication: string;
  prepTimeMinutes: number;
  origin: string;
  ingredients: string[];
}

export interface FAQItem {
  id: string;
  question: {
    en: string;
    fr: string;
  };
  answer: {
    en: string;
    fr: string;
  };
  category: 'product' | 'preparation' | 'ordering' | 'nutrition';
}

export interface NutritionFact {
  nutrient: {
    en: string;
    fr: string;
  };
  per100g: string;
  per100gFr?: string;
  perServing50g: string;
  perServing50gFr?: string;
  dailyValueNote?: {
    en: string;
    fr: string;
  };
}

export interface WhatsAppOrderDetails {
  quantity: number;
  customerName: string;
  deliveryLocation: string;
  phone: string;
  notes?: string;
}
