import React from 'react';
import { motion } from 'motion/react';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { ModernVintageSection } from './ModernVintageSection';

interface FlyerPreviewProps {
  flyerData: FlyerData;
  theme: FlyerTheme;
  setTheme: (theme: FlyerTheme) => void;
  format: FlyerFormat;
  setFormat: (format: FlyerFormat) => void;
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
  onOpenPdfCatalog?: () => void;
  onNavigateToEditorial?: () => void;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({
  onNavigateToPortfolio,
  onNavigateToCalculator,
  onNavigateToEditorial
}) => {
  return (
    <div className="space-y-8 pb-8 max-w-6xl mx-auto">

      {/* Pitch Deck Presentation Banner Callout */}
      {onNavigateToEditorial && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pine-deck border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl cursor-pointer hover:border-emerald-400/60 transition text-white"
          onClick={onNavigateToEditorial}
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="text-xs font-black uppercase text-white tracking-wider">
                Presentación Ejecutiva Pitch Deck
              </p>
              <p className="text-[11px] text-emerald-200/80">
                Hacé clic aquí para ver las 7 diapositivas interactivas en verde pino con tipografía editorial.
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigateToEditorial(); }}
            className="btn-pill-emerald text-xs font-bold shrink-0 min-h-[38px] px-4 cursor-pointer"
          >
            Ver Pitch Deck →
          </button>
        </motion.div>
      )}
      
      {/* Complete Modern Vintage Experience with Tailored Software Solutions & Investment Plans */}
      <ModernVintageSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
      />

    </div>
  );
};
