import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Monitor, 
  Utensils, 
  ShoppingBag, 
  FileCheck, 
  Calendar, 
  ShieldCheck, 
  Smartphone,
  Zap,
  ChevronRight,
  Code2
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
    <div className="relative space-y-12 py-6 sm:py-10">
      
      {/* Glow Effects Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-rose-600/15 via-rose-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-950/70 text-rose-200 border border-rose-700/50 shadow-lg shadow-rose-950/50 backdrop-blur-md text-xs font-black uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Páginas Web & Software a Medida • Río Cuarto & Córdoba</span>
        </motion.div>

        {/* Giant High-Impact Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase"
        >
          Multiplicá las ventas de tu negocio con un{' '}
          <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
            Sitio Web o Sistema a Medida
          </span>
        </motion.h1>

        {/* Subheadline Copy */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-sm sm:text-lg md:text-xl text-rose-100/80 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Diseñamos tu página web, tienda online y programas de gestión que automatizan tu caja, eliminan errores y facturan en <strong className="text-white font-extrabold underline decoration-rose-500/50">ARCA (ex AFIP)</strong> de forma automática.
        </motion.p>

        {/* Primary Call To Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <a
            href={mainWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden w-full sm:w-auto flex items-center justify-center space-x-3 px-8 min-h-[52px] rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-emerald-950/70 border border-emerald-300/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-75" />
              <MessageCircle className="relative w-5 h-5 fill-white text-emerald-800" />
            </div>
            <span>Consultar por WhatsApp ({OFFICIAL_PHONE_FORMATTED})</span>
          </a>

          <button
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 min-h-[52px] rounded-2xl bg-[#240A15] hover:bg-[#330C1E] text-rose-200 border border-rose-800/60 font-extrabold text-sm transition shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-rose-300" />
            <span>Cotizar mi Proyecto en 1 Minuto</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        </motion.div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-semibold text-rose-200/70">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Desarrollo directo por Anahí Gilardi & Enzo Girardi</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Sin comisiones por venta ni mensualidades fijas obligatorias</span>
          </span>
        </div>

      </div>

      {/* Interactive Live Software Window Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#1C050E]/95 border-2 border-rose-900/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* Window Top Navigation Bar */}
        <div className="bg-[#2B0B19] border-b border-rose-900/40 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono font-bold text-rose-200/70 bg-[#16040B] px-3 py-1 rounded-lg border border-rose-900/40">
              Demo Interactiva de Sistemas • Tu Sitio Web Río Cuarto
            </span>
          </div>

          {/* Interactive Demo Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'resto', label: 'Resto & Comandas', icon: Utensils },
              { id: 'arca', label: 'Facturación ARCA', icon: FileCheck },
              { id: 'ropa', label: 'Indumentaria & Stock', icon: ShoppingBag },
              { id: 'salud', label: 'Salud & Turnos', icon: Calendar }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeDemoTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDemoTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition border min-h-[38px] ${
                    isActive
                      ? 'bg-rose-900 text-white border-rose-500 shadow-md shadow-rose-950'
                      : 'bg-[#18040B]/80 text-rose-300/70 border-rose-900/40 hover:text-white hover:bg-rose-950'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Demo Content Stage */}
        <div className="p-5 sm:p-8 bg-gradient-to-b from-[#1C050E] to-[#120308] min-h-[320px] flex flex-col justify-between">
          
          {activeDemoTab === 'resto' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                    <Utensils className="w-5 h-5 text-rose-400" />
                    <span>Sistema de Gestión Gastronómica "El Patrón"</span>
                  </h3>
                  <p className="text-xs text-rose-200/70">Comandas en mesas, mozos en turno e impresión en cocina/barra.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-black">
                  🟢 3 Mesas Ocupadas • 8 Comandas Activas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Mesa 2 (Patio)</span>
                    <span className="text-amber-400 font-mono font-black">$9.400</span>
                  </div>
                  <p className="text-[11px] text-rose-200/60">Mozo: Enzo Girardi</p>
                  <div className="bg-[#18040B] p-2 rounded-lg text-[11px] text-rose-200/80 space-y-0.5">
                    <div>• 2 Fernet Branca Estilo Patrón</div>
                    <div>• 1 Pizetta Napolitana</div>
                  </div>
                </div>

                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Mesa 5 (Salón Principal)</span>
                    <span className="text-amber-400 font-mono font-black">$14.800</span>
                  </div>
                  <p className="text-[11px] text-rose-200/60">Mozo: Anahí Gilardi</p>
                  <div className="bg-[#18040B] p-2 rounded-lg text-[11px] text-rose-200/80 space-y-0.5">
                    <div>• 1 Ojo de Bife con Papas</div>
                    <div>• 2 Copas Vino Malbec</div>
                  </div>
                </div>

                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Despacho Cocina</span>
                      <span className="text-emerald-400 font-bold">Impreso ✓</span>
                    </div>
                    <p className="text-[11px] text-rose-200/60 mt-1">Ticket de cocina enviado en 1 sec.</p>
                  </div>
                  <button
                    onClick={onNavigateToPortfolio}
                    className="w-full py-2 bg-rose-900/80 hover:bg-rose-800 text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Probar Demo Completa →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeDemoTab === 'arca' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                    <FileCheck className="w-5 h-5 text-emerald-400" />
                    <span>Facturación Electrónica ARCA (ex AFIP) Automática</span>
                  </h3>
                  <p className="text-xs text-rose-200/70">Emisión instantánea de Facturas A, B y C integradas al Punto de Venta.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-black">
                  ✓ CAE Aprobado por ARCA
                </span>
              </div>

              <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-white text-sm block">Factura B N° 0001-00004852</span>
                    <span className="text-rose-200/60">Cliente: Responsable Inscripto / Consumidor Final</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-400 font-mono">$48.500,00 ARS</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-rose-200/80 pt-2 border-t border-rose-900/30">
                  <div>CAE: 74281930492817</div>
                  <div>Vto. CAE: 10/08/2026</div>
                  <div>Moneda: ARS ($)</div>
                  <div>Estado: Transmitido ARCA</div>
                </div>
              </div>
            </div>
          )}

          {activeDemoTab === 'ropa' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>Control de Stock de Indumentaria "Blessed Clothing"</span>
                  </h3>
                  <p className="text-xs text-rose-200/70">Matriz de talles (S, M, L, XL), colores, código de barras y alerta de stock mínimo.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-black">
                  📦 1.420 Prendas en Inventario
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-white block">Remera Oversize Street</span>
                  <div className="flex gap-1 text-[10px] font-mono text-rose-200">
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">Talle M: 12</span>
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">Talle L: 8</span>
                  </div>
                  <div className="text-amber-400 font-mono font-bold pt-1">$22.900</div>
                </div>

                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-white block">Zapatillas Urban Style</span>
                  <div className="flex gap-1 text-[10px] font-mono text-rose-200">
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">T41: 5</span>
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">T42: 3</span>
                  </div>
                  <div className="text-amber-400 font-mono font-bold pt-1">$68.500</div>
                </div>

                <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-1.5">
                  <span className="font-bold text-white block">Pantalón Cargo Black</span>
                  <div className="flex gap-1 text-[10px] font-mono text-rose-200">
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">Talle 40: 14</span>
                    <span className="bg-rose-950 px-2 py-0.5 rounded border border-rose-800">Talle 42: 9</span>
                  </div>
                  <div className="text-amber-400 font-mono font-bold pt-1">$44.000</div>
                </div>
              </div>
            </div>
          )}

          {activeDemoTab === 'salud' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-900/30 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span>Gestión de Consultorios, Turnos & Fichas Clínicas</span>
                  </h3>
                  <p className="text-xs text-rose-200/70">Agenda médica, recordatorios automáticos por WhatsApp y fichas de pacientes.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-black">
                  📅 Agenda Hoy: 12 Pacientes
                </span>
              </div>

              <div className="bg-[#260A17] border border-rose-900/40 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-white border-b border-rose-900/30 pb-2">
                  <span>14:30 hs • Paciente: María González</span>
                  <span className="text-emerald-400">WhatsApp Confirmado ✓</span>
                </div>
                <p className="text-[11px] text-rose-200/70">Consulta General / Ficha Clínica N° 1042 • Antecedentes registrados.</p>
              </div>
            </div>
          )}

          {/* Footer Bar inside Demo Box */}
          <div className="pt-4 mt-4 border-t border-rose-900/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-rose-200/60 font-medium">
              Todos los programas son desarrollados 100% a medida por Anahí Gilardi & Enzo Girardi.
            </span>
            <button
              onClick={onNavigateToPortfolio}
              className="text-rose-300 font-extrabold hover:text-white flex items-center space-x-1 transition"
            >
              <span>Ver todos los programas del portafolio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </motion.div>

    </div>
  );
};
