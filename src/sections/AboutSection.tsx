import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
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

type AboutSectionProps = {
  copy: Content['about'];
};

const AboutSection: React.FC<AboutSectionProps> = ({ copy }) => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [activeDifferentiator, setActiveDifferentiator] = useState(0);
  const [activeLeonPoint, setActiveLeonPoint] = useState(0);
  const leonRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: leonRef,
    offset: ["start end", "end start"]
  });
  const leonImageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const leonAccentY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  return (
    <section id="about" className="relative bg-gradient-to-b from-white via-[#fafbfc] to-white text-brand-navy py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#0b2f6b]/8 blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-brand-gold/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10 space-y-16 md:space-y-20">
        <FadeIn className="max-w-2xl space-y-3">
          <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.badge}</p>
          <h2 className="text-[25.5px] sm:text-[30px] md:text-[42.5px] font-semibold tracking-tight text-[#0b2f6b]">
            {copy.founderTitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-brand-navy/70">
            {copy.founderTagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="group rounded-[32px] border border-slate-200 bg-white p-6 pb-10 md:p-10 shadow-[0_30px_60px_rgba(15,23,42,0.08)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div className="grid gap-8 lg:grid-cols-[0.72fr,1.28fr] items-center">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                  <img
                    src="/img/about/MarianaBio.PNG"
                    alt={copy.founderName}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/45 via-transparent to-transparent transition-all duration-700 group-hover:from-[#0b2f6b]/55" />
                </div>
                <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 px-5 py-3 shadow-lg transition-all duration-500 group-hover:bg-white group-hover:shadow-xl">
                  <p className="text-[12px] font-semibold text-[#0b2f6b]">{copy.founderName}</p>
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    {copy.founderRole}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.founderStoryBadge}</p>
                  <h3 className="text-[20px] sm:text-[25.5px] font-semibold text-[#0b2f6b]">
                    {copy.founderTagline}
                  </h3>
                </div>
                <p className="text-[12px] sm:text-[13.6px] text-brand-navy/70 leading-relaxed">
                  {copy.bio[0]}
                </p>
                <AnimatePresence initial={false}>
                  {bioExpanded && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-sm sm:text-base text-brand-navy/70 leading-relaxed overflow-hidden"
                    >
                      {copy.bio[1]}
                    </MotionDiv>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setBioExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-[8.5px] font-bold uppercase tracking-[0.18em] text-[#0b2f6b] hover:text-brand-gold transition-colors"
                >
                  {bioExpanded ? copy.bioCtaLess : copy.bioCtaMore}
                  <span className="w-8 h-[2px] bg-current opacity-40" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[32px] border border-slate-200 bg-[#f7f8fb] p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] items-start">
              <div className="space-y-4">
                <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  {copy.differentiators.badge}
                </p>
                <h3 className="text-[20px] sm:text-[25.5px] md:text-[30px] font-semibold text-[#0b2f6b]">
                  {copy.differentiators.title}
                </h3>
                <p className="text-[12px] sm:text-[13.6px] text-brand-navy/70 leading-relaxed">
                  {copy.differentiators.subtitle}
                </p>
              </div>

              <div className="-mx-2 flex gap-4 overflow-x-auto pb-2 px-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:flex-col sm:gap-4 sm:overflow-visible sm:pb-0 sm:snap-none">
                {copy.differentiators.items.map((item, idx) => {
                  const isActive = activeDifferentiator === idx;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveDifferentiator(idx)}
                      className={`min-w-[260px] rounded-2xl border px-5 py-4 text-left transition-all snap-start sm:min-w-0 ${
                        isActive
                          ? "border-[#0b2f6b]/40 bg-white shadow-lg"
                          : "border-slate-200 bg-white/70 hover:border-[#0b2f6b]/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                            0{idx + 1}
                          </span>
                          <span className="text-[12px] sm:text-[13.6px] font-semibold text-[#0b2f6b]">{item.title}</span>
                        </div>
                        <span className="text-[8.5px] uppercase tracking-[0.2em] text-brand-navy/50">
                          {isActive ? copy.differentiators.openLabel : copy.differentiators.viewLabel}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <MotionDiv
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-[12px] sm:text-[13.6px] text-brand-navy/70 leading-relaxed">
                              {item.body}
                            </p>
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="space-y-6">
            <div className="max-w-2xl space-y-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {copy.outcomes.badge}
              </p>
              <h3 className="text-[20px] sm:text-[25.5px] font-semibold text-[#0b2f6b]">
                {copy.outcomes.title}
              </h3>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {copy.outcomes.items.map((item, idx) => (
                <div
                  key={item.title}
                  className="min-w-0"
                >
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    0{idx + 1}
                  </p>
                  <p className="mt-3 text-[12px] font-semibold text-[#0b2f6b]">{item.title}</p>
                  <p className="mt-2 text-[12px] text-brand-navy/70 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div ref={leonRef} className="relative space-y-10">
            <MotionDiv
              style={{ y: leonAccentY }}
              className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-brand-gold/20 blur-2xl lg:block"
            />
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <div className="space-y-6">
                <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  {copy.leon.badge}
                </p>
                <h3 className="text-[25.5px] sm:text-[30px] md:text-[42.5px] lg:text-[51px] font-semibold tracking-tight text-[#0b2f6b]">
                  {copy.leon.heading}
                </h3>
                <div className="flex flex-wrap gap-4 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  {copy.leon.stats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
              </div>

              <MotionDiv
                style={{ y: leonImageY }}
                className="relative aspect-[16/9] overflow-hidden rounded-[32px] shadow-2xl"
              >
                <img
                  src="/img/about/leon.jpeg"
                  alt="Manufacturing in Mexico"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/70">{copy.leon.scaleBadge}</p>
                  <p className="text-[13.6px] font-semibold text-white">{copy.leon.scaleLabel}</p>
                </div>
              </MotionDiv>

              <div className="relative hidden md:block min-h-[800px]" aria-hidden="true">
                <div className="absolute left-[-500px] top-1/2 -translate-y-1/2">
                  <img
                    src="/img/leather-svgrepo-com.svg"
                    alt=""
                    className="w-[950px] max-w-none select-none opacity-50"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid gap-6">
                  {copy.leon.paragraphs.map((paragraph, idx) => (
                    <FadeIn key={`${paragraph}-${idx}`} delay={idx * 0.04}>
                      <p
                        className={`leading-relaxed ${
                          idx === 0
                            ? "text-[15px] md:text-[17px] font-medium text-[#0b2f6b]"
                            : "text-[12px] sm:text-[13.6px] text-brand-navy/70"
                        }`}
                      >
                        {paragraph}
                      </p>
                    </FadeIn>
                  ))}
                </div>
                <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] items-start">
                  <div className="space-y-3">
                    <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      {copy.leon.advantagesBadge}
                    </p>
                    <AnimatePresence mode="wait">
                      <MotionDiv
                        key={activeLeonPoint}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-3"
                      >
                        <p className="text-[25.5px] font-semibold text-[#0b2f6b]">
                          {copy.leon.advantages[activeLeonPoint].title}
                        </p>
                        <p className="text-[12px] sm:text-[13.6px] text-brand-navy/70 leading-relaxed">
                          {copy.leon.advantages[activeLeonPoint].body}
                        </p>
                      </MotionDiv>
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                    {copy.leon.advantages.map((item, idx) => {
                      const isActive = activeLeonPoint === idx;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveLeonPoint(idx)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center gap-4 pb-3 border-b border-[#0b2f6b]/10">
                            <span className={`text-[20px] font-semibold ${
                              isActive ? "text-brand-gold" : "text-brand-navy/20"
                            }`}>
                              0{idx + 1}
                            </span>
                            <span className={`text-[12px] sm:text-[13.6px] font-semibold ${
                              isActive ? "text-[#0b2f6b]" : "text-brand-navy/60"
                            }`}>
                              {item.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
