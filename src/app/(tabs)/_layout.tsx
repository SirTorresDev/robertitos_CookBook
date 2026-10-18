import React from 'react';
import { Tabs, useRouter, Href } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppleTheme } from '@/constants/appleTheme';
import { AppleHaptics } from '@/core/haptics';

type TabKey = 'index' | 'tips' | 'utensils' | 'places' | 'studio';

const TAB_ITEMS: {
  name: TabKey;
  href: Href;
  title: string;
  iconFocused: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: 'index',
    href: '/(tabs)',
    title: 'Recetas',
    iconFocused: 'restaurant',
    iconOutline: 'restaurant-outline',
  },
  {
    name: 'tips',
    href: '/(tabs)/tips',
    title: 'Técnicas',
    iconFocused: 'sparkles',
    iconOutline: 'sparkles-outline',
  },
  {
    name: 'utensils',
    href: '/(tabs)/utensils',
    title: 'Utensilios',
    iconFocused: 'checkbox',
    iconOutline: 'checkbox-outline',
  },
  {
    name: 'places',
    href: '/(tabs)/places',
    title: 'Sitios',
    iconFocused: 'location',
    iconOutline: 'location-outline',
  },
  {
    name: 'studio',
    href: '/(tabs)/studio',
    title: 'Crear',
    iconFocused: 'add-circle',
    iconOutline: 'add-circle-outline',
  },
];

/**
 * Renderiza iconos vectoriales SVG nativos en Web/iOS Safari (sin depender de la carga de fuentes .ttf)
 * e Ionicons en plataformas nativas compiladas.
 */
function FooterTabIcon({
  tab,
  focused,
  color,
  iconFocused,
  iconOutline,
}: {
  tab: TabKey;
  focused: boolean;
  color: string;
  iconFocused: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}) {
  if (Platform.OS !== 'web') {
    return (
      <Ionicons
        name={focused ? iconFocused : iconOutline}
        size={22}
        color={color}
      />
    );
  }

  const strokeWidth = focused ? 2.3 : 1.85;

  switch (tab) {
    case 'index':
      // Cubiertos (Recetas)
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block' }}>
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      );
    case 'tips':
      // Destellos (Técnicas)
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill={focused ? color : 'none'}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block' }}>
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </svg>
      );
    case 'utensils':
      // Checklist (Utensilios)
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block' }}>
          <rect width="18" height="18" x="3" y="3" rx="4" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'places':
      // Pin de mapa (Sitios)
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block' }}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'studio':
      // Añadir / Crear
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      );
  }
}

export default function TabsLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const isIOS =
    Platform.OS === 'ios' ||
    (Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
        (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)));

  const bottomPadding = Math.max(insets.bottom, isIOS ? 20 : 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      tabBar={({ state }) => (
        <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
          <View style={styles.tabBarRow}>
            {TAB_ITEMS.map((item) => {
              const routeIndex = state.routes.findIndex((r) => r.name === item.name);
              const focused = state.index === routeIndex;
              const color = focused
                ? AppleTheme.colors.textPrimary
                : AppleTheme.colors.textSecondary;

              const onPress = () => {
                AppleHaptics.selection();
                if (!focused) {
                  router.navigate(item.href);
                }
              };

              return (
                <Pressable
                  key={item.name}
                  accessibilityRole="tab"
                  accessibilityState={focused ? { selected: true } : {}}
                  onPress={onPress}
                  style={styles.tabButton}>
                  <View style={styles.iconBox}>
                    <FooterTabIcon
                      tab={item.name}
                      focused={focused}
                      color={color}
                      iconFocused={item.iconFocused}
                      iconOutline={item.iconOutline}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color,
                        fontWeight: focused ? '700' : '600',
                      },
                    ]}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}>
      <Tabs.Screen name="index" options={{ title: 'Recetas' }} />
      <Tabs.Screen name="tips" options={{ title: 'Técnicas' }} />
      <Tabs.Screen name="utensils" options={{ title: 'Utensilios' }} />
      <Tabs.Screen name="places" options={{ title: 'Sitios' }} />
      <Tabs.Screen name="studio" options={{ title: 'Crear' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  tabBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  iconBox: {
    width: 26,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: -0.1,
    textAlign: 'center',
    paddingBottom: 2,
  },
});
