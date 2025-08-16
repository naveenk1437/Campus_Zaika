// File: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config (keep this private in production)
const firebaseConfig = {
  apiKey: "AIzaSyAyPON10YrPRUhARwXvoKdijiVbW6iTZo8",
  authDomain: "campus-zaika.firebaseapp.com",
  projectId: "campus-zaika",
  storageBucket: "campus-zaika.appspot.com",
  messagingSenderId: "567159274080",
  appId: "1:567159274080:web:b5f14addd087823e8ca105",
  measurementId: "G-B7P7NCSC5K"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase services
export const auth = getAuth(app);       // Authentication
export const db = getFirestore(app);    // Firestore Database
export const storage = getStorage(app); // Storage for images/files
