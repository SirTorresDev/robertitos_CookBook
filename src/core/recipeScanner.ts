import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Ingredient,
  RecipeCategory,
  RecipeDifficulty,
  RecipeStep,
} from '@/types/cookbook';

const GEMINI_KEY_STORAGE = '@robertito_cookbook_gemini_key_v1';
const DEFAULT_GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export async function getSavedGeminiApiKey(): Promise<string> {
  const stored = await AsyncStorage.getItem(GEMINI_KEY_STORAGE);
  if (stored && stored.trim().length > 0) return stored.trim();
  return DEFAULT_GEMINI_KEY;
}

export async function saveGeminiApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
}

export interface ScannedRecipeDraft {
  title: string;
  subtitle: string;
  category: Exclude<RecipeCategory, 'Todos'>;
  difficulty: RecipeDifficulty;
  prepTimeMinutes: number;
  baseServings: number;
  imageUrl: string;
  chefNote: string;
  pairing?: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  usedAiVision: boolean;
}

/**
 * Abre la cámara del iPhone o la galería de fotos para capturar una receta.
 */
export async function pickRecipeImage(
  source: 'camera' | 'gallery'
): Promise<{ uri: string; base64?: string | null; mimeType?: string } | null> {
  if (source === 'camera') {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      throw new Error('Necesitas permitir el acceso a la cámara en los ajustes de tu iPhone.');
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
      allowsEditing: true,
    });
    if (res.canceled || !res.assets?.[0]) return null;
    return {
      uri: res.assets[0].uri,
      base64: res.assets[0].base64,
      mimeType: res.assets[0].mimeType || 'image/jpeg',
    };
  } else {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      throw new Error('Necesitas permitir el acceso a tu galería de fotos.');
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      base64: true,
      allowsEditing: true,
    });
    if (res.canceled || !res.assets?.[0]) return null;
    return {
      uri: res.assets[0].uri,
      base64: res.assets[0].base64,
      mimeType: res.assets[0].mimeType || 'image/jpeg',
    };
  }
}

/**
 * Escanea una imagen de una receta (libro, nota manuscrita, captura o plato)
 * usando Gemini 2.5 Flash Vision si hay API Key disponible, o genera un borrador
 * estructurado con la foto capturada listo para revisar y guardar.
 */
export async function analyzeRecipeFromImage(params: {
  uri: string;
  base64?: string | null;
  mimeType?: string;
  rawTextHint?: string;
}): Promise<ScannedRecipeDraft> {
  const apiKey = await getSavedGeminiApiKey();

  if (apiKey && params.base64) {
    try {
      const prompt = `Eres el asistente culinario de Robertito´s CookBook. Analiza esta imagen de una receta (o plato) y extrae toda la receta estructurada en español en formato JSON estricto con este esquema exacto:
{
  "title": "Nombre del plato",
  "subtitle": "Descripción técnica breve",
  "category": "Pescados y Mariscos" | "Carnes y Sous-Vide" | "Arroces y Cremas" | "Tapas y Croquetas" | "Molecular y Espumas" | "Postres y Dulces",
  "difficulty": "Fácil" | "Media" | "Alta Cocina",
  "prepTimeMinutes": 35,
  "baseServings": 2,
  "chefNote": "Clave técnica del plato",
  "pairing": "Maridaje recomendado",
  "ingredients": [
    { "name": "Nombre ingrediente", "amount": 200, "unit": "g", "notes": "Opcional" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Título corto del paso",
      "instruction": "Explicación detallada del paso",
      "timerSeconds": 300,
      "temperature": "180 °C",
      "tip": "Consejo opcional"
    }
  ]
}
Convierte cualquier tiempo mencionado en cada paso a segundos en "timerSeconds" (ej. 5 minutos = 300). Devuelve SOLO el objeto JSON sin bloques markdown.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: params.mimeType || 'image/jpeg',
                      data: params.base64,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const textOut =
          json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleaned = textOut.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        return {
          title: parsed.title || 'Receta Escaneada',
          subtitle: parsed.subtitle || 'Extraída por escáner óptico desde imagen',
          category: parsed.category || 'Carnes y Sous-Vide',
          difficulty: parsed.difficulty || 'Media',
          prepTimeMinutes: Number(parsed.prepTimeMinutes) || 30,
          baseServings: Number(parsed.baseServings) || 2,
          imageUrl: params.uri,
          chefNote: parsed.chefNote || 'Ajustar punto de cocción y temperatura.',
          pairing: parsed.pairing || '',
          ingredients: Array.isArray(parsed.ingredients)
            ? parsed.ingredients.map((ing: any, i: number) => ({
                id: `scan-ing-${Date.now()}-${i}`,
                name: String(ing.name || 'Ingrediente'),
                amount: Number(ing.amount) || 100,
                unit: String(ing.unit || 'g'),
                notes: ing.notes ? String(ing.notes) : undefined,
              }))
            : [],
          steps: Array.isArray(parsed.steps)
            ? parsed.steps.map((st: any, i: number) => ({
                stepNumber: i + 1,
                title: String(st.title || `Paso ${i + 1}`),
                instruction: String(st.instruction || ''),
                timerSeconds: Number(st.timerSeconds) || undefined,
                temperature: st.temperature ? String(st.temperature) : undefined,
                tip: st.tip ? String(st.tip) : undefined,
              }))
            : [],
          usedAiVision: true,
        };
      }
    } catch (err) {
      console.warn('[RecipeScanner] Fallback local parser:', err);
    }
  }

  // Si se pegó texto o aún no hay clave Gemini, parseamos texto e incluimos la foto escaneada
  if (params.rawTextHint && params.rawTextHint.trim().length > 0) {
    return parseRecipeFromRawText(params.rawTextHint, params.uri);
  }

  return {
    title: 'Nueva Receta Escaneada',
    subtitle: 'Fotografía capturada desde tu iPhone · Revisa los ingredientes y pasos',
    category: 'Pescados y Mariscos',
    difficulty: 'Media',
    prepTimeMinutes: 30,
    baseServings: 2,
    imageUrl: params.uri,
    chefNote: 'Receta digitalizada desde foto. Puedes activar Gemini Vision con tu API Key gratuita para lectura OCR automática.',
    pairing: '',
    ingredients: [
      { id: `ing-${Date.now()}-1`, name: 'Ingrediente principal', amount: 250, unit: 'g' },
      { id: `ing-${Date.now()}-2`, name: 'Aceite de oliva virgen extra', amount: 30, unit: 'ml' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparación y cocción controlada',
        instruction: 'Sigue los tiempos indicados en la fotografía capturada.',
        timerSeconds: 300,
      },
    ],
    usedAiVision: false,
  };
}

/**
 * Parser inteligente de texto libre (por ejemplo cuando iOS Live Text copia el texto de una foto)
 * que detecta automáticamente ingredientes (g, ml, cucharadas) y timers (min, h, °C).
 */
export function parseRecipeFromRawText(
  rawText: string,
  imageUri?: string
): ScannedRecipeDraft {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const title = lines[0] || 'Receta Importada';
  const ingredients: Ingredient[] = [];
  const steps: RecipeStep[] = [];

  const ingRegex = /^[-•*]?\s*(\d+(?:[.,]\d+)?)\s*(g|gr|kg|ml|l|cl|cda|cdta|ud|unidades|hojas|pizca)?\s+(?:de\s+)?(.+)$/i;
  const timeRegex = /(\d+)\s*(min|minutos|seg|segundos|h|horas)/i;
  const tempRegex = /(\d{2,3})\s*°?\s*C\b/i;

  lines.slice(1).forEach((line) => {
    const ingMatch = line.match(ingRegex);
    if (ingMatch && line.length < 75) {
      ingredients.push({
        id: `parsed-ing-${Date.now()}-${ingredients.length}`,
        amount: parseFloat(ingMatch[1].replace(',', '.')) || 1,
        unit: ingMatch[2] || 'ud',
        name: ingMatch[3].trim(),
      });
    } else if (line.length > 12) {
      const tMatch = line.match(timeRegex);
      const degMatch = line.match(tempRegex);
      let timerSeconds: number | undefined;
      if (tMatch) {
        const val = parseInt(tMatch[1], 10);
        const unit = tMatch[2].toLowerCase();
        if (unit.startsWith('h')) timerSeconds = val * 3600;
        else if (unit.startsWith('m')) timerSeconds = val * 60;
        else timerSeconds = val;
      }

      steps.push({
        stepNumber: steps.length + 1,
        title: `Paso ${steps.length + 1}`,
        instruction: line.replace(/^(\d+[.)]|[-•*])\s*/, ''),
        timerSeconds,
        temperature: degMatch ? `${degMatch[1]} °C` : undefined,
      });
    }
  });

  if (ingredients.length === 0) {
    ingredients.push({
      id: `parsed-ing-${Date.now()}-0`,
      name: 'Ingrediente principal',
      amount: 200,
      unit: 'g',
    });
  }

  if (steps.length === 0) {
    steps.push({
      stepNumber: 1,
      title: 'Elaboración',
      instruction: rawText.trim(),
      timerSeconds: 300,
    });
  }

  return {
    title,
    subtitle: 'Extraída automáticamente con detección de cantidades y timers',
    category: 'Carnes y Sous-Vide',
    difficulty: 'Media',
    prepTimeMinutes: 30,
    baseServings: 2,
    imageUrl:
      imageUri ||
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
    chefNote: 'Receta digitalizada con tiempos y temperaturas detectados automáticamente.',
    ingredients,
    steps,
    usedAiVision: true,
  };
}
