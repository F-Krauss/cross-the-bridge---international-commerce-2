import React, { useRef, useState } from 'react';
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

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onCtaClick, onHeroReady }) => {
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
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
        <div className="grid gap-12 lg:gap-10 lg:grid-cols-[1.08fr,0.92fr] items-center lg:items-stretch min-h-[70vh] lg:min-h-[calc(100vh-64px)]">
          <div className="flex flex-col gap-6 sm:gap-7 py-12 lg:py-0 lg:justify-center">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative col-span-2 aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1">
                {!heroVideoFailed ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://static.vecteezy.com/system/resources/previews/005/166/637/mp4/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    data-autoplay
                    poster="https://static.vecteezy.com/system/resources/thumbnails/005/166/637/large/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.jpg"
                    onLoadedData={() => {
                      if (!heroSignaledReady.current) {
                        heroSignaledReady.current = true;
                        onHeroReady?.();
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
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                    alt="Global operations"
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      if (!heroSignaledReady.current) {
                        heroSignaledReady.current = true;
                        onHeroReady?.();
                      }
                    }}
                  />
                )}
              </div>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-autoplay
                  poster="https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg"
                />
              </div>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-autoplay
                  poster="https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </MotionDiv>
    </section>
  );
};

export default HeroSection;
