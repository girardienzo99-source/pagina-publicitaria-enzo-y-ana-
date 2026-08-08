import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  ShoppingBag, 
  Layers, 
  ExternalLink, 
  CheckCircle, 
  Sparkles, 
  MessageCircle, 
  Users, 
  Clock, 
  DollarSign, 
  Package, 
  ShieldCheck, 
  Grid, 
  ChefHat, 
  Wine, 
  Tag, 
  Search, 
  Filter,
  Check,
  Plus,
  Activity,
  Wrench,
  ShoppingCart
} from 'lucide-react';
import { portfolioModules } from '../data/portfolioData';
import { SystemModule } from '../types';
import { RoiCalculatorSection } from './RoiCalculatorSection';
import { PlansAndModalitiesSection } from './PlansAndModalitiesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqAccordionSection } from './FaqAccordionSection';

interface PortfolioShowcaseProps {
  phone: string;
  onOpenPdfCatalog?: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ phone, onOpenPdfCatalog }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedModule, setSelectedModule] = useState<SystemModule>(portfolioModules[0]);
  
  // Interactive mock state for demoing the resto/ecommerce/saas software live!
  const [activeTableId, setActiveTableId] = useState<number | null>(2);
  const [selectedWaiter, setSelectedWaiter] = useState<string>('Enzo Girardi');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('todos');
  const [orderItems, setOrderItems] = useState<{ name: string; price: string }[]>([
    { name: 'Fernet Branca Estilo Patrón', price: '$4.500' },
    { name: 'Aperol Spritz', price: '$4.900' }
  ]);

  const filteredModules = selectedCategory === 'todos' 
    ? portfolioModules 
    : portfolioModules.filter(m => m.rubro === selectedCategory);

  const handleAddItemToOrder = (itemName: string, itemPrice: string) => {
    setOrderItems(prev => [...prev, { name: itemName, price: itemPrice }]);
  };

  const getWhatsAppRequestUrl = (moduleTitle: string) => {
    const text = `Hola Anahí y Enzo! Estuve viendo en su sitio el proyecto "${moduleTitle}". Quisiera pedirles presupuesto y asesoramiento para implementar algo similar en mi negocio.`;
    return `https://wa.me/5493584860640?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-gradient-to-r from-zinc-950 via-red-950/40 to-stone-950 border border-red-900/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Proyectos Realizados por Río Cuarto Web (Anahí Gilardi & Enzo Girardi)</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Portafolio de Programas & Sistemas Creados
        </h1>
        <p className="text-xs sm:text-base text-zinc-300 max-w-2xl mx-auto font-medium">
          Mirá los programas de gestión creados para Gastronomía, Salud & Consultorios, Ferreterías, Talleres, Tiendas de Ropa, Supermercados y ERP Multirrubro en tiempo real.
        </p>

        {/* PDF Download Button & Category Filters */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onOpenPdfCatalog && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenPdfCatalog}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-950/60 border border-red-400 transition-all group"
            >
              <span>📄 Descargar Catálogo de Trabajos (PDF)</span>
            </motion.button>
          )}

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/549${phone}?text=Hola%20Anah%C3%AD%20y%20Enzo!%20Estuve%20viendo%20los%20proyectos%20de%20Tu%20Sitio%20Web%20R%C3%ADo%20Cuarto%20y%20quisiera%20pedir%20presupuesto.`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden flex items-center space-x-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950/50 border border-emerald-300/40 transition-all duration-300"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-75" />
              <MessageCircle className="relative w-4 h-4 sm:w-5 sm:h-5 fill-white text-emerald-700" />
            </div>
            <span className="uppercase tracking-wider">Consultar WhatsApp</span>
          </motion.a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-zinc-800">
          {[
            { id: 'todos', label: 'Todos los Programas', icon: Layers },
            { id: 'gastronomia', label: 'Gastronomía & Restos', icon: Utensils },
            { id: 'indumentaria', label: 'Tiendas de Ropa', icon: ShoppingBag },
            { id: 'salud-estetica', label: 'Salud & Consultorios', icon: Activity },
            { id: 'ferreteria-taller', label: 'Ferretería & Taller', icon: Wrench },
            { id: 'super-almacen', label: 'Supermercado & Almacén', icon: ShoppingCart },
            { id: 'saas-multirrubro', label: 'ERP Multirrubro (+14 Rubros)', icon: Grid }
          ].map(cat => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-900/40 border border-red-400'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Grid: Modules Selection Cards with Image Previews */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredModules.map((module, idx) => {
            const isSelected = selectedModule.id === module.id;
            return (
              <motion.div
                key={module.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedModule(module)}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-br from-zinc-900 via-stone-900 to-red-950/60 border-red-500 ring-2 ring-red-500/40 shadow-2xl scale-[1.02]'
                    : 'bg-zinc-900/90 hover:bg-zinc-900 border-zinc-800 hover:border-red-900/50 hover:shadow-xl'
                }`}
              >
                {/* Image Preview Thumbnail Header */}
                {module.imageUrl && (
                  <div className="relative h-40 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={module.imageUrl}
                      alt={module.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md border border-red-400">
                        {module.badge}
                      </span>
                    </div>

                    {module.clientExample && (
                      <div className="absolute bottom-2 right-2 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
                        {module.clientExample}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-base font-black text-white leading-snug group-hover:text-red-400 transition">
                      {module.title}
                    </h3>
                    <p className="text-xs text-red-400 font-bold mt-0.5">
                      {module.subtitle}
                    </p>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 font-medium">
                      {module.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Ver sistema e imágenes</span>
                    <span className="text-red-400 font-black flex items-center space-x-1 group-hover:translate-x-1 transition">
                      <span>Ver Demo</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* LIVE INTERACTIVE DEMO STAGE */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedModule.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          
          {/* Stage Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider">
                  DEMO INTERACTIVA EN VIVO
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedModule.clientExample}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {selectedModule.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {selectedModule.description}
              </p>
            </div>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={getWhatsAppRequestUrl(selectedModule.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Solicitar Sistema Parecido</span>
            </motion.a>
          </div>

        {/* Feature Highlights Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedModule.features.map((feat, idx) => (
            <div key={idx} className="flex items-center space-x-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* REAL SOFTWARE PHOTOS & CAPTURES GALLERY (Requested by user) */}
        <div className="bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-red-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Fotos & Capturas Reales del Programa en Funcionamiento</span>
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              Imágenes de Pantallas en Clientes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Main Image */}
            {selectedModule.imageUrl && (
              <div className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 h-44 sm:h-52">
                <img
                  src={selectedModule.imageUrl}
                  alt={selectedModule.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold text-white">
                  <span className="bg-red-600/90 px-2 py-0.5 rounded text-[10px] uppercase font-black">
                    Vista Principal
                  </span>
                  <span className="text-zinc-300 font-mono text-[10px]">
                    {selectedModule.badge}
                  </span>
                </div>
              </div>
            )}

            {/* Additional Screenshots */}
            {selectedModule.screenshots && selectedModule.screenshots.map((shot, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 h-44 sm:h-52">
                <img
                  src={shot}
                  alt={`${selectedModule.title} capt ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-[10px] font-bold text-zinc-200">
                  <span className="bg-zinc-800/90 px-2 py-0.5 rounded text-zinc-300">
                    Captura #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </AnimatePresence>

    {/* STRUCTURAL EXTENSIONS */}
    <div className="space-y-12 pt-8 border-t border-zinc-800/80">
      {/* 1. Modalidades & Planes de Trabajo */}
      <PlansAndModalitiesSection phone={phone} />

      {/* 2. Simulador de Retorno de Inversión (ROI) */}
      <RoiCalculatorSection phone={phone} />

      {/* 3. Casos de Éxito & Testimonios */}
      <TestimonialsSection phone={phone} />

      {/* 4. Preguntas Frecuentes Interactivas */}
      <FaqAccordionSection phone={phone} />
    </div>

  </div>
);
};
