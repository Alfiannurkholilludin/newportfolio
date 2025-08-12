<script setup>
import { RouterLink } from 'vue-router';
import { ref, watch, onMounted } from 'vue'

const isOpen = ref(false)
const isDark = ref(false)

// Simpan preferensi ke localStorage
onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})
</script>

<template>
  <main>
    <header class="flex absolute p-4 w-full place-content-center items-center fixed z-20">
      <div class="wrapper w-full max-w-[769px] px-6 py-4 flex bg-[#bbbbbb76] dark:bg-[#222222aa] rounded-full items-center justify-between">
        <!-- Logo -->
        <img class="h-[32px] w-[32px]" src="@/assets/logo/logolight.png" alt="Logo Light" />

        <!-- Desktop Nav -->
        <nav class="hidden md:flex gap-4">
          <RouterLink class="text-[#0f0f0f] dark:text-[#f5f5f5] text-[16px]" to="/">Home</RouterLink>
          <RouterLink class="text-[#0f0f0f] dark:text-[#f5f5f5] text-[16px]" to="/about">About</RouterLink>
          <RouterLink class="text-[#0f0f0f] dark:text-[#f5f5f5] text-[16px]" to="/blog">Blog</RouterLink>
          <RouterLink class="text-[#0f0f0f] dark:text-[#f5f5f5] text-[16px]" to="/mywork">My Work</RouterLink>
          <div class="wrapper_cta">
            <a href="#" class="cta_text text-[16px] text-[#0f0f0f] bg-[#0f0f0f] md:bg-[#f5f5f5] px-4 py-2 rounded-full ">Check my resume</a>
          </div>
          <!-- Tambahkan tombol toggle dark mode -->
          <button @click="isDark = !isDark" class="ml-4">
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:text-[#f5f5f5]" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71M18.36 5.64l-.71.71M5.64 18.36l-.71.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
        </nav>
        <!-- Burger Button (Mobile only) -->
        <button class="md:hidden focus:outline-none" @click="isOpen = !isOpen">
          <svg v-if="!isOpen" class="h-6 w-6 dark:text-[#f5f5f5]" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6 dark:text-[#f5f5f5]" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Nav Menu -->
    <div v-if="isOpen" class="md:hidden absolute px-6 py-4 text-center w-full max-w-[640px] h-full mx-auto transition-all flex flex-col justify-start gap-12 fixed dark:bg-[#0f0f0f] z-30">
        <!-- Burger Button (Mobile only) -->
        <button class="md:hidden py-4 flex justify-end focus:outline-none" @click="isOpen = !isOpen">
          <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6 text-[#0f0f0f] dark:text-[#f5f5f5]" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      <RouterLink class="block py-2 text-[22px] text-[#0f0f0f] dark:text-[#f5f5f5] items-center" to="/">Home</RouterLink>
      <RouterLink class="block py-2 text-[22px] text-[#0f0f0f] dark:text-[#f5f5f5] items-center" to="/about">About</RouterLink>
      <RouterLink class="block py-2 text-[22px] text-[#0f0f0f] dark:text-[#f5f5f5] items-center" to="/blog">Blog</RouterLink>
      <RouterLink class="block py-2 text-[22px] text-[#0f0f0f] dark:text-[#f5f5f5] items-center" to="/mywork">My Work</RouterLink>
      <div class="wrapper_cta">
        <a href="#" class="cta_text text-[22px] text-[#0f0f0f] bg-[#f5f5f5] px-4 py-2 rounded-full ">Check my resume</a>
      </div>
      <!-- Tambahkan tombol toggle dark mode -->
      <button @click="isDark = !isDark" class=" ml-4">
        <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:text-[#f5f5f5]" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71M18.36 5.64l-.71.71M5.64 18.36l-.71.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
    </div>
  </main>
</template>

<style scoped>
    @media (min-width: 1024px) {
        
    }
</style>