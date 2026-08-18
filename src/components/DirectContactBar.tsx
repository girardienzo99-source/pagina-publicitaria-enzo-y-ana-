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
  const whatsappUrl = getWhatsAppUrl('Hola Anahí y Enzo! Vi la web de Río Cuarto Web y quisiera consultar por un proyecto para mi negocio.');

  return (
    <aside 
      aria-label="Barra de contacto directo"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-30 max-w-xl w-[92%] md:w-auto bg-white/95 backdrop-blur-xl border border-stone-300/80 py-2.5 px-4 sm:px-5 rounded-2xl shadow-2xl font-montserrat"
    >
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        <div className="flex items-center space-x-2 text-[#1e1b1b]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4a5d4a] animate-pulse shrink-0" />
          <div className="leading-tight">
            <span className="font-black text-[#1e1b1b] text-xs sm:text-sm uppercase tracking-tight block">Río Cuarto <span className="text-[#4a5d4a]">Web</span></span>
            <span className="text-[11px] text-[#4a5d4a] font-bold uppercase hidden sm:block">Diseño Digital a Medida • Anahí & Enzo</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${email}`}
            className="hidden md:flex items-center space-x-1.5 px-3 min-h-[44px] rounded-xl bg-stone-100 hover:bg-stone-200 text-[#1e1b1b] border border-stone-300 transition text-xs font-bold"
            title={email}
          >
            <Mail className="w-4 h-4 text-[#4a5d4a]" />
            <span>Email</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center space-x-2 px-4 min-h-[44px] rounded-xl bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#4a5d4a] shrink-0" />
            <span className="tracking-wide uppercase font-black">WhatsApp ({OFFICIAL_PHONE_FORMATTED})</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
