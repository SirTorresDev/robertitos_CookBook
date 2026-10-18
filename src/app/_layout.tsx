import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCookBookStore } from '@/store/useCookBookStore';
import { AppleTheme } from '@/constants/appleTheme';
import { AppHeader } from '@/components/AppHeader';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const initialize = useCookBookStore((s) => s.initialize);

  useEffect(() => {
    Promise.all([
      initialize(),
      Font.loadAsync(Ionicons.font).catch(() => {}),
    ]).finally(() => {
      SplashScreen.hideAsync().catch(() => {});
    });
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
