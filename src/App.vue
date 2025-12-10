<script setup>
import Lenis from 'lenis'
// Pastikan semua yang dibutuhkan diimpor: watch, ref, onMounted, onBeforeUnmount
import { onMounted, onBeforeUnmount, ref, watch } from 'vue' 
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import PageTransition from './components/PageTransition.vue'
// import StickyFooter from '@/components/StickyFooter.vue' 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- STATE DAN KONFIGURASI ---
const isMobile = ref(false);
const showNotice = ref(true); 
const mobileBreakpoint = 768; 
const transitionOverlay = ref(null);
let lenis = null; // Inisialisasi Lenis sebagai null

// --- FUNGSI UTILITY ---

/**
 * Menerapkan atau menghapus kelas 'scroll-lock' pada elemen <body>.
 * @param {boolean} lock - True untuk mengunci, False untuk membuka.
 */
function toggleScrollLock(lock) {
    if (typeof document !== 'undefined') {
        // Mencegah scrolling browser standar dengan menambahkan/menghapus kelas CSS
        document.body.classList.toggle('scroll-lock', lock);
    }
}

/**
 * Memeriksa lebar layar dan memperbarui isMobile.
 */
function checkDevice() {
    if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth < mobileBreakpoint;
        
        // Jika diakses dari mobile, pastikan notifikasi ditampilkan
        if (isMobile.value) {
            showNotice.value = true;
        }
        
        // Catatan: Lenis akan diurus oleh `watch` di bawah.
    }
}

/**
 * Menutup notifikasi (memungkinkan pengguna melanjutkan).
 */
function dismissNotice() {
    showNotice.value = false;
}


// --- WATCHER UNTUK PENGUNCIAN SCROLL ---

/**
 * Memantau isMobile dan showNotice untuk mengunci/membuka scroll (browser & Lenis).
 */
watch([isMobile, showNotice], ([newIsMobile, newShowNotice]) => {
    const shouldLock = newIsMobile && newShowNotice;
    
    // 1. Kunci/Buka Scrolling Browser Standar
    toggleScrollLock(shouldLock);

    // 2. Kunci/Buka Lenis Smooth Scroll
    if (shouldLock) {
        // Jika notifikasi muncul, hancurkan Lenis untuk menghentikan smooth scroll
        if (lenis) {
            lenis.destroy();
            lenis = null; // Set null agar bisa diinisialisasi ulang
        }
    } 
    // Jika tidak terkunci (notifikasi ditutup atau bukan mobile),
    // Lenis akan diinisialisasi ulang oleh `revealEnter` saat navigasi halaman.
    
}, { immediate: true }); // Jalankan segera saat komponen dimuat


// --- LOGIKA LIFECYCLE VUE ---

onMounted(() => {
    checkDevice();
    window.addEventListener('resize', checkDevice);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkDevice);
    if (lenis) {
        lenis.destroy(); 
        lenis = null; // Pastikan Lenis dihancurkan
    }
});


// --- LOGIKA TRANSISI DAN SMOOTH SCROLL (LENIS & GSAP) ---

const revealLeave = async (el, done) => {
    await transitionOverlay.value.enter()
    done()
}

const revealEnter = async (el, done) => {
    await transitionOverlay.value.leave()
    
    // Hanya jalankan Lenis + ScrollTrigger jika BUKAN Mobile DAN TIDAK ADA NOTIFIKASI
    // Pastikan tidak ada scroll lock yang aktif
    const scrollLockActive = isMobile.value && showNotice.value;
    
    if (!isMobile.value && !scrollLockActive) {
        initSmoothScroll()
    }
    done()
}

function initSmoothScroll() {
    // 1. Hentikan inisialisasi jika sudah ada 
    if (lenis) return; 
    
    // Inisialisasi Lenis
    lenis = new Lenis({ autoRaf: true });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
            // Pengecekan keamanan internal scrollerProxy (Opsional, tapi bagus)
            if (!lenis) return window.scrollY; 
            return arguments.length
                ? lenis.scrollTo(value)
                : window.scrollY;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    function raf(time) {
        if (lenis && typeof lenis.raf === 'function') { // Pengecekan fungsi raf
            lenis.raf(time); 
        }
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Pengecekan Kritis Paling Aman: Pastikan lenis dan metodenya ada
    ScrollTrigger.addEventListener("refresh", () => {
        if (lenis && typeof lenis.update === 'function') { 
            lenis.update();
        }
    });
    
    // Refresh Awal
    ScrollTrigger.refresh();
}

// --- LOGIKA ANIMASI GSAP UNTUK NOTIFIKASI ---
function onNoticeEnter(el, done) {
    gsap.from(el, {
        duration: 0.5,
        y: '-100%', 
        opacity: 0,
        ease: "power2.out",
        onComplete: done 
    });
}
function onNoticeLeave(el, done) {
    gsap.to(el, {
        duration: 0.3,
        y: '-100%',
        opacity: 0,
        ease: "power2.in",
        onComplete: done
    });
}
</script>

<template>
    <main :class="{ 'mobile-view-active': isMobile }"> 
        
        <Transition 
            name="gsap-slide" 
            @enter="onNoticeEnter" 
            @leave="onNoticeLeave" 
            :css="false"
        >
            <div v-if="isMobile && showNotice" class="desktop-only-notice">
                <h3 class="notice-title">⚠️ Attention: Optimized for Desktop</h3>
                <p class="notice-message">
                    This website is designed for the best visual experience on Laptops/Computers.
                </p>
                <button @click="dismissNotice" class="dismiss-button">Continue on Mobile (Risk of Suboptimal Display)</button>
            </div>
        </Transition>
        
        <PageTransition ref="transitionOverlay" />

        <Navbar />
        
        <div :class="{ 'content-blocked': isMobile && showNotice }">
            <RouterView v-slot="{ Component }">
                <transition 
                    :css="false" 
                    mode="out-in" 
                    @before-enter="revealEnter" 
                    @leave="revealLeave"
                >
                    <component :is="Component" :key="$route.fullPath" />
                </transition>
            </RouterView>
        </div>
    </main>
</template>

<style>
/* CSS GLOBAL/ROOT: HARUS DITARUH DI SINI ATAU DI FILE CSS GLOBAL */

/* 🔑 KELAS KRITIS UNTUK MENGUNCI SCROLL PADA BODY 🔑 */
body.scroll-lock {
    overflow: hidden !important; 
    height: 100vh;             
    /* Catatan: Karena Lenis menggunakan <html> sebagai scroller,
       Lenis sudah dimatikan di JS, tapi kelas ini penting untuk
       kasus fallback atau saat Lenis dimatikan. */
}
</style>


<style scoped>
/* STYLING UNTUK NOTIFIKASI */
.desktop-only-notice {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background-color: #f7a049; 
    color: #333;
    text-align: center;
    z-index: 2000; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notice-title {
    margin-top: 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.notice-message {
    margin-bottom: 0;
}

.dismiss-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.dismiss-button:hover {
    background-color: #555;
}

/* Efek visual saat notifikasi muncul dan scroll terkunci */
.content-blocked {
    filter: blur(2px);
    pointer-events: none; /* Mencegah klik di konten utama */
    transition: filter 0.3s;
}

/* Kode Anda yang sudah ada */
@media (min-width: 1024px) {
    
}
</style>