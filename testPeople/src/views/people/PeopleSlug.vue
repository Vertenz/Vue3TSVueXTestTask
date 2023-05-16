<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, Ref } from 'vue'
import TheLoader from '@/components/common/UI/TheLoader.vue'
import axios from 'axios'
import PeopleTable from '@/components/common/PeopleTable.vue'

const route = useRoute()

const isLoading: Ref<Boolean> = ref(true)

const person: Ref<Array<PeopleModel> | null> = ref(null)

const fetchData = async () => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${route.params.id}`)
    person.value = [res?.data] || null
  } catch (err) {
    console.warn('PeopleSlug/fetchData get error: ', err)
  }
}

onMounted(async () => {
  await fetchData()
  setTimeout(() => {
    if (person.value && person.value.length) {
      isLoading.value = false
    }
  }, 500)
})
</script>

<template>
  <section class="people--slug">
    <transition name="fade">
      <TheLoader v-if="isLoading" />

      <PeopleTable v-else :people="person" is-slug-page />
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.people--slug {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
