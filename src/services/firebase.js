// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// உங்கள் Firebase Configuration details-ஐ இங்கே சேர்க்கவும்
const firebaseConfig = {
  apiKey: "AIzaSyB2cX239k6AcAF9hnw26XHOj3vVgjTbH8Y",
  authDomain: "planner-app-dc604.firebaseapp.com",
  projectId: "planner-app-dc604",
  storageBucket: "planner-app-dc604.firebasestorage.app",
  messagingSenderId: "951390037638",
  appId: "1:951390037638:web:ac1d45e5156783da561307"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);