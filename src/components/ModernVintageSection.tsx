import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Check, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles
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
  const whatsappAnahiUrl = 'https://wa.me/5493584860640?text=Hola%20Anah%C3%AD!%20Vi%20el%20dise%C3%B1o%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';
  const whatsappEnzoUrl = 'https://wa.me/5493584302024?text=Hola%20Enzo!%20Vi%20el%20dise%C3%B1o%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';
  
  const getPlanWhatsAppUrl = (planName: string) => {
    return `https://wa.me/5493584302024?text=Hola%20Enzo%20y%20Anah%C3%AD!%20Me%20interesa%20el%20plan%20"${planName}"%20de%20R%C3%ADo%20Cuarto%20Web.`;
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#fcf9f8] text-[#1e1b1b] rounded-3xl sm:rounded-[40px] p-6 sm:p-12 lg:p-16 border border-stone-300/80 shadow-2xl font-montserrat">

      {/* ========================================================
          1. BARRA DE NAVEGACIÓN EN ESPAÑOL
      ======================================================== */}
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8 border-b border-stone-200">
        <div className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1b1b]">
          Río Cuarto Web
        </div>

        <div className="flex items-center space-x-6 sm:space-x-8 text-xs font-semibold uppercase tracking-widest text-[#1e1b1b]/70">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="text-[#1e1b1b] border-b-2 border-[#4a5d4a] pb-1 cursor-pointer font-bold"
          >
            INICIO
          </button>
          <a href="#solutions" className="hover:text-[#4a5d4a] transition">
            SOLUCIONES
          </a>
          {onNavigateToPortfolio && (
            <button onClick={onNavigateToPortfolio} className="hover:text-[#4a5d4a] transition cursor-pointer">
              PROYECTOS
            </button>
          )}
        </div>

        <a
          href={whatsappEnzoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition shadow-md inline-flex items-center space-x-2"
        >
          <span>CONTACTO</span>
        </a>
      </nav>


      {/* ========================================================
          2. PORTADA HERO — ARTESANÍA DIGITAL
      ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Columna Izquierda: Titular & Propuesta de Valor */}
        <div className="space-y-6">
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[#1e1b1b]">
            Diseño Digital<br />
            <span className="text-[#4a5d4a] italic font-normal">a Medida</span>
          </h1>

          <p className="text-base sm:text-lg text-[#1e1b1b]/80 leading-relaxed max-w-md font-normal">
            Cero comisiones. Facturación ARCA. Soporte Directo. Soluciones de software premium para empresas exigentes.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={whatsappEnzoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white px-8 py-4 rounded-sm font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg inline-flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar</span>
            </a>

            <a
              href="#solutions"
              className="border border-[#4a5d4a] text-[#4a5d4a] hover:bg-[#4a5d4a]/10 px-8 py-4 rounded-sm font-semibold text-xs sm:text-sm uppercase tracking-wider transition inline-flex items-center"
            >
              Ver Soluciones
            </a>
          </div>
        </div>

        {/* Columna Derecha: Marco Visual con Filosofía de Artesanía Digital */}
        <div className="relative">
          <div className="relative rounded-sm overflow-hidden shadow-2xl border border-stone-300">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
              alt="Artesanía Digital - Río Cuarto Web" 
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Tarjeta Flotante Translúcida de Filosofía */}
          <div className="absolute -bottom-6 -left-4 sm:-left-6 glass-card-vintage p-5 sm:p-6 border-l-4 border-[#4a5d4a] shadow-2xl rounded-sm max-w-xs">
            <span className="text-xs uppercase tracking-widest opacity-60 font-semibold block text-[#1e1b1b]">
              Filosofía
            </span>
            <p className="font-editorial italic text-xl font-bold text-[#1e1b1b] mt-1">
              Artesanía Digital
            </p>
            <p className="text-xs text-[#1e1b1b]/70 mt-1">
              Desarrollado línea por línea por Anahí Gilardi & Enzo Girardi.
            </p>
          </div>
        </div>

      </section>


      {/* ========================================================
          3. SOLUCIONES DE SOFTWARE A MEDIDA (3 MÓDULOS EN ESPAÑOL)
      ======================================================== */}
      <section id="solutions" className="space-y-16 sm:space-y-24 pt-8">
        
        {/* Título de la Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#1e1b1b]">
            Soluciones de Software a Medida.
          </h2>
          <p className="text-sm sm:text-base text-[#1e1b1b]/70 leading-relaxed font-light">
            Ingeniería y desarrollo de precisión para comercios y empresas modernas. Desde control de stock y talles hasta puntos de venta y facturación automática, diseñados para optimizar tu gestión.
          </p>
        </div>

        {/* MÓDULO 01: Integración & Facturación ARCA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MÓDULO 01
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              Integración & Facturación ARCA
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Automatizá tu facturación con sincronización directa con ARCA (ex AFIP). Cumplimiento normativo total, emisión instantánea y reportes contables sin intermediarios.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Facturación Electrónica Automática A, B y C</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Cálculo Impositivo en Tiempo Real con CAE Oficial</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900" 
                alt="Facturación Electrónica ARCA Puesto de Trabajo" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 02: POS y Gestión Gastronómica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900" 
                alt="Gestión Gastronómica Mozos y Salón" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MÓDULO 02
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              POS y Gestión Gastronómica
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Interfaz táctil fluida y ultrarrápida para bares, restos y confiterías. Administrá el mapa de mesas, dividí cuentas por cliente y enviá comandas a la cocina al instante.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Gestión Visual de Mesas y Salón Interactivo</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Comandas en Cocina y Despacho Rápido (KDS)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* MÓDULO 03: Control de Stock e Inventario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MÓDULO 03
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              Control de Stock e Inventario
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Mantené una visibilidad perfecta sobre tus productos. Soporte multidepósito, alertas automáticas de reposición, matriz de talles/colores e informes de valuación.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Soporte para Lector de Código de Barras y Talles</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Gestión de Proveedores, Compras y Remitos</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=900" 
                alt="Control de Stock y Código de Barras" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>

      </section>


      {/* ========================================================
          4. PLANES DE INVERSIÓN (EN ESPAÑOL)
      ======================================================== */}
      <section className="space-y-12 pt-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#1e1b1b]">
            Planes de Inversión.
          </h2>
          <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed font-light">
            Precios claros y transparentes diseñados para escalar al ritmo de tu negocio, sin comisiones por venta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Tarjeta 1: Pyme */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Pyme</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Herramientas esenciales para comercios locales en crecimiento.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Control de Inventario Básico</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Punto de Venta (POS) Estándar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Soporte Técnico por WhatsApp y Email</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Pyme')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center border border-stone-300 text-[#1e1b1b] hover:bg-stone-50 font-bold text-xs uppercase tracking-wider rounded-sm transition"
            >
              CONSULTAR
            </a>
          </div>

          {/* Tarjeta 2: Pro ARCA (Destacado) */}
          <div className="bg-white rounded-2xl p-7 border-2 border-[#4a5d4a] shadow-xl relative flex flex-col justify-between space-y-6 transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4a5d4a] text-white px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
              MÁS ELEGIDO
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Pro ARCA</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Cumplimiento normativo total y funciones avanzadas de gestión.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Todo lo incluido en Pyme</span>
                </li>
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Facturación Electrónica ARCA Completa</span>
                </li>
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Soporte Multidepósito y Sucursales</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Pro ARCA')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition shadow-md"
            >
              ELEGIR PLAN
            </a>
          </div>

          {/* Tarjeta 3: Exclusivo a Medida */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Exclusivo a Medida</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Desarrollo 100% personalizado y atención prioritaria para empresas.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Módulos Exclusivos para tu Rubro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Servidor Dedicado y Base de Datos Propia</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Soporte Directo Telefónico y WhatsApp 24/7</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Exclusivo a Medida')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center border border-stone-300 text-[#1e1b1b] hover:bg-stone-50 font-bold text-xs uppercase tracking-wider rounded-sm transition"
            >
              CONTACTARNOS
            </a>
          </div>

        </div>

      </section>


      {/* ========================================================
          5. PIE DE PÁGINA INSTITUCIONAL EN ESPAÑOL
      ======================================================== */}
      <footer className="pt-12 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#1e1b1b]/70">
        <div>
          <span className="font-editorial text-lg font-bold text-[#1e1b1b] block">
            Río Cuarto Web
          </span>
          <p className="text-[11px] text-[#1e1b1b]/60 mt-0.5">
            Desarrollo de software y arquitectura digital a medida desde 2024. Creado por Anahí Gilardi & Enzo Girardi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <a href="#solutions" className="hover:text-[#4a5d4a] transition">Servicios</a>
          <a href={whatsappEnzoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Términos</a>
          <a href={whatsappAnahiUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Privacidad</a>
          <a href={whatsappEnzoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Contacto</a>
        </div>
      </footer>

      <div className="text-center text-[10px] text-stone-400 border-t border-stone-100 pt-4">
        © 2026 Río Cuarto Web. Todos los derechos reservados. Creado por Anahí Gilardi & Enzo Girardi.
      </div>

    </div>
  );
};
