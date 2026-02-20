<template>
  <section class="about">
    <div class="about-inner">
      <div class="about-left">
        <h2>A small team that thinks big.</h2>
        <p class="about-description">
          We're a tight-knit group of designers and engineers who've been
          building digital products for over a decade. We work with companies
          at every stage—from startups finding product-market fit to
          established brands reinventing their digital presence.
        </p>
        <div class="about-stats">
          <div class="stat">
            <span class="stat-number">10+</span>
            <span class="stat-label">Years shipping</span>
          </div>
          <div class="stat">
            <span class="stat-number">50+</span>
            <span class="stat-label">Global clients</span>
          </div>
          <div class="stat">
            <span class="stat-number">100%</span>
            <span class="stat-label">Design + build</span>
          </div>
        </div>
      </div>
      <div class="about-right">
        <div class="about-images">
          <img src="/images/intuitive.png" alt="Team at work" class="about-img" />
          <img src="https://eaca4835oc4rgi75.public.blob.vercel-storage.com/suckerpunchv.gif" alt="Interactive installation" class="about-img" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 6rem 8vw;
}

.about-inner {
  display: flex;
  align-items: flex-start;
  gap: 4rem;
}

.about-left {
  flex: 1;
  min-width: 0;
}

.about-left h2 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
  max-width: 480px;
}

.about-stats {
  display: flex;
  gap: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--color-text-muted);
}

.about-right {
  flex: 1;
  min-width: 0;
}

.about-images {
  display: flex;
  gap: 1rem;
}

.about-img {
  flex: 1;
  min-width: 0;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .about-inner {
    flex-direction: column;
  }

  .about-stats {
    gap: 2rem;
  }

  .about-images {
    flex-direction: column;
  }

  .about-img {
    height: 200px;
  }
}
</style>
