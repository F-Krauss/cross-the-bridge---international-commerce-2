
import React, { useState, useEffect, useRef, useId } from 'react';
import { Package, Globe, Layers, ArrowRight, CheckCircle, Phone, Mail, Menu, X, Users, User, Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Scissors, Shirt, GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, ChevronLeft, ChevronRight, MousePointer2, Settings, Award, Send, Target, FileText, Shield, Ship, Compass, RotateCcw, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import HeroSection from './src/sections/HeroSection';
import LogoCarouselSection from './src/sections/LogoCarouselSection';
import ServicesSection from './src/sections/ServicesSection';
import ProcessSection from './src/sections/ProcessSection';
import TradeMissionsSection from './src/sections/TradeMissionsSection';
import AboutSection from './src/sections/AboutSection';
import LogoMarquee from './src/components/LogoMarquee';
import { TRANSLATIONS, UI_TEXT, STRENGTHS_CARDS, PARTNER_BENEFITS, COLLAGE_ITEMS, BOOKING_PHONE_CODES, BOOKING_TIME_SLOTS, DEFAULT_TESTIMONIALS } from './constants';
import { Language } from './types';

// Assets served from public/img
const mapImage = '/img/world-map.svg';
const logoVertical = '/img/ganzo.png';
const logoWordmarkPng = '/img/Logo_letras.png';

const ICON_MAP = {
  Hexagon,
  Anchor,
  Box,
  Globe,
  Truck,
  Layers,
  MapPin,
  Navigation,
  Scissors,
  Award,
  FileText,
  Settings,
  Users,
  Ship,
  Target,
  Shield,
  Package
} as const;
type IconKey = keyof typeof ICON_MAP;

const SERVICES_CONTENT: Record<Language, {
  title: string;
  intro: string;
  items: { title: string; short: string; long: string[] }[];
}> = {
  en: {
    title: "Services",
    intro: "We are a strategic partner for brands building reliable international manufacturing.",
    items: [
      {
        title: "Raw Materials Sourcing & Supply Assurance",
        short: "We make sourcing from Mexico reliable for international brands.",
        long: [
          "We make raw material sourcing from Mexico reliable, predictable, and export-ready for the leather, footwear, and fashion industries.",
          "Cross the Bridge ensures consistent raw material sourcing through local oversight and an established supply network across Mexico’s leather and fashion ecosystem. We secure aligned specifications, material availability, and market-based commercial terms to support uninterrupted production.",
          "By representing multiple brands and maintaining long-term supplier relationships, we operate with collective scale and credibility. This provides access to preferred materials and commercially aligned conditions, particularly for high-demand or limited-supply inputs.",
          "Through on-the-ground follow-up, we anticipate risks, align negotiations with local market realities, and address issues early, turning raw material sourcing into a dependable supply strategy."
        ]
      },
      {
        title: "Manufacturing & Supply Chain Operations",
        short: "Scale without production headaches.",
        long: [
          "We become your team on the ground, managing every step of the production process so you can focus on design, sales, and brand growth.",
          "From product development and prototyping to full-scale production, we coordinate daily with factories, track timelines, streamline communication, and resolve issues to keep every deliverable on schedule. Our role goes beyond coordination. We translate expectations, align standards, and anticipate risks before they impact cost, quality, or delivery.",
          "This service includes production planning, materials follow-up, cost finalization, capacity scheduling, quality inspections, risk management, and complete export readiness. You gain transparency, control, and peace of mind, knowing your production is managed locally with international standards and a clear understanding of both sides of the bridge."
        ]
      },
      {
        title: "International Growth & Strategic Partnerships",
        short: "We transform international expansion into a strategic advantage, not a costly learning curve.",
        long: [
          "At Cross the Bridge, we support companies ready to expand beyond their home market through informed decisions and strategic partnerships — not trial-and-error internationalization.",
          "We combine market intelligence, a trusted international network, and hands-on guidance to define where to expand, how to enter, and which partners to align with. Rather than pushing expansion for expansion’s sake, we structure each move based on real opportunity, timing, and strategic fit.",
          "We work through carefully selected projects, supporting founders and leadership teams as they navigate complex international decisions. From early market validation to long-term partner structuring, we reduce risk by ensuring every step is grounded in operational reality, not assumptions.",
          "This service includes market validation, entry and expansion strategies, partner and distributor structuring, trade show and commercial support, export-readiness consulting, and local representation through licensing or strategic alliances. We stay involved on the ground, helping companies move from strategy to execution with confidence and control."
        ]
      }
    ]
  },
  es: {
    title: "Servicios",
    intro: "We are a strategic partner for brands building reliable international manufacturing.",
    items: [
      {
        title: "Raw Materials Sourcing & Supply Assurance",
        short: "We make sourcing from Mexico reliable for international brands.",
        long: [
          "We make raw material sourcing from Mexico reliable, predictable, and export-ready for the leather, footwear, and fashion industries.",
          "Cross the Bridge ensures consistent raw material sourcing through local oversight and an established supply network across Mexico’s leather and fashion ecosystem. We secure aligned specifications, material availability, and market-based commercial terms to support uninterrupted production.",
          "By representing multiple brands and maintaining long-term supplier relationships, we operate with collective scale and credibility. This provides access to preferred materials and commercially aligned conditions, particularly for high-demand or limited-supply inputs.",
          "Through on-the-ground follow-up, we anticipate risks, align negotiations with local market realities, and address issues early, turning raw material sourcing into a dependable supply strategy."
        ]
      },
      {
        title: "Manufacturing & Supply Chain Operations",
        short: "Scale without production headaches.",
        long: [
          "We become your team on the ground, managing every step of the production process so you can focus on design, sales, and brand growth.",
          "From product development and prototyping to full-scale production, we coordinate daily with factories, track timelines, streamline communication, and resolve issues to keep every deliverable on schedule. Our role goes beyond coordination. We translate expectations, align standards, and anticipate risks before they impact cost, quality, or delivery.",
          "This service includes production planning, materials follow-up, cost finalization, capacity scheduling, quality inspections, risk management, and complete export readiness. You gain transparency, control, and peace of mind, knowing your production is managed locally with international standards and a clear understanding of both sides of the bridge."
        ]
      },
      {
        title: "International Growth & Strategic Partnerships",
        short: "We transform international expansion into a strategic advantage, not a costly learning curve.",
        long: [
          "At Cross the Bridge, we support companies ready to expand beyond their home market through informed decisions and strategic partnerships — not trial-and-error internationalization.",
          "We combine market intelligence, a trusted international network, and hands-on guidance to define where to expand, how to enter, and which partners to align with. Rather than pushing expansion for expansion’s sake, we structure each move based on real opportunity, timing, and strategic fit.",
          "We work through carefully selected projects, supporting founders and leadership teams as they navigate complex international decisions. From early market validation to long-term partner structuring, we reduce risk by ensuring every step is grounded in operational reality, not assumptions.",
          "This service includes market validation, entry and expansion strategies, partner and distributor structuring, trade show and commercial support, export-readiness consulting, and local representation through licensing or strategic alliances. We stay involved on the ground, helping companies move from strategy to execution with confidence and control."
        ]
      }
    ]
  }
};

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
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)` ,
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
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px -15% 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
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
        duration: 0.5, 
        delay: Math.min(delay, 0.15), // keep cadence tight so sections sync
        ease: [0.15, 0.85, 0.35, 1]
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
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "", amount = 0.05 }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.55, ease: [0.15, 0.85, 0.35, 1] }}
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
          darkTheme ? 'bg-brand-navy border-white/10' : 'bg-[#f6f7fb] border-gray-100'
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
    className="fixed inset-0 bg-[#f6f7fb] z-[300] overflow-y-auto pt-24 pb-12"
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
  const [showroomCategory, setShowroomCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', website: '', serviceInterest: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  const [deckForm, setDeckForm] = useState({ name: '', company: '', email: '', role: '' });
  const [deckStatus, setDeckStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCode: '+1',
    website: '',
    company: '',
    orgs: '',
    position: '',
    service: '',
    originCountry: 'South America',
    targetRegion: '',
    date: '',
    timeSlot: ''
  });
  const [scrollY, setScrollY] = useState(0);

  const t = TRANSLATIONS[lang];
  const ui = UI_TEXT[lang];
  const navLinks = ['services', 'process', 'trade_missions', 'about', 'bridge_effect', 'contact'];
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Track scroll position for progress indicator
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for loading complete event
  useEffect(() => {
    const handleLoadingComplete = () => setLoadingComplete(true);
    window.addEventListener('loadingComplete', handleLoadingComplete);
    return () => window.removeEventListener('loadingComplete', handleLoadingComplete);
  }, []);

  // Ensure autoplay videos start as soon as possible - but AFTER loading screen is gone
  useEffect(() => {
    if (!loadingComplete) return; // Wait until loading screen is complete
    
    const playAll = () => {
      const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]'));
      videos.forEach((video) => {
        if (!video.paused) return; // Already playing
        
        // Check if video is in or near viewport
        const rect = video.getBoundingClientRect();
        const isNearViewport = rect.bottom > -500 && rect.top < window.innerHeight + 500;
        
        if (isNearViewport) {
          // Force load if not loaded yet
          if (video.readyState < 2) {
            video.load();
          }
          
          // Try to play regardless of readyState - browsers will handle it
          const playPromise = video.play();
          if (playPromise?.catch) {
            playPromise.catch((err) => {
              console.debug('Video autoplay blocked:', err);
            });
          }
        }
      });
    };

    // Very aggressive initial play attempts after loading completes
    playAll();
    const timer1 = setTimeout(playAll, 100);
    const timer2 = setTimeout(playAll, 200);
    const timer3 = setTimeout(playAll, 400);
    const timer4 = setTimeout(playAll, 800);
    const timer5 = setTimeout(playAll, 1200);
    const timer6 = setTimeout(playAll, 1600);
    const timer7 = setTimeout(playAll, 2000);
    const timer8 = setTimeout(playAll, 2500);
    
    // Play on visibility change (tab becomes visible)
    const onVisibility = () => !document.hidden && playAll();
    
    // Play on scroll
    const onScroll = () => playAll();
    
    // Play on user interaction
    const onInteraction = () => playAll();
    
    window.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchstart', onInteraction, { passive: true });
    window.addEventListener('click', onInteraction, { passive: true });
    window.addEventListener('focus', onInteraction);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
      window.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('click', onInteraction);
      window.removeEventListener('focus', onInteraction);
    };
  }, [loadingComplete]); // Only run when loading completes

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

  // Intersection Observer for Videos - trigger autoplay when visible
  useEffect(() => {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          // Video is visible, try to play
          if (video.paused) {
            const playPromise = video.play();
            if (playPromise?.catch) {
              playPromise.catch(() => {
                // Autoplay might be blocked, that's okay
              });
            }
          }
        } else {
          // Video is out of view, pause to save resources
          if (!video.paused && !video.paused) {
            // Don't pause - let it continue if it was playing
          }
        }
      });
    }, { threshold: [0, 0.1, 0.5, 1] });

    // Observe all autoplay videos
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
    videos.forEach(video => videoObserver.observe(video));

    return () => videoObserver.disconnect();
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

  const handleBookingChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
    if (bookingStatus !== 'idle') setBookingStatus('idle');
  };

  const openBooking = () => {
    setCurrentView('home');
    setMobileMenuOpen(false);
    setBookingStatus('idle');
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStatus === 'loading') return;
    setBookingStatus('loading');
    setTimeout(() => {
      setBookingStatus('success');
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        phoneCode: '+1',
        website: '',
        company: '',
        orgs: '',
        position: '',
        service: '',
        originCountry: 'South America',
        targetRegion: '',
        date: '',
        timeSlot: ''
      });
    }, 600);
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

  const servicesContent = SERVICES_CONTENT[lang] || SERVICES_CONTENT.en;
  const serviceOptions = servicesContent.items.map(item => item.title);
  const bookingServiceOptions = serviceOptions.length ? serviceOptions : ui.booking.serviceOptions;
  const bookingRegionOptions = ui.booking.regionOptions;
  const strengthsCards = STRENGTHS_CARDS[lang];
  const partnerBenefits = PARTNER_BENEFITS[lang];
  const collageItems = COLLAGE_ITEMS[lang];
  const bookingCopy = ui.booking;


  return (
    <div className="text-brand-dark font-sans min-h-screen scroll-smooth flex flex-col overflow-y-auto overflow-x-hidden">

      {/* --- Fixed Top Navigation Bar --- */}
      <nav className="fixed top-0 left-0 right-0 z-[200] py-2.5 bg-brand-navy/90 backdrop-blur-md border-b border-white/10">
        {/* Scroll progress indicator */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-gold via-brand-gold/80 to-brand-gold transition-all duration-300" 
          style={{ 
            width: `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` 
          }}
        />
        
        <div className="mx-auto w-full max-w-[1400px] px-2 flex items-center gap-5">
          <button onClick={() => handleNavClick('about')} className="flex items-center gap-2.5 text-white">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
              <img src={logoVertical} alt="Cross The Bridge logo" className="h-6 w-auto object-contain" />
            </div>
            <LogoWordmark className="h-3.5 w-auto logo-wordmark-shadow" color="#ffffff" />
          </button>

          <div className="hidden lg:flex items-center flex-1 justify-center">
            {navLinks.map((item) => {
              const isActive = activeSection === item && currentView === 'home';
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? 'text-brand-gold bg-white/10 shadow-sm shadow-brand-gold/20' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors">
              {lang === 'en' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={openBooking}
              className="hidden md:flex items-center gap-2 bg-brand-gold text-brand-navy px-3.5 py-1.5 rounded-full font-bold uppercase tracking-[0.14em] text-[11px] hover:bg-white transition-colors shadow-md shadow-brand-gold/30"
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
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center text-xl font-bold uppercase tracking-widest hover:text-brand-gold p-2 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </button>
                );
              })}
              <button onClick={openBooking} className="mt-8 bg-brand-gold text-brand-navy px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Mail size={18} /> {t.nav.book}
              </button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <MotionDiv
            className="fixed inset-0 z-[260] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setBookingModalOpen(false)}
          >
            <MotionDiv
              className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-gray-100 bg-[#f6f7fb]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">{bookingCopy.formLabel}</p>
                  <h3 className="text-base md:text-xl font-bold text-brand-navy">{bookingCopy.formTitle}</h3>
                </div>
                <button onClick={() => setBookingModalOpen(false)} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <X size={18} />
                </button>
              </div>
              <form className="p-4 md:p-5 space-y-3 md:space-y-4 overflow-y-auto" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.name}</label>
                    <input value={bookingForm.name} onChange={(e) => handleBookingChange('name', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.email}</label>
                    <input type="email" value={bookingForm.email} onChange={(e) => handleBookingChange('email', e.target.value)} required className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.phone}</label>
                      <div className="flex gap-2">
                        <select
                          value={bookingForm.phoneCode}
                          onChange={(e) => handleBookingChange('phoneCode', e.target.value)}
                          className="w-15 rounded-lg border border-gray-200 px-2 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9"
                        >
                          {BOOKING_PHONE_CODES.map(code => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                        <input value={bookingForm.phone} onChange={(e) => handleBookingChange('phone', e.target.value)} className="w-full flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" placeholder={bookingCopy.placeholders.phone} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.website}</label>
                      <input value={bookingForm.website} onChange={(e) => handleBookingChange('website', e.target.value)} placeholder={bookingCopy.placeholders.website} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.company}</label>
                    <input value={bookingForm.company} onChange={(e) => handleBookingChange('company', e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="sr-only">{bookingCopy.orgHint}</span>
                    <div role="radiogroup" className="flex flex-wrap gap-2 mt-3">
                      {bookingCopy.orgOptions.map((label) => (
                        <label
                          key={label}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm md:text-base cursor-pointer transition-colors h-4 ${bookingForm.orgs === label ? 'border-brand-navy text-brand-navy bg-brand-navy/5' : 'border-gray-200 text-brand-navy/80 hover:border-brand-navy/60'}`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            name="orgs"
                            value={label}
                            checked={bookingForm.orgs === label}
                            onChange={() => handleBookingChange('orgs', label)}
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.position}</label>
                    <input value={bookingForm.position} onChange={(e) => handleBookingChange('position', e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-9" />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1 leading-tight">{bookingCopy.labels.service}</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => handleBookingChange('service', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9"
                    >
                      <option value="">{bookingCopy.placeholders.service}</option>
                      {bookingServiceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.origin}</label>
                    <select
                      value={bookingForm.originCountry}
                      onChange={(e) => handleBookingChange('originCountry', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9"
                    >
                      {bookingRegionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.target}</label>
                    <select
                      value={bookingForm.targetRegion}
                      onChange={(e) => handleBookingChange('targetRegion', e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9"
                    >
                      <option value="">{bookingCopy.placeholders.region}</option>
                      {bookingRegionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
                    <div>
                      <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1 leading-tight">{bookingCopy.labels.date}</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => handleBookingChange('date', e.target.value)}
                        min={(() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 2);
                          return d.toISOString().split('T')[0];
                        })()}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9 cursor-pointer"
                        style={{ colorScheme: 'light' }}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.time}</label>
                      <select
                        value={bookingForm.timeSlot}
                        onChange={(e) => handleBookingChange('timeSlot', e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-9"
                        required
                      >
                        <option value="">{bookingCopy.placeholders.time}</option>
                        {BOOKING_TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={bookingStatus === 'loading'}
                  className="w-full bg-brand-navy text-white rounded-xl py-3 font-bold uppercase tracking-[0.16em] text-sm md:text-base hover:bg-brand-gold hover:text-brand-navy transition-colors disabled:opacity-60"
                >
                  {bookingStatus === 'loading' ? bookingCopy.submit.loading : bookingStatus === 'success' ? bookingCopy.submit.success : bookingCopy.submit.idle}
                </button>
                {bookingStatus === 'success' && <p className="text-green-600 text-sm text-center">{bookingCopy.successMessage}</p>}
              </form>
            </MotionDiv>
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
      <div className="w-full pt-16 lg:pt-20 bg-white">

        {/* 1. HERO */}
        <HeroSection hero={t.hero} onCtaClick={openBooking} onHeroReady={onHeroReady} />

        {/* <LogoCarouselSection /> */}
        <ServicesSection servicesContent={servicesContent} />
        <ProcessSection />
        <TradeMissionsSection onCtaClick={() => handleNavClick('contact')} />

        {/* Assurances for decision-makers */}
        {/* <section className="bg-[#f6f7fb] text-brand-navy py-16 border-t border-gray-100">
          <ScrollReveal className="container mx-auto px-4 md:px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs">{t.assurances.title}</p>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">{t.assurances.subtitle}</h3>
            </div>
            <div className="grid lg:grid-cols-[1.2fr,0.9fr] gap-8 md:gap-10 items-start">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {t.assurances.items.map((item, idx) => {
                  const Icon = ASSURANCE_ICONS[item.icon] || Shield;
                  return (
                    <div key={idx} className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 p-5 flex flex-col gap-3 hover:-translate-y-1 bg-white">
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

              <MotionDiv
                className="relative w-full h-full min-h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
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
                <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
                <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">{ui.assurances.badge}</p>
                    <h4 className="text-2xl font-bold text-white leading-tight">{ui.assurances.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">{ui.assurances.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-xs uppercase tracking-[0.18em]">
                    <span className="w-10 h-[2px] bg-white/30" />
                    <span>{ui.assurances.footer}</span>
                    <span className="w-10 h-[2px] bg-white/30" />
                  </div>
                </div>
              </MotionDiv>
            </div>
          </ScrollReveal>
        </section> */}

        <AboutSection />

        {/* Capabilities deck landing */}
        <section id="capabilities" className="bg-brand-navy text-white py-16">
          <ScrollReveal className="container mx-auto px-4 md:px-6 space-y-10">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-brand-gold font-bold uppercase tracking-[0.22em] text-xs">{t.capabilities.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">{t.capabilities.subtitle}</h3>
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
                <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl min-h-[180px]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">{ui.capabilities.timelineLabel}</div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl min-h-[180px] bg-white/5">
                    <img
                      src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=900"
                      alt="Audit checklist"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">{ui.capabilities.auditLabel}</div>
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
                    {deckStatus === 'loading' ? ui.capabilities.sending : deckStatus === 'success' ? ui.capabilities.sent : t.capabilities.form.cta}
                  </button>
              <p className="text-xs text-brand-navy/60">{t.capabilities.form.disclaimer}</p>
            </form>
          </div>
          </div>
        </ScrollReveal>
      </section>

        {/* CTB STRENGTHS - Full Section with Tinder-Style Cards */}
        <section className="min-h-screen bg-brand-navy text-white relative overflow-hidden py-16">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-2xl opacity-40" />
          </div>
          <GridPattern color="#C4A661" opacity={0.03} />
          
          {(() => {
              const ctbStrengths = strengthsCards.map((item) => ({
                ...item,
                Icon: ICON_MAP[item.icon as IconKey] || Globe
              }));
              
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
                        {ui.strengths.tag}
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {ui.strengths.title}
                      </h2>
                      <p className="text-white/40 text-xs md:text-sm max-w-xl mx-auto">
                        {ui.strengths.swipeHint}
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
                              data-autoplay
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
                                  {ui.strengths.swipeHint}
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
                                <span className="text-5xl lg:text-6xl font-black text-white/10">
                                  {String(currentIndex + 1).padStart(2, '0')}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-brand-gold to-transparent" />
                              </div>
                              
                              {/* Icon */}
                              <div className={`bg-gradient-to-br ${ctbStrengths[currentIndex].color} px-4 py-2 rounded-xl w-fit shadow-2xl text-white text-sm font-bold uppercase tracking-widest`}>
                                {String(currentIndex + 1).padStart(2, '0')}
                              </div>
                              
                              {/* Title */}
                              <h3 className="text-xl lg:text-3xl font-bold text-white leading-tight">
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
                            data-autoplay
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
          const testimonialItems = t.testimonials?.items?.length
            ? t.testimonials.items
            : DEFAULT_TESTIMONIALS;

          const [activeTestimonial, setActiveTestimonial] = useState(0);
          const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonialItems[0] | null>(null);
          const totalTestimonials = testimonialItems.length;

          if (!totalTestimonials) return null;

          useEffect(() => {
            if (!totalTestimonials) return;
            const id = setInterval(() => {
              setActiveTestimonial(prev => (prev + 1) % totalTestimonials);
            }, 4500);
            return () => clearInterval(id);
          }, [totalTestimonials]);

          const visibleTestimonials = [
            activeTestimonial,
            (activeTestimonial + 1) % totalTestimonials,
            (activeTestimonial + 2) % totalTestimonials,
          ];

          const goPrev = () => setActiveTestimonial(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
          const goNext = () => setActiveTestimonial(prev => (prev + 1) % totalTestimonials);

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

        <section id="bridge_effect" className="min-h-screen bg-brand-navy relative py-16 overflow-hidden text-white">
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
                  {ui.bridge.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {ui.bridge.heading}
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                  {ui.bridge.subtitle}
                </p>
              </div>
            </FadeIn>

            {/* Refreshed testimonials slider */}
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-5 md:p-7 lg:p-8 shadow-2xl overflow-hidden -mx-4 md:-mx-8 lg:-mx-12">
              <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-white/4 to-brand-navy/40 pointer-events-none" />
              <div className="flex flex-wrap items-center gap-4 justify-between relative z-10">
                <div>
                  <p className="text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-1">
                    {ui.bridge.testimonialsLabel}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {ui.bridge.testimonialsTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                  <button onClick={goPrev} className="w-9 h-9 rounded-full text-white/80 hover:text-brand-navy hover:bg-white transition-all active:scale-95">
                    ‹
                  </button>
                  <button onClick={goNext} className="w-9 h-9 rounded-full text-white/80 hover:text-brand-navy hover:bg-white transition-all active:scale-95">
                    ›
                  </button>
                </div>
              </div>

              <div className="mt-4 md:mt-6 relative z-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 min-h-[230px]">
                  {visibleTestimonials.map((idx, slot) => {
                    const testimonial = testimonialItems[idx];
                    if (!testimonial) return null;
                    const isPrimary = slot === 1;
                    return (
                      <MotionDiv
                        key={`${idx}-${slot}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`relative rounded-2xl border backdrop-blur-sm shadow-xl cursor-pointer active:scale-[0.99] transition-all h-full overflow-hidden ${
                          isPrimary
                            ? 'bg-gradient-to-br from-brand-gold/25 via-brand-gold/15 to-white/10 border-brand-gold/40'
                            : 'bg-white/5 border-white/10'
                        }`}
                        onClick={() => setSelectedTestimonial(testimonial)}
                      >
                        <div className="absolute right-3 top-3 flex gap-1 text-brand-gold text-xs drop-shadow">
                          ★★★★★
                        </div>
                        <div className="p-4 md:p-5 space-y-4 flex flex-col h-full">
                          <p className={`text-sm leading-relaxed line-clamp-4 ${isPrimary ? 'text-white' : 'text-white/80'}`}>
                            “{testimonial.text}”
                          </p>
                          <div className="flex items-center gap-3 mt-auto">
                            {testimonial.image ? (
                              <img src={testimonial.image} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold/40" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-brand-gold/20 border-2 border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold">
                                {testimonial.name?.[0] || '•'}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-white font-semibold truncate">{testimonial.name}</p>
                              <p className="text-xs text-white/60 truncate">{testimonial.role}</p>
                              <p className="text-xs text-brand-gold flex items-center gap-1 mt-0.5">
                                <span>{getCountryFlag(testimonial.countryCode)}</span>
                                {testimonial.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-white/70">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-white/15 bg-white/5 shadow-inner">
                              <Sparkles size={12} className="text-brand-gold" /> {ui.bridge.readStory}
                            </span>
                          </div>
                        </div>
                      </MotionDiv>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Global snapshot strip */}
            <FadeIn delay={0.1}>
              <div className="mt-10 md:mt-12">
                <p className="text-center text-brand-gold/60 text-xs md:text-sm font-bold uppercase tracking-widest mb-4">
                  {ui.bridge.snapshotsLabel}
                </p>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 -mx-4 md:mx-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 p-4 md:p-6">
                    {collageItems.map((item, i) => (
                      <div key={i} className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 shadow-lg">
                        <img src={item.src} alt={item.label} className="w-full h-28 md:h-32 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-xs text-white font-semibold">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Countries Carousel - Single Marquee */}
            <div className="relative py-12 md:py-16 mt-8 md:mt-12 overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12">
              <FadeIn>
                <p className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-brand-gold/60 mb-6 md:mb-8">
                  {ui.bridge.presenceLabel}
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
            <div className="mt-12 md:mt-16 mb-12 -mx-6 md:-mx-12">
              <LogoMarquee dark={false} />
            </div>
          </ScrollReveal>
        </section>
        </>
          );
        })()}

        {/* 6. SHOWROOM (Dark) */}
        <section id="showroom" className="bg-brand-navy text-white flex flex-col justify-center relative py-16">
          <ScrollReveal className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
            {/* Header - Mobile first */}
            <div className="mb-6 md:mb-12">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">{ui.showroom.label}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.showroom.title}</h2>
              
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
        <section className="bg-brand-navy text-white flex flex-col justify-center relative overflow-hidden py-16">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* World map background */}
            <img src="/img/world-map.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-5" />
            {/* Animated gradient orbs */}
            <div className="absolute top-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-2xl opacity-40" />
          </div>
          
          <GridPattern color="#C4A661" opacity={0.03} />
          
          <ScrollReveal className="container mx-auto px-4 md:px-6 relative z-10 py-16 mt-8">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-widest text-xs bg-brand-gold/10 px-4 py-2 rounded-full mb-4">
                {ui.providers.tag}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {ui.providers.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                {ui.providers.subtitle}
              </p>
            </div>

            {/* Benefits - Tinder Style Swipe Cards */}
            {(() => {
              const benefits = partnerBenefits.map((benefit) => ({
                ...benefit,
                icon: ICON_MAP[benefit.icon as IconKey] || Globe
              }));
              
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
                } else if (direction === 'left' && partnerCardIndex < benefits.length - 1) {
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
                if (partnerDragX < -threshold && partnerCardIndex < benefits.length - 1) {
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
                if (partnerDragX < -threshold && partnerCardIndex < benefits.length - 1) {
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
              
              const currentBenefit = benefits[partnerCardIndex];
              
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
                      className={`absolute right-2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all ${partnerCardIndex === benefits.length - 1 ? 'opacity-30' : 'hover:bg-white/20'}`}
                      disabled={partnerCardIndex === benefits.length - 1}
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
                              <span className="text-white text-xs font-bold">{partnerCardIndex + 1} / {benefits.length}</span>
                            </div>
                          </div>
                        </MotionDiv>
                      </AnimatePresence>
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                      {benefits.map((_, idx) => (
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
                      {ui.strengths.swipeHint}
                    </p>
                  </div>
                  
                  {/* Desktop: Grid layout */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, idx) => {
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
                  {ui.providers.readyTitle}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {ui.providers.readyDesc}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                  {ui.providers.bulletPoints.map((item, i) => (
                    <span key={i} className="text-sm text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">{item}</span>
                  ))}
                </div>

                <a 
                  href="mailto:partners@crossthebridge.co?subject=Partner%20Inquiry"
                  className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg shadow-brand-gold/20"
                >
                  {ui.providers.cta}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. CONTACT (Light) */}
        <section id="contact" className="bg-[#f6f7fb] flex flex-col justify-center relative text-brand-navy py-16">
          <GridPattern color="#1B2440" opacity={0.03} />
          <ScrollReveal className="container mx-auto px-4 md:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-1">
            <div>
              <FadeIn>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">{ui.contact.tag}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-brand-navy">{t.contact.title}</h2>
                <div className="space-y-4 md:space-y-8 text-sm md:text-lg">
                  <a href="mailto:info@crossthebridge.co" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    {ui.contact.email}
                  </a>
                  <a href="tel:+12813232612" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    {ui.contact.phoneUS}
                  </a>
                  <a href="tel:+524777653792" className="flex items-center gap-3 md:gap-4 hover:text-brand-gold transition-colors active:scale-95">
                    {ui.contact.phoneMX}
                  </a>
                  <div className="flex items-center gap-3 md:gap-4">
                    {ui.contact.location}
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                  <a href="https://www.linkedin.com/company/cross-the-bridge-mx/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.linkedin}</a>
                  <a href="https://www.instagram.com/crossthebridge.mx?igsh=bnF6dGdtdXB4MHIw" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.instagram}</a>
                  <a href="https://www.facebook.com/profile.php?id=61583895457222" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.facebook}</a>
                </div>
              </FadeIn>
            </div>

            <div className="w-full bg-white text-brand-navy p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
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
                  {contactStatus === 'loading' ? ui.contact.sending : contactStatus === 'success' ? ui.contact.sent : t.contact.form.submit}
                </button>
                {contactStatus === 'error' && (
                  <p className="text-sm text-red-600">{contactError || ui.contact.error}</p>
                )}
                {contactStatus === 'success' && (
                  <p className="text-sm text-green-600">{ui.contact.success}</p>
                )}
              </form>
            </div>
          </ScrollReveal>

          {/* Dedicated Footer Block (Light) */}
          <footer className="bg-white border-t border-gray-100 py-8 mt-16">
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

  const handleLoadingComplete = () => {
    setLoading(false);
    // Give the loading screen animation time to complete before triggering videos
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 500);
  };

  return (
    <>
      <NoiseOverlay />
      <MainContent lang={lang} setLang={setLang} onHeroReady={handleLoadingComplete} />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
    </>
  );
}
