<script setup lang="ts">
import PeopleTable from '@/components/common/PeopleTable.vue'
import TheInput from '@/components/common/UI/TheInput.vue'
import { Ref, ref } from 'vue'
import axios from 'axios'
import ScrollBox from '@/components/common/UI/ScrollBox.vue'
import ResultBlock from '@/components/common/ResultBlock.vue'

const props = defineProps<{
  people: Array<PeopleModel> | null
}>()

const searchResult: Ref<null | Array<PeopleModel>> = ref(null)

const onUpdate = async (value) => {
  if (value) {
    try {
      const res = await axios.get(`https://swapi.dev/api/people/?search=${value}`)
      searchResult.value = res?.data?.results || null
    } catch (err) {
      console.warn('ThePeople/onUpdate get err: ', err)
    }
  } else {
    searchResult.value = null
  }
}
</script>

<template>
  <h1>The People</h1>

  <div class="search--wrapper">
    <TheInput @update="onUpdate($event)" />

    <transition name="slide-fade">
      <ScrollBox v-if="searchResult && searchResult.length" class="scroll--box">
        <ResultBlock
          v-for="el in searchResult"
          :key="el.url"
          :item="el"
          class="scroll--box-element"
        />
      </ScrollBox>
    </transition>
  </div>

  <PeopleTable v-if="people && people.length" :people="people" />
</template>

<style scoped lang="scss">
// transition
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
// end transition

.search--wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 150px;

  & > * {
    margin-bottom: 0.4em;
  }
}

.scroll--box {
  position: absolute;
  top: 40px;
  min-width: 250px;
}

.scroll--box-element {
  display: block;
  border-bottom: 1px solid grey;
}
</style>
