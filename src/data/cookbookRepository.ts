import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/core/firebase';
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
} from './seedData';

const STORAGE_KEYS = {
  RECIPES: '@robertito_cookbook_recipes_v1',
  TIPS: '@robertito_cookbook_tips_v1',
  UTENSILS: '@robertito_cookbook_utensils_v1',
  PLACES: '@robertito_cookbook_places_v1',
};

export const CookBookRepository = {
  async loadLocalSnapshot(): Promise<{
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
  }> {
    try {
      const [rRaw, tRaw, uRaw, pRaw] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.RECIPES),
        AsyncStorage.getItem(STORAGE_KEYS.TIPS),
        AsyncStorage.getItem(STORAGE_KEYS.UTENSILS),
        AsyncStorage.getItem(STORAGE_KEYS.PLACES),
      ]);

      const recipes: Recipe[] = rRaw ? JSON.parse(rRaw) : INITIAL_RECIPES;
      const tips: CookingTip[] = tRaw ? JSON.parse(tRaw) : INITIAL_TIPS;
      const utensils: KitchenUtensil[] = uRaw ? JSON.parse(uRaw) : INITIAL_UTENSILS;
      const places: FoodiePlace[] = pRaw ? JSON.parse(pRaw) : INITIAL_PLACES;

      if (!rRaw) await AsyncStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
      if (!tRaw) await AsyncStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
      if (!uRaw) await AsyncStorage.setItem(STORAGE_KEYS.UTENSILS, JSON.stringify(utensils));
      if (!pRaw) await AsyncStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));

      return { recipes, tips, utensils, places };
    } catch {
      return {
        recipes: INITIAL_RECIPES,
        tips: INITIAL_TIPS,
        utensils: INITIAL_UTENSILS,
        places: INITIAL_PLACES,
      };
    }
  },

  async saveLocalCollection<T>(key: string, items: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.warn('[CookBookRepository] Error saving local collection:', err);
    }
  },

  subscribeToFirestore(callbacks: {
    onRecipes: (recipes: Recipe[]) => void;
    onTips: (tips: CookingTip[]) => void;
    onUtensils: (utensils: KitchenUtensil[]) => void;
    onPlaces: (places: FoodiePlace[]) => void;
    onSyncStatusChange: (status: 'local' | 'connected' | 'syncing' | 'error') => void;
  }): Unsubscribe | null {
    const db = getFirebaseDb();
    if (!db) {
      callbacks.onSyncStatusChange('local');
      return null;
    }

    callbacks.onSyncStatusChange('syncing');

    const unsubRecipes = onSnapshot(
      collection(db, 'recipes'),
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => d.data() as Recipe);
          callbacks.onRecipes(items);
          CookBookRepository.saveLocalCollection(STORAGE_KEYS.RECIPES, items);
        }
        callbacks.onSyncStatusChange('connected');
      },
      () => callbacks.onSyncStatusChange('error')
    );

    const unsubTips = onSnapshot(collection(db, 'tips'), (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => d.data() as CookingTip);
        callbacks.onTips(items);
        CookBookRepository.saveLocalCollection(STORAGE_KEYS.TIPS, items);
      }
    });

    const unsubUtensils = onSnapshot(collection(db, 'utensils'), (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => d.data() as KitchenUtensil);
        callbacks.onUtensils(items);
        CookBookRepository.saveLocalCollection(STORAGE_KEYS.UTENSILS, items);
      }
    });

    const unsubPlaces = onSnapshot(collection(db, 'places'), (snap) => {
      if (!snap.empty) {
        const items = snap.docs.map((d) => d.data() as FoodiePlace);
        callbacks.onPlaces(items);
        CookBookRepository.saveLocalCollection(STORAGE_KEYS.PLACES, items);
      }
    });

    return () => {
      unsubRecipes();
      unsubTips();
      unsubUtensils();
      unsubPlaces();
    };
  },

  async pushAllToFirestore(data: {
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
  }): Promise<{ ok: boolean; message: string }> {
    const db = getFirebaseDb();
    if (!db) {
      return {
        ok: false,
        message:
          'Añade tus claves EXPO_PUBLIC_FIREBASE_* en el archivo .env para sincronizar con la nube de Firebase Firestore.',
      };
    }

    try {
      const batch = writeBatch(db);
      data.recipes.forEach((r) => batch.set(doc(db, 'recipes', r.id), r));
      data.tips.forEach((t) => batch.set(doc(db, 'tips', t.id), t));
      data.utensils.forEach((u) => batch.set(doc(db, 'utensils', u.id), u));
      data.places.forEach((p) => batch.set(doc(db, 'places', p.id), p));
      await batch.commit();
      return {
        ok: true,
        message: `¡Sincronizado! ${data.recipes.length} recetas, ${data.tips.length} técnicas, ${data.utensils.length} utensilios y ${data.places.length} sitios subidos a Firebase Firestore.`,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `Error al sincronizar con Firestore: ${err?.message || 'Desconocido'}`,
      };
    }
  },

  async upsertRecipe(recipe: Recipe, allRecipes: Recipe[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.RECIPES, allRecipes);
    const db = getFirebaseDb();
    if (db) {
      await setDoc(doc(db, 'recipes', recipe.id), recipe).catch(() => {});
    }
  },

  async removeRecipe(id: string, allRecipes: Recipe[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.RECIPES, allRecipes);
    const db = getFirebaseDb();
    if (db) {
      await deleteDoc(doc(db, 'recipes', id)).catch(() => {});
    }
  },

  async upsertTip(tip: CookingTip, allTips: CookingTip[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.TIPS, allTips);
    const db = getFirebaseDb();
    if (db) {
      await setDoc(doc(db, 'tips', tip.id), tip).catch(() => {});
    }
  },

  async upsertUtensil(utensil: KitchenUtensil, allUtensils: KitchenUtensil[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.UTENSILS, allUtensils);
    const db = getFirebaseDb();
    if (db) {
      await setDoc(doc(db, 'utensils', utensil.id), utensil).catch(() => {});
    }
  },

  async removeUtensil(id: string, allUtensils: KitchenUtensil[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.UTENSILS, allUtensils);
    const db = getFirebaseDb();
    if (db) {
      await deleteDoc(doc(db, 'utensils', id)).catch(() => {});
    }
  },

  async upsertPlace(place: FoodiePlace, allPlaces: FoodiePlace[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.PLACES, allPlaces);
    const db = getFirebaseDb();
    if (db) {
      await setDoc(doc(db, 'places', place.id), place).catch(() => {});
    }
  },

  async resetToManualDefaults(): Promise<{
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
  }> {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(INITIAL_RECIPES)),
      AsyncStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(INITIAL_TIPS)),
      AsyncStorage.setItem(STORAGE_KEYS.UTENSILS, JSON.stringify(INITIAL_UTENSILS)),
      AsyncStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(INITIAL_PLACES)),
    ]);
    return {
      recipes: INITIAL_RECIPES,
      tips: INITIAL_TIPS,
      utensils: INITIAL_UTENSILS,
      places: INITIAL_PLACES,
    };
  },
};
