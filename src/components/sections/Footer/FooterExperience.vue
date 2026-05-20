<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as Matter from 'matter-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

  const bounds = sceneRef.value.getBoundingClientRect()

  const width = bounds.width
  const height = bounds.height
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

  const techStacks = isMobile
    ? [
      'Vue',
      'GSAP',
      'Tailwind',
      'Figma',
      'Vite',
      'Lenis',
    ]
    : [
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
    const isMobile = window.innerWidth < 768

    const fontSize = isMobile ? 10 : 14
    const paddingX = isMobile ? 18 : 34
    const height = isMobile ? 34 : 56

    const width = tech.length * (isMobile ? 7.5 : 14) + paddingX

    const capsule = Bodies.rectangle(
      40 + Math.random() * (width - 80),
      -height - Math.random() * 400,
      width,
      height,
      {
        restitution: isMobile ? 0.45 : 0.9,
        friction: 0.02,
        density: 0.001,
        frictionAir: isMobile ? 0.04 : 0.01,
        chamfer: {
          radius: height / 2,
        },

        render: {
          fillStyle: 'rgba(255,255,255,0.06)',
          strokeStyle: 'rgba(255,255,255,0.18)',
          lineWidth: 1.2,
        },

        plugin: {
          text: tech,
          fontSize,
        },
      }
    )

    Composite.add(engine.world, capsule)
  })

  // MOUSE
  if (!isMobile) {
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
  }

  gsap.set(sceneRef.value, {
    opacity: 0,
    y: 120,
    scale: 0.9,
  })

  // PAUSE ENGINE DULU
  runner.enabled = false

  gsap.to(sceneRef.value, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.6,
    ease: 'power4.out',

    scrollTrigger: {
      trigger: sceneRef.value,
      start: 'top 85%',

      onEnter: () => {
        Render.run(render)
        Runner.run(runner, engine)

        // AKTIFKAN PHYSICS
        runner.enabled = true
      },
    },
  })

  // Render.run(render)
  // Runner.run(runner, engine)

  Matter.Events.on(render, 'afterRender', () => {
    const context = render.context

    Composite.allBodies(engine.world).forEach((body) => {
      if (!body.plugin.text) return

      const text = body.plugin.text
      const fontSize = body.plugin.fontSize || 14

      const vertices = body.vertices

      context.save()

      // ======================
      // GLASS SHADOW
      // ======================

      context.beginPath()
      context.moveTo(vertices[0].x, vertices[0].y)

      for (let i = 1; i < vertices.length; i++) {
        context.lineTo(vertices[i].x, vertices[i].y)
      }

      context.closePath()

      context.shadowColor = 'rgba(255,255,255,0.15)'
      context.shadowBlur = 30

      // GLASS FILL
      const gradient = context.createLinearGradient(
        body.position.x,
        body.position.y - 40,
        body.position.x,
        body.position.y + 40
      )

      gradient.addColorStop(0, 'rgba(255,255,255,0.14)')
      gradient.addColorStop(1, 'rgba(255,255,255,0.03)')

      context.fillStyle = gradient
      context.fill()

      // BORDER
      context.strokeStyle = 'rgba(255,255,255,0.18)'
      context.lineWidth = 1

      context.stroke()

      // ======================
      // TEXT
      // ======================

      context.translate(body.position.x, body.position.y)
      context.rotate(body.angle)

      context.font = `500 ${fontSize}px Inter, sans-serif`
      context.fillStyle = 'rgba(255,255,255,0.92)'
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      context.fillText(text, 0, 1)

      context.restore()
    })
  })
  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
  if (!sceneRef.value || !render) return

  const width = sceneRef.value.clientWidth
  const height = sceneRef.value.clientHeight

  render.canvas.width = width
  render.canvas.height = height

  render.options.width = width
  render.options.height = height
}

onBeforeUnmount(() => {
  Matter.Render.stop(render)
  Matter.Runner.stop(runner)

  if (render.canvas) {
    render.canvas.remove()
  }

  window.removeEventListener('resize', handleResize)

  render.textures = {}
})
</script>

<template>
  <div ref="sceneRef" class="absolute inset-0 w-full h-[70vh] md:h-full" />
</template>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
  pointer-events: auto;
  filter:
    contrast(1.05) saturate(1.1);
}
</style>