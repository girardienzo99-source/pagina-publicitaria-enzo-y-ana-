import React, { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

// Bump VIDEO_VERSION when the files change: /assets/* is served with an immutable cache.
const VIDEO_VERSION = '1';
const VIDEO_SRC = `/assets/video_promo_riocuarto_web.mp4?v=${VIDEO_VERSION}`;
const POSTER_SRC = `/assets/video_promo_poster.webp?v=${VIDEO_VERSION}`;

/**
 * Promo video of the site. Starts muted when it scrolls into view (browsers block
 * autoplay with sound) and offers a clear "Activar sonido" button for the music.
 * The file is only downloaded once the section gets close to the viewport.
 */
export const PromoVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) setShouldLoad(true);
        const video = videoRef.current;
        if (!video) return;
        if (entry.intersectionRatio >= 0.5 && !reduceMotion && video.paused && video.muted) {
          video.play().catch(() => undefined);
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { rootMargin: '300px 0px', threshold: [0, 0.5] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      if (video.ended || video.currentTime > video.duration - 1) video.currentTime = 0;
      video.play().catch(() => undefined);
    }
  };

  const startWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.currentTime = 0;
    video.play().catch(() => undefined);
  };

  return (
    <section aria-labelledby="promo-video-title" className="space-y-8 pt-4">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#4a5d4a] bg-[#4a5d4a]/10 px-3 py-1 rounded-full">
          Video · 45 segundos
        </span>
        <h2 id="promo-video-title" className="font-editorial text-3xl sm:text-4xl font-bold text-[#1e1b1b] tracking-tight">
          Mirá Río Cuarto Web en acción
        </h2>
        <p className="text-sm sm:text-base text-[#1e1b1b]/70 font-light">
          Un recorrido real por nuestra web, los sistemas que desarrollamos y cómo cotizar el tuyo.
        </p>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-5xl">
        {/* Premium frame: soft sage glow + double border */}
        <div aria-hidden="true" className="absolute -inset-3 sm:-inset-4 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#4a5d4a]/25 via-[#d9cfc7]/30 to-[#4a5d4a]/20 blur-xl" />
        <div className="relative rounded-[22px] sm:rounded-[30px] p-1.5 sm:p-2 bg-gradient-to-br from-white via-[#efe9e5] to-[#d9d2cc] shadow-2xl">
          <div className="relative overflow-hidden rounded-[18px] sm:rounded-[24px] ring-1 ring-black/10 bg-[#1e1b1b] aspect-video">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster={POSTER_SRC}
              src={shouldLoad ? VIDEO_SRC : undefined}
              muted
              playsInline
              loop
              preload="none"
              controls={isPlaying && !isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              aria-label="Video promocional de Río Cuarto Web"
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={startWithSound}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition group"
                aria-label="Reproducir video con sonido"
              >
                <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 shadow-2xl ring-8 ring-white/30 group-hover:scale-105 transition">
                  <Play className="w-9 h-9 text-[#4a5d4a] translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            )}

            {isPlaying && isMuted && (
              <button
                type="button"
                onClick={toggleSound}
                className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-[#1e1b1b] text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-white transition"
              >
                <VolumeX className="w-4 h-4 text-[#4a5d4a]" />
                Activar sonido
              </button>
            )}

            {isPlaying && !isMuted && (
              <button
                type="button"
                onClick={toggleSound}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg hover:bg-white transition"
                aria-label="Silenciar video"
              >
                <Volume2 className="w-4 h-4 text-[#4a5d4a]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
