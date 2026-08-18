import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Clock, AlertTriangle, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface RoiCalculatorSectionProps {
  phone: string;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = () => {
  const [hoursPerDay, setHoursPerDay] = useState<number>(2.5);
  const [chargingErrorsPerMonth, setChargingErrorsPerMonth] = useState<number>(45000);
  const [lostSalesPerMonth, setLostSalesPerMonth] = useState<number>(85000);
  const [hourlyValue, setHourlyValue] = useState<number>(4500);

  // Calculations
  const monthlyHoursSaved = Math.round(hoursPerDay * 24); // 24 working days
  const timeSavedMoney = monthlyHoursSaved * hourlyValue;
  const totalMonthlyLossPrevented = chargingErrorsPerMonth + lostSalesPerMonth;
  const totalMonthlySavings = timeSavedMoney + totalMonthlyLossPrevented;
  const estimatedPaybackMonths = Math.max(1, Math.round(350000 / totalMonthlySavings * 10) / 10);

  const whatsappMessage = `Hola Anahí y Enzo! Usé el simulador de ROI en Río Cuarto Web y calculé que un desarrollo a medida me ahorraría aproximadamente $${totalMonthlySavings.toLocaleString('es-AR')} al mes (${monthlyHoursSaved} hs de trabajo). Me gustaría cotizar para mi negocio.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 font-montserrat text-[#1e1b1b]"
    >
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#4a5d4a]/10 text-[#4a5d4a] border border-[#4a5d4a]/20 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-[#4a5d4a]" />
          <span>Calculadora de Ahorro & Retorno de Inversión (ROI)</span>
        </span>
        <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#1e1b1b]">
          Simulá cuánto dinero y tiempo te ahorra un sistema a medida
        </h3>
        <p className="text-xs sm:text-sm text-[#1e1b1b]/70 font-light">
          Ajustá los valores según tu negocio para ver el retorno de inversión real al automatizar caja, stock y ventas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 bg-[#fcf9f8] border border-stone-200 rounded-2xl p-6 space-y-6">
          
          {/* Slider 1: Hours spent manually */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#1e1b1b] flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-[#4a5d4a]" />
                <span>Horas diarias perdidas en papel o planillas:</span>
              </span>
              <span className="text-[#4a5d4a] font-mono text-sm bg-white px-3 py-1 rounded border border-stone-300 shadow-sm">
                {hoursPerDay} hs / día
              </span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="8" 
              step="0.5" 
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full accent-[#4a5d4a] bg-stone-200 rounded-lg h-2 cursor-pointer"
            />
            <p className="text-[11px] text-stone-500">Anotar pedidos, contar stock a mano, conciliar cajas al cierre.</p>
          </div>

          {/* Slider 2: Hourly value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#1e1b1b] flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-[#4a5d4a]" />
                <span>Valor estimado de tu hora de trabajo:</span>
              </span>
              <span className="text-[#4a5d4a] font-mono text-sm bg-white px-3 py-1 rounded border border-stone-300 shadow-sm">
                ${hourlyValue.toLocaleString('es-AR')} / hr
              </span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="15000" 
              step="500" 
              value={hourlyValue}
              onChange={(e) => setHourlyValue(parseInt(e.target.value))}
              className="w-full accent-[#4a5d4a] bg-stone-200 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Slider 3: Errors in charging & stock differences */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#1e1b1b] flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Pérdidas mensuales x errores de cobro o desfasaje de stock:</span>
              </span>
              <span className="text-amber-700 font-mono text-sm bg-white px-3 py-1 rounded border border-stone-300 shadow-sm">
                ${chargingErrorsPerMonth.toLocaleString('es-AR')}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200000" 
              step="5000" 
              value={chargingErrorsPerMonth}
              onChange={(e) => setChargingErrorsPerMonth(parseInt(e.target.value))}
              className="w-full accent-[#4a5d4a] bg-stone-200 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Slider 4: Lost sales because of slowness */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#1e1b1b] flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-[#4a5d4a]" />
                <span>Ventas no concretadas por demora o falta de catálogo rápido:</span>
              </span>
              <span className="text-[#4a5d4a] font-mono text-sm bg-white px-3 py-1 rounded border border-stone-300 shadow-sm">
                ${lostSalesPerMonth.toLocaleString('es-AR')}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="300000" 
              step="10000" 
              value={lostSalesPerMonth}
              onChange={(e) => setLostSalesPerMonth(parseInt(e.target.value))}
              className="w-full accent-[#4a5d4a] bg-stone-200 rounded-lg h-2 cursor-pointer"
            />
          </div>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-white border-2 border-[#4a5d4a] rounded-2xl p-7 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#4a5d4a]">
              Ahorro Estimado Mensual
            </span>
            <div className="text-3xl sm:text-4xl font-bold text-[#4a5d4a] font-mono tracking-tight">
              ${totalMonthlySavings.toLocaleString('es-AR')} <span className="text-xs text-stone-500 font-sans">/ mes</span>
            </div>
            <p className="text-xs text-stone-600 font-normal pt-1">
              Recuperás el costo del sistema en aprox. <strong className="text-[#1e1b1b] font-mono font-bold">{estimatedPaybackMonths} meses</strong>
            </p>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-stone-200 text-xs">
            <div className="flex justify-between items-center text-[#1e1b1b]/80">
              <span>Tiempo recuperado al mes:</span>
              <span className="font-bold text-[#1e1b1b] font-mono">{monthlyHoursSaved} horas libres</span>
            </div>
            <div className="flex justify-between items-center text-[#1e1b1b]/80">
              <span>Valor equivalente del tiempo:</span>
              <span className="font-bold text-[#4a5d4a] font-mono">${timeSavedMoney.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center text-[#1e1b1b]/80">
              <span>Fugas de dinero prevenidas:</span>
              <span className="font-bold text-[#4a5d4a] font-mono">${totalMonthlyLossPrevented.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#fcf9f8] border border-stone-200 text-[11px] text-stone-600 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#4a5d4a] shrink-0 mt-0.5" />
            <span>El software trabaja 24/7 sin comisiones por transacción y te da control total desde cualquier lugar.</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3.5 bg-[#4a5d4a] hover:bg-[#3b4b3b] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Aprovechar Ahorro por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
