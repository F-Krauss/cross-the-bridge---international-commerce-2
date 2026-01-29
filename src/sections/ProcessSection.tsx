import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Content } from '../../types';

const MotionDiv = motion.div as any;

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
};

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -10% 0px" });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.15, 0.85, 0.35, 1] }}
    >
      {children}
    </MotionDiv>
  );
};

type ProcessSectionProps = {
  copy: Content['process'];
};

const ProcessSection: React.FC<ProcessSectionProps> = ({ copy }) => (
  <section id="process" className="relative bg-gradient-to-br from-[#f5f7fa] via-[#f9fafb] to-[#f2f4f8] text-brand-navy py-16 md:py-20 overflow-hidden pb-0">
    {/* <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#0b2f6b]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,47,107,0.03)_1px,transparent_1px),linear-gradient(rgba(11,47,107,0.03)_1px,transparent_1px)] bg-[length:80px_80px] opacity-50" />
    </div> */}

    <div className="container mx-auto px-6 md:px-8 relative z-10">
      <div className="grid gap-12 lg:grid-cols-[0.95fr,1.05fr] items-start">
        <div className="space-y-10 lg:pl-6 order-1 lg:order-1">
          <FadeIn>
            <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold text-left lg:text-left">{copy.title}</p>
            <h2 className="mt-3 text-[25.5px] sm:text-[30px] md:text-[42.5px] font-semibold tracking-tight text-[#0b2f6b] text-left lg:text-left">
              {copy.subtitle}
            </h2>
            <p className="mt-4 text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/70 text-left lg:text-left">
              {copy.intro}
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="w-full">
            <div className="grid gap-4 sm:grid-cols-[1.2fr,0.8fr]">
              <div className="group relative sm:row-span-2 aspect-[3/4] sm:aspect-auto sm:h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <video
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="./../img/how-we-work/OnSite1.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-autoplay
                  poster="./../img/how-we-work/OnSite1.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="group relative h-[200px] md:h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <img
                    src="./../img/how-we-work/Leather inspection.jpg"
                    alt="Partner alignment"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/50 via-transparent to-transparent group-hover:from-[#0b2f6b]/70 transition-all duration-500" />
                </div>
                <div className="group relative h-[200px] md:h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <img
                    src="./../img/how-we-work/Proceso3.jpg"
                    alt="Workshop detail"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/50 via-transparent to-transparent group-hover:from-[#0b2f6b]/70 transition-all duration-500" />
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        <div className="relative rounded-2xl border border-slate-200/70 bg-white/70 p-4 sm:p-6 shadow-sm order-2 lg:order-2">
          <div className="absolute left-4 sm:left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-[#0b2f6b]/15 via-brand-gold/20 to-[#0b2f6b]/15" />
          <div className="space-y-8 pl-6 sm:pl-10">
            {copy.steps.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.05}>
                <div className="group relative cursor-pointer transition-all duration-500 hover:pl-3">
                  <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-[#0b2f6b] border-2 border-[#f2f4f8] transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-gold group-hover:shadow-lg group-hover:shadow-brand-gold/50" />
                  <div className="space-y-2 p-4 -ml-4 rounded-xl transition-all duration-500 group-hover:bg-white/60 group-hover:shadow-lg">
                    <p className="text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#0b2f6b] group-hover:text-brand-gold transition-colors duration-300">
                      0{idx + 1} - {step.title}
                    </p>
                    {step.tagline ? (
                      <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/80 font-medium group-hover:text-brand-navy transition-colors duration-300">
                        {step.tagline}
                      </p>
                    ) : null}
                    {step.desc ? (
                      <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/60 leading-relaxed group-hover:text-brand-navy/80 transition-colors duration-300">
                        {step.desc}
                      </p>
                    ) : null}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {/* {copy.outro ? (
            <FadeIn delay={0.25}>
              <p className="mt-6 text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-navy/75 text-left lg:text-right">
                {copy.outro}
              </p>
            </FadeIn>
          ) : null} */}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
