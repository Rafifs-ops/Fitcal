import { defineStore } from 'pinia';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useData } from './state';

export const useValidatePrem = defineStore("validatePrem", () => {
    const dataStore = useData(); // Akses store data

    // --- Validasi Status Premium ---
    async function validatePremiumStatus(userId) {
        if (!userId) return; // Jika user id tidak ada, maka akan menghentikan eksekusi program

        try {
            const userDocRef = doc(db, 'users', userId); // Konfigurasi untuk mendapatkan salah satu dokumen yang ada di db firebase
            const userSnap = await getDoc(userDocRef); // Mengakses/mendapatkan salah satu dokumen yang sudah dikonfigurasi

            if (userSnap.exists()) { // Jika variabel userSnap ada isi nya
                const userData = userSnap.data(); // Mengakses/mendapatkan data yang ada didalam dokumen yang didapat

                // Cek apakah user premium dan punya tanggal kedaluwarsa
                if (userData.isPremium && userData.premiumExpiresAt) {
                    const now = new Date(); // Mengambil waktu sekarang (realtime)
                    const expiryDate = userData.premiumExpiresAt.toDate(); // Konversi Timestamp Firestore ke JS Date

                    // Jika waktu sekarang LEBIH BESAR dari waktu expiry (sudah lewat)
                    if (now > expiryDate) {
                        // Update database: cabut status premium
                        await updateDoc(userDocRef, {
                            isPremium: false,
                            premiumExpiresAt: null 
                        });

                        // Refresh data users lokal agar UI update
                        await dataStore.fetchUsers(); 
                        
                        // Update juga localStorage agar sinkron tanpa reload
                        localStorage.setItem("isPremium", false);
                    }
                }
            }
        } catch (e) {
            console.error("Error validating premium status:", e);
        }
    }

    return { validatePremiumStatus }; // Agar fungsi bisa digunakan di manapun
})