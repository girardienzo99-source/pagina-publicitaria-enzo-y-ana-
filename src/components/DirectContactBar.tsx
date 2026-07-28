import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { getWhatsAppUrl, OFFICIAL_PHONE_FORMATTED } from '../lib/whatsapp';

interface DirectContactBarProps {
  phone: string;
  phoneFormatted: string;
  email: string;
}

export const DirectContactBar: React.FC<DirectContactBarProps> = ({
  email
}) => {
  const whatsappUrl = getWhatsAppUrl('Hola Anahí y Enzo! Vi su web de Tu Sitio Web Río Cuarto y quisiera consultar por un proyecto para mi negocio.');

  return (
    <aside 
      aria-label="Barra de contacto directo"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-30 max-w-xl w-[92%] md:w-auto bg-[#240A15]/95 backdrop-blur-xl border border-rose-900/50 py-2.5 px-4 sm:px-5 rounded-2xl shadow-2xl glow-burgundy"
    >
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        <div className="flex items-center space-x-2 text-rose-100">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse shrink-0" />
          <div className="leading-tight">
            <span className="font-extrabold text-white text-xs sm:text-sm block">Tu Sitio Web Río Cuarto</span>
            <span className="text-[11px] text-rose-300/80 font-medium hidden sm:block">Anahí & Enzo Gilardi</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${email}`}
            className="hidden md:flex items-center space-x-1.5 px-3 min-h-[44px] rounded-xl bg-[#1A050D] hover:bg-[#330A1B] text-rose-200 border border-rose-900/40 transition text-xs font-bold"
            title={email}
          >
            <Mail className="w-4 h-4 text-rose-300" />
            <span>Email</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center space-x-2 px-4 min-h-[44px] rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 border border-emerald-300/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-800 shrink-0" />
            <span className="tracking-wide uppercase font-black">WhatsApp ({OFFICIAL_PHONE_FORMATTED})</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
