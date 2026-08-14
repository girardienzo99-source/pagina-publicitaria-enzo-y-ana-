import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, CheckCircle, MessageCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'proceso' | 'tecnico' | 'pagos' | 'soporte';
  question: string;
  answer: string;
}

interface FaqAccordionSectionProps {
  phone: string;
}

export const FaqAccordionSection: React.FC<FaqAccordionSectionProps> = ({ phone }) => {
  const [openId, setOpenId] = useState<string | null>('faq1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqs: FaqItem[] = [
    {
      id: 'faq1',
      category: 'proceso',
      question: '¿Cómo es el proceso desde que consulto hasta que tengo el programa listo?',
      answer: 'Es muy simple: 1) Charlamos por WhatsApp sobre las necesidades específicas de tu negocio. 2) Armamos la propuesta y configuramos el programa. 3) Cargamos tus datos iniciales (productos, precios, clientes). 4) Te capacitamos en 30 minutos y lo ponés a funcionar inmediatamente.'
    },
    {
      id: 'faq2',
      category: 'tecnico',
      question: '¿El programa requiere conexión a internet o funciona sin internet?',
      answer: 'Nuestros sistemas pueden instalarse localmente para funcionar 100% offline (ideal para zonas con cortes de internet o cajas críticas) o sincronizarse en la nube para controlar todo desde tu celular desde cualquier lugar.'
    },
    {
      id: 'faq3',
      category: 'pagos',
      question: '¿Es un pago único o hay que pagar suscripciones mensuales obligatorias?',
      answer: 'Ofrecemos modalidades de Pago Único (el programa es tuyo para siempre sin cargos sorpresa) y también opciones de abono mensual que incluyen servidores cloud y actualizaciones de AFIP para quien prefiera esa comodidad.'
    },
    {
      id: 'faq4',
      category: 'tecnico',
      question: '¿Emite Factura Electrónica AFIP A, B y C?',
      answer: 'Sí. El módulo fiscal se conecta de forma segura con el webservice de AFIP. Podés emitir comprobantes autorizados con código QR e imprimirlos en formato ticket térmico o PDF para enviar por email/WhatsApp.'
    },
    {
      id: 'faq5',
      category: 'soporte',
      question: '¿Qué pasa si cambio de computadora o necesito ayuda técnica?',
      answer: 'Cuentas con soporte posventa directo por WhatsApp. Si cambias de equipo o necesitás reinstalar el sistema, realizamos un backup completo de tus datos y lo migramos sin que pierdas nada.'
    },
    {
      id: 'faq6',
      category: 'tecnico',
      question: '¿Puedo usar mi lector de código de barras, impresora térmica o balanza?',
      answer: 'Totalmente. Nuestros programas son compatibles con cualquier lector de código de barras USB/Bluetooth, impresoras térmicas (58mm y 80mm), comanderas, cajones de dinero automáticos y balanzas de peso por puerto serie/USB.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel-luxury rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-rose-900/30">
        <div>
          <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-black uppercase tracking-wider shadow-md">
            <HelpCircle className="w-4 h-4 text-cyan-300" />
            <span>Preguntas Frecuentes</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 uppercase tracking-tight">
            Respuestas claras antes de empezar
          </h3>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-rose-300/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Buscar duda (ej: ARCA, AFIP, cuotas)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#18040B] border border-rose-900/40 focus:border-cyan-400 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-rose-300/40 focus:outline-none min-h-[44px]"
          />
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`border rounded-2xl transition-all ${
                isOpen 
                  ? 'border-cyan-500/50 bg-[#18040B]/90 shadow-lg shadow-cyan-950/40' 
                  : 'border-rose-900/40 bg-[#18040B]/60 hover:border-rose-700/60'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between space-x-3 text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition cursor-pointer min-h-[44px]"
              >
                <span className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-rose-300/60 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 text-xs text-rose-100 font-medium leading-relaxed border-t border-rose-900/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-center">
        <a
          href={`https://wa.me/549${phone}?text=Hola%20Anah%C3%AD%20y%20Enzo!%20Tengo%20una%20consulta%20para%20R%C3%ADo%20Cuarto%20Web.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs font-bold text-rose-200/80 hover:text-emerald-400 transition"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>¿Tenés otra pregunta específica para tu negocio? Escribiles a Anahí y Enzo por WhatsApp →</span>
        </a>
      </div>
    </motion.div>
  );
};
