import React from 'react';
import { motion } from 'framer-motion';
import {
  Anchor,
  Award,
  Box,
  FileText,
  Globe,
  Hexagon,
  Layers,
  MapPin,
  Navigation,
  Package,
  Scissors,
  Settings,
  Shield,
  Ship,
  Target,
  Truck,
  Users
} from 'lucide-react';
import { LOGO_MARQUEE_ITEMS } from '../../constants';

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
const MotionDiv = motion.div as any;

const LogoMarquee = ({ dark = false }: { dark?: boolean }) => (
  <div className={`w-full overflow-hidden py-8 border-t relative z-10 mt-12 backdrop-blur-sm ${dark ? 'border-brand-navy/10 bg-brand-navy/5' : 'border-white/10 bg-white/5'}`}>
    <div className="relative flex w-full overflow-hidden mask-fade">
      <MotionDiv
        className="flex gap-12 md:gap-24 whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {[...LOGO_MARQUEE_ITEMS, ...LOGO_MARQUEE_ITEMS, ...LOGO_MARQUEE_ITEMS].map((logo, i) => {
          const Icon = ICON_MAP[logo.icon as IconKey] || Hexagon;
          return (
            <div key={`${logo.name}-${i}`} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
              <Icon size={18} className={`md:w-5 md:h-5 ${dark ? 'text-brand-navy' : 'text-white'}`} />
              <span className={`text-[10px] md:text-sm font-bold uppercase tracking-wider ${dark ? 'text-brand-navy' : 'text-white'}`}>{logo.name}</span>
            </div>
          );
        })}
      </MotionDiv>
    </div>
  </div>
);

export default LogoMarquee;
