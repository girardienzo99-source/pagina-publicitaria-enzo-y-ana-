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
    const updated = flyerData.mainServices.filter((_, i) => i !== index);
    setFlyerData(prev => ({ ...prev, mainServices: updated }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...flyerData.keyBenefits];
    updated[index] = value;
    setFlyerData(prev => ({ ...prev, keyBenefits: updated }));
  };

  const handleAddBenefit = () => {
    setFlyerData(prev => ({
      ...prev,
      keyBenefits: [...prev.keyBenefits, 'Nueva ventaja o beneficio clave']
    }));
  };

  const handleRemoveBenefit = (index: number) => {
    const updated = flyerData.keyBenefits.filter((_, i) => i !== index);
    setFlyerData(prev => ({ ...prev, keyBenefits: updated }));
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Desea restablecer todos los textos a los valores iniciales predeterminados?')) {
      setFlyerData(initialFlyerData);
    }
  };

  return (
    <div className="space-y-6 font-montserrat text-[#1e1b1b]">
      
      {/* Editor Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-stone-300 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-5 h-5 text-[#4a5d4a]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e1b1b]">
            Personalizador de Textos & Servicios
          </h2>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={onPreviewFlyer}
            className="flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-stone-50 text-[#1e1b1b] font-bold text-xs rounded-sm border border-stone-300 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#4a5d4a]" />
            <span>Ver Anuncio</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-sm transition shadow-sm cursor-pointer ${
              saveStatus === 'success'
                ? 'bg-[#4a5d4a] text-white'
                : saveStatus === 'error'
                ? 'bg-red-700 text-white'
                : 'bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white'
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
            className="flex items-center space-x-2 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-sm border border-stone-300 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
            1. Datos Personales & Contacto
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Nombre y Apellido
              </label>
              <input
                type="text"
                value={flyerData.developerName}
                onChange={e => setFlyerData({ ...flyerData, developerName: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Título o Especialidad
              </label>
              <input
                type="text"
                value={flyerData.role}
                onChange={e => setFlyerData({ ...flyerData, role: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Teléfono / WhatsApp (Solo números para link directo)
              </label>
              <input
                type="text"
                value={flyerData.phone}
                onChange={e => setFlyerData({ ...flyerData, phone: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Teléfono Formateado (Para mostrar en el flyer)
              </label>
              <input
                type="text"
                value={flyerData.phoneFormatted}
                onChange={e => setFlyerData({ ...flyerData, phoneFormatted: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Correo Electrónico (Gmail)
              </label>
              <input
                type="email"
                value={flyerData.email}
                onChange={e => setFlyerData({ ...flyerData, email: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Ubicación o Zona de Cobertura
              </label>
              <input
                type="text"
                value={flyerData.location}
                onChange={e => setFlyerData({ ...flyerData, location: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Slogan & Promotion */}
        <div>
          <h3 className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
            2. Encabezado de Marketing & Promoción
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Gancho de Atención (Encabezado Superior impactante)
              </label>
              <input
                type="text"
                value={flyerData.hookTitle || ''}
                onChange={e => setFlyerData({ ...flyerData, hookTitle: e.target.value })}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                Slogan / Frase Principal de la Publicidad
              </label>
              <textarea
                value={flyerData.slogan}
                onChange={e => setFlyerData({ ...flyerData, slogan: e.target.value })}
                rows={2}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                  Insignia de Promoción / Oferta Especial
                </label>
                <input
                  type="text"
                  value={flyerData.promoBadge}
                  onChange={e => setFlyerData({ ...flyerData, promoBadge: e.target.value })}
                  className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e1b1b]/80 mb-1">
                  Texto de Garantía y Confianza
                </label>
                <input
                  type="text"
                  value={flyerData.guaranteeText || ''}
                  onChange={e => setFlyerData({ ...flyerData, guaranteeText: e.target.value })}
                  className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Services List */}
        <div>
          <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-4">
            <h3 className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider">
              3. Programas y Servicios Ofrecidos
            </h3>

            <button
              onClick={handleAddService}
              className="flex items-center space-x-1 text-xs font-bold text-[#4a5d4a] hover:underline cursor-pointer"
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
                  className="flex-1 bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
                />
                <button
                  onClick={() => handleRemoveService(idx)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-sm border border-stone-300 cursor-pointer"
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
          <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-4">
            <h3 className="text-xs font-bold text-[#4a5d4a] uppercase tracking-wider">
              4. Beneficios Clave
            </h3>

            <button
              onClick={handleAddBenefit}
              className="flex items-center space-x-1 text-xs font-bold text-[#4a5d4a] hover:underline cursor-pointer"
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
                  className="flex-1 bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 text-xs text-[#1e1b1b] focus:border-[#4a5d4a] outline-none"
                />
                <button
                  onClick={() => handleRemoveBenefit(idx)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-sm border border-stone-300 cursor-pointer"
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
