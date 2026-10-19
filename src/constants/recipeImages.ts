import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

/**
 * Catálogo de imágenes locales optimizadas en formato WebP para cada receta técnica.
 * El formato WebP reduce más del 35% el tamaño de transferencia manteniendo
 * máxima nitidez y fidelidad en el emplatado del autor en iOS, Android y Web.
 */
export const RECIPE_LOCAL_IMAGES: Record<string, any> = {
  'tataki-atun-5-0': require('@/assets/images/recipes/tataki-atun-5-0.webp'),
  'risotto-bogavante-esparragos-5-6': require('@/assets/images/recipes/risotto-bogavante-esparragos-5-6.webp'),
  'croquetas-liquidas-gourmet-5-9b': require('@/assets/images/recipes/croquetas-liquidas-gourmet-5-9b.webp'),
  'croquetas-clasicas-5-9a': require('@/assets/images/recipes/croquetas-clasicas-5-9a.webp'),
  'ajoblanco-anacardos-5-1': require('@/assets/images/recipes/ajoblanco-anacardos-5-1.webp'),
  'salsa-tapioca-caviar-5-2': require('@/assets/images/recipes/salsa-tapioca-caviar-5-2.webp'),
  'lemon-pie-temperado-5-3': require('@/assets/images/recipes/lemon-pie-temperado-5-3.webp'),
  'gofre-ricota-trufa-anchoa-5-4': require('@/assets/images/recipes/gofre-ricota-trufa-anchoa-5-4.webp'),
  'barbacoa-mexicana-pulled-pork-5-5': require('@/assets/images/recipes/barbacoa-mexicana-pulled-pork-5-5.webp'),
  'creme-brulee-roner-5-7': require('@/assets/images/recipes/creme-brulee-roner-5-7.webp'),
  'magret-pato-gastrique-5-8': require('@/assets/images/recipes/magret-pato-gastrique-5-8.webp'),
  'paletilla-cordero-sous-vide-3-1': require('@/assets/images/recipes/paletilla-cordero-sous-vide-3-1.webp'),
  'esfera-mozzarella-4-1': require('@/assets/images/recipes/esfera-mozzarella-4-1.webp'),
  'aire-tomate-espumas-sifon-4-2-6': require('@/assets/images/recipes/aire-tomate-espumas-sifon-4-2-6.webp'),
  'gyozas-foie-pato-naranja-kc3': require('@/assets/images/recipes/gyozas-foie-pato-naranja-kc3.webp'),
  'noquis-huancaina-langostinos-pastor-kc3': require('@/assets/images/recipes/noquis-huancaina-langostinos-pastor-kc3.webp'),
  'lasana-streetxo-kc3': require('@/assets/images/recipes/lasana-streetxo-kc3.webp'),
  'chocolate-coco-mango-curry-kc3': require('@/assets/images/recipes/chocolate-coco-mango-curry-kc3.webp'),
  'menestra-cigalas-azafran-kc4': require('@/assets/images/recipes/menestra-cigalas-azafran-kc4.webp'),
  'merluza-beurre-blanc-chirivia-hinojo-kc4': require('@/assets/images/recipes/merluza-beurre-blanc-chirivia-hinojo-kc4.webp'),
  'pichon-tres-cocciones-apionabo-kc4': require('@/assets/images/recipes/pichon-tres-cocciones-apionabo-kc4.webp'),
  'chocolate-70-dulce-leche-kc4': require('@/assets/images/recipes/chocolate-70-dulce-leche-kc4.webp'),
  'civet-corzo-chocolate-apunto': require('@/assets/images/recipes/civet-corzo-chocolate-apunto.webp'),
  'espuma-calabaza-yema-liquida-apunto': require('@/assets/images/recipes/espuma-calabaza-yema-liquida-apunto.webp'),
  'albondigas-jabali-hoisin-apunto': require('@/assets/images/recipes/albondigas-jabali-hoisin-apunto.webp'),
  'rable-conejo-datiles-garam-masala-apunto': require('@/assets/images/recipes/rable-conejo-datiles-garam-masala-apunto.webp'),
  'ravioli-san-domenico-kc2': require('@/assets/images/recipes/ravioli-san-domenico-kc2.webp'),
  'solomillo-wellington-bordalesa-kc2': require('@/assets/images/recipes/solomillo-wellington-bordalesa-kc2.webp'),
  'bacalao-a-bras-kc2': require('@/assets/images/recipes/bacalao-a-bras-kc2.webp'),
  'lemon-pie-copa-merengue-suizo-kc2': require('@/assets/images/recipes/lemon-pie-copa-merengue-suizo-kc2.webp'),
  'ensalada-caprese-texturas-kc1': require('@/assets/images/recipes/ensalada-caprese-texturas-kc1.webp'),
  'croqueta-liquida-mejillones-tigre-kc1': require('@/assets/images/recipes/croqueta-liquida-mejillones-tigre-kc1.webp'),
  'suquet-salmonete-aire-lima-kc1': require('@/assets/images/recipes/suquet-salmonete-aire-lima-kc1.webp'),
  'gelee-mandarina-cremoso-choco-blanco-kc1': require('@/assets/images/recipes/gelee-mandarina-cremoso-choco-blanco-kc1.webp'),
  'sopa-chufas-coco-torrijas-caramelizadas': require('@/assets/images/recipes/sopa-chufas-coco-torrijas-caramelizadas.webp'),
  'calabaza-burrata-chalotas-glaseadas-kcnav': require('@/assets/images/recipes/calabaza-burrata-chalotas-glaseadas-kcnav.webp'),
  'parmentier-patatas-emmental-kcnav': require('@/assets/images/recipes/parmentier-patatas-emmental-kcnav.webp'),
  'judias-keniatas-ajo-guindilla-kcnav': require('@/assets/images/recipes/judias-keniatas-ajo-guindilla-kcnav.webp'),
  'lubina-a-la-sal-kcnav': require('@/assets/images/recipes/lubina-a-la-sal-kcnav.webp'),
  'roast-beef-salsa-gravy-kcnav': require('@/assets/images/recipes/roast-beef-salsa-gravy-kcnav.webp'),
  'copa-cheesecake-frutos-rojos-kcnav': require('@/assets/images/recipes/copa-cheesecake-frutos-rojos-kcnav.webp'),
  'curry-rojo-thai-langostinos-pina-esp': require('@/assets/images/recipes/curry-rojo-thai-langostinos-pina-esp.webp'),
  'arroz-pimienta-timut-jengibre-esp': require('@/assets/images/recipes/arroz-pimienta-timut-jengibre-esp.webp'),
  'brochetas-pollo-jerk-mango-verde-esp': require('@/assets/images/recipes/brochetas-pollo-jerk-mango-verde-esp.webp'),
  'pan-alcaravea-remolacha-queso-cabra-esp': require('@/assets/images/recipes/pan-alcaravea-remolacha-queso-cabra-esp.webp'),
  'huevos-benedictine-holandesa-crujiente-panceta-aves': require('@/assets/images/recipes/huevos-benedictine-holandesa-crujiente-panceta-aves.webp'),
  'pollo-en-pepitoria-aves': require('@/assets/images/recipes/pollo-en-pepitoria-aves.webp'),
  'canelones-pavo-bechamel-tomate-aves': require('@/assets/images/recipes/canelones-pavo-bechamel-tomate-aves.webp'),
  'codorniz-en-escabeche-aves': require('@/assets/images/recipes/codorniz-en-escabeche-aves.webp'),
};

/** Imagen por defecto en caso de no existir o ser una receta creada manualmente sin foto */
export const DEFAULT_RECIPE_IMAGE = RECIPE_LOCAL_IMAGES['tataki-atun-5-0'];

/**
 * Obtiene la fuente de imagen para componentes <Image source={...} /> de React Native y expo-image.
 * Prioriza la versión local WebP optimizada si coincide con el ID de la receta.
 */
export function getRecipeImageSource(recipe?: { id?: string; imageUrl?: string | null }): any {
  if (!recipe) return DEFAULT_RECIPE_IMAGE;

  if (recipe.id && RECIPE_LOCAL_IMAGES[recipe.id]) {
    return RECIPE_LOCAL_IMAGES[recipe.id];
  }

  if (recipe.imageUrl && typeof recipe.imageUrl === 'string' && recipe.imageUrl.trim().length > 0) {
    return { uri: recipe.imageUrl };
  }

  return DEFAULT_RECIPE_IMAGE;
}

/**
 * Convierte la imagen del plato a un Data URI en base64 ('data:image/webp;base64,...' o 'data:image/jpeg;base64,...').
 * Imprescindible para expo-print en iOS / Android / Web, garantizando que el PDF
 * contenga siempre la fotografía del plato sin depender de conexión de red ni de
 * permisos de acceso a ficheros locales en el WebView de impresión.
 */
export async function getRecipeImageBase64(recipe?: { id?: string; imageUrl?: string | null }): Promise<string> {
  if (!recipe) return '';

  try {
    // Caso Entorno Web: expo-file-system no tiene backend en browser, se usa fetch + FileReader
    if (Platform.OS === 'web') {
      const localModule = recipe.id ? RECIPE_LOCAL_IMAGES[recipe.id] : null;
      let targetUri = '';
      if (localModule) {
        if (typeof localModule === 'string') {
          targetUri = localModule;
        } else if (typeof localModule === 'object' && localModule !== null) {
          if (typeof localModule.default === 'string') {
            targetUri = localModule.default;
          } else if (typeof localModule.uri === 'string') {
            targetUri = localModule.uri;
          } else if (typeof localModule.src === 'string') {
            targetUri = localModule.src;
          } else if (typeof localModule.default?.src === 'string') {
            targetUri = localModule.default.src;
          } else {
            try {
              const asset = Asset.fromModule(localModule);
              targetUri = asset.uri || asset.localUri || '';
            } catch {
              targetUri = '';
            }
          }
        } else {
          try {
            const asset = Asset.fromModule(localModule);
            targetUri = asset.uri || asset.localUri || '';
          } catch {
            targetUri = '';
          }
        }
      }
      if (!targetUri && recipe.imageUrl) {
        targetUri = recipe.imageUrl;
      }

      if (targetUri) {
        if (targetUri.startsWith('data:image')) {
          return targetUri;
        }
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 1200);
          const resp = await fetch(targetUri, { signal: controller.signal });
          clearTimeout(timer);
          if (resp.ok) {
            const blob = await resp.blob();
            return await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve((reader.result as string) || targetUri);
              reader.onerror = () => resolve(targetUri);
              reader.readAsDataURL(blob);
            });
          }
          return targetUri;
        } catch {
          return targetUri;
        }
      }
      return '';
    }

    // 1. Si existe imagen local fija por ID (WebP optimizada) en iOS/Android nativo
    const localModule = recipe.id ? RECIPE_LOCAL_IMAGES[recipe.id] : null;
    if (localModule) {
      try {
        const asset = Asset.fromModule(localModule);
        if (!asset.downloaded && !asset.localUri) {
          const downloadPromise = asset.downloadAsync();
          const timeoutPromise = new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error('Asset download timeout')), 3500)
          );
          await Promise.race([downloadPromise, timeoutPromise]);
        }
        const uri = asset.localUri || asset.uri;
        if (uri) {
          const fileUri = uri.startsWith('file://') ? uri : uri.startsWith('/') ? `file://${uri}` : null;
          if (fileUri) {
            const base64 = await FileSystem.readAsStringAsync(fileUri, {
              encoding: 'base64',
            });
            return `data:image/webp;base64,${base64}`;
          } else if (uri.startsWith('http://') || uri.startsWith('https://')) {
            const tempLocal = `${FileSystem.cacheDirectory}asset_${recipe.id || Date.now()}.webp`;
            const dl = await FileSystem.downloadAsync(uri, tempLocal);
            if (dl?.uri) {
              const base64 = await FileSystem.readAsStringAsync(dl.uri, {
                encoding: 'base64',
              });
              return `data:image/webp;base64,${base64}`;
            }
          }
        }
      } catch (assetErr) {
        console.warn('[RecipeImages] Fallo o timeout al leer asset local para PDF:', assetErr);
      }
    }

    // 2. Si es una URL o file:// en recipe.imageUrl
    if (recipe.imageUrl && typeof recipe.imageUrl === 'string') {
      const imgUrl = recipe.imageUrl.trim();
      if (imgUrl.startsWith('data:image')) {
        return imgUrl;
      }

      if (imgUrl.startsWith('file://') || imgUrl.startsWith('/')) {
        try {
          const fileUri = imgUrl.startsWith('file://') ? imgUrl : `file://${imgUrl}`;
          const base64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: 'base64',
          });
          const isWebp = imgUrl.toLowerCase().endsWith('.webp');
          const mime = isWebp ? 'image/webp' : 'image/jpeg';
          return `data:${mime};base64,${base64}`;
        } catch (fileErr) {
          console.warn('[RecipeImages] Fallo al leer file:// para PDF:', fileErr);
        }
      }

      if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
        try {
          const isWebp = imgUrl.toLowerCase().includes('.webp');
          const ext = isWebp ? 'webp' : 'jpg';
          const filename = `temp_recipe_${recipe.id || Date.now()}.${ext}`;
          const localPath = `${FileSystem.cacheDirectory}${filename}`;
          const dlPromise = FileSystem.downloadAsync(imgUrl, localPath);
          const dlTimeout = new Promise<any>((_, reject) =>
            setTimeout(() => reject(new Error('Image download timeout')), 3500)
          );
          const downloadRes = await Promise.race([dlPromise, dlTimeout]);
          if (downloadRes?.uri) {
            const base64 = await FileSystem.readAsStringAsync(downloadRes.uri, {
              encoding: 'base64',
            });
            const mime = isWebp ? 'image/webp' : 'image/jpeg';
            return `data:${mime};base64,${base64}`;
          }
        } catch (netErr) {
          console.warn('[RecipeImages] Fallo o timeout al descargar imagen remota para PDF:', netErr);
        }
      }
    }
  } catch (error) {
    console.warn('No se pudo convertir la imagen a base64 para el PDF:', error);
  }

  return recipe?.imageUrl || '';
}
