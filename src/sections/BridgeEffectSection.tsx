import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Content, Language } from '../../types';
import { BRIDGE_HERO_GALLERY, BRIDGE_INDUSTRY_OPTIONS, BRIDGE_TESTIMONIAL_IMAGES } from '../../constants';

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

const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase();
};

const splitTestimonialText = (text: string): { highlight: string; body: string } => {
  const cleaned = text.trim();
  if (!cleaned) return { highlight: '', body: '' };
  const match = cleaned.match(/(.+?[.!?])\s+(.*)/);
  if (!match) return { highlight: cleaned, body: '' };
  return { highlight: match[1], body: match[2] };
};

const BridgeEffectSection: React.FC<BridgeEffectSectionProps> = ({ showroom, testimonials, lang, copy }) => {
  const [activeCategory, setActiveCategory] = useState(BRIDGE_INDUSTRY_OPTIONS[0]?.key ?? '');

  const getText = (value: LocalizedString | string) => {
    if (typeof value === 'string') return value;
    return value[lang] || value.en;
  };

  const testimonialsWithImages = useMemo(() => {
    const fallbacks = BRIDGE_TESTIMONIAL_IMAGES;
    return (testimonials || []).map((item, idx) => ({
      ...item,
      image: item.image || fallbacks[idx % fallbacks.length]
    }));
  }, [testimonials]);

  const activeIndustry = useMemo(
    () => BRIDGE_INDUSTRY_OPTIONS.find((option) => option.key === activeCategory) || BRIDGE_INDUSTRY_OPTIONS[0],
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

  if (!showroom || !activeIndustry) return null;

  const marqueeTestimonials = useMemo(() => {
    if (!testimonialsWithImages.length) return [];
    return [...testimonialsWithImages, ...testimonialsWithImages];
  }, [testimonialsWithImages]);
  const collageItems = BRIDGE_HERO_GALLERY.slice(0, 6);

  return (
    <section id="bridge_effect" className="relative bg-gradient-to-b from-[#071024] via-[#0b1736] to-[#060b18] text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-brand-gold/12 blur-[150px]" />
        <div className="absolute bottom-10 right-0 h-[480px] w-[480px] rounded-full bg-white/7 blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:140px_140px] opacity-30" />
        <div className="absolute inset-x-0 top-10 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 space-y-16 md:space-y-24">
        <div className="space-y-10 lg:space-y-12">
          <FadeIn className="space-y-6">
            <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.22em] text-brand-gold">
              <Sparkles size={14} /> {copy.badge}
            </div>
            <div className="space-y-4">
              <h2 className="text-[26px] sm:text-[32px] md:text-[48px] font-semibold leading-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                {copy.title}
              </h2>
              <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-white/75 leading-relaxed whitespace-pre-line">
                {copy.body}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="w-full grid grid-cols-2 md:grid-cols-12 md:grid-rows-6 md:min-h-[540px] lg:min-h-[660px] xl:min-h-[720px] gap-4 md:gap-5">
              {collageItems.map((item, idx) => {
                const layoutClasses = [
                  "col-span-2 aspect-[4/3] md:col-span-5 md:row-span-6 md:aspect-auto",
                  "col-span-1 aspect-[4/3] md:col-span-4 md:row-span-3 md:col-start-6 md:row-start-1 md:aspect-auto",
                  "col-span-1 aspect-[4/3] md:col-span-3 md:row-span-2 md:col-start-10 md:row-start-1 md:aspect-auto",
                  "col-span-1 aspect-[4/3] md:col-span-3 md:row-span-2 md:col-start-10 md:row-start-3 md:aspect-auto",
                  "col-span-1 aspect-[4/3] md:col-span-4 md:row-span-3 md:col-start-6 md:row-start-4 md:aspect-auto",
                  "col-span-2 aspect-[4/3] md:col-span-3 md:row-span-2 md:col-start-10 md:row-start-5 md:aspect-auto"
                ];
                return (
                  <div
                    key={`${item.src}-${idx}`}
                    className={`relative w-full overflow-hidden rounded-3xl border border-white/12 bg-black/30 ${layoutClasses[idx] || "col-span-1 aspect-[4/3] md:col-span-3 md:row-span-2 md:aspect-auto"}`}
                  >
                    <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/10 to-brand-navy/35" />
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
        {/* <FadeIn>
          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-semibold">{copy.industriesTitle}</h3>

              </div>
            
            </div>

            <div className="flex flex-wrap gap-2">
              {BRIDGE_INDUSTRY_OPTIONS.map((option) => (
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
        </FadeIn> */}

        {testimonialsWithImages.length ? (
          <FadeIn delay={0.08}>
            <div className="mt-20 md:mt-25">
              <div className="relative p-0 sm:p-0 md:p-0">
                <div className="relative z-10 space-y-10">
                  <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-semibold leading-tight">{copy.testimonialsTitle}</h3>
                    <p className="text-[12px] sm:text-[13.6px] md:text-[15px] text-brand-gold leading-relaxed">
                      {copy.testimonialsSubtitle}
                    </p>
                  </div>

                  <div className="relative overflow-hidden">
                    <style>
                      {`
                        @keyframes testimonial-marquee {
                          0% { transform: translateX(0); }
                          100% { transform: translateX(-50%); }
                        }
                      `}
                    </style>
                    <div
                      className="flex w-max gap-6"
                      style={{ animation: 'testimonial-marquee 60s linear infinite' }}
                    >
                      {marqueeTestimonials.map((item, idx) => {
                        const { highlight, body } = splitTestimonialText(item.text);
                        const initials = getInitials(item.name);
                        const hasImage = item.image && item.image.trim() !== '';
                        return (
                          <div
                            key={`${item.name}-${idx}`}
                            className="relative flex h-full min-w-[280px] max-w-[320px] flex-col gap-5 rounded-3xl p-2 sm:p-3 md:min-w-[320px] md:max-w-[360px]"
                          >
                            <span className="text-3xl text-white/30 leading-none">“</span>
                            <p className="text-[14.5px] md:text-[16px] font-medium text-white/90 leading-snug">
                              {highlight}
                            </p>
                            {body ? (
                              <p
                                className="text-[12px] sm:text-[13px] text-white/70 leading-relaxed"
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {body}
                              </p>
                            ) : null}
                            <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                              <div className="space-y-1">
                                <p className="text-sm font-semibold text-white">{item.name}</p>
                                <p className="text-[12px] text-white/60">{item.role}</p>
                                <p className="text-[11px] text-white/50 flex items-center gap-1">
                                  <span className="text-sm">{getCountryFlag(item.countryCode || '')}</span>
                                  {item.country}
                                </p>
                              </div>
                              {hasImage ? (
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                                  <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/35" />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/80">
                                  {initials}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
};

export default BridgeEffectSection;
