<template>
  <div class="container">
    <section class="hero">
      <h1>A design engineering studio for AI companies.</h1>
      <p class="hero-sub">UX-first product design, R&D, and prototyping.</p>
      <a href="#contact" class="cta-button">Get in Touch</a>
    </section>

    <FeaturedWork />

    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import FeaturedWork from '~/components/FeaturedWork.vue';
import ContactForm from '~/components/ContactForm.vue';
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
  padding-top: calc(64px + var(--padding));
}

.hero {
  padding: 5rem 0;
  margin-bottom: 4rem;
  text-align: center;
}

.hero h1 {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.15;
  color: #ff6b9d;
  margin-bottom: 1.25rem;
}

.hero-sub {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 12px 32px;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.cta-button:hover {
  opacity: 0.85;
  color: var(--color-background);
}


@media (max-width: 768px) {
  :root {
    --padding: 1rem;
  }

  .hero h1 {
    font-size: 2.2rem;
  }
}
</style>
