import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Printer, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Download,
  Loader2,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';
import { portfolioModules } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import brandLogo from '../assets/logo_brand.jpg';

interface ProposalGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSystemId?: string;
  phone: string;
  email: string;
}

export const ProposalGeneratorModal: React.FC<ProposalGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultSystemId,
}) => {
  const [selectedSysId, setSelectedSysId] = useState<string>(defaultSystemId || portfolioModules[0].id);
  const [selectedPlan, setSelectedPlan] = useState<string>('Plan Pro Multicaja & ARCA (ex AFIP)');
  const [clientBusiness, setClientBusiness] = useState<string>('Comercio / Negocio Local');
  const [clientContact, setClientContact] = useState<string>('Cliente Responsable');
  const [customPrice, setCustomPrice] = useState<string>('380.000');
  const [deliveryDays, setDeliveryDays] = useState<string>('5 a 7');
  const [specialNotes, setSpecialNotes] = useState<string>('Incluye configuración inicial de catálogo, vinculación de facturación electrónica ARCA y capacitación guiada.');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSystem = portfolioModules.find(m => m.id === selectedSysId) || portfolioModules[0];
  const todayDate = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const proposalFolio = `PROP-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

  const saveLeadToSupabase = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert({
          client_business: clientBusiness,
          client_contact: clientContact,
          industry: currentSystem.rubro,
          selected_features: currentSystem.features,
          timeline: deliveryDays,
          notes: `Propuesta formal ($${customPrice} ARS) - ${selectedPlan} - ${currentSystem.title}. Notas: ${specialNotes}`,
          estimated_days: 7,
          status: 'propuesta'
        });
      } catch (err) {
        console.error('Error guardando lead de propuesta:', err);
      }
    }
  };

  const handlePrint = async () => {
    await saveLeadToSupabase();
    try {
      if (typeof window !== 'undefined') {
        window.print();
      }
    } catch (err) {
      console.error('Error al ejecutar impresión:', err);
      alert('Para guardar en PDF: Presioná las teclas Ctrl + P en tu teclado y en el destino seleccioná "Guardar como PDF".');
    }
  };

  const handleDirectPdfDownload = async () => {
    setIsGeneratingPdf(true);
    await saveLeadToSupabase();

    const element = document.querySelector('.printable-proposal');
    if (!element) {
      setIsGeneratingPdf(false);
      return;
    }

    try {
      if (!(window as any).html2pdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });
      }

      const cleanFileName = `Propuesta_${clientBusiness.replace(/[^a-zA-Z0-9]/g, '_')}_TuSitioWebRioCuarto.pdf`;
      const opt = {
        margin:       [8, 8, 8, 8],
        filename:     cleanFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await (window as any).html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Error en descarga de PDF directa, usando print fallback:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-md p-2 sm:p-6 flex flex-col items-center justify-start">
        
        {/* Top Control Header Bar (Hidden on Print) */}
        <div className="no-print sticky top-2 z-50 bg-[#240A15] border border-rose-900/50 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 flex items-center justify-center text-white shadow-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">Generador de Propuesta Técnica Formal PDF</h3>
              <p className="text-xs text-rose-200/70">Documento institucional de alta calidad para presentar a clientes</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDirectPdfDownload}
              disabled={isGeneratingPdf}
              className="flex items-center space-x-2 px-5 min-h-[44px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 uppercase tracking-wider transition transform hover:scale-[1.02] cursor-pointer"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4.5 h-4.5" />
              )}
              <span>Descargar PDF Directo</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 min-h-[44px] bg-[#18040B] hover:bg-rose-900/80 text-rose-200 hover:text-white font-black text-xs rounded-xl border border-rose-900/40 uppercase tracking-wider transition"
              title="Abrir vista previa de impresión"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-[#2B0A1A] hover:bg-[#3D0E25] text-rose-200 hover:text-white border border-rose-900/40 transition flex items-center justify-center"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Controls Panel (Hidden on Print) */}
        <div className="no-print bg-[#18040B] border border-rose-900/40 rounded-2xl p-4 sm:p-5 w-full max-w-4xl mb-6 space-y-3 text-xs shadow-xl">
          <div className="flex items-center space-x-2 text-rose-300 font-bold border-b border-rose-900/30 pb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Datos Personalizados de la Propuesta (Se actualizan en vivo abajo):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Sistema a Presupuestar:</label>
              <select
                value={selectedSysId}
                onChange={(e) => setSelectedSysId(e.target.value)}
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
              >
                {portfolioModules.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Plan / Modalidad:</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
              >
                <option value="Plan Inicial Pyme">Plan Inicial Pyme</option>
                <option value="Plan Pro Multicaja & ARCA (ex AFIP)">Plan Pro Multicaja & ARCA (ex AFIP)</option>
                <option value="Software a Medida Exclusivo">Software a Medida Exclusivo</option>
              </select>
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Monto Estimado ($ ARS):</label>
              <input
                type="text"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="Ej: 380.000"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold focus:outline-none focus:border-rose-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Nombre del Comercio / Empresa:</label>
              <input
                type="text"
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                placeholder="Ej: Resto La Cabaña"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Atención / Contacto:</label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Días de Entrega Estimados:</label>
              <input
                type="text"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="Ej: 5 a 7"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="text-rose-200/80 font-bold block mb-1">Observaciones & Aclaraciones Especiales:</label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500 min-h-[44px]"
            />
          </div>
        </div>

        {/* PRINTABLE PROPOSAL SHEET (Ultra-Clean Executive A4 Printable Layout) */}
        <div className="printable-proposal bg-white text-slate-900 w-full max-w-4xl rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 font-sans border-2 border-slate-300">
          
          {/* Top Metallic Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-rose-900 via-rose-700 to-amber-600 rounded-t-xl -mt-6 sm:-mt-10 -mx-6 sm:-mx-10" />

          {/* Header Branding Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-rose-900 pb-5 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-slate-300">
                  <img src={brandLogo} alt="Logo Tu Sitio Web Río Cuarto" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
                    Río Cuarto Web
                  </h1>
                  <p className="text-xs font-black text-cyan-800 uppercase tracking-wide">
                    Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] space-y-0.5 font-mono border-l-2 sm:border-l-0 sm:border-r-2 border-slate-300 pl-3 sm:pl-0 sm:pr-3">
              <div className="font-black text-slate-950 text-xs">{proposalFolio}</div>
              <div className="text-slate-700 font-bold">Fecha: {todayDate}</div>
              <div className="text-slate-800 font-semibold">Anahí: +54 358 486-0640 | anagilardi1234@gmail.com</div>
              <div className="text-slate-800 font-semibold">Enzo: +54 358 430-2024 | enzogirardi84@gmail.com</div>
            </div>
          </div>

          {/* Client & Plan Info Block */}
          <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium border border-slate-300">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Propuesta Presentada Para:</span>
              <div className="text-base font-black text-slate-950">{clientBusiness}</div>
              <div className="text-slate-700 font-semibold">Atención: {clientContact}</div>
            </div>

            <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-300">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Modalidad & Inversión Estimada:</span>
              <div className="text-base font-black text-rose-900">{selectedPlan}</div>
              <div className="text-emerald-700 font-black text-sm">
                ${customPrice} ARS <span className="text-[10px] text-slate-500 font-normal">(Pago Único • Cero Comisiones)</span>
              </div>
            </div>
          </div>

          {/* Selected System Specification */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-900">
                1. Especificaciones del Sistema Seleccionado
              </span>
              <span className="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 font-black text-[10px] uppercase">
                {currentSystem.badge}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950 uppercase">{currentSystem.title}</h2>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{currentSystem.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {currentSystem.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 block border-b border-slate-200 pb-2">
              2. Cronograma de Implementación & Puesta en Marcha (~{deliveryDays} Días Hábiles)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-rose-900 text-white font-black text-[10px] flex items-center justify-center">01</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Asesoramiento & Alcance</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Reunión inicial y relevamiento de requerimientos del local.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-rose-900 text-white font-black text-[10px] flex items-center justify-center">02</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Diseño & Programación</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Desarrollo a medida, carga de productos e integración de pagos/ARCA.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-rose-900 text-white font-black text-[10px] flex items-center justify-center">03</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Pruebas & Validación</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Verificación de comisiones, facturación y comandas en vivo.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-rose-900 text-white font-black text-[10px] flex items-center justify-center">04</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Puesta en Marcha</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Capacitación guiada al personal y entrega de credenciales.</p>
              </div>
            </div>
          </div>

          {/* Guarantee & Terms */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs space-y-1">
            <div className="flex items-center space-x-2 font-black text-slate-950 uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantía de Satisfacción & Soporte Posventa Directo:</span>
            </div>
            <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
              {specialNotes} El desarrollo cuenta con soporte posventa directo a cargo de Anahí Gilardi & Enzo Girardi y backups diarios automáticos.
            </p>
          </div>

          {/* Sign-off Footer */}
          <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-end text-xs">
            <div className="space-y-0.5">
              <p className="font-black text-slate-950 uppercase">Tu Sitio Web Río Cuarto</p>
              <p className="text-slate-700 font-bold">Anahí Gilardi & Enzo Girardi (Programadores)</p>
              <p className="text-slate-500 text-[10px]">Río Cuarto, Córdoba & Atención a todo el país</p>
            </div>
            <div className="text-right space-y-2">
              <div className="w-44 border-b-2 border-slate-400 ml-auto" />
              <p className="text-slate-600 font-bold text-[11px]">Firma / Conformidad {clientBusiness}</p>
            </div>
          </div>

        </div>

      </div>
    </AnimatePresence>
  );
};
