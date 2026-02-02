<template>
  <div class="container">
    <header>
      <h1>SENSORY</h1>
      <p class="value-prop">
        We deliver prototypes, design advanced products and solve complex design problems to launch products with speed.
      </p>
      <a href="#contact" class="cta-button">Get in Touch</a>
    </header>

    <section class="services">
      <div class="services-grid">
        <div class="service-card">
          <h3>Launch Sprint</h3>
          <p>Concept to working prototype in 2 weeks</p>
        </div>
        <div class="service-card">
          <h3>Product Engineering</h3>
          <p>Embed with your team for focused builds</p>
        </div>
        <div class="service-card">
          <h3>Discovery Audit</h3>
          <p>1-week deep dive into your product/tech stack</p>
        </div>
      </div>
      <p class="pricing-signal">Engagements starting at $5K</p>
    </section>

    <Portfolio :isCollapsed="false" @collapse="() => { }" previewText="View Portfolio" />

    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import Portfolio from '~/components/Portfolio.vue';
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
  letter-spacing: 0.15em;
}

.value-prop {
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--color-text);
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

/* Services Section */
.services {
  margin-bottom: 3rem;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.service-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem 1.5rem;
}

.service-card h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.service-card p {
  font-size: 0.95rem;
  font-weight: 300;
  color: #999;
  margin-bottom: 0;
}

.pricing-signal {
  font-size: 0.95rem;
  color: #777;
  font-weight: 300;
}

@media (max-width: 768px) {
  :root {
    --padding: 1rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .value-prop {
    font-size: 1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
