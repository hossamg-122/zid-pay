<script setup lang="ts">
import { computed } from 'vue'

interface ILoaderProps {
  width?: number | string
  size?: number
  color?: string
  bgColor?: string
}
const props = withDefaults(defineProps<ILoaderProps>(), {
  // stroke width
  width: 4,
  // loader width & height
  size: 38,
  color: 'text-secondary',
  bgColor: 'text-neutrals-200'
})

const MAGIC_RADIUS_CONSTANT = 20
const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT

const width = computed(() => Number(props.width))
const diameter = computed(() => (MAGIC_RADIUS_CONSTANT / (1 - width.value / props.size)) * 2.1)
const strokeWidth = computed(() => (width.value / props.size) * diameter.value)

const colorValue = computed(() => (isValidCSSColor(props.color) ? props.color : ''))
const colorClass = computed(() => (!colorValue.value ? props.color : ''))

const bgColorValue = computed(() => (isValidCSSColor(props.bgColor) ? props.bgColor : ''))
const bgColorClass = computed(() => (!bgColorValue.value ? props.bgColor : ''))

function isValidCSSColor(color: string) {
  const s = new Option().style
  s.color = color
  return s.color !== ''
}
</script>

<template>
  <div
    class="z-loader"
    :class="colorClass"
    :style="{ width: `${size}px`, height: `${size}px`, color: colorValue }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${diameter} ${diameter}`"
      :width="`${size}px`"
      :height="`${size}px`"
    >
      <circle
        class="z-loader__underlay"
        :class="bgColorClass"
        :style="{ color: bgColorValue }"
        fill="transparent"
        cx="50%"
        cy="50%"
        :r="MAGIC_RADIUS_CONSTANT"
        :stroke-width="strokeWidth"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="0"
      ></circle>
      <circle
        class="z-loader__overlay"
        fill="transparent"
        cx="50%"
        cy="50%"
        :r="MAGIC_RADIUS_CONSTANT"
        :stroke-width="strokeWidth + 0.5"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="CIRCUMFERENCE"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.z-loader {
  @apply inline-flex items-center justify-center relative align-middle;

  svg {
    @apply w-full h-full m-auto absolute inset-0 z-0 -rotate-90;
    animation: loader-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
  }

  &__overlay {
    @apply stroke-current transition-all ease-in-out duration-200 z-20;
    animation:
      loader-dash 1.4s ease-in-out infinite,
      loader-rotate 1.4s linear infinite;
    stroke-dasharray: 25, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    transform-origin: center center;
    transform: rotate(-90deg);
  }

  &__underlay {
    @apply stroke-current z-10;
  }
}

@keyframes loader-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }

  to {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes loader-rotate {
  to {
    transform: rotate(270deg);
  }
}
</style>
