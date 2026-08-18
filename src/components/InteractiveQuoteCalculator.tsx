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
      id: 'facturacion', 
      label: 'Facturación Electrónica ARCA (ex AFIP) A, B y C', 
      desc: 'Emisión automática de comprobantes fiscales con código QR.',
      didacticNote: '💡 Cumplí con la normativa sin perder tiempo entrando a la página de ARCA.'
    },
    { 
      id: 'cuentas-corrientes', 
      label: 'Cuentas Corrientes & Clientes Frecuentes', 
      desc: 'Historial de fiados, saldos, límites de crédito y cobranzas.',
      didacticNote: '💡 Llevá el control de lo que te debe cada cliente al centavo sin anotar en cuadernos.'
    },
    { 
      id: 'multicaja-cloud', 
      label: 'Múltiples Cajas y Sincronización en la Nube', 
      desc: 'Monitoreá las ventas en vivo desde tu celular en cualquier lugar.',
      didacticNote: '💡 Mirá el cierre de caja de tu local desde tu casa en tiempo real.'
    }
  ];

  const currentIndustryObj = industryOptions.find(i => i.id === selectedIndustry) || industryOptions[0];

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  // Dynamic estimate formulas
  const baseCostPerFeature = 55000;
  const estimatedDays = Math.max(3, selectedFeatures.length * 2.2);
  const estimatedPriceBase = 180000 + (selectedFeatures.length * baseCostPerFeature);

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

    let text = `Hola Anahí y Enzo! Estuve en el Cotizador Interactivo de Río Cuarto Web y armé la siguiente estimación para mi negocio:\n\n`;
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
    <div className="space-y-8 pb-16 max-w-5xl mx-auto font-montserrat text-[#1e1b1b]">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl"
      >
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-[#4a5d4a]" />
          <span>Asistente Interactivo de Cotización</span>
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1e1b1b] tracking-tight">
          Presupuestá tu Sitio Web o Sistema en 3 Pasos Didácticos
        </h1>
        <p className="text-xs sm:text-base text-[#1e1b1b]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Respondé 3 preguntas guiadas para calcular las funciones que necesita tu negocio y comunicate directo por WhatsApp con <strong className="text-[#1e1b1b] font-bold">Anahí Gilardi & Enzo Girardi (Programadores)</strong>.
        </p>
      </motion.div>

      {/* Wizard Stepper Progress Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-md">
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
                className={`py-2.5 px-2 rounded-xl font-bold transition flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 border min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'bg-[#4a5d4a] text-white border-[#4a5d4a] shadow-md'
                    : isCompleted
                    ? 'bg-[#4a5d4a]/15 text-[#4a5d4a] border-[#4a5d4a]/30'
                    : 'bg-[#fcf9f8] text-[#1e1b1b]/60 border-stone-200 hover:text-[#1e1b1b]'
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
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider block">
                  PASO 1 DE 4
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] mt-1">
                  ¿Cuál es el rubro principal de tu comercio o empresa?
                </h3>
                <p className="text-xs text-[#1e1b1b]/70 mt-1 font-light">
                  Elegí tu actividad para cargar automáticamente las funciones recomendadas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industryOptions.map(ind => {
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndustry(ind.id);
                        setSelectedFeatures(ind.recommendedFeatures);
                      }}
                      className={`p-4 rounded-xl border text-left transition flex items-start space-x-3 min-h-[72px] cursor-pointer ${
                        isSelected
                          ? 'bg-[#4a5d4a] border-[#4a5d4a] text-white shadow-lg'
                          : 'bg-[#fcf9f8] border-stone-200 text-[#1e1b1b]/80 hover:border-[#4a5d4a] hover:bg-stone-50'
                      }`}
                    >
                      <Building className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#4a5d4a]'}`} />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide">{ind.name}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  <span>Siguiente Paso (Elegir Funciones)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Feature Selection with Didactic Notes */}
          {currentStep === 2 && (
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider block">
                  PASO 2 DE 4
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] mt-1">
                  ¿Qué módulos o funciones necesitás en tu sistema?
                </h3>
                <p className="text-xs text-[#1e1b1b]/70 mt-1 font-light">
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
                      className={`p-4 rounded-xl border cursor-pointer transition flex items-start space-x-3.5 ${
                        isChecked
                          ? 'bg-[#4a5d4a]/10 border-[#4a5d4a] text-[#1e1b1b]'
                          : 'bg-[#fcf9f8] border-stone-200 text-[#1e1b1b]/70 hover:border-stone-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition ${
                        isChecked ? 'bg-[#4a5d4a] border-[#4a5d4a] text-white font-bold' : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#1e1b1b] uppercase tracking-wide">{feature.label}</h4>
                        <p className="text-xs text-[#1e1b1b]/70">{feature.desc}</p>
                        <div className="p-2 rounded-md bg-white border border-stone-200 text-[11px] text-[#4a5d4a] font-medium mt-1">
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
                  className="flex items-center space-x-2 px-5 py-3 rounded-sm bg-white text-[#1e1b1b] hover:bg-stone-50 border border-stone-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  <span>Siguiente Paso (Plazos & Datos)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Timeline & Client Contact Info */}
          {currentStep === 3 && (
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider block">
                  PASO 3 DE 4
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] mt-1">
                  Plazo deseado y datos de tu comercio
                </h3>
                <p className="text-xs text-[#1e1b1b]/70 mt-1 font-light">
                  Indicanos la urgencia y tus datos de contacto para personalizar la propuesta.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4a5d4a] block">
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
                      className={`py-3 px-2 rounded-sm text-xs font-bold border transition cursor-pointer ${
                        timeline === t.id
                          ? 'bg-[#4a5d4a] text-white border-[#4a5d4a] shadow-sm'
                          : 'bg-[#fcf9f8] text-[#1e1b1b]/70 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-client-business" className="block text-xs font-bold text-[#1e1b1b]/80 mb-1.5">
                    Nombre de tu Negocio / Empresa (Opcional):
                  </label>
                  <input
                    id="quote-client-business"
                    type="text"
                    value={clientBusiness}
                    onChange={e => setClientBusiness(e.target.value)}
                    placeholder="Ej: Pizzería El Patrón"
                    className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] transition min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="quote-client-contact" className="block text-xs font-bold text-[#1e1b1b]/80 mb-1.5">
                    Tu Nombre o Contacto (Opcional):
                  </label>
                  <input
                    id="quote-client-contact"
                    type="text"
                    value={clientContact}
                    onChange={e => setClientContact(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] transition min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-additional-notes" className="block text-xs font-bold text-[#1e1b1b]/80 mb-1.5">
                  Detalles adicionales o preguntas para Anahí & Enzo (Opcional):
                </label>
                <textarea
                  id="quote-additional-notes"
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  placeholder="Ej: Tengo 2 empleados en caja, necesito que funcione en tablet y computadoras..."
                  rows={2}
                  className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] transition min-h-[44px]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-5 py-3 rounded-sm bg-white text-[#1e1b1b] hover:bg-stone-50 border border-stone-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  <span>Ver Resumen & WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Send to WhatsApp */}
          {currentStep === 4 && (
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider block">
                  PASO 4 DE 4 — ¡TODO LISTO!
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] mt-1">
                  Resumen de tu Cotización Personalizada
                </h3>
                <p className="text-xs text-[#1e1b1b]/70 mt-1 font-light">
                  Revisá la propuesta estimada y envíala directamente por WhatsApp para coordinar tu demo.
                </p>
              </div>

              <div className="space-y-3 bg-[#fcf9f8] p-5 rounded-xl border border-stone-200 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-[#1e1b1b]/70 font-bold">Rubro:</span>
                  <span className="text-[#4a5d4a] font-bold">{currentIndustryObj.name}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#1e1b1b]/70 font-bold block">Funciones Elegidas ({selectedFeatures.length}):</span>
                  <ul className="space-y-1">
                    {availableFeatures
                      .filter(f => selectedFeatures.includes(f.id))
                      .map(f => (
                        <li key={f.id} className="flex items-center space-x-2 text-[#1e1b1b]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4a5d4a] shrink-0" />
                          <span>{f.label}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="flex justify-between border-t border-stone-200 pt-2 font-mono">
                  <span className="text-[#1e1b1b]/70 font-bold">Inversión Proyectada:</span>
                  <span className="text-[#4a5d4a] font-bold text-sm">
                    ~${estimatedPriceBase.toLocaleString('es-AR')} ARS <span className="text-[10px] font-sans text-stone-500">(Pago Único)</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative group overflow-hidden w-full py-4 bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-sm rounded-sm shadow-xl transition-all uppercase tracking-wider flex items-center justify-center space-x-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Enviar Cotización por WhatsApp</span>
                  </>
                )}
              </button>

              <div className="flex justify-start">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-5 py-3 rounded-sm bg-white text-[#1e1b1b] hover:bg-stone-50 border border-stone-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
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
          <div className="sticky top-24 bg-white border-2 border-[#4a5d4a] rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a5d4a]">
                  Resumen de tu Cotización
                </span>
                <h3 className="font-editorial text-xl font-bold text-[#1e1b1b]">
                  Sistema a Medida
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#4a5d4a]" />
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-stone-500 font-bold uppercase text-[10px] tracking-wider block">Rubro:</span>
              <p className="text-sm font-bold text-[#1e1b1b]">{currentIndustryObj.name}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-stone-500 font-bold uppercase text-[10px] tracking-wider block">
                Módulos Seleccionados ({selectedFeatures.length}):
              </span>
              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {selectedFeatures.map(fId => {
                  const featureObj = availableFeatures.find(af => af.id === fId);
                  return (
                    <div key={fId} className="flex items-center space-x-2 text-[11px] text-[#1e1b1b] bg-[#fcf9f8] p-2 rounded border border-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4a5d4a] shrink-0" />
                      <span className="truncate">{featureObj?.label || fId}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fcf9f8] border border-stone-200 space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Plazo Estimado:</span>
                <span className="text-[#1e1b1b] font-bold">~{Math.round(estimatedDays)} Días Hábiles</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                <span className="text-stone-600">Inversión Est.:</span>
                <span className="text-[#4a5d4a] font-bold text-sm">~${estimatedPriceBase.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fcf9f8] border border-stone-200 text-[11px] text-[#1e1b1b]/80 space-y-1">
              <div className="font-bold text-[#1e1b1b] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#4a5d4a]" />
                <span>Río Cuarto Web Incluye:</span>
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
