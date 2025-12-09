<template>
  <div ref="overlay" class="fixed top-0 left-0 w-full h-full bg-[#0f0f0f] z-[9999] pointer-events-none flex items-center justify-center">
    <h1 ref="transitionText" class="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Wait a second</h1>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const overlay = ref(null)
const transitionText = ref(null)

const enter = () => {
  // Animasi masuk: overlay naik + teks muncul
  return gsap.timeline()
    .fromTo(overlay.value, { y: '100%' }, { y: '0%', duration: 0.8, ease: 'power4.inOut' })
    .fromTo(transitionText.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
}

const leave = () => {
  // Animasi keluar: teks hilang + overlay naik ke atas
  return gsap.timeline()
    .to(transitionText.value, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    })
    .to(overlay.value, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.2')
}

defineExpose({ enter, leave })

onMounted(() => {
  gsap.set(overlay.value, { y: '100%' })
  gsap.set(transitionText.value, { opacity: 0 })
})
</script>
