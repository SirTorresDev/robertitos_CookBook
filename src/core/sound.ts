import { Platform, Vibration } from 'react-native';
import { AppleHaptics } from './haptics';

let webAudioCtx: any = null;

/**
 * Emite aviso acústico de temporizador culinario y vibración háptica continua.
 * - En iOS / Android: Reproduce el timbre con expo-audio y vibra con patrón culinario.
 * - En Web: Genera una doble campanada armónica pura (880Hz + 1175Hz) con Web Audio API.
 */
export function playTimerSound(): void {
  // 1. Vibración háptica en dispositivos móviles
  AppleHaptics.timerComplete();
  Vibration.vibrate([0, 450, 150, 450, 150, 600]);

  // 2. En Web: Síntesis de sonido de campana de cocina de alta fidelidad
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!webAudioCtx || webAudioCtx.state === 'closed') {
          webAudioCtx = new AudioCtx();
        }
        if (webAudioCtx.state === 'suspended') {
          void webAudioCtx.resume();
        }
        const now = webAudioCtx.currentTime;
        const playDing = (freq: number, startOffset: number, duration: number) => {
          const osc = webAudioCtx.createOscillator();
          const gain = webAudioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + startOffset);
          gain.gain.setValueAtTime(0.4, now + startOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
          osc.connect(gain);
          gain.connect(webAudioCtx.destination);
          osc.start(now + startOffset);
          osc.stop(now + startOffset + duration);
        };
        // Doble campanada de cocina (A5 880Hz y D6 1175Hz)
        playDing(880, 0, 0.5);
        playDing(1174.66, 0.22, 0.7);
      }
    } catch (e) {
      console.warn('[Sound] WebAudio warning:', e);
    }
  }

  // 3. En Native (iOS/Android): Reproducción segura de timbre de campana
  if (Platform.OS !== 'web') {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      const { createAudioPlayer } = require('expo-audio');
      const soundAsset = require('@/assets/sounds/timer-bell.wav');
      const player = createAudioPlayer(soundAsset);
      player.play();
    } catch (nativeAudioErr) {
      console.warn('[Sound] expo-audio fallback to vibration:', nativeAudioErr);
    }
  }
}
