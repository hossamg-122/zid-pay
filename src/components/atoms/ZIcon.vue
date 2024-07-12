<script setup lang="ts">
import { paths } from '@/zIcons'

interface IIconProps {
  name: keyof typeof paths
  size?: string | number
  color?: string
  viewBox?: string
}
withDefaults(defineProps<IIconProps>(), {
  size: 24,
  color: 'currentColor',
  viewBox: '0 0 24 24'
})
</script>

<template>
  <svg
    class="z-icon"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
    :title="name"
  >
    <path :d="paths[name]"></path>
  </svg>
</template>
