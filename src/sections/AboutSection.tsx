import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';

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

const FOUNDER_BIO = [
  "Mariana Muciño is the founder of Cross the Bridge. She began her career in international business at 23 and has spent two decades living and working across global markets, leading manufacturing and sourcing projects on five continents. This experience allows her to help companies simplify international expansion, providing the clarity, structure, and trusted resources they need to grow with confidence.",
  "Rather than acting as a traditional consultant, Mariana builds long-term strategic alliances, working side by side with founders and teams. Through her experience and global network, clients do not start from zero - they move forward with the right partners, clearer decisions, and a stronger foundation for sustainable international growth."
];

const DIFFERENTIATOR_ITEMS = [
  {
    title: "Strategic partner, not an intermediary",
    body: "Cross the Bridge is not an intermediary. We are a strategic partner embedded in Mexico's most competitive manufacturing ecosystem."
  },
  {
    title: "Hands-on execution and accountability",
    body: "We help brands reduce risk, gain control, and scale production in Mexico by combining direct access to vetted manufacturers, hands-on execution, and clear accountability across the entire production cycle."
  },
  {
    title: "Side-by-side collaboration",
    body: "Rather than managing processes from a distance, we work side by side with founders and teams throughout development, production, and expansion. This proximity enables faster decisions, fewer costly mistakes, and real ownership at every stage."
  },
  {
    title: "Vetted network from day one",
    body: "Our clients do not start from zero. Every project is built on factories, suppliers, and partners we already know, have vetted, and have successfully worked with. This gives brands an operational foundation from day one - not a trial-and-error learning curve."
  },
  {
    title: "Connection that accelerates growth",
    body: "Beyond structure and strategy, our value lies in connection. We connect our clients to a trusted network of manufacturers, suppliers, and business leaders who operate with shared standards of quality, responsibility, and long-term vision - accelerating growth through alignment, not guesswork."
  }
];

const CLIENT_OUTCOMES = [
  {
    title: "Direct access, not intermediaries",
    body: "Hands-on collaboration with vetted factories and key suppliers across the full value chain."
  },
  {
    title: "End-to-end coordination under one lead",
    body: "Product development, production, quality control, and cross-border logistics managed with clarity and accountability."
  },
  {
    title: "Operational clarity and risk control",
    body: "A single point of responsibility across factories, exporters, and regulatory requirements."
  },
  {
    title: "Built for long-term scale",
    body: "Support from early development to repeatable, scalable production inside Mexico's most established manufacturing hub."
  }
];

const LEON_PARAGRAPHS = [
  "For generations, León has been the heart of Latin America's leather, footwear, and fashion industry. Expertise here is built across generations, refined through disciplined manufacturing, and scaled for global markets.",
  "Today, Guanajuato exports nearly 40 million pairs of footwear annually, positioning León among the world's leading leather footwear production hubs. Manufacturers in the region are recognized for both scale and technical specialization, including heritage constructions such as Goodyear Welt trusted by international brands.",
  "\"Made in León, Guanajuato\" represents more than origin. It signals a manufacturing ecosystem where craftsmanship, technical execution, and export readiness coexist at scale.",
  "CTB operates within this ecosystem, connecting high-performing family manufacturers with international brands seeking controlled growth and resilient supply chains. León provides the manufacturing advantage. CTB delivers the structure and execution that turn it into measurable performance."
];

const LEON_POINTS = [
  {
    title: "Deep manufacturing roots",
    body: "Generations of family-owned SMEs specialized in leather, footwear, and fashion."
  },
  {
    title: "Proven global export performance",
    body: "Approximately 40 million pairs exported annually to more than 30 international markets."
  },
  {
    title: "Technical specialization",
    body: "Advanced constructions, precision components, and complex assemblies requiring skilled labor and mature processes."
  },
  {
    title: "Strategic logistics advantage",
    body: "Access to major U.S. border crossings and both Pacific and Gulf ports, enabling exports to Texas in 3-5 days."
  },
  {
    title: "Nearshoring that truly works",
    body: "A vertically integrated supply chain concentrated within a single industrial cluster, reducing lead times and operational risk."
  }
];

const AboutSection = () => {
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
          <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">About</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0b2f6b]">
            Our Founder
          </h2>
          {/* <p className="text-sm sm:text-base md:text-lg text-brand-navy/70">
            Visionary leadership driving global connections.
          </p> */}
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="group rounded-[32px] border border-slate-200 bg-white p-6 pb-10 md:p-10 shadow-[0_30px_60px_rgba(15,23,42,0.08)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] items-center">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                  <img
                    src="/img/about/MarianaBio.PNG"
                    alt="Mariana Muciño"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f6b]/45 via-transparent to-transparent transition-all duration-700 group-hover:from-[#0b2f6b]/55" />
                </div>
                <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 px-5 py-3 shadow-lg transition-all duration-500 group-hover:bg-white group-hover:shadow-xl">
                  <p className="text-sm font-semibold text-[#0b2f6b]">Mariana Muciño Del Rio</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    International Negotiation & Strategic Planning
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">Founder story</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0b2f6b]">
                    Visionary leadership driving global connections.
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-brand-navy/70 leading-relaxed">
                  {FOUNDER_BIO[0]}
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
                      {FOUNDER_BIO[1]}
                    </MotionDiv>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setBioExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2f6b] hover:text-brand-gold transition-colors"
                >
                  {bioExpanded ? "Collapse bio" : "Read full bio"}
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
                <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  What makes Cross the Bridge truly different
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0b2f6b]">
                  Strategic partnership with measurable control.
                </h3>
                <p className="text-sm sm:text-base text-brand-navy/70 leading-relaxed">
                  Each point below expands into the specific ways we reduce risk, accelerate decisions, and keep you in control.
                </p>
              </div>

              <div className="-mx-2 flex gap-4 overflow-x-auto pb-2 px-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:flex-col sm:gap-4 sm:overflow-visible sm:pb-0 sm:snap-none">
                {DIFFERENTIATOR_ITEMS.map((item, idx) => {
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
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                            0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-[#0b2f6b]">{item.title}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-navy/50">
                          {isActive ? "Open" : "View"}
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
                            <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed">
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
              <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                What this means for our clients
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0b2f6b]">
                Clear outcomes with one accountable partner.
              </h3>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {CLIENT_OUTCOMES.map((item, idx) => (
                <div
                  key={item.title}
                  className="min-w-0"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    0{idx + 1}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#0b2f6b]">{item.title}</p>
                  <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">{item.body}</p>
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
                <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                  Why León, Guanajuato?
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0b2f6b]">
                  Where global craftsmanship meets industrial scale
                </h3>
                <div className="flex flex-wrap gap-4 text-[15px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  <span>40M pairs exported annually</span>
                  <span>5 days logistic door to door</span>
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">Scale signal</p>
                  <p className="text-base font-semibold text-white">40M pairs exported annually</p>
                </div>
              </MotionDiv>

              <div className="space-y-6 hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80"
                  alt="Leather crafting"
                  className="w-full object-cover h-[320px]"
                />
                <img
                  src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1500&q=80"
                  alt="Factory environment"
                  className="w-full object-cover h-[320px]"
                />
              </div>

              <div className="space-y-10">
                <div className="grid gap-6">
                  {LEON_PARAGRAPHS.map((paragraph, idx) => (
                    <FadeIn key={`${paragraph}-${idx}`} delay={idx * 0.04}>
                      <p
                        className={`leading-relaxed ${
                          idx === 0
                            ? "text-lg md:text-xl font-medium text-[#0b2f6b]"
                            : "text-sm sm:text-base text-brand-navy/70"
                        }`}
                      >
                        {paragraph}
                      </p>
                    </FadeIn>
                  ))}
                </div>
                <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] items-start">
                  <div className="space-y-3">
                    <p className="text-[15px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                      Manufacturing advantages
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
                        <p className="text-3xl font-semibold text-[#0b2f6b]">
                          {LEON_POINTS[activeLeonPoint].title}
                        </p>
                        <p className="text-sm sm:text-base text-brand-navy/70 leading-relaxed">
                          {LEON_POINTS[activeLeonPoint].body}
                        </p>
                      </MotionDiv>
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                    {LEON_POINTS.map((item, idx) => {
                      const isActive = activeLeonPoint === idx;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveLeonPoint(idx)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center gap-4 pb-3 border-b border-[#0b2f6b]/10">
                            <span className={`text-2xl font-semibold ${
                              isActive ? "text-brand-gold" : "text-brand-navy/20"
                            }`}>
                              0{idx + 1}
                            </span>
                            <span className={`text-sm sm:text-base font-semibold ${
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
