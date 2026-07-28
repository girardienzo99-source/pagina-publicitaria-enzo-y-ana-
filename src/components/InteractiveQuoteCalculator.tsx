import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Check, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building, 
  Utensils, 
  ShoppingBag, 
  Wrench, 
  ShoppingCart, 
  Calendar, 
  Layers,
  Send,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { industryOptions } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface InteractiveQuoteCalculatorProps {
  phone: string;
}

export const InteractiveQuoteCalculator: React.FC<InteractiveQuoteCalculatorProps> = ({ phone }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('gastronomia');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'pos-rapido',
    'control-stock',
    'reportes-ventas'
  ]);
  const [timeline, setTimeline] = useState<string>('normal');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [clientBusiness, setClientBusiness] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableFeatures = [
    { id: 'pos-rapido', label: 'Punto de Venta (POS) Rápido', desc: 'Cobro ágil con lector de código de barras o botones táctiles' },
    { id: 'control-stock', label: 'Control de Stock & Inventario', desc: 'Alertas de faltantes, precios de costo y margen de ganancia' },
    { id: 'comandas-mesas', label: 'Comandas & Mapa de Mesas', desc: 'Especial Gastronomía: mozos en turno y despacho en cocina/barra' },
    { id: 'whatsapp-bot', label: 'Notificaciones & WhatsApp', desc: 'Envío de recibos, pedidos o confirmación de turnos por WhatsApp' },
    { id: 'facturacion', label: 'Facturación & Caja Diaria', desc: 'Arqueo de caja, reportes de turnos e ingresos diarios/mensuales' },
    { id: 'multisucursal', label: 'Multi-Usuario / Multi-Sucursal', desc: 'Roles con permisos (administrador, empleado, mozo, caja)' },
    { id: 'reportes-ventas', label: 'Dashboard de Reportes', desc: 'Gráficos de ventas, productos más vendidos e ingresos' }
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const currentIndustryObj = industryOptions.find(i => i.id === selectedIndustry) || industryOptions[0];

  // Calculate estimated time frame based on selected features
  const estimatedDays = Math.max(7, selectedFeatures.length * 4);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('leads').insert({
          client_business: clientBusiness.trim() || 'Consulta Cotizador Web',
          client_contact: clientContact.trim() || 'Interesado Anónimo',
          industry: selectedIndustry,
          selected_features: selectedFeatures,
          timeline: timeline,
          notes: additionalNotes.trim(),
          estimated_days: estimatedDays,
          status: 'nuevo'
        });
        if (error) {
          console.error('Error al guardar lead en Supabase:', error);
        }
      } catch (err) {
        console.error('Error inesperado al guardar lead:', err);
      }
    }

    setIsSubmitting(false);

    const message = generateWhatsAppMessageText();
    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  const generateWhatsAppMessageText = () => {
    const selectedFeatureLabels = availableFeatures
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => `• ${f.label}`)
      .join('\n');

    let text = `Hola Anahí y Enzo! Estuve en el Cotizador de Tu Sitio Web Río Cuarto y armé esta propuesta para mi negocio:\n\n`;
    if (clientBusiness) text += `🏢 *Negocio:* ${clientBusiness}\n`;
    if (clientContact) text += `👤 *Contacto:* ${clientContact}\n`;
    text += `📌 *Rubro:* ${currentIndustryObj.name}\n`;
    text += `⚙️ *Funciones Requeridas:*\n${selectedFeatureLabels || '• A definir con Anahí y Enzo'}\n\n`;
    text += `⏱️ *Plazo Deseado:* ${timeline === 'urgente' ? 'Urgente (<15 días)' : timeline === 'normal' ? 'Estándar (15-30 días)' : 'Sin apuro'}`;
    if (additionalNotes) text += `\n📝 *Notas:* ${additionalNotes}`;
    text += `\n\n¿Podrían decirme qué costo estimado tendría y cuándo podríamos coordinar una demo?`;

    return text;
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-gradient-to-r from-[#1C050E] via-[#2D0917] to-[#16040B] border border-rose-900/40 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xl"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-900/30 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-rose-300" />
          <span>Cotizador Express de Proyectos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Presupuestá tu Sitio Web o Sistema a Medida
        </h1>
        <p className="text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto">
          Seleccioná tu rubro y las funciones que necesita tu negocio para armar una estimación funcional y enviársela directo a Anahí & Enzo Gilardi por WhatsApp.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Options */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          
          {/* Step 1: Industry Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">1</span>
              <span>¿Cuál es el rubro de tu negocio?</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {industryOptions.map(ind => {
                const isSelected = selectedIndustry === ind.id;
                return (
                  <motion.button
                    key={ind.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedIndustry(ind.id);
                      // Auto select recommended features
                      setSelectedFeatures(ind.recommendedFeatures);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Building className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{ind.name}</h4>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Feature Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">2</span>
              <span>¿Qué módulos o funciones necesitás?</span>
            </label>

            <div className="space-y-2.5">
              {availableFeatures.map(feature => {
                const isChecked = selectedFeatures.includes(feature.id);
                return (
                  <div
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                      isChecked
                        ? 'bg-slate-800 border-emerald-500/80 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition ${
                      isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white">{feature.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline & Additional Comments */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">3</span>
              <span>Urgencia o plazo deseado</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'urgente', label: '⚡ Urgente (<15 días)' },
                { id: 'normal', label: '📅 Normal (15-30 días)' },
                { id: 'tranquilo', label: '☕ Sin apuro' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTimeline(t.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                    timeline === t.id
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-client-business" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  Nombre de tu Negocio / Empresa (Opcional)
                </label>
                <input
                  id="quote-client-business"
                  type="text"
                  value={clientBusiness}
                  onChange={e => setClientBusiness(e.target.value)}
                  placeholder="Ej: Pizzería Roma"
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 transition min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="quote-client-contact" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  Tu Nombre o Contacto (Opcional)
                </label>
                <input
                  id="quote-client-contact"
                  type="text"
                  value={clientContact}
                  onChange={e => setClientContact(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 transition min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quote-additional-notes" className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                Detalles adicionales o preguntas para Anahí & Enzo (Opcional)
              </label>
              <textarea
                id="quote-additional-notes"
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder="Ej: Tengo 2 empleados, necesito que funcione en tablet y computadoras..."
                rows={2}
                className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 transition min-h-[44px]"
              />
            </div>
          </div>

        </motion.div>

        {/* Right Panel: Instant Summary Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="sticky top-24 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Resumen de Propuesta
                </span>
                <h3 className="text-xl font-black text-white">
                  Programa Personalizado
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Selected Industry */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Rubro Seleccionado:
              </span>
              <p className="text-sm font-extrabold text-amber-400">
                {currentIndustryObj.name}
              </p>
            </div>

            {/* Selected Features */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Módulos Incluidos ({selectedFeatures.length}):
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {selectedFeatures.length === 0 ? (
                  <p className="text-xs text-slate-500">Seleccioná al menos una función.</p>
                ) : (
                  availableFeatures
                    .filter(f => selectedFeatures.includes(f.id))
                    .map(f => (
                      <div key={f.id} className="flex items-center space-x-2 text-xs text-slate-200 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{f.label}</span>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Estimated Development Time */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Estimado de Entrega:</span>
              </div>
              <span className="font-extrabold text-amber-400">
                ~{estimatedDays} a {estimatedDays + 7} días
              </span>
            </div>

            {/* What's Always Included */}
            <div className="space-y-2 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
              <div className="font-bold text-slate-300">Todas las propuestas de Tu Sitio Web Río Cuarto incluyen:</div>
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Instalación y capacitación inicial</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Garantía de funcionamiento y soporte directo</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>100% código tuyo sin mensualidades ocultas</span>
              </div>
            </div>

            {/* SEND DIRECT TO WHATSAPP BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative group overflow-hidden w-full py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/60 border border-emerald-300/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-75" />
                    <MessageCircle className="relative w-5 h-5 fill-white text-emerald-700" />
                  </>
                )}
              </div>
              <span>{isSubmitting ? 'Registrando...' : 'Enviar Propuesta por WhatsApp'}</span>
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Al hacer clic se abrirá WhatsApp con los detalles ya cargados para enviarle a Anahí & Enzo Gilardi ({phone}).
            </p>

          </div>
        </motion.div>

      </div>

    </div>
  );
};
