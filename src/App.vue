<script setup>
import Lenis from 'lenis'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { ref } from 'vue'
import PageTransition from './components/PageTransition.vue'

onMounted(() => {
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})

const transitionOverlay = ref(null)

const revealLeave = async (el, done) => {
  await transitionOverlay.value.enter()
  done()
}

const revealEnter = async (el, done) => {
  await transitionOverlay.value.leave()
  done()
}
</script>

<template>
  <div>
    <PageTransition ref="transitionOverlay" />

    <Navbar />
    <RouterView v-slot="{ Component }">
      <transition :css="false" mode="out-in" @before-enter="revealEnter" @leave="revealLeave">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </RouterView>
  </div>

</template>

<style scoped>
  @media (min-width: 1024px) {

  }
</style>
