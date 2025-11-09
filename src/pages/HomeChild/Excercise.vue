<script setup>
import { ref, computed } from 'vue';
import NotLoginYet from '@/components/NotLoginYet.vue';

const statusLogin = computed(() => localStorage.getItem("isLogin") === "true"); // Mendapatkan status login, output: boolean

// TEMPAT DATA-DATA EXERCISE
const videoInfo = ref({
    embedUrl: "https://www.youtube.com/embed/KeNObkhENKQ?start=1&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ", // link default
    introLink1: "https://www.youtube.com/embed/KeNObkhENKQ?start=6&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ",
    introLink2: "https://www.youtube.com/embed/KeNObkhENKQ?start=413&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ",
    exercises: [
        { id: 1, name: 'Jumping Jacks', desc: 'Gerakan seluruh tubuh yang berfokus pada koordinasi dan daya tahan, yang dapat digunakan sebagai pemanasan atau elemen pelatihan utama.', time: '[00:28]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=28&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 2, name: 'Pike Walks', desc: 'Menargetkan bahu dan inti tubuh (core), juga berfungsi sebagai dasar untuk latihan handstand.', time: '[00:51]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=51&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 3, name: 'Push-ups', desc: 'Latihan beban tubuh fundamental untuk dada, bahu, dan trisep, dengan banyak progresi untuk semua tingkat kebugaran.', time: '[01:32]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=92&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 4, name: 'Side Plank Raises', desc: 'Berfokus pada obliques (otot perut samping), serta abduktor dan adduktor pinggul.', time: '[02:06]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=126&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 5, name: 'Knee Raises', desc: 'Menggabungkan latihan perut dengan kekuatan penopang, menargetkan trisep, bahu, dan traps bagian bawah. Disarankan menggunakan dua kursi.', time: '[02:38]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=158&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 6, name: 'Rows', desc: 'Latihan punggung komprehensif yang juga bermanfaat bagi lengan. Ini membutuhkan beberapa bentuk perabotan yang stabil. Alternatif jika tidak ada perabotan yang cocok adalah rear dead press [03:58].', time: '[03:18]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=198&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 7, name: 'Swimmers', desc: 'Latihan yang menargetkan punggung (kecuali lats), glutes, dan hamstring, serta membantu melawan postur bungkuk.', time: '[04:06]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=246&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 8, name: 'Easy or Reverse Plank Bridge', desc: 'Melatih hampir seluruh rantai posterior (bagian belakang tubuh) dan meningkatkan mobilitas bahu.', time: '[04:46]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=286&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 9, name: 'Squats', desc: 'Latihan yang wajib dilakukan untuk paha depan, glutes, dan hamstring yang juga meningkatkan mobilitas pergelangan kaki, pinggul, dan tulang belakang.', time: '[05:28]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=328&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
        { id: 10, name: 'Lunges', desc: 'Gerakan unilateral (fokus pada satu kaki pada satu waktu) yang melatih paha depan, hamstring, dan glutes sambil mengembangkan koordinasi dan stabilitas.', time: '[06:01]', url: 'https://www.youtube.com/embed/KeNObkhENKQ?start=361&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ' },
    ],
    conclusionLink1: 'https://www.youtube.com/embed/KeNObkhENKQ?start=399&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ',
    conclusionLink2: 'https://www.youtube.com/embed/KeNObkhENKQ?start=445&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ',
    conclusionLink3: 'https://www.youtube.com/embed/KeNObkhENKQ?start=452&autoplay=1&mute=1&si=yzaD8bbWqHY12CCQ',
    finalLink: 'http://www.youtube.com/watch?v=KeNObkhENKQ'
});

// FUNGSI UNTUK TIMESTAMP VIDEO
function timestamp(url) {
    videoInfo.value.embedUrl = url;
}
</script>

<template>
    <main>
        <div v-if="statusLogin" class="exercise-template">
            <div class="container py-5">

                <h1 class="display-4 fw-bold mb-3 text-center main-title">
                    TOP 10 Latihan untuk Bugar di Rumah!
                </h1>

                <p class="lead text-center mb-4 intro-text">
                    Video ini menyajikan 10 latihan yang dapat Anda lakukan di rumah agar bugar dengan sedikit atau
                    tanpa
                    peralatan, sebagian besar mengandalkan perabotan Anda sendiri
                    <button type="button" @click="timestamp(videoInfo.introLink1)" class="video-link fw-medium">
                        [00:06]
                    </button>.
                    Latihan-latihan ini dipilih karena komprehensif dan merupakan gerakan multi-sendi
                    <button type="button" @click="timestamp(videoInfo.introLink2)" class="video-link fw-medium">
                        [06:53]
                    </button>.
                </p>

                <div class="ratio ratio-16x9 mb-5 shadow-sm rounded overflow-hidden video-embed">
                    <iframe width="560" height="315" :src="videoInfo.embedUrl" :title="videoInfo.title"
                        :key="videoInfo.embedUrl" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

                <hr class="my-4" style="color: var(--color-medium);">

                <h2 class="mb-4 section-title">Top 10 Latihan:</h2>
                <div class="row g-4">
                    <div class="col-md-6" v-for="(exercise, index) in videoInfo.exercises" :key="exercise.id">
                        <div class="card h-100 shadow-sm exercise-card">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">
                                    {{ index + 1 }}. <i>{{ exercise.name }}</i>
                                </h5>
                                <p class="card-text">
                                    {{ exercise.desc }}
                                    <button type="button" @click="timestamp(exercise.url)" class="video-link fw-medium">
                                        {{ exercise.time }}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-5 p-4 rounded conclusion-box">
                    <p class="mb-2">
                        Video ini juga menyertakan beberapa "honorable mentions"
                        <button type="button" @click="timestamp(videoInfo.conclusionLink1)"
                            class="video-link fw-medium">
                            [06:39]
                        </button>
                        dan menyediakan contoh rutinitas latihan seluruh tubuh menggunakan latihan-latihan ini,
                        dengan tautan ke ikhtisar lengkap dan video untuk diikuti
                        <button type="button" @click="timestamp(videoInfo.conclusionLink2)"
                            class="video-link fw-medium">
                            [07:25]
                        </button>,
                        <button type="button" @click="timestamp(videoInfo.conclusionLink3)"
                            class="video-link fw-medium">
                            [07:32]
                        </button>.
                    </p>
                </div>

                <div class="text-center mt-5">
                    <a :href="videoInfo.finalLink" target="_blank" class="btn btn-primary btn-lg watch-video-btn">
                        Buka Video di YouTube
                    </a>
                </div>

            </div>
        </div>

        <div v-else>
            <NotLoginYet />
        </div>
    </main>
</template>

<style scoped>
/* Mendefinisikan Variabel Warna dari Palet Anda */
:root {
    --color-light: #9EC8B9;
    --color-medium: #5C8374;
    --color-dark: #1B4242;
    --color-darkest: #092635;
    --color-bg: #f8f9fa;
    /* Latar belakang netral yang sangat terang */
}

/* Menerapkan palet ke templat */
.exercise-template {
    background-color: var(--color-bg);
    color: var(--color-darkest);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.main-title,
.section-title {
    color: var(--color-dark);
}

.intro-text {
    color: #343a40;
    /* Sedikit lebih gelap dari teks biasa agar menonjol */
}

.video-link {
    color: var(--color-medium);
    text-decoration: none;
    font-weight: 500;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}

.video-link:hover {
    color: var(--color-dark);
    text-decoration: underline;
}

/* Kustomisasi Video Embed */
.video-embed {
    border: 1px solid var(--color-light);
}

/* Kustomisasi Kartu Latihan */
.exercise-card {
    border: 1px solid var(--color-light);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.exercise-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.exercise-card .card-title {
    color: var(--color-dark);
}

.exercise-card .card-body {
    background-color: #ffffff;
}

/* Kotak Kesimpulan */
.conclusion-box {
    background-color: var(--color-light);
    color: var(--color-darkest);
    border: 1px solid var(--color-medium);
}

.conclusion-box .video-link {
    color: var(--color-dark);
    font-weight: bold;
}

/* Tombol CTA (Call to Action) */
.watch-video-btn {
    background-color: var(--color-medium);
    border-color: var(--color-medium);
    color: black;
    padding: 12px 24px;
    font-weight: 600;
    transition: background-color 0.2s, border-color 0.2s;
}

.watch-video-btn:hover {
    background-color: red;
    border-color: red;
}
</style>