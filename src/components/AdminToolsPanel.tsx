import React from 'react';
import { motion } from 'motion/react';
import { Settings, Lock, Edit3, FileText, Printer, Copy, Check, ArrowLeft } from 'lucide-react';
import { FlyerEditor } from './FlyerEditor';
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
            Herramientas de Publicidad & Configuración
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 font-medium">
            Personalizá los anuncios publicitarios, cambiá formatos de flyers, generá propuestas técnicas o editá los textos de la landing.
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

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Catálogo PDF Oficial</span>
          </div>
          <p className="text-xs text-rose-200/60">
            Descargá o visualizá el catálogo imprimible con todos los desarrollos realizados.
          </p>
          <button
            onClick={onOpenPdfCatalog}
            className="w-full min-h-[44px] bg-rose-900/40 hover:bg-rose-900/70 text-white font-bold text-xs rounded-xl border border-rose-500/30 transition"
          >
            Abrir Catálogo PDF
          </button>
        </div>

        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Propuesta Técnica Formal</span>
          </div>
          <p className="text-xs text-rose-200/60">
            Generá una propuesta imprimible en PDF personalizada para un cliente específico.
          </p>
          <button
            onClick={onOpenProposalModal}
            className="w-full min-h-[44px] bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-bold text-xs rounded-xl border border-emerald-500/30 transition"
          >
            Crear Propuesta PDF
          </button>
        </div>

        <div className="bg-[#1C050E] border border-rose-900/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Formatos de Anuncio</span>
          </div>
          <p className="text-xs text-rose-200/60">
            Seleccioná la relación de aspecto para guardar o imprimir el folleto.
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFormat('poster-story')}
              className={`flex-1 min-h-[40px] text-xs font-bold rounded-lg border transition ${
                format === 'poster-story' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-black/40 text-zinc-400 border-zinc-800'
              }`}
            >
              Story / Póster
            </button>
            <button
              onClick={() => setFormat('square-post')}
              className={`flex-1 min-h-[40px] text-xs font-bold rounded-lg border transition ${
                format === 'square-post' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-black/40 text-zinc-400 border-zinc-800'
              }`}
            >
              Post Cuadrado
            </button>
          </div>
        </div>
      </div>

      {/* Editor Component */}
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
