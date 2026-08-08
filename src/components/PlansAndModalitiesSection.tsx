import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface PlansAndModalitiesSectionProps {
  phone: string;
}

export const PlansAndModalitiesSection: React.FC<PlansAndModalitiesSectionProps> = () => {
  const plans = [
    {
      id: 'pyme',
      badge: 'MÁS ELEGIDO X PYMES',
      badgeColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/60',
      title: 'Plan Inicial Pyme',
      subtitle: 'Para comercios locales que quieren orden rápido',
      price: 'Entrega en 3 a 5 Días',
      highlight: 'Pago Único o Cuotas',
      color: 'border-emerald-500/50 hover:border-emerald-400 shadow-emerald-950/50',
      bgGradient: 'from-[#14060E] via-[#0E2018] to-[#0A1812]',
      buttonStyle: 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-emerald-300/40 shadow-emerald-950/80',
      features: [
        '1 Punto de Venta / Caja Ultrarrápida',
        'Gestión de Productos con Código de Barras / Fotos',
        'Cierre de Caja Diario y Control de Efectivo/MP',
        'Cuentas Corrientes de Clientes con historial',
        'Capacitación y Soporte directo por WhatsApp'
      ],
      idealFor: 'Kioscos, Almacenes, Indumentaria, Calzado, Estéticas',
      ctaText: 'Consultar Plan Pyme'
    },
    {
      id: 'pro',
      badge: 'SISTEMA RECOMENDADO',
      badgeColor: 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white border-rose-300 shadow-xl shadow-rose-950/80 animate-pulse',
      title: 'Plan Pro Multicaja & AFIP',
      subtitle: 'Para negocios con alto volumen o sucursales',
      price: 'Entrega en 5 a 7 Días',
      highlight: 'AFIP + Comanderas',
      color: 'border-rose-500/80 ring-2 ring-rose-500/40 hover:border-rose-400 shadow-rose-950/90',
      bgGradient: 'from-[#2B0A1A] via-[#3B0E25] to-[#1C0510]',
      buttonStyle: 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white border-rose-300/50 shadow-rose-950/90',
      features: [
        'Múltiples Cajas en Simultáneo (Red Local / Cloud)',
        'Facturación Electrónica AFIP / ARCA A, B y C automáticas',
        'Impresión de Comanderas / Tickets fiscales',
        'Control de Stock Múltiple Depósito y Proveedores',
        'Reportes gráficos avanzados de ventas y rentabilidad'
      ],
      idealFor: 'Restaurantes, Pizzerías, Corralones, Ferreterías, Supermercados',
      ctaText: 'Solicitar Demo Plan Pro'
    },
    {
      id: 'custom',
      badge: 'DESARROLLO 100% EXCLUSIVO',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border-amber-300 shadow-lg shadow-amber-950/60 font-black',
      title: 'Software a Medida Desde Cero',
      subtitle: 'Para clínicas, industrias o proyectos a medida',
      price: 'Presupuesto a Medida',
      highlight: 'Sin Límites de Código',
      color: 'border-amber-500/50 hover:border-amber-400 shadow-amber-950/50',
      bgGradient: 'from-[#241508] via-[#2D1606] to-[#180A04]',
      buttonStyle: 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 border-amber-300/40 shadow-amber-950/80',
      features: [
        'Arquitectura 100% personalizada a tu proceso',
        'Módulos de Historias Clínicas, Turnos o Producción',
        'Integración con WhatsApp Bot y Avisos automáticos',
        'Aplicación Móvil Web Progresiva para celular',
        'Código fuente 100% propio del cliente'
      ],
      idealFor: 'Consultorios Médicos, Distribuidoras, Talleres, Industrias',
      ctaText: 'Cotizar Proyecto Exclusivo'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 py-6"
    >
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-700/50 text-xs font-black uppercase tracking-wider shadow-lg">
          <Layers className="w-4 h-4 text-rose-300" />
          <span>Modalidades de Contratación & Planes</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Elegí la modalidad perfecta para la escala de tu negocio
        </h2>
        <p className="text-xs sm:text-base text-rose-200/70 font-medium">
          Todos los planes incluyen diseño responsivo, instalación, configuración personalizada, carga inicial de datos y soporte posventa directo con <strong className="text-white">Anahí Gilardi & Enzo Girardi (Programadores)</strong>.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const whatsappUrl = getWhatsAppUrl(
            `Hola Anahí y Enzo! Me interesa consultar por el ${plan.title} en Río Cuarto Web.`
          );

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border-2 ${plan.color} bg-gradient-to-b ${plan.bgGradient} p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all relative overflow-hidden backdrop-blur-xl`}
            >
              <div className="space-y-4">
                
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-md ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-rose-200/70 mt-1 font-medium leading-relaxed">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex justify-between items-center text-xs font-mono">
                  <span className="text-rose-200/70 font-bold">{plan.price}</span>
                  <span className="text-emerald-400 font-black flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{plan.highlight}</span>
                  </span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-300">
                    Incluye:
                  </span>
                  <ul className="space-y-2 text-xs text-rose-100/90 font-medium">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-black/30 p-2 rounded-xl border border-white/5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Ideal For & Ultra-Premium CTA Button */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="text-[11px] text-rose-200/70 font-medium">
                  <strong className="text-white font-bold">Ideal para:</strong> {plan.idealFor}
                </div>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center space-x-2.5 w-full py-3.5 min-h-[48px] rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl border transition-all transform ${plan.buttonStyle}`}
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-current" />
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
