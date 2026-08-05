import React from 'react';
import { motion } from 'motion/react';
import { Settings, Lock, FileText, Printer, ArrowLeft, Palette, Sparkles } from 'lucide-react';
import { FlyerEditor } from './FlyerEditor';
import { PremiumFlyerCard } from './PremiumFlyerCard';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';

interface AdminToolsPanelProps {
  flyerData: FlyerData;
  setFlyerData: React.Dispatch<React.SetStateAction<FlyerData>>;
  theme: FlyerTheme;
  setTheme: (theme: FlyerTheme) => void;
  format: FlyerFormat;
  setFormat: (format: FlyerFormat) => void;
  onPreviewFlyer: () => void;
  onSaveConfig: (updatedData: FlyerData) => Promise<boolean>;
  onOpenPdfCatalog: () => void;
  onOpenProposalModal: () => void;
}

export const AdminToolsPanel: React.FC<AdminToolsPanelProps> = ({
  flyerData,
  setFlyerData,
  theme,
  setTheme,
  format,
  setFormat,
  onPreviewFlyer,
  onSaveConfig,
  onOpenPdfCatalog,
  onOpenProposalModal
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6"
    >
      {/* Header Banner */}
      <div className="bg-[#240916] border border-rose-900/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Panel de Administración Interno</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Generador de Flyers & Anuncios Publicitarios
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 font-medium">
            Personalizá los anuncios publicitarios en tiempo real, cambiá temas de color, formatos (9:16, 1:1, Banner) o generá propuestas técnicas oficiales.
          </p>
        </div>

        <button
          onClick={onPreviewFlyer}
          className="flex items-center space-x-2 px-4 min-h-[44px] bg-rose-900/40 hover:bg-rose-900/60 text-white font-bold text-xs rounded-xl border border-rose-500/30 transition shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-rose-300" />
          <span>Volver a la Web Pública</span>
        </button>
      </div>

      {/* Control Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* PDF Catalog Option */}
        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Catálogo PDF Oficial</span>
          </div>
          <p className="text-xs text-rose-200/60">
            Visualizá o imprimí el folleto técnico completo con todos los desarrollos.
          </p>
          <button
            onClick={onOpenPdfCatalog}
            className="w-full min-h-[44px] bg-rose-900/40 hover:bg-rose-900/70 text-white font-bold text-xs rounded-xl border border-rose-500/30 transition"
          >
            Abrir Catálogo PDF
          </button>
        </div>

        {/* Technical Proposal */}
        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Propuesta Técnica Formal</span>
          </div>
          <p className="text-xs text-rose-200/60">
            Armá una propuesta imprimible personalizada para enviar a un cliente.
          </p>
          <button
            onClick={onOpenProposalModal}
            className="w-full min-h-[44px] bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-bold text-xs rounded-xl border border-emerald-500/30 transition"
          >
            Crear Propuesta PDF
          </button>
        </div>

        {/* Format & Theme Controls */}
        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Formato & Estilo de Anuncio</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              { id: 'horizontal-banner', label: 'Banner 16:9' },
              { id: 'poster-story', label: 'Story 9:16' },
              { id: 'square-post', label: 'Post 1:1' },
              { id: 'business-card', label: 'Tarjeta' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as FlyerFormat)}
                className={`py-1.5 px-2 rounded-lg font-bold border transition ${
                  format === f.id ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-black/40 text-zinc-400 border-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Theme Picker Selector */}
      <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-white font-bold">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Tema de Color del Flyer:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ruby-red', label: 'Bordó Rubí (Oficial)' },
            { id: 'neon-tech', label: 'Neón Tech (Cyber)' },
            { id: 'modern-emerald', label: 'Esmeralda Corporativo' },
            { id: 'clean-corporate', label: 'Blanco Impresión' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as FlyerTheme)}
              className={`px-3 py-1.5 rounded-lg font-extrabold border transition ${
                theme === t.id ? 'bg-rose-900 text-white border-rose-500' : 'bg-black/40 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Ultra-Premium Flyer Card Preview */}
      <div className="bg-[#18040B] border border-rose-900/40 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-rose-900/30 pb-3">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Vista Previa en Vivo del Flyer ({format})
          </h3>
          <span className="text-xs text-rose-300/70 font-mono">
            Anahí Gilardi & Enzo Girardi (Programadores)
          </span>
        </div>

        <PremiumFlyerCard
          flyerData={flyerData}
          theme={theme}
          format={format}
          onNavigateToPortfolio={onPreviewFlyer}
        />
      </div>

      {/* Flyer Content Editor */}
      <div className="bg-[#1D0610] border border-rose-900/40 rounded-3xl p-6 shadow-xl">
        <FlyerEditor
          flyerData={flyerData}
          setFlyerData={setFlyerData}
          onPreviewFlyer={onPreviewFlyer}
          onSaveConfig={onSaveConfig}
        />
      </div>

    </motion.div>
  );
};
