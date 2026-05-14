<script setup>
</script>

<template>
    <div class="page-transition">
        <slot />
    </div>
</template>

<style scoped>
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