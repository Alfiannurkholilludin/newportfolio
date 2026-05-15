<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  active: Boolean,
  image: String,
  mouseX: Number,
  mouseY: Number
})

const previewRef = ref(null)

let xTo = null
let yTo = null

onMounted(() => {
  xTo = gsap.quickTo(previewRef.value, 'x', {
    duration: 0.6,
    ease: 'power3.out'
  })

  yTo = gsap.quickTo(previewRef.value, 'y', {
    duration: 0.6,
    ease: 'power3.out'
  })
})

watch(
  () => [props.mouseX, props.mouseY],
  () => {
    if (!previewRef.value) return

    xTo(props.mouseX + 40)
    yTo(props.mouseY - 120)
  }
)

watch(
  () => props.active,
  (active) => {
    if (!previewRef.value) return

    if (active) {
      gsap.to(previewRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      gsap.to(previewRef.value, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power3.out'
      })
    }
  }
)

onUnmounted(() => {
  gsap.killTweensOf(previewRef.value)
})
</script>

<template>
  <div
    ref="previewRef"
    class="top-0 left-0 z-[999] fixed hidden md:block opacity-0 pointer-events-none"
  >
    <div
      class="relative rounded-3xl overflow-hidden w-[320px] h-[420px]"
    >
      <img
        :src="image"
        alt=""
        class="w-full h-full object-cover"
      />

      <div
        class="absolute inset-0 bg-black/10"
      />
    </div>
  </div>
</template>