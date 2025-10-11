// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh2yYMFYDZnDtI1h6kstlEN98WRN8mY2I",
  authDomain: "sahaay-25328.firebaseapp.com",
  projectId: "sahaay-25328",
  storageBucket: "sahaay-25328.appspot.com",
  messagingSenderId: "891413196333",
  appId: "1:891413196333:web:ee469aa317d6bdf116d2a4",
  measurementId: "G-SS3B29FJRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
export const db = getFirestore(app); // For storing donors, requests, hospitals
export const auth = getAuth(app);    // For signup/login functionality
