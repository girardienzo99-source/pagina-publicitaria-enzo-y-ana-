import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Lock, 
  FileText, 
  Printer, 
  ArrowLeft, 
  Palette, 
  Sparkles, 
  KeyRound, 
  UserCheck, 
  ShieldAlert, 
  LogOut,
  Users,
  MessageSquare,
  Clock,
  RefreshCw,
  Building,
  DollarSign
} from 'lucide-react';
import { FlyerEditor } from './FlyerEditor';
import { PremiumFlyerCard } from './PremiumFlyerCard';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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
  const [activeAdminSubtab, setActiveAdminSubtab] = useState<'editor' | 'leads'>('editor');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [leadSearchTerm, setLeadSearchTerm] = useState<string>('');

  const filteredLeads = leads.filter(l => {
    if (!leadSearchTerm.trim()) return true;
    const term = leadSearchTerm.toLowerCase();
    const searchCorpus = `${l.client_business || ''} ${l.client_contact || ''} ${l.industry || ''} ${l.notes || ''}`.toLowerCase();
    return searchCorpus.includes(term);
  });

  const fetchLeads = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setIsLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setLeads(data);
      }
    } catch (err) {
      console.error('Error cargando leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeAdminSubtab === 'leads') {
      fetchLeads();
    }
  }, [isAuthenticated, activeAdminSubtab]);

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
                <KeyRound className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-rose-200/80 mb-1">
                Contraseña de Acceso:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#14040A] border border-rose-900/40 rounded-xl p-3 pl-10 text-sm text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 font-semibold min-h-[44px]"
                />
                <Lock className="w-4 h-4 text-rose-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs font-bold flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm rounded-xl uppercase tracking-wider shadow-lg shadow-rose-950/50 transition transform active:scale-95"
            >
              Ingresar al Panel
            </button>
          </form>

          <p className="text-[11px] text-rose-300/40 font-mono">
            Río Cuarto Web • Acceso Privado Co-Fundadores
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-300 p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#18040B] rounded-[14px] flex items-center justify-center">
              <Settings className="w-6 h-6 text-amber-300 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Panel de Administración Privado
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-black text-[10px] uppercase flex items-center space-x-1">
                <UserCheck className="w-3 h-3" />
                <span>Sesión Activa</span>
              </span>
            </div>
            <p className="text-xs text-rose-200/70">
              Gestión de Anuncios Publicitarios, CRM de Presupuestos & Generación de PDF
            </p>
          </div>
        </div>

        {/* Action Buttons & Subtabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveAdminSubtab('editor')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition ${
              activeAdminSubtab === 'editor'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-[#18040B] text-rose-300 border border-rose-900/40 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Editor Anuncio</span>
          </button>

          <button
            onClick={() => setActiveAdminSubtab('leads')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition ${
              activeAdminSubtab === 'leads'
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-[#18040B] text-rose-300 border border-rose-900/40 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>CRM Leads & Consultas ({leads.length})</span>
          </button>

          <button
            onClick={onOpenProposalModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-950/50"
          >
            <FileText className="w-4 h-4" />
            <span>Crear Propuesta PDF</span>
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

      {/* SUBTAB 1: EDITOR DE ANUNCIOS */}
      {activeAdminSubtab === 'editor' && (
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
      )}

      {/* SUBTAB 2: CRM LEADS & PRESUPUESTOS */}
      {activeAdminSubtab === 'leads' && (
        <div className="bg-[#240A15]/90 border border-rose-900/40 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-rose-900/30 pb-4">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Historial de Presupuestos & Consultas Recibidas</span>
              </h3>
              <p className="text-xs text-rose-200/70">
                Presupuestos solicitados desde el cotizador interactivo y el generador de PDF
              </p>
            </div>

            <button
              onClick={fetchLeads}
              disabled={isLoadingLeads}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#18040B] hover:bg-rose-900/60 text-rose-200 text-xs font-bold border border-rose-900/40 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
              <span>Actualizar Listado</span>
            </button>
          </div>

          {/* Quick Search Bar for CRM */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filtrar presupuestos por nombre de comercio, contacto o rubro..."
              value={leadSearchTerm}
              onChange={(e) => setLeadSearchTerm(e.target.value)}
              className="w-full bg-[#18040B] border border-rose-900/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-rose-300/40 focus:outline-none focus:border-rose-400 min-h-[44px]"
            />
          </div>

          {!isSupabaseConfigured && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-semibold">
              ⚠️ Supabase no está configurado localmente con claves API activas. Las consultas de prueba se registran al generar propuestas o cotizar.
            </div>
          )}

          {isLoadingLeads ? (
            <div className="py-12 text-center text-rose-300 font-bold text-xs space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-400" />
              <p>Cargando leads recibidos desde la base de datos...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-rose-300/60 font-semibold text-xs space-y-2 border border-dashed border-rose-900/40 rounded-2xl p-6">
              <Users className="w-8 h-8 text-rose-500/40 mx-auto" />
              <p>No se encontraron presupuestos que coincidan con "{leadSearchTerm}".</p>
              <p className="text-[11px] text-rose-400/50">Cuando los clientes completen el cotizador o generen una propuesta PDF, aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.map((lead, idx) => (
                <div 
                  key={lead.id || idx}
                  className="bg-[#18040B] border border-rose-900/40 rounded-2xl p-4 space-y-3 shadow-lg hover:border-rose-700/60 transition"
                >
                  <div className="flex items-center justify-between border-b border-rose-900/30 pb-2">
                    <span className="text-xs font-black text-amber-300 uppercase flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{lead.client_business || 'Negocio / Cliente'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px]">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-AR') : 'Reciente'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-rose-100">
                    <div><strong className="text-rose-300/70">Contacto:</strong> {lead.client_contact || 'Cliente'}</div>
                    <div><strong className="text-rose-300/70">Rubro:</strong> {lead.industry || 'Comercial'}</div>
                    <div><strong className="text-rose-300/70">Detalle:</strong> {lead.notes || 'Consulta de presupuesto'}</div>
                  </div>

                  <div className="pt-2 border-t border-rose-900/30 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-black uppercase">
                      Entrega: ~{lead.timeline || lead.estimated_days || 7} días
                    </span>
                    <a
                      href={`https://wa.me/5493584860640?text=${encodeURIComponent(`Hola! Vi tu presupuesto para ${lead.client_business || 'tu negocio'} en Río Cuarto Web y quisiera responder a tu consulta.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider flex items-center space-x-1 transition shadow-md"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Abrir WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </motion.div>
  );
};
