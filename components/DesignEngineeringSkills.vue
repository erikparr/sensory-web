<template>
  <section class="skills-section">
    <h2 class="skills-heading">Skills & Capabilities</h2>

    <div class="skills-grid">
      <div class="skill-group">
        <h3>Interaction & UX Engineering</h3>
        <ul>
          <li>Interaction architecture for complex tools and workflows</li>
          <li>UI design for dashboards, timelines, and multi-panel layouts</li>
          <li>Rapid prototyping for UX research and stakeholder demos</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Front-End & Interface Engineering</h3>
        <ul>
          <li>TypeScript / JavaScript</li>
          <li>Vue, React and component-based architectures</li>
          <li>Three.js / WebGL, Canvas, rendering and performance optimization</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Systems & Production Infrastructure</h3>
        <ul>
          <li>API design and multi-service orchestration</li>
          <li>Async job queues and event-driven architectures</li>
          <li>CI/CD pipelines and cross-platform deployment</li>
          <li>Payment integration and webhook handlers</li>
        </ul>
      </div>

      <div class="skill-group">
        <h3>Data, AI & Visualization</h3>
        <ul>
          <li>Data visualization for complex datasets and analytics</li>
          <li>Real-time data pipelines and streaming interfaces</li>
          <li>AI/ML integration with production-ready error handling</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.skills-section {
  max-width: 900px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: 8px;
}

.skills-heading {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.skill-group h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.skill-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-group li {
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--color-text);
  padding: 0.3rem 0;
  padding-left: 1rem;
  position: relative;
}

.skill-group li::before {
  content: "·";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skills-section {
    padding: 1.5rem;
  }

  .skill-group h3 {
    font-size: 1rem;
  }

  .skill-group li {
    font-size: 0.9rem;
  }
}
</style>
