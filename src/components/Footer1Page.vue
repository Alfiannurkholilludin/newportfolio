<template>
    <section class="p-20">
        <div>
            <div class="wrapper-text-r flex flex-col items-end mb-16 gap-8">
                <a href="mailto:alfiannurkholilludin@gmail.com" class="teks-hover text-4xl">alfiannurkholilludin@gmail.com</a>
                <div :class="{'flex gap-4 items-end': true}">
                    <a href="" class="teks-hover text-2xl">Instagram <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                    <a href="" class="teks-hover text-2xl">Facebook <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                    <a href="" class="teks-hover text-2xl">Telegram <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                </div>
            </div>
        </div>
        <div class="wrapper-text-c flex items-center justify-between pt-20 pb-20">
            <a href="#" class="teks-hover">[ BEHANCE ]</a>
            <a href="#" class="teks-hover">[ DRIBBBLE ]</a>
            <a href="#" class="teks-hover">[ LINKEDIN ]</a>
        </div>
        <div class="wrapper-text-b h-[40vh]">
            <div class="content-wrapper">
                <h1 class="split">Alfian Nur</h1>
            </div>
        </div>
        <div class="wrapper-text-d flex justify-between items-center pt-20">
            <DigitalClock />
            <h5>© All right reserved.<br>2025 Alfian Nur</h5>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Asumsikan SplitText sudah diimpor dan terdaftar
// Jika menggunakan modul, impor mungkin terlihat seperti ini:
import { SplitText } from 'gsap/SplitText';
import DigitalClock from './DigitalClock.vue';

gsap.registerPlugin(ScrollTrigger, SplitText);

onMounted(() => {
  const mySplitText = new SplitText(".split", { type: "chars" });
  const chars = mySplitText.chars; // Array dari elemen karakter

  gsap.from(chars, {
    yPercent: 100,
    stagger: {
        each: 0.08,
        from: "center"
    },
    ease: "power2.out",
    duration: 2,
    scrollTrigger: {
      trigger: ".split",
      start: "top 100%",
        end: "bottom 50%",
      toggleActions: 'play none none reverse',
      markers: false,
      scrub: 0.5,
    },
  });
});

</script>

<style scoped>
/* --- STYLE ANIMASI --- */
/* section {
    height: 100vh;
    margin-top: 20vh;
    background-color: antiquewhite;
} */

.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* border: solid 2px black; */
    padding-top: 3rem;
}

.split {
    font-size: 20vw;
    font-family: "SFPRODISPLAYBOLD", sans-serif;
    margin: 0;
    line-height: 0.8;
}

.teks-hover {
    /* font-size: 80px; */
    font-family: "SFPRODISPLAYREGULER", sans-serif;
    /* color: black; */
    text-decoration: none;
    cursor: pointer;
    
    position: relative; /* Penting untuk penempatan garis bawah */
    display: inline-block; /* Penting agar '::after' berfungsi dengan baik */
}

/* Membuat elemen garis bawah terpisah */
.teks-hover::after {
    content: '';
    position: absolute;
    width: 100%; /* Lebar garis penuh */
    transform: scaleX(0); /* Awalnya garis tidak terlihat (skala 0) */
    height: 3px; /* Ketebalan garis */
    bottom: -5px; /* Jarak garis dari teks */
    left: 0;
    background-color: #fff; /* Warna garis */
    transform-origin: bottom right;
    transition: transform 0.5s ease-out; /* Animasi munculnya garis */
}

/* Saat di-hover */
.teks-hover:hover::after {
    transform: scaleX(1); /* Garis memanjang hingga terlihat penuh (skala 1) */
    transform-origin: bottom left;
}

</style>