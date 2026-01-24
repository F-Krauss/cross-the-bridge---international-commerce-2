import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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

type ShowroomItem = {
  id: number;
  category: string;
  title: string;
  image: string;
};

type ShowroomContent = {
  title: string;
  subtitle?: string;
  categories: Record<string, string>;
  items: ShowroomItem[];
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
  country: string;
  countryCode?: string;
  image?: string;
};

type BridgeEffectSectionProps = {
  showroom: ShowroomContent;
  testimonials: Testimonial[];
};

const TESTIMONIAL_IMAGES = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80"
];

const INDUSTRY_CARDS = [
  {
    title: "Footwear manufacturing",
    impact: "Goodyear welt, cemented, and stitchdown builds supervised on the factory floor.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Leather goods",
    impact: "Supple leathers cut, skived, and finished with export-ready QC.",
    image: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Fashion & accessories",
    impact: "Accessories crafted with boutique detail and industrial discipline.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Private label & custom development",
    impact: "Co-created lines, rapid prototyping, and hands-on materials sourcing.",
    image: "https://images.unsplash.com/photo-1524275539700-cf51138f6795?auto=format&fit=crop&w=1600&q=80"
  }
];

const ambientImage = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80";

const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const BridgeEffectSection: React.FC<BridgeEffectSectionProps> = ({ showroom, testimonials }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const testimonialsWithImages = useMemo(() => {
    const fallbacks = TESTIMONIAL_IMAGES;
    return (testimonials || []).map((item, idx) => ({
      ...item,
      image: item.image || fallbacks[idx % fallbacks.length]
    }));
  }, [testimonials]);

  const filteredItems = useMemo(() => {
    const items = showroom?.items || [];
    return activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory);
  }, [activeCategory, showroom?.items]);

  useEffect(() => {
    if (!testimonialsWithImages.length) return;
    const id = setInterval(() => {
      setDirection('next');
      setActiveTestimonial((prev) => (prev + 1) % testimonialsWithImages.length);
    }, 4800);
    return () => clearInterval(id);
  }, [testimonialsWithImages.length]);

  if (!showroom) return null;

  const testimonial = testimonialsWithImages[activeTestimonial];
  const categoryOrder = ['all', 'footwear', 'leather', 'hats', 'industrial'];

  return (
    <section id="bridge_effect" className="relative bg-gradient-to-b from-[#071024] via-[#0b1736] to-[#060b18] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-brand-gold/12 blur-[150px]" />
        <div className="absolute bottom-10 right-0 h-[480px] w-[480px] rounded-full bg-white/7 blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:140px_140px] opacity-30" />
        <div className="absolute inset-x-0 top-10 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 space-y-16 md:space-y-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-center">
          <FadeIn className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <Sparkles size={14} /> The bridge effect
            </div>
            <div className="space-y-4">
              <h2 className="text-[30px] sm:text-[38px] md:text-[48px] font-semibold leading-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                Cross the bridge without fear.
              </h2>
              <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
                Real factories, real materials, and a partner who lives on the ground. We combine candid factory time with curated categories so you see how your product moves from concept to export-ready reality.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {INDUSTRY_CARDS.slice(0, 2).map((item) => (
                <div key={item.title} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{item.title}</p>
                  <p className="text-sm text-white/75 leading-relaxed">{item.impact}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              {categoryOrder.map((cat) => (
                <span key={cat} className="px-2 py-1 border-b border-white/30">
                  {showroom.categories?.[cat] || cat}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative h-[360px] sm:h-[440px] overflow-hidden rounded-[26px] shadow-[0_30px_120px_rgba(0,0,0,0.35)] border border-white/10">
              <img src={ambientImage} alt="Factory floor" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-brand-navy/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold mb-2">Ambient</p>
                <h3 className="text-2xl md:text-3xl font-semibold">Hands-on sourcing and production</h3>
                <p className="text-sm text-white/75 mt-2 max-w-xl">
                  Materials moving, hands working, and production cycles we oversee daily.
                </p>
              </div>
              <div className="absolute top-6 right-6 text-xs font-semibold text-white/80 bg-black/30 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                Factory & materials
              </div>
              <div className="absolute -left-12 top-10 w-28 h-28 rounded-full bg-brand-gold/25 blur-3xl opacity-40" />
              <div className="absolute -right-8 bottom-10 w-32 h-32 rounded-full bg-white/15 blur-3xl opacity-30" />
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="space-y-2">
                {/* <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">Industries we work with</p> */}
                <h3 className="text-3xl md:text-4xl font-semibold">Industries we work with</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Sparkles size={14} className="text-brand-gold" /> 4 core industries
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-5">
              {INDUSTRY_CARDS.map((item, idx) => {
                const layout =
                  idx === 0 ? "lg:col-span-2 lg:row-span-2" :
                  idx === 3 ? "lg:col-span-2" :
                  "";
                return (
                  <MotionDiv
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.04, duration: 0.4 }}
                    className={`relative overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] ${layout}`}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-transparent mix-blend-screen" />
                    <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">0{idx + 1}</p>
                      <h4 className="text-lg md:text-xl font-semibold text-white leading-tight">{item.title}</h4>
                      <p className="text-sm text-white/80 leading-relaxed max-w-lg">{item.impact}</p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Showroom snapshots</p>
                <h3 className="text-3xl sm:text-4xl font-semibold text-white">Categories built with our partners</h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categoryOrder.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] rounded-full border transition-all ${
                      activeCategory === cat
                        ? 'border-white text-white'
                        : 'border-white/30 text-white/70 hover:text-white'
                    }`}
                  >
                    {showroom.categories?.[cat] || cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <MotionDiv
                    key={`${item.id}-${item.category}`}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-48 md:h-56 object-cover opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                        {showroom.categories?.[item.category] || item.category}
                      </p>
                      <p className="text-sm md:text-base font-semibold text-white leading-tight">{item.title}</p>
                    </div>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        {testimonial && (
          <FadeIn delay={0.08}>
            <div className="space-y-10">
              <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 lg:gap-14 items-start">
                <div className="space-y-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Trusted by over 100 businesses worldwide</p>
                  <h3 className="text-4xl sm:text-5xl font-semibold leading-tight">Real voices from both sides of the bridge</h3>
                  <p className="text-base text-white/75 max-w-2xl leading-relaxed">
                    Founders, operators, and industry leaders who rely on our on-the-ground partnership.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDirection('prev');
                        setActiveTestimonial((prev) => (prev - 1 + testimonialsWithImages.length) % testimonialsWithImages.length);
                      }}
                      className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20 transition"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDirection('next');
                        setActiveTestimonial((prev) => (prev + 1) % testimonialsWithImages.length);
                      }}
                      className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20 transition"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <MotionDiv
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: direction === 'next' ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction === 'next' ? -16 : 16 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-brand-gold text-sm font-bold tracking-[0.16em] uppercase">
                        <Sparkles size={16} /> Story
                      </div>
                      <div className="grid md:grid-cols-[0.9fr,1.1fr] gap-4 items-center">
                        <MotionDiv
                          key={`${testimonial.name}-photo`}
                          initial={{ opacity: 0.75, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35 }}
                          className="relative w-full h-[220px] md:h-[260px] overflow-hidden rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] border border-white/10"
                        >
                          <img src={testimonial.image} alt={testimonial.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </MotionDiv>
                        <p className="text-lg sm:text-xl leading-relaxed text-white/85 italic">
                          “{testimonial.text}”
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-white/70">{testimonial.role}</p>
                          <p className="text-xs text-white/60 flex items-center gap-1">
                            <span>{getCountryFlag(testimonial.countryCode || '')}</span>
                            {testimonial.country}
                          </p>
                        </div>
                      </div>
                    </MotionDiv>
                  </AnimatePresence>

                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {testimonialsWithImages.map((item, idx) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          setDirection(idx > activeTestimonial ? 'next' : 'prev');
                          setActiveTestimonial(idx);
                        }}
                        className={`text-left rounded-full border px-3 py-2 transition-all ${
                          idx === activeTestimonial
                            ? 'border-white text-white'
                            : 'border-white/20 text-white/70 hover:text-white'
                        }`}
                      >
                        <p className="text-[11px] font-semibold">{item.name}</p>
                        <p className="text-[10px] text-white/60 truncate">{item.country}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default BridgeEffectSection;
