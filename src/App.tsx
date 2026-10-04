import { useState, useEffect, useCallback, Suspense, lazy, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Lock } from 'lucide-react';
import { HeaderNav, PublicTab } from './components/HeaderNav';
import { FlyerPreview } from './components/FlyerPreview';
import { DirectContactBar } from './components/DirectContactBar';
import { initialFlyerData } from './data/portfolioData';
import { FlyerData, FlyerTheme, FlyerFormat } from './types';
import { loadStoredFlyerConfig, saveFlyerConfig as persistFlyerConfig } from './lib/flyerStorage';

// Secondary tabs and modals are code-split so the home page paints first.
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

const TabLoadingFallback = () => (
  <div className="py-20 flex flex-col items-center justify-center text-center space-y-3" role="status" aria-live="polite">
    <div className="w-8 h-8 border-[3px] border-[#4a5d4a] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold">Cargando sección…</span>
  </div>
);

const TabPanel = ({ id, children }: { id: string; children: ReactNode }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <Suspense fallback={<TabLoadingFallback />}>{children}</Suspense>
  </motion.div>
);

const TABS: PublicTab[] = ['home', 'portfolio', 'planes', 'calculator', 'admin'];
const TAB_TITLES: Record<PublicTab, string> = {
  home: 'Río Cuarto Web — Diseño Digital a Medida | Anahí Gilardi & Enzo Girardi',
  portfolio: 'Proyectos y sistemas realizados | Río Cuarto Web',
  planes: 'Planes y modalidades | Río Cuarto Web',
  calculator: 'Cotizador de software a medida | Río Cuarto Web',
  admin: 'Panel interno | Río Cuarto Web',
};

const tabFromHash = (): PublicTab => {
  const hash = window.location.hash.replace('#', '') as PublicTab;
  return TABS.includes(hash) ? hash : 'home';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<PublicTab>(tabFromHash);
  const [flyerData, setFlyerData] = useState<FlyerData>(() => loadStoredFlyerConfig(initialFlyerData));
  const [theme, setTheme] = useState<FlyerTheme>('modern-vintage');
  const [format, setFormat] = useState<FlyerFormat>('horizontal-banner');
  const [showPdfCatalog, setShowPdfCatalog] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Keep the active tab in the URL so the back button and shared links (#planes, #calculator…) work.
  const setActiveTab = useCallback((tab: PublicTab) => {
    setActiveTabState(tab);
    const nextHash = tab === 'home' ? '' : `#${tab}`;
    if (window.location.hash !== nextHash) {
      history.pushState(null, '', nextHash || window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onPopState = () => setActiveTabState(tabFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.title = TAB_TITLES[activeTab];
  }, [activeTab]);

  const saveFlyerConfig = async (updatedData: FlyerData): Promise<boolean> => persistFlyerConfig(updatedData);
  const openPdfCatalog = () => setShowPdfCatalog(true);
  const openProposalModal = () => setShowProposalModal(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#fcf9f8] text-[#1e1b1b] font-sans selection:bg-[#4a5d4a] selection:text-white pb-28 relative overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#4a5d4a] focus:text-white focus:rounded-md focus:font-bold"
        >
          Saltar al contenido
        </a>

        <div
          className="fixed inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_-10%,rgba(74,93,74,0.06),rgba(252,249,248,1))] pointer-events-none"
          aria-hidden="true"
        />

        <HeaderNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenPdfCatalog={openPdfCatalog}
          onOpenSearchModal={() => setShowSearchModal(true)}
          onOpenProposalModal={openProposalModal}
          isAdminActive={activeTab === 'admin'}
        />

        <main id="main-content" tabIndex={-1} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 outline-none">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <TabPanel key="home" id="home">
                <FlyerPreview
                  flyerData={flyerData}
                  theme={theme}
                  setTheme={setTheme}
                  format={format}
                  setFormat={setFormat}
                  onNavigateToPortfolio={() => setActiveTab('portfolio')}
                  onNavigateToCalculator={() => setActiveTab('calculator')}
                  onOpenPdfCatalog={openPdfCatalog}
                />
              </TabPanel>
            )}

            {activeTab === 'portfolio' && (
              <TabPanel key="portfolio" id="portfolio">
                <PortfolioShowcase phone={flyerData.phone} onOpenPdfCatalog={openPdfCatalog} />
              </TabPanel>
            )}

            {activeTab === 'planes' && (
              <TabPanel key="planes" id="planes">
                <PlansAndModalitiesSection phone={flyerData.phone} />
              </TabPanel>
            )}

            {activeTab === 'calculator' && (
              <TabPanel key="calculator" id="calculator">
                <InteractiveQuoteCalculator phone={flyerData.phone} />
              </TabPanel>
            )}

            {activeTab === 'admin' && (
              <TabPanel key="admin" id="admin">
                <AdminToolsPanel
                  flyerData={flyerData}
                  setFlyerData={setFlyerData}
                  theme={theme}
                  setTheme={setTheme}
                  format={format}
                  setFormat={setFormat}
                  onPreviewFlyer={() => setActiveTab('home')}
                  onSaveConfig={saveFlyerConfig}
                  onOpenPdfCatalog={openPdfCatalog}
                  onOpenProposalModal={openProposalModal}
                />
              </TabPanel>
            )}
          </AnimatePresence>
        </main>

        <footer className="relative z-10 border-t border-stone-200 mt-12 pt-8 pb-16 text-center text-xs text-stone-600 space-y-3 font-montserrat">
          <p>Río Cuarto Web — Anahí Gilardi &amp; Enzo Girardi (Programadores) © {new Date().getFullYear()}. Todos los derechos reservados.</p>
          <button
            onClick={() => setActiveTab('admin')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-[#4a5d4a] border border-stone-300 shadow-sm text-[11px] font-bold transition"
          >
            <Lock className="w-3 h-3" aria-hidden="true" />
            <span>Acceso interno</span>
          </button>
        </footer>

        <DirectContactBar phone={flyerData.phone} phoneFormatted={flyerData.phoneFormatted} email={flyerData.email} />

        {showPdfCatalog && (
          <Suspense fallback={null}>
            <PdfCatalogBrochure flyerData={flyerData} onClose={() => setShowPdfCatalog(false)} />
          </Suspense>
        )}

        {showSearchModal && (
          <Suspense fallback={null}>
            <GlobalSystemSearchModal
              isOpen={showSearchModal}
              onClose={() => setShowSearchModal(false)}
              onSelectSystem={() => setActiveTab('portfolio')}
            />
          </Suspense>
        )}

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
    </MotionConfig>
  );
}
