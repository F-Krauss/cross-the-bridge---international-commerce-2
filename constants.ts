

import { Content, Language } from './types';

// ---- Shared Types for localized UI copy ----
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
  providers: { tag: string; title: string; subtitle: string; readyTitle: string; readyDesc: string; bulletPoints: string[]; cta: string };
  contact: { tag: string; sending: string; sent: string; success: string; error: string; location: string; phoneUS: string; phoneMX: string; email: string; socials: { linkedin: string; instagram: string; facebook: string } };
  differentiators: { tag: string; accordionOpen: string; accordionClose: string; readMore: string };
  founder: { badge: string };
};

type ProcessMediaItem = {
  type: 'video' | 'image';
  src: string;
  title: Localized;
  caption: Localized;
  poster?: string;
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

type StrengthCard = {
  icon: IconName;
  title: string;
  desc: string;
  color: string;
  video: string;
  poster: string;
};

type PartnerBenefit = {
  icon: IconName;
  title: string;
  desc: string;
  color: string;
  image: string;
};

type CollageItem = { src: string; label: string };

export const BOOKING_PHONE_CODES = ['+1', '+34', '+44', '+52', '+55', '+61', '+81'];
export const BOOKING_TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

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
      tag: 'For Providers',
      title: 'Become a Partner',
      subtitle: 'Join our global network of elite manufacturers and suppliers',
      readyTitle: 'Ready to Grow?',
      readyDesc: "If you're a quality manufacturer or material supplier in Mexico, we want to meet you. Join our network and take your products to the world.",
      bulletPoints: ['✓ No enrollment fee', '✓ Free verification', '✓ Ongoing support'],
      cta: 'Contact as Partner'
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
      email: 'marianamucino@crossthebridge.com.mx',
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
        website: 'Página web',
        company: 'Empresa',
        orgs: 'Organizaciones',
        position: 'Posición',
        service: 'Servicio de interés',
        origin: 'País de origen',
        target: 'Región de interés',
        date: 'Fecha de interés',
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
        'Sourcing Estratégico / Strategic Sourcing',
        'Manufactura & Operaciones / Manufacturing & Operations',
        'Crecimiento Internacional / International Growth',
        'Misiones Comerciales / Trade Missions'
      ],
      regionOptions: ['Sudamérica', 'México', 'EUA', 'Canadá', 'Europa', 'Asia'],
      submit: {
        idle: 'Agendar',
        loading: 'Enviando…',
        success: 'Enviado'
      },
      successMessage: '¡Gracias! Te contactaremos pronto.'
    },
    hero: { scrollPrompt: 'Desplaza para descubrir' },
    proofOverlay: {
      badge: 'Video en planta',
      title: 'QA de materiales y control pre-embarque',
      desc: 'Recorridos, evidencia fotográfica y aprobaciones documentadas en cada etapa.',
      footer: 'Video real de inspección'
    },
    services: {
      tag: 'Lo que ofrecemos',
      includesLabel: 'Incluye:',
      mobileHint: '← Desliza • Toca para más info →',
      tapHint: 'Toca para ver más',
      whyTag: 'Por qué elegirnos'
    },
    process: {
      badge: 'Entrega, no promesas',
      ctaStart: 'Inicia Tu Viaje',
      ctaServices: 'Ver Servicios',
      proofFallback: 'Entrega documentada',
      evidenceCaption: 'Evidencia ligada a este paso.'
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
      tag: 'Nuestras Fortalezas',
      title: 'Fortalezas CTB',
      swipeHint: '← Desliza para explorar →'
    },
    bridge: {
      badge: 'Conoce el Efecto Puente',
      heading: 'Más de 20 Países',
      subtitle: 'Conectando negocios entre continentes, una alianza exitosa a la vez',
      testimonialsLabel: 'Testimonios',
      testimonialsTitle: 'Aliados que cruzaron con nosotros',
      readStory: 'Ver historia',
      snapshotsLabel: 'Postales desde el campo',
      presenceLabel: 'Presencia en más de 20 Países',
      swipeHint: '← Desliza para explorar →'
    },
    showroom: { label: 'Catálogo' },
    providers: {
      tag: 'Para Proveedores',
      title: 'Conviértete en Socio',
      subtitle: 'Únete a nuestra red global de fabricantes y proveedores de élite',
      readyTitle: '¿Listo para Crecer?',
      readyDesc: 'Si eres un fabricante o proveedor de materiales de calidad en México, queremos conocerte. Únete a nuestra red y lleva tus productos al mundo.',
      bulletPoints: ['✓ Sin costo de inscripción', '✓ Verificación gratuita', '✓ Soporte continuo'],
      cta: 'Contactar como Socio'
    },
    contact: {
      tag: 'Ponte en contacto',
      sending: 'Enviando…',
      sent: '¡Enviado!',
      success: '¡Gracias! Recibimos tus datos.',
      error: 'Ocurrió un error',
      location: 'León Gto, México',
      phoneUS: 'EUA +1 281 323 2612',
      phoneMX: 'MX +52 477 765 3792',
      email: 'info@crossthebridge.co',
      socials: {
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        facebook: 'Facebook'
      }
    },
    differentiators: {
      tag: '¿Por qué elegirnos?',
      accordionOpen: 'Abrir',
      accordionClose: 'Cerrar',
      readMore: 'Ver más'
    },
    founder: { badge: 'Liderazgo' }
  }
};

export const PROCESS_MEDIA: ProcessMediaItem[] = [
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4',
    title: { en: 'Discovery', es: 'Descubrimiento' },
    caption: { en: 'Discovery & Project Alignment', es: 'Descubrimiento y Alineación del Proyecto' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/005/166/637/mp4/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.mp4',
    title: { en: 'Development', es: 'Desarrollo' },
    caption: { en: 'Product & Material Development', es: 'Desarrollo de Producto y Materiales' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4',
    title: { en: 'Network', es: 'Red' },
    caption: { en: 'Strategic Supplier Matchmaking', es: 'Emparejamiento Estratégico de Proveedores' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/068/361/564/mp4/footwear-manufacturing-industry-shoe-production-on-a-conveyor-belt-with-workers-in-a-factory-free-video.mp4',
    title: { en: 'Prototyping', es: 'Prototipado' },
    caption: { en: 'Prototyping & Sample Validation', es: 'Prototipado y Validación de Muestras' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/041/236/463/mp4/factory-production-line-with-machinery-and-workers-conveyor-belt-automation-and-industrial-technology-free-video.mp4',
    title: { en: 'Operations', es: 'Operaciones' },
    caption: { en: 'Production Management & Daily Operations', es: 'Gestión de Producción y Operaciones' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/043/478/973/mp4/quality-control-inspection-in-a-factory-engineer-checking-products-on-the-production-line-free-video.mp4',
    title: { en: 'Quality Assurance', es: 'Aseguramiento de Calidad' },
    caption: { en: 'Quality Assurance & Pre-Shipment Inspections', es: 'Control de Calidad e Inspecciones Pre-Embarque' }
  },
  {
    type: 'video',
    src: 'https://static.vecteezy.com/system/resources/previews/051/217/535/mp4/logistics-and-transportation-cargo-containers-shipping-by-sea-truck-and-train-free-video.mp4',
    title: { en: 'Logistics', es: 'Logística' },
    caption: { en: 'Logistics, Documentation & Export Coordination', es: 'Logística, Documentación y Exportación' }
  }
];

export const STRENGTHS_CARDS: Record<Language, StrengthCard[]> = {
  en: [
    {
      icon: 'Scissors',
      title: 'Deep Leather & Footwear Expertise',
      desc: 'Decades of experience in León, Mexico leather and footwear industry.',
      color: 'from-[#b08c55] to-[#d5ba8c]',
      video: 'https://static.vecteezy.com/system/resources/previews/005/166/637/mp4/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/005/166/637/large/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.jpg'
    },
    {
      icon: 'Award',
      title: 'Access to Elite Factories in Mexico',
      desc: 'Exclusive network of certified and verified manufacturers.',
      color: 'from-[#0b2f6b] to-[#002169]',
      video: 'https://static.vecteezy.com/system/resources/previews/007/995/834/mp4/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/007/995/834/large/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.jpg'
    },
    {
      icon: 'Globe',
      title: 'International Network (Brazil, Asia, USA)',
      desc: 'Global connections for borderless opportunities.',
      color: 'from-[#1f3f70] to-[#0f2f66]',
      video: 'https://static.vecteezy.com/system/resources/previews/024/834/351/mp4/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/024/834/351/large/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.jpg'
    },
    {
      icon: 'FileText',
      title: 'Export Experience & Certifications',
      desc: 'Documentation and compliance for international trade.',
      color: 'from-[#c6ab7b] to-[#d5ba8c]',
      video: 'https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg'
    },
    {
      icon: 'Settings',
      title: 'Hands-on Factory Presence',
      desc: 'On-site quality control and direct supervision.',
      color: 'from-[#12315c] to-[#0b2247]',
      video: 'https://static.vecteezy.com/system/resources/previews/060/472/965/mp4/three-people-are-standing-around-a-table-with-boxes-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/060/472/965/large/three-people-are-standing-around-a-table-with-boxes-free-video.jpg'
    },
    {
      icon: 'Users',
      title: 'Bilingual, Bicultural Leadership',
      desc: 'Seamless communication across cultures and markets.',
      color: 'from-[#27497a] to-[#0f2f66]',
      video: 'https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg'
    }
  ],
  es: [
    {
      icon: 'Scissors',
      title: 'Expertise en Cuero y Calzado',
      desc: 'Décadas de experiencia en la industria del cuero y calzado de León, México.',
      color: 'from-[#b08c55] to-[#d5ba8c]',
      video: 'https://static.vecteezy.com/system/resources/previews/005/166/637/mp4/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/005/166/637/large/leather-factory-manufacture-handmade-notebook-close-up-hands-work-free-video.jpg'
    },
    {
      icon: 'Award',
      title: 'Acceso a Fábricas Élite en México',
      desc: 'Red exclusiva de fabricantes certificados y verificados.',
      color: 'from-[#0b2f6b] to-[#002169]',
      video: 'https://static.vecteezy.com/system/resources/previews/007/995/834/mp4/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/007/995/834/large/aerial-view-of-gas-turbine-power-plant-factory-with-cooling-system-fan-in-operation-that-producing-electricity-while-causing-pollution-and-releasing-carbon-dioxide-which-cause-global-warming-free-video.jpg'
    },
    {
      icon: 'Globe',
      title: 'Red Internacional (Brasil, Asia, EUA)',
      desc: 'Conexiones globales para oportunidades sin fronteras.',
      color: 'from-[#1f3f70] to-[#0f2f66]',
      video: 'https://static.vecteezy.com/system/resources/previews/024/834/351/mp4/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/024/834/351/large/a-parcel-delivery-worker-dressed-in-a-red-uniform-is-lifting-a-package-from-the-trunk-of-the-truck-to-the-recipient-contact-the-receiver-in-front-of-the-house-free-video.jpg'
    },
    {
      icon: 'FileText',
      title: 'Experiencia y Certificaciones de Exportación',
      desc: 'Documentación y compliance para comercio internacional.',
      color: 'from-[#c6ab7b] to-[#d5ba8c]',
      video: 'https://static.vecteezy.com/system/resources/previews/054/047/744/mp4/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/054/047/744/large/a-large-cargo-ship-filled-with-containers-sails-across-a-body-of-water-the-ship-is-viewed-from-above-free-video.jpg'
    },
    {
      icon: 'Settings',
      title: 'Presencia Directa en Fábricas',
      desc: 'Control de calidad en sitio y supervisión directa.',
      color: 'from-[#12315c] to-[#0b2247]',
      video: 'https://static.vecteezy.com/system/resources/previews/060/472/965/mp4/three-people-are-standing-around-a-table-with-boxes-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/060/472/965/large/three-people-are-standing-around-a-table-with-boxes-free-video.jpg'
    },
    {
      icon: 'Users',
      title: 'Liderazgo Bilingüe y Bicultural',
      desc: 'Comunicación fluida entre culturas y mercados.',
      color: 'from-[#27497a] to-[#0f2f66]',
      video: 'https://static.vecteezy.com/system/resources/previews/022/464/181/mp4/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.mp4',
      poster: 'https://static.vecteezy.com/system/resources/thumbnails/022/464/181/large/financial-analysts-analyze-business-financial-reports-on-a-digital-tablet-planning-investment-project-during-a-discussion-at-a-meeting-of-corporate-showing-the-results-of-their-successful-teamwork-free-video.jpg'
    }
  ]
};

export const PARTNER_BENEFITS: Record<Language, PartnerBenefit[]> = {
  en: [
    {
      icon: 'Globe',
      title: 'Worldwide Reach',
      desc: 'Expand your business to international markets through our established network',
      color: 'from-[#1f3f70] to-[#0f2f66]',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Users',
      title: 'Strategic Partners',
      desc: 'Connect with premium brands from USA and other markets seeking Mexican quality',
      color: 'from-[#b08c55] to-[#d5ba8c]',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Award',
      title: 'Elite Recognition',
      desc: 'Be part of a select directory of certified and verified suppliers',
      color: 'from-[#0b2f6b] to-[#002169]',
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Ship',
      title: 'Logistics Support',
      desc: 'We facilitate exports and coordinate international shipments',
      color: 'from-[#12315c] to-[#0b2247]',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Target',
      title: 'Qualified Clients',
      desc: 'Access serious buyers and projects with guaranteed volume',
      color: 'from-[#c6ab7b] to-[#d5ba8c]',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Shield',
      title: 'Secure Payments',
      desc: 'Protected transactions and clear commercial terms',
      color: 'from-[#223b6b] to-[#0f2a57]',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1740&auto=format&fit=crop'
    }
  ],
  es: [
    {
      icon: 'Globe',
      title: 'Alcance Mundial',
      desc: 'Expande tu negocio a mercados internacionales a través de nuestra red establecida',
      color: 'from-[#1f3f70] to-[#0f2f66]',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Users',
      title: 'Socios Estratégicos',
      desc: 'Conecta con marcas premium de USA y otros mercados buscando calidad mexicana',
      color: 'from-[#b08c55] to-[#d5ba8c]',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Award',
      title: 'Reconocimiento de Élite',
      desc: 'Sé parte de un directorio selecto de proveedores certificados y verificados',
      color: 'from-[#0b2f6b] to-[#002169]',
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Ship',
      title: 'Soporte Logístico',
      desc: 'Facilitamos exportaciones y coordinamos envíos internacionales',
      color: 'from-[#12315c] to-[#0b2247]',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Target',
      title: 'Clientes Calificados',
      desc: 'Accede a compradores serios y proyectos con volumen garantizado',
      color: 'from-[#c6ab7b] to-[#d5ba8c]',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1740&auto=format&fit=crop'
    },
    {
      icon: 'Shield',
      title: 'Pagos Seguros',
      desc: 'Transacciones protegidas y términos comerciales claros',
      color: 'from-[#223b6b] to-[#0f2a57]',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1740&auto=format&fit=crop'
    }
  ]
};

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

export const COLLAGE_ITEMS: Record<Language, CollageItem[]> = {
  en: [
    { src: '/img/Collage/Collage_embajada_alemania.jpg', label: 'Germany' },
    { src: '/img/Collage/Collage_mision_Thailandia.jpg', label: 'Thailand' },
    { src: '/img/Collage/Collage_junta.jpg', label: 'Planning' },
    { src: '/img/Collage/Collage_control_de_calidad.jpg', label: 'Quality' },
    { src: '/img/Collage/Collage_junta2.jpg', label: 'Alliances' },
    { src: '/img/Collage/Collage_mision_Thailandia.jpg', label: 'Asia' }
  ],
  es: [
    { src: '/img/Collage/Collage_embajada_alemania.jpg', label: 'Alemania' },
    { src: '/img/Collage/Collage_mision_Thailandia.jpg', label: 'Tailandia' },
    { src: '/img/Collage/Collage_junta.jpg', label: 'Planeación' },
    { src: '/img/Collage/Collage_control_de_calidad.jpg', label: 'Calidad' },
    { src: '/img/Collage/Collage_junta2.jpg', label: 'Alianzas' },
    { src: '/img/Collage/Collage_mision_Thailandia.jpg', label: 'Asia' }
  ]
};

export const DEFAULT_TESTIMONIALS = [
  {
    name: 'Wilson King',
    role: 'Outback Trading Company, USA',
    text: 'Cross the Bridge has been exactly what their name promises — a real bridge. They took all the uncertainty out of doing business in Mexico and replaced it with clarity, trust, and results.',
    country: 'United States',
    countryCode: 'US',
    image: ''
  },
  {
    name: 'Mehrdad Baghai',
    role: 'JRD Saddlery, USA',
    text: 'I have worked with Mariana for the last 20 plus years. She managed and oversees all my sourcing, production and even shipping. Value we cannot do without.',
    country: 'United States',
    countryCode: 'US',
    image: ''
  },
  {
    name: 'Viberg Boot Representative',
    role: 'Viberg Boot, Canada',
    text: 'Working with Mariana is always a wonderful experience. The most valuable part has been finding us many connections within the footwear industry.',
    country: 'Canada',
    countryCode: 'CA',
    image: ''
  }
];

const SHOWROOM_ITEMS = [
  { id: 1, category: 'footwear', title: 'Luxury Leather Boots', image: 'https://plus.unsplash.com/premium_photo-1729285270693-3131f27a56c0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, category: 'leather', title: 'Premium Automotive Leather', image: 'https://images.unsplash.com/photo-1573227896778-8f378c4029d4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, category: 'hats', title: 'Handcrafted Hats', image: 'https://images.unsplash.com/photo-1568090369444-b0e27698de2c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, category: 'industrial', title: 'Safety Footwear Components', image: 'https://images.unsplash.com/photo-1657196343034-481a224e963e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, category: 'footwear', title: 'Western Style Collection', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1760&auto=format&fit=crop' },
  { id: 6, category: 'leather', title: 'Vegetable Tanned Hides', image: 'https://www.leatherbox.com/cdn/shop/files/la-bretagna-arizona-raw-supple-vegetable-tanned-harness-leather-natural-L103RARC1416NATP-1_1080x.jpg?v=1753276451' },
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
      title: "Your strategic bridge to trusted manufacturing partners in Mexico",
      audience: "For operators, founders, and sourcing teams",
      proofs: [
        "140+ vetted suppliers across Mexico",
        "On-the-ground production governance",
        "Export-ready compliance and QA"
      ],
      subtitle: "We help U.S. brands produce and scale in Mexico by connecting them with vetted factories, reliable suppliers, and the right partners — so they move faster, avoid costly mistakes, and scale with confidence.",
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
                    "This service includes supplier scouting, capability analysis, material sourcing, factory validation, sample coordination, and aligned expectations on timelines and costs. Our goal is simple: to eliminate guesswork and give you a strong, trustworthy production foundation in Mexico."
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
      subtitle: "A proven system to execute manufacturing in Mexico — without costly trial and error.",
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
        bio: "International business consultant with 18 years of experience helping Latin American companies expand into the U.S. market.\n\nMy work centers on strategic growth, market entry, and regulatory alignment for manufacturers entering complex, multicultural environments.\n\nI've supported organizations across Latin America, Europe, Asia, and North America — guiding them through compliance, supply-chain optimization, and operational integration.\n\nMy approach is rooted in trust, respect, and purposeful collaboration — key elements for building cross-border partnerships that thrive.",
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
        "Rather than acting as a traditional consultant, Mariana builds long-term strategic alliances, working side by side with founders and teams. Through her experience and global network, clients do not start from zero - they move forward with the right partners, clearer decisions, and a stronger foundation for sustainable international growth."
      ],
      bioCtaMore: "Read full bio",
      bioCtaLess: "Collapse bio",
      differentiators: {
        badge: "What makes Cross the Bridge truly different",
        title: "Strategic partnership with measurable control.",
        subtitle: "Each point below expands into the specific ways we reduce risk, accelerate decisions, and keep you in control.",
        openLabel: "Open",
        viewLabel: "View",
        items: [
          {
            title: "Strategic partner, not an intermediary",
            body: "Cross the Bridge is not an intermediary. We are a strategic partner embedded in Mexico's most competitive manufacturing ecosystem."
          },
          {
            title: "Hands-on execution and accountability",
            body: "We help brands reduce risk, gain control, and scale production in Mexico by combining direct access to vetted manufacturers, hands-on execution, and clear accountability across the entire production cycle."
          },
          {
            title: "Side-by-side collaboration",
            body: "Rather than managing processes from a distance, we work side by side with founders and teams throughout development, production, and expansion. This proximity enables faster decisions, fewer costly mistakes, and real ownership at every stage."
          },
          {
            title: "Vetted network from day one",
            body: "Our clients do not start from zero. Every project is built on factories, suppliers, and partners we already know, have vetted, and have successfully worked with. This gives brands an operational foundation from day one - not a trial-and-error learning curve."
          },
          {
            title: "Connection that accelerates growth",
            body: "Beyond structure and strategy, our value lies in connection. We connect our clients to a trusted network of manufacturers, suppliers, and business leaders who operate with shared standards of quality, responsibility, and long-term vision - accelerating growth through alignment, not guesswork."
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
        stats: ["40M pairs exported annually", "5 days logistic door to door"],
        scaleBadge: "Scale signal",
        scaleLabel: "40M pairs exported annually",
        paragraphs: [
          "For generations, León has been the heart of Latin America's leather, footwear, and fashion industry. Expertise here is built across generations, refined through disciplined manufacturing, and scaled for global markets.",
          "Today, Guanajuato exports nearly 40 million pairs of footwear annually, positioning León among the world's leading leather footwear production hubs. Manufacturers in the region are recognized for both scale and technical specialization, including heritage constructions such as Goodyear Welt trusted by international brands.",
          "\"Made in León, Guanajuato\" represents more than origin. It signals a manufacturing ecosystem where craftsmanship, technical execution, and export readiness coexist at scale.",
          "CTB operates within this ecosystem, connecting high-performing family manufacturers with international brands seeking controlled growth and resilient supply chains. León provides the manufacturing advantage. CTB delivers the structure and execution that turn it into measurable performance."
        ],
        advantagesBadge: "Manufacturing advantages",
        advantages: [
          {
            title: "Deep manufacturing roots",
            body: "Generations of family-owned SMEs specialized in leather, footwear, and fashion."
          },
          {
            title: "Proven global export performance",
            body: "Approximately 40 million pairs exported annually to more than 30 international markets."
          },
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
          text: "Cross the Bridge has been exactly what their name promises — a real bridge. They took all the uncertainty out of doing business in Mexico and replaced it with clarity, trust, and results. Mariana is loyal, honest, and deeply invested in your success. If you want to grow in Mexico without losing sleep, this is the team you want by your side.",
          country: "United States",
          countryCode: "US",
          image: ""
        },
        {
          name: "Rogério de Souza Cunha",
          role: "Trade Intelligence, CICB",
          text: "Cross the Bridge is an excellent company that has consistently served CICB and Brazilian tanneries with professionalism and outstanding deliveries, both in Mexico and abroad. We've had very positive experiences in business relationships, contacts, market knowledge, and experiences through Cross the Bridge's work.",
          country: "Brazil",
          countryCode: "BR",
          image: ""
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, USA",
          text: "I have worked with Mariana for the last 20 plus years. She managed and oversees all my sourcing, production and even shipping. Value we can not do without.",
          country: "United States",
          countryCode: "US",
          image: ""
        },
        {
          name: "Viberg Boot Representative",
          role: "Viberg Boot, Canada",
          text: "I first met Mariana about twenty years ago, the first thing I noticed how radiant she was and very much a peoples person in regards to dealing with there need and inquires on a business level. Working with Mariana is always a wonderful experience, on first personal contact in Leon she makes you feel very at ease. On Dealings with Viberg Boot the most valuable part has been finding us many connections within the footwear industry. Mariana has helped the growth of Viberg in many ways. I would thoroughly recommend Cross the Bridge and Mariana to any possible clients.",
          country: "Canada",
          countryCode: "CA",
          image: "/img/viberg-testimonial.jpg"
        },
        {
          name: "Chaz Pilarcik",
          role: "Business Owner, USA",
          text: "I truly cannot put into words how much Mariana means to me and my business. She is one of the most loyal, dedicated, and trustworthy people I've ever had the pleasure of working with. Her insight and expertise in the industry are unmatched, and her work ethic inspires everyone around her. Mariana, thank you for always showing up with such heart, excellence, and integrity — you really are the best at what you do.",
          country: "United States",
          countryCode: "US",
          image: ""
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
      rights: "© 2024 Cross The Bridge. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    bridgeEffect: {
      badge: "The bridge effect",
      title: "Cross the bridge without fear.",
      body: "For over two decades, we’ve been operating where global business actually happens. On factory floors, at international trade fairs, inside distribution centers, and across cultures, regulations, and markets. The Bridge Effect is the result of sustained international execution. It’s what happens when brands don’t just source abroad, but successfully enter, scale, and endure in global markets. From Asia to Europe, Africa, and the Americas, we turn ideas into export-ready operations, supported by real infrastructure, trusted alliances, and on-the-ground leadership. This section highlights the product categories where that experience lives today, and where new global success stories continue to be built.",
      industriesTitle: "Industries we work with",
      industriesIntro: "Pick a category to see the focus areas and a gallery of recent partner builds.",
      selectedLabel: "Selected category",
      categoriesSuffix: "categories",
      testimonialsBadge: "Trusted by over 100 businesses worldwide",
      testimonialsTitle: "Real voices from both sides of the bridge",
      testimonialsSubtitle: "Founders, operators, and industry leaders who rely on our on-the-ground partnership.",
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
          title: "Trade missions built on real market time.",
          body: [
            "Our trade missions are built on 20+ years of hands-on participation in the world's most relevant manufacturing and sourcing markets - from Hong Kong to Italy to the United States - helping companies make smarter international decisions and expand with greater reach."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Business travel"
          }
        },
        {
          id: "agenda",
          label: "Business Agenda",
          title: "Focused agendas with the right partners.",
          body: [
            "We design focused business agendas that connect companies directly with the right suppliers, manufacturers, and commercial partners. Every mission is grounded in real industry experience, trusted international networks, and a clear strategic objective - not generic tours or one-off introductions.",
            "Our trade missions are often built around the world's most relevant trade fairs, using them as strategic accelerators to identify suppliers, validate markets, and open high-level conversations that would otherwise take years to access."
          ],
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
          title: "Built for founders ready to scale.",
          body: [
            "Designed for founders and business owners looking to scale internationally with clarity, structure, and confidence."
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
        lastUpdated: "Last Updated: October 24, 2024",
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
        lastUpdated: "Last Updated: October 24, 2024",
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
      services: "Servicios / Lo Que Hacemos",
      process: "Cómo Trabajamos",
      trade_missions: "Misiones Comerciales",
      about: "Nosotros / Por Qué Cross the Bridge",
      bridge_effect: "El Efecto Puente",
      contact: "Contacto",
      book: "Agenda una Llamada de Descubrimiento"
    },
    hero: {
      title: "Tu puente estratégico hacia socios de manufactura confiables en México",
      audience: "Para operadores, fundadores y equipos de sourcing",
      proofs: [
        "Más de 140 proveedores validados en México",
        "Gobernanza operativa en campo",
        "Cumplimiento y QA listos para exportar"
      ],
      subtitle: "Ayudamos a marcas de EE. UU. a producir y escalar en México conectándolas con fábricas verificadas, proveedores confiables y los aliados correctos — para avanzar más rápido, evitar errores costosos y crecer con confianza.",
      cta: "Explora una Alianza Estratégica",
      cta2: ""
    },
    proofBar: {
      title: "Pruebas, no promesas",
      subtitle: "A los equipos de operaciones les importa la velocidad, el control y el compliance — esto es lo que garantizamos.",
      metrics: [
        { label: "Vetting de fábricas", value: "140+", detail: "proveedores auditados en México" },
        { label: "Cobertura de QC", value: "100%", detail: "de embarques con inspección en planta" },
        { label: "Velocidad de shortlist", value: "10 días", detail: "para presentar 3-5 fábricas validadas" }
      ],
      logos: ["Outback Trading Co.", "Viberg Boot", "CICB", "JRD Saddlery"]
    },
    services: {
      title: "Servicios",
      subtitle: "Sourcing + validación de fábricas + operaciones productivas en México, pensado para marcas de EE.UU./Europa.",
      items: [
        {
          title: "1. Sourcing Estratégico y Matchmaking de Proveedores",
          desc: "3–5 fábricas validadas con compliance, capacidad y costos confirmados.",
          details: [
            "Conectamos tu marca con la fábrica correcta — no cualquier fábrica. Nuestro proceso de sourcing combina criterios técnicos, optimización de costos y décadas de relaciones con fabricantes, tenerías y proveedores de materiales en México. Evaluamos capacidades, estándares de calidad, certificaciones, capacidad de producción y fit cultural para que trabajes con socios confiables desde el día uno.",
            "Incluye scouting de proveedores, análisis de capacidades, sourcing de materiales, validación de fábricas, coordinación de muestras y expectativas alineadas en tiempos y costos. Eliminamos la incertidumbre para darte una base sólida de producción en México."
          ],
          bullets: ["Búsqueda (Sourcing)", "Fabricación por contrato", "Logística"],
          icon: "package"
        },
        {
          title: "2. Operación de Manufactura y Cadena de Suministro",
          desc: "Gobernanza de producción: calendarios, QC, gestión de riesgos y claridad de costos.",
          details: [
            "Nos convertimos en tu equipo en tierra, gestionando cada paso del proceso de producción para que te enfoques en ventas y crecimiento. Desde desarrollo de producto hasta producción a escala, coordinamos con fábricas, seguimos tiempos, optimizamos comunicación, resolvemos problemas y aseguramos cada entregable.",
            "Incluye planificación de producción, seguimiento de materiales, cierre de costos, calendarización de carga de trabajo, actualizaciones continuas, gestión de riesgos, inspecciones de calidad y preparación completa para exportación. Transparencia y control sin sorpresas."
          ],
          icon: "layers"
        },
        {
          title: "3. Crecimiento Internacional y Alianzas Estratégicas",
          desc: "Expansión global con estrategia y socios adecuados, no con prueba y error.",
          details: [
            "Con dos décadas conectando proveedores, marcas y alianzas internacionales, abrimos puertas a nuevos mercados, reducimos costos operativos y construimos presencia escalable.",
            "Esto incluye insights de mercado, estrategias de entrada, conexiones con distribuidores y socios, soporte en ferias, consultoría de export-readiness y representación local con redes confiables."
          ],
          icon: "globe"
        }
      ],
      missions: {
        title: "Misiones comerciales y agendas de negocios",
        intro: "Guiamos empresas en misiones comerciales para expandir mercados y descubrir nuevos proveedores y clientes en las principales economías del mundo.",
        points: [
          "Conozca a sus próximos aliados estratégicos",
          "Obtenga contactos de negocios de alto valor",
          "Diversifique interactuando con nuevas culturas empresariales"
        ],
        eventsTitle: "Próximos eventos",
        events: ["Feria WanYoung", "Feria Portland"],
        cta: "Solicita una Misión Comercial a Medida",
        tagline: "Hacemos las cosas con pasión"
      }
    },
    showroom: {
      title: "Showroom",
      subtitle: "Explore una selección de productos desarrollados y obtenidos para nuestros socios internacionales.",
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
      subtitle: "Un sistema probado para ejecutar manufactura en México — sin errores costosos.",
      intro: "Hemos refinado este marco por más de 20 años; no necesitas aprender por las malas.",
      steps: [
        {
          title: "Alinear",
          tagline: "Estrategia antes de producir.",
          desc: "Definimos objetivos, metas de precio, tiempos y viabilidad desde el inicio, para que cada decisión se alinee antes de gastar o involucrar fábricas."
        },
        {
          title: "Construir",
          tagline: "De la idea al producto validado.",
          desc: "Acompañamos desarrollo de producto, selección de materiales, matchmaking de proveedores y fábricas, y validación de prototipos, asegurando que tu producto sea sólido, alineado en costo y listo para producir."
        },
        {
          title: "Ejecutar",
          tagline: "Control operativo en campo.",
          desc: "Gestionamos producción en sitio, coordinando proveedores, tiempos, seguimiento técnico y estándares de calidad para que tu equipo se enfoque en crecer."
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
      subtitle: "Liderazgo visionario impulsando conexiones globales.",
      profile: {
        name: "Mariana Muciño Del Rio",
        role: "Negociación y Planeación Estratégica Internacional",
        bio: "Profesional apasionada de la internacionalización con 18 años de trayectoria en negocios internacionales.\n\nMi experiencia se centra en la creación y gestión de alianzas estratégicas comerciales en los 5 continentes.\n\nHe apoyado organizaciones en América Latina, Europa, Asia y Norteamérica — guiándolas en cumplimiento, optimización de cadena de suministro e integración operativa.\n\nMi enfoque se basa en confianza, respeto y colaboración con propósito — elementos clave para construir alianzas transfronterizas exitosas.",
        educationTitle: "Formación",
        education: [
          { degree: "Diplomado Cooperación Intl", school: "Univ. Complutense de Madrid" },
          { degree: "Manager Training Program", school: "Univ. de Mannheim, Alemania" },
          { degree: "Lic. Negocios Internacionales", school: "Tecnológico de Monterrey" }
        ]
      }
    },
    stats: {
      years: "+25",
      yearsLabel: "Años de Experiencia",
      // negotiations: "+100",
      // negotiationsLabel: "Negociaciones Exitosas",
      alliances: "+20",
      alliancesLabel: "Alianzas Estratégicas"
    },
    about: {
      badge: "Nosotros",
      founderTitle: "Nuestra fundadora",
      founderTagline: "Liderazgo visionario impulsando conexiones globales.",
      founderStoryBadge: "Historia de la fundadora",
      founderName: "Mariana Muciño Del Rio",
      founderRole: "Negociación y planeación estratégica internacional",
      bio: [
        "Mariana Muciño es la fundadora de Cross the Bridge. Inició su carrera en negocios internacionales a los 23 años y ha pasado dos décadas viviendo y trabajando en mercados globales, liderando proyectos de manufactura y sourcing en cinco continentes. Esta experiencia le permite ayudar a las empresas a simplificar su expansión internacional, brindándoles claridad, estructura y recursos confiables para crecer con seguridad.",
        "En lugar de actuar como una consultora tradicional, Mariana construye alianzas estratégicas de largo plazo, trabajando hombro a hombro con fundadores y equipos. Gracias a su experiencia y red global, los clientes no comienzan desde cero: avanzan con los socios correctos, decisiones más claras y una base más sólida para un crecimiento internacional sostenible."
      ],
      bioCtaMore: "Leer biografía completa",
      bioCtaLess: "Cerrar biografía",
      differentiators: {
        badge: "Qué hace único a Cross the Bridge",
        title: "Alianza estratégica con control medible.",
        subtitle: "Cada punto muestra cómo reducimos riesgo, aceleramos decisiones y te mantenemos en control.",
        openLabel: "Abrir",
        viewLabel: "Ver",
        items: [
          {
            title: "Socio estratégico, no intermediario",
            body: "Cross the Bridge no es un intermediario. Somos un socio estratégico incrustado en el ecosistema manufacturero más competitivo de México."
          },
          {
            title: "Ejecución práctica y responsabilidad",
            body: "Ayudamos a marcas a reducir riesgo, ganar control y escalar producción en México combinando acceso directo a fábricas validadas, ejecución práctica y responsabilidad clara en todo el ciclo productivo."
          },
          {
            title: "Colaboración hombro a hombro",
            body: "En vez de gestionar a distancia, trabajamos junto a fundadores y equipos durante desarrollo, producción y expansión. Esta cercanía permite decisiones más rápidas, menos errores costosos y verdadera propiedad en cada etapa."
          },
          {
            title: "Red validada desde el día uno",
            body: "Nuestros clientes no comienzan desde cero. Cada proyecto se basa en fábricas, proveedores y socios que ya conocemos, hemos validado y con quienes hemos trabajado exitosamente. Esto da una base operativa desde el día uno, sin curva de prueba y error."
          },
          {
            title: "Conexión que acelera el crecimiento",
            body: "Más allá de estructura y estrategia, nuestro valor está en la conexión. Conectamos a nuestros clientes con una red confiable de fabricantes, proveedores y líderes que operan con estándares compartidos de calidad, responsabilidad y visión de largo plazo — acelerando el crecimiento por alineación, no por ensayo y error."
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
            title: "Coordinación end-to-end bajo un solo líder",
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
        stats: ["40M de pares exportados al año", "Logística puerta a puerta en 5 días"],
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
          role: "Outback Trading Company, EUA",
          text: "Cross the Bridge ha sido exactamente lo que su nombre promete: un verdadero puente. Eliminaron toda la incertidumbre de hacer negocios en México y la reemplazaron con claridad, confianza y resultados. Mariana es leal, honesta y está profundamente comprometida con tu éxito. Si quieres crecer en México sin perder el sueño, este es el equipo que quieres a tu lado.",
          country: "Estados Unidos",
          countryCode: "US",
          image: ""
        },
        {
          name: "Rogério de Souza Cunha",
          role: "Inteligencia Comercial, CICB",
          text: "Cross the Bridge es una excelente empresa que ha servido constantemente a CICB y a las tenerías brasileñas con profesionalismo y entregas sobresalientes, tanto en México como en el extranjero. Hemos tenido experiencias muy positivas en relaciones de negocios, contactos, conocimiento de mercado y experiencias gracias al trabajo de Cross the Bridge.",
          country: "Brasil",
          countryCode: "BR",
          image: ""
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, EUA",
          text: "He trabajado con Mariana durante más de 20 años. Ella gestiona y supervisa todo mi abastecimiento, producción e incluso envíos. Un valor del que no podemos prescindir.",
          country: "Estados Unidos",
          countryCode: "US",
          image: ""
        },
        {
          name: "Representante de Viberg Boot",
          role: "Viberg Boot, Canadá",
          text: "Conocí a Mariana hace unos veinte años, lo primero que noté fue lo radiante que era y muy cercana a las personas en cuanto a atender sus necesidades y consultas a nivel empresarial. Trabajar con Mariana es siempre una experiencia maravillosa, en el primer contacto personal en León te hace sentir muy cómodo. En los tratos con Viberg Boot, lo más valioso ha sido encontrarnos muchas conexiones dentro de la industria del calzado. Mariana ha ayudado al crecimiento de Viberg de muchas maneras. Recomendaría ampliamente a Cross the Bridge y a Mariana a cualquier posible cliente.",
          country: "Canadá",
          countryCode: "CA",
          image: "/img/viberg-testimonial.jpg"
        },
        {
          name: "Chaz Pilarcik",
          role: "Propietario de negocio, EUA",
          text: "Realmente no puedo expresar con palabras cuánto significa Mariana para mí y mi negocio. Es una de las personas más leales, dedicadas y confiables con las que he tenido el placer de trabajar. Su visión y experiencia en la industria no tienen igual, y su ética de trabajo inspira a todos a su alrededor. Mariana, gracias por aparecer siempre con tanto corazón, excelencia e integridad: realmente eres la mejor en lo que haces.",
          country: "Estados Unidos",
          countryCode: "US",
          image: ""
        }
      ]
    },
    differentiators: {
      title: "Por qué los equipos de operaciones nos eligen",
      items: [
        {
          title: "SLAs y gobernanza",
          desc: "Reportes semanales de producción, un solo punto de contacto y operación bilingüe para que siempre sepas qué está pasando."
        },
        {
          title: "Controles de calidad auditables",
          desc: "QC en planta, inspecciones pre-embarque y evidencia fotográfica en cada hito."
        },
        {
          title: "Compliance primero",
          desc: "Documentos de import/export, etiquetado, cumplimiento de materiales y NDAs sin sorpresas."
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
      subtitle: "Pensado para líderes de compras y operaciones extranjeras que necesitan control y visibilidad.",
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
      title: "Deck de capacidades que convence a los decisores",
      subtitle: "Una descarga concisa con la información que piden compras, operaciones y finanzas.",
      bullets: [
        "Industrias atendidas: calzado, leather goods, accesorios y soft goods afines.",
        "Línea de tiempo ejemplo desde onboarding hasta primer embarque con checkpoints de QA.",
        "Metodología de auditoría de proveedores, checklist de compliance y mapa de documentación de exportación."
      ],
      previewLabel: "Dentro del deck",
      previewSlides: [
        { title: "Mapa de red", desc: "Fábricas, tenerías y socios logísticos a lo largo de México." },
        { title: "Checklist de auditoría", desc: "Estándares para capacidad, compliance y calificación de riesgo." },
        { title: "Vista de costo puesto en destino", desc: "Visibilidad de aranceles, flete, empaque y buffers." }
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
      rights: "© 2024 Cross The Bridge. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    },
    bridgeEffect: {
      badge: "El efecto puente",
      title: "Cruza el puente sin miedo.",
      body: "Durante más de dos décadas hemos operado donde realmente sucede el negocio global: en planta, en ferias internacionales, dentro de centros de distribución y a través de culturas, regulaciones y mercados. El Efecto Puente es el resultado de una ejecución internacional sostenida. Es lo que pasa cuando las marcas no solo compran fuera, sino que entran, escalan y se sostienen en mercados globales. De Asia a Europa, África y las Américas, convertimos ideas en operaciones listas para exportar, con infraestructura real, alianzas confiables y liderazgo en tierra. Aquí mostramos las categorías de producto donde vive esa experiencia hoy y donde se siguen construyendo nuevas historias de éxito.",
      industriesTitle: "Industrias con las que trabajamos",
      industriesIntro: "Elige una categoría para ver los enfoques y una galería de proyectos recientes.",
      selectedLabel: "Categoría seleccionada",
      categoriesSuffix: "categorías",
      testimonialsBadge: "Respaldados por más de 100 empresas en el mundo",
      testimonialsTitle: "Voces reales a ambos lados del puente",
      testimonialsSubtitle: "Fundadores, operadores y líderes que confían en nuestra presencia en tierra.",
      storyLabel: "Historia"
    },
    tradeMissions: {
      badge: "Misiones comerciales y agendas de negocio",
      title: "Misiones comerciales y agendas de negocio",
      cta: "Solicita una misión a medida",
      tagline: "Crecimiento internacional, construido con experiencia.",
      selectLabel: "Elige un briefing",
      panels: [
        {
          id: "briefing",
          label: "Brief de la misión",
          title: "Misiones construidas con tiempo real de mercado.",
          body: [
            "Nuestras misiones se basan en 20+ años participando en los mercados de manufactura y sourcing más relevantes — de Hong Kong a Italia y Estados Unidos — ayudando a empresas a decidir mejor y ampliar su alcance internacional."
          ],
          media: {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1800",
            alt: "Viaje de negocios"
          }
        },
        {
          id: "agenda",
          label: "Agenda de negocios",
          title: "Agendas enfocadas con los socios correctos.",
          body: [
            "Diseñamos agendas que conectan directamente a las empresas con los proveedores, fabricantes y socios comerciales correctos. Cada misión se basa en experiencia real, redes internacionales confiables y un objetivo estratégico claro — no en tours genéricos ni presentaciones al azar.",
            "Frecuentemente construimos las misiones alrededor de las ferias más relevantes del mundo, usándolas como aceleradores para identificar proveedores, validar mercados y abrir conversaciones de alto nivel que de otra forma tomarían años."
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
          title: "Diseñado para fundadores listos para escalar.",
          body: [
            "Pensado para fundadores y dueños que buscan escalar internacionalmente con claridad, estructura y confianza."
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
        lastUpdated: "Última Actualización: 24 de Octubre de 2024",
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
        lastUpdated: "Última Actualización: 24 de Octubre de 2024",
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
