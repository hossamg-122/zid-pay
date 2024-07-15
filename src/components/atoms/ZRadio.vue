<script setup lang="ts" generic="T = string | null">
import { computed } from 'vue'

interface IRadio {
  modelValue: string | number | boolean
  label: string
  value: string | number | boolean
  name: string
  disabled?: boolean
  errors?: T[]
}
const props = withDefaults(defineProps<IRadio>(), {
  errors: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
}>()

const hasError = computed(() => props?.errors?.length > 0)
const localValue = computed({
  // getter
  get() {
    return props.modelValue
  },
  // setter
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
<template>
  <div>
    <div class="relative flex items-center mb-2">
      <input
        :id="label"
        v-model="localValue"
        type="radio"
        :name="name"
        :disabled="disabled"
        :value="value"
        class="h-auto p-4 cursor-pointer"
      />
      <label
        :for="label"
        class="ms-4 text-sm capitalize whitespace-nowrap"
        :class="{
          'text-error': hasError,
          'cursor-pointer': !hasError && !disabled,
          'cursor-not-allowed': disabled
        }"
        >{{ label }}</label
      >
    </div>
  </div>
</template>

<style lang="scss"></style>
