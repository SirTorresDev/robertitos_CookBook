import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppleTheme } from '@/constants/appleTheme';
import { AppleHaptics } from '@/core/haptics';

export default function TabsLayout() {
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
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={22}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Técnicas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={22}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="utensils"
        options={{
          title: 'Utensilios',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              size={22}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: 'Sitios',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'location' : 'location-outline'}
              size={22}
              color={String(color)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={24}
              color={String(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    height: Platform.OS === 'ios' ? 86 : 66,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 26 : 10,
    elevation: 0,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: -0.1,
    marginTop: 2,
  },
});
