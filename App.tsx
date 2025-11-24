
import React, { useState, useEffect, useRef } from 'react';
import { Package, Globe, Layers, ArrowRight, CheckCircle, Phone, Mail, Menu, X, Users, Hexagon, Anchor, Box, Truck, MapPin, Navigation, ArrowLeft, Plus, Circle, Scissors, Shirt, GraduationCap, Linkedin, Instagram, Facebook, Star, ChevronDown, MousePointer2, Home, Briefcase, Settings, Award, MessageSquare, ShoppingBag, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

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
const Counter = ({ value, label, className, dark = false }: { value: string, label: string, className?: string, dark?: boolean }) => {
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

  // Approximate coordinates for countries mentioned in resume
  const markers = [
    { top: '38%', left: '18%', label: 'Mexico' }, // Mexico (Softlanding)
    { top: '32%', left: '20%', label: 'USA' }, // USA
    { top: '25%', left: '20%', label: 'Canada' }, // Canada
    { top: '45%', left: '28%', label: 'Dominican Rep.' }, // DR
    { top: '32%', left: '47%', label: 'Spain/Portugal' }, // Europe West
    { top: '28%', left: '50%', label: 'Germany/Italy' }, // Europe Central
    { top: '75%', left: '52%', label: 'South Africa' }, // South Africa
    { top: '40%', left: '68%', label: 'India' }, // India
    { top: '35%', left: '75%', label: 'China' }, // China
    { top: '45%', left: '75%', label: 'Vietnam' }, // Vietnam
    { top: '50%', left: '78%', label: 'Singapore' }, // Singapore
    { top: '35%', left: '85%', label: 'Japan' }, // Japan
    { top: '70%', left: '85%', label: 'Australia' } // Australia
  ];

  return (
    <div ref={mapRef} className="w-full relative mt-12 mb-20">
       <div className={`relative aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden border shadow-2xl group ${darkTheme ? 'bg-[#111] border-white/10' : 'bg-white border-gray-100'}`}>
          {/* Map Image Base */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_dotted.svg" 
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-105 group-hover:scale-110 ${darkTheme ? 'opacity-30 invert' : 'opacity-10'}`}
            alt="World Map"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${darkTheme ? 'from-brand-navy/80' : 'from-white/80'} to-transparent`} />
          
          {/* Markers */}
          {markers.map((m, i) => (
             <MotionDiv
               key={i}
               initial={{ scale: 0, opacity: 0 }}
               animate={isInView ? { scale: 1, opacity: 1 } : {}}
               transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
               className="absolute w-2 h-2 md:w-3 md:h-3 bg-brand-gold rounded-full shadow-[0_0_15px_rgba(196,166,97,0.8)] cursor-pointer hover:scale-150 transition-transform z-10"
               style={{ top: m.top, left: m.left }}
             >
                <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75" />
                {/* Tooltip */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                  {m.label}
                </div>
             </MotionDiv>
          ))}

          {/* Legend Overlay */}
          <div className={`absolute bottom-6 left-6 md:bottom-12 md:left-12 px-6 py-4 rounded-xl border z-20 ${darkTheme ? 'bg-black/60 border-white/10 backdrop-blur-md' : 'bg-white/80 border-gray-200 backdrop-blur-sm'}`}>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse" />
                <span className={`font-bold text-sm md:text-lg tracking-wide uppercase ${darkTheme ? 'text-white' : 'text-brand-navy'}`}>{title}</span>
             </div>
          </div>
       </div>
    </div>
  );
}

// Nav Link Component
const NavLink = ({ href, children, isActive, onClick }: { href: string, children: React.ReactNode, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`relative text-xs font-medium tracking-wide uppercase transition-all duration-300 px-3 py-2 ${
      isActive ? 'text-brand-gold font-bold scale-110' : 'text-white/60 hover:text-white'
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
              <Globe size={40} strokeWidth={1.5} />
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

const MainContent = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [currentProcessStep, setCurrentProcessStep] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [showroomCategory, setShowroomCategory] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const t = TRANSLATIONS[lang];
  const navLinks = ['about', 'services', 'process', 'team', 'differentiators', 'testimonials', 'showroom', 'contact'];

  const processImages = [
    "https://images.unsplash.com/photo-1553877622-78e5d2c224e5?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1494412651409-8963ce7f8171?auto=format&fit=crop&q=80&w=1000"
  ];

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

  const filteredShowroomItems = showroomCategory === 'all' 
    ? t.showroom.items 
    : t.showroom.items.filter(item => item.category === showroomCategory);

  return (
    <div className="bg-[#1B2440] text-brand-dark font-sans h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* --- Fixed Navigation Bar --- */}
      {/* DESKTOP SIDEBAR NAV */}
      <nav className="hidden lg:flex fixed top-0 left-0 bottom-0 w-24 z-[200] bg-brand-navy flex-col justify-between items-center py-8 border-r border-white/10">
          <button onClick={() => handleNavClick('about')} className="w-12 h-12 rounded-2xl bg-white text-brand-navy flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/5">
             <Globe size={24} />
          </button>

          <div className="flex flex-col gap-6 items-center w-full">
            {navLinks.map((item) => {
              const Icon = SECTION_ICONS[item] || Circle;
              return (
                <div key={item} className="relative group w-full flex justify-center">
                  <button 
                    onClick={() => handleNavClick(item)}
                    className={`p-2 rounded-xl transition-all duration-300 group-hover:bg-white/10 ${
                      activeSection === item && currentView === 'home' ? 'text-brand-gold bg-white/10' : 'text-white/40'
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
             <div className="w-8 h-8 rounded-xl bg-white text-brand-navy flex items-center justify-center">
               <Globe size={18} />
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

      {/* --- Chat Widget (Odoo Sim) --- */}
      <AnimatePresence>
        {isChatOpen && (
          <MotionDiv 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 lg:bottom-28 lg:right-10 w-[350px] bg-white rounded-2xl shadow-2xl z-[150] overflow-hidden flex flex-col border border-gray-100"
          >
             <div className="bg-brand-navy p-4 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                 <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center font-bold">CTB</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-brand-navy"></div>
                 </div>
                 <div>
                    <h3 className="font-bold text-sm">Cross The Bridge</h3>
                    <p className="text-xs text-brand-gold opacity-90">Online</p>
                 </div>
               </div>
               <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1 rounded"><X size={18}/></button>
             </div>
             
             <div className="flex-1 bg-gray-50 h-[300px] p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="self-start bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm text-gray-700">
                   Hello! How can we help you expand your business today?
                </div>
                {/* Odoo script hook would go here */}
                {/* Example: <div id="odoo_livechat_container"></div> */}
             </div>

             <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
               <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-navy" />
               <button className="w-9 h-9 bg-brand-navy text-white rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors">
                 <Send size={16} />
               </button>
             </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 rounded-full shadow-2xl z-[150] flex items-center justify-center hover:scale-110 transition-all cursor-pointer ${isChatOpen ? 'bg-gray-200 text-gray-600' : 'bg-brand-gold text-brand-navy'}`}
        title="Live Chat"
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

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
      <section id="about" className="min-h-[100svh] snap-start relative flex flex-col justify-center overflow-hidden bg-brand-navy">
         <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="World" />
           <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
         </div>
         <GridPattern color="#FFFFFF" opacity={0.05} />
         <MailStamp className="bottom-10 right-6 md:bottom-20 md:right-20 text-white/20 border-white/20 -rotate-12" />

         <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
               <FadeIn delay={0.1}>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" /> Est. 2004
                 </div>
               </FadeIn>
               <FadeIn delay={0.2}>
                 <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
                   {t.hero.title.split(' ').map((word, i) => (
                     <span key={i} className="block">{word}</span>
                   ))}
                 </h1>
               </FadeIn>
               <FadeIn delay={0.3}>
                 <p className="text-gray-300 text-sm md:text-lg max-w-lg mb-8 leading-relaxed border-l-2 border-brand-gold pl-4">{t.hero.subtitle}</p>
               </FadeIn>
               <FadeIn delay={0.4}>
                 <button onClick={() => handleNavClick('services')} className="group flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
                   {t.hero.cta} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </button>
               </FadeIn>
            </div>
            <div className="hidden md:flex justify-center items-center relative">
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
         
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
            <ChevronDown size={24} />
         </div>
      </section>

      {/* 2. SERVICES (Light) */}
      <section id="services" className="min-h-[100svh] snap-start relative bg-[#F5F5F7] text-brand-navy flex flex-col justify-center py-24 overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 pointer-events-none" />
         
         <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
            <div className="flex justify-between items-end mb-12">
               <FadeIn direction='right'>
                 <h2 className="text-4xl md:text-6xl font-bold text-brand-navy">{t.services.title}</h2>
                 <p className="text-gray-500 mt-2 max-w-md">{t.services.subtitle}</p>
               </FadeIn>
            </div>

            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
               {t.services.items.map((item, idx) => {
                 const Icon = idx === 0 ? Package : idx === 1 ? Layers : idx === 2 ? Globe : Users;
                 return (
                   <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                     <div 
                       className="group relative h-full bg-white rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[250px] md:min-h-[400px]"
                       onClick={() => setExpandedService(idx)}
                     >
                        <div className="absolute top-0 right-0 p-4 md:p-6 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity scale-125 md:scale-150 origin-top-right">
                           <Icon size={80} className="md:w-[120px] md:h-[120px]" />
                        </div>
                        
                        <div>
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors">
                              <Icon size={20} className="md:w-6 md:h-6" />
                           </div>
                           <h3 className="text-lg md:text-xl font-bold leading-tight mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                           <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-brand-navy">Learn More</span>
                           <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                              <Plus size={16} />
                           </div>
                        </div>
                     </div>
                   </FadeIn>
                 )
               })}
            </div>
         </div>

         {/* Expanded Service Modal */}
         <AnimatePresence>
            {expandedService !== null && (
              <div className="fixed inset-0 z-[250] flex items-center justify-center px-4">
                 <MotionDiv 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   exit={{ opacity: 0 }}
                   onClick={() => setExpandedService(null)} 
                   className="absolute inset-0 bg-brand-navy/90 backdrop-blur-sm" 
                 />
                 <MotionDiv
                   layoutId={`service-expand-${expandedService}`}
                   className="bg-white w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl"
                 >
                    <button onClick={() => setExpandedService(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                       <X size={20} />
                    </button>
                    <h3 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6">{t.services.items[expandedService].title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">{t.services.items[expandedService].desc}</p>
                    <button onClick={() => handleNavClick('contact')} className="bg-brand-navy text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-navy transition-colors">
                       Get Started
                    </button>
                 </MotionDiv>
              </div>
            )}
         </AnimatePresence>
      </section>

      {/* 3. PROCESS (Dark) */}
      <section id="process" className="min-h-[100svh] snap-start bg-brand-navy text-white relative flex flex-col py-24">
         <GridPattern color="#FFF" opacity={0.05} />
         <div className="flex-1 container mx-auto px-6 flex flex-col justify-center relative z-10">
            <div className="flex flex-col md:flex-row min-h-[70vh] gap-8 md:gap-16 items-center">
               
               {/* Content Side */}
               <div className="md:w-1/2 flex flex-col justify-center">
                  <FadeIn>
                     <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">How We Do It</span>
                     <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">{t.process.title}</h2>
                  </FadeIn>

                  {/* Highlights */}
                  <div className="flex gap-4 mb-8">
                     {[ {i:Layers, l:"Leather"}, {i:Scissors, l:"Footwear"}, {i:Shirt, l:"Fashion"}].map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs font-bold uppercase border border-white/10">
                           <tag.i size={14} /> {tag.l}
                        </div>
                     ))}
                  </div>

                  <div className="relative min-h-[250px]">
                     <AnimatePresence mode='wait'>
                        <MotionDiv
                           key={currentProcessStep}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           transition={{ duration: 0.4 }}
                        >
                           <div className="flex items-baseline gap-4 mb-4">
                              <span className="text-5xl font-bold text-white/10">0{currentProcessStep + 1}</span>
                              <h3 className="text-3xl font-bold text-white">{t.process.steps[currentProcessStep].title}</h3>
                           </div>
                           <ul className="space-y-4">
                              {t.process.steps[currentProcessStep].points.map((p, i) => (
                                 <li key={i} className="flex items-center gap-3 text-gray-300 text-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> {p}
                                 </li>
                              ))}
                           </ul>
                        </MotionDiv>
                     </AnimatePresence>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 mt-8">
                     <button onClick={() => setCurrentProcessStep(p => (p - 1 + 4) % 4)} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-brand-navy transition-all"><ArrowLeft size={20} /></button>
                     <button onClick={() => setCurrentProcessStep(p => (p + 1) % 4)} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-brand-navy transition-all"><ArrowRight size={20} /></button>
                  </div>
               </div>

               {/* Image Side */}
               <div className="md:w-1/2 h-full relative hidden md:block">
                  <AnimatePresence mode='wait'>
                     <MotionImg 
                        key={currentProcessStep}
                        src={processImages[currentProcessStep]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border border-white/10"
                     />
                  </AnimatePresence>
                  {/* Decorative */}
                  <div className="absolute -bottom-8 -left-8 bg-brand-navy p-6 rounded-2xl shadow-xl z-20 hidden lg:block border border-white/20">
                     <div className="flex items-center gap-4">
                        <div className="bg-green-900/50 p-3 rounded-full text-green-400"><CheckCircle /></div>
                        <div>
                           <p className="text-xs font-bold uppercase text-gray-400">Status</p>
                           <p className="font-bold text-white">Verified Step</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. TEAM (Light) */}
      <section id="team" className="min-h-[100svh] snap-start flex flex-col md:flex-row bg-[#F5F5F7] overflow-hidden">
         {/* Left: Image (Full Height) */}
         <div className="md:w-1/2 min-h-[50vh] md:h-auto relative">
            <img src="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Mariana" />
            <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply" />
            <div className="absolute bottom-12 left-12 text-white p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
               <h3 className="text-3xl font-bold">{t.team.profile.name}</h3>
               <p className="text-brand-gold font-bold uppercase tracking-widest text-sm">{t.team.profile.role}</p>
            </div>
         </div>

         {/* Right: Content (Clean) */}
         <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-24 py-24">
             <FadeIn direction='right'>
                <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4 block">Leadership</span>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8">{t.team.title}</h2>
                <div className="text-6xl text-brand-gold/20 font-serif mb-4">“</div>
                <p className="text-lg md:text-xl text-brand-navy/80 leading-relaxed font-light mb-12">
                   {t.team.profile.bio}
                </p>
                
                <div className="border-t border-gray-100 pt-8">
                   <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-navy mb-6">
                      <GraduationCap size={16} /> Education
                   </h4>
                   <div className="grid gap-4">
                      {t.team.profile.education.map((edu, i) => (
                         <div key={i} className="flex justify-between items-center group">
                            <span className="font-bold text-brand-navy group-hover:text-brand-gold transition-colors">{edu.degree}</span>
                            <span className="text-sm text-gray-400">{edu.school}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </FadeIn>
         </div>
      </section>

      {/* 5. DIFFERENTIATORS (Dark) */}
      <section id="differentiators" className="min-h-[100svh] snap-start bg-[#141B2D] text-white flex flex-col justify-center relative py-24">
        <GridPattern color="#C4A661" opacity={0.05} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Why Choose Us</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-2">{t.differentiators.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-y-16 max-w-6xl mx-auto relative">
            {/* Connecting Lines for Desktop */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
               <svg className="w-full h-full opacity-20">
                  <path d="M100,50 L500,50 L900,200" fill="none" stroke="#C4A661" strokeWidth="2" strokeDasharray="10 10" />
                  <path d="M100,200 L500,350 L900,350" fill="none" stroke="#C4A661" strokeWidth="2" strokeDasharray="10 10" />
               </svg>
            </div>

            {t.differentiators.items.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                 <div className="relative group bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute -top-6 left-8 bg-brand-navy border border-brand-gold/30 p-3 rounded-2xl text-brand-gold shadow-lg shadow-brand-gold/10">
                       <Star size={20} className="fill-brand-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 mt-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                 </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Light) */}
      <section id="testimonials" className="min-h-[100svh] snap-start bg-white text-brand-navy flex flex-col justify-center relative py-24">
         <GridPattern color="#1B2440" opacity={0.05} />
         <GlowingOrb className="top-1/4 left-1/4 bg-brand-gold/10" />

         <div className="container mx-auto px-6 relative z-10">
            <FadeIn>
               <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-brand-navy">{t.testimonials.title}</h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto mb-20">
               {t.testimonials.items.map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 0.2} className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                     <div className="flex gap-1 mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-brand-gold text-brand-gold" />)}
                     </div>
                     <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-8 text-gray-700">"{item.text}"</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy font-bold text-xl">
                           {item.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-lg text-brand-navy">{item.name}</p>
                           <p className="text-gray-400 text-sm">{item.role}</p>
                        </div>
                     </div>
                  </FadeIn>
               ))}
            </div>

            {/* Global Map (Light Theme Version) */}
            <FadeIn>
               <GlobalMap title={`Presence in more than 20 countries`} darkTheme={false} />
            </FadeIn>

            {/* Stats Counters (Dark text) */}
            <div className="flex justify-center gap-16 flex-wrap mt-16">
               {[ {v:t.stats.years, l:t.stats.yearsLabel}, {v:t.stats.negotiations, l:t.stats.negotiationsLabel}, {v:t.stats.alliances, l:t.stats.alliancesLabel}].map((stat, i) => (
                  <Counter key={i} value={stat.v} label={stat.l} dark={true} />
               ))}
            </div>

            {/* Allies (Dark Theme Icons) */}
            <div className="mt-20">
               <LogoMarquee dark={true} />
            </div>
         </div>
      </section>

      {/* 7. SHOWROOM (Dark) */}
      <section id="showroom" className="min-h-[100svh] snap-start bg-[#111] text-white flex flex-col justify-center relative py-24">
         <div className="container mx-auto px-6 h-full flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Catalog</span>
                  <h2 className="text-4xl md:text-5xl font-bold">{t.showroom.title}</h2>
               </div>
               <div className="flex flex-wrap gap-2">
                  {Object.keys(t.showroom.categories).map(cat => (
                     <button 
                       key={cat} 
                       onClick={() => setShowroomCategory(cat)}
                       className={`px-4 py-2 rounded-full border text-xs font-bold uppercase ${showroomCategory === cat ? 'bg-white text-black border-white' : 'border-white/20 text-white/50 hover:text-white'}`}
                     >
                        {t.showroom.categories[cat as keyof typeof t.showroom.categories]}
                     </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <AnimatePresence mode='popLayout'>
                  {filteredShowroomItems.slice(0, 6).map((item) => (
                     <MotionDiv
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group overflow-hidden rounded-xl bg-gray-900 aspect-square"
                     >
                        <img src={item.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                           <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-1">{t.showroom.categories[item.category as keyof typeof t.showroom.categories]}</p>
                           <p className="font-bold text-xl">{item.title}</p>
                        </div>
                     </MotionDiv>
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </section>

      {/* 8. CONTACT (Light) */}
      <section id="contact" className="min-h-[100svh] snap-start bg-white flex flex-col justify-center relative text-brand-navy pt-24 pb-0">
         <GridPattern color="#1B2440" opacity={0.03} />
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center flex-1 pb-24">
            <div>
               <FadeIn>
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Get in Touch</span>
                  <h2 className="text-5xl md:text-7xl font-bold mb-8 text-brand-navy">{t.contact.title}</h2>
                  <div className="space-y-8 text-lg">
                     <a href="mailto:info@crossthebridge.co" className="flex items-center gap-4 hover:text-brand-gold transition-colors">
                        <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center"><Mail size={20} /></div>
                        info@crossthebridge.co
                     </a>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center"><Phone size={20} /></div>
                        +52 477 765 3792
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center"><MapPin size={20} /></div>
                        León Gto, México
                     </div>
                  </div>
                  
                  <div className="flex gap-4 mt-12">
                     <a href="https://linkedin.com/in/marianamucino" target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all"><Linkedin size={20} /></a>
                     <a href="#" className="p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all"><Instagram size={20} /></a>
                     <a href="#" className="p-3 bg-brand-navy/5 rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all"><Facebook size={20} /></a>
                  </div>
               </FadeIn>
            </div>

            <div className="bg-[#F5F5F7] text-brand-navy p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
               <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs font-bold uppercase tracking-widest mb-2 block">{t.contact.form.name}</label>
                        <input type="text" className="w-full bg-white p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                     </div>
                     <div>
                        <label className="text-xs font-bold uppercase tracking-widest mb-2 block">{t.contact.form.company}</label>
                        <input type="text" className="w-full bg-white p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                     </div>
                  </div>
                  <div>
                     <label className="text-xs font-bold uppercase tracking-widest mb-2 block">{t.contact.form.email}</label>
                     <input type="email" className="w-full bg-white p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                  </div>
                  <div>
                     <label className="text-xs font-bold uppercase tracking-widest mb-2 block">{t.contact.form.message}</label>
                     <textarea rows={4} className="w-full bg-white p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                  </div>
                  <button className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-colors shadow-lg">
                     {t.contact.form.submit}
                  </button>
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
