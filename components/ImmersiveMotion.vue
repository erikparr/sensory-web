<template>
    <section class="project">
      <h2 class="project-title">Immersive Motion Drawer</h2>
      <div class="project-content">
        <div class="project-image">
          <img src="https://eaca4835oc4rgi75.public.blob.vercel-storage.com/immersive-motion.gif" alt="AR Headtracking with AirPods demonstration" />
        </div>
        <div class="project-description">
          <p>
            This prototype uses immersive 3D particle to transform body motion into an immersive interactive experience. The technology behind the demo has two main components: 1. an interactive 3D particle environment powered by Unity3d software, and 2. a web-app which uses rotation data from a mobile device to remotely interact with the interactive 3D display. The system also utilizes a Firebase realtime database to transmit the data from the web app to the interactive display.
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Component logic can be added here if needed
  </script>
  
  <style scoped>
.project {
  margin-bottom: calc(var(--spacing-unit) * 6);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Nunito', sans-serif;

}

.project-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: var(--color-text);
  font-family: 'Nunito', sans-serif;
  font-weight: 200;

}
  
  .project-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .project-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .project-description {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
  }
  </style>