import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Content } from '../../types';

const MotionDiv = motion.div as any;

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -10% 0px" });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.5, delay, ease: [0.15, 0.85, 0.35, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

type TradeMissionsSectionProps = {
  onCtaClick?: () => void;
  copy: NonNullable<Content['tradeMissions']>;
};

type MediaItem = {
  src: string;
  alt: string;
};

type MissionPanel = {
  id: string;
  label: string;
  title: string;
  body?: string[];
  list?: string[];
  media: MediaItem;
};

const AUTO_ROTATE_MS = 4000;

const TradeMissionsSection: React.FC<TradeMissionsSectionProps> = ({ onCtaClick, copy }) => {
  const panels: MissionPanel[] = copy.panels || [];
  const [activePanel, setActivePanel] = useState(panels[0]?.id || '');
  const active = panels.find((panel) => panel.id === activePanel) ?? panels[0];
  const activeIndex = panels.findIndex((panel) => panel.id === active?.id);
  const autoTimer = useRef<NodeJS.Timeout | null>(null);

  const scheduleAutoRotate = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
    }

    autoTimer.current = setInterval(() => {
      setActivePanel((prev) => {
        const currentIndex = panels.findIndex((panel) => panel.id === prev);
        const nextIndex = (currentIndex + 1) % panels.length;
        return panels[nextIndex].id;
      });
    }, AUTO_ROTATE_MS);
  }, [panels]);

  const pauseAutoRotate = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  }, []);

  useEffect(() => {
    scheduleAutoRotate();

    return () => {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
      }
    };
  }, [scheduleAutoRotate]);

  useEffect(() => {
    scheduleAutoRotate();
  }, [activePanel, scheduleAutoRotate]);

  useEffect(() => {
    if (panels.length && !activePanel) {
      setActivePanel(panels[0].id);
    }
  }, [panels, activePanel]);

  if (!panels.length) return null;

  const handlePanelChange = (panelId: string) => {
    setActivePanel(panelId);
    scheduleAutoRotate();
  };
 

  return (
    <section id="trade_missions" className="relative bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#0f1729] text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-gold/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100px_100px] opacity-40" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              {copy.badge}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              {copy.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col items-start gap-4">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy px-6 py-3 rounded-full text-[8.5px] md:text-[12px] font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors shadow-[0_16px_30px_rgba(0,0,0,0.25)]"
            >
              {copy.cta}
            </button>
            <p className="text-[8.5px] uppercase tracking-[0.2em] text-brand-gold font-bold">
              {copy.tagline}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="mt-10">
          <div
            className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden"
            onMouseEnter={pauseAutoRotate}
            onMouseLeave={scheduleAutoRotate}
            onTouchStart={pauseAutoRotate}
            onTouchEnd={scheduleAutoRotate}
          >
            <div className="grid lg:grid-cols-2 items-stretch">
              <div className="relative min-h-[320px] lg:min-h-[420px] overflow-hidden">
                <img
                  src={active.media.src}
                  alt={active.media.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 space-y-2 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                    {copy.selectLabel}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold tracking-[0.24em] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                      {active.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 bg-gradient-to-br from-[#0f1729]/60 via-[#0f1729]/40 to-[#1a2847]/30">
                <div className="space-y-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-brand-gold">
                    {active.label}
                  </p>
                  <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white leading-tight">
                    {active.title}
                  </h3>
                  {active.body && (
                    <div className="space-y-3 text-[12px] sm:text-[13.6px] text-white/80 leading-relaxed">
                      {active.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {active.list && (
                    <div className="grid gap-3 sm:grid-cols-2 text-[12.5px] sm:text-[14px] font-medium text-white/85">
                      {active.list.map((benefit, idx) => (
                        <div key={benefit} className="flex items-start gap-3">
                          <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-brand-gold/50 text-[9px] font-bold tracking-[0.2em] text-brand-gold">
                            0{idx + 1}
                          </span>
                          <p className="leading-relaxed">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePanelChange(panels[(activeIndex - 1 + panels.length) % panels.length].id)}
                    className="w-11 h-11 rounded-full border border-white/30 text-white/80 hover:border-white hover:text-white transition flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePanelChange(panels[(activeIndex + 1) % panels.length].id)}
                    className="w-11 h-11 rounded-full border border-white/30 text-white/80 hover:border-white hover:text-white transition flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TradeMissionsSection;
