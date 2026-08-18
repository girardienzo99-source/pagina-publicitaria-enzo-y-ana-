import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, MessageCircle, Sparkles, Check } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface PlansAndModalitiesSectionProps {
  phone: string;
}

export const PlansAndModalitiesSection: React.FC<PlansAndModalitiesSectionProps> = () => {
  const plans = [
    {
      id: 'pyme',
      badge: 'MÁS ELEGIDO X PYMES',
      title: 'Plan Inicial Pyme',
      subtitle: 'Para comercios locales que quieren orden rápido y control total.',
      price: 'Entrega en 3 a 5 Días',
      highlight: 'Pago Único o Cuotas',
      isFeatured: false,
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
      title: 'Plan Pro Multicaja & ARCA',
      subtitle: 'Para negocios con alto volumen, restaurantes o sucursales.',
      price: 'Entrega en 5 a 7 Días',
      highlight: 'ARCA + Comanderas',
      isFeatured: true,
      features: [
        'Múltiples Cajas en Simultáneo (Red Local / Cloud)',
        'Facturación Electrónica ARCA (ex AFIP) A, B y C automáticas',
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
      title: 'Software a Medida Desde Cero',
      subtitle: 'Para clínicas, distribuidoras, industrias o proyectos únicos.',
      price: 'Presupuesto a Medida',
      highlight: 'Sin Límites de Código',
      isFeatured: false,
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
      className="space-y-10 py-6 font-montserrat text-[#1e1b1b]"
    >
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#4a5d4a]" />
          <span>Modalidades de Contratación & Planes</span>
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1e1b1b] tracking-tight">
          Elegí la modalidad perfecta para la escala de tu negocio
        </h2>
        <p className="text-xs sm:text-base text-[#1e1b1b]/70 font-light leading-relaxed">
          Todos los planes incluyen diseño responsivo, instalación, configuración personalizada, carga inicial de datos y soporte posventa directo con <strong className="font-bold text-[#1e1b1b]">Anahí Gilardi & Enzo Girardi (Programadores)</strong>.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((plan) => {
          const whatsappUrl = getWhatsAppUrl(
            `Hola Anahí y Enzo! Me interesa consultar por el ${plan.title} en Río Cuarto Web.`
          );

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-7 flex flex-col justify-between shadow-lg transition-all relative ${
                plan.isFeatured
                  ? 'bg-white border-2 border-[#4a5d4a] shadow-2xl md:-translate-y-2'
                  : 'bg-white border border-stone-200 shadow-md'
              }`}
            >
              <div className="space-y-4">
                
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    plan.isFeatured
                      ? 'bg-[#4a5d4a] text-white shadow-sm'
                      : 'bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20'
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b]">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-[#1e1b1b]/70 mt-1 font-normal leading-relaxed min-h-[34px]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="p-3 rounded-lg bg-[#fcf9f8] border border-stone-200 flex justify-between items-center text-xs font-mono">
                  <span className="text-[#1e1b1b]/80 font-bold">{plan.price}</span>
                  <span className="text-[#4a5d4a] font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#4a5d4a]" />
                    <span>{plan.highlight}</span>
                  </span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a5d4a] block">
                    Incluye:
                  </span>
                  <ul className="space-y-2 text-xs text-[#1e1b1b]/85">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-[#fcf9f8] p-2.5 rounded-sm border border-stone-200">
                        <Check className="w-4 h-4 text-[#4a5d4a] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Ideal For & CTA Button */}
              <div className="pt-6 mt-6 border-t border-stone-100 space-y-3">
                <div className="text-[11px] text-[#1e1b1b]/70 font-normal">
                  <strong className="text-[#1e1b1b] font-bold">Ideal para:</strong> {plan.idealFor}
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center space-x-2 w-full py-3.5 min-h-[44px] rounded-sm font-bold text-xs uppercase tracking-wider transition shadow-md ${
                    plan.isFeatured
                      ? 'bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white'
                      : 'border border-stone-300 hover:bg-stone-50 text-[#1e1b1b]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{plan.ctaText}</span>
                </a>
              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
