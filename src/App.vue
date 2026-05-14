<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'
import CursorFollower from '@/components/common/CursorFollower.vue'
import LoaderIntro from '@/components/loader/LoaderIntro.vue'
import PageTransition from '@/components/transition/PageTransition.vue'

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
    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in" enter-active-class="page-enter-active" leave-active-class="page-leave-active"
        enter-from-class="page-enter-from" leave-to-class="page-leave-to">
        <PageTransition :key="route.fullPath">
          <component :is="Component" />
        </PageTransition>
      </Transition>
    </RouterView>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.6s ease,
    filter 0.6s ease;
}

.page-enter-from {
  opacity: 0;
  filter: blur(10px);
}

.page-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
