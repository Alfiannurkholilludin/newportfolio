<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'
import CursorFollower from '@/components/common/CursorFollower.vue'
import LoaderIntro from '@/components/loader/LoaderIntro.vue'

const { initLenis, destroyLenis } = useLenis()

onMounted(() => {
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <div class="min-h-screen text-white overflow-x-hidden">
    <CursorFollower />
    <LoaderIntro />

    <router-view />
  </div>
</template>
