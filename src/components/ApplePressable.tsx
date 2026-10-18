import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AppleSprings } from '@/constants/appleTheme';

interface ApplePressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  children: React.ReactNode;
}

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

/**
 * Botón minimalista estilo iOS que aplica una micro-animación elástica (spring)
 * al presionar y soltar, idéntica a las tarjetas de la App Store y Apple Music.
 */
export function ApplePressable({
  children,
  style,
  scaleTo = 0.97,
  onPressIn,
  onPressOut,
  ...rest
}: ApplePressableProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressableBase
      {...rest}
      onPressIn={(e) => {
        scale.value = withSpring(scaleTo, AppleSprings.snappy);
        opacity.value = withSpring(0.92, AppleSprings.snappy);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, AppleSprings.smooth);
        opacity.value = withSpring(1, AppleSprings.smooth);
        onPressOut?.(e);
      }}
      style={[style, animatedStyle]}>
      {children}
    </AnimatedPressableBase>
  );
}
