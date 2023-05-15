<script setup lang="ts">
import { Ref, ref, toRefs } from 'vue'

interface CustomInputProps {
  name: string
  type?: string
  value: string
  validation?: (value: string) => boolean
}

const props: CustomInputProps = {
  name: '',
  type: 'text',
  value: ''
}

const emit = defineEmits<{
  (e: 'update', value: string | null): void
}>()

const error: Ref<String> = ref('')

const isActive: Ref<Boolean> = ref(false)

const input = ref(null)

const handleInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  emit('update', target.value)
}

const handleBlur = () => {
  const isValid = props.validation ? props.validation(props.value) : true
  error.value = isValid ? '' : 'Invalid value'
}

const handleFocus = () => {
  isActive.value = true
  error.value = ''
}

const handleFocusOut = () => {
  isActive.value = false
  emit('update', null)
}

const goFocus = () => {
  input.value.focus()
}

const { name, type, value } = toRefs(props)
</script>

<template>
  <div>
    <div :class="['input--wrapper', { 'input--wrapper_active': isActive }]" @click="goFocus">
      <input
        :type="type"
        :id="name"
        :name="name"
        :value="value"
        ref="input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @focusout="handleFocusOut"
        class="input"
      />
      <img src="/content/magnify.svg" alt="search" width="16" height="16" loading="lazy" />
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.input--wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: max-content;
  padding: 0.5em 1em;
  border: 1px solid var(--dark-green);
  border-radius: 20px;
  transition: border 0.3s ease;

  &_active {
    border: 1px solid var(--green);
  }
}

.input {
  background-color: inherit;
  border: none;
  outline: none;
  text-decoration: none;

  &[type='submit'],
  &[type='reset'] {
    background-color: inherit;
    border: none;
    outline: none;
    text-decoration: none;
  }
}

.error {
  color: red;
}
</style>
