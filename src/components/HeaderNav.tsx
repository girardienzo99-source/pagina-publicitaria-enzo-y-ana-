import React, { useState } from 'react';
import { 
  Code2, 
  LayoutGrid, 
  Calculator, 
  Settings, 
  Sparkles, 
  MessageCircle, 
  FileText, 
  Search, 
  FileCheck, 
  Layers, 
  Menu, 
  X,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';
import brandLogo from '../assets/logo_brand.jpg';

export type PublicTab = 'home' | 'editorial' | 'vintage' | 'services' | 'portfolio' | 'planes' | 'calculator' | 'admin';

interface HeaderNavProps {
  activeTab: PublicTab;
  setActiveTab: (tab: PublicTab) => void;
  onOpenPdfCatalog: () => void;
  onOpenSearchModal: () => void;
  onOpenProposalModal: () => void;
  isAdminActive?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenPdfCatalog,
  onOpenSearchModal,
  onOpenProposalModal,
  isAdminActive = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainWhatsAppUrl = getWhatsAppUrl('Hola Anahí y Enzo! Vi la web de Río Cuarto Web y quisiera pedir una demo de un desarrollo para mi negocio.');

  const handleTabClick = (tab: PublicTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#16040B]/95 backdrop-blur-xl border-b border-rose-900/30 text-white shadow-xl shadow-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div 
            tabIndex={0}
            role="button"
            aria-label="Ir al inicio de Río Cuarto Web"
            onClick={() => handleTabClick('home')}
            onKeyDown={(e) => e.key === 'Enter' && handleTabClick('home')}
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-400 to-amber-300 p-[2px] shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src={brandLogo} 
                alt="Logo Río Cuarto Web" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-base sm:text-xl tracking-tight text-white uppercase">
                  Río Cuarto <span className="text-cyan-400 font-black">Web</span>
                </span>
              </div>
              <p className="text-xs text-amber-300 font-extrabold tracking-wider uppercase hidden sm:block">
                Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#250915]/80 p-1.5 rounded-2xl border border-rose-900/30">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-rose-800 to-rose-900 text-white shadow-md border border-rose-400/40'
                  : 'text-rose-100/80 hover:text-white hover:bg-rose-950/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-300" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleTabClick('vintage')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'vintage'
                  ? 'bg-[#4a5d4a] text-white shadow-md border border-stone-300/50'
                  : 'text-stone-200/90 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <span className="text-xs">📜</span>
              <span>Modern Vintage</span>
            </button>

            <button
              onClick={() => handleTabClick('editorial')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'editorial'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-md border border-emerald-400/50'
                  : 'text-emerald-200/90 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <span className="text-xs">🌿</span>
              <span>Pitch Deck</span>
            </button>

            <button
              onClick={() => handleTabClick('portfolio')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-gradient-to-r from-rose-800 to-rose-900 text-white shadow-md border border-rose-400/40'
                  : 'text-rose-100/80 hover:text-white hover:bg-rose-950/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-amber-300" />
              <span>Proyectos</span>
            </button>

            <button
              onClick={() => handleTabClick('planes')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'planes'
                  ? 'bg-gradient-to-r from-rose-800 to-rose-900 text-white shadow-md border border-rose-400/40'
                  : 'text-rose-100/80 hover:text-white hover:bg-rose-950/60'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>Modalidades</span>
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-rose-800 to-rose-900 text-white shadow-md border border-rose-400/40'
                  : 'text-rose-100/80 hover:text-white hover:bg-rose-950/60'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Cotizar</span>
            </button>
          </nav>

          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Modal Trigger */}
            <button
              onClick={onOpenSearchModal}
              className="p-2.5 min-h-[44px] min-w-[44px] text-xs font-bold text-rose-100 hover:text-white bg-[#250915] hover:bg-[#380D1F] rounded-xl border border-rose-900/40 transition flex items-center justify-center space-x-1.5"
              title="Buscar Módulo o Función"
              aria-label="Abrir buscador universal"
            >
              <Search className="w-4 h-4 text-rose-400" />
              <span className="hidden xl:inline">Buscar</span>
            </button>

            {/* Proposal Generator Button */}
            <button
              onClick={onOpenProposalModal}
              className="hidden lg:flex items-center space-x-1.5 px-3 min-h-[44px] text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 rounded-xl border border-emerald-500/40 transition"
              title="Generar Propuesta Técnica Formal en PDF"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Propuesta PDF</span>
            </button>

            {/* Primary CTA - WhatsApp Demo */}
            <a
              href={mainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center space-x-2 px-4 min-h-[44px] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-emerald-950/60 border border-emerald-300/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-800 shrink-0" />
              <span className="uppercase tracking-wider font-extrabold">Pedir Demo</span>
            </a>

            {/* Accessible Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-[#250915] text-rose-200 hover:text-white border border-rose-900/40 transition"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accessible Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1D0610] border-b border-rose-900/40 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <p className="text-xs font-black uppercase text-rose-300 tracking-wider">Menú de Navegación</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'home' ? 'bg-rose-900/60 text-white border border-rose-500/40' : 'text-rose-100 hover:bg-rose-950/50'
              }`}
            >
              <Sparkles className="w-5 h-5 text-rose-400" />
              <span>Inicio & Servicios</span>
            </button>

            <button
              onClick={() => handleTabClick('vintage')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'vintage' ? 'bg-[#4a5d4a] text-white border border-stone-300/40' : 'text-stone-200 hover:bg-stone-900/50'
              }`}
            >
              <span className="text-lg">📜</span>
              <span>Modern Vintage (Artesanía)</span>
            </button>

            <button
              onClick={() => handleTabClick('editorial')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'editorial' ? 'bg-emerald-900/70 text-white border border-emerald-500/50' : 'text-emerald-200/90 hover:bg-emerald-950/50'
              }`}
            >
              <span className="text-lg">🌿</span>
              <span>Presentación Pitch Deck</span>
            </button>

            <button
              onClick={() => handleTabClick('portfolio')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'portfolio' ? 'bg-rose-900/60 text-white border border-rose-500/40' : 'text-rose-100 hover:bg-rose-950/50'
              }`}
            >
              <LayoutGrid className="w-5 h-5 text-amber-400" />
              <span>Proyectos Realizados</span>
            </button>

            <button
              onClick={() => handleTabClick('planes')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'planes' ? 'bg-rose-900/60 text-white border border-rose-500/40' : 'text-rose-100 hover:bg-rose-950/50'
              }`}
            >
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Modalidades de Trabajo</span>
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'calculator' ? 'bg-rose-900/60 text-white border border-rose-500/40' : 'text-rose-100 hover:bg-rose-950/50'
              }`}
            >
              <Calculator className="w-5 h-5 text-emerald-400" />
              <span>Cotizador de Presupuestos</span>
            </button>

            <div className="pt-2 border-t border-rose-900/30 flex items-center justify-between gap-2">
              <button
                onClick={() => { onOpenPdfCatalog(); setMobileMenuOpen(false); }}
                className="flex items-center space-x-2 px-4 min-h-[44px] rounded-xl bg-[#250915] text-xs font-bold text-rose-200 border border-rose-900/40 w-1/2"
              >
                <FileText className="w-4 h-4 text-rose-400" />
                <span>Catálogo PDF</span>
              </button>

              <button
                onClick={() => { handleTabClick('admin'); }}
                className="flex items-center space-x-2 px-4 min-h-[44px] rounded-xl bg-amber-950/40 text-xs font-bold text-amber-300 border border-amber-500/30 w-1/2"
              >
                <Settings className="w-4 h-4" />
                <span>Panel Interno</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
