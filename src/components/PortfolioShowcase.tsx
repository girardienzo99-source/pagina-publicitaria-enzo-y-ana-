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

  const filteredModules = selectedCategory === 'todos' 
    ? portfolioModules 
    : portfolioModules.filter(m => m.rubro === selectedCategory);

  const getWhatsAppRequestUrl = (moduleTitle: string) => {
    const text = `Hola Anahí y Enzo! Estuve viendo en su sitio el proyecto "${moduleTitle}". Quisiera pedirles presupuesto y asesoramiento para implementar algo similar en mi negocio.`;
    return `https://wa.me/5493584860640?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-12 pb-16 font-montserrat text-[#1e1b1b]">
      
      {/* Header Banner - Modern Vintage */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl"
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#4a5d4a]" />
            <span>Desarrollos Realizados por Anahí Gilardi & Enzo Girardi</span>
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1e1b1b] tracking-tight">
          Portafolio de Programas & Sistemas Creados
        </h1>
        <p className="text-sm sm:text-base text-[#1e1b1b]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Explorá los sistemas creados para Gastronomía, Salud, Tiendas de Ropa, Ferreterías, Talleres, Supermercados y ERP Multirrubro funcionando en clientes reales.
        </p>

        {/* PDF Download Button & WhatsApp Consultation */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onOpenPdfCatalog && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPdfCatalog}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-white hover:bg-stone-50 text-[#1e1b1b] font-bold text-xs uppercase tracking-wider border border-stone-300 shadow-sm transition"
            >
              <span>📄 Descargar Catálogo (PDF)</span>
            </motion.button>
          )}

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/549${phone}?text=Hola%20Anah%C3%AD%20y%20Enzo!%20Estuve%20viendo%20los%20proyectos%20de%20R%C3%ADo%20Cuarto%20Web%20y%20quisiera%20pedir%20presupuesto.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#4a5d4a]" />
            <span>Consultar por WhatsApp</span>
          </motion.a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-stone-200">
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
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  isActive
                    ? 'bg-[#4a5d4a] text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-[#1e1b1b]/70 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Grid: Modules Selection Cards */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredModules.map((module, idx) => {
            const isSelected = selectedModule.id === module.id;
            return (
              <motion.div
                key={module.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedModule(module)}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white border-2 border-[#4a5d4a] shadow-2xl scale-[1.02]'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Image Preview Thumbnail Header */}
                {module.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img
                      src={module.imageUrl}
                      alt={module.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#4a5d4a] text-white shadow-md">
                        {module.badge}
                      </span>
                    </div>

                    {module.clientExample && (
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[#1e1b1b] border border-stone-300 shadow-sm">
                        {module.clientExample}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1e1b1b] leading-snug group-hover:text-[#4a5d4a] transition">
                      {module.title}
                    </h3>
                    <p className="text-xs text-[#4a5d4a] font-bold mt-0.5">
                      {module.subtitle}
                    </p>
                    <p className="text-xs text-[#1e1b1b]/70 line-clamp-2 mt-1.5 font-normal">
                      {module.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#1e1b1b]/60">Ver detalle</span>
                    <span className="text-[#4a5d4a] flex items-center space-x-1 group-hover:translate-x-1 transition">
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
          className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8"
        >
          
          {/* Stage Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-sm bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
                  DEMO EN VIVO
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {selectedModule.clientExample}
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b] mt-2">
                {selectedModule.title}
              </h2>
              <p className="text-sm text-[#1e1b1b]/70 mt-1 max-w-3xl">
                {selectedModule.description}
              </p>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={getWhatsAppRequestUrl(selectedModule.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3.5 bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#4a5d4a]" />
              <span>Pedir Sistema Parecido</span>
            </motion.a>
          </div>

          {/* Feature Highlights Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedModule.features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-[#fcf9f8] p-3.5 rounded-sm border border-stone-200 text-xs text-[#1e1b1b] font-medium">
                <CheckCircle className="w-4 h-4 text-[#4a5d4a] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* REAL SOFTWARE PHOTOS & CAPTURES GALLERY */}
          <div className="bg-[#fcf9f8] rounded-2xl p-6 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#4a5d4a]" />
                <span>Fotos & Capturas Reales del Programa en Funcionamiento</span>
              </h3>
              <span className="text-[11px] font-mono text-stone-500">
                Imágenes de Pantallas en Clientes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Main Image */}
              {selectedModule.imageUrl && (
                <div className="group relative rounded-xl overflow-hidden border border-stone-300 bg-stone-100 h-48 sm:h-56 shadow-sm">
                  <img
                    src={selectedModule.imageUrl}
                    alt={moduleNameHelper(selectedModule.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold text-white">
                    <span className="bg-[#4a5d4a] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      Vista Principal
                    </span>
                    <span className="text-white/90 font-mono text-[10px]">
                      {selectedModule.badge}
                    </span>
                  </div>
                </div>
              )}

              {/* Additional Screenshots */}
              {selectedModule.screenshots && selectedModule.screenshots.map((shot, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden border border-stone-300 bg-stone-100 h-48 sm:h-56 shadow-sm">
                  <img
                    src={shot}
                    alt={`${selectedModule.title} capt ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-[10px] font-bold text-white">
                    <span className="bg-stone-800/90 px-2 py-0.5 rounded text-white">
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
      <div className="space-y-12 pt-8 border-t border-stone-200">
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

function moduleNameHelper(title: string): string {
  return title;
}
