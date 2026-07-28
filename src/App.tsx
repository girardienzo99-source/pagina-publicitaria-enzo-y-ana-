import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNav, PublicTab } from './components/HeaderNav';
import { FlyerPreview } from './components/FlyerPreview';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { InteractiveQuoteCalculator } from './components/InteractiveQuoteCalculator';
import { AdminToolsPanel } from './components/AdminToolsPanel';
import { DirectContactBar } from './components/DirectContactBar';
import { PdfCatalogBrochure } from './components/PdfCatalogBrochure';
import { GlobalSystemSearchModal } from './components/GlobalSystemSearchModal';
import { ProposalGeneratorModal } from './components/ProposalGeneratorModal';
import { PlansAndModalitiesSection } from './components/PlansAndModalitiesSection';
import { initialFlyerData } from './data/portfolioData';
import { FlyerData, FlyerTheme, FlyerFormat } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';
import { Lock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PublicTab>('home');
  const [flyerData, setFlyerData] = useState<FlyerData>(initialFlyerData);
  const [theme, setTheme] = useState<FlyerTheme>('ruby-red');
  const [format, setFormat] = useState<FlyerFormat>('poster-story');
  const [showPdfCatalog, setShowPdfCatalog] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(isSupabaseConfigured);

  useEffect(() => {
    async function loadFlyerConfig() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase
          .from('flyer_config')
          .select('config')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data && data.config) {
          setFlyerData(prev => ({
            ...prev,
            ...data.config
          }));
        }
      } catch (err) {
        console.error('Error cargando configuración de Supabase:', err);
      } finally {
        setIsDbLoading(false);
      }
    }

    loadFlyerConfig();
  }, []);

  const saveFlyerConfig = async (updatedData: FlyerData): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      const { error } = await supabase
        .from('flyer_config')
        .insert({ config: updatedData });

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error al guardar en Supabase:', err);
      return false;
    }
  };

  if (isDbLoading) {
    return (
      <div className="min-h-screen bg-[#14040A] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-rose-200/70 font-bold uppercase tracking-wider text-xs">Cargando presentación de Tu Sitio Web Río Cuarto...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14040A] text-slate-100 font-sans selection:bg-rose-700 selection:text-white pb-28 relative overflow-x-hidden">
      
      {/* Background Deep Burgundy Radial Accent */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_-20%,rgba(163,40,75,0.35),rgba(20,4,10,1))] pointer-events-none" />

      {/* Print Styles injected for clean PDF/paper printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-flyer, .printable-flyer *, .printable-proposal, .printable-proposal * {
            visibility: visible;
          }
          .printable-flyer, .printable-proposal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Header Nav */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPdfCatalog={() => setShowPdfCatalog(true)}
        onOpenSearchModal={() => setShowSearchModal(true)}
        onOpenProposalModal={() => setShowProposalModal(true)}
        isAdminActive={activeTab === 'admin'}
      />

      {/* Main Content Area with Animated Tab Transitions */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <FlyerPreview
                flyerData={flyerData}
                theme={theme}
                setTheme={setTheme}
                format={format}
                setFormat={setFormat}
                onNavigateToPortfolio={() => setActiveTab('portfolio')}
                onNavigateToCalculator={() => setActiveTab('calculator')}
                onOpenPdfCatalog={() => setShowPdfCatalog(true)}
              />
            </motion.div>
          )}

          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <PortfolioShowcase
                phone={flyerData.phone}
                onOpenPdfCatalog={() => setShowPdfCatalog(true)}
              />
            </motion.div>
          )}

          {activeTab === 'planes' && (
            <motion.div
              key="planes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <PlansAndModalitiesSection phone={flyerData.phone} />
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <InteractiveQuoteCalculator phone={flyerData.phone} />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AdminToolsPanel
                flyerData={flyerData}
                setFlyerData={setFlyerData}
                theme={theme}
                setTheme={setTheme}
                format={format}
                setFormat={setFormat}
                onPreviewFlyer={() => setActiveTab('home')}
                onSaveConfig={saveFlyerConfig}
                onOpenPdfCatalog={() => setShowPdfCatalog(true)}
                onOpenProposalModal={() => setShowProposalModal(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Discreet Footer Link for Internal Admin Panel Access */}
      <footer className="relative z-10 border-t border-rose-900/20 mt-12 pt-8 pb-16 text-center text-xs text-rose-200/50 space-y-2">
        <p>Tu Sitio Web Río Cuarto — Anahí Gilardi & Enzo Girardi (Programadores) © 2026. Todos los derechos reservados.</p>
        <button
          onClick={() => setActiveTab('admin')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/40 text-[11px] font-bold transition"
        >
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Acceso Panel Interno de Administración</span>
        </button>
      </footer>

      {/* Floating Bottom Contact Bar */}
      <DirectContactBar
        phone={flyerData.phone}
        phoneFormatted={flyerData.phoneFormatted}
        email={flyerData.email}
      />

      {/* PDF Catalog Printable Modal */}
      {showPdfCatalog && (
        <PdfCatalogBrochure
          flyerData={flyerData}
          onClose={() => setShowPdfCatalog(false)}
        />
      )}

      {/* Universal Search Modal */}
      <GlobalSystemSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectSystem={() => setActiveTab('portfolio')}
      />

      {/* Formal Technical Proposal Modal */}
      <ProposalGeneratorModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        phone={flyerData.phone}
        email={flyerData.email}
      />

    </div>
  );
}
