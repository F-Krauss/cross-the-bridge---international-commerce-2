import { Language } from '../types';

export interface SectionProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
  ui: any;
}

export interface HeroSectionProps extends SectionProps {
  onHeroReady?: () => void;
  setServiceFilter?: (filter: string) => void;
}

export interface ServicesSectionProps extends SectionProps {
  onServiceSelect?: (service: string) => void;
  selectedService?: string | null;
}

export interface ProcessSectionProps extends SectionProps {
  // Additional props as needed
}

export interface CapabilitiesSectionProps extends SectionProps {
  // Additional props as needed
}

export interface StrengthsSectionProps extends SectionProps {
  // Additional props as needed
}

export interface BridgeSectionProps extends SectionProps {
  // Additional props as needed
}

export interface DifferentiatorsSectionProps extends SectionProps {
  // Additional props as needed
}

export interface FounderSectionProps extends SectionProps {
  // Additional props as needed
}

export interface ShowroomSectionProps extends SectionProps {
  // Additional props as needed
}

export interface ProvidersSectionProps extends SectionProps {
  // Additional props as needed
}

export interface ContactSectionProps extends SectionProps {
  // Additional props as needed
}
