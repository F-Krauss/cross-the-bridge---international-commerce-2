import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

const PROCESS_STEPS = [
  {
    title: "Align",
    tagline: "Strategy before production.",
    body: "We define goals, pricing targets, timelines, and feasibility upfront, so every decision is aligned before money is spent or factories are engaged."
  },
  {
    title: "Build",
    tagline: "From idea to validated product.",
    body: "We support product development, material selection, supplier and factory matching, and prototype validation, ensuring your product is technically sound, cost-aligned, and ready for production."
  },
  {
    title: "Execute",
    tagline: "Hands-on production control.",
    body: "We manage production on the ground, coordinating suppliers, timelines, technical follow-up, and quality standards so your team can stay focused on growth."
  },
  {
    title: "Deliver",
    tagline: "Export-ready and market compliant.",
    body: "We coordinate logistics, documentation, and export requirements, guiding your shipment from factory floor to final destination with full visibility and control."
  }
];

const ProcessSection = () => (
  <section id="process" className="relative bg-[#f7f8fb] text-brand-navy py-16 md:py-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#0b2f6b]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,47,107,0.05)_1px,transparent_1px)] bg-[length:120px_120px] opacity-40" />
    </div>

    <div className="container mx-auto px-6 md:px-8 relative z-10">
      <div className="grid gap-12 lg:grid-cols-[0.95fr,1.05fr] items-start">
        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#0b2f6b]/15" />
          <div className="space-y-8 pl-8">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeIn key={step.title} delay={idx * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-[#0b2f6b]" />
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2f6b]">
                      0{idx + 1} - {step.title}
                    </p>
                    <p className="text-sm md:text-base text-brand-navy/80 font-medium">{step.tagline}</p>
                    <p className="text-sm md:text-base text-brand-navy/60 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="space-y-10 lg:pl-6">
          <FadeIn>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold text-left lg:text-right">Your Journey With Us</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0b2f6b] text-left lg:text-right">
              A proven system to execute manufacturing in Mexico - without costly trial and error.
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-brand-navy/70 text-left lg:text-right">
              We've refined this framework over 20+ years, so you don't have to learn the hard way.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="w-full">
            <div className="grid gap-4 sm:grid-cols-[1.2fr,0.8fr] sm:grid-rows-2">
              <div className="relative sm:row-span-2 aspect-[3/4] sm:aspect-auto sm:h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-autoplay
                  poster="https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
                  alt="Partner alignment"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/50 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  data-autoplay
                  poster="https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base text-brand-navy/70 font-medium text-left lg:text-right">
              With Cross the Bridge, you don't start from zero. You operate with a system refined by real-world execution.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
