import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppleTheme } from '@/constants/appleTheme';
import { AppleHaptics } from '@/core/haptics';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const isIOS =
    Platform.OS === 'ios' ||
    (Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
        (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)));

  const bottomPadding = Math.max(insets.bottom, isIOS ? 28 : 12);
  const tabBarHeight = 60 + bottomPadding;

  return (
    <Tabs
      screenListeners={{
        tabPress: () => {
          AppleHaptics.selection();
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppleTheme.colors.textPrimary,
        tabBarInactiveTintColor: AppleTheme.colors.textTertiary,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            minHeight: tabBarHeight,
            paddingBottom: bottomPadding,
          },
        ],
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.tabIcon,
        tabBarLabelStyle: styles.tabLabel,
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <Ionicons
                name={focused ? 'restaurant' : 'restaurant-outline'}
                size={21}
                color={String(color)}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Técnicas',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <Ionicons
                name={focused ? 'sparkles' : 'sparkles-outline'}
                size={21}
                color={String(color)}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="utensils"
        options={{
          title: 'Utensilios',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <Ionicons
                name={focused ? 'checkbox' : 'checkbox-outline'}
                size={21}
                color={String(color)}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: 'Sitios',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <Ionicons
                name={focused ? 'location' : 'location-outline'}
                size={21}
                color={String(color)}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconCenter}>
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={22}
                color={String(color)}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    paddingTop: 6,
    paddingHorizontal: 4,
    elevation: 0,
  },
  tabItem: {
    height: 50,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconCenter: {
    width: 26,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
    marginTop: 0,
    textAlign: 'center',
  },
});
