import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "dormmate-611b6.firebaseapp.com",
  projectId: "dormmate-611b6",
  storageBucket: "dormmate-611b6.appspot.com",
  messagingSenderId: "602831707549",
  appId: "1:602831707549:web:28b56255990ea799832374",
  measurementId: "G-TT82YHGK86",
};

export const app = initializeApp(firebaseConfig);
