<template>
  <section ref="container" class="relative h-[300px] w-full flex flex-col items-center justify-center overflow-hidden gap-8">
    <!-- Baris 1 -->
    <div ref="line1" class="whitespace-nowrap flex gap-8 text-6xl md:text-8xl font-bold">
      <span v-for="n in 6" :key="'l1-' + n" class="inline-block text_velo">
        UI Designer, Product Designer, Frontend Developer, 
      </span>
    </div>

    <!-- Baris 2 -->
    <div ref="line2" class="whitespace-nowrap flex gap-8 text-6xl md:text-8xl font-bold">
      <span v-for="n in 6" :key="'l2-' + n" class="inline-block text_velo">
        UI Designer, Product Designer, Frontend Developer, 
      </span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

const container = ref(null)
const line1 = ref(null)
const line2 = ref(null)

let trigger
let x1 = 0
let x2 = 0

onMounted(() => {
  trigger = ScrollTrigger.create({
    trigger: container.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const v = self.getVelocity() // px/s
      // Baris 1: ke kanan
      x1 += v * 0.02
      // Baris 2: ke kiri
      x2 -= v * 0.02

      gsap.to(line1.value, {
        x: x1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true
      })

      gsap.to(line2.value, {
        x: x2,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true
      })
    }
  })
})

onBeforeUnmount(() => {
  if (trigger) trigger.kill()
  gsap.set([line1.value, line2.value], { clearProps: 'transform' })
})
</script>

<style scoped>
section {
  overflow-x: hidden;
}

.text_velo {
  font-family: 'SFPRODISPLAYBOLD', sans-serif;
  font-weight: 700;
}
</style>
