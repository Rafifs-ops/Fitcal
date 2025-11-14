import { defineStore } from "pinia";
import Midtrans from "midtrans-client";

export const usePayment = defineStore("payment", () => {
    // Inisialisasi Snap dari midtrans-client
    const snap = new Midtrans.Snap({
        isProduction: false,
    });

    const createTransaction = async function (req, res) {

        try {
            // 1. Dapatkan detail pengguna
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

    return { createTransaction }
})