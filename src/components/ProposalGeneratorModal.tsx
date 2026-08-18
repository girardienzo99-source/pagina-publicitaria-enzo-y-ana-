import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Printer, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Download,
  Loader2,
  Calendar,
  Clock,
  DollarSign,
  Check,
  Building,
  User,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Layers,
  FileCheck
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { portfolioModules } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  getWhatsAppUrl, 
  ANAHI_PHONE_FORMATTED, 
  ENZO_PHONE_FORMATTED, 
  ANAHI_EMAIL, 
  ENZO_EMAIL 
} from '../lib/whatsapp';

interface ProposalGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSystemId?: string;
  phone?: string;
  email?: string;
}

export const ProposalGeneratorModal: React.FC<ProposalGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultSystemId,
}) => {
  const [selectedSysId, setSelectedSysId] = useState<string>(defaultSystemId || portfolioModules[0].id);
  const [selectedPlan, setSelectedPlan] = useState<string>('Plan Pro Multicaja & ARCA (ex AFIP)');
  const [clientBusiness, setClientBusiness] = useState<string>('Comercio / Empresa Local');
  const [clientContact, setClientContact] = useState<string>('Titular / Responsable');
  const [customPrice, setCustomPrice] = useState<string>('380.000');
  const [paymentTerms, setPaymentTerms] = useState<string>('50% Anticipo al iniciar y 50% contra entrega conforme');
  const [deliveryDays, setDeliveryDays] = useState<string>('5 a 7');
  const [specialNotes, setSpecialNotes] = useState<string>('Incluye configuración completa, vinculación de facturación electrónica ARCA, carga inicial de productos y capacitación guiada.');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSystem = portfolioModules.find(m => m.id === selectedSysId) || portfolioModules[0];
  const todayDate = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const validUntilDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const proposalFolio = `PROP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const proposalWhatsAppUrl = getWhatsAppUrl(
    `Hola Anahí y Enzo! Recibí la propuesta formal de presupuesto "${proposalFolio}" para "${clientBusiness}" por un valor de $${customPrice} ARS y quisiera coordinar el inicio del proyecto.`
  );

  const saveLeadToSupabase = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert({
          client_business: clientBusiness,
          client_contact: clientContact,
          industry: currentSystem.rubro,
          selected_features: currentSystem.features,
          timeline: `${deliveryDays} días`,
          notes: `Propuesta formal ($${customPrice} ARS) - ${selectedPlan} - ${currentSystem.title}. Pago: ${paymentTerms}. Notas: ${specialNotes}`,
          estimated_days: 7,
          status: 'propuesta_formal'
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

      const cleanFileName = `Presupuesto_${clientBusiness.replace(/[^a-zA-Z0-9]/g, '_')}_RioCuartoWeb.pdf`;
      const opt = {
        margin:       [8, 8, 8, 8],
        filename:     cleanFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await (window as any).html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Error generando PDF directo con html2pdf:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md p-3 sm:p-6 flex flex-col items-center justify-start pt-4 sm:pt-8 font-montserrat text-[#1e1b1b]">
        
        {/* Top Floating Control Bar */}
        <div className="no-print sticky top-2 z-50 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#4a5d4a] flex items-center justify-center text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1e1b1b] uppercase tracking-tight">
                Generador de Propuesta Técnica Formal PDF
              </h3>
              <p className="text-xs text-stone-500">
                Documento de presupuesto institucional listo para imprimir o enviar
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDirectPdfDownload}
              disabled={isGeneratingPdf}
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition cursor-pointer"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Descargar PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#1e1b1b] font-bold text-xs rounded-lg border border-stone-200 uppercase tracking-wider transition cursor-pointer"
              title="Abrir vista previa de impresión"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-[#1e1b1b] transition cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Controls Panel (Hidden on Print) */}
        <div className="no-print bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 w-full max-w-4xl mb-6 space-y-4 text-xs shadow-md">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center space-x-2 text-[#4a5d4a] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Personalizar Datos del Presupuesto (Vista previa actualizada en tiempo real):</span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">Folio: {proposalFolio}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Sistema a Presupuestar:</label>
              <select
                value={selectedSysId}
                onChange={(e) => setSelectedSysId(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              >
                {portfolioModules.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Plan / Modalidad:</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              >
                <option value="Plan Inicial Pyme">Plan Inicial Pyme</option>
                <option value="Plan Pro Multicaja & ARCA (ex AFIP)">Plan Pro Multicaja & ARCA (ex AFIP)</option>
                <option value="Software a Medida Exclusivo">Software a Medida Exclusivo</option>
              </select>
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Inversión Estimada ($ ARS):</label>
              <input
                type="text"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="Ej: 380.000"
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#4a5d4a] font-mono font-bold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Comercio / Empresa Cliente:</label>
              <input
                type="text"
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                placeholder="Ej: Resto La Cabaña"
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Contacto / Destinatario:</label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Plazo de Entrega (Días):</label>
              <input
                type="text"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="Ej: 5 a 7"
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Forma de Pago:</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="Ej: 50% anticipo y 50% contra entrega"
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>

            <div>
              <label className="text-[#1e1b1b]/80 font-bold block mb-1">Observaciones & Alcance Incluido:</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Detalle o aclaraciones..."
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-lg px-3 py-2 text-[#1e1b1b] font-semibold focus:outline-none focus:border-[#4a5d4a] min-h-[42px]"
              />
            </div>
          </div>
        </div>

        {/* PRINT STYLES */}
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
            .printable-proposal {
              width: 100% !important;
              max-width: 100% !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 12mm !important;
              border: none !important;
              border-radius: 0 !important;
              background: #ffffff !important;
            }
          }
        `}</style>

        {/* PRINTABLE PROPOSAL SHEET (Ultra-Clean Executive A4 Document) */}
        <div className="printable-proposal bg-white text-[#1e1b1b] w-full max-w-4xl rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 border border-stone-300 font-montserrat">
          
          {/* Top Sage Accent Line */}
          <div className="h-2 bg-[#4a5d4a] rounded-t-2xl -mt-6 sm:-mt-10 -mx-6 sm:-mx-10" />

          {/* Header Branding & Institutional Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#4a5d4a] pb-5 gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#4a5d4a] text-white font-bold flex items-center justify-center text-xl shadow-md">
                RC
              </div>
              <div>
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1b1b]">
                  Río Cuarto Web
                </h1>
                <p className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider">
                  Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] space-y-0.5 font-mono border-l-2 sm:border-l-0 sm:border-r-2 border-[#4a5d4a]/30 pl-3 sm:pl-0 sm:pr-3">
              <div className="font-bold text-[#1e1b1b] text-xs uppercase">{proposalFolio}</div>
              <div className="text-stone-600">Fecha de Emisión: <strong className="text-[#1e1b1b]">{todayDate}</strong></div>
              <div className="text-stone-600">Validez de la Oferta: <strong className="text-[#1e1b1b]">{validUntilDate}</strong></div>
              <div className="text-[#4a5d4a] font-semibold">Río Cuarto, Córdoba • Atención Nacional</div>
            </div>
          </div>

          {/* Document Title */}
          <div className="bg-[#4a5d4a] text-white p-4 rounded-xl shadow-sm text-center">
            <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-wide">
              PROPUESTA TÉCNICA Y PRESUPUESTO FORMAL DE DESARROLLO
            </h2>
            <p className="text-xs text-stone-100 font-light mt-0.5">
              Solución digital a medida para la digitalización, automatización y optimización de ventas.
            </p>
          </div>

          {/* Client & Investment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Client Data */}
            <div className="bg-[#fcf9f8] rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#4a5d4a] tracking-wider block border-b border-stone-200 pb-1.5 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Destinatario de la Propuesta</span>
              </span>
              <div className="space-y-1 text-xs">
                <div><strong className="text-stone-600">Comercio / Empresa:</strong> <span className="font-bold text-[#1e1b1b] text-sm">{clientBusiness}</span></div>
                <div><strong className="text-stone-600">Atención:</strong> <span className="font-semibold text-[#1e1b1b]">{clientContact}</span></div>
                <div><strong className="text-stone-600">Rubro:</strong> <span className="capitalize">{currentSystem.rubro}</span></div>
              </div>
            </div>

            {/* Card 2: Investment Summary */}
            <div className="bg-[#fcf9f8] rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#4a5d4a] tracking-wider block border-b border-stone-200 pb-1.5 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Inversión & Condiciones Comerciales</span>
              </span>
              <div className="space-y-1 text-xs">
                <div><strong className="text-stone-600">Plan Seleccionado:</strong> <span className="font-bold text-[#4a5d4a]">{selectedPlan}</span></div>
                <div>
                  <strong className="text-stone-600">Monto Presupuestado:</strong>{' '}
                  <span className="text-base font-bold text-[#1e1b1b] font-mono">${customPrice} ARS</span>
                </div>
                <div className="text-[11px] text-stone-600">
                  <strong>Condición:</strong> {paymentTerms}
                </div>
              </div>
            </div>

          </div>

          {/* Scope of Work / Selected System */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] flex items-center space-x-1.5">
                <Layers className="w-4 h-4" />
                <span>1. Alcance del Sistema & Módulos Incluidos</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] font-bold text-[10px] uppercase border border-[#4a5d4a]/20">
                {currentSystem.badge}
              </span>
            </div>

            <div className="bg-[#fcf9f8] p-4 rounded-xl border border-stone-200 space-y-1.5">
              <h4 className="font-editorial text-base font-bold text-[#1e1b1b]">{currentSystem.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{currentSystem.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {currentSystem.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-[#1e1b1b] bg-[#fcf9f8] p-2.5 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-[#4a5d4a] shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Timeline (4 Steps) */}
          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] border-b border-stone-200 pb-2 flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>2. Cronograma de Implementación & Puesta en Marcha (~{deliveryDays} Días Hábiles)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#fcf9f8] border border-stone-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-[#4a5d4a] text-white font-bold text-[10px] flex items-center justify-center">01</span>
                <strong className="text-[#1e1b1b] block text-[11px]">Relevamiento</strong>
                <p className="text-[11px] text-stone-600 leading-tight">Reunión inicial para acordar detalles, listas de precios y necesidades específicas.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#fcf9f8] border border-stone-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-[#4a5d4a] text-white font-bold text-[10px] flex items-center justify-center">02</span>
                <strong className="text-[#1e1b1b] block text-[11px]">Diseño & Carga</strong>
                <p className="text-[11px] text-stone-600 leading-tight">Desarrollo a medida, carga de catálogo e integración de facturación ARCA.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#fcf9f8] border border-stone-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-[#4a5d4a] text-white font-bold text-[10px] flex items-center justify-center">03</span>
                <strong className="text-[#1e1b1b] block text-[11px]">Pruebas en Vivo</strong>
                <p className="text-[11px] text-stone-600 leading-tight">Validación integral de tickets, stock, comandas y medios de cobro.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#fcf9f8] border border-stone-200 space-y-1">
                <span className="w-6 h-6 rounded-full bg-[#4a5d4a] text-white font-bold text-[10px] flex items-center justify-center">04</span>
                <strong className="text-[#1e1b1b] block text-[11px]">Puesta en Marcha</strong>
                <p className="text-[11px] text-stone-600 leading-tight">Instalación en dispositivos, capacitación al personal y entrega de claves.</p>
              </div>
            </div>
          </div>

          {/* Guarantee & Observations */}
          <div className="p-4 rounded-xl bg-[#fcf9f8] border border-stone-200 text-xs space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-[#1e1b1b] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#4a5d4a]" />
              <span>Garantía de Satisfacción & Soporte Técnico Directo:</span>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              {specialNotes} La propuesta incluye acompañamiento posventa continuo a cargo directo de <strong>Anahí Gilardi & Enzo Girardi</strong>, copias de seguridad automáticas y actualizaciones periódicas.
            </p>
          </div>

          {/* Signatures & WhatsApp QR Footer */}
          <div className="pt-4 border-t-2 border-stone-300 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
            
            {/* Developers Info */}
            <div className="space-y-1">
              <p className="font-editorial text-sm font-bold text-[#1e1b1b]">Río Cuarto Web</p>
              <p className="text-stone-600 font-semibold">Anahí Gilardi & Enzo Girardi</p>
              <div className="text-[10px] text-stone-500 font-mono">
                <div>Anahí: {ANAHI_PHONE_FORMATTED}</div>
                <div>Enzo: {ENZO_PHONE_FORMATTED}</div>
                <div>{ANAHI_EMAIL}</div>
              </div>
            </div>

            {/* QR Acceptance */}
            <div className="flex flex-col items-center justify-center p-2 bg-[#fcf9f8] rounded-xl border border-stone-200 text-center">
              <QRCodeSVG 
                value={proposalWhatsAppUrl}
                size={64}
                level="M"
              />
              <span className="text-[9px] font-bold uppercase text-[#4a5d4a] mt-1">Aprobar por WhatsApp</span>
            </div>

            {/* Client Signature */}
            <div className="text-right space-y-2">
              <div className="w-48 border-b-2 border-stone-400 ml-auto pt-6" />
              <p className="text-stone-700 font-bold text-[11px]">Firma de Conformidad</p>
              <p className="text-stone-500 text-[10px]">{clientBusiness} ({clientContact})</p>
            </div>

          </div>

        </div>

      </div>
    </AnimatePresence>
  );
};
