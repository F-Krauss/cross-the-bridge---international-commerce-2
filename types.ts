

export type Language = 'en' | 'es';

export interface Content {
  nav: {
    about: string;
    services: string;
    showroom: string;
    process: string;
    team: string;
    testimonials: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  showroom: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      footwear: string;
      leather: string;
      fashion: string;
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
      points: string[];
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
    negotiations: string;
    negotiationsLabel: string;
    alliances: string;
    alliancesLabel: string;
  };
  testimonials: {
    title: string;
    items: {
      name: string;
      role: string;
      text: string;
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