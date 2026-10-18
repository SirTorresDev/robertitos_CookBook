import { Recipe } from '@/types/cookbook';

export const COURSE_RECIPES: Recipe[] = [
  // ========================================================
  // KITCHEN CLUB — CURSO DE COCINA AVANZADO (DÍA 3)
  // ========================================================
  {
    id: 'gyozas-foie-pato-naranja-kc3',
    code: 'KC-3.1',
    title: 'Gyozas de Foie y Pato a la Naranja',
    subtitle: 'Relleno meloso de confit y foie fresco, vapor, base tostada crujiente y salsa de naranja al togarashi',
    category: 'Tapas y Croquetas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 45,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'La grasa noble del foie fresco cortado en mirepoix se funde durante la cocción al vapor aromatizando la carne desmenuzada del confit. La salsa de naranja ligada con soja y togarashi corta la untuosidad y aporta frescor cítrico.',
    pairing: 'Vino blanco albariño sobre lías o cerveza artesanal de trigo.',
    isFavorite: false,
    createdAt: '2026-10-18T10:00:00Z',
    ingredients: [
      { id: 'gfp-1', name: 'Carne de confit de pato desmenuzada', amount: 180, unit: 'g' },
      { id: 'gfp-2', name: 'Foie fresco de pato en mirepoix', amount: 150, unit: 'g' },
      { id: 'gfp-3', name: 'Cebolletas chinas (parte blanca brunoise, parte verde aros)', amount: 2, unit: 'ud' },
      { id: 'gfp-4', name: 'Salsa de ostras', amount: 30, unit: 'g' },
      { id: 'gfp-5', name: 'Obleas para gyozas', amount: 12, unit: 'ud' },
      { id: 'gfp-6', name: 'Naranja fresca (zumo y ralladura de la piel)', amount: 1, unit: 'ud' },
      { id: 'gfp-7', name: 'Caldo de pollo', amount: 100, unit: 'ml' },
      { id: 'gfp-8', name: 'Salsa de soja', amount: 30, unit: 'ml' },
      { id: 'gfp-9', name: 'Maicena (para ligar la salsa)', amount: 1, unit: 'cda' },
      { id: 'gfp-10', name: 'Cilantro fresco picado', amount: 2, unit: 'rama' },
      { id: 'gfp-11', name: 'Sésamo tostado, Shichimi Togarashi y Furikake', amount: 10, unit: 'g', notes: 'Para terminar el plato' },
      { id: 'gfp-12', name: 'Aceite de oliva y pimienta negra molida', amount: 15, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Masa del relleno de foie y pato',
        instruction:
          'Corta en brunoise fina la parte blanca de las cebolletas chinas y corta la verde en aros finos (reservar para el montaje). Desmenuza el confit de pato y corta el foie fresco en mirepoix. Mezcla en un bol la carne, el foie, la cebolleta blanca, la salsa de ostras y pimienta negra hasta obtener una farsa homogénea.',
        timerSeconds: 300,
        tip: 'No calentar el foie con las manos para que mantenga sus dados fríos hasta la cocción.',
      },
      {
        stepNumber: 2,
        title: 'Plegado tradicional de las gyozas',
        instruction:
          'Moja el borde exterior de cada oblea con un dedo humedecido en agua. Coloca una cucharada de relleno en el centro y cierra frunciendo los bordes con pliegues en abanico sellando firmemente para que no escape el jugo.',
        timerSeconds: 360,
      },
      {
        stepNumber: 3,
        title: 'Cocción al vapor (8 minutos)',
        instruction:
          'Coloca las gyozas sobre papel vegetal perforado en la vaporera. Cuece al vapor durante exactamente 8 minutos.',
        timerSeconds: 480,
        temperature: '100 °C vapor',
      },
      {
        stepNumber: 4,
        title: 'Marcado de la base crujiente',
        instruction:
          'En una sartén a fuego máximo con un chorrito de aceite de oliva, marca las gyozas solo por la parte de abajo hasta que la base quede dorada y crujiente.',
        timerSeconds: 120,
        temperature: '>140 °C Maillard',
      },
      {
        stepNumber: 5,
        title: 'Salsa de naranja ligada',
        instruction:
          'Ralla la piel de la naranja y exprime su zumo. En un cuenco disuelve la maicena con 2 cucharadas de agua. En un cazo hierve el zumo de naranja, la ralladura y el caldo de pollo; cuando rompa a hervir añade la maicena disuelta poco a poco con varilla hasta que espese. Apaga el fuego e incorpora la salsa de soja y el cilantro picado.',
        timerSeconds: 240,
      },
      {
        stepNumber: 6,
        title: 'Montaje de autor',
        instruction:
          'En una fuente alargada coloca las gyozas en fila, pinta con la salsa de naranja en líneas transversales y espolvorea sésamo tostado, shichimi togarashi, los aros verdes de cebolleta china y furikake.',
      },
    ],
  },
  {
    id: 'noquis-huancaina-langostinos-pastor-kc3',
    code: 'KC-3.2',
    title: 'Ñoquis a la Huancaína, Langostinos al Pastor y Lomo Saltado',
    subtitle: 'Fusión chifa-andina con ají amarillo, langostinos marinados y glasa umami de lomo saltado al humo',
    category: 'Pescados y Mariscos',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 50,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Mantecar los ñoquis dentro de la huancaína caliente con movimientos suaves durante 3 minutos liga la fécula de la patata con el queso fresco y la leche evaporada. Las verduras al wok deben saltearse apenas 1 minuto cada una para conservar una textura al dente impecable.',
    pairing: 'Pisco Sour clásico o vino blanco Chardonnay con paso por barrica.',
    isFavorite: false,
    createdAt: '2026-10-18T10:05:00Z',
    ingredients: [
      { id: 'nhl-1', name: 'Ñoquis de patata', amount: 700, unit: 'g' },
      { id: 'nhl-2', name: 'Langostinos (pelados dejando la cola intacta)', amount: 12, unit: 'ud' },
      { id: 'nhl-3', name: 'Pasta de ají amarillo peruano', amount: 40, unit: 'g' },
      { id: 'nhl-4', name: 'Queso fresco tipo latino', amount: 100, unit: 'g' },
      { id: 'nhl-5', name: 'Queso parmesano rallado', amount: 50, unit: 'g' },
      { id: 'nhl-6', name: 'Leche evaporada', amount: 250, unit: 'ml' },
      { id: 'nhl-7', name: 'Leche entera + 1 rebanada pan de molde', amount: 100, unit: 'ml' },
      { id: 'nhl-8', name: 'Caldo de pollo', amount: 200, unit: 'ml' },
      { id: 'nhl-9', name: 'Caldo de carne (para salsa lomo saltado)', amount: 150, unit: 'ml' },
      { id: 'nhl-10', name: 'Salsa de soja (60 ml) + Salsa de ostras (40 ml)', amount: 100, unit: 'ml' },
      { id: 'nhl-11', name: 'Vinagre blanco (30 ml) + Azúcar moreno (30 g) + Humo en polvo', amount: 65, unit: 'g' },
      { id: 'nhl-12', name: 'Adobo al pastor: comino, ajo en polvo, orégano, pimentón dulce y picante', amount: 20, unit: 'g' },
      { id: 'nhl-13', name: 'Tomates cherry (18 u) + Cebolla morada en gajos + Ají fresco juliana + Cilantro', amount: 150, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Maceración de langostinos al pastor (1 hora)',
        instruction:
          'Pela los 12 langostinos dejando la cola sin pelar. En un bol mezcla comino molido, ajo en polvo, orégano, pimentón dulce, pimentón picante y sal. Impregna los langostinos y deja macerar en nevera al menos 1 hora.',
        timerSeconds: 3600,
      },
      {
        stepNumber: 2,
        title: 'Salsa Huancaína cremosa',
        instruction:
          'En sartén dora la cebolla en mirepoix hasta que tueste ligeramente. Añade comino, ajo molido y pasta de ají amarillo. Pasa al vaso de batidora con el pan remojado en leche, queso fresco, parmesano, leche evaporada, caldo de pollo y sal. Tritura hasta una emulsión fina y amarilla brillante.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Reducción de salsa de lomo saltado',
        instruction:
          'En un cazo hierve a fuego medio el caldo de carne, soja, salsa de ostras, vinagre blanco, azúcar moreno y el humo en polvo durante 5 minutos. Disuelve una cucharadita de maicena en agua fría e incorpórala moviendo con varilla hasta que espese con textura de glasa brillante.',
        timerSeconds: 300,
      },
      {
        stepNumber: 4,
        title: 'Cocción y mantecado de los ñoquis',
        instruction:
          'Cuece los ñoquis en abundante agua hirviendo con sal; en cuanto suban a la superficie rescátalos con espumadera. En una sartén amplia vierte la salsa huancaína caliente, añade los ñoquis y remueve con movimientos envolventes durante 3 minutos para ligar la salsa. Termina con pimienta negra recién molida.',
        timerSeconds: 180,
      },
      {
        stepNumber: 5,
        title: 'Salteado wok al dente',
        instruction:
          'En un wok o sartén a fuego muy vivo con unas gotas de aceite saltea la cebolla morada en gajos anchos, el ají amarillo en juliana y los cherrys cortados por la mitad (1 minuto por ingrediente para mantenerlos crocantes). En el mismo wok saltea los langostinos al pastor 1-2 minutos a fuego fuerte.',
        timerSeconds: 120,
        temperature: '>180 °C Wok',
      },
      {
        stepNumber: 6,
        title: 'Montaje y servicio',
        instruction:
          'En el centro del plato hondo sirve los ñoquis mantecados en huancaína. Corona con un cordón de salsa de lomo saltado, las verduras salteadas, los langostinos al pastor con la cola erguida hacia arriba y chiffonade de cilantro fresco.',
      },
    ],
  },
  {
    id: 'lasana-streetxo-kc3',
    code: 'KC-3.3',
    title: 'Lasaña Streetxo (Boloñesa Coreana & Doble Wonton)',
    subtitle: 'Vaca vieja marinada con gochujang y kimchi, bechamel de rulo de cabra y cardamomo, y wonton frito y cocido',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 90,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Inspirada en la alta cocina callejera de Dabiz Muñoz: una lasaña deconstruida que une el wonton cocido en agua con hielo (textura sedosa) con el wonton frito crujiente a modo de tapa. El cardamomo en la bechamel equilibra el picante fermentado del gochujang y el kimchi.',
    pairing: 'Vino tinto garnacha o cerveza negra tipo Porter.',
    isFavorite: false,
    createdAt: '2026-10-18T10:10:00Z',
    ingredients: [
      { id: 'lsx-1', name: 'Carne picada de vaca vieja', amount: 750, unit: 'g' },
      { id: 'lsx-2', name: 'Pasta coreana gochujang', amount: 40, unit: 'g' },
      { id: 'lsx-3', name: 'Salsa kimchi base coreana', amount: 30, unit: 'g' },
      { id: 'lsx-4', name: 'Tomate concentrado (2 cda) + Vino fino andaluz (70 ml)', amount: 100, unit: 'g' },
      { id: 'lsx-5', name: 'Sofrito: ajo, 20 g jengibre fresco, cebolla morada, zanahoria y apio', amount: 250, unit: 'g' },
      { id: 'lsx-6', name: 'Especias boloñesa: 5 especias chinas, coriandro en polvo y comino', amount: 10, unit: 'g' },
      { id: 'lsx-7', name: 'Bechamel: 100 g mantequilla, 90 g harina, 1 L leche, 4 cardamomos verdes', amount: 1200, unit: 'g' },
      { id: 'lsx-8', name: 'Rulo de queso de cabra (para la bechamel)', amount: 80, unit: 'g' },
      { id: 'lsx-9', name: 'Obleas de pasta wonton (6 para cocer + 6 para freír)', amount: 12, unit: 'ud' },
      { id: 'lsx-10', name: 'Pomodoro especiado: tomate frito (100 ml), orégano y comino', amount: 120, unit: 'g' },
      { id: 'lsx-11', name: 'Acabado: Polvo de tomate seco, coco rallado y cebollino picado', amount: 15, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sofrito paciente de la boloñesa (35 min)',
        instruction:
          'Pica en brunoise fina ajo y jengibre; sofríe 1 min en AOVE. Añade cebolla morada picada y pocha 15 minutos a fuego bajo. Agrega zanahoria y apio en brunoise y sofríe todo junto 20 minutos más removiendo con mimo.',
        timerSeconds: 2100,
      },
      {
        stepNumber: 2,
        title: 'Guisado de vaca vieja con Gochujang (1 hora)',
        instruction:
          'Sube el fuego, añade la carne de vaca vieja separándola para que no se apelmace. Agrega las 5 especias chinas, el coriandro y el comino. Vierte el vino fino y evapora el alcohol. Incorpora el gochujang, el kimchi base, el tomate concentrado y sal. Tapa y cocina a fuego muy lento durante 1 hora.',
        timerSeconds: 3600,
      },
      {
        stepNumber: 3,
        title: 'Salsa Pomodoro especiada al comino',
        instruction:
          'En un cazo pequeño con AOVE tuesta comino molido y orégano para que despierten sus aceites esenciales. Añade el tomate frito con 30 ml de agua, sazona con sal y retira del fuego.',
        timerSeconds: 180,
      },
      {
        stepNumber: 4,
        title: 'Bechamel de rulo de cabra y cardamomo',
        instruction:
          'Calienta 1 L de leche con los 4 granos de cardamomo e infusiona 10 min. En olla derrite 100 g de mantequilla con AOVE, añade 90 g de harina y cocina el roux durante 4 minutos. Incorpora la leche caliente colada poco a poco con varilla hasta ligar; desmenuza el rulo de cabra dentro y salpimenta. Pasa por robot de cocina para lograr textura de seda.',
        timerSeconds: 600,
      },
      {
        stepNumber: 5,
        title: 'Doble cocción de pasta wonton',
        instruction:
          'Freír: En sartén con abundante aceite muy caliente fríe 6 láminas de wonton hasta que suflen crujientes (escurrir en papel). Cocer: Hierve agua y cuece las otras 6 láminas de wonton durante 1 minuto, rescatándolas inmediatamente a un bol de agua con hielo.',
        timerSeconds: 60,
      },
      {
        stepNumber: 6,
        title: 'Montaje deconstruido Streetxo',
        instruction:
          'Pinta la base del plato con la salsa pomodoro a modo de brochazo. Coloca una generosa bola de boloñesa coreana en el centro, cúbrela con una lámina de wonton cocido, napa con bechamel de cabra, corona con la lámina de wonton crujiente a modo de cúpula y espolvorea tomate seco en polvo, coco rallado y cebollino picado.',
      },
    ],
  },
  {
    id: 'chocolate-coco-mango-curry-kc3',
    code: 'KC-3.4',
    title: 'Chocolate, Coco, Mango y Curry',
    subtitle: 'Ganache de chocolate 70% emulsionada, espuma etérea de coco en sifón y coulis cítrico de mango al anís',
    category: 'Postres y Dulces',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 35,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Comprobar con termómetro que tanto la nata caliente como la cobertura de chocolate fundida se encuentren entre 35 °C y 40 °C antes de emulsionar garantiza que la grasa no se separe. La calidez del curry y el anís estrellado subliman el dulzor del mango.',
    pairing: 'Vino dulce Pedro Ximénez o licor de cacao.',
    isFavorite: false,
    createdAt: '2026-10-18T10:15:00Z',
    ingredients: [
      { id: 'cmc-1', name: 'Chocolate negro cobertura 70%', amount: 225, unit: 'g' },
      { id: 'cmc-2', name: 'Nata para montar (para la ganache)', amount: 200, unit: 'ml' },
      { id: 'cmc-3', name: 'Azúcar blanco', amount: 50, unit: 'g' },
      { id: 'cmc-4', name: 'Mantequilla en dados', amount: 25, unit: 'g' },
      { id: 'cmc-5', name: 'Crema de coco (para la espuma de sifón)', amount: 200, unit: 'ml' },
      { id: 'cmc-6', name: 'Nata líquida (para la espuma de sifón)', amount: 100, unit: 'ml' },
      { id: 'cmc-7', name: 'Gelatina en hoja cola de pez', amount: 0.5, unit: 'ud', notes: 'Aprox. 1/5 a 1/2 hoja' },
      { id: 'cmc-8', name: 'Puré de mango natural', amount: 180, unit: 'ml' },
      { id: 'cmc-9', name: 'Piel de naranja sin parte blanca + 1 anís estrellado', amount: 1, unit: 'ud' },
      { id: 'cmc-10', name: 'Curry en polvo de calidad superior', amount: 30, unit: 'g' },
      { id: 'cmc-11', name: 'Hojitas de hierbabuena fresca y semillas de amapola', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Ganache de chocolate a 35 °C – 40 °C',
        instruction:
          'Hierve la nata con el azúcar durante 5 minutos. Funde el chocolate al baño maría. Deja que ambos bajen de temperatura hasta estar entre 35 °C y 40 °C. Añade la nata templada sobre el chocolate poco a poco mezclando con varilla hasta emulsionar; incorpora la mantequilla en dados hasta obtener un espejo brillante.',
        timerSeconds: 300,
        temperature: '35–40 °C',
      },
      {
        stepNumber: 2,
        title: 'Espuma de coco en sifón (2 cargas)',
        instruction:
          'Hidrata la hoja de gelatina en agua fría. Hierve la crema de coco con la nata y el azúcar; disuelve la gelatina escurrida y cocina 3 minutos más. Cuela por chino fino, introduce en el sifón de cocina, inyecta 2 cargas de gas N2O, agita con fuerza y deja enfriar en la nevera al menos 1 hora.',
        timerSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Coulis especiado de mango y curry (15 min)',
        instruction:
          'En un cazo mezcla el puré de mango, agua, piel de naranja, azúcar, el curry en polvo y el anís estrellado. Al romper a hervir baja el fuego y cocina durante 15 minutos. Retira el anís estrellado y la piel de naranja y reserva frío.',
        timerSeconds: 900,
      },
      {
        stepNumber: 4,
        title: 'Montaje en copa de balón',
        instruction:
          'En la base de una copa de balón vierte la ganache de chocolate y deja templar 10 minutos en nevera. Descarga una nube generosa de espuma de coco sobre el chocolate, napa con el coulis de mango al curry y corona con hojitas de hierbabuena fresca y semillas de amapola.',
        timerSeconds: 600,
      },
    ],
  },

  // ========================================================
  // KITCHEN CLUB — CURSO DE COCINA AVANZADO (DÍA 4)
  // ========================================================
  {
    id: 'menestra-cigalas-azafran-kc4',
    code: 'KC-4.1',
    title: 'Menestra de Verduras con Colas y Caldo de Cigalas al Azafrán',
    subtitle: 'Fondo tostado de cabezas machacadas flambeado al brandy, verduras al wok al dente y colas salteadas',
    category: 'Pescados y Mariscos',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 60,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Tostar las cabezas y pinzas machacándolas en la olla hasta que estén casi caramelizadas aporta una potencia marina inigualable antes de flambear con brandy. Las verduras no se mezclan en la sartén: se saltean 3 min cada una por separado para respetar su punto crujiente.',
    pairing: 'Vino blanco Godello fermentado en barrica.',
    isFavorite: false,
    createdAt: '2026-10-18T10:20:00Z',
    ingredients: [
      { id: 'mca-1', name: 'Cigalas medianas (separar 12 colas limpias de cabezas y pinzas)', amount: 12, unit: 'ud' },
      { id: 'mca-2', name: 'Alcachofas frescas (cocer 15 min con perejil)', amount: 2, unit: 'ud' },
      { id: 'mca-3', name: 'Coliflor pequeña en arbolitos (cocer 20 min)', amount: 1, unit: 'ud' },
      { id: 'mca-4', name: 'Zanahorias en bastones (2 u) + Habas edamame (80 g)', amount: 180, unit: 'g' },
      { id: 'mca-5', name: 'Verduras fondo: 1/2 cabeza ajo con piel, 1 puerro, 1 cebolla, 2 tomates pera y apio', amount: 350, unit: 'g' },
      { id: 'mca-6', name: 'Aromáticos: 1.5 sobres azafrán tostado, 1 anís estrellado y pimienta negra en grano', amount: 10, unit: 'g' },
      { id: 'mca-7', name: 'Brandy para flambear', amount: 80, unit: 'ml' },
      { id: 'mca-8', name: 'Roux ligero para el caldo: 40 g mantequilla + 30 g harina', amount: 70, unit: 'g' },
      { id: 'mca-9', name: 'AOVE virgen extra, sal en escamas y ramitas de perejil fresco', amount: 20, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cocción y corte de verduras base',
        instruction:
          'Limpia las alcachofas quedándote solo con el corazón amarillo; cuécelas en agua hirviendo con perejil durante 15 minutos y córtalas en cuartos. Cuece los arbolitos de coliflor en agua con sal 20 minutos. Pela las zanahorias y córtalas en bastones finos.',
        timerSeconds: 1200,
      },
      {
        stepNumber: 2,
        title: 'Fondo tostado de cigalas y flambeado (35 min)',
        instruction:
          'En olla muy caliente con AOVE dora las cabezas y pinzas machacándolas con un mazo para extraer el coral. Tuesta en esa misma grasa el puerro, cebolla, ajo con piel, tomate pera y apio a fuego vivo. Vuelve a incorporar las cabezas, añade azafrán, anís estrellado y pimienta en grano. Flambea con los 80 ml de brandy, cubre con 1.5 L de agua y hierve 35 minutos. Cuela aplastando fuertemente.',
        timerSeconds: 2100,
      },
      {
        stepNumber: 3,
        title: 'Ligazón aterciopelada con Roux',
        instruction:
          'En una cazuela a fuego medio derrite los 40 g de mantequilla, añade los 30 g de harina y cocina el roux durante 4 minutos. Vierte el caldo de cigalas caliente batiendo con varilla hasta que espese sutilmente.',
        timerSeconds: 240,
      },
      {
        stepNumber: 4,
        title: 'Salteado wok por separado (3 min cada verdura)',
        instruction:
          'En sartén o wok muy caliente saltea cada verdura por separado durante 3 minutos con un hilo de AOVE y pimienta negra para que doren por fuera manteniendo crocancia viva.',
        timerSeconds: 180,
      },
      {
        stepNumber: 5,
        title: 'Marcado relámpago de las colas de cigala',
        instruction:
          'En sartén muy caliente con unas gotas de aceite pasa las 12 colas limpias durante apenas 1 minuto por cada lado, sazonando con sal, dejándolas translúcidas y jugosas en el centro.',
        timerSeconds: 60,
      },
      {
        stepNumber: 6,
        title: 'Montaje en plato semi hondo',
        instruction:
          'Sirve un cazo generoso de caldo de cigalas al azafrán. Coloca las verduras alternadas por colores con volumen hacia arriba, sitúa dos colitas de cigala encima, napa con gotas de AOVE virgen extra, sal en escamas y unas ramitas de perejil "plantadas".',
      },
    ],
  },
  {
    id: 'merluza-beurre-blanc-chirivia-hinojo-kc4',
    code: 'KC-4.2',
    title: 'Merluza con Beurre Blanc, Chirivía, Guisantes e Hinojo',
    subtitle: 'Lomo sellado en sartén y horneado a 200 °C, beurre blanc tradicional y salteado fino de hinojo',
    category: 'Pescados y Mariscos',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 40,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Sellar la merluza SOLO por el lado de la piel en sartén de hierro crea un escudo tostado y crujiente que protege el lomo; los 6 minutos finales al horno a 200 °C terminan la cocción suavemente dejando las lascas jugosas. La beurre blanc debe montarse con mantequilla pomada fuera del fuego.',
    pairing: 'Vino blanco Chablis o Chardonnay atlántico.',
    isFavorite: false,
    createdAt: '2026-10-18T10:25:00Z',
    ingredients: [
      { id: 'mbh-1', name: 'Lomos de merluza fresca con piel sin espinas', amount: 6, unit: 'ud' },
      { id: 'mbh-2', name: 'Chalotas picadas en micro brunoise', amount: 4, unit: 'ud' },
      { id: 'mbh-3', name: 'Vino blanco seco (80 ml) + Vinagre de Jerez (15 ml)', amount: 95, unit: 'ml' },
      { id: 'mbh-4', name: 'Mantequilla en pomada (para la beurre blanc)', amount: 150, unit: 'g' },
      { id: 'mbh-5', name: 'Chirivía en juliana muy fina', amount: 2, unit: 'ud' },
      { id: 'mbh-6', name: 'Bulbo pequeño de hinojo en juliana muy fina', amount: 1, unit: 'ud' },
      { id: 'mbh-7', name: 'Guisantes frescos lágrima o tiernos', amount: 100, unit: 'g' },
      { id: 'mbh-8', name: 'Brotes frescos de guisante y sal en escamas', amount: 10, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Reducción de chalota, vino y vinagre',
        instruction:
          'En un cazo con una lágrima de AOVE pocha las chalotas picadas 5 minutos sin dorar. Añade el vino blanco y el vinagre de Jerez; reduce a fuego lento hasta que el líquido casi se evapore por completo.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Montado de la Beurre Blanc francesa',
        instruction:
          'Retira el cazo del fuego. Añade la mantequilla en pomada poco a poco sobre las chalotas templadas batiendo intensamente con varilla hasta lograr una emulsión mantecosa y sedosa. Salpimenta con pimienta blanca.',
        timerSeconds: 180,
        tip: 'Hacerlo fuera del fuego evita que la mantequilla se derrita en aceite líquido.',
      },
      {
        stepNumber: 3,
        title: 'Salteado crujiente de chirivía e hinojo',
        instruction:
          'En wok o sartén caliente con AOVE saltea la juliana de chirivía e hinojo durante 10 minutos a fuego vivo removiendo sin parar hasta dorar. En sartén aparte saltea los guisantes frescos 3 minutos.',
        timerSeconds: 600,
      },
      {
        stepNumber: 4,
        title: 'Sellado de la piel de la merluza',
        instruction:
          'Salpimienta los lomos de merluza por la carne. En sartén a fuego medio-alto dora los lomos SOLO por la piel durante 2 minutos hasta que quede bien tostada y crujiente.',
        timerSeconds: 120,
      },
      {
        stepNumber: 5,
        title: 'Horneado de precisión a 200 °C (6 min)',
        instruction:
          'Introduce los lomos con la piel hacia arriba en horno precalentado a 200 °C durante exactamente 6 minutos para que las láminas queden nacaradas.',
        timerSeconds: 360,
        temperature: '200 °C horno',
      },
      {
        stepNumber: 6,
        title: 'Emplatado',
        instruction:
          'Dispone un cacito de beurre blanc en el centro del plato, coloca los medallones de merluza con la piel dorada hacia arriba, corona con un nido de chirivía, hinojo, guisantes, sal en escamas y brotes frescos.',
      },
    ],
  },
  {
    id: 'pichon-tres-cocciones-apionabo-kc4',
    code: 'KC-4.3',
    title: 'Pichón en Tres Cocciones y Puré de Apionabo',
    subtitle: 'Pechugas sangrantes a 200 °C, muslitos guisados al oporto, cremoso de hígado al foie y puré asado',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 90,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Tratamiento magistral de ave noble: las pechugas se marcan 1.5 min por cara y reposan 4 min a 200 °C para mantener su corazón rojo sangre; los muslitos se estofan melosos en la salsa reducida de oporto y caramelo; los interiores se trituran en un paté cremoso con foie.',
    pairing: 'Vino tinto de guarda Ribera del Duero o Borgoña Pinot Noir.',
    isFavorite: false,
    createdAt: '2026-10-18T10:30:00Z',
    ingredients: [
      { id: 'ptc-1', name: 'Pechugas de pichón con piel (selladas y horno 4 min)', amount: 6, unit: 'ud' },
      { id: 'ptc-2', name: 'Muslitos de pichón con piel (guisados 10 min en salsa)', amount: 6, unit: 'ud' },
      { id: 'ptc-3', name: 'Hígados de los pichones + Foie mi-cuit (100 g)', amount: 180, unit: 'g' },
      { id: 'ptc-4', name: 'Carcasas (3 u) y patitas (6 u) para el fondo', amount: 9, unit: 'ud' },
      { id: 'ptc-5', name: 'Vino de Oporto (300 ml) + Caramelo de azúcar (80 g) + Tomillo', amount: 380, unit: 'g' },
      { id: 'ptc-6', name: 'Verduras fondo: 3 ajos, cebolla, zanahoria y puerro', amount: 300, unit: 'g' },
      { id: 'ptc-7', name: 'Cremoso: 40 g mantequilla, 3 chalotas, 80 ml brandy y 120 g nata', amount: 240, unit: 'g' },
      { id: 'ptc-8', name: 'Puré: 1 apionabo + 1 patata (asados 35 min a 190 °C) + 1/2 manzana ácida', amount: 500, unit: 'g' },
      { id: 'ptc-9', name: 'Cebolla morada encurtida en vinagre de manzana y azúcar', amount: 1, unit: 'ud' },
      { id: 'ptc-10', name: 'Brotes de acedera y sal en escamas', amount: 5, unit: 'g' },
      { id: 'ptc-11', name: 'Agua', amount: 2000, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fondo concentrado al Oporto y caramelo (1 h)',
        instruction:
          'Tuesta carcasas y patitas en olla con AOVE. En la misma grasa tuesta cebolla, zanahoria, puerro y ajos en mirepoix. Reúne todo, añade tomillo y oporto, reduce y cubre con 2 L de agua cociendo 1 hora a fuego medio. Cuela. En un cazo haz un caramelo rubio con 80 g de azúcar y vierte el caldo dejando reducir a la mitad.',
        timerSeconds: 3600,
      },
      {
        stepNumber: 2,
        title: 'Cocción 1: Muslitos guisados en la salsa de Oporto',
        instruction:
          'Sella los muslitos 2 minutos por cada lado en sartén con AOVE dejándolos crudos dentro. Vierte la salsa de pichón por encima y guisa a fuego suave durante 10 minutos moviendo de vez en cuando.',
        timerSeconds: 600,
      },
      {
        stepNumber: 3,
        title: 'Cocción 2: Cremoso de interiores con foie',
        instruction:
          'En mantequilla pocha chalota en brunoise 15 minutos; añade los hígados 8 min; añade brandy y evapora; añade nata y foie mi-cuit cocinando 10 minutos más. Salpimenta y tritura en robot hasta lograr una crema untuosa fina.',
        timerSeconds: 600,
      },
      {
        stepNumber: 4,
        title: 'Puré de apionabo y manzana asada',
        instruction:
          'Pela el apionabo y la patata, corta en cubos con AOVE y sal y hornea a 190 °C durante 35 minutos. Tritura en robot junto con media manzana Granny Smith cruda pelada para aportar frescor y acidez.',
        timerSeconds: 2100,
        temperature: '190 °C horno',
      },
      {
        stepNumber: 5,
        title: 'Cocción 3: Pechugas rosadas al soplete/horno',
        instruction:
          'Sella las pechugas en sartén muy caliente 1.5 minutos por cara (deben quedar sangrantes dentro). Al momento de servir dale un golpe de horno a 200 °C durante 4 minutos.',
        timerSeconds: 240,
        temperature: '200 °C horno',
      },
      {
        stepNumber: 6,
        title: 'Emplatado de alta cocina',
        instruction:
          'Traza una lágrima de cremoso de interiores con espátula, sitúa una quenelle de puré de apionabo, coloca una pechuga cortada en dos con la carne sangrante hacia arriba y un muslito en vertical. Salsea con la reducción de oporto, cebolla morada encurtida y brote de acedera.',
      },
    ],
  },
  {
    id: 'chocolate-70-dulce-leche-kc4',
    code: 'KC-4.4',
    title: 'Chocolate 70% y Dulce de Leche',
    subtitle: 'Espuma de dulce de leche en sifón (3 cargas), sopa azteca especiada y ramas de chocolate por choque térmico',
    category: 'Postres y Dulces',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 45,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Crear ramas de chocolate escanciando chocolate templado con un biberón sobre un bol de agua con hielo solidifica figuras 3D crujientes al instante. La sopa azteca con canela, clavo y un toque de cayena corta el dulzor del dulce de leche.',
    pairing: 'Vino rancio dulce o Ron añejo.',
    isFavorite: false,
    createdAt: '2026-10-18T10:35:00Z',
    ingredients: [
      // Para la espuma de dulce de leche
      { id: 'cdl-1', name: 'Dulce de leche repostero', amount: 175, unit: 'g', notes: 'Para la espuma de sifón' },
      { id: 'cdl-2', name: 'Nata de montar', amount: 250, unit: 'ml', notes: 'Para la espuma de dulce de leche' },
      { id: 'cdl-3', name: 'Hojas de gelatina cola de pez', amount: 1.5, unit: 'ud', notes: 'Hidratar en agua fría' },
      { id: 'cdl-4', name: 'Cargas de gas para sifón (N2O)', amount: 3, unit: 'ud' },

      // Para la sopa de chocolate azteca
      { id: 'cdl-5', name: 'Agua', amount: 50, unit: 'ml', notes: 'Para la sopa azteca' },
      { id: 'cdl-6', name: 'Nata de montar', amount: 75, unit: 'ml', notes: 'Para la sopa azteca' },
      { id: 'cdl-7', name: 'Cacao en polvo', amount: 25, unit: 'g', notes: 'Para la sopa azteca' },
      { id: 'cdl-8', name: 'Cobertura de chocolate al 70% de materia grasa', amount: 75, unit: 'g', notes: 'Para la sopa azteca' },
      { id: 'cdl-9', name: 'Rama de canela', amount: 0.5, unit: 'ud', notes: '1/2 rama de canela' },
      { id: 'cdl-10', name: 'Cayena', amount: 0.5, unit: 'ud', notes: '1/2 cayena' },
      { id: 'cdl-11', name: 'Clavo de olor', amount: 1, unit: 'ud' },

      // Para las ramas de chocolate
      { id: 'cdl-12', name: 'Cobertura de chocolate al 70% de materia grasa', amount: 100, unit: 'g', notes: 'Para las ramas de chocolate' },

      // Para el bizcocho borracho de chocolate
      { id: 'cdl-13', name: 'Plum cake de buena calidad', amount: 1, unit: 'ud', notes: 'Cortado en cubos' },
      { id: 'cdl-14', name: 'Amaretto (licor de almendras)', amount: 50, unit: 'ml' },
      { id: 'cdl-15', name: 'Ron', amount: 50, unit: 'ml' },
      { id: 'cdl-16', name: 'Azúcar blanco', amount: 50, unit: 'g' },

      // Otros
      { id: 'cdl-17', name: 'Nueces peladas', amount: 8, unit: 'ud', notes: 'Picaditas para decorar' },
      { id: 'cdl-18', name: 'Cacao en polvo', amount: 10, unit: 'g', notes: 'Para espolvorear en el emplatado final' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Espuma de dulce de leche en sifón (3 cargas)',
        instruction:
          'Hidrata 1,5 hojas de gelatina cola de pez en agua fría. En un cazo calienta 175 g de dulce de leche con la mitad de la nata (125 ml) a fuego bajo removiendo sin parar para que no se queme; añade la gelatina escurrida hasta que se disuelva por completo. Une el resto de la nata (125 ml), deja templar, pasa por un colador fino al sifón, inyecta 3 cargas de gas N2O, agita con energía y enfría en la nevera.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Sopa de chocolate azteca',
        instruction:
          'En un cazo calienta 50 ml de agua, 75 ml de nata de montar, 25 g de cacao en polvo, 1/2 rama de canela, 1/2 cayena y 1 clavo de olor integrando con varilla. Retira del fuego y funde dentro los 75 g de cobertura de chocolate al 70% de materia grasa, removiendo hasta obtener una sopa lisa, brillante y sedosa.',
        timerSeconds: 240,
      },
      {
        stepNumber: 3,
        title: 'Ramas de chocolate por choque térmico',
        instruction:
          'Funde 100 g de cobertura de chocolate al 70% de materia grasa al baño maría y pásalo a un biberón de cocina. En un cuenco con agua muy fría y abundantes cubitos de hielo, dosifica hilos finos de chocolate haciendo formas de ramas; el choque térmico las solidifica al instante en figuras 3D crujientes. Escurre con cuidado sobre papel absorbente y reserva en frío.',
        timerSeconds: 300,
        tip: 'Secar sobre papel absorbente antes de emplatar para evitar gotas de agua.',
      },
      {
        stepNumber: 4,
        title: 'Bizcocho borracho al amaretto y ron',
        instruction:
          'En un cazo calienta 50 ml de ron, 50 ml de amaretto y 50 g de azúcar removiendo hasta disolver por completo el almíbar borracho. Corta 1 pieza de plum cake de buena calidad en cubos medianos y cala los trozos con el almíbar templado.',
        timerSeconds: 180,
      },
      {
        stepNumber: 5,
        title: 'Emplatado en plato hondo',
        instruction:
          'Coloca una cucharada de sopa azteca templada en el fondo del plato y dale un golpe seco con la cuchara para salpicar artísticamente el plato. Coloca los cubos de bizcocho borracho en el centro, cubre con una generosa nube de espuma de dulce de leche del sifón, corona con las ramas crujientes de chocolate al 70%, las 8 nueces peladas picaditas y una lluvia final de cacao en polvo.',
      },
    ],
  },

  // ========================================================
  // A PUNTO — CURSO DE COCINA CON CAZA
  // ========================================================
  {
    id: 'civet-corzo-chocolate-apunto',
    code: 'CAZA-1',
    title: 'Civet de Corzo al Chocolate Negro 70%',
    subtitle: 'Guiso señorial de caza: marinada de 12 horas en vino tinto sin sal, ligazón de sangre y cacao',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 180,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Regla de oro de cocina de caza de A Punto: NUNCA salar el marinado, ya que la sal en crudo deshidrata y endurece la fibra muscular del animal salvaje. El chocolate al 70% no endulza: aporta brillo espejo, textura aterciopelada y lima la acidez tánica del vino tinto.',
    pairing: 'Vino tinto potente con barrica (Toro, Priorat o Bierzo Mencía).',
    isFavorite: false,
    createdAt: '2026-10-18T10:40:00Z',
    ingredients: [
      { id: 'ccc-1', name: 'Carne de corzo en trozos gruesos (huesos para fondo)', amount: 1500, unit: 'g' },
      { id: 'ccc-2', name: 'Vino tinto con cuerpo (para marinar y guisar)', amount: 2000, unit: 'ml' },
      { id: 'ccc-3', name: 'Brandy para flambear', amount: 80, unit: 'ml' },
      { id: 'ccc-4', name: 'Verduras marinada: 2 cebollas, 2 zanahorias, 1 cabeza ajo, 1 puerro y apio', amount: 600, unit: 'g' },
      { id: 'ccc-5', name: 'Hierbas y especias: laurel, tomillo, romero, pimienta negra y clavo', amount: 15, unit: 'g' },
      { id: 'ccc-6', name: 'Harina de trigo y AOVE para sellar la carne', amount: 80, unit: 'g' },
      { id: 'ccc-7', name: 'Caldo de corzo o caza', amount: 1000, unit: 'ml' },
      { id: 'ccc-8', name: 'Sangre y vísceras de corzo o cerdo (ligazón tradicional)', amount: 100, unit: 'g' },
      { id: 'ccc-9', name: 'Cobertura de chocolate negro al 70%', amount: 100, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinada clásica de 12 horas (Sin sal)',
        instruction:
          'Limpia el corzo en trozos gruesos y reserva huesos para el fondo. Coloca la carne en un recipiente amplio con las verduras troceadas, tomillo, romero, laurel, pimienta, clavo, brandy y los 2 L de vino tinto. Marina 12 horas en frío sin sal.',
        timerSeconds: 43200,
        tip: 'No añadir sal: la sal endurece la fibra en crudo.',
      },
      {
        stepNumber: 2,
        title: 'Sellado y fritura de la carne enharinada',
        instruction:
          'Separa el corzo de la marinada, salpimienta en este momento, pasa por harina y fríe en abundante AOVE hasta dorar el exterior. Retira y reserva en marmita.',
        timerSeconds: 480,
      },
      {
        stepNumber: 3,
        title: 'Sofrito de verduras y flambeado',
        instruction:
          'En el mismo aceite pocha las verduras de la marinada hasta muy tiernas; flambea con el brandy y el vino colado. Moja con el caldo de corzo y deja cocer 15 minutos.',
        timerSeconds: 900,
      },
      {
        stepNumber: 4,
        title: 'Ligazón tradicional de sangre y colado',
        instruction:
          'Tritura la sangre con un poco de caldo tibio, incorpórala a la cazuela, deja hervir unos minutos y espuma. Pasa todo el caldo por un chino fino sobre la marmita con el corzo.',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Cocción lenta y acabado en chocolate negro 70%',
        instruction:
          'Cuece el corzo tapado a fuego muy suave durante 2 horas hasta que la carne esté tiernísima. En ese momento incorpora la cobertura de chocolate al 70% removiendo hasta fundir y aportar brillo caoba.',
        timerSeconds: 7200,
      },
    ],
  },
  {
    id: 'espuma-calabaza-yema-liquida-apunto',
    code: 'CAZA-2',
    title: 'Espuma de Crema de Calabaza con Yema Líquida',
    subtitle: 'Nube tibia en sifón con pro-espuma, corazón de yema líquida fluida, parmesano y almendras tostadas',
    category: 'Molecular y Espumas',
    difficulty: 'Media',
    prepTimeMinutes: 40,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Picar la calabaza muy pequeña acelera la cocción y favorece la caramelización de sus azúcares naturales con el puerro. Es fundamental colar la crema por malla muy fina para que la pro-espuma actúe sin obturar el sifón.',
    pairing: 'Vino blanco fermentado en barrica o Cava Brut Nature.',
    isFavorite: false,
    createdAt: '2026-10-18T10:45:00Z',
    ingredients: [
      { id: 'ecy-1', name: 'Calabaza limpia troceada fina', amount: 400, unit: 'g' },
      { id: 'ecy-2', name: 'Nata para cocinar', amount: 400, unit: 'g' },
      { id: 'ecy-3', name: 'Puerros picados y lavados', amount: 2, unit: 'ud' },
      { id: 'ecy-4', name: 'Yemas de huevo camperas frescas', amount: 4, unit: 'ud' },
      { id: 'ecy-5', name: 'Pro-espuma (en polvo)', amount: 4, unit: 'g' },
      { id: 'ecy-6', name: 'Almendras fileteadas tostadas', amount: 40, unit: 'g' },
      { id: 'ecy-7', name: 'Queso Parmesano rallado en lascas', amount: 40, unit: 'g' },
      { id: 'ecy-8', name: 'AOVE virgen, sal y pimienta', amount: 15, unit: 'ml' },
      { id: 'ecy-9', name: 'Sifón de cocina 1 L + 2 cargas de gas N2O', amount: 2, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Caramelizado de puerro y calabaza',
        instruction:
          'Pica la calabaza menuda y el puerro. En cazuela con AOVE dora el puerro y añade la calabaza rehogando hasta que empiece a caramelizar y desprender aroma dulce.',
        timerSeconds: 480,
      },
      {
        stepNumber: 2,
        title: 'Cocción ajustada de caldo',
        instruction:
          'Añade agua mineral justo hasta cubrir las verduras, salpimienta y cuece hasta que la calabaza esté completamente tierna vigilando que no evapore en exceso.',
        timerSeconds: 900,
      },
      {
        stepNumber: 3,
        title: 'Triturado fino y mezcla con Pro-espuma',
        instruction:
          'Tritura la crema a máxima potencia y pásala por un colador de malla fina para retirar cualquier grumo. Incorpora la nata y los 4 g de pro-espuma batiendo hasta textura homogénea.',
        timerSeconds: 180,
      },
      {
        stepNumber: 4,
        title: 'Carga del sifón y reposo (1 hora)',
        instruction:
          'Vierte la crema templada en el sifón de 1 litro, cierra, enrosca 2 cargas de gas N2O, agita con energía y deja reposar 1 hora en baño maría tibio o a temperatura ambiente.',
        timerSeconds: 3600,
      },
      {
        stepNumber: 5,
        title: 'Montaje de explosión líquida',
        instruction:
          'En el fondo de una copa o plato hondo coloca una yema de huevo cruda atemperada; cubre con la espuma densa de calabaza recién sifonada y termina con lascas de parmesano y almendras fileteadas tostadas.',
      },
    ],
  },
  {
    id: 'albondigas-jabali-hoisin-apunto',
    code: 'CAZA-3',
    title: 'Albóndigas de Jabalí con Frutos Secos y Salsa Hoisin',
    subtitle: 'Picada de pierna de jabalí con bacon ahumado, pan remojado en leche, frutos secos y glasa agridulce oriental',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 70,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'La carne de jabalí es extraordinariamente magra; añadir 500 g de bacon ahumado en lardones y pan de molde bien empapado en leche le devuelve la untuosidad y jugosidad. Los frutos secos y la salsa Hoisin (de ciruela china) armonizan el punto montaraz de la caza.',
    pairing: 'Vino tinto Syrah o Cariñena con cuerpo.',
    isFavorite: false,
    createdAt: '2026-10-18T10:50:00Z',
    ingredients: [
      { id: 'ajh-1', name: 'Pierna o paletilla de jabalí limpia y picada fina', amount: 2500, unit: 'g' },
      { id: 'ajh-2', name: 'Bacon ahumado en lardones', amount: 500, unit: 'g' },
      { id: 'ajh-3', name: 'Pan de molde (10 rebanadas) remojadas en leche (1 L)', amount: 1000, unit: 'ml' },
      { id: 'ajh-4', name: 'Frutos secos picados: ciruelas pasas, orejones, pistachos y nueces de pecán', amount: 200, unit: 'g' },
      { id: 'ajh-5', name: 'Sofrito: 2 apios, 2 puerros, 2 cebollas, 2 zanahorias, ajo, tomillo, romero y salvia', amount: 400, unit: 'g' },
      { id: 'ajh-6', name: 'Salsas orientales: Salsa Hoisin, salsa de soja Kikkoman y salsa de ostras Panda', amount: 150, unit: 'g' },
      { id: 'ajh-7', name: 'Vino tinto (1 L) + 2 copas de Brandy + Caldo de caza', amount: 1200, unit: 'ml' },
      { id: 'ajh-8', name: 'Harina y aceite de oliva para freír las albóndigas', amount: 100, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sofrito aromático con bacon y salvia',
        instruction:
          'En cazuela pocha apio, puerro, cebolla y ajo en mirepoix muy fina; añade el bacon en lardones y las hojas de salvia y cocina bien suave hasta que el bacon suelte su grasa aromática.',
        timerSeconds: 900,
      },
      {
        stepNumber: 2,
        title: 'Masa de jabalí con frutos secos',
        instruction:
          'Escurre el pan de molde remojado en leche. En una picadora o robot tritura los frutos secos (ciruelas, orejones, pistachos, nueces). Mezcla la carne picada de jabalí con el pan, los frutos secos, el sofrito de bacon y rectifica de sal y pimienta.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Boleado y fritura dorada',
        instruction:
          'Forma las albóndigas con las manos, pásalas ligeramente por harina y fríelas en aceite de oliva bien caliente hasta que estén selladas y doradas por fuera. Escurre sobre papel absorbente.',
        timerSeconds: 360,
      },
      {
        stepNumber: 4,
        title: 'Salsa glaseada Hoisin y caldo de caza',
        instruction:
          'En la misma sartén de freír dora las verduras restantes, flambea con el brandy y el vino tinto y añade la salsa hoisin, la salsa de soja y la salsa de ostras. Vierte el caldo de caza y hierve 15 minutos. Cuela la salsa.',
        timerSeconds: 900,
      },
      {
        stepNumber: 5,
        title: 'Glaseado final',
        instruction:
          'Introduce las albóndigas en la salsa oriental colada y cocínalas a fuego lento durante 5 minutos para que absorban la glasa y queden brillantes y melosas.',
        timerSeconds: 300,
      },
    ],
  },
  {
    id: 'rable-conejo-datiles-garam-masala-apunto',
    code: 'CAZA-4',
    title: 'Rable de Conejo con Dátiles, Bacon y Aire de Garam Masala',
    subtitle: 'Lomos rellenos de hinojo, manzana y pistachos albardados en bacon con dos horneados y aire especiado',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 45,
    baseServings: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El conejo de caza es sumamente magro y tiende a secarse con rapidez. Hornearlo a 140 °C durante 10 min permite que el calor penetre sin evaporar los jugos del relleno; el golpe final de 3 min a 200 °C carameliza el bacon dejando una coraza crujiente.',
    pairing: 'Vino tinto joven especiado o blanco fermentado en barrica.',
    isFavorite: false,
    createdAt: '2026-10-18T10:55:00Z',
    ingredients: [
      { id: 'rcd-1', name: 'Lomos limpios de conejo entero (con incisión central)', amount: 2, unit: 'ud' },
      { id: 'rcd-2', name: 'Verduras relleno: 50 g cebolla, 50 g apio y 50 g bulbo de hinojo', amount: 150, unit: 'g' },
      { id: 'rcd-3', name: 'Manzana Granny Smith (1 u) + Dátiles picados (50 g) + Pistachos verdes (20 g)', amount: 170, unit: 'g' },
      { id: 'rcd-4', name: 'Bacon ahumado lonchado muy fino (para albardar)', amount: 100, unit: 'g' },
      { id: 'rcd-5', name: 'Cilantro fresco, menta fresca y pimienta blanca molida', amount: 10, unit: 'g' },
      { id: 'rcd-6', name: 'Aire especiado: 1 vaso caldo de carne, 1 vaso leche y 1 vaso nata líquida', amount: 450, unit: 'ml' },
      { id: 'rcd-7', name: 'Garam Masala en polvo + Lecitina de soja (2.5 g)', amount: 10, unit: 'g' },
      { id: 'rcd-8', name: 'Hilo de bridar y AOVE', amount: 1, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Deshuesado y farsa aromática',
        instruction:
          'Deshuesa el conejo sacando los dos lomos cilíndricos y hazles una incisión longitudinal en el centro. Pocha en AOVE cebolla, apio e hinojo; añade los dátiles picados, la manzana Granny Smith en daditos y los pistachos. Aromatiza con menta y cilantro picados.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Relleno, albardado y bridado',
        instruction:
          'Salpimienta los lomos de conejo, rellénalos con la farsa, envuélvelos apretados con las lonchas de bacon ahumado y brídalos con hilo de cocina para mantener la forma cilíndrica.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Horneado de dos temperaturas (140 °C y 200 °C)',
        instruction:
          'Rocía con una gota de aceite y hornea a 140 °C durante 10 minutos controlando el punto tierno de la carne. Sube el horno a 200 °C durante exactamente 3 minutos para dorar y suflar el bacon exterior sin secar el conejo.',
        timerSeconds: 780,
        temperature: '140 °C -> 200 °C',
      },
      {
        stepNumber: 4,
        title: 'Aire de Garam Masala en túrmix a 45°',
        instruction:
          'En sartén reduce un poco de caldo de carne con el garam masala; añade la leche y la nata y reduce suavemente. Agrega la lecitina de soja y con la túrmix en la superficie inclinada a 45° bate a velocidad media para levantar una nube de aire densa y estable.',
        timerSeconds: 180,
      },
      {
        stepNumber: 5,
        title: 'Emplatado',
        instruction:
          'Retira el hilo de bridar, corta el rable en medallones transversales y corónalos con la nube de aire de garam masala.',
      },
    ],
  },

  // ========================================================
  // KITCHEN CLUB — CURSO DE COCINA AVANZADO (DÍA 2)
  // ========================================================
  {
    id: 'ravioli-san-domenico-kc2',
    code: 'KC-2.1',
    title: 'Ravioli San Doménico con Yema Líquida y Mantequilla al Limón',
    subtitle: 'Pasta fresca casera, nido de espinacas y ricotta, corazón de yema líquida y emulsión de mantequilla y salvia',
    category: 'Arroces y Cremas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 60,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'La cumbre de la pasta rellena italiana: al clavar el tenedor, la yema de huevo cruda del interior estalla caliente sobre el plato mezclándose con la mantequilla avellanada y el limón. Hervir durante estrictamente 3 minutos para cuajar la pasta sin solidificar la yema.',
    pairing: 'Vino blanco italiano Pinot Grigio o Soave Classico.',
    isFavorite: false,
    createdAt: '2026-10-18T11:00:00Z',
    ingredients: [
      { id: 'rsd-1', name: 'Harina de fuerza (para la pasta fresca)', amount: 400, unit: 'g' },
      { id: 'rsd-2', name: 'Huevos enteros (para amasar la pasta)', amount: 4, unit: 'ud' },
      { id: 'rsd-3', name: 'Espinacas frescas pochadas con cebolla 15 min', amount: 250, unit: 'g' },
      { id: 'rsd-4', name: 'Queso ricotta fresco', amount: 200, unit: 'g' },
      { id: 'rsd-5', name: 'Yemas de huevo camperas (enteras e intactas)', amount: 6, unit: 'ud' },
      { id: 'rsd-6', name: 'Mantequilla de calidad (para la salsa)', amount: 90, unit: 'g' },
      { id: 'rsd-7', name: 'Zumo y ralladura de 1/2 limón', amount: 1, unit: 'ud' },
      { id: 'rsd-8', name: 'Queso Parmesano Reggiano rallado', amount: 80, unit: 'g' },
      { id: 'rsd-9', name: 'Hojitas de salvia fresca y pimienta negra molida', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Amasado y reposo de la pasta fresca (1 hora)',
        instruction:
          'Forma un volcán con la harina y la sal; añade los huevos en el centro y amasa 5 minutos hasta obtener una masa elástica y suave. Haz una bola, envuelve en papel film y deja reposar 1 hora en la nevera.',
        timerSeconds: 3600,
      },
      {
        stepNumber: 2,
        title: 'Estirado milimétrico y relleno de ricotta',
        instruction:
          'Pasa la masa por la máquina de pasta progresivamente hasta el número más fino. Corta círculos con cortapastas. Pocha la cebolla 15 min y cocina con las espinacas 10 min; tritura con la ricotta, sal y pimienta hasta una pasta lisa y colócala en manga pastelera.',
        timerSeconds: 600,
      },
      {
        stepNumber: 3,
        title: 'Formado del nido con yema líquida',
        instruction:
          'Sobre cada círculo de pasta escancia un aro circular de relleno de ricotta dejando un hueco en el centro. Coloca con extremo cuidado una yema de huevo cruda en el hueco. Tapa con otro círculo de pasta sellando los bordes con los dedos sin dejar burbujas de aire.',
        timerSeconds: 300,
      },
      {
        stepNumber: 4,
        title: 'Cocción exacta de 3 minutos',
        instruction:
          'Sumerge los raviolis con delicadeza en agua hirviendo con sal durante exactamente 3 minutos y escúrrelos con una espumadera.',
        timerSeconds: 180,
        temperature: '100 °C agua',
      },
      {
        stepNumber: 5,
        title: 'Salsa emulsionada de mantequilla y limón',
        instruction:
          'Derrite la mantequilla en un cazo, añade la ralladura y el zumo de limón y emulsiona batiendo ligeramente con una varilla.',
        timerSeconds: 120,
      },
      {
        stepNumber: 6,
        title: 'Montaje de autor',
        instruction:
          'Coloca un ravioli gigante en el centro del plato, baña con la salsa de mantequilla y limón caliente, espolvorea parmesano rallado, pimienta negra recién molida y unas hojas de salvia fresca.',
      },
    ],
  },
  {
    id: 'solomillo-wellington-bordalesa-kc2',
    code: 'KC-2.2',
    title: 'Solomillo Wellington con Salsa Bordalesa',
    subtitle: 'Solomillo prensado, duxelle con Pedro Ximénez y jamón serrano en hojaldre crujiente con reducción de vino tinto',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 120,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Prensar el solomillo limpio en papel film formando un cilindro perfecto durante 2 horas en frío garantiza un punto de cocción rosado homogéneo de extremo a extremo. La duxelle debe reducirse a fuego lento hasta secar completamente para no humedecer el hojaldre.',
    pairing: 'Vino tinto Reserva Rioja o Cabernet Sauvignon de gran estructura.',
    isFavorite: false,
    createdAt: '2026-10-18T11:05:00Z',
    ingredients: [
      { id: 'swb-1', name: 'Solomillo de ternera limpio sin grasa ni cordón', amount: 800, unit: 'g' },
      { id: 'swb-2', name: 'Champiñones en brunoise (500 g) + Cebolla grande pochada 40 min', amount: 650, unit: 'g' },
      { id: 'swb-3', name: 'Pedro Ximénez (60 ml) + Taquitos de jamón serrano (50 g) + Tomillo', amount: 110, unit: 'g' },
      { id: 'swb-4', name: 'Lonchas finas de jamón serrano (para envolver)', amount: 100, unit: 'g' },
      { id: 'swb-5', name: 'Mostaza de Dijon', amount: 40, unit: 'g' },
      { id: 'swb-6', name: 'Lámina de masa de hojaldre con mantequilla + 1 yema para pintar', amount: 1, unit: 'ud' },
      { id: 'swb-7', name: 'Salsa Bordalesa: 4 chalotas, 60 g mantequilla, 250 ml vino tinto y 500 ml caldo carne', amount: 800, unit: 'g' },
      { id: 'swb-8', name: 'Hojas de Kale doradas al fuego vivo + Flores comestibles + Sal en escamas', amount: 80, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prensado cilíndrico en frío (2 horas)',
        instruction:
          'Limpia el solomillo. Enróllalo en papel film apretando los extremos como un embutido cilíndrico y refrigera en nevera durante al menos 2 horas para compactarlo.',
        timerSeconds: 7200,
      },
      {
        stepNumber: 2,
        title: 'Duxelle caramelizada al Pedro Ximénez',
        instruction:
          'Pocha la cebolla en AOVE a fuego lento durante 40 minutos. Sube el fuego, añade los champiñones en brunoise y el tomillo. Vierte el Pedro Ximénez y deja evaporar por completo. Apaga, añade los taquitos de jamón y deja enfriar.',
        timerSeconds: 2400,
      },
      {
        stepNumber: 3,
        title: 'Albardado con jamón serrano y mostaza',
        instruction:
          'Estira papel film sobre la mesa, coloca las lonchas de jamón serrano solapadas y extiende la duxelle fría aplanando bien. Pinta el solomillo con mostaza de Dijon y colócalo en el centro. Enrolla apretado con el film y reposa en frío.',
        timerSeconds: 300,
      },
      {
        stepNumber: 4,
        title: 'Forrado en hojaldre con enrejado',
        instruction:
          'Envuelve el solomillo en el hojaldre sellando bien los bordes. Con el sobrante haz un enrejado decorativo superior, colócalo en bandeja con papel de horno y píntalo con yema de huevo batida.',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Horneado a 200 °C (30 minutos)',
        instruction:
          'Mete al horno precalentado a 200 °C durante 30 minutos hasta que el hojaldre esté dorado y crujiente.',
        timerSeconds: 1800,
        temperature: '200 °C horno',
      },
      {
        stepNumber: 6,
        title: 'Salsa Bordalesa reducida y servicio',
        instruction:
          'Pocha chalotas en mantequilla 20 min; añade el vino tinto y reduce a la mitad; añade el caldo de carne y reduce 30 min más hasta textura de jarabe. Sirve un medallón grueso de solomillo Wellington acompañado de hojas de kale crujientes y un trazo de salsa bordalesa.',
      },
    ],
  },
  {
    id: 'bacalao-a-bras-kc2',
    code: 'KC-2.3',
    title: 'Bacalao a Bras de Precisión',
    subtitle: 'Lomo confitado en aceite con ajos a 150 °C, patatas paja ultra crujientes y cuajado meloso a fuego apagado',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 45,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El secreto absoluto del Bacalhau à Brás: una vez añadido el huevo batido a la sartén con el bacalao y las patatas paja, APAGAR el fuego al instante. El calor residual de la sartén cuaja el huevo en una crema jugosa y melosa sin llegar jamás a secarse en revuelto granuloso.',
    pairing: 'Vino blanco portugués Vinho Verde o Alvarinho.',
    isFavorite: false,
    createdAt: '2026-10-18T11:10:00Z',
    ingredients: [
      { id: 'bab-1', name: 'Lomo de bacalao desalado', amount: 600, unit: 'g' },
      { id: 'bab-2', name: 'Aceite de oliva para confitar', amount: 800, unit: 'ml' },
      { id: 'bab-3', name: 'Dientes de ajo machacados con piel + 2 cayenas enteras', amount: 4, unit: 'ud' },
      { id: 'bab-4', name: 'Cebolletas cortadas en juliana fina', amount: 1, unit: 'ud' },
      { id: 'bab-5', name: 'Patatas medianas (para cortar en patata paja)', amount: 2, unit: 'ud' },
      { id: 'bab-6', name: 'Huevos medianos batidos', amount: 3, unit: 'ud' },
      { id: 'bab-7', name: 'Aceitunas negras en cuartos y perejil fresco picado', amount: 40, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Confitado del bacalao al horno (150 °C · 30 min)',
        instruction:
          'En recipiente hondo coloca los 800 ml de aceite de oliva, los ajos machacados con piel y las cayenas. Sumerge los lomos de bacalao y hornea a 150 °C durante 30 minutos. Saca, escurre y desmiga en lascas brillantes.',
        timerSeconds: 1800,
        temperature: '150 °C horno',
      },
      {
        stepNumber: 2,
        title: 'Patatas paja crujientes',
        instruction:
          'Corta las patatas en láminas finísimas con mandolina y luego en tiras finas de paja. Sumérgelas en agua fría 10 minutos para retirar el almidón. Escurre, seca muy bien y fríelas en abundante aceite a 180 °C hasta que queden muy crujientes.',
        timerSeconds: 600,
        temperature: '180 °C fritura',
      },
      {
        stepNumber: 3,
        title: 'Sofrito de cebolleta en aceite de confitado',
        instruction:
          'Rehoga la cebolleta en juliana en sartén con un chorrito del aceite de confitar durante 10 minutos a fuego medio. Apaga el fuego e incorpora el bacalao desmigado integrando con suavidad.',
        timerSeconds: 600,
      },
      {
        stepNumber: 4,
        title: 'Cuajado meloso con calor residual',
        instruction:
          'Mezcla la mitad de las patatas paja con el bacalao y la cebolleta. Bate los 3 huevos y añádelos a la mezcla. Vierte en la sartén caliente con unas gotas de AOVE y APAGA el fuego de inmediato, ligando con movimientos continuos con el calor residual para no cuajar en exceso.',
        timerSeconds: 120,
      },
      {
        stepNumber: 5,
        title: 'Montaje con altura',
        instruction:
          'Sirve en el centro del plato dándole volumen hacia arriba; corona con el resto de patatas paja crujientes, las aceitunas negras en cuartos y lluvia de perejil fresco picado.',
      },
    ],
  },
  {
    id: 'lemon-pie-copa-merengue-suizo-kc2',
    code: 'KC-2.4',
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
    isFavorite: false,
    createdAt: '2026-10-18T11:15:00Z',
    ingredients: [
      { id: 'lpc-1', name: 'Leche entera (300 ml infusión + 100 ml para maicena)', amount: 400, unit: 'ml' },
      { id: 'lpc-2', name: 'Azúcar blanco (100 g para crema + 200 g para merengue)', amount: 300, unit: 'g' },
      { id: 'lpc-3', name: 'Yemas de huevo (para la crema de limón)', amount: 4, unit: 'ud' },
      { id: 'lpc-4', name: 'Zumo recién exprimido de limón', amount: 150, unit: 'ml' },
      { id: 'lpc-5', name: 'Ralladura de 1/2 limón', amount: 1, unit: 'ud' },
      { id: 'lpc-6', name: 'Maicena (almidón de maíz)', amount: 40, unit: 'g', notes: 'Diluir siempre en los 100 ml de leche fría' },
      { id: 'lpc-7', name: 'Claras de huevo (para el merengue suizo)', amount: 100, unit: 'g' },
      { id: 'lpc-8', name: 'Gotitas de zumo de limón (para el merengue)', amount: 5, unit: 'ml' },
      { id: 'lpc-9', name: 'Galletas de mantequilla (para la tierra)', amount: 4, unit: 'ud' },
      { id: 'lpc-10', name: 'Nueces peladas (para la tierra)', amount: 20, unit: 'g' },
      { id: 'lpc-11', name: 'Almendras tostadas (para la tierra)', amount: 20, unit: 'g' },
      { id: 'lpc-12', name: 'Ralladura de limón y hojitas de menta fresca', amount: 1, unit: 'ud', notes: 'Para decorar encima del merengue' },
      { id: 'lpc-13', name: 'Soplete de cocina', amount: 1, unit: 'ud' },
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

  // ========================================================
  // KITCHEN CLUB — CURSO DE COCINA AVANZADO (DÍA 1)
  // ========================================================
  {
    id: 'ensalada-caprese-texturas-kc1',
    code: 'KC-1.1',
    title: 'Ensalada Caprese en Texturas',
    subtitle: 'Tomates verdes fritos en doble rebozado crujiente, espuma etérea de mozzarella en sifón y salsa Nueva Orleans',
    category: 'Molecular y Espumas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 45,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Una deconstrucción visual de la Caprese: la acidez carnosa de los tomates verdes fritos en pan rallado con tomillo y pimentón contrasta con la ligereza de la espuma de mozzarella emulsionada en sifón con albahaca fresca.',
    pairing: 'Vino rosado provenzal pálido o Prosecco italiano.',
    isFavorite: false,
    createdAt: '2026-10-18T11:20:00Z',
    ingredients: [
      { id: 'ect-1', name: 'Tomates verdes firmes en mitades', amount: 3, unit: 'ud' },
      { id: 'ect-2', name: 'Pan rallado (200 g) con pimentón dulce, orégano y tomillo', amount: 200, unit: 'g' },
      { id: 'ect-3', name: 'Harina de trigo (150 g) + Huevos batidos (3 u)', amount: 250, unit: 'g' },
      { id: 'ect-4', name: 'Mozzarella fresca (para la espuma de sifón)', amount: 180, unit: 'g' },
      { id: 'ect-5', name: 'Nata para montar (140 ml) + Leche entera (150 ml) + 4 hojas albahaca', amount: 300, unit: 'ml' },
      { id: 'ect-6', name: 'Salsa Nueva Orleans: cebolleta, pepinillo, mayonesa (150 g), ketchup, mostaza y Perrins', amount: 250, unit: 'g' },
      { id: 'ect-7', name: 'Hojas pequeñas de albahaca para freír crujientes', amount: 18, unit: 'ud' },
      { id: 'ect-8', name: 'Tomates cherry en cuartos (12 u) + Sal en escamas + Sifón con 2 cargas N2O', amount: 100, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Salsa Nueva Orleans aromatizada',
        instruction:
          'Pica la cebolleta y el pepinillo agridulce en brunoise finísima y el perejil en chiffonade. Mezcla en un bol con la mayonesa, el ketchup, la mostaza amarilla y la salsa Perrins.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Espuma de mozzarella en sifón (2 cargas)',
        instruction:
          'Hierve la nata con la leche y las hojas de albahaca 3 minutos; deja infusionar 10 minutos fuera del fuego y retira las hojas. Añade la mozzarella fresca, sal y pimienta negra. Tritura en robot hasta textura de seda, cuela al sifón, inyecta 2 cargas de gas N2O y refrigera al menos 1 hora.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Doble empanado de tomates verdes',
        instruction:
          'Seca las mitades de tomate verde con papel y salpimienta. Pásalos por harina, huevo batido, pan rallado especiado, y repite por huevo y pan rallado para conseguir una corteza ultra crocante.',
        timerSeconds: 240,
      },
      {
        stepNumber: 4,
        title: 'Fritura de tomates (180 °C) y albahaca',
        instruction:
          'Fríe los tomates en aceite a 180 °C durante 5 minutos hasta que estén dorados; escurre y corta cada mitad en trozos de bocado. En el mismo aceite fríe las hojas de albahaca apenas 5 segundos hasta translúcidas.',
        timerSeconds: 300,
        temperature: '180 °C aceite',
      },
      {
        stepNumber: 5,
        title: 'Montaje cromático',
        instruction:
          'Dispón una cucharada de salsa Nueva Orleans en el centro del plato, coloca los bocados de tomate verde frito, intercala puntos de espuma de mozzarella, cuartos de cherry fresco, las hojas de albahaca frita y sal en escamas.',
      },
    ],
  },
  {
    id: 'croqueta-liquida-mejillones-tigre-kc1',
    code: 'KC-1.2',
    title: 'Croqueta Líquida de Mejillones Tigre',
    subtitle: 'Bechamel fluida de langostinos, bacalao y mejillón en escabeche al merkén, patata frita y panko dorado',
    category: 'Tapas y Croquetas',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 60,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Una interpretación desestructurada en cuenco: el sofrito parte del aceite infusionado con las cabezas de langostino prensadas a fuego medio. La bechamel se mantiene fluida y caliente, servida sobre una base de daditos de patata frita y coronada con panko frito.',
    pairing: 'Cerveza artesana IPA o vermut rojo de grifo.',
    isFavorite: false,
    createdAt: '2026-10-18T11:25:00Z',
    ingredients: [
      { id: 'clmt-1', name: 'Langostinos frescos (separar cabezas y cuerpos en brunoise)', amount: 10, unit: 'ud' },
      { id: 'clmt-2', name: 'Bacalao desalado desmigado', amount: 180, unit: 'g' },
      { id: 'clmt-3', name: 'Calamar limpio en brunoise', amount: 150, unit: 'g' },
      { id: 'clmt-4', name: 'Mejillones en escabeche en brunoise', amount: 8, unit: 'ud' },
      { id: 'clmt-5', name: 'Sofrito: 150 g cebolla pochada 30 min en el aceite de langostinos', amount: 150, unit: 'g' },
      { id: 'clmt-6', name: 'Especias: pimentón dulce, picante, comino y 1 cdta de merkén ahumado', amount: 15, unit: 'g' },
      { id: 'clmt-7', name: 'Vino blanco (90 ml) + Mantequilla (100 g) + Harina (90 g) + Leche caliente (900 ml)', amount: 1100, unit: 'g' },
      { id: 'clmt-8', name: 'Patatas peladas cortadas en cubitos de 1/2 cm', amount: 2, unit: 'ud' },
      { id: 'clmt-9', name: 'Panko japonés para freír crujiente', amount: 200, unit: 'g' },
      { id: 'clmt-10', name: 'Brotes de cilantro fresco y aceite para freír', amount: 10, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Extracción de coral de langostinos',
        instruction:
          'Pela los langostinos; en una cazuela dora las cabezas en AOVE machacándolas con cuchara de madera durante 5 minutos para que suelten todo el coral. Cuela y reserva ese aceite aromatizado.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Sofrito marinero al merkén (30 min)',
        instruction:
          'En el aceite de langostinos pocha la cebolla en brunoise a fuego bajo durante 30 minutos. Añade el bacalao, el calamar, los langostinos y los mejillones en escabeche con el pimentón, comino y merkén. Vierte el vino blanco y deja evaporar.',
        timerSeconds: 1800,
      },
      {
        stepNumber: 3,
        title: 'Bechamel fluida de mejillón tigre',
        instruction:
          'Añade los 100 g de mantequilla a la cazuela; cuando funda incorpora los 90 g de harina y cocina 5 minutos. Vierte poco a poco la leche caliente batiendo con varilla hasta que espese en una bechamel untuosa pero fluida. Salpimenta y retira del fuego.',
        timerSeconds: 300,
      },
      {
        stepNumber: 4,
        title: 'Fritura de patatas y panko',
        instruction:
          'Fríe los cubitos de patata en aceite a 180 °C hasta que queden dorados y crujientes; escurre y sazona. En un cazo aparte fríe el panko durante 2 minutos a 180 °C hasta color dorado brillante.',
        timerSeconds: 300,
        temperature: '180 °C aceite',
      },
      {
        stepNumber: 5,
        title: 'Montaje en vasito o cuenco',
        instruction:
          'En la base de un vasito o bol dispón una cucharada de cubitos de patata frita, vierte la bechamel caliente de mejillones tigre y corona con panko frito crujiente y brotes de cilantro "plantados".',
      },
    ],
  },
  {
    id: 'suquet-salmonete-aire-lima-kc1',
    code: 'KC-1.3',
    title: 'Suquet de Salmonete Crujiente con Aire de Lima',
    subtitle: 'Fondo tostado de congrio y espinas, majado de almendras y azafrán, lomos con lima sopleteados y bolitas de patata',
    category: 'Pescados y Mariscos',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 75,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Marinar los lomos solo por la carne en aceite con ralladura de lima durante 25 min fija aromas cítricos sin cocer el pescado; marcar 1 min en sartén viva y sopletear la piel crea una textura de crujiente cristalino. El aire de lima con lecitina refresca el majado de azafrán.',
    pairing: 'Vino blanco de Rueda o Viura criado sobre lías.',
    isFavorite: false,
    createdAt: '2026-10-18T11:30:00Z',
    ingredients: [
      { id: 'ssal-1', name: 'Lomos de salmonete con piel (marinados 25 min en AOVE y lima)', amount: 6, unit: 'ud' },
      { id: 'ssal-2', name: 'Espinas y cabezas de salmonete (500 g) + Huesos congrio o rape (300 g)', amount: 800, unit: 'g' },
      { id: 'ssal-3', name: 'Verduras caldo: cebolla, puerro, apio y 2 tomates pera tostados', amount: 350, unit: 'g' },
      { id: 'ssal-4', name: 'Brandy para flambear (80 ml) + Pimentón dulce + Pimienta en grano', amount: 90, unit: 'g' },
      { id: 'ssal-5', name: 'Majado suquet: 100 g almendras tostadas, 2 rebanadas pan frito y 6 hebras azafrán', amount: 150, unit: 'g' },
      { id: 'ssal-6', name: 'Sofrito suquet: ajo, cebolla pochada 15 min, tomate pera y tomate concentrado', amount: 250, unit: 'g' },
      { id: 'ssal-7', name: 'Bolitas de patata al horno con mantequilla (asadas 30 min a 190 °C)', amount: 1, unit: 'ud' },
      { id: 'ssal-8', name: 'Aire de lima: 60 ml zumo lima, 100 ml agua fría y 2 g lecitina de soja', amount: 165, unit: 'g' },
      { id: 'ssal-9', name: 'Almendras laminadas, brotes verdes y soplete de cocina', amount: 20, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Fondo tostado de salmonetes y flambeado (30 min)',
        instruction:
          'Tuesta las verduras 13 min a fuego fuerte; tosta las cabezas y espinas de pescado; flambea con brandy, añade pimentón y pimienta, cubre con agua y hierve 30 minutos desespumando. Cuela aplastando bien.',
        timerSeconds: 1800,
      },
      {
        stepNumber: 2,
        title: 'Majado tradicional de azafrán y suquet',
        instruction:
          'Pocha ajo y cebolla 15 min; añade tomate pera y concentrado 15 min más; evapora vino blanco. En mortero maja almendras tostadas, pan frito y hebras de azafrán; incorpóralo al sofrito con el caldo colado y tritura en robot hasta una salsa aterciopelada.',
        timerSeconds: 900,
      },
      {
        stepNumber: 3,
        title: 'Bolitas de patata al horno (30 min)',
        instruction:
          'Saca bolitas de patata con sacabolas. Colócalas en bandeja de horno con mantequilla en pomada y sal; hornea a 190 °C durante 30 minutos moviendo de vez en cuando.',
        timerSeconds: 1800,
        temperature: '190 °C horno',
      },
      {
        stepNumber: 4,
        title: 'Marinado en lima y sopleteado crujiente',
        instruction:
          'Coloca los lomos con la piel hacia arriba en aceite aromatizado con ralladura de lima durante 25 minutos. Dora en sartén muy caliente 1 minuto SOLO por el lado de la carne. Pasa el soplete por la piel hasta que quede crujiente y dorada.',
        timerSeconds: 1500,
      },
      {
        stepNumber: 5,
        title: 'Aire de lima con lecitina (45°)',
        instruction:
          'Mezcla el zumo de lima colado con el agua helada y la lecitina de soja. Bate en vaso batidor inclinado a 45° a velocidad media hasta generar una espuma aérea estable.',
        timerSeconds: 120,
      },
      {
        stepNumber: 6,
        title: 'Montaje de vanguardia',
        instruction:
          'En el centro de un plato hondo sirve un cazo de suquet. Coloca el lomo de salmonete a la izquierda, las bolitas de patata con almendras laminadas a la derecha, dispone el aire de lima en el centro y corona con brotes verdes y sal en escamas.',
      },
    ],
  },
  {
    id: 'gelee-mandarina-cremoso-choco-blanco-kc1',
    code: 'KC-1.4',
    title: 'Gelée de Cítricos, Cremoso de Chocolate Blanco y Pistachos al Curry',
    subtitle: 'Doble gelée de limón y mandarina con agar-agar, cremoso aireado, milhojas de pasta filo y pistachos garrapiñados',
    category: 'Postres y Dulces',
    difficulty: 'Alta Cocina',
    prepTimeMinutes: 60,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El agar-agar precisa 5 minutos de ebullición para gelificar; al enfriar y triturar en robot se obtiene un gel fluido con brillo cristalino sin necesidad de calor al servir. Los pistachos garrapiñados al curry Madrás y cúrcuma rompen la monotonía dulce con notas aromáticas de alta pastelería contemporánea.',
    pairing: 'Vino dulce Tokaji o Moscatel de grano menudo.',
    isFavorite: false,
    createdAt: '2026-10-18T11:35:00Z',
    ingredients: [
      { id: 'gcb-1', name: 'Zumo de limón (100 ml) + 2 g agar-agar + 20 g azúcar (Gelée limón)', amount: 220, unit: 'g' },
      { id: 'gcb-2', name: 'Zumo de mandarina (100 ml) + 2 g agar-agar + 20 g azúcar (Gelée mandarina)', amount: 220, unit: 'g' },
      { id: 'gcb-3', name: 'Chocolate blanco de cobertura fundido', amount: 200, unit: 'g' },
      { id: 'gcb-4', name: 'Gelatina cola de pez (2 hojas) disueltas en 100 ml leche caliente', amount: 105, unit: 'g' },
      { id: 'gcb-5', name: 'Nata para montar semi montada (para cremoso)', amount: 200, unit: 'ml' },
      { id: 'gcb-6', name: 'Láminas de pasta filo (5 u) pintadas con nata (150 ml) y azúcar (20 g)', amount: 200, unit: 'g' },
      { id: 'gcb-7', name: 'Pistachos pelados (100 g), agua, azúcar y curry Madrás (5 g)', amount: 150, unit: 'g' },
      { id: 'gcb-8', name: 'Brotes de cilantro y acedera + Cúrcuma en polvo', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Doble Gelée de agar-agar',
        instruction:
          'En cazos separados hierve el zumo de limón con agua, azúcar y 2 g de agar-agar durante 5 minutos; haz lo mismo con el zumo de mandarina. Extiende en bandejas y refrigera 1 hora. Pasa por robot de cocina hasta lograr dos geles fluidos brillantes y colócalos en mangas pasteleras.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Cremoso aireado de chocolate blanco',
        instruction:
          'Funde el chocolate blanco al baño maría. Disuelve las hojas de gelatina hidratadas en 100 ml de leche hirviendo y mezcla con el chocolate fundido. Semi monta los 200 ml de nata con varilla e incorpórala a la mezcla templada con movimientos envolventes. Refrigera 1.5 horas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Crujiente de pasta filo y nata (1 h a 150 °C)',
        instruction:
          'Superpón 5 láminas de pasta filo pintando cada capa delicadamente con la nata azucarada. Corta en rectángulos iguales y hornea a 150 °C durante 1 hora hasta dorado crujiente.',
        timerSeconds: 3600,
        temperature: '150 °C horno',
      },
      {
        stepNumber: 4,
        title: 'Pistachos garrapiñados al curry Madrás',
        instruction:
          'Hierve agua y azúcar con los pistachos removiendo hasta evaporar el agua y cristalizar en un caramelo blanco escarchado. Apaga el fuego e incorpora el curry Madrás y sal removiendo bien.',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Montaje de alta pastelería',
        instruction:
          'Extiende un punto de cada gelée con espátula sobre el plato. Intercala puntos de cremoso de chocolate blanco con láminas de crujiente de pasta filo. Corona con pistachos garrapiñados al curry, brotes de cilantro y acedera y una lluvia sutil de cúrcuma en polvo.',
      },
    ],
  },

  // ========================================================
  // KITCHEN CLUB — ESPECIAL NAVIDAD 2025
  // ========================================================
  {
    id: 'calabaza-burrata-chalotas-glaseadas-kcnav',
    code: 'KC-NAV.1',
    title: 'Dados y Semillas de Calabaza con Burrata, Chalotas Glaseadas y Albahaca',
    subtitle: 'Calabaza asada al curry y Sichuan, chalotas enteras glaseadas al Oporto y Módena con burrata fresca',
    category: 'Tapas y Croquetas',
    difficulty: 'Media',
    prepTimeMinutes: 45,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Hornear la calabaza primero tapada con aluminio conserva su humedad interna; destapar los últimos 10 minutos a 200 °C carameliza la superficie. El glaseado lento de las chalotas enteras en Oporto y Módena aporta notas agridulces que contrastan con la untuosidad fresca de la burrata.',
    pairing: 'Vino blanco Chablis con cuerpo o vino tinto frutal Mencía.',
    isFavorite: false,
    createdAt: '2026-10-19T01:00:00Z',
    ingredients: [
      // Para los dados de calabaza asada
      { id: 'cbg-1', name: 'Calabaza pelada en dados de 4 cm', amount: 300, unit: 'g' },
      { id: 'cbg-2', name: 'Aceite de oliva virgen extra', amount: 20, unit: 'ml', notes: 'Para embadurnar la calabaza' },
      { id: 'cbg-3', name: 'Curry en polvo', amount: 5, unit: 'g' },
      { id: 'cbg-4', name: 'Pimienta de Sichuan recién molida', amount: 2, unit: 'g' },
      { id: 'cbg-5', name: 'Sal fina', amount: 3, unit: 'g' },

      // Para las chalotas glaseadas
      { id: 'cbg-6', name: 'Chalotas peladas enteras', amount: 600, unit: 'g' },
      { id: 'cbg-7', name: 'Mantequilla', amount: 60, unit: 'g' },
      { id: 'cbg-8', name: 'Aceite de oliva', amount: 20, unit: 'ml' },
      { id: 'cbg-9', name: 'Azúcar moreno', amount: 30, unit: 'g' },
      { id: 'cbg-10', name: 'Vinagre de Módena', amount: 15, unit: 'ml' },
      { id: 'cbg-11', name: 'Vino de Oporto', amount: 50, unit: 'ml' },
      { id: 'cbg-12', name: 'Agua mineral (para reducir)', amount: 300, unit: 'ml', notes: 'Hasta cubrir parcialmente para glasear en 20 min' },
      { id: 'cbg-13', name: 'Sal en escamas', amount: 3, unit: 'g' },

      // Otros
      { id: 'cbg-14', name: 'Burrata fresca', amount: 1, unit: 'ud' },
      { id: 'cbg-15', name: 'Hojitas frescas de albahaca', amount: 12, unit: 'ud' },
      { id: 'cbg-16', name: 'Semillas de calabaza tostadas', amount: 25, unit: 'g' },
      { id: 'cbg-17', name: 'Aceite de oliva virgen extra y pimienta negra molida', amount: 15, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Asado especiado de la calabaza',
        instruction:
          'Cortamos la calabaza pelada en dados regulares de 4 cm de grosor y los disponemos sobre una bandeja de horno. Los embadurnamos bien con aceite de oliva virgen extra, sal, curry en polvo y pimienta de Sichuan recién molida. Tapamos la bandeja con papel de aluminio y la introducimos en el horno precalentado a 180 °C durante 20 minutos.',
        timerSeconds: 1200,
        temperature: '180 °C horno (con aluminio)',
      },
      {
        stepNumber: 2,
        title: 'Dorado final de la calabaza',
        instruction:
          'Destapamos con cuidado la bandeja retirando el papel de aluminio y horneamos durante 10 minutos a 200 °C hasta que los dados adquieran un dorado apetecible y tierno.',
        timerSeconds: 600,
        temperature: '200 °C horno (destapado)',
      },
      {
        stepNumber: 3,
        title: 'Salteado y reducción de las chalotas',
        instruction:
          'Pelamos las chalotas asegurando que queden enteras. En un cazo a fuego medio derretimos la mantequilla junto con el aceite de oliva. Añadimos las chalotas y salteamos durante 5 minutos para que se doren. Añadimos el azúcar moreno, el vinagre de Módena y el vino de Oporto, y seguimos cocinando a fuego bajo durante 10 minutos.',
        timerSeconds: 900,
      },
      {
        stepNumber: 4,
        title: 'Glaseado meloso de las chalotas',
        instruction:
          'Añadimos el agua y dejamos cocinar durante 20 minutos a fuego medio sin tapar, moviendo sólo una o dos veces durante todo el proceso. Cuando el líquido se haya reducido casi por completo, las chalotas comenzarán a glasearse cubriéndose de un velo brillante. Terminamos con sal en escamas.',
        timerSeconds: 1200,
        tip: 'Mover poco las chalotas para que no se deshagan y mantengan su forma entera.',
      },
      {
        stepNumber: 5,
        title: 'Emplatado festivo',
        instruction:
          'En el centro de un plato grande o de una fuente amplia colocamos la burrata entera y le ponemos por encima un chorro generoso de AOVE y pimienta negra recién molida. Rodeando la burrata distribuimos armónicamente los dados de calabaza alternados con las chalotas glaseadas y hojitas frescas de albahaca. Terminamos esparciendo por toda la superficie semillas de calabaza y sal en escamas.',
      },
    ],
  },
  {
    id: 'parmentier-patatas-emmental-kcnav',
    code: 'KC-NAV.2',
    title: 'Parmentier de Patatas con Queso Emmental Gratinado',
    subtitle: 'Puré sedoso de patata Monalisa con mantequilla y leche, con costra dorada de emmental al horno a 180 °C',
    category: 'Arroces y Cremas',
    difficulty: 'Fácil',
    prepTimeMinutes: 35,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Cocer siempre las patatas con su piel para evitar que absorban agua en exceso. Integrar la mantequilla y la leche batiendo en caliente emulsiona los almidones logrando una textura de guarnición francesa de ensueño.',
    pairing: 'Vino blanco Chardonnay con crianza o cerveza belga de trigo.',
    isFavorite: false,
    createdAt: '2026-10-19T01:05:00Z',
    ingredients: [
      { id: 'par-1', name: 'Patatas variedad Monalisa enteras', amount: 600, unit: 'g' },
      { id: 'par-2', name: 'Mantequilla de calidad', amount: 150, unit: 'g' },
      { id: 'par-3', name: 'Leche entera', amount: 200, unit: 'ml' },
      { id: 'par-4', name: 'Queso Emmental rallado', amount: 200, unit: 'g' },
      { id: 'par-5', name: 'Sal fina', amount: 5, unit: 'g' },
      { id: 'par-6', name: 'Pimienta negra molida', amount: 2, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cocción de las patatas con piel',
        instruction:
          'En una olla con agua abundante con sal ponemos a cocer las patatas enteras con piel a fuego medio hasta que estén completamente blandas al pincharlas con un cuchillo (aprox. 25–30 minutos). Las sacamos y dejamos atemperar brevemente.',
        timerSeconds: 1500,
      },
      {
        stepNumber: 2,
        title: 'Machacado y emulsión cremosa',
        instruction:
          'Pelamos las patatas en caliente y las machacamos en pasapurés o prensa hasta hacer un puré fino sin grumos. En un cazo a fuego suave, colocamos las patatas machacadas, añadimos la mantequilla en dados y la leche templada, y removemos enérgicamente con varilla hasta que queden perfectamente integradas y sedosas. Sazonamos con sal y pimienta negra.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Gratinado al horno con Emmental (10 min)',
        instruction:
          'En el momento de servir, pasamos el parmentier a un recipiente o fuente apta para horno, cubrimos uniformemente con el queso emmental rallado y horneamos durante 10 minutos a 180 °C hasta que el queso se funda y forme una costra dorada.',
        timerSeconds: 600,
        temperature: '180 °C horno',
        tip: 'Gratinar justo antes del pase para servirlo humeante y fundente.',
      },
    ],
  },
  {
    id: 'judias-keniatas-ajo-guindilla-kcnav',
    code: 'KC-NAV.3',
    title: 'Judías Keniatas Salteadas con Ajo, Guindilla y Limón',
    subtitle: 'Cocción express de 5 min y choque térmico en hielo, salteadas a fuego vivo con láminas de ajo y ralladura fresca',
    category: 'Tapas y Croquetas',
    difficulty: 'Fácil',
    prepTimeMinutes: 15,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'El paso inmediato de la olla hirviendo al agua con hielo (choque térmico invertido) detiene la cocción instantáneamente y fija la clorofila, logrando un verde radiante y un mordisco crujiente inigualable.',
    pairing: 'Vino blanco Verdejo o Sauvignon Blanc bien frío.',
    isFavorite: false,
    createdAt: '2026-10-19T01:10:00Z',
    ingredients: [
      { id: 'jk-1', name: 'Judías verdes Kenia', amount: 800, unit: 'g' },
      { id: 'jk-2', name: 'Aceite de oliva virgen extra', amount: 30, unit: 'ml' },
      { id: 'jk-3', name: 'Dientes de ajo en láminas muy finas', amount: 3, unit: 'ud' },
      { id: 'jk-4', name: 'Cayenas (enteras o partidas según gusto)', amount: 2, unit: 'ud' },
      { id: 'jk-5', name: 'Ralladura fresca de 1/2 limón', amount: 1, unit: 'ud' },
      { id: 'jk-6', name: 'Sal en escamas', amount: 4, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cocción express de 5 minutos',
        instruction:
          'Lavamos bien las judías verdes Kenia retirando los extremos. Ponemos una olla con agua abundante con sal a hervir e introducimos las judías cocinándolas durante exactamente 5 minutos a fuego vivo.',
        timerSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Choque térmico en agua helada',
        instruction:
          'Al terminar los 5 minutos de cocción, sacamos inmediatamente las judías y las pasamos a un bol con agua muy fría y abundantes cubitos de hielo para cortar la cocción en seco y fijar su color verde brillante. Escurrimos muy bien.',
        timerSeconds: 120,
        tip: 'Secar bien con papel o paño limpio para que salteen y no se cuezan en la sartén.',
      },
      {
        stepNumber: 3,
        title: 'Salteado vivo al ajo, cayena y limón',
        instruction:
          'En una sartén amplia ponemos aceite de oliva a fuego medio, cortamos los 3 dientes de ajo en láminas muy finas y los rehogamos con cuidado hasta que estén ligeramente dorados. Añadimos las 2 cayenas (enteras o partidas según el nivel de picante deseado). Incorporamos las judías secas y salteamos a fuego vivo durante 2–3 minutos. Terminamos espolvoreando la ralladura de 1/2 limón y sal en escamas.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'lubina-a-la-sal-kcnav',
    code: 'KC-NAV.4',
    title: 'Lubina Salvaje a la Sal con Brotes de Acedera',
    subtitle: 'Pieza entera de 1,5 kg cocinada en costra sellada de sal gorda y clara de huevo a 200 °C durante 30 min',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 40,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Mezclar la sal con clara de huevo crea una costra dura tipo arcilla que no desmorona al hornear y cocina el pescado en su propio vapor y jugos sin salarlo de más. Dejar la punta de la cola sin cubrir permite comprobar la cocción.',
    pairing: 'Vino blanco Albariño, Godello o Cava Brut Nature Reserva.',
    isFavorite: false,
    createdAt: '2026-10-19T01:15:00Z',
    ingredients: [
      { id: 'lbs-1', name: 'Lubina entera limpia (sin escamas ni vísceras)', amount: 1.5, unit: 'kg' },
      { id: 'lbs-2', name: 'Sal gorda para hornear', amount: 1.5, unit: 'kg' },
      { id: 'lbs-3', name: 'Clara de huevo', amount: 1, unit: 'ud' },
      { id: 'lbs-4', name: 'Aceite de oliva virgen extra', amount: 25, unit: 'ml', notes: 'Para regar los lomos al emplatar' },
      { id: 'lbs-5', name: 'Brotes frescos de acedera', amount: 10, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparación de la costra de sal',
        instruction:
          'En un bol amplio ponemos el 1,5 kg de sal gorda, le añadimos la clara de huevo ligeramente batida y mezclamos bien con las manos hasta que la sal quede homogéneamente húmeda y moldeable.',
        timerSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Sellado hermético de la lubina',
        instruction:
          'En una bandeja de horno cubierta con papel sulfurizado ponemos una cama compacta de la mezcla de sal con clara y colocamos encima la lubina limpia. Cubrimos la lubina con el resto de la sal presionando suavemente para que quede totalmente tapada y sellada, dejando únicamente parte de la aleta caudal (cola) de la lubina sin cubrir.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Cocción al horno (30 min a 200 °C)',
        instruction:
          'Metemos la bandeja en el horno precalentado a 200 °C y horneamos durante exactamente 30 minutos. La costra se endurecerá y adquirirá un tono dorado suave.',
        timerSeconds: 1800,
        temperature: '200 °C horno',
      },
      {
        stepNumber: 4,
        title: 'Apertura de la costra y extracción de lomos',
        instruction:
          'Rompemos con cuidado la costra dura de sal con la ayuda de un cuchillo o maza de cocina. Retiramos las placas de sal y levantamos la piel de la lubina que saldrá limpia de una pieza. Con una paletina sacamos los lomos limpios sin espinas.',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Montaje de pescado noble',
        instruction:
          'En un plato llano colocamos una ración generosa de lomo limpio de lubina recién horneado, terminamos con un chorro fino de aceite de oliva virgen extra de cosecha temprana por encima y decoramos con brotes frescos de acedera.',
      },
    ],
  },
  {
    id: 'roast-beef-salsa-gravy-kcnav',
    code: 'KC-NAV.5',
    title: 'Roast Beef de Lomo Bajo con Salsa Gravy de Asado',
    subtitle: 'Lomo bajo sellado y horneado a 180 °C (corazón a 60 °C), reposado 20 min y salseado con jugo de carne, beurre noisette y Perrins',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Atemperar la carne fuera del frío antes de cocinarla es imprescindible para un asado parejo. El reposo de 20 minutos antes de trinchar asienta los jugos internos para un corte limpio y jugoso. La salsa Gravy aprovecha todos los jugos caramelizados del horneado con un roux tostado.',
    pairing: 'Vino tinto Reserva de Rioja, Ribera del Duero o Cabernet Sauvignon.',
    isFavorite: false,
    createdAt: '2026-10-19T01:20:00Z',
    ingredients: [
      // Para el roast beef
      { id: 'rbf-1', name: 'Lomo bajo de ternera limpio en una pieza', amount: 1.2, unit: 'kg' },
      { id: 'rbf-2', name: 'Aceite de oliva', amount: 20, unit: 'ml' },
      { id: 'rbf-3', name: 'Sal fina', amount: 8, unit: 'g' },
      { id: 'rbf-4', name: 'Pimienta negra molida', amount: 4, unit: 'g' },

      // Para la salsa Gravy
      { id: 'rbf-5', name: 'Mantequilla', amount: 30, unit: 'g' },
      { id: 'rbf-6', name: 'Harina de trigo', amount: 20, unit: 'g' },
      { id: 'rbf-7', name: 'Caldo de carne concentrado', amount: 350, unit: 'ml' },
      { id: 'rbf-8', name: 'Jugo del roast beef desglasado de la bandeja', amount: 50, unit: 'ml' },
      { id: 'rbf-9', name: 'Salsa Perrins (Worcestershire)', amount: 5, unit: 'ml' },
      { id: 'rbf-10', name: 'Sal y pimienta negra molida', amount: 3, unit: 'g' },

      // Otros
      { id: 'rbf-11', name: 'Aceite de oliva virgen extra', amount: 20, unit: 'ml' },
      { id: 'rbf-12', name: 'Sal en escamas', amount: 5, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Atemperado y sellado a fuego fuerte',
        instruction:
          'Sacamos el lomo de ternera de la nevera con suficiente antelación (al menos 45–60 min) para que no esté frío en su centro al entrar al horno. Salpimentamos generosamente la pieza por todas sus caras. Ponemos una sartén amplia con muy poco aceite de oliva a fuego fuerte y sellamos muy bien la carne por todos sus lados hasta crear una costra bien dorada; retiramos.',
        timerSeconds: 360,
      },
      {
        stepNumber: 2,
        title: 'Horneado a 180 °C (15 min)',
        instruction:
          'Pasamos la carne a una bandeja de horno y metemos en el horno precalentado a 180 °C durante 15 minutos. Lo ideal es que el centro de la carne alcance los 55–60 °C (punto rosado perfecto).',
        timerSeconds: 900,
        temperature: '180 °C horno (centro a 60 °C)',
      },
      {
        stepNumber: 3,
        title: 'Reposo obligatorio (20 min) y corte fino',
        instruction:
          'Sacamos la carne del horno y la dejamos reposar sobre una tabla durante 20 minutos para que los jugos se redistribuyan y la carne quede extremadamente jugosa sin sangrar al cortar. Reservamos los jugos que haya soltado en la bandeja para la salsa. Cortamos la carne en lonchas muy finas.',
        timerSeconds: 1200,
        tip: 'Utilizar un cuchillo jamonero o de filetear bien afilado para lonchas casi transparentes.',
      },
      {
        stepNumber: 4,
        title: 'Elaboración de la salsa Gravy al roux tostado',
        instruction:
          'En un cazo a fuego bajo ponemos los 30 g de mantequilla y dejamos hasta que adquiera un color tostado avellana (beurre noisette). Añadimos los 20 g de harina y rehogamos con varilla hasta que también tome un color tostado uniforme. A continuación añadimos el caldo de carne caliente junto con el jugo que ha soltado el asado en el horno poco a poco, batiendo continuamente para que se integre sin grumos. Dejamos hervir todo a fuego lento durante 10 minutos y terminamos con sal, pimienta negra y unas gotitas de salsa Perrins.',
        timerSeconds: 600,
      },
      {
        stepNumber: 5,
        title: 'Montaje en fuente navideña',
        instruction:
          'En una fuente amplia colocamos el roast beef cortado en lonchas finas dispuestas en abanico con un chorrito de aceite de oliva virgen extra por encima y sal en escamas. Servimos acompañado del parmentier de patatas y las judías keniatas salteadas, con la salsa gravy bien caliente en salsera aparte.',
      },
    ],
  },
  {
    id: 'copa-cheesecake-frutos-rojos-kcnav',
    code: 'KC-NAV.6',
    title: 'Copa de Cheesecake en Texturas con Frutos Rojos',
    subtitle: 'Doble capa de tierra crujiente de galleta y nueces, crema montada de queso y mermelada casera de 4 frutos del bosque',
    category: 'Postres y Dulces',
    difficulty: 'Fácil',
    prepTimeMinutes: 50,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Semimontar la nata antes de incorporar el queso crema evita grumos y aporta ligereza aérea. La cocción a fuego lento durante 40 minutos de las 4 bayas con miel y azúcar extrae la pectina natural creando una jalea con brillo de espejo.',
    pairing: 'Vino dulce Pedro Ximénez, Oporto Tawny o vino espumoso Moscato d´Asti.',
    isFavorite: false,
    createdAt: '2026-10-19T01:25:00Z',
    ingredients: [
      // Para la base de galletas
      { id: 'cck-1', name: 'Galletas de mantequilla', amount: 100, unit: 'g' },
      { id: 'cck-2', name: 'Nueces peladas', amount: 50, unit: 'g' },

      // Para la crema de queso
      { id: 'cck-3', name: 'Nata de montar fría (35% MG)', amount: 200, unit: 'ml' },
      { id: 'cck-4', name: 'Azúcar glass', amount: 80, unit: 'g' },
      { id: 'cck-5', name: 'Queso crema', amount: 350, unit: 'g' },
      { id: 'cck-6', name: 'Esencia de vainilla', amount: 5, unit: 'ml' },

      // Para la mermelada de frutos rojos
      { id: 'cck-7', name: 'Frambuesas frescas', amount: 60, unit: 'g' },
      { id: 'cck-8', name: 'Moras silvestres', amount: 60, unit: 'g' },
      { id: 'cck-9', name: 'Arándanos frescos', amount: 60, unit: 'g' },
      { id: 'cck-10', name: 'Fresas en trozos', amount: 60, unit: 'g' },
      { id: 'cck-11', name: 'Azúcar blanco', amount: 80, unit: 'g' },
      { id: 'cck-12', name: 'Miel', amount: 20, unit: 'g' },
      { id: 'cck-13', name: 'Agua mineral', amount: 100, unit: 'ml', notes: 'Añadir al final de la cocción de 40 min' },

      // Otros
      { id: 'cck-14', name: 'Frambuesas enteras para coronar', amount: 6, unit: 'ud' },
      { id: 'cck-15', name: 'Hojitas frescas de hierbabuena', amount: 6, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tierra crujiente de galleta y nuez',
        instruction:
          'Trituramos las galletas de mantequilla (100 g) y las nueces peladas (50 g) en un robot de cocina o picadora hasta obtener una textura de arena crujiente con tropezones y reservamos.',
        timerSeconds: 60,
      },
      {
        stepNumber: 2,
        title: 'Crema montada de queso y vainilla',
        instruction:
          'En un bol bien frío montamos los 200 ml de nata con los 80 g de azúcar glass con la ayuda de una varilla. Cuando esté semi montada le añadimos los 350 g de queso crema y la esencia de vainilla batiendo suavemente hasta que todo esté perfectamente integrado y sedoso. Metemos en una manga pastelera y reservamos en la nevera.',
        timerSeconds: 300,
      },
      {
        stepNumber: 3,
        title: 'Mermelada lenta de frutos rojos (40 min)',
        instruction:
          'En un cazo ponemos las frambuesas (60 g), moras (60 g), arándanos (60 g), fresas (60 g), el azúcar (80 g) y la miel (20 g) a fuego vivo. Cuando empiece a hervir bajamos el fuego al mínimo y dejamos cocinar durante 40 minutos moviendo de vez en cuando. Al final de la cocción añadimos los 100 ml de agua para aligerar la densidad y dejamos enfriar.',
        timerSeconds: 2400,
      },
      {
        stepNumber: 4,
        title: 'Montaje en copa de balón en 4 capas',
        instruction:
          'En 6 copas de balón ponemos primero una base de la tierra de galleta con nueces; a continuación dosificamos con la manga una capa de la crema de queso. Volvemos a repetir la operación formando una segunda capa de galleta y una segunda capa de crema de queso (quedando 2 capas de galleta y 2 capas de crema de queso alternadas).',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Corona de mermelada y hierbabuena',
        instruction:
          'Por encima de la última capa de crema de queso vertemos con delicadeza la mermelada de frutos rojos templada o fría cubriendo la superficie. Terminamos coronando con una frambuesa entera en el centro de cada copa y una hojita de hierbabuena fresca.',
      },
    ],
  },

  // ========================================================
  // RECETAS DE AUTOR — POSTRES FAVORITOS
  // ========================================================
  {
    id: 'sopa-chufas-coco-torrijas-caramelizadas',
    code: 'TOP-1.1',
    title: 'Sopa Cremosa de Chufas y Coco con Torrija Caramelizada',
    subtitle: 'Brioche empapado en infusión de vainilla, costra crujiente de azúcar moreno al soplete y sopa densa de horchata y coco',
    category: 'Postres y Dulces',
    difficulty: 'Media',
    prepTimeMinutes: 50,
    baseServings: 6,
    imageUrl:
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85',
    chefNote:
      'Remojar las chufas 8 horas ablanda el almidón permitiendo una pasta untuosa. El empapado lento de la miga de brioche durante 5-6 horas con la infusión templada de chufa, coco y vainilla convierte el centro en un bocado fundente como tocinillo. El sopleteado directo con azúcar moreno crea una costra de caramelo crujiente que contrasta con la sopa fría.',
    pairing: 'Vino dulce Fondillón alicantino, Moscatel de grano menudo o café de especialidad arábica.',
    isFavorite: true,
    createdAt: '2026-10-19T01:30:00Z',
    ingredients: [
      // Para la Sopa de chufas
      { id: 'sct-1', name: 'Chufas secas de Valencia', amount: 200, unit: 'g', notes: 'Remojar 8 horas en agua' },
      { id: 'sct-2', name: 'Leche entera', amount: 1000, unit: 'ml', notes: '1 litro para la sopa' },
      { id: 'sct-3', name: 'Nata para montar (35% MG)', amount: 250, unit: 'ml', notes: '1/4 de litro' },
      { id: 'sct-4', name: 'Leche de coco', amount: 100, unit: 'ml' },
      { id: 'sct-5', name: 'Azúcar blanco', amount: 180, unit: 'g' },
      { id: 'sct-6', name: 'Agua mineral', amount: 500, unit: 'ml', notes: 'Para el remojo previo de 8 horas' },

      // Para la torrija
      { id: 'sct-7', name: 'Miga de pan brioche o pan de molde artesano', amount: 150, unit: 'g', notes: 'Cortada en lingotes gruesos' },
      { id: 'sct-8', name: 'Leche entera (para empapar torrijas)', amount: 750, unit: 'ml', notes: '3/4 de litro' },
      { id: 'sct-9', name: 'Nata para montar (para empapar torrijas)', amount: 500, unit: 'ml', notes: '1/2 litro' },
      { id: 'sct-10', name: 'Azúcar blanco (para la infusión)', amount: 180, unit: 'g' },
      { id: 'sct-11', name: 'Rama de vainilla natural', amount: 1, unit: 'ud', notes: 'Rascada' },
      { id: 'sct-12', name: 'Azúcar moreno', amount: 40, unit: 'g', notes: 'Para espolvorear y quemar con soplete' },

      // Otros / Acabado
      { id: 'sct-13', name: 'Hojas frescas de menta', amount: 6, unit: 'ud', notes: 'Para decorar' },
      { id: 'sct-14', name: 'Concentrado de mango o frutas tropicales', amount: 30, unit: 'ml', notes: 'Para contrastar acidez' },
      { id: 'sct-15', name: 'Soplete de repostería', amount: 1, unit: 'ud' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Remojo y triturado de las chufas (8 horas)',
        instruction:
          'Dejamos las chufas en remojo con agua durante aproximadamente 8 horas para rehidratarlas. Las lavamos bien después con agua limpia y las trituramos en un robot de cocina potente hasta formar una pasta espesa y homogénea.',
        timerSeconds: 28800,
        tip: 'Triturar a máxima potencia para extraer al máximo los almidones y aceites de la chufa.',
      },
      {
        stepNumber: 2,
        title: 'Infusión de chufas, coco y vainilla (30 min)',
        instruction:
          'En una olla ponemos a infusionar la leche (1 L), la nata (250 ml) y la leche de coco (100 ml). Añadimos la pasta de chufas triturada, el azúcar (180 g) y las semillas rascadas de la rama de vainilla junto con la vaina. Cocinamos a fuego lento removiendo frecuentemente durante 30 minutos.',
        timerSeconds: 1800,
      },
      {
        stepNumber: 3,
        title: 'Empapado prolongado de la miga (5 a 6 horas)',
        instruction:
          'Colocamos los lingotes de miga de pan brioche en una fuente honda. Vertemos por encima el líquido caliente anterior pasándolo primero por un colador fino para retirar impurezas. Dejamos enfriar a temperatura ambiente, tapamos con papel film en contacto directo y refrigeramos en la nevera durante 5 o 6 horas para que absorba toda la crema.',
        timerSeconds: 19800,
        tip: 'El reposo en frío cuaja la crema en el interior del brioche dejándolo fundente y meloso.',
      },
      {
        stepNumber: 4,
        title: 'Escurrido y reserva de la sopa',
        instruction:
          'Sacamos con delicadeza las torrijas empapadas y dejamos escurrir el líquido sobrante. Colamos el líquido sobrante por un tamiz fino y lo pasamos a una jarrita de servir (será nuestra sopa cremosa de chufas y coco).',
        timerSeconds: 300,
      },
      {
        stepNumber: 5,
        title: 'Caramelizado con soplete',
        instruction:
          'Espolvoreamos una capa uniforme de azúcar moreno (40 g) sobre la superficie de cada torrija. Con el soplete a potencia media realizamos pasadas circulares hasta fundir y caramelizar el azúcar en una costra crujiente, dorada y brillante.',
        timerSeconds: 120,
        tip: 'Caramelizar justo en el momento de comer para que la costra no pierda su textura crujiente.',
      },
      {
        stepNumber: 6,
        title: 'Emplatado en plato hondo o cuenco de cristal',
        instruction:
          'Colocamos la torrija caramelizada en el centro de un plato hondo o cuenco de cristal, vertemos alrededor su sopita cremosa fría de chufa y coco, decoramos con unas gotas de concentrado de mango o frutas tropicales y coronamos con hojas de menta fresca.',
      },
    ],
  },
];
