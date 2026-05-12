<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Balifiber',
    category: 'UI/UX Design',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Motekar Studio',
    category: 'UI/UX Design, Freelance Project',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'SmartCart By ITC',
    category: 'UI/UX Design, Freelance Project',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop'
  },
]

const cards = ref([])

onMounted(() => {
  cards.value.forEach((card, index) => {
    if (!card) return

    gsap.set(card, {
      y: index * 50,
      scale: 1 - index * 0.03
    })

    ScrollTrigger.create({
      trigger: card,
      start: 'top top',
      end: '+=700',
      pin: true,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
      animation: gsap.to(card, {
        scale: 0.92,
        y: -50,
        ease: 'none'
      })
    })

    const image = card.querySelector('.project-image')

    gsap.to(image, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <section class="relative overflow-hidden py-32 h-[250vh] md:h-[350vh] lg:h-[450vh]">
    <div class="mx-auto px-6 max-w-7xl">
      <div class="relative space-y-0">
        <article v-for="(project, index) in projects" :key="project.id" :style="{ top: `${index * 40 + 80}px` }"
          :ref="(el) => (cards[index] = el)"
          class="group gpu top-16 md:top-24 relative border border-white/10 bg-white/[0.03] shadow-[0_0_50px_rgba(255,255,255,0.04)] backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <div class="relative h-[420px] sm:h-[520px] lg:h-[720px] overflow-hidden">
            <img :src="project.image" :alt="project.title"
              class="project-image w-full h-full object-cover scale-100 transition-transform duration-700" />

            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div
              class="bottom-0 left-0 z-10 absolute flex md:flex-row flex-col md:justify-between gap-8 p-6 md:p-12 w-full">
              <div>
                <p class="mb-4 font-medium text-[#d1d1d1] text-xs sm:text-sm md:text-base uppercase tracking-[0.3em]">
                  {{ project.category }}
                </p>

                <h3 class="max-w-3xl font-bold text-white text-3xl sm:text-5xl lg:text-7xl leading-none tracking-tight">
                  {{ project.title }}
                </h3>
              </div>

              <div class="flex flex-col items-start md:items-end justify-end">
                <span class="font-semibold text-white/60 text-xs sm:text-sm uppercase tracking-[0.2em]">
                  {{ project.year }}
                </span>

                <button
                  class="group/btn flex items-center gap-3 border border-white/15 bg-white/5 hover:bg-[#2F2FE4] mt-4 px-6 py-3 rounded-full overflow-hidden font-medium text-white hover:text-[#f5f5f5] transition-all duration-500">
                  View Project

                  <span
                    class="inline-flex justify-center items-center bg-white group-hover/btn:bg-[#0f0f0f] rounded-full w-8 h-8 text-black group-hover/btn:text-[#f5f5f5] transition-all duration-500">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>