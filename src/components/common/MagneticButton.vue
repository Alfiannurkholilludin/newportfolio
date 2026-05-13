<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const magneticRef = ref(null)

const isMobile = window.innerWidth < 768

const handleMouseMove = (e) => {
  if (isMobile) return

  const el = magneticRef.value

  if (!el) return

  const rect = el.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const moveX = (x - centerX) * 0.2
  const moveY = (y - centerY) * 0.2

  gsap.to(el, {
    x: moveX,
    y: moveY,
    duration: 0.4,
    ease: 'power3.out'
  })
}

const handleMouseLeave = () => {
  if (isMobile) return

  const el = magneticRef.value

  if (!el) return

  gsap.to(el, {
    x: 0,
    y: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.35)'
  })
}
</script>

<template>
  <button
    ref="magneticRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    class="group relative inline-flex items-center justify-center gap-3 border border-white/10 bg-white/5 hover:bg-[#2F2FE4] backdrop-blur-xl px-5 sm:px-6 py-3 sm:py-4 rounded-full overflow-hidden font-medium text-sm sm:text-base text-white transition-all duration-500"
  >
    <slot />

    <span
      class="flex justify-center items-center bg-white rounded-full w-7 sm:w-8 h-7 sm:h-8 text-black transition-transform duration-300 group-hover:translate-x-1 shrink-0"
    >
      →
    </span>
  </button>
</template>

<style scoped>
button {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-tap-highlight-color: transparent;
}

@media (max-width: 375px) {
  button {
    width: auto;
  }
}

@media (max-width: 768px) {
  button {
    width: auto;
  }
}
</style>