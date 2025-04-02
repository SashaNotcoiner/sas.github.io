// Конфигурация (замените значения своими!)
const firebaseConfig = {
  apiKey: "AIzaSyBk...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-bucket.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcde..."
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
