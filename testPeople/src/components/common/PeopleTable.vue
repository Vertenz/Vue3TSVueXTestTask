<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import TheButton from '@/components/common/UI/TheButton.vue'

const props = defineProps<{
  people: Array<PeopleModel> | null
  isSlugPage?: boolean | false
  isFavoritesPage?: boolean | false
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const isGridSupport: Ref<Boolean> = ref(true)

const hideBtn: Ref<Boolean> = ref(false)

const setHideBtn = (): Boolean => {
  const storageFavorites = localStorage.getItem('favorites')
  let favorites = null

  if (storageFavorites && storageFavorites.length) {
    favorites = JSON.parse(storageFavorites)
  }

  if (favorites) {
    return (hideBtn.value = Boolean(favorites.find((el) => el.url === props.people?.[0].url)))
  }
}

onMounted(() => {
  // Checking if there is support for grid to display the correct table
  if (window) {
    isGridSupport.value = CSS.supports('display', 'grid')
  }

  if (props.isSlugPage) {
    setHideBtn()
  }
})
</script>

<template>
  <div>
    <div v-if="isGridSupport" class="table-container">
      <div class="table-header cell"><p>Name</p></div>
      <div class="table-header cell"><p>Height</p></div>
      <div class="table-header cell"><p>Mass</p></div>
      <div class="table-header cell"><p>Hair Color</p></div>
      <div class="table-header cell" v-show="!hideBtn">
        <p>{{ isFavoritesPage ? 'delete' : 'Add/remove' }}</p>
      </div>

      <div
        v-for="(person, index) in people"
        :key="person.url + person.name"
        class="cell"
        :style="{ gridRow: index + 2 }"
      >
        {{ person.name }}
      </div>
      <div
        v-for="(person, index) in people"
        :key="person.url + person.height"
        class="cell"
        :style="{ gridRow: index + 2 }"
      >
        {{ person.height }}
      </div>
      <div
        v-for="(person, index) in people"
        :key="person.url + person.mass"
        class="cell"
        :style="{ gridRow: index + 2 }"
      >
        {{ person.mass }}
      </div>
      <div
        v-for="(person, index) in people"
        :key="person.url + person.hair_color"
        class="cell"
        :style="{ gridRow: index + 2 }"
      >
        {{ person.hair_color }}
      </div>
      <div
        v-for="(person, index) in people"
        :key="person.url"
        v-show="!hideBtn"
        class="cell"
        :style="{ gridRow: index + 2 }"
      >
        <TheButton :item="person" primary @update="emit('update')" />
      </div>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair Color</th>
          <th v-show="!hideBtn">{{ isFavoritesPage ? 'delete' : 'Add/remove' }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="person in people" :key="person.url">
          <td>
            {{ person.name }}
          </td>
          <td>
            {{ person.height }}
          </td>
          <td>
            {{ person.mass }}
          </td>
          <td>
            {{ person.hair_color }}
          </td>
          <td v-show="!hideBtn">
            <TheButton :item="person" primary @update="emit('update')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.table-header {
  font-weight: bold;

  & > p {
    display: inline-block;
    padding: 0.3em;
    border-radius: 8px;
    background-color: rgba(255, 51, 51, 0.47);
  }
}

.cell {
  min-height: 60px;
  padding: 10px;
  border: 1px solid lightgray;
}
</style>
