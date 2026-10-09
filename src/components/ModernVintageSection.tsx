import React from 'react';
import {
  MessageCircle,
  Check,
  Sparkles,
  ShieldCheck,
  Receipt,
  Headphones,
  GraduationCap,
  Zap,
  Smartphone,
  BarChart3,
  Wrench,
  ArrowRight,
  MessagesSquare,
  FileText,
  Settings2,
  Rocket
} from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { GastronomicVideoPlayer } from './GastronomicVideoPlayer';
import { PromoVideoSection } from './PromoVideoSection';
import { PlansAndModalitiesSection } from './PlansAndModalitiesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqAccordionSection } from './FaqAccordionSection';
import sistemaGastronomicoLaptopImg from '../assets/sistema_gastronomico_laptop.webp';
import posGastronomicoImg from '../assets/pos_gastronomico.webp';
import ferreteriaImg from '../assets/ferreteria.webp';

interface ModernVintageSectionProps {
  phone: string;
  onNavigateToPortfolio?: () => void;
  onNavigateToCalculator?: () => void;
}

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Cero comisiones por venta' },
  { icon: Receipt, label: 'Facturación ARCA (ex AFIP)' },
  { icon: Headphones, label: 'Soporte directo por WhatsApp' },
  { icon: GraduationCap, label: 'Instalación y capacitación' }
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Vendé más rápido',
    text: 'Caja ágil con código de barras, cobro con efectivo, tarjeta o Mercado Pago y tickets al instante. Menos filas, más ventas.'
  },
  {
    icon: BarChart3,
    title: 'Controlá tu stock y tus números',
    text: 'Stock en tiempo real, alertas de faltantes, cierre de caja diario y reportes claros de ventas y rentabilidad.'
  },
  {
    icon: Smartphone,
    title: 'Tu negocio en el celular',
    text: 'Consultá ventas y caja desde cualquier lugar. Catálogo web con pedidos directos a tu WhatsApp.'
  },
  {
    icon: Wrench,
    title: 'Hecho a tu medida',
    text: 'No es un sistema genérico: lo adaptamos a tu rubro y a tu forma de trabajar, y lo hacemos crecer con vos.'
  }
];

const STEPS = [
  { icon: MessagesSquare, title: 'Charlamos', text: 'Nos contás por WhatsApp cómo trabaja tu negocio y qué necesitás resolver.' },
  { icon: FileText, title: 'Propuesta', text: 'Te enviamos una propuesta clara con alcance, tiempos y presupuesto sin compromiso.' },
  { icon: Settings2, title: 'Configuración', text: 'Desarrollamos y configuramos el sistema, y cargamos tus productos, precios y clientes.' },
  { icon: Rocket, title: 'Capacitación', text: 'Te enseñamos a usarlo en minutos y quedamos a tu lado con soporte directo.' }
];

export const ModernVintageSection: React.FC<ModernVintageSectionProps> = ({
  phone,
  onNavigateToPortfolio
}) => {
  const whatsappAnahiUrl = getWhatsAppUrl(
    'Hola Anahí! Vi la página de Río Cuarto Web y quisiera pedir un presupuesto para mi negocio.',
    'anahi'
  );
  const whatsappEnzoUrl = getWhatsAppUrl(
    'Hola Enzo! Vi la página de Río Cuarto Web y quisiera pedir un presupuesto para mi negocio.',
    'enzo'
  );

  return (
    <div className="space-y-20 sm:space-y-28 bg-[#fcf9f8] text-[#1e1b1b] rounded-3xl sm:rounded-[40px] p-6 sm:p-12 lg:p-16 border border-stone-300/80 shadow-2xl font-montserrat">

      {/* ========================================================
          1. HERO
      ======================================================== */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-[11px] font-bold uppercase tracking-[0.18em]">
              <Sparkles className="w-3.5 h-3.5" />
              Software para comercios
            </span>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#1e1b1b]">
              El sistema que tu negocio necesita,{' '}
              <span className="text-[#4a5d4a] italic font-normal">hecho a medida.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1e1b1b]/75 leading-relaxed max-w-lg">
              Punto de venta, control de stock, facturación ARCA y catálogo web para comercios, gastronomía y pymes.
              Sin comisiones por venta y con soporte directo de quienes lo programan.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappEnzoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white px-7 py-4 min-h-[48px] rounded-sm font-semibold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir presupuesto
              </a>
              {onNavigateToPortfolio ? (
                <button
                  type="button"
                  onClick={onNavigateToPortfolio}
                  className="border border-[#4a5d4a] text-[#4a5d4a] hover:bg-[#4a5d4a]/10 px-7 py-4 min-h-[48px] rounded-sm font-semibold text-xs sm:text-sm uppercase tracking-wider transition inline-flex items-center gap-2 cursor-pointer"
                >
                  Ver proyectos
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="#solutions"
                  className="border border-[#4a5d4a] text-[#4a5d4a] hover:bg-[#4a5d4a]/10 px-7 py-4 min-h-[48px] rounded-sm font-semibold text-xs sm:text-sm uppercase tracking-wider transition inline-flex items-center gap-2"
                >
                  Ver soluciones
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-xs text-[#1e1b1b]/60">
              Desarrollado por <strong className="text-[#1e1b1b]/80">Anahí Gilardi &amp; Enzo Girardi</strong> · Respuesta en el día
            </p>
          </div>

          <div className="lg:col-span-6">
            <PromoVideoSection variant="hero" />
          </div>
        </div>

        {/* Trust strip */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-4 py-3.5 shadow-sm"
            >
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-[#4a5d4a]/10">
                <Icon className="w-4.5 h-4.5 text-[#4a5d4a]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#1e1b1b]/85 leading-snug">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ========================================================
          2. BENEFICIOS
      ======================================================== */}
      <section aria-labelledby="benefits-title" className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a5d4a]">Por qué elegirnos</span>
          <h2 id="benefits-title" className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1e1b1b]">
            Menos planillas. Más control.
          </h2>
          <p className="text-sm sm:text-base text-[#1e1b1b]/70 font-light leading-relaxed">
            Herramientas simples para el día a día de tu comercio, pensadas para que dejes de perder tiempo y plata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#4a5d4a]/40 transition duration-300 space-y-3"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#4a5d4a] text-white shadow-md">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#1e1b1b]">{title}</h3>
              <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. SOLUCIONES DE SOFTWARE A MEDIDA (3 MÓDULOS EN ESPAÑOL)
      ======================================================== */}
      <section id="solutions" className="space-y-16 sm:space-y-24 scroll-mt-24">
        
        {/* Título de la Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a5d4a]">Casos reales</span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1e1b1b]">
            Sistemas funcionando en negocios reales.
          </h2>
          <p className="text-sm sm:text-base text-[#1e1b1b]/70 leading-relaxed font-light">
            Facturación, gastronomía y comercio minorista: cada sistema se adapta al rubro, desde el control de stock hasta el punto de venta y la facturación automática.
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
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 flex items-center justify-center">
              <img 
                src={sistemaGastronomicoLaptopImg} 
                alt="Sistema de Gestión y Facturación en Notebook" 
                loading="lazy"
                decoding="async"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-[center_55%]"
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 02: POS y Gestión Gastronómica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <GastronomicVideoPlayer 
              videoSrc="/assets/video_patron.mp4"
              posterSrc={posGastronomicoImg}
            />
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

        {/* MÓDULO 03: Tiendas Online, Catálogo Web y Control de Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MÓDULO 03
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              Tiendas Online, Catálogo & Stock
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Catálogo web moderno y autoadministrable para ferreterías, corralones y comercios. Carrito de pedidos directos por WhatsApp, control de inventario, matriz de categorías y precios en tiempo real.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Catálogo Web con Carrito y Pedidos directos a WhatsApp</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Control de Stock, Categorías (Seguridad, Electricidad) y Ofertas</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative group">
              {/* Resplandor ambiental de fondo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600/20 via-[#4a5d4a]/20 to-stone-400/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 -z-10" />

              {/* Chasis de Ventana Browser E-Commerce */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#2a2626] via-[#1d1a1a] to-[#121111] p-1.5 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] border border-stone-800">
                
                {/* Barra Superior Estilo Navegador Premium */}
                <div className="bg-[#242020] px-4 py-2.5 sm:py-3 rounded-t-[1.3rem] border-b border-stone-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444]/80 shadow-sm" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]/80 shadow-sm" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981]/80 shadow-sm" />
                  </div>

                  {/* Barra de dirección URL */}
                  <div className="hidden sm:flex items-center space-x-2 bg-stone-900/90 border border-stone-700/80 px-3 py-1 rounded-full text-[10px] text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-stone-300">ferreteria.com.ar/catalogo</span>
                  </div>

                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-stone-200">
                    Ferretería
                  </span>
                </div>

                {/* Imagen del Sistema / Catálogo */}
                <div className="relative aspect-[16/9] sm:aspect-[2.05/1] w-full bg-stone-950 overflow-hidden rounded-b-[1.3rem]">
                  <img 
                    src={ferreteriaImg} 
                    alt="Ferretería - Catálogo Web, Carrito y Control de Stock" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge flotante inferior */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass-card-vintage px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] sm:text-xs font-medium flex items-center space-x-2 shadow-xl backdrop-blur-md bg-black/50">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span className="tracking-wide">Catálogo Online, Carrito y Pedidos WhatsApp</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================
          4. CÓMO TRABAJAMOS
      ======================================================== */}
      <section aria-labelledby="process-title" className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a5d4a]">Cómo trabajamos</span>
          <h2 id="process-title" className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1e1b1b]">
            De la primera charla a vender con tu sistema.
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ icon: Icon, title, text }, idx) => (
            <li key={title} className="relative bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a]">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-editorial text-4xl font-bold text-[#4a5d4a]/20">0{idx + 1}</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1e1b1b]">{title}</h3>
              <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ========================================================
          5. PLANES (sin precios: siempre "Consultar")
      ======================================================== */}
      <section id="planes-home">
        <PlansAndModalitiesSection phone={phone} />
      </section>

      {/* ========================================================
          6. TESTIMONIOS
      ======================================================== */}
      <section id="testimonios">
        <TestimonialsSection phone={phone} />
      </section>

      {/* ========================================================
          7. PREGUNTAS FRECUENTES
      ======================================================== */}
      <section id="faq">
        <FaqAccordionSection phone={phone} />
      </section>

      {/* ========================================================
          8. CTA FINAL
      ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-[#4a5d4a] text-white px-6 py-12 sm:px-12 sm:py-16 shadow-2xl">
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-black/10 blur-2xl" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            ¿Listo para ordenar tu negocio?
          </h2>
          <p className="text-sm sm:text-lg text-white/85 font-light leading-relaxed">
            Escribinos por WhatsApp, contanos qué necesitás y te enviamos un presupuesto a medida, sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappAnahiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#2f3d2f] hover:bg-[#f3efe9] px-7 py-4 min-h-[48px] rounded-sm font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar con Anahí
            </a>
            <a
              href={whatsappEnzoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/70 text-white hover:bg-white/10 px-7 py-4 min-h-[48px] rounded-sm font-bold text-xs sm:text-sm uppercase tracking-wider transition"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar con Enzo
            </a>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-white/80">
            <li className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Presupuesto sin cargo</li>
            <li className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Respuesta en el día</li>
            <li className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Pago único o en cuotas</li>
          </ul>
        </div>
      </section>

    </div>
  );
};
