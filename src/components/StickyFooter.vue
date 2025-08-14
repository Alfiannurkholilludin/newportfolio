<template>
  <section class="wrapper-footer z-0">
    <img class="" src="@/assets/Footer.png" alt="footer" />
  </section>
</template>

<script setup>
import { onMounted } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const footer = document.querySelector(".wrapper-footer")

  if (!footer) return

  const getOverlap = () =>
    Math.min(window.innerHeight, footer.offsetHeight)

  const adjustFooterOverlap = () => {
    footer.style.marginTop = -getOverlap() + "px"
  }

  adjustFooterOverlap()

  ScrollTrigger.addEventListener("revert", adjustFooterOverlap)

  ScrollTrigger.create({
    trigger: footer,
    start: () => "top " + (window.innerHeight - getOverlap()),
    end: () => "+=" + getOverlap(),
    pin: true,
  })
})
</script>

<style scoped>
.wrapper-footer {
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: -1;
}
</style>
