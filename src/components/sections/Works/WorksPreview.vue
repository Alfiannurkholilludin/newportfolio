<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  work: Object
})

const previewRef = ref(null)

const movePreview = (e) => {
  if (!previewRef.value) return

  gsap.to(previewRef.value, {
    x: e.clientX - 180,
    y: e.clientY - 220,
    duration: 0.5,
    ease: 'power3.out'
  })
}

watch(
  () => props.work,
  (value) => {
    if (!previewRef.value) return

    if (value) {
      gsap.to(previewRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.5
      })

      window.addEventListener('mousemove', movePreview)
    } else {
      gsap.to(previewRef.value, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4
      })

      window.removeEventListener('mousemove', movePreview)
    }
  }
)
</script>

<template>
  <div
    ref="previewRef"
    class="top-0 left-0 z-[100] fixed opacity-0 pointer-events-none"
  >
    <div
      v-if="work"
      class="shadow-2xl rounded-3xl overflow-hidden w-[320px] md:w-[380px]"
    >
      <img
        :src="work.image"
        :alt="work.title"
        class="w-full h-[420px] object-cover"
      />
    </div>
  </div>
</template>