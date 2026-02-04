<template>
  <div class="sandbox-page">
    <NuxtLink to="/" class="back-link">&larr; Back</NuxtLink>
    <ClientOnly>
      <PixelGridEffect />
    </ClientOnly>
  </div>
</template>

<style scoped>
.sandbox-page {
  position: fixed;
  inset: 0;
  background: #000;
  overflow: hidden;
}

.back-link {
  position: fixed;
  top: 1rem;
  left: 1rem;
  color: #666;
  text-decoration: none;
  font-family: monospace;
  font-size: 0.875rem;
  z-index: 10;
  transition: color 0.2s;
}

.back-link:hover {
  color: #fff;
}
</style>
