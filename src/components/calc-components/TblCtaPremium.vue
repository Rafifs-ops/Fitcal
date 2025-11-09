<script setup>
import { ref } from 'vue';

// State untuk mengontrol tampilan modal
const showPremiumModal = ref(false);

// Fungsi untuk menampilkan modal saat tombol CTA diklik
function openPremiumModal() {
    showPremiumModal.value = true;
}

// Fungsi untuk menutup modal
function closePremiumModal() {
    showPremiumModal.value = false;
}
</script>

<template>
    <main>
        <div class="fixed-button-container">
            <button class="btn btn-success btn-lg shadow-sm mb-2" @click="openPremiumModal">
                Simpan Hasil
            </button>
            <button class="btn btn-success btn-lg shadow-sm" @click="openPremiumModal">
                Chatbot AI <i class="bi bi-robot"></i>
            </button>
        </div>

        <div v-if="showPremiumModal" class="premium-modal-backdrop" @click.self="closePremiumModal">
            <div class="premium-modal-content">
                <button type="button" class="btn-close premium-modal-close" aria-label="Close"
                    @click="closePremiumModal"></button>
                <div class="premium-modal-body text-center">
                    <i class="bi bi-star-fill premium-icon"></i>
                    <h4 class="premium-text mt-3">Akses Premium</h4>
                    <i class="premium-text">Rp 50.000,00 per Bulan</i>
                    <p class="premium-subtext">Dapatkan akses premium untuk simpan hasil dan berbicara dengan chatbot AI</p>
                    <button class="btn premium-cta-button mt-4">
                        Upgrade Sekarang
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.fixed-button-container {
    position: fixed;
    bottom: 2rem;
    /* Jarak dari bawah viewport */
    left: 2rem;
    /* Jarak dari kiri viewport */
    z-index: 1000;
    /* Pastikan di atas elemen lain */
    display: flex;
    flex-direction: column;
}

.premium-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1040; /* Di atas tombol fixed */
}

.premium-modal-content {
    background-color: #F8F8F8; /* Warna latar belakang modal, bisa disesuaikan */
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    position: relative;
    max-width: 400px;
    width: 90%;
}

.premium-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1B4242; /* Dark Teal */
}

.premium-icon {
    font-size: 3.5rem;
    color: #092635; /* Dark Navy */
}

.premium-text {
    color: #092635; /* Dark Navy */
    font-weight: 600;
}

.premium-subtext {
    color: #1B4242; /* Dark Teal */
    font-size: 1rem;
}

.premium-cta-button {
    background-color: #5C8374; /* Medium Green */
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.premium-cta-button:hover {
    background-color: #1B4242; /* Dark Teal, untuk efek hover */
    color: white; /* Pastikan warna teks tetap putih */
}
</style>