import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Content, Language } from '../../types';

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
  lang: Language;
  copy: Content['bridgeEffect'];
};

type LocalizedString = { en: string; es: string };

type IndustryOption = {
  key: string;
  label: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  showroomCategories: string[];
  gallery: string[];
};

type GalleryItem = {
  src: string;
  title?: string;
  categoryLabel?: string;
};

const TESTIMONIAL_IMAGES = [
  "/img/testimonials/Wilsonking_outback.jpg",
  "/img/testimonials/CICB_brazil.jpg",
  "/img/testimonials/Mehrdad_jrd_california.jpg",
  "/img/testimonials/BaP_viberg.jpg",
  "/img/testimonials/Chazlyn_Chaz.jpg"
];

type HeroGalleryItem = { src: string; title: string; tag: string };

const HERO_GALLERY: HeroGalleryItem[] = [
  { src: "/img/bridge_effect/B2B CICB.jpg", title: "Hands-on sourcing and production", tag: "Factory & materials" },
  { src: "/img/bridge_effect/Brett Viberg supply chain development.jpg", title: "Leather inspection on-site", tag: "Quality control" },
  { src: "/img/bridge_effect/Embajada Alemania 2023.jpg", title: "Materials moving daily", tag: "Logistics" },
  { src: "/img/bridge_effect/IMG_6036.jpg", title: "Prototyping with partners", tag: "Development" },
  { src: "/img/bridge_effect/Inspeccioncalidad.jpg", title: "Factory floor execution", tag: "Production" },
  { src: "/img/bridge_effect/Mariana_en_outback.jpg", title: "Export-ready packaging", tag: "Export" },
  { src: "/img/bridge_effect/Pat_y_brettviberg_mexico.jpg", title: "Material sourcing", tag: "Sourcing" },
  { src: "/img/bridge_effect/Mariana_en_outback.jpg", title: "Alliance building", tag: "Alliances" }
];

const INDUSTRY_OPTIONS: IndustryOption[] = [
  {
    key: "footwear",
    label: { en: "Footwear", es: "Calzado" },
    title: { en: "Footwear manufacturing", es: "Manufactura de calzado" },
    description: { en: "Goodyear welt, cemented, and stitchdown builds supervised on the factory floor.", es: "Construcciones Goodyear welt, cementado y stitchdown supervisadas directamente en planta." },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    showroomCategories: ["footwear"],
    gallery: [
      "/img/catalog/Footwear1.jpg",
      "/img/catalog/Footwear2.jpg",
      "/img/catalog/Footwear3.jpg"
    ]
  },
  {
    key: "leather",
    label: { en: "Leather", es: "Piel" },
    title: { en: "Leather goods", es: "Artículos de piel" },
    description: { en: "Supple leathers cut, skived, and finished with export-ready QC.", es: "Pieles suaves cortadas, rebajadas y terminadas con control de calidad listo para exportación." },
    image: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&w=1600&q=80",
    showroomCategories: ["leather"],
    gallery: [
      "/img/catalog/Leather1.jpg",
      "/img/catalog/Leather2.jpg",
      "/img/catalog/Leather3.jpg"
    ]
  },
  {
    key: "hats",
    label: { en: "Hats", es: "Sombreros" },
    title: { en: "Fashion & accessories", es: "Moda y accesorios" },
    description: { en: "Accessories crafted with boutique detail and industrial discipline.", es: "Accesorios creados con detalle boutique y disciplina industrial." },
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
    showroomCategories: ["hats"],
    gallery: [
      "/img/catalog/Hats1.jpg",
      "/img/catalog/Hats2.jpg",
      "/img/catalog/Hats3.jpg"
    ]
  },
  // {
  //   key: "industrial",
  //   label: { en: "Industrial", es: "Industrial" },
  //   title: { en: "Industrial components", es: "Componentes industriales" },
  //   description: { en: "Safety-rated components and materials engineered for performance and durability.", es: "Componentes y materiales certificados para seguridad, diseñados para desempeño y durabilidad." },
  //   image: "https://images.unsplash.com/photo-1524275539700-cf51138f6795?auto=format&fit=crop&w=1600&q=80",
  //   showroomCategories: ["industrial"],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80"
  //   ]
  // },
  {
    key: "equestrian",
    label: { en: "Equestrian goods", es: "Bienes ecuestres" },
    title: { en: "Equestrian goods", es: "Bienes ecuestres" },
    description: { en: "Tack, saddlery, and leather components made to withstand real-world use.", es: "Cabezal, sillería y componentes de piel hechos para resistir uso real." },
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    showroomCategories: ["equestrian"],
    gallery: [
      "/img/catalog/Equestrian1.jpg",
      "/img/catalog/Equestrian2.jpg",
      "/img/catalog/Equestrian3.jpg"
    ]
  }
  // {
  //   key: "private_label",
  //   label: { en: "Private label & custom development", es: "Marca privada y desarrollo a medida" },
  //   title: { en: "Private label & custom development", es: "Marca privada y desarrollo a medida" },
  //   description: { en: "Co-created lines, rapid prototyping, and hands-on materials sourcing.", es: "Líneas co-creadas, prototipado ágil y sourcing práctico de materiales." },
  //   image: "https://images.unsplash.com/photo-1524275539700-cf51138f6795?auto=format&fit=crop&w=1600&q=80",
  //   showroomCategories: [],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  //     "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
  //   ]
  // }
];

const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const BridgeEffectSection: React.FC<BridgeEffectSectionProps> = ({ showroom, testimonials, lang, copy }) => {
  const [activeCategory, setActiveCategory] = useState(INDUSTRY_OPTIONS[0]?.key ?? '');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const getText = (value: LocalizedString | string) => {
    if (typeof value === 'string') return value;
    return value[lang] || value.en;
  };

  const testimonialsWithImages = useMemo(() => {
    const fallbacks = TESTIMONIAL_IMAGES;
    return (testimonials || []).map((item, idx) => ({
      ...item,
      image: item.image || fallbacks[idx % fallbacks.length]
    }));
  }, [testimonials]);

  const activeIndustry = useMemo(
    () => INDUSTRY_OPTIONS.find((option) => option.key === activeCategory) || INDUSTRY_OPTIONS[0],
    [activeCategory]
  );

  const filteredItems = useMemo<GalleryItem[]>(() => {
    if (!activeIndustry) return [];
    const items = showroom?.items || [];
    const showroomMatches = activeIndustry.showroomCategories?.length
      ? items.filter((item) => activeIndustry.showroomCategories.includes(item.category))
      : [];
    const showroomGallery = showroomMatches.map((item) => ({
      src: item.image,
      title: item.title,
      categoryLabel: showroom?.categories?.[item.category] || getText(activeIndustry.label) || item.category
    }));
    const fallbackNeeded = Math.max(0, 6 - showroomGallery.length);
    const fallbackGallery = (activeIndustry.gallery || []).slice(0, fallbackNeeded).map((src) => ({
      src
    }));
    const combined = [...showroomGallery, ...fallbackGallery];
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    }).slice(0, 6);
  }, [activeIndustry, showroom?.items, showroom?.categories]);

  useEffect(() => {
    if (!testimonialsWithImages.length) return;
    const id = setInterval(() => {
      setDirection('next');
      setActiveTestimonial((prev) => (prev + 1) % testimonialsWithImages.length);
    }, 4800);
    return () => clearInterval(id);
  }, [testimonialsWithImages.length]);

  if (!showroom || !activeIndustry) return null;

  const testimonial = testimonialsWithImages[activeTestimonial];
  const heroGroups = useMemo(() => {
    const groups: HeroGalleryItem[][] = [];
    for (let i = 0; i < HERO_GALLERY.length; i += 3) {
      const group = HERO_GALLERY.slice(i, i + 3);
      while (group.length < 3) {
        group.push(HERO_GALLERY[(i + group.length) % HERO_GALLERY.length]);
      }
      groups.push(group);
    }
    return groups;
  }, []);
  const heroGroupSequence = useMemo(() => [...heroGroups, ...heroGroups], [heroGroups]);

  return (
    <section id="bridge_effect" className="relative bg-gradient-to-b from-[#071024] via-[#0b1736] to-[#060b18] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-brand-gold/12 blur-[150px]" />
        <div className="absolute bottom-10 right-0 h-[480px] w-[480px] rounded-full bg-white/7 blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:140px_140px] opacity-30" />
        <div className="absolute inset-x-0 top-10 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 space-y-16 md:space-y-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-center overflow-hidden">
          <FadeIn className="space-y-6">
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <Sparkles size={14} /> {copy.badge}
            </div>
            <div className="space-y-4">
              <h2 className="text-[26px] sm:text-[32px] md:text-[48px] font-semibold leading-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                {copy.title}
              </h2>
              <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-white/75 max-w-2xl leading-relaxed">
                {copy.body}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            {/* Mobile static grid */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-3">
                {HERO_GALLERY.slice(0, 4).map((item, idx) => (
                  <div key={`${item.src}-${idx}`} className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                    <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-brand-navy/30" />
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop marquee collage */}
            <div className="relative rounded-3xl overflow-hidden hidden lg:block lg:max-w-[50vw] lg:ml-auto">
              <MotionDiv
                className="flex gap-6 px-4 py-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              >
                {heroGroupSequence.map((group, idx) => {
                  const isReverse = idx % 2 === 1;
                  return (
                    <div
                      key={`hero-group-${idx}`}
                      className={`flex gap-4 min-w-[640px] h-[420px] ${isReverse ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="relative flex-[1.6] h-full overflow-hidden rounded-3xl border border-white/15 bg-black/40">
                        <img src={group[0].src} alt={group[0].title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/10 to-brand-navy/35" />
                      </div>
                      <div className="flex flex-col flex-[1] h-full gap-4 justify-between">
                        <div className="relative w-full aspect-square overflow-hidden rounded-3xl border border-white/15 bg-black/40">
                          <img src={group[1].src} alt={group[1].title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/10 to-brand-navy/35" />
                        </div>
                        <div className="relative w-full aspect-[5/3] overflow-hidden rounded-3xl border border-white/15 bg-black/40">
                          <img src={group[2].src} alt={group[2].title} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/10 to-brand-navy/35" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </MotionDiv>
            </div>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                {/* <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.badge}</p> */}
                <h3 className="text-3xl md:text-4xl font-semibold">{copy.industriesTitle}</h3>
                {/* <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
                  {copy.industriesIntro}
                </p> */}
              </div>
              {/* <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Sparkles size={14} className="text-brand-gold" /> {INDUSTRY_OPTIONS.length} {copy.categoriesSuffix}
              </div> */}
            </div>

            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setActiveCategory(option.key)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] rounded-full border transition-all ${
                    activeCategory === option.key
                      ? 'border-white text-white bg-white/10'
                      : 'border-white/30 text-white/70 hover:text-white'
                  }`}
                >
                  {getText(option.label)}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.selectedLabel}</p>
              <h4 className="text-2xl sm:text-3xl font-semibold">{getText(activeIndustry.title)}</h4>
              <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-white/75 max-w-3xl leading-relaxed">{getText(activeIndustry.description)}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <MotionDiv
                    key={`${item.src}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                  >
                    <img src={item.src} alt={item.title || getText(activeIndustry.title)} className="w-full h-48 md:h-56 object-cover opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                    {item.title ? (
                      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 space-y-1">
                        {item.categoryLabel ? (
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                            {item.categoryLabel}
                          </p>
                        ) : null}
                        <p className="text-sm md:text-base font-semibold text-white leading-tight">{item.title}</p>
                      </div>
                    ) : null}
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
                  {/* <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">{copy.testimonialsBadge}</p> */}
                  <h3 className="text-4xl sm:text-5xl font-semibold leading-tight">{copy.testimonialsTitle}</h3>
                  <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-white/75 max-w-2xl leading-relaxed">
                    {copy.testimonialsSubtitle}
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
                        <Sparkles size={16} /> {copy.storyLabel}
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
                        <p className="text-[12px] sm:text-[13.6px] md:text-[15px] leading-relaxed text-white/85 italic">
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

                  {/* <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  </div> */}
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
