
import React, { useState, useEffect, useRef, useId } from 'react';
import { Package, Globe, Layers, ArrowRight, CheckCircle, Phone, Mail, Menu, X, Users, User, Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Circle, Scissors, Shirt, GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, ChevronLeft, ChevronRight, MousePointer2, Home, Briefcase, Settings, Award, MessageSquare, ShoppingBag, Send, Target, FileText, Shield, Ship, Compass, RotateCcw, ChevronUp, Play, Pause, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

// Assets served from public/img
const mapImage = '/img/world-map.svg';
const logoVertical = '/img/ganzo.png';
const logoWordmarkPng = '/img/Logo_letras.png';
const processImg1 = '/img/process2.jpg';
const processImg3 = '/img/process4.jpg';
const teamPortrait = '/img/1696903720042.jpeg';

// --- Type Fixes for Framer Motion ---
const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionSpan = motion.span as any;

// --- Visual Assets ---

const LogoWordmark = ({ className = "", color }: { className?: string, color?: string }) => {
  const maskId = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1321 167"
      role="img"
      aria-label="Cross The Bridge"
      className={className}
      style={color ? { color } : undefined}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id={`logo-letras-mask-${maskId}`} maskUnits="userSpaceOnUse">
          <image href={logoWordmarkPng} width="1321" height="167" preserveAspectRatio="xMidYMid meet" />
        </mask>
      </defs>
      <rect width="1321" height="167" fill="currentColor" mask={`url(#logo-letras-mask-${maskId})`} />
    </svg>
  );
};

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

const GlowingOrb = ({ className, color = "bg-[#d5ba8c]" }: { className?: string, color?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${color} ${className}`} />
);

const MailStamp = ({ className, text = "AIR MAIL", color = "border-brand-navy/20 text-brand-navy/20" }: { className?: string, text?: string, color?: string }) => (
  <div className={`absolute pointer-events-none border-4 rounded-lg px-4 py-2 font-bold uppercase tracking-widest text-xs md:text-sm rotate-12 mix-blend-overlay z-10 ${color} ${className}`} style={{ borderStyle: 'double' }}>
    <div className="flex items-center gap-2">
      <span>{text}</span>
    </div>
  </div>
);

// Helper function to convert country code to flag emoji
const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// --- Components ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'right' | 'left' | 'down';
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "50px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 15 : direction === 'down' ? -15 : 0,
      x: direction === 'left' ? -15 : direction === 'right' ? 15 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  };

  return (
    <MotionDiv
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(delay, 0.3), // Cap delay to prevent stacking
        ease: [0.25, 0.1, 0.25, 1] // CSS ease equivalent - very smooth
      }}
      className={className}
      style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </MotionDiv>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}

// Re-usable viewport reveal that plays on enter/exit while scrolling
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", amount = 0.2 }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </MotionDiv>
);

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
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
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
        {backLabel}
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

const ASSURANCE_ICONS: Record<string, React.ElementType> = {
  Shield,
  FileText,
  Compass,
  Package,
  Navigation,
  RotateCcw
};

// Converts a 2-letter country code into its corresponding flag emoji
const countryCodeToFlag = (code?: string) => {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)));
};

const MainContent = ({ lang, setLang, onHeroReady }: { lang: Language, setLang: (l: Language) => void, onHeroReady?: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const heroSignaledReady = useRef(false);
  const [showroomCategory, setShowroomCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', website: '', serviceInterest: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  const [deckForm, setDeckForm] = useState({ name: '', company: '', email: '', role: '' });
  const [deckStatus, setDeckStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const handleDeckChange = (field: string, value: string) => {
    setDeckForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactStatus === 'loading') return;
    setContactStatus('loading');
    setContactError(null);
    
    // TEMPORARILY COMMENTED OUT - Backend callout disabled
    // try {
    //   const resp = await fetch('/api/create-lead', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(contactForm),
    //   });
    //   const json = await resp.json();
    //   if (!resp.ok || json?.error) {
    //     throw new Error(json?.error || 'Failed to send');
    //   }
    //   setContactStatus('success');
    //   setContactForm({ name: '', company: '', email: '', message: '' });
    // } catch (err: any) {
    //   setContactStatus('error');
    //   setContactError(err?.message || 'Unexpected error');
    // }
    
    // Mock success for now
    setTimeout(() => {
      setContactStatus('success');
      setContactForm({ name: '', company: '', email: '', website: '', serviceInterest: '', message: '' });
    }, 1000);
  };

  const handleDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deckStatus === 'loading') return;
    setDeckStatus('loading');

    setTimeout(() => {
      setDeckStatus('success');
      setDeckForm({ name: '', company: '', email: '', role: '' });
    }, 800);
  };

  const filteredShowroomItems = showroomCategory === 'all'
    ? t.showroom.items
    : t.showroom.items.filter(item => item.category === showroomCategory);

  const serviceOptions = t.services?.items?.map(item => item.title) || [];


  return (
    <div className="text-brand-dark font-sans min-h-screen scroll-smooth flex flex-col overflow-y-auto overflow-x-hidden">

      {/* --- Fixed Top Navigation Bar --- */}
      <nav className="fixed top-0 left-0 right-0 z-[200] py-3 bg-brand-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <button onClick={() => handleNavClick('about')} className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5">
              <img src={logoVertical} alt="Cross The Bridge logo" className="h-7 w-auto object-contain" />
            </div>
            <LogoWordmark className="h-4 w-auto logo-wordmark-shadow" color="#ffffff" />
          </button>

          <div className="hidden lg:flex items-center gap-1 ml-6 flex-1">
            {navLinks.map((item) => {
              const Icon = SECTION_ICONS[item] || Circle;
              const isActive = activeSection === item && currentView === 'home';
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-brand-gold bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon size={14} />
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
              {lang === 'en' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden md:flex items-center gap-2 bg-brand-gold text-brand-navy px-4 py-2 rounded-full font-bold uppercase tracking-[0.16em] text-xs hover:bg-white transition-colors shadow-lg shadow-brand-gold/30"
            >
              <Mail size={14} /> {t.nav.book}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-white lg:hidden">
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

      {/* Wrapper for main content (top nav offset handled with padding) */}
      <div className="w-full pt-20 lg:pt-24">

        {/* 1. HERO (Dark) */}
        <section
          id="about"
          className="min-h-screen relative overflow-hidden bg-brand-navy py-12 md:py-16 flex items-center"
        >

          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]"
              alt="World"
            />
            {!heroVideoFailed && (
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                src="https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg"
                onLoadedData={() => {
                  if (!heroSignaledReady.current) {
                    heroSignaledReady.current = true;
                    onHeroReady?.();
                  }
                }}
                onError={() => {
                  setHeroVideoFailed(true);
                  if (!heroSignaledReady.current) {
                    heroSignaledReady.current = true;
                    onHeroReady?.();
                  }
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-brand-navy/35" />
            <div className="absolute inset-0 bg-brand-navy/75" />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/5 via-transparent to-transparent mix-blend-overlay" />
            <div className="absolute -left-24 bottom-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
          </div>
          <GridPattern color="#FFFFFF" opacity={0.02} />

          <ScrollReveal className="container mx-auto px-6 relative z-10 min-h-[80vh] flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-6xl">
              {/* <FadeIn delay={0.1}>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" /> Est. 2004
                 </div>
               </FadeIn> */}
              <FadeIn delay={0.15} className="pb-4">
                <img
                  src="/img/Logo_home2.png"
                  alt="Cross the Bridge logo"
                  className="mx-auto block w-48 sm:w-64 md:w-[26rem] lg:w-[32rem] max-w-[460px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[640px] mb-8 md:mb-12 drop-shadow-[0_12px_45px_rgba(0,0,0,0.35)]"
                />
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-15 lg:mt-0 text-center max-w-4xl mx-auto">
                  {t.hero.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-white">
                    {t.hero.audience}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="text-gray-200 text-lg md:text-xl text-center max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-6 mt-4">
                  {t.hero.subtitle}
                </p>
              </FadeIn>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4 w-full max-w-3xl mx-auto justify-center mt-8">
                <FadeIn delay={0.4}>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="group flex items-center justify-center gap-3 bg-brand-gold text-brand-navy px-5 sm:px-7 md:px-8 py-3 md:py-3.5 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-sm hover:bg-white transition-colors w-full sm:w-auto shadow-lg shadow-brand-gold/30"
                  >
                    {t.hero.cta}
                  </button>
                </FadeIn>
                <FadeIn delay={0.45}>
                  <a
                    href="#capabilities"
                    className="group flex items-center justify-center gap-3 border border-white/30 text-white px-5 sm:px-7 md:px-8 py-3 md:py-3.5 rounded-full font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] text-xs md:text-sm hover:border-brand-gold hover:text-brand-gold transition-colors w-full sm:w-auto bg-white/5"
                  >
                    {t.hero.cta2}
                  </a>
                </FadeIn>
              </div>
              <FadeIn delay={0.6} className="w-full">
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto mt-4 text-gray-100 text-sm md:text-base">
                  {t.hero.proofs.map((proof, index) => (
                    <div key={`${proof}-${index}`} className="flex items-center gap-2">
                      <CheckCircle className="text-brand-gold" size={18} />
                      <span>{proof}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 justify-center items-center pointer-events-none opacity-70">
              <GlowingOrb className="w-[500px] h-[500px] bg-brand-gold/20" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative z-10 border border-white/10 rounded-full w-[400px] h-[400px] flex items-center justify-center"
              >
                <div className="absolute inset-0 border border-dashed border-white/10 rounded-full scale-75" />
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60 text-xs uppercase tracking-[0.18em]">
              <span className="w-10 h-[2px] bg-white/30" />
              <span>{lang === 'es' ? 'Desplaza para descubrir' : 'Scroll to explore'}</span>
              <span className="w-10 h-[2px] bg-white/30" />
            </div>
          </ScrollReveal>

        </section>

        {/* Proof & Social Trust */}
        <section className="bg-[#0f1521] text-white py-12 md:py-16">
          <ScrollReveal className="container mx-auto px-4 md:px-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs mb-2">{t.proofBar.title}</p>
                <h3 className="text-2xl md:text-4xl font-bold">{t.proofBar.subtitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.proofBar.logos.map((logo) => (
                  <div key={logo} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/70">
                    {logo}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {t.proofBar.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg transition-transform duration-500 hover:-translate-y-1 hover:border-white/20">
                  <p className="text-brand-gold/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{metric.label}</p>
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <p className="text-white/70 text-sm leading-relaxed">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {t.testimonials.items.slice(0, 2).map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-brand-gold">{item.role}</p>
                    </div>
                    <div className="text-lg">{countryCodeToFlag(item.countryCode)}</div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 2. SERVICES (Light) */}
        <section id="services" className="relative bg-[#F5F5F7] text-brand-navy flex flex-col justify-center py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 pointer-events-none" />

          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="mb-6 md:mb-10 pt-16 md:pt-0">
              <FadeIn direction='right'>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">What We Offer</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy">{t.services.title}</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md">{t.services.subtitle}</p>
              </FadeIn>
            </div>

            {/* SERVICE CARDS - Tap to open modal */}
            {(() => {
              const [selectedService, setSelectedService] = useState<number | null>(null);
              const images = [
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800"
              ];
              const gradients = [
                'from-[#0b2f6b] to-[#002169]',
                'from-[#b08c55] to-[#d5ba8c]', 
                'from-[#27497a] to-[#0f2f66]'
              ];
              const icons = [Package, Layers, Globe];
              
              // Extended descriptions from the screenshots
              const extendedContent = lang === 'es' ? [
                {
                  title: "1. Sourcing Estratégico & Matchmaking de Proveedores",
                  paragraphs: [
                    "Conectamos tu marca con la fábrica correcta — no cualquier fábrica. Nuestro proceso de sourcing combina criterios técnicos, optimización de costos, y décadas de relaciones industriales con los principales fabricantes, tenerías y proveedores de materiales de México. Evaluamos capacidades, estándares de calidad, estructuras de precios, certificaciones, capacidad de producción y fit cultural para asegurar que trabajes con socios confiables desde el día uno.",
                    "Este servicio incluye scouting de proveedores, análisis de capacidades, sourcing de materiales, validación de fábricas, coordinación de muestras, y alineación de expectativas en tiempos y costos. Nuestro objetivo es simple: eliminar las conjeturas y darte una base de producción sólida y confiable en México."
                  ],
                  includes: ["Scouting de proveedores", "Análisis de capacidades", "Sourcing de materiales", "Validación de fábricas", "Coordinación de muestras"]
                },
                {
                  title: "2. Manufactura & Operaciones de Cadena de Suministro",
                  paragraphs: [
                    "Nos convertimos en tu equipo en tierra, gestionando cada paso del proceso de producción para que puedas enfocarte en diseño, ventas y crecimiento de marca. Desde desarrollo de producto y prototipado hasta producción a escala completa, coordinamos diariamente con fábricas, damos seguimiento a tiempos, optimizamos comunicación, resolvemos problemas, y aseguramos que cada entregable esté en calendario.",
                    "Nuestro enfoque incluye planificación de producción, seguimiento de materiales, finalización de costos, programación de carga de trabajo, actualizaciones continuas, gestión de riesgos, inspecciones de calidad, y preparación completa para exportación. Obtienes transparencia, control y paz mental, sabiendo que tu producto está siendo gestionado con estándares de clase mundial."
                  ],
                  includes: ["Planificación de producción", "Seguimiento de materiales", "Control de calidad", "Gestión de riesgos", "Preparación de exportación"]
                },
                {
                  title: "3. Crecimiento Internacional & Alianzas Estratégicas",
                  paragraphs: [
                    "Ayudamos a marcas a expandirse a nuevos mercados, construir alianzas internacionales, y crear estrategias de largo plazo para crecimiento global. Ya sea que quieras entrar a México, EE.UU., o Latinoamérica, o seas un proveedor internacional buscando representación en el hub manufacturero de México, te guiamos con un roadmap claro y ejecución estratégica.",
                    "Este servicio incluye insights de mercado, estrategias de entrada, conexiones con distribuidores y socios, soporte en ferias comerciales, consultoría de export-readiness, y representación local con redes industriales de confianza. A través de alianzas estratégicas, te ayudamos a abrir puertas, acelerar oportunidades, y escalar tu presencia internacional con confianza."
                  ],
                  includes: ["Insights de mercado", "Estrategias de entrada", "Conexiones de distribuidores", "Soporte en ferias", "Consultoría de exportación"]
                }
              ] : [
                {
                  title: "1. Strategic Sourcing & Supplier Matchmaking",
                  paragraphs: [
                    "We connect your brand with the right factory — not just any factory. Our sourcing process combines technical criteria, cost optimization, and decades of industry relationships across Mexico's top manufacturers, tanneries, and material suppliers. We evaluate capabilities, quality standards, pricing structures, certifications, production capacity, and cultural fit to make sure you work with reliable partners from day one.",
                    "This service includes supplier scouting, capability analysis, material sourcing, factory validation, sample coordination, and aligned expectations on timelines and costs. Our goal is simple: to eliminate guesswork and give you a strong, trustworthy production foundation in Mexico."
                  ],
                  includes: ["Supplier scouting", "Capability analysis", "Material sourcing", "Factory validation", "Sample coordination"]
                },
                {
                  title: "2. Manufacturing & Supply Chain Operations",
                  paragraphs: [
                    "We become your team on the ground, managing every step of the production process so you can focus on design, sales, and brand growth. From product development and prototyping to full-scale production, we coordinate daily with factories, track timelines, streamline communication, solve issues, and ensure every deliverable is on schedule.",
                    "Our approach includes production planning, materials follow-up, cost finalization, workload scheduling, continuous updates, risk management, quality inspections, and complete export preparation. You get transparency, control, and peace of mind, knowing your product is being managed with world-class standards."
                  ],
                  includes: ["Production planning", "Materials follow-up", "Quality inspections", "Risk management", "Export preparation"]
                },
                {
                  title: "3. International Growth & Strategic Partnerships",
                  paragraphs: [
                    "We help brands expand into new markets, build international alliances, and create long-term strategies for global growth. Whether you want to enter Mexico, the U.S., or Latin America, or you're an international supplier seeking representation in Mexico's manufacturing hub, we guide you with a clear roadmap and strategic execution.",
                    "This service includes market insights, entry strategies, distributor and partner connections, trade show support, export-readiness consulting, and local representation with trusted industry networks. Through strategic partnerships, we help you open doors, accelerate opportunities, and scale your international presence with confidence."
                  ],
                  includes: ["Market insights", "Entry strategies", "Partner connections", "Trade show support", "Export consulting"]
                }
              ];

              return (
                <>
                  {/* Service Modal */}
                  <AnimatePresence>
                    {selectedService !== null && (
                      <MotionDiv
                        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onClick={() => setSelectedService(null)}
                      >
                        <MotionDiv
                          className="bg-[#111] text-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          {/* Close button */}
                          <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-20"
                          >
                            <X size={20} />
                          </button>
                          
                          {/* Hero Image */}
                          <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-2xl">
                            <img 
                              src={images[selectedService]} 
                              alt={extendedContent[selectedService].title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${gradients[selectedService]} opacity-60`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                            
                            {/* Service number badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${gradients[selectedService]} text-white px-3 py-1 rounded-full`}>
                                0{selectedService + 1}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6 md:p-8 -mt-8 relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 pr-10 leading-tight">
                              {extendedContent[selectedService].title}
                            </h2>
                            
                            {extendedContent[selectedService].paragraphs.map((para, i) => (
                              <p key={i} className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                                {para}
                              </p>
                            ))}
                            
                            {/* Includes tags */}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                              <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">{lang === 'es' ? 'Incluye:' : 'Includes:'}</span>
                              {extendedContent[selectedService].includes.map((item, i) => (
                                <span key={i} className={`text-xs bg-gradient-to-r ${gradients[selectedService]} text-white px-3 py-1 rounded-full`}>
                                  {item}
                                </span>
                              ))}
                            </div>
                            
                          </div>
                        </MotionDiv>
                      </MotionDiv>
                    )}
                  </AnimatePresence>

                  {/* Cards Grid */}
                  <div className="relative mb-8 md:mb-12">
                    <p className="text-center text-xs text-brand-navy/50 mb-4 md:hidden">
                      {lang === 'es' ? '← Desliza • Toca para más info →' : '← Swipe • Tap for more →'}
                    </p>
                    
                    <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:pb-0 scrollbar-hide">
                      {t.services.items.map((item, idx) => {
                        const Icon = icons[idx];
                        
                        return (
                          <FadeIn key={idx} delay={idx * 0.1}>
                            <div 
                              className="flex-shrink-0 w-[280px] md:w-auto cursor-pointer group"
                              onClick={() => setSelectedService(idx)}
                            >
                              <div className="relative h-[320px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
                                {/* Background Image */}
                                <img src={images[idx]} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className={`absolute inset-0 bg-gradient-to-t ${gradients[idx]} opacity-80 group-hover:opacity-90 transition-opacity`} />
                                
                                <div className="relative h-full flex flex-col justify-between p-5 md:p-6 text-white">
                                  {/* Top */}
                                  <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold uppercase tracking-widest">
                                      0{idx + 1}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                      0{idx + 1}
                                    </span>
                                  </div>
                                  
                                  {/* Bottom */}
                                  <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">{item.title}</h3>
                                    <p className="text-white/80 text-xs md:text-sm mb-4 line-clamp-2">{item.desc}</p>
                                    
                                    {/* Tap indicator */}
                                    <div className="flex items-center gap-2 text-white/60 text-xs group-hover:text-white transition-colors">
                                      <span>{lang === 'es' ? 'Toca para ver más' : 'Tap for details'}</span>
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
                </>
              );
            })()}

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
                        {t.services.missions.cta}
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
          </ScrollReveal>
        </section>

        {/* Assurances for decision-makers */}
        <section className="bg-white text-brand-navy py-16 md:py-24 border-t border-gray-100">
          <ScrollReveal className="container mx-auto px-4 md:px-6 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs">{t.assurances.title}</p>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">{t.assurances.subtitle}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {t.assurances.items.map((item, idx) => {
                const Icon = ASSURANCE_ICONS[item.icon] || Shield;
                return (
                  <div key={idx} className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-brand-gold/10 text-brand-navy flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold/70">0{idx + 1}</p>
                        <h4 className="text-lg font-bold">{item.title}</h4>
                      </div>
                    </div>
                    <p className="text-sm text-brand-navy/70 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                      <CheckCircle size={14} className="text-brand-gold" />
                      <span>{item.proof}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* 3. PROCESS - Zigzag Timeline Journey */}
        <section id="process" className="relative flex flex-col justify-center py-16 md:py-24 bg-[#F5F5F7] overflow-hidden">
          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10">
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
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d5ba8c] via-[#4a638f] to-[#002169] -translate-x-1/2 hidden md:block" />
              
              {t.process.steps.map((step, idx) => {
                const icons = [Target, FileText, Users, Package, Briefcase, Shield, Ship];
                const Icon = icons[idx] || Target;
                const colors = [
                  'bg-[#0b2f6b]',
                  'bg-[#b08c55]', 
                  'bg-[#1f3f70]',
                  'bg-[#0f2f66]',
                  'bg-[#d5ba8c]',
                  'bg-[#12315c]',
                  'bg-[#8a744f]'
                ];
                const borderColors = [
                  'border-l-[#0b2f6b]',
                  'border-l-[#b08c55]',
                  'border-l-[#1f3f70]', 
                  'border-l-[#0f2f66]',
                  'border-l-[#d5ba8c]',
                  'border-l-[#12315c]',
                  'border-l-[#8a744f]'
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
          </ScrollReveal>
        </section>

        {/* 4. OUR FOUNDER (Light) */}
        <section id="team" className="flex flex-col bg-[#F5F5F7] overflow-hidden">
          {/* Mobile-first stacked layout */}
          <ScrollReveal className="flex flex-col lg:flex-row min-h-screen">
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

              </FadeIn>
            </div>
          </ScrollReveal>
        </section>

        {/* 5. DIFFERENTIATORS - Mobile-First Cards */}
        <section id="differentiators" className="bg-gradient-to-br from-[#141B2D] via-[#1B2440] to-[#0f1521] text-white flex flex-col justify-center relative py-16 md:py-24 overflow-hidden">
          <GridPattern color="#C4A661" opacity={0.03} />
          
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-2xl opacity-50" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-2xl opacity-50" />
          </div>
          
          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-10 lg:mb-16">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs bg-brand-gold/10 px-4 py-2 rounded-full mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">{t.differentiators.title}</h2>
            </div>

            {/* Mobile: EXPANDABLE ACCORDION Cards */}
            <div className="lg:hidden space-y-3">
              {t.differentiators.items.map((item, idx) => {
                const [isExpanded, setIsExpanded] = useState(false);
                const colors = [
                  'from-[#0b2f6b] to-[#002169]',
                  'from-[#b08c55] to-[#d5ba8c]',
                  'from-[#1f3f70] to-[#0f2f66]'
                ];
                
                return (
                  <div 
                    key={idx} 
                    className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${isExpanded ? 'border-brand-gold/50' : ''}`}
                  >
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-full p-5 flex items-center gap-4 text-left"
                    >
                      <div className={`bg-gradient-to-br ${colors[idx]} px-3 py-2 rounded-xl shadow-lg flex-shrink-0 text-white text-xs font-bold uppercase tracking-wider`}>
                        0{idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-brand-gold/60 text-[10px] font-bold uppercase tracking-wider">0{idx + 1}</span>
                        <h3 className="text-white font-bold text-sm truncate">{item.title}</h3>
                      </div>
                      <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                        {isExpanded ? (lang === 'es' ? 'Cerrar' : 'Close') : (lang === 'es' ? 'Abrir' : 'Open')}
                      </span>
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
                const colors = [
                  'from-[#0b2f6b] to-[#002169]',
                  'from-[#b08c55] to-[#d5ba8c]',
                  'from-[#1f3f70] to-[#0f2f66]',
                  'from-[#0d264f] to-[#001a3a]',
                  'from-[#c6ab7b] to-[#d5ba8c]',
                  'from-[#223b6b] to-[#0f2a57]'
                ];
                const images = [
                  'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop',
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
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                        
                        {/* Description - Hidden by default, shows on hover */}
                        <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                        
                        {/* Read more indicator */}
                        <div className="flex items-center gap-2 text-brand-gold/60 text-xs mt-3 group-hover:text-brand-gold transition-colors">
                          <span>{lang === 'es' ? 'Ver más' : 'Learn more'}</span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* Capabilities deck landing */}
        <section id="capabilities" className="bg-[#0f1521] text-white py-16 md:py-24">
          <ScrollReveal className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-brand-gold font-bold uppercase tracking-[0.22em] text-xs">{t.capabilities.title}</p>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">{t.capabilities.subtitle}</h3>
                </div>
                <ul className="space-y-3">
                  {t.capabilities.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80">
                      <CheckCircle className="text-brand-gold mt-0.5" size={18} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-gold mb-2">{t.capabilities.previewLabel}</p>
                  <div className="space-y-3">
                    {t.capabilities.previewSlides.map((slide, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">0{idx + 1}</div>
                        <div>
                          <p className="font-semibold">{slide.title}</p>
                          <p className="text-sm text-white/70">{slide.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white text-brand-navy rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">{t.capabilities.form.title}</p>
                  <h4 className="text-2xl font-bold">{t.capabilities.form.subtitle}</h4>
                </div>
                <form className="space-y-4" onSubmit={handleDeckSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy/60">{t.capabilities.form.name}</label>
                      <input value={deckForm.name} onChange={(e) => handleDeckChange('name', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/70" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy/60">{t.capabilities.form.company}</label>
                      <input value={deckForm.company} onChange={(e) => handleDeckChange('company', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/70" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy/60">{t.capabilities.form.role}</label>
                      <input value={deckForm.role} onChange={(e) => handleDeckChange('role', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/70" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy/60">{t.capabilities.form.email}</label>
                      <input type="email" value={deckForm.email} onChange={(e) => handleDeckChange('email', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/70" />
                    </div>
                  </div>
                  <button type="submit" disabled={deckStatus === 'loading'} className="w-full bg-brand-navy text-white rounded-full py-3 font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-navy transition-colors">
                    {deckStatus === 'loading' ? 'Sending...' : deckStatus === 'success' ? 'Sent!' : t.capabilities.form.cta}
                  </button>
                  <p className="text-xs text-brand-navy/60">{t.capabilities.form.disclaimer}</p>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* CTB STRENGTHS - Full Section with Tinder-Style Cards */}
        <section className="min-h-screen bg-gradient-to-br from-[#0f1521] via-[#141B2D] to-[#1B2440] text-white relative overflow-hidden py-16 md:py-24">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-2xl opacity-40" />
          </div>
          <GridPattern color="#C4A661" opacity={0.03} />
          
          {(() => {
              const ctbStrengths = [
                { 
                  icon: Scissors, 
                  title: lang === 'es' ? 'Expertise en Cuero y Calzado' : 'Deep Leather & Footwear Expertise',
                  desc: lang === 'es' ? 'Décadas de experiencia en la industria del cuero y calzado de León, México.' : 'Decades of experience in León, Mexico leather and footwear industry.',
                  color: 'from-[#b08c55] to-[#d5ba8c]',
                  video: 'https://static.vecteezy.com/system/resources/previews/005/166/637/mp4/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/005/166/637/large/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.jpg'
                },
                { 
                  icon: Award, 
                  title: lang === 'es' ? 'Acceso a Fábricas Élite en México' : 'Access to Elite Factories in Mexico',
                  desc: lang === 'es' ? 'Red exclusiva de fabricantes certificados y verificados.' : 'Exclusive network of certified and verified manufacturers.',
                  color: 'from-[#0b2f6b] to-[#002169]',
                  video: 'https://static.vecteezy.com/system/resources/previews/007/995/834/mp4/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/007/995/834/large/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.jpg'
                },
                { 
                  icon: Globe, 
                  title: lang === 'es' ? 'Red Internacional (Brasil, Asia, USA)' : 'International Network (Brazil, Asia, USA)',
                  desc: lang === 'es' ? 'Conexiones globales para oportunidades sin fronteras.' : 'Global connections for borderless opportunities.',
                  color: 'from-[#1f3f70] to-[#0f2f66]',
                  video: 'https://static.vecteezy.com/system/resources/previews/024/834/351/mp4/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/024/834/351/large/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.jpg'
                },
                { 
                  icon: FileText, 
                  title: lang === 'es' ? 'Experiencia y Certificaciones de Exportación' : 'Export Experience & Certifications',
                  desc: lang === 'es' ? 'Documentación y compliance para comercio internacional.' : 'Documentation and compliance for international trade.',
                  color: 'from-[#c6ab7b] to-[#d5ba8c]',
                  video: 'https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg'
                },
                { 
                  icon: Settings, 
                  title: lang === 'es' ? 'Presencia Directa en Fábricas' : 'Hands-on Factory Presence',
                  desc: lang === 'es' ? 'Control de calidad en sitio y supervisión directa.' : 'On-site quality control and direct supervision.',
                  color: 'from-[#12315c] to-[#0b2247]',
                  video: 'https://static.vecteezy.com/system/resources/previews/060/472/965/mp4/three-people-are-standing-around-a-table-with-boxes-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/060/472/965/large/three-people-are-standing-around-a-table-with-boxes-free-video.jpg'
                },
                { 
                  icon: Users, 
                  title: lang === 'es' ? 'Liderazgo Bilingüe y Bicultural' : 'Bilingual, Bicultural Leadership',
                  desc: lang === 'es' ? 'Comunicación fluida entre culturas y mercados.' : 'Seamless communication across cultures and markets.',
                  color: 'from-[#27497a] to-[#0f2f66]',
                  video: 'https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4',
                  poster: 'https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg'
                },
              ];
              
              const [currentIndex, setCurrentIndex] = useState(0);
              const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
              const cardRef = useRef<HTMLDivElement>(null);
              const [dragX, setDragX] = useState(0);
              const [isDragging, setIsDragging] = useState(false);
              const dragStartX = useRef(0);
              const dragStartY = useRef(0);
              const isHorizontalSwipe = useRef(false);
              
              const handleSwipe = (direction: 'left' | 'right') => {
                if (direction === 'right' && currentIndex > 0) {
                  setExitDirection('right');
                  setTimeout(() => {
                    setCurrentIndex(prev => prev - 1);
                    setExitDirection(null);
                  }, 200);
                } else if (direction === 'left' && currentIndex < ctbStrengths.length - 1) {
                  setExitDirection('left');
                  setTimeout(() => {
                    setCurrentIndex(prev => prev + 1);
                    setExitDirection(null);
                  }, 200);
                }
              };
              
              // Touch handlers for swipe - improved for mobile
              const handleTouchStart = (e: React.TouchEvent) => {
                dragStartX.current = e.touches[0].clientX;
                dragStartY.current = e.touches[0].clientY;
                isHorizontalSwipe.current = false;
                setIsDragging(true);
                setDragX(0);
              };
              
              const handleTouchMove = (e: React.TouchEvent) => {
                if (!isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = currentX - dragStartX.current;
                const diffY = currentY - dragStartY.current;
                
                // Determine if this is a horizontal or vertical swipe (only once)
                if (!isHorizontalSwipe.current && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
                  isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
                }
                
                // Only handle horizontal swipes
                if (isHorizontalSwipe.current) {
                  e.preventDefault(); // Prevent vertical scroll
                  setDragX(diffX);
                }
              };
              
              const handleTouchEnd = () => {
                if (!isDragging) return;
                setIsDragging(false);
                
                // Only process if it was a horizontal swipe
                if (isHorizontalSwipe.current) {
                  const threshold = 50; // Reduced threshold for easier swiping
                  if (dragX < -threshold && currentIndex < ctbStrengths.length - 1) {
                    handleSwipe('left');
                  } else if (dragX > threshold && currentIndex > 0) {
                    handleSwipe('right');
                  }
                }
                
                setDragX(0);
                isHorizontalSwipe.current = false;
              };
              
              // Mouse handlers for desktop drag
              const handleMouseDown = (e: React.MouseEvent) => {
                dragStartX.current = e.clientX;
                setIsDragging(true);
              };
              
              const handleMouseMove = (e: React.MouseEvent) => {
                if (!isDragging) return;
                const diff = e.clientX - dragStartX.current;
                setDragX(diff);
              };
              
              const handleMouseUp = () => {
                if (!isDragging) return;
                setIsDragging(false);
                const threshold = 80;
                if (dragX < -threshold && currentIndex < ctbStrengths.length - 1) {
                  handleSwipe('left');
                } else if (dragX > threshold && currentIndex > 0) {
                  handleSwipe('right');
                }
                setDragX(0);
              };
              
              const handleMouseLeave = () => {
                if (isDragging) {
                  handleMouseUp();
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
                <ScrollReveal className="h-full flex flex-col relative z-10">
                  {/* Section Header - Fixed at top */}
                  <div className="text-center pt-8 md:pt-10 pb-4 px-4">
                    <FadeIn>
                      <div className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-[10px] bg-white/5 border border-brand-gold/30 px-4 py-2 rounded-full mb-3 backdrop-blur-sm">
                        {lang === 'es' ? 'Nuestras Fortalezas' : 'Our Strengths'}
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {lang === 'es' ? 'Fortalezas CTB' : 'CTB Strengths'}
                      </h2>
                      <p className="text-white/40 text-xs md:text-sm max-w-xl mx-auto">
                        {lang === 'es' ? '← Desliza para explorar →' : '← Swipe to explore →'}
                      </p>
                    </FadeIn>
                  </div>
                  
                  {/* MOBILE: Tinder-style immersive swipe cards */}
                  <div className="md:hidden flex-1 relative flex items-center justify-center px-4">
                    {/* Navigation arrows */}
                    <button 
                      onClick={() => handleSwipe('right')}
                      className={`absolute left-2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all ${currentIndex === 0 ? 'opacity-30' : 'active:scale-90'}`}
                      disabled={currentIndex === 0}
                    >
                      <span className="text-white text-lg font-bold">‹</span>
                    </button>
                    <button 
                      onClick={() => handleSwipe('left')}
                      className={`absolute right-2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all ${currentIndex === ctbStrengths.length - 1 ? 'opacity-30' : 'active:scale-90'}`}
                      disabled={currentIndex === ctbStrengths.length - 1}
                    >
                      <span className="text-white text-lg font-bold">›</span>
                    </button>
                    
                    {/* Card stack container - with swipe gestures */}
                    <div 
                      className="relative w-full max-w-[320px] h-[65vh] max-h-[480px] cursor-grab active:cursor-grabbing select-none touch-pan-y" 
                      style={{ 
                        perspective: '1200px',
                        touchAction: isDragging && isHorizontalSwipe.current ? 'none' : 'pan-y'
                      }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Background cards (stack effect) */}
                      {ctbStrengths.map((strength, idx) => {
                        const offset = idx - currentIndex;
                        if (offset < 0 || offset > 2) return null;
                        const Icon = strength.icon;
                        
                        return (
                          <div
                            key={idx}
                            className="absolute inset-0 rounded-[2.5rem] overflow-hidden transition-all duration-500 pointer-events-none"
                            style={{
                              transform: `translateX(${offset * 15}px) scale(${1 - offset * 0.05}) translateZ(${-offset * 50}px)`,
                              opacity: offset === 0 ? 1 : 0.5 - offset * 0.15,
                              zIndex: 10 - offset,
                              filter: offset > 0 ? 'blur(2px)' : 'none'
                            }}
                          />
                        );
                      })}
                      
                      {/* Main swipeable card */}
                      <AnimatePresence mode="wait" initial={false}>
                        <MotionDiv
                          key={currentIndex}
                          initial={{ 
                            opacity: 0, 
                            x: exitDirection === 'left' ? 200 : exitDirection === 'right' ? -200 : 0
                          }}
                          animate={{ 
                            opacity: 1, 
                            x: isDragging ? dragX : 0
                          }}
                          exit={{ 
                            opacity: 0, 
                            x: exitDirection === 'left' ? -200 : 200
                          }}
                          transition={{ 
                            duration: isDragging ? 0 : 0.25,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-none will-change-transform"
                        >
                          {/* Full-bleed background video */}
                          <div className="absolute inset-0">
                            <video
                              className="w-full h-full object-cover"
                              src={ctbStrengths[currentIndex].video}
                              poster={ctbStrengths[currentIndex].poster}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                            />
                          </div>
                          
                          {/* Cinematic gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${ctbStrengths[currentIndex].color} opacity-30 mix-blend-overlay`} />
                          
                          {/* Animated ambient glow */}
                          <MotionDiv 
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-t ${ctbStrengths[currentIndex].color} opacity-20 blur-2xl`}
                            animate={{ opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                          
                          {/* Top UI - Premium glassmorphism */}
                          <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start z-10">
                            {/* Counter badge */}
                            <div className="bg-black/40 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/10">
                              <div className="flex items-center gap-2">
                                <span className="text-brand-gold font-bold text-lg">{currentIndex + 1}</span>
                                <span className="text-white/50 text-sm">/ {ctbStrengths.length}</span>
                              </div>
                            </div>
                            
                            {/* Accent badge */}
                            <div className="relative">
                              <div className={`absolute inset-0 bg-gradient-to-br ${ctbStrengths[currentIndex].color} blur-lg opacity-60`} />
                              <div className={`relative bg-gradient-to-br ${ctbStrengths[currentIndex].color} p-4 rounded-2xl shadow-xl`}>
                                <span className="text-white font-bold text-sm uppercase tracking-widest">
                                  {String(currentIndex + 1).padStart(2, '0')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Bottom content - Immersive glass card */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                            <MotionDiv
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl"
                            >
                              {/* Title with gradient text effect */}
                              <h4 className="text-2xl font-bold text-white mb-3 leading-tight">
                                {ctbStrengths[currentIndex].title}
                              </h4>
                              
                              {/* Description */}
                              <p className="text-white/80 text-base leading-relaxed">
                                {ctbStrengths[currentIndex].desc}
                              </p>
                              
                              {/* Swipe hint */}
                              <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-white/10">
                                <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                                  {lang === 'es' ? 'Desliza para explorar' : 'Swipe to explore'}
                                </span>
                              </div>
                            </MotionDiv>
                          </div>
                          
                          {/* Decorative corner accents */}
                          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 blur-2xl" />
                          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/10 blur-2xl" />
                        </MotionDiv>
                      </AnimatePresence>
                    </div>
                    
                    {/* Progress dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-20">
                      {ctbStrengths.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToCard(idx)}
                          className={`rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                              ? 'bg-brand-gold w-8 h-2.5' 
                              : 'bg-white/30 w-2.5 h-2.5 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* DESKTOP: Full-width slider with text left, image right */}
                  <div className="hidden md:flex flex-1 items-center">
                    <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                      {/* Main content area */}
                      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                        {/* Left side - Text content */}
                        <div className="relative">
                          <AnimatePresence mode="wait">
                            <MotionDiv
                              key={currentIndex}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 30 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="space-y-4"
                            >
                              {/* Step indicator */}
                              <div className="flex items-center gap-4">
                                <span className="text-6xl lg:text-7xl font-black text-white/10">
                                  {String(currentIndex + 1).padStart(2, '0')}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-brand-gold to-transparent" />
                              </div>
                              
                              {/* Icon */}
                              <div className={`bg-gradient-to-br ${ctbStrengths[currentIndex].color} px-4 py-2 rounded-xl w-fit shadow-2xl text-white text-sm font-bold uppercase tracking-widest`}>
                                {String(currentIndex + 1).padStart(2, '0')}
                              </div>
                              
                              {/* Title */}
                              <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                                {ctbStrengths[currentIndex].title}
                              </h3>
                              
                              {/* Description */}
                              <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                                {ctbStrengths[currentIndex].desc}
                              </p>
                              
                              {/* Navigation */}
                              <div className="flex items-center gap-4 pt-4">
                                <button
                                  onClick={() => currentIndex > 0 && goToCard(currentIndex - 1)}
                                  disabled={currentIndex === 0}
                                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                                    currentIndex === 0 
                                      ? 'border-white/20 text-white/20 cursor-not-allowed' 
                                      : 'border-white/40 text-white hover:bg-white hover:text-brand-navy'
                                  }`}
                                >
                                  <span className="font-bold text-lg">‹</span>
                                </button>
                                <button
                                  onClick={() => currentIndex < ctbStrengths.length - 1 && goToCard(currentIndex + 1)}
                                  disabled={currentIndex === ctbStrengths.length - 1}
                                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                                    currentIndex === ctbStrengths.length - 1 
                                      ? 'border-white/20 text-white/20 cursor-not-allowed' 
                                      : 'border-white/40 text-white hover:bg-white hover:text-brand-navy'
                                  }`}
                                >
                                  <span className="font-bold text-lg">›</span>
                                </button>
                                
                                {/* Progress indicator */}
                                <div className="flex gap-2 ml-4">
                                  {ctbStrengths.map((_, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => goToCard(idx)}
                                      className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentIndex 
                                          ? 'bg-brand-gold w-8' 
                                          : 'bg-white/30 w-3 hover:bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </MotionDiv>
                          </AnimatePresence>
                        </div>
                        
                        {/* Right side - Image */}
                        <div className="relative h-[380px] lg:h-[450px]">
                          <AnimatePresence mode="wait">
                            <MotionDiv
                              key={currentIndex}
                              initial={{ opacity: 0, scale: 0.95, x: 50 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 1.05, x: -50 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                            >
                              <video
                                className="w-full h-full object-cover"
                                src={ctbStrengths[currentIndex].video}
                                poster={ctbStrengths[currentIndex].poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                              />
                              {/* Gradient overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${ctbStrengths[currentIndex].color} opacity-40`} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                              
                              {/* Floating badge */}
                              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30">
                                <span className="text-white font-bold">{currentIndex + 1} / {ctbStrengths.length}</span>
                              </div>
                              
                              {/* Decorative corner accent */}
                              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/20 blur-2xl" />
                            </MotionDiv>
                          </AnimatePresence>
                        </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
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
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setSelectedTestimonial(null)}
            >
              <MotionDiv
                className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xs font-bold uppercase tracking-wider">Close</span>
                </button>
                <div className="flex gap-1 mb-4 text-brand-gold text-sm font-bold tracking-widest">
                  ★★★★★
                </div>
                <p className="text-gray-700 text-base md:text-lg italic leading-relaxed mb-6">
                  "{selectedTestimonial.text}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  {selectedTestimonial.image ? (
                    <img src={selectedTestimonial.image} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold/30" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-navy to-brand-navy/80 flex items-center justify-center border-2 border-brand-gold/30 text-brand-gold font-bold">
                      {selectedTestimonial.name?.[0] || '?'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-brand-navy">{selectedTestimonial.name}</p>
                    <p className="text-sm text-gray-500">{selectedTestimonial.role}</p>
                    <p className="text-xs text-brand-gold flex items-center gap-1">
                      <span>{getCountryFlag(selectedTestimonial.countryCode)}</span>
                      {selectedTestimonial.country}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>

        <section className="min-h-screen bg-gradient-to-b from-[#141B2D] via-brand-navy to-brand-navy relative py-16 md:py-24 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, rgba(196,166,97,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(196,166,97,0.2) 0%, transparent 40%)`
            }} />
          </div>
          
          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <FadeIn>
              <div className="text-center mb-6 md:mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
                  {lang === 'en' ? 'Know the Bridge Effect' : 'Conoce el Efecto Puente'}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {lang === 'en' ? 'More Than' : 'Más de'} <span className="text-brand-gold">20</span> {lang === 'en' ? 'Countries' : 'Países'}
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                  {lang === 'en' ? 'Connecting businesses across continents, one successful partnership at a time' : 'Conectando negocios a través de continentes, una alianza exitosa a la vez'}
                </p>
              </div>
            </FadeIn>

            {/* Bridge SVG with Testimonials anchored to deck */}
            <div className="relative max-w-6xl mx-auto h-[360px] md:h-[420px] overflow-visible mt-24 md:mt-32">
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

              {/* Testimonials anchored to bridge deck */}
              {testimonialIndices.map((testimonialIdx, idx) => {
                const testimonial = t.testimonials.items[testimonialIdx];
                if (!testimonial) return null;
                
                return (
                  <MotionDiv
                    key={`walker-${idx}`}
                    className="absolute"
                    style={{ 
                      top: '68%',
                      left: `${16 + idx * 30}%`
                    }}
                  >
                    <div className="relative">
                      {/* Dialog Bubble - CLICKABLE */}
                      <MotionDiv
                        key={`bubble-${idx}-${testimonialIdx}`}
                        className={`absolute -top-10 md:-top-16 ${idx === 1 ? '-left-20 md:-left-28' : '-left-12 md:-left-20'} w-44 md:w-60 ${idx === 1 ? 'bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border-brand-gold/50' : 'bg-white/95 border-brand-gold/20'} backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-xl border cursor-pointer hover:scale-105 transition-transform`}
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
                            {testimonial.image ? (
                              <img src={testimonial.image} alt="" className="w-5 h-5 md:w-7 md:h-7 rounded-full object-cover border border-brand-gold/30" />
                            ) : (
                              <div className={`w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center border border-brand-gold/30 ${idx === 1 ? 'bg-gradient-to-br from-brand-navy to-brand-navy/80' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                                <User className={`w-3 h-3 md:w-4 md:h-4 ${idx === 1 ? 'text-brand-gold/70' : 'text-white/70'}`} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <span className={`text-[8px] md:text-[10px] font-semibold ${idx === 1 ? 'text-white' : 'text-brand-navy'} block truncate`}>{testimonial.name}</span>
                              <span className={`text-[7px] md:text-[9px] ${idx === 1 ? 'text-brand-gold' : 'text-gray-500'} flex items-center gap-1`}>
                                <span>{getCountryFlag(testimonial.countryCode)}</span>
                                {testimonial.country}
                              </span>
                            </div>
                        </div>
                        {/* Bubble tail */}
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 ${idx === 1 ? 'bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border-brand-gold/50' : 'bg-white/95 border-brand-gold/20'} transform rotate-45 border-r border-b`}>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-brand-gold/50 to-transparent opacity-70" />
                        </div>
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
                        src="/img/Collage/Collage_embajada_alemania.jpg" 
                        alt="German Embassy"
                        className="w-full h-[80px] md:h-[120px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] md:text-[10px] font-bold text-brand-navy uppercase tracking-wider">{lang === 'en' ? 'Partnerships' : 'Alianzas'}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-400">🇩🇪 Germany</p>
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
                        src="/img/Collage/Collage_mision_Thailandia.jpg" 
                        alt="Thailand Mission"
                        className="w-full h-[70px] md:h-[100px] object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[8px] md:text-[10px] font-bold text-brand-navy uppercase tracking-wider">{lang === 'en' ? 'Trade Mission' : 'Misión Comercial'}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-400">🇹🇭 Thailand</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stamp 3 - Polaroid style, center */}
                  <div className="absolute right-[25%] md:right-[30%] top-[0%] md:top-[5%] w-[110px] md:w-[160px] transform -rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-500 z-30 group">
                    <div className="bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-2xl rounded-sm">
                      <img 
                        src="/img/Collage/Collage_junta.jpg" 
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
                        src="/img/Collage/Collage_control_de_calidad.jpg" 
                        alt="Quality Control"
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
                        src="/img/Collage/Collage_junta2.jpg" 
                        alt="Team meeting"
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
                        src="/img/Collage/Collage_control_de_calidad.jpg" 
                        alt="Quality Control"
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
                        src="/img/Collage/Collage_mision_Thailandia.jpg" 
                        alt="Thailand Mission"
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

            {/* Countries Carousel - Single Marquee */}
            <div className="relative py-8 md:py-12 mt-8 md:mt-12 overflow-hidden">
              <FadeIn>
                <p className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-brand-gold/60 mb-6 md:mb-8">
                  {lang === 'en' ? 'Presence in 20+ Countries' : 'Presencia en más de 20 Países'}
                </p>
              </FadeIn>
              <div className="relative overflow-hidden mask-fade">
                <MotionDiv
                  className="flex gap-3 md:gap-5 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
                >
                  {[...[
                    'USA','Canada','Mexico','Brazil','Chile','Germany','Spain','Portugal','Italy','England','France',
                    'China','Japan','Taiwan','Hong Kong','Vietnam','Thailand','India','Singapore','Indonesia','Malaysia','Laos',
                    'Australia','New Zealand','South Africa','Argentina','Colombia','Peru','Netherlands','Belgium','Switzerland'
                  ], ...[
                    'USA','Canada','Mexico','Brazil','Chile','Germany','Spain','Portugal','Italy','England','France',
                    'China','Japan','Taiwan','Hong Kong','Vietnam','Thailand','India','Singapore','Indonesia','Malaysia','Laos',
                    'Australia','New Zealand','South Africa','Argentina','Colombia','Peru','Netherlands','Belgium','Switzerland'
                  ]].map((country, i) => {
                    const codeMap: Record<string, string> = {
                      USA: 'US', Canada: 'CA', Mexico: 'MX', Brazil: 'BR', Chile: 'CL',
                      Germany: 'DE', Spain: 'ES', Portugal: 'PT', Italy: 'IT', England: 'GB', France: 'FR',
                      China: 'CN', Japan: 'JP', Taiwan: 'TW', 'Hong Kong': 'HK', Vietnam: 'VN', Thailand: 'TH', India: 'IN', Singapore: 'SG', Indonesia: 'ID', Malaysia: 'MY', Laos: 'LA',
                      Australia: 'AU', 'New Zealand': 'NZ', 'South Africa': 'ZA', Argentina: 'AR', Colombia: 'CO', Peru: 'PE', Netherlands: 'NL', Belgium: 'BE', Switzerland: 'CH'
                    };
                    const isGold = i % 5 === 0;
                    return (
                      <div key={i} className={`inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full border ${isGold ? 'bg-brand-gold/20 border-brand-gold/30' : 'bg-white/10 border-white/20'}`}>
                        <span className="text-xs md:text-sm">{countryCodeToFlag(codeMap[country] || 'US')}</span>
                        <span className="text-[10px] md:text-xs font-semibold text-white/80">{country}</span>
                      </div>
                    );
                  })}
                </MotionDiv>
              </div>
            </div>

            {/* Stats Counters */}
            <div className="flex justify-center gap-8 md:gap-16 flex-wrap mt-8 md:mt-12">
              {[{ v: t.stats.years, l: t.stats.yearsLabel }, { v: t.stats.alliances, l: t.stats.alliancesLabel }].map((stat, i) => (
                <Counter key={i} value={stat.v} label={stat.l} dark={false} />
              ))}
            </div>

            {/* Allies Logo Marquee */}
            <div className="mt-12 md:mt-16 mb-12">
              <LogoMarquee dark={false} />
            </div>
          </ScrollReveal>
        </section>
        </>
          );
        })()}

        {/* 6. SHOWROOM (Dark) */}
        <section id="showroom" className="bg-[#111] text-white flex flex-col justify-center relative py-16 md:py-24">
          <ScrollReveal className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
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
          </ScrollReveal>
        </section>

        {/* BECOME A PARTNER - For Providers */}
        <section className="bg-gradient-to-br from-brand-navy via-[#1B2440] to-[#0f1521] text-white flex flex-col justify-center relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-28">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* World map background */}
            <img src="/img/world-map.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-5" />
            {/* Animated gradient orbs */}
            <div className="absolute top-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
          </div>
          
          <GridPattern color="#C4A661" opacity={0.03} />
          
          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10 py-16 lg:py-10 mt-8">
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

            {/* Benefits - Tinder Style Swipe Cards */}
            {(() => {
              const partnerBenefits = [
                {
                  icon: Globe,
                  title: lang === 'es' ? 'Alcance Mundial' : 'Worldwide Reach',
                  desc: lang === 'es' 
                    ? 'Expande tu negocio a mercados internacionales a través de nuestra red establecida'
                    : 'Expand your business to international markets through our established network',
                  color: 'from-[#1f3f70] to-[#0f2f66]',
                  image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1740&auto=format&fit=crop'
                },
                {
                  icon: Users,
                  title: lang === 'es' ? 'Socios Estratégicos' : 'Strategic Partners',
                  desc: lang === 'es'
                    ? 'Conecta con marcas premium de USA y otros mercados buscando calidad mexicana'
                    : 'Connect with premium brands from USA and other markets seeking Mexican quality',
                  color: 'from-[#b08c55] to-[#d5ba8c]',
                  image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop'
                },
                {
                  icon: Award,
                  title: lang === 'es' ? 'Reconocimiento de Élite' : 'Elite Recognition',
                  desc: lang === 'es'
                    ? 'Sé parte de un directorio selecto de proveedores certificados y verificados'
                    : 'Be part of a select directory of certified and verified suppliers',
                  color: 'from-[#0b2f6b] to-[#002169]',
                  image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1740&auto=format&fit=crop'
                },
                {
                  icon: Ship,
                  title: lang === 'es' ? 'Soporte Logístico' : 'Logistics Support',
                  desc: lang === 'es'
                    ? 'Facilitamos exportaciones y coordinamos envíos internacionales'
                    : 'We facilitate exports and coordinate international shipments',
                  color: 'from-[#12315c] to-[#0b2247]',
                  image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1740&auto=format&fit=crop'
                },
                {
                  icon: Target,
                  title: lang === 'es' ? 'Clientes Calificados' : 'Qualified Clients',
                  desc: lang === 'es'
                    ? 'Accede a compradores serios y proyectos con volumen garantizado'
                    : 'Access serious buyers and projects with guaranteed volume',
                  color: 'from-[#c6ab7b] to-[#d5ba8c]',
                  image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1740&auto=format&fit=crop'
                },
                {
                  icon: Shield,
                  title: lang === 'es' ? 'Pagos Seguros' : 'Secure Payments',
                  desc: lang === 'es'
                    ? 'Transacciones protegidas y términos comerciales claros'
                    : 'Protected transactions and clear commercial terms',
                  color: 'from-[#223b6b] to-[#0f2a57]',
                  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1740&auto=format&fit=crop'
                }
              ];
              
              const [partnerCardIndex, setPartnerCardIndex] = useState(0);
              const [partnerExitDir, setPartnerExitDir] = useState<'left' | 'right' | null>(null);
              const [partnerDragX, setPartnerDragX] = useState(0);
              const [partnerIsDragging, setPartnerIsDragging] = useState(false);
              const partnerDragStartX = useRef(0);
              
              const handlePartnerSwipe = (direction: 'left' | 'right') => {
                if (direction === 'right' && partnerCardIndex > 0) {
                  setPartnerExitDir('right');
                  setTimeout(() => {
                    setPartnerCardIndex(prev => prev - 1);
                    setPartnerExitDir(null);
                  }, 250);
                } else if (direction === 'left' && partnerCardIndex < partnerBenefits.length - 1) {
                  setPartnerExitDir('left');
                  setTimeout(() => {
                    setPartnerCardIndex(prev => prev + 1);
                    setPartnerExitDir(null);
                  }, 250);
                }
              };
              
              // Touch handlers for partner swipe
              const handlePartnerTouchStart = (e: React.TouchEvent) => {
                partnerDragStartX.current = e.touches[0].clientX;
                setPartnerIsDragging(true);
              };
              
              const handlePartnerTouchMove = (e: React.TouchEvent) => {
                if (!partnerIsDragging) return;
                const currentX = e.touches[0].clientX;
                const diff = currentX - partnerDragStartX.current;
                setPartnerDragX(diff);
              };
              
              const handlePartnerTouchEnd = () => {
                setPartnerIsDragging(false);
                const threshold = 60;
                if (partnerDragX < -threshold && partnerCardIndex < partnerBenefits.length - 1) {
                  handlePartnerSwipe('left');
                } else if (partnerDragX > threshold && partnerCardIndex > 0) {
                  handlePartnerSwipe('right');
                }
                setPartnerDragX(0);
              };
              
              // Mouse handlers for partner drag
              const handlePartnerMouseDown = (e: React.MouseEvent) => {
                partnerDragStartX.current = e.clientX;
                setPartnerIsDragging(true);
              };
              
              const handlePartnerMouseMove = (e: React.MouseEvent) => {
                if (!partnerIsDragging) return;
                const diff = e.clientX - partnerDragStartX.current;
                setPartnerDragX(diff);
              };
              
              const handlePartnerMouseUp = () => {
                if (!partnerIsDragging) return;
                setPartnerIsDragging(false);
                const threshold = 60;
                if (partnerDragX < -threshold && partnerCardIndex < partnerBenefits.length - 1) {
                  handlePartnerSwipe('left');
                } else if (partnerDragX > threshold && partnerCardIndex > 0) {
                  handlePartnerSwipe('right');
                }
                setPartnerDragX(0);
              };
              
              const handlePartnerMouseLeave = () => {
                if (partnerIsDragging) {
                  handlePartnerMouseUp();
                }
              };
              
              const currentBenefit = partnerBenefits[partnerCardIndex];
              
              return (
                <div className="max-w-6xl mx-auto mb-12 lg:mb-16">
                  {/* Mobile: Tinder-style swipe cards */}
                  <div className="lg:hidden">
                    <div 
                      className="relative h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                      onTouchStart={handlePartnerTouchStart}
                      onTouchMove={handlePartnerTouchMove}
                      onTouchEnd={handlePartnerTouchEnd}
                      onMouseDown={handlePartnerMouseDown}
                      onMouseMove={handlePartnerMouseMove}
                      onMouseUp={handlePartnerMouseUp}
                      onMouseLeave={handlePartnerMouseLeave}
                    >
                      {/* Navigation arrows */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePartnerSwipe('right'); }}
                      className={`absolute left-2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all ${partnerCardIndex === 0 ? 'opacity-30' : 'hover:bg-white/20'}`}
                      disabled={partnerCardIndex === 0}
                    >
                      <span className="text-white text-lg font-bold">‹</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePartnerSwipe('left'); }}
                      className={`absolute right-2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all ${partnerCardIndex === partnerBenefits.length - 1 ? 'opacity-30' : 'hover:bg-white/20'}`}
                      disabled={partnerCardIndex === partnerBenefits.length - 1}
                    >
                      <span className="text-white text-lg font-bold">›</span>
                    </button>
                      
                      {/* Swipeable card */}
                      <AnimatePresence mode="wait" initial={false}>
                        <MotionDiv
                          key={partnerCardIndex}
                          initial={{ 
                            opacity: 0, 
                            x: partnerExitDir === 'left' ? 200 : partnerExitDir === 'right' ? -200 : 0
                          }}
                          animate={{ 
                            opacity: 1, 
                            x: partnerIsDragging ? partnerDragX : 0
                          }}
                          exit={{ 
                            opacity: 0, 
                            x: partnerExitDir === 'left' ? -200 : 200
                          }}
                          transition={{ 
                            duration: partnerIsDragging ? 0 : 0.25,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="w-[280px] h-[300px] relative pointer-events-none will-change-transform"
                        >
                          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative group">
                            {/* Background image */}
                            <img 
                              src={currentBenefit.image} 
                              alt={currentBenefit.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              draggable={false}
                            />
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent`} />
                            
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                              <div className={`bg-gradient-to-br ${currentBenefit.color} px-3 py-1.5 rounded-xl w-fit mb-3 shadow-lg text-white text-sm font-bold uppercase tracking-widest`}>
                                {String(partnerCardIndex + 1).padStart(2, '0')}
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{currentBenefit.title}</h3>
                              <p className="text-gray-300 text-sm leading-relaxed">{currentBenefit.desc}</p>
                            </div>
                            
                            {/* Card number indicator */}
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-white text-xs font-bold">{partnerCardIndex + 1} / {partnerBenefits.length}</span>
                            </div>
                          </div>
                        </MotionDiv>
                      </AnimatePresence>
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                      {partnerBenefits.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setPartnerExitDir(idx > partnerCardIndex ? 'left' : 'right');
                            setTimeout(() => {
                              setPartnerCardIndex(idx);
                              setPartnerExitDir(null);
                            }, 150);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === partnerCardIndex ? 'bg-brand-gold w-6' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Swipe hint */}
                    <p className="text-center text-white/40 text-xs mt-3">
                      {lang === 'es' ? '← Desliza para explorar →' : '← Swipe to explore →'}
                    </p>
                  </div>
                  
                  {/* Desktop: Grid layout */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                    {partnerBenefits.map((benefit, idx) => {
                      return (
                        <FadeIn key={idx} delay={idx * 0.1}>
                          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-1 h-full relative overflow-hidden">
                            {/* Subtle background image on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                              <img src={benefit.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="relative z-10">
                              <div className={`bg-gradient-to-br ${benefit.color} px-3 py-1.5 rounded-xl w-fit mb-3 shadow-lg group-hover:scale-110 transition-transform text-white text-sm font-bold uppercase tracking-widest`}>
                                {String(idx + 1).padStart(2, '0')}
                              </div>
                              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                              <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-navy px-5 py-3 rounded-full shadow-xl z-10 font-bold uppercase tracking-widest animate-pulse">
                  CTB
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
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. CONTACT (Light) */}
        <section id="contact" className="bg-white flex flex-col justify-center relative text-brand-navy py-16 md:py-24">
          <GridPattern color="#1B2440" opacity={0.03} />
          <ScrollReveal className="container mx-auto px-4 md:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-1">
            <div>
              <FadeIn>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Get in Touch</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 text-brand-navy">{t.contact.title}</h2>
                <div className="space-y-4 md:space-y-8 text-sm md:text-lg">
                  <a href="mailto:info@crossthebridge.co" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    info@crossthebridge.co
                  </a>
                  <a href="tel:+524777653792" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    +52 477 765 3792
                  </a>
                  <div className="flex items-center gap-3 md:gap-4">
                    León Gto, México
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                  <a href="https://www.linkedin.com/company/cross-the-bridge-mx/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">LinkedIn</a>
                  <a href="https://www.instagram.com/crossthebridge.mx?igsh=bnF6dGdtdXB4MHIw" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61583895457222" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">Facebook</a>
                </div>
              </FadeIn>
            </div>

            <div className="w-full bg-[#F5F5F7] text-brand-navy p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
              <form className="space-y-4 md:space-y-5" onSubmit={handleContactSubmit}>
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
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.company}</label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.website}</label>
                    <input
                      type="url"
                      value={contactForm.website}
                      onChange={(e) => handleContactChange('website', e.target.value)}
                      placeholder="https://"
                      className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.serviceInterest}</label>
                  <select
                    value={contactForm.serviceInterest}
                    onChange={(e) => handleContactChange('serviceInterest', e.target.value)}
                    required
                    className="w-full bg-white p-2.5 md:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    {serviceOptions.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.message}</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    placeholder={t.contact.form.messageHint}
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
          </ScrollReveal>

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

      </div>

    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  // Safety timeout so loading screen doesn't hang if video stalls
  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      <NoiseOverlay />
      <AnimatePresence mode='wait'>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <MainContent lang={lang} setLang={setLang} onHeroReady={() => setLoading(false)} />}
    </>
  );
}
