// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOM2ca5vYiWMMmh2_RKZAhY9dCF6vrAbk",
  authDomain: "moneyapp-4a482.firebaseapp.com",
  projectId: "moneyapp-4a482",
  storageBucket: "moneyapp-4a482.appspot.com",
  messagingSenderId: "1077588626193",
  appId: "1:1077588626193:web:1f79d0d05bee6764391ab0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
