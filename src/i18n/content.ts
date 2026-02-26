export const SUPPORTED_LOCALES = ['en', 'es'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export type CaseStudy = {
  id: string
  brand: string
  category: string
  challenge: string
  approach: string
  impact: string[]
  services: string[]
  visual: string
  stat: string
  statLabel: string
}

type NavItem = {
  label: string
  href: string
}

type HomeCopy = {
  localeLabel: string
  languageName: string
  seo: {
    title: string
    description: string
  }
  skipToContent: string
  nav: {
    brandAriaLabel: string
    items: NavItem[]
    cta: string
  }
  hero: {
    eyebrow: string
    titleLines: [string, string, string]
    body: string
    primaryCta: string
    secondaryCta: string
    visualAlt: string
    kpis: Array<{ value: string; label: string }>
  }
  services: {
    eyebrow: string
    title: string
    cards: Array<{ title: string; body: string }>
  }
  work: {
    eyebrow: string
    title: string
    requestDeck: string
    impactHeading: string
    scopeHeading: string
    caseStudies: CaseStudy[]
  }
  process: {
    eyebrow: string
    title: string
    steps: Array<{ title: string; body: string }>
  }
  contact: {
    eyebrow: string
    title: string
    body: string
    primaryCta: string
    secondaryCta: string
  }
  footer: {
    text: string
    backToTop: string
  }
}

export const contentByLocale: Record<Locale, HomeCopy> = {
  en: {
    localeLabel: 'ES',
    languageName: 'English',
    seo: {
      title: 'Chicle Studio — Bold editorial digital execution',
      description:
        'Chicle Studio blends art direction, conversion architecture, and SEO-grade engineering into premium digital growth systems.',
    },
    skipToContent: 'Skip to content',
    nav: {
      brandAriaLabel: 'Chicle Studio home',
      items: [
        { label: 'Services', href: '#services' },
        { label: 'Case studies', href: '#work' },
        { label: 'Process', href: '#process' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Book strategy call',
    },
    hero: {
      eyebrow: 'Premium digital execution studio',
      titleLines: ['Bold ideas.', 'Editorial execution.', 'Built to convert.'],
      body: 'Chicle Studio combines art direction, conversion architecture, and SEO-grade engineering into one premium growth system.',
      primaryCta: 'Start your project',
      secondaryCta: 'See case studies',
      visualAlt: 'Abstract editorial collage representing premium digital direction',
      kpis: [
        { value: '120ms', label: 'interaction-ready components' },
        { value: '94+', label: 'Lighthouse performance baseline' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Editorial-grade digital systems for brands that need impact now.',
      cards: [
        {
          title: 'Brand & Experience Direction',
          body: 'Visual systems, interface composition, and storytelling layers that increase trust instantly.',
        },
        {
          title: 'SEO & Growth Foundation',
          body: 'Technical SEO, semantic architecture, and conversion content logic for discoverability and intent.',
        },
        {
          title: 'Performance Engineering',
          body: 'Fast, resilient React implementations shipped with deployment and measurement discipline.',
        },
      ],
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Case studies with measurable growth impact and premium execution craft.',
      requestDeck: 'Request full case-study deck',
      impactHeading: 'Impact highlights',
      scopeHeading: 'Scope delivered',
      caseStudies: [
        {
          id: 'fucesa',
          brand: 'FUCESA',
          category: 'Industrial & Institutional',
          challenge: 'A fragmented web presence was reducing trust and slowing qualified lead conversion.',
          approach:
            'We rebuilt the conversion journey, introduced a clearer service architecture, and improved SEO discoverability for high-intent queries.',
          impact: ['Clearer procurement buyer pathway', 'Stronger technical credibility in first session', 'Higher lead-intent qualification'],
          services: ['Website strategy', 'UX/UI redesign', 'Technical SEO foundation'],
          visual: '/assets/case-fucesa-real.jpg',
          stat: '38%',
          statLabel: 'faster first-contact path',
        },
        {
          id: 'cretia',
          brand: 'Cretia',
          category: 'SaaS Product',
          challenge: 'Positioning and activation friction were limiting product adoption and retention momentum.',
          approach:
            'We clarified value messaging, streamlined onboarding narratives, and connected lifecycle touchpoints to measurable activation events.',
          impact: ['Sharper product value communication', 'Cleaner activation funnel narrative', 'Retention-oriented messaging system'],
          services: ['Product positioning', 'Lifecycle marketing', 'Analytics instrumentation'],
          visual: '/assets/case-cretia-real.jpg',
          stat: '2.1x',
          statLabel: 'increase in trial-to-activation rate',
        },
        {
          id: 'tolo',
          brand: 'TOLO Café',
          category: 'Hospitality & Retail',
          challenge: 'Local discovery was high, but conversion into repeat digital revenue was inconsistent.',
          approach:
            'We crafted a brand-forward digital experience and campaign framework built to convert first-time visitors into repeat buyers.',
          impact: ['Higher campaign landing clarity', 'Better repeat-purchase communication', 'Operationally simple growth playbooks'],
          services: ['Brand storytelling', 'Campaign system design', 'Performance marketing support'],
          visual: '/assets/case-tolo-real.jpg',
          stat: '+47%',
          statLabel: 'increase in returning buyer journeys',
        },
      ],
    },
    process: {
      eyebrow: 'Execution model',
      title: 'Creative ambition, engineered with precision.',
      steps: [
        { title: '01 — Discover', body: 'Business goals, audience intent, and opportunity mapping.' },
        { title: '02 — Art direct', body: 'Editorial composition, visual hierarchy, and conversion-safe interface language.' },
        { title: '03 — Build', body: 'Performance-aware implementation with SEO and analytics from day one.' },
        { title: '04 — Optimize', body: 'Continuous experimentation, reporting, and iterative refinement.' },
      ],
    },
    contact: {
      eyebrow: 'Ready to scale?',
      title: 'Let’s launch your next high-impact digital experience.',
      body: 'Share your goals and timelines. We’ll reply with a focused proposal covering scope, milestones, and expected business outcomes.',
      primaryCta: 'Email project brief',
      secondaryCta: 'Book a strategy call',
    },
    footer: {
      text: 'Chicle Studio. Built for speed, clarity, and growth.',
      backToTop: 'Back to top',
    },
  },
  es: {
    localeLabel: 'EN',
    languageName: 'Español',
    seo: {
      title: 'Chicle Studio — Ejecución digital editorial y audaz',
      description:
        'Chicle Studio integra dirección de arte, arquitectura de conversión e ingeniería SEO en sistemas premium de crecimiento digital.',
    },
    skipToContent: 'Ir al contenido',
    nav: {
      brandAriaLabel: 'Inicio de Chicle Studio',
      items: [
        { label: 'Servicios', href: '#services' },
        { label: 'Casos de estudio', href: '#work' },
        { label: 'Proceso', href: '#process' },
        { label: 'Contacto', href: '#contact' },
      ],
      cta: 'Agendar llamada estratégica',
    },
    hero: {
      eyebrow: 'Estudio premium de ejecución digital',
      titleLines: ['Ideas audaces.', 'Ejecución editorial.', 'Diseñado para convertir.'],
      body: 'Chicle Studio combina dirección de arte, arquitectura de conversión e ingeniería SEO en un sistema premium de crecimiento.',
      primaryCta: 'Comenzar proyecto',
      secondaryCta: 'Ver casos de estudio',
      visualAlt: 'Collage editorial abstracto que representa dirección digital premium',
      kpis: [
        { value: '120ms', label: 'componentes listos para interacción' },
        { value: '94+', label: 'base de rendimiento Lighthouse' },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Sistemas digitales de nivel editorial para marcas que necesitan impacto ahora.',
      cards: [
        {
          title: 'Dirección de marca y experiencia',
          body: 'Sistemas visuales, composición de interfaces y narrativa que elevan la confianza desde el primer segundo.',
        },
        {
          title: 'Base SEO y crecimiento',
          body: 'SEO técnico, arquitectura semántica y lógica de contenido para captar intención y mejorar descubrimiento.',
        },
        {
          title: 'Ingeniería de performance',
          body: 'Implementaciones React rápidas y resilientes con disciplina de despliegue y medición.',
        },
      ],
    },
    work: {
      eyebrow: 'Trabajo seleccionado',
      title: 'Casos con impacto medible en crecimiento y ejecución premium.',
      requestDeck: 'Solicitar deck completo de casos',
      impactHeading: 'Impactos clave',
      scopeHeading: 'Alcance entregado',
      caseStudies: [
        {
          id: 'fucesa',
          brand: 'FUCESA',
          category: 'Industrial e institucional',
          challenge: 'Una presencia web fragmentada reducía la confianza y frenaba la conversión de leads calificados.',
          approach:
            'Rediseñamos el viaje de conversión, ordenamos la arquitectura de servicios y fortalecimos la encontrabilidad SEO para búsquedas de alta intención.',
          impact: ['Ruta de compra más clara para procurement', 'Mayor credibilidad técnica en la primera sesión', 'Mejor calificación de intención de lead'],
          services: ['Estrategia de sitio web', 'Rediseño UX/UI', 'Fundamentos de SEO técnico'],
          visual: '/assets/case-fucesa-real.jpg',
          stat: '38%',
          statLabel: 'más rápido en primer contacto',
        },
        {
          id: 'cretia',
          brand: 'Cretia',
          category: 'Producto SaaS',
          challenge: 'La fricción en posicionamiento y activación estaba limitando adopción y retención.',
          approach:
            'Clarificamos la propuesta de valor, simplificamos la narrativa de onboarding y conectamos el lifecycle con eventos medibles de activación.',
          impact: ['Comunicación de valor más precisa', 'Narrativa de activación más limpia', 'Sistema de mensajes orientado a retención'],
          services: ['Posicionamiento de producto', 'Marketing lifecycle', 'Instrumentación analítica'],
          visual: '/assets/case-cretia-real.jpg',
          stat: '2.1x',
          statLabel: 'aumento en tasa trial-a-activación',
        },
        {
          id: 'tolo',
          brand: 'TOLO Café',
          category: 'Hospitalidad y retail',
          challenge: 'La visibilidad local era alta, pero la conversión a ingresos digitales recurrentes era inconsistente.',
          approach:
            'Diseñamos una experiencia digital enfocada en marca y campañas para convertir visitantes nuevos en compradores recurrentes.',
          impact: ['Mayor claridad en campañas de aterrizaje', 'Mejor comunicación para recompra', 'Playbooks de crecimiento operativamente simples'],
          services: ['Storytelling de marca', 'Diseño de sistema de campañas', 'Soporte de performance marketing'],
          visual: '/assets/case-tolo-real.jpg',
          stat: '+47%',
          statLabel: 'aumento en recorridos de recompra',
        },
      ],
    },
    process: {
      eyebrow: 'Modelo de ejecución',
      title: 'Ambición creativa, ejecutada con precisión.',
      steps: [
        { title: '01 — Descubrir', body: 'Objetivos de negocio, intención de audiencia y mapeo de oportunidades.' },
        { title: '02 — Dirigir arte', body: 'Composición editorial, jerarquía visual y lenguaje de interfaz seguro para conversión.' },
        { title: '03 — Construir', body: 'Implementación enfocada en performance con SEO y analítica desde el día uno.' },
        { title: '04 — Optimizar', body: 'Experimentación continua, reporteo y refinamiento iterativo.' },
      ],
    },
    contact: {
      eyebrow: '¿Listos para escalar?',
      title: 'Lanzemos tu próxima experiencia digital de alto impacto.',
      body: 'Comparte tus objetivos y tiempos. Te responderemos con una propuesta enfocada en alcance, hitos y resultados esperados de negocio.',
      primaryCta: 'Enviar brief del proyecto',
      secondaryCta: 'Agendar llamada estratégica',
    },
    footer: {
      text: 'Chicle Studio. Hecho para velocidad, claridad y crecimiento.',
      backToTop: 'Volver arriba',
    },
  },
}
