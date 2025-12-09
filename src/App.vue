<script setup>
import Lenis from 'lenis'
import { onMounted, onBeforeUnmount, ref } from 'vue' // Impor ref dan onBeforeUnmount
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import PageTransition from './components/PageTransition.vue'
// import StickyFooter from '@/components/StickyFooter.vue' // Saat ini dikomentari
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- LOGIKA DETEKSI PERANGKAT BARU ---

// State untuk menyimpan status perangkat dan tampilan notifikasi
const isMobile = ref(false);
const showNotice = ref(true); // Mulai dengan notifikasi ditampilkan
const mobileBreakpoint = 768; // Definisikan batas lebar (misalnya, di bawah 768px dianggap ponsel)

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
    
    // Opsional: Hentikan Smooth Scroll (Lenis/GSAP) jika di Mobile
    if (isMobile.value && lenis) {
      lenis.destroy();
    } else if (!isMobile.value && !lenis) {
      // Re-initialize Smooth Scroll hanya jika belum diinisialisasi dan bukan mobile
      // initSmoothScroll(); // Hati-hati: ini bisa menyebabkan inisialisasi ganda. Kita akan panggil di revealEnter.
    }
  }
}

/**
 * Menutup notifikasi (memungkinkan pengguna melanjutkan, meskipun tidak disarankan).
 */
function dismissNotice() {
  showNotice.value = false;
}

onMounted(() => {
  // Panggil saat komponen pertama kali dimuat
  checkDevice();
  // Tambahkan listener untuk memantau perubahan ukuran layar
  window.addEventListener('resize', checkDevice);
});

onBeforeUnmount(() => {
  // Hapus listener saat komponen dihapus
  window.removeEventListener('resize', checkDevice);
  if (lenis) {
    lenis.destroy(); // Pastikan Lenis dihancurkan untuk membersihkan memory
  }
});

// --- AKHIR LOGIKA DETEKSI PERANGKAT BARU ---


// --- LOGIKA TRANSISI DAN SMOOTH SCROLL (Kode Anda yang sudah ada) ---

const transitionOverlay = ref(null);

let lenis;

const revealLeave = async (el, done) => {
  await transitionOverlay.value.enter()
  done()
}

const revealEnter = async (el, done) => {
  await transitionOverlay.value.leave()
  // Hanya jalankan Lenis + ScrollTrigger jika BUKAN Mobile (sesuai logika deteksi)
  if (!isMobile.value) {
      initSmoothScroll()
  }
  done()
}

function initSmoothScroll() {
  // Hentikan inisialisasi jika sudah ada atau jika sedang dalam mode mobile
  if (lenis || isMobile.value) return; 
  
  lenis = new Lenis({ autoRaf: true });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
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
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  ScrollTrigger.addEventListener("refresh", () => lenis.update());
  ScrollTrigger.refresh();
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
          This website is designed for the best visual experience on **Laptops/Computers**. The Smooth Scroll feature (Lenis/GSAP) has been disabled on mobile devices.
        </p>
        <button @click="dismissNotice" class="dismiss-button">Continue on Mobile (Risk of Suboptimal Display)</button>
      </div>
    </Transition>
    <PageTransition ref="transitionOverlay" />

    <Navbar />
    <div :class="{ 'content-blocked': isMobile && showNotice }">
      <RouterView v-slot="{ Component }">
        <transition :css="false" mode="out-in" @before-enter="revealEnter" @leave="revealLeave">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </RouterView>
      </div>
  </main>
</template>

<script>
// --- LOGIKA ANIMASI GSAP UNTUK NOTIFIKASI ---
// Tambahkan ini di luar <script setup> atau definisikan methods di <script setup>
// Saya akan definisikan dalam <script setup> untuk kesederhanaan.

// Tambahkan methods ini ke dalam <script setup> di atas:
/*
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
*/
// Pastikan dua fungsi di atas (onNoticeEnter dan onNoticeLeave) ditambahkan ke dalam <script setup>!
</script>


<style scoped>
/* STYLING UNTUK NOTIFIKASI */
.desktop-only-notice {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #f7a049; /* Warna Peringatan */
  color: #333;
  text-align: center;
  z-index: 2000; /* Pastikan di atas PageTransition dan Navbar */
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

/* Opsional: Efek visual saat notifikasi muncul */
.content-blocked {
  /* Menggeser konten ke bawah sedikit (opsional, tergantung desain Navbar Anda) */
  /* margin-top: 60px; */ 
  
  /* Efek blur pada konten utama saat notifikasi aktif */
  filter: blur(2px);
  pointer-events: none; /* Mencegah klik di konten utama */
  transition: filter 0.3s;
}

/* Kode Anda yang sudah ada */
@media (min-width: 1024px) {
  
}
</style>