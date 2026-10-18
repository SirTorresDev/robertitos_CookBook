import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      !firebaseConfig.projectId.includes('tu-proyecto')
  );
}

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

export function getFirebaseDb(): Firestore | null {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    if (!appInstance) {
      appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    }
    if (!dbInstance) {
      dbInstance = getFirestore(appInstance);
    }
    return dbInstance;
  } catch (err) {
    console.warn('[Firebase] Error initializing Firestore:', err);
    return null;
  }
}

export function getFirebaseProjectInfo() {
  return {
    configured: isFirebaseConfigured(),
    projectId: firebaseConfig.projectId || 'Modo Local (Offline-First Activo)',
  };
}
