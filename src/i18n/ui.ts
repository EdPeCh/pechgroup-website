// Site copy in English and Spanish.
//
// Truthfulness rule: every statement here comes from the brief PECH Group
// provided or from copy already in this repo. Anything not yet confirmed is
// left as a "[TODO: Ed — …]" marker (rendered with the .todo style) instead of
// being invented. Search the repo for "TODO: Ed" to find them all.

export type Lang = 'en' | 'es';

export const CONTACT_EMAIL = 'edgar.pereda@pechgroup.com';

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const homePath: Record<Lang, string> = { en: '/', es: '/es/' };

export const ui = {
  en: {
    locale: 'en_US',
    skip: 'Skip to content',
    homeLabel: 'PECH Group — Home',
    tagline: 'Divergent Strategies',
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    nav: [
      { href: '/#ventures', label: 'Ventures' },
      { href: '/#chairman', label: 'About Ed' },
      { href: '/#investors', label: 'Investors' },
      { href: '/#speaking', label: 'Speaking' },
      { href: '/innovation', label: 'PECH Labs' },
    ],
    contact: 'Contact',
    langSwitch: { label: 'Language', current: 'English', other: 'Español', otherShort: 'ES' },

    footer: {
      blurb:
        'PECH Group LLC is a Texas holding company overseeing five cross-border ventures between the United States and Mexico.',
      ventures: 'Ventures',
      company: 'Company',
      where: 'Where We Operate',
      companyLinks: [
        { href: '/#chairman', label: 'Ed Pereda' },
        { href: '/#investors', label: 'Investors' },
        { href: '/#speaking', label: 'Speaking' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/insights', label: 'Insights' },
        { href: '/contact', label: 'Contact' },
      ],
      places: ['San Francisco Bay Area, CA', 'Texas, USA', 'Mexico'],
      rights: 'All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
    },

    home: {
      title: 'PECH Group — US–Mexico Cross-Border Holding Company',
      description:
        'Texas holding company of Chairman & Lead Investor Ed Pereda, overseeing five US–Mexico ventures in logistics, fulfillment, cold storage, freight and AI.',
      hero: {
        eyebrow: 'Holding Company · United States · Mexico',
        h1a: 'Building North America’s',
        h1b: 'cross-border platforms.',
        sub:
          'PECH Group LLC is a Texas holding company overseeing five cross-border ventures between the United States and Mexico — in logistics, nearshore fulfillment, cold storage, freight and AI — led by Chairman & Lead Investor Ed Pereda.',
        facts: [
          { n: '5', l: 'Cross-border ventures' },
          { n: 'US–MX', l: 'Corridor focus' },
          { n: 'EN/ES', l: 'Bilingual' },
        ],
      },
      ventures: {
        lbl: 'Portfolio',
        h2: 'Five ventures. One cross-border platform.',
        intro: 'PECH Group oversees five ventures operating across the US–Mexico corridor.',
        website: 'Website',
        more: 'More about PECH Labs',
      },
      bio: {
        lbl: 'Chairman & Lead Investor',
        name: 'Ed Pereda',
        roles: [
          'Chairman & Lead Investor, PECH Group LLC',
          'Fractional CEO, Wisdom Digital Logistics',
        ],
        p1:
          'Ed Pereda is a North American Cross-Border Platform Builder. As Chairman & Lead Investor of PECH Group LLC, he oversees five ventures across the US–Mexico corridor: Wisdom Digital Logistics, Lateral Fulfillment, Kotickcold, Echo-XB and PECH Labs.',
        p2: 'At Wisdom Digital Logistics (Wisdomfo), he also serves as Fractional CEO.',
        todoBackground:
          '[TODO: Ed — professional background: prior roles, years of experience, education]',
        todoPhoto: '[TODO: Ed — headshot]',
        todoLinkedin: '[TODO: Ed — LinkedIn URL]',
        photoAlt: 'Ed Pereda',
      },
      investors: {
        lbl: 'Investors',
        h2: 'Invest in the cross-border platform.',
        p: 'For capital-raising conversations about PECH Group and its ventures, contact Ed Pereda directly.',
        todo: '[TODO: Ed — investment thesis / current raise details to publish, if any]',
        cta: 'Investor inquiries',
        subject: 'Investor inquiry — PECH Group',
      },
      speaking: {
        lbl: 'Speaking',
        h2: 'Book Ed Pereda to speak.',
        p: 'Conference organizers: invite Ed to speak about building cross-border platforms between the United States and Mexico.',
        todo: '[TODO: Ed — speaking topics, past conferences and stages, speaker one-sheet]',
        cta: 'Speaking requests',
        subject: 'Speaking request — Ed Pereda',
      },
      emailNote: 'Both open an email to',
    },
  },

  es: {
    locale: 'es_MX',
    skip: 'Saltar al contenido',
    homeLabel: 'PECH Group — Inicio',
    tagline: 'Divergent Strategies',
    navLabel: 'Navegación principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    nav: [
      { href: '/es/#ventures', label: 'Empresas' },
      { href: '/es/#chairman', label: 'Sobre Ed' },
      { href: '/es/#investors', label: 'Inversionistas' },
      { href: '/es/#speaking', label: 'Conferencias' },
      { href: '/innovation', label: 'PECH Labs', hreflang: 'en' },
    ],
    contact: 'Contacto',
    langSwitch: { label: 'Idioma', current: 'Español', other: 'English', otherShort: 'EN' },

    footer: {
      blurb:
        'PECH Group LLC es una holding de Texas que supervisa cinco empresas transfronterizas entre Estados Unidos y México.',
      ventures: 'Empresas',
      company: 'Compañía',
      where: 'Dónde operamos',
      companyLinks: [
        { href: '/es/#chairman', label: 'Ed Pereda' },
        { href: '/es/#investors', label: 'Inversionistas' },
        { href: '/es/#speaking', label: 'Conferencias' },
        { href: '/about', label: 'About (EN)', hreflang: 'en' },
        { href: '/services', label: 'Services (EN)', hreflang: 'en' },
        { href: '/insights', label: 'Insights (EN)', hreflang: 'en' },
        { href: '/contact', label: 'Contact (EN)', hreflang: 'en' },
      ],
      places: ['Área de la Bahía de San Francisco, CA', 'Texas, EE. UU.', 'México'],
      rights: 'Todos los derechos reservados.',
      privacy: 'Aviso de privacidad (EN)',
      terms: 'Términos de uso (EN)',
    },

    home: {
      title: 'PECH Group — Holding transfronteriza EE. UU.–México',
      description:
        'Holding de Texas de Ed Pereda (Chairman y Lead Investor) con cinco empresas EE. UU.–México en logística, fulfillment, almacén en frío, fletes e IA.',
      hero: {
        eyebrow: 'Holding · Estados Unidos · México',
        h1a: 'Construimos las plataformas',
        h1b: 'transfronterizas de Norteamérica.',
        sub:
          'PECH Group LLC es una holding de Texas que supervisa cinco empresas transfronterizas entre Estados Unidos y México — en logística, fulfillment nearshore, almacenaje en frío, fletes e inteligencia artificial — encabezada por su Chairman y Lead Investor, Ed Pereda.',
        facts: [
          { n: '5', l: 'Empresas transfronterizas' },
          { n: 'US–MX', l: 'Enfoque en el corredor' },
          { n: 'EN/ES', l: 'Bilingüe' },
        ],
      },
      ventures: {
        lbl: 'Portafolio',
        h2: 'Cinco empresas. Una plataforma transfronteriza.',
        intro: 'PECH Group supervisa cinco empresas que operan en el corredor Estados Unidos–México.',
        website: 'Sitio web',
        more: 'Más sobre PECH Labs (en inglés)',
      },
      bio: {
        lbl: 'Chairman y Lead Investor',
        name: 'Ed Pereda',
        roles: [
          'Chairman y Lead Investor, PECH Group LLC',
          'Fractional CEO, Wisdom Digital Logistics',
        ],
        p1:
          'Ed Pereda es un constructor de plataformas transfronterizas en Norteamérica (North American Cross-Border Platform Builder). Como Chairman y Lead Investor de PECH Group LLC, supervisa cinco empresas en el corredor Estados Unidos–México: Wisdom Digital Logistics, Lateral Fulfillment, Kotickcold, Echo-XB y PECH Labs.',
        p2: 'En Wisdom Digital Logistics (Wisdomfo) también se desempeña como Fractional CEO.',
        todoBackground:
          '[TODO: Ed — trayectoria profesional: puestos anteriores, años de experiencia, formación]',
        todoPhoto: '[TODO: Ed — fotografía]',
        todoLinkedin: '[TODO: Ed — URL de LinkedIn]',
        photoAlt: 'Ed Pereda',
      },
      investors: {
        lbl: 'Inversionistas',
        h2: 'Invierta en la plataforma transfronteriza.',
        p: 'Para conversaciones de levantamiento de capital sobre PECH Group y sus empresas, contacte directamente a Ed Pereda.',
        todo: '[TODO: Ed — tesis de inversión / detalles de la ronda actual a publicar, si aplica]',
        cta: 'Contacto para inversionistas',
        subject: 'Consulta de inversionista — PECH Group',
      },
      speaking: {
        lbl: 'Conferencias',
        h2: 'Invite a Ed Pereda como conferencista.',
        p: 'Organizadores de conferencias: inviten a Ed a hablar sobre cómo construir plataformas transfronterizas entre Estados Unidos y México.',
        todo: '[TODO: Ed — temas de conferencia, eventos y escenarios anteriores, speaker one-sheet]',
        cta: 'Solicitar conferencia',
        subject: 'Solicitud de conferencia — Ed Pereda',
      },
      emailNote: 'Ambos abren un correo a',
    },
  },
} as const;

// One card per venture. Descriptions use only facts from the PECH Group brief
// and existing repo copy. `url` is intentionally empty until Ed confirms it.
export const ventures: {
  name: string;
  alias?: string;
  url: string;
  tag: Record<Lang, string>;
  line: Record<Lang, string>;
  internal?: string;
}[] = [
  {
    name: 'Wisdom Digital Logistics',
    alias: 'Wisdomfo',
    url: '', // [TODO: Ed — confirm public website URL]
    tag: { en: 'Cross-border logistics', es: 'Logística transfronteriza' },
    line: {
      en: 'Cross-border logistics between the United States and Mexico. Ed Pereda serves as Fractional CEO.',
      es: 'Logística transfronteriza entre Estados Unidos y México. Ed Pereda es su Fractional CEO.',
    },
  },
  {
    name: 'Lateral Fulfillment',
    url: '', // [TODO: Ed — confirm public website URL]
    tag: { en: 'Nearshore 3PL', es: '3PL nearshore' },
    line: {
      en: 'Nearshore third-party logistics (3PL) and fulfillment based in Tijuana, Mexico.',
      es: 'Logística de terceros (3PL) y fulfillment nearshore con base en Tijuana, México.',
    },
  },
  {
    name: 'Kotickcold',
    url: '', // [TODO: Ed — confirm public website URL]
    tag: { en: 'Cold storage · Joint venture', es: 'Almacén en frío · Joint venture' },
    line: {
      en: 'Cold-storage warehouse joint venture in Laredo, Texas.',
      es: 'Joint venture de almacén frío en Laredo, Texas.',
    },
  },
  {
    name: 'Echo-XB',
    url: '', // [TODO: Ed — confirm public website URL]
    tag: { en: 'Cross-border freight · Joint venture', es: 'Fletes transfronterizos · Joint venture' },
    line: {
      en: 'Cross-border freight joint venture with Echo Global Logistics.',
      es: 'Joint venture de fletes transfronterizos con Echo Global Logistics.',
    },
  },
  {
    name: 'PECH Labs',
    url: '',
    internal: '/innovation',
    tag: { en: 'AI-first digital agency', es: 'Agencia digital AI-first' },
    line: {
      en: 'AI-first digital agency and the innovation arm of PECH Group.',
      es: 'Agencia digital AI-first y brazo de innovación de PECH Group.',
    },
  },
];
