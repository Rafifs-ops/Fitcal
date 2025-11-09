import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeTh_wBP5K_1VLXFDLtsWmRvWPfNt1YrA",
  authDomain: "fitcal-indonesia.firebaseapp.com",
  projectId: "fitcal-indonesia",
  storageBucket: "fitcal-indonesia.firebasestorage.app",
  messagingSenderId: "31707606721",
  appId: "1:31707606721:web:43cfd60eaf3420365aae40"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Mendapatkan layanan firestore

export { db }