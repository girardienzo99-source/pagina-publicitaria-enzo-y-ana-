export type FlyerTheme = 
  | 'ruby-red'
  | 'red-gold'
  | 'red-light'
  | 'dark-gold' 
  | 'neon-tech' 
  | 'clean-corporate' 
  | 'gastronomy-warm' 
  | 'modern-emerald';

export type FlyerFormat = 
  | 'poster-story' 
  | 'square-post' 
  | 'horizontal-banner' 
  | 'business-card';

export interface FlyerData {
  developerName: string;
  role: string;
  hookTitle: string;
  slogan: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  location: string;
  whatsappMessage: string;
  mainServices: string[];
  keyBenefits: string[];
  promoBadge: string;
  guaranteeText: string;
  qrUrl: string;
  callToAction: string;
}

export interface SystemModule {
  id: string;
  title: string;
  rubro: 'gastronomia' | 'indumentaria' | 'saas-multirrubro' | 'servicios' | 'salud-estetica' | 'ferreteria-taller' | 'super-almacen';
  subtitle: string;
  description: string;
  badge: string;
  features: string[];
  clientExample?: string;
  imageUrl?: string;
  screenshots?: string[];
  colorScheme: string;
  mockUI: {
    type: 'resto' | 'ecommerce' | 'saas' | 'pos';
    metrics?: { label: string; value: string; color: string }[];
    items?: { id: string; name: string; category?: string; price: string; status: string; tag?: string }[];
    tables?: { id: number; name: string; status: 'libre' | 'ocupada'; waiter?: string }[];
  };
}

export interface QuoteFeature {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  iconName: string;
}

export interface IndustryOption {
  id: string;
  name: string;
  icon: string;
  recommendedFeatures: string[];
}
