import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
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
        const cleanTerm = term.trim().toLowerCase();
        if (!cleanTerm) return true;
        return fullText.includes(cleanTerm);
      });
    });
  };

  const filtered = getFilteredModules();

  const handleChipClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center pt-10 sm:pt-16 font-montserrat text-[#1e1b1b]">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="bg-white border border-stone-300 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
        >
          {/* Header & Search Input */}
          <div className="p-5 sm:p-7 bg-[#fcf9f8] border-b border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#4a5d4a]" />
                <h3 className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider">
                  Buscador de Módulos & Facturación ARCA
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar buscador"
                className="p-2 min-h-[40px] min-w-[40px] rounded-full bg-white hover:bg-stone-200 text-stone-500 hover:text-[#1e1b1b] transition flex items-center justify-center cursor-pointer border border-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Buscar por función (ej: ARCA, comandas, turnos, stock, talles)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-stone-300 focus:border-[#4a5d4a] rounded-xl pl-10 pr-10 py-3 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none min-h-[46px]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpiar término de búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#1e1b1b] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Search Tags / Chips */}
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <span className="text-stone-500 font-semibold py-1">Sugeridos:</span>
              {['ARCA', 'Comandas', 'Stock', 'Turnos', 'Patentes', 'Balanza'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleChipClick(tag)}
                  className="px-2.5 py-1 rounded-sm bg-white hover:bg-stone-100 text-[#1e1b1b] border border-stone-300 font-medium transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-7 space-y-3">
            {filtered.length > 0 ? (
              filtered.map(sys => (
                <div
                  key={sys.id}
                  onClick={() => {
                    onSelectSystem(sys.id);
                    onClose();
                  }}
                  className="group bg-[#fcf9f8] hover:bg-white border border-stone-200 hover:border-[#4a5d4a] rounded-2xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-[10px] font-bold uppercase">
                        {sys.badge}
                      </span>
                      <h4 className="text-sm font-bold text-[#1e1b1b] group-hover:text-[#4a5d4a] transition">
                        {sys.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#1e1b1b]/70 line-clamp-2">
                      {sys.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#4a5d4a] shrink-0">
                    <span>Ver módulo</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 space-y-3 text-stone-500">
                <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
                <p className="text-sm font-bold text-[#1e1b1b]">
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
