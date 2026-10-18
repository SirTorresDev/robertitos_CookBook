import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppleTheme } from '@/constants/appleTheme';
import { AppleHaptics } from '@/core/haptics';

const TAB_ITEMS: {
  name: string;
  title: string;
  iconFocused: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: 'index',
    title: 'Recetas',
    iconFocused: 'restaurant',
    iconOutline: 'restaurant-outline',
  },
  {
    name: 'tips',
    title: 'Técnicas',
    iconFocused: 'sparkles',
    iconOutline: 'sparkles-outline',
  },
  {
    name: 'utensils',
    title: 'Utensilios',
    iconFocused: 'checkbox',
    iconOutline: 'checkbox-outline',
  },
  {
    name: 'places',
    title: 'Sitios',
    iconFocused: 'location',
    iconOutline: 'location-outline',
  },
  {
    name: 'studio',
    title: 'Crear',
    iconFocused: 'add-circle',
    iconOutline: 'add-circle-outline',
  },
];

export default function TabsLayout() {
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
      tabBar={({ state, navigation }: any) => (
        <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
          <View style={styles.tabBarRow}>
            {TAB_ITEMS.map((item) => {
              const routeIndex = state.routes.findIndex((r: any) => r.name === item.name);
              const route = state.routes[routeIndex];
              const focused = state.index === routeIndex;
              const color = focused
                ? AppleTheme.colors.textPrimary
                : AppleTheme.colors.textTertiary;

              const onPress = () => {
                AppleHaptics.selection();
                if (!route) return;
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
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
                    <Ionicons
                      name={focused ? item.iconFocused : item.iconOutline}
                      size={22}
                      color={color}
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
