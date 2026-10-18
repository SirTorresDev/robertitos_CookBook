import { Easing, WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

/**
 * Sistema de diseño "Editorial Culinario".
 * Paleta cálida (marfil, espresso, pimentón y azafrán) inspirada en los
 * recetarios de alta cocina. Se mantienen los nombres de las claves para que
 * todas las pantallas hereden la nueva identidad automáticamente.
 */
export const AppleTheme = {
  colors: {
    background: '#F7F3EE', // Marfil cálido
    surface: '#FFFFFF',
    surfaceElevated: 'rgba(255, 253, 250, 0.92)',
    surfaceSubtle: '#EFE8DF',
    surfaceDark: '#1E1915', // Espresso (tarjetas destacadas)
    textPrimary: '#1E1915',
    textSecondary: '#6F645B',
    textTertiary: '#A99D92',
    textOnDark: '#FFF9F2',
    accent: '#1E1915',
    accentWarm: '#C4532B', // Pimentón de la Vera
    accentWarmSoft: '#FBEDE5',
    gold: '#C08A3E', // Azafrán tostado
    goldSoft: '#F7EEDD',
    olive: '#5E6B3A',
    success: '#3F8F5B',
    successSoft: '#E6F2E9',
    warning: '#E08A1E',
    warningSoft: '#FCF1E1',
    danger: '#D2412F',
    dangerSoft: '#FCEDEA',
    googleBlue: '#1A73E8',
    googleBlueSoft: '#EBF3FE',
    border: 'rgba(62, 42, 24, 0.08)',
    borderStrong: 'rgba(62, 42, 24, 0.15)',
    pillBg: '#EFE8DF',
    overlay: 'rgba(20, 14, 10, 0.55)',
  },
  fonts: {
    /** Serif editorial para titulares. Se carga en el layout raíz. */
    display: 'Fraunces_600SemiBold',
    displayBold: 'Fraunces_700Bold',
    displayItalic: 'Fraunces_500Medium_Italic',
  },
  radius: {
    xs: 8,
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
    pill: 999,
  },
  shadow: {
    card: {
      shadowColor: '#3B2716',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.07,
      shadowRadius: 20,
      elevation: 3,
    },
    floating: {
      shadowColor: '#2A1B0F',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.18,
      shadowRadius: 28,
      elevation: 8,
    },
  },
};

/** Muelles suaves y sin rebote excesivo para transiciones fluidas. */
export const AppleSprings: Record<'smooth' | 'snappy' | 'gentle', WithSpringConfig> = {
  smooth: {
    damping: 24,
    stiffness: 190,
    mass: 0.9,
  },
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.7,
  },
  gentle: {
    damping: 28,
    stiffness: 140,
    mass: 1,
  },
};

/** Curva "ease-out-expo" usada en entradas y transiciones de contenido. */
export const SmoothEasing = Easing.bezier(0.22, 1, 0.36, 1);

export const SmoothTiming: WithTimingConfig = {
  duration: 420,
  easing: SmoothEasing,
};
