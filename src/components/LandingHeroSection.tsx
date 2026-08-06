import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Utensils, 
  ShoppingBag, 
  FileCheck, 
  Calendar, 
  Zap,
  Code2,
  PhoneCall
} from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface LandingHeroSectionProps {
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
  onOpenPdfCatalog?: () => void;
}

export const LandingHeroSection: React.FC<LandingHeroSectionProps> = ({
  onNavigateToPortfolio,
  onNavigateToCalculator,
  onOpenPdfCatalog
}) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'resto' | 'arca' | 'ropa' | 'salud'>('resto');

  const mainWhatsAppUrl = getWhatsAppUrl(
    'Hola Anahí y Enzo! Vi la web de Tu Sitio Web Río Cuarto y me gustaría pedir presupuesto y demo para mi negocio.'
  );

  return (
    <div className="relative space-y-8 py-4 sm:py-6">
      
      {/* Vibrant Neon Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-rose-600/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Compact Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        
        {/* Neon Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-amber-300 border border-amber-500/40 shadow-lg text-[11px] font-black uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Sistemas Web & Software • Anahí Gilardi & Enzo Girardi</span>
        </motion.div>

        {/* Punchy Neon Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase"
        >
          Sistemas Web & Software a Medida{' '}
          <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-md">
            para tu Negocio
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

      {/* Interactive Compact Software Stage */}
      <div className="bg-[#240A15]/95 border-2 border-rose-700/40 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Stage Selector Tabs */}
        <div className="flex items-center justify-between border-b border-rose-900/40 pb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-black uppercase text-white tracking-wider">
              Demostración Interactiva en Vivo:
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 w-full sm:w-auto">
            {[
              { id: 'resto', label: 'Resto & Bar', icon: Utensils },
              { id: 'arca', label: 'Factura ARCA', icon: FileCheck },
              { id: 'ropa', label: 'Ropa & Stock', icon: ShoppingBag },
              { id: 'salud', label: 'Agenda Turnos', icon: Calendar }
            ].map(t => {
              const IconComp = t.icon;
              const isActive = activeDemoTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveDemoTab(t.id as any)}
                  className={`py-1.5 px-2.5 rounded-xl text-[11px] font-black flex items-center justify-center space-x-1.5 border transition ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-700 to-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-[#18040B] text-rose-200/70 border-rose-900/40 hover:text-white'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Content */}
        <div className="bg-[#18040B] p-4 sm:p-5 rounded-2xl border border-rose-900/30">
          {activeDemoTab === 'resto' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/20 pb-2">
                <span className="text-xs font-black text-amber-300 uppercase">Módulo Gastronómico & Mozos</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ● 3 Mesas Activas
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                Mozos toman pedidos en celulares o tablets y las comandas se imprimen automáticamente en cocina en 1 segundo.
              </p>
            </div>
          )}

          {activeDemoTab === 'arca' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/20 pb-2">
                <span className="text-xs font-black text-emerald-300 uppercase">Facturación Electrónica ARCA (ex AFIP)</span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Comprobante A, B y C
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                Emití facturas legales con CAE oficial y QR en 2 segundos desde tu caja sin ingresar a la web de la AFIP.
              </p>
            </div>
          )}

          {activeDemoTab === 'ropa' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/20 pb-2">
                <span className="text-xs font-black text-rose-300 uppercase">Stock Indumentaria por Talles y Colores</span>
                <span className="text-[10px] font-bold text-rose-200 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Lector Código Barras
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                Controlá tus variantes (S al XXL), lecturas con pistola de código de barras y avisos de falta de prendas.
              </p>
            </div>
          )}

          {activeDemoTab === 'salud' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-900/20 pb-2">
                <span className="text-xs font-black text-cyan-300 uppercase">Agenda de Turnos & Recordatorios WhatsApp</span>
                <span className="text-[10px] font-bold text-cyan-200 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Envío Automático
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                Organizá turnos de profesionales y enviá avisos por WhatsApp para reducir ausencias de pacientes.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
