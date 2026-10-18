import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';

const chefEmblem = require('../../assets/images/chef-emblem.png');
const chefWordmark = require('../../assets/images/chef-wordmark.png');

export function AppHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const isIOS =
    Platform.OS === 'ios' ||
    (Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
        (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)));

  // Margen superior calibrado: despeja la barra de estado y el blur de iOS (~36-38px) sin huecos vacíos excesivos
  const topPadding = isIOS
    ? (insets.top > 0 ? Math.min(insets.top, 38) : 36)
    : Math.max(insets.top, 8);

  const isRecipeDetail = pathname?.startsWith('/recipe/');

  return (
    <View style={[styles.bannerWrapper, { paddingTop: topPadding }]}>
      <ApplePressable
        scaleTo={0.985}
        onPress={() => {
          AppleHaptics.selection();
          if (isRecipeDetail) {
            router.back();
          } else {
            router.push('/(tabs)');
          }
        }}
        style={styles.bannerLockup}>
        <Image
          source={chefEmblem}
          style={styles.emblemImage}
          contentFit="contain"
          transition={150}
        />
        <Image
          source={chefWordmark}
          style={styles.wordmarkImage}
          contentFit="contain"
          transition={150}
        />
      </ApplePressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    backgroundColor: '#FAF7F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E6DEC8',
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 50,
    shadowColor: '#2A1E11',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerLockup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 54,
  },
  emblemImage: {
    width: 64,
    height: 51,
  },
  wordmarkImage: {
    width: 196,
    height: 54,
  },
});
