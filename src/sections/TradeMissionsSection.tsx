import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const TradeMissionsSection: React.FC<TradeMissionsSectionProps> = ({ onCtaClick, copy }) => {
  const panels: MissionPanel[] = copy.panels || [];

  if (!panels.length) return null;
 

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
            <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
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
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {panels.map((panel, idx) => {
              return (
                <div key={panel.id} className="flex flex-col gap-4">
                  <div className="p-1 sm:p-2 lg:p-3 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-[10px] font-bold tracking-[0.24em] text-white/70">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-gold">
                        {panel.label}
                      </span>
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-white leading-tight">
                      {panel.title}
                    </h3>
                    {panel.body && (
                      <div className="space-y-3 text-[12px] sm:text-[13.6px] md:text-[15px] text-white/80 leading-relaxed">
                        {panel.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {panel.list && (
                      <div className="grid gap-3 sm:grid-cols-2 text-[12px] sm:text-[13.6px] md:text-[15px] font-medium text-white/85">
                        {panel.list.map((benefit, benefitIdx) => (
                          <div key={benefit} className="flex items-start gap-3">
                            <span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-brand-gold">
                              {String(benefitIdx + 1).padStart(2, '0')}
                            </span>
                            <p className="leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TradeMissionsSection;
