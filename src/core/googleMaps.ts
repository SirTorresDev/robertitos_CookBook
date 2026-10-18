import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { FoodiePlace } from '@/types/cookbook';

/**
 * Abre un sitio directamente en la app nativa de Google Maps en iOS (`comgooglemaps://`)
 * y si no está instalada, abre Google Maps en el navegador.
 */
export async function openInGoogleMapsApp(place: FoodiePlace): Promise<void> {
  const query = encodeURIComponent(`${place.name}, ${place.address}, ${place.city}`);
  const center = `${place.latitude},${place.longitude}`;

  const iosGoogleMapsUrl = `comgooglemaps://?q=${query}&center=${center}&zoom=16`;
  const webGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  try {
    if (Platform.OS === 'ios') {
      const canOpen = await Linking.canOpenURL('comgooglemaps://');
      if (canOpen) {
        await Linking.openURL(iosGoogleMapsUrl);
        return;
      }
    }
    await Linking.openURL(webGoogleMapsUrl);
  } catch {
    await Linking.openURL(webGoogleMapsUrl);
  }
}

/**
 * Lanza la ruta de navegación GPS paso a paso en la app de Google Maps en iOS.
 */
export async function openDirectionsInGoogleMaps(place: FoodiePlace): Promise<void> {
  const destination = encodeURIComponent(`${place.name}, ${place.address}, ${place.city}`);
  const coords = `${place.latitude},${place.longitude}`;

  const iosDirectionsUrl = `comgooglemaps://?daddr=${destination}&center=${coords}&directionsmode=walking`;
  const webDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`;

  try {
    if (Platform.OS === 'ios') {
      const canOpen = await Linking.canOpenURL('comgooglemaps://');
      if (canOpen) {
        await Linking.openURL(iosDirectionsUrl);
        return;
      }
    }
    await Linking.openURL(webDirectionsUrl);
  } catch {
    await Linking.openURL(webDirectionsUrl);
  }
}
