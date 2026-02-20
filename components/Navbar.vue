<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="#" class="navbar-brand" @click.prevent="scrollToTop">SENSORY</a>

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar-links" :class="{ open: menuOpen }">
        <a href="#work" @click="closeMenu">Work</a>
        <a href="#services" @click="closeMenu">Services</a>
        <a href="#process" @click="closeMenu">Process</a>
        <a href="#studio" @click="closeMenu">Studio</a>
        <a href="#contact" @click="closeMenu">Contact</a>
      </div>

      <a href="#contact" class="navbar-cta">Start a Project</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar-inner {
  padding: 0 8vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: var(--font-size-2xl);
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--color-text);
  text-decoration: none;
}

.navbar-brand:hover {
  color: var(--color-secondary);
}

.navbar-links {
  display: flex;
  gap: var(--space-8);
}

.navbar-links a {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.navbar-links a:hover {
  color: var(--color-text);
}

.navbar-cta {
  display: inline-block;
  padding: 8px 20px;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: 100px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.navbar-cta:hover {
  opacity: 0.85;
  color: var(--color-background);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: transform var(--duration-normal) var(--ease-in-out),
              opacity var(--duration-normal) var(--ease-in-out);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 var(--space-4);
  }

  .hamburger {
    display: flex;
  }

  .navbar-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: var(--space-6) var(--space-4);
    gap: var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .navbar-links.open {
    display: flex;
  }

  .navbar-links a {
    font-size: var(--font-size-base);
  }

  .navbar-cta {
    display: none;
  }
}
</style>
