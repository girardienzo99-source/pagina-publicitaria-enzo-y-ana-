import React, { useState } from 'react';
import { FlyerData } from '../types';
import { Edit3, Plus, Trash2, RotateCcw, Check, Sparkles, Save, Loader2 } from 'lucide-react';
import { initialFlyerData } from '../data/portfolioData';
import { isSupabaseConfigured } from '../lib/supabaseClient';

interface FlyerEditorProps {
  flyerData: FlyerData;
  setFlyerData: React.Dispatch<React.SetStateAction<FlyerData>>;
  onPreviewFlyer: () => void;
  onSaveConfig: (data: FlyerData) => Promise<boolean>;
}

export const FlyerEditor: React.FC<FlyerEditorProps> = ({
  flyerData,
  setFlyerData,
  onPreviewFlyer,
  onSaveConfig
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    const success = await onSaveConfig(flyerData);
    if (success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
    setIsSaving(false);
  };

  const handleServiceChange = (index: number, value: string) => {
    const updated = [...flyerData.mainServices];
    updated[index] = value;
    setFlyerData(prev => ({ ...prev, mainServices: updated }));
  };

  const handleAddService = () => {
    setFlyerData(prev => ({
      ...prev,
      mainServices: [...prev.mainServices, 'Nuevo servicio o módulo personalizado']
    }));
  };

  const handleRemoveService = (index: number) => {
    setFlyerData(prev => ({
      ...prev,
      mainServices: prev.mainServices.filter((_, i) => i !== index)
    }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...flyerData.keyBenefits];
    updated[index] = value;
    setFlyerData(prev => ({ ...prev, keyBenefits: updated }));
  };

  const handleAddBenefit = () => {
    setFlyerData(prev => ({
      ...prev,
      keyBenefits: [...prev.keyBenefits, 'Nueva ventaja competitiva']
    }));
  };

  const handleRemoveBenefit = (index: number) => {
    setFlyerData(prev => ({
      ...prev,
      keyBenefits: prev.keyBenefits.filter((_, i) => i !== index)
    }));
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Querés restablecer todos los datos de la publicidad a la información original de Enzo Girardi?')) {
      setFlyerData(initialFlyerData);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-red-950/40 border border-red-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider">
          <Edit3 className="w-4 h-4" />
          <span>Editor de Contenido Publicitario</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Personalizá los Datos de tu Anuncio Comercial
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Podés editar tus datos de contacto, frase principal, promociones y lista de programas para actualizar la presentación en tiempo real.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={onPreviewFlyer}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-red-900/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ver Anuncio Publicitario</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition shadow-lg ${
              saveStatus === 'success'
                ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                : saveStatus === 'error'
                ? 'bg-rose-700 text-white shadow-rose-950/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-950/40'
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveStatus === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {isSaving
                ? 'Guardando...'
                : saveStatus === 'success'
                ? '¡Guardado con Éxito!'
                : saveStatus === 'error'
                ? 'Error al Guardar'
                : isSupabaseConfigured
                ? 'Guardar en Base de Datos'
                : 'Guardar Localmente'}
            </span>
          </button>

          <button
            onClick={handleResetToDefaults}
            className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl border border-zinc-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            1. Datos Personales & Contacto
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre y Apellido
              </label>
              <input
                type="text"
                value={flyerData.developerName}
                onChange={e => setFlyerData({ ...flyerData, developerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Título o Especialidad
              </label>
              <input
                type="text"
                value={flyerData.role}
                onChange={e => setFlyerData({ ...flyerData, role: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Teléfono / WhatsApp (Solo números para link directo)
              </label>
              <input
                type="text"
                value={flyerData.phone}
                onChange={e => setFlyerData({ ...flyerData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Teléfono Formateado (Para mostrar en el flyer)
              </label>
              <input
                type="text"
                value={flyerData.phoneFormatted}
                onChange={e => setFlyerData({ ...flyerData, phoneFormatted: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico (Gmail)
              </label>
              <input
                type="email"
                value={flyerData.email}
                onChange={e => setFlyerData({ ...flyerData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ubicación o Zona de Cobertura
              </label>
              <input
                type="text"
                value={flyerData.location}
                onChange={e => setFlyerData({ ...flyerData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Slogan & Promotion */}
        <div>
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            2. Encabezado de Marketing & Promoción
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gancho de Atención (Encabezado Superior impactante)
              </label>
              <input
                type="text"
                value={flyerData.hookTitle || ''}
                onChange={e => setFlyerData({ ...flyerData, hookTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Slogan / Frase Principal de la Publicidad
              </label>
              <textarea
                value={flyerData.slogan}
                onChange={e => setFlyerData({ ...flyerData, slogan: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Insignia de Promoción / Oferta Especial
                </label>
                <input
                  type="text"
                  value={flyerData.promoBadge}
                  onChange={e => setFlyerData({ ...flyerData, promoBadge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Texto de Garantía y Confianza
                </label>
                <input
                  type="text"
                  value={flyerData.guaranteeText || ''}
                  onChange={e => setFlyerData({ ...flyerData, guaranteeText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Services List */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              3. Programas y Servicios Ofrecidos
            </h3>

            <button
              onClick={handleAddService}
              className="flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Servicio</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {flyerData.mainServices.map((service, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={service}
                  onChange={e => handleServiceChange(idx, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
                />
                <button
                  onClick={() => handleRemoveService(idx)}
                  className="p-3 text-red-400 hover:bg-slate-950 rounded-xl border border-slate-800"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              4. Beneficios Clave
            </h3>

            <button
              onClick={handleAddBenefit}
              className="flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Ventaja</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {flyerData.keyBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={e => handleBenefitChange(idx, e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 outline-none"
                />
                <button
                  onClick={() => handleRemoveBenefit(idx)}
                  className="p-3 text-red-400 hover:bg-slate-950 rounded-xl border border-slate-800"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
