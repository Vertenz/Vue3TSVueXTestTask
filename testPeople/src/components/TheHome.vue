<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TheButton from '@/components/common/UI/TheButton.vue'

useHead({
  meta: [
    {
      name: 'description',
      content:
        'This repository contains a technical task implemented using Vue 3, TypeScript, Vuex, Axios, and LocalStorage.'
    },
    {
      property: 'og:title',
      content: 'Test Project Vue3'
    },
    {
      property: 'og:description',
      content: 'Vue3 + TS + vueX test'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})
</script>

<template>
  <section class="button-section">
    <TheButton type="RouterLink" to="/people" primary> People </TheButton>

    <TheButton type="RouterLink" to="/favorites" primary> Favorites </TheButton>
  </section>
</template>

<style scoped>
.button-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10vh;
}
</style>
