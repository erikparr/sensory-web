<template>
  <section class="philosophy">
    <blockquote class="philosophy-quote">
      "Speed without craft is noise.<br />
      Craft without shipping is theater."
    </blockquote>
    <div class="philosophy-values">
      <div v-for="value in values" :key="value.title" class="philosophy-value">
        <h3>{{ value.title }}</h3>
        <p>{{ value.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const values = [
  {
    title: 'We ship.',
    description: 'Beautiful work means nothing if it doesn\'t reach users. We prioritize delivery.',
  },
  {
    title: 'Systems over one-offs.',
    description: 'We build foundations that scale, not just single solutions.',
  },
  {
    title: 'AI as an accelerator.',
    description: 'We use AI to move faster. But judgment stays human.',
  },
]
</script>

<style scoped>
.philosophy {
  background-color: #4CD964;
  padding: 10rem 8vw;
  text-align: center;
}

.philosophy-quote {
  font-size: 3.5rem;
  font-weight: 700;
  font-style: italic;
  line-height: 1.2;
  color: #ffffff;
  margin: 0 auto 6rem;
  max-width: 900px;
}

.philosophy-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem;
  text-align: left;
}

.philosophy-value h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.philosophy-value p {
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.6;
  color: #ffffff;
  margin: 0;
}

@media (max-width: 768px) {
  .philosophy-quote {
    font-size: 2rem;
  }

  .philosophy-values {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
