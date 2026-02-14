

import type { ElementType } from 'react';
import { Compass, FileText, Navigation, Package, RotateCcw, Shield } from 'lucide-react';
import { Content, Language } from './types';

type Localized<T = string> = Record<Language, T>;

type BookingCopy = {
  formLabel: string;
  formTitle: string;
  orgHint: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    website: string;
    company: string;
    companyCountry: string;
    orgs: string;
    position: string;
    service: string;
    origin: string;
    target: string;
    date: string;
    time: string;
  };
  placeholders: {
    phone: string;
    website: string;
    service: string;
    region: string;
    time: string;
  };
  orgOptions: string[];
  serviceOptions: string[];
  regionOptions: string[];
  submit: {
    idle: string;
    loading: string;
    success: string;
  };
  successMessage: string;
};

type UiText = {
  booking: BookingCopy;
  hero: { scrollPrompt: string };
  proofOverlay: { badge: string; title: string; desc: string; footer: string };
  services: { tag: string; includesLabel: string; mobileHint: string; tapHint: string; whyTag: string };
  process: { badge: string; ctaStart: string; ctaServices: string; proofFallback: string; evidenceCaption: string };
  assurances: { badge: string; title: string; desc: string; footer: string };
  capabilities: { timelineLabel: string; auditLabel: string; sending: string; sent: string };
  strengths: { tag: string; title: string; swipeHint: string };
  bridge: { badge: string; heading: string; subtitle: string; testimonialsLabel: string; testimonialsTitle: string; readStory: string; snapshotsLabel: string; presenceLabel: string; swipeHint: string };
  showroom: { label: string };
  providers: { tag: string; title: string; subtitle: string; items: { title: string; body: string }[]; cta: string };
  contact: { tag: string; sending: string; sent: string; success: string; error: string; location: string; phoneUS: string; phoneMX: string; email: string; socials: { linkedin: string; instagram: string; facebook: string } };
  differentiators: { tag: string; accordionOpen: string; accordionClose: string; readMore: string };
  founder: { badge: string };
};

type IconName =
  | 'Hexagon'
  | 'Anchor'
  | 'Box'
  | 'Globe'
  | 'Truck'
  | 'Layers'
  | 'MapPin'
  | 'Navigation'
  | 'Scissors'
  | 'Award'
  | 'FileText'
  | 'Settings'
  | 'Users'
  | 'Ship'
  | 'Target'
  | 'Shield'
  | 'Package';
export const BOOKING_TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export const mapImage = '/img/world-map.svg';
export const logoVertical = '/img/ganzo.png';
export const logoWordmarkPng = '/img/Logo_letras.png';

export const PUBLIC_IMAGE_URLS = Array.from(new Set([
  '/img/world-map.svg',
  '/img/ganzo.png',
  '/img/Logo_letras.png',
  '/img/logo_horizontal.png',
  '/img/Logos/Chazlyn.png',
  '/img/Logos/Outback.png',
  '/img/Logos/Viberg.png',
  '/img/Calzado1.jpg',
  '/img/process2.jpg',
  '/img/process4.jpg',
  '/img/how-we-work/OnSite1.jpg',
  '/img/how-we-work/Leather inspection.jpg',
  '/img/how-we-work/Proceso3.jpg',
  '/img/services/Piel1.jpg',
  '/img/services/Calzado5.jpg',
  '/img/services/OnSite2.jpg',
  '/img/about/MarianaBio.PNG',
  '/img/about/leon.jpeg',
  '/img/leather-svgrepo-com.svg',
  '/img/viberg-testimonial.jpg',
  '/img/bridge_effect/B2B CICB.jpg',
  '/img/bridge_effect/Brett Viberg supply chain development.jpg',
  '/img/bridge_effect/Embajada Alemania 2023.jpg',
  '/img/catalog/Footwear1.jpg',
  '/img/catalog/Footwear2.jpg',
  '/img/catalog/Footwear3.jpg',
  '/img/catalog/Leather1.jpg',
  '/img/catalog/Leather2.jpg',
  '/img/catalog/Leather3.jpg',
  '/img/catalog/Hats1.jpg',
  '/img/catalog/Hats2.jpg',
  '/img/catalog/Hats3.jpg',
  '/img/catalog/Equestrian1.jpg',
  '/img/catalog/Equestrian2.jpg',
  '/img/catalog/Equestrian3.jpg',
  '/img/testimonials/BaP_viberg.jpg',
  '/img/testimonials/CICB_brazil.jpg',
  '/img/testimonials/Chazlyn_Chaz.jpg',
  '/img/testimonials/Mehrdad_jrd_california.jpg',
  '/img/testimonials/Wilsonking_outback.jpg',
  '/img/Collage/Collage_control_de_calidad.jpg',
  '/img/Collage/Collage_embajada_alemania.jpg',
  '/img/Collage/Collage_junta.jpg',
  '/img/Collage/Collage_junta2.jpg',
  '/img/Collage/Collage_mision_Thailandia.jpg',
  '/img/img-mariana/3febYOURJOURNEYWITHUS.jpg',
  '/img/img-mariana/services3.jpeg',
  '/img/img-mariana/EQUESTRIANGOOD.PNG',
  '/img/sello.png',
]));

export const ASSURANCE_ICONS: Record<string, ElementType> = {
  Shield,
  FileText,
  Compass,
  Package,
  Navigation,
  RotateCcw
};

export const BOOKING_STEP_MEDIA = [
  { src: '/img/Collage/Collage_junta.jpg', alt: 'Intro call and contact details' },
  { src: '/img/process2.jpg', alt: 'Company overview' },
  { src: '/img/Calzado1.jpg', alt: 'Factory production' },
  { src: '/img/process4.jpg', alt: 'Planning a call' }
];

export const HERO_PARTNER_LOGOS = [
  { src: '/img/Logos/Chazlyn.png', alt: 'Chazlyn' },
  { src: '/img/Logos/Outback.png', alt: 'Outback' },
  { src: '/img/Logos/Viberg.png', alt: 'Viberg' }
];

export const HERO_INDUSTRIES = ['Footwear', 'Leather', 'Hats', 'Equestrian goods'];

export const SERVICES_SECTION_IMAGES = [
  './../img/services/Piel1.jpg',
  './../img/services/Calzado5.jpg',
  '/img/img-mariana/IMG_4279.JPG',
];

export const ABOUT_LEON_PRODUCT_IMAGES = [
  '/img/img-mariana/leather_2.png',
  '/img/img-mariana/LEATHER.png',
  '/img/img-mariana/CINCHOS EQUESTRIAN.png',
  '/img/img-mariana/hats.png'
];

export const BRIDGE_TESTIMONIAL_IMAGES = [
  '/img/testimonials/Wilsonking_outback.jpg',
  '/img/testimonials/CICB_brazil.jpg',
  '/img/testimonials/Chazlyn_Chaz.jpg',
  '/img/testimonials/BaP_viberg.jpg',
  '/img/testimonials/Mehrdad_jrd_california.jpg'
];

export const BRIDGE_HERO_GALLERY = [
  { src: '/img/img-mariana/bridge-effect/thebridge.jpg', title: 'Hands-on sourcing and production', tag: 'Factory & materials' },
  { src: '/img/img-mariana/bridge-effect/thebridgeeffect.JPG', title: 'Leather inspection on-site', tag: 'Quality control' },
  { src: '/img/img-mariana/bridge-effect/bridgeeffec2.jpg', title: 'Materials moving daily', tag: 'Logistics' },
  { src: '/img/img-mariana/bridge-effect/brazil.jpeg', title: 'Prototyping with partners', tag: 'Development' },
  // { src: '/img/img-mariana/bridge-effect/bridgeeffect3.JPG', title: 'Factory floor execution', tag: 'Production' },
  // { src: '/img/img-mariana/bridge-effect/IMG_4279.JPG', title: 'Export-ready packaging', tag: 'Export' },
  { src: '/img/img-mariana/bridge-effect/febrero3_BRIDGEEFFECT.jpg', title: 'Material sourcing', tag: 'Sourcing' },
  { src: '/img/img-mariana/bridge-effect/3febHATS_BRIDGEEFFECT.jpg', title: 'Alliance building', tag: 'Alliances' }
];

export const BRIDGE_INDUSTRY_OPTIONS = [
  {
    key: 'footwear',
    label: { en: 'Footwear', es: 'Calzado' },
    title: { en: 'Footwear manufacturing', es: 'Manufactura de calzado' },
    description: { en: 'Goodyear welt, cemented, and stitchdown builds supervised on the factory floor.', es: 'Construcciones Goodyear welt, cementado y stitchdown supervisadas directamente en planta.' },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    showroomCategories: ['footwear'],
    gallery: [
      '/img/img-mariana/products/FOTO_BOTA.png'
      // '/img/catalog/Footwear2.jpg',
      // '/img/catalog/Footwear3.jpg'
    ]
  },
  {
    key: 'leather',
    label: { en: 'Leather', es: 'Piel' },
    title: { en: 'Leather goods', es: 'Artículos de piel' },
    description: { en: 'Supple leathers cut, skived, and finished with export-ready QC.', es: 'Pieles suaves cortadas, rebajadas y terminadas con control de calidad listo para exportación.' },
    image: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&w=1600&q=80',
    showroomCategories: ['leather'],
    gallery: [
      '/img/img-mariana/products/LEATHER.png'
      // '/img/catalog/Leather2.jpg',
      // '/img/catalog/Leather3.jpg',
    ]
  },
  {
    key: 'hats',
    label: { en: 'Hats', es: 'Sombreros' },
    title: { en: 'Fashion & accessories', es: 'Moda y accesorios' },
    description: { en: 'Accessories crafted with boutique detail and industrial discipline.', es: 'Accesorios creados con detalle boutique y disciplina industrial.' },
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80',
    showroomCategories: ['hats'],
    gallery: [
      '/img/img-mariana/products/hats.JPG'
      // '/img/catalog/Hats2.jpg',
      // '/img/catalog/Hats3.jpg',
    ]
  },
  // {
  //   key: 'industrial',
  //   label: { en: 'Industrial', es: 'Industrial' },
  //   title: { en: 'Industrial components', es: 'Componentes industriales' },
  //   description: { en: 'Safety-rated components and materials engineered for performance and durability.', es: 'Componentes y materiales certificados para seguridad, diseñados para desempeño y durabilidad.' },
  //   image: 'https://images.unsplash.com/photo-1524275539700-cf51138f6795?auto=format&fit=crop&w=1600&q=80',
  //   showroomCategories: ['industrial'],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80'
  //   ]
  // },
  {
    key: 'equestrian',
    label: { en: 'Equestrian goods', es: 'Bienes ecuestres' },
    title: { en: 'Equestrian goods', es: 'Bienes ecuestres' },
    description: { en: 'Tack, saddlery, and leather components made to withstand real-world use.', es: 'Cabezal, sillería y componentes de piel hechos para resistir uso real.' },
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    showroomCategories: ['equestrian'],
    gallery: [
      '/img/img-mariana/products/EQUESTRIANGOOD.PNG',
      '/img/img-mariana/products/CINCHOS EQUESTRIAN.png'
      // '/img/img-mariana/products/equestrian3.jpg'
    ]
  }
  // {
  //   key: 'private_label',
  //   label: { en: 'Private label & custom development', es: 'Marca privada y desarrollo a medida' },
  //   title: { en: 'Private label & custom development', es: 'Private label & custom development' },
  //   description: { en: 'Co-created lines, rapid prototyping, and hands-on materials sourcing.', es: 'Líneas co-creadas, prototipado ágil y sourcing práctico de materiales.' },
  //   image: 'https://images.unsplash.com/photo-1524275539700-cf51138f6795?auto=format&fit=crop&w=1600&q=80',
  //   showroomCategories: [],
  //   gallery: [
  //     'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80'
  //   ]
  // }
];

export const SERVICES_CONTENT: Record<Language, {
  title: string;
  intro: string;
  cta: string;
  items: { title: string; short: string; long: string[] }[];
}> = {
  en: {
    title: 'Services',
    intro: 'We are a strategic partner for brands building reliable international manufacturing.',
    cta: 'Read more',
    items: [
      {
        title: 'Raw Materials Sourcing & Supply Assurance',
        short: 'We make sourcing from Mexico reliable for international brands.',
        long: [
          'We make raw material sourcing from Mexico reliable, predictable, and export-ready for the leather, footwear, and fashion industries.',
          'Cross the Bridge ensures consistent raw material sourcing through local oversight and an established supply network across Mexico’s leather and fashion ecosystem. We secure aligned specifications, material availability, and market-based commercial terms to support uninterrupted production.',
          'By representing multiple brands and maintaining long-term supplier relationships, we operate with collective scale and credibility. This provides access to preferred materials and commercially aligned conditions, particularly for high-demand or limited-supply inputs.',
          'Through on-the-ground follow-up, we anticipate risks, align negotiations with local market realities, and address issues early, turning raw material sourcing into a dependable supply strategy.'
        ]
      },
      {
        title: 'Manufacturing & Supply Chain Operations',
        short: 'Scale without production headaches.',
        long: [
          'We become your team on the ground, managing every step of the production process so you can focus on design, sales, and brand growth.',
          'From product development and prototyping to full-scale production, we coordinate daily with factories, track timelines, streamline communication, and resolve issues to keep every deliverable on schedule. Our role goes beyond coordination. We translate expectations, align standards, and anticipate risks before they impact cost, quality, or delivery.',
          'This service covers production planning, materials and cost control, capacity scheduling, quality inspections, risk management, and full export readiness. You gain visibility and control over every stage, knowing your production is managed locally, to international standards, by a team that understands both sides of the process.'
        ]
      },
      {
        title: 'International Growth & Strategic Partnerships',
        short: 'We transform international expansion into a strategic advantage, not a costly learning curve.',
        long: [
          'At Cross the Bridge, we support companies ready to expand beyond their home market through informed decisions and strategic partnerships — not trial-and-error internationalization.',
          'We combine market intelligence, a trusted international network, and hands-on guidance to define where to expand, how to enter, and which partners to align with. Rather than pushing expansion for expansion’s sake, we structure each move based on real opportunity, timing, and strategic fit.',
          'We work through carefully selected projects, supporting founders and leadership teams as they navigate complex international decisions. From early market validation to long-term partner structuring, we reduce risk by ensuring every step is grounded in operational reality, not assumptions.',
          'This service includes market validation, entry and expansion strategies, partner and distributor structuring, trade show and commercial support, export-readiness consulting, and local representation through licensing or strategic alliances. We stay involved on the ground, helping companies move from strategy to execution with confidence and control.'
        ]
      }
    ]
  },
  es: {
    title: 'Servicios',
    intro: 'Somos un socio estratégico para marcas que construyen manufactura internacional confiable.',
    cta: 'Ver más',
    items: [
      {
        title: 'Abastecimiento de materias primas y aseguramiento de suministro',
        short: 'Hacemos confiable el abastecimiento desde México para marcas internacionales.',
        long: [
          'Hacemos que el abastecimiento de materias primas desde México sea confiable, predecible y listo para exportar para las industrias de piel, calzado y moda.',
          'Cross the Bridge garantiza un abastecimiento constante mediante supervisión local y una red establecida dentro del ecosistema de piel y moda de México. Aseguramos especificaciones alineadas, disponibilidad de materiales y condiciones comerciales basadas en mercado para sostener una producción sin interrupciones.',
          'Al representar a varias marcas y mantener relaciones de largo plazo con proveedores, operamos con escala y credibilidad colectiva. Esto da acceso a materiales preferentes y condiciones comerciales alineadas, en especial para insumos de alta demanda o de oferta limitada.',
          'Con seguimiento en sitio, anticipamos riesgos, alineamos negociaciones con la realidad local y resolvemos fricciones a tiempo, convirtiendo el abastecimiento en una estrategia confiable.'
        ]
      },
      {
        title: 'Operación de manufactura y cadena de suministro',
        short: 'Escala sin dolores de cabeza operativos.',
        long: [
          'Nos convertimos en tu equipo en tierra y gestionamos cada paso del proceso para que te enfoques en diseño, ventas y crecimiento de marca.',
          'Desde desarrollo y prototipado hasta producción a escala, coordinamos a diario con fábricas, damos seguimiento a tiempos, agilizamos la comunicación y resolvemos incidentes para mantener cada entrega a tiempo. Nuestro rol va más allá de coordinar: traducimos expectativas, alineamos estándares y anticipamos riesgos antes de que afecten costo, calidad o entrega.',
          'Este servicio incluye planeación de producción, control de materiales y costos, calendarización de capacidad, inspecciones de calidad, gestión de riesgos y preparación completa para exportar. Obtienes visibilidad y control en cada etapa, con producción gestionada localmente bajo estándares internacionales y un equipo que entiende ambos lados del proceso.'
        ]
      },
      {
        title: 'Crecimiento internacional y alianzas estratégicas',
        short: 'Convertimos la expansión internacional en ventaja estratégica, no en curva de aprendizaje costosa.',
        long: [
          'En Cross the Bridge acompañamos a empresas listas para expandirse más allá de su mercado de origen con decisiones informadas y alianzas estratégicas — no con prueba y error.',
          'Combinamos inteligencia de mercado, una red internacional confiable y guía práctica para definir dónde expandir, cómo entrar y con qué socios alinearse. No empujamos la expansión por sí misma: cada movimiento se estructura según oportunidad real, momento adecuado y ajuste estratégico.',
          'Trabajamos en proyectos seleccionados, apoyando a fundadores y equipos directivos en decisiones complejas. Desde validación temprana hasta la estructuración de socios de largo plazo, reducimos el riesgo asegurando que cada paso esté anclado en la realidad operativa, no en supuestos.',
          'Este servicio incluye validación de mercado, estrategias de entrada y expansión, estructuración de socios y distribuidores, soporte en ferias y gestión comercial, consultoría de preparación para exportación y representación local mediante licencias o alianzas estratégicas. Seguimos en el terreno para llevar la estrategia a la ejecución con confianza y control.'
        ]
      }
    ]
  }
};

export const UI_TEXT: Record<Language, UiText> = {
  en: {
    booking: {
      formLabel: 'Form',
      formTitle: 'Book an appointment',
      orgHint: 'Companies / organizations / governments',
      labels: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        website: 'Website',
        company: 'Company',
        companyCountry: 'Company country',
        orgs: 'Organizations',
        position: 'Position',
        service: 'Service of interest',
        origin: 'Country of origin',
        target: 'Target region',
        date: 'Preferred date',
        time: 'Time slot'
      },
      placeholders: {
        phone: '555-123-4567',
        website: 'https://',
        service: 'Select a service',
        region: 'Select a region',
        time: 'Select a time'
      },
      orgOptions: ['Company', 'Organization', 'Government', 'Other'],
      serviceOptions: [
        'Strategic Sourcing / Sourcing Estratégico',
        'Manufacturing & Operations / Manufactura & Operaciones',
        'International Growth / Crecimiento Internacional',
        'Trade Missions / Misiones Comerciales'
      ],
      regionOptions: ['South America', 'Mexico', 'USA', 'Canada', 'Europe', 'Asia'],
      submit: {
        idle: 'Book',
        loading: 'Sending…',
        success: 'Sent'
      },
      successMessage: 'Thanks! We will reach out soon.'
    },
    hero: { scrollPrompt: 'Scroll to explore' },
    proofOverlay: {
      badge: 'On-site footage',
      title: 'Material QA & pre-shipment control',
      desc: 'Walkthroughs, photo evidence, and sign-offs documented in every stage.',
      footer: 'Real inspection footage'
    },
    services: {
      tag: 'What We Offer',
      includesLabel: 'Includes:',
      mobileHint: '← Swipe • Tap for more →',
      tapHint: 'Tap for details',
      whyTag: 'Why Choose Us'
    },
    process: {
      badge: 'Delivery, not promises',
      ctaStart: 'Start Your Journey',
      ctaServices: 'See Services',
      proofFallback: 'Documented hand-off',
      evidenceCaption: 'Evidence paired to this step.'
    },
    assurances: {
      badge: 'Compliance in motion',
      title: 'Logistics, labeling & export governance',
      desc: 'Documentation, HS codes, and labeling validated before cargo leaves the factory.',
      footer: 'Compliance walk-through'
    },
    capabilities: {
      timelineLabel: 'Sample timeline: onboarding to first shipment',
      auditLabel: 'Audit checklist + compliance map preview',
      sending: 'Sending...',
      sent: 'Sent!'
    },
    strengths: {
      tag: 'Our Strengths',
      title: 'CTB Strengths',
      swipeHint: '← Swipe to explore →'
    },
    bridge: {
      badge: 'Know the Bridge Effect',
      heading: 'More Than 20 Countries',
      subtitle: 'Connecting businesses across continents, one successful partnership at a time',
      testimonialsLabel: 'Testimonials',
      testimonialsTitle: 'Partners who crossed with us',
      readStory: 'Read story',
      snapshotsLabel: 'Snapshots from the field',
      presenceLabel: 'Presence in 20+ Countries',
      swipeHint: '← Swipe to explore →'
    },
    showroom: { label: 'Catalog' },
    providers: {
      tag: 'For Leather & Fashion Material Suppliers',
      title: 'Enter the Mexican market with a strategic local partner',
      subtitle: 'We serve as a strategic local channel for international material suppliers seeking to establish and grow a long-term presence in the Mexican market.',
      items: [
        {
          title: 'Strategic Market Entry',
          body: 'We design and manage your entry into the Mexican market with a clear commercial strategy, ensuring your materials are introduced to the right segments, brands, and manufacturers from day one.'
        },
        {
          title: 'International Trade & Market-Ready Infrastructure',
          body: 'We provide international trade infrastructure and flexible logistics capabilities that allow your materials to be imported, stored, and commercialized locally in Mexico — supporting both wholesale and retail needs according to each project’s commercial requirements.'
        },
        {
          title: 'Brand & Reputation Protection',
          body: 'We represent your brand locally with consistency and care, protecting the reputation, standards, and market perception you have built over years of work.'
        },
        {
          title: 'Focused Commercial Growth',
          body: 'We help you grow in Mexico with intention and focus, prioritizing quality partnerships and scalable opportunities over short-term transactions.'
        }
      ],
      cta: 'Explore market entry in Mexico'
    },
    contact: {
      tag: 'Get in Touch',
      sending: 'Sending…',
      sent: 'Sent!',
      success: 'Thanks! We received your details.',
      error: 'Something went wrong',
      location: 'León Gto, México',
      phoneUS: 'US +1 281 323 2612',
      phoneMX: 'MX +52 477 765 3792',
      email: 'mariana@crossthebridge.com.mx',
      socials: {
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        facebook: 'Facebook'
      }
    },
    differentiators: {
      tag: 'Why Choose Us',
      accordionOpen: 'Open',
      accordionClose: 'Close',
      readMore: 'Learn more'
    },
    founder: { badge: 'Leadership' }
  },
  es: {
    booking: {
      formLabel: 'Formulario',
      formTitle: 'Agenda una cita',
      orgHint: 'Empresas / organizaciones / gobiernos',
      labels: {
        name: 'Nombre',
        email: 'Email',
        phone: 'Teléfono',
        website: 'Sitio web',
        company: 'Empresa',
        companyCountry: 'País de la empresa',
        orgs: 'Organizaciones',
        position: 'Puesto',
        service: 'Servicio de interés',
        origin: 'País de origen',
        target: 'Región objetivo',
        date: 'Fecha preferida',
        time: 'Horario'
      },
      placeholders: {
        phone: '555-123-4567',
        website: 'https://',
        service: 'Selecciona un servicio',
        region: 'Selecciona una región',
        time: 'Selecciona un horario'
      },
      orgOptions: ['Empresa', 'Organización', 'Gobierno', 'Otro'],
      serviceOptions: [
        'Sourcing estratégico / Strategic Sourcing',
        'Manufactura y operaciones / Manufacturing & Operations',
        'Crecimiento internacional / International Growth',
        'Misiones comerciales / Trade Missions'
      ],
      regionOptions: ['Sudamérica', 'México', 'Estados Unidos', 'Canadá', 'Europa', 'Asia'],
      submit: {
        idle: 'Agendar',
        loading: 'Enviando…',
        success: 'Enviado'
      },
      successMessage: '¡Gracias! Te contactaremos pronto.'
    },
    hero: { scrollPrompt: 'Desplaza para explorar' },
    proofOverlay: {
      badge: 'Video en planta',
      title: 'QA de materiales y control pre-embarque',
      desc: 'Recorridos, evidencia fotográfica y aprobaciones documentadas en cada etapa.',
      footer: 'Video real de inspección'
    },
    services: {
      tag: 'Lo que ofrecemos',
      includesLabel: 'Incluye:',
      mobileHint: '← Desliza • Toca para ver más →',
      tapHint: 'Toca para ver detalles',
      whyTag: 'Por qué elegirnos'
    },
    process: {
      badge: 'Entrega, no promesas',
      ctaStart: 'Inicia tu viaje',
      ctaServices: 'Ver servicios',
      proofFallback: 'Entrega documentada',
      evidenceCaption: 'Evidencia vinculada a este paso.'
    },
    assurances: {
      badge: 'Compliance en acción',
      title: 'Logística, etiquetado y gobernanza de exportación',
      desc: 'Documentación, códigos HS y etiquetado validados antes de que la carga salga de planta.',
      footer: 'Vista previa de compliance'
    },
    capabilities: {
      timelineLabel: 'Línea de tiempo ejemplo: onboarding al primer embarque',
      auditLabel: 'Checklist de auditoría y mapa de compliance',
      sending: 'Enviando...',
      sent: '¡Enviado!'
    },
    strengths: {
      tag: 'Nuestras fortalezas',
      title: 'Fortalezas CTB',
      swipeHint: '← Desliza para explorar →'
    },
    bridge: {
      badge: 'Conoce el Efecto Puente',
      heading: 'Más de 20 países',
      subtitle: 'Conectando negocios entre continentes, una alianza exitosa a la vez',
      testimonialsLabel: 'Testimonios',
      testimonialsTitle: 'Aliados que cruzaron con nosotros',
      readStory: 'Leer historia',
      snapshotsLabel: 'Postales desde el campo',
      presenceLabel: 'Presencia en más de 20 países',
      swipeHint: '← Desliza para explorar →'
    },
    showroom: { label: 'Catálogo' },
    providers: {
      tag: 'Para proveedores de materiales de piel y moda',
      title: 'Ingresa al mercado mexicano con un socio local estratégico',
      subtitle: 'Somos un canal local estratégico para proveedores internacionales de materiales que buscan establecer y crecer una presencia de largo plazo en el mercado mexicano.',
      items: [
        {
          title: 'Entrada estratégica al mercado',
          body: 'Diseñamos y gestionamos tu entrada al mercado mexicano con una estrategia comercial clara, asegurando que tus materiales lleguen a los segmentos, marcas y fabricantes correctos desde el primer día.'
        },
        {
          title: 'Comercio internacional e infraestructura lista para el mercado',
          body: 'Brindamos infraestructura de comercio internacional y capacidades logísticas flexibles para importar, almacenar y comercializar tus materiales localmente en México, apoyando necesidades mayoristas y minoristas según cada proyecto.'
        },
        {
          title: 'Protección de marca y reputación',
          body: 'Representamos tu marca localmente con consistencia y cuidado, protegiendo la reputación, los estándares y la percepción de mercado que has construido a lo largo de los años.'
        },
        {
          title: 'Crecimiento comercial enfocado',
          body: 'Te ayudamos a crecer en México con intención y enfoque, priorizando alianzas de calidad y oportunidades escalables sobre transacciones de corto plazo.'
        }
      ],
      cta: 'Explorar entrada al mercado en México'
    },
    contact: {
      tag: 'Ponte en contacto',
      sending: 'Enviando…',
      sent: '¡Enviado!',
      success: '¡Gracias! Recibimos tus datos.',
      error: 'Algo salió mal',
      location: 'León Gto, México',
      phoneUS: 'EUA +1 281 323 2612',
      phoneMX: 'MX +52 477 765 3792',
      email: 'mariana@crossthebridge.com.mx',
      socials: {
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        facebook: 'Facebook'
      }
    },
    differentiators: {
      tag: 'Por qué elegirnos',
      accordionOpen: 'Abrir',
      accordionClose: 'Cerrar',
      readMore: 'Aprender más'
    },
    founder: { badge: 'Liderazgo' }
  }
};

export const DEFAULT_TESTIMONIALS = [
  {
    name: 'Wilson King',
    role: 'Outback Trading Company, USA',
    text: "When you want to grow in a new country, you don't just need a contact - you need someone who truly cares about your success. That's what I found in Mariana and Cross the Bridge.",
    country: 'United States',
    countryCode: 'US',
    image: ''
  },
  {
    name: 'Rogério de Souza Cunha',
    role: 'Trade Intelligence, CICB',
    text: "Cross the Bridge is an excellent company that has consistently served CICB and Brazilian tanneries with professionalism and outstanding deliveries, both in Mexico and abroad. We've had very positive experiences in business relationships, contacts, market knowledge, and experiences through Cross the Bridge's work.",
    country: 'Brazil',
    countryCode: 'BR',
    image: ''
  },
  {
    name: 'Chazlyn Pilarcik',
    role: 'Business Owner, USA',
    text: "I truly cannot put into words how much Mariana means to me and my business. She is one of the most loyal, dedicated, and trustworthy people I've ever had the pleasure of working with. Her insight and expertise in the industry are unmatched, and her work ethic inspires everyone around her. Mariana, thank you for always showing up with such heart, excellence, and integrity - you really are the best at what you do.",
    country: 'United States',
    countryCode: 'US',
    image: ''
  },
  {
    name: 'Patrick Howart',
    role: 'Viberg Boot, Canada',
    text: "I first met Mariana about twenty years ago, the first thing I noticed how radiant she was and very much a peoples person in regards to dealing with there need and inquires on a business level. Working with Mariana is always a wonderful experience, on first personal contact in Leon she makes you feel very at ease. On Dealings with Viberg Boot the most valuable part has been finding us many connections within the footwear industry. Mariana has helped the growth of Viberg in many ways. I would thoroughly recommend Cross the Bridge and Mariana to any possible clients.",
    country: 'Canada',
    countryCode: 'CA',
    image: ''
  },
  {
    name: 'Mehrdad Baghai',
    role: 'JRD Saddlery, USA',
    text: 'I have worked with Mariana for the last 20 plus years. She managed and oversees all my sourcing, production and even shipping. Value we can not do without.',
    country: 'United States',
    countryCode: 'US',
    image: ''
  }
];

export const LOGO_MARQUEE_ITEMS: { icon: IconName; name: string }[] = [
  { icon: 'Hexagon', name: 'LogisticsCorp' },
  { icon: 'Anchor', name: 'PortAllies' },
  { icon: 'Box', name: 'PackSys' },
  { icon: 'Globe', name: 'GlobalTrade' },
  { icon: 'Truck', name: 'FastFreight' },
  { icon: 'Layers', name: 'LeatherCo' },
  { icon: 'MapPin', name: 'ZoneNav' },
  { icon: 'Navigation', name: 'RouteMasters' }
];

const SHOWROOM_ITEMS = [
  // { id: 1, category: 'footwear', title: 'Luxury Leather Boots', image: 'https://plus.unsplash.com/premium_photo-1729285270693-3131f27a56c0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { id: 2, category: 'leather', title: 'Premium Automotive Leather', image: 'https://images.unsplash.com/photo-1573227896778-8f378c4029d4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { id: 3, category: 'hats', title: 'Handcrafted Hats', image: 'https://images.unsplash.com/photo-1568090369444-b0e27698de2c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { id: 4, category: 'industrial', title: 'Safety Footwear Components', image: 'https://images.unsplash.com/photo-1657196343034-481a224e963e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { id: 5, category: 'footwear', title: 'Western Style Collection', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1760&auto=format&fit=crop' },
  // { id: 6, category: 'leather', title: 'Vegetable Tanned Hides', image: 'https://www.leatherbox.com/cdn/shop/files/la-bretagna-arizona-raw-supple-vegetable-tanned-harness-leather-natural-L103RARC1416NATP-1_1080x.jpg?v=1753276451' },
];

export const TRANSLATIONS: Record<Language, Content> = {
  en: {
    nav: {
      services: "What We Do",
      process: "How We Work",
      trade_missions: "Trade Missions",
      about: "Why Cross the Bridge",
      bridge_effect: "The bridge effect",
      contact: "Contact",
      book: "Book a Discovery Call"
    },
    hero: {
      title: "Trusted manufacturing in Mexico. Without guesswork.",
      audience: "For operators, founders, and sourcing teams",
      proofs: [
        "140+ vetted suppliers across Mexico",
        "On-the-ground production governance",
        "Export-ready compliance and QA"
      ],
      subtitle: "Built for international brands looking to scale with the right manufacturing partners in Mexico. We stay on the ground and close to every step, acting as your production partner to ensure your product is made right, on time, and with full visibility from start to finish.",
      cta: "Explore a Strategic Partnership",
      cta2: ""
    },
    proofBar: {
      title: "Proof, not promises",
      subtitle: "Operators care about speed, control, and compliance — here is what we guarantee.",
      metrics: [
        { label: "Factory vetting", value: "140+", detail: "audited suppliers across Mexico" },
        { label: "QC coverage", value: "100%", detail: "of shipments with on-site pre-shipment checks" },
        { label: "Speed to shortlist", value: "10 days", detail: "to present 3-5 vetted factories" }
      ],
      logos: ["Outback Trading Co.", "Viberg Boot", "CICB", "JRD Saddlery"]
    },
    services: {
      title: "Services",
      subtitle: "Sourcing + factory vetting + production operations in Mexico, built for US/EU brands.",
      items: [
        {
          title: "1. Strategic Sourcing & Supplier Matchmaking",
          desc: "3–5 vetted factories with compliance, capacity, and pricing validated.",
          details: [
            "We connect your brand with the right factory — not just any factory. Our sourcing process combines technical criteria, cost optimization, and decades of industry relationships across Mexico's top manufacturers, tanneries, and material suppliers. We evaluate capabilities, quality standards, pricing structures, certifications, production capacity, and cultural fit to make sure you work with reliable partners from day one.",
                    "This service covers production planning, materials and cost control, capacity scheduling, quality inspections, risk management, and full export readiness. You gain visibility and control over every stage, knowing your production is managed locally, to international standards, by a team that understands both sides of the process."
          ],
          bullets: ["Sourcing", "Contract manufacturing", "Logistics"],
          icon: "package"
        },
        {
          title: "2. Manufacturing & Supply Chain Operations",
          desc: "Production governance: schedules, QC, risk management, and landed cost clarity.",
          details: [
            "We become your team on the ground, managing every step of the production process so you can focus on design, sales, and brand growth. From product development and prototyping to full-scale production, we coordinate daily with factories, track timelines, streamline communication, solve issues, and ensure every deliverable is on schedule.",
            "Our approach includes production planning, materials follow-up, cost finalization, workload scheduling, continuous updates, risk management, quality inspections, and complete export preparation. You get transparency, control, and peace of mind, knowing your product is being managed with world-class standards."
                  
          ],
          icon: "layers"
        },
        {
          title: "3. International Growth & Strategic Partnerships",
          desc: "We turn global expansion into a strategic advantage, not a costly experiment.",
          details: [
           
          ],
          icon: "globe"
        }
      ],
      missions: {
        title: "Trade missions & business agendas",
        intro: "We guide companies on trade missions to expand their markets and discover new suppliers and customers in the world's leading economies.",
        points: [
          "Meet your next strategic allies",
          "Gain high-value business contacts",
          "Diversify by engaging with new business cultures"
        ],
        eventsTitle: "Upcoming events",
        events: ["WanYoung Fair", "Portland Fair"],
        cta: "Request a Custom Trade Mission",
        tagline: "We do things with passion"
      }
    },
    showroom: {
      title: "Showroom",
      subtitle: "Explore a selection of products developed and sourced for our international partners.",
      categories: {
        all: "All",
        footwear: "Footwear",
        leather: "Leather",
        hats: "Hats",
        industrial: "Industrial",
        equestrian: "Equestrian goods",
        private_label: "Private label & custom development"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "Your Journey With Us",
      subtitle: "A proven system to execute manufacturing in Mexico, without costly trial and error.",
      intro: "We’ve refined this framework over 20+ years, so you don’t have to learn the hard way.",
      steps: [
        {
          title: "Align",
          tagline: "Strategy before production.",
          desc: "We define goals, pricing targets, timelines, and feasibility upfront, so every decision is aligned before money is spent or factories are engaged."
        },
        {
          title: "Build",
          tagline: "From idea to validated product.",
          desc: "We support product development, material selection, supplier and factory matching, and prototype validation, ensuring your product is technically sound, cost-aligned, and ready for production."
        },
        {
          title: "Execute",
          tagline: "Hands-on production control.",
          desc: "We manage production on the ground, coordinating suppliers, timelines, technical follow-up, and quality standards so your team can stay focused on growth."
        },
        {
          title: "Deliver",
          tagline: "Export-ready and market compliant.",
          desc: "We coordinate logistics, documentation, and export requirements, guiding your shipment from factory floor to final destination with full visibility and control."
        }
      ],
      outro: "With Cross the Bridge, you don’t start from zero. You operate with a system refined by real-world execution."
    },
    team: {
      title: "Our Founder",
      subtitle: "",
      profile: {
        name: "Mariana Muciño Del Rio",
        role: "International Negotiation & Strategic Planning",
        bio: "Mariana Muciño is the founder of Cross the Bridge. She began her career in international business at 23 and has spent two decades living and working across global markets, leading manufacturing and sourcing projects on five continents. This experience allows her to help companies simplify international expansion, providing the clarity, structure, and trusted resources they need to grow with confidence.\n\nRather than acting as a traditional consultant, Mariana builds long-term strategic alliances, working side by side with founders and teams. Through her experience and global network, clients do not start from zero - they move forward with the right partners, clearer decisions, and a stronger foundation for sustainable international growth.",
        educationTitle: "Education",
        education: [
          { degree: "Intl. Cooperation Diploma", school: "Complutense Univ. of Madrid" },
          { degree: "Manager Training Program", school: "Univ. of Mannheim, Germany" },
          { degree: "Intl. Business Degree", school: "Tecnológico de Monterrey" }
        ]
      }
    },
    stats: {
      years: "+25",
      yearsLabel: "Years of Experience",
      // negotiations: "+100",
      // negotiationsLabel: "Successful Negotiations",
      alliances: "+20",
      alliancesLabel: "Strategic Alliances"
    },
    about: {
      badge: "About",
      founderTitle: "Our Founder",
      founderTagline: "Visionary leadership driving global connections.",
      founderStoryBadge: "Founder story",
      founderName: "Mariana Muciño Del Rio",
      founderRole: "International Negotiation & Strategic Planning",
      bio: [
        "Mariana Muciño is the founder of Cross the Bridge. She began her career in international business at 23 and has spent two decades living and working across global markets, leading manufacturing and sourcing projects on five continents. This experience allows her to help companies simplify international expansion, providing the clarity, structure, and trusted resources they need to grow with confidence.",
        "\n\nRather than acting as a traditional consultant, Mariana builds long-term strategic alliances, working side by side with founders and teams. Through her experience and global network, clients do not start from zero - they move forward with the right partners, clearer decisions, and a stronger foundation for sustainable international growth."
      ],
      bioCtaMore: "Read full bio",
      bioCtaLess: "Collapse bio",
      differentiators: {
        badge: "What makes Cross the Bridge truly different",
        title: "Local control that brings certainty and confidence to international production.",
        subtitle: "We don't just connect brands to Mexico. We stay on the ground and close to every step, acting as your strategic production partner so you can trust you'll have the right product, at the right time, in the right place.",
        openLabel: "Open",
        viewLabel: "View",
        items: [
          {
            title: "Strategic partner, not an intermediary",
            body: "We act as a strategic partner with full accountability, providing direct access to vetted factories and key suppliers across the entire value chain, while remaining actively involved in execution.",
            image: "/img/img-mariana/STRATEGIC_PARTNER.jpg",
            imageAlt: "Strategic alignment on the factory floor"
          },
          // {
          //   title: "Local presence that prevents surprises",
          //   body: "Our value lies in being on the ground. By staying close to factories, materials, and daily operations, we anticipate issues early, resolve them in real time, and protect your timelines, costs, and quality standards.",
          //   image: "/img/how-we-work/Leather inspection.jpg",
          //   imageAlt: "On-site materials inspection"
          // },
          {
            title: "Hands-on execution with real accountability",
            body: "We work side by side with founders and teams throughout development, production, and expansion. This hands-on involvement enables faster decisions, prevents costly missteps, and ensures a single, clear point of accountability at every stage.",
            image: "/img/img-mariana/services3.jpeg",
            imageAlt: "Hands-on production oversight"
          },
          {
            title: "Structured execution, not guesswork",
            body: "Every project follows a structured execution model that replaces trial and error with informed decisions, predictable timelines, and repeatable results. We maintain a single point of responsibility across factories, exporters, and regulatory requirements.",
            image: "/img/img-mariana/structured_execution.jpg",
            imageAlt: "Structured production workflow"
          },
          {
            title: "A trusted manufacturing ecosystem, activated for scale",
            body: "Built for long-term growth in Mexico. \n\n We operate within Mexico’s most established manufacturing ecosystem. Our clients benefit from long-standing relationships, proven capabilities, and deep operational knowledge, allowing them to enter, operate, and scale without starting from zero.",
            image: "/img/img-mariana/TRUSTED_ECOSYSTEM_ACTIVATED.jpg",
            imageAlt: "Trusted manufacturing ecosystem"
          }
        ]
      },
      outcomes: {
        badge: "What this means for our clients",
        title: "Clear outcomes with one accountable partner.",
        items: [
          {
            title: "Direct access, not intermediaries",
            body: "Hands-on collaboration with vetted factories and key suppliers across the full value chain."
          },
          {
            title: "End-to-end coordination under one lead",
            body: "Product development, production, quality control, and cross-border logistics managed with clarity and accountability."
          },
          {
            title: "Operational clarity and risk control",
            body: "A single point of responsibility across factories, exporters, and regulatory requirements."
          },
          {
            title: "Built for long-term scale",
            body: "Support from early development to repeatable, scalable production inside Mexico's most established manufacturing hub."
          }
        ]
      },
      leon: {
        badge: "Why León, Guanajuato?",
        heading: "Where global craftsmanship meets industrial scale",
        stats: ["40M pairs exported annually", "5 days logistic door to door form León to Texas"],
        scaleBadge: "Scale signal",
        scaleLabel: "40M pairs exported annually",
        paragraphs: [
          "For generations, León has been the heart of Latin America's leather, footwear, and fashion industry. Expertise here is built across generations, refined through disciplined manufacturing, and scaled for global markets.",
          "Today, Guanajuato exports nearly 40 million pairs of footwear annually, positioning León among the world's leading leather footwear production hubs. Manufacturers in the region are recognized for both scale and technical specialization, including heritage constructions such as Goodyear Welt trusted by international brands.",
          "\"Made in León, Guanajuato\" represents more than origin. It signals a manufacturing ecosystem where craftsmanship, technical execution, and export readiness coexist at scale.",
          "CTB operates within this ecosystem, connecting high-performing family manufacturers with international brands seeking controlled growth and resilient supply chains. León provides the manufacturing advantage. CTB delivers the structure and execution that turn it into measurable performance."
        ],
        advantagesBadge: "León, México Manufacturing advantages",
        advantages: [
          {
            title: "Deep manufacturing roots",
            body: "Generations of family-owned SMEs specialized in leather, footwear, and fashion."
          },
          // {
          //   title: "Proven global export performance",
          //   body: "Approximately 40 million pairs exported annually to more than 30 international markets."
          // },
          {
            title: "Technical specialization",
            body: "Advanced constructions, precision components, and complex assemblies requiring skilled labor and mature processes."
          },
          {
            title: "Strategic logistics advantage",
            body: "Access to major U.S. border crossings and both Pacific and Gulf ports, enabling exports to Texas in 3-5 days."
          },
          {
            title: "Nearshoring that truly works",
            body: "A vertically integrated supply chain concentrated within a single industrial cluster, reducing lead times and operational risk."
          }
        ]
      }
    },
    testimonials: {
      title: "Trust the over 100 businesses that we've helped",
      items: [
        {
          name: "Wilson King",
          role: "Outback Trading Company, USA",
          text: "When you want to grow in a new country, you don't just need a contact - you need someone who truly cares about your success. That's what I found in Mariana and Cross the Bridge.",
          country: "United States",
          countryCode: "US",
          image: "/img/testimonials/Wilsonking_outback.jpg"
        },
        {
          name: "Rogério de Souza Cunha",
          role: "Trade Intelligence, CICB",
          text: "Cross the Bridge is an excellent company that has consistently served CICB and Brazilian tanneries with professionalism and outstanding deliveries, both in Mexico and abroad. We've had very positive experiences in business relationships, contacts, market knowledge, and experiences through Cross the Bridge's work.",
          country: "Brazil",
          countryCode: "BR",
          image: "/img/testimonials/CICB_brazil.jpg"
        },
        {
          name: "Chazlyn Pilarcik",
          role: "Business Owner, USA",
          text: "I truly cannot put into words how much Mariana means to me and my business. She is one of the most loyal, dedicated, and trustworthy people I've ever had the pleasure of working with. Her insight and expertise in the industry are unmatched, and her work ethic inspires everyone around her. Mariana, thank you for always showing up with such heart, excellence, and integrity - you really are the best at what you do.",
          country: "United States",
          countryCode: "US",
          image: "/img/testimonials/testimonioCHAZ.jpg"
        },
        {
          name: "Patrick Howart",
          role: "Viberg Boot, Canada",
          text: "I first met Mariana about twenty years ago, the first thing I noticed how radiant she was and very much a peoples person in regards to dealing with there need and inquires on a business level. Working with Mariana is always a wonderful experience, on first personal contact in Leon she makes you feel very at ease. On Dealings with Viberg Boot the most valuable part has been finding us many connections within the footwear industry. Mariana has helped the growth of Viberg in many ways. I would thoroughly recommend Cross the Bridge and Mariana to any possible clients.",
          country: "Canada",
          countryCode: "CA",
          image: "/img/testimonials/BaP_viberg.jpg"
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, USA",
          text: "I have worked with Mariana for the last 20 plus years. She managed and oversees all my sourcing, production and even shipping. Value we can not do without.",
          country: "United States",
          countryCode: "US",
          image: "/img/testimonials/Mehrdad_jrd_california.jpg"
        }
      ]
    },
    differentiators: {
      title: "Why operations teams choose us",
      items: [
        {
          title: "Response SLAs & governance",
          desc: "Weekly production reports, single point of contact, and bilingual ops so you always know what is happening."
        },
        {
          title: "Quality controls you can audit",
          desc: "On-site QC, pre-shipment inspections, and photographic evidence attached to every milestone."
        },
        {
          title: "Compliance-first execution",
          desc: "Import/export paperwork, labeling, materials compliance, and NDAs handled without surprises."
        },
        {
          title: "Capacity and cost clarity",
          desc: "Capacity mapping, MOQ negotiation, and landed-cost visibility before you greenlight production."
        },
        {
          title: "Contingency ready",
          desc: "Backup suppliers on deck and risk mitigation plans to avoid line stops."
        },
        {
          title: "Trusted network",
          desc: "Certified factories, audited partners, and the right introductions when you need them."
        }
      ]
    },
    assurances: {
      title: "Addressing the hard questions upfront",
      subtitle: "Built for foreign procurement and operations leaders who need proof of control.",
      items: [
        { title: "QC & audits", desc: "On-site inspections at first article, mid-line, and pre-shipment with photo reports.", proof: "QC checkpoints built into every PO.", icon: "Shield" },
        { title: "IP & NDAs", desc: "Two-way NDAs, vetted partners, and controlled sample handling to protect designs.", proof: "Signed NDAs before factory walk-throughs.", icon: "FileText" },
        { title: "Compliance", desc: "Labeling, HS codes, material traceability, and export documents handled for you.", proof: "Shipping packs reviewed against destination rules.", icon: "Compass" },
        { title: "Capacity & MOQ", desc: "Capacity plans, negotiated MOQs, and dual sourcing when required.", proof: "Documented run rates before launch.", icon: "Package" },
        { title: "Lead times", desc: "Realistic calendars, buffer for critical materials, and proactive updates.", proof: "Weekly timeline variance tracking.", icon: "Navigation" },
        { title: "Fallback plans", desc: "Backup suppliers and remediation playbooks if a factory slips.", proof: "Secondary options sourced in parallel.", icon: "RotateCcw" }
      ]
    },
    capabilities: {
      title: "Capabilities deck built to convert stakeholders",
      subtitle: "A concise download with the exact information procurement, ops, and finance teams ask for.",
      bullets: [
        "Industries served: footwear, leather goods, accessories, and adjacent soft goods.",
        "Sample timeline from onboarding to first shipment with QA checkpoints.",
        "Supplier audit methodology, compliance checklist, and export documentation map."
      ],
      previewLabel: "Inside the deck",
      previewSlides: [
        { title: "Network map", desc: "Factories, tanneries, and logistics partners across Mexico." },
        { title: "Audit checklist", desc: "Standards for capability, compliance, and risk scoring." },
        { title: "Landed-cost view", desc: "Visibility into duties, freight, packaging, and buffer assumptions." }
      ],
      form: {
        title: "Get the deck",
        subtitle: "We will email you a tailored version based on your category.",
        name: "Full name",
        company: "Company",
        role: "Role",
        email: "Work email",
        cta: "Send me the deck",
        disclaimer: "No spam — just one email with the PDF and an optional follow-up."
      }
    },
    contact: {
      title: "Contact Us",
      form: {
        name: "Name",
        email: "Email",
        company: "Company Name",
        website: "Company Website",
        serviceInterest: "Service of Interest",
        servicePlaceholder: "Choose a service",
        message: "Description (optional)",
        messageHint: "Tell us what you need, timing, and any requirements.",
        submit: "Send"
      },
      info: {
        call: "Phone number (optional)",
        location: "Location",
        email: "Email"
      }
    },
    footer: {
      rights: "© 2026 Cross The Bridge. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    bridgeEffect: {
      badge: "The bridge effect",
      title: "Cross the bridge without fear.",
      body: "For over two decades, we’ve worked where global business truly happens. On factory floors, at international trade fairs, inside distribution centers, and across cultures, regulations, and markets.\n\nThe Bridge Effect is not a theory. It is the result of sustained international execution. It’s what emerges when brands don’t simply source abroad, but successfully enter, scale, and endure in global markets. From Asia to Europe, Africa, and the Americas, we turn ideas into export-ready operations, supported by real infrastructure, trusted alliances, and on-the-ground leadership.\n\nThis section highlights the product categories where that experience lives today — and where the next generation of global success stories is already being built.",
      industriesTitle: "Industries we work with",
      industriesIntro: "Pick a category to see the focus areas and a gallery of recent partner builds.",
      selectedLabel: "Selected category",
      categoriesSuffix: "categories",
      testimonialsBadge: "Trusted by over 100 businesses worldwide",
      // testimonialsTitle: "Discover why some of our clients have been working with us for over 20 years",
      testimonialsTitle: "Brands we proudly represent",
      testimonialsSubtitle: "Founders, operators, and industry leaders who rely on our on-the-ground partnership.",
      testimonialsCta: "View more",
      storyLabel: "Story"
    },
    tradeMissions: {
      badge: "Trade missions & business agendas",
      title: "Trade missions & business agendas",
      cta: "Request a Custom Trade Mission",
      tagline: "International growth, built on experience.",
      selectLabel: "Select a briefing",
      panels: [
        {
          id: "briefing",
          label: "Mission Briefing",
          title: "Trade missions built before, during, and after the event. ",
          body: [
            "Our trade missions start long before boarding a plane. We prepare strategy, align objectives, and design meetings with clear intent. During the mission, we work side by side with teams, reading the market, navigating cultural dynamics, and supporting real-time decisions. After the event, we translate conversations into concrete next steps."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Business travel"
          }
        },
        {
          id: "agenda",
          label: "Business Agenda",
          title: "The right people, the right context, the right moment.",
          body: [
            "We design focused business agendas that connect companies with the right suppliers, manufacturers, and commercial partners — within the right cultural and market context. Supported by a multidisciplinary team with deep international experience, each mission multiplies reach, sharpens judgment, and turns exposure into qualified opportunity."          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Agenda setting with charts"
          }
        },
        {
          id: "benefits",
          label: "Benefits",
          title: "Clarity, speed, and commercial advantage.",
          list: [
            "Direct access to vetted manufacturers and decision-makers",
            "Strategic meetings aligned with your business goals",
            "Cultural and commercial context that reduces risk",
            "Faster learning curves and better international judgment"
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Team collaborating over plans"
          }
        },
        {
          id: "audience",
          label: "Who it's for",
          title: "Built for founders who scale with intention.",
          body: [
            "Designed for founders and business leaders who want to expand internationally without improvisation. This is for teams that value clarity, cultural understanding, and structured execution from day one — not trial and error on foreign ground."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "CEO shaking hands"
          }
        }
      ]
    },
    legal: {
      back: "Back to Home",
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: February 14, 2026",
        content: [
          {
            heading: "1. Introduction",
            body: "Cross The Bridge ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services."
          },
          {
            heading: "2. Information We Collect",
            body: "We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This may include name, email address, phone number, and company details."
          },
          {
            heading: "3. Use of Your Information",
            body: "We use the information we collect or receive to communicate with you, facilitate account creation and logon processes, send you administrative information, manage your orders, and for other business purposes such as data analysis and identifying usage trends."
          },
          {
            heading: "4. Disclosure of Your Information",
            body: "We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights, to Third-Party Service Providers for business operations, and with your consent."
          },
          {
            heading: "5. Data Security",
            body: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable."
          }
        ]
      },
      terms: {
        title: "Terms of Service",
        lastUpdated: "Last Updated: February 14, 2026",
        content: [
          {
            heading: "1. Agreement to Terms",
            body: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you') and Cross The Bridge ('we', 'us', or 'our'), concerning your access to and use of our website and services."
          },
          {
            heading: "2. Intellectual Property Rights",
            body: "Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the 'Content') and the trademarks, service marks, and logos contained therein (the 'Marks') are owned or controlled by us or licensed to us."
          },
          {
            heading: "3. User Representations",
            body: "By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service."
          },
          {
            heading: "4. Limitations of Liability",
            body: "In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site."
          },
          {
            heading: "5. Governing Law",
            body: "These Terms shall be governed by and defined following the laws of Mexico. Cross The Bridge and yourself irrevocably consent that the courts of Mexico shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms."
          }
        ]
      }
    }
  },
  es: {
    nav: {
      services: "Lo que hacemos",
      process: "Cómo trabajamos",
      trade_missions: "Misiones comerciales",
      about: "Por qué Cross the Bridge",
      bridge_effect: "El efecto puente",
      contact: "Contacto",
      book: "Contáctanos"
    },
    hero: {
      title: "Manufactura confiable en México. Sin suposiciones.",
      audience: "Para operadores, fundadores y equipos de sourcing",
      proofs: [
        "Más de 140 proveedores validados en México",
        "Gobernanza de producción en campo",
        "Cumplimiento y QA listos para exportar"
      ],
      subtitle: "Creado para marcas internacionales que buscan escalar con los socios manufactureros correctos en México. Nos mantenemos en el terreno y cerca de cada etapa, actuando como tu socio de producción para asegurar que tu producto se haga bien, a tiempo y con visibilidad total de principio a fin.",
      cta: "Explora una alianza estratégica",
      cta2: ""
    },
    proofBar: {
      title: "Pruebas, no promesas",
      subtitle: "A los equipos de operaciones les importa la velocidad, el control y el cumplimiento — esto es lo que garantizamos.",
      metrics: [
        { label: "Validación de fábricas", value: "140+", detail: "proveedores auditados en México" },
        { label: "Cobertura de QC", value: "100%", detail: "de embarques con inspección en planta" },
        { label: "Velocidad de shortlist", value: "10 días", detail: "para presentar 3–5 fábricas validadas" }
      ],
      logos: ["Outback Trading Co.", "Viberg Boot", "CICB", "JRD Saddlery"]
    },
    services: {
      title: "Servicios",
      subtitle: "Sourcing + validación de fábricas + operaciones de producción en México, diseñado para marcas de EE. UU./UE.",
      items: [
        {
          title: "1. Sourcing estratégico y matchmaking de proveedores",
          desc: "3–5 fábricas validadas con compliance, capacidad y precios confirmados.",
          details: [
            "Conectamos tu marca con la fábrica correcta — no cualquier fábrica. Nuestro proceso de sourcing combina criterios técnicos, optimización de costos y décadas de relaciones con los principales fabricantes, tenerías y proveedores de materiales de México. Evaluamos capacidades, estándares de calidad, estructuras de precio, certificaciones, capacidad de producción y ajuste cultural para asegurar socios confiables desde el día uno.",
            "Este servicio cubre la planeación de producción, control de materiales y costos, calendarización de capacidad, inspecciones de calidad, gestión de riesgos y preparación completa para exportar. Obtienes visibilidad y control en cada etapa, con producción gestionada localmente, bajo estándares internacionales, por un equipo que entiende ambos lados del proceso."
          ],
          bullets: ["Sourcing", "Manufactura por contrato", "Logística"],
          icon: "package"
        },
        {
          title: "2. Operaciones de manufactura y cadena de suministro",
          desc: "Gobernanza de producción: calendarios, QC, gestión de riesgos y claridad de costo puesto en destino.",
          details: [
            "Nos convertimos en tu equipo en tierra y gestionamos cada paso del proceso de producción para que te enfoques en diseño, ventas y crecimiento de marca. Desde el desarrollo y prototipado hasta la producción a escala, coordinamos a diario con fábricas, damos seguimiento a tiempos, agilizamos la comunicación, resolvemos problemas y aseguramos que cada entrega esté a tiempo.",
            "Nuestro enfoque incluye planeación de producción, seguimiento de materiales, cierre de costos, calendarización de carga, actualizaciones continuas, gestión de riesgos, inspecciones de calidad y preparación completa para exportación. Obtienes transparencia, control y tranquilidad, con tu producción gestionada bajo estándares de clase mundial."
          ],
          icon: "layers"
        },
        {
          title: "3. Crecimiento internacional y alianzas estratégicas",
          desc: "Convertimos la expansión global en una ventaja estratégica, no en un experimento costoso.",
          details: [],
          icon: "globe"
        }
      ],
      missions: {
        title: "Misiones comerciales y agendas de negocios",
        intro: "Guiamos empresas en misiones comerciales para expandir mercados y descubrir nuevos proveedores y clientes en las principales economías del mundo.",
        points: [
          "Conoce a tus próximos aliados estratégicos",
          "Obtén contactos de negocio de alto valor",
          "Diversifica al relacionarte con nuevas culturas empresariales"
        ],
        eventsTitle: "Próximos eventos",
        events: ["Feria WanYoung", "Feria Portland"],
        cta: "Solicita una misión comercial a medida",
        tagline: "Hacemos las cosas con pasión"
      }
    },
    showroom: {
      title: "Showroom",
      subtitle: "Explora una selección de productos desarrollados y abastecidos para nuestros socios internacionales.",
      categories: {
        all: "Todo",
        footwear: "Calzado",
        leather: "Piel",
        hats: "Sombreros",
        industrial: "Industrial",
        equestrian: "Bienes ecuestres",
        private_label: "Marca privada y desarrollo a medida"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "Tu camino con nosotros",
      subtitle: "Un sistema probado para ejecutar manufactura en México — sin costosos intentos y errores.",
      intro: "Hemos refinado este marco por más de 20 años, para que no tengas que aprender a la mala.",
      steps: [
        {
          title: "Alinear",
          tagline: "Estrategia antes de producir.",
          desc: "Definimos objetivos, metas de precio, tiempos y viabilidad desde el inicio para que cada decisión esté alineada antes de invertir o involucrar fábricas."
        },
        {
          title: "Construir",
          tagline: "De la idea al producto validado.",
          desc: "Acompañamos el desarrollo de producto, la selección de materiales, el matchmaking de proveedores y fábricas, y la validación de prototipos, asegurando que tu producto sea sólido, alineado en costo y listo para producir."
        },
        {
          title: "Ejecutar",
          tagline: "Control operativo en campo.",
          desc: "Gestionamos la producción en sitio, coordinando proveedores, tiempos, seguimiento técnico y estándares de calidad para que tu equipo se enfoque en crecer."
        },
        {
          title: "Entregar",
          tagline: "Listo para exportar y cumplir mercados.",
          desc: "Coordinamos logística, documentación y requisitos de exportación, guiando tu embarque desde planta hasta destino final con total visibilidad y control."
        }
      ],
      outro: "Con Cross the Bridge no empiezas desde cero. Operas con un sistema refinado por ejecución real."
    },
    team: {
      title: "Nuestra Fundadora",
      subtitle: "",
      profile: {
        name: "Mariana Muciño Del Rio",
        role: "Negociación internacional y planeación estratégica",
        bio: "Consultora de negocios internacionales con 18 años de experiencia ayudando a empresas latinoamericanas a expandirse en el mercado de EE. UU.\n\nMi trabajo se centra en crecimiento estratégico, entrada a mercados y alineación regulatoria para fabricantes que ingresan a entornos complejos y multiculturales.\n\nHe apoyado organizaciones en América Latina, Europa, Asia y Norteamérica — guiándolas en cumplimiento, optimización de cadena de suministro e integración operativa.\n\nMi enfoque se basa en confianza, respeto y colaboración con propósito — elementos clave para construir alianzas transfronterizas que prosperan.",
        educationTitle: "Formación",
        education: [
          { degree: "Diplomado en cooperación internacional", school: "Universidad Complutense de Madrid" },
          { degree: "Programa de formación gerencial", school: "Universidad de Mannheim, Alemania" },
          { degree: "Licenciatura en negocios internacionales", school: "Tecnológico de Monterrey" }
        ]
      }
    },
    stats: {
      years: "+25",
      yearsLabel: "Años de experiencia",
      // negotiations: "+100",
      // negotiationsLabel: "Negociaciones Exitosas",
      alliances: "+20",
      alliancesLabel: "Alianzas estratégicas"
    },
    about: {
      badge: "About",
      founderTitle: "Nuestra fundadora",
      founderTagline: "Liderazgo visionario que impulsa conexiones globales.",
      founderStoryBadge: "Historia de la fundadora",
      founderName: "Mariana Muciño Del Rio",
      founderRole: "Negociación internacional y planeación estratégica",
      bio: [
        "Mariana Muciño es la fundadora de Cross the Bridge. Inició su carrera en negocios internacionales a los 23 años y ha pasado dos décadas viviendo y trabajando en mercados globales, liderando proyectos de manufactura y sourcing en cinco continentes. Esta experiencia le permite ayudar a las empresas a simplificar su expansión internacional, brindándoles claridad, estructura y recursos confiables para crecer con seguridad.",
        "En lugar de actuar como consultora tradicional, Mariana construye alianzas estratégicas de largo plazo, trabajando hombro a hombro con fundadores y equipos. Gracias a su experiencia y red global, los clientes no comienzan desde cero: avanzan con los socios correctos, decisiones más claras y una base más sólida para un crecimiento internacional sostenible."
      ],
      bioCtaMore: "Leer biografía completa",
      bioCtaLess: "Cerrar biografía",
      differentiators: {
        badge: "Lo que hace a Cross the Bridge realmente diferente",
        title: "Control local que elimina las suposiciones en la producción internacional.",
        subtitle: "No solo conectamos marcas con México. Nos mantenemos en el terreno y cerca de cada etapa, actuando como tu socio estratégico de producción para que tengas el producto correcto, en el momento correcto y en el lugar correcto.",
        openLabel: "Abrir",
        viewLabel: "Ver",
        items: [
          {
            title: "Socio estratégico, no intermediario",
            body: "No operamos como intermediario ni como agente de sourcing. Actuamos como socio estratégico, alineando decisiones entre desarrollo, producción y entrega para que tu expansión sea intencional, controlada y sostenible.",
            image: "/img/img-mariana/STRATEGIC_PARTNER.jpg",
            imageAlt: "Alineación estratégica en planta"
          },
          {
            title: "Ejecución práctica con responsabilidad real",
            body: "Trabajamos hombro a hombro con fundadores y equipos durante desarrollo, producción y expansión. Esta participación práctica permite decisiones más rápidas, evita errores costosos y da un punto claro de responsabilidad en cada etapa.",
            image: "/img/services/OnSite2.jpg",
            imageAlt: "Supervisión de producción en sitio"
          },
          {
            title: "Procesos estructurados, no suposiciones",
            body: "Cada proyecto sigue una estructura clara — desde la selección de proveedores hasta la supervisión de producción y la coordinación de exportación. Esa estructura reemplaza el ensayo y error con decisiones informadas y resultados repetibles.",
            image: "/img/how-we-work/Proceso3.jpg",
            imageAlt: "Flujo de producción estructurado"
          },
          {
            title: "Un ecosistema confiable activado para ti",
            body: "Operamos dentro del ecosistema manufacturero más consolidado de México. Nuestros clientes se benefician de relaciones, capacidades y conocimiento operativo construidos durante años — lo que les permite entrar y escalar sin partir de cero.",
            image: "/img/img-mariana/TRUSTED_ECOSYSTEM_ACTIVATED.jpg",
            imageAlt: "Ecosistema manufacturero confiable"
          }
        ]
      },
      outcomes: {
        badge: "Qué significa para nuestros clientes",
        title: "Resultados claros con un solo responsable.",
        items: [
          {
            title: "Acceso directo, sin intermediarios",
            body: "Colaboración práctica con fábricas validadas y proveedores clave en toda la cadena de valor."
          },
          {
            title: "Coordinación de punta a punta bajo un solo líder",
            body: "Desarrollo de producto, producción, control de calidad y logística transfronteriza gestionados con claridad y responsabilidad."
          },
          {
            title: "Claridad operativa y control de riesgo",
            body: "Un solo responsable frente a fábricas, exportadores y requisitos regulatorios."
          },
          {
            title: "Listo para escalar a largo plazo",
            body: "Soporte desde el desarrollo temprano hasta producción repetible y escalable en el hub manufacturero más consolidado de México."
          }
        ]
      },
      leon: {
        badge: "¿Por qué León, Guanajuato?",
        heading: "Donde la artesanía global se une con la escala industrial",
        stats: ["40M de pares exportados al año", "5 días de logística puerta a puerta de León a Texas"],
        scaleBadge: "Señal de escala",
        scaleLabel: "40M de pares exportados al año",
        paragraphs: [
          "Por generaciones, León ha sido el corazón de la industria de piel, calzado y moda de América Latina. Aquí la experiencia se construye entre generaciones, se refina con manufactura disciplinada y se escala para mercados globales.",
          "Hoy Guanajuato exporta casi 40 millones de pares de calzado al año, posicionando a León entre los principales polos de producción de calzado de piel del mundo. Los fabricantes de la región se distinguen por escala y especialización técnica, incluyendo construcciones de herencia como Goodyear Welt confiadas por marcas internacionales.",
          "\"Hecho en León, Guanajuato\" es más que origen. Señala un ecosistema manufacturero donde la artesanía, la ejecución técnica y la preparación para exportar conviven a escala.",
          "CTB opera dentro de este ecosistema, conectando fabricantes familiares de alto desempeño con marcas internacionales que buscan crecimiento controlado y cadenas de suministro resilientes. León ofrece la ventaja manufacturera. CTB aporta la estructura y ejecución que la convierten en desempeño medible."
        ],
        advantagesBadge: "Ventajas de manufactura",
        advantages: [
          {
            title: "Raíces profundas en manufactura",
            body: "Generaciones de PYMES familiares especializadas en piel, calzado y moda."
          },
          {
            title: "Desempeño exportador probado",
            body: "Aproximadamente 40 millones de pares exportados cada año a más de 30 mercados internacionales."
          },
          {
            title: "Especialización técnica",
            body: "Construcciones avanzadas, componentes de precisión y ensambles complejos que requieren mano de obra experta y procesos maduros."
          },
          {
            title: "Ventaja logística estratégica",
            body: "Acceso a los principales cruces fronterizos con EE. UU. y a puertos del Pacífico y Golfo, permitiendo exportar a Texas en 3-5 días."
          },
          {
            title: "Nearshoring que realmente funciona",
            body: "Cadena de suministro integrada verticalmente en un solo clúster industrial, reduciendo tiempos y riesgo operativo."
          }
        ]
      }
    },
    testimonials: {
      title: "Confíe en las más de 100 empresas que hemos ayudado",
      items: [
        {
          name: "Wilson King",
          role: "Outback Trading Company, USA",
          text: "Cuando quieres crecer en un nuevo país, no solo necesitas un contacto, necesitas a alguien que realmente se preocupe por tu éxito. Eso es lo que encontré en Mariana y Cross the Bridge.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "/img/testimonials/Wilsonking_outback.jpg"
        },
        {
          name: "Rogério de Souza Cunha",
          role: "Inteligencia comercial, CICB",
          text: "Cross the Bridge es una excelente empresa que ha servido constantemente a CICB y a las tenerías brasileñas con profesionalismo y entregas sobresalientes, tanto en México como en el extranjero. Hemos tenido experiencias muy positivas en relaciones de negocios, contactos, conocimiento de mercado y experiencias gracias al trabajo de Cross the Bridge.",
          country: "Brasil",
          countryCode: "BR",
          image: "/img/testimonials/CICB_brazil.jpg"
        },
        {
          name: "Chazlyn Pilarcik",
          role: "Propietario de negocio, USA",
          text: "De verdad no puedo expresar con palabras cuánto significa Mariana para mí y mi negocio. Es una de las personas más leales, dedicadas y confiables con las que he tenido el placer de trabajar. Su visión y experiencia en la industria no tienen comparación, y su ética de trabajo inspira a todos a su alrededor. Mariana, gracias por estar siempre con tanto corazón, excelencia e integridad — de verdad eres la mejor en lo que haces.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "/img/testimonials/testimonioCHAZ.jpg"
        },
        {
          name: "Patrick Viberg",
          role: "Viberg Boot, Canadá",
          text: "Conocí a Mariana hace unos veinte años; lo primero que noté fue lo radiante que era y lo cercana que era con las personas en cuanto a atender sus necesidades y consultas a nivel empresarial. Trabajar con Mariana es siempre una experiencia maravillosa; en el primer contacto personal en León te hace sentir muy cómodo. En los tratos con Viberg Boot, lo más valioso ha sido encontrarnos muchas conexiones dentro de la industria del calzado. Mariana ha ayudado al crecimiento de Viberg de muchas maneras. Recomendaría ampliamente a Cross the Bridge y a Mariana a cualquier posible cliente.",
          country: "Canadá",
          countryCode: "CA",
          image: "/img/testimonials/BaP_viberg.jpg"
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, USA",
          text: "He trabajado con Mariana durante más de 20 años. Ella gestiona y supervisa todo mi abastecimiento, producción e incluso los envíos. Un valor del que no podemos prescindir.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "/img/testimonials/Mehrdad_jrd_california.jpg"
        }
      ]
    },
    differentiators: {
      title: "Por qué los equipos de operaciones nos eligen",
      items: [
        {
          title: "SLAs y gobernanza",
          desc: "Reportes semanales de producción, un solo punto de contacto y operaciones bilingües para que siempre sepas qué está pasando."
        },
        {
          title: "Controles de calidad auditables",
          desc: "QC en planta, inspecciones pre-embarque y evidencia fotográfica en cada hito."
        },
        {
          title: "Ejecución con compliance primero",
          desc: "Documentos de importación/exportación, etiquetado, cumplimiento de materiales y NDAs sin sorpresas."
        },
        {
          title: "Capacidad y costos claros",
          desc: "Mapeo de capacidad, negociación de MOQ y visibilidad de costo puesto en destino antes de autorizar producción."
        },
        {
          title: "Listos para contingencias",
          desc: "Proveedores de respaldo y planes de mitigación para evitar paros de línea."
        },
        {
          title: "Red confiable",
          desc: "Fábricas certificadas, socios auditados y las introducciones correctas cuando las necesitas."
        }
      ]
    },
    assurances: {
      title: "Respondemos las preguntas difíciles desde el inicio",
      subtitle: "Diseñado para líderes de compras y operaciones en el extranjero que necesitan pruebas de control.",
      items: [
        { title: "QC y auditorías", desc: "Inspecciones en primera pieza, en línea y pre-embarque con reportes fotográficos.", proof: "Puntos de control de calidad en cada PO.", icon: "Shield" },
        { title: "IP y NDAs", desc: "NDAs bilaterales, socios filtrados y manejo controlado de muestras para proteger diseños.", proof: "NDAs firmados antes de recorrer fábricas.", icon: "FileText" },
        { title: "Compliance", desc: "Etiquetado, códigos HS, trazabilidad de materiales y documentos de exportación listos.", proof: "Packs de embarque revisados contra normas de destino.", icon: "Compass" },
        { title: "Capacidad y MOQ", desc: "Planes de capacidad, MOQs negociados y dual sourcing cuando es necesario.", proof: "Tiempos y capacidades documentados antes de lanzar.", icon: "Package" },
        { title: "Lead times", desc: "Calendarios realistas, buffers en materiales críticos y actualizaciones proactivas.", proof: "Seguimiento semanal de variaciones de tiempo.", icon: "Navigation" },
        { title: "Planes de respaldo", desc: "Proveedores alternos y playbooks de remediación si una fábrica se retrasa.", proof: "Opciones secundarias abastecidas en paralelo.", icon: "RotateCcw" }
      ]
    },
    capabilities: {
      title: "Deck de capacidades diseñado para convencer a los stakeholders",
      subtitle: "Una descarga concisa con la información exacta que piden compras, operaciones y finanzas.",
      bullets: [
        "Industrias atendidas: calzado, artículos de piel, accesorios y soft goods afines.",
        "Línea de tiempo ejemplo desde onboarding hasta el primer embarque con checkpoints de QA.",
        "Metodología de auditoría de proveedores, checklist de compliance y mapa de documentación de exportación."
      ],
      previewLabel: "Dentro del deck",
      previewSlides: [
        { title: "Mapa de red", desc: "Fábricas, tenerías y socios logísticos en todo México." },
        { title: "Checklist de auditoría", desc: "Estándares de capacidad, compliance y calificación de riesgo." },
        { title: "Vista de costo puesto en destino", desc: "Visibilidad de aranceles, flete, empaque y supuestos de buffer." }
      ],
      form: {
        title: "Recibe el deck",
        subtitle: "Te enviaremos una versión ajustada a tu categoría.",
        name: "Nombre completo",
        company: "Empresa",
        role: "Rol",
        email: "Correo de trabajo",
        cta: "Envíame el deck",
        disclaimer: "Sin spam — solo un correo con el PDF y un posible seguimiento."
      }
    },
    contact: {
      title: "Contáctanos",
      form: {
        name: "Nombre",
        email: "Correo",
        company: "Nombre de la empresa",
        website: "Página web de la empresa",
        serviceInterest: "Servicio de interés",
        servicePlaceholder: "Elige un servicio",
        message: "Descripción (opcional)",
        messageHint: "Cuéntanos qué necesitas, tiempos y requisitos.",
        submit: "Enviar"
      },
      info: {
        call: "Número de teléfono (opcional)",
        location: "Ubicación",
        email: "Correo"
      }
    },
    footer: {
      rights: "© 2026 Cross The Bridge. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    },
    bridgeEffect: {
      badge: "El efecto puente",
      title: "Cruza el puente sin miedo.",
      body: "Durante más de dos décadas hemos trabajado donde realmente ocurre el negocio global: en plantas, ferias internacionales, centros de distribución y entre culturas, regulaciones y mercados.\n\nEl Efecto Puente no es una teoría. Es el resultado de una ejecución internacional sostenida. Es lo que sucede cuando las marcas no solo compran en el extranjero, sino que entran, escalan y perduran en mercados globales.\n\nDe Asia a Europa, África y las Américas, convertimos ideas en operaciones listas para exportar, respaldadas por infraestructura real, alianzas confiables y liderazgo en terreno.\n\nEsta sección destaca las categorías de producto donde esa experiencia vive hoy — y donde ya se está construyendo la siguiente generación de historias de éxito global.",
      industriesTitle: "Industrias con las que trabajamos",
      industriesIntro: "Elige una categoría para ver los enfoques y una galería de proyectos recientes.",
      selectedLabel: "Categoría seleccionada",
      categoriesSuffix: "categorías",
      testimonialsBadge: "Confiado por más de 100 empresas en todo el mundo",
      testimonialsTitle: "Confiado por",
      testimonialsSubtitle: "Fundadores, operadores y líderes que confían en nuestra presencia en terreno.",
      testimonialsCta: "Ver más",
      storyLabel: "Historia"
    },
    tradeMissions: {
      badge: "Misiones comerciales y agendas de negocio",
      title: "Misiones comerciales y agendas de negocio",
      cta: "Solicita una misión comercial a medida",
      tagline: "Crecimiento internacional, construido sobre experiencia.",
      selectLabel: "Selecciona un briefing",
      panels: [
        {
          id: "briefing",
          label: "Briefing de misión",
          title: "Misiones comerciales construidas antes, durante y después del evento.",
          body: [
            "Nuestras misiones comerciales empiezan mucho antes de subir al avión. Preparamos la estrategia, alineamos objetivos y diseñamos reuniones con intención clara. Durante la misión trabajamos hombro a hombro con los equipos, leemos el mercado, navegamos dinámicas culturales y apoyamos decisiones en tiempo real. Después del evento, traducimos las conversaciones en siguientes pasos concretos."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Viaje de negocios"
          }
        },
        {
          id: "agenda",
          label: "Agenda de negocios",
          title: "Las personas correctas, el contexto correcto, el momento correcto.",
          body: [
            "Diseñamos agendas de negocios enfocadas que conectan a las empresas con los proveedores, fabricantes y socios comerciales correctos — dentro del contexto cultural y de mercado adecuado. Con el respaldo de un equipo multidisciplinario con profunda experiencia internacional, cada misión amplía el alcance, afina el criterio y convierte la exposición en oportunidad calificada."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Definiendo agenda con gráficos"
          }
        },
        {
          id: "benefits",
          label: "Beneficios",
          title: "Claridad, velocidad y ventaja comercial.",
          list: [
            "Acceso directo a fabricantes y decisores validados",
            "Reuniones estratégicas alineadas a tus objetivos",
            "Contexto cultural y comercial que reduce riesgo",
            "Curva de aprendizaje más rápida y mejor criterio internacional"
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Equipo colaborando sobre planes"
          }
        },
        {
          id: "audience",
          label: "Para quién es",
          title: "Diseñado para fundadores que escalan con intención.",
          body: [
            "Pensado para fundadores y líderes de negocio que quieren expandirse internacionalmente sin improvisación. Es para equipos que valoran claridad, entendimiento cultural y ejecución estructurada desde el día uno — no ensayo y error en terreno extranjero."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "CEO estrechando manos"
          }
        }
      ]
    },
    legal: {
      back: "Volver al Inicio",
      privacy: {
        title: "Política de Privacidad",
        lastUpdated: "Última Actualización: 14 de febrero, 2026",
        content: [
          {
            heading: "1. Introducción",
            body: "Cross The Bridge ('nosotros', 'nuestro') se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios."
          },
          {
            heading: "2. Información que recopilamos",
            body: "Podemos recopilar información personal que usted nos proporciona voluntariamente cuando expresa interés en obtener información sobre nosotros o nuestros productos y servicios, cuando participa en actividades en el sitio web o cuando se comunica con nosotros. Esto puede incluir nombre, dirección de correo electrónico, número de teléfono y detalles de la empresa."
          },
          {
            heading: "3. Uso de su información",
            body: "Utilizamos la información que recopilamos o recibimos para comunicarnos con usted, facilitar la creación de cuentas y procesos de inicio de sesión, enviarle información administrativa, gestionar sus pedidos y para otros fines comerciales, como el análisis de datos y la identificación de tendencias de uso."
          },
          {
            heading: "4. Divulgación de su información",
            body: "Podemos compartir la información que hemos recopilado sobre usted en ciertas situaciones. Su información puede ser divulgada de la siguiente manera: Por ley o para proteger derechos, a proveedores de servicios externos para operaciones comerciales y con su consentimiento."
          },
          {
            heading: "5. Seguridad de los datos",
            body: "Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para proteger la información personal que nos proporciona, tenga en cuenta que, a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable."
          }
        ]
      },
      terms: {
        title: "Términos de Servicio",
        lastUpdated: "Última Actualización: 14 de febrero, 2026",
        content: [
          {
            heading: "1. Acuerdo de Términos",
            body: "Estos Términos de Servicio constituyen un acuerdo legalmente vinculante entre usted, ya sea personalmente o en nombre de una entidad ('usted') y Cross The Bridge ('nosotros', 'nuestro'), con respecto a su acceso y uso de nuestro sitio web y servicios."
          },
          {
            heading: "2. Derechos de Propiedad Intelectual",
            body: "A menos que se indique lo contrario, el Sitio y los Servicios son nuestra propiedad exclusiva y todo el código fuente, bases de datos, funcionalidad, software, diseños de sitios web, audio, video, texto, fotografías y gráficos en el Sitio (colectivamente, el 'Contenido') y las marcas comerciales, marcas de servicio y logotipos contenidos en el mismo (las 'Marcas') son propiedad o están controlados por nosotros o tienen licencia para nosotros."
          },
          {
            heading: "3. Representaciones del Usuario",
            body: "Al utilizar el Sitio, usted declara y garantiza que: (1) toda la información de registro que envíe será verdadera, precisa, actual y completa; (2) mantendrá la precisión de dicha información y actualizará rápidamente dicha información de registro según sea necesario; (3) tiene la capacidad legal y acepta cumplir con estos Términos de Servicio."
          },
          {
            heading: "4. Limitaciones de Responsabilidad",
            body: "En ningún caso nosotros o nuestros directores, empleados o agentes seremos responsables ante usted o cualquier tercero por daños directos, indirectos, consecuentes, ejemplares, incidentales, especiales o punitivos, incluyendo lucro cesante, pérdida de ingresos, pérdida de datos u otros daños que surjan de su uso del sitio."
          },
          {
            heading: "5. Ley Aplicable",
            body: "Estos Términos se regirán y definirán siguiendo las leyes de México. Cross The Bridge y usted consienten irrevocablemente que los tribunales de México tendrán jurisdicción exclusiva para resolver cualquier disputa que pueda surgir en relación con estos términos."
          }
        ]
      }
    }
  }
};