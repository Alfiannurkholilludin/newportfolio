<template>
    <section ref="scrollSection" class="scroll-container">
        <div ref="horizontalWrapper" class="horizontal-wrapper">
            <div 
                v-for="(panel, index) in panels" 
                :key="index" 
                class="panel"
                :class="`bg-${panel.color}`"
            >
                <h2>{{ panel.title }}</h2>
                <p>{{ panel.content }}</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Container Pemicu Scroll Vertikal */
.scroll-container {
    height: 400vh; /* Contoh: Memberikan ruang scroll 3x viewport */
    /* background-color: #000; */
}

/* Wrapper yang akan digeser Horizontal */
.horizontal-wrapper {
    display: flex;
    /* PENTING: Gunakan position: sticky; agar wrapper tetap di viewport */
    position: sticky; 
    top: 0;
    /* Tinggi 100vh agar wrapper mengisi layar penuh */
    height: 100vh;
    padding: 0 5vw; /* Padding agar panel tidak terlalu mepet */
}

/* Setiap Panel Konten */
.panel {
    flex-shrink: 0; /* Penting agar panel tidak mengecil */
    width: 100vw; /* Lebar setiap panel */
    height: 100vh; /* Tinggi panel */
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* color: white; */
    font-size: 1.5rem;
    border-radius: 12px;

}

/* Contoh Warna Panel */
.bg-red { background-color: transparent; }
.bg-blue { background-color: transparent; }
.bg-green { background-color: transparent; }
.bg-purple { background-color: transparent; }
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- State dan Ref ---
const scrollSection = ref(null); // Ref untuk section luar (trigger)
const horizontalWrapper = ref(null); // Ref untuk div yang digeser
const panels = [
    { title: "Panel 1", content: "Mulai Geser...", color: "red" },
    { title: "Panel 2", content: "Animasi Horizontal", color: "blue" },
    { title: "Panel 3", content: "Konten Kedua", color: "green" },
    { title: "Panel 4", content: "Selesai Geser!", color: "purple" },
];

let horizontalScrollTL = null; // Timeline untuk menyimpan animasi

// --- Fungsi Animasi ---
const setupHorizontalScroll = () => {
    // Pastikan elemen DOM sudah ada
    if (!scrollSection.value || !horizontalWrapper.value) return;

    // Hitung lebar yang harus digeser
    // Lebar total horizontal wrapper
    const totalWidth = horizontalWrapper.value.scrollWidth;
    // Lebar viewport
    const viewportWidth = window.innerWidth; 
    // Target pergeseran (scrollWidth dikurangi viewportWidth)
    const endPosition = totalWidth - viewportWidth; 
    
    // 1. Buat Timeline
    horizontalScrollTL = gsap.timeline({
        scrollTrigger: {
            trigger: scrollSection.value,
            // Mulai Pin/Animasi: Saat bagian atas trigger menyentuh atas viewport
            start: "top top",
            // Akhir Animasi: Saat bagian bawah trigger menyentuh atas viewport (atau jarak tertentu)
            // Di sini kita gunakan jarak scroll yang setara dengan 300vh - 100vh = 200vh
            end: () => "+=" + (scrollSection.value.offsetHeight - window.innerHeight), 
            pin: true, // PIN section agar tetap di tempat saat scrolling
            scrub: 1, // Kaitkan scroll 1:1 dengan kemajuan timeline (gunakan 1 untuk sedikit smoothing)
            // markers: true, // Hapus atau jadikan komentar setelah selesai debug
        }
    });

    // 2. Tambahkan animasi pergeseran ke timeline
    // Geser horizontalWrapper sejauh 'endPosition'
    horizontalScrollTL.to(horizontalWrapper.value, {
        x: -endPosition, // Pindah ke kiri
        ease: "none", // Tidak perlu ease agar pergeseran mulus dengan scroll
    });
};

onMounted(() => {
    // ScrollTrigger memerlukan DOM yang sudah ter-render sepenuhnya. 
    // Menggunakan setTimeout seringkali lebih aman di lingkungan Vue.
    setTimeout(setupHorizontalScroll, 100);
});

onUnmounted(() => {
    // Hapus ScrollTrigger saat komponen dihancurkan (penting untuk SPA)
    if (ScrollTrigger.getById("horizontal-scroll")) {
        ScrollTrigger.getById("horizontal-scroll").kill();
    }
});
</script>