import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh2yYMFYDZnDtI1h6kstlEN98WRN8mY2I",
  authDomain: "sahaay-25328.firebaseapp.com",
  projectId: "sahaay-25328",
  storageBucket: "sahaay-25328.appspot.com",
  messagingSenderId: "891413196333",
  appId: "1:891413196333:web:ee469aa317d6bdf116d2a4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export { RecaptchaVerifier, signInWithPhoneNumber };
