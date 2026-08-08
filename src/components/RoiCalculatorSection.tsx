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
      className="bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Calculadora de Ahorro & ROI</span>
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Simulá cuánto dinero y tiempo te ahorra un sistema a medida
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
          Ajustá los valores según tu negocio para ver el retorno de inversión real al automatizar caja, stock y ventas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5">
          
          {/* Slider 1: Hours spent manually */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Horas diarias perdidas en papel/planillas:</span>
              </span>
              <span className="text-amber-400 font-mono text-sm bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800">
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
              className="w-full accent-amber-500 bg-zinc-800 rounded-lg h-2 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">Anotar pedidos, contar stock a mano, conciliar cajas al cierre.</p>
          </div>

          {/* Slider 2: Hourly value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Valor estimado de tu hora de trabajo:</span>
              </span>
              <span className="text-emerald-400 font-mono text-sm bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
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
              className="w-full accent-emerald-500 bg-zinc-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Slider 3: Errors in charging & stock differences */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Pérdidas mensuales x errores de cobro o desfasaje de stock:</span>
              </span>
              <span className="text-red-400 font-mono text-sm bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800">
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
              className="w-full accent-red-500 bg-zinc-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

          {/* Slider 4: Lost sales because of slowness */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Ventas no concretadas por demora o falta de catálogo rápido:</span>
              </span>
              <span className="text-cyan-400 font-mono text-sm bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800">
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
              className="w-full accent-cyan-500 bg-zinc-800 rounded-lg h-2 cursor-pointer"
            />
          </div>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-emerald-950/80 via-zinc-900 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="text-center space-y-1">
            <span className="text-[11px] uppercase font-black tracking-widest text-emerald-400">
              Ahorro Estimado Mensual
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono tracking-tight">
              ${totalMonthlySavings.toLocaleString('es-AR')} <span className="text-xs text-zinc-400 font-sans">/ mes</span>
            </div>
            <p className="text-xs text-zinc-400 font-medium pt-1">
              Recuperás el costo del sistema en aprox. <strong className="text-white font-mono">{estimatedPaybackMonths} meses</strong>
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs">
            <div className="flex justify-between items-center text-zinc-300">
              <span>Tiempo recuperado al mes:</span>
              <span className="font-bold text-amber-400 font-mono">{monthlyHoursSaved} horas libres</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span>Valor equivalente del tiempo:</span>
              <span className="font-bold text-emerald-400 font-mono">${timeSavedMoney.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span>Fugas de dinero prevenidas:</span>
              <span className="font-bold text-cyan-400 font-mono">${totalMonthlyLossPrevented.toLocaleString('es-AR')}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-400 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>El software trabaja 24/7 sin comisiones por transacción y te da control total desde cualquier lugar.</span>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/60 uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Aprovechar Ahorro por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
