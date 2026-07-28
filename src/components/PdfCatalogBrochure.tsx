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
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Zap,
  Star
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
    'Hola Anahí y Enzo! Estuve viendo su Catálogo PDF de Tu Sitio Web Río Cuarto y quisiera consultar por un proyecto para mi negocio.'
  )}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md p-2 sm:p-6 flex flex-col items-center justify-start"
    >
      
      {/* Top Floating Control Bar (Hidden when printing) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="no-print sticky top-2 z-50 bg-stone-900 border border-red-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 w-full max-w-5xl mb-6"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center text-white font-black shadow-lg shadow-red-900/50">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Catálogo PDF de Trabajos & Programas</h3>
            <p className="text-xs text-red-300">Listo para descargar o guardar en PDF (Formato A4 Impresión)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-red-950/60 transition duration-300 hover:scale-105 active:scale-95 border border-red-400/60"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span className="uppercase tracking-wider">DESCARGAR / GUARDAR PDF</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-950/50 border border-emerald-300/40 transition hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
            <span className="uppercase tracking-wide">Pedir Demo WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
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
            color: #0f172a !important;
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
            color: #0f172a !important;
            border: 1px solid #e2e8f0 !important;
            box-sizing: border-box;
          }
          .pdf-page:last-child {
            page-break-after: avoid;
            break-after: avoid;
          }
        }
      `}</style>

      {/* DOCUMENT CANVAS CONTAINER (Rendered on screen & formatted for print) */}
      <div className="pdf-container w-full max-w-4xl space-y-8 text-slate-900">
        
        {/* ================= PAGE 1: FLYER PUBLICITARIO & VALOR ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-red-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black flex items-center justify-center text-xl shadow-lg shadow-red-600/30">
                EG
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {flyerData.developerName}
                </h1>
                <p className="text-xs font-extrabold text-red-600 uppercase tracking-wider">
                  {flyerData.role}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider border border-red-300">
                CATÁLOGO OFICIAL DE TRABAJOS
              </span>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                {flyerData.location}
              </p>
            </div>
          </div>

          {/* Hook & Value Headline */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 rounded-2xl shadow-md text-center">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wide mb-1">
              🚀 {flyerData.hookTitle}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-red-100">
              "{flyerData.slogan}"
            </p>
          </div>

          {/* Offer & Guarantee Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center space-x-3">
              <Award className="w-8 h-8 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase text-amber-900">Garantía Total</h4>
                <p className="text-[11px] text-amber-800 font-semibold">{flyerData.guaranteeText}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 flex items-center space-x-3">
              <Zap className="w-8 h-8 text-red-600 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase text-red-900">Promoción Especial</h4>
                <p className="text-[11px] text-red-800 font-semibold">{flyerData.promoBadge}</p>
              </div>
            </div>
          </div>

          {/* Key Benefits Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>¿Por qué elegir mis programas a medida?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
              {flyerData.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-slate-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Services Included */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-red-600" />
              <span>Sistemas Que Desarrollo & Adapto para Tu Negocio:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {flyerData.mainServices.map((service, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-red-50/60 p-2.5 rounded-xl border border-red-100 text-slate-900 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Contact & Live QR Code */}
          <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-red-600 block">
                {flyerData.callToAction}
              </span>
              <div className="text-sm font-black text-slate-900 flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span>WhatsApp: {flyerData.phoneFormatted}</span>
              </div>
              <div className="text-xs text-slate-600 flex items-center space-x-2 font-medium">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email: {flyerData.email}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border-2 border-red-600 shadow-sm shrink-0 text-center">
              <QRCodeSVG value={flyerData.qrUrl} size={90} level="M" />
              <span className="text-[9px] font-black uppercase text-slate-800 mt-1">Escaneá WhatsApp</span>
            </div>
          </div>

        </div>

        {/* ================= PAGE 2: PROYECTOS & TRABAJOS REALIZADOS ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-red-600">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                PRUEBA REAL DE TRABAJO
              </span>
              <h2 className="text-xl font-black text-slate-900 uppercase mt-1">
                Catálogo de Sistemas Realizados & Productos
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Desarrollos Activos</span>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Todos los programas son creados 100% personalizados según la forma de trabajar de cada cliente. Mirá ejemplos reales de sistemas creados por Enzo Girardi:
          </p>

          {/* Grid of Realized Projects with Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioModules.map(module => (
              <div key={module.id} className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 overflow-hidden flex flex-col justify-between">
                
                {module.imageUrl && (
                  <div className="relative h-32 w-full bg-slate-200 overflow-hidden">
                    <img
                      src={module.imageUrl}
                      alt={module.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase shadow-sm">
                      {module.badge}
                    </span>
                    {module.clientExample && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[9px] font-mono">
                        {module.clientExample}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-xs text-red-700 font-bold mt-0.5">
                      {module.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                      {module.description}
                    </p>
                  </div>

                {/* Sample items inside this software */}
                {module.mockUI.items && module.mockUI.items.length > 0 && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 block">
                      Ejemplos de Productos / Módulos en el Sistema:
                    </span>
                    <ul className="text-[11px] font-medium space-y-1">
                      {module.mockUI.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-slate-800">
                          <span>• {item.name}</span>
                          <span className="font-extrabold text-red-600">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features list */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    Funciones Clave:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {module.features.slice(0, 3).map((feat, i) => (
                      <span key={i} className="text-[10px] bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-50 p-4 rounded-2xl border border-red-200 text-center space-y-1">
            <h4 className="text-xs font-black uppercase text-red-900">¿Tu negocio es de otro rubro?</h4>
            <p className="text-xs text-red-800 font-semibold">
              Desarrollo programas a medida para cualquier actividad: Ferreterías, Talleres, Inmobiliarias, Gimnasios, Consultorios, Minimarkets y más.
            </p>
          </div>

        </div>

        {/* ================= PAGE 3: PROCESO & SOLICITUD DE DEMO ================= */}
        <div className="pdf-page bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-red-600">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                PASO A PASO
              </span>
              <h2 className="text-xl font-black text-slate-900 uppercase mt-1">
                ¿Cómo Implementamos Tu Sistema en 4 Pasos?
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Puesta en Marcha Rápida</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: '01',
                title: 'Asesoramiento Inicial & Demo Gratis',
                desc: 'Hablamos por WhatsApp o llamadas para entender cómo funciona tu negocio y te muestro una demostración sin costo.'
              },
              {
                step: '02',
                title: 'Diseño y Adaptación a Medida',
                desc: 'Cargo tus productos, listas de precios, comandas, mesas o categorías específicas según tus necesidades.'
              },
              {
                step: '03',
                title: 'Instalación & Capacitación',
                desc: 'Instalamos el programa en tus computadoras o celulares. Capacitamos a tu equipo en menos de 10 minutos.'
              },
              {
                step: '04',
                title: 'Soporte Continuo Directo',
                desc: 'Soporte técnico directo con Enzo Girardi para dudas, mejoras o actualizaciones siempre que lo necesites.'
              }
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-sm shrink-0">
                  {p.step}
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final Conversion Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 text-white p-6 rounded-3xl text-center space-y-3 shadow-xl">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
              ¡HABLÁ DIRECTO CON EL PROGRAMADOR!
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white uppercase">
              ¿Listo para automatizar tu negocio y vender más?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium">
              Escribime un mensaje de WhatsApp ahora mismo y accedé a tu Asesoramiento Inicial + Demostración Gratuita.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-print relative group overflow-hidden inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/60 border border-emerald-300/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-75" />
                  <MessageCircle className="relative w-5 h-5 fill-white text-emerald-700" />
                </div>
                <span className="uppercase tracking-wider">Contactar por WhatsApp: {flyerData.phoneFormatted}</span>
              </a>

              <div className="text-xs font-mono text-slate-300">
                Email: <span className="font-bold text-white">{flyerData.email}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-[10px] text-slate-400 font-mono">
            Tu Sitio Web Río Cuarto (Anahí Gilardi & Enzo Girardi) • Río Cuarto, Córdoba & Atención a todo el país.
          </div>

        </div>

      </div>

    </motion.div>
  );
};
