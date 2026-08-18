import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Smartphone, 
  Globe, 
  Utensils, 
  FileCheck, 
  ShoppingBag, 
  Calendar, 
  Wrench,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coffee,
  BookOpen
} from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';
import facturacionImg from '../assets/facturacion_arca.jpg';

interface EditorialPitchDeckSectionProps {
  onNavigateToCalculator?: () => void;
  onNavigateToPortfolio?: () => void;
}

export const EditorialPitchDeckSection: React.FC<EditorialPitchDeckSectionProps> = ({
  onNavigateToCalculator,
  onNavigateToPortfolio
}) => {
  const whatsappAnahiUrl = 'https://wa.me/5493584860640?text=Hola%20Anah%C3%AD!%20Vi%20la%20presentaci%C3%B3n%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20una%20demo%20para%20mi%20negocio.';
  const whatsappEnzoUrl = 'https://wa.me/5493584302024?text=Hola%20Enzo!%20Vi%20la%20presentaci%C3%B3n%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20una%20demo%20para%20mi%20negocio.';

  return (
    <div className="space-y-12 sm:space-y-16">

      {/* ========================================================
          SLIDE 1: HERO EDITORIAL WITH FLOATING APP MOCKUP
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-tight"
            >
              Río Cuarto Web
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-xl text-emerald-100/90 font-normal leading-relaxed max-w-xl"
            >
              Sistemas y tiendas online pensados para vender más, cobrar mejor y crecer rápido.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={whatsappEnzoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-emerald text-sm sm:text-base font-bold shadow-lg"
              >
                Demo rápida
              </a>

              <span className="btn-pill-cyan text-sm sm:text-base font-bold shadow-lg cursor-default">
                Sin comisiones
              </span>
            </motion.div>
          </div>

          {/* Right Column: Floating Dark Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-[290px] sm:max-w-[320px] bg-[#11161B] rounded-[38px] p-4 sm:p-5 border-4 border-slate-700/80 shadow-2xl shadow-emerald-950/80 text-white font-sans relative"
            >
              {/* Smartphone Notch Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 px-2 font-mono">
                <span>8:41</span>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>5G</span>
                </div>
              </div>

              {/* App Screen Content: Checkout Demo */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
                  <span>‹ Checkout</span>
                </div>

                {/* Item 1 */}
                <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-900/60 flex items-center justify-center text-amber-200">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-100">Organic Coffee Blend</p>
                      <p className="text-[10px] text-slate-400">500 gr</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">$18.99</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-900/60 flex items-center justify-center text-cyan-200">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-100">Handcrafted Leather</p>
                      <p className="text-[10px] text-slate-400">10 MB</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">$45.00</span>
                </div>

                {/* Shipping & Payment Method */}
                <div className="bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Método de Pago</span>
                    <span className="text-slate-200 font-mono">•••• 1234</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Factura Oficial</span>
                    <span className="text-cyan-300 font-bold">ARCA A/B/C</span>
                  </div>
                </div>

                {/* Order Summary Total */}
                <div className="bg-gradient-to-r from-slate-900 to-emerald-950/80 p-3 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Total a Cobrar:</span>
                  <span className="text-base font-black text-emerald-300 font-mono">$88.49</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SLIDE 2: SOFTWARE A MEDIDA PARA VENDER MÁS
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Real Merchant POS Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl max-w-sm">
              <img 
                src={facturacionImg} 
                alt="Comerciante utilizando software de cobro rápido" 
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2018] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#0E2920]/90 backdrop-blur-md rounded-2xl border border-emerald-400/30 text-center">
                <span className="text-xs font-bold text-emerald-300">⚡ Cobro en caja en menos de 20 segundos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Value Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Software a medida para vender más
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 font-normal leading-relaxed">
              Caja ultrarrápida, Facturación ARCA, stock en celular, tienda online y sistemas por rubro. Sin comisiones por venta, soporte directo de los programadores y entrega express en 3 a 5 días hábiles.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="btn-pill-emerald text-sm font-bold shadow-md cursor-default">
                Entrega 3–5 días
              </span>
              <span className="btn-pill-cyan text-sm font-bold shadow-md cursor-default">
                Cero comisiones
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SLIDE 3: MÓDULOS QUE MÁS ATRAEN Y VENDEN (6-GRID)
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white space-y-8">
        
        <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
          Módulos que más atraen y venden
        </h2>

        {/* 6 Minimal Clean Editorial Grid with subtle borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-emerald-600/20 rounded-2xl overflow-hidden border border-emerald-600/30">
          
          {/* Card 1 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              Webs & tiendas online
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Mostrá tu catálogo, vendé 24/7 y convertí visitas en pedidos desde el celular.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              Gastronomía & comandas
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Agilizá mesas, enviá comandas al instante y mejorá la experiencia en cada turno.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              Facturación ARCA
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Emití facturas oficiales en segundos y transmití confianza profesional en cada venta.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              Stock para indumentaria
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Controlá talles y colores sin errores para vender más y perder menos stock.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              Turnos & salud
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Llená tu agenda, enviá recordatorios y reducí ausencias con reservas simples.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#13382C] p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-normal text-white font-editorial">
              ERP & talleres
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
              Organizá órdenes, cuentas y remitos con una gestión clara que genera confianza.
            </p>
          </div>

        </div>

      </section>


      {/* ========================================================
          SLIDE 4: TODO EL SOFTWARE QUE PODEMOS CREAR PARA VOS (1-6)
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white space-y-8">
        
        <div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Todo el software que podemos crear para vos
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-light">
            Desarrollamos sistemas a medida para cada rubro. Elegí el que tu negocio necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Step 1 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-emerald-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-emerald-500/30">
              1
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Tiendas online & webs</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Catálogos, carrito y pagos online para vender las 24 horas, todos los días.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-cyan-500/30">
              4
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Sistemas ERP a medida</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Órdenes, cuentas, remitos y reportes centralizados en un solo sistema.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-cyan-500/30">
              2
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Facturación ARCA</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Emisión de comprobantes oficiales electrónicos en segundos y sin errores.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-emerald-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-emerald-500/30">
              5
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Turnos & reservas</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Agendas online con recordatorios automáticos para reducir ausencias.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-emerald-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-emerald-500/30">
              3
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Gestión de stock & caja</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Inventario, ventas y caja controlados en tiempo real desde la PC o el celular.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0 shadow-lg shadow-cyan-500/30">
              6
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Apps por rubro</h3>
              <p className="text-xs text-emerald-100/80 font-light leading-relaxed">
                Gastronomía, salud, indumentaria, talleres y mucho más, según tu actividad.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* ========================================================
          SLIDE 5: BENEFICIOS QUE CONVENCEN AL INSTANTE
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Beneficios que convencen al instante
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {/* Metric 1 */}
            <div className="flex items-baseline space-x-6 border-b border-emerald-600/20 pb-4">
              <span className="font-editorial text-4xl sm:text-6xl font-normal text-white shrink-0 min-w-[120px]">
                24/7
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Tu negocio vende aunque esté cerrado
              </p>
            </div>

            {/* Metric 2 */}
            <div className="flex items-baseline space-x-6 border-b border-emerald-600/20 pb-4">
              <span className="font-editorial text-4xl sm:text-6xl font-normal text-white shrink-0 min-w-[120px]">
                0%
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Sin comisiones que se coman tu ganancia
              </p>
            </div>

            {/* Metric 3 */}
            <div className="flex items-baseline space-x-6 pb-2">
              <span className="font-editorial text-4xl sm:text-6xl font-normal text-white shrink-0 min-w-[120px]">
                3–5
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Entrega rápida para empezar a cobrar antes
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SLIDE 6: MOTIVOS PARA ELEGIRNOS ANTES QUE A OTROS
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Motivos para elegirnos antes que a otros
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6">
            
            {/* Reason 1 */}
            <div className="flex items-baseline space-x-6 border-b border-emerald-600/20 pb-4">
              <span className="font-editorial text-3xl sm:text-5xl font-normal text-white shrink-0 min-w-[140px]">
                Directo
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Hablás con quienes desarrollan tu sistema
              </p>
            </div>

            {/* Reason 2 */}
            <div className="flex items-baseline space-x-6 border-b border-emerald-600/20 pb-4">
              <span className="font-editorial text-3xl sm:text-5xl font-normal text-white shrink-0 min-w-[140px]">
                Único
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Cada módulo se adapta a tu rubro y forma de vender
              </p>
            </div>

            {/* Reason 3 */}
            <div className="flex items-baseline space-x-6 pb-2">
              <span className="font-editorial text-3xl sm:text-5xl font-normal text-white shrink-0 min-w-[140px]">
                Simple
              </span>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light">
                Fácil de usar desde el primer día, sin vueltas
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          SLIDE 7: PEDÍ TU DEMO HOY (FINAL CTA & DUAL WHATSAPP)
      ======================================================== */}
      <section className="bg-pine-deck rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 border border-emerald-500/20 shadow-2xl text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.18),transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h2 className="font-editorial text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight">
            Pedí tu demo hoy
          </h2>

          <p className="text-sm sm:text-lg text-emerald-100/90 font-light">
            Hacé tu consulta y recibí una propuesta lista para tu rubro.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={whatsappAnahiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-emerald text-sm sm:text-base font-bold shadow-xl shadow-emerald-950/60"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>WhatsApp Anahí</span>
            </a>

            <a
              href={whatsappEnzoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-cyan text-sm sm:text-base font-bold shadow-xl shadow-cyan-950/60"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>WhatsApp Enzo</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-600/20 text-[11px] sm:text-xs text-emerald-200/60 tracking-wider font-mono uppercase">
          RÍO CUARTO, CÓRDOBA, ARGENTINA • ANAGILARDI1234@GMAIL.COM • ENZOGIRARDI84@GMAIL.COM
        </div>

      </section>

    </div>
  );
};
