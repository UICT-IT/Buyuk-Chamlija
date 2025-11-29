// firebaseConfig.js – placeholder configuration for Firebase
// Replace the placeholder values with your actual Firebase project credentials.
// This file initializes the Firebase app and exports the initialized instance
// for use throughout the app.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkrkvRAD4cWaAtibfY-Z0BZpeIsA7vrg4",
    authDomain: "buyuk-chamlija.firebaseapp.com",
    projectId: "buyuk-chamlija",
    storageBucket: "buyuk-chamlija.firebasestorage.app",
    messagingSenderId: "506599904192",
    appId: "1:506599904192:web:53a65d2083b9414e1eae25",
    measurementId: "G-1DJJ4WSG7S"
};

// Initialize Firebase (prevent duplicate initialization)
let app;
let auth;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    // Initialize Auth with persistence only on first init
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
} else {
    app = getApp();
    auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
export default app;
