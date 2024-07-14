<script setup lang="ts">
import { AuthLogo } from '@/assets/svg'
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <div class="bg-neutral-50 relative">
      <div
        class="w-full sm:max-w-lg m-0 sm:ms-[15%] flex items-center min-h-screen px-3 py-12 relative z-10"
      >
        <slot />
      </div>
      <AuthLogo
        class="absolute top-0 right-0 pointer-events-none h-full translate-y-1/2 w-1/2 md:translate-y-0 md:w-auto rotate-180"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
