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
  const hasFourthPanel = panels.length >= 4;
  const displayedPanels = hasFourthPanel ? [panels[3], panels[0], panels[1]].filter(Boolean) : panels;
  const missionImage = hasFourthPanel ? panels[3]?.media : panels[0]?.media;

  if (!panels.length) return null;

  return (
    <section id="trade_missions" className="relative bg-[#0a0f1a] text-white py-20 md:py-28 overflow-hidden">
      {/* Minimal ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-gold/[0.03] blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Hero area: large image + header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <FadeIn className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="aspect-[4/3]">
                <img
                  src="/img/img-mariana/trademissions.jpg"
                  alt={missionImage?.alt || 'Trade missions'}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right: Header + CTA */}
          <FadeIn delay={0.1} className="order-1 lg:order-2 space-y-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
              {copy.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
              {copy.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
              {copy.tagline}
            </p>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy px-6 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-white transition-colors"
            >
              {copy.cta}
              <span className="text-lg leading-none">→</span>
            </button>
          </FadeIn>
        </div>

        {/* Content panels - horizontal scroll on mobile, row on desktop */}
        <FadeIn delay={0.2} className="mt-16 md:mt-20">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
            {displayedPanels.map((panel, idx) => (
              <div
                key={panel.id}
                className="flex-shrink-0 w-[85%] md:w-auto snap-start"
              >
                <div className="h-full flex flex-col gap-4 py-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-white/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                      {panel.label}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">
                    {panel.title}
                  </h3>
                  {panel.body && (
                    <div className="space-y-2 text-[13px] md:text-[14px] text-white/60 leading-relaxed">
                      {panel.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {panel.list && (
                    <ul className="space-y-2 text-[13px] md:text-[14px] text-white/70">
                      {panel.list.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <span className="text-brand-gold mt-1">·</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TradeMissionsSection;
