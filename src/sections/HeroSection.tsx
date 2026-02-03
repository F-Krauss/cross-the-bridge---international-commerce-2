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

const INDUSTRIES = ["Footwear", "Leather", "Hats", "Equestrian goods"];

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onCtaClick, onHeroReady }) => {
  const heroSignaledReady = useRef(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f2f4f8]"
    >
      <MotionDiv
        className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-0"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="grid gap-10 sm:gap-12 lg:gap-10 lg:grid-cols-[1.08fr,0.92fr] items-start lg:items-stretch lg:py-0 min-h-[80vh] lg:min-h-[calc(100vh-80px)]">

          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-0 py-0 lg:py-0 lg:pt-6 lg:pb-14 lg:h-full lg:justify-between">

            <FadeIn delay={0.15} className="flex justify-center lg:justify-start">
              <img
                src="/img/logo_horizontal.png"
                alt="Site logo"
                className="h-[9rem] w-auto object-contain"
              />
            </FadeIn>

            <FadeIn delay={0.15} className="-mt-3">
              <h1 className="text-[25px] sm:text-[30px] md:text-[40px] lg:text-[47px] font-semibold tracking-tight text-[#0b2f6b] leading-[1.06]">
                {hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/65 leading-relaxed max-w-xl">
                {hero.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.26}>
              {/* <div className="flex flex-wrap items-center gap-2 sm:gap-3"> */}
              <div className="flex flex-wrap flex-start gap-2 sm:gap-3">

                {/* <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Industries
                </span> */}
                {INDUSTRIES.map((industry) => (
                  <span
                    key={industry}
                    className="text-[12px] sm:text-[12px] font-semibold uppercase text-left tracking-[0.16em] text-brand-gold px-3"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </FadeIn>
            <MotionDiv
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                onClick={onCtaClick}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-navy text-white px-7 sm:px-9 py-3.5 rounded-full font-bold uppercase tracking-[0.16em] text-[12px] sm:text-[10px] md:text-[10px] hover:bg-brand-gold hover:text-brand-navy transition-colors shadow-[0_16px_30px_rgba(11,47,107,0.18)]"
              >
                {hero.cta}
              </button>
            </MotionDiv>
          </div>

          <FadeIn delay={0.2} className="w-full">
            <div className="flex flex-col gap-6 h-full lg:min-h-[calc(100vh-80px)] lg:pt-6 ">
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
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  <span>Trusted by</span>
                  {/* <span className="text-brand-gold">Trusted by</span> */}
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
