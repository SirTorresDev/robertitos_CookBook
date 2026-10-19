export type RecipeCategory =
  | 'Todos'
  | 'Pescados y Mariscos'
  | 'Carnes y Sous-Vide'
  | 'Arroces y Cremas'
  | 'Tapas y Croquetas'
  | 'Molecular y Espumas'
  | 'Postres y Dulces';

export type RecipeDifficulty = 'Fácil' | 'Media' | 'Alta Cocina';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerSeconds?: number;
  temperature?: string;
  tip?: string;
}

export interface Recipe {
  id: string;
  code?: string; // e.g., "5.0", "5.6" from Manual Técnico
  title: string;
  subtitle: string;
  category: Exclude<RecipeCategory, 'Todos'>;
  difficulty: RecipeDifficulty;
  prepTimeMinutes: number;
  baseServings: number;
  imageUrl: string;
  chefNote: string;
  pairing?: string; // Maridaje from manual
  ingredients: Ingredient[];
  steps: RecipeStep[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TipCategory =
  | 'Todos'
  | 'Física Culinaria'
  | 'Técnicas Clásicas'
  | 'Sous-Vide / Roner'
  | 'Cocina Molecular'
  | 'Seguridad e Higiene';

export interface CookingTip {
  id: string;
  code: string; // e.g. "1.1", "1.2", "4.1"
  title: string;
  category: Exclude<TipCategory, 'Todos'>;
  summary: string;
  keyRules: string[];
  proSecret: string;
  warning?: string;
  temperatureBadge?: string;
  readTimeMinutes: number;
  createdAt: string;
}

export type UtensilCategory =
  | 'Todos'
  | 'Precisión y Sous-Vide'
  | 'Molecular y Sifones'
  | 'Sartenes y Cocción'
  | 'Cuchillería y Corte'
  | 'Repostería y Acabado';

export type UtensilPriority = 'Necesito' | 'Capricho Chef' | 'Básico';

export interface KitchenUtensil {
  id: string;
  name: string;
  category: Exclude<UtensilCategory, 'Todos'>;
  priority: UtensilPriority;
  usedFor: string; // What recipe/technique in the manual uses it
  estimatedPrice?: string;
  acquired: boolean;
  createdAt: string;
}

export type PlaceCategory =
  | 'Todos'
  | 'Restaurante'
  | 'Mercado'
  | 'Tienda Gourmet / Molecular'
  | 'Pescadería / Producto'
  | 'Pastelería / Café';

export interface FoodiePlace {
  id: string;
  name: string;
  category: Exclude<PlaceCategory, 'Todos'>;
  city: string;
  neighborhood?: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  priceLevel: '€' | '€€' | '€€€' | '€€€€';
  mustOrder: string;
  review: string;
  imageUrl: string;
  createdAt: string;
}
