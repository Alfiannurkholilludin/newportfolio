<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

const containerRef = ref(null)

const pixels = []

const PIXEL_COUNT = 32

let mouseX = 0
let mouseY = 0

let animationFrame = null

const isMobile = window.innerWidth < 768

const handleMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const createPixels = () => {
  const container = containerRef.value

  if (!container) return

  for (let i = 0; i < PIXEL_COUNT; i++) {
    const pixel = document.createElement('div')

    pixel.className = 'pixel-trail'

    container.appendChild(pixel)

    pixels.push({
      el: pixel,
      x: mouseX,
      y: mouseY,
    })
  }
}

const animate = () => {
  let x = mouseX
  let y = mouseY

  pixels.forEach((pixel, index) => {
    const nextPixel = pixels[index + 1] || pixels[0]

    pixel.x = x
    pixel.y = y

    const scale = (PIXEL_COUNT - index) / PIXEL_COUNT

    gsap.set(pixel.el, {
      x: pixel.x,
      y: pixel.y,
      scale,
      opacity: scale,
    })

    x += (nextPixel.x - x) * 0.35
    y += (nextPixel.y - y) * 0.35
  })

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  if (isMobile) return

  createPixels()

  window.addEventListener('mousemove', handleMouseMove)

  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)

  cancelAnimationFrame(animationFrame)

  pixels.length = 0
})
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
  />
</template>

<style scoped>
.pixel-trail {
  position: absolute;

  width: 14px;
  height: 14px;

  border-radius: 2px;

  background: rgba(255, 255, 255, 0.95);

  border: 1px solid rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  mix-blend-mode: difference;

  image-rendering: pixelated;

  will-change: transform;

  box-shadow:
    0 0 12px rgba(255, 255, 255, 0.15),
    inset 0 0 10px rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .pixel-trail {
    display: none;
  }
}
</style>