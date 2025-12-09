<template>
  <div>
    <!-- <div class="content-spacer">
        <p>Scroll ke bawah untuk melihat tombol!</p>
    </div> -->

    <button
      v-show="isButtonVisible"
      ref="scrollButton"
      class="scroll-to-top-button bg-[#bbbbbb76] dark:bg-[#222222aa] text-[#0f0f0f] dark:text-[#f5f5f5]"
      @click="scrollToTop"
      
    >
      ↑ Back to top
    </button>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ScrollButton',
  data() {
    return {
      isButtonVisible: false, // Digunakan untuk mengontrol visibilitas dasar
    };
  },
  mounted() {
    this.setupScrollTrigger();
  },
  methods: {
    setupScrollTrigger() {
      // Dapatkan referensi ke elemen tombol
      const button = this.$refs.scrollButton;

      // 1. Inisialisasi posisi awal (sebelum muncul)
      gsap.set(button, {
        opacity: 0,
        y: 100, // Tombol berada 100px di bawah posisi akhir
      });

      // 2. Tentukan logika kemunculan menggunakan ScrollTrigger
      ScrollTrigger.create({
        trigger: document.body, // Memantau scroll pada seluruh body
        start: 'top -300px', // Tombol muncul setelah scroll melewati 300px dari atas
        markers: false,
        // end: 'bottom 100px', // Opsional: Tombol menghilang saat mendekati bawah
        onEnter: () => {
          // Ketika kondisi start terpenuhi (scroll melewati 300px)
          this.isButtonVisible = true; // Munculkan elemen secara dasar
          gsap.to(button, {
            opacity: 1,
            y: 0, // Animasikan ke posisi normal (y=0)
            duration: 0.5,
            ease: 'back.out(1.7)',
          });
        },
        onLeaveBack: () => {
          // Ketika kondisi kembali ke atas (scroll kembali ke 300px dari atas)
          gsap.to(button, {
            opacity: 0,
            y: 100, // Animasikan kembali ke bawah dan menghilang
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              this.isButtonVisible = false; // Sembunyikan elemen setelah animasi selesai
            },
          });
        },
      });
    },
    scrollToTop() {
      // Fungsi untuk kembali ke atas dengan animasi smooth
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
/* Area konten yang tinggi untuk memungkinkan scrolling */ /* Tinggi 200% dari viewport agar bisa di-scroll */
/* .content-spacer {
  height: 200vh; 
  background-color: #f4f4f9;
  padding: 20px;
  text-align: center;
} */

/* Styling untuk Tombol */
.scroll-to-top-button {
  position: fixed; /* Penting agar tombol tetap di tempat */
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  /* background-color: #007bff; */
  /* color: white; */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Penting: Hapus transisi CSS karena kita akan menggunakan GSAP */
  /* transition: opacity 0.3s, transform 0.3s; */
}
</style>