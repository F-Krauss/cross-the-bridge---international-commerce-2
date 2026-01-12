import React, { useRef, useId, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionSpan = motion.span as any;

// Assets
const logoWordmarkPng = '/img/Logo_letras.png';

// --- Visual Components ---

export const LogoWordmark = ({ className = "", color }: { className?: string, color?: string }) => {
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

export const GridPattern = ({ color = "#1B2440", opacity = 0.08 }) => (
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      opacity,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: '60px 60px'
    }}
  />
);

export const GlowingOrb = ({ className, color = "bg-[#d5ba8c]" }: { className?: string, color?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${color} ${className}`} />
);

export const MailStamp = ({ className, text = "AIR MAIL", color = "border-brand-navy/20 text-brand-navy/20" }: { className?: string, text?: string, color?: string }) => (
  <div className={`absolute pointer-events-none border-4 rounded-lg px-4 py-2 font-bold uppercase tracking-widest text-xs md:text-sm rotate-12 mix-blend-overlay z-10 ${color} ${className}`} style={{ borderStyle: 'double' }}>
    <div className="flex items-center gap-2">
      <span>{text}</span>
    </div>
  </div>
);

export const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

// --- Animation Components ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'right' | 'left' | 'down';
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
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
        delay: Math.min(delay, 0.15),
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
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px -15% 0px" });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

// --- Utility Functions ---

export const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Hook to ensure a video element plays - waits for loading screen to complete
export const useVideoAutoplay = (videoRef: React.RefObject<HTMLVideoElement>, immediate = true) => {
  useEffect(() => {
    const playVideo = () => {
      const video = videoRef.current;
      if (!video || !video.paused) return;

      video.muted = true;
      video.volume = 0;
      video.playsInline = true;

      if (video.readyState < 2) {
        video.load();
      }

      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay might be blocked; we'll keep retrying
        });
      }
    };

    const scheduleAttempts = (delays: number[]) => {
      delays.forEach((delay) => window.setTimeout(playVideo, delay));
    };

    let retryIntervalId: ReturnType<typeof setInterval> | null = null;
    const startRetryLoop = () => {
      if (retryIntervalId !== null) return;

      let retries = 0;
      retryIntervalId = setInterval(() => {
        const video = videoRef.current;
        if (!video) return;
        if (!video.paused || retries >= 16) {
          if (retryIntervalId !== null) {
            clearInterval(retryIntervalId);
            retryIntervalId = null;
          }
          return;
        }
        playVideo();
        retries += 1;
      }, 400);
    };

    const handleLoadingComplete = () => {
      if (!immediate) return;
      playVideo();
      scheduleAttempts([50, 150, 300, 500, 800, 1200, 1800]);
      startRetryLoop();
    };

    if (immediate) {
      playVideo();
      scheduleAttempts([100, 300, 600]);
      startRetryLoop();
    }

    window.addEventListener('loadingComplete', handleLoadingComplete);
    return () => {
      window.removeEventListener('loadingComplete', handleLoadingComplete);
      if (retryIntervalId !== null) {
        clearInterval(retryIntervalId);
      }
    };
  }, [immediate, videoRef]);
};

// Export motion divs for convenient access
export const MotionComponents = {
  Div: MotionDiv,
  Img: MotionImg,
  Span: MotionSpan
};
