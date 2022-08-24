// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlVyALMkGe5yGkZrVOfjmTOWSMx0FWXMw",
  authDomain: "insta-reels-12ef8.firebaseapp.com",
  projectId: "insta-reels-12ef8",
  storageBucket: "insta-reels-12ef8.appspot.com",
  messagingSenderId: "1029474827664",
  appId: "1:1029474827664:web:988cafa0776d66308bc715",
  measurementId: "G-9BZF41R9LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);
export {auth, storage};