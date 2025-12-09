<script setup>
import Lenis from 'lenis'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import PageTransition from './components/PageTransition.vue'
import StickyFooter from '@/components/StickyFooter.vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const transitionOverlay = ref(null);

let lenis;

const revealLeave = async (el, done) => {
  await transitionOverlay.value.enter()
  done()
}

const revealEnter = async (el, done) => {
  await transitionOverlay.value.leave()
  // Jalankan Lenis + ScrollTrigger setelah preloader selesai
  initSmoothScroll()
  done()
}

function initSmoothScroll() {
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
  <main>
    <PageTransition ref="transitionOverlay" />

    <Navbar />
    <RouterView v-slot="{ Component }">
      <transition :css="false" mode="out-in" @before-enter="revealEnter" @leave="revealLeave">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </RouterView>
    <!-- <StickyFooter /> -->
  </main>

</template>

<style scoped>
  @media (min-width: 1024px) {

  }
</style>
