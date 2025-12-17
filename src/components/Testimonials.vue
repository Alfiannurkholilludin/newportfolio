<template>
  <div class="testimonial-section">
    <h2 class="testimonial-title">One love for 1UP</h2>
    <div class="card-stack-container">
      <div 
        v-for="(testimonial, index) in testimonials" 
        :key="index" 
        class="testimonial-card"
        :data-index="index"
      >
        <p class="quote">"{{ testimonial.quote }}"</p>
        <div class="author-info">
          <span class="name">{{ testimonial.name }}</span>
          <span class="company">{{ testimonial.company }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  data() {
    return {
      testimonials: [
        { 
          name: 'Arrio Saputra', 
          company: 'Fullstack Developer at PT Bali Towerindo Sentra Tbk', 
          quote: 'I strongly endorse Alfian Nur Kholilludin as a UI/UX Designer for website design projects on Linkedin. His exceptional design skills, meticulous attention to detail and user-focused approach have consistently.' 
        },
        { 
          name: 'Fajar Agus Maulana', 
          company: 'Fullstack Developer have worked at PT Bali Towerindo Sentra Tbk', 
          quote: 'Alfian is an exceptional UI/UX Designer with a keen eye for detail and a deep understanding of user experience principles. Their designs are not only visually appealing but also highly functional.' 
        },
        { 
          name: 'Ero Dwi Nawa', 
          company: 'Director at PT Motekar Digital Kreasi', 
          quote: 'I had the pleasure of working with Alfian Nur Kholilludin on several UI/UX design projects, and I can confidently say that he is one of the most talented designers I have ever worked with. His ability to understand user needs and translate them into intuitive and visually appealing designs is truly impressive.' 
        }
      ],
      // Variabel untuk melacak kartu yang aktif/dianimasi
      cardElements: null
    };
  },
  mounted() {
    this.cardElements = this.$el.querySelectorAll('.testimonial-card');
    this.setupScrollAnimation();
  },
  methods: {
        setupScrollAnimation() {
            const cards = this.cardElements;
            if (cards.length < 2) return;

            // Jarak yang dihasilkan dari pergeseran setiap kartu
            const overlapDistance = 150; 
            
            // Perpanjang 'end' untuk membuat animasi lebih lambat dan smooth
            const totalDuration = cards.length * overlapDistance; 

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".card-stack-container",
                    pin: true, 
                    start: "20% center", 
                    markers: false,
                    end: `+=${totalDuration}`, // Durasi gulir kini dinamis
                    scrub: 1, // Pertahankan scrub untuk kehalusan
                }
            });
            
            // Loop untuk menganimasikan perpindahan (popping out) setiap kartu
            cards.forEach((card, index) => {
                const zIndex = cards.length - index; // Z-index yang lebih tinggi saat kartu bergerak ke depan
                
                // Animasi untuk setiap kartu saat ia 'keluar' dari tumpukan
                tl.to(card, {
                    // Geser ke atas dan sedikit ke luar dari tumpukan
                    y: index * -20, // Offset Y akhir (sedikit menumpuk ke atas)
                    scale: 1, // Pastikan kartu yang aktif skalanya penuh
                    opacity: 1, // Pastikan kartu aktif terlihat penuh
                    zIndex: zIndex * 2, // Dorong z-index ke depan saat kartu aktif
                    duration: 1.5, // Durasi yang lebih panjang di timeline untuk kehalusan
                    ease: "power2.inOut"
                }, 
                // Gunakan posisi relatif: Animasi dimulai setelah yang sebelumnya berjalan sebagian
                index > 0 ? `<+=${overlapDistance / 1000}` : 0 // Jeda waktu antara perpindahan kartu
                );

                // Setelah kartu ini menjadi fokus, geser kartu ke atas dan hilangkan
                if (index < cards.length - 1) {
                    tl.to(card, {
                        y: "-100%", // Geser kartu yang sudah dibaca ke atas
                        opacity: 0,
                        duration: 1,
                        ease: "power2.in",
                    }, 
                    `+=${overlapDistance / 2000}` // Sedikit jeda sebelum kartu menghilang
                    );
                }
            });
        }
    }
};
</script>

<style scoped>
.testimonial-section {
    width: 100%;
    padding: 50px 0;
    /* background-color: antiquewhite; */
    min-height: 100vh; /* Agar ada ruang untuk menggulir */
}

.testimonial-title {
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 40px;
    font-family: 'SFPRODISPLAYBOLD', sans-serif;
    font-weight: 600;
    /* color: #0f0f0f; */
}

.card-stack-container {
  position: relative;
  /* background-color: antiquewhite; */
  height: 400px; /* Tinggi tumpukan kartu */
  max-width: 600px;
  margin: 50px auto;
  /* Tambahkan overflow: hidden jika tidak ingin bayangan kartu bawah terlihat */
  /* overflow: hidden; */ 
}

.testimonial-card {
  position: absolute; /* Kunci penumpukan */
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  /* background-color: #ffffff; */
  border-radius: 12px;
  /* box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); Bayangan sedikit lebih kuat */
  box-sizing: border-box;
  
  /* Styling Transisi Awal untuk semua kartu (dapat diabaikan, GSAP akan mengambil alih) */
  will-change: transform, opacity;
}

/* **OPTIMASI UTAMA DI SINI:** Mengatur posisi tumpukan kartu awal */
.testimonial-card:not(:first-child) {
    /* Setiap kartu di belakang sedikit diperkecil dan digeser ke bawah */
    /* Ini memberikan efek kedalaman sebelum ScrollTrigger aktif */
    transform: translateY(10px) scale(0.98); 
    opacity: 0; 
    z-index: 5; /* Z-index lebih rendah untuk kartu di belakang */
    pointer-events: none; /* Nonaktifkan interaksi pada kartu di belakang */
}

/* Kartu yang paling bawah akan memiliki z-index terendah */
.testimonial-card:last-child {
    transform: translateY(20px) scale(0.95); 
    opacity: 0;
    z-index: 1; 
}

/* Kartu paling depan */
.testimonial-card:first-child {
    z-index: 10;
}

/* Styling konten */
.quote {
    /* color: #0f0f0f; */
  font-style: italic;
  font-size: 1.1em;
  margin-bottom: 20px;
}

.author-info .name {
  font-weight: bold;
  display: block;
}
</style>