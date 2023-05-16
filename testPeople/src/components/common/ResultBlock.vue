<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  item: PeopleModel | null
}>()

const getId = computed((): number | null => {
  if (props?.item?.url !== null) {
    const regex = /\/(\d+)\/$/
    const matches = props?.item?.url.match(regex)

    if (matches && matches.length > 1) {
      return matches[1]
    }
  }

  return null
})
</script>

<template>
  <RouterLink v-if="getId" :to="`/people/${getId}`">
    <div class="block">
      <p class="block--title">
        {{ item.name }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
}
</style>
