<script setup>
import { defineProps, toRefs } from 'vue';
import { db } from '@/firebase/config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const props = defineProps(["hasilHitung"]); // Menerima data hasil perhitungan dari komponen induk(PremCalc.vue)
const { hasilHitung } = toRefs(props) // Menjaga reaktivitas data/variabel saat menggunakan destruk

const userId = localStorage.getItem("userId");

async function simpanHasil() {
    try {
        const docRef = doc(db, 'users', userId);
        const newResult = {
            hasilBmi: hasilHitung.value.bmi, // Gunakan .value untuk mengakses data dari toRefs
            hasilBmr: hasilHitung.value.bmr,
            hasilTdde: hasilHitung.value.tdde,
            date: new Date() // Firestore akan otomatis mengubah ini menjadi tipe Timestamp
        };

        // Menggunakan arrayUnion untuk menambahkan objek/nilai baru ke array 'historyResults'
        await updateDoc(docRef, {
            historyResults: arrayUnion(newResult),
        });

        alert("Hasil Kalkuator berhasil disimpan....")

    } catch (error) {
        console.error('Error saat menambahkan field: ', error);
    }
}
</script>

<template>
    <h2 class="section-title text-center mb-4">Hasil Perhitungan</h2>
    <div class="row g-4">

        <div class="col-md-4">
            <div class="card result-card h-100">
                <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h5 class="result-title">BMI</h5>
                    <p class="result-value display-5 fw-bold">{{ hasilHitung.bmi }}</p>
                    <span class="badge result-badge-normal align-self-center">
                        kg/m²
                    </span>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card result-card h-100">
                <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h5 class="result-title">BMR</h5>
                    <p class="result-value display-5 fw-bold">{{ hasilHitung.bmr }}</p>
                    <span class="badge result-badge-info align-self-center">
                        kkal/hari
                    </span>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card result-card h-100">
                <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h5 class="result-title">TDEE</h5>
                    <p class="result-value display-5 fw-bold">{{ hasilHitung.tdde }}</p>
                    <span class="badge result-badge-info align-self-center">
                        kkal/hari
                    </span>
                </div>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-success mt-3" @click="simpanHasil">Simpan Hasil</button>
</template>

<style scoped>
.section-title {
    color: #1B4242;
    /* Dark Teal */
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #9EC8B9;
    /* Light Mint */
    display: inline-block;
}

.card {
    border-radius: 1rem;
    /* Sudut lebih bulat */
    overflow: hidden;
    /* Memastikan header mengikuti border-radius */
}

.result-card {
    background-color: #fafdfc;
    border: 1px solid #d6e0db;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
}

.result-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(9, 38, 53, 0.05);
}

.result-title {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: #1B4242;
    /* Dark Teal */
}

.result-value {
    color: #5C8374;
    /* Medium Green */
    margin-bottom: 0.75rem;
}

/* Badge Kustom untuk Hasil */
.result-badge-normal,
.result-badge-info {
    font-size: 0.9rem;
    padding: 0.5em 1em;
    font-weight: 500;
    border-radius: 50px;
    /* Bentuk pil */
    color: #ffffff;
}

.result-badge-normal {
    background-color: #5C8374;
    /* Medium Green */
}

.result-badge-info {
    background-color: #1B4242;
    /* Dark Teal */
}
</style>