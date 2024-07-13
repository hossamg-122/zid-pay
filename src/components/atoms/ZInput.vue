<script setup lang="ts" generic="T = string | null">
import { computed, ref } from 'vue'
import ZIcon from './ZIcon.vue'
import { paths } from '@/zIcons'

interface IInput {
  modelValue: string | number | boolean
  type?: string
  name?: string
  placeholder?: string
  label: string
  disabled?: boolean
  height?: number
  errors?: T[]
  gutterBottom?: boolean
  preIcon?: keyof typeof paths
  appendIcon?: keyof typeof paths
  iconSize?: number
  iconViewBox?: string
  iconStyle?: string
  maxLength?: string | number
  minLength?: string | number
}
const props = withDefaults(defineProps<IInput>(), {
  type: 'text',
  height: 50,
  errors: () => [],
  gutterBottom: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
}>()

const isFocused = ref(false)
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
const hasError = computed(() => props.errors?.length > 0)
const isDirty = computed(() => isFocused.value || Boolean(localValue.value))
console.log(isDirty)
</script>
<template>
  <div>
    <div class="relative">
      <z-icon
        v-if="preIcon"
        :name="preIcon"
        :size="iconSize"
        :viewBox="iconViewBox"
        :class="iconStyle"
        class="absolute top-1/2 start-2 -translate-y-1/2"
      />
      <label
        :for="label"
        class="absolute ease-in-out transition-all duration-250 text-xs sm:text-lg"
        :class="{
          '-top-3 bg-white px-1 ml-3 text-sm': isDirty,
          'p-3': !isDirty,
          'start-4': preIcon && !isDirty,
          'text-error': hasError,
          'text-black': isDirty,
          'text-grey-100': !isDirty && !hasError
        }"
        >{{ label }}</label
      >

      <input
        :id="label"
        v-model="localValue"
        :style="{ height: height ? `${height}px` : '50px' }"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :disabled="disabled"
        :max="maxLength"
        :min="minLength"
        class="rounded w-full p-4 border placeholder:uppercase text-sm placeholder:leading-[30px] placeholder:text-grey-100 outline-none focus:border-primary-100 focus:shadow-input"
        :class="{
          'border-error': hasError,
          'border-grey-100': !hasError,
          'cursor-not-allowed': disabled,
          'ps-7': preIcon,
          'pe-7': appendIcon
        }"
        @focus="() => (isFocused = true)"
        @focusout="isFocused = false"
      />
      <z-icon
        v-if="appendIcon"
        :name="appendIcon"
        :size="iconSize"
        :viewBox="iconViewBox"
        :class="iconStyle"
        class="absolute top-1/2 end-2 -translate-y-1/2"
      />
    </div>

    <div v-if="gutterBottom" class="h-3 pt-1">
      <div v-if="hasError" data-aos="fade-right" class="flex items-center">
        <z-icon size="10" viewBox="0 0 10 10" class="text-error me-2" name="error" />
        <p class="text-error text-xs">{{ errors[0].$message || errors[0] }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
