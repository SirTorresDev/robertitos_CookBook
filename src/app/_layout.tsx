import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Fraunces_500Medium_Italic,
} from '@expo-google-fonts/fraunces';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCookBookStore } from '@/store/useCookBookStore';
import { Platform } from 'react-native';
import { AppleTheme } from '@/constants/appleTheme';
import { AppHeader } from '@/components/AppHeader';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const styleId = 'robertito-cookbook-web-focus-fix';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      input:focus, textarea:focus, select:focus, [role="textbox"]:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// En plataformas móviles mantenemos el splash nativo visible hasta que la app monte
if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync().catch(() => {});
}

export default function RootLayout() {
  const initialize = useCookBookStore((s) => s.initialize);

  useEffect(() => {
    // 1. Inicializar la base de datos local y sincronización
    void initialize();

    // 2. Carga de fuentes no bloqueante:
    // La interfaz aparece de inmediato (0ms de pantalla en blanco).
    // En Web los iconos y fuentes tienen fallbacks nativos y no requieren timeout.
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          ...(Platform.OS !== 'web' ? Ionicons.font : {}),
          Fraunces_600SemiBold,
          Fraunces_700Bold,
          Fraunces_500Medium_Italic,
        });
      } catch (e) {
        console.warn('[RootLayout] Carga de fuentes en segundo plano:', e);
      } finally {
        if (Platform.OS !== 'web') {
          SplashScreen.hideAsync().catch(() => {});
        }
      }
    };

    void loadFonts();
  }, [initialize]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: AppleTheme.colors.background }}>
      <StatusBar style="dark" />
      <AppHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: AppleTheme.colors.background },
          animation: 'ios_from_right',
          gestureEnabled: true,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerShown: false,
            animation: 'ios_from_right',
            gestureEnabled: true,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
