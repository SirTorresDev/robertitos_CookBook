import { Platform } from 'react-native';
import {
  CookingTip,
  FoodiePlace,
  Ingredient,
  KitchenUtensil,
  PlaceCategory,
  Recipe,
  RecipeCategory,
  RecipeDifficulty,
  RecipeStep,
  TipCategory,
  UtensilCategory,
  UtensilPriority,
} from '@/types/cookbook';
import { getSavedGeminiApiKey, parseRecipeFromRawText } from '@/core/recipeScanner';

export type VoiceItemKind = 'recipe' | 'place' | 'utensil' | 'tip';

export interface VoiceAiResult {
  kind: VoiceItemKind;
  transcript: string;
  usedAi: boolean;
  summaryMessage: string;
  recipe?: Omit<Recipe, 'id' | 'createdAt'>;
  place?: Omit<FoodiePlace, 'id' | 'createdAt'>;
  utensil?: Omit<KitchenUtensil, 'id' | 'createdAt'>;
  tip?: Omit<CookingTip, 'id' | 'createdAt'>;
}

export interface VoiceRecordingHandle {
  stop: () => Promise<{
    transcript: string;
    audioBase64: string | null;
    audioMimeType: string | null;
  }>;
  cancel: () => void;
}

/**
 * Inicia la captura de voz combinando:
 * 1) Web Speech API (es-ES) para transcripción en vivo mientras hablas.
 * 2) MediaRecorder (audio/mp4 en iOS Safari o audio/webm en Chrome) para enviar el audio
 *    directamente a Gemini multimodal y entender términos culinarios con total precisión.
 */
export async function startVoiceCapture(callbacks: {
  onTranscriptUpdate?: (text: string) => void;
  onError?: (message: string) => void;
}): Promise<VoiceRecordingHandle> {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    throw new Error(
      'Usa el micrófono del teclado de tu dispositivo en el cuadro de voz para dictar.'
    );
  }

  let finalTranscript = '';
  let interimTranscript = '';
  let recognition: any = null;
  let mediaRecorder: MediaRecorder | null = null;
  let mediaStream: MediaStream | null = null;
  const audioChunks: BlobPart[] = [];
  let chosenMimeType = '';

  // 1. Iniciar Web Speech API si está disponible en el navegador
  const SpeechRecognitionCtor =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (SpeechRecognitionCtor) {
    try {
      recognition = new SpeechRecognitionCtor();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalTranscript += (finalTranscript ? ' ' : '') + res[0].transcript.trim();
          } else {
            interim += res[0].transcript;
          }
        }
        interimTranscript = interim.trim();
        const combined = [finalTranscript, interimTranscript].filter(Boolean).join(' ');
        callbacks.onTranscriptUpdate?.(combined);
      };

      recognition.onerror = (event: any) => {
        if (event?.error === 'not-allowed') {
          callbacks.onError?.(
            'Permiso de micrófono denegado. Actívalo en los ajustes de Safari/navegador.'
          );
        }
      };

      recognition.start();
    } catch (err) {
      console.warn('[VoiceAssistant] SpeechRecognition warning:', err);
    }
  }

  // 2. Iniciar MediaRecorder para capturar el audio real para Gemini Multimodal
  if (navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined') {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const candidates = [
        'audio/mp4',
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg',
      ];
      for (const mime of candidates) {
        if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported(mime)) {
          chosenMimeType = mime;
          break;
        }
      }
      mediaRecorder = chosenMimeType
        ? new MediaRecorder(mediaStream, { mimeType: chosenMimeType })
        : new MediaRecorder(mediaStream);

      chosenMimeType = mediaRecorder.mimeType || chosenMimeType || 'audio/mp4';

      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          audioChunks.push(ev.data);
        }
      };

      mediaRecorder.start(250);
    } catch {
      if (!recognition) {
        throw new Error(
          'No se pudo acceder al micrófono. Verifica los permisos de micrófono en tu dispositivo.'
        );
      }
    }
  } else if (!recognition) {
    throw new Error(
      'Tu navegador no permite grabación directa. Pulsa el icono de micrófono del teclado de tu iPhone en el campo de texto.'
    );
  }

  const cleanupStreams = () => {
    try {
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.stop();
      }
    } catch {}
    try {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
    } catch {}
  };

  return {
    stop: () =>
      new Promise((resolve) => {
        try {
          if (recognition) {
            recognition.stop();
          }
        } catch {}

        const finishWithBlob = async (blob: Blob | null) => {
          cleanupStreams();
          const fullText = [finalTranscript, interimTranscript].filter(Boolean).join(' ').trim();
          if (!blob || blob.size === 0) {
            resolve({
              transcript: fullText,
              audioBase64: null,
              audioMimeType: null,
            });
            return;
          }

          try {
            const reader = new FileReader();
            reader.onloadend = () => {
              const resultStr = typeof reader.result === 'string' ? reader.result : '';
              const base64 = resultStr.includes(',') ? resultStr.split(',')[1] : null;
              resolve({
                transcript: fullText,
                audioBase64: base64,
                audioMimeType: chosenMimeType.split(';')[0] || 'audio/mp4',
              });
            };
            reader.onerror = () => {
              resolve({
                transcript: fullText,
                audioBase64: null,
                audioMimeType: null,
              });
            };
            reader.readAsDataURL(blob);
          } catch {
            resolve({
              transcript: fullText,
              audioBase64: null,
              audioMimeType: null,
            });
          }
        };

        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.onstop = () => {
            const blob =
              audioChunks.length > 0
                ? new Blob(audioChunks, { type: chosenMimeType || 'audio/mp4' })
                : null;
            finishWithBlob(blob);
          };
          try {
            mediaRecorder.stop();
          } catch {
            finishWithBlob(null);
          }
        } else {
          finishWithBlob(null);
        }
      }),
    cancel: () => {
      try {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      } catch {}
      cleanupStreams();
    },
  };
}

const VALID_RECIPE_CATEGORIES: Exclude<RecipeCategory, 'Todos'>[] = [
  'Pescados y Mariscos',
  'Carnes y Sous-Vide',
  'Arroces y Cremas',
  'Tapas y Croquetas',
  'Molecular y Espumas',
  'Postres y Dulces',
];

const VALID_DIFFICULTIES: RecipeDifficulty[] = ['Fácil', 'Media', 'Alta Cocina'];

const VALID_UTENSIL_CATEGORIES: Exclude<UtensilCategory, 'Todos'>[] = [
  'Precisión y Sous-Vide',
  'Molecular y Sifones',
  'Sartenes y Cocción',
  'Cuchillería y Corte',
  'Repostería y Acabado',
];

const VALID_PRIORITIES: UtensilPriority[] = ['Necesito', 'Capricho Chef', 'Básico'];

const VALID_PLACE_CATEGORIES: Exclude<PlaceCategory, 'Todos'>[] = [
  'Restaurante',
  'Mercado',
  'Tienda Gourmet / Molecular',
  'Pescadería / Producto',
  'Pastelería / Café',
];

const VALID_TIP_CATEGORIES: Exclude<TipCategory, 'Todos'>[] = [
  'Física Culinaria',
  'Técnicas Clásicas',
  'Sous-Vide / Roner',
  'Cocina Molecular',
  'Seguridad e Higiene',
];

/**
 * Analiza el comando de voz (texto transcrito y/o audio grabado) con Gemini IA
 * para detectar automáticamente si el usuario quiere guardar:
 * - Una Receta ('recipe')
 * - Un Sitio / Restaurante ('place')
 * - Una Cosa que necesita / Utensilio / Compra ('utensil')
 * - Una Técnica / Truco ('tip')
 */
export async function processVoiceCommandWithAI(params: {
  transcript: string;
  audioBase64?: string | null;
  audioMimeType?: string | null;
  preferredKind?: VoiceItemKind | 'auto';
}): Promise<VoiceAiResult> {
  const apiKey = await getSavedGeminiApiKey();
  const cleanTranscript = params.transcript.trim();

  if (apiKey && (cleanTranscript.length > 0 || params.audioBase64)) {
    const forcedHint =
      params.preferredKind && params.preferredKind !== 'auto'
        ? `El usuario ha seleccionado explícitamente el tipo "${params.preferredKind}". Devuelve kind="${params.preferredKind}".`
        : `Detecta automáticamente qué quiere guardar el usuario según lo que dice:
- "recipe": si menciona una receta, cómo cocinar un plato, ingredientes o elaboración. (Si solo menciona el nombre del plato o pocos detalles, actúa como chef ejecutivo y completa los ingredientes con cantidades en gramos/ml y los pasos detallados con tiempos en segundos y temperaturas precisas).
- "place": si menciona un restaurante, bar, mercado, pastelería, tienda o sitio donde comer o comprar en una ciudad/calle.
- "utensil": si menciona algo que necesita comprar, un utensilio, herramienta, ingrediente especial, máquina o cosa pendiente ("necesito comprar...", "apunta que me falta...", "quiero pillar un...").
- "tip": si menciona un truco técnico, consejo de cocina, temperatura de cocción o apunte culinario.`;

    const prompt = `Eres el asistente de voz inteligente de "Robertito's CookBook".
Analiza el dictado por voz del usuario${cleanTranscript ? ` (Transcripción detectada: "${cleanTranscript}")` : ''} y estructúralo en español.
${forcedHint}

Devuelve EXCLUSIVAMENTE un objeto JSON válido con este esquema exacto:
{
  "kind": "recipe" | "place" | "utensil" | "tip",
  "transcript": "Transcripción limpia de lo que pidió el usuario",
  "summaryMessage": "Frase breve confirmando qué se ha estructurado",
  "recipe": {
    "title": "Nombre del plato",
    "subtitle": "Subtítulo técnico breve",
    "category": "Pescados y Mariscos" | "Carnes y Sous-Vide" | "Arroces y Cremas" | "Tapas y Croquetas" | "Molecular y Espumas" | "Postres y Dulces",
    "difficulty": "Fácil" | "Media" | "Alta Cocina",
    "prepTimeMinutes": 35,
    "baseServings": 2,
    "chefNote": "Clave técnica del chef",
    "pairing": "Maridaje recomendado",
    "ingredients": [
      { "name": "Nombre ingrediente", "amount": 200, "unit": "g" }
    ],
    "steps": [
      {
        "stepNumber": 1,
        "title": "Título del paso",
        "instruction": "Explicación clara del paso",
        "timerSeconds": 300,
        "temperature": "65 °C"
      }
    ]
  },
  "place": {
    "name": "Nombre del sitio o restaurante",
    "category": "Restaurante" | "Mercado" | "Tienda Gourmet / Molecular" | "Pescadería / Producto" | "Pastelería / Café",
    "city": "Madrid",
    "neighborhood": "Barrio o zona",
    "address": "Dirección o calle para Google Maps",
    "priceLevel": "€" | "€€" | "€€€" | "€€€€",
    "mustOrder": "Qué pedir o comprar imprescindible",
    "review": "Nota personal sobre el sitio"
  },
  "utensil": {
    "name": "Nombre del utensilio o cosa que necesita",
    "category": "Precisión y Sous-Vide" | "Molecular y Sifones" | "Sartenes y Cocción" | "Cuchillería y Corte" | "Repostería y Acabado",
    "priority": "Necesito" | "Capricho Chef" | "Básico",
    "usedFor": "Para qué receta o uso lo necesita",
    "estimatedPrice": "25 €"
  },
  "tip": {
    "title": "Título del truco o técnica",
    "category": "Física Culinaria" | "Técnicas Clásicas" | "Sous-Vide / Roner" | "Cocina Molecular" | "Seguridad e Higiene",
    "summary": "Explicación técnica clara",
    "proSecret": "El matiz secreto del chef",
    "temperatureBadge": "62 °C"
  }
}
Incluye solo el objeto correspondiente al "kind" elegido.`;

    const parts: any[] = [{ text: prompt }];
    if (params.audioBase64) {
      parts.push({
        inlineData: {
          mimeType: params.audioMimeType || 'audio/mp4',
          data: params.audioBase64,
        },
      });
    }

    const modelsToTry = ['gemini-3.8-flash', 'gemini-2.5-flash'];
    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }],
              generationConfig: {
                responseMimeType: 'application/json',
              },
            }),
          }
        );

        if (response.ok) {
          const json = await response.json();
          const textOut = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleaned = textOut.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          return normalizeAiResult(parsed, cleanTranscript, true);
        }
      } catch (err) {
        console.warn(`[VoiceAssistant] Error con modelo ${modelName}:`, err);
      }
    }
  }

  // Fallback inteligente local si no hay API Key o sin conexión
  return parseVoiceCommandLocally(cleanTranscript, params.preferredKind);
}

function normalizeAiResult(
  parsed: any,
  fallbackTranscript: string,
  usedAi: boolean
): VoiceAiResult {
  const kind: VoiceItemKind =
    parsed?.kind === 'place' ||
    parsed?.kind === 'utensil' ||
    parsed?.kind === 'tip' ||
    parsed?.kind === 'recipe'
      ? parsed.kind
      : 'recipe';

  const transcript = String(parsed?.transcript || fallbackTranscript || '').trim();

  if (kind === 'place') {
    const p = parsed?.place || {};
    const category: Exclude<PlaceCategory, 'Todos'> = VALID_PLACE_CATEGORIES.includes(
      p.category
    )
      ? p.category
      : 'Restaurante';
    const priceLevel =
      p.priceLevel === '€' ||
      p.priceLevel === '€€' ||
      p.priceLevel === '€€€' ||
      p.priceLevel === '€€€€'
        ? p.priceLevel
        : '€€€';

    return {
      kind: 'place',
      transcript,
      usedAi,
      summaryMessage:
        parsed?.summaryMessage || `📍 Sitio detectado: ${p.name || 'Nuevo Sitio'}`,
      place: {
        name: String(p.name || 'Sitio Recomendado').trim(),
        category,
        city: String(p.city || 'Madrid').trim(),
        neighborhood: p.neighborhood ? String(p.neighborhood).trim() : undefined,
        address: String(p.address || p.city || 'Madrid').trim(),
        latitude: 40.42,
        longitude: -3.69,
        rating: 4.9,
        priceLevel,
        mustOrder: String(p.mustOrder || 'Especialidad de la casa').trim(),
        review: String(
          p.review || 'Guardado por voz con IA en Robertito´s CookBook.'
        ).trim(),
        imageUrl:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      },
    };
  }

  if (kind === 'utensil') {
    const u = parsed?.utensil || {};
    const category: Exclude<UtensilCategory, 'Todos'> = VALID_UTENSIL_CATEGORIES.includes(
      u.category
    )
      ? u.category
      : 'Precisión y Sous-Vide';
    const priority: UtensilPriority = VALID_PRIORITIES.includes(u.priority)
      ? u.priority
      : 'Necesito';

    return {
      kind: 'utensil',
      transcript,
      usedAi,
      summaryMessage:
        parsed?.summaryMessage ||
        `🛒 Cosa que necesitas: ${u.name || 'Nuevo utensilio'}`,
      utensil: {
        name: String(u.name || 'Utensilio o ingrediente pendiente').trim(),
        category,
        priority,
        usedFor: String(u.usedFor || 'Pendiente añadido por voz').trim(),
        estimatedPrice: u.estimatedPrice ? String(u.estimatedPrice).trim() : undefined,
        acquired: false,
      },
    };
  }

  if (kind === 'tip') {
    const t = parsed?.tip || {};
    const category: Exclude<TipCategory, 'Todos'> = VALID_TIP_CATEGORIES.includes(
      t.category
    )
      ? t.category
      : 'Física Culinaria';

    return {
      kind: 'tip',
      transcript,
      usedAi,
      summaryMessage:
        parsed?.summaryMessage || `💡 Técnica detectada: ${t.title || 'Nuevo truco'}`,
      tip: {
        code: 'VOZ',
        title: String(t.title || 'Apunte Técnico por Voz').trim(),
        category,
        summary: String(t.summary || transcript).trim(),
        keyRules: [String(t.summary || transcript).trim()],
        proSecret: String(
          t.proSecret || 'Controlar temperatura y tiempos con precisión.'
        ).trim(),
        temperatureBadge: t.temperatureBadge
          ? String(t.temperatureBadge).trim()
          : undefined,
        readTimeMinutes: 2,
      },
    };
  }

  // Default: recipe
  const r = parsed?.recipe || {};
  const category: Exclude<RecipeCategory, 'Todos'> = VALID_RECIPE_CATEGORIES.includes(
    r.category
  )
    ? r.category
    : 'Carnes y Sous-Vide';
  const difficulty: RecipeDifficulty = VALID_DIFFICULTIES.includes(r.difficulty)
    ? r.difficulty
    : 'Media';

  const ingredients: Ingredient[] =
    Array.isArray(r.ingredients) && r.ingredients.length > 0
      ? r.ingredients.map((ing: any, i: number) => ({
          id: `voice-ing-${Date.now()}-${i}`,
          name: String(ing.name || 'Ingrediente').trim(),
          amount: Number(ing.amount) || 100,
          unit: String(ing.unit || 'g').trim(),
        }))
      : [
          {
            id: `voice-ing-${Date.now()}-0`,
            name: 'Ingrediente principal',
            amount: 250,
            unit: 'g',
          },
        ];

  const steps: RecipeStep[] =
    Array.isArray(r.steps) && r.steps.length > 0
      ? r.steps.map((st: any, i: number) => ({
          stepNumber: i + 1,
          title: String(st.title || `Paso ${i + 1}`).trim(),
          instruction: String(st.instruction || '').trim(),
          timerSeconds: Number(st.timerSeconds) || undefined,
          temperature: st.temperature ? String(st.temperature).trim() : undefined,
        }))
      : [
          {
            stepNumber: 1,
            title: 'Elaboración principal',
            instruction: transcript || 'Seguir tiempos y temperatura indicados.',
            timerSeconds: 300,
          },
        ];

  return {
    kind: 'recipe',
    transcript,
    usedAi,
    summaryMessage:
      parsed?.summaryMessage || `🍳 Receta estructurada: ${r.title || 'Nueva Receta'}`,
    recipe: {
      title: String(r.title || 'Receta Dictada por Voz').trim(),
      subtitle: String(
        r.subtitle || 'Creada por voz con asistencia de IA'
      ).trim(),
      category,
      difficulty,
      prepTimeMinutes: Number(r.prepTimeMinutes) || 30,
      baseServings: Math.max(1, Number(r.baseServings) || 2),
      imageUrl:
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
      chefNote: String(
        r.chefNote || 'Ajustar punto de sal y controlar temperatura interna.'
      ).trim(),
      pairing: r.pairing ? String(r.pairing).trim() : undefined,
      ingredients,
      steps,
      isFavorite: true,
    },
  };
}

/**
 * Parser local en español para cuando no hay conexión o clave Gemini configurada.
 */
export function parseVoiceCommandLocally(
  rawTranscript: string,
  preferredKind?: VoiceItemKind | 'auto'
): VoiceAiResult {
  const text = rawTranscript.trim();
  const lower = text.toLowerCase();

  let detectedKind: VoiceItemKind =
    preferredKind && preferredKind !== 'auto' ? preferredKind : 'recipe';

  if (!preferredKind || preferredKind === 'auto') {
    if (
      /\b(necesito|comprar|falta|utensilio|sartén|sarten|cuchillo|sifón|sifon|bolsas|termómetro|termometro|máquina|maquina|equipo|pillar)\b/i.test(
        lower
      )
    ) {
      detectedKind = 'utensil';
    } else if (
      /\b(restaurante|sitio|bar|mercado|tienda|calle|madrid|barcelona|pedir|reservar|comer en|ir a)\b/i.test(
        lower
      )
    ) {
      detectedKind = 'place';
    } else if (/\b(truco|técnica|tecnica|consejo|secreto)\b/i.test(lower)) {
      detectedKind = 'tip';
    } else {
      detectedKind = 'recipe';
    }
  }

  if (detectedKind === 'utensil') {
    const cleanedName = text
      .replace(
        /^(apunta que|guarda que|anota que|quiero|necesito|comprar|me falta|un|una|unos|unas)\s+/gi,
        ''
      )
      .replace(/^(necesito|comprar|un|una|unos|unas)\s+/gi, '')
      .trim();
    const priceMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:€|euros?)/i);

    return {
      kind: 'utensil',
      transcript: text,
      usedAi: false,
      summaryMessage: `🛒 Cosa que necesitas detectada: ${cleanedName || text}`,
      utensil: {
        name:
          (cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1)) ||
          'Nuevo utensilio necesario',
        category: /sifón|xantana|agar|lecitina/i.test(lower)
          ? 'Molecular y Sifones'
          : /sartén|olla|cazo|plancha/i.test(lower)
          ? 'Sartenes y Cocción'
          : /cuchillo|mandolina|pinza/i.test(lower)
          ? 'Cuchillería y Corte'
          : 'Precisión y Sous-Vide',
        priority: /capricho/i.test(lower) ? 'Capricho Chef' : 'Necesito',
        usedFor: text,
        estimatedPrice: priceMatch ? `${priceMatch[1]} €` : undefined,
        acquired: false,
      },
    };
  }

  if (detectedKind === 'place') {
    const cleanedPlace = text
      .replace(
        /^(guarda|guardar|apunta|anota)?\s*(el|un)?\s*(restaurante|sitio|bar|mercado|tienda)?\s*(que se llama|llamado)?\s*/i,
        ''
      )
      .trim();
    const parts = cleanedPlace.split(/,|en la calle|donde hay que pedir|pedir/i);
    const name = (parts[0] || 'Nuevo Sitio').trim();
    const cityMatch = text.match(
      /\b(Madrid|Barcelona|Valencia|Sevilla|Bilbao|San Sebastián|Donostia|Málaga|Zaragoza)\b/i
    );
    const mustOrderMatch = text.match(/(?:pedir|probar|comprar)\s+(.+)$/i);

    return {
      kind: 'place',
      transcript: text,
      usedAi: false,
      summaryMessage: `📍 Sitio detectado por voz: ${name}`,
      place: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        category: /mercado/i.test(lower)
          ? 'Mercado'
          : /tienda/i.test(lower)
          ? 'Tienda Gourmet / Molecular'
          : /pasteler/i.test(lower)
          ? 'Pastelería / Café'
          : 'Restaurante',
        city: cityMatch ? cityMatch[1] : 'Madrid',
        address: parts[1]?.trim() || cityMatch?.[1] || 'Madrid',
        latitude: 40.42,
        longitude: -3.69,
        rating: 4.9,
        priceLevel: '€€€',
        mustOrder: mustOrderMatch?.[1]?.trim() || 'Plato estrella recomendado',
        review: text,
        imageUrl:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      },
    };
  }

  if (detectedKind === 'tip') {
    return {
      kind: 'tip',
      transcript: text,
      usedAi: false,
      summaryMessage: '💡 Técnica estructurada por voz',
      tip: {
        code: 'VOZ',
        title: text.slice(0, 48) + (text.length > 48 ? '...' : ''),
        category: 'Física Culinaria',
        summary: text,
        keyRules: [text],
        proSecret: 'Apunte guardado por dictado de voz.',
        readTimeMinutes: 2,
      },
    };
  }

  const draft = parseRecipeFromRawText(text);
  return {
    kind: 'recipe',
    transcript: text,
    usedAi: false,
    summaryMessage: `🍳 Receta estructurada por voz: ${draft.title}`,
    recipe: {
      title: draft.title,
      subtitle: draft.subtitle,
      category: draft.category,
      difficulty: draft.difficulty,
      prepTimeMinutes: draft.prepTimeMinutes,
      baseServings: draft.baseServings,
      imageUrl: draft.imageUrl,
      chefNote: draft.chefNote,
      pairing: draft.pairing,
      ingredients: draft.ingredients,
      steps: draft.steps,
      isFavorite: true,
    },
  };
}
