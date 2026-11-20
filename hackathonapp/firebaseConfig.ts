// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuMOguNsrM4agolj9QrWeN6HF6uPm-ozY",
  authDomain: "hackathon-f8efd.firebaseapp.com",
  projectId: "hackathon-f8efd",
  storageBucket: "hackathon-f8efd.firebasestorage.app",
  messagingSenderId: "806810137448",
  appId: "1:806810137448:web:0755615f2ff8edd39a1cdd",
  measurementId: "G-KS96S16D65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize and export Realtime Database
export const database = getDatabase(app);
