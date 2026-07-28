import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, Zap, ShieldAlert, Cpu, Sparkles, MessageCircle } from 'lucide-react';

interface PlansAndModalitiesSectionProps {
  phone: string;
}

export const PlansAndModalitiesSection: React.FC<PlansAndModalitiesSectionProps> = ({ phone }) => {
  const plans = [
    {
      id: 'pyme',
      badge: 'MÁS ELEGIDO X PYMES',
      badgeColor: 'bg-emerald-600 text-white border-emerald-400',
      title: 'Plan Inicial Pyme',
      subtitle: 'Para comercios locales que quieren orden rápido',
      price: 'Entrega en 3 a 5 Días',
      highlight: 'Pago Único o Cuotas',
      color: 'border-emerald-500/40 hover:border-emerald-500',
      bgGradient: 'from-zinc-950 via-emerald-950/20 to-zinc-900',
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
      badgeColor: 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-lg shadow-red-950/60',
      title: 'Plan Pro Multicaja & AFIP',
      subtitle: 'Para negocios con alto volumen o sucursales',
      price: 'Entrega en 5 a 7 Días',
      highlight: 'AFIP + Comanderas',
      color: 'border-red-500/60 ring-2 ring-red-500/30 hover:border-red-400',
      bgGradient: 'from-zinc-950 via-red-950/30 to-stone-950',
      features: [
        'Múltiples Cajas en Simultáneo (Red Local / Cloud)',
        'Facturación Electrónica AFIP A / B / C automáticas',
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
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: 'Software a Medida Desde Cero',
      subtitle: 'Para clínicas, industrias o proyectos a medida',
      price: 'Presupuesto a Medida',
      highlight: 'Sin Límites de Código',
      color: 'border-amber-500/40 hover:border-amber-500',
      bgGradient: 'from-zinc-950 via-amber-950/20 to-zinc-900',
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
      className="space-y-6"
    >
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-900/30 text-rose-200 border border-rose-500/30 text-xs font-black uppercase tracking-wider">
          <Layers className="w-4 h-4 text-rose-300" />
          <span>Modalidades de Contratación</span>
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Elegí la modalidad perfecta para la escala de tu negocio
        </h3>
        <p className="text-xs sm:text-sm text-rose-200/70 font-medium">
          Todos los planes incluyen diseño responsivo, instalación, configuración personalizada, carga inicial de datos y soporte posventa directo con Anahí Gilardi & Enzo Girardi (Programadores).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const whatsappUrl = `https://wa.me/549${phone}?text=${encodeURIComponent(`Hola Anahí y Enzo! Me interesa consultar por el ${plan.title} en Tu Sitio Web Río Cuarto.`)}`;
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border ${plan.color} bg-gradient-to-b ${plan.bgGradient} p-6 flex flex-col justify-between shadow-2xl transition-all relative overflow-hidden`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black text-white leading-tight">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">{plan.price}</span>
                  <span className="text-emerald-400 font-black">{plan.highlight}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">Incluye:</span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-3">
                <div className="text-[11px] text-zinc-400 font-medium">
                  <strong className="text-zinc-200">Ideal para:</strong> {plan.idealFor}
                </div>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl border border-zinc-700 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{plan.ctaText}</span>
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
