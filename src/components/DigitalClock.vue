<template>
  <div class="clock-container">
    <div class="analog-dial">
      <div id="hour-hand" class="hand"></div>
    </div>
    <div class="clock-info">
      <h5 class="current-location">CURRENTLY IN {{ timezoneName }} - {{ gmtOffset }} {{ currentTime }}</h5>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- Variabel Reaktif ---
// Waktu yang akan ditampilkan (misalnya: 10:44 AM)
const currentTime = ref(''); 
// Nama Zona Waktu (misalnya: Jakarta)
const timezoneName = ref('JAKARTA'); 
// Offset GMT (misalnya: GMT+7)
const gmtOffset = ref('GMT+7'); 

let timerId = null; // ID untuk fungsi setInterval

// --- Fungsi Update Waktu ---
const updateTime = () => {
  const now = new Date();
  
  // Opsi format waktu lokal
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true // Menggunakan format AM/PM
  };
  
  // Mendapatkan waktu yang diformat
  currentTime.value = now.toLocaleTimeString('en-US', timeOptions); 
  
  // Catatan: Mendapatkan nama kota dan offset GMT secara dinamis lebih kompleks
  // dan seringkali membutuhkan library atau API. Untuk kesederhanaan,
  // nilai "Jakarta" dan "GMT+7" diatur statis sesuai gambar.
};

// --- Lifecycle Hooks ---

// Dipanggil saat komponen dipasang ke DOM
onMounted(() => {
  // Panggil updateTime sekali segera
  updateTime();
  // Set interval untuk mengupdate waktu setiap 1000 milidetik (1 detik)
  timerId = setInterval(updateTime, 1000);
});

// Dipanggil saat komponen dilepas dari DOM
onUnmounted(() => {
  // Bersihkan interval untuk mencegah kebocoran memori
  clearInterval(timerId);
});

// --- Integrasi GSAP (Opsional) ---
// Jika Anda ingin menganimasikan tampilan awal (misalnya fade-in), Anda bisa
// menggunakan hook onMounted dan library GSAP.
// import { gsap } from 'gsap';

// onMounted(() => {
//   gsap.from(".clock-info", { opacity: 0, y: 20, duration: 1, ease: "power2.out" });
// });

</script>

<style scoped>
/* Styling dasar agar mirip dengan gambar yang Anda berikan */
.clock-container {
  display: flex;
  align-items: center;
  /* Anda bisa menambahkan elemen jam analog di sini jika ingin */
  /* color: white; */
  /* background-color: #000; Latar belakang hitam */
  /* padding: 10px; */
}

.clock-info {
  /* margin-left: 20px; */
}

.current-location {
  /* font-size: 14px; */
  margin: 0;
  /* opacity: 0.8; Sedikit lebih redup dari waktu */
  font-weight: 300;
}

.current-time {
  font-size: 32px;
  margin: 0;
  font-weight: 400;
  line-height: 1;
}
</style>