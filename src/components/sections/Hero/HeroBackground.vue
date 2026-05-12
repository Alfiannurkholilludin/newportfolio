<template>
  <div class="relative w-full h-full">
    <Orb :hoverIntensity="0.5" :rotateOnHover="true" :hue="0" :forceHoverState="false" />
  </div>
</template>

<script setup lang="ts">
import Orb from '@/components/common/Orb.vue'
</script>