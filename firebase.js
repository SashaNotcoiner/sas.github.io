// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBIuy2a6ywwl2QJresRxG_c_FDgY7WgZg",
  authDomain: "tfyh7-bf405.firebaseapp.com",
  projectId: "tfyh7-bf405",
  storageBucket: "tfyh7-bf405.firebasestorage.app",
  messagingSenderId: "537695747687",
  appId: "1:537695747687:web:a014bc543d5fa5f70a5ec2",
  measurementId: "G-P6YV8L4PRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
