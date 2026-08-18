import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Store, 
  ShieldCheck
} from 'lucide-react';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { LandingHeroSection } from './LandingHeroSection';
import { ServicesGridSection } from './ServicesGridSection';
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
  onNavigateToEditorial?: () => void;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({
  flyerData,
  onNavigateToPortfolio,
  onNavigateToCalculator,
  onOpenPdfCatalog,
  onNavigateToEditorial
}) => {
  const mainWhatsAppUrl = getWhatsAppUrl(
    'Hola Anahí y Enzo! Vi la página web de Río Cuarto Web y quisiera pedir asesoramiento y demo para mi negocio.'
  );

  return (
    <div className="space-y-8 pb-8 max-w-6xl mx-auto">

      {/* Pitch Deck Presentation Banner Callout */}
      {onNavigateToEditorial && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pine-deck border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl cursor-pointer hover:border-emerald-400/60 transition text-white"
          onClick={onNavigateToEditorial}
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="text-xs font-black uppercase text-white tracking-wider">
                Nueva Presentación Editorial Pitch Deck
              </p>
              <p className="text-[11px] text-emerald-200/80">
                Visualizá el catálogo en formato diapositivas ejecutivas verde pino con diseño de alta gama.
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToEditorial(); }}
            className="btn-pill-emerald text-xs font-bold shrink-0 min-h-[38px] px-4 cursor-pointer"
          >
            Ver Pitch Deck →
          </button>
        </motion.div>
      )}
      
      {/* 1. Ultra-Clean Hero Section */}
      <LandingHeroSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
        onOpenPdfCatalog={onOpenPdfCatalog}
      />

      {/* 2. Compact 3-Card Services Section */}
      <ServicesGridSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
      />

      {/* 3. Direct High-Converting WhatsApp CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-gradient-to-r from-[#2B0A1A] via-[#3B0E25] to-[#2B0A1A] rounded-3xl p-6 sm:p-8 border-2 border-rose-700/50 text-center space-y-4 shadow-2xl relative overflow-hidden"
      >
        <div className="space-y-1.5 max-w-xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-900/40 text-rose-200 border border-rose-500/40 text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Asesoramiento y Demo Gratuita</span>
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ¿Querés ver una Demo en Vivo de tu Sistema?
          </h3>
          <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
            Escribinos por WhatsApp con <strong className="text-white">Anahí Gilardi & Enzo Girardi</strong> y te mostramos cómo funciona en menos de 5 minutos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="https://wa.me/5493584860640?text=Hola%20Anah%C3%AD!%20Quisiera%20pedir%20asesoramiento%20para%20un%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 min-h-[48px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 uppercase tracking-wider transition transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-800" />
            <span>WhatsApp Anahí (+54 358 486-0640)</span>
          </a>

          <a
            href="https://wa.me/5493584302024?text=Hola%20Enzo!%20Quisiera%20pedir%20asesoramiento%20para%20un%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 min-h-[48px] bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 uppercase tracking-wider transition transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-800" />
            <span>WhatsApp Enzo (+54 358 430-2024)</span>
          </a>

          <button
            onClick={onNavigateToPortfolio}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 min-h-[48px] bg-[#18040B] hover:bg-[#260A17] text-rose-200 font-black text-xs sm:text-sm rounded-xl border border-rose-800/60 transition"
          >
            <Store className="w-4 h-4 text-rose-300" />
            <span>Ver Trabajos</span>
          </button>
        </div>
      </motion.div>

    </div>
  );
};
