<template>
  <section id="work" class="featured-work">
    <h2 class="section-title">Featured Work</h2>
    <div class="work-grid">
      <a
        v-for="project in projects"
        :key="project.slug"
        :href="project.link || '#'"
        class="work-card"
      >
        <div class="work-card-image" :class="{ 'work-card-interactive': project.interactive }">
          <ClientOnly v-if="project.interactive">
            <FoamLogo3D />
          </ClientOnly>
          <img v-else :src="project.image" :alt="project.title" />
        </div>
        <div class="work-card-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import FoamLogo3D from '~/components/FoamLogo3D.vue';
import imgGlobalNutrition from '~/assets/images/global-nutrition.png';
import imgUnderArmour from '~/assets/images/under-armour.png';
import imgMac from '~/assets/images/mac.png';
import imgLevis from '~/assets/images/levis.png';
import imgSamsung from '~/assets/images/samsung.png';
import imgAdidas from '~/assets/images/adidas.png';

const projects = [
  {
    slug: 'foam',
    title: 'FOAM — Design / Development / Product',
    description: 'Designed and built a creative product that makes AI-generated speech playable. FOAM transforms synthesized voice into phonetic elements—enabling musicians to trigger stutters, glitch consonants, and vowel textures via MIDI.',
    interactive: true,
    link: 'https://www.extrasensory.studio/foam',
  },
  {
    slug: 'intuitive',
    title: 'Intuitive Surgical — Advanced Product Design',
    description: 'Built future-facing surgical video prototypes that changed how clinicians review procedures. Designed and engineered advanced interfaces linking procedure video with rich system data and event timelines.',
    image: '/images/intuitive.png',
  },
  {
    slug: 'global-nutrition',
    title: 'Global Nutrition Unified',
    description: "We unified ADM's marketing ecosystem across 15+ business units—bringing together fragmented campaigns, tech, and teams under one smart, scalable system.",
    image: imgGlobalNutrition,
  },
  {
    slug: 'under-armour',
    title: 'Under Armour Elite Fitness Companion',
    description: 'An in-store program where athletes can connect with experts in their respective sports and chart a path towards continuous improvement.',
    image: imgUnderArmour,
  },
  {
    slug: 'mac',
    title: 'Reinventing the Beauty Experience',
    description: 'MAC Cosmetics turned to our team to help transform their in-store experience into a modern, omnichannel journey.',
    image: imgMac,
  },
  {
    slug: 'adidas',
    title: 'Adidas AR Exhibition',
    description: 'Delivered a permanent AR exhibition at Adidas HQ Germany, with interactive experiences triggered by physical markers. Led creative technical direction for the full interactive exhibition.',
    image: imgAdidas,
  },
  {
    slug: 'suckerpunch',
    title: 'Suckerpunch Web Campaign',
    description: 'Lead Software Development for a seamless 3D web experience that allowed users to experience a new product in a fun way. The experience was built using Three.js and WebGL to create a fully interactive 3D environment that could be explored in the browser.',
    image: 'https://eaca4835oc4rgi75.public.blob.vercel-storage.com/suckerpunchv.gif',
  },
  {
    slug: 'levis',
    title: "Levi's Taylor's Tools",
    description: "We built a system for Levi's tailors to digitize their looks books, share and build a fan base, and work with customers all around the world.",
    image: imgLevis,
  },
  {
    slug: 'samsung',
    title: 'Reimagining Retail with Samsung',
    description: 'We partnered with Samsung to create an immersive AR showroom experience.',
    image: imgSamsung,
  },
  {
    slug: 'microsoft',
    title: 'Permanent Installation at Microsoft Cybercrime Center',
    description: 'Created a permanent data visualization installation mapping live botnet activity from millions of infected computers, letting researchers visually and sonically explore realtime datasets.',
    image: 'https://eaca4835oc4rgi75.public.blob.vercel-storage.com/ocr.gif',
  },
];
</script>

<style scoped>
.featured-work {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 200;
  letter-spacing: 0.05em;
  color: var(--color-text);
  margin-bottom: 2.5rem;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.work-card {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: transform var(--duration-normal) var(--ease-in-out),
              border-color var(--duration-normal) var(--ease-in-out);
}

.work-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-text-muted);
}

.work-card-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--color-background);
}

.work-card-interactive {
  height: 0;
  padding-bottom: 62.5%;
  position: relative;
}

.work-card-interactive :deep(.foam-logo-3d) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.work-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-in-out);
}

.work-card:hover .work-card-image img {
  transform: scale(1.03);
}

.work-card-info {
  padding: 1.5rem;
}

.work-card-info h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.work-card-info p {
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
}
</style>
