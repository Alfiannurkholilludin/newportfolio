<template>
  <section class="py-42">
    <!-- Header -->
    <h1 class="header-section">
      Scroll down to see a photo gallery being revealed
    </h1>

    <!-- Gallery Grid -->
    <div class="grid-container">
      <div class="grid">
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer centerPiece">
          <div class="gridBlock centerBlock"></div>
        </div>
        <div class="gridLayer">
          <div class="gridBlock">
            <a href="https://greensock.com" target="_blank"></a>
          </div>
        </div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
        <div class="gridLayer"><div class="gridBlock"></div></div>
      </div>
    </div>

    <!-- Extra content -->
    <h1 class="header-section mt-0">Some additional content</h1>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/project/1.png";
import img2 from "../assets/project/2.png";
import img3 from "../assets/project/3.png";
import img4 from "../assets/project/work1.png";
import img5 from "../assets/project/work2.png";
import img6 from "../assets/project/work3.png";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Scroll animation
  gsap.timeline({
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top top",
      end: () => innerHeight * 4,
      scrub: true,
      pin: ".grid",
      anticipatePin: 1,
    },
  })
    .set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
    .to(".gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
    .from(".gridLayer", {
      scale: 3.3333,
      ease: "none",
    });
  


  // 1. Array gambar Anda sendiri
const myImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
];

  // Random images for grid blocks
  const size = Math.max(innerWidth, innerHeight);

  gsap.set(".gridBlock", {
      backgroundImage: (i) => {
          // Ambil URL gambar dari array dengan pengulangan
          const imageUrl = myImages[i % myImages.length];
          return `url(${imageUrl})`;
      },
  });

  // Big image for center piece
  const bigImg = new Image();
  bigImg.addEventListener("load", () => {
    gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
  });
 bigImg.src = new URL('../assets/project/work1.png', import.meta.url).href;
});
</script>

<style>
.gridBlock {
  opacity: 0;
  display: block;
  position: absolute;
  background-size: cover;
  background-color: darkgray;
}

/* Container */
.grid-container {
  width: 50vw;
  height: 500vh;
  position: relative;
}

/* Main grid */
.grid {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 70vw;
  height: 60vw;
  margin: 0 calc(50vw / 20 * 3);
}

@media only screen and (max-width: 580px) {
  .grid {
    margin: 0;
    width: 100vw;
    height: 89.444vw;
  }
}

/* Grid layers */
.gridLayer {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  will-change: transform;
  transform-origin: 44.951% 50%;
}

/* Layer styles */
.gridLayer:nth-child(1) .gridBlock {
  top: 5vw;
  left: 20vw;
  width: 10vw;
  height: 10vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(1) .gridBlock {
    top: 11.111vw;
    left: 23.889vw;
    width: 15vw;
    height: 15vw;
  }
}

.gridLayer:nth-child(2) .gridBlock {
  top: 0;
  left: 32.5vw;
  width: 15vw;
  height: 15vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(2) .gridBlock {
    top: 0;
    left: 43.333vw;
    width: 26.389vw;
    height: 26.389vw;
  }
}

.gridLayer:nth-child(3) .gridBlock {
  top: 25vw;
  left: 0;
  width: 15vw;
  height: 15vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(3) .gridBlock {
    top: 30.278vw;
    left: 0;
    width: 26.389vw;
    height: 26.389vw;
  }
}

.gridLayer:nth-child(4) .gridBlock {
  top: 17.5vw;
  left: 17.5vw;
  width: 30vw;
  height: 30vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(4) .gridBlock {
    top: 30.278vw;
    left: 30.278vw;
    width: 39.444vw;
    height: 39.444vw;
  }
}

/* Center piece */
.gridLayer:nth-child(5) {
  z-index: 1;
}
.gridLayer:nth-child(5) .gridBlock {
  top: 20vw;
  left: 50vw;
  width: 5vw;
  height: 5vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(5) .gridBlock {
    top: 23.889vw;
    left: 73.889vw;
    width: 15.278vw;
    height: 15.278vw;
  }
}
.gridLayer:nth-child(5) a {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gridLayer:nth-child(5) svg {
  width: 1.75vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(5) svg {
    width: 4.722vw;
  }
}

/* Other layers */
.gridLayer:nth-child(6) .gridBlock {
  top: 27.5vw;
  left: 50vw;
  width: 20vw;
  height: 20vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(6) .gridBlock {
    top: 43.889vw;
    left: 73.889vw;
    width: 26.389vw;
    height: 26.389vw;
  }
}

.gridLayer:nth-child(7) .gridBlock {
  top: 42.5vw;
  left: 10vw;
  width: 5vw;
  height: 5vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(7) .gridBlock {
    display: none;
  }
}

.gridLayer:nth-child(8) .gridBlock {
  bottom: 5vw;
  left: 42.5vw;
  width: 5vw;
  height: 5vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(8) .gridBlock {
    display: none;
  }
}

.gridLayer:nth-child(9) .gridBlock {
  bottom: 0;
  left: 50vw;
  width: 10vw;
  height: 10vw;
}
@media only screen and (max-width: 580px) {
  .gridLayer:nth-child(9) .gridBlock {
    top: 73.889vw;
    left: 58.889vw;
    width: 15.278vw;
    height: 15.278vw;
  }
}
</style>
