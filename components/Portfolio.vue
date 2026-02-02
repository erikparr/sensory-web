<template>
  <section class="portfolio">
    <div class="portfolio-content">
      <Project
        v-for="project in visibleProjects"
        :key="project.id"
        v-bind="project"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Project from './Project.vue';
import { projects } from '~/data/projects';

const props = defineProps<{
  isCollapsed: boolean,
  previewText: string
}>();

const visibleProjects = computed(() => {
  return projects.filter(project => project.defaultVisible);
});
</script>

<style scoped>
.portfolio {
  width: 100%;
}

.portfolio-content {
  transition: all 0.5s ease;
  opacity: 1;
}
</style>
