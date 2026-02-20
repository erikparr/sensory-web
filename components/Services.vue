<template>
  <section class="services">
    <h2 class="services-title">Services</h2>
    <div class="services-grid">
      <div v-for="service in services" :key="service.title" class="service-card">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <div class="deliverables">
          <span class="deliverables-label">DELIVERABLES</span>
          <ul>
            <li v-for="item in service.deliverables" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Strategy',
    description: 'Product definition, market positioning, and roadmap planning to align vision with execution.',
    deliverables: [
      'Product strategy workshop',
      'User research & insights',
      'Competitive analysis',
      'Feature prioritization',
    ],
  },
  {
    title: 'Experience Design',
    description: 'User-centered design from research through high-fidelity prototypes and testing.',
    deliverables: [
      'User flows & journeys',
      'Wireframes',
      'Interactive prototypes',
      'Usability testing',
    ],
  },
  {
    title: 'Visual Design',
    description: 'Brand expression through interface design with precision and impact.',
    deliverables: [
      'UI design',
      'Brand guidelines',
      'Iconography',
      'Motion design principles',
    ],
  },
  {
    title: 'Design Systems',
    description: 'Scalable component libraries that bridge design and development.',
    deliverables: [
      'Component library',
      'Design tokens',
      'Documentation',
      'Figma to code workflow',
    ],
  },
  {
    title: 'Front-End Engineering',
    description: 'Production-ready code built with modern frameworks and best practices.',
    deliverables: [
      'React / Next.js apps',
      'Responsive interfaces',
      'API integration',
      'Performance optimization',
    ],
  },
  {
    title: 'Rapid Prototyping / AI',
    description: 'AI-assisted workflows to accelerate design and development cycles.',
    deliverables: [
      'AI generated components',
      'Quick iteration cycles',
      'MVP development',
      'Smart automation',
    ],
  },
]
</script>

<style scoped>
.services {
  padding: 4rem 15vw;
  background-color: #ffffff;
}

.services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff2d55;
  margin-bottom: 2.5rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  background-color: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.service-card p {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.deliverables-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  display: block;
  margin-bottom: 0.5rem;
}

.deliverables ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.deliverables li {
  font-size: 0.85rem;
  font-weight: 400;
  color: #1a1a1a;
  padding: 0.2rem 0;
}

.deliverables li::before {
  content: '+ ';
  color: #888;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
