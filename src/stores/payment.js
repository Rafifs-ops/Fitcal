import { defineStore } from "pinia";

export const usePayment = defineStore("payment", () => {
    // URL ini mengarah ke server Express.js yang Anda buat di server.js
    // Pastikan port-nya sama (misal: 3000)
    const createTransactionUrl = "http://localhost:3000/api/create-transaction";

    // Hanya return URL-nya
    return { createTransactionUrl };
});