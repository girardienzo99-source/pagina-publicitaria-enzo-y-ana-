import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Check, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Building, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  DollarSign,
  HelpCircle,
  Zap,
  Loader2,
  FileText
} from 'lucide-react';
import { industryOptions } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface InteractiveQuoteCalculatorProps {
  phone: string;
}

export const InteractiveQuoteCalculator: React.FC<InteractiveQuoteCalculatorProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('gastronomia');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'pos-rapido',
    'control-stock',
    'facturacion'
  ]);
  const [timeline, setTimeline] = useState<string>('normal');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [clientBusiness, setClientBusiness] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableFeatures = [
    { 
      id: 'pos-rapido', 
      label: 'Punto de Venta (POS) Ultrarrápido', 
      desc: 'Cobro ágil con lector de código de barras o botones táctiles.',
      didacticNote: '💡 Cobrá en menos de 10 segundos en caja sin hacer esperar al cliente.'
    },
    { 
      id: 'control-stock', 
      label: 'Control de Stock & Inventario con Talles/Colores', 
      desc: 'Alertas de faltantes, costo y margen de ganancia.',
      didacticNote: '💡 Evitá perder ventas sabiendo exactamente qué prendas o insumos tenés en depósito.'
    },
    { 
      id: 'comandas-mesas', 
      label: 'Comandas & Mapa de Mesas Gastronómico', 
      desc: 'Mozos en turno con tablet y despacho instantáneo en cocina.',
      didacticNote: '💡 Los mozos cargan el pedido desde la mesa y el ticket sale impreso en cocina en 1 sec.'
    },
    { 
      id: 'whatsapp-bot', 
      label: 'Notificaciones & Recordatorios por WhatsApp', 
      desc: 'Envío de recibos, avisos de pedido listo o turnos.',
      didacticNote: '💡 Automatizá la comunicación por WhatsApp sin enviar mensajes manuales uno por uno.'
    },
    { 
      id: 'facturacion', 
      label: 'Facturación Electrónica ARCA (ex AFIP)', 
      desc: 'Comprobantes A, B y C aprobados con CAE en 2 segundos.',
      didacticNote: '💡 Emití facturas oficiales sin necesidad de ingresar manualmente a la página de la AFIP.'
    },
    { 
      id: 'multisucursal', 
      label: 'Multi-Usuario / Multi-Sucursal', 
      desc: 'Permisos por rol (administrador, cajero, mozo, depósito).',
      didacticNote: '💡 Controlá lo que puede ver o editar cada empleado desde cualquier celular o PC.'
    },
    { 
      id: 'reportes-ventas', 
      label: 'Dashboard de Reportes & Rentabilidad', 
      desc: 'Gráficos de ventas diarias, productos más vendidos y caja.',
      didacticNote: '💡 Visualizá cuánto facturaste en el día y cuál es tu producto estrella.'
    }
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const currentIndustryObj = industryOptions.find(i => i.id === selectedIndustry) || industryOptions[0];

  // Calculations
  const estimatedDays = Math.max(5, Math.min(15, selectedFeatures.length * 2.5));
  const estimatedPriceBase = 180000 + (selectedFeatures.length * 45000);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert({
          client_business: clientBusiness.trim() || 'Consulta Cotizador Didáctico',
          client_contact: clientContact.trim() || 'Interesado Anónimo',
          industry: selectedIndustry,
          selected_features: selectedFeatures,
          timeline: timeline,
          notes: additionalNotes.trim(),
          estimated_days: Math.round(estimatedDays),
          status: 'nuevo'
        });
      } catch (err) {
        console.error('Error guardando lead en Supabase:', err);
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

    let text = `Hola Anahí y Enzo! Estuve en el Cotizador Interactivo de Tu Sitio Web Río Cuarto y armé la siguiente estimación para mi negocio:\n\n`;
    if (clientBusiness) text += `🏢 *Negocio:* ${clientBusiness}\n`;
    if (clientContact) text += `👤 *Contacto:* ${clientContact}\n`;
    text += `📌 *Rubro:* ${currentIndustryObj.name}\n`;
    text += `⚙️ *Funciones Seleccionadas:*\n${selectedFeatureLabels || '• A definir con Anahí y Enzo'}\n\n`;
    text += `⏱️ *Plazo Estimado:* ~${Math.round(estimatedDays)} días hábiles\n`;
    text += `💰 *Presupuesto Estimado:* ~$${estimatedPriceBase.toLocaleString('es-AR')} ARS (Pago Único)\n`;
    if (additionalNotes) text += `📝 *Notas adicionales:* ${additionalNotes}\n`;
    text += `\n¿Cuándo podríamos coordinar una demo para ajustar los detalles?`;

    return text;
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-gradient-to-r from-[#1F0611] via-[#2E0919] to-[#14040A] border border-rose-900/40 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xl"
      >
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-950/80 text-rose-200 border border-rose-700/50 text-xs font-black uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-amber-300" />
          <span>Asistente Interactivo de Cotización</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Presupuestá tu Sitio Web o Sistema en 3 Pasos Didácticos
        </h1>
        <p className="text-xs sm:text-base text-rose-200/70 max-w-2xl mx-auto font-medium">
          Respondé 3 preguntas guiadas para calcular las funciones que necesita tu negocio y comunicate directo por WhatsApp con <strong className="text-white">Anahí Gilardi & Enzo Girardi (Programadores)</strong>.
        </p>
      </motion.div>

      {/* Wizard Stepper Progress Bar */}
      <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-2xl p-4 shadow-xl">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { step: 1, title: '1. Tu Rubro', icon: Building },
            { step: 2, title: '2. Funciones', icon: Zap },
            { step: 3, title: '3. Plazos & Datos', icon: Clock },
            { step: 4, title: '4. Resumen & Enviar', icon: Send }
          ].map(s => {
            const IconComp = s.icon;
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`py-2.5 px-2 rounded-xl font-black transition flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 border min-h-[44px] ${
                  isActive
                    ? 'bg-rose-900 text-white border-rose-500 shadow-md shadow-rose-950'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#18040B] text-rose-300/60 border-rose-900/30 hover:text-white'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span className="truncate">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Step Panel */}
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-7 space-y-6"
        >
          
          {/* STEP 1: Industry Selection */}
          {currentStep === 1 && (
            <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-rose-900/30 pb-3">
                <span className="text-xs font-black uppercase text-rose-300 tracking-wider block">
                  PASO 1 DE 4
                </span>
                <h3 className="text-xl font-black text-white">
                  ¿Cuál es el rubro principal de tu comercio o empresa?
                </h3>
                <p className="text-xs text-rose-200/70 mt-1">
                  Elegí tu actividad para cargar automáticamente las funciones recomendadas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industryOptions.map(ind => {
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <motion.button
                      key={ind.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedIndustry(ind.id);
                        setSelectedFeatures(ind.recommendedFeatures);
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-start space-x-3 min-h-[72px] ${
                        isSelected
                          ? 'bg-rose-900/80 border-rose-500 text-white ring-2 ring-rose-500/40 shadow-xl'
                          : 'bg-[#18040B] border-rose-900/40 text-rose-200/80 hover:border-rose-700 hover:text-white'
                      }`}
                    >
                      <Building className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-rose-400'}`} />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wide">{ind.name}</h4>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-6 min-h-[48px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span>Siguiente Paso (Elegir Funciones)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Feature Selection with Didactic Notes */}
          {currentStep === 2 && (
            <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-rose-900/30 pb-3">
                <span className="text-xs font-black uppercase text-rose-300 tracking-wider block">
                  PASO 2 DE 4
                </span>
                <h3 className="text-xl font-black text-white">
                  ¿Qué módulos o funciones necesitás en tu sistema?
                </h3>
                <p className="text-xs text-rose-200/70 mt-1">
                  Hacé clic en las funciones para activar o desactivar las herramientas de tu negocio.
                </p>
              </div>

              <div className="space-y-3">
                {availableFeatures.map(feature => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex items-start space-x-3.5 ${
                        isChecked
                          ? 'bg-[#1F0611] border-rose-500 text-white ring-1 ring-rose-500/40'
                          : 'bg-[#14040A] border-rose-900/30 text-rose-200/70 hover:border-rose-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black' : 'border-rose-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-white uppercase tracking-wide">{feature.label}</h4>
                        <p className="text-xs text-rose-200/80">{feature.desc}</p>
                        <div className="p-2 rounded-lg bg-black/40 border border-rose-900/30 text-[11px] text-amber-300 font-semibold mt-1">
                          {feature.didacticNote}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2 px-5 min-h-[48px] rounded-xl bg-[#18040B] text-rose-200 hover:text-white border border-rose-900/40 font-bold text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Rubros</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-6 min-h-[48px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span>Siguiente Paso (Plazos & Datos)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Timeline & Client Contact Info */}
          {currentStep === 3 && (
            <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-rose-900/30 pb-3">
                <span className="text-xs font-black uppercase text-rose-300 tracking-wider block">
                  PASO 3 DE 4
                </span>
                <h3 className="text-xl font-black text-white">
                  Plazo deseado y datos de tu comercio
                </h3>
                <p className="text-xs text-rose-200/70 mt-1">
                  Indicanos la urgencia y tus datos de contacto para personalizar la propuesta.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-rose-300 block">
                  ¿Con qué velocidad necesitás el sistema?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'urgente', label: '⚡ Urgente (<10 días)' },
                    { id: 'normal', label: '📅 Normal (10-20 días)' },
                    { id: 'tranquilo', label: '☕ Sin apuro' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`py-3 px-2 rounded-xl text-xs font-black border transition ${
                        timeline === t.id
                          ? 'bg-rose-900 text-white border-rose-500'
                          : 'bg-[#14040A] text-rose-200/60 border-rose-900/30 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-client-business" className="block text-xs font-bold text-rose-200/80 mb-1.5">
                    Nombre de tu Negocio / Empresa (Opcional):
                  </label>
                  <input
                    id="quote-client-business"
                    type="text"
                    value={clientBusiness}
                    onChange={e => setClientBusiness(e.target.value)}
                    placeholder="Ej: Pizzería El Patrón"
                    className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 transition min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="quote-client-contact" className="block text-xs font-bold text-rose-200/80 mb-1.5">
                    Tu Nombre o Contacto (Opcional):
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
                <label htmlFor="quote-additional-notes" className="block text-xs font-bold text-rose-200/80 mb-1.5">
                  Detalles adicionales o preguntas para Anahí & Enzo (Opcional):
                </label>
                <textarea
                  id="quote-additional-notes"
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  placeholder="Ej: Tengo 2 empleados en caja, necesito que funcione en tablet y computadoras..."
                  rows={2}
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 transition min-h-[44px]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-5 min-h-[48px] rounded-xl bg-[#18040B] text-rose-200 hover:text-white border border-rose-900/40 font-bold text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Funciones</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center space-x-2 px-6 min-h-[48px] rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  <span>Ver Resumen & WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Send to WhatsApp */}
          {currentStep === 4 && (
            <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="border-b border-rose-900/30 pb-3">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">
                  PASO 4 DE 4 — ¡TODO LISTO!
                </span>
                <h3 className="text-xl font-black text-white">
                  Resumen de tu Cotización Personalizada
                </h3>
                <p className="text-xs text-rose-200/70 mt-1">
                  Revisá la propuesta estimada y envíala directamente por WhatsApp para coordinar tu demo.
                </p>
              </div>

              <div className="space-y-3 bg-[#18040B] p-4 rounded-2xl border border-rose-900/30 text-xs">
                <div className="flex justify-between border-b border-rose-900/20 pb-2">
                  <span className="text-rose-200/60 font-bold">Rubro:</span>
                  <span className="text-amber-300 font-bold">{currentIndustryObj.name}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-rose-200/60 font-bold block">Funciones Elegidas ({selectedFeatures.length}):</span>
                  <ul className="space-y-1">
                    {availableFeatures
                      .filter(f => selectedFeatures.includes(f.id))
                      .map(f => (
                        <li key={f.id} className="flex items-center space-x-2 text-rose-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{f.label}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="flex justify-between border-t border-rose-900/20 pt-2 font-mono">
                  <span className="text-rose-200/60 font-bold">Inversión Proyectada:</span>
                  <span className="text-emerald-400 font-black text-sm">
                    ~${estimatedPriceBase.toLocaleString('es-AR')} ARS <span className="text-[10px] font-sans text-rose-200/60">(Pago Único)</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative group overflow-hidden w-full py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-2xl shadow-emerald-950/70 border border-emerald-300/40 transition-all uppercase tracking-wider flex items-center justify-center space-x-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-800" />
                    <span>Enviar Cotización por WhatsApp</span>
                  </>
                )}
              </button>

              <div className="flex justify-start">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-5 min-h-[44px] rounded-xl bg-[#18040B] text-rose-200 hover:text-white border border-rose-900/40 font-bold text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modificar Datos</span>
                </button>
              </div>
            </div>
          )}

        </motion.div>

        {/* Right Summary Sidebar (Updates Live) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-24 bg-[#240A15]/95 border-2 border-rose-700/50 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-xl">
            
            <div className="flex items-center justify-between border-b border-rose-900/40 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Resumen de tu Cotización
                </span>
                <h3 className="text-lg font-black text-white">
                  Sistema a Medida
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-rose-200/60 font-bold uppercase text-[10px] tracking-wider block">Rubro:</span>
              <p className="text-sm font-black text-amber-300">{currentIndustryObj.name}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-rose-200/60 font-bold uppercase text-[10px] tracking-wider block">
                Módulos Seleccionados ({selectedFeatures.length}):
              </span>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {selectedFeatures.map(fId => {
                  const featureObj = availableFeatures.find(af => af.id === fId);
                  return (
                    <div key={fId} className="flex items-center space-x-2 text-[11px] text-rose-100 bg-[#18040B] p-2 rounded-lg border border-rose-900/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{featureObj?.label || fId}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#14040A] border border-rose-900/40 space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-rose-200/70">Plazo Estimado:</span>
                <span className="text-amber-300 font-bold">~{Math.round(estimatedDays)} Días Hábiles</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-rose-900/20">
                <span className="text-rose-200/70">Inversión Est.:</span>
                <span className="text-emerald-400 font-black text-sm">~${estimatedPriceBase.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#18040B] border border-rose-900/30 text-[11px] text-rose-200/70 space-y-1">
              <div className="font-bold text-white flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Tu Sitio Web Río Cuarto Incluye:</span>
              </div>
              <div>✓ Instalación y capacitación guiada</div>
              <div>✓ Cero comisiones por venta</div>
              <div>✓ Soporte directo con Anahí Gilardi & Enzo Girardi</div>
            </div>

          </div>
        </motion.div>

      </div>

    </div>
  );
};
