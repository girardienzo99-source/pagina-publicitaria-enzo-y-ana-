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
  Utensils, 
  ShoppingBag, 
  Grid, 
  Phone, 
  Mail, 
  MapPin, 
  Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { FlyerData } from '../types';
import { portfolioModules } from '../data/portfolioData';

interface PdfCatalogBrochureProps {
  flyerData: FlyerData;
  onClose: () => void;
}

export const PdfCatalogBrochure: React.FC<PdfCatalogBrochureProps> = ({ flyerData, onClose }) => {
  const whatsappUrl = `https://wa.me/549${flyerData.phone}?text=${encodeURIComponent(
    'Hola Anahí y Enzo! Estuve viendo el Catálogo PDF de Río Cuarto Web y quisiera consultar por un proyecto para mi negocio.'
  )}`;

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
        margin:       [5, 5, 5, 5],
        filename:     'Catalogo_Sistemas_RioCuartoWeb.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false },
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
      className="printable-dialog fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-2 sm:p-6 flex flex-col items-center justify-start font-montserrat text-[#1e1b1b]"
    >
      
      {/* Top Floating Control Bar (Hidden when printing) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="no-print sticky top-2 z-50 bg-white border border-stone-300 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 w-full max-w-5xl mb-6"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] flex items-center justify-center text-white font-bold shadow-md">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1e1b1b]">Catálogo PDF de Trabajos & Programas</h3>
            <p className="text-xs text-stone-500">Listo para descargar o guardar en PDF (Formato A4 Impresión)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDirectPdfDownload}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-white hover:bg-stone-100 text-[#1e1b1b] font-bold text-xs border border-stone-300 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consultar WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-600 hover:text-[#1e1b1b] border border-stone-300 transition cursor-pointer"
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
            background-color: #ffffff !important;
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
            padding: 15mm !important;
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
        
        {/* ================= PAGE 1: FLYER PUBLICITARIO & VALOR ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-2xl space-y-6">
          
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
                  Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] text-[10px] font-bold uppercase tracking-wider border border-[#4a5d4a]/20">
                CATÁLOGO OFICIAL DE TRABAJOS
              </span>
              <p className="text-[10px] text-stone-500 font-medium mt-1">
                {flyerData.location}
              </p>
            </div>
          </div>

          {/* Hook & Value Headline */}
          <div className="bg-[#4a5d4a] text-white p-5 rounded-xl shadow-md text-center">
            <h2 className="font-editorial text-lg font-bold tracking-wide mb-1">
              {flyerData.hookTitle}
            </h2>
            <p className="text-xs text-stone-100">
              "{flyerData.slogan}"
            </p>
          </div>

          {/* Offer & Guarantee Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center space-x-3">
              <Award className="w-8 h-8 text-[#4a5d4a] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-[#1e1b1b]">Garantía & Calidad</h4>
                <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                  {flyerData.guaranteeText}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#4a5d4a]/10 border border-[#4a5d4a]/20 flex items-center space-x-3">
              <ShieldCheck className="w-8 h-8 text-[#4a5d4a] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase text-[#1e1b1b]">Desarrollo Directo</h4>
                <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                  Sin intermediarios. Atención personalizada directa con los programadores.
                </p>
              </div>
            </div>
          </div>

          {/* Core Services Grid in 2 Columns */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] border-b border-stone-200 pb-2">
              Sistemas y Módulos Disponibles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {flyerData.mainServices.map((service, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs"
                >
                  <Check className="w-4 h-4 text-[#4a5d4a] shrink-0 mt-0.5" />
                  <span className="font-medium text-[#1e1b1b]">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] border-b border-stone-200 pb-2">
              Ventajas Competitivas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {flyerData.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4a5d4a]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Contact & QR in Page 1 */}
          <div className="pt-4 border-t-2 border-stone-200 flex items-center justify-between">
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex items-center space-x-2 font-bold text-[#1e1b1b]">
                <Phone className="w-3.5 h-3.5 text-[#4a5d4a]" />
                <span>WhatsApp: {flyerData.phoneFormatted}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#4a5d4a]" />
                <span>{flyerData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#4a5d4a]" />
                <span>{flyerData.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <QRCodeSVG 
                value={`https://wa.me/549${flyerData.phone}`}
                size={56}
                level="M"
              />
              <div className="text-[10px] leading-tight text-stone-600">
                <strong className="text-[#1e1b1b] block">Escaneá con la cámara</strong>
                para chatear directo por WhatsApp
              </div>
            </div>
          </div>

        </div>

        {/* ================= PAGE 2: MUESTRAS REALES & CAPTURAS ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#4a5d4a]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a5d4a]">
                SECCIÓN DE PROYECTOS Y SISTEMAS
              </span>
              <h2 className="font-editorial text-xl font-bold text-[#1e1b1b]">
                Muestra de Trabajos & Casos Reales
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400">Pág. 2</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioModules.slice(0, 4).map((mod) => (
              <div key={mod.id} className="border border-stone-200 rounded-xl p-4 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20">
                    {mod.badge}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">{mod.clientExample}</span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-[#1e1b1b]">{mod.title}</h4>
                <p className="text-[11px] text-stone-600 leading-tight">{mod.description}</p>
                <div className="space-y-1 pt-1">
                  {mod.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-1.5 text-[10px] text-stone-700">
                      <Check className="w-3 h-3 text-[#4a5d4a]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#fcf9f8] border border-stone-200 rounded-xl text-center space-y-2">
            <h4 className="font-editorial text-base font-bold text-[#1e1b1b]">
              ¿Querés ver una demo interactiva funcionando en vivo?
            </h4>
            <p className="text-xs text-stone-600 max-w-lg mx-auto">
              Escribinos por WhatsApp y te enviamos acceso directo para probar el sistema en tu celular o computadora.
            </p>
            <div className="font-bold text-xs text-[#4a5d4a]">
              WhatsApp Directo: +54 358 486-0640 (Anahí) / +54 358 430-2024 (Enzo)
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
};
