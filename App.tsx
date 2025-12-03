
import React, { useState, useEffect, useRef } from 'react';
import { Package, Globe, Layers, ArrowRight, CheckCircle, Phone, Mail, Menu, X, Users, Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Circle, Scissors, Shirt, GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, MousePointer2, Home, Briefcase, Settings, Award, MessageSquare, ShoppingBag, Send, Target, FileText, Shield, Ship, Compass, RotateCcw, ChevronUp, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

// Assets served from public/img
const mapImage = '/img/world-map.svg';
const logoVertical = '/img/CTB_vertical.png';
const processImg1 = '/img/process2.jpg';
const processImg3 = '/img/process4.jpg';
const teamPortrait = '/img/1696903720042.jpeg';

// --- Type Fixes for Framer Motion ---
const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionSpan = motion.span as any;

// --- Visual Assets ---

const GridPattern = ({ color = "#1B2440", opacity = 0.08 }) => (
  <div className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity: opacity,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: '60px 60px'
    }}
  />
);

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

const GlowingOrb = ({ className, color = "bg-blue-200" }: { className?: string, color?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${color} ${className}`} />
);

const MailStamp = ({ className, text = "AIR MAIL", color = "border-brand-navy/20 text-brand-navy/20" }: { className?: string, text?: string, color?: string }) => (
  <div className={`absolute pointer-events-none border-4 rounded-lg px-4 py-2 font-bold uppercase tracking-widest text-xs md:text-sm rotate-12 mix-blend-overlay z-10 ${color} ${className}`} style={{ borderStyle: 'double' }}>
    <div className="flex items-center gap-2">
      <Globe size={16} />
      <span>{text}</span>
    </div>
  </div>
);

// --- Components ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'right' | 'left' | 'down';
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Retrigger animation when scrolling back

  const initial = direction === 'up' ? { opacity: 0, y: 40 } :
    direction === 'down' ? { opacity: 0, y: -40 } :
      direction === 'left' ? { opacity: 0, x: -40 } :
        { opacity: 0, x: 40 };

  const animate = direction === 'up' ? { opacity: 1, y: 0 } :
    direction === 'down' ? { opacity: 1, y: 0 } :
      direction === 'left' ? { opacity: 1, x: 0 } :
        { opacity: 1, x: 0 };

  return (
    <MotionDiv
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} // Smooth cubic-bezier
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

// Counter Component for Stats
type CounterProps = { value: string; label: string; className?: string; dark?: boolean };
const Counter: React.FC<CounterProps> = ({ value, label, className, dark = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // 1. Create MotionValue
  const count = useMotionValue(0);

  // 2. Create Spring that follows MotionValue
  const springValue = useSpring(count, { stiffness: 50, damping: 20 });

  // 3. Transform Spring to rounded number for display
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  // Extract number and prefix/suffix
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : '';

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count]);

  return (
    <div ref={ref} className={`text-center group hover:scale-105 transition-transform duration-500 ${className}`}>
      <div className={`flex justify-center items-baseline text-6xl md:text-8xl font-black mb-2 ${dark ? 'text-brand-navy' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50'}`}>
        <span>{prefix}</span>
        <MotionSpan>{rounded}</MotionSpan>
        <span>{suffix}</span>
      </div>
      <div className={`text-xs font-bold uppercase tracking-widest ${dark ? 'text-brand-gold' : 'text-brand-gold'}`}>{label}</div>
    </div>
  );
};

// Global Map Component
const GlobalMap = ({ title, darkTheme = false }: { title: string, darkTheme?: boolean }) => {
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true });
  const [mapFailed, setMapFailed] = useState(false);

  const markers = [
    { top: '26%', left: '19%', label: 'USA' },
    { top: '10%', left: '20%', label: 'Canada' },
    { top: '63%', left: '32%', label: 'Brasil' },
    { top: '62%', left: '55%', label: 'Sudáfrica' },
    { top: '75%', left: '88%', label: 'Australia' },
    { top: '72%', left: '96.5%', label: 'Nueva Zelanda' },
    { top: '37%', left: '84%', label: 'Taiwán' },
    { top: '26%', left: '88%', label: 'Japón' },
    { top: '45%', left: '79.5%', label: 'Vietnam' },
    { top: '42%', left: '78%', label: 'Tailandia' },
    { top: '38%', left: '81.5%', label: 'Hong Kong' },
    { top: '30%', left: '78%', label: 'China' },
    { top: '40%', left: '71.5%', label: 'India' },
    { top: '40%', left: '77%', label: 'Laos' },
    { top: '49%', left: '78%', label: 'Singapur' },
    { top: '48%', left: '77.6%', label: 'Kuala Lumpur' },
    { top: '26%', left: '50.7%', label: 'Italia' },
    { top: '29%', left: '46.5%', label: 'España' },
    { top: '29%', left: '45%', label: 'Portugal' },
    { top: '20.2%', left: '50%', label: 'Alemania' },
    { top: '18.5%', left: '46.7%', label: 'Inglaterra' },
    { top: '78%', left: '27%', label: 'Chile' },
    { top: '55%', left: '78.8%', label: 'Indonesia' },
  ];

  return (
    <div ref={mapRef} className="w-full relative mt-12 mb-20">
      <div
        className={`relative aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden border shadow-2xl group ${
          darkTheme ? 'bg-[#111] border-white/10' : 'bg-white border-gray-100'
        }`}
      >
        {!mapFailed && (
          <img
            src={mapImage}
            loading="lazy"
            onError={() => setMapFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-105 group-hover:scale-110 ${
              darkTheme ? 'opacity-30 invert' : 'opacity-10'
            }`}
            alt="World Map"
          />
        )}

        {markers.map((m, i) => (
          <MotionDiv
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
            className="absolute w-2 h-2 md:w-2 md:h-2 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(196,166,97,0.8)] cursor-pointer hover:scale-150 transition-transform z-10"
            style={{ top: m.top, left: m.left }}
          >
            <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
              {m.label}
            </div>
          </MotionDiv>
        ))}

        <div
          className={`hidden md:block absolute bottom-6 left-6 md:bottom-12 md:left-12 px-6 py-4 rounded-xl border z-20 ${
            darkTheme
              ? 'bg-black/60 border-white/10 backdrop-blur-md'
              : 'bg-white/80 border-gray-200 backdrop-blur-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
            <span
              className={`font-bold text-sm md:text-lg tracking-wide uppercase ${
                darkTheme ? 'text-white' : 'text-brand-navy'
              }`}
            >
              {title}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 px-6 py-4 rounded-xl border md:hidden ${
          darkTheme
            ? 'bg-black/60 border-white/10 backdrop-blur-md'
            : 'bg-white/80 border-gray-200 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
          <span
            className={`font-bold text-sm tracking-wide uppercase ${
              darkTheme ? 'text-white' : 'text-brand-navy'
            }`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

// Nav Link Component
const NavLink = ({ href, children, isActive, onClick }: { href: string, children: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`relative text-xs font-medium tracking-wide uppercase transition-all duration-300 px-3 py-2 ${isActive ? 'text-brand-gold font-bold scale-110' : 'text-white/60 hover:text-white'
      }`}
  >
    {children}
    {isActive && (
      <MotionDiv layoutId="activeNav" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold" />
    )}
  </button>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <MotionDiv
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-brand-navy text-white overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <GridPattern color="#FFFFFF" opacity={0.05} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-brand-navy shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <img src={logoVertical} alt="Cross The Bridge" className="w-14 h-14 object-contain" />
          </MotionDiv>
          {/* Orbiting element */}
          <MotionDiv
            className="absolute inset-0 border-2 border-dashed border-brand-gold/30 rounded-full w-[140%] h-[140%] -top-[20%] -left-[20%]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Text Reveal */}
        <div className="overflow-hidden mb-2">
          <MotionDiv
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-white">
              Cross The Bridge
            </h1>
          </MotionDiv>
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-brand-gold text-xs font-bold tracking-widest uppercase"
        >
          International Commerce
        </MotionDiv>

        {/* Loading Bar */}
        <div className="mt-12 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <MotionDiv
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-brand-gold shadow-[0_0_10px_#C4A661]"
          />
        </div>
      </div>
    </MotionDiv>
  );
};

const LogoMarquee = ({ dark = false }: { dark?: boolean }) => {
  const logos = [
    { Icon: Hexagon, name: "LogisticsCorp" },
    { Icon: Anchor, name: "PortAllies" },
    { Icon: Box, name: "PackSys" },
    { Icon: Globe, name: "GlobalTrade" },
    { Icon: Truck, name: "FastFreight" },
    { Icon: Layers, name: "LeatherCo" },
    { Icon: MapPin, name: "ZoneNav" },
    { Icon: Navigation, name: "RouteMasters" },
  ];

  return (
    <div className={`w-full overflow-hidden py-8 border-t relative z-10 mt-12 backdrop-blur-sm ${dark ? 'border-brand-navy/10 bg-brand-navy/5' : 'border-white/10 bg-white/5'}`}>
      <div className="relative flex w-full overflow-hidden mask-fade">
        <MotionDiv
          className="flex gap-12 md:gap-24 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
              <logo.Icon size={18} className={`md:w-5 md:h-5 ${dark ? 'text-brand-navy' : 'text-white'}`} />
              <span className={`text-[10px] md:text-sm font-bold uppercase tracking-wider ${dark ? 'text-brand-navy' : 'text-white'}`}>{logo.name}</span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
};

// --- Legal Page ---
const LegalPage: React.FC<{
  title: string;
  lastUpdated: string;
  content: { heading: string; body: string }[];
  onBack: () => void;
  backLabel: string;
}> = ({ title, lastUpdated, content, onBack, backLabel }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed inset-0 bg-[#F5F5F7] z-[300] overflow-y-auto pt-24 pb-12"
  >
    <div className="container mx-auto px-6 max-w-4xl">
      <button onClick={onBack} className="flex items-center gap-2 text-brand-navy font-bold uppercase tracking-widest text-xs mb-8 hover:text-brand-gold">
        <ArrowLeft size={16} /> {backLabel}
      </button>
      <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4">{title}</h1>
        <p className="text-gray-500 text-sm md:text-base mb-12 border-b border-gray-100 pb-8">{lastUpdated}</p>
        <div className="space-y-12">
          {content.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-4">{section.heading}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </MotionDiv>
);

const SECTION_ICONS: Record<string, React.ElementType> = {
  about: Home,
  services: Briefcase,
  process: Settings,
  team: Users,
  differentiators: Award,
  testimonials: MessageSquare,
  showroom: ShoppingBag,
  contact: Mail
};

// Converts a 2-letter country code into its corresponding flag emoji
const countryCodeToFlag = (code?: string) => {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)));
};

const MainContent = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [showroomCategory, setShowroomCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const navLinks = ['about', 'services', 'process', 'team', 'differentiators', 'testimonials', 'showroom', 'contact'];

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: [0.3, 0.5] });

    navLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setCurrentView('home');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactStatus === 'loading') return;
    setContactStatus('loading');
    setContactError(null);
    try {
      const resp = await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const json = await resp.json();
      if (!resp.ok || json?.error) {
        throw new Error(json?.error || 'Failed to send');
      }
      setContactStatus('success');
      setContactForm({ name: '', company: '', email: '', message: '' });
    } catch (err: any) {
      setContactStatus('error');
      setContactError(err?.message || 'Unexpected error');
    }
  };

  const filteredShowroomItems = showroomCategory === 'all'
    ? t.showroom.items
    : t.showroom.items.filter(item => item.category === showroomCategory);


  return (
    <div className="bg-[#1B2440] text-brand-dark font-sans h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar flex flex-col">

      {/* --- Fixed Navigation Bar --- */}
      {/* DESKTOP SIDEBAR NAV */}
      <nav className="hidden lg:flex fixed top-0 left-0 bottom-0 w-24 z-[200] bg-brand-navy flex-col justify-between items-center py-8 border-r border-white/10">
        <button onClick={() => handleNavClick('about')} className="w-12 h-12 rounded-2xl bg-white text-brand-navy flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/5">
          <img src={logoVertical} alt="Cross The Bridge logo" className="w-9 h-9 object-contain" />
        </button>

        <div className="flex flex-col gap-6 items-center w-full">
          {navLinks.map((item) => {
            const Icon = SECTION_ICONS[item] || Circle;
            return (
              <div key={item} className="relative group w-full flex justify-center">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`p-2 rounded-xl transition-all duration-300 group-hover:bg-white/10 ${activeSection === item && currentView === 'home' ? 'text-brand-gold bg-white/10' : 'text-white/40'
                    }`}
                >
                  <Icon size={20} />
                </button>
                {/* Tooltip */}
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-white text-brand-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                  {t.nav[item as keyof typeof t.nav]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 items-center">
          <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors rotate-90 origin-center whitespace-nowrap">
            {lang === 'en' ? 'EN' : 'ES'}
          </button>
        </div>
      </nav>

      {/* MOBILE TOP NAV */}
      <nav className="flex lg:hidden fixed top-0 left-0 right-0 z-[200] py-4 bg-brand-navy/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={() => handleNavClick('about')} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/10">
              <img src={logoVertical} alt="Cross The Bridge logo" className="h-8 w-auto object-contain" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Cross The Bridge</span>
          </button>

          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-xs font-bold uppercase tracking-widest text-white/80">
              {lang === 'en' ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MotionDiv
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-navy z-[250] flex flex-col justify-center items-center text-white p-6"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full">
              <X size={24} />
            </button>
            <div className="flex flex-col gap-6 w-full max-w-sm">
              {navLinks.map((item) => {
                const Icon = SECTION_ICONS[item] || Circle;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:text-brand-gold p-2 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Icon size={24} className="text-brand-gold" />
                    {t.nav[item as keyof typeof t.nav]}
                  </button>
                );
              })}
              <button onClick={() => handleNavClick('contact')} className="mt-8 bg-brand-gold text-brand-navy px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Mail size={18} /> {t.nav.book}
              </button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* --- Legal Views --- */}
      <AnimatePresence>
        {currentView === 'privacy' && (
          <LegalPage
            title={t.legal.privacy.title}
            lastUpdated={t.legal.privacy.lastUpdated}
            content={t.legal.privacy.content}
            onBack={() => setCurrentView('home')}
            backLabel={t.legal.back}
          />
        )}
        {currentView === 'terms' && (
          <LegalPage
            title={t.legal.terms.title}
            lastUpdated={t.legal.terms.lastUpdated}
            content={t.legal.terms.content}
            onBack={() => setCurrentView('home')}
            backLabel={t.legal.back}
          />
        )}
      </AnimatePresence>

      {/* --- SECTIONS (Snap Scroll) --- */}

      {/* Wrapper to offset desktop sidebar */}
      <div className="lg:pl-24 w-full">

        {/* 1. HERO (Dark) */}
        <section
          id="about"
          className="min-h-[100dvh] snap-start snap-always relative overflow-hidden bg-brand-navy py-12 flex items-center"
        >

          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="World" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
          </div>
          <GridPattern color="#FFFFFF" opacity={0.05} />
          <MailStamp className="bottom-10 right-6 md:bottom-20 md:right-20 text-white/20 border-white/20 -rotate-12" />

          <div className="container mx-auto px-6 relative z-10 min-h-[80vh] flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-6xl">
              {/* <FadeIn delay={0.1}>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" /> Est. 2004
                 </div>
               </FadeIn> */}
              <FadeIn delay={0.2}>
                <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight mt-20 lg:mt-0 mb-10 text-center">
                  {t.hero.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-gray-300 md:text-xl ml-20 mr-20 mb-20 text-center">{t.hero.subtitle}</p>
              </FadeIn>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4 w-full max-w-3xl mx-auto justify-center">
                <FadeIn delay={0.4}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="group flex items-center justify-center gap-3 bg-white text-brand-navy px-5 sm:px-7 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-base hover:bg-brand-gold transition-colors w-full sm:w-auto"
                  >
                    {t.hero.cta} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="group flex items-center justify-center gap-3 bg-white text-brand-navy px-5 sm:px-7 md:px-8 py-3 md:py-4 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-base hover:bg-brand-gold transition-colors w-full sm:w-auto bg-[#C4A661]"
                  >
                    {t.hero.cta2} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </FadeIn>
              </div>
            </div>
            <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 justify-center items-center pointer-events-none opacity-70">
              <GlowingOrb className="w-[500px] h-[500px] bg-brand-gold/20" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative z-10 border border-white/10 rounded-full w-[400px] h-[400px] flex items-center justify-center"
              >
                <div className="absolute inset-0 border border-dashed border-white/10 rounded-full scale-75" />
                <Globe size={120} strokeWidth={0.5} className="text-white/20" />
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-white/30 animate-bounce pointer-events-none">
            <ChevronDown size={24} />
          </div>
        </section>

        {/* 2. SERVICES (Light) */}
        <section id="services" className="min-h-[100dvh] snap-start snap-always relative bg-[#F5F5F7] text-brand-navy flex flex-col justify-center py-12 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="mb-6 md:mb-10 pt-16 md:pt-0">
              <FadeIn direction='right'>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">What We Offer</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy">{t.services.title}</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md">{t.services.subtitle}</p>
              </FadeIn>
            </div>

            {/* FLIP CARDS - Tap to reveal details */}
            <div className="relative mb-8 md:mb-12">
              <p className="text-center text-xs text-brand-navy/50 mb-4 md:hidden">
                {lang === 'es' ? '← Desliza • Toca para voltear →' : '← Swipe • Tap to flip →'}
              </p>
              
              <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
                {t.services.items.map((item, idx) => {
                  const Icon = idx === 0 ? Package : idx === 1 ? Layers : Globe;
                  const images = [
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800"
                  ];
                  const gradients = [
                    'from-emerald-500 to-teal-600',
                    'from-amber-500 to-orange-600', 
                    'from-blue-500 to-indigo-600'
                  ];
                  const [isFlipped, setIsFlipped] = useState(false);
                  
                  return (
                    <FadeIn key={idx} delay={idx * 0.1}>
                      <div className="flex-shrink-0 w-[280px] md:w-auto snap-center perspective-1000">
                        <div 
                          className={`relative h-[380px] md:h-[420px] transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                          onClick={() => setIsFlipped(!isFlipped)}
                          style={{transformStyle: 'preserve-3d'}}
                        >
                          {/* FRONT */}
                          <div 
                            className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg backface-hidden"
                            style={{backfaceVisibility: 'hidden'}}
                          >
                            <img src={images[idx]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-t ${gradients[idx]} opacity-85`} />
                            
                            <div className="relative h-full flex flex-col justify-between p-5 md:p-6 text-white">
                              <div className="flex items-center justify-between">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <Icon size={20} className="md:w-6 md:h-6" />
                                </div>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                  0{idx + 1}
                                </span>
                              </div>
                              
                              <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">{item.title}</h3>
                                <p className="text-white/80 text-xs md:text-sm mb-4 line-clamp-2">{item.desc}</p>
                                <div className="flex items-center gap-2 text-white/60 text-xs">
                                  <RotateCcw size={14} />
                                  <span>{lang === 'es' ? 'Toca para ver más' : 'Tap for details'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* BACK */}
                          <div 
                            className={`absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br ${gradients[idx]} p-1 rotate-y-180 backface-hidden`}
                            style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}
                          >
                            <div className="w-full h-full bg-white rounded-[14px] md:rounded-[20px] p-5 md:p-6 flex flex-col">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradients[idx]} flex items-center justify-center`}>
                                  <Icon size={16} className="text-white" />
                                </div>
                              </div>
                              
                              {item.details && (
                                <div className="flex-1 space-y-3">
                                  {item.details.slice(0, 3).map((detail, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <CheckCircle size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                                      <p className="text-xs text-brand-navy/70 leading-relaxed line-clamp-2">{detail}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {item.bullets && (
                                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
                                  {item.bullets.map((b, i) => (
                                    <span key={i} className={`text-[10px] bg-gradient-to-r ${gradients[idx]} text-white px-2 py-1 rounded-full`}>
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-4 text-center">
                                <span className="text-[10px] text-brand-navy/40">{lang === 'es' ? 'Toca para volver' : 'Tap to flip back'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>

            {/* Missions Section - Compact */}
            {t.services.missions && (
              <FadeIn>
                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-200 shadow-lg p-5 md:p-8 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    {/* Left: Title & CTA */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{t.services.missions.title}</h3>
                      <p className="text-sm text-brand-navy/70 mb-4 line-clamp-2 md:line-clamp-none">{t.services.missions.intro}</p>
                      <button 
                        onClick={() => handleNavClick('contact')} 
                        className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-colors"
                      >
                        {t.services.missions.cta} <ArrowRight size={14} />
                      </button>
                    </div>
                    
                    {/* Right: Events */}
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                      {t.services.missions.events.map((event, idx) => (
                        <div key={idx} className="flex-shrink-0 bg-brand-navy/5 rounded-xl px-4 py-3 md:px-5 md:py-4">
                          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-brand-navy/50 mb-1">{t.services.missions.eventsTitle}</p>
                          <p className="text-sm md:text-base font-semibold text-brand-navy whitespace-nowrap">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* 3. PROCESS - Zigzag Timeline Journey */}
        <section id="process" className="min-h-[100dvh] snap-start snap-always relative flex flex-col justify-center py-12 md:py-20 bg-[#F5F5F7] overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-10 md:mb-16">
              <FadeIn>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy mb-3 uppercase tracking-tight">
                  {lang === 'en' ? 'Your Journey With Us' : 'Tu Viaje Con Nosotros'}
                </h2>
                <p className="text-brand-navy/60 text-sm md:text-base max-w-xl mx-auto">{t.process.subtitle}</p>
              </FadeIn>
            </div>

            {/* Zigzag Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Central vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-amber-500 via-rose-500 to-emerald-500 -translate-x-1/2 hidden md:block" />
              
              {t.process.steps.map((step, idx) => {
                const icons = [Target, FileText, Users, Package, Briefcase, Shield, Ship];
                const Icon = icons[idx] || Target;
                const colors = [
                  'bg-blue-500',
                  'bg-amber-500', 
                  'bg-rose-500',
                  'bg-emerald-500',
                  'bg-purple-500',
                  'bg-cyan-500',
                  'bg-orange-500'
                ];
                const borderColors = [
                  'border-l-blue-500',
                  'border-l-amber-500',
                  'border-l-rose-500', 
                  'border-l-emerald-500',
                  'border-l-purple-500',
                  'border-l-cyan-500',
                  'border-l-orange-500'
                ];
                const isLeft = idx % 2 === 0;
                
                return (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className={`relative flex items-center mb-8 md:mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Mobile: Simple vertical timeline */}
                      <div className="md:hidden flex gap-4 w-full">
                        {/* Timeline line + icon */}
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-xl ${colors[idx]} flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {idx < t.process.steps.length - 1 && (
                            <div className={`w-1 flex-1 min-h-[60px] ${colors[idx]} opacity-30 mt-2`} />
                          )}
                        </div>
                        
                        {/* Content card */}
                        <div className={`flex-1 bg-white rounded-xl p-4 shadow-lg border-l-4 ${borderColors[idx]}`}>
                          <h3 className="text-brand-navy font-bold text-base mb-2">{step.title}</h3>
                          <p className="text-brand-navy/60 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                      
                      {/* Desktop: Zigzag layout */}
                      <div className={`hidden md:flex items-center w-full ${isLeft ? '' : 'flex-row-reverse'}`}>
                        {/* Content card */}
                        <div className={`w-[45%] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className={`bg-white rounded-2xl p-6 shadow-xl border-l-4 ${borderColors[idx]} hover:shadow-2xl transition-shadow`}>
                            <h3 className="text-brand-navy font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-brand-navy/60 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                        
                        {/* Center icon */}
                        <div className="w-[10%] flex justify-center relative z-10">
                          <div className={`w-14 h-14 rounded-2xl ${colors[idx]} flex items-center justify-center shadow-xl`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        {/* Empty space */}
                        <div className="w-[45%]" />
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
            
            {/* CTA */}
            <FadeIn delay={0.5}>
              <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a href="#contact" className="w-full sm:w-auto bg-brand-navy text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-gold hover:text-brand-navy transition-colors flex items-center justify-center gap-2 group">
                  {lang === 'en' ? 'Start Your Journey' : 'Inicia Tu Viaje'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 4. OUR FOUNDER (Light) */}
        <section id="team" className="min-h-[100dvh] snap-start snap-always flex flex-col bg-[#F5F5F7] overflow-hidden">
          {/* Mobile-first stacked layout */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Image - Full width on mobile, half on desktop */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen relative overflow-hidden">
              <img src={teamPortrait} className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" alt="Mariana" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent lg:bg-brand-navy/20 lg:mix-blend-multiply" />
              {/* Mobile: Name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 lg:hidden p-6 text-white">
                <h3 className="text-2xl font-bold">{t.team.profile.name}</h3>
                <p className="text-brand-gold font-bold uppercase tracking-widest text-xs">{t.team.profile.role}</p>
              </div>
              {/* Desktop: Glass card */}
              <div className="hidden lg:block absolute bottom-12 left-12 text-white p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                <h3 className="text-3xl font-bold">{t.team.profile.name}</h3>
                <p className="text-brand-gold font-bold uppercase tracking-widest text-sm">{t.team.profile.role}</p>
              </div>
            </div>

            {/* Content - Compact on mobile */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-6 md:p-12 lg:p-24 py-12 lg:py-24">
              <FadeIn direction='right'>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 lg:mb-4 block">Leadership</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4 lg:mb-8">{t.team.title}</h2>
                
                {/* Quote styling - more compact on mobile */}
                <div className="relative pl-4 border-l-4 border-brand-gold/30 mb-6 lg:mb-12">
                  <p className="text-base lg:text-xl text-brand-navy/80 leading-relaxed font-light italic">
                    "{t.team.profile.bio}"
                  </p>
                </div>

                {/* Education */}
                <div className="border-t border-gray-100 pt-6 lg:pt-8">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-navy mb-4 lg:mb-6">
                    <GraduationCap size={16} /> Education
                  </h4>
                  <div className="grid gap-3 lg:gap-4">
                    {t.team.profile.education.map((edu, i) => (
                      <div key={i} className="bg-gray-50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none">
                        <span className="font-bold text-brand-navy text-sm lg:text-base block lg:inline">{edu.degree}</span>
                        <span className="text-xs lg:text-sm text-gray-400 block lg:inline lg:ml-2">{edu.school}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 5. DIFFERENTIATORS - Mobile-First Cards */}
        <section id="differentiators" className="min-h-[100dvh] snap-start snap-always bg-gradient-to-br from-[#141B2D] via-[#1B2440] to-[#0f1521] text-white flex flex-col justify-center relative py-16 lg:py-24 overflow-hidden">
          <GridPattern color="#C4A661" opacity={0.03} />
          
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-10 lg:mb-16">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs bg-brand-gold/10 px-4 py-2 rounded-full mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">{t.differentiators.title}</h2>
            </div>

            {/* Mobile: EXPANDABLE ACCORDION Cards */}
            <div className="lg:hidden space-y-3">
              {t.differentiators.items.map((item, idx) => {
                const [isExpanded, setIsExpanded] = useState(false);
                const icons = [Award, Globe, Shield];
                const Icon = icons[idx] || Star;
                const colors = ['from-amber-500 to-orange-500', 'from-blue-500 to-indigo-500', 'from-emerald-500 to-teal-500'];
                
                return (
                  <div 
                    key={idx} 
                    className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${isExpanded ? 'border-brand-gold/50' : ''}`}
                  >
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-full p-5 flex items-center gap-4 text-left"
                    >
                      <div className={`bg-gradient-to-br ${colors[idx]} p-3 rounded-xl shadow-lg flex-shrink-0`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-brand-gold/60 text-[10px] font-bold uppercase tracking-wider">0{idx + 1}</span>
                        <h3 className="text-white font-bold text-sm truncate">{item.title}</h3>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-brand-gold transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Grid - Hover reveal cards */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.differentiators.items.map((item, idx) => {
                const icons = [Award, Globe, Shield];
                const Icon = icons[idx] || Star;
                const colors = ['from-amber-500 to-orange-500', 'from-blue-500 to-indigo-500', 'from-emerald-500 to-teal-500'];
                const images = [
                  'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
                ];
                
                return (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="relative group h-[320px] rounded-3xl overflow-hidden cursor-pointer">
                      {/* Background Image */}
                      <img src={images[idx]} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/90 to-brand-navy/60 group-hover:opacity-95 transition-opacity`} />
                      
                      {/* Content - Slides up on hover */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500">
                        {/* Top badge */}
                        <span className="absolute top-4 right-4 text-7xl font-bold text-brand-gold/10 group-hover:text-brand-gold/30 transition-colors">0{idx + 1}</span>
                        
                        {/* Icon */}
                        <div className={`bg-gradient-to-br ${colors[idx]} p-3 rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                        
                        {/* Description - Hidden by default, shows on hover */}
                        <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                        
                        {/* Read more indicator */}
                        <div className="flex items-center gap-2 text-brand-gold/60 text-xs mt-3 group-hover:text-brand-gold transition-colors">
                          <span>{lang === 'es' ? 'Ver más' : 'Learn more'}</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTB STRENGTHS - Full Section with Tinder-Style Cards */}
        <section className="min-h-[100dvh] snap-start snap-always bg-gradient-to-br from-[#0f1521] via-[#141B2D] to-[#1B2440] text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
          </div>
          <GridPattern color="#C4A661" opacity={0.03} />
          
          {(() => {
              const ctbStrengths = [
                { 
                  icon: Scissors, 
                  title: lang === 'es' ? 'Expertise en Cuero y Calzado' : 'Deep Leather & Footwear Expertise',
                  desc: lang === 'es' ? 'Décadas de experiencia en la industria del cuero y calzado de León, México.' : 'Decades of experience in León, Mexico leather and footwear industry.',
                  color: 'from-amber-500 to-orange-600',
                  image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1740&auto=format&fit=crop',
                },
                { 
                  icon: Award, 
                  title: lang === 'es' ? 'Acceso a Fábricas Élite en México' : 'Access to Elite Factories in Mexico',
                  desc: lang === 'es' ? 'Red exclusiva de fabricantes certificados y verificados.' : 'Exclusive network of certified and verified manufacturers.',
                  color: 'from-emerald-500 to-teal-600',
                  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop',
                },
                { 
                  icon: Globe, 
                  title: lang === 'es' ? 'Red Internacional (Brasil, Asia, USA)' : 'International Network (Brazil, Asia, USA)',
                  desc: lang === 'es' ? 'Conexiones globales para oportunidades sin fronteras.' : 'Global connections for borderless opportunities.',
                  color: 'from-blue-500 to-indigo-600',
                  image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1740&auto=format&fit=crop',
                },
                { 
                  icon: FileText, 
                  title: lang === 'es' ? 'Experiencia y Certificaciones de Exportación' : 'Export Experience & Certifications',
                  desc: lang === 'es' ? 'Documentación y compliance para comercio internacional.' : 'Documentation and compliance for international trade.',
                  color: 'from-purple-500 to-violet-600',
                  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1740&auto=format&fit=crop',
                },
                { 
                  icon: Settings, 
                  title: lang === 'es' ? 'Presencia Directa en Fábricas' : 'Hands-on Factory Presence',
                  desc: lang === 'es' ? 'Control de calidad en sitio y supervisión directa.' : 'On-site quality control and direct supervision.',
                  color: 'from-rose-500 to-pink-600',
                  image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1740&auto=format&fit=crop',
                },
                { 
                  icon: Users, 
                  title: lang === 'es' ? 'Liderazgo Bilingüe y Bicultural' : 'Bilingual, Bicultural Leadership',
                  desc: lang === 'es' ? 'Comunicación fluida entre culturas y mercados.' : 'Seamless communication across cultures and markets.',
                  color: 'from-cyan-500 to-sky-600',
                  image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop',
                },
              ];
              
              const [currentIndex, setCurrentIndex] = useState(0);
              const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
              const cardRef = useRef<HTMLDivElement>(null);
              const dragState = useRef({ startX: 0, currentX: 0, isDragging: false });
              
              const handleSwipe = (direction: 'left' | 'right') => {
                if (direction === 'right' && currentIndex > 0) {
                  setExitDirection('right');
                  setTimeout(() => {
                    setCurrentIndex(prev => prev - 1);
                    setExitDirection(null);
                  }, 250);
                } else if (direction === 'left' && currentIndex < ctbStrengths.length - 1) {
                  setExitDirection('left');
                  setTimeout(() => {
                    setCurrentIndex(prev => prev + 1);
                    setExitDirection(null);
                  }, 250);
                }
              };
              
              const goToCard = (index: number) => {
                if (index === currentIndex) return;
                setExitDirection(index > currentIndex ? 'left' : 'right');
                setTimeout(() => {
                  setCurrentIndex(index);
                  setExitDirection(null);
                }, 250);
              };
              
              return (
                <div className="h-full min-h-[100dvh] flex flex-col relative z-10">
                  {/* Section Header - Fixed at top */}
                  <div className="text-center pt-16 md:pt-20 pb-4 px-4">
                    <FadeIn>
                      <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs bg-brand-gold/10 px-4 py-2 rounded-full mb-4">
                        {lang === 'es' ? 'Nuestras Fortalezas' : 'Our Strengths'}
                      </span>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                        {lang === 'es' ? 'Fortalezas CTB' : 'CTB Strengths'}
                      </h2>
                      <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                        {lang === 'es' ? '← Desliza para explorar →' : '← Swipe to explore →'}
                      </p>
                    </FadeIn>
                  </div>
                  
                  {/* MOBILE: Full-viewport Tinder-style stacked cards */}
                  <div className="md:hidden flex-1 relative px-4 pb-6">
                    {/* Card Stack Container - Takes remaining space */}
                    <div className="absolute inset-4 flex items-center justify-center">
                      {/* Render cards in reverse order so first card is on top */}
                      {[...ctbStrengths].reverse().map((strength, reverseIdx) => {
                        const idx = ctbStrengths.length - 1 - reverseIdx;
                        const isTop = idx === currentIndex;
                        const isVisible = idx >= currentIndex && idx <= currentIndex + 2;
                        const stackOffset = idx - currentIndex;
                        const Icon = strength.icon;
                        
                        if (!isVisible) return null;
                        
                        // Calculate card position in stack
                        const baseTransform = `translateY(${stackOffset * 12}px) scale(${1 - stackOffset * 0.04})`;
                        const exitTransform = isTop && exitDirection ? 
                          exitDirection === 'left' ? 'translateX(-150%) rotate(-15deg)' : 'translateX(150%) rotate(15deg)' 
                          : '';
                        
                        return (
                          <div
                            key={idx}
                            ref={isTop ? cardRef : null}
                            className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl will-change-transform ${
                              isTop && exitDirection ? 'transition-transform duration-250' : isTop ? '' : 'transition-all duration-300'
                            }`}
                            style={{
                              transform: exitTransform || baseTransform,
                              opacity: isTop && exitDirection ? 0 : 1 - stackOffset * 0.2,
                              zIndex: ctbStrengths.length - stackOffset,
                              touchAction: isTop ? 'pan-y' : 'auto',
                            }}
                            onTouchStart={(e) => {
                              if (!isTop || !cardRef.current) return;
                              dragState.current.startX = e.touches[0].clientX;
                              dragState.current.isDragging = true;
                              cardRef.current.style.transition = 'none';
                            }}
                            onTouchMove={(e) => {
                              if (!isTop || !dragState.current.isDragging || !cardRef.current) return;
                              const diff = e.touches[0].clientX - dragState.current.startX;
                              dragState.current.currentX = diff;
                              cardRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.04}deg)`;
                            }}
                            onTouchEnd={() => {
                              if (!isTop || !cardRef.current) return;
                              const threshold = 60;
                              const finalX = dragState.current.currentX;
                              
                              cardRef.current.style.transition = 'transform 0.2s ease-out';
                              
                              if (finalX > threshold && currentIndex > 0) {
                                handleSwipe('right');
                              } else if (finalX < -threshold && currentIndex < ctbStrengths.length - 1) {
                                handleSwipe('left');
                              } else {
                                cardRef.current.style.transform = baseTransform;
                              }
                              
                              dragState.current.currentX = 0;
                              dragState.current.isDragging = false;
                            }}
                          >
                            {/* Background Image */}
                            <img 
                              src={strength.image} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover"
                              draggable={false}
                            />
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${strength.color} opacity-60`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            
                            {/* Card Number Badge */}
                            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                              <span className="text-white text-sm font-bold">{idx + 1} / {ctbStrengths.length}</span>
                            </div>
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                              <div className={`bg-gradient-to-br ${strength.color} p-4 rounded-2xl w-fit mb-5 shadow-xl`}>
                                <Icon size={32} className="text-white" />
                              </div>
                              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg leading-tight">{strength.title}</h4>
                              <p className="text-white/80 text-base leading-relaxed">{strength.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Progress dots - Fixed at bottom */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                      {ctbStrengths.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToCard(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                              ? 'bg-brand-gold w-8' 
                              : idx < currentIndex 
                                ? 'bg-brand-gold/50 w-2' 
                                : 'bg-white/30 w-2'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* DESKTOP: Grid layout */}
                  <div className="hidden md:flex flex-1 items-center">
                    <div className="container mx-auto px-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {ctbStrengths.map((strength, idx) => {
                          const Icon = strength.icon;
                          return (
                            <FadeIn key={idx} delay={idx * 0.1}>
                              <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer">
                                {/* Background */}
                                <img src={strength.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className={`absolute inset-0 bg-gradient-to-t ${strength.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                  <div className={`bg-gradient-to-br ${strength.color} p-3 rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} className="text-white" />
                                  </div>
                                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{strength.title}</h4>
                                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{strength.desc}</p>
                                </div>
                                
                                {/* Number badge */}
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                                </div>
                              </div>
                            </FadeIn>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </section>

        {/* BRIDGE EFFECT - Know the Bridge */}
        {(() => {
          // Cycling testimonials state - using refs to track indices
          const [testimonialIndices, setTestimonialIndices] = useState([0, 1, 2]);
          const [selectedTestimonial, setSelectedTestimonial] = useState<typeof t.testimonials.items[0] | null>(null);
          const totalTestimonials = t.testimonials.items.length;
          
          // Cycle through testimonials periodically
          useEffect(() => {
            const intervals = [
              setInterval(() => {
                setTestimonialIndices(prev => [
                  (prev[0] + 3) % totalTestimonials,
                  prev[1],
                  prev[2]
                ]);
              }, 4000),
              setInterval(() => {
                setTestimonialIndices(prev => [
                  prev[0],
                  (prev[1] + 3) % totalTestimonials,
                  prev[2]
                ]);
              }, 5000),
              setInterval(() => {
                setTestimonialIndices(prev => [
                  prev[0],
                  prev[1],
                  (prev[2] + 3) % totalTestimonials
                ]);
              }, 6000)
            ];
            return () => intervals.forEach(i => clearInterval(i));
          }, [totalTestimonials]);

          return (
        <>
        {/* Testimonial Modal */}
        <AnimatePresence>
          {selectedTestimonial && (
            <MotionDiv
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
            >
              <MotionDiv
                className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-brand-gold text-brand-gold" />)}
                </div>
                <p className="text-gray-700 text-base md:text-lg italic leading-relaxed mb-6">
                  "{selectedTestimonial.text}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  {selectedTestimonial.image && (
                    <img src={selectedTestimonial.image} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold/30" />
                  )}
                  <div>
                    <p className="font-bold text-brand-navy">{selectedTestimonial.name}</p>
                    <p className="text-sm text-gray-500">{selectedTestimonial.role}</p>
                    <p className="text-xs text-brand-gold">{selectedTestimonial.country}</p>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        <section className="min-h-[120dvh] md:min-h-[140dvh] snap-start snap-always bg-gradient-to-b from-[#141B2D] via-brand-navy to-brand-navy relative py-12 md:py-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(196,166,97,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(196,166,97,0.2) 0%, transparent 40%)`
            }} />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <FadeIn>
              <div className="text-center mb-6 md:mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
                  <Globe size={14} /> {lang === 'en' ? 'Know the Bridge Effect' : 'Conoce el Efecto Puente'}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {lang === 'en' ? 'More Than' : 'Más de'} <span className="text-brand-gold">20</span> {lang === 'en' ? 'Countries' : 'Países'}
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                  {lang === 'en' ? 'Connecting businesses across continents, one successful partnership at a time' : 'Conectando negocios a través de continentes, una alianza exitosa a la vez'}
                </p>
              </div>
            </FadeIn>

            {/* Bridge SVG with Walking Testimonials */}
            <div className="relative max-w-6xl mx-auto h-[280px] md:h-[350px] overflow-visible mt-24 md:mt-32">
              {/* SVG Bridge */}
              <svg viewBox="0 0 1200 400" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C4A661" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#C4A661" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C4A661" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                {/* Left Tower */}
                <g className="opacity-90">
                  <rect x="80" y="80" width="40" height="280" fill="#C4A661" opacity="0.6" rx="4" />
                  <rect x="90" y="60" width="20" height="30" fill="#C4A661" opacity="0.8" rx="2" />
                  <circle cx="100" cy="50" r="10" fill="#C4A661" opacity="0.9" />
                </g>
                
                {/* Right Tower */}
                <g className="opacity-90">
                  <rect x="1080" y="80" width="40" height="280" fill="#C4A661" opacity="0.6" rx="4" />
                  <rect x="1090" y="60" width="20" height="30" fill="#C4A661" opacity="0.8" rx="2" />
                  <circle cx="1100" cy="50" r="10" fill="#C4A661" opacity="0.9" />
                </g>
                
                {/* Main Cables */}
                <path d="M100 50 Q 600 -20 1100 50" stroke="#C4A661" strokeWidth="4" fill="none" opacity="0.7" />
                <path d="M100 50 Q 600 0 1100 50" stroke="#C4A661" strokeWidth="2" fill="none" opacity="0.5" />
                
                {/* Bridge Deck */}
                <path d="M60 280 L1140 280" stroke="url(#bridgeGradient)" strokeWidth="8" fill="none" />
                <path d="M60 290 L1140 290" stroke="#C4A661" strokeWidth="2" fill="none" opacity="0.3" />
                
                {/* Vertical cables */}
                {[150, 250, 350, 450, 550, 650, 750, 850, 950, 1050].map((x, i) => {
                  const cableHeight = Math.sin((x - 100) / 1000 * Math.PI) * 180 + 50;
                  return <line key={i} x1={x} y1={cableHeight} x2={x} y2="280" stroke="#C4A661" strokeWidth="1.5" opacity="0.4" />;
                })}
                
                {/* Railings */}
                <path d="M80 260 L1120 260" stroke="#C4A661" strokeWidth="2" fill="none" opacity="0.3" />
                {[...Array(27)].map((_, i) => (
                  <line key={i} x1={80 + i * 40} y1="260" x2={80 + i * 40} y2="280" stroke="#C4A661" strokeWidth="1" opacity="0.3" />
                ))}
                
                {/* Water reflection */}
                <ellipse cx="600" cy="360" rx="500" ry="30" fill="url(#bridgeGradient)" opacity="0.1" />
              </svg>

              {/* Walking Figures with Cycling Dialog Bubbles */}
              {testimonialIndices.map((testimonialIdx, idx) => {
                const testimonial = t.testimonials.items[testimonialIdx];
                if (!testimonial) return null;
                
                return (
                  <MotionDiv
                    key={`walker-${idx}`}
                    className="absolute"
                    style={{ 
                      top: '48%',
                      left: `${15 + idx * 30}%`
                    }}
                    animate={{ 
                      x: ['0%', '60%', '0%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 12 + idx * 3,
                      ease: "easeInOut",
                      delay: idx * 1.5
                    }}
                  >
                    <div className="relative">
                      {/* Dialog Bubble - CLICKABLE */}
                      <MotionDiv
                        key={`bubble-${idx}-${testimonialIdx}`}
                        className={`absolute -top-28 md:-top-36 ${idx === 1 ? '-left-20 md:-left-28' : '-left-12 md:-left-20'} w-44 md:w-60 ${idx === 1 ? 'bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border-brand-gold/50' : 'bg-white/95 border-brand-gold/20'} backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-xl border cursor-pointer hover:scale-105 transition-transform`}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                        transition={{ 
                          opacity: { duration: 0.3 },
                          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                          scale: { duration: 0.3 }
                        }}
                        onClick={() => setSelectedTestimonial(testimonial)}
                      >
                          {/* Click indicator */}
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-brand-navy text-[8px] font-bold">+</span>
                          </div>
                          <p className={`text-[9px] md:text-[11px] ${idx === 1 ? 'text-white' : 'text-gray-700'} italic leading-relaxed line-clamp-2 md:line-clamp-3`}>
                            "{testimonial.text.slice(0, 80)}..."
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {testimonial.image && (
                              <img src={testimonial.image} alt="" className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover border border-brand-gold/30" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className={`text-[8px] md:text-[10px] font-semibold ${idx === 1 ? 'text-white' : 'text-brand-navy'} block truncate`}>{testimonial.name}</span>
                              <span className={`text-[7px] md:text-[9px] ${idx === 1 ? 'text-brand-gold' : 'text-gray-500'}`}>{testimonial.country}</span>
                            </div>
                          </div>
                        {/* Bubble tail */}
                        <div className={`absolute -bottom-2 left-6 w-3 h-3 ${idx === 1 ? 'bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border-brand-gold/50' : 'bg-white/95 border-brand-gold/20'} transform rotate-45 border-r border-b`} />
                      </MotionDiv>
                      
                      {/* Walking Person SVG with leg animation */}
                      <MotionDiv
                        animate={{ 
                          rotate: [-2, 2, -2]
                        }}
                        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                      >
                        <svg width={idx === 1 ? "35" : "28"} height={idx === 1 ? "55" : "45"} viewBox="0 0 30 50" className="md:w-[40px] md:h-[60px]">
                          <circle cx="15" cy="8" r="7" fill="#C4A661" />
                          <path d="M15 15 L15 30" stroke="#C4A661" strokeWidth="3" strokeLinecap="round" fill="none" />
                          <path d="M15 20 L8 28 M15 20 L22 28" stroke="#C4A661" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                          <path d="M15 30 L10 48 M15 30 L20 48" stroke="#C4A661" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </svg>
                      </MotionDiv>
                    </div>
                  </MotionDiv>
                );
              })}

              {/* Footsteps trail */}
              <div className="absolute bottom-[22%] md:bottom-[24%] left-[15%] right-[15%] flex justify-between">
                {[...Array(8)].map((_, i) => (
                  <MotionDiv
                    key={i}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-gold/30"
                    animate={{
                      opacity: [0.1, 0.6, 0.1],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.25,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Collage Section - Stamp Style Photos */}
            <FadeIn delay={0.2}>
              <div className="mt-8 md:mt-12">
                <p className="text-center text-brand-gold/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8">
                  {lang === 'en' ? 'Success Stories Around the World' : 'Historias de Éxito Alrededor del Mundo'}
                </p>
                
                {/* Stamp-style Photo Collage */}
                <div className="relative max-w-5xl mx-auto h-[300px] md:h-[400px]">
                  {/* Stamp 1 - Large, tilted left */}
                  <div className="absolute left-[5%] md:left-[8%] top-[5%] w-[140px] md:w-[220px] transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10 group">
                    <div className="bg-white p-2 md:p-3 shadow-2xl rounded-sm border-4 border-dashed border-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" 
                        alt="Business handshake"
                        className="w-full h-[80px] md:h-[120px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] md:text-[10px] font-bold text-brand-navy uppercase tracking-wider">{lang === 'en' ? 'Partnerships' : 'Alianzas'}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-400">🌎 Americas</p>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-brand-gold/90 rounded-full flex items-center justify-center transform rotate-12">
                      <span className="text-[8px] md:text-[10px] font-bold text-brand-navy">✓</span>
                    </div>
                  </div>
                  
                  {/* Stamp 2 - Medium, tilted right */}
                  <div className="absolute left-[35%] md:left-[30%] top-[25%] md:top-[15%] w-[120px] md:w-[180px] transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 z-20 group">
                    <div className="bg-white p-2 md:p-3 shadow-2xl rounded-sm border-4 border-dashed border-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" 
                        alt="Shipping containers"
                        className="w-full h-[70px] md:h-[100px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] md:text-[10px] font-bold text-brand-navy uppercase tracking-wider">{lang === 'en' ? 'Logistics' : 'Logística'}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-400">🚢 Global</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stamp 3 - Polaroid style, center */}
                  <div className="absolute right-[25%] md:right-[30%] top-[0%] md:top-[5%] w-[110px] md:w-[160px] transform -rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-500 z-30 group">
                    <div className="bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-2xl rounded-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop" 
                        alt="Business meeting"
                        className="w-full h-[80px] md:h-[110px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <p className="absolute bottom-2 left-0 right-0 text-center text-[8px] md:text-[10px] text-gray-500 font-handwriting">{lang === 'en' ? 'Planning Session' : 'Sesión de Planeación'}</p>
                    </div>
                  </div>
                  
                  {/* Stamp 4 - Small, far right */}
                  <div className="absolute right-[5%] md:right-[10%] top-[20%] w-[100px] md:w-[150px] transform rotate-8 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10 group">
                    <div className="bg-white p-2 md:p-3 shadow-2xl rounded-sm border-4 border-dashed border-brand-gold/30">
                      <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop" 
                        alt="Team collaboration"
                        className="w-full h-[60px] md:h-[80px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-1 text-center">
                        <p className="text-[7px] md:text-[9px] font-bold text-brand-navy">{lang === 'en' ? 'Quality' : 'Calidad'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stamp 5 - Bottom left */}
                  <div className="absolute left-[10%] md:left-[15%] bottom-[5%] md:bottom-[10%] w-[115px] md:w-[170px] transform rotate-5 hover:rotate-0 hover:scale-110 transition-all duration-500 z-20 group">
                    <div className="bg-white p-2 md:p-3 shadow-2xl rounded-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" 
                        alt="Success celebration"
                        className="w-full h-[65px] md:h-[90px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] md:text-[10px] font-bold text-brand-navy uppercase">{lang === 'en' ? 'Success' : 'Éxito'}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-400">⭐ 100+ {lang === 'en' ? 'Businesses' : 'Negocios'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stamp 6 - Bottom center */}
                  <div className="absolute left-[40%] md:left-[38%] bottom-[0%] md:bottom-[5%] w-[130px] md:w-[190px] transform -rotate-4 hover:rotate-0 hover:scale-110 transition-all duration-500 z-30 group">
                    <div className="bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-2xl rounded-sm border-2 border-brand-gold/20">
                      <img 
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop" 
                        alt="Factory floor"
                        className="w-full h-[70px] md:h-[100px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <p className="absolute bottom-1 md:bottom-2 left-0 right-0 text-center text-[7px] md:text-[9px] text-brand-navy font-medium">{lang === 'en' ? 'Production Excellence' : 'Excelencia en Producción'}</p>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 md:w-8 md:h-8">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-brand-gold/70">
                        <path fill="currentColor" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Stamp 7 - Bottom right */}
                  <div className="absolute right-[8%] md:right-[12%] bottom-[15%] md:bottom-[15%] w-[95px] md:w-[140px] transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10 group">
                    <div className="bg-white p-2 md:p-3 shadow-2xl rounded-sm border-4 border-dotted border-gray-300">
                      <img 
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop" 
                        alt="International trade"
                        className="w-full h-[55px] md:h-[75px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-1 text-center">
                        <p className="text-[7px] md:text-[9px] font-bold text-brand-navy">🌏 Asia</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                {/* <div className="flex justify-center gap-6 md:gap-12 mt-6 md:mt-8">
                  {[
                    { num: '100+', label: lang === 'en' ? 'Businesses' : 'Negocios' },
                    { num: '20+', label: lang === 'en' ? 'Countries' : 'Países' },
                    { num: '18+', label: lang === 'en' ? 'Years' : 'Años' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <span className="text-2xl md:text-4xl font-bold text-brand-gold">{stat.num}</span>
                      <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </FadeIn>

            {/* Bottom tagline */}
            <FadeIn delay={0.3}>
              <div className="text-center mt-6 md:mt-10">
                <p className="text-brand-gold/80 text-sm md:text-base font-medium">
                  {lang === 'en' ? 'Building bridges that turn distance into opportunity' : 'Construyendo puentes que convierten la distancia en oportunidad'}
                </p>
              </div>
            </FadeIn>

            {/* Countries Carousel - Multi-level Moving */}
            <div className="relative py-8 md:py-12 mt-8 md:mt-12 overflow-hidden">
              <FadeIn>
                <p className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-brand-gold/60 mb-6 md:mb-8">
                  {lang === 'en' ? 'Presence in 20+ Countries' : 'Presencia en más de 20 Países'}
                </p>
              </FadeIn>
              
              {/* Row 1 - Moves Right */}
              <div className="relative mb-3 md:mb-4 overflow-hidden mask-fade">
                <MotionDiv
                  className="flex gap-3 md:gap-6 whitespace-nowrap"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                >
                  {[...['USA', 'Canada', 'Brazil', 'Chile', 'Mexico', 'Germany', 'Spain', 'Portugal', 'Italy', 'England', 'France'], ...['USA', 'Canada', 'Brazil', 'Chile', 'Mexico', 'Germany', 'Spain', 'Portugal', 'Italy', 'England', 'France']].map((country, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-white/10 border border-white/20">
                      <span className="text-xs md:text-sm">{countryCodeToFlag(country === 'USA' ? 'US' : country === 'England' ? 'GB' : country === 'Brazil' ? 'BR' : country === 'Germany' ? 'DE' : country === 'Spain' ? 'ES' : country === 'Portugal' ? 'PT' : country === 'Italy' ? 'IT' : country === 'France' ? 'FR' : country === 'Chile' ? 'CL' : country === 'Canada' ? 'CA' : 'MX')}</span>
                      <span className="text-[10px] md:text-xs font-semibold text-white/70">{country}</span>
                    </div>
                  ))}
                </MotionDiv>
              </div>
              
              {/* Row 2 - Moves Left */}
              <div className="relative mb-3 md:mb-4 overflow-hidden mask-fade">
                <MotionDiv
                  className="flex gap-3 md:gap-6 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                  {[...['China', 'Japan', 'Taiwan', 'Hong Kong', 'Vietnam', 'Thailand', 'India', 'Singapore', 'Indonesia', 'Malaysia', 'Laos'], ...['China', 'Japan', 'Taiwan', 'Hong Kong', 'Vietnam', 'Thailand', 'India', 'Singapore', 'Indonesia', 'Malaysia', 'Laos']].map((country, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-brand-gold/20 border border-brand-gold/30">
                      <span className="text-xs md:text-sm">{countryCodeToFlag(country === 'China' ? 'CN' : country === 'Japan' ? 'JP' : country === 'Taiwan' ? 'TW' : country === 'Hong Kong' ? 'HK' : country === 'Vietnam' ? 'VN' : country === 'Thailand' ? 'TH' : country === 'India' ? 'IN' : country === 'Singapore' ? 'SG' : country === 'Indonesia' ? 'ID' : country === 'Malaysia' ? 'MY' : 'LA')}</span>
                      <span className="text-[10px] md:text-xs font-semibold text-white/70">{country}</span>
                    </div>
                  ))}
                </MotionDiv>
              </div>
              
              {/* Row 3 - Moves Right (slower) */}
              <div className="relative overflow-hidden mask-fade">
                <MotionDiv
                  className="flex gap-3 md:gap-6 whitespace-nowrap"
                  animate={{ x: ["-30%", "0%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                >
                  {[...['Australia', 'New Zealand', 'South Africa', 'Argentina', 'Colombia', 'Peru', 'Netherlands', 'Belgium', 'Switzerland'], ...['Australia', 'New Zealand', 'South Africa', 'Argentina', 'Colombia', 'Peru', 'Netherlands', 'Belgium', 'Switzerland']].map((country, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-white/10 border border-white/20">
                      <span className="text-xs md:text-sm">{countryCodeToFlag(country === 'Australia' ? 'AU' : country === 'New Zealand' ? 'NZ' : country === 'South Africa' ? 'ZA' : country === 'Argentina' ? 'AR' : country === 'Colombia' ? 'CO' : country === 'Peru' ? 'PE' : country === 'Netherlands' ? 'NL' : country === 'Belgium' ? 'BE' : 'CH')}</span>
                      <span className="text-[10px] md:text-xs font-semibold text-white/70">{country}</span>
                    </div>
                  ))}
                </MotionDiv>
              </div>
            </div>

            {/* Stats Counters */}
            <div className="flex justify-center gap-8 md:gap-16 flex-wrap mt-8 md:mt-12">
              {[{ v: t.stats.years, l: t.stats.yearsLabel }, { v: t.stats.negotiations, l: t.stats.negotiationsLabel }, { v: t.stats.alliances, l: t.stats.alliancesLabel }].map((stat, i) => (
                <Counter key={i} value={stat.v} label={stat.l} dark={false} />
              ))}
            </div>

            {/* Allies Logo Marquee */}
            <div className="mt-12 md:mt-16">
              <LogoMarquee dark={false} />
            </div>
          </div>
        </section>
        </>
          );
        })()}

        {/* 6. SHOWROOM (Dark) */}
        <section id="showroom" className="min-h-[100dvh] snap-start snap-always bg-[#111] text-white flex flex-col justify-center relative py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
            {/* Header - Mobile first */}
            <div className="mb-6 md:mb-12">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Catalog</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.showroom.title}</h2>
              
              {/* Filter pills */}
              <div className="flex gap-2 flex-wrap">
                {Object.keys(t.showroom.categories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setShowroomCategory(cat)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all ${showroomCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 text-white/50 hover:text-white active:scale-95'}`}
                  >
                    {t.showroom.categories[cat as keyof typeof t.showroom.categories]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <AnimatePresence mode='popLayout'>
                {filteredShowroomItems.slice(0, 6).map((item) => (
                  <MotionDiv
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group overflow-hidden rounded-xl md:rounded-2xl bg-gray-900 aspect-square active:scale-95 transition-transform"
                  >
                    <img src={item.image} className="w-full h-full object-cover opacity-80 md:opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={item.title} />
                    {/* Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <p className="text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5 md:mb-1">{t.showroom.categories[item.category as keyof typeof t.showroom.categories]}</p>
                      <p className="font-bold text-sm md:text-xl line-clamp-2">{item.title}</p>
                    </div>
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* BECOME A PARTNER - For Providers */}
        <section className="min-h-[100dvh] snap-start snap-always bg-gradient-to-br from-brand-navy via-[#1B2440] to-[#0f1521] text-white flex flex-col justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* World map background */}
            <img src="/img/world-map.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-5" />
            {/* Animated gradient orbs */}
            <div className="absolute top-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          </div>
          
          <GridPattern color="#C4A661" opacity={0.03} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 lg:py-24">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs bg-brand-gold/10 px-4 py-2 rounded-full mb-4">
                {lang === 'es' ? 'Para Proveedores' : 'For Providers'}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                {lang === 'es' ? 'Conviértete en Socio' : 'Become a Partner'}
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                {lang === 'es' 
                  ? 'Únete a nuestra red global de fabricantes y proveedores de élite'
                  : 'Join our global network of elite manufacturers and suppliers'}
              </p>
            </div>

            {/* Benefits Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-10 lg:mb-16">
              {[
                {
                  icon: Globe,
                  title: lang === 'es' ? 'Alcance Mundial' : 'Worldwide Reach',
                  desc: lang === 'es' 
                    ? 'Expande tu negocio a mercados internacionales a través de nuestra red establecida'
                    : 'Expand your business to international markets through our established network',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Users,
                  title: lang === 'es' ? 'Socios Estratégicos' : 'Strategic Partners',
                  desc: lang === 'es'
                    ? 'Conecta con marcas premium de USA y otros mercados buscando calidad mexicana'
                    : 'Connect with premium brands from USA and other markets seeking Mexican quality',
                  color: 'from-emerald-500 to-teal-500'
                },
                {
                  icon: Award,
                  title: lang === 'es' ? 'Reconocimiento de Élite' : 'Elite Recognition',
                  desc: lang === 'es'
                    ? 'Sé parte de un directorio selecto de proveedores certificados y verificados'
                    : 'Be part of a select directory of certified and verified suppliers',
                  color: 'from-amber-500 to-orange-500'
                },
                {
                  icon: Ship,
                  title: lang === 'es' ? 'Soporte Logístico' : 'Logistics Support',
                  desc: lang === 'es'
                    ? 'Facilitamos exportaciones y coordinamos envíos internacionales'
                    : 'We facilitate exports and coordinate international shipments',
                  color: 'from-purple-500 to-violet-500'
                },
                {
                  icon: Target,
                  title: lang === 'es' ? 'Clientes Calificados' : 'Qualified Clients',
                  desc: lang === 'es'
                    ? 'Accede a compradores serios y proyectos con volumen garantizado'
                    : 'Access serious buyers and projects with guaranteed volume',
                  color: 'from-rose-500 to-pink-500'
                },
                {
                  icon: Shield,
                  title: lang === 'es' ? 'Pagos Seguros' : 'Secure Payments',
                  desc: lang === 'es'
                    ? 'Transacciones protegidas y términos comerciales claros'
                    : 'Protected transactions and clear commercial terms',
                  color: 'from-indigo-500 to-blue-500'
                }
              ].map((benefit, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1 h-full">
                    <div className={`bg-gradient-to-br ${benefit.color} p-3 rounded-xl w-fit mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <benefit.icon size={20} className="text-white md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2 group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">{benefit.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div> */}

            {/* Image Collage + CTA */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Images */}
              <div className="relative h-[300px] md:h-[400px]">
                {/* Main image */}
                <div className="absolute top-0 left-0 w-[65%] h-[70%] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop" 
                    alt="Factory" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                </div>
                {/* Secondary image */}
                <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/30">
                  <img 
                    src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1740&auto=format&fit=crop" 
                    alt="Leather crafting" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                </div>
                {/* Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-navy p-4 rounded-full shadow-xl z-10">
                  <Compass size={32} className="animate-pulse" />
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {lang === 'es' ? '¿Listo para Crecer?' : 'Ready to Grow?'}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {lang === 'es'
                    ? 'Si eres un fabricante o proveedor de materiales de calidad en México, queremos conocerte. Únete a nuestra red y lleva tus productos al mundo.'
                    : "If you're a quality manufacturer or material supplier in Mexico, we want to meet you. Join our network and take your products to the world."}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                  {[
                    lang === 'es' ? '✓ Sin costo de inscripción' : '✓ No enrollment fee',
                    lang === 'es' ? '✓ Verificación gratuita' : '✓ Free verification',
                    lang === 'es' ? '✓ Soporte continuo' : '✓ Ongoing support'
                  ].map((item, i) => (
                    <span key={i} className="text-sm text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">{item}</span>
                  ))}
                </div>

                <a 
                  href="mailto:partners@crossthebridge.co?subject=Partner%20Inquiry"
                  className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg shadow-brand-gold/20"
                >
                  {lang === 'es' ? 'Contactar como Socio' : 'Contact as Partner'}
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT (Light) */}
        <section id="contact" className="min-h-[100dvh] snap-start snap-always bg-white flex flex-col justify-center relative text-brand-navy py-12 md:pt-24 pb-0">
          <GridPattern color="#1B2440" opacity={0.03} />
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-1 pb-12 lg:pb-24">
            <div>
              <FadeIn>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Get in Touch</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-brand-navy">{t.contact.title}</h2>
                <div className="space-y-4 md:space-y-8 text-sm md:text-lg">
                  <a href="mailto:info@crossthebridge.co" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-navy/5 flex items-center justify-center flex-shrink-0"><Mail size={18} className="md:w-5 md:h-5" /></div>
                    info@crossthebridge.co
                  </a>
                  <a href="tel:+524777653792" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-navy/5 flex items-center justify-center flex-shrink-0"><Phone size={18} className="md:w-5 md:h-5" /></div>
                    +52 477 765 3792
                  </a>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-navy/5 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="md:w-5 md:h-5" /></div>
                    León Gto, México
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                  <a href="https://www.linkedin.com/company/cross-the-bridge-mx/" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90"><Linkedin size={18} className="md:w-5 md:h-5" /></a>
                  <a href="https://www.instagram.com/crossthebridge.mx?igsh=bnF6dGdtdXB4MHIw" className="p-2.5 md:p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90"><Instagram size={18} className="md:w-5 md:h-5" /></a>
                  <a href="https://www.facebook.com/profile.php?id=61583895457222" className="p-2.5 md:p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90"><Facebook size={18} className="md:w-5 md:h-5" /></a>
                </div>
              </FadeIn>
            </div>

            <div className="w-full bg-[#F5F5F7] text-brand-navy p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
              <form className="space-y-3 md:space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.name}</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.company}</label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.email}</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.message}</label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-navy text-white py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-navy transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  disabled={contactStatus === 'loading'}
                >
                  {contactStatus === 'loading' ? 'Sending…' : contactStatus === 'success' ? 'Sent!' : t.contact.form.submit}
                </button>
                {contactStatus === 'error' && (
                  <p className="text-sm text-red-600">{contactError || 'Something went wrong'}</p>
                )}
                {contactStatus === 'success' && (
                  <p className="text-sm text-green-600">Thanks! We received your details.</p>
                )}
              </form>
            </div>
          </div>

          {/* Dedicated Footer Block (Light) */}
          <footer className="bg-white border-t border-gray-100 py-8">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>{t.footer.rights}</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <button onClick={() => setCurrentView('privacy')} className="hover:text-brand-navy transition-colors">{t.footer.privacy}</button>
                <button onClick={() => setCurrentView('terms')} className="hover:text-brand-navy transition-colors">{t.footer.terms}</button>
              </div>
            </div>
          </footer>
        </section>

      </div> {/* End Wrapper */}

    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  return (
    <>
      <NoiseOverlay />
      <AnimatePresence mode='wait'>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <MainContent lang={lang} setLang={setLang} />}
    </>
  );
}


