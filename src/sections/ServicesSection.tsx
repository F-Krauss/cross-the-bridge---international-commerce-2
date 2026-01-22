import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { X } from 'lucide-react';

type ServiceItem = {
  title: string;
  short: string;
  long: string[];
};

export type ServicesContent = {
  title: string;
  intro: string;
  items: ServiceItem[];
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
};

const MotionDiv = motion.div as any;

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -10% 0px" });

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

type ServicesSectionProps = {
  servicesContent: ServicesContent;
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesContent }) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const serviceImages = [
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <section id="services" className="bg-white text-brand-navy py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatePresence>
          {selectedService !== null && (
            <MotionDiv
              className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedService(null)}
            >
              <MotionDiv
                className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="relative h-48 sm:h-60 w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={serviceImages[selectedService]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/70 via-transparent to-transparent" />
                </div>
                <div className="p-6 sm:p-8 space-y-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                    {String(selectedService + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0b2f6b]">
                    {servicesContent.items[selectedService].title}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-navy/70">
                    {servicesContent.items[selectedService].short}
                  </p>
                  <div className="space-y-4 text-sm sm:text-base text-brand-navy/70 leading-relaxed">
                    {servicesContent.items[selectedService].long.map((para, pIdx) => (
                      <p key={`service-long-${pIdx}`}>{para}</p>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        <FadeIn>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">{servicesContent.title}</p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-navy max-w-3xl">
            {servicesContent.intro}
          </h2>
        </FadeIn>

        <div className="mt-10 md:mt-12 grid gap-6 md:grid-cols-3 md:items-stretch md:auto-rows-fr">
          {servicesContent.items.map((service, idx) => (
            <FadeIn key={service.title} delay={idx * 0.05}>
              <button
                type="button"
                onClick={() => setSelectedService(idx)}
                className="w-full h-full text-left rounded-3xl border border-slate-200 bg-white p-0 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition-colors hover:border-[#0b2f6b]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2f6b]/40"
              >
                <div className="flex h-full flex-col">
                  <div className="relative h-48 md:h-52 overflow-hidden rounded-t-3xl">
                    <img src={serviceImages[idx]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em]">{String(idx + 1).padStart(2, '0')}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-1 flex-col gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0b2f6b]">{service.title}</h3>
                      <p className="text-sm md:text-base text-brand-navy/70">{service.short}</p>
                    </div>
                    <div className="mt-auto text-xs font-bold uppercase tracking-[0.2em] text-[#0b2f6b]">
                      Read more
                    </div>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
