import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNav, PublicTab } from './components/HeaderNav';
import { FlyerPreview } from './components/FlyerPreview';
import { DirectContactBar } from './components/DirectContactBar';
import { initialFlyerData } from './data/portfolioData';
import { FlyerData, FlyerTheme, FlyerFormat } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';
import { Lock } from 'lucide-react';

// Lazy loading inteligente para módulos pesados (jspdf, html2canvas, paneles secundarios)
// Permite que la página principal cargue de forma instantánea sin esperar librerías de 500KB+
const PortfolioShowcase = lazy(() => 
  import('./components/PortfolioShowcase').then(m => ({ default: m.PortfolioShowcase }))
);
const InteractiveQuoteCalculator = lazy(() => 
  import('./components/InteractiveQuoteCalculator').then(m => ({ default: m.InteractiveQuoteCalculator }))
);
const PlansAndModalitiesSection = lazy(() => 
  import('./components/PlansAndModalitiesSection').then(m => ({ default: m.PlansAndModalitiesSection }))
);
const AdminToolsPanel = lazy(() => 
  import('./components/AdminToolsPanel').then(m => ({ default: m.AdminToolsPanel }))
);
const PdfCatalogBrochure = lazy(() => 
  import('./components/PdfCatalogBrochure').then(m => ({ default: m.PdfCatalogBrochure }))
);
const GlobalSystemSearchModal = lazy(() => 
  import('./components/GlobalSystemSearchModal').then(m => ({ default: m.GlobalSystemSearchModal }))
);
const ProposalGeneratorModal = lazy(() => 
  import('./components/ProposalGeneratorModal').then(m => ({ default: m.ProposalGeneratorModal }))
);

// Fallback mínimo ultraligero mientras se abren tabs secundarias
const TabLoadingFallback = () => (
  <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
    <div className="w-8 h-8 border-3 border-[#4a5d4a] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Cargando sección...</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<PublicTab>('home');
  const [flyerData, setFlyerData] = useState<FlyerData>(initialFlyerData);
  const [theme, setTheme] = useState<FlyerTheme>('modern-vintage');
  const [format, setFormat] = useState<FlyerFormat>('horizontal-banner');
  const [showPdfCatalog, setShowPdfCatalog] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  // Carga asíncrona no bloqueante de Supabase (la página se muestra de inmediato sin spinner)
  useEffect(() => {
    let isMounted = true;
    async function loadFlyerConfig() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase
          .from('flyer_config')
          .select('config')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (isMounted && !error && data && data.config) {
          setFlyerData(prev => ({
            ...prev,
            ...data.config
          }));
        }
      } catch (err) {
        console.warn('Configuración cargada desde caché local:', err);
      }
    }

    loadFlyerConfig();
    return () => { isMounted = false; };
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
              transition={{ duration: 0.2, ease: 'easeOut' }}
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
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Suspense fallback={<TabLoadingFallback />}>
                <PortfolioShowcase
                  phone={flyerData.phone}
                  onOpenPdfCatalog={() => setShowPdfCatalog(true)}
                />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'planes' && (
            <motion.div
              key="planes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Suspense fallback={<TabLoadingFallback />}>
                <PlansAndModalitiesSection phone={flyerData.phone} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Suspense fallback={<TabLoadingFallback />}>
                <InteractiveQuoteCalculator phone={flyerData.phone} />
              </Suspense>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Suspense fallback={<TabLoadingFallback />}>
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
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Discreet Footer Link for Internal Admin Panel Access */}
      <footer className="relative z-10 border-t border-stone-200 mt-12 pt-8 pb-16 text-center text-xs text-stone-500 space-y-2 font-montserrat">
        <p>Río Cuarto Web — Anahí Gilardi & Enzo Girardi (Programadores) © 2026. Todos los derechos reservados.</p>
        <button
          onClick={() => setActiveTab('admin')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-[#4a5d4a] border border-stone-300 shadow-sm text-[11px] font-bold transition cursor-pointer"
        >
          <Lock className="w-3 h-3 text-[#4a5d4a]" />
          <span>Acceso Panel Interno de Administración</span>
        </button>
      </footer>

      {/* Floating Bottom Contact Bar */}
      <DirectContactBar
        phone={flyerData.phone}
        phoneFormatted={flyerData.phoneFormatted}
        email={flyerData.email}
      />

      {/* PDF Catalog Printable Modal (Lazy) */}
      {showPdfCatalog && (
        <Suspense fallback={null}>
          <PdfCatalogBrochure
            flyerData={flyerData}
            onClose={() => setShowPdfCatalog(false)}
          />
        </Suspense>
      )}

      {/* Universal Search Modal (Lazy) */}
      {showSearchModal && (
        <Suspense fallback={null}>
          <GlobalSystemSearchModal
            isOpen={showSearchModal}
            onClose={() => setShowSearchModal(false)}
            onSelectSystem={() => setActiveTab('portfolio')}
          />
        </Suspense>
      )}

      {/* Formal Technical Proposal Modal (Lazy) */}
      {showProposalModal && (
        <Suspense fallback={null}>
          <ProposalGeneratorModal
            isOpen={showProposalModal}
            onClose={() => setShowProposalModal(false)}
            phone={flyerData.phone}
            email={flyerData.email}
          />
        </Suspense>
      )}

    </div>
  );
}
