export interface ProductColor {
  name: string;
  hex: string;
}

export interface DTFSpecs {
  resolution: string;
  finishing: string;
  stretch: string;
  durability: string;
}

export interface SizeDimension {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: 'hoodies' | 'tees' | 'crewnecks' | 'essentials' | 'jerseys';
  price: number;
  currency: string;
  tag?: string;
  featured?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  dimensions: SizeDimension[];
  description: string;
  fabric: string;
  fit: string;
  dtfSpecs: DTFSpecs;
  careInstructions: string[];
  inStock: boolean;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'kln-tee-pink-logo',
    code: 'KLN-T01',
    name: 'Kalon Pink Logo Black Heavyweight Tee',
    subtitle: 'Heavyweight Cotton 240 GSM & Bold Pink DTF Chest Typography',
    category: 'tees',
    price: 520,
    currency: 'MXN',
    tag: 'POPULAR',
    featured: true,
    images: [
      '/images/kalon_black_tee_1794005505058.jpg',
      '/images/kalon_tee_acidwash_1793643977767.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Washed Charcoal', hex: '#2A2A2A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
      { size: 'XXL', chest: '66 cm', length: '80 cm', sleeve: '26 cm' },
    ],
    description:
      'Remera streetwear contemporánea en algodón peinado premium de 240 GSM. Gráfico tipográfico central KALON en tono rosa neón mate impreso mediante tecnología DTF de micro-resolución sin rigidez al tacto.',
    fabric: '100% Algodón Peinado Ring-Spun 240 GSM preencogido',
    fit: 'Boxy / Drop-Shoulder Relaxed Fit con cuello grueso de 3 cm',
    dtfSpecs: {
      resolution: 'Estampado digital DTF a 300 DPI con saturación cromática exacta',
      finishing: 'Polvo de poliamida japonesa de tacto suave mate sin brillo sintético',
      stretch: 'Resistencia a tracción elástica sin cuarteado ni fisuras',
      durability: 'Garantizado por más de 50 ciclos de lavado continuo sin pérdida de color',
    },
    careInstructions: [
      'Lavar la prenda del revés con agua fría (máx 30°C)',
      'No usar blanqueadores ni detergentes abrasivos',
      'Secado en sombra o tender en plano',
      'Planchar siempre del revés o con un paño sobre el estampado',
    ],
    inStock: true,
  },
  {
    id: 'kln-tee-ochre-logo',
    code: 'KLN-T02',
    name: 'Kalon Ochre Logo White Boxy Tee',
    subtitle: 'Heavyweight Pure White Cotton & Warm Ochre DTF Typography',
    category: 'tees',
    price: 520,
    currency: 'MXN',
    tag: 'BEST SELLER',
    featured: true,
    images: [
      '/images/kalon_white_tee_1794005524760.jpg',
      '/images/kalon_tee_white_1793722594473.jpg',
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Bone White', hex: '#F2EFEB' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
      { size: 'XXL', chest: '66 cm', length: '80 cm', sleeve: '26 cm' },
    ],
    description:
      'Remera blanca de silueta recta y hombros caídos confeccionada en algodón cardado de 260 GSM. Gráfico tipográfico en ocre cálido realizado con termofusión DTF de tacto sedoso y durabilidad comprobada.',
    fabric: '100% Algodón Pesado 260 GSM con tratamiento soft-touch',
    fit: 'Streetwear Boxy Fit estructurado',
    dtfSpecs: {
      resolution: 'Resolución fotográfica a 300 DPI con base blanca de alta opacidad',
      finishing: 'Acabado mate aterciopelado',
      stretch: 'Adhesión molecular flexible a fibras de algodón grueso',
      durability: 'Colores inalterables frente a sudor, sol y lavados constantes',
    },
    careInstructions: [
      'Lavar con prendas claras o blancas',
      'No retorcer en el área del estampado',
      'Evitar secadora mecánica para preservar la elasticidad',
    ],
    inStock: true,
  },
  {
    id: 'kln-jersey-black',
    code: 'KLN-J03',
    name: 'Kalon Gothic Crest Black Streetwear Tee',
    subtitle: 'Streetwear Jersey Silhouette with White Gothic DTF & Crest',
    category: 'jerseys',
    price: 580,
    currency: 'MXN',
    tag: 'EDICIÓN ESPECIAL',
    featured: true,
    images: [
      '/images/kalon_black_jersey_1794005543943.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Dark Shadow', hex: '#222222' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '55 cm', length: '71 cm', sleeve: '23 cm' },
      { size: 'M', chest: '58 cm', length: '73 cm', sleeve: '24 cm' },
      { size: 'L', chest: '61 cm', length: '75 cm', sleeve: '25 cm' },
      { size: 'XL', chest: '64 cm', length: '77 cm', sleeve: '26 cm' },
    ],
    description:
      'Silueta híbrida streetwear / jersey deportivo urbano en tejido técnico transpirable de alto gramaje. Gráficos tipográficos en fuente gótica frontal y escudo KALON en micro-resolución DTF.',
    fabric: 'Interlock técnico de algodón peinado y microfibra 250 GSM',
    fit: 'Sport Streetwear Relaxed Fit con cuello redondo bicolor',
    dtfSpecs: {
      resolution: 'Vectorización precisa con definición de líneas ultrafinas de 0.4mm',
      finishing: 'Tacto satinado deportivo sin fricción en el pecho',
      stretch: 'Poliamida elástica apta para movimiento y roce continuo',
      durability: 'Garantía anti-desprendimiento y anti-pilling',
    },
    careInstructions: [
      'Lavado delicado en frío',
      'Secado al aire libre en sombra',
      'No planchar directamente sobre el escudo',
    ],
    inStock: true,
  },
  {
    id: 'kln-jersey-white',
    code: 'KLN-J04',
    name: 'Kalon Arch Gothic Red White Streetwear Tee',
    subtitle: 'Drop-Shoulder Silhouette with Crimson Gothic DTF Graphic',
    category: 'jerseys',
    price: 580,
    currency: 'MXN',
    tag: 'NUEVO',
    featured: true,
    images: [
      '/images/kalon_white_jersey_1794005569075.jpg',
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '55 cm', length: '71 cm', sleeve: '23 cm' },
      { size: 'M', chest: '58 cm', length: '73 cm', sleeve: '24 cm' },
      { size: 'L', chest: '61 cm', length: '75 cm', sleeve: '25 cm' },
      { size: 'XL', chest: '64 cm', length: '77 cm', sleeve: '26 cm' },
    ],
    description:
      'Remera de inspiración sportswear contemporánea con gráfico gótico en arco en color rojo carmesí brillante sobre base blanca pura. Cuello con detalle sutil y escudo bordado/estampado de la marca.',
    fabric: '100% Algodón Premium 250 GSM de fibra larga',
    fit: 'Boxy Drop-Shoulder',
    dtfSpecs: {
      resolution: 'Pigmentos textiles de máxima saturación cromática',
      finishing: 'Fijación por prensa neumática a 160°C con acabado sedoso mate',
      stretch: 'Curado en túnel infrarrojo para máxima cohesión',
      durability: 'Certificación Oeko-Tex libre de solventes pesados',
    },
    careInstructions: [
      'Lavar del revés con prendas claras',
      'No usar lejía',
      'Secar en plano',
    ],
    inStock: true,
  },
  {
    id: 'kln-hoodie-nocturne',
    code: 'KLN-H05',
    name: 'Oversized Hoodie "Nocturne" 420 GSM',
    subtitle: 'Heavyweight Fleece & Minimalist Chest Typography DTF',
    category: 'hoodies',
    price: 890,
    currency: 'MXN',
    tag: 'SIGNATURE',
    featured: true,
    images: [
      '/images/kalon_black_hoodie_1794005586893.jpg',
      '/images/kalon_hoodie_nocturne_1793643976853.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Washed Charcoal', hex: '#2A2A2A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '58 cm', length: '70 cm', sleeve: '62 cm' },
      { size: 'M', chest: '61 cm', length: '73 cm', sleeve: '64 cm' },
      { size: 'L', chest: '64 cm', length: '76 cm', sleeve: '66 cm' },
      { size: 'XL', chest: '67 cm', length: '78 cm', sleeve: '68 cm' },
      { size: 'XXL', chest: '70 cm', length: '80 cm', sleeve: '69 cm' },
    ],
    description:
      'Buzo con capucha confeccionado en felpa pesada de 420 GSM con caída arquitectónica impecable. Gráfico tipográfico central en blanco tiza sobre negro profundo, con capucha doble sin cordones para un perfil minimalista limpio.',
    fabric: '100% Algodón Peinado Heavyweight 420 GSM, interior perchado térmico',
    fit: 'Boxy / Drop-Shoulder Oversized',
    dtfSpecs: {
      resolution: 'Estampado digital DTF a 300 DPI de máxima nitidez',
      finishing: 'Polvo de poliamida elástica de tacto suave mate sin brillo',
      stretch: 'Resistencia a tracción elástica sin cuarteado ni fisuras',
      durability: 'Garantizado por más de 50 ciclos de lavado continuo',
    },
    careInstructions: [
      'Lavar la prenda del revés en agua fría',
      'No usar secadora mecánica',
      'Secar en plano o percha acolchada',
    ],
    inStock: true,
  },
  {
    id: 'kln-crewneck-bone',
    code: 'KLN-C06',
    name: 'Boxy Minimal Crewneck "Bone Chalk"',
    subtitle: '380 GSM Heavy French Terry & Clean Monochrome Typography',
    category: 'crewnecks',
    price: 780,
    currency: 'MXN',
    tag: 'EDITORIAL',
    featured: true,
    images: [
      '/images/kalon_cream_crewneck_1794005600123.jpg',
      '/images/kalon_crewneck_bone_1793643978140.jpg',
    ],
    colors: [
      { name: 'Bone Chalk', hex: '#EAE7DF' },
      { name: 'Heather Grey', hex: '#7D8287' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '56 cm', length: '68 cm', sleeve: '61 cm' },
      { size: 'M', chest: '59 cm', length: '71 cm', sleeve: '63 cm' },
      { size: 'L', chest: '62 cm', length: '74 cm', sleeve: '65 cm' },
      { size: 'XL', chest: '65 cm', length: '76 cm', sleeve: '66 cm' },
    ],
    description:
      'Sudadera de cuello redondo con proporciones arquitectónicas inspiradas en el minimalismo industrial. Estampado geométrico central en tinta negra mate profunda con líneas perfectamente definidas gracias a la micro-precisión DTF.',
    fabric: '80% Algodón Peinado / 20% Poliéster Antipilling 380 GSM',
    fit: 'Boxy cropped length, hombros caídos sutiles',
    dtfSpecs: {
      resolution: 'Definición de líneas ultrafinas con micropigmentos hidrofugados',
      finishing: 'Tacto imperceptible sobre tejido de punto cerrado',
      stretch: 'Curado en túnel infrarrojo para máxima cohesión',
      durability: 'Garantía antimanchas y anti-desprendimiento',
    },
    careInstructions: [
      'Lavado a máquina ciclo delicado',
      'Secado en percha a la sombra',
      'No aplicar plancha directa sobre el diseño',
    ],
    inStock: true,
  },
  {
    id: 'kln-tee-acidwash',
    code: 'KLN-T07',
    name: 'Kalon Acid Wash Charcoal Graphic Tee',
    subtitle: 'Mineral Washed Heavy Cotton 250 GSM & Micro DTF Print',
    category: 'tees',
    price: 540,
    currency: 'MXN',
    tag: 'LIMITED',
    featured: true,
    images: [
      '/images/kalon_tee_acidwash_1793643977767.jpg',
      '/images/kalon_black_tee_1794005505058.jpg',
    ],
    colors: [
      { name: 'Acid Mineral Charcoal', hex: '#333333' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
    ],
    description: 'Remera con lavado ácido artesanal que otorga una textura visual única a cada pieza. Algodón de 250 GSM con cuello acanalado grueso y fijación DTF.',
    fabric: '100% Algodón Peinado Acid-Washed 250 GSM',
    fit: 'Boxy Heavyweight',
    dtfSpecs: {
      resolution: '300 DPI micro-precisión',
      finishing: 'Tacto cero rigidez',
      stretch: 'Poliamida japonesa flexible',
      durability: '+50 ciclos garantizados',
    },
    careInstructions: ['Lavar en frío', 'No usar blanqueador', 'Secar a la sombra'],
    inStock: true,
  },
  {
    id: 'kln-tee-minimal-white',
    code: 'KLN-T08',
    name: 'Kalon Arch Monogram Pure White Tee',
    subtitle: 'Classic Streetwear Boxy Fit with High Density DTF Chest Print',
    category: 'tees',
    price: 520,
    currency: 'MXN',
    tag: 'ESSENTIAL',
    featured: true,
    images: [
      '/images/kalon_tee_white_1793722594473.jpg',
      '/images/kalon_white_tee_1794005524760.jpg',
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
      { size: 'XXL', chest: '66 cm', length: '80 cm', sleeve: '26 cm' },
    ],
    description: 'Básico streetwear de gramaje alto en algodón peinado blanco óptico con logotipo minimalista en el pecho impreso en termo-adhesión DTF.',
    fabric: '100% Algodón Ring-Spun 240 GSM',
    fit: 'Relaxed Drop-Shoulder',
    dtfSpecs: {
      resolution: 'Estampado digital 300 DPI',
      finishing: 'Mate satinado',
      stretch: 'Elasticidad textil',
      durability: 'Color permanente',
    },
    careInstructions: ['Lavar del revés', 'Secar en plano', 'Planchar con paño'],
    inStock: true,
  },
  {
    id: 'kln-hoodie-graphite',
    code: 'KLN-H09',
    name: 'Oversized Hoodie "Graphite Heavy" 420 GSM',
    subtitle: '420 GSM Thermal French Terry & Monogram DTF Print',
    category: 'hoodies',
    price: 890,
    currency: 'MXN',
    tag: 'HEAVYWEIGHT',
    featured: true,
    images: [
      '/images/kalon_hoodie_graphite_1793722613699.jpg',
      '/images/kalon_black_hoodie_1794005586893.jpg',
    ],
    colors: [
      { name: 'Graphite Grey', hex: '#444444' },
      { name: 'Pitch Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '58 cm', length: '70 cm', sleeve: '62 cm' },
      { size: 'M', chest: '61 cm', length: '73 cm', sleeve: '64 cm' },
      { size: 'L', chest: '64 cm', length: '76 cm', sleeve: '66 cm' },
      { size: 'XL', chest: '67 cm', length: '78 cm', sleeve: '68 cm' },
    ],
    description: 'Buzo con capucha en tono grafito mineral con silueta arquitectónica y felpa pesada de 420 GSM para climas fríos y uso diario.',
    fabric: '100% Algodón Peinado Perchado 420 GSM',
    fit: 'Boxy Drop-Shoulder',
    dtfSpecs: {
      resolution: 'Fijación por prensa neumática 300 DPI',
      finishing: 'Tacto suave sin rigidez',
      stretch: 'Resistencia anti-cuarteado',
      durability: 'Máxima resistencia al lavado',
    },
    careInstructions: ['Lavar en frío', 'No usar secadora', 'Secar en plano'],
    inStock: true,
  },
  {
    id: 'kln-jersey-boleta-black',
    code: 'KLN-J10',
    name: 'Kalon Boleta Vintage Black Jersey Tee',
    subtitle: 'Sportswear Streetwear Hybrid with Retro Typography DTF',
    category: 'jerseys',
    price: 590,
    currency: 'MXN',
    tag: 'VINTAGE',
    featured: true,
    images: [
      '/images/kalon_black_jersey_1794005543943.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '55 cm', length: '71 cm', sleeve: '23 cm' },
      { size: 'M', chest: '58 cm', length: '73 cm', sleeve: '24 cm' },
      { size: 'L', chest: '61 cm', length: '75 cm', sleeve: '25 cm' },
      { size: 'XL', chest: '64 cm', length: '77 cm', sleeve: '26 cm' },
    ],
    description: 'Inspiración deportiva urbana de los años 90 con tipografía de alto contraste sobre interlock técnico sedoso de 250 GSM.',
    fabric: 'Interlock técnico de tacto sedoso 250 GSM',
    fit: 'Sporty Boxy Relaxed',
    dtfSpecs: {
      resolution: 'Vectorizado exacto 300 DPI',
      finishing: 'Satinado mate',
      stretch: 'Elástico multidireccional',
      durability: 'Anti-desprendimiento',
    },
    careInstructions: ['Lavar en frío', 'No planchar estampado'],
    inStock: true,
  },
  {
    id: 'kln-crewneck-minimal-black',
    code: 'KLN-C11',
    name: 'Industrial Minimal Crewneck "Obsidian" 380 GSM',
    subtitle: '380 GSM Antipilling French Terry & Back Typography DTF',
    category: 'crewnecks',
    price: 780,
    currency: 'MXN',
    tag: 'ATELIER',
    featured: true,
    images: [
      '/images/kalon_cream_crewneck_1794005600123.jpg',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '56 cm', length: '68 cm', sleeve: '61 cm' },
      { size: 'M', chest: '59 cm', length: '71 cm', sleeve: '63 cm' },
      { size: 'L', chest: '62 cm', length: '74 cm', sleeve: '65 cm' },
      { size: 'XL', chest: '65 cm', length: '76 cm', sleeve: '66 cm' },
    ],
    description: 'Sudadera cuello redondo en felpa francesa perchada con proporciones boxy y detalles tipográficos de precisión milimétrica.',
    fabric: '80% Algodón / 20% Poliéster Antipilling 380 GSM',
    fit: 'Boxy Cropped Length',
    dtfSpecs: {
      resolution: 'Micro-pigmentación 300 DPI',
      finishing: 'Tacto cero',
      stretch: 'Termoadhesión neumática',
      durability: '50+ lavados garantizados',
    },
    careInstructions: ['Lavar del revés', 'Secar a la sombra'],
    inStock: true,
  },
  {
    id: 'kln-tee-nocturne-black',
    code: 'KLN-T12',
    name: 'Kalon Classic Logo Pitch Black Heavy Tee',
    subtitle: 'Heavyweight Cotton 240 GSM with High Density White DTF Print',
    category: 'tees',
    price: 520,
    currency: 'MXN',
    tag: 'CORE',
    featured: true,
    images: [
      '/images/kalon_black_tee_1794005505058.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
      { size: 'XXL', chest: '66 cm', length: '80 cm', sleeve: '26 cm' },
    ],
    description: 'La silueta esencial de la marca: corte ancho relajado, hombros caídos y tipografía central KALON en blanco mate de alto gramaje.',
    fabric: '100% Algodón Peinado Ring-Spun 240 GSM',
    fit: 'Boxy Drop-Shoulder',
    dtfSpecs: {
      resolution: 'Estampado digital 300 DPI',
      finishing: 'Mate aterciopelado',
      stretch: 'Alta flexibilidad elástica',
      durability: 'Garantizado contra cuarteado',
    },
    careInstructions: ['Lavar en frío del revés', 'Secar en plano'],
    inStock: true,
  },
];

export const BRAND_CONFIG = {
  name: 'KALON',
  tagline: 'DIRECT TO FILM TEXTILE & MODERN STREETWEAR',
  currency: 'MXN',
  defaultWhatsApp: '+52 55 8124 9301',
  shippingPolicy: 'Envíos a todo el país. Entrega express de 2 a 5 días hábiles.',
  dtfQualityBadge: 'TECNOLOGÍA DTF ULTRA-HD CERTIFICADA',
  logoAsset: '/logo.svg',
};
