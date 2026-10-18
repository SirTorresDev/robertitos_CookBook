import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { AppleTheme } from '@/constants/appleTheme';
import { ApplePressable } from '@/components/ApplePressable';
import { AppleHaptics } from '@/core/haptics';

const chefIcon = require('../../assets/images/chef.png');

export function AppHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const isIOSWeb =
    Platform.OS === 'web' &&
    typeof window !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1));

  const isStandalonePWA =
    Platform.OS === 'web' &&
    typeof window !== 'undefined' &&
    ((window.navigator as { standalone?: boolean }).standalone === true ||
      window.matchMedia?.('(display-mode: standalone)')?.matches === true);

  const topPadding =
    Platform.OS === 'ios'
      ? Math.max(insets.top, 44)
      : isIOSWeb && isStandalonePWA
      ? Math.max(insets.top, 46)
      : Math.max(insets.top, 10);

  const isRecipeDetail = pathname?.startsWith('/recipe/');

  return (
    <View style={[styles.wrapper, { paddingTop: topPadding }]}>
      <View style={styles.innerRow}>
        <ApplePressable
          scaleTo={0.98}
          onPress={() => {
            AppleHaptics.selection();
            if (isRecipeDetail) {
              router.back();
            } else {
              router.push('/(tabs)');
            }
          }}
          style={styles.brandGroup}>
          <View style={styles.iconFrame}>
            <Image
              source={chefIcon}
              style={styles.iconImage}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View style={styles.brandTextCol}>
            <Text style={styles.brandEyebrow} numberOfLines={1}>
              ALTA COCINA · MANUAL TÉCNICO
            </Text>
            <Text style={styles.brandTitle} numberOfLines={1}>
              Robertito´s CookBook
            </Text>
          </View>
        </ApplePressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(245, 245, 247, 0.96)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppleTheme.colors.border,
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 50,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 42,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconFrame: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: '#F7F4EE',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2D9C8',
    ...AppleTheme.shadow.card,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  brandTextCol: {
    flex: 1,
    justifyContent: 'center',
  },
  brandEyebrow: {
    fontSize: 9.5,
    fontWeight: '700',
    color: AppleTheme.colors.accentWarm,
    letterSpacing: 0.7,
    lineHeight: 12,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppleTheme.colors.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 22,
  },
});
