import React, { useEffect, useRef, useState } from 'react';
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

type MediaItem = {
  src: string;
  alt: string;
};

type MissionPanel = {
  id: string;
  label: string;
  title: string;
  body?: string[];
  list?: string[];
  media: MediaItem;
};

const MISSION_PANELS: MissionPanel[] = [
  {
    id: "briefing",
    label: "Mission Briefing",
    title: "Trade missions built on real market time.",
    body: [
      "Our trade missions are built on 20+ years of hands-on participation in the world's most relevant manufacturing and sourcing markets - from Hong Kong to Italy to the United States - helping companies make smarter international decisions and expand with greater reach."
    ],
    media: { 
      src: "https://www.vecteezy.com/video/46549926-two-businessman-passengers-sitting-in-airplane-cabin-and-working-on-laptop-together-businessman-in-brown-suit-showing-project-on-notebook-to-businessman-with-eyeglasses-business-and-travel-concept",
      alt: "Port containers"
    }
  },
  {
    id: "agenda",
    label: "Business Agenda",
    title: "Focused agendas with the right partners.",
    body: [
      "We design focused business agendas that connect companies directly with the right suppliers, manufacturers, and commercial partners. Every mission is grounded in real industry experience, trusted international networks, and a clear strategic objective - not generic tours or one-off introductions.",
      "Our trade missions are often built around the world's most relevant trade fairs, using them as strategic accelerators to identify suppliers, validate markets, and open high-level conversations that would otherwise take years to access."
    ],
    media: {
      src: "https://www.vecteezy.com/video/42647396-young-friends-hanging-social-media-concept",
      alt: "Agenda setting with charts"
    }
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
    ],
    media: {
      src: "../video/trade-missions/Proceso4.mp4",
      alt: "Team collaborating over plans"
    }
  },
  {
    id: "audience",
    label: "Who it's for",
    title: "Built for founders ready to scale.",
    body: [
      "Designed for founders and business owners looking to scale internationally with clarity, structure, and confidence."
    ],
    media: {
      src: "../video/trade-missions/Proceso5.mp4",
      alt: "CEO shaking hands"
    }
  }
];

const AUTO_ROTATE_MS = 4000;

const TradeMissionsSection: React.FC<TradeMissionsSectionProps> = ({ onCtaClick }) => {
  const [activePanel, setActivePanel] = useState(MISSION_PANELS[0].id);
  const active = MISSION_PANELS.find((panel) => panel.id === activePanel) ?? MISSION_PANELS[0];
  const activeIndex = MISSION_PANELS.findIndex((panel) => panel.id === active.id);
  const autoTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    autoTimer.current = setInterval(() => {
      setActivePanel((prev) => {
        const currentIndex = MISSION_PANELS.findIndex((panel) => panel.id === prev);
        const nextIndex = (currentIndex + 1) % MISSION_PANELS.length;
        return MISSION_PANELS[nextIndex].id;
      });
    }, AUTO_ROTATE_MS);

    return () => {
      if (autoTimer.current) {
        clearInterval(autoTimer.current);
      }
    };
  }, []);
 

  return (
    <section id="trade_missions" className="relative bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#0f1729] text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-gold/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100px_100px] opacity-40" />
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
            <div className="grid gap-8 lg:grid-cols-[0.5fr,1fr] p-6 sm:p-8 md:p-10">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                  Select a briefing
                </p>
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-[0.7,0,0.3,1]"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {MISSION_PANELS.map((panel, idx) => {
                      const isActive = panel.id === activePanel;
                      return (
                        <button
                          key={panel.id}
                          type="button"
                          onClick={() => setActivePanel(panel.id)}
                        className="min-w-full shrink-0 group"
                        >
                          <div className="relative px-1 sm:px-3 text-left">
                            <div className="relative h-48 sm:h-60 lg:h-72 overflow-hidden rounded-[36px] shadow-[0_30px_60px_rgba(5,10,25,0.35)]">
                              <img
                                src={panel.media.src}
                                alt={panel.media.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            </div>
                            <div className="mt-5 flex items-center gap-3">
                              <span className={`text-sm font-bold tracking-[0.24em] ${isActive ? "text-brand-gold" : "text-white/60"}`}>
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className={`text-base font-semibold uppercase tracking-[0.22em] ${isActive ? "text-white" : "text-white/60"}`}>
                                {panel.label}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
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
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white">
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
                      <div className="grid gap-4 sm:grid-cols-2 text-base sm:text-lg font-medium text-white/85">
                        {active.list.map((benefit, idx) => (
                          <div key={benefit} className="flex items-start gap-4">
                            <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/50 text-[10px] font-bold tracking-[0.2em] text-brand-gold">
                              0{idx + 1}
                            </span>
                            <p className="leading-relaxed">{benefit}</p>
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
      </div>
    </section>
  );
};

export default TradeMissionsSection;
