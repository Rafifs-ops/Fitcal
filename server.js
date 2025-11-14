// Muat environment variables dari file .env
require('dotenv').config();

const express = require('express');
const Midtrans = require('midtrans-client');
const cors = require('cors');

const app = express();
const port = 3000; // Port untuk server backend Anda

// --- Middleware ---
// Mengizinkan request dari frontend Vue Anda (misal: http://localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173' // Sesuaikan dengan URL dev frontend Anda
}));
// Mem-parsing body JSON dari request
app.use(express.json());

// --- Inisialisasi Midtrans Snap ---
// Ambil key dari environment variables (file .env)
const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// --- Endpoint API ---
// Ini adalah API yang akan dipanggil oleh frontend
app.post('/api/create-transaction', async (req, res) => {
    try {
        // Ambil data (username, email) yang dikirim oleh frontend
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).send({ error: "Username and email are required" });
        }

        const price = 50000;
        const orderId = `FITCAL-PREMIUM-${Date.now()}`;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: price,
            },
            item_details: [{
                id: "PREMIUM-FITCAL-1BULAN",
                price: price,
                quantity: 1,
                name: "FitCal Premium 1 Bulan",
            }],
            customer_details: {
                name: username,
                email: email
            },
        };

        // Buat transaksi menggunakan SDK Midtrans
        const transaction = await snap.createTransaction(parameter);

        // Kirim transaction token kembali ke frontend
        res.status(200).json({ token: transaction.token, order_id: orderId });

    } catch (error) {
        console.error("Error creating Midtrans transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// --- Jalankan Server ---
app.listen(port, () => {
    console.log(`FitCal Backend (Express.js) listening on http://localhost:${port}`);
});