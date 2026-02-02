<template>
  <section 
    class="statement" 
    :class="{ 'expanded': isExpanded }"
    @click="toggleExpand"
  >
    <div class="statement-content">
      <div v-if="!isExpanded" class="statement-preview">
        {{ previewText }}
      </div>
      <div v-else class="statement-text">
        <h3>Creative Concept and Technical Experimentation</h3>
        <p>
          Innovative projects start with original ideas, but those ideas rarely begin fully formed. My process combines <strong>creative ideation</strong> with <strong>rapid experimentation</strong>, allowing for effective iteration, refinement, and testing of initial assumptions. The interplay between ideas and experiments leads to an invaluable catalogue of new concepts and technical sketches.
        </p>

        <h3>Precision Prototyping</h3>
        <p>Building upon initial sketches into fully functional prototypes is an important phase where practical design questions are tested and refined.</p>
        <img src="~/assets/images/process03.png" alt="Prototyping Process" class="process-image" />
        <ul>
          <li><strong>Mastery of Rapid Prototyping Tools:</strong> Utilizing tools like Unity3D and Three.js allows for fast deployment of proof-of-concept applications.</li>
          <li><strong>Rigorous Testing:</strong> Engaging stakeholders for feedback ensures prototypes meet project goals.</li>
          <li><strong>Iterative Enhancement:</strong> Integrating insights from multidisciplinary teams optimizes user experience and performance.</li>
        </ul>

        <h3>Leading Technical Execution and Collaboration</h3>
        <p>Transforming prototypes into polished products requires meticulous execution and unified effort.</p>
        <img src="~/assets/images/process02.png" alt="Technical Execution Process" class="process-image" />
        <ul>
          <li><strong>Architectural Excellence:</strong> Designing robust, scalable software architectures based on extensive experience with high-profile projects.</li>
          <li><strong>Team Leadership:</strong> Leading engineering teams to align technical execution with the creative vision.</li>
          <li><strong>Quality Assurance:</strong> Overseeing rigorous testing to deliver flawless performance and exceptional user experiences.</li>
        </ul>

        <h3>Documentation, Impact Assessment, and Continuous Evolution</h3>
        <p>Post-launch, focus is placed on the project's lasting impact, with thorough documentation to support communication and future endeavors.</p>
        <img src="~/assets/images/process01.png" alt="Documentation Process" class="process-image" />
        <ul>
          <li><strong>Comprehensive Documentation:</strong> Producing detailed technical documentation, user manuals, and video demonstrations ensures stakeholders have a clear understanding of the project's functionalities and vision.</li>
          <li><strong>Analytical Evaluation:</strong> Assessing success using metrics like user engagement, client feedback, and performance data helps identify areas for improvement and informs strategic decisions for future projects.</li>
          <li><strong>Continuous Advancement:</strong> Sharing insights and fostering a culture of innovation contributes to the evolution of industry best practices and inspires new ideas.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(['expand', 'collapse']);
const props = defineProps<{
  isExpanded: boolean,
  previewText: string
}>();

const toggleExpand = () => {
  if (props.isExpanded) {
    emit('collapse');
  } else {
    emit('expand');
  }
};
</script>

<style scoped>
.statement {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease;
  border: 1px solid transparent;
}

.statement:hover {
  background-color: var(--color-surface-hover);
  border: 1px solid var(--color-primary);
}

.statement.expanded {
  padding: 2rem;
  margin-bottom: 2rem;
  height: auto;
}

.statement:not(.expanded) {
  margin-bottom: 2rem;
}

.statement-content {
  max-width: 800px;
  margin: 0 auto;
}

.statement-preview {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--color-text);
}

.statement-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
  text-align: left;
  font-weight: 300;
}

.statement:not(.expanded) .statement-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.statement-text ul {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.statement-text ul:last-child {
  margin-bottom: 0;
}

.process-image {
  width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  object-fit: cover;
}
</style>