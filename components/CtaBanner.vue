<template>
  <section class="cta-banner">
    <h2>Let's build your next digital product.</h2>
    <div class="cta-banner-actions">
      <a href="#" class="cta-banner-btn" @click.prevent="$emit('openContact')">Start a project</a>
      <a href="#" class="cta-banner-email" @click.prevent="$emit('openContact')">hello@sensory.build</a>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'openContact'): void }>()
</script>

<style scoped>
.cta-banner {
  background-color: #ff2d55;
  padding: 6rem 8vw;
  text-align: center;
}

.cta-banner h2 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 2.5rem;
}

.cta-banner-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.cta-banner-btn {
  display: inline-block;
  padding: 14px 32px;
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.cta-banner-btn:hover {
  opacity: 0.85;
}

.cta-banner-email {
  font-size: 0.95rem;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.cta-banner-email:hover {
  opacity: 1;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cta-banner h2 {
    font-size: 2.2rem;
  }

  .cta-banner-actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
