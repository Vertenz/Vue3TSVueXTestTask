<script setup lang="ts">
import TheFavorites from '@/components/TheFavorites.vue'
import { ref } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('favorites')))

const onUpdate = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites'))
}
</script>

<template>
  <section>
    <TheFavorites :people="favorites" @update="onUpdate" />
  </section>
</template>

<style scoped></style>
