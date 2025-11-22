import { defineStore } from 'pinia';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useData } from './state';

export const useValidatePrem = defineStore("validatePrem", () => {
    const dataStore = useData(); // Akses store data

    // --- Validasi Status Premium ---
    async function validatePremiumStatus(userId) {
        if (!userId) return;

        try {
            const userDocRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();

                // Cek apakah user premium dan punya tanggal kedaluwarsa
                if (userData.isPremium && userData.premiumExpiresAt) {
                    const now = new Date();
                    const expiryDate = userData.premiumExpiresAt.toDate(); // Konversi Timestamp Firestore ke JS Date

                    // Jika waktu sekarang LEBIH BESAR dari waktu expiry (sudah lewat)
                    if (now > expiryDate) {
                        // Update database: cabut status premium
                        await updateDoc(userDocRef, {
                            isPremium: false,
                            premiumExpiresAt: null // atau biarkan untuk history
                        });
                        console.log("Masa aktif premium berakhir. Status diperbarui.");

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

    return { validatePremiumStatus };
})