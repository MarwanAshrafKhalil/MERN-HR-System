// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FITEBASE_API_KEY,
  authDomain: "hr-systemdb.firebaseapp.com",
  projectId: "hr-systemdb",
  storageBucket: "hr-systemdb.appspot.com",
  messagingSenderId: "501378419010",
  appId: "1:501378419010:web:766a0b61ad2080a3ece0db",
  measurementId: "G-22CYEWLKJF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
