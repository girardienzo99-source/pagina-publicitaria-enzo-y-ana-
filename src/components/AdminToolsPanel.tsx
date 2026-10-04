import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  Lock,
  FileText,
  Printer,
  ArrowLeft,
  Palette,
  Sparkles,
  UserCheck,
  ShieldAlert,
  LogOut,
  Inbox,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { FlyerEditor } from './FlyerEditor';
import { PremiumFlyerCard } from './PremiumFlyerCard';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { clearAdminToken, loginAdmin, verifyAdminSession } from '../lib/adminAuth';

interface AdminToolsPanelProps {
  flyerData: FlyerData;
  setFlyerData: React.Dispatch<React.SetStateAction<FlyerData>>;
  theme: FlyerTheme;
  setTheme: (theme: FlyerTheme) => void;
  format: FlyerFormat;
  setFormat: (format: FlyerFormat) => void;
  onPreviewFlyer: () => void;
  onSaveConfig: (updatedData: FlyerData) => Promise<boolean>;
  onOpenPdfCatalog: () => void;
  onOpenProposalModal: () => void;
}

const FORMAT_OPTIONS: { id: FlyerFormat; label: string }[] = [
  { id: 'poster-story', label: 'Story 9:16' },
  { id: 'square-post', label: 'Post 1:1' },
  { id: 'horizontal-banner', label: 'Banner 16:9' },
  { id: 'business-card', label: 'Tarjeta' },
];

const THEME_OPTIONS: { id: FlyerTheme; label: string }[] = [
  { id: 'modern-vintage', label: 'Vintage Claro' },
  { id: 'ruby-red', label: 'Bordó Rubí' },
  { id: 'modern-emerald', label: 'Esmeralda' },
  { id: 'clean-corporate', label: 'Corporativo' },
];

type AuthState = 'checking' | 'locked' | 'unlocked';

const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    const result = await loginAdmin(password);
    setIsSubmitting(false);
    if (result.ok) {
      setPassword('');
      onSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 font-montserrat text-[#1e1b1b]">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-stone-300 rounded-3xl p-8 shadow-2xl space-y-6 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#4a5d4a]/15 border border-[#4a5d4a]/30 flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8 text-[#4a5d4a]" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="font-editorial text-2xl font-bold">Acceso administrativo</h1>
          <p className="text-sm text-stone-600">Ingresá la contraseña del equipo para editar el anuncio y generar propuestas.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
          <div>
            <label htmlFor="admin-password" className="block text-xs font-bold uppercase text-stone-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'admin-login-error' : undefined}
                className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 pl-10 pr-11 text-sm placeholder-stone-500 focus:outline-none focus:border-[#4a5d4a] focus:ring-2 focus:ring-[#4a5d4a]/30 font-semibold min-h-[44px]"
              />
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-1.5 top-1.5 p-2 rounded-sm text-stone-600 hover:bg-stone-100"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              id="admin-login-error"
              role="alert"
              className="p-3 bg-red-50 border border-red-300 rounded-sm text-red-800 text-xs font-bold flex items-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full py-3.5 px-4 bg-[#4a5d4a] hover:bg-[#3b4b3b] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{isSubmitting ? 'Verificando…' : 'Ingresar'}</span>
          </button>
        </form>

        <p className="text-[11px] text-stone-500">Río Cuarto Web • Acceso privado del equipo</p>
      </motion.div>
    </div>
  );
};

export const AdminToolsPanel: React.FC<AdminToolsPanelProps> = ({
  flyerData,
  setFlyerData,
  theme,
  setTheme,
  format,
  setFormat,
  onPreviewFlyer,
  onSaveConfig,
  onOpenPdfCatalog,
  onOpenProposalModal,
}) => {
  const [authState, setAuthState] = useState<AuthState>('checking');

  useEffect(() => {
    let active = true;
    verifyAdminSession().then(valid => {
      if (active) setAuthState(valid ? 'unlocked' : 'locked');
    });
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    setAuthState('locked');
  };

  if (authState === 'checking') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="w-8 h-8 animate-spin text-[#4a5d4a]" aria-hidden="true" />
        <span className="sr-only">Verificando sesión…</span>
      </div>
    );
  }

  if (authState === 'locked') {
    return <AdminLogin onSuccess={() => setAuthState('unlocked')} />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-montserrat text-[#1e1b1b]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#4a5d4a]/15 border border-[#4a5d4a]/30 flex items-center justify-center text-[#4a5d4a] shadow-sm">
            <Settings className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-editorial text-2xl font-bold">Panel de administración</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] border border-[#4a5d4a]/30 font-bold text-[10px] uppercase flex items-center space-x-1">
                <UserCheck className="w-3 h-3" aria-hidden="true" />
                <span>Sesión activa</span>
              </span>
            </div>
            <p className="text-xs text-stone-600">Editor del anuncio publicitario y generación de propuestas PDF</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenProposalModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Crear propuesta PDF</span>
          </button>
          <button
            onClick={onOpenPdfCatalog}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-white hover:bg-stone-50 font-bold text-xs uppercase tracking-wider border border-stone-300 shadow-sm transition"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Ver catálogo PDF</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider border border-stone-300"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Where leads go now */}
      <div className="flex items-start gap-3 bg-[#4a5d4a]/5 border border-[#4a5d4a]/25 rounded-2xl p-5 text-sm">
        <Inbox className="w-5 h-5 text-[#4a5d4a] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-stone-700">
          <strong className="text-[#1e1b1b]">Consultas de clientes:</strong> cada vez que alguien usa el cotizador o genera una
          propuesta, llega un aviso automático al correo del equipo (y a Telegram si está configurado), además del mensaje de WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-stone-300 rounded-3xl p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider flex items-center space-x-2">
                <Palette className="w-4 h-4" aria-hidden="true" />
                <span>Estilo y formato</span>
              </h2>
              <Sparkles className="w-4 h-4 text-[#4a5d4a]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <fieldset>
                <legend className="block font-bold text-stone-700 mb-1.5">Formato de imagen</legend>
                <div className="grid grid-cols-2 gap-1.5">
                  {FORMAT_OPTIONS.map(fmt => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setFormat(fmt.id)}
                      aria-pressed={format === fmt.id}
                      className={`py-2 px-2 rounded-sm font-bold border transition ${
                        format === fmt.id
                          ? 'bg-[#4a5d4a] text-white border-[#4a5d4a]'
                          : 'bg-[#fcf9f8] text-stone-800 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block font-bold text-stone-700 mb-1.5">Tema de color</legend>
                <div className="grid grid-cols-2 gap-1.5">
                  {THEME_OPTIONS.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      aria-pressed={theme === t.id}
                      className={`py-2 px-2 rounded-sm font-bold border transition ${
                        theme === t.id
                          ? 'bg-[#4a5d4a] text-white border-[#4a5d4a]'
                          : 'bg-[#fcf9f8] text-stone-800 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <FlyerEditor
            flyerData={flyerData}
            setFlyerData={setFlyerData}
            onPreviewFlyer={onPreviewFlyer}
            onSaveConfig={onSaveConfig}
          />
        </div>

        {/* Live preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-stone-300 rounded-3xl p-6 space-y-4 shadow-md lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider">Vista previa del anuncio</h2>
              <button
                onClick={onPreviewFlyer}
                className="flex items-center space-x-1.5 text-xs font-bold text-[#4a5d4a] hover:underline transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ir al inicio</span>
              </button>
            </div>
            <div className="flex justify-center p-4 bg-[#fcf9f8] rounded-2xl border border-stone-200 overflow-x-auto">
              <PremiumFlyerCard flyerData={flyerData} theme={theme} format={format} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
