<script setup>
import AppNavbar from '@/components/sections/AppNavbar.vue'
import HeroSection from '@/components/sections/Hero/HeroSection.vue'
import ProjectStack from '@/components/sections/Projects/ProjectStack.vue'
</script>

<template>
  <AppNavbar />
  <HeroSection />
  <router-view />
  <ProjectStack />
</template>