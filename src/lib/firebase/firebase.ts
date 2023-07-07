// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUImtnqjNyYK22j4Z9k4NBgpMCcRhB8bM",
  authDomain: "smart-rate-calc.firebaseapp.com",
  projectId: "smart-rate-calc",
  storageBucket: "smart-rate-calc.appspot.com",
  messagingSenderId: "676277908413",
  appId: "1:676277908413:web:a09ea2925e1f2abac858d4",
  measurementId: "G-W6KYNPTPKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);

