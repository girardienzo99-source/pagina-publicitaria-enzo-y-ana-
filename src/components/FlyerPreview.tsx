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
  onNavigateToCalculator
}) => {
  return (
    <div className="pb-8 max-w-6xl mx-auto">
      {/* Complete Modern Vintage Experience with Tailored Software Solutions & Investment Plans */}
      <ModernVintageSection
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToCalculator={onNavigateToCalculator}
      />
    </div>
  );
};
