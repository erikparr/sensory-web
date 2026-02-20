<template>
  <footer class="footer">
    <div class="footer-left">
      <span class="footer-logo">S E N S O R Y</span>
      <span class="footer-locations">Portland · San Diego · Remote</span>
    </div>
    <div class="footer-center">
      <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
    </div>
    <div class="footer-right">
      © 2026 SENSORY. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 8vw;
  border-top: 1px solid var(--color-border);
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-logo {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--color-text);
}

.footer-locations {
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--color-text-muted);
}

.footer-center {
  display: flex;
  gap: 1.5rem;
}

.footer-center a {
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.footer-center a:hover {
  color: var(--color-text);
}

.footer-right {
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
