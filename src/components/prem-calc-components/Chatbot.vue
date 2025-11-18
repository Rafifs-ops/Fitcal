<script setup>
import { ref, nextTick } from 'vue';
import { defineProps, toRefs } from 'vue';

// --- MENERIMA DATA HASIL HITUNG KALKUATOR MELALUI PROPS ---
const props = defineProps(["hasilHitung", "inputData"]); // Menerima data hasil perhitungan dan input data dari komponen induk(PremCalc.vue)
const { hasilHitung, inputData } = toRefs(props) // Menjaga reaktivitas data/variabel saat menggunakan destruk
// --- AKHIR MENERIMA DATA HASIL HITUNG KALKUATOR MELALUI PROPS ---

// --- KONFIGURASI TAMPILAN UI MODAL ---
const showPremiumModal = ref(false); // State untuk mengontrol tampilan modal
function openPremiumModal() { // Fungsi untuk menampilkan modal saat tombol CTA diklik
    showPremiumModal.value = true;
    // Tambahkan pesan selamat datang dari AI saat modal dibuka (jika belum ada pesan)
    if (messages.value.length === 0) {
        messages.value.push({
            text: 'Halo! Ada yang bisa saya bantu hari ini?',
            sender: 'ai'
        });
    }
}
function closePremiumModal() { // Fungsi untuk menutup modal
    showPremiumModal.value = false;
}
// --- AKHIR KONFIGURASI TAMPILAN UI MODAL ---

// --- CHATBOT ---
const messages = ref([]); // Menyimpan semua pesan AI dan user
const newMessage = ref(''); // Text baru dari input
const chatWindow = ref(null); // Referensi ke elemen jendela chat untuk auto-scroll

// Fungsi untuk auto-scroll ke pesan terbaru
async function scrollToBottom() {
    // Menunggu DOM diperbarui
    await nextTick();
    if (chatWindow.value) {
        chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
}

// Fungsi untuk mengirim pesan ke Chatbot
async function sendMessage() {

    const text = newMessage.value.trim();
    if (text === '') return; // Jangan kirim pesan kosong

    // 1. Tambahkan pesan pengguna
    messages.value.push({
        text: text,
        sender: 'user'
    });

    // 2. Kosongkan input
    newMessage.value = '';
    scrollToBottom(); // Scroll setelah pesan pengguna ditambahkan

    // 3. (BARU) Tambahkan pesan loading
    messages.value.push({
        text: 'AI sedang mengetik...', // Teks loading
        sender: 'ai'
    });
    await scrollToBottom(); // Scroll untuk menunjukkan loading

    // 4. Proses mengirim pesan ke gemini
    try {
        // Siapkan prompt untuk Gemini
        const systemPrompt = `Anda adalah asisten chatbot dari website Fitcal. Anda ahli dalam BMI, BMR, dan TDDE. dan ini adalah data-data user saya:
        Jenis Kelamin = ${inputData.value.jenisKelamin},
        Usia = ${inputData.value.usia},
        Berat Badan = ${inputData.value.beratBadan},
        Tinggi Badan = ${inputData.value.tinggiBadan},
        Tingkat Aktivitas = ${inputData.value.tingkatAktvitas},
        BMI = ${hasilHitung.value.bmi}, 
        BMR = ${hasilHitung.value.bmr}, dan 
        TDEE = ${hasilHitung.value.tdde}
        Selalu format jawaban Anda menggunakan Markdown agar rapi. Berikan baris baru (paragraf) untuk memisahkan ide agar mudah dibaca dan jangan beri **bold**`;
        const userPrompt = text + " sertakan juga referensi dari WHO dan Kemenkes jika perlu";

        // Kofigurasi URL dan API Key
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [{
                    text: userPrompt
                }]
            }],
            systemInstruction: {
                parts: [{
                    text: systemPrompt
                }]
            },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        const responText = result.candidates[0].content.parts[0].text;

        // Hapus pesan loading
        messages.value.pop();

        // 5. Memberikan respon AI
        messages.value.push({
            text: responText,
            sender: 'ai'
        });

    } catch (error) {

        // Hapus pesan loading saat error
        messages.value.pop();
        // Tampilkan pesan error ke pengguna di dalam chat
        messages.value.push({
            text: 'Maaf, terjadi kesalahan saat mencoba terhubung. Silakan coba lagi.',
            sender: 'ai'
        });
        scrollToBottom(); // Pastikan scroll ke pesan error
    }
}
// --- AKHIR CHATBOT ---
</script>

<template>
    <main>
        <button class="btn btn-success btn-lg shadow-sm mb-2" @click="openPremiumModal">
            Chatbot AI <i class="bi bi-robot"></i> </button>

        <div v-if="showPremiumModal" class="premium-modal-backdrop" @click.self="closePremiumModal">
            <div class="premium-modal-content">
                <button type="button" class="btn-close premium-modal-close" aria-label="Close"
                    @click="closePremiumModal"></button>

                <div class="chat-modal-body">
                    <h4 class="modal-title">Fitcal Chatbot AI</h4>
                    <i class="text-center mb-2">Model : Gemini 2.5 Pro</i>

                    <div class="chat-window" ref="chatWindow">
                        <div v-for="message in messages" :key="message.id"
                            :class="['chat-message', message.sender === 'user' ? 'user-message' : 'ai-message']">
                            {{ message.text }}
                        </div>
                    </div>

                    <form class="chat-input-area" @submit.prevent="sendMessage">
                        <input type="text" class="form-control" v-model="newMessage" placeholder="Ketik pesan Anda...">
                        <button type="submit" class="btn btn-primary btn-send">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </form>

                    <i class="text-center text-secondary">AI tidak bisa menggantikan saran dokter dan bisa membuat
                        kesalahan. Jadi, periksa kembali responnya</i>

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* --- STYLE MODAL LAMA (MASIH BERLAKU) --- */
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
    z-index: 1040;
}

.premium-modal-content {
    background-color: #F8F8F8;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    position: relative;
    max-width: 500px;
    width: 90%;
    /* Menambahkan properti ini agar konten chat tidak meluap */
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}

.premium-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1B4242;
}

/* --- STYLE BARU UNTUK CHATBOT --- */
.chat-modal-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* Mencegah modal body scroll, hanya chat-window */
}

.modal-title {
    color: #092635;
    font-weight: 600;
    text-align: center;
    flex-shrink: 0;
    /* Judul tidak akan mengecil */
}

.chat-window {
    flex-grow: 1;
    /* Mengisi ruang yang tersedia */
    max-height: 60vh;
    overflow-y: auto;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    /* Jarak antar gelembung chat */
    margin-bottom: 1.5rem;
    /* Jarak ke area input */
}

.chat-message {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    max-width: 80%;
    line-height: 1.4;
    word-wrap: break-word;
    white-space: pre-wrap;
    /* Memastikan teks panjang pindah baris */
}

.ai-message {
    background-color: #e9ecef;
    /* Abu-abu muda untuk AI */
    color: #092635;
    align-self: flex-start;
    /* AI di kiri */
    border-bottom-left-radius: 0.25rem;
}

.user-message {
    background-color: #1B4242;
    /* Dark Teal untuk pengguna */
    color: #ffffff;
    align-self: flex-end;
    /* Pengguna di kanan */
    border-bottom-right-radius: 0.25rem;
}

.chat-input-area {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    /* Area input tidak akan mengecil */
}

.chat-input-area .form-control {
    flex-grow: 1;
    border-radius: 0.5rem;
    border-color: #ccc;
}

.chat-input-area .form-control:focus {
    border-color: #1B4242;
    box-shadow: 0 0 0 0.2rem rgba(27, 66, 66, 0.25);
}

.btn-send {
    flex-shrink: 0;
    background-color: #5C8374;
    /* Medium Green */
    border-color: #5C8374;
    border-radius: 0.5rem;
}

.btn-send:hover {
    background-color: #1B4242;
    /* Dark Teal */
    border-color: #1B4242;
}


/* Style untuk scrollbar (diambil dari style lama Anda) */
.chat-window::-webkit-scrollbar {
    width: 8px;
}

.chat-window::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.chat-window::-webkit-scrollbar-thumb {
    background: #5C8374;
    border-radius: 10px;
}

.chat-window::-webkit-scrollbar-thumb:hover {
    background: #1B4242;
}
</style>