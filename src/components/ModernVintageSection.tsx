import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Utensils, 
  FileCheck, 
  ShoppingBag, 
  Calendar, 
  Wrench,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface ModernVintageSectionProps {
  onNavigateToPortfolio?: () => void;
  onNavigateToCalculator?: () => void;
}

export const ModernVintageSection: React.FC<ModernVintageSectionProps> = ({
  onNavigateToPortfolio,
  onNavigateToCalculator
}) => {
  const whatsappAnahiUrl = 'https://wa.me/5493584860640?text=Hola%20Anah%C3%AD!%20Vi%20el%20estilo%20Modern%20Vintage%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';
  const whatsappEnzoUrl = 'https://wa.me/5493584302024?text=Hola%20Enzo!%20Vi%20el%20estilo%20Modern%20Vintage%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';

  return (
    <div className="space-y-12 sm:space-y-16">

      {/* ========================================================
          HERO SECTION — MODERN VINTAGE (ARTESANÍA DIGITAL)
      ======================================================== */}
      <section className="bg-[#fcf9f8] text-[#1e1b1b] rounded-3xl sm:rounded-[36px] p-8 sm:p-12 lg:p-16 border border-stone-300/70 shadow-2xl relative overflow-hidden font-montserrat">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Philosophy */}
          <div className="space-y-8">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-sm bg-[#4a5d4a]/10 border border-[#4a5d4a]/30 text-xs font-semibold text-[#4a5d4a] uppercase tracking-widest">
              <span>Río Cuarto Web • Artesanía Digital</span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#1e1b1b]"
            >
              Diseño Digital<br />
              <span className="text-[#4a5d4a] italic font-normal">a Medida</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-[#1e1b1b]/80 leading-relaxed max-w-md font-normal"
            >
              Cero comisiones. Facturación ARCA. Soporte Directo. Soluciones de software premium para empresas exigentes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href={whatsappEnzoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white px-8 py-4 rounded-sm font-semibold text-sm uppercase tracking-wider transition shadow-lg inline-flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar</span>
              </a>

              <button
                onClick={onNavigateToPortfolio}
                className="border border-[#4a5d4a] text-[#4a5d4a] hover:bg-[#4a5d4a]/10 px-8 py-4 rounded-sm font-semibold text-sm uppercase tracking-wider transition cursor-pointer"
              >
                Ver Soluciones
              </button>
            </motion.div>

          </div>

          {/* Right Column: Visual Frame with Glass Philosophy Badge */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-stone-300">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
                alt="Artesanía Digital - Río Cuarto Web" 
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            {/* Floating Glass Card Overlay */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 glass-card-vintage p-5 sm:p-6 border-l-4 border-[#4a5d4a] shadow-xl rounded-sm max-w-xs">
              <span className="text-xs uppercase tracking-widest opacity-60 font-semibold block text-[#1e1b1b]">
                Filosofía
              </span>
              <p className="font-editorial italic text-xl font-bold text-[#1e1b1b] mt-1">
                Artesanía Digital
              </p>
              <p className="text-xs text-[#1e1b1b]/70 mt-1">
                Software creado línea por línea por Anahí Gilardi & Enzo Girardi.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ========================================================
          SOLUTIONS GRID — MODERN VINTAGE AESTHETIC
      ======================================================== */}
      <section className="bg-[#fcf9f8] text-[#1e1b1b] rounded-3xl sm:rounded-[36px] p-8 sm:p-12 lg:p-16 border border-stone-300/70 shadow-2xl space-y-10 font-montserrat">
        
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#4a5d4a] block">
            Nuestros Pilares de Software
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1e1b1b]">
            Soluciones Clave para tu Negocio
          </h2>
          <p className="text-sm text-[#1e1b1b]/70">
            Cada desarrollo se adapta a tu manera de trabajar, sin costos mensuales obligatorios ni comisiones por venta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Solution 1 */}
          <div className="bg-white p-7 rounded-sm border border-stone-200 shadow-md space-y-4 hover:border-[#4a5d4a] transition group">
            <div className="w-12 h-12 rounded-sm bg-[#4a5d4a]/10 flex items-center justify-center text-[#4a5d4a]">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] group-hover:text-[#4a5d4a] transition">
              Webs & E-Commerce
            </h3>
            <p className="text-xs text-[#1e1b1b]/70 leading-relaxed">
              Catálogos en línea adaptables a celulares con carrito de compras y botón directo a WhatsApp. Cero comisiones.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#4a5d4a] uppercase tracking-wider">
                Entrega Express 3–5 Días
              </span>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="bg-white p-7 rounded-sm border border-stone-200 shadow-md space-y-4 hover:border-[#4a5d4a] transition group">
            <div className="w-12 h-12 rounded-sm bg-[#4a5d4a]/10 flex items-center justify-center text-[#4a5d4a]">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] group-hover:text-[#4a5d4a] transition">
              Gestión Gastronómica
            </h3>
            <p className="text-xs text-[#1e1b1b]/70 leading-relaxed">
              Comandas en cocina en tiempo real, mozos tomando pedidos en tablet, mapa de mesas y arqueo diario de caja.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#4a5d4a] uppercase tracking-wider">
                Impresión Térmica & Balanzas
              </span>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="bg-white p-7 rounded-sm border border-stone-200 shadow-md space-y-4 hover:border-[#4a5d4a] transition group">
            <div className="w-12 h-12 rounded-sm bg-[#4a5d4a]/10 flex items-center justify-center text-[#4a5d4a]">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] group-hover:text-[#4a5d4a] transition">
              Facturación ARCA
            </h3>
            <p className="text-xs text-[#1e1b1b]/70 leading-relaxed">
              Emisión de comprobantes autorizados A, B y C en 2 segundos desde tu computadora con código QR oficial.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#4a5d4a] uppercase tracking-wider">
                Oficial ARCA / ex AFIP
              </span>
            </div>
          </div>

        </div>

      </section>


      {/* ========================================================
          DIRECT WHATSAPP CONTACT FOOTER
      ======================================================== */}
      <section className="bg-[#4a5d4a] text-white rounded-3xl sm:rounded-[36px] p-8 sm:p-12 text-center space-y-6 shadow-2xl font-montserrat">
        
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            Comunicate directamente con Anahí Gilardi y Enzo Girardi para recibir asesoramiento y una demo a medida.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={whatsappAnahiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-stone-100 text-[#4a5d4a] font-bold px-7 py-3.5 rounded-sm text-xs uppercase tracking-wider transition shadow-lg inline-flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Anahí (+54 358 486-0640)</span>
          </a>

          <a
            href={whatsappEnzoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3b4b3b] hover:bg-[#2e3b2e] text-white border border-stone-300/40 font-bold px-7 py-3.5 rounded-sm text-xs uppercase tracking-wider transition shadow-lg inline-flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Enzo (+54 358 430-2024)</span>
          </a>
        </div>

        <div className="pt-6 border-t border-white/20 text-[11px] text-stone-200/80 uppercase tracking-widest font-mono">
          Río Cuarto, Córdoba, Argentina • anagilardi1234@gmail.com • enzogirardi84@gmail.com
        </div>

      </section>

    </div>
  );
};
