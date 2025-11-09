import { ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const useData = defineStore('data', () => {

  // Tempat Penampungan data yang didapat dari firebase, isi masing2 variable : array(objek)
  const users = ref([]);
  const articles = ref([]);
  const products = ref([]);
  const error = ref(null); // Tampung error

  // Fungsi generik
  async function fetchCollection(collectionName, varTampung) {
    try {
      const res = await getDocs(collection(db, collectionName));
      varTampung.value = res.docs.map(doc => ({ // doc adalah nilai satu per satu dari docs 
        id: doc.id, 
        ...doc.data()
      }));
    } catch (e) {
      console.error(`Error fetching ${collectionName}: `, e);
      error.value = `Gagal memuat ${collectionName}.`;
    }
  }

  // Panggil fungsi generik
  async function fetchUsers() {
    await fetchCollection("users", users);
  }

  async function fetchArticles() {
    await fetchCollection("articles", articles);
  }

  async function fetchProducts() {
    await fetchCollection("products", products);
  }

  return {
    users, articles, products, error,
    fetchUsers, fetchArticles, fetchProducts,
    fetchCollection
  } // Agar variable dan fungsi dapat digunakan di mana pun
});