import { WithSpringConfig } from 'react-native-reanimated';

export const AppleTheme = {
  colors: {
    background: '#F6F6F8', // Apple iOS grouped ultra-clean off-white
    surface: '#FFFFFF',
    surfaceElevated: 'rgba(255, 255, 255, 0.88)',
    surfaceSubtle: '#EFEFF4',
    textPrimary: '#1D1D1F', // Apple HIG primary label
    textSecondary: '#6E6E73', // Apple HIG secondary label
    textTertiary: '#A1A1A6', // Apple HIG tertiary label
    accent: '#1D1D1F', // Minimalist monochrome obsidian primary
    accentWarm: '#C85A32', // Subtle culinary terracotta highlight
    accentWarmSoft: '#FDF3EF',
    success: '#28CD41', // Apple iOS green
    successSoft: '#EAFBEC',
    warning: '#FF9500', // Apple iOS amber
    warningSoft: '#FFF6E5',
    danger: '#FF3B30', // Apple iOS red
    googleBlue: '#1A73E8', // Google Maps accent
    googleBlueSoft: '#EBF3FE',
    border: 'rgba(0, 0, 0, 0.06)',
    borderStrong: 'rgba(0, 0, 0, 0.11)',
    pillBg: '#F0F0F3',
  },
  radius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 22,
    xl: 28,
    pill: 999,
  },
  shadow: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.045,
      shadowRadius: 18,
      elevation: 2,
    },
    floating: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.09,
      shadowRadius: 26,
      elevation: 6,
    },
  },
};

export const AppleSprings: Record<'smooth' | 'snappy' | 'gentle', WithSpringConfig> = {
  smooth: {
    damping: 22,
    stiffness: 210,
    mass: 0.9,
  },
  snappy: {
    damping: 18,
    stiffness: 320,
    mass: 0.7,
  },
  gentle: {
    damping: 26,
    stiffness: 160,
    mass: 1,
  },
};
