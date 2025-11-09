import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6sYaksaqTHvztN6jILYbvqv6ETrzUnvU",
  authDomain: "fitcal-database.firebaseapp.com",
  projectId: "fitcal-database",
  storageBucket: "fitcal-database.firebasestorage.app",
  messagingSenderId: "1025556078017",
  appId: "1:1025556078017:web:5bd835d69af84da49ca340"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Mendapatkan layanan firestore(database) dari firebase
export { db }