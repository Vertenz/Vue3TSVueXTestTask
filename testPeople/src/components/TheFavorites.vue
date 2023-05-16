<script setup lang="ts">
import PeopleTable from '@/components/common/PeopleTable.vue'

const props = defineProps<{
  people: Array<PeopleModel> | PeopleModel | null
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()
</script>

<template>
  <div>
    <h1>Favorites</h1>

    <div class="wrapper">
      <transition>
        <PeopleTable
          v-if="people && people.length"
          :people="people"
          is-favorites-page
          @update="emit('update')"
        />

        <strong v-else> empty </strong>
      </transition>
    </div>
  </div>
</template>

<style scoped></style>
