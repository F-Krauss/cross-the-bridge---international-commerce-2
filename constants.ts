

import { Content, Language } from './types';

const SHOWROOM_ITEMS = [
  { id: 1, category: 'footwear', title: 'Luxury Leather Boots', image: 'https://plus.unsplash.com/premium_photo-1729285270693-3131f27a56c0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, category: 'leather', title: 'Premium Automotive Leather', image: 'https://images.unsplash.com/photo-1573227896778-8f378c4029d4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, category: 'fashion', title: 'Handcrafted Bags', image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, category: 'industrial', title: 'Safety Footwear Components', image: 'https://images.unsplash.com/photo-1657196343034-481a224e963e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, category: 'footwear', title: 'Western Style Collection', image: 'https://images.unsplash.com/photo-1568090369444-b0e27698de2c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, category: 'leather', title: 'Vegetable Tanned Hides', image: 'https://www.leatherbox.com/cdn/shop/files/la-bretagna-arizona-raw-supple-vegetable-tanned-harness-leather-natural-L103RARC1416NATP-1_1080x.jpg?v=1753276451' },
];

export const TRANSLATIONS: Record<Language, Content> = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      showroom: "Showroom",
      process: "Process",
      team: "Our Founder",
      testimonials: "Testimonials",
      why_us: "Why Us",
      contact: "Contact",
      book: "Book Appointment"
    },
    hero: {
      title: "Your strategic bridge to World-Class manufacturing in mexico",
      subtitle: "We connect U.S. brands with certified factories, top-tier leather suppliers, and reliable production partners - so you scale without production headers.",
      cta: "Book a Discovery Call",
      cta2: "Download CTB Capabilities Deck"
    },
    services: {
      title: "Services",
      subtitle: "Connecting Mexico and other parts of the world.",
      items: [
        {
          title: "Custom product development",
          desc: "Find the right supplier match for your company.",
          details: [
            "The idea is yours – we help you bring it to life.",
            "Get an end-to-end solution with the right factory, the necessary raw materials, and logistics fully taken care of.",
            "Receive expert advice on production feasibility."
          ],
          bullets: ["Sourcing", "Contract manufacturing", "Logistics"],
          icon: "package"
        },
        {
          title: "Leather and components supplier for footwear and fashion industries",
          desc: "Find the best materials for your product.",
          details: [
            "We work in partnership with top tanneries and leading component suppliers in Mexico.",
            "We handle purchasing on your behalf, so you get quality, consistency, and better conditions without adding extra workload to your team."
          ],
          icon: "layers"
        },
        {
          title: "Export management",
          desc: "We turn global expansion into a strategic advantage, not a costly experiment.",
          details: [
            "Backed by two decades working with world-class suppliers, brands, and international partnerships, we help you enter new markets faster, reduce operational costs, and build a long-term scalable presence-without the trial-and-error that most companies pay for."
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
        cta: "Join the next mission",
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
        fashion: "Fashion",
        industrial: "Industrial"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "Your Journey With Us",
      subtitle: "From vision to delivery — a structured path to success.",
      intro: "We know you want to do business abroad. For 20 years we have contributed to successfully connect Mexico with more than 20 countries in Asia, Europe, America, Africa and Oceania.",
      steps: [
        {
          title: "Discovery & Project Alignment",
          desc: "Your vision, goals, pricing targets, timeline expectations, and market positioning come together here. We define the roadmap and align all strategic decisions before moving forward."
        },
        {
          title: "Product & Material Development",
          desc: "We translate your idea into a manufacturable product. This includes technical specs, material research, construction guidance, cost estimates, and industry-driven recommendations."
        },
        {
          title: "Strategic Supplier Matchmaking",
          desc: "We connect you with the right factory and material suppliers based on capabilities, quality, certifications, pricing, capacity, and long-term fit. You get curated options, not guesswork."
        },
        {
          title: "Prototyping & Sample Validation",
          desc: "We coordinate all sample rounds to test construction, fit, comfort, finishing, materials, and cost accuracy. This is where your product takes shape and gets validated before production."
        },
        {
          title: "Production Management & Daily Operations",
          desc: "We manage your production from A to Z: scheduling, raw materials, communication, technical follow-up, problem-solving, and timeline control. You focus on sales — we run the factory."
        },
        {
          title: "Quality Assurance & Pre-Shipment Inspections",
          desc: "We implement international-level quality standards through inspections, testing, reports, and final validation. Our Zero-Surprises approach protects your brand at every stage."
        },
        {
          title: "Logistics, Documentation & Export Coordination",
          desc: "We prepare all packaging details, coordinate with carriers, review commercial documents, ensure compliance, and guide your shipment from factory floor to final destination."
        }
      ]
    },
    team: {
      title: "Our Founder",
      subtitle: "Visionary leadership driving global connections.",
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
          name: "Rogério de Souza Cunha",
          role: "Trade Intelligence, CICB",
          text: "Cross the Bridge is an excellent company that has consistently served CICB and Brazilian tanneries with professionalism and outstanding deliveries, both in Mexico and abroad. We've had very positive experiences in business relationships, contacts, market knowledge, and experiences through Cross the Bridge's work.",
          country: "Brazil",
          countryCode: "BR",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Wilson King",
          role: "Outback Trading Company",
          text: "When you want to grow in a new country, you don’t just need a contact — you need someone who truly cares about your success. That’s what I found in Mariana and Cross the Bridge.",
          country: "United States",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Chaz Pilarcik",
          role: "Business Owner",
          text: "I truly cannot put into words how much Mariana means to me and my business. She is one of the most loyal, dedicated, and trustworthy people I’ve ever had the pleasure of working with. Her insight and expertise in the industry are unmatched, and her work ethic inspires everyone around her. Mariana, thank you for always showing up with such heart, excellence, and integrity — you really are the best at what you do.",
          country: "United States",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, USA",
          text: "I have worked with Mariana for the last 20 plus years. She manages and oversees all my sourcing, production and even shipping. A value we cannot do without.",
          country: "United States",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Carlos Mendoza",
          role: "Leather Imports Director",
          text: "The team at Cross the Bridge transformed our supply chain completely. Their attention to detail and market knowledge in Asia is unparalleled.",
          country: "Mexico",
          countryCode: "MX",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Sarah Thompson",
          role: "CEO, Western Goods Co.",
          text: "Finding reliable manufacturing partners in Asia seemed impossible until we connected with Cross the Bridge. They made the entire process seamless.",
          country: "Canada",
          countryCode: "CA",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Hans Mueller",
          role: "Import Manager, Euro Leather",
          text: "Professional, reliable, and always delivering beyond expectations. Cross the Bridge has been instrumental in expanding our sourcing capabilities.",
          country: "Germany",
          countryCode: "DE",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Liu Wei",
          role: "Export Coordinator, Guangzhou",
          text: "Working with Cross the Bridge from the supplier side has been exceptional. They understand both Western requirements and Asian manufacturing perfectly.",
          country: "China",
          countryCode: "CN",
          image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Ana García",
          role: "Purchasing Director",
          text: "La confianza y profesionalismo que ofrece Cross the Bridge es incomparable. Han transformado nuestra forma de hacer negocios internacionales.",
          country: "Spain",
          countryCode: "ES",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "James O'Connor",
          role: "Founder, Aussie Outfitters",
          text: "Cross the Bridge opened doors we didn't even know existed. Their network and expertise in international trade is truly world-class.",
          country: "Australia",
          countryCode: "AU",
          image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face"
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
      team: "Nuestra Fundadora",
      why_us: "Por qué nosotros",
      testimonials: "Testimonios",
      contact: "Contacto",
      book: "Agendar Cita"
    },
    hero: {
      title: "Tu puente estratégico hacia la manufactura de clase mundial en México",
      subtitle: "Conectamos marcas estadounidenses con fábricas certificadas, proveedores de cuero de primer nivel y socios de producción confiables, para que puedas escalar sin necesidad de recurrir a la producción principal.",
      cta: "Agenda una Llamada de Descubrimiento",
      cta2: "Descargar la Presentación de Capacidades de CTB"
    },
    services: {
      title: "Servicios",
      subtitle: "Conectando a México y otras partes del mundo.",
      items: [
        {
          title: "Desarrollo de producto a medida",
          desc: "Encuentre el proveedor adecuado para su empresa.",
          details: [
            "La idea es suya, nosotros le ayudamos a hacerla realidad.",
            "Obtenga una solución integral con la fábrica adecuada, las materias primas necesarias y la logística totalmente resuelta.",
            "Reciba asesoramiento experto sobre viabilidad de producción."
          ],
          bullets: ["Búsqueda (Sourcing)", "Fabricación por contrato", "Logística"],
          icon: "package"
        },
        {
          title: "Proveedor de piel y componentes para industrias de calzado y moda",
          desc: "Encuentre los mejores materiales para su producto.",
          details: [
            "Trabajamos en asociación con las mejores curtidurías y proveedores de componentes líderes en México.",
            "Nos encargamos de las compras en su nombre, para que obtenga calidad, consistencia y mejores condiciones sin añadir carga de trabajo extra a su equipo."
          ],
          icon: "layers"
        },
        {
          title: "Gestión de exportaciones",
          desc: "Convertimos la expansión global en una ventaja estratégica, no en un experimento costoso.",
          details: [
            "Con el respaldo de dos décadas de trabajo con proveedores, marcas y alianzas internacionales de primer nivel, le ayudamos a acceder a nuevos mercados con mayor rapidez, reducir costos operativos y construir una presencia escalable a largo plazo, sin el proceso de prueba y error que suelen pagar la mayoría de las empresas."
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
        cta: "Inscríbete a la próxima misión",
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
        fashion: "Moda",
        industrial: "Industrial"
      },
      items: SHOWROOM_ITEMS
    },
    process: {
      title: "Tu Camino Con Nosotros",
      subtitle: "De la visión a la entrega — un camino estructurado hacia el éxito.",
      intro: "Sabemos que quiere hacer negocios en el extranjero. Durante 20 años hemos contribuido a conectar exitosamente a México con más de 20 países en Asia, Europa, América, África y Oceanía.",
      steps: [
        {
          title: "Descubrimiento y Alineación del Proyecto",
          desc: "Tu visión, objetivos, metas de precio, expectativas de tiempo y posicionamiento de mercado se unen aquí. Definimos la hoja de ruta y alineamos todas las decisiones estratégicas antes de avanzar."
        },
        {
          title: "Desarrollo de Producto y Materiales",
          desc: "Traducimos tu idea en un producto manufacturable. Esto incluye especificaciones técnicas, investigación de materiales, guía de construcción, estimaciones de costos y recomendaciones impulsadas por la industria."
        },
        {
          title: "Emparejamiento Estratégico de Proveedores",
          desc: "Te conectamos con la fábrica y proveedores de materiales adecuados según capacidades, calidad, certificaciones, precios, capacidad y ajuste a largo plazo. Obtienes opciones seleccionadas, no conjeturas."
        },
        {
          title: "Prototipado y Validación de Muestras",
          desc: "Coordinamos todas las rondas de muestras para probar construcción, ajuste, comodidad, acabado, materiales y precisión de costos. Aquí es donde tu producto toma forma y se valida antes de la producción."
        },
        {
          title: "Gestión de Producción y Operaciones Diarias",
          desc: "Gestionamos tu producción de la A a la Z: programación, materias primas, comunicación, seguimiento técnico, resolución de problemas y control de tiempos. Tú te enfocas en ventas — nosotros manejamos la fábrica."
        },
        {
          title: "Control de Calidad e Inspecciones Pre-Envío",
          desc: "Implementamos estándares de calidad de nivel internacional mediante inspecciones, pruebas, reportes y validación final. Nuestro enfoque Cero-Sorpresas protege tu marca en cada etapa."
        },
        {
          title: "Logística, Documentación y Coordinación de Exportación",
          desc: "Preparamos todos los detalles de empaque, coordinamos con transportistas, revisamos documentos comerciales, aseguramos cumplimiento y guiamos tu envío desde la fábrica hasta el destino final."
        }
      ]
    },
    team: {
      title: "Nuestra Fundadora",
      subtitle: "Liderazgo visionario impulsando conexiones globales.",
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
          name: "Rogério de Souza Cunha",
          role: "Inteligencia Comercial, CICB",
          text: "Cross the Bridge es una excelente empresa que ha servido constantemente a CICB y a las tenerías brasileñas con profesionalismo y entregas sobresalientes, tanto en México como en el extranjero. Hemos tenido experiencias muy positivas en relaciones de negocios, contactos, conocimiento de mercado y experiencias gracias al trabajo de Cross the Bridge.",
          country: "Brasil",
          countryCode: "BR",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Wilson King",
          role: "Outback Trading Company",
          text: "Cuando quieres crecer en un nuevo país, no solo necesitas un contacto: necesitas a alguien que realmente se preocupe por tu éxito. Eso es lo que encontré en Mariana y Cross the Bridge.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Chaz Pilarcik",
          role: "Propietario de negocio",
          text: "Realmente no puedo expresar con palabras cuánto significa Mariana para mí y mi negocio. Es una de las personas más leales, dedicadas y confiables con las que he tenido el placer de trabajar. Su visión y experiencia en la industria no tienen igual, y su ética de trabajo inspira a todos a su alrededor. Mariana, gracias por aparecer siempre con tanto corazón, excelencia e integridad: realmente eres la mejor en lo que haces.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Mehrdad Baghai",
          role: "JRD Saddlery, EUA",
          text: "He trabajado con Mariana durante más de 20 años. Ella gestiona y supervisa todo mi abastecimiento, producción e incluso envíos. Un valor del que no podemos prescindir.",
          country: "Estados Unidos",
          countryCode: "US",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Carlos Mendoza",
          role: "Director de Importaciones de Piel",
          text: "El equipo de Cross the Bridge transformó completamente nuestra cadena de suministro. Su atención al detalle y conocimiento del mercado asiático es incomparable.",
          country: "México",
          countryCode: "MX",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Sarah Thompson",
          role: "CEO, Western Goods Co.",
          text: "Encontrar socios de manufactura confiables en Asia parecía imposible hasta que conectamos con Cross the Bridge. Hicieron todo el proceso fluido.",
          country: "Canadá",
          countryCode: "CA",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Hans Mueller",
          role: "Gerente de Importaciones, Euro Leather",
          text: "Profesionales, confiables y siempre entregando más de lo esperado. Cross the Bridge ha sido fundamental para expandir nuestras capacidades de abastecimiento.",
          country: "Alemania",
          countryCode: "DE",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Liu Wei",
          role: "Coordinador de Exportación, Guangzhou",
          text: "Trabajar con Cross the Bridge desde el lado del proveedor ha sido excepcional. Entienden perfectamente tanto los requisitos occidentales como la manufactura asiática.",
          country: "China",
          countryCode: "CN",
          image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "Ana García",
          role: "Directora de Compras",
          text: "La confianza y profesionalismo que ofrece Cross the Bridge es incomparable. Han transformado nuestra forma de hacer negocios internacionales.",
          country: "España",
          countryCode: "ES",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
        },
        {
          name: "James O'Connor",
          role: "Fundador, Aussie Outfitters",
          text: "Cross the Bridge abrió puertas que ni sabíamos que existían. Su red y experiencia en comercio internacional es verdaderamente de clase mundial.",
          country: "Australia",
          countryCode: "AU",
          image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face"
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
