import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  doc,
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
  GourmetProduct,
} from '@/types/cookbook';
import {
  INITIAL_RECIPES,
  INITIAL_TIPS,
  INITIAL_UTENSILS,
  INITIAL_PLACES,
  INITIAL_PRODUCTS,
} from './seedData';

const STORAGE_KEYS = {
  RECIPES: '@robertito_cookbook_recipes_v2',
  TIPS: '@robertito_cookbook_tips_v1',
  UTENSILS: '@robertito_cookbook_utensils_v1',
  PLACES: '@robertito_cookbook_places_v1',
  PRODUCTS: '@robertito_cookbook_products_v1',
};

export function normalizeRecipeTitleKey(title: string): string {
  return (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Deduplica una lista de recetas asegurando que no existan dos platos
 * con el mismo ID o el mismo título normalizado.
 * Si detecta duplicados, conserva la versión más reciente o con fecha updatedAt.
 */
export function deduplicateRecipesList(list: Recipe[]): Recipe[] {
  const byTitle = new Map<string, Recipe>();
  const byId = new Map<string, Recipe>();

  for (const r of list) {
    if (!r || !r.title) continue;
    const titleKey = normalizeRecipeTitleKey(r.title);

    const existingByTitle = byTitle.get(titleKey);
    const existingById = byId.get(r.id);
    const existing = existingByTitle || existingById;

    if (existing) {
      const existingTime = existing.updatedAt || existing.createdAt || '';
      const rTime = r.updatedAt || r.createdAt || '';
      if (
        Boolean(r.updatedAt && !existing.updatedAt) ||
        rTime > existingTime ||
        (r.ingredients?.length || 0) > (existing.ingredients?.length || 0)
      ) {
        byTitle.delete(normalizeRecipeTitleKey(existing.title));
        byId.delete(existing.id);

        byTitle.set(titleKey, r);
        byId.set(r.id, r);
      }
    } else {
      byTitle.set(titleKey, r);
      byId.set(r.id, r);
    }
  }

  return Array.from(byId.values());
}

export const CookBookRepository = {
  async loadLocalSnapshot(): Promise<{
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
    products: GourmetProduct[];
  }> {
    try {
      const [rRawV2, rRawV1, tRaw, uRaw, pRaw, prodRaw] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.RECIPES),
        AsyncStorage.getItem('@robertito_cookbook_recipes_v1'),
        AsyncStorage.getItem(STORAGE_KEYS.TIPS),
        AsyncStorage.getItem(STORAGE_KEYS.UTENSILS),
        AsyncStorage.getItem(STORAGE_KEYS.PLACES),
        AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS),
      ]);

      let recipes: Recipe[] = INITIAL_RECIPES;

      if (rRawV2) {
        const storedList: Recipe[] = JSON.parse(rRawV2);
        const storedMap = new Map(storedList.map((r) => [r.id, r]));
        const mergedInitial = INITIAL_RECIPES.map((initR) => {
          const stored = storedMap.get(initR.id);
          if (stored) {
            if (stored.updatedAt) {
              return {
                ...initR,
                ...stored,
              };
            }
            return {
              ...initR,
              isFavorite: stored.isFavorite ?? initR.isFavorite,
            };
          }
          return initR;
        });
        const initialIds = new Set(INITIAL_RECIPES.map((r) => r.id));
        const userCustomRecipes = storedList.filter((r) => !initialIds.has(r.id));
        recipes = deduplicateRecipesList([...mergedInitial, ...userCustomRecipes]);
      } else if (rRawV1) {
        const oldList: Recipe[] = JSON.parse(rRawV1);
        const oldMap = new Map(oldList.map((r) => [r.id, r]));
        const mergedInitial = INITIAL_RECIPES.map((initR) => {
          const old = oldMap.get(initR.id);
          if (old) {
            if (old.updatedAt) {
              return {
                ...initR,
                ...old,
              };
            }
            return {
              ...initR,
              isFavorite: old.isFavorite ?? initR.isFavorite,
            };
          }
          return initR;
        });
        const initialIds = new Set(INITIAL_RECIPES.map((r) => r.id));
        const userCustomRecipes = oldList.filter((r) => !initialIds.has(r.id));
        recipes = deduplicateRecipesList([...mergedInitial, ...userCustomRecipes]);
      }

      let tips: CookingTip[] = INITIAL_TIPS;
      if (tRaw) {
        const storedTips: CookingTip[] = JSON.parse(tRaw);
        const storedMap = new Map(storedTips.map((t) => [t.id, t]));
        const mergedInitial = INITIAL_TIPS.map((initT) => storedMap.get(initT.id) || initT);
        const initialIds = new Set(INITIAL_TIPS.map((t) => t.id));
        const userCustomTips = storedTips.filter((t) => !initialIds.has(t.id));
        tips = [...mergedInitial, ...userCustomTips];
      }
      const utensils: KitchenUtensil[] = uRaw ? JSON.parse(uRaw) : INITIAL_UTENSILS;
      const places: FoodiePlace[] = pRaw ? JSON.parse(pRaw) : INITIAL_PLACES;
      const products: GourmetProduct[] = prodRaw ? JSON.parse(prodRaw) : INITIAL_PRODUCTS;

      await AsyncStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
      await AsyncStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
      if (!uRaw) await AsyncStorage.setItem(STORAGE_KEYS.UTENSILS, JSON.stringify(utensils));
      if (!pRaw) await AsyncStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
      if (!prodRaw) await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

      return { recipes, tips, utensils, places, products };
    } catch {
      return {
        recipes: INITIAL_RECIPES,
        tips: INITIAL_TIPS,
        utensils: INITIAL_UTENSILS,
        places: INITIAL_PLACES,
        products: INITIAL_PRODUCTS,
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
    onProducts: (products: GourmetProduct[]) => void;
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
          const remoteList = snap.docs.map((d) => d.data() as Recipe);
          const remoteMap = new Map(remoteList.map((r) => [r.id, r]));

          const mergedInitial = INITIAL_RECIPES.map((initR) => {
            const remote = remoteMap.get(initR.id);
            if (remote) {
              if (remote.updatedAt) {
                return {
                  ...initR,
                  ...remote,
                };
              }
              return {
                ...initR,
                isFavorite: remote.isFavorite ?? initR.isFavorite,
              };
            }
            return initR;
          });

          const initialIds = new Set(INITIAL_RECIPES.map((r) => r.id));
          const userCustomRecipes = remoteList.filter((r) => !initialIds.has(r.id));
          const finalRecipes = deduplicateRecipesList([...mergedInitial, ...userCustomRecipes]);

          callbacks.onRecipes(finalRecipes);
          CookBookRepository.saveLocalCollection(STORAGE_KEYS.RECIPES, finalRecipes);
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
      const items = snap.docs.map((d) => d.data() as KitchenUtensil);
      callbacks.onUtensils(items);
      CookBookRepository.saveLocalCollection(STORAGE_KEYS.UTENSILS, items);
    });

    const unsubPlaces = onSnapshot(collection(db, 'places'), (snap) => {
      const items = snap.docs.map((d) => d.data() as FoodiePlace);
      callbacks.onPlaces(items);
      CookBookRepository.saveLocalCollection(STORAGE_KEYS.PLACES, items);
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
      const items = snap.docs.map((d) => d.data() as GourmetProduct);
      callbacks.onProducts(items);
      CookBookRepository.saveLocalCollection(STORAGE_KEYS.PRODUCTS, items);
    });

    return () => {
      unsubRecipes();
      unsubTips();
      unsubUtensils();
      unsubPlaces();
      unsubProducts();
    };
  },

  async pushAllToFirestore(data: {
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
    products?: GourmetProduct[];
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
      if (data.products) {
        data.products.forEach((pr) => {
          const cleanProduct: Record<string, any> = {};
          for (const [k, v] of Object.entries(pr)) {
            if (v !== undefined) {
              cleanProduct[k] = v;
            }
          }
          batch.set(doc(db, 'products', pr.id), cleanProduct);
        });
      }
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

  async removePlace(id: string, allPlaces: FoodiePlace[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.PLACES, allPlaces);
    const db = getFirebaseDb();
    if (db) {
      await deleteDoc(doc(db, 'places', id)).catch(() => {});
    }
  },

  async upsertProduct(product: GourmetProduct, allProducts: GourmetProduct[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.PRODUCTS, allProducts);
    const db = getFirebaseDb();
    if (db) {
      try {
        const cleanProduct: Record<string, any> = {};
        for (const [k, v] of Object.entries(product)) {
          if (v !== undefined) {
            cleanProduct[k] = v;
          }
        }
        await setDoc(doc(db, 'products', product.id), cleanProduct);
      } catch (e) {
        console.warn('[CookBookRepository] Error setDoc product:', e);
      }
    }
  },

  async removeProduct(id: string, allProducts: GourmetProduct[]): Promise<void> {
    await CookBookRepository.saveLocalCollection(STORAGE_KEYS.PRODUCTS, allProducts);
    const db = getFirebaseDb();
    if (db) {
      await deleteDoc(doc(db, 'products', id)).catch(() => {});
    }
  },

  async resetToManualDefaults(): Promise<{
    recipes: Recipe[];
    tips: CookingTip[];
    utensils: KitchenUtensil[];
    places: FoodiePlace[];
    products: GourmetProduct[];
  }> {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(INITIAL_RECIPES)),
      AsyncStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(INITIAL_TIPS)),
      AsyncStorage.setItem(STORAGE_KEYS.UTENSILS, JSON.stringify(INITIAL_UTENSILS)),
      AsyncStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(INITIAL_PLACES)),
      AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS)),
    ]);
    return {
      recipes: INITIAL_RECIPES,
      tips: INITIAL_TIPS,
      utensils: INITIAL_UTENSILS,
      places: INITIAL_PLACES,
      products: INITIAL_PRODUCTS,
    };
  },
};
