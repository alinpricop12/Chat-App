// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBud43iZkob7XHxroyw25xlxsoPJu07jiQ",
  authDomain: "chat-app-multiple-users.firebaseapp.com",
  projectId: "chat-app-multiple-users",
  storageBucket: "chat-app-multiple-users.appspot.com",
  messagingSenderId: "385556999887",
  appId: "1:385556999887:web:2df2ed926bf2486dfd91ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Products (Authentication, FireStore)
export const auth = getAuth(app);
export const db = getFirestore(app);