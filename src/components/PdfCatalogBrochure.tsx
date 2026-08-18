import React from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  X, 
  Download, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Layers, 
  Phone, 
  Mail, 
  MapPin, 
  Check,
  Zap,
  Globe,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { FlyerData } from '../types';
import { portfolioModules } from '../data/portfolioData';
import { 
  getWhatsAppUrl, 
  ANAHI_PHONE_FORMATTED, 
  ENZO_PHONE_FORMATTED, 
  ANAHI_EMAIL, 
  ENZO_EMAIL 
} from '../lib/whatsapp';

interface PdfCatalogBrochureProps {
  flyerData: FlyerData;
  onClose: () => void;
}

export const PdfCatalogBrochure: React.FC<PdfCatalogBrochureProps> = ({ flyerData, onClose }) => {
  const whatsappUrl = getWhatsAppUrl(
    'Hola Anahí y Enzo! Estuve viendo el Catálogo PDF de Río Cuarto Web y quisiera consultar por un proyecto para mi negocio.'
  );

  const handleDirectPdfDownload = async () => {
    const element = document.querySelector('.printable-catalog') || document.querySelector('.pdf-container');
    if (!element) return;

    try {
      if (!(window as any).html2pdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });
      }

      const opt = {
        margin:       [6, 6, 6, 6],
        filename:     'Catalogo_Sistemas_RioCuartoWeb.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#fcf9f8', logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await (window as any).html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Error al generar PDF directo:', err);
      window.print();
    }
  };

  const handlePrint = () => {
    try {
      if (typeof window !== 'undefined') {
        window.print();
      }
    } catch (err) {
      console.error('Error al ejecutar impresión:', err);
      alert('Para guardar en PDF: Presioná las teclas Ctrl + P en tu teclado y en el destino seleccioná "Guardar como PDF".');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="printable-dialog fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md p-2 sm:p-6 flex flex-col items-center justify-start font-montserrat text-[#1e1b1b]"
    >
      
      {/* Top Floating Control Bar (Hidden when printing) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="no-print sticky top-2 z-50 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 w-full max-w-5xl mb-6"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] flex items-center justify-center text-white font-bold shadow-md">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1e1b1b]">Catálogo PDF de Trabajos & Programas</h3>
            <p className="text-xs text-stone-500">Diseño Modern Vintage (Formato A4 Impresión)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDirectPdfDownload}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR ARCHIVO PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1e1b1b] font-bold text-xs border border-stone-200 transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Imprimir</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-[#4a5d4a] text-[#4a5d4a] hover:bg-[#4a5d4a]/10 font-bold text-xs uppercase tracking-wider transition"
          >
            <MessageCircle className="w-4 h-4 fill-[#4a5d4a]" />
            <span>Pedir Demo WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-[#1e1b1b] transition cursor-pointer"
            title="Cerrar vista PDF"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* PRINT STYLES SPECIFIC TO PDF GENERATION */}
      <style>{`
        @media print {
          body {
            background-color: #fcf9f8 !important;
            color: #1e1b1b !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .pdf-container {
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .pdf-page {
            page-break-after: always;
            break-after: page;
            min-height: 280mm;
            padding: 14mm !important;
            background: #ffffff !important;
            color: #1e1b1b !important;
            border: 1px solid #e2e8f0 !important;
            box-sizing: border-box;
          }
          .pdf-page:last-child {
            page-break-after: avoid;
            break-after: avoid;
          }
        }
      `}</style>

      {/* DOCUMENT CANVAS CONTAINER */}
      <div className="pdf-container w-full max-w-4xl space-y-8 text-[#1e1b1b]">
        
        {/* ================= PÁGINA 1: FLYER & PROPUESTA DE VALOR ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#4a5d4a]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-xl shadow-md">
                RC
              </div>
              <div>
                <h1 className="font-editorial text-2xl font-bold text-[#1e1b1b] tracking-tight">
                  Río Cuarto Web
                </h1>
                <p className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider">
                  Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi (Programadores)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] text-[10px] font-bold uppercase tracking-wider border border-[#4a5d4a]/20">
                CATÁLOGO OFICIAL • EDICIÓN 2026
              </span>
              <p className="text-[10px] text-stone-500 font-medium mt-1">
                Río Cuarto, Córdoba • Envíos e Instalación a todo el país
              </p>
            </div>
          </div>

          {/* Hook & Value Headline */}
          <div className="bg-[#4a5d4a] text-white p-5 rounded-2xl shadow-sm text-center">
            <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-wide mb-1">
              🚀 ¿LENTITUD EN TU NEGOCIO? MULTIPLICÁ TUS VENTAS HOY
            </h2>
            <p className="text-xs sm:text-sm text-stone-100 font-light leading-relaxed">
              "Diseño Digital a Medida: Desarrollamos tu sitio web y sistemas que automatizan tu gestión y ordenan tus ventas sin comisiones."
            </p>
          </div>

          {/* Offer & Guarantee Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#fcf9f8] border border-stone-200 flex items-center space-x-3">
              <Award className="w-8 h-8 text-[#4a5d4a] shrink-0" />
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Garantía Total</h4>
                <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                  Garantía total de satisfacción + Instalación y capacitación guiada paso a paso.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#4a5d4a]/10 border border-[#4a5d4a]/20 flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-[#4a5d4a] shrink-0" />
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Promoción Especial</h4>
                <p className="text-[11px] text-[#4a5d4a] font-bold leading-tight mt-0.5">
                  ¡DEMO GRATUITA Y ASESORAMIENTO SIN CARGO!
                </p>
              </div>
            </div>
          </div>

          {/* Why choose our custom software */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] border-b border-stone-200 pb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4a5d4a]" />
              <span>¿Por qué elegir nuestros programas a medida?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium">
              <div className="flex items-center space-x-2 bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-[#4a5d4a] shrink-0" />
                <span className="text-[#1e1b1b]">100% Personalizado a la medida de tu negocio</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-[#4a5d4a] shrink-0" />
                <span className="text-[#1e1b1b]">CERO Comisiones por venta ni cobros ocultos</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-[#4a5d4a] shrink-0" />
                <span className="text-[#1e1b1b]">Diseño moderno, rápido y adaptado a celulares</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200">
                <Check className="w-4 h-4 text-[#4a5d4a] shrink-0" />
                <span className="text-[#1e1b1b]">Atención y soporte directo con Anahí Gilardi & Enzo Girardi</span>
              </div>
            </div>
          </div>

          {/* Core Systems List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] border-b border-stone-200 pb-2 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-[#4a5d4a]" />
              <span>Sistemas que Desarrollamos & Adaptamos:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Diseño y Desarrollo de Páginas Web & Tiendas Online',
                'Sistemas de Gestión Gastronómica (Comandas, Mesas, Delivery)',
                'Facturación Electrónica ARCA (ex AFIP) Automática A / B / C',
                'Historias Clínicas Digitales & Turnos para Salud y Consultorios',
                'Control de Stock e Inventario para Indumentaria y Calzado',
                'Puntos de Venta (POS) y Facturación Rápida en Caja',
                'ERP SaaS Multirrubro (Ferreterías, Talleres, Inmobiliarias)',
                'Reportes de Ventas e Ingresos Diarios en Tiempo Real'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200 text-[#1e1b1b] font-medium">
                  <div className="w-2 h-2 rounded-full bg-[#4a5d4a] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Contact & QR in Page 1 */}
          <div className="pt-4 border-t-2 border-stone-200 flex items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs text-stone-600">
              <span className="text-[11px] font-bold uppercase text-[#4a5d4a] block">
                ¡ESCANEÁ EL QR O ESCRIBINOS AHORA MISMO Y ACCEDÉ A TU DEMO!
              </span>
              <div className="flex items-center space-x-2 font-bold text-[#1e1b1b]">
                <Phone className="w-3.5 h-3.5 text-[#4a5d4a]" />
                <span>WhatsApp: Anahí: {ANAHI_PHONE_FORMATTED} | Enzo: {ENZO_PHONE_FORMATTED}</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-500 font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>Email: {ANAHI_EMAIL} | {ENZO_EMAIL}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 bg-[#fcf9f8] rounded-xl border border-[#4a5d4a]/30 shadow-sm shrink-0 text-center">
              <QRCodeSVG 
                value={whatsappUrl}
                size={72}
                level="M"
              />
              <span className="text-[9px] font-bold uppercase text-[#4a5d4a] mt-1">Escaneá WhatsApp</span>
            </div>
          </div>

        </div>

        {/* ================= PÁGINA 2: MUESTRAS REALES & CAPTURAS ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#4a5d4a]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5d4a] bg-[#4a5d4a]/10 px-2.5 py-1 rounded-full">
                PRUEBA REAL DE TRABAJO
              </span>
              <h2 className="font-editorial text-xl font-bold text-[#1e1b1b] uppercase mt-1">
                Catálogo de Sistemas Realizados & Productos
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-mono">Pág. 2</span>
          </div>

          <p className="text-xs text-stone-600 font-medium">
            Todos los programas son creados 100% personalizados según la forma de trabajar de cada cliente. Mirá ejemplos reales de sistemas creados por Anahí Gilardi & Enzo Girardi:
          </p>

          {/* Grid of Real Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioModules.map((mod) => (
              <div 
                key={mod.id} 
                className="rounded-2xl border border-stone-200 bg-[#fcf9f8] overflow-hidden flex flex-col justify-between shadow-sm"
              >
                {/* Image Preview Header */}
                <div className="relative h-28 w-full bg-stone-200 overflow-hidden">
                  <img 
                    src={mod.imageUrl} 
                    alt={mod.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#4a5d4a] text-white text-[10px] font-bold uppercase shadow-sm">
                    {mod.badge}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                    {mod.clientExample}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-sm font-bold text-[#1e1b1b] leading-tight">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-[#4a5d4a] font-bold mt-0.5">
                      {mod.subtitle}
                    </p>
                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed mt-1">
                      {mod.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1 pt-1 border-t border-stone-200">
                    <span className="text-[9px] font-bold uppercase text-[#4a5d4a]">Funciones Clave:</span>
                    <div className="space-y-1">
                      {mod.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-1.5 text-[10px] text-stone-700">
                          <Check className="w-3 h-3 text-[#4a5d4a] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-stone-200 text-center space-y-1">
            <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">¿Tu negocio es de otro rubro?</h4>
            <p className="text-xs text-stone-600 font-medium">
              Desarrollamos programas a medida para cualquier actividad: Ferreterías, Talleres, Inmobiliarias, Gimnasios, Consultorios, Minimarkets y más.
            </p>
          </div>

        </div>

        {/* ================= PÁGINA 3: IMPLEMENTACIÓN & CONTACTO ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#4a5d4a]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a5d4a] bg-[#4a5d4a]/10 px-2.5 py-1 rounded-full">
                PASO A PASO
              </span>
              <h2 className="font-editorial text-xl font-bold text-[#1e1b1b] uppercase mt-1">
                ¿Cómo Implementamos Tu Sistema en 4 Pasos?
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-mono">Pág. 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#fcf9f8] border border-stone-200 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-sm shrink-0">
                01
              </div>
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Asesoramiento Inicial & Demo Gratis</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Hablamos por WhatsApp o llamadas para entender cómo funciona tu negocio y te mostramos una demostración sin costo.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf9f8] border border-stone-200 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-sm shrink-0">
                02
              </div>
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Diseño y Adaptación a Medida</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Cargamos tus productos, listas de precios, comandas, mesas o categorías específicas según tus necesidades.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf9f8] border border-stone-200 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-sm shrink-0">
                03
              </div>
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Instalación & Capacitación</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Instalamos el programa en tus computadoras o celulares. Capacitamos a tu equipo en menos de 10 minutos.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf9f8] border border-stone-200 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-sm shrink-0">
                04
              </div>
              <div>
                <h4 className="font-editorial text-xs font-bold uppercase text-[#1e1b1b]">Soporte Continuo Directo</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Soporte técnico directo con Anahí Gilardi & Enzo Girardi para dudas, mejoras o actualizaciones siempre que lo necesites.
                </p>
              </div>
            </div>
          </div>

          {/* Final Callout Card */}
          <div className="bg-[#4a5d4a] text-white p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-lg">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
              ¡HABLÁ DIRECTO CON LOS PROGRAMADORES!
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
              ¿Listo para automatizar tu negocio y vender más?
            </h3>
            <p className="text-xs sm:text-sm text-stone-100 max-w-lg mx-auto font-light leading-relaxed">
              Escribinos un mensaje de WhatsApp ahora mismo y accedé a tu Asesoramiento Inicial + Demostración Gratuita en vivo.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-print inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-lg bg-white hover:bg-stone-100 text-[#4a5d4a] font-bold text-xs uppercase tracking-wider shadow-md transition duration-300"
              >
                <MessageCircle className="w-4 h-4 fill-[#4a5d4a]" />
                <span>Contactar WhatsApp: Anahí ({ANAHI_PHONE_FORMATTED}) | Enzo ({ENZO_PHONE_FORMATTED})</span>
              </a>

              <div className="text-xs font-mono text-stone-200 space-y-0.5 text-center sm:text-left">
                <div>Anahí: <span className="font-bold text-white">{ANAHI_EMAIL}</span></div>
                <div>Enzo: <span className="font-bold text-white">{ENZO_EMAIL}</span></div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-stone-400 font-mono">
            Río Cuarto Web — Diseño Digital a Medida (Anahí Gilardi & Enzo Girardi) • Río Cuarto, Córdoba & Atención a todo el país.
          </div>

        </div>

      </div>

    </motion.div>
  );
};
