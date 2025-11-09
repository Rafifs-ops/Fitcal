import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore";

export const useData = defineStore('data', () => {
  const users = ref([]); // Tempat penampungan data users
  // isi users = array yang berisi banyak objek data user

  const articles = ref([]); // Tempat penampungan data articles
  // isi article = array yang berisi banyak objek data article

  const products = ref([]); // Tempat penampungan data products
  // isi products = array yang berisi banyak objek data product

  async function fetchUsers() {
    try {

      // PROSES PENGAMBILAN DATA users PADA DATABASE FIREBASE (FIRESTORE)
      const res = await getDocs(collection(db, "users"));
      users.value = res.docs.map(doc => {
        return {
          id: doc.id, 
          ...doc.data()
        }
        // Memberi value pada variable users berupa objek
        // doc adalah nilai satu per satu dari docs
      })
      // AKHIR PROSES PENGAMBILAN DATA users PADA DATABASE FIREBASE (FIRESTORE)

    } catch (e) {

      console.error("Error fetching users: ", e); // Gunakan console.error untuk error

    }
  }

  async function fetchArticles() {
    try {

      // PROSES PENGAMBILAN DATA articles PADA DATABASE FIREBASE (FIRESTORE)
      const res = await getDocs(collection(db, "articles"));
      articles.value = res.docs.map(doc => {
        return {
          id: doc.id, 
          ...doc.data()
        }
        // Memberi value pada variable articles berupa objek
        // doc adalah nilai satu per satu dari docs
      })
      // AKHIR PROSES PENGAMBILAN DATA articles PADA DATABASE FIREBASE (FIRESTORE)

    } catch (e) {

      console.error("Error fetching article: ", e); // Gunakan console.error untuk error

    }
  }

  async function fetchProducts() {
    try {

      // PROSES PENGAMBILAN DATA products PADA DATABASE FIREBASE (FIRESTORE)
      const res = await getDocs(collection(db, "products"));
      products.value = res.docs.map(doc => {
        return {
          id: doc.id, 
          ...doc.data()
        }
        // Memberi value pada variable products berupa objek
        // doc adalah nilai satu per satu dari docs
      })
      // AKHIR PROSES PENGAMBILAN DATA products PADA DATABASE FIREBASE (FIRESTORE)

    } catch (e) {

      console.error("Error fetching product: ", e); // Gunakan console.error untuk error

    }
  }

  return { users, articles, products, fetchUsers, fetchArticles, fetchProducts } // Agar fungsi dan variable dapat diakses di komponen manapun
})
