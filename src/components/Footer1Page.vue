<template>
    <section>
        <div>
            <div class="wrapper-text-r flex flex-col items-end pr-20 mb-16 gap-8">
                <a href="mailto:alfiannurkholilludin@gmail.com" class="text-4xl">alfiannurkholilludin@gmail.com</a>
                <div :class="{'flex gap-4 items-end': true}">
                    <a href="" class="teks-hover text-2xl">Instagram <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                    <a href="" class="teks-hover text-2xl">Facebook <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                    <a href="" class="teks-hover text-2xl">Telegram <i class='bx-fw bx-arrow-up-right-stroke'></i></a>
                </div>
            </div>
        </div>
        <div class="wrapper-text-c flex items-center justify-between p-20">
            <a href="#">[ BEHANCE ]</a>
            <a href="#">[ DRIBBBLE ]</a>
            <a href="#">[ LINKEDIN ]</a>
        </div>
        <div class="wrapper-text-b h-[40vh]">
            <div class="content-wrapper">
                <h1 class="split">Alfian Nur</h1>
            </div>
        </div>
        <div class="wrapper-text-d flex justify-between items-center p-20">
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
section {
    /* height: 100vh; */
    /* margin-top: 20vh; */
    /* background-color: antiquewhite; */
}

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
    font-family: Arial, sans-serif;
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
    transition: transform 0.3s ease-out; /* Animasi munculnya garis */
}

/* Saat di-hover */
.teks-hover:hover::after {
    transform: scaleX(1); /* Garis memanjang hingga terlihat penuh (skala 1) */
    transform-origin: bottom left;
}

</style>
<!-- 
## 💡 Penjelasan Logika

1.  **SplitText Initialization:**
    ```javascript
    const splitter = new SplitText(textElement, { type: "chars" });
    allChars.push(...splitter.chars);
    ```
    Kode ini mengambil setiap elemen teks (`.line-text`), membaginya menjadi elemen `<span>` individual untuk setiap karakter, dan mengumpulkan semua karakter tersebut ke dalam array `allChars`.

2.  **Initial State (`gsap.set`):**
    ```javascript
    gsap.set(allChars, { y: 10, opacity: 0, scale: 0.95 });
    ```
    Kita mengatur setiap karakter agar sedikit di bawah (`y: 10`), tidak terlihat (`opacity: 0`), dan sedikit lebih kecil (`scale: 0.95`). Properti `overflow: hidden` pada `.line-wrapper` menyembunyikan karakter yang ada di bawah *wrapper*.

3.  **Animation (`tl.to`):**
    ```javascript
    stagger: 0.02,
    ```
    Nilai `stagger` yang sangat kecil (`0.02`) memastikan karakter muncul satu per satu dengan cepat, menciptakan efek *typewriter* atau *scanning* yang mulus dan cepat. Karena kita menargetkan `allChars`, efek *stagger* akan berjalan dari karakter pertama hingga karakter terakhir dari semua baris.

4.  **Hide on Scroll Up:**
    ```javascript
    toggleActions: 'play none none reverse',
    ```
    Seperti pada solusi sebelumnya, properti ini memastikan bahwa ketika Anda *scroll* kembali ke atas melewati titik awal (`start: 'top 80%'`), animasi akan dimainkan **mundur** (reverse), membuat semua karakter kembali ke `opacity: 0` dan menghilang secara berurutan. -->