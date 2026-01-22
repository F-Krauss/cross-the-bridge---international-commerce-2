import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

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
};

type MissionPanel = {
  id: string;
  label: string;
  title: string;
  body?: string[];
  list?: string[];
};

const MISSION_PANELS: MissionPanel[] = [
  {
    id: "briefing",
    label: "Mission Briefing",
    title: "Trade missions built on real market time.",
    body: [
      "Our trade missions are built on 20+ years of hands-on participation in the world's most relevant manufacturing and sourcing markets - from Hong Kong to Italy to the United States - helping companies make smarter international decisions and expand with greater reach."
    ]
  },
  {
    id: "agenda",
    label: "Business Agenda",
    title: "Focused agendas with the right partners.",
    body: [
      "We design focused business agendas that connect companies directly with the right suppliers, manufacturers, and commercial partners. Every mission is grounded in real industry experience, trusted international networks, and a clear strategic objective - not generic tours or one-off introductions.",
      "Our trade missions are often built around the world's most relevant trade fairs, using them as strategic accelerators to identify suppliers, validate markets, and open high-level conversations that would otherwise take years to access."
    ]
  },
  {
    id: "benefits",
    label: "Benefits",
    title: "Clarity, speed, and commercial advantage.",
    list: [
      "Direct access to vetted manufacturers and decision-makers",
      "Strategic meetings aligned with your business goals",
      "Cultural and commercial context that reduces risk",
      "Faster learning curves and better international judgment"
    ]
  },
  {
    id: "audience",
    label: "Who it's for",
    title: "Built for founders ready to scale.",
    body: [
      "Designed for founders and business owners looking to scale internationally with clarity, structure, and confidence."
    ]
  }
];

const MISSION_MEDIA = [
  {
    type: "video",
    src: "https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4",
    poster: "https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg",
    alt: "Cargo ship at sea"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200",
    alt: "Trade mission planning"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    alt: "International partners"
  }
];

const TradeMissionsSection: React.FC<TradeMissionsSectionProps> = ({ onCtaClick }) => {
  const [activePanel, setActivePanel] = useState(MISSION_PANELS[0].id);
  const active = MISSION_PANELS.find((panel) => panel.id === activePanel) ?? MISSION_PANELS[0];

  return (
    <section id="trade_missions" className="relative bg-[#1B2440] text-white py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:140px_140px] opacity-30" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              Trade missions & business agendas
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Trade missions & business agendas
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col items-start gap-4">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors shadow-[0_16px_30px_rgba(0,0,0,0.25)]"
            >
              Request a Custom Trade Mission
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">
              International growth, built on experience.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="mt-10">
          <div className="rounded-[32px] bg-transparent">
            <div className="grid gap-8 lg:grid-cols-[0.45fr,1fr] p-6 sm:p-8 md:p-10">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  Select a briefing
                </p>
                <div className="grid gap-3">
                  {MISSION_PANELS.map((panel, idx) => {
                    const isActive = panel.id === activePanel;
                    return (
                      <button
                        key={panel.id}
                        type="button"
                        onClick={() => setActivePanel(panel.id)}
                        aria-pressed={isActive}
                        className={`group w-full rounded-2xl border border-dashed px-4 py-3 text-left transition-all ${
                          isActive
                            ? "border-white/40 bg-white/10 text-white shadow-lg"
                            : "border-white/20 bg-white/5 text-white/70 hover:border-white/50 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold tracking-[0.22em] ${
                            isActive ? "text-brand-gold" : "text-brand-gold/80"
                          }`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em]">
                            {panel.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <MotionDiv
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      {active.label}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                      {active.title}
                    </h3>
                    {active.body && (
                      <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
                        {active.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    {active.list && (
                      <div className="grid gap-3 sm:grid-cols-2 text-sm text-white/70">
                        {active.list.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-brand-gold" />
                            <p>{benefit}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </MotionDiv>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory">
            {MISSION_MEDIA.map((item, idx) => (
              <div
                key={`${item.type}-${idx}`}
                className="relative min-w-[230px] sm:min-w-[260px] md:min-w-[300px] lg:min-w-0 lg:flex-1 snap-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
                  {item.type === "video" ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      data-autoplay
                      poster={item.poster}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/45 via-transparent to-transparent" />
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
