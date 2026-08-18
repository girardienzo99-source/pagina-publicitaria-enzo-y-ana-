import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Monitor, 
  Award, 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  Zap, 
  ExternalLink,
  Code2,
  FileCheck,
  Utensils,
  ShoppingBag,
  Wrench,
  Calendar
} from 'lucide-react';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface PremiumFlyerCardProps {
  flyerData: FlyerData;
  theme?: FlyerTheme;
  format?: FlyerFormat;
  onNavigateToPortfolio?: () => void;
  onNavigateToCalculator?: () => void;
}

export const PremiumFlyerCard: React.FC<PremiumFlyerCardProps> = ({
  flyerData,
  theme = 'ruby-red',
  format = 'horizontal-banner',
  onNavigateToPortfolio
}) => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = getWhatsAppUrl(flyerData.whatsappMessage);

  // Theme configuration
  const getThemeStyles = () => {
    switch (theme) {
      case 'ruby-red':
        return {
          containerBg: 'from-[#1C050E] via-[#2B0918] to-[#14040A]',
          border: 'border-rose-700/60 shadow-rose-950/80',
          accentText: 'text-rose-300',
          badgeBg: 'bg-rose-950/90 text-rose-200 border-rose-600/50',
          cardBg: 'bg-[#18040B]/90 border-rose-900/40',
          hookBg: 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 text-white',
          highlight: 'text-amber-300',
          iconColor: 'text-rose-400'
        };
      case 'neon-tech':
        return {
          containerBg: 'from-[#05141C] via-[#09222B] to-[#040E14]',
          border: 'border-cyan-600/60 shadow-cyan-950/80',
          accentText: 'text-cyan-300',
          badgeBg: 'bg-cyan-950/90 text-cyan-200 border-cyan-500/50',
          cardBg: 'bg-[#040E14]/90 border-cyan-900/40',
          hookBg: 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950',
          highlight: 'text-cyan-300',
          iconColor: 'text-cyan-400'
        };
      case 'modern-emerald':
        return {
          containerBg: 'from-[#051C14] via-[#092B1F] to-[#04140E]',
          border: 'border-emerald-600/60 shadow-emerald-950/80',
          accentText: 'text-emerald-300',
          badgeBg: 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50',
          cardBg: 'bg-[#04140E]/90 border-emerald-900/40',
          hookBg: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950',
          highlight: 'text-emerald-300',
          iconColor: 'text-emerald-400'
        };
      case 'clean-corporate':
        return {
          containerBg: 'from-slate-900 via-slate-950 to-slate-900',
          border: 'border-slate-700/60 shadow-slate-950/80',
          accentText: 'text-amber-400',
          badgeBg: 'bg-slate-800 text-slate-100 border-slate-600',
          cardBg: 'bg-slate-950/90 border-slate-800',
          hookBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950',
          highlight: 'text-amber-400',
          iconColor: 'text-amber-400'
        };
      case 'modern-vintage':
      default:
        return {
          containerBg: 'from-stone-50 via-white to-stone-50',
          border: 'border-stone-300 shadow-xl',
          accentText: 'text-[#4a5d4a]',
          badgeBg: 'bg-[#4a5d4a]/10 text-[#4a5d4a] border-[#4a5d4a]/20',
          cardBg: 'bg-[#fcf9f8] border-stone-200 text-[#1e1b1b]',
          hookBg: 'bg-[#4a5d4a] text-white',
          highlight: 'text-[#4a5d4a]',
          iconColor: 'text-[#4a5d4a]'
        };
    }
  };

  const styles = getThemeStyles();

  // Aspect ratio class mapping
  const getFormatClasses = () => {
    switch (format) {
      case 'poster-story':
        return 'max-w-md w-full aspect-[9/16] min-h-[740px]';
      case 'square-post':
        return 'max-w-xl w-full aspect-square min-h-[580px]';
      case 'horizontal-banner':
        return 'max-w-4xl w-full min-h-[440px]';
      case 'business-card':
        return 'max-w-lg w-full aspect-[1.75/1] min-h-[320px]';
      default:
        return 'max-w-4xl w-full min-h-[440px]';
    }
  };

  return (
    <div className="flex justify-center items-center py-2 print:p-0 print:m-0">
      <motion.div
        ref={flyerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`printable-flyer relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 transition-all duration-300 shadow-2xl bg-gradient-to-br ${styles.containerBg} ${styles.border} ${getFormatClasses()}`}
      >
        {/* Glow Accents */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-md ${styles.badgeBg}`}>
              SOFTWARE A MEDIDA
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-rose-200/70 tracking-wider uppercase bg-[#18040B]/80 px-3 py-1 rounded-lg border border-rose-900/40">
            {flyerData.location}
          </span>
        </div>

        {/* Hook Headline */}
        {flyerData.hookTitle && (
          <div className={`mb-4 p-3 rounded-2xl font-black text-center text-xs sm:text-sm tracking-wide uppercase shadow-lg border border-white/20 ${styles.hookBg}`}>
            🚀 {flyerData.hookTitle}
          </div>
        )}

        {/* Brand Identity Block */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md bg-black/60 border border-rose-800/40 text-xs font-bold text-rose-200">
              👨‍💻 {flyerData.role}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
            <span className="block text-white drop-shadow-md">{flyerData.developerName}</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-bold leading-snug p-3 rounded-xl bg-black/50 border border-rose-900/30 text-rose-100/90">
            "{flyerData.slogan}"
          </p>
        </div>

        {/* Promo Badge */}
        {flyerData.promoBadge && (
          <div className="my-4 p-3 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-slate-950 font-black text-center text-xs sm:text-sm tracking-wide uppercase shadow-xl shadow-rose-950/60 transform -rotate-1 border border-amber-300">
            ⚡ {flyerData.promoBadge} ⚡
          </div>
        )}

        {/* Services & Real Work Showcase */}
        <div className="space-y-4 my-5">
          
          {/* Main Services List */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${styles.cardBg}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 mb-3 flex items-center space-x-2">
              <Layers className={`w-4 h-4 ${styles.iconColor}`} />
              <span>Programas & Sistemas Que Desarrollamos:</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
              {flyerData.mainServices.map((service, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-black/40 p-2 rounded-lg border border-rose-900/30">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${styles.iconColor}`} />
                  <span className="leading-tight text-white">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Work Highlights */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${styles.cardBg}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-rose-400" />
                <span>Trabajos Realizados & Programas Creados:</span>
              </h3>
              {onNavigateToPortfolio && (
                <button
                  onClick={onNavigateToPortfolio}
                  className="text-xs font-bold text-rose-300 hover:text-white flex items-center space-x-1 transition"
                >
                  <span>Ver todos</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-black/50 border border-rose-900/40 p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-black text-white">
                  <span>EL PATRÓN RESTO</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300">POS</span>
                </div>
                <p className="text-[11px] text-rose-200/60 line-clamp-2">
                  Comandas en mesas, mozos en turno, cocina e impresión de tickets.
                </p>
              </div>

              <div className="bg-black/50 border border-rose-900/40 p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-black text-white">
                  <span>BLESSED CLOTHING</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300">STOCK</span>
                </div>
                <p className="text-[11px] text-rose-200/60 line-clamp-2">
                  Control de talles, colores, ventas rápidas y código de barras.
                </p>
              </div>

              <div className="bg-black/50 border border-rose-900/40 p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-black text-white">
                  <span>AUTOFIX TALLER</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300">ARCA</span>
                </div>
                <p className="text-[11px] text-rose-200/60 line-clamp-2">
                  Órdenes de trabajo, facturación ARCA automática y repuestos.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${styles.cardBg}`}>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-300 mb-3 flex items-center space-x-2">
              <Award className={`w-4 h-4 ${styles.iconColor}`} />
              <span>¿Por qué elegir Río Cuarto Web?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {flyerData.keyBenefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-center space-x-2 bg-black/40 p-2 rounded-lg text-rose-100">
                  <Zap className={`w-3.5 h-3.5 shrink-0 ${styles.iconColor}`} />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Guarantee Banner */}
        {flyerData.guaranteeText && (
          <div className="my-4 p-3 rounded-xl bg-black/60 border border-amber-500/30 flex items-center justify-center space-x-2 text-center">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-amber-300 tracking-wide">
              {flyerData.guaranteeText}
            </span>
          </div>
        )}

        {/* Footer Contact Block + Live QR Code */}
        <div className="mt-6 pt-5 border-t border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Atención WhatsApp Directa:</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-black text-white hover:text-emerald-400 transition block tracking-tight font-mono"
            >
              {OFFICIAL_PHONE_FORMATTED}
            </a>
            <a
              href={`mailto:${flyerData.email}`}
              className="text-xs text-rose-200/70 hover:underline flex items-center justify-center sm:justify-start space-x-1"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>{flyerData.email}</span>
            </a>
          </div>

          {/* Live High-Res QR Code */}
          <div className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-2xl text-slate-950 border-2 border-rose-600 shrink-0 transform hover:scale-105 transition">
            <QRCodeSVG
              value={whatsappUrl}
              size={105}
              level="H"
              includeMargin={false}
            />
            <span className="text-[10px] font-black text-slate-900 mt-1.5 uppercase tracking-tight flex items-center space-x-1">
              <Smartphone className="w-3 h-3 text-rose-600" />
              <span>ESCANEÁ PARA HABLAR</span>
            </span>
          </div>

        </div>

        {/* Bottom Sign-off */}
        <div className="mt-6 text-center text-[11px] text-rose-200/50 font-medium">
          Río Cuarto Web — Diseño Digital a Medida • Anahí Gilardi & Enzo Girardi (Programadores) • {flyerData.email}
        </div>

      </motion.div>
    </div>
  );
};
