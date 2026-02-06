import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Content } from '../../types';
import { ABOUT_LEON_PRODUCT_IMAGES } from '../../constants';

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
  const [activeLeonPoint, setActiveLeonPoint] = useState(0);
  const leonRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: leonRef,
    offset: ["start end", "end start"]
  });
  const leonImageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const leonAccentY = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const activeProduct = ABOUT_LEON_PRODUCT_IMAGES[activeLeonPoint] || ABOUT_LEON_PRODUCT_IMAGES[0];

  return (
    <section id="about" className="relative bg-gradient-to-b from-white via-[#fafbfc] to-white text-brand-navy py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#0b2f6b]/8 blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-brand-gold/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10 space-y-10 md:space-y-10">
        <FadeIn className="max-w-2xl space-y-3">
          <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.badge}</p>
          <h2 className="text-[25.5px] sm:text-[30px] md:text-[42.5px] font-semibold tracking-tight text-[#0b2f6b]">
            {copy.founderTitle}
          </h2>
          <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70">
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
                <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed">
                  {copy.bio[0]}
                </p>
                <AnimatePresence initial={false}>
                  {bioExpanded && (
                    <MotionDiv
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed overflow-hidden"
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
            <div className="grid gap-5 lg:grid-cols-3 lg:gap-6 items-start">
              <div className="space-y-4 lg:pr-4">
                <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  {copy.differentiators.badge}
                </p>
                <h3 className="text-[20px] sm:text-[25.5px] md:text-[30px] font-semibold text-[#0b2f6b]">
                  {copy.differentiators.title}
                </h3>
                {/* <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed">
                  {copy.differentiators.subtitle}
                </p> */}
              </div>

              {copy.differentiators.items.slice(0, 2).map((item, idx) => (
                <MotionDiv
                  key={item.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${idx === 1 ? 'object-[center_+20%]' : 'object-top'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <h4 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#0b2f6b]">
                      {item.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </MotionDiv>
              ))}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                {copy.differentiators.items.slice(2).map((item, idx) => (
                  <MotionDiv
                    key={item.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${idx === 1 ? 'object-[center_+20%]' : 'object-top'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                          0{idx + 3}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 space-y-3">
                      <h4 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#0b2f6b]">
                        {item.title}
                      </h4>
                      <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* <div className="rounded-[28px] bg-white/85 p-6 md:p-10 space-y-8 md:space-y-10"> */}
          <div className="rounded-[28px]p-6 md:p-10 space-y-8 md:space-y-10">
            <div className="max-w-2xl space-y-3">
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {copy.outcomes.badge}
              </p>
              <h3 className="text-[20px] sm:text-[25.5px] font-semibold text-[#0b2f6b]">
                {copy.outcomes.title}
              </h3>
            </div>
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {copy.outcomes.items.map((item, idx) => (
                <div
                  key={item.title}
                  className="group min-w-0 rounded-2xl bg-white p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      0{idx + 1}
                    </p>
                    <span className="h-[1px] flex-1 bg-brand-gold/20" />
                  </div>
                  <p className="mt-4 text-[12px] sm:text-[13.6px] font-semibold text-[#0b2f6b]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 leading-relaxed">
                    {item.body}
                  </p>
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
                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.leon.stats.map((stat) => {
                    const parts = stat.split(' ');
                    const value = parts.shift() || stat;
                    const label = parts.join(' ');
                    return (
                      <div
                        key={stat}
                        className="rounded-2xl border border-brand-gold/30 bg-white/60 px-4 py-3 shadow-[0_12px_30px_rgba(11,47,107,0.12)]"
                      >
                        <div className="text-[26px] sm:text-[30px] md:text-[34px] font-semibold tracking-tight text-brand-gold">
                          {value}
                        </div>
                        {label ? (
                          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/70">
                            {label}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
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
              </MotionDiv>

              <div className="relative hidden md:block">
              {/* <div className="relative hidden md:block min-h-[800px]"> */}

                {/* <div className="absolute left-[-500px] top-1/2 -translate-y-1/2">
                  <img
                    src="/img/leather-svgrepo-com.svg"
                    alt=""
                    className="w-[950px] max-w-none select-none opacity-45"
                    draggable={false}
                  />
                </div> */}
                {copy.leon.paragraphs[3] ? (
                  <FadeIn delay={0.08} className="relative z-10 mt-8 flex justify-center">
                    <div className="w-[72%] max-w-sm rounded-2xl bg-white/60 backdrop-blur-sm px-4 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.12)] text-center">
                      <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[18px] font-semibold text-[#0b2f6b] leading-relaxed tracking-tight">
                        {copy.leon.paragraphs[3]}
                      </p>
                    </div>
                  </FadeIn>
                ) : null}
              </div>

              <div className="space-y-10">
                <div className="space-y-6">
                  {copy.leon.paragraphs.map((paragraph, idx) => (
                    idx === 3 ? null : (
                      <FadeIn key={`${paragraph}-${idx}`} delay={idx * 0.04}>
                        <p
                          className={`leading-relaxed ${
                            idx === 0
                              ? "text-[12px] sm:text-[13.6px] md:text-[15px] font-medium text-[#0b2f6b]"
                              : "text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70"
                          }`}
                        >
                          {paragraph}
                        </p>
                      </FadeIn>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full space-y-8 lg:space-y-10">
              <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                {copy.leon.advantagesBadge}
              </p>

              <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <MotionDiv
                      key={activeLeonPoint}
                      initial={{ opacity: 0, rotate: -3, scale: 0.98 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 3, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative h-[280px] sm:h-[360px] md:h-[420px] overflow-hidden rounded-3xl"
                    >
                      <img src={activeProduct} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    </MotionDiv>
                  </AnimatePresence>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <MotionDiv
                        key={activeLeonPoint}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <p className="text-[26px] sm:text-[30px] md:text-[34px] font-semibold text-[#0b2f6b]">
                          {copy.leon.advantages[activeLeonPoint].title}
                        </p>
                        <p className="text-[13px] sm:text-[15px] md:text-[16.5px] text-brand-navy/70 leading-relaxed">
                          {copy.leon.advantages[activeLeonPoint].body}
                        </p>
                      </MotionDiv>
                    </AnimatePresence>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {copy.leon.advantages.map((item, idx) => {
                      const isActive = activeLeonPoint === idx;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveLeonPoint(idx)}
                          className="text-left transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[18px] sm:text-[20px] font-semibold ${
                              isActive ? "text-brand-gold" : "text-brand-navy/25"
                            }`}>
                              0{idx + 1}
                            </span>
                            <span className={`text-[13px] sm:text-[14.5px] font-semibold ${
                              isActive ? "text-[#0b2f6b]" : "text-brand-navy/60 hover:text-[#0b2f6b]"
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
