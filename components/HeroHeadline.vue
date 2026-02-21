<template>
  <h1 ref="headlineRef" class="hero-headline">
    <span
      v-for="(word, i) in words"
      :key="i"
      ref="wordRefs"
      class="hero-word"
    >{{ word }}&nbsp;</span>
  </h1>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const emit = defineEmits<{
  assembled: []
}>()

const words = ['We', 'design', 'and', 'build', 'digital', 'experiences', 'that', 'ship.']

// Assembly: words fly in from varied diagonal directions (organic entry)
const wordAnimMap = [
  { x: -200, y: -150, rotation: -15, delay: 0 },       // We — left+up
  { x: 250, y: 0, rotation: 12, delay: 0.08 },          // design — right
  { x: 0, y: -200, rotation: -8, delay: 0.16 },          // and — top
  { x: -220, y: 180, rotation: 10, delay: 0.12 },        // build — left+down
  { x: 280, y: -120, rotation: -14, delay: 0.24 },       // digital — right+up
  { x: -260, y: 160, rotation: 16, delay: 0.2 },         // experiences — left+down
  { x: 0, y: 220, rotation: -10, delay: 0.28 },          // that — bottom
  { x: 300, y: 0, rotation: 18, delay: 0.32 },           // ship. — right
]

// Disassembly: cardinal directions only (clean typographic exit)
const wordExitMap = [
  { x: -400, y: 0, rotation: 0 },    // We — left
  { x: 400, y: 0, rotation: 0 },     // design — right
  { x: 0, y: -300, rotation: 0 },    // and — up
  { x: 0, y: 300, rotation: 0 },     // build — down
  { x: 400, y: 0, rotation: 0 },     // digital — right
  { x: -400, y: 0, rotation: 0 },    // experiences — left
  { x: 0, y: 300, rotation: 0 },     // that — down
  { x: 400, y: 0, rotation: 0 },     // ship. — right
]

const headlineRef = ref<HTMLElement | null>(null)
const wordRefs = ref<HTMLSpanElement[]>([])

let assemblyTl: gsap.core.Timeline | null = null
let disassemblyTl: gsap.core.Timeline | null = null
let scrollTriggerInstance: ScrollTrigger | null = null

onMounted(async () => {
  await nextTick()

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    wordRefs.value.forEach((el) => {
      gsap.set(el, { opacity: 1 })
    })
    emit('assembled')
    return
  }

  // Lock scroll during assembly
  document.body.style.overflow = 'hidden'

  // Set initial positions
  wordRefs.value.forEach((el, i) => {
    const map = wordAnimMap[i]
    gsap.set(el, {
      x: map.x,
      y: map.y,
      rotation: map.rotation,
      opacity: 0,
      scale: 0.8,
    })
  })

  // Assembly timeline
  assemblyTl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = ''
      emit('assembled')
      setupDisassembly()
    },
  })

  wordRefs.value.forEach((el, i) => {
    const map = wordAnimMap[i]
    assemblyTl!.to(
      el,
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
      map.delay
    )
  })
})

function setupDisassembly() {
  const heroSection = headlineRef.value?.closest('.hero') as HTMLElement | null
  if (!heroSection) return

  disassemblyTl = gsap.timeline({ paused: true })

  wordRefs.value.forEach((el, i) => {
    const exit = wordExitMap[i]
    disassemblyTl!.to(
      el,
      {
        x: exit.x,
        y: exit.y,
        rotation: exit.rotation,
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
      },
      0
    )
  })

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 0.5,
    animation: disassemblyTl,
  })
}

onUnmounted(() => {
  assemblyTl?.kill()
  disassemblyTl?.kill()
  scrollTriggerInstance?.kill()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.hero-headline {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ff2d55;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.hero-word {
  display: inline-block;
  will-change: transform, opacity;
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 2.5rem;
  }
}
</style>
