<script setup>
import { ref } from 'vue'
import { works } from '@/data/works'

import WorkItem from '@/components/sections/Works/WorkItem.vue'
import WorksPreview from '@/components/sections/Works/WorksPreview.vue'

const activeWork = ref(null)

const mouseX = ref(0)
const mouseY = ref(0)

const setActiveWork = (work) => {
    activeWork.value = work
}

const clearActiveWork = () => {
    activeWork.value = null
}

const handleMouseMove = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
}
</script>

<template>
    <section class="relative px-6 md:px-12 pt-40 pb-20" @mousemove="handleMouseMove">
        <!-- BACK BUTTON -->
        <div class="mb-16 md:mx-20">
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

        <div class="mx-auto max-w-7xl">
            <div class="mb-24">
                <h1 class="font-bold text-[14vw] md:text-[9vw] leading-none tracking-[-0.06em]">
                    Works
                </h1>
            </div>

            <div class="border-white/10 border-t">
                <WorkItem v-for="work in works" :key="work.id" :work="work" @mouseenter="setActiveWork(work)"
                    @mouseleave="clearActiveWork" />
            </div>
        </div>

        <WorksPreview :work="activeWork" :mouse-x="mouseX" :mouse-y="mouseY" />
    </section>
</template>