// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC64EJt_pttb3TE0rn0SyNeq7MTs84SqhI",
  authDomain: "netflix-gpt-61d2d.firebaseapp.com",
  projectId: "netflix-gpt-61d2d",
  storageBucket: "netflix-gpt-61d2d.firebasestorage.app",
  messagingSenderId: "204079915382",
  appId: "1:204079915382:web:cb54a548cf43bbc49d9a57",
  measurementId: "G-F4B035TS7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);