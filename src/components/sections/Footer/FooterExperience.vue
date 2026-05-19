<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as Matter from 'matter-js'

const sceneRef = ref(null)

let engine
let render
let runner

onMounted(() => {
  const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint
  } = Matter

  const width = window.innerWidth
  const height = window.innerHeight

  engine = Engine.create()

  render = Render.create({
    element: sceneRef.value,
    engine,
    options: {
      width: sceneRef.value.clientWidth,
      height: sceneRef.value.clientHeight,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio,
    }
  })

  runner = Runner.create()

  // WALLS
  const walls = [
    Bodies.rectangle(width / 2, height + 50, width * 2, 100, {
      isStatic: true,
      render: {
        visible: false
      }
    }),

    Bodies.rectangle(-50, height / 2, 100, height * 2, {
      isStatic: true,
      render: {
        visible: false
      }
    }),

    Bodies.rectangle(width + 50, height / 2, 100, height * 2, {
      isStatic: true,
      render: {
        visible: false
      }
    })
  ]

  Composite.add(engine.world, walls)

  // OBJECTS
  const isMobile = window.innerWidth < 768

  const techStacks = [
    'Vue.js',
    'GSAP',
    'Tailwind',
    'Matter.js',
    'JavaScript',
    'Figma',
    'Node.js',
    'Laravel',
    'Vite',
    'Lenis',
  ]

  techStacks.forEach((tech, i) => {
    const fontSize = isMobile ? 11 : 14
    const paddingX = isMobile ? 20 : 32
    const height = isMobile ? 40 : 56

    const width = tech.length * (isMobile ? 9 : 14) + paddingX

    const capsule = Bodies.rectangle(
      Math.random() * window.innerWidth,
      Math.random() * -window.innerHeight,
      width,
      height,
      {
        restitution: 0.9,
        friction: 0.01,
        density: 0.001,
        chamfer: {
          radius: height / 2,
        },
        render: {
          fillStyle:
            i % 2 === 0
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,0.14)',
          strokeStyle: 'rgba(255,255,255,0.12)',
          lineWidth: 1,
        },
      }
    )

    capsule.labelText = tech
    capsule.fontSize = fontSize

    Composite.add(engine.world, capsule)
  })

  // MOUSE
  const mouse = Mouse.create(render.canvas)

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  })

  Composite.add(engine.world, mouseConstraint)

  render.mouse = mouse

  Render.run(render)
  Runner.run(runner, engine)

  // RESIZE
  const handleResize = () => {
    render.canvas.width = window.innerWidth
    render.canvas.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  Matter.Render.stop(render)
  Matter.Runner.stop(runner)

  if (render.canvas) {
    render.canvas.remove()
  }

  render.textures = {}
})
</script>

<template>
  <div ref="sceneRef" class="absolute inset-0 w-full h-full" />
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto;
}
</style>