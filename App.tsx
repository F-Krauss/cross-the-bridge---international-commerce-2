
import React, { useState, useEffect, useRef, useId, useCallback, useMemo } from 'react';
import { Package, Globe, Layers, ArrowRight, Phone, Mail, Menu, X, Users, User, Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Scissors, Shirt, GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, ChevronLeft, ChevronRight, MousePointer2, Settings, Award, Send, Target, FileText, Shield, Ship, Compass, RotateCcw, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import HeroSection from './src/sections/HeroSection';
import LogoCarouselSection from './src/sections/LogoCarouselSection';
import ServicesSection from './src/sections/ServicesSection';
import ProcessSection from './src/sections/ProcessSection';
import TradeMissionsSection from './src/sections/TradeMissionsSection';
import AboutSection from './src/sections/AboutSection';
import BridgeEffectSection from './src/sections/BridgeEffectSection';
import { TRANSLATIONS, UI_TEXT, PARTNER_BENEFITS, BOOKING_TIME_SLOTS, DEFAULT_TESTIMONIALS } from './constants';
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
  cta: string;
  items: { title: string; short: string; long: string[] }[];
}> = {
  en: {
    title: "Services",
    intro: "We are a strategic partner for brands building reliable international manufacturing.",
    cta: "Read more",
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
    intro: "Somos un socio estratégico para marcas que buscan manufactura internacional confiable.",
    cta: "Ver más",
    items: [
      {
        title: "Abastecimiento de materias primas y aseguramiento de suministro",
        short: "Hacemos confiable el abastecimiento desde México para marcas internacionales.",
        long: [
          "Hacemos que el abastecimiento de materias primas desde México sea confiable, predecible y listo para exportar para las industrias de piel, calzado y moda.",
          "Cross the Bridge asegura un abastecimiento consistente mediante supervisión local y una red establecida en el ecosistema de piel y moda de México. Alineamos especificaciones, disponibilidad de materiales y condiciones comerciales de mercado para sostener producción sin interrupciones.",
          "Al representar a varias marcas y mantener relaciones de largo plazo con proveedores, operamos con escala y credibilidad colectiva. Esto abre acceso a materiales preferentes y condiciones comerciales alineadas, incluso en insumos de alta demanda o limitada disponibilidad.",
          "Con seguimiento en sitio anticipamos riesgos, alineamos negociaciones a la realidad local y resolvemos fricciones temprano, convirtiendo el abastecimiento en una estrategia confiable."
        ]
      },
      {
        title: "Operación de manufactura y cadena de suministro",
        short: "Escala sin dolores de cabeza operativos.",
        long: [
          "Nos convertimos en tu equipo en tierra, gestionando cada paso del proceso para que te enfoques en diseño, ventas y crecimiento de marca.",
          "Desde desarrollo y prototipado hasta producción a escala, coordinamos diario con fábricas, seguimos tiempos, agilizamos comunicación y resolvemos issues para mantener cada entregable a tiempo. Traducimos expectativas, alineamos estándares y anticipamos riesgos antes de que impacten costo, calidad o entrega.",
          "Incluye planeación de producción, seguimiento de materiales, cierre de costos, calendarización de capacidad, inspecciones de calidad, gestión de riesgos y preparación completa para exportar. Obtienes transparencia, control y tranquilidad, con producción gestionada localmente bajo estándares internacionales y entendimiento de ambos lados del puente."
        ]
      },
      {
        title: "Crecimiento internacional y alianzas estratégicas",
        short: "Convertimos la expansión internacional en ventaja estratégica, no en curva de aprendizaje costosa.",
        long: [
          "En Cross the Bridge acompañamos a empresas listas para expandirse más allá de su mercado de origen, con decisiones informadas y alianzas estratégicas — no con prueba y error.",
          "Combinamos inteligencia de mercado, una red internacional confiable y guía práctica para definir dónde expandir, cómo entrar y con qué socios alinearse. No empujamos expansión por expansión: cada movimiento se estructura según oportunidad real, timing y fit estratégico.",
          "Trabajamos en proyectos seleccionados, apoyando a fundadores y equipos directivos en decisiones complejas. Desde validación temprana hasta estructuración de socios de largo plazo, reducimos riesgo asegurando que cada paso esté anclado en la realidad operativa, no en supuestos.",
          "Incluye validación de mercado, estrategias de entrada y expansión, estructuración de socios y distribuidores, soporte en ferias y gestión comercial, consultoría de export-readiness y representación local vía licencias o alianzas estratégicas. Permanecemos en campo para llevar la estrategia a la ejecución con confianza y control."
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

const BOOKING_STEP_MEDIA = [
  { src: "/img/process2.jpg", alt: "Company overview" },
  { src: "/img/Calzado1.jpg", alt: "Factory production" },
  { src: "/img/process4.jpg", alt: "Planning a call" }
];

// Converts a 2-letter country code into its corresponding flag emoji
const countryCodeToFlag = (code?: string) => {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)));
};

const MainContent = ({ lang, setLang, onHeroReady }: { lang: Language, setLang: (l: Language) => void, onHeroReady?: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', website: '', serviceInterest: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCode: '+1',
    website: '',
    company: '',
    companyCountry: '',
    orgs: '',
    position: '',
    service: '',
    originCountry: '',
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
    setBookingStep(0);
    setBookingModalOpen(true);
  };

  const closeBooking = () => {
    setBookingModalOpen(false);
    setBookingStep(0);
    setBookingStatus('idle');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 2) {
      if (canAdvanceBooking) {
        setBookingStep((step) => Math.min(2, step + 1));
      }
      return;
    }
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
        companyCountry: '',
        orgs: '',
        position: '',
        service: '',
        originCountry: '',
        targetRegion: '',
        date: '',
        timeSlot: ''
      });
    }, 600);
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

const servicesContent = SERVICES_CONTENT[lang] || SERVICES_CONTENT.en;
  const serviceOptions = servicesContent.items.map(item => item.title);
  const bookingServiceOptions = serviceOptions.length ? serviceOptions : ui.booking.serviceOptions;
  const bookingRegionOptions = ui.booking.regionOptions;
  const partnerBenefits = PARTNER_BENEFITS[lang];
  const bookingCopy = ui.booking;
  const bookingStepLabel = lang === 'es' ? 'Paso' : 'Step';
  const bookingNextLabel = lang === 'es' ? 'Siguiente' : 'Next';
  const bookingBackLabel = lang === 'es' ? 'Volver' : 'Back';
  const bookingStepTitles = useMemo(() => ([
    {
      label: lang === "es" ? "Paso 1" : "Step 1",
      title: lang === "es" ? "Tu empresa" : "Your company",
      desc:  lang === "es" ? "Cuéntanos quién eres." : "Tell us who you are.",
    },
    {
      label: lang === "es" ? "Paso 2" : "Step 2",
      title: lang === "es" ? "Tu necesidad" : "Your need",
      desc:  lang === "es" ? "Define tu objetivo." : "Define your goal.",
    },
    {
      label: lang === "es" ? "Paso 3" : "Step 3",
      title: lang === "es" ? "Agenda" : "Schedule",
      desc:  lang === "es" ? "Elige fecha y hora." : "Pick date and time.",
    },
  ]), [lang]);
  const currentBookingStepTitle = bookingStepTitles[bookingStep] || bookingStepTitles[0];
  const bookingStepMedia = BOOKING_STEP_MEDIA[bookingStep] || BOOKING_STEP_MEDIA[0];
  const isStepOneComplete = Boolean(
    bookingForm.company.trim() &&
    bookingForm.companyCountry &&
    bookingForm.website.trim()
  );
  const isStepTwoComplete = Boolean(
    bookingForm.service &&
    bookingForm.originCountry &&
    bookingForm.targetRegion
  );
  const isStepThreeComplete = Boolean(
    bookingForm.name.trim() &&
    bookingForm.email.trim() &&
    bookingForm.position.trim() &&
    bookingForm.date &&
    bookingForm.timeSlot
  );
  const canAdvanceBooking = bookingStep === 0 ? isStepOneComplete : isStepTwoComplete;
  const showroomContent = t.showroom;
  const testimonialItems = t.testimonials?.items?.length
    ? t.testimonials.items
    : DEFAULT_TESTIMONIALS;


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
            onClick={closeBooking}
          >
            <MotionDiv
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col"
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
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/60">
                    {bookingStepLabel} {bookingStep + 1} / {BOOKING_STEP_MEDIA.length}
                  </span>
                  <button onClick={closeBooking} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <form className="flex-1 min-h-0" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr,0.95fr] items-center gap-5 md:gap-6 p-4 md:p-6 min-h-[350px] lg:min-h-[350px]">
                  <MotionDiv
                    key={bookingStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col justify-between min-h-[360px] gap-4"
                  >
                    <div className="pb-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/80">
                        {currentBookingStepTitle.label}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold text-brand-navy leading-tight">
                        {currentBookingStepTitle.title}
                      </h4>
                      <p className="text-sm text-brand-navy/70">{currentBookingStepTitle.desc}</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                    {bookingStep === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
                        <div className="md:col-span-2">
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.company}</label>
                          <input
                            value={bookingForm.company}
                            onChange={(e) => handleBookingChange('company', e.target.value)}
                            required
                            className="w-full rounded-l px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-10"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.companyCountry}</label>
                          <select
                            value={bookingForm.companyCountry}
                            onChange={(e) => handleBookingChange('companyCountry', e.target.value)}
                            required
                            className="w-full rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10"
                          >
                            <option value="">{bookingCopy.placeholders.region}</option>
                            {bookingRegionOptions.map(region => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.website}</label>
                          <input
                            type="url"
                            value={bookingForm.website}
                            onChange={(e) => handleBookingChange('website', e.target.value)}
                            placeholder={bookingCopy.placeholders.website}
                            required
                            className="w-full rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-10"
                          />
                        </div>
                      </div>
                    )}

                    {bookingStep === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
                        <div className="md:col-span-2">
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1 leading-tight">{bookingCopy.labels.service}</label>
                          <select
                            value={bookingForm.service}
                            onChange={(e) => handleBookingChange('service', e.target.value)}
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10"
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
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10"
                          >
                            <option value="">{bookingCopy.placeholders.region}</option>
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
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10"
                          >
                            <option value="">{bookingCopy.placeholders.region}</option>
                            {bookingRegionOptions.map(region => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
                        <div>
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.name}</label>
                          <input
                            value={bookingForm.name}
                            onChange={(e) => handleBookingChange('name', e.target.value)}
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-10"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.email}</label>
                          <input
                            type="email"
                            value={bookingForm.email}
                            onChange={(e) => handleBookingChange('email', e.target.value)}
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-10"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.position}</label>
                          <input
                            value={bookingForm.position}
                            onChange={(e) => handleBookingChange('position', e.target.value)}
                            required
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy h-10"
                          />
                        </div>
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
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10 cursor-pointer"
                            style={{ colorScheme: 'light' }}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy/70 block mb-1">{bookingCopy.labels.time}</label>
                          <select
                            value={bookingForm.timeSlot}
                            onChange={(e) => handleBookingChange('timeSlot', e.target.value)}
                            className="w-full px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white h-10"
                            required
                          >
                            <option value="">{bookingCopy.placeholders.time}</option>
                            {BOOKING_TIME_SLOTS.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {bookingStep > 0 ? (
                        <button
                          type="button"
                          onClick={() => setBookingStep((step) => Math.max(0, step - 1))}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/70 hover:text-brand-navy transition-colors"
                      >
                          <span className="text-base">&lt;</span>
                          {bookingBackLabel}
                        </button>
                      ) : (
                        <span />
                      )}

                      {bookingStep < 2 ? (
                        canAdvanceBooking ? (
                          <button
                            type="button"
                            onClick={() => setBookingStep((step) => Math.min(2, step + 1))}
                            className="inline-flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-navy transition-colors"
                          >
                            {bookingNextLabel}
                            <span className="text-base">&gt;</span>
                          </button>
                        ) : (
                          <span />
                        )
                      ) : (
                        isStepThreeComplete ? (
                          <button
                            type="submit"
                            disabled={bookingStatus === 'loading'}
                            className="inline-flex items-center justify-center bg-brand-navy text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-navy transition-colors disabled:opacity-60"
                          >
                            {bookingStatus === 'loading' ? bookingCopy.submit.loading : bookingStatus === 'success' ? bookingCopy.submit.success : bookingCopy.submit.idle}
                          </button>
                        ) : (
                          <span />
                        )
                      )}
                    </div>
                    {bookingStatus === 'success' && bookingStep === 2 && (
                      <p className="text-green-600 text-sm">{bookingCopy.successMessage}</p>
                    )}
                  </MotionDiv>

                  <div className="relative w-full h-56 sm:h-64 lg:h-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg order-last lg:order-none">
                    <img src={bookingStepMedia.src} alt={bookingStepMedia.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-brand-navy/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{bookingCopy.formLabel}</p>
                      <p className="text-base md:text-lg font-semibold">
                        {bookingStep === 0
                          ? (lang === 'es' ? 'Conozcamos tu empresa' : 'Tell us about your company')
                          : bookingStep === 1
                            ? (lang === 'es' ? 'Define tu necesidad' : 'Define your sourcing goal')
                            : (lang === 'es' ? 'Agenda tu llamada' : 'Schedule your call')}
                      </p>
                    </div>
                  </div>
                </div>
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
        <ProcessSection copy={t.process} />
        {t.tradeMissions && (
          <TradeMissionsSection copy={t.tradeMissions} onCtaClick={() => handleNavClick('contact')} />
        )}

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

        <AboutSection copy={t.about} />

        <BridgeEffectSection
          showroom={showroomContent}
          testimonials={testimonialItems}
          lang={lang}
          copy={t.bridgeEffect}
        />

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
                  <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                  <a href="https://www.linkedin.com/company/cross-the-bridge-mx/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-gold rounded-full hover:bg-brand-navy hover:text-white transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.linkedin}</a>
                  <a href="https://www.instagram.com/crossthebridge.mx?igsh=bnF6dGdtdXB4MHIw" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-gold rounded-full hover:bg-brand-navy hover:text-white transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.instagram}</a>
                  <a href="https://www.facebook.com/profile.php?id=61583895457222" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-gold rounded-full hover:bg-brand-navy hover:text-white transition-all active:scale-90 text-sm font-bold uppercase tracking-widest">{ui.contact.socials.facebook}</a>
                </div>
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
                      className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.email}</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.company}</label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.website}</label>
                    <input
                      type="url"
                      value={contactForm.website}
                      onChange={(e) => handleContactChange('website', e.target.value)}
                      placeholder="https://"
                      className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-2 block">{t.contact.form.serviceInterest}</label>
                  <select
                    value={contactForm.serviceInterest}
                    onChange={(e) => handleContactChange('serviceInterest', e.target.value)}
                    required
                    className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
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
                    className="w-full bg-white p-2.5 md:p-3 focus:ring-2 focus:ring-brand-navy outline-none text-sm md:text-base"
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
  const loadingResolved = useRef(false);

  const handleLoadingComplete = useCallback(() => {
    if (loadingResolved.current) return;
    loadingResolved.current = true;
    setLoading(false);
    // Give the loading screen animation time to complete before triggering videos
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 500);
  }, []);

  // Only fall back to a timer in non-production; in prod wait for real readiness signals
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const fallback = setTimeout(() => handleLoadingComplete(), 5000);
      return () => clearTimeout(fallback);
    }
    const onWindowLoad = () => handleLoadingComplete();
    window.addEventListener('load', onWindowLoad);
    return () => window.removeEventListener('load', onWindowLoad);
  }, [handleLoadingComplete]);

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
