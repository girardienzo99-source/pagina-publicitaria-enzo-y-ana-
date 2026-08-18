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

export type PublicTab = 'home' | 'portfolio' | 'planes' | 'calculator' | 'admin';

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
  };  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-xl border-b border-stone-200 text-[#1e1b1b] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div 
            tabIndex={0}
            role="button"
            aria-label="Ir al inicio de Río Cuarto Web"
            onClick={() => handleTabClick('home')}
            onKeyDown={(e) => e.key === 'Enter' && handleTabClick('home')}
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a5d4a] rounded-xl"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#4a5d4a] via-emerald-600 to-teal-500 p-[2px] shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src={brandLogo} 
                alt="Logo Río Cuarto Web" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-base sm:text-xl tracking-tight text-[#1e1b1b] uppercase">
                  Río Cuarto <span className="text-[#4a5d4a] font-black">Web</span>
                </span>
              </div>
              <p className="text-xs text-[#4a5d4a] font-bold tracking-wider uppercase hidden sm:block">
                Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-stone-200/70 p-1.5 rounded-2xl border border-stone-300/80">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#4a5d4a] text-white shadow-md'
                  : 'text-[#1e1b1b]/75 hover:text-[#1e1b1b] hover:bg-stone-300/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleTabClick('portfolio')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-[#4a5d4a] text-white shadow-md'
                  : 'text-[#1e1b1b]/75 hover:text-[#1e1b1b] hover:bg-stone-300/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-200" />
              <span>Proyectos</span>
            </button>

            <button
              onClick={() => handleTabClick('planes')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'planes'
                  ? 'bg-[#4a5d4a] text-white shadow-md'
                  : 'text-[#1e1b1b]/75 hover:text-[#1e1b1b] hover:bg-stone-300/50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-200" />
              <span>Modalidades</span>
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex items-center space-x-2 px-3.5 min-h-[44px] rounded-xl text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[#4a5d4a] text-white shadow-md'
                  : 'text-[#1e1b1b]/75 hover:text-[#1e1b1b] hover:bg-stone-300/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-200" />
              <span>Cotizar</span>
            </button>
          </nav>

          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Modal Trigger */}
            <button
              onClick={onOpenSearchModal}
              className="p-2.5 min-h-[44px] min-w-[44px] text-xs font-bold text-[#1e1b1b] hover:bg-stone-100 bg-white rounded-xl border border-stone-300 transition flex items-center justify-center space-x-1.5 shadow-sm"
              title="Buscar Módulo o Función"
              aria-label="Abrir buscador universal"
            >
              <Search className="w-4 h-4 text-[#4a5d4a]" />
              <span className="hidden xl:inline">Buscar</span>
            </button>



            {/* Primary CTA - WhatsApp Demo */}
            <a
              href={mainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center space-x-2 px-4 min-h-[44px] bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-800 shrink-0" />
              <span className="uppercase tracking-wider font-extrabold">Pedir Demo</span>
            </a>

            {/* Accessible Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-white text-[#1e1b1b] hover:bg-stone-100 border border-stone-300 shadow-sm transition"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú principal'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accessible Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcf9f8] border-b border-stone-300 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200 text-[#1e1b1b]">
          <p className="text-xs font-black uppercase text-[#4a5d4a] tracking-wider">Menú de Navegación</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'home' ? 'bg-[#4a5d4a] text-white shadow-sm' : 'text-[#1e1b1b] hover:bg-stone-200/60'
              }`}
            >
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span>Inicio & Servicios</span>
            </button>

            <button
              onClick={() => handleTabClick('portfolio')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'portfolio' ? 'bg-[#4a5d4a] text-white shadow-sm' : 'text-[#1e1b1b] hover:bg-stone-200/60'
              }`}
            >
              <LayoutGrid className="w-5 h-5 text-emerald-300" />
              <span>Proyectos Realizados</span>
            </button>

            <button
              onClick={() => handleTabClick('planes')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'planes' ? 'bg-[#4a5d4a] text-white shadow-sm' : 'text-[#1e1b1b] hover:bg-stone-200/60'
              }`}
            >
              <Layers className="w-5 h-5 text-emerald-300" />
              <span>Modalidades & Planes</span>
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-base font-bold w-full text-left ${
                activeTab === 'calculator' ? 'bg-[#4a5d4a] text-white shadow-sm' : 'text-[#1e1b1b] hover:bg-stone-200/60'
              }`}
            >
              <Calculator className="w-5 h-5 text-emerald-300" />
              <span>Cotizador Online</span>
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <button
              onClick={() => { onOpenSearchModal(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-3 px-4 min-h-[44px] rounded-xl text-sm font-bold text-[#1e1b1b] bg-white border border-stone-300 w-full shadow-sm"
            >
              <Search className="w-4 h-4 text-[#4a5d4a]" />
              <span>Buscar Módulo o Función</span>
            </button>


          </div>
        </div>
      )}
    </header>
  );
};
