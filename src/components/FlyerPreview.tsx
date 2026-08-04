import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MessageCircle, 
  Store, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { companyMetrics, beforeAfterComparison } from '../data/portfolioData';
import { LandingHeroSection } from './LandingHeroSection';
import { ServicesGridSection } from './ServicesGridSection';
import { RoiCalculatorSection } from './RoiCalculatorSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqAccordionSection } from './FaqAccordionSection';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface FlyerPreviewProps {
  flyerData: FlyerData;
  theme: FlyerTheme;
  setTheme: (theme: FlyerTheme) => void;
  format: FlyerFormat;
  setFormat: (format: FlyerFormat) => void;
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
  onOpenPdfCatalog?: () => void;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({
  flyerData,
  onNavigateToPortfolio,
  onNavigateToCalculator,
  onOpenPdfCatalog
}) => {
  const mainWhatsAppUrl = getWhatsAppUrl(
    'Hola Anahí y Enzo! Vi su página web de Tu Sitio Web Río Cuarto y quisiera consultar por un desarrollo para mi negocio.'
  );

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. Ultra-Premium Landing Hero Section */}
      <LandingHeroSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
        onOpenPdfCatalog={onOpenPdfCatalog}
      />

      {/* 2. Metrics & Proof Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
      >
        {companyMetrics.map((metric, i) => (
          <div 
            key={i} 
            className="bg-[#240A15]/90 border border-rose-900/40 rounded-2xl p-4 text-center space-y-1 shadow-xl hover:border-rose-500/50 transition group"
          >
            <div className="text-xl sm:text-3xl font-black text-white group-hover:text-rose-300 transition">
              {metric.value}
            </div>
            <div className="text-xs font-bold text-rose-300 uppercase tracking-wide">
              {metric.label}
            </div>
            <div className="text-[11px] text-rose-200/60 leading-tight">
              {metric.subtext}
            </div>
          </div>
        ))}
      </motion.div>

      {/* 3. Services & Solutions Grid Section */}
      <ServicesGridSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
      />

      {/* 4. Before vs After Comparison Table Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
      >
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-900/30 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-rose-300" />
            <span>Transformá la Gestión de tu Negocio</span>
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ¿Cómo cambia tu negocio con nuestro software?
          </h3>
          <p className="text-xs sm:text-sm text-rose-200/70 font-medium">
            Compará el funcionamiento tradicional contra un sistema 100% automatizado por Anahí Gilardi & Enzo Girardi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beforeAfterComparison.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#18040B] border border-rose-900/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="font-extrabold text-sm text-white border-b border-rose-900/30 pb-2 flex items-center justify-between">
                <span>{item.feature}</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start space-x-2 text-rose-300/80 bg-red-950/40 p-2.5 rounded-xl border border-red-900/40">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-300 block mb-0.5">Sin Sistema:</span>
                    {item.withoutSystem}
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-emerald-200 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 block mb-0.5">Con Tu Sitio Web Río Cuarto:</span>
                    {item.withSystem}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 5. Interactive ROI Calculator */}
      <RoiCalculatorSection phone={flyerData.phone} />

      {/* 6. Social Proof / Testimonials Section */}
      <TestimonialsSection phone={flyerData.phone} />

      {/* 7. FAQ Accordion Section */}
      <FaqAccordionSection phone={flyerData.phone} />

      {/* 8. Final Conversion CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#2B0A1A] via-[#3B0E25] to-[#2B0A1A] rounded-3xl p-8 sm:p-10 border-2 border-rose-700/50 text-center space-y-5 shadow-2xl relative overflow-hidden"
      >
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-900/40 text-rose-200 border border-rose-500/40 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Asesoramiento y Demo Gratuita Sin Compromiso</span>
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ¿Listo para automatizar las ventas de tu negocio?
          </h3>
          <p className="text-xs sm:text-base text-rose-200/80 font-medium">
            Contactate hoy mismo con Anahí Gilardi & Enzo Girardi. Te asesoramos sin cargo y armamos la mejor propuesta para tu empresa.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={mainWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 min-h-[50px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 uppercase tracking-wider transition transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-800" />
            <span>Pedir Asesoramiento por WhatsApp</span>
          </a>

          <button
            onClick={onNavigateToPortfolio}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 min-h-[50px] bg-[#18040B] hover:bg-[#260A17] text-rose-200 font-extrabold text-sm rounded-2xl border border-rose-800/60 transition"
          >
            <Store className="w-5 h-5 text-rose-300" />
            <span>Ver Portafolio de Trabajos</span>
          </button>
        </div>
      </motion.div>

    </div>
  );
};
