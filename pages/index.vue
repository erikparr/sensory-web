<template>
  <div>
    <section class="hero">
      <div class="hero-left">
        <h1>We design and build digital experiences that ship.</h1>
        <p class="hero-sub">From strategy to prototypes to production-ready code to results.</p>
        <div class="hero-ctas">
          <a href="#" class="cta-button" @click.prevent="showContact = true">Get in Touch</a>
          <a href="#work" class="cta-button-outline">View Work</a>
        </div>
      </div>
      <div class="hero-right">
        <ClientOnly>
          <HeroSphere />
        </ClientOnly>
      </div>
    </section>

    <FeaturedWork />

    <Services />

    <Process />

    <Philosophy />

    <About />

    <CtaBanner @open-contact="showContact = true" />

    <Footer />

    <ContactModal :visible="showContact" @close="showContact = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeaturedWork from '~/components/FeaturedWork.vue';
import Services from '~/components/Services.vue';
import Process from '~/components/Process.vue';
import Philosophy from '~/components/Philosophy.vue';
import About from '~/components/About.vue';
import CtaBanner from '~/components/CtaBanner.vue';
import Footer from '~/components/Footer.vue';
import ContactModal from '~/components/ContactModal.vue';
import HeroSphere from '~/components/HeroSphere.vue';

const showContact = ref(false)
</script>

<style>
:root {
  --max-width: 1200px;
  --padding: 2rem;
}

body {
  font-family: 'Nunito Sans', sans-serif;
  line-height: 1.6;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding);
}

.hero {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0;
  margin-bottom: 0;
  min-height: 100vh;
  padding-top: 64px;
}

.hero-left {
  flex: 0 0 50%;
  min-width: 0;
  padding-left: 8vw;
  padding-right: 3rem;
}

.hero-right {
  flex: 0 0 50%;
  min-width: 0;
  height: 100vh;
  align-self: stretch;
  overflow: hidden;
}

.hero h1 {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ff2d55;
  margin-bottom: 1.5rem;
}

.hero-sub {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-block;
  padding: 14px 28px;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.cta-button:hover {
  opacity: 0.85;
  color: var(--color-background);
}

.cta-button-outline {
  display: inline-block;
  padding: 12px 32px;
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text-muted);
  border-radius: 100px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.cta-button-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 768px) {
  :root {
    --padding: 1rem;
  }

  .hero {
    flex-direction: column;
    min-height: auto;
    padding-top: 64px;
  }

  .hero-left {
    order: 1;
    padding: 3rem 1rem;
    text-align: center;
  }

  .hero-right {
    order: 2;
    height: 350px;
    width: 100%;
  }

  .hero-ctas {
    justify-content: center;
  }

  .hero h1 {
    font-size: 2.5rem;
  }
}
</style>
