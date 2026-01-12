/**
 * App.tsx Refactored
 * 
 * This file contains:
 * - Navigation and layout
 * - Global state management  
 * - Modal/form handling
 * - Section component imports and rendering
 * 
 * Section-specific JSX has been moved to /sections folder
 */

import React, { useState, useEffect, useRef, useId } from 'react';
import { 
  Package, Globe, Layers, ArrowRight, CheckCircle, Phone, Mail, Menu, X, Users, User,
  Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Circle, Scissors, Shirt,
  GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, ChevronLeft, ChevronRight,
  MousePointer2, Home, Briefcase, Settings, Award, MessageSquare, ShoppingBag, Send, Target,
  FileText, Shield, Ship, Compass, RotateCcw, ChevronUp, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';

import { 
  TRANSLATIONS, UI_TEXT, PROCESS_MEDIA, STRENGTHS_CARDS, PARTNER_BENEFITS,
  LOGO_MARQUEE_ITEMS, COLLAGE_ITEMS, BOOKING_PHONE_CODES, BOOKING_TIME_SLOTS, DEFAULT_TESTIMONIALS 
} from './constants';
import { Language } from './types';

// Import section components
import {
  HeroSection,
  ProofOverlaySection,
  ServicesSection,
  ProcessSection,
  FounderSection,
  DifferentiatorsSection,
  CapabilitiesSection,
  StrengthsSection,
  BridgeSection,
  AssurancesSection,
  ShowroomSection,
  ProvidersSection,
  ContactSection,
  NoiseOverlay,
  LogoWordmark,
  GridPattern,
  ScrollReveal,
  FadeIn,
} from './sections';

// ====================================================
// TYPES & CONSTANTS
// ====================================================

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionSpan = motion.span as any;

// Assets
const logoVertical = '/img/ganzo.png';
const logoWordmarkPng = '/img/Logo_letras.png';
const processImg1 = '/img/process2.jpg';
const processImg3 = '/img/process4.jpg';
const teamPortrait = '/img/1696903720042.jpeg';

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

const SECTION_ICONS: Record<string, any> = {
  about: Home,
  services: ShoppingBag,
  process: ArrowRight,
  team: User,
  differentiators: Star,
  capabilities: Settings,
  strengths: Sparkles,
  bridge: Compass,
  showroom: Package,
  referrals: Users,
  contact: MessageSquare,
};

const navLinks = ['about', 'services', 'process', 'team', 'differentiators', 'capabilities', 'strengths', 'bridge', 'showroom', 'referrals', 'contact'];

// ====================================================
// UTILITY FUNCTIONS
// ====================================================

const countryCodeToFlag = (code: string) => {
  if (!code || code.length !== 2) return '';
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// ====================================================
// MAIN COMPONENT
// ====================================================

interface MainContentProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onHeroReady?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ lang, setLang, onHeroReady }) => {
  // ====================================================
  // STATE
  // ====================================================
  
  const [activeSection, setActiveSection] = useState('about');
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', phoneCode: '+1', website: '',
    company: '', orgs: 'Empresa', position: '', service: '', originCountry: 'México',
    targetRegion: '', date: '', timeSlot: ''
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '', company: '', email: '', website: '', serviceInterest: '', message: ''
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  
  // Showroom
  const [showroomCategory, setShowroomCategory] = useState('all');
  
  // Differentiators
  const [diffExpanded, setDiffExpanded] = useState<number | null>(null);

  // ====================================================
  // HANDLERS
  // ====================================================

  const openBooking = () => setBookingModalOpen(true);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setCurrentView('home');
    setMobileMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStatus === 'loading') return;
    setBookingStatus('loading');

    setTimeout(() => {
      setBookingStatus('success');
      setBookingForm({
        name: '', email: '', phone: '', phoneCode: '+1', website: '',
        company: '', orgs: 'Empresa', position: '', service: '', originCountry: 'México',
        targetRegion: '', date: '', timeSlot: ''
      });
    }, 600);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactStatus === 'loading') return;
    setContactStatus('loading');
    setContactError(null);

    setTimeout(() => {
      setContactStatus('success');
      setContactForm({ name: '', company: '', email: '', website: '', serviceInterest: '', message: '' });
    }, 1000);
  };

  // Translations
  const t = TRANSLATIONS[lang];
  const ui = UI_TEXT[lang];

  // Data derivations
  const filteredShowroomItems = showroomCategory === 'all'
    ? t.showroom.items
    : t.showroom.items.filter(item => item.category === showroomCategory);

  const serviceOptions = t.services?.items?.map(item => item.title) || [];
  const bookingServiceOptions = serviceOptions.length ? serviceOptions : ui.booking.serviceOptions;
  const bookingRegionOptions = ui.booking.regionOptions;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="text-brand-dark font-sans min-h-screen scroll-smooth flex flex-col overflow-y-auto overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[200] py-2 bg-brand-navy/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <button onClick={() => handleNavClick('about')} className="flex items-center gap-2.5 text-white">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5">
              <img src={logoVertical} alt="Cross The Bridge logo" className="h-6 w-auto object-contain" />
            </div>
            <LogoWordmark className="h-3.5 w-auto logo-wordmark-shadow" color="#ffffff" />
          </button>

          <div className="hidden lg:flex items-center ml-3 flex-1">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              {navLinks.map((item) => {
                const Icon = SECTION_ICONS[item] || Circle;
                const isActive = activeSection === item && currentView === 'home';
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? 'text-brand-gold bg-white/10 shadow-sm shadow-brand-gold/20' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                  >
                    <Icon size={14} />
                    {t.nav[item as keyof typeof t.nav]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
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

      {/* Mobile Menu */}
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
              <button onClick={openBooking} className="mt-8 bg-brand-gold text-brand-navy px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Mail size={18} /> {t.nav.book}
              </button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      {/* TODO: Extract to BookingModal component */}

      {/* Main Content */}
      <div className="w-full pt-14 lg:pt-16">
        {/* Section Components */}
        <HeroSection lang={lang} setLang={setLang} t={t} ui={ui} onHeroReady={onHeroReady} />
        <ProofOverlaySection lang={lang} setLang={setLang} t={t} ui={ui} />
        <ServicesSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <AssurancesSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <ProcessSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <FounderSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <DifferentiatorsSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <CapabilitiesSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <StrengthsSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <BridgeSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <ShowroomSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <ProvidersSection lang={lang} setLang={setLang} t={t} ui={ui} />
        <ContactSection lang={lang} setLang={setLang} t={t} ui={ui} />
      </div>
    </div>
  );
};

// ====================================================
// ROOT APP COMPONENT
// ====================================================

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      <NoiseOverlay />
      <MainContent lang={lang} setLang={setLang} onHeroReady={() => setLoading(false)} />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
    </>
  );
}

// ====================================================
// LOADING SCREEN
// ====================================================

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
        <div className="relative mb-8">
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
          >
            <img src="/img/Logo_home2.png" alt="Loading" className="w-full h-full" />
          </MotionDiv>
        </div>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] font-bold text-brand-gold mb-2">Initializing</p>
          <p className="text-xs text-white/60 tracking-widest">Cross The Bridge</p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
