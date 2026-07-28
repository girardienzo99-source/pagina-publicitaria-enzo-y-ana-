import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Phone, 
  Mail, 
  CheckCircle2, 
  Printer, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Monitor, 
  Store, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Award,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';

interface FlyerPreviewProps {
  flyerData: FlyerData;
  theme: FlyerTheme;
  setTheme: (theme: FlyerTheme) => void;
  format: FlyerFormat;
  setFormat: (format: FlyerFormat) => void;
  onNavigateToPortfolio: () => void;
  onNavigateToCalculator: () => void;
  onOpenPdfCatalog?: () => void;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({
  flyerData,
  theme,
  setTheme,
  format,
  setFormat,
  onNavigateToPortfolio,
  onNavigateToCalculator,
  onOpenPdfCatalog
}) => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const whatsappDirectLink = `https://wa.me/549${flyerData.phone}?text=${encodeURIComponent(flyerData.whatsappMessage)}`;

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleCopyText = () => {
    const textToCopy = `🚀 *${flyerData.developerName} - ${flyerData.role}* 🚀
${flyerData.slogan}

💡 *SERVICIOS DESTACADOS:*
${flyerData.mainServices.map(s => `• ${s}`).join('\n')}

✨ *¿POR QUÉ ELEGIRME?*
${flyerData.keyBenefits.map(b => `✓ ${b}`).join('\n')}

🔥 *PROMO ESPECIAL:* ${flyerData.promoBadge}

📞 *Contacto Directo:*
• WhatsApp: ${flyerData.phoneFormatted}
• Email: ${flyerData.email}
• Ubicación: ${flyerData.location}

Escribime directamente por WhatsApp: ${whatsappDirectLink}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Dynamic Theme Classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'ruby-red':
      default:
        return {
          bg: 'bg-[#1A050D] text-slate-100 border-rose-800/40 shadow-2xl shadow-rose-950/60',
          gradientBg: 'from-[#1C050E] via-[#330A1B] to-[#120308]',
          accent: 'text-rose-300',
          badgeBg: 'bg-rose-900/40 text-rose-200 border-rose-500/30',
          cardBg: 'bg-[#270A18]/80 border-rose-900/30 shadow-xl backdrop-blur-md',
          buttonPrimary: 'bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900 text-white font-extrabold hover:from-rose-700 hover:to-rose-800 shadow-lg shadow-rose-950/70 border border-rose-400/30',
          qrBorder: 'border-rose-400',
          highlightText: 'text-rose-200',
          hookBg: 'bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950 text-rose-100 border border-rose-500/30',
          iconColor: 'text-rose-300'
        };
      case 'red-light':
        return {
          bg: 'bg-stone-50 text-slate-900 border-red-500/50 shadow-2xl shadow-red-950/10',
          gradientBg: 'from-stone-50 via-rose-50/40 to-red-100/30',
          accent: 'text-red-600',
          badgeBg: 'bg-red-600 text-white font-black border-red-600',
          cardBg: 'bg-white border-slate-200/90 shadow-md',
          buttonPrimary: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white hover:from-red-500 hover:to-rose-500 font-extrabold shadow-lg shadow-red-600/30',
          qrBorder: 'border-red-600',
          highlightText: 'text-red-700',
          hookBg: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md',
          iconColor: 'text-red-600'
        };
      case 'red-gold':
        return {
          bg: 'bg-stone-950 text-stone-100 border-amber-500/50 shadow-amber-950/40',
          gradientBg: 'from-stone-950 via-red-950/50 to-amber-950/40',
          accent: 'text-amber-400',
          badgeBg: 'bg-gradient-to-r from-red-600/30 to-amber-500/30 text-amber-300 border-amber-500/40',
          cardBg: 'bg-stone-900/95 border-stone-800 shadow-xl',
          buttonPrimary: 'bg-gradient-to-r from-red-600 to-amber-500 text-stone-950 font-extrabold hover:from-red-500 hover:to-amber-400 shadow-lg shadow-amber-500/20',
          qrBorder: 'border-amber-400',
          highlightText: 'text-amber-300',
          hookBg: 'bg-gradient-to-r from-red-700 via-amber-600 to-red-700 text-white',
          iconColor: 'text-amber-400'
        };
      case 'dark-gold':
        return {
          bg: 'bg-slate-950 text-slate-100 border-amber-500/30',
          gradientBg: 'from-slate-950 via-zinc-900 to-amber-950/40',
          accent: 'text-amber-400',
          badgeBg: 'bg-amber-400/10 text-amber-300 border-amber-500/30',
          cardBg: 'bg-slate-900/90 border-slate-800',
          buttonPrimary: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 font-extrabold',
          qrBorder: 'border-amber-400',
          highlightText: 'text-amber-300',
          hookBg: 'bg-amber-500 text-slate-950',
          iconColor: 'text-amber-400'
        };
      case 'neon-tech':
        return {
          bg: 'bg-zinc-950 text-zinc-100 border-cyan-500/40',
          gradientBg: 'from-zinc-950 via-slate-950 to-cyan-950/40',
          accent: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          cardBg: 'bg-zinc-900/90 border-zinc-800',
          buttonPrimary: 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 font-extrabold',
          qrBorder: 'border-cyan-400',
          highlightText: 'text-cyan-300',
          hookBg: 'bg-cyan-500 text-slate-950',
          iconColor: 'text-cyan-400'
        };
      case 'clean-corporate':
        return {
          bg: 'bg-white text-slate-900 border-slate-300 shadow-xl',
          gradientBg: 'from-slate-50 via-red-50/20 to-slate-100',
          accent: 'text-red-700',
          badgeBg: 'bg-red-100 text-red-800 border-red-300',
          cardBg: 'bg-white/95 border-slate-200 shadow-md',
          buttonPrimary: 'bg-red-600 text-white hover:bg-red-700 font-extrabold shadow-md',
          qrBorder: 'border-red-600',
          highlightText: 'text-red-700',
          hookBg: 'bg-slate-900 text-white',
          iconColor: 'text-red-600'
        };
      case 'gastronomy-warm':
        return {
          bg: 'bg-stone-950 text-stone-100 border-amber-600/40',
          gradientBg: 'from-stone-950 via-amber-950/60 to-orange-950/50',
          accent: 'text-amber-500',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          cardBg: 'bg-stone-900/90 border-stone-800',
          buttonPrimary: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500 font-extrabold',
          qrBorder: 'border-amber-500',
          highlightText: 'text-amber-400',
          hookBg: 'bg-orange-600 text-white',
          iconColor: 'text-amber-500'
        };
      case 'modern-emerald':
        return {
          bg: 'bg-slate-950 text-slate-100 border-emerald-500/40',
          gradientBg: 'from-slate-950 via-emerald-950/30 to-teal-950/40',
          accent: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          cardBg: 'bg-slate-900/90 border-slate-800',
          buttonPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 font-extrabold',
          qrBorder: 'border-emerald-400',
          highlightText: 'text-emerald-300',
          hookBg: 'bg-emerald-500 text-slate-950',
          iconColor: 'text-emerald-400'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Format styles
  const getFormatContainerClass = () => {
    switch (format) {
      case 'poster-story':
        return 'max-w-md w-full aspect-[9/16] min-h-[720px]';
      case 'square-post':
        return 'max-w-xl w-full aspect-square min-h-[580px]';
      case 'horizontal-banner':
        return 'max-w-4xl w-full min-h-[420px]';
      case 'business-card':
        return 'max-w-lg w-full aspect-[1.75/1] min-h-[320px]';
      default:
        return 'max-w-md w-full aspect-[9/16] min-h-[720px]';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner & Control Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur shadow-xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Presentación Publicitaria Oficial
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-rose-200/80 mt-1 font-medium">
              Sitios web y sistemas creados a medida por <strong className="text-white font-extrabold">Tu Sitio Web Río Cuarto (Anahí Gilardi & Enzo Girardi)</strong>. Listo para consultar, descargar folleto o enviar por WhatsApp.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {onOpenPdfCatalog && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPdfCatalog}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-black rounded-xl border border-red-400 shadow-xl shadow-red-950/50 transition-all group"
                title="Abrir y descargar folleto PDF completo"
              >
                <Download className="w-4 h-4 text-amber-300 animate-bounce group-hover:text-white transition" />
                <span className="uppercase tracking-wider">DESCARGAR FOLLETO PDF</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 text-xs sm:text-sm font-bold rounded-xl border border-zinc-800 transition shadow-sm hover:border-zinc-700"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-4 h-4 text-red-400" />
              <span>Imprimir</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyText}
              className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 text-xs sm:text-sm font-bold rounded-xl border border-zinc-800 transition shadow-sm hover:border-zinc-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-xl shadow-emerald-950/50 border border-emerald-300/40 transition-all duration-300"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-0.5 rounded-full bg-white/40 animate-ping opacity-75" />
                <MessageCircle className="relative w-4 h-4 fill-white text-emerald-700" />
              </div>
              <span className="uppercase tracking-wide">Enviar WhatsApp</span>
            </motion.a>
          </div>
        </div>

        {/* Style Controls (Aspect Ratio Formats) */}
        <div className="mt-5 pt-4 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Formato de Publicación:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'poster-story', label: 'Historia / Estado (9:16)' },
                { id: 'square-post', label: 'Post Cuadrado (1:1)' },
                { id: 'horizontal-banner', label: 'Banner Horizontal' },
                { id: 'business-card', label: 'Tarjeta Digital' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFormat(item.id as FlyerFormat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition border ${
                    format === item.id 
                      ? 'bg-red-950/90 text-white border-red-500 ring-2 ring-red-500/40 shadow-md' 
                      : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FLYER DISPLAY STAGE */}
      <div className="flex justify-center items-center py-4 print:p-0 print:m-0">
        <motion.div
          ref={flyerRef}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className={`printable-flyer relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-2xl bg-gradient-to-br ${themeClasses.gradientBg} ${themeClasses.bg} ${getFormatContainerClass()}`}
        >
          
          {/* Subtle Decorative Background Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Flyer Header Badge & Location */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${themeClasses.badgeBg}`}>
                SOFTWARE A MEDIDA
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-300 tracking-wider uppercase bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
              {flyerData.location}
            </span>
          </div>

          {/* Attention Hook Headline (Marketing Methodology: ATTENTION) */}
          {flyerData.hookTitle && (
            <div className={`mb-4 p-2.5 sm:p-3 rounded-xl font-black text-center text-xs sm:text-sm tracking-wide uppercase shadow-md ${themeClasses.hookBg}`}>
              🚀 {flyerData.hookTitle}
            </div>
          )}

          {/* Developer Identity Block */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md bg-red-950/80 border border-red-500/40 text-xs font-bold text-red-300">
                👨‍💻 {flyerData.role}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
              <span className="block text-white drop-shadow-md">{flyerData.developerName}</span>
            </h2>

            <p className={`text-sm sm:text-base md:text-lg font-bold leading-snug p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100`}>
              "{flyerData.slogan}"
            </p>
          </div>

          {/* Promotional Banner Callout (Marketing Methodology: INTEREST & DESIRE) */}
          {flyerData.promoBadge && (
            <div className="my-4 p-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-center text-xs sm:text-sm tracking-wide uppercase shadow-xl shadow-red-900/50 transform -rotate-1 border border-red-400">
              ⚡ {flyerData.promoBadge} ⚡
            </div>
          )}

          {/* Services & Modules Section */}
          <div className="grid grid-cols-1 gap-3.5 my-5">
            <div className={`p-4 sm:p-5 rounded-2xl border ${themeClasses.cardBg}`}>
              <h3 className="text-xs font-black uppercase tracking-wider text-red-400 mb-3 flex items-center space-x-2">
                <Layers className={`w-4 h-4 ${themeClasses.iconColor}`} />
                <span>Programas & Sistemas Que Desarrollo:</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
                {flyerData.mainServices.map((service, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${themeClasses.iconColor}`} />
                    <span className="leading-tight text-white">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* REAL PROJECTS & PRODUCTS SHOWCASE (Requested by user) */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${themeClasses.cardBg}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-red-500" />
                  <span>Trabajos Realizados & Programas Creados:</span>
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToPortfolio}
                  className="text-[11px] font-black text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>Ver Todos Demo →</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    title: 'El Patrón - Gastronomía',
                    tag: 'Mesas & Comandas',
                    sub: 'Carta Vinos, Tragos, Carnes & Comanda Mozo',
                    url: 'restaurante-potro.vercel.app',
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    title: 'Colores Pizzería POS',
                    tag: 'Takeaway & Delivery',
                    sub: 'Pizzas Mitad y Mitad & Despacho Cocina',
                    url: 'restaurante-colores.vercel.app',
                    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    title: 'BLESSED - Tienda de Ropa',
                    tag: 'Control de Stock',
                    sub: 'Zapatillas & Ropa, Talles, Colores & Caja',
                    url: 'tiendadigitalropa-phi.vercel.app',
                    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    title: 'Consultorio & Salud',
                    tag: 'Historias Clínicas',
                    sub: 'Turnos, Diagnósticos & Fichas Médicas',
                    url: 'salud-historiaclinica.vercel.app',
                    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
                  },
                  {
                    title: 'SaaS ERP Multirrubro',
                    tag: '+14 Módulos',
                    sub: 'Ferreterías, Talleres, Supermercados & Gyms',
                    url: 'programa-saas.vercel.app',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={onNavigateToPortfolio}
                    className="rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/90 hover:border-red-500/50 transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative h-24 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold text-white bg-red-600/90 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <div className="p-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-white group-hover:text-red-400 transition">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-300 font-medium line-clamp-1">
                        {item.sub}
                      </p>
                      <div className="text-[9px] font-mono text-amber-400 font-bold pt-0.5">
                        {item.url}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${themeClasses.cardBg}`}>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>¿Por qué elegir Tu Sitio Web Río Cuarto?</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                {flyerData.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guarantee / Trust Badge */}
          {flyerData.guaranteeText && (
            <div className="my-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center text-xs font-bold text-amber-300 flex items-center justify-center space-x-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{flyerData.guaranteeText}</span>
            </div>
          )}

          {/* Footer Contact Block + Live QR Code (Marketing Methodology: ACTION) */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
            
            {/* Contact Details */}
            <div className="space-y-2.5 text-center sm:text-left w-full sm:w-auto">
              <div className="text-xs font-black uppercase text-red-400 tracking-wider flex items-center justify-center sm:justify-start space-x-1">
                <span>{flyerData.callToAction || '¡CONTACTAME AHORA!'}</span>
              </div>
              
              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start space-x-2.5 text-base sm:text-lg font-black text-white hover:text-red-400 transition"
              >
                <div className="p-2 rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30">
                  <MessageCircle className="w-5 h-5 fill-white text-red-600" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">WhatsApp Directo</span>
                  <span className="text-red-400">{flyerData.phoneFormatted}</span>
                </div>
              </a>

              <a
                href={`mailto:${flyerData.email}`}
                className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-bold text-slate-300 hover:text-white"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{flyerData.email}</span>
              </a>
            </div>

            {/* Live QR Code linked to WhatsApp */}
            <div className="flex flex-col items-center justify-center bg-white p-3 rounded-2xl shadow-2xl text-slate-950 border-2 border-red-600 shrink-0 transform hover:scale-105 transition">
              <QRCodeSVG
                value={whatsappDirectLink}
                size={100}
                level="H"
                includeMargin={false}
              />
              <span className="text-[10px] font-black text-slate-900 mt-1.5 uppercase tracking-tight flex items-center space-x-1">
                <Smartphone className="w-3 h-3 text-red-600" />
                <span>ESCANEÁ PARA HABLAR</span>
              </span>
            </div>

          </div>

          {/* Bottom Footer Bar */}
          <div className="mt-6 text-center text-[11px] text-rose-200/50 font-medium">
            Diseño Web & Sistemas 100% personalizados • Anahí Gilardi & Enzo Girardi (Programadores) • {flyerData.email}
          </div>

        </motion.div>
      </div>

      {/* CTA Section below flyer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-4"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          ¿Querés ver los programas que ya están funcionando en negocios reales?
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Explorá los demos interactivos de sistemas para Restaurantes (El Patrón, Pizzerías), Tiendas de Ropa (BLESSED) y ERP Multirrubro.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateToPortfolio}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition"
          >
            <Store className="w-5 h-5" />
            <span>Ver Portafolio de Programas</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateToCalculator}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Cotizar mi Programa a Medida</span>
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
};
