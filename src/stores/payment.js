import { defineStore } from "pinia";
import midtransClient from "midtrans-client";

export const usePayment = defineStore("payment", () => {
    // Inisialisasi Snap dari midtrans-client
    const snap = new midtransClient.Snap({
        isProduction: false, // Ganti ke 'true' saat production
        // Amankan Server Key menggunakan environment config Firebase
        // Jalankan: midtrans.server_key="SERVER_KEY_ANDA"
        serverKey: import.meta.env.VITE_SECRET_MIDTRANS_SERVER_KEY,
    });

    const createTransaction = async function (req, res) {

        try {
            // 1. Dapatkan detail pengguna (jika perlu, misal dari body req)
            // Untuk contoh ini, kita hardcode harganya.
            const price = 50000;
            const orderId = `FITCAL-PREMIUM-${Date.now()}`; // ID order unik

            // 2. Siapkan parameter transaksi
            const parameter = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: price,
                },
                item_details: [
                    {
                        id: "PREMIUM-FITCAL-1BULAN",
                        price: price,
                        quantity: 1,
                        name: "FitCal Premium 1 Bulan",
                    },
                ],
                customer_details: {
                    name: username,
                    email: email
                },
            };

            // 3. Buat transaksi dan dapatkan token
            const transaction = await snap.createTransaction(parameter);
            const transactionToken = transaction.token;

            // 4. Kirim token kembali ke frontend
            res.status(200).send({ token: transactionToken, order_id: orderId });
        } catch (error) {
            console.error("Error creating Midtrans transaction:", error);
            res.status(500).send({ error: error.message });
        }
    }

    return {createTransaction}
})