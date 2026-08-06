import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck, 
  Printer, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  Clock, 
  Calendar, 
  DollarSign, 
  Sparkles,
  Zap,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { portfolioModules } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';
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
  phone,
  email
}) => {
  const [selectedSysId, setSelectedSysId] = useState<string>(defaultSystemId || portfolioModules[0].id);
  const [selectedPlan, setSelectedPlan] = useState<string>('Plan Pro Multicaja & ARCA (ex AFIP)');
  const [clientBusiness, setClientBusiness] = useState<string>('Comercio / Negocio Local');
  const [clientContact, setClientContact] = useState<string>('Cliente Responsable');
  const [customPrice, setCustomPrice] = useState<string>('380.000');
  const [deliveryDays, setDeliveryDays] = useState<string>('5 a 7');
  const [specialNotes, setSpecialNotes] = useState<string>('Incluye configuración inicial de catálogo, vinculación de facturación electrónica ARCA y capacitación guiada.');

  if (!isOpen) return null;

  const currentSystem = portfolioModules.find(m => m.id === selectedSysId) || portfolioModules[0];
  const todayDate = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  const proposalFolio = `PROP-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

  const handlePrint = async () => {
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
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-md p-2 sm:p-6 flex flex-col items-center justify-start">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print sticky top-2 z-50 bg-[#1F0611] border border-rose-700/50 rounded-2xl p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-500 flex items-center justify-center text-white font-black shadow-lg">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">Generador de Propuesta Técnica Formal PDF</h3>
              <p className="text-xs text-rose-200/70">Documento institucional de alta calidad para presentar a clientes</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-5 min-h-[44px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 uppercase tracking-wider transition transform hover:scale-[1.02]"
            >
              <Printer className="w-4.5 h-4.5" />
              <span>Imprimir / Descargar PDF</span>
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

        {/* Inputs Customization Panel (Hidden on print) */}
        <div className="no-print bg-[#18040B] border border-rose-900/40 rounded-2xl p-5 w-full max-w-4xl mb-6 space-y-3 text-xs shadow-xl">
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
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
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
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
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
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Nombre del Comercio / Empresa:</label>
              <input
                type="text"
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                placeholder="Ej: Resto La Cabaña"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Atención / Contacto:</label>
              <input
                type="text"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-rose-200/80 font-bold block mb-1">Días de Entrega Estimados:</label>
              <input
                type="text"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="Ej: 5 a 7"
                className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-rose-200/80 font-bold block mb-1">Observaciones & Aclaraciones Especiales:</label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-[#260A17] border border-rose-900/40 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* PRINTABLE PROPOSAL SHEET (High-Res Executive Printable Layout) */}
        <div className="printable-proposal bg-white text-slate-900 w-full max-w-4xl rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 font-sans border-2 border-slate-300">
          
          {/* Header Branding Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-rose-900 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-slate-300">
                  <img src={brandLogo} alt="Logo Tu Sitio Web Río Cuarto" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
                    Tu Sitio Web Río Cuarto
                  </h1>
                  <p className="text-xs font-black text-rose-800 uppercase tracking-wide">
                    Anahí Gilardi & Enzo Girardi • Programadores Web & Desarrolladores de Software
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 font-mono border-l-2 sm:border-l-0 sm:border-r-2 border-slate-300 pl-3 sm:pl-0 sm:pr-3">
              <div className="font-black text-slate-950 text-sm">{proposalFolio}</div>
              <div className="text-slate-700 font-bold">Fecha: {todayDate}</div>
              <div className="text-slate-700">WhatsApp: {OFFICIAL_PHONE_FORMATTED}</div>
              <div className="text-slate-700">Email: {email}</div>
            </div>
          </div>

          {/* Client & Plan Info Block */}
          <div className="bg-slate-100 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium border border-slate-300">
            <div className="space-y-1">
              <span className="text-slate-500 font-black uppercase text-[10px] tracking-wider block">Propuesta Presentada Para:</span>
              <strong className="text-slate-950 text-base font-black block">{clientBusiness}</strong>
              <span className="text-slate-700 font-semibold flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5 text-rose-700 inline" />
                <span>Atención: {clientContact}</span>
              </span>
            </div>
            <div className="sm:text-right space-y-1">
              <span className="text-slate-500 font-black uppercase text-[10px] tracking-wider block">Modalidad & Inversión Estimada:</span>
              <strong className="text-slate-950 text-base font-black block">{selectedPlan}</strong>
              <span className="text-emerald-700 font-black text-sm block font-mono">
                ${customPrice} ARS <span className="text-[10px] font-sans text-slate-600 font-bold">(Pago Único • Cero Comisiones)</span>
              </span>
            </div>
          </div>

          {/* System Technical Description */}
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-rose-100 text-rose-900 rounded-md text-xs font-black uppercase tracking-wider border border-rose-300">
              {currentSystem.badge}
            </div>
            <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              {currentSystem.title}
            </h2>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {currentSystem.description}
            </p>
          </div>

          {/* Included Features Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-200 pb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Módulos y Funcionalidades Incluidas en la Solución:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentSystem.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-bold text-slate-800 leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Phase Implementation Roadmap */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b-2 border-slate-200 pb-2 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-rose-700" />
              <span>Hoja de Ruta de Desarrollo & Puesta en Producción ({deliveryDays} Días Hábiles):</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Fase 1 (Día 1-2)</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Relevamiento</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Carga inicial de productos, precios y configuración de marca.</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Fase 2 (Día 3-4)</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Desarrollo & ARCA</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Programación de módulos e integración de AFIP/ARCA.</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Fase 3 (Día 5)</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Pruebas Piloto</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Testeo de comandas, lector de código y caja de cobro.</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Fase 4 (Día 6-7)</span>
                <strong className="text-slate-900 block font-extrabold text-[11px]">Puesta en Marcha</strong>
                <p className="text-[11px] text-slate-600 leading-tight">Capacitación guiada al personal y entrega de credenciales.</p>
              </div>
            </div>
          </div>

          {/* Guarantee & Terms */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs space-y-1.5">
            <div className="flex items-center space-x-2 font-black text-slate-950 uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantía de Satisfacción & Soporte Posventa Directo:</span>
            </div>
            <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
              {specialNotes} El desarrollo cuenta con soporte posventa directo a cargo de Anahí Gilardi & Enzo Girardi y backups diarios automáticos.
            </p>
          </div>

          {/* Sign-off Footer */}
          <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-end text-xs">
            <div className="space-y-1">
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
