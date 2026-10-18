import { create } from 'zustand';
import {
  Recipe,
  CookingTip,
  KitchenUtensil,
  FoodiePlace,
} from '@/types/cookbook';
import {
  INITIAL_RECIPES,
  INITIAL_TIPS,
  INITIAL_UTENSILS,
  INITIAL_PLACES,
} from '@/data/seedData';
import { CookBookRepository } from '@/data/cookbookRepository';

interface CookBookState {
  recipes: Recipe[];
  tips: CookingTip[];
  utensils: KitchenUtensil[];
  places: FoodiePlace[];
  syncStatus: 'local' | 'connected' | 'syncing' | 'error';
  hydrated: boolean;

  initialize: () => Promise<void>;
  toggleFavoriteRecipe: (recipeId: string) => Promise<void>;
  addRecipe: (recipe: Recipe) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  addTip: (tip: CookingTip) => Promise<void>;
  addUtensil: (utensil: KitchenUtensil) => Promise<void>;
  toggleUtensilAcquired: (utensilId: string) => Promise<void>;
  deleteUtensil: (utensilId: string) => Promise<void>;
  addPlace: (place: FoodiePlace) => Promise<void>;
  deletePlace: (placeId: string) => Promise<void>;
  syncWithFirebase: () => Promise<{ ok: boolean; message: string }>;
  resetToFactory: () => Promise<void>;
}

export const useCookBookStore = create<CookBookState>((set, get) => ({
  recipes: INITIAL_RECIPES,
  tips: INITIAL_TIPS,
  utensils: INITIAL_UTENSILS,
  places: INITIAL_PLACES,
  syncStatus: 'local',
  hydrated: false,

  initialize: async () => {
    if (get().hydrated) return;
    const snapshot = await CookBookRepository.loadLocalSnapshot();
    set({
      recipes: snapshot.recipes,
      tips: snapshot.tips,
      utensils: snapshot.utensils,
      places: snapshot.places,
      hydrated: true,
    });

    CookBookRepository.subscribeToFirestore({
      onRecipes: (recipes) => set({ recipes }),
      onTips: (tips) => set({ tips }),
      onUtensils: (utensils) => set({ utensils }),
      onPlaces: (places) => set({ places }),
      onSyncStatusChange: (syncStatus) => set({ syncStatus }),
    });
  },

  toggleFavoriteRecipe: async (recipeId) => {
    const updated = get().recipes.map((r) =>
      r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
    );
    set({ recipes: updated });
    const target = updated.find((r) => r.id === recipeId);
    if (target) {
      await CookBookRepository.upsertRecipe(target, updated);
    }
  },

  addRecipe: async (recipe) => {
    const updated = [recipe, ...get().recipes];
    set({ recipes: updated });
    await CookBookRepository.upsertRecipe(recipe, updated);
  },

  updateRecipe: async (recipe) => {
    const updated = get().recipes.map((r) => (r.id === recipe.id ? recipe : r));
    set({ recipes: updated });
    await CookBookRepository.upsertRecipe(recipe, updated);
  },

  deleteRecipe: async (recipeId) => {
    const updated = get().recipes.filter((r) => r.id !== recipeId);
    set({ recipes: updated });
    await CookBookRepository.removeRecipe(recipeId, updated);
  },

  addTip: async (tip) => {
    const updated = [tip, ...get().tips];
    set({ tips: updated });
    await CookBookRepository.upsertTip(tip, updated);
  },

  addUtensil: async (utensil) => {
    const updated = [utensil, ...get().utensils];
    set({ utensils: updated });
    await CookBookRepository.upsertUtensil(utensil, updated);
  },

  toggleUtensilAcquired: async (utensilId) => {
    const updated = get().utensils.map((u) =>
      u.id === utensilId ? { ...u, acquired: !u.acquired } : u
    );
    set({ utensils: updated });
    const target = updated.find((u) => u.id === utensilId);
    if (target) {
      await CookBookRepository.upsertUtensil(target, updated);
    }
  },

  deleteUtensil: async (utensilId) => {
    const updated = get().utensils.filter((u) => u.id !== utensilId);
    set({ utensils: updated });
    await CookBookRepository.removeUtensil(utensilId, updated);
  },

  addPlace: async (place) => {
    const updated = [place, ...get().places];
    set({ places: updated });
    await CookBookRepository.upsertPlace(place, updated);
  },

  deletePlace: async (placeId) => {
    const updated = get().places.filter((p) => p.id !== placeId);
    set({ places: updated });
    await CookBookRepository.removePlace(placeId, updated);
  },

  syncWithFirebase: async () => {
    const { recipes, tips, utensils, places } = get();
    return CookBookRepository.pushAllToFirestore({
      recipes,
      tips,
      utensils,
      places,
    });
  },

  resetToFactory: async () => {
    const data = await CookBookRepository.resetToManualDefaults();
    set({
      recipes: data.recipes,
      tips: data.tips,
      utensils: data.utensils,
      places: data.places,
    });
  },
}));
