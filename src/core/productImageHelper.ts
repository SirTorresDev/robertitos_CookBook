import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { ProductCategory } from '@/types/cookbook';

export const DEFAULT_PRODUCT_IMAGES: Record<Exclude<ProductCategory, 'Todos'>, string> = {
  'Aceites y Vinagres':
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80',
  'Especias y Condimentos':
    'https://images.unsplash.com/photo-1518110903495-cd99c129f10f?auto=format&fit=crop&w=1000&q=80',
  'Salsas y Pastas':
    'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1000&q=80',
  'Conservas y Mar':
    'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1000&q=80',
  'Lácteos y Quesos':
    'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1000&q=80',
  'Ingredientes Moleculares':
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
  'Vinos y Licores':
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
  'Otros':
    'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=1000&q=80',
};

/**
 * Redimensiona y comprime una imagen a un JPEG base64 ligero (~40-60 KB)
 * para que pueda almacenarse directamente en Firestore sin sobrepasar el límite de 1MB por documento.
 */
export async function compressImageToDataUri(
  rawUri: string,
  maxDimension = 720,
  quality = 0.72
): Promise<string> {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    if (rawUri.startsWith('data:')) return rawUri;
    return rawUri;
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      if (!rawUri.startsWith('data:') && !rawUri.startsWith('blob:')) {
        img.crossOrigin = 'anonymous';
      }
      const timeout = setTimeout(() => {
        resolve(rawUri);
      }, 3500);

      img.onload = () => {
        clearTimeout(timeout);
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawUri);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUri = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUri);
        } catch {
          resolve(rawUri);
        }
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(rawUri);
      };
      img.src = rawUri;
    } catch {
      resolve(rawUri);
    }
  });
}

/**
 * Abre la cámara o la galería para capturar la imagen de un producto gourmet
 * y devuelve un Data URI / URI optimizado.
 */
export async function captureProductImage(
  source: 'camera' | 'gallery'
): Promise<string | null> {
  try {
    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        throw new Error('Permiso de cámara denegado. Permite el acceso a la cámara en los ajustes de tu iPhone.');
      }
      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.75,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (res.canceled || !res.assets?.[0]) return null;

      const asset = res.assets[0];
      if (asset.base64) {
        const mime = asset.mimeType || 'image/jpeg';
        return compressImageToDataUri(`data:${mime};base64,${asset.base64}`);
      }
      return compressImageToDataUri(asset.uri);
    } else {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        throw new Error('Permiso de galería denegado. Permite el acceso a tus fotos en los ajustes.');
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.75,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (res.canceled || !res.assets?.[0]) return null;

      const asset = res.assets[0];
      if (asset.base64) {
        const mime = asset.mimeType || 'image/jpeg';
        return compressImageToDataUri(`data:${mime};base64,${asset.base64}`);
      }
      return compressImageToDataUri(asset.uri);
    }
  } catch (err: any) {
    console.warn('[ProductImageHelper] Error al capturar imagen:', err);
    throw err;
  }
}
