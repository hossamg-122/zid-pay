<script setup lang="ts">
import { ZIcon, ZLoader } from '@/components'
</script>

<template>
  <main>
    <h1 class="text-primary text-center text-3xl">{{ $t('title.config') }}</h1>
    <ZLoader />
    <z-icon name="menu" class="text-success" />
  </main>
</template>
