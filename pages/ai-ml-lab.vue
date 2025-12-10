<template>
  <div class="ai-ml-lab">
    <h1 class="lab-title">AI / ML Lab</h1>
    <div class="lab-projects">
      <div v-for="project in projects" :key="project.id" class="lab-project">
        <h2 class="project-title">{{ project.title }}</h2>
        <img :src="project.image" :alt="project.title" class="project-image">
        <p class="project-description">{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = ref([
  {
    id: 1,
    title: "ControlNet-Powered Image Relighting Studio",
    image: "/images/controlnet-relight.png",
    description: "This app for iOS devices demonstrates on-device image relighting and recoloring using Stable Diffusion with ControlNet, powered by Apple's Core ML framework. Leveraging ml-core allows the app to run ML models directly on the device, without the need for a remote server. Fine tuning can be tricky with models that utilize controlnet, showing the potential and challenges of advanced, on-device generative AI for creative applications."
  },
  {
    id: 2,
    title: "Exquisite Landscape",
    subtitle: "",
    description: "LandscapeClock is a generative AI art piece that creates a continuously panning 24-hour landscape panorama synchronized to real time. A Railway background worker runs daily, using LangChain + OpenAI to generate 24 chained narrative prompts—each referencing the previous for continuity—then iteratively builds a seamless panorama using Stability AI's mask-based inpainting, preserving existing content while extending the scene segment by segment. The resulting image and continuity files are uploaded to Vercel Blob storage, where a Nuxt/Vue frontend pans through the panorama based on current time, with hourly descriptions appearing via typewriter animation. Multi-day continuity is achieved by using each day's final segment as the next day's starting point.",
    mediaContent: "/images/exquisite-landscape.png",
    image: "/images/exquisite-landscape.png",
    ctaLink: "https://landscapeclock.vercel.app",
    ctaText: "Launch Experience",
    category: "AI, Artwork",
    defaultVisible: true
  },

]);
</script>

<style scoped>
.ai-ml-lab {
  background-color: #0e0e30;
  /* Dark grey background */
  color: #ffffff;
  min-height: 100vh;
  padding: 2rem;
}

.lab-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
}

.lab-projects {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 800px;
  margin: 0 auto;
}

.lab-project {
  background-color: #1f1f22;
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.lab-project:hover {
  transform: translateY(-5px);
}

.project-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.project-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.project-description {
  font-size: 1rem;
  line-height: 1.6;
}
</style>