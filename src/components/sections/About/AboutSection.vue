<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechStack from '@/components/sections/TechStack.vue'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)

onMounted(() => {
    const el = section.value

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
        }
    })

    tl.from('.about-label', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })

    tl.from('.about-title-line', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.5')

    tl.from('.about-description', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
})
</script>

<template>
    <section ref="section" class="relative z-10 overflow-hidden pt-52 pb-32 md:pt-52 md:pb-40">
        <div class="mx-auto max-w-7xl px-6">

            <div class="grid items-start gap-20 lg:grid-cols-2">

                <!-- LEFT -->
                <div>

                    <p class="about-label mb-8 text-sm uppercase tracking-[0.35em] text-white/40">
                        About Me
                    </p>

                    <div class="space-y-2">

                        <div class="overflow-hidden">
                            <h2
                                class="about-title-line text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                                Designing
                            </h2>
                        </div>

                        <div class="overflow-hidden">
                            <h2
                                class="about-title-line text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                                Digital
                            </h2>
                        </div>

                        <div class="overflow-hidden">
                            <h2
                                class="about-title-line text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
                                Experiences
                            </h2>
                        </div>

                    </div>
                </div>

                <!-- RIGHT -->
                <div class="flex flex-col justify-between h-full">

                    <p class="about-description max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
                        Hi, I’m Alfian Nur — a passionate UI & Product Designer
                        focused on crafting immersive, aesthetic, and user-centered
                        digital experiences with modern visual storytelling and
                        meaningful interaction.
                    </p>

                    <div class="about-description mt-14 flex flex-wrap gap-4">
                        <span
                            class="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-sm">
                            UI Design
                        </span>

                        <span
                            class="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-sm">
                            Product Design
                        </span>

                        <span
                            class="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-sm">
                            Motion Design
                        </span>

                        <span
                            class="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-sm">
                            Frontend Development
                        </span>
                    </div>

                </div>

            </div>
        </div>
        <TechStack />

        <!-- GRADIENT -->
        <!-- <div
            class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]" /> -->
    </section>
</template>