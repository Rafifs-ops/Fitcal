import { defineStore } from 'pinia';
import { db } from '@/firebase/config';

export const useValidatePrem = defineStore("validatePrem", () => {
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
                        await fetchUsers();
                    }
                }
            }
        } catch (e) {
            console.error("Error validating premium status:", e);
        }
    }

    return validatePremiumStatus
})