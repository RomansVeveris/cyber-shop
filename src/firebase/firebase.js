// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKCaxJtpjs8-uScu07_vv-ajvnJApnsoA",
  authDomain: "cyber-shop-a836b.firebaseapp.com",
  projectId: "cyber-shop-a836b",
  storageBucket: "cyber-shop-a836b.firebasestorage.app",
  messagingSenderId: "698708973869",
  appId: "1:698708973869:web:a69a96d92b93004b969ba4",
  measurementId: "G-YW9Y8TB39F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
