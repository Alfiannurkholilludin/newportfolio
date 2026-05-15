<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  work: Object
})
</script>

<template>
  <RouterLink
    :to="`/projects/${work.slug}`"
    class="group flex md:flex-row flex-col justify-between items-start md:items-center gap-6 hover:bg-white/[0.03] px-0 py-10 border-white/10 border-b transition-all duration-500"
  >
    <div>
      <h2
        class="font-semibold text-4xl md:text-6xl tracking-[-0.05em] transition-opacity duration-300 group-hover:opacity-60"
      >
        {{ work.title }}
      </h2>
    </div>

    <div
      class="flex items-center gap-10 text-white/40 text-sm uppercase tracking-[0.2em]"
    >
      <span>{{ work.category }}</span>
      <span>{{ work.year }}</span>
    </div>
  </RouterLink>
</template>