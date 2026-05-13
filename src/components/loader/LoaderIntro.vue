<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const loaderRef = ref(null)
const counterRef = ref(null)

const topPanelRef = ref(null)
const bottomPanelRef = ref(null)

const brandRef = ref(null)
const labelTopLeftRef = ref(null)
const labelTopRightRef = ref(null)
const labelBottomLeftRef = ref(null)

onMounted(() => {
  const counter = { value: 0 }

  document.body.style.overflow = 'hidden'

  const tl = gsap.timeline({
    defaults: {
      ease: 'power4.inOut'
    }
  })

  // Intro Fade
  tl.from(
    [
      labelTopLeftRef.value,
      labelTopRightRef.value,
      labelBottomLeftRef.value
    ],
    {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.08
    }
  )

  // Brand Reveal
  tl.fromTo(
    brandRef.value,
    {
      y: 140,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'expo.out'
    },
    0.2
  )

  // Counter Animation
  tl.to(
    counter,
    {
      value: 100,
      duration: 5.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.value) {
          counterRef.value.innerHTML = `${Math.floor(counter.value)}`
        }
      }
    },
    0
  )

  // Exit Counter & Brand
  tl.to(
    [counterRef.value, brandRef.value],
    {
      y: -80,
      opacity: 0,
      duration: 1
    },
    '+=0.2'
  )

  tl.to(
    [
      labelTopLeftRef.value,
      labelTopRightRef.value,
      labelBottomLeftRef.value
    ],
    {
      opacity: 0,
      duration: 0.5
    },
    '<'
  )

  // Split Panels Animation
  tl.to(
    topPanelRef.value,
    {
      yPercent: -100,
      duration: 1.8,
      ease: 'expo.inOut'
    },
    '-=0.2'
  )

  tl.to(
    bottomPanelRef.value,
    {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.inOut'
    },
    '<'
  )

  // Hide Loader
  tl.to(
    loaderRef.value,
    {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.body.style.overflow = ''
      }
    },
    '-=0.6'
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
      class="z-20 absolute inset-0 flex flex-col justify-between px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-10"
    >
      <!-- TOP -->
      <div class="flex justify-between items-start gap-4 w-full">
        <p
          ref="labelTopLeftRef"
          class="font-medium text-white/40 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em]"
        >
          Creative Portfolio
        </p>

        <span
          ref="labelTopRightRef"
          class="font-medium text-white/40 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em]"
        >
          2026
        </span>
      </div>

      <!-- CENTER -->
      <div class="flex justify-center items-center flex-1">
        <h1
          ref="brandRef"
          class="font-semibold text-white text-[18vw] xs:text-[16vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.08em] uppercase select-none"
        >
          Welcome
        </h1>
      </div>

      <!-- BOTTOM -->
      <div class="flex justify-between items-end gap-4 w-full">
        <div
          ref="labelBottomLeftRef"
          class="max-w-[120px] sm:max-w-none font-medium text-white/40 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] leading-relaxed"
        >
          Loading Experience
        </div>

        <div
          ref="counterRef"
          class="font-semibold text-white text-[18vw] sm:text-[12vw] md:text-[7vw] lg:text-[5vw] leading-none tracking-[-0.06em]"
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
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

/* Extra small phones */
@media (max-width: 375px) {
  h1 {
    font-size: 20vw;
  }
}
</style>