<template>
  <section id="contact" class="contact-section">
    <h2>Get in Touch</h2>
    <p class="contact-subtitle">Tell us about your project and we'll get back to you.</p>

    <form v-if="!submitted" class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>
      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <div class="form-field">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>
      </div>
      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Message' }}
      </button>
      <p v-if="error" class="form-error">{{ error }}</p>
    </form>

    <div v-else class="form-success">
      <p>Thanks for reaching out. We'll be in touch soon.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({ name: '', email: '', message: '' });
const loading = ref(false);
const submitted = ref(false);
const error = ref('');

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    });
    submitted.value = true;
  } catch (e: any) {
    error.value = e?.data?.message || 'Something went wrong. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.contact-section {
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;
}

.contact-section h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.contact-subtitle {
  color: #888;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
}

.form-field label {
  display: block;
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.35rem;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 10px 12px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.submit-button {
  padding: 12px 32px;
  background-color: var(--color-primary);
  color: var(--color-background);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.85;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.form-success p {
  color: var(--color-secondary);
  font-size: 1.1rem;
}
</style>
