<script setup>
import AppNavbar from '@/components/sections/AppNavbar.vue'
import HeroSection from '@/components/sections/Hero/HeroSection.vue'
import ProjectStack from '@/components/sections/Projects/ProjectStack.vue'
import AboutSection from '@/components/sections/About/AboutSection.vue'
import AppFooter from '@/components/sections/Footer/AppFooter.vue'
import FooterExperience from '@/components/sections/Footer/FooterExperience.vue'
</script>

<template>
  <AppNavbar />
  <HeroSection />
  <router-view />
  <ProjectStack />
  <AboutSection />
  <AppFooter />
  <footer class="relative overflow-hidden bg-black">

    <FooterExperience />

    <!-- optional dark overlay -->
    <div class="absolute inset-0 bg-black/30 z-[1]" />

    <div class="relative z-10">
      <!-- content footer -->
    </div>

  </footer>
</template>