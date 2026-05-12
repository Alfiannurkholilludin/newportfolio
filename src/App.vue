<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'
import CursorFollower from '@/components/common/CursorFollower.vue'

const { initLenis, destroyLenis } = useLenis()

onMounted(() => {
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <div class="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
    <CursorFollower />

    <router-view />
  </div>
</template>
