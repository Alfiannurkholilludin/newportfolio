<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  work: Object,
  mouseX: Number,
  mouseY: Number
})

const previewRef = ref(null)

let xTo = null
let yTo = null

onMounted(() => {
  if (!previewRef.value) return

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
    if (!previewRef.value || !props.work) return

    xTo(props.mouseX + 40)
    yTo(props.mouseY - 180)
  }
)

watch(
  () => props.work,
  (work) => {
    if (!previewRef.value) return

    if (work) {
      gsap.to(previewRef.value, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      gsap.to(previewRef.value, {
        opacity: 0,
        scale: 0.85,
        rotate: -6,
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
      v-if="work"
      class="relative rounded-[28px] overflow-hidden w-[320px] h-[420px] bg-neutral-900 shadow-2xl"
    >
      <img
        :src="work.image"
        :loading="lazy"
        :alt="work.title"
        class="w-full h-full object-cover scale-110"
      />

      <div class="absolute inset-0 bg-black/20" />

      <div
        class="bottom-0 left-0 absolute p-8 w-full"
      >
        <p
          class="mb-2 text-white/60 text-xs uppercase tracking-[0.3em]"
        >
          {{ work.category }}
        </p>

        <h3
          class="font-semibold text-3xl text-white leading-none"
        >
          {{ work.title }}
        </h3>
      </div>
    </div>
  </div>
</template>