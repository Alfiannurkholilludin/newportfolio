<template>
  <div
    class="relative overflow-hidden w-full py-6"
    @mouseenter="pauseMarquee"
    @mouseleave="resumeMarquee"
  >
    <!-- Efek blur kiri -->
    <div class="absolute left-0 top-0 h-full w-[120px] pointer-events-none fade-edge-left z-1"></div>
    <!-- Efek blur kanan -->
    <div class="absolute right-0 top-0 h-full w-[120px] pointer-events-none fade-edge-right z-1"></div>

    <!-- Track logo -->
    <div ref="track" class="flex marquee-track">
      <div
        v-for="(logo, index) in loopedLogos"
        :key="index"
        class="flex-shrink-0 px-8"
      >
        <img
          :src="logo"
          alt="Brand Logo"
          class="h-16 w-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import logo1 from "@/assets/brand/balifiber.png";
import logo2 from "@/assets/brand/balitower.png";
import logo3 from "@/assets/brand/pim 2.png";
import logo4 from "@/assets/brand/Bakti.png";
// import logo5 from "@/assets/brand/windows.png";
// import logo6 from "@/assets/brand/Bakti.png";

export default {
  setup() {
    const track = ref(null);
    const marqueeTween = ref(null);

    const logos = [logo1, logo2, logo3, logo4];
    const loopedLogos = computed(() => [...logos, ...logos, ...logos]); // lebih banyak biar looping mulus

    onMounted(() => {
      const totalWidth = track.value.scrollWidth / 3; // 1 set asli
      marqueeTween.value = gsap.to(track.value, {
        x: `-=${totalWidth}`,
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // wrap posisi
        }
      });

      ScrollTrigger.create({
        trigger: track.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const speed = 1 + self.progress * 2;
          marqueeTween.value.timeScale(speed);
        }
      });
    });

    const pauseMarquee = () => marqueeTween.value.timeScale(0);
    const resumeMarquee = () => marqueeTween.value.timeScale(1);

    return { track, loopedLogos, pauseMarquee, resumeMarquee };
  }
};
</script>


<style>
.marquee-track {
  will-change: transform;
}

/* Efek blur kiri */
.fade-edge-left {
  background: linear-gradient(to right, white, transparent);
  filter: blur(2px);
}

.fade-edge-right {
  background: linear-gradient(to left, white, transparent);
  filter: blur(2px);
}

/* Dark mode */
:deep(html.dark) .fade-edge-left {
  background: linear-gradient(to right, #0f172a, transparent);
}

:deep(html  .dark) .fade-edge-right {
  background: linear-gradient(to left, #0f172a, transparent);
}
</style>
