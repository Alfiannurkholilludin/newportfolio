<template>
    <section ref="kontenerRef" class="content">
        <div class="wrapper-text-split h-[20vh] flex flex-col justify-center items-center">
            <h1 class="splittext">My Client</h1>
            <p class="text-[#a9a9a9]">Move your mouse to see my clients</p>
        </div>
        <img class="flair" src="../assets/brand/balifiber.png" alt="">
        <img class="flair" src="../assets/brand/motekar.png" alt="">
        <img class="flair" src="../assets/brand/pim 2.png" alt="">
        <img class="flair" src="../assets/brand/Bakti.png" alt="">
        <img class="flair" src="../assets/brand/balitower.png" alt="">
        <img class="flair" src="../assets/brand/itc.webp" alt="">
        <img class="flair" src="../assets/brand/pertamina.png" alt="">
    </section>
</template>

<style scoped>
    .flair {
        position: fixed;
        opacity: 0;
        width: 100px;
        height: auto;
        object-position: center;
        object-fit: cover;
        /* Tambahkan ini agar flair tidak menghalangi klik pada elemen di bawahnya */
        pointer-events: none;
    }
    .content {
        width: 100%;
        height: 80vh;
        display: flex;
        /* background-color: aqua; */
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        overflow: hidden;
    }

    .splittext {
        font-size: 10vw;
        font-family: 'SFPRODISPLAYBOLD', sans-serif;
        font-weight: 700;
    }
</style>

<script setup>
import { onMounted, ref } from 'vue'; // Tambahkan ref
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

// 1. Tambahkan ref untuk elemen content
const kontenerRef = ref(null); 
const isMouseInside = ref(false); // State untuk melacak mouse

onMounted(() => {
    
    function playAnimation (shape) {
        let tl = gsap.timeline();
        shape.classList.add('active-flair');
        tl.from (shape, {
            opacity: 1,
            scale: 0,
            ease: "elastic.out(1, 0.3)",
        })
        .to(shape,{
            opacity: 0,
            y: "0",
            ease: "back.in(.4)",
            duration: 1,
            onComplete: () => {
                shape.classList.remove('active-flair');
            }
        },0)
    }

    let flair = gsap.utils.toArray('.flair');
    let gap = 100;
    let index = 0;
    let wrapper = gsap.utils.wrap(0, flair.length);
    gsap.defaults({duration: 1});

    let mousePos = {x: 0, y: 0};
    let lastMousePos = mousePos;
    let cachedMousePos = mousePos;

    // 2. Ganti window.addEventListener dengan contentRef.value.addEventListener
    if (kontenerRef.value) {
        // Event listener saat mouse bergerak di dalam container
        kontenerRef.value.addEventListener('mousemove', (e) => {
            // Kita tetap menggunakan clientX/Y karena elemen .flair adalah fixed
            mousePos = {
                x: e.clientX,
                y: e.clientY
            };
        });

        // Tambahkan listener untuk melacak apakah mouse ada di dalam container
        kontenerRef.value.addEventListener('mouseenter', () => {
            isMouseInside.value = true;
        });

        kontenerRef.value.addEventListener('mouseleave', () => {
            isMouseInside.value = false;
        });
    }

    gsap.ticker.add(ImageTrail);

    function ImageTrail() {
        // 3. Tambahkan kondisi pengecekan isMouseInside
        if (!isMouseInside.value) return; 

        let travelDistance = Math.hypot (
            lastMousePos.x - mousePos.x,
            lastMousePos.y - mousePos.y
        );

        cachedMousePos.x = gsap.utils.interpolate(
            cachedMousePos.x || mousePos.x,
            mousePos.x,
            0.1
        );

        cachedMousePos.y = gsap.utils.interpolate(
            cachedMousePos.y || mousePos.y,
            mousePos.y,
            0.1
        );

        if (travelDistance > gap) {
            animateImage();
            lastMousePos = mousePos;
        }
    }

    function animateImage() {
        let wrappedIndex = wrapper(index);

        let img = flair[wrappedIndex];
        gsap.killTweensOf(img);

        gsap.set(img, {
            clearProps: 'all',
        });

        // Penempatan gambar tetap menggunakan koordinat mouse (clientX/Y) karena elemennya FIXED.
        // Deteksi pergerakan mouse yang menyebabkan animasi sekarang hanya terjadi di dalam .content.
        gsap.set(img, {
            opacity: 1,
            left: mousePos.x,
            top: mousePos.y,
            xPercent: -50,
            yPercent: -50,
        });

        playAnimation(img);
        index++;
    }

    function clearAllFlairs() {
        gsap.killTweensOf(flair); // Menghentikan semua animasi yang tertunda
        gsap.to(flair, {
            opacity: 0,
            duration: 0.2, // Durasi cepat untuk menyembunyikan
            clearProps: 'all', // Membersihkan style GSAP
        });
    }

    // Tambahkan listener untuk melacak apakah mouse ada di dalam container
    kontenerRef.value.addEventListener('mouseenter', () => {
        isMouseInside.value = true;
    });

    kontenerRef.value.addEventListener('mouseleave', () => {
        isMouseInside.value = false;
        // PENTING: Panggil fungsi pembersih saat mouse keluar
        clearAllFlairs(); 
    });

    const mySplitTextclient = new SplitText(".splittext", { type: "chars" });
        const chars = mySplitTextclient.chars; // Array dari elemen karakter
        gsap.from(chars, {
            yPercent: 100,
            stagger: {
                each: 0.08,
                from: "center"
            },
            ease: "power2.out",
            duration: 2,
            scrollTrigger: {
            trigger: ".splittext",
            start: "top 100%",
                end: "bottom 50%",
            toggleActions: 'play none none reverse',
            // markers: true,
            scrub: 1,
            },
        });
});
</script>