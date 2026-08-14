import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, CheckCircle2, Award, MessageCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  rubro: 'gastronomia' | 'comercio' | 'salud' | 'taller';
  city: string;
  rating: number;
  metric: string;
  metricColor: string;
  comment: string;
  systemName: string;
}

interface TestimonialsSectionProps {
  phone: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ phone }) => {
  const [filter, setFilter] = useState<string>('todos');

  const testimonials: Testimonial[] = [
    {
      id: 't1',
      clientName: 'Marcos A.',
      businessName: 'Pizzería & Resto La Cabaña',
      rubro: 'gastronomia',
      city: 'Córdoba Cap.',
      rating: 5,
      metric: '+35% en rotación de mesas',
      metricColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      comment: 'Antes perdíamos tiempo anotando comandas en papel y la cocina se demoraba. Con el programa de Enzo las comandas impresas salen directo al maestro pizzero y cobramos en la mesa en 20 segundos.',
      systemName: 'Sistema Resto & Comanderas'
    },
    {
      id: 't2',
      clientName: 'Gabriel V.',
      businessName: 'Ferretería & Corralón El Vulcano',
      rubro: 'comercio',
      city: 'Villa María',
      rating: 5,
      metric: '0 errores en cuentas corrientes',
      metricColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800',
      comment: 'Tenemos más de 80 constructoras en cuenta corriente. El sistema emite remitos y presupuestos en PDF al instante y sabemos exactamente el saldo de cada cliente con limite de crédito.',
      systemName: 'Gestión Ferretería & Corralón'
    },
    {
      id: 't3',
      clientName: 'Dra. Silvina M.',
      businessName: 'Consultorio Médico & Salud',
      rubro: 'salud',
      city: 'Río Cuarto',
      rating: 5,
      metric: '1.240 fichas digitales',
      metricColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
      comment: 'Tengo las historias clínicas de todos mis pacientes organizadas con fecha, evoluciones y archivos PDF. La agenda de turnos nos ordenó la recepción por completo.',
      systemName: 'Historia Clínica Digital'
    },
    {
      id: 't4',
      clientName: 'Carlos M.',
      businessName: 'AutoFix Servicentro Automotriz',
      rubro: 'taller',
      city: 'San Francisco',
      rating: 5,
      metric: 'Aviso WhatsApp automático',
      metricColor: 'text-red-400 bg-red-950/60 border-red-800',
      comment: 'Buscamos la orden de trabajo directamente ingresando la patente. El cliente recibe el mensaje automático por WhatsApp apenas el auto está listo para retirar.',
      systemName: 'Sistema Taller & Patentes'
    },
    {
      id: 't5',
      clientName: 'Romina B.',
      businessName: 'Boutique Urban Calzados',
      rubro: 'comercio',
      city: 'Córdoba Cap.',
      rating: 5,
      metric: 'Control exacto de talles/colores',
      metricColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      comment: 'Pudimos etiquetar todo el calzado con código de barras y saber en 1 segundo qué talle tenemos en depósito sin tener que ir a buscar caja por caja.',
      systemName: 'Indumentaria & Stock'
    }
  ];

  const filtered = filter === 'todos' 
    ? testimonials 
    : testimonials.filter(t => t.rubro === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-rose-900/30">
        <div>
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Casos de Éxito & Testimonios</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 uppercase tracking-tight">
            Lo que dicen dueños de negocios que ya usan Río Cuarto Web
          </h3>
          <p className="text-xs sm:text-sm text-rose-200/70 font-medium mt-1">
            Resultados comprobados en locales comerciales, gastronomía, salud y servicios profesionales.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'gastronomia', label: 'Gastronomía' },
            { id: 'comercio', label: 'Comercio/Stock' },
            { id: 'salud', label: 'Salud' },
            { id: 'taller', label: 'Taller' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filter === f.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                  : 'bg-[#18040B] text-rose-200/70 hover:text-white border border-rose-900/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map(t => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-[#18040B]/90 border border-rose-900/40 card-premium-glow rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${t.metricColor}`}>
                    {t.metric}
                  </span>
                </div>

                <p className="text-xs text-rose-100 italic font-medium leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-rose-900/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition">
                    {t.clientName}
                  </h4>
                  <p className="text-[11px] text-rose-200/70 font-semibold">
                    {t.businessName} • <span className="text-rose-300/50">{t.city}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 font-mono font-black">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verificado</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
