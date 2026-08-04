import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Utensils, 
  FileCheck, 
  ShoppingBag, 
  Calendar, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  Code2
} from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface ServicesGridSectionProps {
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
}

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({
  onNavigateToPortfolio,
  onNavigateToCalculator
}) => {
  const services = [
    {
      id: 'web-design',
      title: 'Páginas Web & Tiendas Online',
      subtitle: 'Diseño ultra-rápido y optimizado para Google',
      icon: Globe,
      color: 'from-rose-500 to-amber-500',
      badge: 'Cero Comisiones',
      desc: 'Creamos tu sitio web corporativo o tienda electrónica sin pagar comisiones por venta. Adaptable 100% a celulares y con botón directo de pedido a WhatsApp.',
      features: ['Diseño responsive adaptado a celulares', 'Catálogo de productos e imágenes HD', 'Enlace directo a WhatsApp & Google Maps', 'Posicionamiento SEO en Río Cuarto & Argentina']
    },
    {
      id: 'gastronomia',
      title: 'Gestión Gastronómica & Comandas',
      subtitle: 'Para Resto, Bares, Pizzerías y Cafeterías',
      icon: Utensils,
      color: 'from-amber-500 to-orange-600',
      badge: 'Mozos & Cocina',
      desc: 'Control de mesas en tiempo real, mozos tomando comanda en tablet, despacho automático a impresora de cocina y arqueo de caja diario.',
      features: ['Mapa de mesas libres / ocupadas', 'Comandas enviadas a cocina en 1 sec', 'Cobro ágil con varios medios de pago', 'Cierre e historial de ventas por turno']
    },
    {
      id: 'arca',
      title: 'Facturación Electrónica ARCA (ex AFIP)',
      subtitle: 'Emisión automática A, B y C sin demoras',
      icon: FileCheck,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Oficial ARCA',
      desc: 'Olvidate de ingresar a la web de la AFIP por cada venta. Emití comprobantes A, B y C aprobados por ARCA con CAE en 2 segundos desde tu caja.',
      features: ['Emisión de Factura A, B y C', 'Envío automático por correo o WhatsApp', 'Generación de PDF con código QR oficial', 'Reporte de ventas para tu contador']
    },
    {
      id: 'indumentaria',
      title: 'Tienda de Ropa & Control de Stock',
      subtitle: 'Matriz de talles, colores y lecturas rápidas',
      icon: ShoppingBag,
      color: 'from-[#A8284B] to-rose-600',
      badge: 'Talles & Colores',
      desc: 'Organizá tu tienda de indumentaria o calzado. Matriz de talles (S al XXL), colores, lector de códigos de barra y alertas automáticas de falta de prenda.',
      features: ['Stock organizado por talle y variante', 'Lectura con pistola de código de barras', 'Descuento de stock en tiempo real', 'Etiquetas de precios y códigos']
    },
    {
      id: 'salud',
      title: 'Salud, Consultorios & Agenda',
      subtitle: 'Fichas clínicas y recordatorios WhatsApp',
      icon: Calendar,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Turnos & Fichas',
      desc: 'Agenda médica de turnos online, recordatorios automáticos enviados por WhatsApp para reducir inasistencias y fichas clínicas digitales seguras.',
      features: ['Agenda de profesionales y horarios', 'Recordatorio automático por WhatsApp', 'Historia clínica y antecedentes del paciente', 'Cobro de consultas y cuotas']
    },
    {
      id: 'erp-multirrubro',
      title: 'ERP SaaS, Ferreterías & Talleres',
      subtitle: 'Órdenes de trabajo y cuentas corrientes',
      icon: Wrench,
      color: 'from-blue-600 to-indigo-700',
      badge: '+14 Módulos',
      desc: 'Sistema completo para ferreterías, corralones, talleres mecánicos y empresas de servicios. Control de repuestos, presupuestos y saldos de clientes.',
      features: ['Órdenes de trabajo e historial vehicular', 'Gestión de cuentas corrientes de clientes', 'Presupuestos PDF enviados por email', 'Multi-sucursal y roles con permisos']
    }
  ];

  return (
    <section className="space-y-10 py-8">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-950/70 text-rose-300 border border-rose-800/50 text-xs font-black uppercase tracking-wider shadow-md">
          <Code2 className="w-4 h-4 text-rose-400" />
          <span>Soluciones Desarrolladas por Anahí Gilardi & Enzo Girardi</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Sistemas & Programas Creados a la Medida de tu Negocio
        </h2>
        <p className="text-xs sm:text-base text-rose-200/70 font-medium">
          Elegí la solución desarrollada específicamente para tu rubro. Sin comisiones abusivas y con soporte técnico directo de programadores.
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv, idx) => {
          const IconComponent = srv.icon;
          const serviceWhatsAppUrl = getWhatsAppUrl(
            `Hola Anahí y Enzo! Quisiera consultar por el servicio de "${srv.title}" para mi negocio.`
          );

          return (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group bg-[#240A15]/90 hover:bg-[#330C1E] border border-rose-900/40 hover:border-rose-500/50 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${srv.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#18040B] rounded-[14px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 text-[11px] font-black uppercase tracking-wider">
                    {srv.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-rose-200 transition">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-rose-300/80 mb-2">
                    {srv.subtitle}
                  </p>
                  <p className="text-xs text-rose-200/70 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                {/* Feature Bullet List */}
                <ul className="space-y-1.5 pt-2 border-t border-rose-900/30">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-xs text-rose-100/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Card Action Button */}
              <a
                href={serviceWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 min-h-[44px] rounded-xl bg-[#18040B] group-hover:bg-rose-900/90 text-rose-200 group-hover:text-white border border-rose-900/50 group-hover:border-rose-500/40 text-xs font-black transition-all"
              >
                <span>Consultar por WhatsApp</span>
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
