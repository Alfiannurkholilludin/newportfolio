<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'

const { initLenis, destroyLenis } = useLenis()

onMounted(() => {
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <router-view />
</template>
