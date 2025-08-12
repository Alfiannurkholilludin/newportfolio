<template>
  <main class="relative overflow-x-hidden">

    <!-- Canvas untuk animasi background -->
    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full z-20"></canvas>

    <!-- Preloader -->
    <div ref="preloader" class="fixed top-0 left-0 w-full h-screen z-50 bg-[#0f0f0f] text-white flex items-center justify-center text-2xl font-semibold">
      <span ref="preloaderText">Welcome to you</span>
    </div>

    <section class="relative h-[100vh] w-full p-4 place-content-center flex flex-col gap-12 md:justify-center md:items-center z-10 ">
      <div class="wrapper_h1 max-w-[1024px] flex flex-col gap-4 items-center">
        <h1 class="title_hero text-4xl md:text-6xl md:text-center">Creating Visual Journey for Digital Products.</h1>
        <p class="paraghraph_hero md:text-center w-[100%] md:w-[70%]">Hi There ! I'm Alfian Nur, who passionate UI and Product Designer dedicated to crafting exceptional digital products with 3+ years experience.</p>
      </div>
      <div class="wrapper_cta">
        <a href="#" class="cta_text text-[16px] border-1 px-4 py-2 rounded-full hover:bg-[#f5f5f5] hover:text-[#0f0f0f] hover:transition hover:delay-300 hover:ease-in-out hover:duration-500 ">See my work</a>
      </div>
    </section>
    <!-- <MarqueeBrand /> -->
    <WorkView />
  </main>
</template>

<script setup>
  import { onMounted, ref, nextTick } from 'vue'
  import Matter from 'matter-js'
  import gsap from 'gsap'
  import * as anime from 'animejs'
  import WorkView from '@/views/WorkView.vue'
  import MarqueeBrand from '@/components/MarqueeBrand.vue'

  
  // import anime from 'animejs'

  const canvas = ref(null)
  const isDarkMode = ref(false)
  const preloader = ref(null)
  const preloaderText = ref(null)

  onMounted(() => {
     // Preload reveal animation menggunakan GSAP
    const tl = gsap.timeline()

    // Reveal teks di preloader
  tl.from(preloaderText.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })

  // Slide preloader keluar
  tl.to(preloader.value, {
    duration: 1,
    y: '-100%',
    ease: 'power3.inOut',
    delay: 0.5,
  })
    .set(preloader.value, { display: 'none' })

    // Fade in elemen konten utama
    .from('.wrapper_h1, .wrapper_cta', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
    }, '-=0.5')

    // Tunggu sampai canvas siap
  nextTick(() => {
    const { Engine, Render, Runner, Bodies, Composite, Body, Events, Mouse, MouseConstraint } = Matter

    const width = window.innerWidth
    const height = window.innerHeight
    const engine = Engine.create()
    const world = engine.world

    const render = Render.create({
      canvas: canvas.value,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    })

    const tools = ['UI/UX Design', 'Website Designing', 'App Designing', 'User Flow', 'Usability Testing', 'Prototyping', 'User Research']
    const pills = []

    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i]
      const pill = Bodies.rectangle(
        Math.random() * width,
        Math.random() * height,
        180,
        40,
        {
          chamfer: { radius: 20 },
          render: {
            fillStyle: `#333333`,
          },
          frictionAir: 0.02,
          label: tool,
        }
      )
      Body.rotate(pill, Math.random() * Math.PI)
      pills.push(pill)
      Composite.add(world, pill)
    }

    const wallThickness = 100
    const walls = [
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ]
    Composite.add(world, walls)

    // Mouse interaksi
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: true },
      },
    })
    Composite.add(world, mouseConstraint)
    render.mouse = mouse

    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    Events.on(render, 'afterRender', () => {
      const ctx = render.context
      ctx.font = '16px sans-serif'
      ctx.fillStyle = isDarkMode.value ? '#000000' : '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      pills.forEach(pill => {
        const { position, angle, label } = pill
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.rotate(angle)
        ctx.fillText(label, 0, 0)
        ctx.restore()
      })
    })

    const updatePillColors = () => {
      pills.forEach(pill => {
        pill.render.fillStyle = isDarkMode.value ? '#f5f5f5' : '#333333'
      })
    }

    const html = document.documentElement
    const observer = new MutationObserver(() => {
      isDarkMode.value = html.classList.contains('dark')
      updatePillColors()
    })
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })

    isDarkMode.value = html.classList.contains('dark')
    updatePillColors()

    // Responsif saat resize layar
    window.addEventListener('resize', () => {
      render.canvas.width = window.innerWidth
      render.canvas.height = window.innerHeight
      render.options.width = window.innerWidth
      render.options.height = window.innerHeight
      // Update mouse constraint agar posisi mouse benar
      mouse.pixelRatio = window.devicePixelRatio
    })
  })
})

</script>

<style scoped>

  canvas {
    display: block;
    pointer-events: none; /* Agar mouse events tidak mengganggu interaksi */
  }

  .title_hero {
    font-family: 'SFPRODISPLAYBOLD', sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .paraghraph_hero {
    font-family: 'SFPRODISPLAYREGULER', sans-serif;
  }

  .cta_text {
    font-family: 'SFPRODISPLAYREGULER', sans-serif;
  }

  /* Awal hidden untuk GSAP */
  .wrapper_h1,
  .wrapper_cta {
    opacity: 1;
    transform: translateY(30px);
  }
</style>
