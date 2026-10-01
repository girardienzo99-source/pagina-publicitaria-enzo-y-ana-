import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Music } from 'lucide-react';
import posGastronomicoFallback from '../assets/pos_gastronomico.jpg';

interface GastronomicVideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

export const GastronomicVideoPlayer: React.FC<GastronomicVideoPlayerProps> = ({
  videoSrc = '/assets/video_patron.mp4',
  posterSrc = posGastronomicoFallback,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Generador de música ambiental suave (Resto-Lounge Chillout) usando Web Audio API
  // para garantizar que la música funcione siempre de forma inmediata sin archivos pesados ni bloqueos
  const startAmbientMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2.5); // Fade in suave
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;

      // Acordes cálidos estilo Lounge / Café Gastronómico (F maj7 -> G -> Em7 -> Am7)
      const chordNotes = [
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
        [164.81, 196.00, 246.94, 329.63], // Em7
        [220.00, 261.63, 329.63, 392.00], // Am7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!ambientGainRef.current || ctx.state === 'closed') return;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        const now = ctx.currentTime;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          // Envolvente de sonido suave (Pad)
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 6.0);
        });

        chordIndex++;
      };

      playChord();
      const interval = setInterval(() => {
        if (ctx.state === 'running') {
          playChord();
        }
      }, 5500);

      return () => clearInterval(interval);
    } catch (e) {
      console.warn('Web Audio Ambient no soportado:', e);
    }
  };

  const stopAmbientMusic = () => {
    if (audioContextRef.current) {
      try {
        if (ambientGainRef.current) {
          const now = audioContextRef.current.currentTime;
          ambientGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.8);
          setTimeout(() => {
            audioContextRef.current?.close();
            audioContextRef.current = null;
          }, 850);
        } else {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      } catch (err) {
        console.warn('Error al detener audio:', err);
      }
    }
  };

  const toggleMusic = () => {
    if (isMusicActive) {
      stopAmbientMusic();
      setIsMusicActive(false);
    } else {
      startAmbientMusic();
      setIsMusicActive(true);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientMusic();
    };
  }, []);

  return (
    <div className={`relative group ${className}`}>
      {/* Resplandor ambiental de fondo (Luxury Ambient Glow) */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#4a5d4a]/30 via-amber-700/15 to-[#4a5d4a]/30 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Chasis exterior del Dispositivo / Terminal Táctil */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#2a2626] via-[#1d1a1a] to-[#121111] p-1.5 sm:p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.12)] border border-stone-800">
        
        {/* Barra Superior Estilo Ventana Ejecutiva macOS / POS Terminal */}
        <div className="bg-[#242020] px-4 py-2.5 sm:py-3 rounded-t-[1.3rem] border-b border-stone-800 flex items-center justify-between">
          
          {/* Botones de Ventana */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444]/80 shadow-sm" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]/80 shadow-sm" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981]/80 shadow-sm" />
          </div>

          {/* Indicador de Estado y Título Central */}
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-stone-200">
              El Patrón <span className="text-[#8ba38b] font-normal">• Salón & Mozos</span>
            </span>
          </div>

          {/* Control de Música de Fondo */}
          <button
            onClick={toggleMusic}
            title={isMusicActive ? 'Silenciar música de fondo' : 'Activar música ambiental de fondo'}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition duration-200 border ${
              isMusicActive
                ? 'bg-[#4a5d4a] text-white border-[#8ba38b] shadow-[0_0_12px_rgba(74,93,74,0.6)]'
                : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700 hover:text-white'
            }`}
          >
            {isMusicActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span className="hidden sm:inline">Música ON</span>
                {/* Ecualizador animado */}
                <span className="flex items-end space-x-0.5 h-2.5">
                  <span className="w-0.5 bg-emerald-300 h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-emerald-300 h-3 animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-emerald-300 h-1.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                </span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-stone-400" />
                <span>Música ambiental</span>
              </>
            )}
          </button>
        </div>

        {/* Pantalla del Reproductor de Video */}
        <div className="relative aspect-video w-full bg-stone-950 overflow-hidden rounded-b-[1.3rem] flex items-center justify-center">
          
          {/* Si el video carga correctamente */}
          {!hasVideoError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setHasVideoError(true)}
              className="w-full h-full object-cover object-center transition duration-700"
            />
          ) : (
            // Fallback con la imagen y aviso elegante si el video aún no fue subido
            <img
              src={posterSrc}
              alt="El Patrón - Gestión Gastronómica Mozos y Salón"
              className="w-full h-full object-cover object-top"
            />
          )}

          {/* Filtro sutil para realce de contraste de alta fidelidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

          {/* Badge Flotante Glassmorphism en la esquina inferior izquierda */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass-card-vintage px-3 py-1.5 rounded-full border border-white/20 text-white text-[10px] sm:text-xs font-medium flex items-center space-x-2 shadow-xl backdrop-blur-md bg-black/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="tracking-wide">Comandas y Mesas en Tiempo Real</span>
          </div>

          {/* Botón Flotante de Pausa / Reproducción en la esquina inferior derecha */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center shadow-xl backdrop-blur-md transition transform hover:scale-105 active:scale-95"
            title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 translate-x-0.5" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
