import { Platform, Vibration } from 'react-native';
import { AppleHaptics } from './haptics';
import { BELL_SOUND_BASE64 } from './bellSoundBase64';

let webAudioCtx: any = null;
let html5Audio: any = null;
let isWebAudioPrimed = false;

let nativePlayer: any = null;
let isNativeConfigured = false;

/**
 * Pre-configura y desbloquea el subsistema de audio para iOS y Web.
 * En iOS (tanto en Safari Web como en App Nativa), las políticas de audio exigen:
 * 1) playsInSilentMode: true (para sonar aunque el interruptor lateral físico esté en silencio/vibración).
 * 2) Desbloqueo mediante gesto de usuario (requerido por WebKit/Safari para reproducir desde un temporizador).
 */
export function primeAudioSession(): void {
  // 1. En Web (Safari en iOS / Chrome / PWA):
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    if (!isWebAudioPrimed) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          if (!webAudioCtx || webAudioCtx.state === 'closed') {
            webAudioCtx = new AudioCtx();
          }
          if (webAudioCtx.state === 'suspended') {
            void webAudioCtx.resume();
          }
          // Micro-buffer silencioso para registrar la interacción en WebKit
          const buf = webAudioCtx.createBuffer(1, 1, 22050);
          const src = webAudioCtx.createBufferSource();
          src.buffer = buf;
          src.connect(webAudioCtx.destination);
          src.start(0);
        }

        // Pre-cargar elemento HTML5 Audio con el timbre WAV Base64
        if (typeof Audio !== 'undefined') {
          if (!html5Audio) {
            html5Audio = new Audio(BELL_SOUND_BASE64);
            html5Audio.volume = 1.0;
            html5Audio.preload = 'auto';
            // Disparo mudo inmediato para autorizar reproducción asíncrona posterior
            const p = html5Audio.play();
            if (p !== undefined) {
              p.then(() => {
                html5Audio.pause();
                html5Audio.currentTime = 0;
              }).catch(() => {});
            }
          }
        }
        isWebAudioPrimed = true;
      } catch (e) {
        console.warn('[Sound] primeAudioSession web warning:', e);
      }
    }
  }

  // 2. En Nativo (iOS / Android):
  if (Platform.OS !== 'web' && !isNativeConfigured) {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      const { setAudioModeAsync, createAudioPlayer } = require('expo-audio');
      const soundAsset = require('@/assets/sounds/timer-bell.wav');

      // CRUCIAL EN IOS: playsInSilentMode: true permite que la alarma suene con el móvil en silencio
      void setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
      });

      nativePlayer = createAudioPlayer(soundAsset);
      isNativeConfigured = true;
    } catch (e) {
      console.warn('[Sound] primeAudioSession native warning:', e);
    }
  }
}

// Escuchar automáticamente la primera interacción táctil en Web para desbloquear el audio de iOS Safari
if (Platform.OS === 'web' && typeof window !== 'undefined') {
  const handleFirstGesture = () => {
    primeAudioSession();
    window.removeEventListener('touchstart', handleFirstGesture);
    window.removeEventListener('click', handleFirstGesture);
  };
  window.addEventListener('touchstart', handleFirstGesture, { passive: true });
  window.addEventListener('click', handleFirstGesture, { passive: true });
}

/**
 * Emite aviso acústico de temporizador culinario y vibración háptica continua.
 * Diseñado específicamente para superar las restricciones de iOS (modo silencio y autoplay).
 */
export function playTimerSound(): void {
  // 1. Vibración háptica inmersiva
  AppleHaptics.timerComplete();
  Vibration.vibrate([0, 450, 150, 450, 150, 600]);

  // 2. En Web (iOS Safari y navegadores): Reproducción dual (HTML5 Audio + Web Audio Synth)
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      if (!html5Audio && typeof Audio !== 'undefined') {
        html5Audio = new Audio(BELL_SOUND_BASE64);
        html5Audio.volume = 1.0;
      }
      if (html5Audio) {
        html5Audio.currentTime = 0;
        html5Audio.volume = 1.0;
        const playPromise = html5Audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err: any) => {
            console.warn('[Sound] HTML5 play prevented:', err);
          });
        }
      }
    } catch (e) {
      console.warn('[Sound] HTML5 audio error:', e);
    }

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
          gain.gain.setValueAtTime(0.45, now + startOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
          osc.connect(gain);
          gain.connect(webAudioCtx.destination);
          osc.start(now + startOffset);
          osc.stop(now + startOffset + duration);
        };
        // Doble campanada armónica (A5 880Hz y D6 1175Hz)
        playDing(880, 0, 0.55);
        playDing(1174.66, 0.22, 0.75);
      }
    } catch (e) {
      console.warn('[Sound] WebAudio synth error:', e);
    }
  }

  // 3. En Native (iOS / Android con expo-audio):
  if (Platform.OS !== 'web') {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      const { setAudioModeAsync, createAudioPlayer } = require('expo-audio');
      const soundAsset = require('@/assets/sounds/timer-bell.wav');

      // Forzar playsInSilentMode en cada disparo por si el sistema reinició la sesión
      void setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
      });

      if (!nativePlayer) {
        nativePlayer = createAudioPlayer(soundAsset);
      } else {
        try {
          nativePlayer.seekTo(0);
        } catch {
          nativePlayer = createAudioPlayer(soundAsset);
        }
      }
      nativePlayer.play();
    } catch (nativeErr) {
      console.warn('[Sound] Native audio error:', nativeErr);
    }
  }
}
