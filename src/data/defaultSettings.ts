import { SiteSettings, CategoryItem } from '../types/admin';
import { BRAND_CONFIG } from './products';

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'tees',
    label: 'T-SHIRTS',
    title: 'T-Shirts',
    desc: 'Explora las remeras streetwear KALON: siluetas boxy y cortes relajados contemporáneos creados para quienes buscan piezas con presencia, peso textil y un enfoque global del streetwear.',
    expanded: 'Algodón ring-spun preencogido de 240 a 260 GSM con cuellos acanalados indeformables de 3 cm y tratamientos artesanos de lavado ácido mineral.',
    enabled: true,
  },
  {
    id: 'hoodies',
    label: 'HOODIES',
    title: 'Hoodies',
    desc: 'Buzos con capucha de confección pesada en felpa perchada de 420 GSM: corte oversized drop-shoulder con caída estructurada y estampados de tacto cero rigidez.',
    expanded: 'Capuchas dobles sin cordones para un perfil minimalista limpio, bolsillo canguro geométrico y termoadhesión elástica de poliamida japonesa.',
    enabled: true,
  },
  {
    id: 'jerseys',
    label: 'JERSEYS',
    title: 'Jerseys',
    desc: 'Siluetas inspiradas en el fútbol vintage y sportswear urbano con gráfico gótico y escudo KALON en micropigmentación DTF de máxima definición.',
    expanded: 'Interlock técnico de tacto sedoso y transpirabilidad superior con cuello bicolor indeformable y garantía antimanchas.',
    enabled: true,
  },
  {
    id: 'crewnecks',
    label: 'CREWNECKS',
    title: 'Crewnecks',
    desc: 'Sudaderas de cuello redondo con proporciones arquitectónicas inspiradas en el minimalismo industrial: líneas limpias y estampados tipográficos de alta definición.',
    expanded: 'Tejido de punto cerrado antipilling de 380 GSM con elasticidad multidireccional y pigmentos textiles ecológicos certificados libres de solventes.',
    enabled: true,
  },
  {
    id: 'essentials',
    label: 'ESSENTIALS',
    title: 'Sets & Essentials',
    desc: 'Conjuntos vanguardistas y prendas de layering monocromo para un look streetwear editorial de alto impacto.',
    expanded: 'Piezas sastre combinables con buzos térmicos y monograma KALON termo-adherido de tacto satinado.',
    enabled: true,
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'KALON',
  whatsAppNumber: BRAND_CONFIG.defaultWhatsApp,
  announcementBar: {
    left: 'ENVÍOS GRATIS EN COMPRAS > $999 MXN',
    center: 'EDICIÓN LIMITADA 2025 · STREETWEAR MONOCROMO',
  },
  promoBanner: {
    title: 'ENVÍOS GRATIS EN COMPRAS MAYORES A $999 MXN',
    subtitle: 'Despacho asegurado a toda la república con número de rastreo',
  },
  dtfCustomCta: {
    title: 'Atención Directa & Pedidos Personalizados',
    subtitle: 'Coordinamos tallas especiales, envíos express y pedidos especiales.',
    buttonText: 'CONTACTAR POR WHATSAPP',
  },
  heroSlides: [
    {
      id: 'slide-1',
      kicker: 'COLECCIÓN 2025',
      watermark: 'KALON',
      title: 'STREETWEAR ATELIER',
      subtitle: 'EDICIÓN MONOCROMO // DROP-SHOULDER & HEAVYWEIGHT',
      image: '/images/kalon_hero_editorial_1793643978452.jpg',
      badge: 'DROP 01 // 2025',
    },
    {
      id: 'slide-2',
      kicker: 'EDICIÓN LIMITADA',
      watermark: 'ATELIER',
      title: 'ELEVATED ESSENTIALS',
      subtitle: 'CONFECCIÓN PESADA // ALGODÓN 420 GSM',
      image: '/assets/aistudio/ba5ab13e7c1c06d05697ff377e4ea0bd_2ab4a93d.jpg',
      badge: 'DROP 02 // 2025',
    },
  ],
  lookbookItems: [
    {
      id: 'look-1',
      lookNumber: 'LOOK 01 // 2025',
      title: 'Oversized Trench & Layered Hood',
      subtitle: 'OVERSIZED HOOD & TAILORED CUT',
      image: '/assets/aistudio/ba5ab13e7c1c06d05697ff377e4ea0bd_2ab4a93d.jpg',
    },
    {
      id: 'look-2',
      lookNumber: 'LOOK 02 // 2025',
      title: 'Monochrome Tailored Aesthetics',
      subtitle: 'MINIMALIST MONOCHROME SET',
      image: '/assets/aistudio/a5606fe086f9fe2e32bff25510d2a7e7_a365da45.jpg',
    },
    {
      id: 'look-3',
      lookNumber: 'LOOK 03 // 2025',
      title: 'Urban Underground Heavy Fleece',
      subtitle: 'HEAVY FLEECE 420 GSM',
      image: '/assets/aistudio/604d1c40b09155ff5b16ae20efac2880_aa3fe14d.jpg',
    },
  ],
  dtfFeatures: [
    {
      number: '01 //',
      title: 'TINTAS AL AGUA CERTIFICADAS',
      desc: 'Pigmentos textiles de máxima saturación cromática, con blancos de alta opacidad y sin solventes tóxicos.',
    },
    {
      number: '02 //',
      title: 'POLIAMIDA ULTRA-FLEXIBLE',
      desc: 'El termoadhesivo se fusiona a nivel molecular con el algodón; se estira sin quebrarse ni despegarse.',
    },
    {
      number: '03 //',
      title: 'MICRO-RESOLUCIÓN A 300 DPI',
      desc: 'Detalles hiper-finos, degradados suaves y tipografías nítidas que la serigrafía tradicional no logra igualar.',
    },
    {
      number: '04 //',
      title: 'DURABILIDAD COMPROBADA',
      desc: 'Resiste más de 50 lavados domésticos manteniendo la viveza de los colores y su tacto mate sedoso.',
    },
  ],
  categories: DEFAULT_CATEGORIES,
};
