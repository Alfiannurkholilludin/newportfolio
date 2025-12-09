<template>
  <main>
  <section class="w-full h-fit flex flex-col items-start p-20 relative overflow-x-hidden">
    <!-- Preloader -->
    <div ref="preloader" class="fixed top-0 left-0 w-full h-screen z-50 bg-[#0f0f0f] text-white flex items-center justify-center text-2xl font-semibold">
      <span ref="preloaderText">Welcome to my story journey</span>
    </div>

    <div class="w-full wrapper_hero flex flex-col gap-12">
      <div class="wrapper_text flex flex-col gap-4 w-full md:w-[70%] h-fit">
        <h1 class="text-5xl md:text-7xl">Hi There! I'm Alfian Nur</h1>
        <p class="text-[18px]">
          Welcome to my story journey. Here, you will find a collection of my journey,
          showcasing my skills and experience in various design disciplines. I believe in the
          power of design to transform ideas into reality and am always eager to take on new challenges.
        </p>
      </div>

      <div class="w-full overflow-hidden">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :navigation="true"
          :pagination="{ clickable: true, renderBullet }"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          loop="true"
          class="w-full"
          >
          <SwiperSlide v-for="(slide, index) in slides" :key="index">
            <div class="flex justify-center items-center h-fit">
              <img :src="slide" class="object-center object-cover h-[200px] md:h-[600px] w-full rounded-xl" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <!-- <MarqueeBrand /> -->
    </div>
    <ScrollVelocity />
    <PinCard />
    <CursorFollowerImg />
    <!-- <HorizontalScroll /> -->
    <!-- <MyService /> -->
    <!-- <WorkExperience /> -->
    <!-- <ImageScrollDist /> -->
  </section>
  <Footer1Page />
  <ScrollButton />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import img1 from "@/assets/profile/Slider 1.png"
import img2 from "@/assets/profile/Slider 2.png"
import img3 from "@/assets/profile/Slider 3.png"
import MarqueeBrand from '@/components/MarqueeBrand.vue'
import ScrollVelocity from '@/components/ScrollVelocity.vue'
import ImageScrollDist from '@/components/ImageScrollDist.vue'
import WorkExperience from '@/components/WorkExperience.vue'
import Footer1Page from '@/components/Footer1Page.vue'
import MyService from '@/components/ScrollButton.vue'
import ScrollButton from '@/components/ScrollButton.vue'
import PinCard from '@/components/PinCard.vue'
import CursorFollowerImg from '@/components/CursorFollowerImg.vue'
import HorizontalScroll from '@/components/HorizontalScroll.vue'
// import WorkProjects from '@/components/WorkProjects.vue'


const slides = [
  img1,
  img2,
  img3
]

const renderBullet = (index, className) => {
  return `
    <div class="bullet-wrapper">
      <span class="${className} custom-bullet" data-index="${index}">${String(index + 1).padStart(2, '0')}</span>
      ${index !== slides.length - 1 ? '<span class="bullet-line"></span>' : ''}
    </div>
  `
}

const preloader = ref(null)
const preloaderText = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  // Reveal teks di preloader
  tl.from(preloaderText.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })

  // Slide preloader keluar
  tl.to(preloader.value, {
    duration: 1,
    y: '-100%',
    ease: 'power3.inOut',
    delay: 0.5,
  }).set(preloader.value, { display: 'none' })

  // Hapus garis sebelum bullet aktif
  const swiperEl = document.querySelector('.swiper').swiper
  swiperEl.on('slideChange', () => {
    document.querySelectorAll('.bullet-line').forEach(line => line.style.visibility = 'visible')
    const activeIndex = swiperEl.realIndex
    const lines = document.querySelectorAll('.bullet-line')
    if (activeIndex > 0) {
      lines[activeIndex - 1].style.visibility = 'hidden'
    }
  })
})
</script>

<style>
.swiper-button-next::after {
  content: '→';
  color: #fff;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
  visibility: hidden;
  padding: 16px;
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  font-size: 24px;
}

.swiper .swiper-button-next:hover::after {
  visibility: visible;
  background-color: #0000008e;
}

.swiper-button-prev::after {
  content: '→';
  color: #fff;
  visibility: hidden;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
  padding: 16px;
  transform: rotate(180deg);
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  font-size: 24px;
}

.swiper .swiper-button-prev:hover::after {
  visibility: visible;
  background-color: #0000008e;
}

/* Posisi pagination */
.swiper-pagination {
  display: flex !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  position: static !important;
}

/* Wrapper angka & garis */
.bullet-wrapper {
  display: inline-flex;
  align-items: center;
  margin: 0 4px;
}

/* Angka dalam lingkaran */
.custom-bullet {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #999;
  cursor: pointer;
}

/* Garis antar angka */
.bullet-line {
  width: 30px;
  height: 1px;
  background-color: #999;
  margin-left: 8px;
  transition: all 0.3s ease;
}

.custom-bullet.swiper-pagination-bullet-active {
  background: #fff;
  color: #000;
  border-color: #fff;
}

/* Angka aktif */
.swiper-pagination-bullet-active.custom-bullet {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.swiper-pagination-bullet-active.custom-bullet {
  position: relative;
}

/* Garis mengikuti warna aktif */
.swiper-pagination-bullet-active + .bullet-line {
  background-color: #999;
}

.swiper-pagination-bullet-active.custom-bullet::before {
  content: '';
  position: absolute;
  left: -36px; /* jarak ke garis sebelumnya */
  width: 30px;
  height: 1px;
  background-color: transparent !important; /* hilang */
}

.swiper {
  width: 100% !important;
  overflow: hidden;
}

.wrapper_text h1 {
  font-family: 'SFPRODISPLAYBOLD', sans-serif;
  font-weight: 700;
}
</style>
