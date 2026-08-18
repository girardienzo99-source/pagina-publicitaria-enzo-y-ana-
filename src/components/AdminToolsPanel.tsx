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
  RefreshCw,
  Building
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
      <div className="min-h-[70vh] flex items-center justify-center p-4 font-montserrat text-[#1e1b1b]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white border border-stone-300 rounded-3xl p-8 shadow-2xl space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#4a5d4a]/15 border border-[#4a5d4a]/30 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-[#4a5d4a]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-bold text-[#1e1b1b]">
              Acceso Administrativo
            </h2>
            <p className="text-xs text-stone-600">
              Ingrese su usuario y contraseña para administrar los presupuestos y generador de PDF.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1e1b1b]/80 mb-1">
                Usuario Administrativo:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Ej: admin"
                  required
                  className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 pl-10 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] font-semibold min-h-[44px]"
                />
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1e1b1b]/80 mb-1">
                Contraseña de Acceso:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm p-3 pl-10 text-sm text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] font-semibold min-h-[44px]"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-sm text-red-700 text-xs font-bold flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition transform active:scale-95 cursor-pointer"
            >
              Ingresar al Panel
            </button>
          </form>

          <p className="text-[11px] text-stone-400 font-mono">
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
      className="space-y-8 font-montserrat text-[#1e1b1b]"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#4a5d4a]/15 border border-[#4a5d4a]/30 flex items-center justify-center text-[#4a5d4a] shadow-sm">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-editorial text-2xl font-bold text-[#1e1b1b]">
                Panel de Administración Privado
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4a5d4a]/15 text-[#4a5d4a] border border-[#4a5d4a]/30 font-bold text-[10px] uppercase flex items-center space-x-1">
                <UserCheck className="w-3 h-3" />
                <span>Sesión Activa</span>
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Gestión de Anuncios Publicitarios, CRM de Presupuestos & Generación de PDF
            </p>
          </div>
        </div>

        {/* Action Buttons & Subtabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveAdminSubtab('editor')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeAdminSubtab === 'editor'
                ? 'bg-[#4a5d4a] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Editor Anuncio</span>
          </button>

          <button
            onClick={() => setActiveAdminSubtab('leads')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              activeAdminSubtab === 'leads'
                ? 'bg-[#4a5d4a] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>CRM Leads ({leads.length})</span>
          </button>

          <button
            onClick={onOpenProposalModal}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Crear Propuesta PDF</span>
          </button>

          <button
            onClick={onOpenPdfCatalog}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-white hover:bg-stone-50 text-[#1e1b1b] font-bold text-xs uppercase tracking-wider border border-stone-300 shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Ver Catálogo PDF</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider border border-stone-300 cursor-pointer"
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
            <div className="bg-white border border-stone-300 rounded-3xl p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="text-xs font-bold uppercase text-[#4a5d4a] tracking-wider flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Estilo & Formato de Publicidad</span>
                </span>
                <Sparkles className="w-4 h-4 text-[#4a5d4a]" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#1e1b1b]/80 mb-1.5">Formato de Imagen:</label>
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
                        className={`py-2 px-2 rounded-sm font-bold border transition cursor-pointer ${
                          format === fmt.id
                            ? 'bg-[#4a5d4a] text-white border-[#4a5d4a]'
                            : 'bg-[#fcf9f8] text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1e1b1b]/80 mb-1.5">Tema de Color:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'modern-vintage', label: 'Vintage Claro' },
                      { id: 'ruby', label: 'Bordó Rubí' },
                      { id: 'emerald', label: 'Esmeralda' },
                      { id: 'corporate', label: 'Corporativo' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as FlyerTheme)}
                        className={`py-2 px-2 rounded-sm font-bold border transition cursor-pointer ${
                          theme === t.id
                            ? 'bg-[#4a5d4a] text-white border-[#4a5d4a]'
                            : 'bg-[#fcf9f8] text-stone-700 border-stone-300 hover:bg-stone-100'
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

          {/* Live Flyer Preview (Right) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-stone-300 rounded-3xl p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-sm font-bold text-[#1e1b1b] uppercase tracking-wider">
                  Vista Previa del Anuncio
                </h3>
                <button
                  onClick={onPreviewFlyer}
                  className="flex items-center space-x-1.5 text-xs font-bold text-[#4a5d4a] hover:underline transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ir al Inicio</span>
                </button>
              </div>

              <div className="flex justify-center p-4 bg-[#fcf9f8] rounded-2xl border border-stone-200">
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
        <div className="bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#1e1b1b] flex items-center space-x-2">
                <Users className="w-6 h-6 text-[#4a5d4a]" />
                <span>Historial de Presupuestos & Consultas Recibidas</span>
              </h3>
              <p className="text-xs text-stone-600">
                Presupuestos solicitados desde el cotizador interactivo y el generador de PDF
              </p>
            </div>

            <button
              onClick={fetchLeads}
              disabled={isLoadingLeads}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-white hover:bg-stone-50 text-[#1e1b1b] text-xs font-bold border border-stone-300 transition cursor-pointer"
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
              className="w-full bg-[#fcf9f8] border border-stone-300 rounded-sm px-4 py-2.5 text-xs text-[#1e1b1b] placeholder-stone-400 focus:outline-none focus:border-[#4a5d4a] min-h-[44px]"
            />
          </div>

          {!isSupabaseConfigured && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold">
              ⚠️ Supabase no está configurado localmente con claves API activas. Las consultas de prueba se registran al generar propuestas o cotizar.
            </div>
          )}

          {isLoadingLeads ? (
            <div className="py-12 text-center text-[#4a5d4a] font-bold text-xs space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#4a5d4a]" />
              <p>Cargando leads recibidos desde la base de datos...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-semibold text-xs space-y-2 border border-dashed border-stone-300 rounded-2xl p-6">
              <Users className="w-8 h-8 text-stone-400 mx-auto" />
              <p>No se encontraron presupuestos que coincidan con "{leadSearchTerm}".</p>
              <p className="text-[11px] text-stone-400">Cuando los clientes completen el cotizador o generen una propuesta PDF, aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.map((lead, idx) => (
                <div 
                  key={lead.id || idx}
                  className="bg-[#fcf9f8] border border-stone-200 rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#4a5d4a] transition"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-bold text-[#1e1b1b] uppercase flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-[#4a5d4a]" />
                      <span>{lead.client_business || 'Negocio / Cliente'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200 font-mono text-[10px]">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('es-AR') : 'Reciente'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#1e1b1b]/80">
                    <div><strong className="text-stone-600">Contacto:</strong> {lead.client_contact || 'Cliente'}</div>
                    <div><strong className="text-stone-600">Rubro:</strong> {lead.industry || 'Comercial'}</div>
                    <div><strong className="text-stone-600">Detalle:</strong> {lead.notes || 'Consulta de presupuesto'}</div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[10px] text-[#4a5d4a] font-bold uppercase">
                      Entrega: ~{lead.timeline || lead.estimated_days || 7} días
                    </span>
                    <a
                      href={`https://wa.me/5493584860640?text=${encodeURIComponent(`Hola! Vi tu presupuesto para ${lead.client_business || 'tu negocio'} en Río Cuarto Web y quisiera responder a tu consulta.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-sm bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1 transition shadow-sm"
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
