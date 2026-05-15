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
      width,
      height,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio
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
  for (let i = 0; i < 18; i++) {
    const radius = Math.random() * 70 + 30

    const circle = Bodies.circle(
      Math.random() * width,
      Math.random() * -height,
      radius,
      {
        restitution: 0.9,
        friction: 0.01,
        density: 0.001,
        render: {
          fillStyle:
            i % 2 === 0
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(255,255,255,0.22)'
        }
      }
    )

    Composite.add(engine.world, circle)
  }

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
  <div
    ref="sceneRef"
    class="absolute inset-0 z-0"
  />
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto;
}
</style>