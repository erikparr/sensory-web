<template>
  <div class="container">
    <header>
      <h1>Sensory</h1>
      <p class="domain-line">Interactive Systems · Data Visualization · AI-Driven Tools </p>
      <p class="hero-paragraph">
        Designing interactive systems—advanced product tools and UIs, immersive experiences, and AI-driven interfaces.
        End-to-end ownership from exploratory prototyping to stable, production-quality implementations for advanced
        product teams.
      </p>
    </header>

    <DesignEngineeringSkills />

    <Portfolio :isCollapsed="false" @collapse="() => { }" previewText="View Portfolio" />
  </div>
</template>

<script setup lang="ts">
import DesignEngineeringSkills from '~/components/DesignEngineeringSkills.vue';
import Portfolio from '~/components/Portfolio.vue';
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
  padding: var(--padding);
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 4rem;
  font-weight: 200;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.role-line {
  font-size: 1.5rem;
  font-weight: 300;
  color: #7AA3D1;
  margin-bottom: 0.5rem;
}

.domain-line {
  font-size: 1.1rem;
  font-weight: 400;
  color: #888;
  margin-bottom: 2rem;
}

.hero-paragraph {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--color-text);
}

@media (max-width: 768px) {
  :root {
    --padding: 1rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .role-line {
    font-size: 1.1rem;
  }

  .domain-line {
    font-size: 0.95rem;
  }

  .hero-paragraph {
    font-size: 1rem;
  }
}
</style>