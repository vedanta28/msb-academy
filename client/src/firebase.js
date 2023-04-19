// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3lSYXQmHqLC7tofKwVVZv5lWETW3JAR4",
  authDomain: "msb-academy-5e348.firebaseapp.com",
  projectId: "msb-academy-5e348",
  storageBucket: "msb-academy-5e348.appspot.com",
  messagingSenderId: "87812721423",
  appId: "1:87812721423:web:74d41d6251f47db7bc8c7a",
  measurementId: "G-NFG81613VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
export default storage;
