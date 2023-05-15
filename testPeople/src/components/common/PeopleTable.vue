<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import TheButton from '@/components/common/UI/TheButton.vue'

const props = defineProps<{
  people: Array<PeopleModel> | null
}>()
const isGridSupport: Ref<Boolean> = ref(true)

onMounted(() => {
  // Checking if there is support for grid to display the correct table
  if (window) {
    isGridSupport.value = window.CSS?.grid !== undefined
  }
})
</script>

<template>
  <div>
    <div v-if="isGridSupport" class="table-container">
      <div class="table-header">Name</div>
      <div class="table-header">Height</div>
      <div class="table-header">Mass</div>
      <div class="table-header">Hair Color</div>
      <div class="table-header">Add/remove</div>

      <div v-for="item in people" :key="item.id" class="table-row">
        <div class="table-cell">
          {{ item.name }}
        </div>

        <div class="table-cell">
          {{ item.height }}
        </div>

        <div class="table-cell">
          {{ item.mass }}
        </div>

        <div class="table-cell">
          {{ item.hair_color }}
        </div>
        <div class="table-cell">
          <TheButton :item="item" />
        </div>
      </div>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair Color</th>
          <th>Add</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in people" :key="item.id">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.height }}
          </td>
          <td>
            {{ item.mass }}
          </td>
          <td>
            {{ item.hair_color }}
          </td>
          <td>
            <TheButton :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(auto, 1fr);
  gap: 8px;
}

.table-header {
  font-weight: bold;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 8px;
}

.table-cell {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
