

import { Content, Language } from './types';

const SHOWROOM_ITEMS = [
  { id: 1, category: 'footwear', title: 'Luxury Leather Boots', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, category: 'leather', title: 'Premium Automotive Leather', image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, category: 'fashion', title: 'Handcrafted Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, category: 'industrial', title: 'Safety Footwear Components', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, category: 'footwear', title: 'Western Style Collection', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, category: 'leather', title: 'Vegetable Tanned Hides', image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1000&auto=format&fit=crop' },
];

export const TRANSLATIONS: Record<Language, Content> = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      showroom: "Showroom",
      process: "Process",
      team: "Our Team",
      testimonials: "Testimonials",
      contact: "Contact",
      book: "Book Appointment"
    },
    hero: {
      title: "Your strategic bridge for global markets",
      subtitle: "Maximize your margins by manufacturing abroad and doing business reliably. We select and develop specialized suppliers to meet your manufacturing standards.",
      cta: "Start Your Journey"
    },
    services: {
      title: "Services",
      subtitle: "Connecting Mexico and other parts of the world.",
      items: [
        {
          title: "Custom product development",
          desc: "Find the right supplier match for your company. The idea is yours – we help you bring it to life. Get an end-to-end solution with the right factory, the necessary raw materials, and logistics fully taken care of. Receive expert advice on production feasibility. We manage: Sourcing, Contract manufacturing, Logistics.",
          icon: "package"
        },
        {
          title: "Leather and components supplier for footwear",
          desc: "Find the best materials for your product. We work in partnership with top tanneries and leading component suppliers in Mexico. We handle purchasing on your behalf, so you get quality, consistency, and better conditions without adding extra workload to your team.",
          icon: "layers"
        },
        {
          title: "Export management",
          desc: "Take your product into new international markets. We identify the most attractive destinations for your brand and manage all the requirements needed to enter and operate in other countries.",
          icon: "globe"
        },
        {
          title: "Trade missions & business agendas",
          desc: "We've guided more than [XXXX] companies on trade missions to other countries to expand their markets and discover new suppliers and customers in the world's leading economies. Meet your next strategic allies. Gain high-value business contacts. Diversify by engaging with new business cultures.",
          icon: "users"
        }
      ]
    },
    showroom: {
      title: "Showroom",
      subtitle: "Explore a selection of products developed and sourced for our international partners.",
      categories: {
        all: "All",
        footwear: "Footwear",
        leather: "Leather",
        fashion: "Fashion",
        industrial: "Industrial"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "How we do it",
      subtitle: "We make the process simpler and secure.",
      intro: "We know you want to do business abroad. For 20 years we have contributed to successfully connect Mexico with more than 20 countries in Asia, Europe, America, Africa and Oceania.",
      steps: [
        {
          title: "We Develop",
          points: [
            "Specialized product",
            "Reliable suppliers collaboration",
            "Project planning"
          ]
        },
        {
          title: "We Produce",
          points: [
            "Professional quality sampling production",
            "Standardization"
          ]
        },
        {
          title: "We Negotiate",
          points: [
            "Competitive cost analysis",
            "Materials development and standardization"
          ]
        },
        {
          title: "We Plan",
          points: [
            "Logistic support door to door",
            "Shipment consolidation"
          ]
        }
      ]
    },
    team: {
      title: "Our Team",
      subtitle: "Led by industry experts with decades of global experience.",
      profile: {
        name: "Mariana Muciño Del Rio",
        role: "International Negotiation & Strategic Planning",
        bio: "A passionate professional in internationalization with an 18-year trajectory in international business. My experience focuses on creating and managing strategic commercial alliances across 5 continents, contributing a global vision that drives competitiveness and market diversification.",
        educationTitle: "Education",
        education: [
          { degree: "Intl. Cooperation Diploma", school: "Complutense Univ. of Madrid" },
          { degree: "Manager Training Program", school: "Univ. of Mannheim, Germany" },
          { degree: "Intl. Business Degree", school: "Tecnológico de Monterrey" }
        ]
      }
    },
    stats: {
      years: "+20",
      yearsLabel: "Years of Experience",
      negotiations: "+100",
      negotiationsLabel: "Successful Negotiations",
      alliances: "+20",
      alliancesLabel: "Strategic Alliances"
    },
    testimonials: {
      title: "Trust the over 100 businesses that we've helped",
      items: [
        {
          name: "José Lopez",
          role: "CEO, International Goods",
          text: "Cross the Bridge was the missing component to make my local business competitive in more than 20 countries."
        },
        {
          name: "José Lopez", // Using name from PDF
          role: "Director, Fashion Forward",
          text: "Cross The Bridge was the missing component to make my local business competitive in more than 20 countries." 
        }
      ]
    },
    differentiators: {
      title: "What makes Cross The Bridge truly different?",
      items: [
        {
          title: "Global reach, local execution",
          desc: "We connect Mexico with the world through a solid network of partners in multiple countries, turning ideas into real, scalable projects."
        },
        {
          title: "Professional, yet genuinely close",
          desc: "We work with corporate-level rigor while maintaining a warm, approachable, family-style relationship with our clients."
        },
        {
          title: "Loyalty & transparency",
          desc: "We say what we do and do what we say. Clear information, no hidden agendas, and full visibility at every stage of the project."
        },
        {
          title: "Strong sense of fairness",
          desc: "We defend fair deals for all parties involved and protect your interests as if they were our own."
        },
        {
          title: "Commitment & integrity",
          desc: "We stay in the project from beginning to end, honoring agreements and facing challenges alongside you."
        },
        {
          title: "Pursuit of excellence",
          desc: "We obsess over details, quality, and continuous improvement so that every project becomes a benchmark."
        }
      ]
    },
    contact: {
      title: "Contact Us",
      form: {
        name: "Name",
        email: "Email",
        company: "Company Name",
        message: "Description (optional)",
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
      about: "Nosotros",
      services: "Servicios",
      showroom: "Showroom",
      process: "Proceso",
      team: "Nuestro Equipo",
      testimonials: "Testimonios",
      contact: "Contacto",
      book: "Agendar Cita"
    },
    hero: {
      title: "Su puente estratégico para mercados globales",
      subtitle: "Maximice sus márgenes fabricando en el extranjero y haciendo negocios de forma fiable. Seleccionamos y desarrollamos proveedores especializados para cumplir con sus estándares de fabricación.",
      cta: "Comience su Viaje"
    },
    services: {
      title: "Servicios",
      subtitle: "Conectando a México y otras partes del mundo.",
      items: [
        {
          title: "Desarrollo de producto a medida",
          desc: "Encuentre el proveedor adecuado para su empresa. La idea es suya, nosotros le ayudamos a hacerla realidad. Obtenga una solución integral con la fábrica adecuada, las materias primas necesarias y la logística totalmente resuelta. Reciba asesoramiento experto sobre viabilidad de producción. Gestionamos: Búsqueda (Sourcing), Fabricación por contrato, Logística.",
          icon: "package"
        },
        {
          title: "Proveedor de piel y componentes para calzado",
          desc: "Encuentre los mejores materiales para su producto. Trabajamos en asociación con las mejores curtidurías y proveedores de componentes líderes en México. Nos encargamos de las compras en su nombre, para que obtenga calidad, consistencia y mejores condiciones sin añadir carga de trabajo extra a su equipo.",
          icon: "layers"
        },
        {
          title: "Gestión de exportaciones",
          desc: "Lleve su producto a nuevos mercados internacionales. Identificamos los destinos más atractivos para su marca y gestionamos todos los requisitos necesarios para entrar y operar en otros países.",
          icon: "globe"
        },
        {
          title: "Misiones comerciales y agendas de negocios",
          desc: "Hemos guiado a más de [XXXX] empresas en misiones comerciales a otros países para expandir sus mercados y descubrir nuevos proveedores y clientes en las principales economías del mundo. Conozca a sus próximos aliados estratégicos. Obtenga contactos de negocios de alto valor. Diversifique interactuando con nuevas culturas empresariales.",
          icon: "users"
        }
      ]
    },
    showroom: {
      title: "Showroom",
      subtitle: "Explore una selección de productos desarrollados y obtenidos para nuestros socios internacionales.",
      categories: {
        all: "Todo",
        footwear: "Calzado",
        leather: "Piel",
        fashion: "Moda",
        industrial: "Industrial"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "Cómo lo hacemos",
      subtitle: "Hacemos el proceso más simple y seguro.",
      intro: "Sabemos que quiere hacer negocios en el extranjero. Durante 20 años hemos contribuido a conectar exitosamente a México con más de 20 países en Asia, Europa, América, África y Oceanía.",
      steps: [
        {
          title: "Desarrollamos",
          points: [
            "Producto especializado",
            "Colaboración con proveedores confiables",
            "Planeación de proyectos"
          ]
        },
        {
          title: "Producimos",
          points: [
            "Producción de muestras de calidad profesional",
            "Estandarización"
          ]
        },
        {
          title: "Negociamos",
          points: [
            "Análisis de costos competitivos",
            "Desarrollo de materiales y estandarización"
          ]
        },
        {
          title: "Planeamos",
          points: [
            "Soporte logístico puerta a puerta",
            "Consolidación de envíos"
          ]
        }
      ]
    },
    team: {
      title: "Nuestro Equipo",
      subtitle: "Liderado por expertos de la industria con décadas de experiencia global.",
      profile: {
        name: "Mariana Muciño Del Rio",
        role: "Negociación y Planeación Estratégica Internacional",
        bio: "Soy una profesional apasionada de la internacionalización con una trayectoria de 18 años en el ámbito de los negocios internacionales. Mi experiencia se ha centrado en la creación y gestión de alianzas estratégicas comerciales en los 5 continentes, contribuyendo con una visión global que impulse la competitividad y diversificación de mercados en las empresas.",
        educationTitle: "Formación",
        education: [
          { degree: "Diplomado Cooperación Intl", school: "Univ. Complutense de Madrid" },
          { degree: "Manager Training Program", school: "Univ. de Mannheim, Alemania" },
          { degree: "Lic. Negocios Internacionales", school: "Tecnológico de Monterrey" }
        ]
      }
    },
    stats: {
      years: "+20",
      yearsLabel: "Años de Experiencia",
      negotiations: "+100",
      negotiationsLabel: "Negociaciones Exitosas",
      alliances: "+20",
      alliancesLabel: "Alianzas Estratégicas"
    },
    testimonials: {
      title: "Confíe en las más de 100 empresas que hemos ayudado",
      items: [
        {
          name: "José Lopez",
          role: "CEO, International Goods",
          text: "Cross the Bridge fue el componente que faltaba para hacer mi negocio local competitivo en más de 20 países."
        },
        {
          name: "José Lopez",
          role: "Director, Fashion Forward",
          text: "Cross The Bridge fue el componente que faltaba para hacer mi negocio local competitivo en más de 20 países."
        }
      ]
    },
    differentiators: {
      title: "¿Qué hace a Cross The Bridge realmente diferente?",
      items: [
        {
          title: "Alcance global, ejecución local",
          desc: "Conectamos a México con el mundo a través de una sólida red de socios en múltiples países, convirtiendo ideas en proyectos reales y escalables."
        },
        {
          title: "Profesional, pero genuinamente cercano",
          desc: "Trabajamos con rigor corporativo mientras mantenemos una relación cálida, accesible y familiar con nuestros clientes."
        },
        {
          title: "Lealtad y Transparencia",
          desc: "Decimos lo que hacemos y hacemos lo que decimos. Información clara, sin agendas ocultas y visibilidad total en cada etapa del proyecto."
        },
        {
          title: "Fuerte sentido de justicia",
          desc: "Defendemos tratos justos para todas las partes involucradas y protegemos sus intereses como si fueran nuestros."
        },
        {
          title: "Compromiso e integridad",
          desc: "Nos mantenemos en el proyecto de principio a fin, honrando acuerdos y enfrentando desafíos junto a usted."
        },
        {
          title: "Búsqueda de la excelencia",
          desc: "Nos obsesionamos con los detalles, la calidad y la mejora continua para que cada proyecto se convierta en un referente."
        }
      ]
    },
    contact: {
      title: "Contáctanos",
      form: {
        name: "Nombre",
        email: "Correo",
        company: "Nombre de la empresa",
        message: "Descripción (opcional)",
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