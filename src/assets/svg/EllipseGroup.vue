<template>
  <div class="flex items-center">
    <Ellipse v-for="n in 4" :key="n" class="[&:not(:last-child)]:me-1" />
  </div>
</template>
<script setup lang="ts">
import Ellipse from './Ellipse.vue'
</script>
<style lang=""></style>
