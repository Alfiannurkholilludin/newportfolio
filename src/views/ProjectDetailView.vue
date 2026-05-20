<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

const heroRef = ref(null)
const imageRef = ref(null)
const contentRef = ref(null)

const project = computed(() => {
  return projects.find((item) => item.slug === route.params.slug)
})

onMounted(() => {
  // HERO REVEAL
  gsap.from(heroRef.value, {
    opacity: 0,
    y: 100,
    duration: 1.4,
    ease: 'power4.out',
  })

  // IMAGE PARALLAX
  gsap.to(imageRef.value, {
    yPercent: 12,
    ease: 'none',

    scrollTrigger: {
      trigger: imageRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // CONTENT REVEAL
  gsap.from('.detail-reveal', {
    opacity: 0,
    y: 80,
    stagger: 0.12,
    duration: 1.2,
    ease: 'power4.out',

    scrollTrigger: {
      trigger: contentRef.value,
      start: 'top 80%',
    },
  })
})
</script>

<template>
  <main
    v-if="project"
    class="relative overflow-hidden min-h-screen bg-[#050505] text-white"
  >
    <!-- TOP GLOW -->
    <div
      class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-[160px]"
    />

    <!-- HERO -->
    <section
      ref="heroRef"
      class="relative px-6 md:px-12 pt-32 md:pt-40"
    >
      <div class="mx-auto max-w-7xl">
        <!-- BACK -->
        <div class="mb-16">
          <RouterLink
            to="/works"
            class="group inline-flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white px-5 py-3 rounded-full overflow-hidden text-white hover:text-black backdrop-blur-xl transition-all duration-500"
          >
            <span
              class="flex justify-center items-center rounded-full w-8 h-8 bg-white text-black transition-all duration-500 group-hover:bg-black group-hover:text-white"
            >
              ←
            </span>

            <span
              class="text-sm font-medium uppercase tracking-[0.2em]"
            >
              Back
            </span>
          </RouterLink>
        </div>

        <!-- META -->
        <div
          class="flex md:flex-row flex-col justify-between items-start gap-10 mb-20"
        >
          <div>
            <p
              class="detail-reveal mb-6 text-sm uppercase tracking-[0.3em] text-white/40"
            >
              {{ project.category }}
            </p>

            <h1
              class="detail-reveal max-w-5xl text-[15vw] md:text-[8vw] font-bold leading-[0.9] tracking-[-0.08em]"
            >
              {{ project.title }}
            </h1>
          </div>

          <div class="detail-reveal max-w-xl pt-2">
            <p
              class="text-base md:text-lg leading-relaxed text-white/70"
            >
              {{ project.description }}
            </p>

            <div
              class="flex items-center gap-10 mt-10 pt-8 border-white/10 border-t"
            >
              <div>
                <p
                  class="mb-2 text-xs uppercase tracking-[0.2em] text-white/30"
                >
                  Year
                </p>

                <span class="text-white/80">
                  {{ project.year }}
                </span>
              </div>

              <div>
                <p
                  class="mb-2 text-xs uppercase tracking-[0.2em] text-white/30"
                >
                  Role
                </p>

                <span class="text-white/80">
                  Frontend Developer
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- HERO IMAGE -->
        <div
          class="detail-reveal relative overflow-hidden rounded-[2rem] md:rounded-[3rem]"
        >
          <img
            ref="imageRef"
            :src="project.image"
            :alt="project.title"
            class="w-full h-[320px] sm:h-[500px] md:h-[700px] object-cover scale-[1.08]"
          />

          <!-- OVERLAY -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section
      ref="contentRef"
      class="relative px-6 md:px-12 py-24 md:py-40"
    >
      <div class="mx-auto max-w-7xl">
        <div
          class="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24"
        >
          <!-- LEFT -->
          <div class="md:col-span-4">
            <div class="sticky top-32">
              <p
                class="detail-reveal mb-5 text-sm uppercase tracking-[0.3em] text-white/40"
              >
                Overview
              </p>

              <h2
                class="detail-reveal text-3xl md:text-5xl font-bold leading-tight tracking-[-0.05em]"
              >
                Building meaningful digital experiences.
              </h2>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="md:col-span-8">
            <div class="space-y-20">
              <div class="detail-reveal">
                <p
                  class="mb-6 text-sm uppercase tracking-[0.3em] text-white/40"
                >
                  Challenge
                </p>

                <p
                  class="max-w-3xl text-lg md:text-2xl leading-relaxed text-white/70"
                >
                  The challenge was to create a modern experience
                  that feels premium, immersive, and highly
                  interactive while maintaining smooth performance
                  across all devices.
                </p>
              </div>

              <div class="detail-reveal">
                <p
                  class="mb-6 text-sm uppercase tracking-[0.3em] text-white/40"
                >
                  Approach
                </p>

                <p
                  class="max-w-3xl text-lg md:text-2xl leading-relaxed text-white/70"
                >
                  The interface combines bold typography, cinematic
                  layouts, smooth scrolling, motion-driven
                  interactions, and refined spacing systems to
                  elevate the storytelling experience.
                </p>
              </div>

              <!-- SECOND IMAGE -->
              <div
                class="detail-reveal overflow-hidden rounded-[2rem]"
              >
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-[280px] md:h-[600px] object-cover"
                />
              </div>

              <!-- TECH STACK -->
              <div class="detail-reveal">
                <p
                  class="mb-8 text-sm uppercase tracking-[0.3em] text-white/40"
                >
                  Tech Stack
                </p>

                <div class="flex flex-wrap gap-4">
                  <span
                    class="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    Vue.js
                  </span>

                  <span
                    class="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    TailwindCSS
                  </span>

                  <span
                    class="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    GSAP
                  </span>

                  <span
                    class="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    Lenis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BOTTOM GLOW -->
    <div
      class="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.03] blur-[180px]"
    />
  </main>
</template>