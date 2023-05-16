<script lang="ts">
// for example, used here not setup
import { defineComponent, computed, PropType, ref, Ref, onMounted } from 'vue'

export default defineComponent({
  name: 'TheButton',

  props: {
    primary: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'RouterLink'].includes(value)
    },
    to: {
      type: String,
      default: ''
    },
    item: {
      type: Object as PropType<PeopleModel>,
      defaults: null
    }
  },

  setup(props, { emit }) {
    const buttonClass = computed(() => ({
      'the-button': true,
      'the-button--primary': props.primary,
      'the-button--loading': props.loading,
      'the-button--disabled': props.disabled,
      'the-button--favorites': props.item
    }))

    function handleClick() {
      if (!props.disabled && !props.item) {
        emit('click')
      } else if (props.item && props.item.url) {
        setFavorites()
      }
    }

    // next only for favorites
    const isFavorites: Ref<Boolean> = ref(false)

    const setIsFavorites = (): Boolean => {
      const favorites = getFavorites()
      if (favorites) {
        return (isFavorites.value = Boolean(favorites.find((el) => el.url === props.item.url)))
      }

      return (isFavorites.value = false)
    }

    onMounted(() => {
      if (props.item && props.item.url) {
        setIsFavorites()
      }
    })
    const getFavorites = () => {
      const storageFavorites = localStorage.getItem('favorites')
      let favorites = null

      if (storageFavorites && storageFavorites.length) {
        favorites = JSON.parse(storageFavorites)
      }

      return favorites
    }

    const addToFavorites = (): void => {
      let favorites = getFavorites() || []

      favorites.push(props.item)

      localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    const removeFromFavorites = (): void => {
      let favorites = getFavorites() || []
      const index = favorites.findIndex((el) => el.url === props.item.url)

      if (index !== -1) {
        favorites.splice(index, 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } else {
        console.warn('Error at removeFromFavorites')
      }
    }

    const setFavorites = () => {
      if (!isFavorites.value) {
        addToFavorites()
        setIsFavorites()
        emit('update')
      } else {
        removeFromFavorites()
        setIsFavorites()
        emit('update')
      }
    }

    // end of favorites

    return {
      buttonClass,
      handleClick,
      isFavorites
    }
  }
})
</script>

<template>
  <component :is="type" :to="to" :class="buttonClass" @click.stop="handleClick">
    <slot v-if="!item"></slot>

    <div v-else>
      {{ isFavorites ? 'удалить' : 'добавить' }}
    </div>
  </component>
</template>

<style scoped>
.the-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.the-button--primary {
  background-color: var(--dark-green);
  color: #fff;
}

@media (hover: hover) {
  .the-button--primary:hover {
    background-color: var(--vt-c-divider-light-1);
  }
}

.the-button--loading {
  background-color: #f8f9fa;
  opacity: 0.6;
  cursor: not-allowed;
}

.the-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
