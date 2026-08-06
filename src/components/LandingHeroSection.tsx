import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Code2
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
    'Hola Anahí y Enzo! Vi la web de Tu Sitio Web Río Cuarto y me gustaría pedir presupuesto y demo para mi negocio.'
  );

  return (
    <div className="relative space-y-6 py-4 sm:py-6 max-w-4xl mx-auto">
      
      {/* Vibrant Neon Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-rose-600/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Compact Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        
        {/* Neon Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-amber-300 border border-amber-500/40 shadow-lg text-[11px] font-black uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>RÍO CUARTO WEB • DISEÑO DIGITAL A MEDIDA</span>
        </motion.div>

        {/* Punchy Neon Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase"
        >
          Río Cuarto Web <span className="text-cyan-400">Diseño Digital</span>{' '}
          <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-md">
            a Medida
          </span>
        </motion.h1>

        {/* Micro Subtitle (1 Short Line) */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-rose-100/90 max-w-xl mx-auto font-bold leading-snug"
        >
          ⚡ Caja ultrarrápida • 🧾 Factura ARCA (ex AFIP) • 📱 Control de Stock en Celular.
        </motion.p>

        {/* 3 Ultra-Vibrant Micro-Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {[
            { text: 'Cero Comisiones por Venta', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
            { text: 'Facturación ARCA Oficial', color: 'bg-amber-950/80 text-amber-300 border-amber-500/40' },
            { text: 'Soporte Directo de Programadores', color: 'bg-rose-950/80 text-rose-200 border-rose-500/40' }
          ].map((pill, i) => (
            <span key={i} className={`px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase tracking-wide flex items-center space-x-1.5 shadow-md ${pill.color}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{pill.text}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={mainWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-7 min-h-[48px] rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-950/70 border border-emerald-300/40 transition transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-800" />
            <span>Hablar por WhatsApp ({OFFICIAL_PHONE_FORMATTED})</span>
          </a>

          <button
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 min-h-[48px] rounded-xl bg-[#18040B] hover:bg-rose-900/80 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider border border-amber-500/40 transition shadow-lg"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Cotizar en 1 Minuto</span>
          </button>
        </div>

      </div>

    </div>
  );
};
