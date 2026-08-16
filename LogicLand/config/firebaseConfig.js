// config/firebaseConfig.js
// Firebase project ki settings - ye file connection banati hai

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZIp1_I6L1GRacw0NwassME8ktJi2aOM",
  authDomain: "logicland-9926c.firebaseapp.com",
  projectId: "logicland-9926c",
  storageBucket: "logicland-9926c.firebasestorage.app",
  messagingSenderId: "465643276158",
  appId: "1:465643276158:web:4ac3420fffa36955cd52f",
  measurementId: "G-YQ18CK69SC"
};

const app = initializeApp(firebaseConfig);

// Ab login state phone band karne ke baad bhi yaad rahega
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});