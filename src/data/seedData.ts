import {
  Recipe,
  CookingTip,
  KitchenUtensil,
  FoodiePlace,
  GourmetProduct,
} from '@/types/cookbook';
import { COURSE_RECIPES } from './courseRecipes';
import { NEW_RECIPES } from './newCookbookRecipes';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'tataki-atun-5-0',
    code: '5.0',
    title: 'Tataki de Atún con Miel, Soja y Sésamo',
    subtitle: 'Sellado en bloque cuadrado y marinado osmótico de 2 horas con giros cada 30 min',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 135,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Sellar primero el lomo en forma de prisma cuadrado a fuego muy vivo para fijar el exterior manteniendo el centro crudo. Dar la vuelta religiosamente cada 30 minutos durante las 2h de marinado.',
    pairing: 'Manzana verde ácida, uva fresca, mojama en lascas o anchoa de calibre grande.',
    isFavorite: true,
    createdAt: '2026-10-17T10:00:00Z',
    ingredients: [
      { id: 'ta-1', name: 'Lomo de atún rojo (corte cuadrado)', amount: 500, unit: 'g', notes: 'Limpio de fibras' },
      { id: 'ta-2', name: 'Salsa de soja', amount: 300, unit: 'ml' },
      { id: 'ta-3', name: 'Miel', amount: 2, unit: 'cda', notes: 'Para fundir en cazo con la soja' },
      { id: 'ta-4', name: 'Salsa de pescado (Nam Pla)', amount: 2, unit: 'cda' },
      { id: 'ta-5', name: 'Vinagre de arroz', amount: 2, unit: 'cda' },
      { id: 'ta-6', name: 'Agua mineral', amount: 75, unit: 'ml' },
      { id: 'ta-7', name: 'Aceite de sésamo tostado', amount: 1, unit: 'cda' },
      { id: 'ta-8', name: 'Semillas de sésamo tostado', amount: 15, unit: 'g', notes: 'Para decorar por encima' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sellar el atún en bloque cuadrado',
        instruction:
          'Seca muy bien el lomo de atún con papel absorbente (superficie seca para reacción de Maillard >140 °C). Sella en sartén muy caliente apenas 15 segundos por cada una de las 4 caras para formar un cuadrado perfecto.',
        timerSeconds: 60,
        temperature: '>140 °C',
        tip: 'No salar antes de sellar para no extraer humedad.',
      },
      {
        stepNumber: 2,
        title: 'Emulsionar la marinada templada',
        instruction:
          'En un cazo pequeño, calienta suavemente la soja con las 2 cucharadas de miel hasta que la miel se derrita por completo. Retira del fuego y añade la salsa de pescado, el vinagre de arroz, el agua y el aceite de sésamo. Deja templar.',
        timerSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Marinado — Tramo 1 (Primeros 30 min)',
        instruction:
          'Introduce el bloque de atún sellado en un recipiente ajustado con la marinada fría/templada. Deja marinar 30 minutos por la primera cara.',
        timerSeconds: 1800,
        tip: 'Al sonar el timer, gira el lomo 90 grados para que marine uniforme.',
      },
      {
        stepNumber: 4,
        title: 'Marinado — Tramo 2 a 4 (Hasta completar 2 horas)',
        instruction:
          'Continúa dando la vuelta al atún cada 30 minutos hasta completar las 2 horas totales de marinado.',
        timerSeconds: 5400,
      },
      {
        stepNumber: 5,
        title: 'Trinchado fino y emplatado',
        instruction:
          'Retira el atún de la marinada, corta con cuchillo muy afilado en lonchas muy finas de un solo trazo, napa con un hilo de la propia marinada y corona con semillas de sésamo.',
      },
    ],
  },
  {
    id: 'risotto-bogavante-esparragos-5-6',
    code: '5.6',
    title: 'Risotto de Bogavante Sous-Vide y Espárragos',
    subtitle: 'Triple cocción en Roner (54 °C / 65 °C / 82 °C), fumet de coral con azafrán y mantecado fuera del fuego',
    category: 'Arroces y Cremas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 65,
    baseServings: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Cocinar por separado espárragos (82 °C), pinzas (65 °C) y cola (54 °C) garantiza la textura perfecta de cada elemento. Incorpora el bogavante justo al final para no sobrecocerlo.',
    isFavorite: true,
    createdAt: '2026-10-17T10:05:00Z',
    ingredients: [
      { id: 'rb-1', name: 'Bogavante entero (separar cola, pinzas y cabeza)', amount: 1, unit: 'ud', notes: 'Aprox. 650 g' },
      { id: 'rb-2', name: 'Arroz Carnaroli o Arborio', amount: 180, unit: 'g' },
      { id: 'rb-3', name: 'Espárragos verdes frescos', amount: 8, unit: 'ud' },
      { id: 'rb-4', name: 'Azafrán en hebras', amount: 0.5, unit: 'g' },
      { id: 'rb-5', name: 'Mantequilla fría en dados (para mantecar)', amount: 45, unit: 'g' },
      { id: 'rb-6', name: 'Queso Parmesano Reggiano rallado', amount: 50, unit: 'g' },
      { id: 'rb-7', name: 'Agua mineral para el fumet', amount: 900, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sous-Vide 1: Espárragos Verdes a 82 °C',
        instruction:
          'Envasa al vacío los espárragos verdes limpios. Cocina en Roner a 82 °C durante 9 minutos. Enfría inmediatamente en baño de agua con hielo para fijar la clorofila y reserva.',
        timerSeconds: 540,
        temperature: '82 °C',
      },
      {
        stepNumber: 2,
        title: 'Sous-Vide 2: Pinzas de Bogavante a 65 °C',
        instruction:
          'Cocina las pinzas en el Roner a 65 °C durante 20 minutos. Enfría ligeramente, pela con cuidado sin romper la carne y reserva.',
        timerSeconds: 1200,
        temperature: '65 °C',
      },
      {
        stepNumber: 3,
        title: 'Sous-Vide 3: Cola de Bogavante a 54 °C',
        instruction:
          'Cocina la cola en el Roner a 54 °C durante 20 minutos (o hasta 60 °C si la prefieres más firme). Saca, pela y reserva en templado.',
        timerSeconds: 1200,
        temperature: '54 °C',
      },
      {
        stepNumber: 4,
        title: 'Fumet concentrado de cáscaras, coral y azafrán',
        instruction:
          'Tuesta ligeramente las cáscaras y la cabeza en olla caliente. Añade el agua, el coral de la cabeza y las hebras de azafrán. Cuece suavemente durante 20 minutos y cuela por fino.',
        timerSeconds: 1200,
        tip: 'Partir de agua fría tras el tostado favorece la expansión del sabor al caldo.',
      },
      {
        stepNumber: 5,
        title: 'Nacarado y cocción del Risotto',
        instruction:
          'Sofríe y nacara el arroz. Añade 2/3 del fumet caliente de golpe y cocina sin remover constantemente hasta que el arroz esté casi en su punto. Ajusta con el tercio restante de caldo según pida el grano.',
        timerSeconds: 960,
      },
      {
        stepNumber: 6,
        title: 'Mantecado fuera del fuego y acabado',
        instruction:
          'Retira la olla del fuego. Añade la mantequilla fría, el parmesano y los espárragos troceados emulsionando con movimiento envolvente. Incorpora los medallones de cola y las pinzas de bogavante justo al servir.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'croquetas-liquidas-gourmet-5-9b',
    code: '5.9B',
    title: 'Croqueta Líquida para Freír (Efecto Sorpresa)',
    subtitle: 'Proporción 40g/40g por 500ml de leche estabilizada en frío con 3 hojas de gelatina',
    category: 'Tapas y Croquetas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 85,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Exterior dorado y crujiente con interior totalmente líquido y cremoso al morder. El secreto es usar solo 40 g de harina y 3 hojas de gelatina que funden a >40 °C durante la fritura rápida a 175 °C.',
    isFavorite: true,
    createdAt: '2026-10-17T10:10:00Z',
    ingredients: [
      { id: 'cl-1', name: 'Mantequilla', amount: 40, unit: 'g' },
      { id: 'cl-2', name: 'Harina de trigo', amount: 40, unit: 'g' },
      { id: 'cl-3', name: 'Leche entera caliente', amount: 500, unit: 'ml' },
      { id: 'cl-4', name: 'Hojas de gelatina de colas', amount: 3, unit: 'ud' },
      { id: 'cl-5', name: 'Jamón ibérico, queso o setas muy picado', amount: 100, unit: 'g' },
      { id: 'cl-6', name: 'Nuez moscada recién rallada y sal', amount: 1, unit: 'pizca' },
      { id: 'cl-7', name: 'Huevo batido y pan rallado / panko', amount: 150, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hidratar la gelatina en agua fría',
        instruction:
          'Sumergir las 3 hojas de gelatina en abundante agua fría durante 5 minutos hasta que estén completamente blandas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Cocinar el roux ligero (40g / 40g)',
        instruction:
          'Derrite los 40 g de mantequilla en sartén a fuego medio, añade los 40 g de harina y cocina durante 2 minutos removiendo sin dorar en exceso.',
        timerSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Integrar la leche y fundir la gelatina',
        instruction:
          'Incorpora los 500 ml de leche caliente poco a poco sin dejar de remover hasta obtener una crema ligera. Retira o baja el fuego, añade la gelatina bien escurrida, el relleno, sal y nuez moscada.',
        timerSeconds: 360,
        temperature: '>40 °C',
      },
      {
        stepNumber: 4,
        title: 'Gelificación en nevera',
        instruction:
          'Vierte la masa en una bandeja y refrigera al menos 1 hora hasta que la masa esté firme pero flexible gracias al colágeno de la gelatina.',
        timerSeconds: 3600,
        tip: 'Puedes usar cucharitas pequeñas para formar mini croquetas de bocado.',
      },
      {
        stepNumber: 5,
        title: 'Rebozado delicado y fritura relámpago + Rejilla',
        instruction:
          'Bolea con cuidado en frío, pasa por huevo y pan rallado presionando suavemente. Fríe en aceite a 175 °C muy rápido (45-60 s), pasa 30 s por papel absorbente y directo a rejilla metálica.',
        timerSeconds: 60,
        temperature: '175 °C',
        tip: 'Servir inmediatamente para disfrutar de la explosión líquida interior.',
      },
    ],
  },
  {
    id: 'croquetas-clasicas-5-9a',
    code: '5.9A',
    title: 'Croquetas Clásicas Cremosas (Fórmula 120/120)',
    subtitle: 'Textura firme para boleado tradicional y corazón cremoso al freír',
    category: 'Tapas y Croquetas',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Ratio clásico de 120 g de mantequilla y 120 g de harina por cada 500 ml de leche. Pasar del aceite al papel solo 30 segundos y enseguida a rejilla para que el vapor no ablande el rebozado.',
    isFavorite: true,
    createdAt: '2026-10-17T10:12:00Z',
    ingredients: [
      { id: 'cc-1', name: 'Mantequilla', amount: 120, unit: 'g' },
      { id: 'cc-2', name: 'Harina de trigo', amount: 120, unit: 'g' },
      { id: 'cc-3', name: 'Leche entera caliente', amount: 500, unit: 'ml' },
      { id: 'cc-4', name: 'Relleno al gusto (jamón ibérico o pollo asado)', amount: 140, unit: 'g' },
      { id: 'cc-5', name: 'Sal y nuez moscada recién rallada', amount: 1, unit: 'pizca' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tostar el roux 2 minutos',
        instruction:
          'Derrite los 120 g de mantequilla a fuego medio, incorpora los 120 g de harina y cocina removiendo durante 2 minutos para quitar el sabor a harina cruda.',
        timerSeconds: 120,
      },
      {
        stepNumber: 2,
        title: 'Cocción de la bechamel cremosa',
        instruction:
          'Añade la leche caliente poco a poco removiendo sin parar. Cocina hasta que espese y se despegue de las paredes. Incorpora sal, nuez moscada y el relleno.',
        timerSeconds: 720,
      },
      {
        stepNumber: 3,
        title: 'Fritura dorada y reposo en rejilla',
        instruction:
          'Una vez fría la masa, forma las croquetas, pasa por huevo y pan rallado y fríe en aceite caliente hasta dorar. Escurre 30 s en papel y pasa a rejilla.',
        timerSeconds: 150,
        temperature: '175 °C',
      },
    ],
  },
  {
    id: 'ajoblanco-anacardos-5-1',
    code: '5.1',
    title: 'Ajoblanco Mousse de Almendras y Leche de Coco',
    subtitle: 'Emulsión más grasa y sedosa con leche de coco y colado fino para textura mousse',
    category: 'Arroces y Cremas',
    difficulty: 'Fácil',
    prepTimeMinutes: 20,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Al sustituir parte del agua por leche de coco logramos un perfil más graso y ligeramente dulce que emulsiona en textura mousse. Imprescindible retirar el germen del ajo y pasar por colador fino tras triturar.',
    pairing: 'Manzana verde en dados, uvas peladas, mojama o anchoa.',
    isFavorite: true,
    createdAt: '2026-10-17T10:15:00Z',
    ingredients: [
      { id: 'aj-1', name: 'Almendra cruda pelada (o mix con anacardos)', amount: 200, unit: 'g' },
      { id: 'aj-2', name: 'Leche de coco', amount: 400, unit: 'ml' },
      { id: 'aj-3', name: 'Aceite de oliva virgen extra suave', amount: 75, unit: 'ml' },
      { id: 'aj-4', name: 'Diente de ajo (sin el germen central)', amount: 1, unit: 'ud' },
      { id: 'aj-5', name: 'Vinagre de Jerez', amount: 15, unit: 'ml' },
      { id: 'aj-6', name: 'Agua mineral fría (según textura deseada)', amount: 120, unit: 'ml' },
      { id: 'aj-7', name: 'Sal fina', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Triturado y emulsión con AOVE al hilo',
        instruction:
          'Tritura a máxima potencia las almendras, el diente de ajo sin germen, la leche de coco, el vinagre de Jerez y la sal. Añade los 75 ml de aceite de oliva al hilo y ajusta con agua fría hasta lograr textura de mousse ligera.',
        timerSeconds: 180,
        tip: 'Quitar el germen verde evita el amargor y facilita la digestión.',
      },
      {
        stepNumber: 2,
        title: 'Colado por fino y reposo en frío',
        instruction:
          'Pasa toda la crema por un colador fino o chino presionando suavemente. Refrigera antes de emplatar con manzana verde, uva, mojama o anchoa.',
        timerSeconds: 1800,
      },
    ],
  },
  {
    id: 'salsa-tapioca-caviar-5-2',
    code: '5.2',
    title: 'Salsa Cremosa de Fumet, Tapioca y Caviar',
    subtitle: 'Perlas de tapioca cristalinas en reducción de fumet, vino blanco, caviar y aceite de eneldo',
    category: 'Pescados y Mariscos',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 35,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'La tapioca se cuece aparte 15 min, se reposa y se lava en agua fría para soltar el almidón sobrante. Se incorpora a la salsa montada con mantequilla justo al final solo para calentar.',
    isFavorite: true,
    createdAt: '2026-10-17T10:18:00Z',
    ingredients: [
      { id: 'st-1', name: 'Perlas de tapioca pequeñas', amount: 50, unit: 'g' },
      { id: 'st-2', name: 'Agua para cocer la tapioca', amount: 400, unit: 'ml' },
      { id: 'st-3', name: 'Vino blanco seco', amount: 150, unit: 'ml' },
      { id: 'st-4', name: 'Chalotas picadas en brunoise fina', amount: 2, unit: 'ud' },
      { id: 'st-5', name: 'Fumet de pescado concentrado', amount: 200, unit: 'ml' },
      { id: 'st-6', name: 'Nata líquida 35% MG', amount: 150, unit: 'ml' },
      { id: 'st-7', name: 'Mantequilla muy fría en dados', amount: 30, unit: 'g' },
      { id: 'st-8', name: 'Caviar y aceite de eneldo', amount: 15, unit: 'g', notes: 'Para terminar el plato' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hervir las perlas de tapioca (15 min)',
        instruction:
          'Cuece las perlas de tapioca en agua hirviendo durante 15 minutos a fuego medio hasta que se vuelvan translúcidas.',
        timerSeconds: 900,
      },
      {
        stepNumber: 2,
        title: 'Reposo y lavado en frío de la tapioca',
        instruction:
          'Retira del fuego, deja reposar 5 minutos y cuela lavando bajo chorro de agua fría para cortar la cocción y separar las perlas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Reducción de chalota, vino blanco, fumet y nata',
        instruction:
          'Rehoga las chalotas sin dorar, desglasa con los 150 ml de vino blanco y reduce a la mitad. Añade los 200 ml de fumet y los 150 ml de nata y reduce hasta textura napante.',
        timerSeconds: 600,
      },
      {
        stepNumber: 4,
        title: 'Montado con mantequilla fría, tapioca y caviar',
        instruction:
          'Emulsiona la salsa con los 30 g de mantequilla fría. Incorpora las perlas de tapioca escurridas solo para calentarlas 1 minuto. Sirve bajo el pescado y corona con caviar y gotas de aceite de eneldo.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'lemon-pie-temperado-5-3',
    code: '5.3',
    title: 'Lemon Pie en Copa (Técnica de Temperado y Sifón)',
    subtitle: 'Crema sedosa de limón a 60 °C, tierra crujiente de galleta y frutos secos, y merengue suizo sopleteado',
    category: 'Postres y Dulces',
    difficulty: 'Media',
    prepTimeMinutes: 35,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Alcanzar exactamente 60 °C al disolver el azúcar con las claras al baño maría pasteuriza el merengue y disuelve el cristal; al enfriar y batir a velocidad creciente (o dosificar en sifón) se obtiene una espuma blanca, densa y brillante que tolera el sopleteado directo sin licuarse. El contraste térmico y de texturas en copa de balón es espectacular.',
    pairing: 'Té Earl Grey o vino espumoso Moscato d´Asti.',
    isFavorite: true,
    createdAt: '2026-10-17T10:22:00Z',
    ingredients: [
      { id: 'lp-1', name: 'Leche entera (300 ml infusión + 100 ml para maicena)', amount: 400, unit: 'ml' },
      { id: 'lp-2', name: 'Azúcar blanco (100 g para crema + 200 g para merengue)', amount: 300, unit: 'g' },
      { id: 'lp-3', name: 'Yemas de huevo (para la crema de limón)', amount: 4, unit: 'ud' },
      { id: 'lp-4', name: 'Zumo recién exprimido de limón', amount: 150, unit: 'ml' },
      { id: 'lp-5', name: 'Ralladura de 1/2 limón', amount: 1, unit: 'ud' },
      { id: 'lp-6', name: 'Maicena (almidón de maíz)', amount: 40, unit: 'g', notes: 'Diluir siempre en los 100 ml de leche fría' },
      { id: 'lp-7', name: 'Claras de huevo (para el merengue suizo)', amount: 100, unit: 'g' },
      { id: 'lp-8', name: 'Gotitas de zumo de limón (para el merengue)', amount: 5, unit: 'ml' },
      { id: 'lp-9', name: 'Galletas de mantequilla (para la tierra)', amount: 4, unit: 'ud' },
      { id: 'lp-10', name: 'Nueces peladas (para la tierra)', amount: 20, unit: 'g' },
      { id: 'lp-11', name: 'Almendras tostadas (para la tierra)', amount: 20, unit: 'g' },
      { id: 'lp-12', name: 'Ralladura de limón y hojitas de menta fresca', amount: 1, unit: 'ud', notes: 'Para decorar encima del merengue' },
      { id: 'lp-13', name: 'Soplete de cocina', amount: 1, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Calentar la leche y blanquear yemas',
        instruction:
          'Ponemos a calentar a fuego bajo 300 ml de leche con la mitad del azúcar (50 g). En un bowl aparte mezclamos las 4 yemas con la otra parte del azúcar (50 g) y batimos bien con una varilla hasta que cojan un poco de volumen y empiecen a blanquear.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Diluir la maicena e integrar a la leche',
        instruction:
          'Diluimos la maicena (40 g) en el resto de la leche fría (100 ml) moviendo bien para que no queden grumos y reservamos. Añadimos a la mezcla caliente de leche y azúcar la mezcla de yemas y azúcar, no pararemos de mover hasta que vaya espesando un poco y bajamos el fuego al mínimo.',
        timerSeconds: 180,
        tip: 'Diluir la maicena siempre en frío evita que se formen grumos.',
      },
      {
        stepNumber: 3,
        title: 'Añadir limón y cocer hasta textura deseada',
        instruction:
          'Ahora añadimos el zumo (150 ml) y la ralladura de limón y la maicena diluida en leche y vamos moviendo hasta que tenga la textura deseada suave, aterciopelada y brillante. Lo reservamos dentro de una manga pastelera con boquilla lisa.',
        timerSeconds: 240,
      },
      {
        stepNumber: 4,
        title: 'Merengue suizo al baño maría (60 °C)',
        instruction:
          'Calentamos al baño maría las claras (100 g) junto a los 200 g de azúcar hasta que el azúcar se haya disuelto por completo y alcancen la temperatura de 60 °C y retiramos del calor.',
        timerSeconds: 300,
        temperature: '60 °C baño maría',
        tip: 'Controlar con termómetro: los 60 °C aseguran la pasteurización y disuelven los cristales de azúcar.',
      },
      {
        stepNumber: 5,
        title: 'Reposo y montado firme del merengue',
        instruction:
          'Pasamos la mezcla de las claras y el azúcar al vaso batidor y dejamos que se enfríen durante 5 minutos. Pasados los 5 minutos añadimos las gotitas de limón y comenzamos a batir con la varilla a velocidad media. Cuando las claras empiecen a montar vamos subiendo la velocidad hasta que el merengue se haya enfriado del todo y esté liso, firme y brillante. Pasamos a una manga pastelera (o al sifón de espumas con 1 carga para textura nube).',
        timerSeconds: 360,
      },
      {
        stepNumber: 6,
        title: 'Elaboración de la tierra de galletas',
        instruction:
          'Trituramos todo junto (las 4 galletas de mantequilla, 20 g de nueces peladas y 20 g de almendras tostadas) en un robot de cocina o en un mortero hasta formar una tierra crujiente.',
        timerSeconds: 60,
      },
      {
        stepNumber: 7,
        title: 'Montaje en copa de balón y sopleteado',
        instruction:
          'En una copa de balón ponemos una base de crema de limón. Encima ponemos una capa de la tierra de galletas. Ahora vamos haciendo puntos de merengue (o dosificando la espuma con el sifón) por toda la superficie y los sopleteamos. Terminamos poniendo encima de cada punto de merengue un poco de ralladura de limón y una hojita pequeña de menta.',
        timerSeconds: 120,
        tip: 'Sopletear a unos 10 cm de distancia con movimientos circulares para caramelizar sin quemar.',
      },
    ],
  },
  {
    id: 'gofre-ricota-trufa-anchoa-5-4',
    code: '5.4',
    title: 'Gofre Tostado con Crema de Ricota, Trufa y Anchoa',
    subtitle: 'Bocado umami-crujiente de gofre belga neutro, mousse montada de ricota y anchoa del Cantábrico XXL',
    category: 'Tapas y Croquetas',
    difficulty: 'Fácil',
    prepTimeMinutes: 15,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Usa un gofre tipo belga que no sea muy dulce. Montar los 200 g de ricota con 50 g de nata 35% MG crea una nube láctea que equilibra la potencia salina de la anchoa grande y el aroma de la trufa.',
    isFavorite: true,
    createdAt: '2026-10-17T10:25:00Z',
    ingredients: [
      { id: 'gf-1', name: 'Gofre tipo belga (poco dulce)', amount: 1, unit: 'ud', notes: 'Da para 2-4 pinchos' },
      { id: 'gf-2', name: 'Queso Ricota fresco escurrido', amount: 200, unit: 'g' },
      { id: 'gf-3', name: 'Nata para montar (mín. 35% MG)', amount: 50, unit: 'g' },
      { id: 'gf-4', name: 'Pasta o salsa de trufa negra', amount: 15, unit: 'g', notes: 'Al gusto' },
      { id: 'gf-5', name: 'Anchoas de calibre 00 (cuanto más grandes mejor)', amount: 4, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Montar la crema aireada de ricota y trufa',
        instruction:
          'Bate con varillas los 200 g de ricota con los 50 g de nata fría (35% MG) y la salsa de trufa hasta obtener una crema montada, firme y sedosa.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Tostar el gofre y coronar con la anchoa XXL',
        instruction:
          'Tuesta el gofre hasta que el exterior quede bien crujiente, córtalo en porciones de bocado, dispón una quenelle o rosetón generoso de crema trufada y corona con un lomo entero de anchoa grande.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'barbacoa-mexicana-pulled-pork-5-5',
    code: '5.5',
    title: 'Barbacoa Mexicana (Pulled Pork 68 °C · 24h)',
    subtitle: 'Aguja o paleta de cerdo adobada en chiles ancho y guajillo cocinada al vacío en Roner',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Media',
    prepTimeMinutes: 30,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'A 68 °C durante 24 horas el colágeno de la aguja de cerdo se transforma en gelatina sin perder humedad. Al abrir la bolsa, reserva siempre los jugos y rehidrata la carne deshebrada con ellos.',
    isFavorite: true,
    createdAt: '2026-10-17T10:30:00Z',
    ingredients: [
      { id: 'bm-1', name: 'Aguja o paleta de cerdo en pieza', amount: 1200, unit: 'g' },
      { id: 'bm-2', name: 'Chiles anchos secos desvenados', amount: 4, unit: 'ud' },
      { id: 'bm-3', name: 'Chiles guajillos secos desvenados', amount: 4, unit: 'ud' },
      { id: 'bm-4', name: 'Sal gruesa', amount: 18, unit: 'g' },
      { id: 'bm-5', name: 'Tortillas de maíz nixtamalizado', amount: 12, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hidratar chiles y elaborar el adobo rojo',
        instruction:
          'Hidrata los chiles secos ancho y guajillo en agua caliente durante 15 minutos. Tritura con un poco de su agua de remojo y cuela para obtener una salsa roja lisa.',
        timerSeconds: 900,
      },
      {
        stepNumber: 2,
        title: 'Envasado al vacío y Roner a 68 °C · 24h',
        instruction:
          'Sala la pieza de cerdo, cúbrela bien con el adobo de chiles y envasa al vacío. Cocina en el Roner a 68 °C durante 24 horas.',
        timerSeconds: 86400,
        temperature: '68 °C',
      },
      {
        stepNumber: 3,
        title: 'Deshebrado y emulsión con sus propios jugos',
        instruction:
          'Saca la carne de la bolsa reservando todos los jugos del vacío. Deshebra en caliente y mezcla con parte del jugo reducido para que quede ultra jugosa sobre las tortillas de maíz.',
      },
    ],
  },
  {
    id: 'creme-brulee-roner-5-7',
    code: '5.7',
    title: 'Crème Brûlée en Roner (83 °C · Sin Burbujas)',
    subtitle: 'Coagulación exacta de 10 yemas a 83 °C en tarros herméticos y caramelizado a soplete',
    category: 'Postres y Dulces',
    difficulty: 'Media',
    prepTimeMinutes: 90,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Mezclar sin introducir aire y reposar 15 minutos para espumar antes de envasar garantiza una textura de espejo sin poros. Dejar siempre 1 cm de aire en los tarros antes de sumergir a 83 °C.',
    isFavorite: true,
    createdAt: '2026-10-17T10:35:00Z',
    ingredients: [
      { id: 'cb-1', name: 'Yemas de huevo', amount: 10, unit: 'ud' },
      { id: 'cb-2', name: 'Nata líquida (crema 35% MG)', amount: 550, unit: 'ml' },
      { id: 'cb-3', name: 'Azúcar blanco', amount: 80, unit: 'g' },
      { id: 'cb-4', name: 'Vaina de vainilla en rama', amount: 1, unit: 'ud' },
      { id: 'cb-5', name: 'Sal fina', amount: 3, unit: 'g' },
      { id: 'cb-6', name: 'Azúcar moreno (para quemar con soplete)', amount: 45, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mezcla sin aire y reposo de 15 min',
        instruction:
          'Integra suavemente las 10 yemas, los 80 g de azúcar, los 550 ml de nata, las semillas de la vainilla y los 3 g de sal sin batir para no meter aire. Deja reposar 15 minutos y retira toda la espuma superficial.',
        timerSeconds: 900,
      },
      {
        stepNumber: 2,
        title: 'Cocción en Roner a 83 °C (1 hora)',
        instruction:
          'Vierte en tarros de cristal dejando 1 cm libre de aire en el borde superior, cierra a presión de dedos y cocina en Roner a 83 °C durante 1 hora.',
        timerSeconds: 3600,
        temperature: '83 °C',
      },
      {
        stepNumber: 3,
        title: 'Atemperado (30 min) y abatido en baño de hielo (1 h)',
        instruction:
          'Deja enfriar 30 minutos a temperatura ambiente y pasa a baño de agua con hielo durante 1 hora (o 5 horas en nevera). Antes de servir, espolvorea azúcar moreno y carameliza con soplete.',
        timerSeconds: 1800,
      },
    ],
  },
  {
    id: 'magret-pato-gastrique-5-8',
    code: '5.8',
    title: 'Magret de Pato (Sartén Fría) con Salsa Gastrique',
    subtitle: 'Fundido lento de la grasa desde sartén en frío para piel de cristal y agridulce Gastrique',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Media',
    prepTimeMinutes: 25,
    baseServings: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Nunca pongas el magret en sartén caliente: partir de sartén FRÍA con la piel hacia abajo a fuego medio funde la grasa subcutánea lentamente sin quemar la piel, dejándola ultra crujiente.',
    isFavorite: true,
    createdAt: '2026-10-17T10:40:00Z',
    ingredients: [
      { id: 'mp-1', name: 'Magret de pato fresco', amount: 1, unit: 'ud', notes: 'Aprox. 400 g' },
      { id: 'mp-2', name: 'Azúcar para el Gastrique', amount: 50, unit: 'g' },
      { id: 'mp-3', name: 'Vinagre de vino o manzana (Gastrique)', amount: 50, unit: 'ml' },
      { id: 'mp-4', name: 'Fondo oscuro o jugo de carne', amount: 100, unit: 'ml' },
      { id: 'mp-5', name: 'Sal en escamas y pimienta negra', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fundir la piel desde sartén FRÍA',
        instruction:
          'Realiza cortes en rombo sobre la piel sin llegar a la carne. Coloca el magret con la piel hacia abajo en la sartén totalmente FRÍA y enciende a fuego medio durante 10 minutos retirando la grasa que vaya soltando.',
        timerSeconds: 600,
        tip: 'Al fundir despacio, la piel queda fina y crujiente como un chicharrón.',
      },
      {
        stepNumber: 2,
        title: 'Sellado por el lado de la carne y reposo',
        instruction:
          'Sube el fuego para dorar el lado de la carne durante 3 minutos (buscando 56 °C en el centro rosado). Retira a rejilla y deja reposar 5 minutos antes de trinchar.',
        timerSeconds: 300,
        temperature: '56 °C centro',
      },
      {
        stepNumber: 3,
        title: 'Salsa Gastrique para equilibrar la grasa',
        instruction:
          'Carameliza el azúcar en un cazo, desglasa con el vinagre y reduce con el fondo hasta lograr una glasa agridulce brillante que corta la untuosidad del pato.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'paletilla-cordero-sous-vide-3-1',
    code: '3.1',
    title: 'Paletilla de Cordero a Baja Temperatura (65 °C × 24h)',
    subtitle: 'Osmotización al vacío con hierbas frescas, punto rosado ultra meloso y regeneración crujiente',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 35,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      '65 °C × 24 h consigue carne rosada, muy melosa y máxima retención de jugos (frente a 70 °C × 14 h que da textura más deshebrada tipo guiso clásico). El vacío produce osmotización haciendo que el romero y tomillo penetren al interior.',
    isFavorite: true,
    createdAt: '2026-10-17T10:45:00Z',
    ingredients: [
      { id: 'pc-1', name: 'Paletilla de cordero lechal o recental', amount: 2, unit: 'ud' },
      { id: 'pc-2', name: 'Romero y tomillo fresco', amount: 4, unit: 'rama' },
      { id: 'pc-3', name: 'Ajo confitado y AOVE', amount: 30, unit: 'ml' },
      { id: 'pc-4', name: 'Sal marina', amount: 15, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Osmotización al vacío y cocción 65 °C × 24 h',
        instruction:
          'Envasa al vacío la paletilla con las hierbas aromáticas y un toque de aceite. Cocina en Roner a 65 °C durante 24 horas para máxima melosidad (o 70 °C durante 14 h si buscas textura tipo guiso).',
        timerSeconds: 86400,
        temperature: '65 °C',
      },
      {
        stepNumber: 2,
        title: 'Abatido y marcado fuerte pre-servicio (Maillard)',
        instruction:
          'Si no se sirve al momento, abate en agua con hielo. Antes de emplatar, seca muy bien la piel y marca a fuego fuerte o en horno a máxima potencia 4 minutos para lograr corteza caoba crujiente.',
        timerSeconds: 240,
        temperature: '>180 °C',
      },
    ],
  },
  {
    id: 'esfera-mozzarella-4-1',
    code: '4.1',
    title: 'Esfera Molecular de Mozzarella (Esferificación Inversa)',
    subtitle: 'Suero de mozzarella lácteo en baño de alginato 5 g/L con centro líquido estable',
    category: 'Molecular y Espumas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 40,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Usamos Esferificación Inversa porque los lácteos ya contienen calcio propio. Al sumergir en el baño de alginato (5 g/L en agua mineral reposado 12-24h), la membrana se forma hacia fuera y la gelificación se detiene al lavarla, dejando el centro líquido estable.',
    isFavorite: true,
    createdAt: '2026-10-17T10:50:00Z',
    ingredients: [
      { id: 'em-1', name: 'Mozzarella de búfala fresca', amount: 220, unit: 'g' },
      { id: 'em-2', name: 'Suero de la mozzarella', amount: 150, unit: 'g' },
      { id: 'em-3', name: 'Nata líquida', amount: 70, unit: 'g' },
      { id: 'em-4', name: 'Goma xantana (opcional, 0,2 %)', amount: 0.9, unit: 'g', notes: 'Para dar cuerpo a la gota' },
      { id: 'em-5', name: 'Agua mineral de mineralización muy débil (Baño)', amount: 1000, unit: 'ml' },
      { id: 'em-6', name: 'Alginato de sodio (Baño)', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparar el baño de alginato (12–24 h antes)',
        instruction:
          'Tritura con túrmix los 5 g de alginato en 1 L de agua mineral de baja mineralización (sin calcio). Deja reposar en nevera entre 12 y 24 horas para que pierda todas las burbujas de aire.',
        timerSeconds: 43200,
      },
      {
        stepNumber: 2,
        title: 'Base de Mozzarella y Xantana',
        instruction:
          'Tritura los 220 g de mozzarella, 150 g de suero y 70 g de nata con sal y pimienta. Cuela por fino, texturiza con 0,2 % de xantana si deseas mayor densidad y deja reposar.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Ejecución de las esferas en el baño (2 min)',
        instruction:
          'Vierte cucharadas semiesféricas de la mezcla de mozzarella dentro del baño de alginato sin que se toquen. Mantén exactamente 2 minutos en el baño, retira con cuchara perforada y lava en un bol de agua mineral limpia.',
        timerSeconds: 120,
        tip: 'En esferificación inversa el centro permanece líquido incluso si las reservas.',
      },
    ],
  },
  {
    id: 'aire-tomate-espumas-sifon-4-2-6',
    code: '4.2 & 6',
    title: 'Aire de Tomate + 3 Espumas Modernas de Sifón',
    subtitle: 'Aire con lecitina (45°) y espumas de Calabaza Garam Masala, Parmesano y Dulce de Leche',
    category: 'Molecular y Espumas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 25,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Para el Aire de Tomate con lecitina (ratio 6-8 g/L), inclina el recipiente y coloca la cabeza de la túrmix a 45° justo en la superficie para inyectar aire. Para las espumas de sifón, cuela siempre por chino antes de cargar N2O.',
    isFavorite: true,
    createdAt: '2026-10-17T10:55:00Z',
    ingredients: [
      { id: 'ae-1', name: 'Agua de tomate clarificada (Aire)', amount: 520, unit: 'g' },
      { id: 'ae-2', name: 'Lecitina de soja en polvo (Aire)', amount: 3.5, unit: 'g', notes: 'Ratio 6-8 g/L' },
      { id: 'ae-3', name: 'Calabaza asada caliente (Espuma 1)', amount: 500, unit: 'g' },
      { id: 'ae-4', name: 'Nata líquida + Garam Masala', amount: 200, unit: 'ml' },
      { id: 'ae-5', name: 'Leche infusionada con Parmesano + Lecitina (Espuma 2)', amount: 300, unit: 'ml' },
      { id: 'ae-6', name: 'Dulce de leche + Nata + Gelatina (Espuma 3 - 2 cargas)', amount: 350, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Aire de Tomate: Túrmix a 45° y reposo de 1 min',
        instruction:
          'Disuelve los 3,5 g de lecitina en los 520 g de tomate. Acciona la túrmix en la superficie con un ángulo de 45° para incorporar aire. Deja reposar exactamente 1 minuto para que estabilice y recoge la nube superior con cuchara perforada.',
        timerSeconds: 60,
        tip: 'Misma técnica aplica para la Espuma de Leche al Parmesano con garam masala y lecitina.',
      },
      {
        stepNumber: 2,
        title: 'Espuma de Calabaza o Dulce de Leche en Sifón (2 cargas)',
        instruction:
          'Para Calabaza: tritura 500 g de calabaza caliente con nata y garam masala, cuela y carga en sifón. Para Dulce de Leche: tritura dulce de leche de bote, nata y gelatina hidratada, cuela en el sifón e inyecta 2 cargas de N2O.',
        timerSeconds: 180,
      },
    ],
  },
  ...COURSE_RECIPES,
  ...NEW_RECIPES,
];

export const INITIAL_TIPS: CookingTip[] = [
  {
    id: 'tip-1-1-concentracion-expansion',
    code: '1.1',
    title: 'Concentración vs. Expansión (Agua Fría vs. Hirviendo)',
    category: 'Física Culinaria',
    summary: 'Cuándo partir de agua fría (ósmosis hacia el caldo) y cuándo de agua hirviendo (sellar jugos).',
    keyRules: [
      '🌀 EXPANSIÓN (Partir de agua FRÍA): El alimento libera su sabor al líquido porque los poros están abiertos desde el inicio.',
      'Ejemplos de Expansión: Caldos, fumets y cocer patatas con piel (la sal penetra mucho mejor en el interior de la patata).',
      '🔥 CONCENTRACIÓN (Partir de agua HIRVIENDO): El choque térmico coagula las proteínas superficiales "sellando" parcialmente el alimento y reteniendo sus jugos.',
      'Ejemplos de Concentración: Blanquear verduras, cocer pasta o cocer gambas al agua hirviendo.',
    ],
    proSecret: 'Si buscas un caldo sabroso, empieza en frío; si buscas que el ingrediente conserve todo su sabor dentro, empieza hirviendo.',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:00:00Z',
  },
  {
    id: 'tip-1-2-efecto-maillard',
    code: '1.2',
    title: 'Efecto Maillard (El Tostado Perfecto >140 °C)',
    category: 'Física Culinaria',
    summary: 'Cómo superar la barrera de los 100 °C de evaporación para lograr color marrón caoba y umami.',
    temperatureBadge: '> 140 °C',
    keyRules: [
      '🔬 ¿Qué es?: Reacción química entre aminoácidos y azúcares a más de 140 °C que crea color y aroma tostado.',
      '1. Fuego fuerte y sartén con buena inercia térmica.',
      '2. Superficie del alimento totalmente SECA con papel absorbente.',
      '3. NO salar al inicio (la sal extrae agua por ósmosis) y NO mover constantemente la pieza.',
    ],
    proSecret: 'Si hay agua superficial, la temperatura se estanca en 100 °C (ebullición) y la carne se cuece en vez de dorarse. Busca color marrón caoba, nunca negro (amargo y nocivo).',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:05:00Z',
  },
  {
    id: 'tip-1-3-osmosis-mariscos',
    code: '1.3',
    title: 'Ósmosis y Marinado Rápido en Gambas y Mariscos',
    category: 'Física Culinaria',
    summary: 'Fijar sabor aromático en la superficie del marisco sin deshidratar su interior.',
    keyRules: [
      '🎯 Objetivo: Crear una película aromática adherida sin secar la carne.',
      '🧂 Procedimiento: Mezclar gambas + sal + especias de forma rápida.',
      'Cambiar inmediatamente a una bandeja limpia y cocinar al instante.',
    ],
    proSecret: 'El marinado no penetra al centro de la gamba; si la dejas reposar con sal demasiado tiempo, la ósmosis extrae sus jugos, se encharca por fuera y queda seca por dentro.',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:10:00Z',
  },
  {
    id: 'tip-1-4-lavado-verduras',
    code: '1.4',
    title: 'Regla de Oro en Lavado de Verduras (+ Excepción Patata)',
    category: 'Seguridad e Higiene',
    summary: 'Por qué lavar siempre la verdura entera antes de cortarla, salvo cuando haces patatas fritas.',
    keyRules: [
      '✅ Regla de oro: Lavar siempre la pieza ENTERA antes de pelarla, cortarla o picarla.',
      'Conserva las vitaminas hidrosolubles y evita que la verdura absorba agua y pierda sabor.',
      'Seguridad: Evita que la hoja del cuchillo arrastre bacterias de la piel al interior.',
      '⚠️ ÚNICA EXCEPCIÓN: La patata para freír se lava YA CORTADA para eliminar el almidón superficial y lograr máxima crocancia.',
    ],
    proSecret: 'Secar bien las patatas ya lavadas antes de meterlas al aceite evita salpicaduras y bajadas bruscas de temperatura.',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:15:00Z',
  },
  {
    id: 'tip-1-5-fritura-ajo-frio',
    code: '1.5',
    title: 'Fritura de Ajo: Técnica desde Aceite Frío',
    category: 'Técnicas Clásicas',
    summary: 'Cómo confitar y dorar el ajo picado sin que amargue jamás.',
    keyRules: [
      '🔧 Técnica: Poner el ajo picado en la sartén con el aceite FRÍO y encender el fuego después.',
      '🧠 Motivo físico: El ajo tiene muy poca agua y mucho azúcar, por lo que en aceite caliente se quema en segundos.',
      '💡 Truco adicional: Retirar siempre el germen verde central para eliminar amargor y facilitar la digestión.',
    ],
    proSecret: 'Empezar en frío permite que el ajo aromatice todo el aceite mientras sube la temperatura y se dore de forma homogénea.',
    readTimeMinutes: 1,
    createdAt: '2026-10-17T09:20:00Z',
  },
  {
    id: 'tip-2-1-fritura-rejilla',
    code: '2.1',
    title: 'Fritura Perfecta: Regla de los 30 Segundos y Rejilla',
    category: 'Técnicas Clásicas',
    summary: 'El error del papel absorbente que ablanda los rebozados y cómo solucionarlo con rejilla.',
    keyRules: [
      '👨‍🍳 Protocolo Pro: Sacar del aceite al papel absorbente SOLO durante 30 segundos para retirar la grasa superficial.',
      'Pasar inmediatamente a una REJILLA metálica.',
      '❌ Error común: Dejar las croquetas o frituras reposando sobre papel → el vapor caliente condensa debajo y humedece el rebozado.',
    ],
    proSecret: 'Sobre la rejilla el aire circula por debajo, el vapor escapa libremente y el exterior se mantiene seco y crujiente durante mucho más tiempo.',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:25:00Z',
  },
  {
    id: 'tip-2-2-confitado-botulismo',
    code: '2.2',
    title: 'Confitado a Baja Temperatura (80–90 °C) y Seguridad',
    category: 'Seguridad e Higiene',
    summary: 'Cocción en grasa sin burbujeo y prevención estricta del botulismo en conservas con aceite.',
    temperatureBadge: '80–90 °C',
    keyRules: [
      '🌡️ Rango ideal: Entre 80 °C y 90 °C durante 1,5 a 2 horas.',
      'El alimento debe estar totalmente cubierto en aceite caliente pero SIN llegar a burbujear.',
      '☠️ ALERTA DE SEGURIDAD: Si confitas ajos o verduras y los guardas en aceite, consérvalos SIEMPRE en nevera.',
    ],
    warning: 'A temperatura ambiente, el entorno anaeróbico (sin oxígeno) del aceite favorece la proliferación de Clostridium botulinum (Botulismo, letal).',
    proSecret: 'Controla con sonda que no pase de 90 °C; si burbujea, estás friendo en lugar de confitar.',
    readTimeMinutes: 2,
    createdAt: '2026-10-17T09:30:00Z',
  },
  {
    id: 'tip-3-2-huevos-baja-temperatura',
    code: '3.2',
    title: 'Huevos a Baja Temperatura (65 °C vs. 75 °C)',
    category: 'Sous-Vide / Roner',
    summary: 'Tabla exacta de tiempo y temperatura para yema tipo tocinillo o huevo mollet.',
    temperatureBadge: '65 °C / 75 °C',
    keyRules: [
      '🥚 65 °C durante 45 minutos: Yema densa, untuosa y cremosa con textura tipo tocinillo de cielo.',
      '🥚 75 °C durante 15–20 minutos: Estilo mollet clásico (clara más cuajada y yema fluida).',
    ],
    proSecret: 'A 65 °C las proteínas de la yema (livetina) coagulan creando textura de crema pastelera salada sin que la clara llegue a endurecer.',
    readTimeMinutes: 1,
    createdAt: '2026-10-17T09:35:00Z',
  },
  {
    id: 'tip-4-1-esferificacion',
    code: '4.1',
    title: 'Esferificación Directa vs. Inversa',
    category: 'Cocina Molecular',
    summary: 'Cuándo usar baño de calcio y cuándo baño de alginato para lograr centros líquidos estables.',
    keyRules: [
      '🔹 DIRECTA: Para líquidos sin calcio. Se disuelve alginato en el líquido y se sumerge en baño de cloruro cálcico. ⚠️ La gelificación continúa hacia el centro hasta volverse sólida.',
      '🔹 INVERSA (Recomendada): Ideal para lácteos, aceites o alcohol. El calcio está en el relleno y el baño es de alginato (5 g/L en agua mineral).',
      '✅ Ventaja de la Inversa: El centro líquido es 100% estable y no se endurece con el paso de las horas.',
    ],
    proSecret: 'Prepara el baño de alginato siempre con 12 a 24 h de antelación en agua de mineralización muy débil para eliminar todo el aire.',
    readTimeMinutes: 3,
    createdAt: '2026-10-17T09:40:00Z',
  },
  {
    id: 'tip-4-3-gelificaciones-hidrocoloides',
    code: '4.3',
    title: 'Tabla Maestra de Gelificaciones: Gelatina vs. Agar-Agar',
    category: 'Cocina Molecular',
    summary: 'Temperaturas de activación, comportamiento térmico y ratios por litro.',
    temperatureBadge: '40 °C vs 90 °C',
    keyRules: [
      '🥩 GELATINA (Origen Animal): Hidratar en agua fría y disolver a +40 °C. Textura elástica que se funde en boca a temperatura corporal. Ratio: 1 hoja por cada 100–200 ml.',
      '🌿 AGAR-AGAR (Origen Alga): Requiere hervir a ≥90 °C para activarse. Textura firme y quebradiza que soporta calor (gelatinas calientes). Ratio: 3 a 8 g/L.',
      '☁️ LECITINA (Aires): Ratio estándar de 6 a 8 g/L batiendo en superficie a 45°.',
    ],
    proSecret: 'Para croquetas líquidas usa siempre Gelatina Animal: gelifica en frío para poder empanar y se vuelve líquida al superar los 40 °C en la sartén.',
    readTimeMinutes: 3,
    createdAt: '2026-10-17T09:45:00Z',
  },
  {
    id: 'tip-5-10-hilos-chocolate',
    code: '5.10',
    title: 'Decoración de Hilos de Chocolate por Choque Térmico',
    category: 'Técnicas Clásicas',
    summary: 'Estructuras tridimensionales crujientes de chocolate en baño de agua con hielo.',
    keyRules: [
      '🎨 Prepara un bol amplio con agua muy fría y hielo.',
      'Vierte chocolate atemperado en hilos finos desde un cornet o biberón haciendo dibujos sobre el agua helada.',
      'El choque térmico solidifica el chocolate al instante en figuras 3D.',
    ],
    proSecret: 'Secar muy bien sobre papel absorbente en frío antes de emplatar para que no queden gotas de agua.',
    readTimeMinutes: 1,
    createdAt: '2026-10-17T09:50:00Z',
  },
];

export const INITIAL_UTENSILS: KitchenUtensil[] = [
  {
    id: 'ut-roner-sous-vide',
    name: 'Roner / Circulador Sous-Vide de Precisión',
    category: 'Precisión y Sous-Vide',
    priority: 'Necesito',
    usedFor: 'Pulled Pork (68°C), Risotto Bogavante (54/65/82°C), Crème Brûlée (83°C) y Cordero (65°C)',
    estimatedPrice: '130€',
    acquired: true,
    createdAt: '2026-10-17T08:00:00Z',
  },
  {
    id: 'ut-envasadora-vacio',
    name: 'Envasadora al Vacío + Bolsas Gofradas',
    category: 'Precisión y Sous-Vide',
    priority: 'Necesito',
    usedFor: 'Osmotización de paletilla de cordero, bogavante y cocciones largas de 24h',
    estimatedPrice: '85€',
    acquired: true,
    createdAt: '2026-10-17T08:05:00Z',
  },
  {
    id: 'ut-sifon-espumas',
    name: 'Sifón Gourmet iSi 0.5L + Cargas N2O',
    category: 'Molecular y Sifones',
    priority: 'Necesito',
    usedFor: 'Espuma caliente de Calabaza al Garam Masala y Espuma de Dulce de Leche (2 cargas)',
    estimatedPrice: '95€',
    acquired: false,
    createdAt: '2026-10-17T08:10:00Z',
  },
  {
    id: 'ut-bascula-precision',
    name: 'Báscula de Joyero / Precisión (0.01 g)',
    category: 'Molecular y Sifones',
    priority: 'Necesito',
    usedFor: 'Pesar hidrocoloides: Alginato (5g), Lecitina (2.5-4g), Xantana (0.2%) y Agar-Agar',
    estimatedPrice: '18€',
    acquired: false,
    createdAt: '2026-10-17T08:15:00Z',
  },
  {
    id: 'ut-termometro-sonda',
    name: 'Termómetro Digital de Sonda Instantánea',
    category: 'Precisión y Sous-Vide',
    priority: 'Necesito',
    usedFor: 'Controlar los 60 °C del Lemon Pie Anti-Grumos, Confitado (80-90 °C) y Fritura (175 °C)',
    estimatedPrice: '29€',
    acquired: true,
    createdAt: '2026-10-17T08:20:00Z',
  },
  {
    id: 'ut-soplete-cocina',
    name: 'Soplete de Cocina Profesional',
    category: 'Repostería y Acabado',
    priority: 'Básico',
    usedFor: 'Caramelizar la costra de azúcar moreno en la Crème Brûlée',
    estimatedPrice: '24€',
    acquired: true,
    createdAt: '2026-10-17T08:25:00Z',
  },
  {
    id: 'ut-rejilla-fritura',
    name: 'Rejilla Metálica Inox de Enfriado y Fritura',
    category: 'Sartenes y Cocción',
    priority: 'Necesito',
    usedFor: 'Regla de los 30 segundos en Fritura Perfecta y Croquetas Líquidas para evacuar vapor',
    estimatedPrice: '16€',
    acquired: false,
    createdAt: '2026-10-17T08:30:00Z',
  },
  {
    id: 'ut-cuchara-perforada-esferificacion',
    name: 'Cucharas Semiesféricas y Cuchara Perforada',
    category: 'Molecular y Sifones',
    priority: 'Capricho Chef',
    usedFor: 'Formar y recoger la Esfera Molecular de Mozzarella y el Aire de Tomate',
    estimatedPrice: '22€',
    acquired: false,
    createdAt: '2026-10-17T08:35:00Z',
  },
  {
    id: 'ut-sarten-hierro-mineral',
    name: 'Sartén de Hierro Mineral 28cm (Alta Inercia)',
    category: 'Sartenes y Cocción',
    priority: 'Capricho Chef',
    usedFor: 'Efecto Maillard >140 °C en Tataki de Atún y fundido desde frío en Magret de Pato',
    estimatedPrice: '58€',
    acquired: false,
    createdAt: '2026-10-17T08:40:00Z',
  },
];

export const INITIAL_PLACES: FoodiePlace[] = [
  {
    id: 'place-mercado-paz',
    name: 'Mercado de la Paz',
    category: 'Mercado',
    city: 'Madrid',
    neighborhood: 'Salamanca',
    address: 'Calle de Ayala, 28B, 28001 Madrid',
    latitude: 40.4279,
    longitude: -3.6852,
    rating: 4.9,
    priceLevel: '€€',
    mustOrder: 'Lomo de atún rojo para Tataki y anchoas 00 del Cantábrico',
    review: 'Mi mercado de referencia para comprar producto marino impecable, quesos italianos (ricota y mozzarella de búfala con su suero) y carnes de corte limpio.',
    imageUrl:
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T07:00:00Z',
  },
  {
    id: 'place-alambique-cocina',
    name: 'Alambique — Utensilios y Texturas',
    category: 'Tienda Gourmet / Molecular',
    city: 'Madrid',
    neighborhood: 'Centro / Encarnación',
    address: 'Plaza de la Encarnación, 2, 28013 Madrid',
    latitude: 40.4198,
    longitude: -3.7099,
    rating: 4.8,
    priceLevel: '€€€',
    mustOrder: 'Cargas iSi N2O, sartenes De Buyer, rejillas y moldes de alta precisión',
    review: 'Templo clásico para encontrar equipamiento profesional de cocina, termómetros de sonda, cuchillería y accesorios de repostería técnica.',
    imageUrl:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T07:10:00Z',
  },
  {
    id: 'place-estimar-mar',
    name: 'Estimar (Técnica de Producto Marino)',
    category: 'Restaurante',
    city: 'Madrid',
    neighborhood: 'Cortes',
    address: 'Calle del Marqués de Cubas, 18, 28014 Madrid',
    latitude: 40.4167,
    longitude: -3.6958,
    rating: 4.9,
    priceLevel: '€€€€',
    mustOrder: 'Cigala a la brasa, caviar y puntos de cocción milimétricos',
    review: 'Inspiración pura para entender la concentración de jugos, el control de temperaturas en mariscos y las emulsiones marinas.',
    imageUrl:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T07:20:00Z',
  },
  {
    id: 'place-pescaderias-corunesas',
    name: 'Pescaderías Coruñesas',
    category: 'Pescadería / Producto',
    city: 'Madrid',
    neighborhood: 'Moncloa / Chamberí',
    address: 'Calle de Juan Montalvo, 14, 28040 Madrid',
    latitude: 40.4465,
    longitude: -3.7118,
    rating: 5.0,
    priceLevel: '€€€',
    mustOrder: 'Bogavante azul vivo para el Risotto Sous-Vide y lomo de atún',
    review: 'El mejor proveedor para conseguir bogavante con todo su coral intacto para hacer el fumet y cocinar cola a 54 °C y pinzas a 65 °C.',
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T07:30:00Z',
  },
];

export const INITIAL_PRODUCTS: GourmetProduct[] = [
  {
    id: 'prod-castillo-canena-picual',
    name: 'Aceite Primer Día de Cosecha Picual',
    brand: 'Castillo de Canena',
    category: 'Aceites y Vinagres',
    price: '19,50 €',
    whereToBuy: 'Club del Gourmet El Corte Inglés / Tiendas Oleoteca',
    notes: 'Frutado verde intenso con notas de tomatera y almendra verde. El aceite definitivo para terminar en crudo el Tataki de Atún y el Ceviche.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:00:00Z',
  },
  {
    id: 'prod-yamasa-tokusen-shoyu',
    name: 'Salsa de Soja Tokusen Shoyu',
    brand: 'Yamasa',
    category: 'Salsas y Pastas',
    price: '5,20 €',
    whereToBuy: 'Tokyo Ya (Calle del Presidente Carmona, Madrid) / Supermercado Oriental',
    notes: 'Fermentación natural con equilibrio de salinidad y umami redondo. Base esencial para marinadas y laqueados sin quemar el azúcar de la miel.',
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:10:00Z',
  },
  {
    id: 'prod-al-nakhil-tahini',
    name: 'Pasta de Sésamo Tostado (Tahini puro)',
    brand: 'Al Nakhil',
    category: 'Salsas y Pastas',
    price: '4,80 €',
    whereToBuy: 'Carnicerías Halal de Lavapiés / Supermercados Orientales',
    notes: '100% semilla de sésamo prensada sin aditivos ni aceites añadidos. Aporta una textura aterciopelada insuperable al hummus de garbanzos.',
    imageUrl: 'https://images.unsplash.com/photo-1589135233689-d56d1a642232?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:20:00Z',
  },
  {
    id: 'prod-maldon-smoked',
    name: 'Sal en Escamas Ahumada con Roble',
    brand: 'Maldon Salt Co.',
    category: 'Especias y Condimentos',
    price: '4,95 €',
    whereToBuy: 'Carrefour Bio / Mantequerías Bravo / Tiendas Gourmet',
    notes: 'Ahumada en frío sobre virutas de roble inglés. El toque maestro para rematar carnes a baja temperatura (Roner 56 °C) antes de servir.',
    imageUrl: 'https://images.unsplash.com/photo-1518110903495-cd99c129f10f?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:30:00Z',
  },
  {
    id: 'prod-takaokaya-nori-gold',
    name: 'Alga Nori Tokusen Gold',
    brand: 'Takaokaya',
    category: 'Conservas y Mar',
    price: '6,40 €',
    whereToBuy: 'Tokyo Ya / Tiendas japonesas especializadas',
    notes: 'Crujiente premium con tostado brillante y aroma salino profundo. Ideal para envolturas finas o moler como furikake.',
    imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:40:00Z',
  },
  {
    id: 'prod-parmigiano-guffanti-30m',
    name: 'Parmigiano Reggiano DOP 30 Meses Vacche Rosse',
    brand: 'Luigi Guffanti',
    category: 'Lácteos y Quesos',
    price: '9,20 €',
    whereToBuy: 'Mercado de la Paz / Mantequerías Bravo',
    notes: 'Cristales de tirosina crujientes y riqueza en ácido glutámico natural. Emulsiona el risotto sin aportar pesadez grasa.',
    imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T08:50:00Z',
  },
  {
    id: 'prod-sosa-agar-agar',
    name: 'Agar-Agar Gelificante Termo-Reversible',
    brand: 'Sosa Ingredients / Texturas',
    category: 'Ingredientes Moleculares',
    price: '14,80 €',
    whereToBuy: 'Alambique / Cocinista.es / Tienda Molecular',
    notes: 'Gelifica a 85 °C y resiste calor en plato hasta 60 °C. Fundamental para falsos caviares y láminas de gelatina caliente.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    createdAt: '2026-10-17T09:00:00Z',
  },
];

