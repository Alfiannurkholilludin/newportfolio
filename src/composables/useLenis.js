import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis

export function useLenis() {
  const initLenis = () => {
    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return lenis
  }

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  }

  return {
    initLenis,
    destroyLenis,
    lenis
  }
}