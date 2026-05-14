<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import { projects } from '@/data/projects'

const route = useRoute()

const project = computed(() => {
    return projects.find((item) => item.slug === route.params.slug)
})
</script>

<template>
    <main v-if="project" class="relative bg-[#050505] px-6 py-32 min-h-screen text-white overflow-hidden">
        <!-- BACK BUTTON -->
        <div class="mx-auto mb-12 max-w-6xl">
            <RouterLink to="/"
                class="group inline-flex items-center gap-3 border border-white/10 bg-white/5 hover:bg-white px-5 py-3 rounded-full overflow-hidden text-white hover:text-black backdrop-blur-xl transition-all duration-500">
                <span
                    class="flex justify-center items-center bg-white group-hover:bg-black rounded-full w-8 h-8 text-black group-hover:text-white transition-all duration-500">
                    ←
                </span>

                <span class="font-medium text-sm uppercase tracking-[0.2em]">
                    Back
                </span>
            </RouterLink>
        </div>

        <!-- CONTENT -->
        <div class="mx-auto max-w-6xl">
            <img :src="project.image" :alt="project.title"
                class="mb-12 rounded-[2rem] w-full h-[320px] sm:h-[450px] md:h-[500px] lg:h-[700px] object-cover" />

            <div class="flex md:flex-row flex-col justify-between gap-10">
                <div>
                    <p class="mb-4 text-white/50 text-sm uppercase tracking-[0.3em]">
                        {{ project.category }}
                    </p>

                    <h1 class="font-bold text-4xl sm:text-5xl md:text-7xl leading-none tracking-tight">
                        {{ project.title }}
                    </h1>
                </div>

                <div class="max-w-xl">
                    <p class="text-white/70 text-base md:text-lg leading-relaxed">
                        {{ project.description }}
                    </p>

                    <span class="block mt-8 text-white/40 text-sm uppercase tracking-[0.2em]">
                        {{ project.year }}
                    </span>
                </div>
            </div>
        </div>
    </main>
</template>