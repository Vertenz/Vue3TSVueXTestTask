<script setup lang="ts">
import ThePeople from '@/components/ThePeople.vue'
import { useStore } from 'vuex'

const store = useStore()
const people = store.state.people
</script>

<template>
  <section>
    <ThePeople :people="people" />
  </section>
</template>
