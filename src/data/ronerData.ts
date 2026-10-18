import { RocookGeneralRule, RonerEntry } from '@/types/roner';

export const ROCOOK_RULES: RocookGeneralRule[] = [
  {
    id: 'rule-temp-entrada',
    title: 'Temperatura de entrada a 5 °C',
    shortText: 'Partir de frío de nevera (5 °C)',
    detail:
      'Los tiempos de cocción están calibrados para alimentos que entran al baño a 5 °C (temperatura estándar de refrigeración). Si la pieza está a temperatura ambiente, los tiempos deben acortarse.',
    iconName: 'snow-outline',
  },
  {
    id: 'rule-marcado-final',
    title: 'Marcado final (Reacción de Maillard)',
    shortText: 'Sellado relámpago post-baño',
    detail:
      'Muchas piezas (sobre todo carnes y pescados) precisan un marcado final muy vivo en sartén o soplete (apenas 15-30 s por cara a >140 °C) para aportar corteza caoba, aromas tostados y el toque visual.',
    iconName: 'flame-outline',
  },
  {
    id: 'rule-medio-liquido',
    title: 'Temperatura del medio líquido',
    shortText: 'Medición en el agua del Roner',
    detail:
      'Las temperaturas indicadas corresponden a la temperatura en grados Celsius (°C) del agua en circulación continua dentro del baño de cocción.',
    iconName: 'water-outline',
  },
  {
    id: 'rule-dos-opciones',
    title: 'Doble alternativa de cocción',
    shortText: '2 opciones con resultados equivalentes',
    detail:
      'Cuando aparecen dos combinaciones temperatura/tiempo, se indican dos alternativas con resultados sensoriales similares: menor temperatura para máxima melosidad y jugosidad prolongada vs. temperatura superior para servicio más rápido.',
    iconName: 'git-branch-outline',
  },
];

export const RONER_ENTRIES: RonerEntry[] = [
  // ==========================================
  // CARNES (50 ºC - 80 ºC)
  // Cocciones Directas: Cocinar y servir
  // ==========================================
  {
    id: 'carne-entrecot-chuleton',
    name: 'Entrecot / Chuletón de ternera',
    category: 'Carnes',
    portionOrWeight: '400 g',
    mode: 'Directa',
    searRecommended: true,
    options: [
      { temperatureC: 55, time: '1 h', notes: 'Al punto menos / jugoso supremo' },
      { temperatureC: 65, time: '25 min', notes: 'Cocción más rápida / al punto' },
    ],
    notes: 'Secar muy bien y dar sellado final de 20 s por cara en sartén de hierro muy caliente.',
  },
  {
    id: 'carne-lomo-cordero',
    name: 'Lomo de cordero (chuleta)',
    category: 'Carnes',
    portionOrWeight: '160 g',
    mode: 'Directa',
    searRecommended: true,
    options: [
      { temperatureC: 55, time: '20 min', notes: 'Punto rosado suave' },
      { temperatureC: 65, time: '15 min', notes: 'Punto tradicional' },
    ],
  },
  {
    id: 'carne-magret-pato',
    name: 'Magret de pato',
    category: 'Carnes',
    portionOrWeight: '200 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '25 min' }],
    notes: 'Dorar la piel en sartén tras el baño para fundir la grasa y dejarla crujiente.',
  },
  {
    id: 'carne-solomillo-cerdo',
    name: 'Solomillo de cerdo',
    category: 'Carnes',
    portionOrWeight: '400 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '25 min' }],
    notes: 'Sellado relámpago con mantequilla avellanada y hierbas tras el baño.',
  },
  {
    id: 'carne-solomillo-ternera-punto',
    name: 'Solomillo de ternera - al punto',
    category: 'Carnes',
    portionOrWeight: '180 g',
    mode: 'Directa',
    searRecommended: true,
    options: [
      { temperatureC: 55, time: '22 min' },
      { temperatureC: 65, time: '15 min' },
    ],
  },
  {
    id: 'carne-solomillo-ternera-poco-hecho',
    name: 'Solomillo de ternera - poco hecho',
    category: 'Carnes',
    portionOrWeight: '180 g',
    mode: 'Directa',
    searRecommended: true,
    options: [
      { temperatureC: 55, time: '18 min' },
      { temperatureC: 65, time: '12 min' },
    ],
  },
  {
    id: 'carne-suprema-pichon',
    name: 'Suprema de pichón',
    category: 'Carnes',
    portionOrWeight: '160 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 62, time: '30 min' }],
    notes: 'Carne roja delicada, punto de sangre perfecto estilo alta gastronomía.',
  },
  {
    id: 'carne-suprema-pularda',
    name: 'Suprema de pularda',
    category: 'Carnes',
    portionOrWeight: '220 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '35 min' }],
  },
  {
    id: 'carne-suprema-pollo',
    name: 'Suprema de pollo',
    category: 'Carnes',
    portionOrWeight: '160 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '30 min' }],
    notes: 'Pechuga 100% jugosa sin fibras secas.',
  },
  {
    id: 'carne-suprema-pollo-caserio',
    name: 'Suprema de pollo de caserío',
    category: 'Carnes',
    portionOrWeight: '220 g',
    mode: 'Directa',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '45 min' }],
    notes: 'Carne de ave de mayor firmeza muscular que requiere 15 min extra.',
  },

  // ==========================================
  // CARNES (Cocciones Indirectas: Posibilidad de conservar)
  // ==========================================
  {
    id: 'carne-alitas-pollo',
    name: 'Alitas de pollo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '3 h', notes: 'Melosidad extrema' },
      { temperatureC: 80, time: '1 h', notes: 'Cocción más rápida' },
    ],
    notes: 'Posibilidad de abatir en agua con hielo y reservar en frío. Golpe de horno o fritura para dorar.',
  },
  {
    id: 'carne-carrillera-cerdo',
    name: 'Carrillera de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '24 h', notes: 'Textura gelatinosa perfecta' },
      { temperatureC: 80, time: '8 h', notes: 'Cocción tradicional acelerada' },
    ],
  },
  {
    id: 'carne-carrillera-vaca-ternera',
    name: 'Carrillera de vaca / ternera',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '48 h', notes: 'Colágeno transformado en gelatina fundente' },
      { temperatureC: 80, time: '24 h', notes: 'Más rápida, deshebrable' },
    ],
    notes: 'La cocción de 48 horas a 65 °C es uno de los sellos icónicos de El Celler de Can Roca.',
  },
  {
    id: 'carne-chuletas-costillar-cerdo',
    name: 'Chuletas / Costillar entero de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '18 h' },
      { temperatureC: 80, time: '8 h' },
    ],
  },
  {
    id: 'carne-cochinillo',
    name: 'Cochinillo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '24 h', notes: 'Carne sedosa que se deshace' },
      { temperatureC: 80, time: '12 h' },
    ],
    notes: 'Horno precalentado a 220 °C durante 10 min para suflar la piel y dejarla de cristal.',
  },
  {
    id: 'carne-codillo-cerdo',
    name: 'Codillo de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '24 h' },
      { temperatureC: 80, time: '10 h' },
    ],
  },
  {
    id: 'carne-codorniz-entera',
    name: 'Codorniz entera',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [{ temperatureC: 65, time: '2 h 30 min' }],
  },
  {
    id: 'carne-cuello-cordero',
    name: 'Cuello de cordero',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '24 h' },
      { temperatureC: 80, time: '12 h' },
    ],
  },
  {
    id: 'carne-llana-jarrete-morcillo',
    name: 'Llana / Jarrete / Morcillo de ternera',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '36 h', notes: 'Máxima melosidad y retención de jugos' },
      { temperatureC: 80, time: '16 h' },
    ],
  },
  {
    id: 'carne-manitas-cerdo',
    name: 'Manitas de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '48 h' },
      { temperatureC: 80, time: '24 h' },
    ],
  },
  {
    id: 'carne-morro-oreja-cerdo',
    name: 'Morro / Oreja de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    options: [
      { temperatureC: 65, time: '36 h' },
      { temperatureC: 80, time: '18 h' },
    ],
  },
  {
    id: 'carne-muslo-pato',
    name: 'Muslo de pato',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '20 h', notes: 'Confitado de textura excelsa' },
      { temperatureC: 80, time: '10 h' },
    ],
  },
  {
    id: 'carne-muslo-pato-caneton',
    name: 'Muslo de pato canetón',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '8 h' },
      { temperatureC: 80, time: '3 h' },
    ],
  },
  {
    id: 'carne-muslo-pollo',
    name: 'Muslo de pollo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '3 h' },
      { temperatureC: 80, time: '1 h 30 min' },
    ],
  },
  {
    id: 'carne-muslo-pollo-caserio',
    name: 'Muslo de pollo de caserío',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '10 h' },
      { temperatureC: 80, time: '3 h' },
    ],
  },
  {
    id: 'carne-paletilla-cabrito',
    name: 'Paletilla de cabrito',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '18 h' },
      { temperatureC: 80, time: '8 h' },
    ],
  },
  {
    id: 'carne-paletilla-cordero',
    name: 'Paletilla de cordero',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '24 h', notes: 'Melosa, carne rosada y untuosa' },
      { temperatureC: 80, time: '10 h', notes: 'Estilo guiso deshebrable' },
    ],
  },
  {
    id: 'carne-papada-cerdo',
    name: 'Papada de cerdo',
    category: 'Carnes',
    mode: 'Indirecta',
    searRecommended: true,
    options: [
      { temperatureC: 65, time: '24 h' },
      { temperatureC: 80, time: '10 h' },
    ],
    notes: 'Textura de mantequilla pura, terminar con soplete o plancha fuerte.',
  },

  // ==========================================
  // PESCADO (50 ºC - 60 ºC)
  // ==========================================
  {
    id: 'pescado-atun',
    name: 'Atún',
    category: 'Pescado',
    portionOrWeight: '150 g',
    options: [{ temperatureC: 50, time: '15 min' }],
    notes: 'Textura sedosa inigualable. Opcional marcado relámpago exterior de 5 s.',
  },
  {
    id: 'pescado-atun-ventresca',
    name: 'Atún (ventresca)',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 50, time: '10 min' }],
    notes: 'La grasa infiltrada funde a 50 °C dejándola tierna y jugosa.',
  },
  {
    id: 'pescado-bacalao',
    name: 'Bacalao',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 55, time: '15 min' }],
    notes: 'Las lascas se separan solas al tacto sin perder una gota de colágeno.',
  },
  {
    id: 'pescado-caballa',
    name: 'Caballa',
    category: 'Pescado',
    portionOrWeight: '90 g',
    options: [{ temperatureC: 50, time: '8 min' }],
  },
  {
    id: 'pescado-lenguado-entero',
    name: 'Lenguado entero',
    category: 'Pescado',
    portionOrWeight: '300 g',
    options: [{ temperatureC: 55, time: '15 min' }],
  },
  {
    id: 'pescado-lenguado-filetes',
    name: 'Lenguado a filetes',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 55, time: '5 min' }],
  },
  {
    id: 'pescado-lubina',
    name: 'Lubina',
    category: 'Pescado',
    portionOrWeight: '150 g',
    options: [{ temperatureC: 60, time: '15 min' }],
  },
  {
    id: 'pescado-merluza',
    name: 'Merluza',
    category: 'Pescado',
    portionOrWeight: '150 g',
    options: [{ temperatureC: 60, time: '15 min' }],
    notes: 'Punto perfecto de cocción donde las láminas conservan brillo y humedad translúcida.',
  },
  {
    id: 'pescado-pez-espada',
    name: 'Pez espada',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 50, time: '15 min' }],
  },
  {
    id: 'pescado-rape',
    name: 'Rape',
    category: 'Pescado',
    portionOrWeight: '150 g',
    options: [{ temperatureC: 60, time: '15 min' }],
    notes: 'Mantiene textura firme y tersa sin encogerse.',
  },
  {
    id: 'pescado-raya',
    name: 'Raya',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 55, time: '5 min' }],
  },
  {
    id: 'pescado-salmon',
    name: 'Salmón',
    category: 'Pescado',
    portionOrWeight: '120 g',
    options: [{ temperatureC: 50, time: '15 min' }],
    notes: 'Evita la exudación de albúmina blanca manteniendo textura mi-cuit sublime.',
  },
  {
    id: 'pescado-salmonete',
    name: 'Salmonete',
    category: 'Pescado',
    portionOrWeight: '90 g',
    options: [{ temperatureC: 55, time: '5 min' }],
  },

  // ==========================================
  // MARISCO (55 ºC - 100 ºC)
  // ==========================================
  {
    id: 'marisco-almejas',
    name: 'Almejas',
    category: 'Marisco',
    portionOrWeight: 'Medianas',
    options: [{ temperatureC: 100, time: '1 min 30 s - 4 min' }],
    notes: 'Se abren en su propio jugo con sabor marino puro.',
  },
  {
    id: 'marisco-berberechos',
    name: 'Berberechos',
    category: 'Marisco',
    portionOrWeight: 'Medianos',
    options: [{ temperatureC: 100, time: '1 min 30 s - 2 min' }],
  },
  {
    id: 'marisco-calamares',
    name: 'Calamares',
    category: 'Marisco',
    portionOrWeight: 'Pequeños',
    options: [{ temperatureC: 55, time: '7 min' }],
    notes: 'Textura suave y tierna, cero chiclosa.',
  },
  {
    id: 'marisco-mejillones',
    name: 'Mejillones',
    category: 'Marisco',
    portionOrWeight: 'Medianos',
    options: [{ temperatureC: 90, time: '3 min' }],
  },
  {
    id: 'marisco-mejillones-roca',
    name: 'Mejillones de roca',
    category: 'Marisco',
    portionOrWeight: 'Pequeños',
    options: [{ temperatureC: 80, time: '4 min' }],
  },
  {
    id: 'marisco-pulpo',
    name: 'Pulpo',
    category: 'Marisco',
    portionOrWeight: '4 kg',
    options: [
      { temperatureC: 100, time: '1 h', notes: 'Método rápido al vacío' },
      { temperatureC: 90, time: '2 h', notes: 'Equilibrio perfecto' },
      { temperatureC: 80, time: '4 h', notes: 'Máxima terneza y piel intacta' },
    ],
    notes: 'Envasar al vacío sin agua; suelta su propio jugo que se convierte en una gelatina sabrosísima.',
  },
  {
    id: 'marisco-sepia',
    name: 'Sepia',
    category: 'Marisco',
    portionOrWeight: 'Pequeña',
    options: [{ temperatureC: 55, time: '20 min' }],
  },

  // ==========================================
  // VERDURAS Y HORTALIZAS (85 ºC - 100 ºC)
  // ==========================================
  {
    id: 'verdura-acelga',
    name: 'Acelga',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '15 min' },
      { temperatureC: 100, time: '8 min' },
    ],
  },
  {
    id: 'verdura-ajos-frescos',
    name: 'Ajos frescos',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '25 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'verdura-alcachofa',
    name: 'Alcachofa',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '30 - 45 min' },
      { temperatureC: 100, time: '27 min' },
    ],
    notes: 'Envasar con aceite de oliva virgen extra y unas gotas de limón para preservar el color.',
  },
  {
    id: 'verdura-apio-rabano',
    name: 'Apio rábano',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '9 min' },
    ],
  },
  {
    id: 'verdura-boniato',
    name: 'Boniato',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'verdura-calabacin',
    name: 'Calabacín',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '15 min' },
      { temperatureC: 100, time: '4 min' },
    ],
  },
  {
    id: 'verdura-calabacin-baby',
    name: 'Calabacín baby',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '20 min' },
      { temperatureC: 100, time: '5 min' },
    ],
  },
  {
    id: 'verdura-calabaza',
    name: 'Calabaza',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '15 min' },
      { temperatureC: 100, time: '6 min' },
    ],
  },
  {
    id: 'verdura-cardos',
    name: 'Cardos',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '2 h' },
      { temperatureC: 100, time: '40 min' },
    ],
  },
  {
    id: 'verdura-champinones',
    name: 'Champiñones',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '16 min' },
      { temperatureC: 100, time: '7 min' },
    ],
  },
  {
    id: 'verdura-chirivias',
    name: 'Chirivías',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '20 min' },
      { temperatureC: 100, time: '8 min' },
    ],
  },
  {
    id: 'verdura-col-hojas',
    name: 'Col (hojas)',
    category: 'Verduras y Hortalizas',
    options: [{ temperatureC: 100, time: '12 min' }],
  },
  {
    id: 'verdura-col-tallos',
    name: 'Col (tallos)',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '35 min' },
      { temperatureC: 100, time: '20 min' },
    ],
  },
  {
    id: 'verdura-coliflor',
    name: 'Coliflor',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '40 min' },
      { temperatureC: 100, time: '12 min' },
    ],
  },
  {
    id: 'verdura-endivias',
    name: 'Endivias',
    category: 'Verduras y Hortalizas',
    options: [{ temperatureC: 85, time: '30 min - 3 h' }],
  },
  {
    id: 'verdura-esparrago-blanco',
    name: 'Espárrago blanco',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '18 min' },
    ],
  },
  {
    id: 'verdura-esparrago-blanco-extra',
    name: 'Espárrago blanco extra',
    category: 'Verduras y Hortalizas',
    options: [{ temperatureC: 85, time: '2 h 30 min' }],
    notes: 'Calibre grueso especial; cocción lenta para textura fundente sin hebras.',
  },
  {
    id: 'verdura-esparrago-verde',
    name: 'Espárrago verde',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '24 min' },
      { temperatureC: 100, time: '8 min' },
    ],
  },
  {
    id: 'verdura-espinaca',
    name: 'Espinaca',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '24 min' },
      { temperatureC: 100, time: '5 min' },
    ],
  },
  {
    id: 'verdura-guisante-congelado',
    name: 'Guisante congelado',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '15 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'verdura-haba-congelada',
    name: 'Haba congelada',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '20 min' },
      { temperatureC: 100, time: '15 min' },
    ],
  },
  {
    id: 'verdura-hinojo',
    name: 'Hinojo',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '50 min' },
      { temperatureC: 100, time: '24 min' },
    ],
  },
  {
    id: 'verdura-nabo',
    name: 'Nabo',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '15 min' },
      { temperatureC: 100, time: '12 min' },
    ],
  },
  {
    id: 'verdura-nabo-negro',
    name: 'Nabo negro',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '25 min' },
      { temperatureC: 100, time: '14 min' },
    ],
  },
  {
    id: 'verdura-patata-pelada-entera',
    name: 'Patata pelada entera',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '45 min' },
      { temperatureC: 100, time: '30 min' },
    ],
  },
  {
    id: 'verdura-patata-laminada',
    name: 'Patata laminada',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '25 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'verdura-petsay-col-china',
    name: 'Petsay (col china)',
    category: 'Verduras y Hortalizas',
    options: [{ temperatureC: 85, time: '6 min' }],
  },
  {
    id: 'verdura-remolacha-dados',
    name: 'Remolacha a dados',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '1 h 15 min' },
      { temperatureC: 100, time: '35 min' },
    ],
  },
  {
    id: 'verdura-remolacha-entera',
    name: 'Remolacha entera',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '2 h 30 min' },
      { temperatureC: 100, time: '1 h' },
    ],
  },
  {
    id: 'verdura-salsifi',
    name: 'Salsifí',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '2 h' },
      { temperatureC: 100, time: '45 min' },
    ],
  },
  {
    id: 'verdura-zanahoria',
    name: 'Zanahoria',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '45 min' },
      { temperatureC: 100, time: '12 min' },
    ],
  },
  {
    id: 'verdura-zanahoria-baby',
    name: 'Zanahoria baby',
    category: 'Verduras y Hortalizas',
    options: [
      { temperatureC: 85, time: '16 min' },
      { temperatureC: 100, time: '7 min' },
    ],
  },

  // ==========================================
  // LEGUMBRES Y CEREALES (90 ºC - 100 ºC)
  // ==========================================
  {
    id: 'legumbre-avena',
    name: 'Avena',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '1 h 15 min' }],
  },
  {
    id: 'legumbre-cebada',
    name: 'Cebada',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '2 h' }],
  },
  {
    id: 'legumbre-garbanzos',
    name: 'Garbanzos',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '3 h 30 min - 4 h' }],
    notes: 'Remojo previo de 12 h. La cocción en bolsa al vacío evita que se despellejen.',
  },
  {
    id: 'legumbre-judias',
    name: 'Judías',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '3 h - 3 h 30 min' }],
  },
  {
    id: 'legumbre-lentejas',
    name: 'Lentejas',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '40 - 45 min' }],
    notes: 'Quedan enteras e intactas con textura cremosa en el interior.',
  },
  {
    id: 'legumbre-quinoa',
    name: 'Quinoa',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '20 min' }],
  },
  {
    id: 'legumbre-trigo',
    name: 'Trigo',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '3 h' }],
  },
  {
    id: 'legumbre-trigo-sarraceno',
    name: 'Trigo sarraceno',
    category: 'Legumbres y Cereales',
    options: [{ temperatureC: 100, time: '25 min' }],
  },

  // ==========================================
  // FRUTA (85 ºC - 100 ºC)
  // ==========================================
  {
    id: 'fruta-cereza',
    name: 'Cereza',
    category: 'Fruta',
    options: [{ temperatureC: 85, time: '5 - 7 min' }],
  },
  {
    id: 'fruta-ciruela',
    name: 'Ciruela',
    category: 'Fruta',
    options: [{ temperatureC: 85, time: '15 min' }],
  },
  {
    id: 'fruta-fresas',
    name: 'Fresas',
    category: 'Fruta',
    options: [{ temperatureC: 85, time: '5 - 7 min' }],
  },
  {
    id: 'fruta-fresas-sobrecoccion',
    name: 'Fresas (sobrecocción controlada)',
    category: 'Fruta',
    options: [{ temperatureC: 85, time: '2 h' }],
    notes: 'Técnica Rocook: rompe suavemente la pectina concentrando todo el néctar y aroma puro de la fruta.',
  },
  {
    id: 'fruta-frutos-rojos',
    name: 'Frutos rojos',
    category: 'Fruta',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '5 min' },
    ],
  },
  {
    id: 'fruta-manzana',
    name: 'Manzana',
    category: 'Fruta',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'fruta-manzana-sobrecoccion',
    name: 'Manzana (sobrecocción controlada)',
    category: 'Fruta',
    options: [{ temperatureC: 85, time: '2 h' }],
    notes: 'Textura traslúcida y compotada sin triturar, manteniendo la forma entera impecable.',
  },
  {
    id: 'fruta-melocoton',
    name: 'Melocotón',
    category: 'Fruta',
    options: [
      { temperatureC: 85, time: '1 h' },
      { temperatureC: 100, time: '20 min' },
    ],
  },
  {
    id: 'fruta-pera',
    name: 'Pera',
    category: 'Fruta',
    options: [
      { temperatureC: 85, time: '30 min' },
      { temperatureC: 100, time: '10 min' },
    ],
  },
  {
    id: 'fruta-pina',
    name: 'Piña',
    category: 'Fruta',
    options: [
      { temperatureC: 85, time: '45 min' },
      { temperatureC: 100, time: '30 min' },
    ],
    notes: 'Inactiva la bromelina manteniendo un bocado jugosísimo con almíbar osmótico.',
  },
  {
    id: 'fruta-platano',
    name: 'Plátano',
    category: 'Fruta',
    options: [{ temperatureC: 60, time: '20 min' }],
    notes: '60 °C conserva la textura firme sin oscurecerse ni deshacerse.',
  },
];
