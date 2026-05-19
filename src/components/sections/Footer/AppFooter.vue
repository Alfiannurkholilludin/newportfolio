<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue'
import FooterExperience from './FooterExperience.vue'

gsap.registerPlugin(ScrollTrigger)

const footerRef = ref(null)

onMounted(() => {
  const q = gsap.utils.selector(footerRef.value)

  gsap.from(q('.footer-reveal'), {
    y: 120,
    opacity: 0,
    duration: 1.4,
    stagger: 0.12,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: footerRef.value,
      start: 'top 85%',
    },
  })
})
</script>

<template>
  <footer ref="footerRef"
  class="relative overflow-hidden px-6 md:px-12 pt-32 md:pt-40 pb-10 text-white">
    <!-- MATTER -->
    <div class="absolute inset-0 z-10">
      <FooterExperience />
    </div>

    <!-- CONTENT -->
    <div class="relative z-20 pointer-events-none">
      <!-- TOP BORDER -->
      <div class="mb-20 border-white/10 border-t"></div>

      <!-- MAIN -->
      <div class="mx-auto max-w-7xl">
        <!-- CTA -->
        <div class="mb-32">
          <p class="footer-reveal mb-6 text-sm uppercase tracking-[0.3em] text-white/40">
            Have a project in mind?
          </p>

          <a href="mailto:hello@yourmail.com" class="footer-reveal group inline-block pointer-events-auto">
            <h2 class="text-[16vw] md:text-[9vw] font-bold leading-[0.9] tracking-[-0.08em]">
              LET'S TALK
            </h2>

            <div class="mt-4 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-full"></div>
          </a>
        </div>

        <!-- BOTTOM -->
        <div class="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <!-- LEFT -->
          <div class="space-y-4">
            <div class="footer-reveal">
              <p class="text-white/40 text-sm uppercase tracking-[0.2em] mb-3">
                Navigation
              </p>

              <div class="flex flex-col gap-2">
                <RouterLink to="/"
                  class="group w-fit text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  Home
                  <span class="block h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                </RouterLink>

                <RouterLink to="/works"
                  class="group w-fit text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  Works
                  <span class="block h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                </RouterLink>

                <RouterLink to="/about"
                  class="group w-fit text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  About
                  <span class="block h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="footer-reveal flex flex-col items-start md:items-end gap-6">
            <div class="text-left md:text-right">
              <p class="mb-3 text-sm uppercase tracking-[0.2em] text-white/40">
                Socials
              </p>

              <div class="flex flex-col gap-2">
                <a href="https://github.com" target="_blank"
                  class="group text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  GitHub
                </a>

                <a href="https://linkedin.com" target="_blank"
                  class="group text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  LinkedIn
                </a>

                <a href="https://twitter.com" target="_blank"
                  class="group text-2xl md:text-3xl font-medium tracking-[-0.04em] pointer-events-auto">
                  Twitter
                </a>
              </div>
            </div>

            <div class="pt-10 text-white/30 text-sm">
              © 2026 Alfian Nur
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GLOW -->
    <div
      class="absolute bottom-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[140px]">
    </div>
  </footer>
</template>