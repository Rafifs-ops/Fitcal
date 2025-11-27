// server.js (Versi ES Module)

import 'dotenv/config'; // Muat environment variables
import express from 'express';
import Midtrans from 'midtrans-client';
import cors from 'cors';

const app = express();
const port = 3000; // Port untuk server backend Anda

// --- Middleware ---
// Sesuaikan dengan URL dev frontend Anda
const corsOptions = {
    origin: ['http://localhost:5173', 'https://fitcal-indonesia.web.app']
};
app.use(cors(corsOptions));
app.use(express.json()); // Mem-parsing body JSON

// --- Inisialisasi Midtrans Snap ---
const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// --- Endpoint API ---
app.post('/api/create-transaction', async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ error: "Username and email are required" });
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

        const transaction = await snap.createTransaction(parameter);

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