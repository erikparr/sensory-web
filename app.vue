<template>
  <div>
    <Navbar @open-contact="showContact = true" />
    <NuxtPage />
    <ContactModal :visible="showContact" @close="showContact = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ContactModal from '~/components/ContactModal.vue'

const showContact = ref(false)
provide('showContact', showContact)
</script>
