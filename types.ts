

export type Language = 'en' | 'es';

export interface Content {
  nav: {
    about: string;
    services: string;
    showroom: string;
    process: string;
    team: string;
    why_us: string;
    testimonials: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    audience: string;
    subtitle: string;
    proofs: string[];
    cta: string;
    cta2: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      icon: string;
      bullets?: string[];
      details?: string[];
    }[];
    missions?: {
      title: string;
      intro: string;
      points: string[];
      eventsTitle: string;
      events: string[];
      cta: string;
      tagline?: string;
    };
  };
  showroom: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      footwear: string;
      leather: string;
      hats: string;
      industrial: string;
    };
    items: {
      id: number;
      category: string;
      title: string;
      image: string;
    }[];
  };
  process: {
    title: string;
    subtitle: string;
    intro: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };
  team: {
    title: string;
    subtitle: string;
    profile: {
      name: string;
      role: string;
      bio: string;
      educationTitle: string;
      education: {
        degree: string;
        school: string;
      }[];
    };
  };
  stats: {
    years: string;
    yearsLabel: string;
    // negotiations: string;
    // negotiationsLabel: string;
    alliances: string;
    alliancesLabel: string;
  };
  testimonials: {
    title: string;
    items: {
      name: string;
      role: string;
      text: string;
      country: string;
      countryCode: string;
      image?: string;
    }[];
  };
  differentiators: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      website: string;
      serviceInterest: string;
      servicePlaceholder: string;
      messageHint: string;
      company: string;
      message: string;
      submit: string;
    };
    info: {
      call: string;
      location: string;
      email: string;
    };
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
  legal: {
    privacy: {
      title: string;
      lastUpdated: string;
      content: { heading: string; body: string }[];
    };
    terms: {
      title: string;
      lastUpdated: string;
      content: { heading: string; body: string }[];
    };
    back: string;
  };
}
