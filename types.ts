

export type Language = 'en' | 'es';

export interface Content {
  nav: {
    services: string;
    process: string;
    trade_missions: string;
    about: string;
    bridge_effect: string;
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
  proofBar: {
    title: string;
    subtitle: string;
    metrics: {
      label: string;
      value: string;
      detail: string;
    }[];
    logos: string[];
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
      equestrian?: string;
      private_label?: string;
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
      tagline?: string;
      desc: string;
    }[];
    outro?: string;
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
  about: {
    badge: string;
    founderTitle: string;
    founderTagline: string;
    founderStoryBadge: string;
    founderName: string;
    founderRole: string;
    bio: string[];
    bioCtaMore: string;
    bioCtaLess: string;
    differentiators: {
      badge: string;
      title: string;
      subtitle: string;
      openLabel: string;
      viewLabel: string;
      items: { title: string; body: string; image: string; imageAlt: string }[];
    };
    outcomes: {
      badge: string;
      title: string;
      items: { title: string; body: string }[];
    };
    leon: {
      badge: string;
      heading: string;
      stats: string[];
      scaleBadge: string;
      scaleLabel: string;
      paragraphs: string[];
      advantagesBadge: string;
      advantages: { title: string; body: string }[];
    };
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
  assurances: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      proof: string;
      icon: string;
    }[];
  };
  capabilities: {
    title: string;
    subtitle: string;
    bullets: string[];
    previewLabel: string;
    previewSlides: {
      title: string;
      desc: string;
    }[];
    form: {
      title: string;
      subtitle: string;
      name: string;
      company: string;
      role: string;
      email: string;
      cta: string;
      disclaimer: string;
    };
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
  bridgeEffect: {
    badge: string;
    title: string;
    body: string;
    industriesTitle: string;
    industriesIntro: string;
    selectedLabel: string;
    categoriesSuffix: string;
    testimonialsBadge: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    storyLabel: string;
  };
  tradeMissions?: {
    badge: string;
    title: string;
    cta: string;
    tagline: string;
    selectLabel: string;
    panels: {
      id: string;
      label: string;
      title: string;
      body?: string[];
      list?: string[];
      media: { src: string; alt: string };
    }[];
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
