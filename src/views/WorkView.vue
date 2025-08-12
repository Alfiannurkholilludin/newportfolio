<!-- <template>
    <section class="">
        
    </section>
</template>

<script setup>

</script>

<style scoped>

</style> -->

<template>
  <section class="py-24">
    <div class="container mx-auto px-4 flex flex-col gap-8">
      <!-- Judul -->
      <h1 class="text_title text-5xl font-bold mb-8 px-4 md:px-16">
        Design Highlights.
      </h1>
      <!-- <p class="px-4 md:px-16 text-1xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, voluptates.</p> -->

      <!-- Grid Projects -->
      <div ref="projectsGrid" class="w-full aspect-[4/3] px-2 md:px-16 grid grid-cols-1 md:grid-cols-1 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group overflow-hidden rounded-2xl shadow-lg cursor-pointer relative"
        >
          <!-- Gambar -->
          <img :src="project.image" :alt="project.title" class="w-full h-[320px] md:h-[729px] object-cover  transition-transform duration-500 group-hover:scale-105"/>
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 class="text-white text-lg font-semibold">{{ project.title }}</h3>
          </div>
          
        </div>
      </div>

      <!-- Tombol -->
      <div class="text-center mt-12">
        <a href="#portfolio" class="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors">
          See All Projects
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "vue"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import img1 from "@/assets/project/1.png"
import img2 from "@/assets/project/2.png"
import img3 from "@/assets/project/3.png"

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "QuickProjects",
  setup() {
    const projectsGrid = ref(null);

    const projects = [
      {
        title: "Balifiber",
        image: img1,
      },
      {
        title: "E-Commerce Dashboard",
        image: img2,
      },
      {
        title: "Travel Booking Website",
        image: img3,
      },
    ];

    onMounted(() => {
      gsap.from(projectsGrid.value.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsGrid.value,
          start: "top 80%",
        },
      });
    });

    return { projects, projectsGrid };
  },
};
</script>

<style scoped>
    .text_title {
        font-family: 'SFPRODISPLAYBOLD', sans-serif;
        font-weight: 700;
    }
</style>
