import productBox from '../assets/images/zunas_product_box_1793057432923-960.webp';
import motherBaby from '../assets/images/african_mother_baby_1793057433007-960.webp';
import threeGrains from '../assets/images/three_grains_harvest_1793057434040-960.webp';
import cameroonFarms from '../assets/images/cameroon_farm_hills_1793057436210-960.webp';
import cerealBowl from '../assets/images/cereal_bowl_spoon_1793057435599-960.webp';
import { FAQItem, NutritionFact, ProductInfo } from '../types';

export const ASSETS = {
  logo: '/assets/zuna-logo.webp',
  productBox,
  motherBaby,
  threeGrains,
  cameroonFarms,
  cerealBowl,
};

export const PRODUCT_INFO: ProductInfo = {
  name: "Zuna's Choice",
  subname: 'Baby Cereal — Weanimix',
  tagline: 'Little Tummies. Bright Futures.',
  priceFcfa: 1500,
  weightGrams: 250,
  ageIndication: '6+ Months / Mois',
  prepTimeMinutes: 5,
  origin: 'Cameroon',
  ingredients: ['Wheat', 'Soybeans', 'Rice'],
};

export const BUSINESS_CONFIG = {
  whatsappNumber: '237651406400', // Cameroon international format
  displayPhone: '+237 651 406 400',
  email: 'hello@zunaschoice.cm',
  location: 'Douala & Yaoundé, Cameroon',
  productionSite: 'Bafoussam & West Region Agricultural Basin, Cameroon',
  hours: 'Mon – Sat: 8:00 AM – 6:00 PM (WAT)',
  facebookUrl: 'https://facebook.com/zunaschoice',
  instagramUrl: 'https://instagram.com/zunaschoice',
};

export const CAMEROON_CITIES = [
  'Douala (Littoral)',
  'Yaoundé (Centre)',
  'Bafoussam (Ouest)',
  'Bamenda (North-West)',
  'Buea (South-West)',
  'Limbe (South-West)',
  'Kribi (Sud)',
  'Garoua (Nord)',
  'Maroua (Extrême-Nord)',
  'Ngaoundéré (Adamaoua)',
  'Bertoua (Est)',
  'Ebolowa (Sud)',
];

export const INGREDIENTS_DATA = [
  {
    id: 'wheat',
    name: {
      en: 'Locally Sourced Wheat',
      fr: 'Blé Récolté Localement',
    },
    shortRole: {
      en: 'Carbohydrates & Dietary Fibre',
      fr: 'Glucides & Fibres Alimentaires',
    },
    description: {
      en: 'Wheat provides wholesome complex carbohydrates for active crawlers and toddlers, slowly releasing sustaining energy while natural dietary fibre encourages gentle, regular digestion.',
      fr: 'Le blé apporte des glucides complexes sains pour les tout-petits actifs, libérant une énergie durable tandis que les fibres naturelles favorisent une digestion douce et régulière.',
    },
    nutrientHighlight: {
      en: 'Complex Energy & Gentle Digestion',
      fr: 'Énergie Complexe & Confort Digestif',
    },
  },
  {
    id: 'soybeans',
    name: {
      en: 'Wholesome Soybeans',
      fr: 'Soja Entier Naturel',
    },
    shortRole: {
      en: 'Plant-Based Protein & Healthy Fats',
      fr: 'Protéines Végétales & Bons Lipides',
    },
    description: {
      en: 'Carefully roasted and milled soybeans supply complete plant protein essential for growing muscles, alongside healthy polyunsaturated fatty acids that support healthy brain and cognitive development.',
      fr: 'Le soja soigneusement torréfié et moulu fournit des protéines végétales complètes essentielles au développement musculaire et des acides gras bénéfiques pour la croissance cognitive.',
    },
    nutrientHighlight: {
      en: 'Muscle & Cognitive Growth',
      fr: 'Croissance Musculaire & Cérébrale',
    },
  },
  {
    id: 'rice',
    name: {
      en: 'Gentle Wholesome Rice',
      fr: 'Riz Doux & Digestif',
    },
    shortRole: {
      en: 'Easy-to-Digest Daily Energy',
      fr: 'Énergie Quotidienne Facile à Digérer',
    },
    description: {
      en: 'Naturally mild and soothing for sensitive infant tummies, rice delivers easily digestible energy that creates the signature smooth, silky porridge consistency babies love.',
      fr: 'Naturellement doux et apaisant pour les ventres délicats des nourrissons, le riz procure une énergie très digeste et donne à la bouillie sa texture veloutée si appréciée.',
    },
    nutrientHighlight: {
      en: 'Tummy Comfort & Silky Texture',
      fr: 'Douceur Digestive & Onctuosité',
    },
  },
];

export const NUTRITION_TABLE: NutritionFact[] = [
  {
    nutrient: { en: 'Energy / Calories', fr: 'Énergie / Calories' },
    per100g: '395 kcal (1665 kJ)',
    perServing50g: '198 kcal (832 kJ)',
    dailyValueNote: { en: 'Wholesome fuel for growth', fr: 'Énergie saine de croissance' },
  },
  {
    nutrient: { en: 'Total Protein', fr: 'Protéines Totales' },
    per100g: '14.8 g',
    perServing50g: '7.4 g',
    dailyValueNote: { en: 'High biological value from soy & wheat', fr: 'Haute valeur biologique (soja & blé)' },
  },
  {
    nutrient: { en: 'Total Carbohydrates', fr: 'Glucides Totaux' },
    per100g: '68.5 g',
    perServing50g: '34.2 g',
    dailyValueNote: { en: 'Slow-release complex carbs', fr: 'Glucides complexes à diffusion lente' },
  },
  {
    nutrient: { en: 'Of which Natural Sugars', fr: 'Dont Sucres Naturels' },
    per100g: '1.8 g (No added sugar)',
    per100gFr: '1,8 g (Sans sucre ajouté)',
    perServing50g: '0.9 g (No added sugar)',
    perServing50gFr: '0,9 g (Sans sucre ajouté)',
    dailyValueNote: { en: 'Zero refined or added cane sugar', fr: 'Zéro sucre de canne raffiné ou ajouté' },
  },
  {
    nutrient: { en: 'Dietary Fibre', fr: 'Fibres Alimentaires' },
    per100g: '6.2 g',
    perServing50g: '3.1 g',
    dailyValueNote: { en: 'Supports healthy infant gut flora', fr: 'Favorise le microbiote intestinal' },
  },
  {
    nutrient: { en: 'Total Fat', fr: 'Lipides Totaux' },
    per100g: '5.9 g',
    perServing50g: '3.0 g',
    dailyValueNote: { en: 'Healthy plant fats from soybean', fr: 'Acides gras végétaux essentiels' },
  },
  {
    nutrient: { en: 'Calcium', fr: 'Calcium' },
    per100g: '240 mg',
    perServing50g: '120 mg',
    dailyValueNote: { en: 'Strong bones and developing teeth', fr: 'Dents saines et ossature solide' },
  },
  {
    nutrient: { en: 'Iron (Fer)', fr: 'Fer' },
    per100g: '8.5 mg',
    perServing50g: '4.25 mg',
    dailyValueNote: { en: 'Crucial complementary nutrient from 6mo', fr: 'Élément clé de la diversification dès 6 mois' },
  },
  {
    nutrient: { en: 'Micronutrients Fortification', fr: 'Fortification en Micronutriments' },
    per100g: 'See product label',
    per100gFr: 'Consultez l’étiquette du produit',
    perServing50g: '50g comparison portion',
    perServing50gFr: 'Portion de comparaison de 50g',
    dailyValueNote: { en: 'Zinc, Vitamin A, B-Complex, Vitamin C', fr: 'Zinc, Vitamine A, Complexe B, Vitamine C' },
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'ingredients',
    category: 'product',
    question: {
      en: 'What ingredients are used in Zuna\'s Choice?',
      fr: 'Quels ingrédients entrent dans la composition de Zuna\'s Choice ?',
    },
    answer: {
      en: 'Zuna\'s Choice Baby Cereal (Weanimix) is crafted from three wholesome grains: locally sourced wheat, whole roasted soybeans, and milled rice. It is offered in a resealable 250g pouch for 1,500 FCFA.',
      fr: 'La bouillie infantile Zuna\'s Choice (Weanimix) est élaborée à partir de trois céréales nobles : du blé localement sélectionné, du soja entier grillé et du riz moulu. Elle est proposée en sachet refermable de 250g à 1 500 FCFA.',
    },
  },
  {
    id: 'age',
    category: 'product',
    question: {
      en: 'What age is Zuna\'s Choice intended for?',
      fr: 'À quel âge Zuna\'s Choice est-il destiné ?',
    },
    answer: {
      en: 'Zuna\'s Choice is clearly formulated for babies aged 6+ Months (6 mois et plus). At six months, infants begin their complementary feeding journey alongside continued breastfeeding or infant formula.',
      fr: 'Zuna\'s Choice est spécifiquement indiqué pour les nourrissons dès 6 mois (6+ Months / Mois). À cet âge, la diversification alimentaire commence en accompagnement de l\'allaitement maternel ou du lait infantile.',
    },
  },
  {
    id: 'price',
    category: 'ordering',
    question: {
      en: 'How much does a pack cost?',
      fr: 'Combien coûte un paquet ?',
    },
    answer: {
      en: 'A 250g pack of Zuna\'s Choice Baby Cereal costs 1,500 FCFA. Our core mission is keeping premium, high-quality complementary infant nutrition affordable for every family in Cameroon.',
      fr: 'Un paquet de 250g de céréales Zuna\'s Choice coûte 1 500 FCFA. Notre engagement est de maintenir une nutrition infantile saine et de haute qualité accessible à toutes les familles du Cameroun.',
    },
  },
  {
    id: 'prep',
    category: 'preparation',
    question: {
      en: 'How do I prepare Zuna\'s Choice?',
      fr: 'Comment préparer Zuna\'s Choice ?',
    },
    answer: {
      en: 'Preparation takes approximately 5 minutes! 1) Wash hands and ensure all utensils are sterile. 2) Mix the cereal with clean drinking water or safe boiled water in a clean pot according to your desired texture. 3) Gently simmer for about 5 minutes while stirring continuously. 4) Allow the porridge to cool to a safe lukewarm temperature before gently spoon-feeding your baby.',
      fr: 'La préparation ne prend qu\'environ 5 minutes ! 1) Lavez-vous soigneusement les mains et utilisez des ustensiles propres. 2) Délayez la farine avec de l\'eau potable propre ou bouillie dans une casserole selon la consistance désirée. 3) Laissez mijoter à feu doux environ 5 minutes en remuant régulièrement. 4) Laissez tiédir à température sécuritaire avant de servir à la petite cuillère.',
    },
  },
  {
    id: 'purchase',
    category: 'ordering',
    question: {
      en: 'Where can I purchase Zuna\'s Choice?',
      fr: 'Où puis-je acheter Zuna\'s Choice ?',
    },
    answer: {
      en: 'You can order directly via our official WhatsApp system right here on the website for fast home delivery across Douala, Yaoundé, Bafoussam, and other major Cameroonian cities. We are also expanding into community pharmacies, baby boutiques, and partner grocery stores.',
      fr: 'Vous pouvez commander directement via notre service WhatsApp officiel sur ce site web avec livraison rapide à domicile à Douala, Yaoundé, Bafoussam et dans les principales villes du Cameroun. Nous sommes également présents dans un réseau grandissant de pharmacies partenaires et boutiques de puériculture.',
    },
  },
  {
    id: 'storage',
    category: 'preparation',
    question: {
      en: 'How should I store Zuna\'s Choice?',
      fr: 'Comment conserver le paquet après ouverture ?',
    },
    answer: {
      en: 'Store the pouch in a cool, clean, dry place away from direct sunlight. Reseal it after use and follow the storage instructions and expiry date printed on the packaging.',
      fr: 'Conservez le sachet dans un endroit frais, propre et sec, à l’abri du soleil. Refermez-le après utilisation et respectez les instructions de conservation et la date de péremption indiquées sur l’emballage.',
    },
  },
  {
    id: 'whatsapp',
    category: 'ordering',
    question: {
      en: 'Can I order through WhatsApp?',
      fr: 'Puis-je commander directement via WhatsApp ?',
    },
    answer: {
      en: 'Yes! Simply click any "Order via WhatsApp" button on this site. Select your quantity, enter your name and city, and our system will generate a pre-formatted message. Our team will promptly confirm availability, delivery fee, and payment (e.g., Orange Money, MTN MoMo, or cash on delivery).',
      fr: 'Absolument ! Cliquez simplement sur le bouton "Commander via WhatsApp". Choisissez votre quantité, indiquez votre nom et ville de livraison. Notre équipe vous répond immédiatement pour confirmer la commande, les frais de livraison et les modalités de paiement (Orange Money, MTN MoMo ou à la livraison).',
    },
  },
  {
    id: 'origin',
    category: 'product',
    question: {
      en: 'Is Zuna\'s Choice made in Cameroon?',
      fr: 'Zuna\'s Choice est-il fabriqué au Cameroun ?',
    },
    answer: {
      en: 'Yes! Zuna\'s Choice is proudly Cameroonian. We source our wheat, soybeans, and rice directly from Cameroonian agricultural cooperatives, supporting smallholder farming families while maintaining strict hygiene and quality manufacturing standards.',
      fr: 'Oui, avec fierté ! Zuna\'s Choice est une marque 100% camerounaise. Nos céréales et légumineuses sont achetées auprès de coopératives agricoles camerounaises, valorisant le travail des agriculteurs locaux tout en respectant des normes d\'hygiène rigoureuses.',
    },
  },
];
