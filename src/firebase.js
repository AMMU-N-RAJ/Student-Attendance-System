// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATZIunMpONbwB9Er71vkXDVxT1HRG6-Fc",
  authDomain: "attendance-system-55d06.firebaseapp.com",
  projectId: "attendance-system-55d06",
  storageBucket: "attendance-system-55d06.firebasestorage.app",
  messagingSenderId: "555593047091",
  appId: "1:555593047091:web:913f733b738a1508de9746",
  measurementId: "G-ZE41M3FCP6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };