// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQtc8zTnUZGknzL_C_OG-Le5k776-zJfk",
  authDomain: "fir-chat-13f46.firebaseapp.com",
  projectId: "fir-chat-13f46",
  storageBucket: "fir-chat-13f46.appspot.com",
  messagingSenderId: "639388387512",
  appId: "1:639388387512:web:2d6770be5863dbad6dcc4d",
  measurementId: "G-XH59B9BPH0"
};

initializeApp(firebaseConfig);
export const auth = getAuth()
export const database = getFirestore()