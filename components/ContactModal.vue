<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <button class="modal-close" @click="close">&times;</button>
          <h2>Get in Touch</h2>
          <p class="contact-subtitle">Tell us about your project and we'll get back to you.</p>

          <form v-if="!submitted" class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-field">
              <label for="modal-name">Name</label>
              <input id="modal-name" v-model="form.name" type="text" required />
            </div>
            <div class="form-field">
              <label for="modal-email">Email</label>
              <input id="modal-email" v-model="form.email" type="email" required />
            </div>
            <div class="form-field">
              <label for="modal-message">Message</label>
              <textarea id="modal-message" v-model="form.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-button" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
            <p v-if="error" class="form-error">{{ error }}</p>
          </form>

          <div v-else class="form-success">
            <p>Thanks for reaching out. We'll be in touch soon.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const form = reactive({ name: '', email: '', message: '' })
const loading = ref(false)
const submitted = ref(false)
const error = ref('')

function close() {
  emit('close')
}

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    submitted.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 3rem;
  max-width: 520px;
  width: 100%;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.75rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: var(--color-text);
}

.modal-content h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.contact-subtitle {
  color: #888;
  margin-bottom: 2rem;
  font-size: 0.95rem;
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
  background-color: var(--color-background);
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
  border-radius: 100px;
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

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s ease;
}

.modal-enter-from .modal-content {
  transform: translateY(20px);
}

.modal-leave-to .modal-content {
  transform: translateY(20px);
}
</style>
