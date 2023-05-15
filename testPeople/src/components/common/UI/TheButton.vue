<script lang="ts">
// not setup only for example
import {defineComponent, computed, PropType} from 'vue'

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
      } else if (props.item && props.item.id) {
        setFavorites()
      }
    }

    // next only for favorites
    const getFavorites = () => {
      const storageFavorites = localStorage.getItem('favorites')
      let favorites = null

      if (storageFavorites && storageFavorites.length) {
        favorites = JSON.parse(storageFavorites)
      }

      return favorites
    }

    const isFavorites = computed((): Boolean => {
      const favorites = getFavorites()
      if (favorites) {
        return Boolean(favorites.find((el) => el.id === props.item.id))
      }

      return false
    })

    const addToFavorites = (): void => {
      let favorites = getFavorites() || []

      favorites.push(props.item)

      localStorage.setItem('items', JSON.stringify(favorites))
    }

    const removeFromFavorites = (): void => {
      let favorites = getFavorites() || []
      const index = favorites.findIndex((el) => el.id === props.item.id)

      if (index !== -1) {
        favorites.splice(index, 1)
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } else {
        console.warn('Error at removeFromFavorites')
      }
    }

    const setFavorites = () => {
      if (isFavorites.value) {
        addToFavorites()
      } else {
        removeFromFavorites()
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
  <component :is="type" :to="to" :class="buttonClass" @click="handleClick">
    <slot v-if="!item"></slot>

    <div>
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
