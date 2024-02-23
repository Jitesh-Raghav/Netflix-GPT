// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA7js7Iw_vYMLqq-ssy7Zqw5vDYCKc6Pc",
  authDomain: "netflixgpt-bb298.firebaseapp.com",
  projectId: "netflixgpt-bb298",
  storageBucket: "netflixgpt-bb298.appspot.com",
  messagingSenderId: "946109109258",
  appId: "1:946109109258:web:98b85d58963723167bbbf3",
  measurementId: "G-6BCF28VX1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();