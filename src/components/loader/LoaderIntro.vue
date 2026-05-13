<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const loaderRef = ref(null)
const counterRef = ref(null)
const topPanelRef = ref(null)
const bottomPanelRef = ref(null)
const brandRef = ref(null)

onMounted(() => {
  const counter = { value: 0 }

  const tl = gsap.timeline({
    defaults: {
      ease: 'power4.inOut'
    }
  })

  // disable scroll saat loader aktif
  document.body.style.overflow = 'hidden'

  // counting loader
  tl.to(counter, {
    value: 100,
    duration: 4.8, // lebih lambat & cinematic
    ease: 'power2.out',
    onUpdate: () => {
      if (counterRef.value) {
        counterRef.value.innerHTML = `${Math.floor(counter.value)}`
      }
    }
  })

  // brand reveal
  tl.fromTo(
    brandRef.value,
    {
      y: 120,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2
    },
    0.3
  )

  // loader keluar
  tl.to(
    counterRef.value,
    {
      y: -80,
      opacity: 0,
      duration: 0.8
    },
    '>-0.1'
  )

  tl.to(
    brandRef.value,
    {
      y: -80,
      opacity: 0,
      duration: 1
    },
    '<'
  )

  // panel split cinematic
  tl.to(
    topPanelRef.value,
    {
      yPercent: -100,
      duration: 1.6
    },
    '-=0.2'
  )

  tl.to(
    bottomPanelRef.value,
    {
      yPercent: 100,
      duration: 1.6
    },
    '<'
  )

  // hide loader
  tl.to(
    loaderRef.value,
    {
      opacity: 0,
      duration: 0.6,
      onComplete: () => {
        document.body.style.overflow = ''
      }
    },
    '-=0.5'
  )
})
</script>

<template>
  <div
    ref="loaderRef"
    class="z-[9999] fixed inset-0 w-full h-screen overflow-hidden pointer-events-none"
  >
    <!-- TOP PANEL -->
    <div
      ref="topPanelRef"
      class="top-0 left-0 absolute bg-[#050505] w-full h-1/2"
    />

    <!-- BOTTOM PANEL -->
    <div
      ref="bottomPanelRef"
      class="bottom-0 left-0 absolute bg-[#050505] w-full h-1/2"
    />

    <!-- CONTENT -->
    <div
      class="z-20 absolute inset-0 flex flex-col justify-between px-6 md:px-10 py-8 md:py-10"
    >
      <!-- top -->
      <div class="flex justify-between items-start w-full">
        <p
          class="font-medium text-white/40 text-[10px] md:text-xs uppercase tracking-[0.35em]"
        >
          Creative Portfolio
        </p>

        <span
          class="font-medium text-white/40 text-[10px] md:text-xs uppercase tracking-[0.35em]"
        >
          2026
        </span>
      </div>

      <!-- center -->
      <div class="flex flex-col justify-center items-center flex-1">
        <h1
          ref="brandRef"
          class="font-semibold text-white text-[15vw] md:text-[9vw] leading-none tracking-[-0.08em] uppercase"
        >
          Welcome
        </h1>
      </div>

      <!-- bottom -->
      <div class="flex justify-between items-end w-full">
        <div
          class="font-medium text-white/40 text-[10px] md:text-xs uppercase tracking-[0.35em]"
        >
          Loading Experience
        </div>

        <div
          ref="counterRef"
          class="font-semibold text-white text-5xl md:text-8xl leading-none tracking-[-0.05em]"
        >
          0
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div,
h1,
span,
p {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>