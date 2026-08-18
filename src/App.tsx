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
  const [format, setFormat] = useState<FlyerFormat>('horizontal-banner');
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
      <div className="min-h-screen bg-[#fcf9f8] flex flex-col items-center justify-center text-[#1e1b1b] space-y-4">
        <div className="w-12 h-12 border-4 border-[#4a5d4a] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#4a5d4a] font-bold uppercase tracking-wider text-xs">Cargando presentación de Río Cuarto Web...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1e1b1b] font-sans selection:bg-[#4a5d4a] selection:text-white pb-28 relative overflow-x-hidden">
      
      {/* Background Luminous Ivory Subtle Atmosphere */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_-10%,rgba(74,93,74,0.06),rgba(252,249,248,1))] pointer-events-none" />

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
        <p>Río Cuarto Web — Anahí Gilardi & Enzo Girardi (Programadores) © 2026. Todos los derechos reservados.</p>
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
