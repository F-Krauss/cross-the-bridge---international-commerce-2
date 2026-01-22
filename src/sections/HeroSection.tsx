import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Content } from '../../types';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const MotionDiv = motion.div as any;

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -10% 0px" });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.15, 0.85, 0.35, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

type HeroSectionProps = {
  hero: Content["hero"];
  onCtaClick: () => void;
  onHeroReady?: () => void;
};

const PARTNER_LOGOS = [
  { src: "/img/Logos/Chazlyn.png", alt: "Chazlyn" },
  { src: "/img/Logos/Outback.png", alt: "Outback" },
  { src: "/img/Logos/Viberg.png", alt: "Viberg" }
];

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onCtaClick, onHeroReady }) => {
  const heroSignaledReady = useRef(false);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f2f4f8]"
    >
      <MotionDiv
        className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="grid gap-12 lg:gap-10 lg:grid-cols-[1.08fr,0.92fr] items-center lg:items-stretch min-h-[80vh] lg:min-h-[calc(100vh-80px)]">
          <div className="flex flex-col gap-6 sm:gap-7 py-12 lg:py-6 lg:justify-center">
            <FadeIn delay={0.15}>
              <h1 className="text-[36px] sm:text-[42px] md:text-[52px] lg:text-[60px] font-semibold tracking-tight text-[#0b2f6b] leading-[1.06]">
                {hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm sm:text-base md:text-lg text-brand-navy/65 leading-relaxed max-w-xl">
                {hero.subtitle}
              </p>
            </FadeIn>
            <MotionDiv
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                onClick={onCtaClick}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-navy text-white px-7 sm:px-9 py-3.5 rounded-full font-bold uppercase tracking-[0.16em] text-[11px] sm:text-xs md:text-sm hover:bg-brand-gold hover:text-brand-navy transition-colors shadow-[0_16px_30px_rgba(11,47,107,0.18)]"
              >
                {hero.cta}
              </button>
            </MotionDiv>
          </div>

          <FadeIn delay={0.2} className="w-full">
            <div className="flex flex-col gap-6 h-full lg:min-h-[calc(100vh-80px)] lg:pt-6">
              <div className="group relative flex-1 min-h-[240px] lg:min-h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1">
                <img
                  src="./../img/Calzado1.jpg"
                  alt="Manufacturing craftsmanship"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => {
                    if (!heroSignaledReady.current) {
                      heroSignaledReady.current = true;
                      onHeroReady?.();
                    }
                  }}
                />
              </div>

              <div className="space-y-4 pt-2 pb-8">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/60">
                  <span>Our partners</span>
                  <span className="text-brand-gold">Trusted by</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 sm:gap-6">
                  {PARTNER_LOGOS.map((logo) => (
                    <div key={logo.src} className="flex items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-16 sm:h-16 w-full object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </MotionDiv>
    </section>
  );
};

export default HeroSection;
