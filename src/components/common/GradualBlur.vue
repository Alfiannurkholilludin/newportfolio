<script setup>
defineProps({
  position: {
    type: String,
    default: 'bottom',
  },

  height: {
    type: String,
    default: '180px',
  },
})
</script>

<template>
  <div
    class="mask-gradient pointer-events-none fixed left-0 z-[30] w-full overflow-hidden"
    :class="[
      position === 'top' ? 'top-0' : 'bottom-0'
    ]"
    :style="{
      height,
    }"
  >
    <div
      class="absolute inset-0 backdrop-blur-[2px]"
      :class="position === 'top'
        ? 'bg-gradient-to-b from-[#050505]/70 to-transparent'
        : 'bg-gradient-to-t from-[#050505]/70 to-transparent'"
    />

    <div
      class="absolute inset-0 backdrop-blur-[6px]"
      :class="position === 'top'
        ? 'bg-gradient-to-b from-[#050505]/60 via-[#050505]/20 to-transparent'
        : 'bg-gradient-to-t from-[#050505]/60 via-[#050505]/20 to-transparent'"
    />

    <div
      class="absolute inset-0 backdrop-blur-[12px]"
      :class="position === 'top'
        ? 'bg-gradient-to-b from-[#050505]/50 via-transparent to-transparent'
        : 'bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent'"
    />

    <div
      class="absolute inset-0 backdrop-blur-[24px]"
      :class="position === 'top'
        ? 'bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent'
        : 'bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent'"
    />
  </div>
</template>