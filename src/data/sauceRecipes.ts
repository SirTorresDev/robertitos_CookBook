import { Recipe } from '@/types/cookbook';

export const SAUCE_RECIPES: Recipe[] = [
  // ========================================================
  // 10. SALSA BASE (SALSA MADRE ASIÁTICA)
  // ========================================================
  {
    id: 'salsa-base-madre-asiatica',
    code: 'SAL-10',
    title: 'Salsa Base (Salsa Madre Asiática)',
    subtitle:
      'Emulsión directa en frío en biberón de soja, vinagres de arroz blanco y negro, salsa de pescado, miel y doble umami de shiitake y hondashi',
    category: 'Salsas',
    difficulty: 'Fácil',
    prepTimeMinutes: 5,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'No requiere cocción. Aporta un golpe inmediato de umami donde la potencia de la soja queda equilibrada por el ácido del vinagre y el dulzor de la miel. Guárdala siempre en la nevera para tenerla lista al instante.',
    pairing:
      'Todoterreno para fideos, arroz frito, verduras salteadas, pollo asado o pescado.',
    isFavorite: true,
    createdAt: '2026-11-17T20:00:00Z',
    ingredients: [
      { id: 'sb-1', name: 'Salsa de soja', amount: 200, unit: 'ml' },
      { id: 'sb-2', name: 'Vinagre de arroz blanco', amount: 50, unit: 'ml' },
      { id: 'sb-3', name: 'Vinagre de arroz negro', amount: 50, unit: 'ml' },
      { id: 'sb-4', name: 'Salsa de pescado', amount: 50, unit: 'ml' },
      {
        id: 'sb-5',
        name: 'Miel',
        amount: 100,
        unit: 'ml',
        notes: 'De 50 a 150 ml según el dulzor deseado',
      },
      {
        id: 'sb-6',
        name: 'Polvo de setas shiitake',
        amount: 1,
        unit: 'cdta',
        notes: 'Potenciador natural de umami',
      },
      {
        id: 'sb-7',
        name: 'Polvo de dashi (Hondashi)',
        amount: 1,
        unit: 'cdta',
        notes: 'Caldo japonés en polvo',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Introducción directa en biberón de cocina',
        instruction:
          'Introduce todos los ingredientes directamente en un biberón de cocina (botella dispensadora): los 200 ml de salsa de soja, 50 ml de vinagre de arroz blanco, 50 ml de vinagre de arroz negro, 50 ml de salsa de pescado, entre 50 y 150 ml de miel (según el dulzor deseado), el polvo de setas shiitake y el polvo de dashi (hondashi).',
        timerSeconds: 60,
      },
      {
        stepNumber: 2,
        title: 'Agitado e integración en frío',
        instruction:
          'Cierra el biberón y agita enérgicamente hasta integrar por completo la miel y los polvos umami sin necesidad de cocción. Guarda siempre en la nevera para tenerla lista al instante.',
        timerSeconds: 60,
        tip: 'Agita ligeramente el biberón antes de cada uso para resuspender el polvo de shiitake y dashi.',
      },
    ],
  },

  // ========================================================
  // 9. SOPA / SALSA LAKSA (MÉTODO POR INFUSIÓN)
  // ========================================================
  {
    id: 'salsa-laksa-metodo-infusion',
    code: 'SAL-09',
    title: 'Sopa / Salsa Laksa (Método por Infusión)',
    subtitle:
      'Reducción cremosa de caldo de pollo y leche de coco infusionada con el fuego apagado con hierba limón, lima kaffir, albahaca, chalotas y camarones secos',
    category: 'Salsas',
    difficulty: 'Media',
    prepTimeMinutes: 35,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Infusionar en crudo con el fuego apagado (en lugar de hacer un sofrito previo con jengibre y aromáticos) preserva intacta la frescura herbal. No superes el tiempo de infusión o los aromáticos frescos empezarán a estropearse y darán mal sabor. Todos los ingredientes específicos se consiguen fácilmente en tiendas asiáticas (como las de la calle General Margallo en Madrid).',
    pairing: 'Platos de fideos al estilo del sudeste asiático.',
    isFavorite: true,
    createdAt: '2026-11-17T20:01:00Z',
    ingredients: [
      { id: 'sl-1', name: 'Caldo de pollo', amount: 800, unit: 'ml' },
      { id: 'sl-2', name: 'Leche de coco', amount: 400, unit: 'ml' },
      {
        id: 'sl-3',
        name: 'Hierba limón (lemongrass)',
        amount: 2,
        unit: 'tallos',
        notes: 'Previamente cortada y machacada',
      },
      { id: 'sl-4', name: 'Hojas de lima kaffir', amount: 5, unit: 'ud' },
      { id: 'sl-5', name: 'Hojas de albahaca fresca', amount: 15, unit: 'g' },
      { id: 'sl-6', name: 'Chalotas', amount: 3, unit: 'ud' },
      { id: 'sl-7', name: 'Camarones secos sazonados', amount: 20, unit: 'g' },
      { id: 'sl-8', name: 'Sal', amount: 1, unit: 'pizca' },
      {
        id: 'sl-9',
        name: 'Chile picante y pasta Tom Yum',
        amount: 1,
        unit: 'cdta',
        notes: 'Opcional',
      },
      {
        id: 'sl-10',
        name: 'Salsa Base (Salsa Madre Asiática #10)',
        amount: 15,
        unit: 'ml',
        notes: 'Opcional: un chorrito para multiplicar el umami',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Reducción a fuego vivo de caldo y leche de coco',
        instruction:
          'Reduce a fuego vivo los 800 ml de caldo de pollo junto con los 400 ml de leche de coco hasta que concentre el sabor y adquiera una textura cremosa pero ligera.',
        timerSeconds: 720,
        temperature: 'Fuego vivo',
      },
      {
        stepNumber: 2,
        title: 'Incorporación de aromáticos con el fuego apagado',
        instruction:
          'Apaga el fuego para detener el hervor. Añade la hierba limón previamente cortada y machacada, las hojas de lima kaffir, la albahaca, las chalotas y los camarones secos (y opcionalmente chile picante y pasta Tom Yum).',
        timerSeconds: 60,
        temperature: 'Fuego apagado',
      },
      {
        stepNumber: 3,
        title: 'Infusión tapada con papel film (10 a 20 min)',
        instruction:
          'Tapa con papel film y deja infusionar entre 10 y 20 minutos.',
        timerSeconds: 900,
        tip: 'No superes el tiempo de infusión o los aromáticos frescos empezarán a estropearse y darán mal sabor.',
      },
      {
        stepNumber: 4,
        title: 'Colado exprimiendo y toque de Salsa Base #10',
        instruction:
          'Cuela exprimiendo hasta la última gota, añade un toque de la Salsa Base #10 para multiplicar el umami y rectifica de sal.',
        timerSeconds: 120,
      },
    ],
  },

  // ========================================================
  // 8. BEURRE BLANC (CON TOQUE SECRETO DE FUMET)
  // ========================================================
  {
    id: 'beurre-blanc-toque-secreto-fumet',
    code: 'SAL-08',
    title: 'Beurre Blanc (con Toque Secreto de Fumet)',
    subtitle:
      'Doble reducción estricta a 50 ml de vino blanco, chalotas en juliana fina y caldo de pescado emulsionada a fuego mínimo con mantequilla fría',
    category: 'Salsas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 25,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Es vital reducir el líquido a solo 50 ml porque ni el vino ni el caldo de pescado tienen suficiente colágeno o proteínas para emulsionar por sí solos; si dejas demasiado líquido, necesitarías una cantidad excesiva de mantequilla para darle cuerpo. Controla la temperatura: si el fuego está alto, la mantequilla se funde de golpe y la salsa se corta. Busca una textura ligera, no demasiado espesa.',
    pairing: 'Pescados como rodaballo, bacalao o merluza.',
    isFavorite: true,
    createdAt: '2026-11-17T20:02:00Z',
    ingredients: [
      { id: 'bb-1', name: 'Vino blanco', amount: 250, unit: 'ml' },
      {
        id: 'bb-2',
        name: 'Chalotas',
        amount: 5,
        unit: 'ud',
        notes: '4 o 5 chalotas cortadas por la mitad y en juliana fina',
      },
      {
        id: 'bb-3',
        name: 'Caldo de pescado (fumet)',
        amount: 250,
        unit: 'ml',
        notes: 'El 4.º ingrediente secreto',
      },
      {
        id: 'bb-4',
        name: 'Mantequilla fría cortada en cubos',
        amount: 150,
        unit: 'g',
      },
      { id: 'bb-5', name: 'Sal', amount: 1, unit: 'pizca', notes: 'Salar al final' },
      {
        id: 'bb-6',
        name: 'Eneldo o azafrán',
        amount: 1,
        unit: 'pizca',
        notes: 'Opcional para personalizar',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Primera reducción de vino blanco y chalotas a 50 ml',
        instruction:
          'Pon en un cazo los 250 ml de vino blanco con las chalotas cortadas por la mitad y luego en juliana fina. Reduce hasta que queden solo 50 ml.',
        timerSeconds: 480,
      },
      {
        stepNumber: 2,
        title: 'Segunda reducción con caldo de pescado a 50 ml y colado',
        instruction:
          'Vierte los 250 ml de caldo de pescado y vuelve a reducir hasta regresar a unos 50 ml totales. Cuela el líquido.',
        timerSeconds: 480,
        tip: 'Reducir a solo 50 ml es imprescindible para emulsionar sin requerir exceso de mantequilla.',
      },
      {
        stepNumber: 3,
        title: 'Emulsión a fuego mínimo (nivel 1 o 2 sobre 9)',
        instruction:
          'Pon el fuego al mínimo (nivel 1 o 2 sobre 9) e incorpora los cubos de mantequilla fría poco a poco sin dejar de remover para que emulsione con el agua propia de la mantequilla. Salar al final (y añadir eneldo o azafrán opcionalmente).',
        timerSeconds: 240,
        temperature: 'Fuego 1–2 / 9',
        tip: 'Si el fuego está alto, la mantequilla se funde de golpe y la salsa se corta.',
      },
    ],
  },

  // ========================================================
  // 7. SALSA DE JUGOS DE POLLO ASADO EMULSIONADA
  // ========================================================
  {
    id: 'salsa-jugos-pollo-asado-emulsionada',
    code: 'SAL-07',
    title: 'Salsa de Jugos de Pollo Asado Emulsionada',
    subtitle:
      'Jugos de bandeja de pollo asado a 180 °C aromatizados con tomillo, romero y limón asado, emulsionados con goma xantana y AOVE',
    category: 'Salsas',
    difficulty: 'Media',
    prepTimeMinutes: 75,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Si no tienes goma xantana, hierve el caldo colado y lígalo con maicena disuelta en agua sin dejar de remover (tarda un poco más, pero deja una textura incluso mejor). Truco extra mencionado del curso del autor: salmuera previa y mantequilla de hierbas bajo la piel de la pechuga antes de hornear.',
    pairing:
      'Pollo asado (especialmente para hacer jugosa la pechuga) y carnes blancas.',
    isFavorite: true,
    createdAt: '2026-11-17T20:03:00Z',
    ingredients: [
      { id: 'sjp-1', name: 'Pollo para asar', amount: 1, unit: 'ud' },
      { id: 'sjp-2', name: 'Cubitos de caldo de pollo congelado', amount: 4, unit: 'ud' },
      { id: 'sjp-3', name: 'Vino blanco', amount: 150, unit: 'ml' },
      { id: 'sjp-4', name: 'Ramitas de tomillo y romero', amount: 4, unit: 'ud' },
      { id: 'sjp-5', name: 'Limón partido por la mitad', amount: 1, unit: 'ud' },
      {
        id: 'sjp-6',
        name: 'Goma xantana (o maicena disuelta en agua)',
        amount: 1,
        unit: 'cdta',
      },
      {
        id: 'sjp-7',
        name: 'Aceite de oliva virgen extra (AOVE)',
        amount: 2,
        unit: 'cda',
        notes: 'Para emulsionar al final',
      },
      { id: 'sjp-8', name: 'Aceite y sal para el asado', amount: 15, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Asado del pollo a 180 °C',
        instruction:
          'Asa el pollo a 180 °C con aceite, sal, los cubitos de caldo de pollo congelado y los 150 ml de vino blanco hasta dorar al gusto.',
        timerSeconds: 3000,
        temperature: '180 °C',
        tip: 'Truco extra: salmuera previa y mantequilla de hierbas bajo la piel de la pechuga antes de hornear.',
      },
      {
        stepNumber: 2,
        title: 'Horneado aromático de los jugos (15 min)',
        instruction:
          'Saca el pollo, añade a la bandeja el tomillo, el romero y el limón partido por la mitad, y hornea 15 minutos más para profundizar el sabor de los jugos.',
        timerSeconds: 900,
        temperature: '180 °C',
      },
      {
        stepNumber: 3,
        title: 'Colado y emulsión con batidora de mano',
        instruction:
          'Cuela todos los jugos de la bandeja, exprime el jugo de medio limón asado y tritura con batidora de mano añadiendo la cucharadita de goma xantana y las 2 cucharadas de AOVE para emulsionar con la propia grasa del pollo.',
        timerSeconds: 120,
        tip: 'Si no tienes xantana, hierve el caldo colado y lígalo con maicena disuelta en agua sin dejar de remover.',
      },
    ],
  },

  // ========================================================
  // 6. SALSA MEUNIÈRE (VERSIÓN LIGADA CON COLÁGENO)
  // ========================================================
  {
    id: 'salsa-meuniere-ligada-colageno',
    code: 'SAL-06',
    title: 'Salsa Meunière (Versión Ligada con Colágeno)',
    subtitle:
      'Mantequilla noisette con aroma a avellana, alcaparras encurtidas, zumo de limón y emulsión natural con el colágeno del caldo de pescado reducido',
    category: 'Salsas',
    difficulty: 'Media',
    prepTimeMinutes: 15,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'No lleva nada de harina ni almidón; la cremosidad se logra únicamente emulsionando la grasa de la mantequilla tostada con la alta concentración de colágeno del caldo de pescado reducido. El ácido del limón y las alcaparras es indispensable para cortar la pesadez de la grasa.',
    pairing: 'Pescados marcados a la sartén.',
    isFavorite: true,
    createdAt: '2026-11-17T20:04:00Z',
    ingredients: [
      { id: 'sm-1', name: 'Mantequilla en cubos', amount: 200, unit: 'g' },
      { id: 'sm-2', name: 'Alcaparras encurtidas', amount: 3, unit: 'cda' },
      { id: 'sm-3', name: 'Zumo de medio limón', amount: 25, unit: 'ml' },
      {
        id: 'sm-4',
        name: 'Caldo de pescado',
        amount: 250,
        unit: 'ml',
        notes: 'Previamente reducido a la mitad',
      },
      { id: 'sm-5', name: 'Sal y pimienta', amount: 1, unit: 'pizca' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tostado de la mantequilla noisette',
        instruction:
          'En la misma sartén de marcar el pescado, calienta los 200 g de mantequilla a fuego medio-bajo removiendo constantemente con varillas hasta que los sólidos lácteos se tuesten y huela a avellana (mantequilla noisette).',
        timerSeconds: 240,
        temperature: 'Fuego medio-bajo',
      },
      {
        stepNumber: 2,
        title: 'Adición de alcaparras y zumo de limón',
        instruction:
          'Baja el fuego al nivel 4 de 9, añade las 3 cucharadas de alcaparras unos segundos y vierte el zumo de medio limón.',
        timerSeconds: 30,
        temperature: 'Fuego 4 / 9',
      },
      {
        stepNumber: 3,
        title: 'Reducción cremosa con el caldo concentrado',
        instruction:
          'Sube el fuego, incorpora el caldo de pescado ya concentrado y deja reducir hasta lograr una textura cremosa. Salpimienta al gusto.',
        timerSeconds: 180,
        temperature: 'Fuego vivo',
      },
    ],
  },

  // ========================================================
  // 5. SALSA BEARNESA
  // ========================================================
  {
    id: 'salsa-bearnesa-clasica',
    code: 'SAL-05',
    title: 'Salsa Bearnesa',
    subtitle:
      'Emulsión tibia al baño maría de yemas de huevo, limón y mantequilla derretida en hilo con chalota muy fina y eneldo fresco',
    category: 'Salsas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 20,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Regla de oro de temperatura: el agua de la olla nunca debe hervir y debes poder tocar el fondo del bol con la mano sin quemarte. No hace falta clarificar la mantequilla, basta con vigilar que no esté demasiado caliente al integrarla. Su combinación de acidez, eneldo, chalota y cremosidad recuerda al perfil de sabor de la salsa Big Mac.',
    pairing:
      'Filetes de carne, pollo asado, pescado, huevos escalfados o cocidos y sándwiches.',
    isFavorite: true,
    createdAt: '2026-11-17T20:05:00Z',
    ingredients: [
      { id: 'sbe-1', name: 'Yemas de huevo', amount: 2, unit: 'ud' },
      { id: 'sbe-2', name: 'Zumo de medio limón', amount: 20, unit: 'ml' },
      { id: 'sbe-3', name: 'Agua', amount: 2, unit: 'cda' },
      {
        id: 'sbe-4',
        name: 'Mantequilla derretida',
        amount: 150,
        unit: 'g',
        notes: 'No demasiado caliente al integrarla',
      },
      { id: 'sbe-5', name: 'Chalota picada muy fina', amount: 1, unit: 'ud' },
      { id: 'sbe-6', name: 'Eneldo fresco picado fino', amount: 10, unit: 'g' },
      { id: 'sbe-7', name: 'Sal', amount: 1, unit: 'pizca' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparación del baño maría desde frío',
        instruction:
          'Prepara un baño maría colocando un bol sobre una olla con agua (el agua jamás debe tocar el fondo del bol). Pon en el bol en frío las yemas, el limón y las 2 cucharadas de agua. Enciende entonces el fuego a temperatura media.',
        timerSeconds: 60,
        temperature: 'Fuego medio (sin hervir)',
      },
      {
        stepNumber: 2,
        title: 'Cocción suave y batido de las yemas',
        instruction:
          'Bate sin parar hasta que las yemas cocinen y adquieran una textura espesa y suave.',
        timerSeconds: 300,
        tip: 'El agua de la olla nunca debe hervir y debes poder tocar el fondo del bol con la mano sin quemarte.',
      },
      {
        stepNumber: 3,
        title: 'Emulsión en hilo fuera del fuego y aromáticos',
        instruction:
          'Apaga el fuego e incorpora la mantequilla derretida en hilo sin dejar de batir hasta lograr una emulsión espesa. Termina mezclando la chalota picada muy fina, el eneldo y la sal.',
        timerSeconds: 180,
      },
    ],
  },

  // ========================================================
  // 4. MAYONESA BASE Y DE AUTOR
  // ========================================================
  {
    id: 'mayonesa-base-y-de-autor',
    code: 'SAL-04',
    title: 'Mayonesa Base y de Autor',
    subtitle:
      'Salsa madre emulsionada de huevo, mostaza, limón y aceite de oliva suave personalizable con chipotle, miso, alga nori o aceite de hierbas',
    category: 'Salsas',
    difficulty: 'Fácil',
    prepTimeMinutes: 10,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Es una salsa madre cuyo verdadero potencial está en la personalización; usar un aceite de hierbas (especialmente de albahaca) o añadir chipotle o miso transforma una emulsión básica en una salsa de restaurante en segundos.',
    pairing:
      'Cualquier plato frío o caliente, bocadillos, pescados, patatas y verduras.',
    isFavorite: true,
    createdAt: '2026-11-17T20:06:00Z',
    ingredients: [
      { id: 'mb-1', name: 'Huevo', amount: 1, unit: 'ud' },
      { id: 'mb-2', name: 'Mostaza', amount: 1, unit: 'cdta' },
      { id: 'mb-3', name: 'Zumo de medio limón', amount: 20, unit: 'ml' },
      {
        id: 'mb-4',
        name: 'Aceite de oliva suave',
        amount: 200,
        unit: 'ml',
        notes: 'O sustituir por aceite infusionado de albahaca o cebollino',
      },
      { id: 'mb-5', name: 'Sal', amount: 1, unit: 'pizca' },
      {
        id: 'mb-6',
        name: 'Variación de autor (chile chipotle adobado, pasta de miso o alga nori)',
        amount: 1,
        unit: 'cdta',
        notes: 'Opcional',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Emulsión de la mayonesa base',
        instruction:
          'Emulsiona el huevo, la cucharadita de mostaza, el zumo de medio limón y la sal añadiendo el aceite de oliva suave poco a poco hasta conseguir el cuerpo deseado.',
        timerSeconds: 90,
      },
      {
        stepNumber: 2,
        title: 'Personalización de autor (opcional)',
        instruction:
          'Personaliza la emulsión incorporando chile chipotle adobado, pasta de miso o alga nori, o bien elaborándola directamente con aceite infusionado de albahaca o cebollino.',
        timerSeconds: 30,
      },
    ],
  },

  // ========================================================
  // 3. PESTO DE PISTACHO AL MORTERO
  // ========================================================
  {
    id: 'pesto-pistacho-mortero',
    code: 'SAL-03',
    title: 'Pesto de Pistacho al Mortero',
    subtitle:
      'Majado secuencial por fases en mortero de ajo, pistachos, Parmesano o Grana Padano, hojas de albahaca fresca y aceite de oliva en hilo',
    category: 'Salsas',
    difficulty: 'Fácil',
    prepTimeMinutes: 20,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Nunca uses procesador de alimentos: las cuchillas cortan pero no aplastan las celdas de los ingredientes como el mortero. Ir vaciando el mortero por fases evita que los ingredientes se amontonen y permite extraer todos los aceites esenciales. Truco de rescate: si echas el aceite muy rápido y el pesto se corta, añade 20 ml de agua y remueve para recuperar la emulsión cremosa.',
    pairing:
      'Pasta, pizza, sándwiches, pollo frito, ensaladas, risotto o guarnición de pescados.',
    isFavorite: true,
    createdAt: '2026-11-17T20:07:00Z',
    ingredients: [
      { id: 'ppm-1', name: 'Pistachos pelados', amount: 80, unit: 'g' },
      { id: 'ppm-2', name: 'Queso Parmesano o Grana Padano', amount: 60, unit: 'g' },
      { id: 'ppm-3', name: 'Hojas de albahaca fresca', amount: 50, unit: 'g' },
      { id: 'ppm-4', name: 'Ajo', amount: 1, unit: 'diente' },
      { id: 'ppm-5', name: 'Aceite de oliva', amount: 100, unit: 'ml' },
      { id: 'ppm-6', name: 'Sal', amount: 1, unit: 'pizca' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Machacado de ajo y polvo grueso de pistachos',
        instruction:
          'Machaca en el mortero el ajo con un poco de sal hasta formar una pasta. Añade los pistachos, machácalos hasta lograr un polvo grueso y retíralos del mortero.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Triturado del queso y pasta húmeda de albahaca',
        instruction:
          'Tritura el queso Parmesano o Grana Padano en el mortero hasta hacerlo polvo y retíralo también. A continuación, machaca las hojas de albahaca fresca hasta obtener una pasta húmeda.',
        timerSeconds: 240,
        tip: 'Vaciar el mortero por fases evita que los ingredientes se amontonen y extrae todos los aceites esenciales.',
      },
      {
        stepNumber: 3,
        title: 'Reincorporación y emulsión con aceite en hilo',
        instruction:
          'Reincorpora poco a poco los ingredientes secos reservados sobre la pasta de albahaca y, finalmente, vierte el aceite en hilo removiendo suavemente para emulsionar.',
        timerSeconds: 120,
        tip: 'Truco de rescate: si echas el aceite muy rápido y el pesto se corta, añade 20 ml de agua y remueve para recuperar la emulsión cremosa.',
      },
    ],
  },

  // ========================================================
  // 2. SALSA CREMOSA DE CACAHUETE PICANTE
  // ========================================================
  {
    id: 'salsa-cremosa-cacahuete-picante',
    code: 'SAL-02',
    title: 'Salsa Cremosa de Cacahuete Picante',
    subtitle:
      'Emulsión rápida de mantequilla de cacahuete, miel, chili oil, aceite de sésamo, mayonesa japonesa Kewpie, vinagre de arroz y soja',
    category: 'Salsas',
    difficulty: 'Fácil',
    prepTimeMinutes: 10,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Si la usas para ensalada de pepino en rodajas, pon primero el pepino con sal durante 10 minutos para que sude y suelte el agua antes de aliñar; si te saltas este paso, el pepino soltará líquido después y dejará la salsa aguada.',
    pairing:
      'Ensalada de pepino, fideos, pasta o como marinada para carne picada y pollo a la plancha.',
    isFavorite: true,
    createdAt: '2026-11-17T20:08:00Z',
    ingredients: [
      { id: 'scp-1', name: 'Mantequilla de cacahuete', amount: 3, unit: 'cda' },
      { id: 'scp-2', name: 'Miel', amount: 2, unit: 'cda' },
      {
        id: 'scp-3',
        name: 'Aceite de chile picante (chili oil)',
        amount: 1,
        unit: 'cda',
      },
      { id: 'scp-4', name: 'Aceite de sésamo', amount: 1, unit: 'cda' },
      {
        id: 'scp-5',
        name: 'Mayonesa japonesa (Kewpie)',
        amount: 1,
        unit: 'cdta',
        notes: 'Opcional',
      },
      { id: 'scp-6', name: 'Vinagre de arroz', amount: 2, unit: 'cda' },
      { id: 'scp-7', name: 'Salsa de soja', amount: 2, unit: 'cda' },
      { id: 'scp-8', name: 'Sal', amount: 1, unit: 'pizca' },
      {
        id: 'scp-9',
        name: 'Semillas de sésamo',
        amount: 1,
        unit: 'cda',
        notes: 'Para espolvorear al servir',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mezcla y emulsión en bol',
        instruction:
          'Mezcla todos los ingredientes en un bol (mantequilla de cacahuete, miel, aceite de chile picante, aceite de sésamo, mayonesa Kewpie opcional, vinagre de arroz y salsa de soja) hasta obtener una crema homogénea.',
        timerSeconds: 120,
      },
      {
        stepNumber: 2,
        title: 'Ajuste de sal y acabado con sésamo',
        instruction:
          'Ajusta de sal al gusto y termina espolvoreando semillas de sésamo al servir.',
        timerSeconds: 60,
        tip: 'Para ensalada de pepino: deja sudar el pepino con sal 10 minutos antes de aliñar para evitar que agüe la salsa.',
      },
    ],
  },

  // ========================================================
  // 1. SALSA PÉRIGUEUX (DEMI-GLACE AL PEDRO XIMÉNEZ Y TRUFA NEGRA)
  // ========================================================
  {
    id: 'salsa-perigueux-px-trufa-negra',
    code: 'SAL-01',
    title: 'Salsa Périgueux (Demi-glace al Pedro Ximénez y Trufa Negra)',
    subtitle:
      'Reducción en jarabe de Pedro Ximénez, vino tinto y caldo de carne casero gelatinoso, montada fuera del fuego con mantequilla y trufa negra picada',
    category: 'Salsas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 45,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Es obligatorio usar caldo de carne casero (el industrial carece de la gelatina natural necesaria para que la salsa se pegue a los labios). El Pedro Ximénez aporta un dulzor caramelizado que equilibra la acidez del vino tinto, la untuosidad de la mantequilla y el toque crujiente y terroso de la trufa.',
    pairing: 'Alta cocina de carnes rojas, especialmente Solomillo Rossini.',
    isFavorite: true,
    createdAt: '2026-11-17T20:09:00Z',
    ingredients: [
      { id: 'sp-1', name: 'Aceite', amount: 2, unit: 'cda' },
      { id: 'sp-2', name: 'Chalotas picadas muy finas', amount: 2, unit: 'ud' },
      {
        id: 'sp-3',
        name: 'Vino Pedro Ximénez',
        amount: 200,
        unit: 'ml',
        notes: 'Toque personal del autor',
      },
      { id: 'sp-4', name: 'Vino tinto', amount: 200, unit: 'ml' },
      {
        id: 'sp-5',
        name: 'Caldo de carne casero',
        amount: 500,
        unit: 'ml',
        notes: 'Obligatorio casero por su gelatina natural',
      },
      {
        id: 'sp-6',
        name: 'Mantequilla en cubos',
        amount: 4,
        unit: 'cubos',
        notes: '3 o 4 cubos para montar',
      },
      {
        id: 'sp-7',
        name: 'Trufa negra picada muy fina',
        amount: 15,
        unit: 'g',
        notes: 'En conserva o fresca de invierno',
      },
      { id: 'sp-8', name: 'Sal y pimienta', amount: 1, unit: 'pizca' },
      {
        id: 'sp-9',
        name: 'Maicena disuelta en agua',
        amount: 1,
        unit: 'cdta',
        notes: 'Opcional si le falta cuerpo',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pochado de las chalotas',
        instruction:
          'Pocha en un cazo las 2 chalotas picadas muy finas con las 2 cucharadas de aceite y una pizca de sal hasta que cambien ligeramente de color.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Reducción en jarabe del Pedro Ximénez y vino tinto',
        instruction:
          'Vierte los 200 ml de Pedro Ximénez y deja reducir hasta que espese como un jarabe. Añade los 200 ml de vino tinto y vuelve a reducir.',
        timerSeconds: 600,
      },
      {
        stepNumber: 3,
        title: 'Reducción a punto de demi-glace y colado',
        instruction:
          'Incorpora los 500 ml de caldo de carne casero, deja reducir hasta concentrar el sabor y lograr punto de demi-glace (textura que napa la cuchara) y cuela la salsa. (Si le falta cuerpo, lígala aquí con la cucharadita de maicena disuelta en agua).',
        timerSeconds: 900,
        tip: 'El caldo de carne casero aporta la gelatina natural imprescindible para que la demi-glace nape y se pegue a los labios.',
      },
      {
        stepNumber: 4,
        title: 'Montado con mantequilla y trufa negra fuera del fuego',
        instruction:
          'Apaga el fuego, monta la salsa añadiendo los 3 o 4 cubos de mantequilla sin dejar de remover, incorpora la trufa negra finamente picada y salpimienta.',
        timerSeconds: 120,
        temperature: 'Fuego apagado',
      },
    ],
  },
];
