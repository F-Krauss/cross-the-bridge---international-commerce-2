import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, GlowingOrb, GridPattern, MotionComponents, useVideoAutoplay } from './shared';
import { HeroSectionProps } from './types';

const { Div: MotionDiv } = MotionComponents;

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, t, ui, onHeroReady }) => {
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const heroSignaledReady = useRef(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Force hero video to play immediately
  useVideoAutoplay(heroVideoRef, true);

  return (
    <section
      id="about"
      className="min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] relative overflow-hidden bg-brand-navy py-10 md:py-12 flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]"
          alt="World"
        />
        {!heroVideoFailed && (
          <video
            ref={heroVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            data-autoplay
            poster="https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg"
            onLoadedData={() => {
              if (!heroSignaledReady.current) {
                heroSignaledReady.current = true;
                onHeroReady?.();
              }
              // Force play when metadata loads
              if (heroVideoRef.current && heroVideoRef.current.paused) {
                heroVideoRef.current.play().catch(() => {});
              }
            }}
            onCanPlay={() => {
              // Also try when video can start playing
              if (heroVideoRef.current && heroVideoRef.current.paused) {
                heroVideoRef.current.play().catch(() => {});
              }
            }}
            onError={() => {
              setHeroVideoFailed(true);
              if (!heroSignaledReady.current) {
                heroSignaledReady.current = true;
                onHeroReady?.();
              }
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-brand-navy/35" />
        <div className="absolute inset-0 bg-brand-navy/75" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/5 via-transparent to-transparent mix-blend-overlay" />
        <div className="absolute -left-24 bottom-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      </div>
      <GridPattern color="#FFFFFF" opacity={0.02} />

      <MotionDiv
        className="container mx-auto px-6 relative z-10 min-h-full flex flex-col gap-6 md:gap-8 pt-8 md:pt-4 pb-10 md:pb-10 items-start md:items-center justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full max-w-6xl">
          <FadeIn delay={0.15} className="pb-2">
            <img
              src="/img/Logo_home2.png"
              alt="Cross the Bridge logo"
              className="mx-auto block w-48 sm:w-64 md:w-[22rem] lg:w-[26rem] max-w-[460px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[560px] mb-6 md:mb-8 drop-shadow-[0_12px_45px_rgba(0,0,0,0.35)]"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-3xl md:text-[44px] lg:text-[52px] font-bold text-white leading-tight mt-2 md:mt-0 text-left md:text-center max-w-4xl mx-auto">
              {t.hero.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex justify-start md:justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-white">
                {t.hero.audience}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="text-gray-200 text-base md:text-lg text-left md:text-center max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-6 mt-3">
              {t.hero.subtitle}
            </p>
          </FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 w-full max-w-3xl mx-auto justify-start md:justify-center mt-6 md:mt-7">
            <FadeIn delay={0.4}>
              <button
                onClick={() => {}} // Will be passed as prop
                className="group flex items-center justify-center gap-3 bg-brand-gold text-brand-navy px-5 sm:px-7 md:px-8 py-3 md:py-3.5 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-white transition-colors w-full sm:w-auto shadow-lg shadow-brand-gold/30"
              >
                {t.hero.cta}
              </button>
            </FadeIn>
            <FadeIn delay={0.45}>
              <a
                href="#capabilities"
                className="group flex items-center justify-center gap-3 border border-white/30 text-white px-5 sm:px-7 md:px-8 py-3 md:py-3.5 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-sm hover:border-brand-gold hover:text-brand-gold transition-colors w-full sm:w-auto bg-white/5"
              >
                {t.hero.cta2}
              </a>
            </FadeIn>
          </div>
          <FadeIn delay={0.6} className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 max-w-5xl mx-auto mt-4 mb-8 text-gray-100 text-sm md:text-base">
              {t.hero.proofs.map((proof, index) => (
                <div key={`${proof}-${index}`} className="flex items-center gap-2">
                  <CheckCircle className="text-brand-gold" size={18} />
                  <span>{proof}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 justify-center items-center pointer-events-none opacity-70">
          <GlowingOrb className="w-[500px] h-[500px] bg-brand-gold/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="relative z-10 border border-white/10 rounded-full w-[400px] h-[400px] flex items-center justify-center"
          >
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full scale-75" />
          </motion.div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60 text-xs uppercase tracking-[0.18em]">
          <span className="w-10 h-[2px] bg-white/30" />
          <span>{ui.hero.scrollPrompt}</span>
          <span className="w-10 h-[2px] bg-white/30" />
        </div>
      </MotionDiv>
    </section>
  );
};
