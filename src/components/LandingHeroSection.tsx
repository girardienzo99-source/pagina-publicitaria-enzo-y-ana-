import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Check
} from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface LandingHeroSectionProps {
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
  onOpenPdfCatalog?: () => void;
}

export const LandingHeroSection: React.FC<LandingHeroSectionProps> = ({
  onNavigateToCalculator
}) => {
  const mainWhatsAppUrl = getWhatsAppUrl(
    'Hola Anahí y Enzo! Vi la web de Río Cuarto Web y me gustaría pedir presupuesto y demo para mi negocio.'
  );

  return (
    <div className="relative space-y-6 py-6 max-w-4xl mx-auto font-montserrat text-[#1e1b1b]">
      
      {/* Main Compact Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        
        {/* Sage Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4a5d4a]" />
          <span>RÍO CUARTO WEB • DISEÑO DIGITAL A MEDIDA</span>
        </motion.div>

        {/* Punchy Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-[#1e1b1b] tracking-tight leading-tight"
        >
          Río Cuarto Web <br />
          <span className="text-[#4a5d4a] italic font-normal">Diseño Digital a Medida</span>
        </motion.h1>

        {/* Micro Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm sm:text-base text-[#1e1b1b]/70 max-w-xl mx-auto font-light leading-relaxed"
        >
          Caja ultrarrápida • Facturación ARCA (ex AFIP) • Control de Stock en Celular.
        </motion.p>

        {/* 3 Micro-Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {[
            'Cero Comisiones por Venta',
            'Facturación ARCA Oficial',
            'Soporte Directo de Programadores'
          ].map((pill, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white border border-stone-300 text-[11px] font-semibold uppercase tracking-wide flex items-center space-x-1.5 shadow-sm text-[#1e1b1b]">
              <Check className="w-3.5 h-3.5 text-[#4a5d4a]" />
              <span>{pill}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <a
            href={mainWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Hablar por WhatsApp ({OFFICIAL_PHONE_FORMATTED})</span>
          </a>

          <button
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-sm bg-white hover:bg-stone-50 text-[#1e1b1b] font-bold text-xs uppercase tracking-wider border border-stone-300 shadow-sm transition cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#4a5d4a]" />
            <span>Cotizar en 1 Minuto</span>
          </button>
        </div>

      </div>

    </div>
  );
};
