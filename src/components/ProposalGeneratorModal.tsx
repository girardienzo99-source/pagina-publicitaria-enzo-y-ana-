import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCheck, Printer, X, ShieldCheck, CheckCircle2, Code2, Clock, Calendar, Download } from 'lucide-react';
import { portfolioModules } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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
  const [clientBusiness, setClientBusiness] = useState<string>('Comercio / Negocio');
  const [clientContact, setClientContact] = useState<string>('Cliente Responsable');

  if (!isOpen) return null;

  const currentSystem = portfolioModules.find(m => m.id === selectedSysId) || portfolioModules[0];
  const todayDate = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert({
          client_business: clientBusiness,
          client_contact: clientContact,
          industry: currentSystem.rubro,
          selected_features: currentSystem.features,
          timeline: 'normal',
          notes: `Propuesta formal (${selectedPlan}) para el sistema: ${currentSystem.title}`,
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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md p-2 sm:p-6 flex flex-col items-center justify-start">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print sticky top-2 z-50 bg-stone-900 border border-emerald-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Generador de Propuesta Técnica Formal</h3>
              <p className="text-xs text-zinc-400">Documento imprimible o exportable a PDF</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-lg shadow-emerald-950/50"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Descargar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inputs Bar (Hidden on print) */}
        <div className="no-print bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full max-w-4xl mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-zinc-400 font-bold block mb-1">Seleccionar Sistema:</label>
            <select
              value={selectedSysId}
              onChange={(e) => setSelectedSysId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-emerald-500"
            >
              {portfolioModules.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Plan / Modalidad:</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="Plan Inicial Pyme">Plan Inicial Pyme</option>
              <option value="Plan Pro Multicaja & AFIP">Plan Pro Multicaja & AFIP</option>
              <option value="Software a Medida Exclusivo">Software a Medida Exclusivo</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Nombre de tu Negocio:</label>
            <input
              type="text"
              value={clientBusiness}
              onChange={(e) => setClientBusiness(e.target.value)}
              placeholder="Ej: Resto La Cabaña"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Persona de Contacto:</label>
            <input
              type="text"
              value={clientContact}
              onChange={(e) => setClientContact(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* PRINTABLE PROPOSAL SHEET */}
        <div className="printable-proposal bg-white text-slate-900 w-full max-w-4xl rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 font-sans border border-slate-200">
          
          {/* Header Branding */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-900 pb-6 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                  <Code2 className="w-5 h-5 text-rose-600" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                  Tu Sitio Web Río Cuarto
                </h1>
              </div>
              <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
                Anahí Gilardi & Enzo Girardi • Programadores Web & Software A Medida
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 font-mono">
              <div className="font-bold text-slate-900">PROPUESTA TÉCNICA OFICIAL</div>
              <div className="text-slate-600">Fecha: {todayDate}</div>
              <div className="text-slate-600">Tel/WA: +54 9 {phone}</div>
              <div className="text-slate-600">Email: {email}</div>
            </div>
          </div>

          {/* Client Info Block */}
          <div className="bg-slate-100 rounded-xl p-4 grid grid-cols-2 gap-4 text-xs font-medium border border-slate-200">
            <div>
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Presentado Para:</span>
              <strong className="text-slate-900 text-sm block">{clientBusiness}</strong>
              <span className="text-slate-700">Atención: {clientContact}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Plan / Modalidad:</span>
              <strong className="text-slate-900 text-sm block">{selectedPlan}</strong>
              <span className="text-slate-700">Instalación + Capacitación Incluida</span>
            </div>
          </div>

          {/* System Spec Header */}
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-black uppercase tracking-wider">
              {currentSystem.badge}
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {currentSystem.title}
            </h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {currentSystem.description}
            </p>
          </div>

          {/* Detailed Included Modules */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Módulos y Funcionalidades Incluidas en el Desarrollo:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {currentSystem.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery terms & Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Tiempo de Entrega:</span>
              </div>
              <p className="text-slate-600">3 a 7 días hábiles con prueba piloto.</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantía & Soporte:</span>
              </div>
              <p className="text-slate-600">Soporte técnico posventa directo y backups de seguridad.</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Validez:</span>
              </div>
              <p className="text-slate-600">Presupuesto válido por 15 días corridos.</p>
            </div>
          </div>

          {/* Signature Footer */}
          <div className="pt-8 border-t-2 border-slate-200 flex justify-between items-end text-xs">
            <div>
              <p className="font-bold text-slate-900">Desarrollado por Tu Sitio Web Río Cuarto (Anahí Gilardi & Enzo Girardi)</p>
              <p className="text-slate-500">Programación e Integración de Sistemas</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-400 mb-1" />
              <p className="text-slate-500">Firma / Conformidad Cliente</p>
            </div>
          </div>

        </div>

      </div>
    </AnimatePresence>
  );
};
