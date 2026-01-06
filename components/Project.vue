<template>
  <section class="project">
    <h2 class="project-title">{{ title }}</h2>
    <p v-if="subtitle" class="project-subtitle">{{ subtitle }}</p>
    <div class="project-content">
      <div class="project-media" :class="{ 'foam3d-media': mediaType === 'foam3d' }">
        <template v-if="Array.isArray(mediaContent)">
          <div v-for="(media, index) in mediaContent" :key="index" class="media-item">
            <img v-if="mediaType === 'image'" :src="media" :alt="title" />
          </div>
        </template>
        <template v-else>
          <img
            v-if="mediaType === 'image'"
            :src="mediaContent"
            :alt="title"
            :class="customClass"
          />
          <iframe
            v-else-if="mediaType === 'vimeo'"
            :src="mediaContent"
            width="100%"
            height="500px"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
          <ClientOnly v-else-if="mediaType === 'foam3d'">
            <FoamLogo3D />
          </ClientOnly>
        </template>
      </div>
      <div class="project-description" v-html="description"></div>
      <a v-if="ctaLink" :href="ctaLink" target="_blank" rel="noopener noreferrer" class="cta-link">
        {{ ctaText || 'Learn More' }} →
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import FoamLogo3D from './FoamLogo3D.vue';

interface ProjectProps {
  title: string;
  subtitle?: string;
  description: string;
  mediaContent: string | string[];
  mediaType: 'image' | 'vimeo' | 'foam3d';
  ctaLink?: string;
  ctaText?: string;
  customClass?: string;
}

const props = defineProps<ProjectProps>();
</script>

<style scoped>
.portrait-image-constrain {
  max-width: 400px !important;
  max-height: 800px !important;
  object-fit: contain !important;
}

.project {
  margin-bottom: calc(var(--spacing-unit) * 6);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Nunito Sans', sans-serif;
  text-align: center;
}

.project-title {
  font-size: 2rem;
  font-weight: 200;
  margin-bottom: calc(var(--spacing-unit) * 0.5);
  color: var(--color-text);
  font-family: 'Nunito Sans', sans-serif;
}

.project-subtitle {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: #888;
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-media {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.media-item {
  flex: 1;
  max-width: 50%;
}

.project-media img,
.project-media iframe,
.media-item img {
  width: 100%;
  object-fit: cover;
}

.project-media iframe {
  height: 800px;
}

.foam3d-media {
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
}

.project-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  text-align: left;
}

.cta-link {
  display: inline-block;
  margin-top: 1rem;
  color: #888;
  text-decoration: none;
  font-weight: 400;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.cta-link:hover {
  color: var(--color-text);
}
</style>