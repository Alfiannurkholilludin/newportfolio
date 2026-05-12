<script setup>
const stacks = [
  'Vue.js',
  'Nuxt',
  'TailwindCSS',
  'GSAP',
  'Lenis',
  'Figma',
  'Framer',
  'Three.js',
  'Blender',
  'Vite',
  'JavaScript',
  'TypeScript',
  'WebGL',
  'UI Design',
  'Motion Design'
]

const marqueeItems = [...stacks, ...stacks]
</script>

<template>
  <section class="relative overflow-hidden py-28 md:py-40">

    <!-- TOP GRADIENT -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]"
    />

    <div class="mb-16 text-center">
      <p
        class="mb-5 text-sm uppercase tracking-[0.35em] text-white/40"
      >
        Toolbox
      </p>

      <h2
        class="mx-auto max-w-5xl text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Technologies & Creative Tools
      </h2>
    </div>

    <!-- MARQUEE -->
    <div class="relative">

      <!-- LEFT BLUR -->
      <div
        class="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0f0f0f] to-transparent"
      />

      <!-- RIGHT BLUR -->
      <div
        class="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0f0f0f] to-transparent"
      />

      <!-- TRACK -->
      <div class="marquee-wrapper">

        <div class="marquee-track">

          <div
            v-for="(item, index) in marqueeItems"
            :key="index"
            class="group flex shrink-0 items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-8 py-5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div
              class="h-3 w-3 rounded-full bg-[#2F2FE4]"
            />

            <span
              class="text-lg font-medium text-white/70 transition-colors duration-300 group-hover:text-white"
            >
              {{ item }}
            </span>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: max-content;
  animation: marquee 28s linear infinite;

  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>