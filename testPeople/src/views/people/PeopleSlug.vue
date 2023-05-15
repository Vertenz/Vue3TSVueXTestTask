<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, Ref } from 'vue'
import TheLoader from '@/components/common/UI/TheLoader.vue'

const route = useRoute()

const isLoading: Ref<Boolean> = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <section class="people--slug">
    <transition name="fade">
      <TheLoader v-if="isLoading" />

      <h1 v-else>{{ route.params.id }}</h1>
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
