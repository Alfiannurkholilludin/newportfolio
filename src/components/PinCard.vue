<template>
    <section class="h-[300vh] w-full pt-20"> <div class="pin-section flex items-start">
            <div class="pin-left w-full">
                <h1 ref="headingRef" class="text-5xl pr-4">A few words about me</h1> 
            </div>
            <div class="pin-right flex flex-col gap-4 w-full">
                <h2 
                    v-for="(text, index) in paragraphs" 
                    :key="index" 
                    :ref="el => setParagraphRef(el, index)"
                    class="text-justify text-xl overflow-hidden" 
                >
                    {{ text }}
                </h2>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* CSS Tambahan */
.pin-section {
    padding: 0 5%; 
    /* Tidak perlu position: sticky; jika menggunakan GSAP pin: true */
}
/* Pastikan SplitText Lines tersembunyi di awal */
.split-line {
    overflow: hidden; 
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin( ScrollTrigger, SplitText);

// --- State dan Ref ---
const headingRef = ref(null); 
const paragraphRefs = ref([]); 

// Data Paragraf (tetap)
const paragraphs = [
    "Over the past 3 years I have worked with numerous clients across various industries, helping them bring their visions to life through innovative design solutions. My journey has been marked by continuous learning and adaptation, allowing me to stay ahead in the ever-evolving design landscape. In my spare time I enjoy learn interior design and motorcycle adventures.",
    "Throughout my career, I have had the privilege of working with top-tier companies and have been recognized for my contributions to the field of design. My work has been featured in several industry publications, and I have been invited to speak at numerous conferences and workshops. I am committed to pushing the boundaries of design and continuously strive to deliver exceptional results for my clients.",
    "I am always exploring new design trends and technologies to enhance my skills and deliver cutting-edge solutions. My goal is to create designs that not only meet the needs of my clients but also inspire and engage their audiences."
];

// Fungsi untuk menyimpan ref dari elemen v-for ke array (tetap)
const setParagraphRef = (el, index) => {
    if (index === 0) {
        paragraphRefs.value = [];
    }
    if (el) {
        paragraphRefs.value[index] = el;
    }
};

// --- Logika Animasi GSAP DENGAN ScrollTrigger ---
const setupScrollTrigger = () => {
    // Pastikan H1 ada dan semua paragraf ref sudah terisi
    if (!headingRef.value || paragraphRefs.value.length !== paragraphs.length) return;

    // 1. Buat Timeline animasi (SAMA seperti sebelumnya)
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

    // Animasi reveal H1
    const splitHeading = new SplitText(headingRef.value, { type: "words", wordsClass: "split-word" });
    tl.from(splitHeading.words, {
        y: 40, 
        opacity: 0, 
        stagger: 0.05 
    }, 0); 

    // Animasi H2 (Paragraf)
    paragraphRefs.value.forEach((el, index) => {
        if (el && el instanceof Element) {
            gsap.set(el, { overflow: "hidden" }); 
            const splitParagraph = new SplitText(el, { type: "lines", linesClass: "split-line" });
            
            tl.from(splitParagraph.lines, {
                yPercent: 100, 
                duration: 0.8,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.08, 
            }, `start+=${index * 0.4}`); // Gunakan label relatif
        }
    });

    // 2. Gabungkan Timeline dengan ScrollTrigger
    ScrollTrigger.create({
        // Tentukan elemen mana yang akan di-pin (ditahan)
        trigger: ".pin-section", 
        // Waktu mulai (misalnya: saat bagian atas trigger mencapai bagian atas viewport)
        start: "top 15%", 
        // Waktu berakhir. Total durasi harus cukup untuk semua animasi.
        // Kita bisa atur ini agar *pin-section* bertahan selama 3000px di-scroll.
        end: "+=1200", 
        // Pin elemen saat trigger aktif
        pin: true, 
        // Kaitkan timeline yang sudah dibuat dengan ScrollTrigger
        animation: tl, 
        // Opsional: untuk debug
        // markers: true, 
        scrub: 1, // Hubungkan scroll 1:1 dengan kemajuan timeline (gunakan 1 untuk sedikit kelambatan/smoothing)
    });
};

onMounted(() => {
    // Fungsi untuk memanggil ScrollTrigger setup setelah DOM dimuat
    const initScrollAnimation = () => {
        // Cek apakah semua ref untuk paragraf sudah terisi sesuai jumlah data
        if (paragraphRefs.value.length === paragraphs.length) {
            setupScrollTrigger();
        } else {
            // Coba lagi jika ref belum lengkap
            setTimeout(initScrollAnimation, 100); 
        }
    };

    // Panggil fungsi inisialisasi
    setTimeout(initScrollAnimation, 500);
});
</script>