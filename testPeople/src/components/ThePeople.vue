<script setup lang="ts">
const props = defineProps<{
  people: Array<PeopleModel> | null
}>()
</script>

<template>
  <h1>The People</h1>

  <ul v-if="people && people.length">
    <li v-for="person in people" :key="person.id">
      {{ person }}
    </li>
  </ul>
</template>
