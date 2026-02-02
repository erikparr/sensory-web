<template>
    <section class="project">
      <h2 class="project-title">AR Headtracking with AirPods</h2>
      <div class="project-content">
        <div class="project-image">
          <img src="~/assets/images/headtracking.gif" alt="AR Headtracking with AirPods demonstration" />
        </div>
        <div class="project-description">
          <p>
            This prototype shows the potential of dynamic head tracking and AR interaction with remote
            content using AirPods. This opens up a range of new spatial interactions, in particular with
            wayfinding using spatial audio cues. The AirPods send motion data to the iPhone app which
            then sends data to the server. Multiple apps running on other screen can then leverage the
            motion data.
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