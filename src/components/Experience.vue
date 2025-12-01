<template>
  <section class="w-full h-[70vh] flex flex-col justify-center p-4 md:p-20 relative overflow-hidden transition-colors duration-500">
    <div class="container flex flex-col gap-8 mx-auto">
      <!-- Judul -->
      <h1 class="text_title text-5xl font-bold pb-8">
        Project Highlights.
      </h1>
        <div v-for="(item, index) in projects" :key="index" class="text_titlep text-4xl font-bold cursor-pointer relative transition-colors duration-500 border-b  pb-4 mb-8" @mouseenter="showImage(index, $event)" @mouseleave="hideImage(index)" @click="goToDetail(item.slug)">
        {{ item.title }}
            <!-- wrapper gambar -->
            <div class="pointer-events-none fixed top-0 left-0 w-72 h-48 overflow-hidden opacity-0 scale-95 will-change-transform" :ref="el => wrapperRefs[index] = el">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-cover"/>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { useRouter } from 'vue-router';

import img1 from "@/assets/project/1.png"
import img2 from "@/assets/project/2.png"
import img3 from "@/assets/project/3.png"

export default {
  name: "ProjectGalleryHoverSmoothBetter",
  setup() {
    const router = useRouter();
    const projects = ref([
      { title: "Balifiber", image: img1, slug: "PT Bali Towerindo Sentra Tbk" },
      { title: "SmartCart By ITC", image: img2, slug: "PT International Test Center" },
      { title: "Motekar Studio", image: img3, slug: "Motekar Studio" },
    ]);

    const wrapperRefs = ref([]);
    let activeImg = null;
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let animationFrame;

    const updatePosition = () => {
      if (activeImg) {
        pos.x += (mouse.x - pos.x) * 0.15; // smoothing factor
        pos.y += (mouse.y - pos.y) * 0.15;
        gsap.set(activeImg, { x: pos.x, y: pos.y });
      }
      animationFrame = requestAnimationFrame(updatePosition);
    };

    const goToDetail = (slug) => {
      // Ini akan mengarahkan ke: /project/balifiber, /project/smartcart, dll.
      router.push({ 
        name: 'ProjectDetail', // Gunakan satu nama rute dinamis di router.js
        params: { slug: slug } // Slug akan menentukan data proyek yang akan dimuat
      });
    };

    const showImage = (index, e) => {
      activeImg = wrapperRefs.value[index];
      if (!activeImg) return;

      mouse.x = e.clientX + 20;
      mouse.y = e.clientY + 20;
      pos.x = mouse.x;
      pos.y = mouse.y;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updatePosition);

      gsap.killTweensOf(activeImg);
      gsap.set(activeImg, { clipPath: "circle(0% at 50% 50%)" });
      gsap.to(activeImg, {
        opacity: 1,
        scale: 1,
        clipPath: "circle(75% at 50% 50%)",
        duration: 0.4,
        ease: "power3.out"
      });

      window.addEventListener("mousemove", handleMouseMove);
    };

    const hideImage = (index) => {
      const img = wrapperRefs.value[index];
      if (!img) return;

      gsap.killTweensOf(img);
      gsap.to(img, {
        opacity: 0,
        scale: 0.95,
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.3,
        ease: "power3.inOut"
      });

      activeImg = null;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX + 20;
      mouse.y = e.clientY + 20;
    };

    onBeforeUnmount(() => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    });

    return {
      projects,
      wrapperRefs,
      showImage,
      hideImage,
      goToDetail,
    };
  },
};
</script>

<style>
    .text_title {
        font-family: 'SFPRODISPLAYBOLD', sans-serif;
        font-weight: 700;
    }

    .text_titlep {
        font-family: 'SFPRODISPLAYREGULER', sans-serif;
        font-weight: 700;
    }
</style>
