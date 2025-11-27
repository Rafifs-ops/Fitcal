import { ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const usePremium = defineStore('premium', () => {

  // Tempat Penampungan data yang didapat dari firebase, isi variable : single objek
  const statusPremium = ref(null);

  // Fungsi generik
  async function fetchPremium(idDoc) {
    try {
      const res = await getDoc(doc(db, "users", idDoc));
      statusPremium.value = res.data().isPremium;
    } catch (e) {
      console.error(`Error fetching status premium: `, e);
    }
  }

  return {
    statusPremium, 
    fetchPremium
  } // Agar variable dan fungsi dapat digunakan di mana pun
});