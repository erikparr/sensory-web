<template>
  <section class="process">
    <h2 class="process-title">Process</h2>
    <div class="process-list">
      <div v-for="step in steps" :key="step.number" class="process-row">
        <div class="process-left">
          <span class="process-number">{{ step.number }}</span>
          <div class="process-info">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
        <div class="process-tags">
          <span v-for="tag in step.tags" :key="tag" class="process-tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Align',
    description: 'We start by understanding your vision, constraints, and success metrics.',
    tags: ['Discovery', 'Stakeholder Interviews', 'Goal Setting'],
  },
  {
    number: '02',
    title: 'Explore',
    description: 'We explore the landscape of solutions through research, sketching, and early prototypes.',
    tags: ['Research', 'Wireframes', 'Prototypes'],
  },
  {
    number: '03',
    title: 'Design',
    description: 'We shape high-fidelity visuals and interactions with systematic thinking.',
    tags: ['UI Design', 'Design Systems', 'Motion'],
  },
  {
    number: '04',
    title: 'Build',
    description: 'We engineer production-quality interfaces with clean code and continuous collaboration.',
    tags: ['Development', 'Code Review', 'QA'],
  },
  {
    number: '05',
    title: 'Launch + Iterate',
    description: 'We ship and continuously improve based on real user feedback.',
    tags: ['Deployment', 'Analytics', 'Iteration'],
  },
]
</script>

<style scoped>
.process {
  padding: 4rem 8vw;
}

.process-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2.5rem;
}

.process-list {
  border-top: 1px solid var(--color-border);
}

.process-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border);
  gap: 2rem;
}

.process-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.process-number {
  font-size: 3.5rem;
  font-weight: 300;
  color: #ffffff;
  min-width: 4rem;
}

.process-info h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.process-info p {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--color-text-muted);
  margin: 0;
}

.process-tags {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.process-tag {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .process-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .process-tags {
    flex-wrap: wrap;
  }
}
</style>
