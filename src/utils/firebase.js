// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPkk3Fb-y3ibs9Z5uvMCsdN_BP6ahR_1U",
  authDomain: "netflixgpt-2f7c0.firebaseapp.com",
  projectId: "netflixgpt-2f7c0",
  storageBucket: "netflixgpt-2f7c0.appspot.com",
  messagingSenderId: "161365804134",
  appId: "1:161365804134:web:bd34baec648a12f68099a7",
  measurementId: "G-V2NKJ0K2Q5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
