import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { portfolioModules } from '../data/portfolioData';

interface GlobalSystemSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSystem: (systemId: string) => void;
}

export const GlobalSystemSearchModal: React.FC<GlobalSystemSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSystem
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  // Clean search logic using word boundaries and synonym dictionary
  const getFilteredModules = () => {
    const rawTerm = searchTerm.trim().toLowerCase();
    if (!rawTerm) return portfolioModules;

    // Synonym map to enhance precision
    const synonyms: Record<string, string[]> = {
      'arca': ['facturacion', 'factura', 'afip', 'comprobante', 'fiscal'],
      'afip': ['arca', 'facturacion', 'factura', 'comprobante'],
      'comanda': ['gastronomia', 'resto', 'mozo', 'cocina', 'mesas'],
      'talles': ['indumentaria', 'ropa', 'zapatillas', 'sneakers'],
      'turnos': ['salud', 'pacientes', 'medico', 'consultorio', 'historias clinicas'],
      'patentes': ['taller', 'mecanico', 'vehiculos', 'autofix']
    };

    // Expand search terms if synonym exists
    const searchTerms = [rawTerm, ...(synonyms[rawTerm] || [])];

    return portfolioModules.filter(sys => {
      const fullText = `
        ${sys.title} 
        ${sys.subtitle} 
        ${sys.description} 
        ${sys.badge} 
        ${sys.features.join(' ')}
      `.toLowerCase();

      return searchTerms.some(term => {
        // Escapar caracteres especiales para el RegEx
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Usar límites de palabra (\b) para evitar que "arca" coincida con "marca"
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        return regex.test(fullText);
      });
    });
  };

  const filtered = getFilteredModules();

  const handleChipClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-start justify-center pt-10 sm:pt-16">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="bg-[#18040B] border border-rose-900/40 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
        >
          {/* Header & Search Input */}
          <div className="p-4 sm:p-6 bg-[#250915] border-b border-rose-900/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Buscador de Módulos & Facturación ARCA
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar buscador"
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl bg-[#18040B] hover:bg-rose-950 text-rose-300 hover:text-white transition flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Buscar por función (ej: ARCA, comandas, turnos, stock, patentes)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#16040B] border border-rose-900/40 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 min-h-[48px]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpiar término de búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300/60 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Search Tags / Chips */}
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <span className="text-rose-200/60 font-semibold py-1">Sugeridos:</span>
              {['ARCA', 'Comandas', 'Stock', 'Turnos', 'Patentes', 'Balanza'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleChipClick(tag)}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/40 font-bold transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
            {filtered.length > 0 ? (
              filtered.map(sys => (
                <div
                  key={sys.id}
                  onClick={() => {
                    onSelectSystem(sys.id);
                    onClose();
                  }}
                  className="group bg-[#240A15]/80 hover:bg-[#330C1E] border border-rose-900/30 hover:border-rose-500/40 rounded-2xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40 text-[10px] font-black uppercase">
                        {sys.badge}
                      </span>
                      <h4 className="text-sm font-black text-white group-hover:text-rose-200 transition">
                        {sys.title}
                      </h4>
                    </div>
                    <p className="text-xs text-rose-200/70 line-clamp-2">
                      {sys.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-black text-rose-300 group-hover:text-white shrink-0">
                    <span>Ver módulo</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 space-y-3 text-rose-200/70">
                <AlertCircle className="w-10 h-10 text-rose-400 mx-auto opacity-80" />
                <p className="text-sm font-bold text-white">
                  No encontramos resultados para "{searchTerm}"
                </p>
                <p className="text-xs max-w-sm mx-auto">
                  Anahí Gilardi & Enzo Girardi (Programadores) pueden desarrollar la función que necesitás 100% a medida de tu negocio.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
