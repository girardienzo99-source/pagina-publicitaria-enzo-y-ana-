import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Lock, FileText, Printer, ArrowLeft, Palette, Sparkles, KeyRound, UserCheck, ShieldAlert, LogOut } from 'lucide-react';
import { FlyerEditor } from './FlyerEditor';
import { PremiumFlyerCard } from './PremiumFlyerCard';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';

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
  onOpenProposalModal
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const validUsers = ['admin', 'enzo_anahi', 'anahi_enzo'];
    const validPassword = 'rio4cuarto2026';

    if (validUsers.includes(username.trim().toLowerCase()) && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      setLoginError('Usuario o contraseña incorrectos. Verifique sus credenciales.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername('');
    setPassword('');
  };

  // Render Login Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#240A15]/95 border-2 border-rose-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-300 p-0.5 mx-auto shadow-xl">
            <div className="w-full h-full bg-[#18040B] rounded-[14px] flex items-center justify-center">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Acceso Administrativo
            </h2>
            <p className="text-xs text-rose-200/70">
              Ingrese su usuario y contraseña para administrar los anuncios y generador de PDF.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-black uppercase text-rose-200/80 mb-1">
                Usuario Administrativo:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Ej: admin"
                  required
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 pl-10 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 font-semibold min-h-[44px]"
                />
                <UserCheck className="w-4 h-4 text-rose-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-rose-200/80 mb-1">
                Contraseña:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 pl-10 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 font-semibold min-h-[44px]"
                />
                <KeyRound className="w-4 h-4 text-rose-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-bold flex items-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-rose-950/60 border border-rose-400/50 transition cursor-pointer min-h-[48px]"
            >
              Iniciar Sesión Admin
            </button>
          </form>

          <p className="text-[11px] text-rose-200/50">
            Tu Sitio Web Río Cuarto (Anahí Gilardi & Enzo Girardi)
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6"
    >
      {/* Header Banner */}
      <div className="bg-[#240916] border border-rose-900/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Panel de Administración Autenticado</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Generador de Flyers & Anuncios Publicitarios
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/70 font-medium">
            Personalizá los anuncios de Tu Sitio Web Río Cuarto (Anahí Gilardi & Enzo Girardi).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenProposalModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg border border-emerald-400/40"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Generar Propuesta PDF</span>
          </button>

          <button
            onClick={onOpenPdfCatalog}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-rose-200 hover:text-white font-black text-xs uppercase tracking-wider border border-rose-700/50"
          >
            <Printer className="w-4 h-4 text-rose-300" />
            <span>Ver Catálogo PDF</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-rose-300 font-black text-xs uppercase tracking-wider border border-rose-900/40"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Main Admin Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor Options (Left) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Format & Theme Controls */}
          <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-rose-900/30 pb-3">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Estilo & Formato de Publicidad</span>
              </span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-rose-200/80 mb-1.5">Formato de Imagen:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'story', label: 'Story 9:16' },
                    { id: 'post', label: 'Post 1:1' },
                    { id: 'banner', label: 'Banner 16:9' },
                    { id: 'card', label: 'Tarjeta' }
                  ].map(fmt => (
                    <button
                      key={fmt.id}
                      onClick={() => setFormat(fmt.id as FlyerFormat)}
                      className={`py-2 px-2 rounded-xl font-bold border transition ${
                        format === fmt.id
                          ? 'bg-rose-900 text-white border-rose-500'
                          : 'bg-[#18040B] text-rose-300/60 border-rose-900/30 hover:text-white'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-rose-200/80 mb-1.5">Tema de Color Neón:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'ruby', label: 'Bordó Rubí' },
                    { id: 'neon', label: 'Tecno Neón' },
                    { id: 'emerald', label: 'Esmeralda' },
                    { id: 'corporate', label: 'Corporativo' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as FlyerTheme)}
                      className={`py-2 px-2 rounded-xl font-bold border transition ${
                        theme === t.id
                          ? 'bg-rose-900 text-white border-rose-500'
                          : 'bg-[#18040B] text-rose-300/60 border-rose-900/30 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <FlyerEditor 
            flyerData={flyerData} 
            onChange={setFlyerData}
            onSave={onSaveConfig} 
          />
        </div>

        {/* Live Premium Flyer Preview (Right) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-rose-900/30 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Vista Previa del Anuncio
              </h3>
              <button
                onClick={onPreviewFlyer}
                className="flex items-center space-x-1.5 text-xs font-bold text-rose-300 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ir al Sitio Público</span>
              </button>
            </div>

            <div className="flex justify-center p-2 bg-black/40 rounded-2xl border border-rose-900/30">
              <PremiumFlyerCard 
                flyerData={flyerData} 
                theme={theme}
                format={format}
              />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
