import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "movie-app-a335b.firebaseapp.com",
  projectId: "movie-app-a335b",
  storageBucket: "movie-app-a335b.appspot.com",
  messagingSenderId: "90478628352",
  appId: "1:90478628352:web:47b1a635fe3c3ad69392e5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const Storage = getStorage(app);
