<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import ZIcon from './ZIcon.vue'
import ZLoader from './ZLoader.vue'
import { paths } from '@/zIcons'

interface IButton {
  label?: string
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'white' | 'alert' | 'warning' | 'success' | 'error'
  compact?: boolean
  to?: string | object
  replace?: boolean
  href?: string
  icon?: keyof typeof paths
  elevated?: boolean
  prependIcon?: keyof typeof paths
  appendIcon?: keyof typeof paths
  pill?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  id?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<IButton>(), {
  color: 'primary',
  variant: 'contained',

  type: 'button'
})

const emit = defineEmits(['prependClick', 'appendClick'])

const element = computed(() => {
  if (props.to) {
    return 'router-link'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const colorStyle = computed(() => `z-btn__${props.color}`)

const variantStyle = computed(() => `z-btn__${props.color}--${props.variant}`)

const loaderColor = computed(() => {
  if (props.color === 'white') {
    return 'black'
  }

  if (props.variant === 'contained') {
    return 'white'
  }

  return `text-${props.color}-600`
})

const optionalBindings = computed(() => {
  const disabled = props.disabled || props.loading
  const disableAttrs = { 'aria-disabled': disabled, tabindex: disabled && -1 }

  if (element.value === 'router-link') {
    return {
      to: props.to,
      replace: props.replace,
      ...disableAttrs
    }
  }

  if (element.value === 'a') {
    return {
      href: props.href,
      target: '_blank',
      ...disableAttrs
    }
  }

  return { type: props.type, disabled }
})

const hasAppendListener = computed(() => !!getCurrentInstance()?.vnode.props?.onAppendClick)
const hasPrependListener = computed(() => !!getCurrentInstance()?.vnode.props?.onPrependClick)

function onPrepend(event: MouseEvent) {
  event.stopPropagation()
  emit('prependClick')
}

function onAppend(event: MouseEvent) {
  event.stopPropagation()
  emit('appendClick')
}
</script>
<template>
  <component
    :is="element"
    :id="id"
    class="z-btn"
    :class="[
      colorStyle,
      variantStyle,
      {
        'z-btn--icon': icon,
        'z-btn--compact': compact,
        'z-btn--pill': pill,
        'z-btn--block': block,
        'z-btn--elevated': elevated,
        'z-btn--disabled': loading || disabled,
        'z-btn--loading': loading
      }
    ]"
    v-bind="optionalBindings"
  >
    <z-loader v-if="loading" :size="24" :width="1.5" :color="loaderColor" bg-color="transparent" />
    <div
      class="flex items-center justify-center"
      :class="{
        'opacity-0 h-0': loading
      }"
    >
      <slot name="prepend-icon">
        <z-icon
          v-if="prependIcon"
          class="me-2"
          :name="prependIcon"
          :size="compact ? 18 : 24"
          v-on="{ click: hasPrependListener ? onPrepend : null }"
        />
      </slot>
      <slot>
        <z-icon v-if="typeof icon === 'string'" :name="icon" />
        <span v-else>
          {{ label }}
        </span>
      </slot>
      <slot name="append-icon">
        <z-icon
          v-if="appendIcon"
          class="ms-2"
          :name="appendIcon"
          :size="compact ? 18 : 24"
          v-on="{ click: hasAppendListener ? onAppend : null }"
        />
      </slot>
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use 'sass:list';

$colors: ('primary', 'secondary', 'error', 'success', 'warning', 'alert', 'neutrals');

.z-btn {
  @apply rounded-lg px-14 py-4 capitalize transition-all duration-200 ease-in-out flex-shrink-0 text-center active:shadow-md;

  &--icon {
    @apply p-2 items-center;
  }
  &--compact {
    @apply p-1.5 h-8 leading-4;
  }
  &--pill {
    @apply rounded-full;
  }
  &--block {
    @apply w-full;
  }
  &--elevated {
    @apply shadow-md;
  }
  &--disabled {
    @apply opacity-50 pointer-events-none;
  }
  &--loading {
    @apply flex flex-col justify-center items-center;
  }
  @each $color in $colors {
    &__#{$color} {
      &--contained {
        @apply text-white bg-#{$color};

        &:hover:not(:disabled) {
          @apply opacity-50;
        }
        &:active:not(:disabled) {
          @apply shadow-md;
        }
      }

      &--outlined {
        @apply text-#{$color} border border-#{$color} [&:not(.z-btn--compact)]:leading-5;

        &:hover:not(:disabled) {
          @apply text-white bg-#{$color};
        }
        &:active:not(:disabled) {
          @apply shadow-md;
        }
      }

      &--text {
        @apply text-#{$color};

        &:hover:not(:disabled) {
          @apply bg-#{$color}/25;
        }
        &:active:not(:disabled) {
          @apply shadow-md;
        }
      }
    }
  }
}

.z-btn--compact.z-btn--icon {
  @apply py-0 px-1;
}
</style>
