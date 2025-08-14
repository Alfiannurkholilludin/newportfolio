<template>
  <section
    ref="root"
    class="relative w-full h-[75vh] md:h-[90vh] overflow-hidden rounded-3xl shadow-xl border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-neutral-900"
  >
    <!-- UI overlay -->
    <div class="absolute z-10 top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between pointer-events-none">
      <h2 class="text-lg md:text-2xl font-semibold text-neutral-900 dark:text-white">Curved Mouse Distortion</h2>
      <div class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">Gerakkan kursor di atas gambar ✨</div>
    </div>

    <!-- Pixi canvas host -->
    <div ref="stageHolder" class="absolute inset-0"></div>

    <!-- Fallback image (sebelum WebGL siap) -->
    <img
      :src="imageSrc"
      alt="distortion"
      class="absolute inset-0 w-full h-full object-cover select-none opacity-0"
      :class="{ 'opacity-100': !isReady }"
      draggable="false"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { Application, Assets, Sprite, Filter } from 'pixi.js'

const props = defineProps({
  imageSrc: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop'
  },
  // radius area efek (0..1 relatif terhadap lebar/tinggi sprite; 0.25 ~ 25% dari min dimension)
  radius: { type: Number, default: 0.25 },
  // kekuatan distorsi (0..1 tipikal 0.15 - 0.45)
  strength: { type: Number, default: 0.28 },
  // intensitas ripple (frekuensi/kecepatan)
  rippleAmp: { type: Number, default: 0.12 },
  rippleFreq: { type: Number, default: 24.0 },
  rippleSpeed: { type: Number, default: 0.6 }
})

const root = ref(null)
const stageHolder = ref(null)
const app = ref(null)
const isReady = ref(false)

let sprite, shaderFilter
let unsub = []

function coverFit(sprite, w, h) {
  const texW = sprite.texture.width
  const texH = sprite.texture.height
  const s = Math.max(w / texW, h / texH)
  sprite.scale.set(s)
  sprite.x = (w - texW * s) * 0.5
  sprite.y = (h - texH * s) * 0.5
}

// GLSL shader: curve-like warping di sekitar pointer dengan ripple halus
const frag = `
  precision highp float;
  varying vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;        // 0..1 di dalam sprite
  uniform float uTime;        // detik
  uniform float uRadius;      // area pengaruh (relatif min dim)
  uniform float uStrength;    // kekuatan base warp
  uniform float uRippleAmp;   // amplitudo ripple tambahan
  uniform float uRippleFreq;  // frekuensi ripple
  uniform float uRippleSpeed; // kecepatan animasi ripple

  // util clamp
  float saturate(float x){ return clamp(x, 0.0, 1.0); }

  void main(){
    vec2 uv = vTextureCoord; // 0..1

    // Distorsi berbasis jarak
    vec2 toMouse = uv - uMouse;
    float d = length(toMouse);

    // Falloff halus agar tepi lembut
    float r = uRadius; // radius pengaruh
    float falloff = 1.0 - saturate(d / r);
    falloff = pow(falloff, 2.0); // kurva lebih lembut

    // Arah lekukan: dorong/ tarik menuju/menjauhi mouse dengan kurva cubic
    float curve = (uStrength * falloff) * (1.0 - d / r);

    // Ripple sin yang mengikuti jarak + waktu
    float ripple = uRippleAmp * sin(d * uRippleFreq - uTime * 6.28318 * uRippleSpeed);

    // Kombinasikan warp arah radial + ripple tangensial ringan
    vec2 dir = normalize(toMouse + 1e-5);
    vec2 tangent = vec2(-dir.y, dir.x);

    vec2 warpedUV = uv - dir * curve + tangent * ripple * falloff;

    // Jaga uv tetap di 0..1 supaya tidak sampling luar
    warpedUV = clamp(warpedUV, 0.0, 1.0);

    gl_FragColor = texture2D(uTexture, warpedUV);
  }
`;

onMounted(async () => {
  app.value = new Application()
  await app.value.init({
    antialias: true,
    backgroundAlpha: 0,
    resizeTo: stageHolder.value
  })
  stageHolder.value.appendChild(app.value.canvas)

  const tex = await Assets.load(props.imageSrc)
  sprite = new Sprite(tex)
  app.value.stage.addChild(sprite)

  // Filter dengan uniforms
  shaderFilter = Filter.from(undefined, frag, {
    uTexture: tex,
    uMouse: { x: 0.5, y: 0.5 },
    uTime: 0.0,
    uRadius: props.radius,
    uStrength: props.strength,
    uRippleAmp: props.rippleAmp,
    uRippleFreq: props.rippleFreq,
    uRippleSpeed: props.rippleSpeed
  })
  sprite.filters = [shaderFilter]

  // Layout awal
  const w = stageHolder.value.clientWidth
  const h = stageHolder.value.clientHeight
  coverFit(sprite, w, h)

  // Pointer → update uniform uMouse (ke koordinat UV sprite)
  const updateMouse = (e) => {
    const rect = stageHolder.value.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    // Konversi ke koordinat lokal sprite
    const sx = (px - sprite.x) / (sprite.texture.width * sprite.scale.x)
    const sy = (py - sprite.y) / (sprite.texture.height * sprite.scale.y)

    // Lerp agar gerakan smooth
    const target = { x: sx, y: sy }
    gsap.to(shaderFilter.uniforms.uMouse, { x: target.x, y: target.y, duration: 0.18, ease: 'power3.out' })

    // Bounce strength sesaat saat mouse bergerak (opsional, rasa GSAP)
    gsap.to(shaderFilter.uniforms, { uStrength: props.strength * 1.25, duration: 0.12, overwrite: true })
    gsap.to(shaderFilter.uniforms, { uStrength: props.strength, duration: 0.5, delay: 0.05 })
  }
  stageHolder.value.addEventListener('pointermove', updateMouse)
  unsub.push(() => stageHolder.value?.removeEventListener('pointermove', updateMouse))

  // Time ticker buat ripple
  const tick = (delta) => {
    shaderFilter.uniforms.uTime += (delta / 60)
  }
  app.value.ticker.add(tick)
  unsub.push(() => app.value.ticker.remove(tick))

  // Resize
  const onResize = () => {
    const w = stageHolder.value.clientWidth
    const h = stageHolder.value.clientHeight
    coverFit(sprite, w, h)
  }
  window.addEventListener('resize', onResize)
  unsub.push(() => window.removeEventListener('resize', onResize))

  isReady.value = true
})

onBeforeUnmount(() => {
  unsub.forEach((fn) => fn && fn())
  if (app.value) {
    app.value.destroy(true)
    app.value = null
  }
})
</script>

<style scoped>
/* Tailwind mengatur warna/tema; tidak perlu CSS tambahan. */
</style>