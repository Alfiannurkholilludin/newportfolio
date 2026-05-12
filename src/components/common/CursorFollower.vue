<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

let current = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

let isHovering = false

const speed = 0.12

const moveCursor = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const handleMouseEnter = () => {
  isHovering = true

  gsap.to(cursorRef.value, {
    scale: 2.5,
    duration: 0.3,
    ease: 'power3.out'
  })
}

const handleMouseLeave = () => {
  isHovering = false

  gsap.to(cursorRef.value, {
    scale: 1,
    duration: 0.3,
    ease: 'power3.out'
  })
}

const animate = () => {
  current.x += (mouse.x - current.x) * speed
  current.y += (mouse.y - current.y) * speed

  gsap.set(cursorRef.value, {
    x: current.x,
    y: current.y
  })

  requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)

  const hoverElements = document.querySelectorAll('a, button')

  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })

  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)

  const hoverElements = document.querySelectorAll('a, button')

  hoverElements.forEach((el) => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<template>
  <div
    ref="cursorRef"
    class="top-0 left-0 z-[9999] fixed bg-white mix-blend-difference rounded-full pointer-events-none"
    style="
      width: 18px;
      height: 18px;
      transform: translate(-50%, -50%);
      will-change: transform;
    "
  />
</template>