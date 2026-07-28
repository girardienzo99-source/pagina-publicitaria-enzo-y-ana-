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
  const [selectedWaiter, setSelectedWaiter] = useState<string>('Enzo Gilardi');
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
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>Proyectos Realizados por Tu Sitio Web Río Cuarto (Anahí & Enzo Gilardi)</span>
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

        {/* INTERACTIVE MOCK SCREEN (Inspired by user uploaded app screenshots) */}
        <div className="bg-slate-900 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Simulated Browser Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="font-mono text-slate-400 ml-2 bg-slate-900 px-3 py-1 rounded-md border border-slate-800 text-[11px] truncate">
                https://{selectedModule.clientExample || 'enzo-girardi-programas.app'}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                ● En línea (Cloud)
              </span>
            </div>
          </div>

          {/* Interactive Screen Body */}
          <div className="p-4 sm:p-6 bg-stone-900/40 min-h-[420px] text-slate-100">
            
            {/* Top Metrics Row */}
            {selectedModule.mockUI.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {selectedModule.mockUI.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                    <span className={`text-sm sm:text-base font-black ${m.color}`}>{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* RESTO / PIZZERÍA DEMO INTERFACE */}
            {selectedModule.mockUI.type === 'resto' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Tables & Waiter controls (Left col) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>Mozo en Turno Activo</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">Terminal Registrada</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['Enzo Girardi', 'Micaela', 'Sofía'].map(w => (
                        <button
                          key={w}
                          onClick={() => setSelectedWaiter(w)}
                          className={`py-2 px-1 text-xs font-bold rounded-lg border transition ${
                            selectedWaiter === w 
                              ? 'bg-emerald-600 text-white border-emerald-400' 
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Tables Layout */}
                  {selectedModule.mockUI.tables && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Distribución de Mesas
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                          {selectedModule.mockUI.tables.filter(t => t.status === 'ocupada').length} OCUPADAS
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {selectedModule.mockUI.tables.map(table => {
                          const isOccupied = table.status === 'ocupada';
                          const isSelectedTable = activeTableId === table.id;

                          return (
                            <button
                              key={table.id}
                              onClick={() => setActiveTableId(table.id)}
                              className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                                isSelectedTable
                                  ? 'ring-2 ring-emerald-400 border-emerald-400 bg-emerald-950/40'
                                  : isOccupied
                                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <span className="text-xs font-bold">{table.name}</span>
                              <span className={`text-[9px] font-semibold mt-1 uppercase ${
                                isOccupied ? 'text-amber-400' : 'text-slate-500'
                              }`}>
                                {isOccupied ? `Mozo: ${table.waiter || 'Enzo'}` : 'LIBRE'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Menu items & Active Comanda (Right col) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Menú & Tragos Premium
                    </span>
                    
                    <div className="space-y-2">
                      {selectedModule.mockUI.items?.map(item => (
                        <div key={item.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-[10px] text-amber-400 font-semibold">{item.price}</span>
                              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                {item.status}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddItemToOrder(item.name, item.price)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                            title="Agregar a la comanda"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comanda Ticket Panel */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Nueva Comanda #{activeTableId || 1}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Mozo: {selectedWaiter}
                        </span>
                      </div>

                      {orderItems.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-8">
                          Seleccioná ítems del menú para enviar a cocina/barra.
                        </p>
                      ) : (
                        <ul className="space-y-2 text-xs">
                          {orderItems.map((item, i) => (
                            <li key={i} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                              <span>{item.name}</span>
                              <span className="font-bold text-emerald-400">{item.price}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 mt-4 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Estado:</span>
                        <span className="text-emerald-400">Listo para Despacho en Barra</span>
                      </div>
                      <button
                        onClick={() => alert(`Comanda enviada con éxito a Cocina/Barra por ${selectedWaiter}!`)}
                        className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs rounded-lg uppercase tracking-wider shadow-md hover:opacity-90 transition"
                      >
                        Enviar Comanda a Cocina
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ECOMMERCE / INDUMENTARIA DEMO INTERFACE */}
            {selectedModule.mockUI.type === 'ecommerce' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase">
                      Catálogo de Productos - Talles & Colores
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">
                    BLESSED PREMIUM SNEAKERS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedModule.mockUI.items?.map(item => (
                    <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">
                          {item.category}
                        </span>
                        <span className="text-slate-500">{item.tag}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-sm font-extrabold text-amber-400">{item.price}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SAAS MULTIRRUBRO DEMO INTERFACE */}
            {selectedModule.mockUI.type === 'saas' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase flex items-center space-x-2">
                    <Grid className="w-4 h-4 text-cyan-400" />
                    <span>Módulos de Negocio Disponibles (+14 Rubros)</span>
                  </span>
                  <span className="text-xs text-cyan-400 font-semibold">ERP Multirrubro</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedModule.mockUI.items?.map(mod => (
                    <div key={mod.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 hover:border-cyan-500/40 transition">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{mod.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {mod.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{mod.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Screen Footer */}
          <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              💡 ¿Querés adaptar este sistema con el logo y colores de tu negocio?
            </span>

            <a
              href={getWhatsAppRequestUrl(selectedModule.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline flex items-center space-x-1"
            >
              <span>Consultar a Anahí & Enzo Gilardi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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
