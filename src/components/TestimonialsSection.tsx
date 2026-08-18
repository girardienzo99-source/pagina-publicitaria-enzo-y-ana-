import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Award, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  rubro: 'gastronomia' | 'comercio' | 'salud' | 'taller';
  city: string;
  rating: number;
  metric: string;
  comment: string;
  systemName: string;
}

interface TestimonialsSectionProps {
  phone: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
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
      comment: 'Antes perdíamos tiempo anotando comandas en papel y la cocina se demoraba. Con el programa de Enzo las comandas impresas salen directo al maestro pizzero y cobramos en la mesa en 20 segundos.',
      systemName: 'Sistema Resto & Comanderas'
    },
    {
      id: 't2',
      clientName: 'Gabriel V.',
      businessName: 'Distribuidora San Juan',
      rubro: 'comercio',
      city: 'Río Cuarto',
      rating: 5,
      metric: 'Facturación en 2 segundos',
      comment: 'El módulo de facturación ARCA nos solucionó los problemas de fin de mes. Emitimos comprobantes A y B autorizados al instante con código QR oficial sin caídas.',
      systemName: 'Facturación ARCA & Cajas'
    },
    {
      id: 't3',
      clientName: 'Dra. Lucía M.',
      businessName: 'Centro Odontológico Dentalis',
      rubro: 'salud',
      city: 'Villa María',
      rating: 5,
      metric: '-50% en ausencias de turnos',
      comment: 'La agenda digital y el historial clínico de los pacientes es impecable. El recordatorio automático de turnos por WhatsApp redujo los turnos perdidos a la mitad.',
      systemName: 'Historias Clínicas & Turnos'
    },
    {
      id: 't4',
      clientName: 'Roberto P.',
      businessName: 'Taller & Repuestos El Eje',
      rubro: 'taller',
      city: 'Río Cuarto',
      rating: 5,
      metric: 'Control total de reparaciones',
      comment: 'Llevamos el seguimiento de cada vehículo, repuestos usados y presupuesto aprobado por el cliente desde el celular. Un sistema simple y sin vueltas.',
      systemName: 'ERP Taller Mecánico'
    },
    {
      id: 't5',
      clientName: 'Esteban C.',
      businessName: 'Supermercado Central',
      rubro: 'comercio',
      city: 'Río Tercero',
      rating: 5,
      metric: 'Cajas ultrarrápidas con lector',
      comment: 'Tenemos 3 cajas cobrando en simultáneo. El arqueo de caja diario coincide al centavo y el control de vencimientos de mercadería nos ahorra dinero todos los días.',
      systemName: 'POS Multicaja & Stock'
    },
    {
      id: 't6',
      clientName: 'Romina B.',
      businessName: 'Boutique & Calzado Urbano',
      rubro: 'comercio',
      city: 'Río Cuarto',
      rating: 5,
      metric: 'Control exacto de talles/colores',
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
      className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xl space-y-8 font-montserrat text-[#1e1b1b]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-[#4a5d4a]" />
            <span>Casos de Éxito & Testimonios</span>
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#1e1b1b] mt-2">
            Lo que dicen dueños de negocios que ya usan Río Cuarto Web
          </h3>
          <p className="text-xs sm:text-sm text-[#1e1b1b]/70 font-light mt-1">
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
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filter === f.id
                  ? 'bg-[#4a5d4a] text-white shadow-sm'
                  : 'bg-[#fcf9f8] text-[#1e1b1b]/70 hover:bg-stone-200/70 border border-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map(t => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-[#fcf9f8] border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#4a5d4a] transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20">
                    {t.metric}
                  </span>
                </div>

                <p className="text-xs text-[#1e1b1b]/80 italic font-normal leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#1e1b1b] group-hover:text-[#4a5d4a] transition">
                    {t.clientName}
                  </h4>
                  <p className="text-[11px] text-[#1e1b1b]/60">
                    {t.businessName} • <span>{t.city}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-[#4a5d4a] bg-white px-2 py-0.5 rounded border border-stone-200 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-[#4a5d4a]" />
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
