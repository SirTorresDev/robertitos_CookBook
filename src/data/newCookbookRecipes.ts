import { Recipe } from '@/types/cookbook';

export const NEW_RECIPES: Recipe[] = [
  // ========================================================
  // 1. DAHL CON ROMANESCO Y BURRATA
  // ========================================================
  {
    id: 'dahl-romanesco-burrata',
    code: 'LEG-1.0',
    title: 'Dahl de Lentejas Rojas con Romanesco y Burrata',
    subtitle: 'Sofrito aromático de jengibre y cúrcuma, leche de coco sedosa, romanesco al dente y corazón cremoso de burrata fresca',
    category: 'Arroces y Cremas',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El punto óptimo de la lenteja roja es cuando rompe y se deshace por completo (8 a 12 min), ligando el caldo con la leche de coco de forma natural. La burrata se coloca en el último segundo para que el calor del dahl funda su corazón de stracciatella sin cocinar el exterior.',
    pairing: 'Cerveza IPA aromática o vino blanco Gewürztraminer bien frío.',
    isFavorite: true,
    createdAt: '2026-10-19T10:00:00Z',
    ingredients: [
      { id: 'drb-1', name: 'Lentejas rojas partidas', amount: 500, unit: 'g', notes: 'Enjuagadas en agua fría' },
      { id: 'drb-2', name: 'Cebolla grande picada fino', amount: 1, unit: 'ud' },
      { id: 'drb-3', name: 'Leche de coco cremosa', amount: 200, unit: 'ml' },
      { id: 'drb-4', name: 'Zanahorias cortadas en dados pequeños', amount: 2, unit: 'ud' },
      { id: 'drb-5', name: 'Jengibre fresco rallado fino', amount: 15, unit: 'g', notes: '1 trozo pequeño' },
      { id: 'drb-6', name: 'Dientes de ajo picados', amount: 4, unit: 'ud' },
      { id: 'drb-7', name: 'Romanesco en ramilletes pequeños', amount: 200, unit: 'g' },
      { id: 'drb-8', name: 'Burrata fresca artesanal', amount: 1, unit: 'ud', notes: 'Atemperada' },
      { id: 'drb-9', name: 'Tomates maduros frescos en concassé', amount: 2, unit: 'ud' },
      { id: 'drb-10', name: 'Pimiento rojo en dados finos', amount: 1, unit: 'ud' },
      { id: 'drb-11', name: 'Caldo vegetal suave', amount: 1000, unit: 'ml' },
      { id: 'drb-12', name: 'Aceite de oliva virgen extra o Ghee', amount: 30, unit: 'ml' },
      { id: 'drb-13', name: 'Sal marina y pimienta negra recién molida', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sofrito aromático base',
        instruction:
          'En una cazuela amplia, calienta el aceite de oliva virgen extra o Ghee a fuego medio. Añade la cebolla en brunoise, las zanahorias, el pimiento rojo, los dientes de ajo picados y el jengibre fresco rallado. Pocha durante 8-10 minutos hasta que las verduras estén bien tiernas y fragantes.',
        timerSeconds: 540,
        temperature: 'Fuego medio',
        tip: 'El jengibre fresco y el ajo sofritos al inicio fijan la base aromática del plato.',
      },
      {
        stepNumber: 2,
        title: 'Incorporación de tomate fresco',
        instruction:
          'Agrega los 2 tomates frescos cortados en concassé y sofríe durante 3 a 4 minutos adicionales hasta que el tomate reduzca y concentre sus azúcares naturales.',
        timerSeconds: 240,
      },
      {
        stepNumber: 3,
        title: 'Romanesco y lentejas rojas',
        instruction:
          'Añade a la cazuela los ramilletes de romanesco y las lentejas rojas enjuagadas. Rehoga todo junto durante 2 minutos mezclando bien con el sofrito para que los granos se impregnen.',
        timerSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Cocción con caldo y leche de coco (8 a 12 min)',
        instruction:
          'Vierte el litro de caldo vegetal caliente y los 200 ml de leche de coco. Lleva a ebullición, baja a fuego medio-suave y deja cocer destapado durante 8 a 12 minutos. El punto exacto es cuando la lenteja roja se deshace por completo espesando el caldo de forma cremosa.',
        timerSeconds: 600,
        temperature: '100 °C ebullición suave',
        tip: 'Esta variedad de lenteja no necesita remojo previo y se deshace con rapidez.',
      },
      {
        stepNumber: 5,
        title: 'Emplatado y corona de burrata',
        instruction:
          'Prueba y rectifica el punto de sal y pimienta. Vierte el dahl bien caliente en platos hondos. Abre la burrata fresca con las manos en trozos generosos y corónala en el centro de cada plato para que el calor la funda suavemente.',
      },
    ],
  },

  // ========================================================
  // 2. HUMMUS (CREMA DE GARBANZOS TRADICIONAL Y BEIRUTÍ)
  // ========================================================
  {
    id: 'hummus-crema-garbanzos',
    code: 'TAP-1.1',
    title: 'Hummus Tradicional con Tahini y Versión Beirutí',
    subtitle: 'Emulsión sedosa de garbanzos y sésamo tostado, pozo de aceite de oliva virgen extra, summaq y opción Beirutí al perejil',
    category: 'Tapas y Croquetas',
    difficulty: 'Fácil',
    prepTimeMinutes: 15,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El secreto de la textura de terciopelo es incorporar agua muy fría mientras se emulsiona la tahini con el ajo machacado y el limón. Para la Versión Beirutí: añade abundante perejil fresco picado a cuchillo y aligera la textura con unas gotas más de agua.',
    pairing: 'Pan pita artesanal recién horneado, encurtidos libaneses o té a la menta fresca.',
    isFavorite: true,
    createdAt: '2026-10-19T10:05:00Z',
    ingredients: [
      { id: 'hum-1', name: 'Garbanzos cocidos (sobrantes de guiso o bote orgánico)', amount: 400, unit: 'g', notes: 'Bien lavados y escurridos' },
      { id: 'hum-2', name: 'Tahini (pasta de sésamo tostado)', amount: 3, unit: 'cda', notes: 'Aprox. 45 g' },
      { id: 'hum-3', name: 'Zumo de limón recién exprimido', amount: 30, unit: 'ml', notes: 'Al gusto' },
      { id: 'hum-4', name: 'Diente de ajo machacado a mortero con sal', amount: 1, unit: 'ud', notes: 'Opcional' },
      { id: 'hum-5', name: 'Aceite de oliva virgen extra (AOVE)', amount: 30, unit: 'ml', notes: '2 cucharadas' },
      { id: 'hum-6', name: 'Agua muy fría (para consistencia)', amount: 60, unit: 'ml' },
      { id: 'hum-7', name: 'Sal marina fina', amount: 4, unit: 'g' },
      { id: 'hum-8', name: 'Garbanzos enteros reservados (decoración)', amount: 20, unit: 'g' },
      { id: 'hum-9', name: 'Comino molido, summaq y pimentón dulce/picante', amount: 5, unit: 'g' },
      { id: 'hum-10', name: 'Perejil fresco picado a cuchillo', amount: 15, unit: 'g' },
      { id: 'hum-11', name: 'Panes de pita libaneses', amount: 4, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lavado y reserva para guarnición',
        instruction:
          'Lava muy bien los garbanzos bajo agua fría y escúrrelos por completo. Separa dos cucharadas de garbanzos enteros firmes y resérvalos para la decoración final.',
        timerSeconds: 120,
      },
      {
        stepNumber: 2,
        title: 'Emulsión base en procesador o batidora',
        instruction:
          'Coloca en el vaso de la batidora los garbanzos escurridos, las 3 cucharadas de tahini, el zumo de limón recién exprimido, la pizca de sal marina, el diente de ajo machacado con sal y las 2 cucharadas de aceite de oliva virgen extra. Tritura a velocidad media-alta.',
        timerSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Ajuste de consistencia con agua helada',
        instruction:
          'La tahini espesa notablemente la emulsión. Añade agua muy fría poco a poco mientras sigues triturando hasta conseguir una textura ultrasuave, brillante y aterciopelada sin grumos.',
        timerSeconds: 120,
        tip: 'El agua helada blanquea y aporta una cremosidad inigualable a la pasta de sésamo.',
      },
      {
        stepNumber: 4,
        title: 'Equilibrio de sazón',
        instruction:
          'Prueba la crema con una cuchara y ajusta el balance entre sal y acidez cítrica según tu preferencia.',
      },
      {
        stepNumber: 5,
        title: 'Emplatado clásico con bordillo y pozo',
        instruction:
          'Extiende el hummus en un plato llano grande o cuenco ancho. Con el lomo o envés de una cuchara sopera, realiza movimientos circulares concéntricos desde el centro hacia afuera para formar un bordillo elevado con un pozo central.',
      },
      {
        stepNumber: 6,
        title: 'Decoración tradicional y Versión Beirutí',
        instruction:
          'Vierte en el pozo central un generoso hilo de AOVE. Decora con los garbanzos enteros reservados, una pizca de comino, summaq, pimentón dulce o picante y perejil picado. Si preparas la Versión Beirutí: mezcla perejil picado fino directamente en el hummus aligerándolo previamente con un toque extra de agua. Acompaña con pan pita caliente.',
      },
    ],
  },

  // ========================================================
  // 3. PESTO TRADICIONAL CON ALBAHACA
  // ========================================================
  {
    id: 'pesto-tradicional-albahaca',
    code: 'TAP-1.2',
    title: 'Pesto Tradicional Genovés con Albahaca Fresca',
    subtitle: 'Majado en mortero de hojas frescas de albahaca, piñones tostados, Parmigiano Reggiano y aceite de oliva virgen extra',
    category: 'Tapas y Croquetas',
    difficulty: 'Fácil',
    prepTimeMinutes: 12,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'No calentar las cuchillas ni triturar en exceso: la fricción oxida la clorofila de la albahaca tornando el verde en marrón. El majado acompasado con sal marina rompe las células vegetales liberando los aceites esenciales más puros.',
    pairing: 'Trofie, trenette o gnocchi frescos con patatas hervidas y judías verdes (receta clásica ligure).',
    isFavorite: false,
    createdAt: '2026-10-19T10:10:00Z',
    ingredients: [
      { id: 'pes-1', name: 'Albahaca fresca de hoja tierna', amount: 50, unit: 'g', notes: 'Limpia y muy seca' },
      { id: 'pes-2', name: 'Dientes de ajo pelados', amount: 4, unit: 'ud', notes: 'Sin germen central' },
      { id: 'pes-3', name: 'Queso Parmigiano Reggiano rallado al momento', amount: 100, unit: 'g' },
      { id: 'pes-4', name: 'Piñones nacionales ligeramente tostados', amount: 100, unit: 'g' },
      { id: 'pes-5', name: 'Aceite de oliva virgen extra suave', amount: 60, unit: 'ml', notes: '4 cucharadas soperas' },
      { id: 'pes-6', name: 'Sal marina gruesa', amount: 3, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Emulsión inicial de ajo y aceite',
        instruction:
          'En un mortero de mármol o en el vaso batidor a baja velocidad, maja o bate los 3-4 dientes de ajo con el aceite de oliva virgen extra y una pizca de sal gruesa hasta obtener una base aromática homogénea.',
        timerSeconds: 120,
      },
      {
        stepNumber: 2,
        title: 'Añadido de piñones y queso',
        instruction:
          'Incorpora los 100 g de piñones tostados y los 100 g de Parmigiano Reggiano rallado. Bate suavemente o maja con la mano del mortero en círculos hasta formar una pasta mantecosa.',
        timerSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Integración final de albahaca fresca',
        instruction:
          'Agrega las hojas tiernas de albahaca bien secas. Bate todo junto a pulsos breves (o maja en mortero rotando contra las paredes) solo hasta ligar, preservando el color verde esmeralda brillante sin sobrecalentar.',
        timerSeconds: 60,
        tip: 'Si usas batidora, usa pulsos cortos de 3 segundos para evitar que la hoja se cocine por fricción.',
      },
    ],
  },

  // ========================================================
  // 4. ARROZ CALDOSO CON CARRILLERA AL VINO TINTO Y SETAS
  // ========================================================
  {
    id: 'arroz-caldoso-carrillera-setas',
    code: 'ARR-2.1',
    title: 'Arroz Caldoso con Carrillera de Cerdo al Vino Tinto y Setas',
    subtitle: 'Guiso meloso en olla rápida, reducción de vino a punto de hilo, setas de temporada y caldo trabado con arroz bomba',
    category: 'Arroces y Cremas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 95,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El colágeno de las carrilleras tras 45 min de olla rápida se vuelve pura gelatina; al reducir la salsa hasta que forme un hilo entre los dedos, se consigue un caldo espeso y meloso que arropa el grano de arroz bomba sin necesidad de féculas añadidas.',
    pairing: 'Vino tinto crianza de la Ribera del Duero o Toro con buen cuerpo.',
    isFavorite: true,
    createdAt: '2026-10-19T10:15:00Z',
    ingredients: [
      { id: 'acc-1', name: 'Arroz bomba', amount: 350, unit: 'g' },
      { id: 'acc-2', name: 'Setas de temporada (boletus o níscalos)', amount: 200, unit: 'g', notes: 'Limpias' },
      { id: 'acc-3', name: 'Carrilleras de cerdo ibérico', amount: 2000, unit: 'g', notes: '4 piezas de aprox. 450-500g' },
      { id: 'acc-4', name: 'Harina de trigo (para sellar)', amount: 50, unit: 'g' },
      { id: 'acc-5', name: 'Zanahorias en corte mirepoix', amount: 200, unit: 'g' },
      { id: 'acc-6', name: 'Cebolla en corte mirepoix', amount: 300, unit: 'g' },
      { id: 'acc-7', name: 'Puerro limpio', amount: 1, unit: 'ud' },
      { id: 'acc-8', name: 'Apio fresco', amount: 1, unit: 'rama' },
      { id: 'acc-9', name: 'Vino tinto con cuerpo', amount: 2000, unit: 'ml' },
      { id: 'acc-10', name: 'Aceite de oliva virgen extra', amount: 50, unit: 'ml' },
      { id: 'acc-11', name: 'Pimienta en grano y hoja de laurel', amount: 5, unit: 'g' },
      { id: 'acc-12', name: 'Sal marina y pimienta molida', amount: 10, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Limpieza anatómica de las carrilleras',
        instruction:
          'Limpia cuidadosamente las 4 piezas de carrillera de "telillas", impurezas y exceso de grasa exterior, asegurándote de no comprometer la estructura de la pieza.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Salpimentado y enharinado fino',
        instruction:
          'Salpimienta las piezas por ambas caras y pásalas ligeramente por harina de trigo, sacudiendo cualquier exceso.',
        timerSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Sellado a fuego vivo',
        instruction:
          'En una sartén con fuego vivo y aceite bien caliente, sella las carrilleras cerrando el exterior para conformar una película crujiente dorada homogénea.',
        timerSeconds: 240,
        temperature: '>160 °C',
        tip: 'Sellar es cerrar el exterior sin cocinar por dentro, creando reacción de Maillard.',
      },
      {
        stepNumber: 4,
        title: 'Mirepoix de verduras en olla',
        instruction:
          'En otra olla, marcha el pochado de todas las verduras (zanahoria, cebolla, puerro y apio cortadas en mirepoix) con aceite de oliva virgen extra. Incorpora granos de pimienta negra y una hoja de laurel.',
        timerSeconds: 600,
      },
      {
        stepNumber: 5,
        title: 'Cocción en olla rápida (45 minutos)',
        instruction:
          'Cuando las verduras estén bien pochadas, incorpora las carrilleras selladas a la olla y cubre por completo con los 2 litros de vino tinto. Lleva a ebullición, prueba de sal, cierra la olla rápida y cocina durante exactamente 45 minutos.',
        timerSeconds: 2700,
        temperature: 'Olla rápida (1 bar)',
      },
      {
        stepNumber: 6,
        title: 'Extracción del colágeno y colado',
        instruction:
          'Al liberar la presión, la ternura se habrá apoderado de la dureza del colágeno, convirtiendo las fibras de la carrillera en una pieza sumamente gelatinosa. Cuela la salsa retirando las verduras agotadas.',
        timerSeconds: 180,
      },
      {
        stepNumber: 7,
        title: 'Reducción a punto de hilo (20 min)',
        instruction:
          'Reduce la salsa colada a fuego vivo durante unos 20 minutos hasta que, al enfriar una gota entre los dedos índice y pulgar, forme un hilo continuo.',
        timerSeconds: 1200,
        tip: 'El punto de hilo garantiza que el caldo tenga densidad melosa natural.',
      },
      {
        stepNumber: 8,
        title: 'Porcionado de las carrilleras',
        instruction:
          'Al tiempo, corta cada carrillera atemperada en 4 piezas regulares y resérvalas.',
        timerSeconds: 180,
      },
      {
        stepNumber: 9,
        title: 'Salteado de setas y napado del arroz',
        instruction:
          'Limpia las setas de temporada con un pincel o paño húmedo. Rehogalas en una sartén amplia cubierta con aceite de oliva. Agrega el arroz bomba y remueve 2 minutos para napar los granos.',
        timerSeconds: 180,
      },
      {
        stepNumber: 10,
        title: 'Cocción del arroz caldoso trabado',
        instruction:
          'Cubre el arroz con el caldo reducido caliente de la carrillera y añade los trozos de carne reservados. Deja cocer a fuego medio hasta que el arroz esté en su punto exacto (16-18 min), removiendo de vez en cuando con vaivén para que el caldo se trabe y emulsione.',
        timerSeconds: 1080,
      },
    ],
  },

  // ========================================================
  // 5. ARROZ EN PAELLA MÁS QUE NEGRO DE CHIPIRONES Y ALIOLI
  // ========================================================
  {
    id: 'arroz-negro-chipirones-alioli',
    code: 'ARR-2.2',
    title: 'Arroz en Paella Más que Negro de Chipirones y Alioli',
    subtitle: 'Sofrito concentrado de tomate y cebolla de 20 min, tinta natural, chipirones y rape dorados, acabado al horno',
    category: 'Arroces y Cremas',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El dorado previo de los chipirones y el cazón o rape deja los azúcares caramelizados en el fondo de la paellera. El acabado final de 5 minutos en horno precalentado a 200°C seca el grano superficialmente y concentra los sabores marinos.',
    pairing: 'Vino blanco Verdejo fermentado en barrica o espumoso Brut Nature.',
    isFavorite: false,
    createdAt: '2026-10-19T10:20:00Z',
    ingredients: [
      { id: 'an-1', name: 'Chipirones limpios en tiras finas', amount: 200, unit: 'g' },
      { id: 'an-2', name: 'Cazón o rape limpio en dados', amount: 200, unit: 'g' },
      { id: 'an-3', name: 'Arroz bomba', amount: 150, unit: 'g', notes: '4 raciones' },
      { id: 'an-4', name: 'Cebolla cortada en dados', amount: 1, unit: 'ud' },
      { id: 'an-5', name: 'Dientes de ajo en láminas', amount: 2, unit: 'ud' },
      { id: 'an-6', name: 'Aceite de oliva virgen extra', amount: 45, unit: 'ml' },
      { id: 'an-7', name: 'Tomates maduros rallados', amount: 4, unit: 'ud' },
      { id: 'an-8', name: 'Fumet de pescado de roca y sepia', amount: 600, unit: 'ml' },
      { id: 'an-9', name: 'Tinta de calamar', amount: 8, unit: 'g', notes: '2 sobrecitos' },
      { id: 'an-10', name: 'Sal marina', amount: 5, unit: 'g' },
      { id: 'an-11', name: 'Alioli artesanal (para servir)', amount: 60, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dorar chipirones y rape',
        instruction:
          'Acerca la paellera al fuego y calienta el aceite de oliva. Una vez bien caliente, añade las tiras de chipirón y el rape/cazón. Cocina a fuego vivo hasta que se doren ligeramente. Retira de la paellera y reserva.',
        timerSeconds: 240,
        temperature: 'Fuego vivo',
      },
      {
        stepNumber: 2,
        title: 'Sofrito paciente de 20 minutos',
        instruction:
          'En el mismo aceite con los jugos marinos, incorpora la cebolla en dados y los ajos laminados. Cocina a fuego lento hasta que estén tiernos y hayan perdido su aspecto crudo. Incorpora el tomate rallado y sofríe todos los ingredientes durante 20 minutos a fuego lento.',
        timerSeconds: 1200,
        tip: 'La caramelización del tomate y la cebolla es el alma del color y el sabor de este arroz.',
      },
      {
        stepNumber: 3,
        title: 'Nacarado y disolución de tinta',
        instruction:
          'Añade el arroz bomba al sofrito y rehógalo 2 minutos. Incorpora la tinta de calamar disolviéndola bien entre los granos.',
        timerSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Cocción a fuego vivo (10 a 15 min)',
        instruction:
          'Vuelca el fumet bien caliente y a punto de sal sobre la paellera. Cocina a fuego vivo durante 10 a 15 minutos, distribuyendo el arroz uniformemente.',
        timerSeconds: 780,
      },
      {
        stepNumber: 5,
        title: 'Terminado al horno con los mariscos',
        instruction:
          'Transcurrido este tiempo, pasa la paellera al horno precalentado a 200 °C e introduce los chipirones y el rape reservados. Termina de cocinar 4-5 minutos hasta que el caldo se absorba por completo.',
        timerSeconds: 300,
        temperature: '200 °C horno',
      },
      {
        stepNumber: 6,
        title: 'Reposo y servicio con alioli',
        instruction:
          'Una vez listo el arroz, retira la paellera del horno, cubre con un paño de algodón limpio y deja reposar 3 minutos. Sirve coronando con cucharadas de alioli artesanal.',
        timerSeconds: 180,
      },
    ],
  },

  // ========================================================
  // 6. ALI OLI ARTESANAL AL MORTERO
  // ========================================================
  {
    id: 'ali-oli-artesanal-mortero',
    code: 'TAP-1.3',
    title: 'Ali Oli Artesanal Tradicional al Mortero',
    subtitle: 'Emulsión pura en frío de dientes de ajo morado, sal gruesa, zumo de limón y aceite de oliva virgen extra a hilo',
    category: 'Tapas y Croquetas',
    difficulty: 'Media',
    prepTimeMinutes: 15,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El alioli auténtico al mortero es una emulsión física donde la alicina del ajo actúa de emulsionante natural. La clave es verter el aceite muy despacio, gota a gota al principio y luego a hilo finísimo, sin cesar el movimiento circular del almirez siempre en el mismo sentido.',
    pairing: 'Arroces marineros, fideuà, patatas asadas o carnes a la brasa.',
    isFavorite: false,
    createdAt: '2026-10-19T10:25:00Z',
    ingredients: [
      { id: 'ao-1', name: 'Dientes de ajo pelados', amount: 4, unit: 'ud', notes: 'Sin germen' },
      { id: 'ao-2', name: 'Sal gruesa marina', amount: 3, unit: 'g', notes: '1 pizca' },
      { id: 'ao-3', name: 'Zumo de limón fresco', amount: 5, unit: 'ml', notes: 'Unas gotas' },
      { id: 'ao-4', name: 'Aceite de oliva virgen extra', amount: 150, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Majar el ajo con la sal gruesa',
        instruction:
          'En un mortero tradicional, maja con fuerza los 4 dientes de ajo junto con la sal gruesa hasta obtener una pasta completamente fina, homogénea y sin trozos sólidos.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Emulsión lenta con almirez',
        instruction:
          'Muy poco a poco, añade el aceite de oliva virgen extra a la pasta de ajo (primero gota a gota y luego en un hilo finísimo) mientras no dejas de mezclar y girar con el almirez. Hay que incorporar todo el aceite con cuidado constante de que no se corte la emulsión.',
        timerSeconds: 480,
        tip: 'Si la salsa se vuelve demasiado pesada, unas gotas de agua fría ayudan a estabilizarla.',
      },
      {
        stepNumber: 3,
        title: 'Aderezo cítrico y presentación',
        instruction:
          'Adereza con unas gotas de limón al gusto para redondear el sabor, mezcla 10 segundos más y sirve.',
        timerSeconds: 30,
      },
    ],
  },

  // ========================================================
  // 7. RISOTTO PERAS, GORGONZOLA Y JAMÓN
  // ========================================================
  {
    id: 'risotto-peras-gorgonzola-jamon',
    code: 'ARR-2.3',
    title: 'Risotto de Peras Conferencia, Gorgonzola y Jamón Ibérico',
    subtitle: 'Caldo casero de huesos tostados de jamón de 90 min, arroz arborio nacarado, pera glaseada y mantecatura con queso fundido',
    category: 'Arroces y Cremas',
    difficulty: 'Media',
    prepTimeMinutes: 110,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El contraste entre el dulzor sutil de la pera conferencia confitada y la potencia salina y picante del Gorgonzola crea un maridaje memorable. Los huesos de jamón tostados aportan un fondo umami dorado inigualable.',
    pairing: 'Vino blanco italiano Pinot Grigio o tinto joven maceración carbónica.',
    isFavorite: true,
    createdAt: '2026-10-19T10:30:00Z',
    ingredients: [
      { id: 'rpg-1', name: 'Arroz arborio', amount: 250, unit: 'g' },
      { id: 'rpg-2', name: 'Caldo de huesos de jamón ibérico', amount: 750, unit: 'g', notes: 'O huesos para hacerlo' },
      { id: 'rpg-3', name: 'Queso Gorgonzola cremoso', amount: 250, unit: 'g' },
      { id: 'rpg-4', name: 'Queso Grana Padano rallado', amount: 150, unit: 'g' },
      { id: 'rpg-5', name: 'Mantequilla fría en dados', amount: 100, unit: 'g' },
      { id: 'rpg-6', name: 'Peras conferencia maduras y firmes', amount: 3, unit: 'ud' },
      { id: 'rpg-7', name: 'Chalotas', amount: 2, unit: 'ud' },
      { id: 'rpg-8', name: 'Buen jamón ibérico en lascas', amount: 100, unit: 'g' },
      { id: 'rpg-9', name: 'Sal marina y pimienta negra molida', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Caldo de huesos de jamón tostados (1h 30min)',
        instruction:
          'Elaboraremos el caldo tostando los huesos de jamón en horno o cazuela caliente, agregando abundante agua mineral y cocinando a fuego lento durante 1 hora y 30 minutos. Colar y reservar bien caliente.',
        timerSeconds: 5400,
        temperature: 'Fuego lento',
      },
      {
        stepNumber: 2,
        title: 'Corte fino de peras y chalotas',
        instruction:
          'Pela las peras y córtalas en dados bien pequeños (brunoise fina). Pela y pica igualmente las chalotas bien finas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Sofrito suave de pera y chalota',
        instruction:
          'En una cazuela con un dado de mantequilla, comienza a hacer un sofrito rehogando las chalotas y las peras a fuego medio-suave hasta que empiecen a confitarse.',
        timerSeconds: 360,
      },
      {
        stepNumber: 4,
        title: 'Nacarado y regado continuo (18 min)',
        instruction:
          'Agregamos el arroz arborio al sofrito, nacaramos 2 minutos y comenzamos a regar con el caldo de jamón caliente cazo a cazo. Es fundamental no dejar de mezclar el risotto con suavidad durante los 18 minutos de cocción que nos llevará para que suelte su almidón.',
        timerSeconds: 1080,
        tip: 'Mantener el caldo caliente al añadirlo evita romper el hervor del arroz.',
      },
      {
        stepNumber: 5,
        title: 'Mantecatura enérgica fuera del fuego',
        instruction:
          'Cuando tengamos el arroz al dente exacto a los 18 minutos, retira del fuego y añade el queso Gorgonzola en trozos, la mantequilla fría restante y el queso Grana Padano rallado. Bate enérgicamente para mantecar.',
        timerSeconds: 120,
      },
      {
        stepNumber: 6,
        title: 'Emplatado con jamón ibérico',
        instruction:
          'Sirve de inmediato en plato hondo bien caliente, coronando cada ración con lascas generosas de jamón ibérico que se atemperarán sobre el arroz.',
      },
    ],
  },

  // ========================================================
  // 8. MEJILLONES A LA MARINERA
  // ========================================================
  {
    id: 'mejillones-a-la-marinera',
    code: 'PES-2.1',
    title: 'Mejillones a la Marinera Tradicionales',
    subtitle: 'Apertura al vapor con laurel, brunoise de cebolla francesa al vino blanco, pimentón dulce de la Vera y ligazón con varillas',
    category: 'Pescados y Mariscos',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1533745848184-3db07256e163?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El caldo natural que sueltan los mejillones al abrirse al vapor es pura salinidad marina. Colarlo con una estameña o colador fino evita arenas y aporta todo el sabor sin necesidad de añadir sal adicional a la salsa.',
    pairing: 'Vino blanco Albariño, Rueda o sidra natural asturiana.',
    isFavorite: false,
    createdAt: '2026-10-19T10:35:00Z',
    ingredients: [
      { id: 'mm-1', name: 'Mejillones frescos de roca o ría', amount: 1000, unit: 'g' },
      { id: 'mm-2', name: 'Hoja de laurel seca', amount: 1, unit: 'ud' },
      { id: 'mm-3', name: 'Cebollas francesas picadas en brunoise', amount: 2, unit: 'ud' },
      { id: 'mm-4', name: 'Pimentón dulce de la Vera', amount: 1, unit: 'cda' },
      { id: 'mm-5', name: 'Harina de trigo', amount: 2, unit: 'cda' },
      { id: 'mm-6', name: 'Vino blanco seco', amount: 200, unit: 'ml' },
      { id: 'mm-7', name: 'Perejil fresco finamente picado', amount: 15, unit: 'g' },
      { id: 'mm-8', name: 'Aceite de oliva virgen extra', amount: 30, unit: 'ml' },
      { id: 'mm-9', name: 'Sal marina', amount: 3, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Limpieza de los mejillones',
        instruction:
          'Lava y limpia los mejillones bajo agua fría, retirándoles las barbas con un tirón firme y raspando las impurezas exteriores de las conchas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Apertura al vapor con laurel',
        instruction:
          'Cubre el fondo de una cazuela con un poco de agua, ponla al fuego y añade los mejillones junto con la hoja de laurel. Cuécelos al vapor tapados hasta que se abran por completo (aprox. 3-4 minutos).',
        timerSeconds: 240,
        temperature: 'Vapor tapado',
      },
      {
        stepNumber: 3,
        title: 'Extracción y colado del caldo',
        instruction:
          'Saca los mejillones de sus conchas (puedes reservar media concha para la presentación) y cuela con mucho cuidado el caldo resultante a través de un colador fino para eliminar cualquier resto de arena.',
        timerSeconds: 180,
      },
      {
        stepNumber: 4,
        title: 'Sofrito de cebolla francesa y vino blanco',
        instruction:
          'Pela y pica las cebollas francesas en brunoise muy fina. Pon un poco de aceite de oliva a calentar a fuego medio en una cazuela, echa la cebolla y rehógala hasta que empiece a dorarse. Agrega entonces el vino blanco y la sal y sube el fuego para que el alcohol se evapore.',
        timerSeconds: 360,
      },
      {
        stepNumber: 5,
        title: 'Ligazón aterciopelada de la salsa marina',
        instruction:
          'Agrega el pimentón dulce, el perejil picado, el caldo colado de los mejillones y la harina. Empieza a remover enérgicamente con unas varillas de mano para ligarlo todo y obtener una salsa fina, brillante y sin grumos.',
        timerSeconds: 180,
      },
      {
        stepNumber: 6,
        title: 'Integración final',
        instruction:
          'Añade los mejillones a la salsa ligada, remueve para integrarlo todo con suavidad y retira inmediatamente la cazuela del fuego para que no se sobrecuezan.',
        timerSeconds: 60,
      },
    ],
  },

  // ========================================================
  // 9. CEVICHE CLÁSICO DE CORVINA
  // ========================================================
  {
    id: 'ceviche-clasico-corvina',
    code: 'PES-2.2',
    title: 'Ceviche Clásico Peruano de Corvina con Cancha y Boniato',
    subtitle: 'Curado al instante con ají limo, cilantro fresco, cebolla roja en pluma, leche de tigre natural, maíz cancha tostado y boniato dulce',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 20,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El ceviche contemporáneo no se cocina durante horas en ácido: el pescado se macera apenas unos segundos (curado flash) con cubitos de hielo para mantener la corvina tersa, cruda en su interior y con textura nacarada.',
    pairing: 'Cerveza rubia helada, pisco sour clásico o vino blanco Sauvignon Blanc.',
    isFavorite: true,
    createdAt: '2026-10-19T10:40:00Z',
    ingredients: [
      { id: 'cev-1', name: 'Filetes de pescado blanco (corvina fresca)', amount: 4, unit: 'ud', notes: 'Aprox. 600 g limpios sin piel ni espinas' },
      { id: 'cev-2', name: 'Dientes de ajo picados muy finos', amount: 2, unit: 'ud' },
      { id: 'cev-3', name: 'Ají limo picado fino', amount: 2, unit: 'cdita', notes: 'Sin semillas' },
      { id: 'cev-4', name: 'Hojas de cilantro picadas', amount: 1, unit: 'cdita' },
      { id: 'cev-5', name: 'Zumo de lima fresca recién exprimido', amount: 100, unit: 'ml' },
      { id: 'cev-6', name: 'Cebolla roja cortada en medias lunas (pluma)', amount: 1, unit: 'ud' },
      { id: 'cev-7', name: 'Sal marina fina y pimienta', amount: 5, unit: 'g' },
      { id: 'cev-8', name: 'Cubitos de hielo limpios', amount: 3, unit: 'ud' },
      { id: 'cev-9', name: 'Mazorca de maíz cocida y desgranada (o cancha tostada)', amount: 1, unit: 'ud' },
      { id: 'cev-10', name: 'Boniato cocido cortado en rodajas', amount: 0.5, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Corte anatómico en dados de 2 cm',
        instruction:
          'Para preparar un ceviche clásico utilizaremos siempre pescado blanco de carne firme sin piel ni espinas (corvina). Evitaremos pescado azul o graso. Corta el pescado en dados limpios de 2 cm y colócalo en un bol amplio previamente enfriado.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Salado y primer macerado con ajo y ají',
        instruction:
          'Salpimienta los dados de corvina. Pasado exactamente un minuto de reposo para abrir el poro, añade el ajo picado muy fino y las 2 cucharaditas de ají limo picado. Mezcla muy bien con cuchara fría.',
        timerSeconds: 60,
      },
      {
        stepNumber: 3,
        title: 'Leche de tigre express con cubitos de hielo',
        instruction:
          'Rocía el pescado con el zumo de lima recién exprimido y agrega las hojas de cilantro picadas y los 2-3 cubitos de hielo. Remueve con suavidad y déjalo marinar solo unos segundos.',
        timerSeconds: 45,
        tip: 'Los cubitos mantienen la temperatura gélida impidiendo que el ácido desnaturalice en exceso la proteína.',
      },
      {
        stepNumber: 4,
        title: 'Incorporación de la cebolla roja',
        instruction:
          'Añade la cebolla roja en pluma y retira inmediatamente los cubitos de hielo para que no agüen la preparación. Remueve bien y rectifica de sal y pimienta si fuera necesario.',
        timerSeconds: 30,
      },
      {
        stepNumber: 5,
        title: 'Presentación tradicional peruana',
        instruction:
          'Sirve el ceviche inmediatamente en un plato hondo preenfriado con el maíz cancha tostado crujiente (o choclo) y las rodajas de boniato cocido.',
      },
    ],
  },

  // ========================================================
  // 10. MERLUZA EN SALSA VERDE CON ALMEJAS
  // ========================================================
  {
    id: 'merluza-salsa-verde-almejas',
    code: 'PES-2.3',
    title: 'Merluza de Pincho en Salsa Verde con Almejas de Carril',
    subtitle: 'Lomos de 200g marcados en cazuela de barro, sofrito de cebolleta y ajo, fumet de espinas al vino blanco y emulsión de perejil',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 35,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Para lograr la salsa verde sedosa tradicional, enharina la merluza muy levemente y cocina primero por el lado de la piel. El colágeno de las espinas presente en el fumet casero se emulsiona con el aceite y la harina al mover la cazuela en vaivén.',
    pairing: 'Txakoli de Getaria, Albariño de las Rías Baixas o Godello sobre lías.',
    isFavorite: true,
    createdAt: '2026-10-19T10:45:00Z',
    ingredients: [
      { id: 'msv-1', name: 'Merluza de pincho (en limpio)', amount: 800, unit: 'g', notes: '4 lomos de 200g sacados de pieza de 2 kg' },
      { id: 'msv-2', name: 'Almejas marineras', amount: 200, unit: 'g', notes: 'Purgadas en agua con sal' },
      { id: 'msv-3', name: 'Diente de ajo picado fino', amount: 1, unit: 'ud' },
      { id: 'msv-4', name: 'Cebolla mediana o cebolleta picada muy fina', amount: 1, unit: 'ud' },
      { id: 'msv-5', name: 'Manojo hermoso de perejil fresco picado', amount: 1, unit: 'ud' },
      { id: 'msv-6', name: 'Harina de trigo', amount: 50, unit: 'g', notes: 'Para enharinar + 1 cdita' },
      { id: 'msv-7', name: 'Vino blanco seco', amount: 100, unit: 'ml', notes: '1/2 copa' },
      { id: 'msv-8', name: 'Fumet de espinas de la propia merluza', amount: 200, unit: 'ml' },
      { id: 'msv-9', name: 'Aceite de oliva virgen extra', amount: 40, unit: 'ml' },
      { id: 'msv-10', name: 'Sal marina', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparación y salado de los lomos',
        instruction:
          'Quita las escamas y limpia la merluza en lomos. Saca 4 raciones de 200 g en limpio y sálalas por ambos lados.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Sofrito pausado de ajo y cebolleta',
        instruction:
          'En una cazuela o sartén amplia, pon un dedo de aceite de oliva y cocina el ajo picado a fuego lento. Cuando el ajo esté bailando en el aceite sin quemarse, añade la cebolleta picada lo más fino posible. Cocina despacito hasta que la cebolla esté bien blandita y transparente.',
        timerSeconds: 480,
        temperature: 'Fuego lento',
      },
      {
        stepNumber: 3,
        title: 'Marcado de los lomos de merluza',
        instruction:
          'Pasa los lomos de merluza ligeramente por harina y cocínalos en la sartén con la cebolla y el ajo: primero por el lado de la piel (2 minutos) y luego voltéalos con cuidado por el otro lado.',
        timerSeconds: 240,
      },
      {
        stepNumber: 4,
        title: 'Almejas, perejil, harina y vino blanco',
        instruction:
          'Añade las almejas, el perejil fresco picado y una cucharadita más de harina. Moja con la media copa de vino blanco y cocina a fuego vivo 1-2 minutos hasta que el alcohol se evapore.',
        timerSeconds: 120,
      },
      {
        stepNumber: 5,
        title: 'Fumet y cocción tapada hasta apertura de almejas',
        instruction:
          'Añade el fumet caliente elaborado con las espinas de la merluza y tapa la cazuela. El tiempo exacto que necesita la merluza es hasta que se abran las almejas (aprox. 3 a 5 minutos a fuego medio). Sirve inmediatamente.',
        timerSeconds: 240,
        tip: 'Mueve la cazuela con vaivén para que el jugo ligue en una salsa verde aterciopelada.',
      },
    ],
  },

  // ========================================================
  // 11. PAPILLOTE DE SALMÓN Y VERDURAS
  // ========================================================
  {
    id: 'papillote-salmon-verduras',
    code: 'PES-2.4',
    title: 'Papillote de Salmón y Verduras con Salsa de Miel y Mostaza',
    subtitle: 'Cocción al vapor en su propio jugo en paquete sulfurizado a 180 °C, juliana de puerro y pimientos tricolor, eneldo y vinagreta templada',
    category: 'Pescados y Mariscos',
    difficulty: 'Fácil',
    prepTimeMinutes: 25,
    baseServings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Cocinar en papillote concentra al 100% los sabores y aromas al cocinar en vapor y en su propio jugo. El ajo en camisa (con su piel chafada de un golpe de cuchillo) aromatiza el pescado sin quemarse ni amargar.',
    pairing: 'Vino blanco Chardonnay con crianza o vino rosado pálido provenzal.',
    isFavorite: false,
    createdAt: '2026-10-19T10:50:00Z',
    ingredients: [
      { id: 'psv-1', name: 'Salmón fresco en supremas limpias', amount: 800, unit: 'g', notes: '4 raciones de 200g' },
      { id: 'psv-2', name: 'Puerro en juliana muy fina', amount: 1, unit: 'ud' },
      { id: 'psv-3', name: 'Pimiento rojo en juliana', amount: 1, unit: 'ud' },
      { id: 'psv-4', name: 'Pimiento amarillo en juliana', amount: 1, unit: 'ud' },
      { id: 'psv-5', name: 'Dientes de ajo con piel (en camisa) chafados', amount: 4, unit: 'ud' },
      { id: 'psv-6', name: 'Eneldo fresco', amount: 10, unit: 'g', notes: 'Unas ramitas' },
      { id: 'psv-7', name: 'Aceite de oliva virgen extra', amount: 20, unit: 'ml' },
      { id: 'psv-8', name: 'Pimienta blanca recién molida y sal', amount: 5, unit: 'g' },
      { id: 'psv-9', name: 'Mostaza de Dijon (para la salsa)', amount: 4, unit: 'cda' },
      { id: 'psv-10', name: 'Miel de flores (para la salsa)', amount: 2, unit: 'cda' },
      { id: 'psv-11', name: 'Eneldo finamente picado (para la salsa)', amount: 1, unit: 'cdita' },
      { id: 'psv-12', name: 'Zumo de limón fresco (para la salsa)', amount: 10, unit: 'ml', notes: 'Unas gotas' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Corte fino de verduras y ajos en camisa',
        instruction:
          'Comenzaremos cortando el puerro y los pimientos rojo y amarillo en juliana o en láminas muy finas, ya que han de cocinarse en un corto periodo de tiempo. A los dientes de ajo, con la piel o en camisa, les daremos un leve golpe plano con la hoja del cuchillo para facilitar la salida de su aroma.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Montaje de los paquetes de papillote',
        instruction:
          'Una vez listas las verduras, comenzaremos a formar los paquetes o papillote. Sobre papel de aluminio o papel sulfurizado, colocaremos una de las piezas de salmón. Sobre este, unas tiras de puerros y pimientos, una ramita de eneldo y uno de los dientes de ajo en camisa. Rociaremos con un poco de aceite de oliva y pimienta blanca recién molida.',
        timerSeconds: 240,
      },
      {
        stepNumber: 3,
        title: 'Cierre hermético con cámara de vapor',
        instruction:
          'Cerraremos los paquetes haciendo varios dobleces en los bordes y dejando una leve capa de aire en su interior. Tendremos que asegurarnos de cerrar muy bien los paquetes para que no se escape el vapor generado durante la cocción.',
        timerSeconds: 120,
        tip: 'La cámara de aire es indispensable para que el vapor circule inflando el paquete.',
      },
      {
        stepNumber: 4,
        title: 'Horneado a 180 °C (10 a 15 min)',
        instruction:
          'Una vez precalentado el horno a 180 °C, introduciremos el salmón durante unos 10 o 15 minutos. El tiempo variará en función del grosor y peso de la pieza de salmón.',
        timerSeconds: 720,
        temperature: '180 °C horno',
      },
      {
        stepNumber: 5,
        title: 'Salsa de miel y mostaza al eneldo',
        instruction:
          'Para la salsa: mezclaremos en un bol las 4 cucharadas de mostaza, las 2 cucharadas de miel, la cucharadita de eneldo finamente picado y unas gotas de zumo de limón. Removeremos hasta obtener una salsa homogénea y brillante.',
        timerSeconds: 120,
      },
      {
        stepNumber: 6,
        title: 'Apertura aromática en la mesa',
        instruction:
          'Abre el papillote con cuidado en la mesa delante de los comensales para disfrutar del golpe de vapor aromático y acompaña con la salsa de miel y mostaza.',
      },
    ],
  },
];
