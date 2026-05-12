<script setup>
import HeroBackground from '@/components/sections/Hero/HeroBackground.vue'
import HeroContent from '@/components/sections/Hero/HeroContent.vue'
</script>

<template>
  <section class="relative overflow-hidden w-full h-screen">

    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <HeroBackground />
    </div>

    <!-- Content -->
    <div class="z-10 relative flex justify-center items-center px-6 w-full h-full pointer-events-none">
      <HeroContent />
    </div>

  </section>
</template>