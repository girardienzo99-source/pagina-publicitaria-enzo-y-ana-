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
  const whatsappAnahiUrl = 'https://wa.me/5493584860640?text=Hola%20Anah%C3%AD!%20Vi%20el%20dise%C3%B1o%20Modern%20Vintage%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';
  const whatsappEnzoUrl = 'https://wa.me/5493584302024?text=Hola%20Enzo!%20Vi%20el%20dise%C3%B1o%20Modern%20Vintage%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20asesoramiento%20para%20mi%20negocio.';
  
  const getPlanWhatsAppUrl = (planName: string) => {
    return `https://wa.me/5493584302024?text=Hola%20Enzo%20y%20Anah%C3%AD!%20Me%20interesa%20el%20plan%20"${planName}"%20del%20sistema%20Modern%20Vintage%20de%20R%C3%ADo%20Cuarto%20Web.`;
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#fcf9f8] text-[#1e1b1b] rounded-3xl sm:rounded-[40px] p-6 sm:p-12 lg:p-16 border border-stone-300/80 shadow-2xl font-montserrat">

      {/* ========================================================
          1. MODERN VINTAGE NAVIGATION HEADER
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
            HOME
          </button>
          <a href="#solutions" className="hover:text-[#4a5d4a] transition">
            SOLUTIONS
          </a>
          {onNavigateToPortfolio && (
            <button onClick={onNavigateToPortfolio} className="hover:text-[#4a5d4a] transition cursor-pointer">
              PORTFOLIO
            </button>
          )}
        </div>

        <a
          href={whatsappEnzoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition shadow-md inline-flex items-center space-x-2"
        >
          <span>CONTACT</span>
        </a>
      </nav>


      {/* ========================================================
          2. HERO SECTION — ARTESANÍA DIGITAL
      ======================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Headline & Value Proposition */}
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
          3. TAILORED SOFTWARE SOLUTIONS (3 ALTERNATING MODULES)
      ======================================================== */}
      <section id="solutions" className="space-y-16 sm:space-y-24 pt-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#1e1b1b]">
            Tailored Software Solutions.
          </h2>
          <p className="text-sm sm:text-base text-[#1e1b1b]/70 leading-relaxed font-light">
            Precision engineering for modern businesses. From robust inventory management to seamless point-of-sale systems, designed to elevate your operational efficiency.
          </p>
        </div>

        {/* MODULE 01: ARCA Integration (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MODULE 01
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              ARCA Integration
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Automate your invoicing with direct ARCA synchronization. Ensure compliance and streamline your financial reporting with our robust API connections.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Automatic Electronic Invoicing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Real-time Tax Calculation</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900" 
                alt="ARCA Electronic Invoicing Dual Monitor Setup" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* MODULE 02: Gastronomy POS (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900" 
                alt="Gastronomy POS Restaurant Table Tablet" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MODULE 02
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              Gastronomy POS
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              A fluid, touch-optimized interface for fast-paced hospitality environments. Manage tables, split bills, and route orders to the kitchen instantly.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Visual Table Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Kitchen Display System (KDS)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* MODULE 03: Stock & Inventory (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] text-[11px] font-bold uppercase tracking-wider">
              MODULE 03
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b]">
              Stock & Inventory
            </h3>
            <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed">
              Maintain perfect visibility over your assets. Multi-warehouse support, automated reorder points, and detailed valuation reports.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-semibold text-[#1e1b1b]/90">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Barcode Scanning Support</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#4a5d4a]" />
                <span>Supplier Management</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=900" 
                alt="Stock and Inventory Barcode Scanning" 
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>

      </section>


      {/* ========================================================
          4. INVESTMENT PLANS (3 HIGH-FIDELITY CARDS)
      ======================================================== */}
      <section className="space-y-12 pt-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#1e1b1b]">
            Investment Plans.
          </h2>
          <p className="text-xs sm:text-sm text-[#1e1b1b]/70 leading-relaxed font-light">
            Transparent pricing designed to scale alongside your operational needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Pyme */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Pyme</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Essential tools for growing local businesses.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Basic Inventory</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Standard POS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Email Support</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Pyme')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center border border-stone-300 text-[#1e1b1b] hover:bg-stone-50 font-bold text-xs uppercase tracking-wider rounded-sm transition"
            >
              INQUIRE
            </a>
          </div>

          {/* Card 2: Pro ARCA (Featured) */}
          <div className="bg-white rounded-2xl p-7 border-2 border-[#4a5d4a] shadow-xl relative flex flex-col justify-between space-y-6 transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4a5d4a] text-white px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
              MOST POPULAR
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Pro ARCA</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Full compliance and advanced features.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Everything in Pyme</span>
                </li>
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Full ARCA Integration</span>
                </li>
                <li className="flex items-center space-x-2 font-medium">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Multi-warehouse</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Pro ARCA')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition shadow-md"
            >
              SELECT PLAN
            </a>
          </div>

          {/* Card 3: Exclusivo */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">Exclusivo</h3>
              <p className="text-xs text-[#1e1b1b]/70 min-h-[32px]">
                Custom deployments and priority service.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-[#1e1b1b]/80">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Custom Modules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>Dedicated Server</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#4a5d4a]" />
                  <span>24/7 Phone Support</span>
                </li>
              </ul>
            </div>

            <a
              href={getPlanWhatsAppUrl('Exclusivo a Medida')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center border border-stone-300 text-[#1e1b1b] hover:bg-stone-50 font-bold text-xs uppercase tracking-wider rounded-sm transition"
            >
              CONTACT US
            </a>
          </div>

        </div>

      </section>


      {/* ========================================================
          5. MODERN VINTAGE INSTITUTIONAL FOOTER
      ======================================================== */}
      <footer className="pt-12 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#1e1b1b]/70">
        <div>
          <span className="font-editorial text-lg font-bold text-[#1e1b1b] block">
            Río Cuarto Web
          </span>
          <p className="text-[11px] text-[#1e1b1b]/60 mt-0.5">
            Crafting reliable software architecture since 2024. Developed by Anahí Gilardi & Enzo Girardi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <a href="#solutions" className="hover:text-[#4a5d4a] transition">Services</a>
          <a href={whatsappEnzoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Terms</a>
          <a href={whatsappAnahiUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Privacy Policy</a>
          <a href={whatsappEnzoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#4a5d4a] transition">Contact</a>
        </div>
      </footer>

      <div className="text-center text-[10px] text-stone-400 border-t border-stone-100 pt-4">
        © 2026 Río Cuarto Web. All rights reserved. Crafted by Anahí & Enzo.
      </div>

    </div>
  );
};
